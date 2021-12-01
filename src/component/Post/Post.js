import { Avatar } from '@material-ui/core'
import React, { useState } from 'react'
import './post.css'
import Inputoption from '../feed/inputoption'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import SendIcon from '@mui/icons-material/Send';
import PostDropdown from './postdropdown'
import { ButtonGroup, ToggleButton } from 'react-bootstrap'
import Comment from './comment';
import Likes from './like';


import { db } from '../../firebase'
import firebase from 'firebase/compat/app';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';


const Post = ({ name, privacy, message, photoUrl, Edit, Delete, Pri, src, onClick, elem }) => {

    const [privates, setPrivates] = useState('Public');


    const user = useSelector(selectUser);
    const [checked, setChecked] = useState(true);
    const [likelength, setLikelength] = useState('')
    // const [like, setLike] = useState('');


    const [like, setLike] = useState('');
    function likeHandler(likeValue) {
        setChecked(!checked);
        if (checked === true) {
            db.collection('posts').doc(likeValue.id).collection("Likes").doc(user.email)
                .set({
                    name: user.displayName,
                    discription: user.email,
                    like: checked,
                    photoURL: user.photoURL || '',
                    timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
                })
        } else if (checked === false) {
            const docRef = firebase.firestore().collection("posts").doc(elem.id).collection("Likes");
            // delete the document
            docRef.doc(user.email).delete();
        }

        // setChecked('')
        // console.log(likeValue)
    }





    return (
        <div className='post'>


            <div className='post__header'>

                <div className='d-flex'>
                    <Avatar src={photoUrl} />
                    <div className='post__info'>
                        <h2 style={{ textTransform: "capitalize" }}>{name}</h2>
                        <p>{privacy}</p>
                    </div>
                </div>

                <div>
                    <PostDropdown Edit={Edit} Delete={Delete} Pri={Pri} elem={elem} />
                </div>
            </div>

            <div className='post__body'>
                <p>{message}</p>
                <div className='d-flex' onClick={onClick}>
                    <img width='100%' src={src} onError={(event) => event.target.removeAttribute('src')} style={{ cursor: 'pointer' }} />
                    {/* <img width='100%' src={src} onError={(event) => event.target.removeAttribute('src')} /> */}
                </div>
            </div>

            {/* <div className='post__button'>
                <Inputoption Icon={ThumbUpOffAltIcon} title='like' color='gray' onClick={()=>{likeHandler(elem)}} />
                <Inputoption Icon={CommentIcon} title='coment' color='gray' />
                <Inputoption Icon={ShareIcon} title='share' color='gray' />
                <Inputoption Icon={SendIcon} title='send' color='gray' />
            </div> */}


            <Comment photoUrl={photoUrl} elem={elem} likeHandler={() => { likeHandler(elem) }} likelength={likelength}  like={like}  setLike={setLike} setLikelength={setLikelength} />
            <Likes elem={elem} setLikelength={setLikelength} setLike={setLike} like={like}  likeHandler={() => { likeHandler(elem) }} />

        </div>
    )
}


export default Post