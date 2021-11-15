import React, { useState, useEffect } from 'react'
import './feed.css'
import CreateIcon from '@material-ui/icons/Create'
import Inputoption from './inputoption'
import ImageIcon from '@mui/icons-material/Image';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import EventIcon from '@mui/icons-material/Event';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import Posts from '../Post/Post';
import { db } from '../../firebase'
import firebase from 'firebase/compat/app';
import {
    updateDoc,
    doc,
    deleteDoc,
    serverTimestamp,
} from "firebase/firestore";
import { ButtonGroup, ToggleButton } from 'react-bootstrap'
import Aos from "aos";
import "aos/dist/aos.css";

const Feed = ({ user }) => {

    const [input, setInput] = useState('');
    const [post, setPost] = useState([]);
    const [privates, setPrivates] = useState('Public');

    useEffect(() => {
        db.collection('posts').orderBy("timeStamp", "desc").onSnapshot(snapshot => {
            setPost(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    data: doc.data()
                }
            )))
        });
        Aos.init({ duration: 1000 });
    }, [])



    // console.log(user)
    // console.log(post)

    const sendPost = async (e) => {
        e.preventDefault();
        //    console.log(post)
        if(input){
        await db.collection('posts').add({
            name: user.displayName,
            discription: user.email,
            message: input,
            photoURL: user.photoURL || '',
            timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
            privates: privates
        });
    }else(alert('Your post is empty'))
        setInput("");
    }


    function ToggleButtonExample() {
        const radios = [
            { name: 'Pvt', value: 'Private' },
            { name: 'Pub', value: 'Public' },
        ];

        return (
            <>

                <ButtonGroup >
                    {radios.map((radio, idx) => (

                        <ToggleButton
                            key={idx}
                            id={`radio-${idx}`}
                            type="radio"
                            variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                            name="radio"
                            value={radio.value}
                            checked={privates === radio.value}
                            onChange={(e) => setPrivates(e.currentTarget.value)}
                        >
                            {radio.name}
                        </ToggleButton>
                    ))}
                </ButtonGroup>
            </>
        );
    }

    // console.log(privates)

    const deletePost = async (deleteDiary) => {
        // console.log('Delete', deleteDiary.data.discription);
        // console.log('Delete', user.email);
        if (user.email === deleteDiary.data.discription) {

            const docRef = doc(db, "posts", deleteDiary.id);
            await deleteDoc(docRef);

        } else {
            return alert("you can only delete your post")
        }
    }

    const editPost = async (editDiary) => {

        console.log(editDiary)

        if (user.email === editDiary.data.discription) {
            const message = prompt("Edit your Post");
            if (message) {

                const docRef = doc(db, "posts", editDiary.id);
                const payload = { message, timestamp: serverTimestamp() };

                updateDoc(docRef, payload);
            }
            else { return alert("Post is empty") }

        } else {
            return alert("you can only edit your post ")
        }

    };

    const editPrivacy = async (editDiary) => {

        console.log(editDiary)

        if (user.email === editDiary.data.discription) {
            // const privates = setPrivates(!privates);
            const docRef = doc(db, "posts", editDiary.id);
            const payload = { privates, timestamp: serverTimestamp() };

            updateDoc(docRef, payload);

        } else {
            return alert("you can only edit your post ")
        }

    };


    return (
        <div className='feed'>

            <div className='feed__inputContainer'>
                <div className='feed__input'>
                    <CreateIcon />
                    <form >
                        <input type='text' placeholder='Start a post' value={input} onChange={(e) => setInput(e.target.value)} />
                        <ToggleButtonExample />

                        <button type='submit' onClick={sendPost}>send</button>
                    </form>
                </div>

                <div className='feed__inputoptions'>
                    <Inputoption Icon={ImageIcon} title='Photo' color='#70B5F9' />
                    <Inputoption Icon={SubscriptionsIcon} title='Subscription' color='#E7A33E' />
                    <Inputoption Icon={EventIcon} title='Event' color='#C0CBCD' />
                    <Inputoption Icon={CalendarViewDayIcon} title='Write article' color='#7FC15E' />


                </div>

            </div>

            <div className='' >

                {post.map((elem, ind) => {
                    // console.log(elem)
                    if (elem.data.privates === 'Public') {
                        return <div data-aos="zoom-in-up" key={ind}><Posts
                            key={ind}
                            name={elem.data.name}
                            // description={elem.data.discription}
                            privacy={elem.data.privates}
                            message={elem.data.message}
                            photoUrl={elem.data.photoURL}
                            Edit={() => { editPost(elem) }}
                            Delete={() => { deletePost(elem) }}
                            Pri={() => { editPrivacy(elem) }}
                        /></div>
                    }
                })}

            </div>

        </div>
    )
}

export default Feed
