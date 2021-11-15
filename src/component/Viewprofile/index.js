import React from 'react'
import Profile from './profile'
import Profilesidebar from './profilesidebar'


const Index = ({user}) => {
    return (
        <div className='d-flex mt-3 justify-content-center'>
            <Profile user={user} />
            <Profilesidebar user={user} />
        </div>
    )
}

export default Index
