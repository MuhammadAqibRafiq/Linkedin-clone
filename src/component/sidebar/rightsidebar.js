import React from 'react';
import './rightsidebar.css'
import Advertisement from './advertisement.jpg';
import PeopleIcon from '@mui/icons-material/People';
import ContactsIcon from '@mui/icons-material/Contacts';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import GroupsIcon from '@mui/icons-material/Groups';
import EventIcon from '@mui/icons-material/Event';
import PagesIcon from '@mui/icons-material/Pages';

const Rightsidebar = () => {

    return (
        <div className='Rightsidebar'>

            <div className='Rightsidebar__stats' >
                <h5 className='mb-4'>Manage my network</h5>
              
                <div className='Rightsidebar__stat'>
                    <p><PeopleIcon />Connetions</p>
                    <p className='Rightsidebar__statnumber'>500</p>
                </div>

                <div className='Rightsidebar__stat'>
                    <p><ContactsIcon />Contacts</p>
                    <p className='Rightsidebar__statnumber'>200</p>
                </div>

                <div className='Rightsidebar__stat'>
                    <p><PeopleOutlineIcon />People | Follow</p>
                    <p className='Rightsidebar__statnumber'>1010</p>
                </div>

                <div className='Rightsidebar__stat'>
                    <p><GroupsIcon />Groups</p>
                    <p className='Rightsidebar__statnumber'>50</p>
                </div>

                <div className='Rightsidebar__stat'>
                    <p><EventIcon />Events</p>
                    <p className='Rightsidebar__statnumber'></p>
                </div>

                <div className='Rightsidebar__stat'>
                    <p><PagesIcon />Pages</p>
                    <p className='Rightsidebar__statnumber'>10</p>
                </div>

                <div className='Rightsidebar__stat'>
                    <p>Newsletters</p>
                    <p className='Rightsidebar__statnumber'></p>
                </div>

                <div className='Rightsidebar__stat'>
                    <p>Hashtags</p>
                    <p className='Rightsidebar__statnumber'></p>
                </div>

            </div>
            <hr />
            <div className='profilesidebar__img'>
                <img src={Advertisement} alt='' className='mt-2' />
            </div>

        </div>
    )
}

export default Rightsidebar
