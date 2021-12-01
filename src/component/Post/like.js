import React, { useState, useEffect, useRef } from 'react'
import { ButtonGroup, ToggleButton } from 'react-bootstrap'
import Inputoption from '../feed/inputoption'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import SendIcon from '@mui/icons-material/Send';
import PostDropdown from './postdropdown'
import Commentdropdown from './commentdropdown';
import CreateIcon from '@material-ui/icons/Create'
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { db } from '../../firebase'
import firebase from 'firebase/compat/app';
import { ToastContainer, toast } from 'react-toastify';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { updateDoc, doc, deleteDoc, serverTimestamp } from "firebase/firestore";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import FavoriteIcon from '@mui/icons-material/Favorite';



const Likes = ({ elem, setLikelength ,setLike , like , likeHandler}) => {

    const user = useSelector(selectUser);

    const [checked, setChecked] = useState(true);
    // const [like, setLike] = useState('');
    // const inputUpload = useRef();
    // const [likelength, setLikelength] = useState('')


    useEffect(() => {
        db.collection('posts').doc(elem.id).collection("Likes").orderBy("timeStamp", "desc").onSnapshot(snapshot => {
            setLike(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    data: doc.data()
                }

            )))
            setLikelength(snapshot.size);
        });

    }, [])


    // function likeHandler(likeValue) {
    //     setChecked(!checked);
    //     if (checked === true) {
    //         db.collection('posts').doc(likeValue.id).collection("Likes").doc(user.email)
    //             .set({
    //                 name: user.displayName,
    //                 discription: user.email,
    //                 like: checked,
    //                 photoURL: user.photoURL || '',
    //                 timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
    //             })
    //     } else if (checked === false) {
    //         const docRef = firebase.firestore().collection("posts").doc(elem.id).collection("Likes");
    //         // delete the document
    //         docRef.doc(user.email).delete();
    //     }

    //     console.log(likeValue)
    // }


    // console.log(checked)
    return (
        <>
            {/* {like && like.map((a, i) => {
                console.log(a)
                console.log(a.data.discription)
                console.log(user.email)

                if(a.data.discription === user.email){
                return <div>{a.data.name} <Inputoption Icon={ThumbUpOffAltIcon} title='like' color='blue' onClick={likeHandler} /> </div>
            }
            else { return  <div> <Inputoption Icon={ThumbUpOffAltIcon} title='like' color='green' onClick={likeHandler} /> </div>}


            }
            )
            } */}


        </>

    )
}

export default Likes