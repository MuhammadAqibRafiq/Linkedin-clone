import { Avatar } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import './post.css'
import Inputoption from '../feed/inputoption'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import SendIcon from '@mui/icons-material/Send';
import PostDropdown from './postdropdown'
import { ButtonGroup, ToggleButton } from 'react-bootstrap'
import Commentdropdown from './commentdropdown';
import CreateIcon from '@material-ui/icons/Create'
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { db } from '../../firebase'
import firebase from 'firebase/compat/app';
import { ToastContainer, toast } from 'react-toastify';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { updateDoc, doc, deleteDoc, serverTimestamp } from "firebase/firestore";


const Coment = ({ name, privacy, message, photoUrl, Edit, Delete, Pri, src, onClick, comEdit, comDelete, elem }) => {

    const user = useSelector(selectUser);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState('');
    const [showComment, setShowComment] = useState(false);


    useEffect(() => {
        db.collection('posts').doc(elem.id).collection("Comments").orderBy("timeStamp", "desc").onSnapshot(snapshot => {
            setComments(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    data: doc.data()
                }
            )))
        });

    }, [])


    const comentHandler = (comValue) => {
        console.log(comValue.data)
        if (comment) {
            db.collection('posts').doc(comValue.id).collection("Comments")
                .add({
                    name: user.displayName,
                    discription: user.email,
                    comment: comment,
                    photoURL: user.photoURL || '',
                    timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
                })
        } else (alert("comment box is empty"))
        setComment('')
    }



    const deleteComment = async (comValue) => {

        const docRef = firebase.firestore().collection("posts").doc(elem.id).collection("Comments");
        // delete the document
        await docRef.doc(comValue.id).delete();

    }

    const editComment = async (comValue) => {

        // console.log(comValue)
        const comment = prompt("Edit your Post");
        if (comment) {

            const docRef = firebase.firestore().collection("posts").doc(elem.id).collection("Comments").doc(comValue.id);

            const payload = { comment, timestamp: serverTimestamp() };

            updateDoc(docRef, payload);

        }
        else (alert('Comment is empty'))

    };


    return (
        <div className='comment'>
            <ToastContainer theme="colored" autoClose={4000} position="bottom-right" />

            <div className='post__button'>
                <Inputoption Icon={ThumbUpOffAltIcon} title='like' color='gray' />
                <Inputoption Icon={CommentIcon} title='coment' color='gray' onClick={() => setShowComment(!showComment)} />
                <Inputoption Icon={ShareIcon} title='share' color='gray' />
                <Inputoption Icon={SendIcon} title='send' color='gray' />
            </div>

            {showComment ?

                <div className='feed__inputContainer'>

                    <div className='feed__input'>
                        <CreateIcon />
                        <form type="submit" >
                            <input type='text' placeholder='Add a comment...' value={comment} onChange={(e) => setComment(e.target.value)} />
                        </form>

                        <div style={{ cursor: 'pointer' }}>
                            <AddCommentIcon onClick={() => { comentHandler(elem) }} />
                        </div>

                    </div>

                </div>
                : null}

            {
                comments && comments.map((com, ind) => {
                    console.log(ind)
                    return <div className='post__header' key={ind} >
                        {showComment ?
                            <>
                                <div className='d-flex'>
                                    <Avatar src={com.data.photoURL} />
                                    <div className='post__info'>
                                        <h2 style={{ textTransform: "capitalize" }}>{com.data.name}  </h2>
                                        <p>{com.data.comment}</p>
                                    </div>
                                </div>

                                <div>
                                    {user.email === com.data.discription && elem ?
                                        <Commentdropdown comEdit={() => { editComment(com) }} comDelete={() => { deleteComment(com) }} />
                                        :  null }
                                </div>
                            </>

                            : null }
                    </div>
                })
            }

        </div>

    )
}


export default Coment
