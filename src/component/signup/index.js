import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { login } from '../../features/userSlice';
import { auth } from '../../firebase'
import './signup.css'
import { Button } from "react-bootstrap"
import GoogleButton from './google';
import Google from './google.png';
import { Link } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Index = () => {


    const [fullname, setFullname] = useState('');
    const [photo, setPhoto] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const register = async () => {
        if (!fullname) {
            toast.error('Fullname is necessary', {
                autoClose: 5000,
            })
        }
        try {
       await auth.createUserWithEmailAndPassword(email, password)
            .then((userAuth) => {
                userAuth.user.updateProfile({
                    displayName: fullname,
                    photoURL: photo
                })
                    .then(() => {
                        dispatch(login({
                            uid: userAuth.uid,
                            email: userAuth.user.email,
                            displayName: userAuth.user.displayName,
                            photoURL: userAuth.user.photoURL,
                        }))
                    })
            })
<<<<<<< HEAD
             navigate('/');
            const toasts =  toast.success('Sign Up Succesfully', {
                autoClose: 5000,
            })
        }
            catch (error) {
                toast.error(error.message, {
                    theme: "colored",
                    autoClose: 4000
                });
            };

           
=======
            .catch((error) => alert(error));

         navigate('/')

>>>>>>> 849f34c69324ed33de8602ae459a38302e42d6d7
    }

    const signInwithgoogle = () => {

        const provider = new GoogleAuthProvider();

        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
            navigate('/')
            const toasts =  toast.success('Login Succesfully', {
                autoClose: 5000,
            })
    }

    return (
        <div className='signup'>
            
            <ToastContainer />

            <div className='signup__inputcontainer'>

                <input placeholder='FullName(required if registering)' type='text' value={fullname} onChange={e => { setFullname(e.target.value) }} />


                <input placeholder='Photo(optional)' type='picture' value={photo} onChange={e => { setPhoto(e.target.value) }} />


                <input placeholder='Email' type='email' value={email} onChange={e => { setEmail(e.target.value) }} />


                <input placeholder='Password' type='password' value={password} onChange={e => { setPassword(e.target.value) }} />

                <p>
                    By clicking Agree & Join, you agree to the LinkedIn
                    <span style={{ color: "#0b67c3", fontWeight: "600" }}>
                        <a href='https://www.linkedin.com/legal/user-agreement?trk=homepage-basic_join-form-user-agreement' target="_blank" rel="noopener noreferrer"> User Agreement,</a>
                        <a href='https://www.linkedin.com/legal/privacy-policy?trk=homepage-basic_join-form-privacy-policy' target="_blank" rel="noopener noreferrer"> Privacy Policy,</a>
                    </span> and <span style={{ color: "#0b67c3", fontWeight: "600" }}>
                        <a href='https://www.linkedin.com/legal/cookie-policy?trk=homepage-basic_join-form-cookie-policy' target="_blank" rel="noopener noreferrer">Cookie Policy.</a></span>
                </p>

                <Button onClick={register} className="abhire-btn" style={{ borderRadius: "20px" }} target="_blank" >Agree & Join</Button>
                <br />

                <Button variant="outline-primary" onClick={signInwithgoogle} style={{ borderRadius: "20px" }} target="_blank" ><GoogleButton avatar={Google} title='Join with Google' /></Button>

                <p className='d-flex justify-content-center'>Already on Linkedin ?<Link to='/login'><span style={{ color: "#0b67c3", fontWeight: "600", marginLeft: '5px' }}>Sign in </span></Link></p>

            </div>

        </div>
    )

}

export default Index