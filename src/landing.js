import React from 'react'
import Sidebar from './component/sidebar/sidebar';
import Widget from './component/sidebar/rightsidebar';
import Feed from './component/feed/feed';
import { Link } from 'react-router-dom';

const Landing = ({user}) => {
    return (
        <div className='d-flex' as={Link} to="/">
           
            <Sidebar user={user} />
            <Feed user={user} />
            <Widget user={user} />
            
        </div>
    )
}

export default Landing
