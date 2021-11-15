import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../features/userSlice';
import { auth} from '../../firebase';
import './login.css';
import { Container, Row, Col, Button } from "react-bootstrap";
import AboutLeft from './pic.svg';
import {useNavigate} from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const logintoapp = async (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password).then(userAuth => {
            dispatch(login({
                uid: userAuth.uid,
                email: userAuth.user.email,
                displayName: userAuth.user.displayName,
                photoURL: userAuth.user.photoURL,
            }))
        })
        navigate('/')

    }

    return (
 
        <Container className="py-5" >
            <Row >

                <Col>
                    <h3 className='about-title' style={{ fontSize: "56px", fontWeight: '200' }}>Welcome to your</h3>
                    <h3 className='about-title' style={{ fontSize: "56px", fontWeight: '200' }}>professional community</h3>

                    <input placeholder='Email Address' type='email' value={email} onChange={e => { setEmail(e.target.value) }} style={{ width: "80%", height: "48px" }} />

                    <br />
                    <br />

                    <input placeholder='Password (6 + Characters)' type='password' value={password} onChange={e => { setPassword(e.target.value) }} style={{ width: "80%", height: "48px" }} />

                    <br />
                    <br />
                    <p>By clicking Agree & Join, you agree to the LinkedIn  
                        <span style={{ color: "#0b67c3", fontWeight: "600" }}>
                            <a href='https://www.linkedin.com/legal/user-agreement?trk=homepage-basic_join-form-user-agreement' target="_blank" rel="noopener noreferrer"> User Agreement,</a>
                            <a href='https://www.linkedin.com/legal/privacy-policy?trk=homepage-basic_join-form-privacy-policy' target="_blank" rel="noopener noreferrer"> Privacy Policy,</a>
                        </span> and <span style={{ color: "#0b67c3", fontWeight: "600" }}>
                            <a href='https://www.linkedin.com/legal/cookie-policy?trk=homepage-basic_join-form-cookie-policy' target="_blank" rel="noopener noreferrer">Cookie Policy.</a></span></p>

                    <Button onClick={logintoapp} className="abhire-btn" style={{ width: "80%", borderRadius: "20px" }} target="_blank" >Agree & Join</Button>


                </Col>

                <Col className='colabout pt-4 d-flex align-content-center'> <img src={AboutLeft} alt='' /></Col>

            </Row>

        </Container>

    )
}

export default Login
