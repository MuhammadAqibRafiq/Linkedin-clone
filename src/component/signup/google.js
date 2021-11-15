import { Avatar } from '@material-ui/core'
import React from 'react'


const GoogleButton = ({ title, avatar, alt }) => {

    return (
        <div className='googleheaderoption'>
            {avatar && <Avatar className='googleheaderoption__icon' src={avatar} alt={alt} />}
            <h4 className='googleheaderoption__title' >{title}</h4>
        </div>
    )
}

export default GoogleButton