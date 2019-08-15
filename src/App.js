import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './pages/home-page/home-page';
import ProfilePage from "./pages/profile-page/profile-page"
import Header from './components/header/header';
import firebase, { initFirebase } from "./components/firebase/firebase.js";
import { Switch, Route } from 'react-router'
import LoginPage from './pages/login-page/login-page';
import { useDispatch, useSelector } from "react-redux";
import PrivateRoute from './components/private-route/private-route';

function App() {

  const dispatch = useDispatch();
  const [firebaseLoaded, setFirebaseLoaded] = useState(false);
  const auth = useSelector(state => state.user)

  useEffect(() => {
    console.log(auth);
    if(auth.firstLoad) {
      setFirebaseLoaded(true);
    }
  }, [auth.user])

  useEffect(() => {
    initFirebase();
    
    firebase.auth().onAuthStateChanged(function(user) {

      dispatch({type: "user/first-load"})

      if(user) {
        dispatch({type: "user/sign-in", 
          payload: {
            user: {
                id: user.uid,
                profilePicture: user.photoURL,
                email: user.email,
                name: user.displayName
            },
          }
        });
      }
    });
  }, []);

  return (
    <>
      <Header firebaseLoaded={firebaseLoaded} />
      {
        !firebaseLoaded 
        ? 
        <></>
        :
        ( 
        <>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <PrivateRoute path="/profile/:id" component={ProfilePage} />
          </Switch>
        </>
      )
    }
    </>
  );
}

export default App;
