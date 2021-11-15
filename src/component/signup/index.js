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

const Index = () => {


    const [fullname, setFullname] = useState('');
    const [photo, setPhoto] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const register = () => {
        if (!fullname) {
            return alert("Enter a fullname")
        }
        auth.createUserWithEmailAndPassword(email, password)
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
            .catch((error) => alert(error));
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
    }

    return (
        <div className='signup'>
            {/* <div className='d-flex justify-content-center'><h4>Make the most of your professional life</h4></div> */}

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