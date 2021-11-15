import React from 'react'
import SearchIcon from '@material-ui/icons/Search';
import Linkedin from '../img/linkedin.png'
import './header.css'
import HeaderOption from './headeroption';
import { SupervisorAccount, Home } from '@material-ui/icons';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import WorkIcon from '@mui/icons-material/Work';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import { logout } from '../../features/userSlice';
import { useDispatch } from 'react-redux';
import { auth } from '../../firebase';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'


const Header = ({ user }) => {

    // console.log(user)
    const dispatch = useDispatch();

    const Logouts = () => {
        dispatch(logout());
        auth.signOut();
    }

    return (

        <Navbar expand="lg" bg="light" sticky="top">

            <Container>

                <Navbar.Brand className='d-flex'>

                    {user ?
                        <>
                          <Link to='/' style={{ textDecoration: "none" }} ><img src={Linkedin} alt='' width='50px' /></Link>
                            <div className='header__search'>
                                <SearchIcon />
                                <input type='text' placeholder='Search...' />
                            </div>
                        </>
                        :
                        <>
                            <Link to='/' style={{ textDecoration: "none" }} >
                                <div className='header__logo'>
                                    Linked
                                </div>
                            </Link>
                            <img src={Linkedin} alt='' width='45px' />

                        </>
                    }

                </Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Navbar.Collapse id="navbarScroll " className='justify-content-end' >
                    {user ?
                        <Nav className='d-flex justify-content-end' >

                           <Nav.Link className='d-flex justify-content-center' as={Link} to="/"><HeaderOption Icon={Home} title='Home' /> </Nav.Link>
                            <HeaderOption Icon={SupervisorAccount} title='My Network' />
                            <HeaderOption Icon={ChatBubbleIcon} title='Chat' />
                            <HeaderOption Icon={WorkIcon} title='Job' />
                            <HeaderOption Icon={NotificationAddIcon} title='Notifications' />


                            <NavDropdown id="collasible-nav-dropdown" title={<HeaderOption avatar={user ? user.photoURL : null} className="jk" title='Me' alt={user ? user.displayName : null} />}  >
                                <HeaderOption avatar={user ? user.photoURL : null} title='Me' alt={user ? user.displayName : null} />
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                                <NavDropdown.Item onClick={Logouts}>Setting</NavDropdown.Item>
                                <NavDropdown.Item onClick={Logouts}>Sign Out</NavDropdown.Item>
                            </NavDropdown>

                        </Nav>
                        :
                        <>
                            <Nav.Link style={{ color: 'black' }} className='header__joinnow' as={Link} to="/signup">JOIN NOW</Nav.Link>
                            <Button style={{ borderRadius: '20px' }} variant="outline-primary" as={Link} to="/login">Sign in</Button>
                        </>
                    }
                </Navbar.Collapse >

            </Container>
        </Navbar>

    )
}
export default Header