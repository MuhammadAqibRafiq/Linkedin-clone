import React from 'react'
import Profiles from './index.js'
import Profilesidebar from './profilesidebar'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button'


const Profile = ({ user ,setSelectedImg }) => {

    const navigate = useNavigate();

    const loginpage = () => {
        navigate('/')
    }

    return (
        <div className='d-flex mt-3 justify-content-center'>
            {user ?
                <>
                    <Profiles user={user} setSelectedImg={setSelectedImg}/>
                    <Profilesidebar user={user} />
                </>
                :
                <div>
                    <h4>First you have to login then proceed further</h4>
                   <div className='d-flex justify-content-center'> <Button onClick={loginpage}>Login Page</Button> </div>
                </div>
            }
        </div>
    )
}

export default Profile
