import React from 'react'
import './feed.css'

const Inputoption = ({Icon , title , color , onClick}) => {
    return (
        <div className='inputoption'>
            <Icon style={{color:color}} />
            <h4>{title}</h4>
        </div>
    )
}

export default Inputoption
