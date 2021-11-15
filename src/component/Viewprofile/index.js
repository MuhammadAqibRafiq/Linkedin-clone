import React, { useState, useEffect } from 'react'
import './profile.css';
import '../feed/feed.css'
import CreateIcon from '@material-ui/icons/Create'
import Inputoption from '../feed/inputoption'
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
// import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { ButtonGroup, ToggleButton } from 'react-bootstrap'
import { Avatar } from '@material-ui/core'


const Index = ({ user }) => {

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

            <div className='profile__top mb-4'>
                 <img src='https://images.pexels.com/photos/273935/pexels-photo-273935.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' alt='' />
                 <Avatar className='profile__avatar' src={user ? user.photoURL : null} alt={user ? user.displayName : null} />
                <h2>{user ? user.displayName : null}</h2>
                <h4 >{user ? user.email : null}</h4>
            </div>

            <div className='feed__inputContainer'>
                <div className='feed__input'>
                    <CreateIcon />
                    <form>
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

            <div className=''>
                {post.map((elem, ind) => {
                    // console.log(elem)
                    if (user.email === elem.data.discription) {
                        return <Posts
                            key={ind}
                            name={elem.data.name}
                            // description={elem.data.discription}
                            privacy={elem.data.privates}
                            message={elem.data.message}
                            photoUrl={elem.data.photoURL}
                            Edit={() => { editPost(elem) }}
                            Delete={() => { deletePost(elem) }}
                            Pri={() => { editPrivacy(elem) }}
                        />

                        
                    }
                })}

            </div>

        </div>
    )
}

export default Index
















// import React, { useState, useEffect } from 'react'
// import '../feed/feed.css';
// import './profile.css'
// import CreateIcon from '@material-ui/icons/Create'
// import Inputoption from '../feed/inputoption'
// import ImageIcon from '@mui/icons-material/Image';
// import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
// import EventIcon from '@mui/icons-material/Event';
// import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
// import Posts from '../Post/Post';
// import { db } from '../../firebase'
// import firebase from 'firebase/compat/app';
// import {
//     updateDoc,
//     doc,
//     deleteDoc,
//     serverTimestamp,
// } from "firebase/firestore";
// import { Avatar } from '@material-ui/core'
// import { ButtonGroup, ToggleButton } from 'react-bootstrap'


// const Profile = ({ user }) => {

//     const [input, setInput] = useState('');
//     const [post, setPost] = useState([]);
//     const [privates, setPrivates] = useState('true');



//     useEffect(() => {
//         db.collection('posts').orderBy("timeStamp", "desc").onSnapshot(snapshot => {
//             setPost(snapshot.docs.map(doc => (
//                 {
//                     id: doc.id,
//                     data: doc.data()
//                 }
//             )))
//         })

//     }, [])



//     // console.log(user)
//     // console.log(post)

//     const sendPost = async (e) => {
//         e.preventDefault();
//         //    console.log(post)
//         await db.collection('posts').add({
//             name: user.displayName,
//             discription: user.email,
//             message: input,
//             photoURL: user.photoURL || '',
//             timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
//             privates: privates

//         });
//         setInput()
//     }

//     const deletePost = async (deleteDiary) => {
//         // console.log('Delete', deleteDiary.data.discription);
//         // console.log('Delete', user.email);
//         if (user.email === deleteDiary.data.discription) {

//             const docRef = doc(db, "posts", deleteDiary.id);
//             await deleteDoc(docRef);

//         } else {
//             return alert("you can only delete your post")
//         }
//     }

//     const editPost = async (editDiary) => {

//         console.log(editDiary)

//         if (user.email === editDiary.data.discription) {
//             const message = prompt("Edit your Post");
//             if (message) {

//                 const docRef = doc(db, "posts", editDiary.id);
//                 const payload = { message, timestamp: serverTimestamp() };

//                 updateDoc(docRef, payload);
//             }
//             else { return alert("Post is empty") }

//         } else {
//             return alert("you can only edit your post ")
//         }

//     };


//     const editPrivacy = async (editDiary) => {

//         console.log(editDiary)

//         if (user.email === editDiary.data.discription) {
//             // const privates = setPrivates(!privates);
//                 const docRef = doc(db, "posts", editDiary.id);
//                 const payload = { privates, timestamp: serverTimestamp() };

//                 updateDoc(docRef, payload);

//         } else {
//             return alert("you can only edit your post ")
//         }

//     };


//     function ToggleButtonExample() {
//         const radios = [
//             { name: 'Private', value: 'false' },
//             { name: 'Public', value: 'true' },
//         ];

//         return (
//             <>

//                 <ButtonGroup>
//                     {radios.map((radio, idx) => (

//                         <ToggleButton
//                             key={idx}
//                             id={`radio-${idx}`}
//                             type="radio"
//                             variant={idx % 2 ? 'outline-success' : 'outline-danger'}
//                             name="radio"
//                             value={radio.value}
//                             checked={privates === radio.value}
//                             onChange={(e) => setPrivates(e.currentTarget.value)}
//                         >
//                             {radio.name}
//                         </ToggleButton>
//                     ))}
//                 </ButtonGroup>
//             </>
//         );
//     }


//     return (
//         <div className='feed'>

//             <div className='profile__top mb-4'>
//                 <img src='https://images.pexels.com/photos/273935/pexels-photo-273935.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' alt='' />
//                 <Avatar className='profile__avatar' src={user ? user.photoURL : null} alt={user ? user.displayName : null} />
//                 <h2>{user ? user.displayName : null}</h2>
//                 {/* <h4 style={{ padding: '10px' }}>{user ? user.email : null}</h4> */}
//             </div>


//             <div className='feed__inputContainer'>
//                 <div className='feed__input'>
//                     <CreateIcon />
//                     <form>
//                         <input type='text' placeholder='Start a post' onChange={(e) => setInput(e.target.value)} />
//                         <button type='submit' onClick={sendPost}>send</button>
//                     </form>
//                 </div>

//                 <div className='feed__inputoptions'>
//                     <Inputoption Icon={ImageIcon} title='Photo' color='#70B5F9' />
//                     <Inputoption Icon={SubscriptionsIcon} title='Subscription' color='#E7A33E' />
//                     <Inputoption Icon={EventIcon} title='Event' color='#C0CBCD' />
//                     <Inputoption Icon={CalendarViewDayIcon} title='Write article' color='#7FC15E' />

//                 </div>

//             </div>

//             <div className=''>
//                 {post.map((elem, ind) => {
//                     // console.log(elem)
//                     if (user.email === elem.data.discription) {
//                         return <><Posts key={ind}
//                             name={elem.data.name}
//                             // description={elem.data.discription}
//                         description={elem.data.privates}

//                             message={elem.data.message}
//                             photoUrl={elem.data.photoURL}
//                             Edit={() => { editPost(elem) }}
//                             Delete={() => { deletePost(elem) }}
//                             Pri={()=>{editPrivacy(elem) }}
//                         />

//                     <div onClick={()=>{editPrivacy(elem) }}><ToggleButtonExample  /></div>

//                     </>

//                     }
//                 })}

//             </div>

//         </div>
//     )
// }

// export default Profile