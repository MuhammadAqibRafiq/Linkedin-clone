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


const Post = ({ name, privacy, message, photoUrl, Edit, Delete, Pri, src, onClick, comEdit, comDelete ,elem }) => {

    const [privates, setPrivates] = useState('Public');

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
                <Inputoption Icon={ThumbUpOffAltIcon} title='like' color='gray' />
                <Inputoption Icon={CommentIcon} title='coment' color='gray' />
                <Inputoption Icon={ShareIcon} title='share' color='gray' />
                <Inputoption Icon={SendIcon} title='send' color='gray' />
            </div> */}


            <Comment photoUrl={photoUrl} elem={elem}/>


        </div>
    )
}


export default Post