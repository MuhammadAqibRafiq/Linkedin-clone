import { Avatar } from '@material-ui/core'
import React,{useRef, useState} from 'react'
// import '../sidebar/sidebar.css'
import './profile.css'
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import Advertisement from './advertisement.jpg';
import { Tooltip ,Overlay} from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import Linkedin from '../img/linkedin.png'

const Profilesidebar = ({ user  }) => {

    const Tooltips1='See and edit how you look to people who are not signed in, and find you through search engines (ex: Google, Bing).';
    const Tooltips2='Creating a profile in another language makes it easier for local business contacts and recruiters to find you on LinkedIn.';

    return (
        <div className='profilesidebar'>

            <div className='profilesidebar__setting' style={{cursor:'pointer'}}>
                <p>Edit Public Profile and URL <span> <SidebarOverlay Tooltips={Tooltips1} /></span></p>
                <hr />
                <p>Add profile in another language <span><SidebarOverlay Tooltips={Tooltips2} /></span></p>
            </div>

            <div className='profilesidebar__img d-flex justify-content-center'>
                <img src={Advertisement} alt='' className='mt-2' />
            </div>


            <div className='profilesidebar__premium mt-4 mb-4'>

                <p className='mt-4' style={{margin:'12px'}}>Aqib , unlock your full potential with Linkden Premium</p>

               <div className='d-flex'>
                   <Avatar className='sidebar__avatar' style={{marginRight:'15px' , width:'70px' , height:'70px'}} src={user ? user.photoURL : null} alt={user ? user.displayName : null} />
                   <img src={Linkedin} alt='' width='60px' height='65px' />
               </div>

               <p>See who's viewed your profile in las 90 days</p>  
                <Button variant="outline-primary">Try for Free</Button>

            </div>

          

        </div>
    )
}

export default Profilesidebar



function SidebarOverlay({Tooltips}) {
    const [show, setShow] = useState(false);
    const target = useRef(null);
  
    return (
      <>
        <ContactSupportIcon ref={target} onClick={() => setShow(!show)}  />
        <Overlay target={target.current} show={show} placement="right">
          {(props) => (
            <Tooltip id="overlay-example" {...props}>
              {Tooltips}
            </Tooltip>
          )}
        </Overlay>
      </>
    );
  }