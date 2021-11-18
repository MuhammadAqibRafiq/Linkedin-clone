import { Avatar } from '@material-ui/core'
import React from 'react'
import './sidebar.css'

const sidebar = ({ user }) => {

    return (
        <div className='sidebar'>

            <div className='sidebar__top'>
                <img src='https://images.pexels.com/photos/273935/pexels-photo-273935.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' alt='' />
                <Avatar className='sidebar__avatar' src={user ? user.photoURL : null} alt={user ? user.displayName : null} />
                <h2 style={{textTransform: "capitalize"}} >{user ? user.displayName : null}</h2>
                <h4 style={{ padding: '10px' }}>{user ? user.email : null}</h4>
            </div>

            <div className='sidebar__stats' >

                <div className='sidebar__stat'>
                    <p>who viewed you</p>
                    <p className='sidebar__statnumber'>2,508</p>
                </div>

                <div className='sidebar__stat'>
                    <p>view on post</p>
                    <p className='sidebar__statnumber'>3,215</p>
                </div>
            </div>

            <div className='sidebar__bottom'>
                <p>Recent</p>
                <div className='sidebar__recentitem'>
                    <span className='sidebar__hash'> #</span>
                    <p>react.js</p>
                </div>

                <div className='sidebar__recentitem'>
                    <span className='sidebar__hash'> #</span>
                    <p>gatsby</p>
                </div>

                <div className='sidebar__recentitem'>
                    <span className='sidebar__hash'> #</span>
                    <p>netlify</p>
                </div>

                <div className='sidebar__recentitem'>
                    <span className='sidebar__hash'> #</span>
                    <p>jamstack</p>
                </div>

            </div>

        </div>
    )
}

export default sidebar
