import React, { useEffect } from 'react';
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

const App = () => {

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


  return (

    <Router>
      <div className="App">

        <Header user={user} />

        <div className="App__body container py-2">

          {!user ?
            <>
              <Routes>
                <Route exact path='/' element={<Login />} user={user} />
                <Route  path='/signup' element={<Signup />} user={user} />
                <Route exact path='/login' element={<Login />} user={user} />
                <Route path='/profile' element={<ViewProfile user={user} />}  />

              </Routes>
            </>
            :
           
              <Routes>
                <Route path='/profile' element={<ViewProfile user={user} />}  />
                <Route exact path='/' element={<Landing user={user} />}  />
                <Route  path='/signup' element={<Signup />} user={user} />

               </Routes>  
      
          }
        </div>
      </div>
    </Router>
  );
}

export default App;
