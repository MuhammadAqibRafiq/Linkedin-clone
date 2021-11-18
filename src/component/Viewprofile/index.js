import React, { useState, useEffect, useRef } from 'react'
import './profile.css';
import '../feed/feed.css'
import CreateIcon from '@material-ui/icons/Create'
import Inputoption from '../feed/inputoption'
import ImageIcon from '@mui/icons-material/Image';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import EventIcon from '@mui/icons-material/Event';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import Posts from '../Post/Post';
import { db, storage } from '../../firebase'
import firebase from 'firebase/compat/app';
import {
    updateDoc,
    doc,
    deleteDoc,
    serverTimestamp,
} from "firebase/firestore";
import { ButtonGroup, ToggleButton } from 'react-bootstrap'
import { Avatar } from '@material-ui/core'
import { ToastContainer, toast } from 'react-toastify';
import 'firebase/storage'
import ProgressBar from 'react-bootstrap/ProgressBar'
import SendIcon from '@mui/icons-material/Send';

const Index = ({ user , setSelectedImg }) => {

    const [input, setInput] = useState('');
    const [post, setPost] = useState([]);
    const [privates, setPrivates] = useState('Public');
    const [singleImg, setSingleImg] = useState(null);
    const inputUpload = useRef();
    const [progress, setProgress] = useState(0);


    const milliseconds = new Date().getTime()


    useEffect(() => {
        db.collection('posts').orderBy("timeStamp", "desc").onSnapshot(snapshot => {
            setPost(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    data: doc.data()
                }
            )))
        });

    }, [])



    // console.log(user)
    // console.log(post)

    // const sendPost = async (e) => {
    //     e.preventDefault();
    //     //    console.log(post)
    //     if (input) {
    //         await db.collection('posts').add({
    //             name: user.displayName,
    //             discription: user.email,
    //             message: input,
    //             photoURL: user.photoURL || '',
    //             timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
    //             privates: privates
    //         } )
    //         const toasts =  toast.success("Your post is Live Now") 

    //     } else (
    //         toast.info('Your post is empty')
    //     )
    //     setInput("");
    // }


    function ToggleButtonExample() {
        const radios = [
            { name: 'Private', value: 'Private' },
            { name: 'Public', value: 'Public' },
        ];

        return (
            <>

                <ButtonGroup>
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

            const toasts = toast.error("Post delete successfully")

        } else (
            toast.info("you can only delete your post")
        )
    }

    const editPost = async (editDiary) => {

        console.log(editDiary)

        if (user.email === editDiary.data.discription) {
            const message = prompt("Edit your Post");
            if (message) {

                const docRef = doc(db, "posts", editDiary.id);
                const payload = { message, timestamp: serverTimestamp() };

                updateDoc(docRef, payload);

                const toasts = toast.success("Post Edit successfully")
            }
            else (
                toast.error("empty post can't be edit")
            )
        } else (
            toast.error("you can only edit your own post")
        )

    };

    const editPrivacy = async (editDiary) => {

        console.log(editDiary)

        if (user.email === editDiary.data.discription) {
            // const privates = setPrivates(!privates);
            const docRef = doc(db, "posts", editDiary.id);
            const payload = { privates, timestamp: serverTimestamp() };

            updateDoc(docRef, payload);

        } else (
            toast.error("you can only edit your post ")
        )
    };



    function handleImage(e) {
        e.preventDefault();
        let pickedfile;
        if (e.target.files && e.target.files.length > 0) {
            pickedfile = e.target.files[0];
            setSingleImg(pickedfile)

        }
    }

    function uploadImage(e) {
        e.preventDefault();

        //////its not a smart way but i didnt got any other solution /////

        if (input && singleImg) {
            const uploadTask = storage.ref(`SingleImage/${milliseconds}`)
                .put(singleImg)
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    let progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    console.log(progress)
                    setProgress(progress)
                },
                (err) => {
                    console.log(err)
                },
                () => {
                    storage.ref(`SingleImage/${milliseconds}`)
                        .getDownloadURL()
                        .then((imageUrl) => {
                            db.collection('posts')
                                .add({
                                    name: user.displayName,
                                    discription: user.email,
                                    message: input,
                                    photoURL: user.photoURL || '',
                                    timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
                                    privates: privates,
                                    imgUrl: imageUrl || '',
                                })
                        }
                        )
                }
            )
            const toasts = toast.success("Your post is Live Now")
        }
        else if (singleImg) {
            const uploadTask = storage.ref(`SingleImage/${milliseconds}`)
                .put(singleImg)
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    let progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    console.log(progress)
                    setProgress(progress)

                },
                (err) => {
                    console.log(err)
                },
                () => {
                    storage.ref(`SingleImage/${milliseconds}`)
                        .getDownloadURL()
                        .then((imageUrl) => {
                            db.collection('posts')
                                .add({
                                    name: user.displayName,
                                    discription: user.email,
                                    message: input,
                                    photoURL: user.photoURL || '',
                                    timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
                                    privates: privates,
                                    imgUrl: imageUrl || '',
                                })
                        }
                        )
                }
            )
            const toasts = toast.success("Your post is Live Now")

        } else if (input) {
            db.collection('posts')
                .add({
                    name: user.displayName,
                    discription: user.email,
                    message: input,
                    photoURL: user.photoURL || '',
                    timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
                    privates: privates,
                    // imgUrl: imageUrl || ''
                })
            const toasts = toast.success("Your post is Live Now")
        }
        else (toast.info('Your post is empty'))

        setInput("")
        setSingleImg('')
    }




    return (
        <div className='feed'>
            <ToastContainer theme="colored" autoClose={4000} position="bottom-right" />

            <div className='profile__top mb-4'>
                <img src='https://images.pexels.com/photos/273935/pexels-photo-273935.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' alt='' />
                <Avatar className='profile__avatar' src={user ? user.photoURL : null} alt={user ? user.displayName : null} />
                <h2>{user ? user.displayName : null}</h2>
                <h4 >{user ? user.email : null}</h4>
            </div>

            <div className='feed__inputContainer'>
                <div className='feed__input'>
                    <CreateIcon />
                    {/* <form>
                        <input type='text' placeholder='Start a post' value={input} onChange={(e) => setInput(e.target.value)} />
                        <ToggleButtonExample />
                        <button type='submit' onClick={sendPost}>send</button>
                    </form> */}
                    <form >
                        <input type='text' placeholder='Start a post' value={input} onChange={(e) => setInput(e.target.value)} />
                        <div style={{ display: 'none' }}><ToggleButtonExample /></div>
                        <input type='file' onChange={handleImage} className='abc' style={{ display: "none" }} ref={inputUpload} />
                        <SendIcon type='submit' onClick={uploadImage} className='sendicon' />
                        <button type='submit' onClick={uploadImage} style={{ display: "none" }}>send</button>

                    </form>

                </div>

                <div className='feed__inputoptions'>
                    <Inputoption Icon={ImageIcon} title='Photo' color='#70B5F9' onClick={() => { inputUpload.current.click() }} />
                    <Inputoption Icon={SubscriptionsIcon} title='Subscription' color='#E7A33E' />
                    <Inputoption Icon={EventIcon} title='Event' color='#C0CBCD' />
                    <Inputoption Icon={CalendarViewDayIcon} title='Write article' color='#7FC15E' />
                </div>

                {progress > 0 ?
                    //  <progress max="100" value={progress} /> 
                    <ProgressBar >
                        <ProgressBar striped variant="success" now={progress} key={1} />
                        <ProgressBar variant="warning" now={progress} key={2} label={`${progress}%`} />
                        <ProgressBar striped variant="danger" now={progress} key={3} />
                    </ProgressBar>
                    : null}

            </div>

            <div className=''>
                {post.map((elem, ind) => {
                    // console.log(elem)
                    if (user.email === elem.data.discription) {
                        return <div   key={ind} >
                            <Posts
                            onClick={()=>setSelectedImg(elem.data.imgUrl)}
                            key={ind}
                            name={elem.data.name}
                            // description={elem.data.discription}
                            privacy={elem.data.privates}
                            message={elem.data.message}
                            photoUrl={elem.data.photoURL}
                            src={elem.data.imgUrl}
                            Edit={() => { editPost(elem) }}
                            Delete={() => { deletePost(elem) }}
                            Pri={() => { editPrivacy(elem) }}
                        />
                        </div>
                    }
                })}

            </div>

        </div>
    )
}

export default Index