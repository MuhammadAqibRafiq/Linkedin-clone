import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CreateIcon from '@mui/icons-material/Create';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import { ButtonGroup, ToggleButton } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';

const Postdropdown = ({ Edit, Delete, Pri, elem }) => {
    const user = useSelector(selectUser);

    const [privates, setPrivates] = useState("Public");

    function ToggleButtonExample() {

        const radios = [
            { name: 'Private', value: 'Private' },
            { name: 'Public', value: 'Public' },
        ];

        return (
            <>

                <ButtonGroup>
                    {radios.map((radio, idx) => (

                        <ToggleButton
                            key={idx}
                            id={`radio-${idx}`}
                            type="radio"
                            variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                            name="radio"
                            value={radio.value}
                            checked={privates === radio.value}
                            onChange={(e) => setPrivates(e.currentTarget.value)}
                            onClick={Pri}
                        >
                            {radio.name}
                        </ToggleButton>
                    ))}
                </ButtonGroup>
            </>
        );

    }
    //  console.log(privates)

    // console.log(pri)
    return (
        <div>    {user.email === elem.data.discription ? <DropdownButton id="dropdown-item-button" title={< ArrowDropDownCircleIcon />}   >
            <Dropdown.Item as="button" onClick={Edit}><CreateIcon />Edit post</Dropdown.Item>
            <Dropdown.Item as="button" onClick={Delete}><DeleteOutlineIcon /> Trash</Dropdown.Item>
            <Dropdown.Item as="button" ><ToggleButtonExample /></Dropdown.Item>
        </DropdownButton> : null}

        </div>
    )
}

export default Postdropdown