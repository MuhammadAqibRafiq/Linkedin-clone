import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CreateIcon from '@mui/icons-material/Create';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


const Commentdropdown = ({ comEdit, comDelete }) => {


    return (
        <div>
            <DropdownButton id="dropdown-item-button" title={<MoreHorizIcon />}   >
                <Dropdown.Item as="button" onClick={comEdit}><CreateIcon />Edit</Dropdown.Item>
                <Dropdown.Item as="button" onClick={comDelete}><DeleteOutlineIcon />Trash</Dropdown.Item>
            </DropdownButton>
        </div>
    )
}

export default Commentdropdown