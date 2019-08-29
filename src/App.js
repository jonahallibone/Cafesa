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
import ShopPage from './pages/shop-page/shop-page';

function App() {

  const dispatch = useDispatch();
  const [firebaseLoaded, setFirebaseLoaded] = useState(false);
  const auth = useSelector(state => state.user);

  useEffect(() => {
    if(auth.firstLoad) {
      setFirebaseLoaded(true);
    }
  }, [auth])

  useEffect(() => {
    initFirebase();
    
    firebase.auth().onAuthStateChanged(function(user) {

      dispatch({type: "user/first-load"});
      dispatch({type: "shops/get-all-shops"});
      
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
            <Route path="/shop/:id" component={ShopPage} />
            <PrivateRoute path="/profile/:id" component={ProfilePage} />
          </Switch>
        </>
      )
    }
    </>
  );
}

export default App;
