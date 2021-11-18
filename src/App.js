import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './component/header/header';
import { login, logout, selectUser } from './features/userSlice';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import Login from './component/login/login'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from './component/signup/signup'
import ViewProfile from './component/Viewprofile/profile';
import Landing from './landing';
import Modal from './component/modal/modal'

const App = () => {

  const [selectedImg, setSelectedImg] = useState(null)

  const user = useSelector(selectUser);
  const dispatch = useDispatch()
  // console.log(user)

  useEffect(() => {
    auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        dispatch(login({
          email: userAuth.email,
          uid: userAuth.uid,
          displayName: userAuth.displayName,
          photoURL: userAuth.photoURL
        }))
      }
      else { dispatch(logout()) };
    })
  }, [])

  console.log(selectedImg)
  return (

    <Router>
      <div className="App">

        <Header user={user} />

        <div className="App__body container py-2">

          {!user ?
            <>
              <Routes>
                <Route exact path='/' element={<Login />} user={user} />
                <Route path='/signup' element={<Signup />} user={user} />
                <Route exact path='/login' element={<Login />} user={user} />
                <Route path='/profile' element={<ViewProfile user={user} />} />

              </Routes>
            </>
            :
            <>
              <Routes>
                <Route path='/profile' element={<ViewProfile user={user} setSelectedImg={setSelectedImg} />} />
                <Route exact path='/' element={<Landing user={user} setSelectedImg={setSelectedImg} />} />
                <Route path='/signup' element={<Signup />} user={user} />
              </Routes>
              {selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />}
            </>
          }
        </div>
      </div>
    </Router>
  );
}

export default App;
