import React from 'react'
import './feed.css'

const Inputoption = ({Icon , title , color , onClick ,background}) => {
    return (
        <div className='inputoption' onClick={onClick} >

            <Icon style={{color:color,background:background}}  />
            <h4 >{title} </h4>
        </div>
    )
}

export default Inputoption
