import React from 'react';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Home from './Components/Home';
import Upload from './Components/Upload';
import Profile from './Components/Profile';
import Register from './Components/Register';
import Admin  from './Components/Admin';
import Mod  from './Components/Mod';
import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
global.XMLHttpRequest = require("xhr2");
 
const App= ()=> {
  var firebaseConfig = {
    apiKey: "AIzaSyBvvZR8bjCKg8kGxXviw43j_iv2Kp3Zgtw",
    authDomain: "test-lurien.firebaseapp.com",
    databaseURL: "https://test-lurien.firebaseio.com",
    projectId: "test-lurien",
    storageBucket: "test-lurien.appspot.com",
    messagingSenderId: "973221769406",
    appId: "1:973221769406:web:2653edd347f49bda3ceeef",
    measurementId: "G-HJ0BJ08H7L"
  };
  firebase.initializeApp(firebaseConfig)
  return (
    <>

    <Router>
      <Navbar/>

      <Route exact path="/" component={Home}/>
      <UnPrivateRoute  path="/login" component={Login}/>
      <UnPrivateRoute path="/register" component={Register}/>
      <PrivateRoute path="/admin" roles={["admin","mod","manager"]} component={Admin}/>
      <PrivateRoute path="/mod" roles={["mod"]} component={Mod}/>
      <PrivateRoute path="/upload" roles={["user","admin","mod","manager"]} component={Upload}/>
      <PrivateRoute path="/profile" roles={["user","admin","mod","manager"]} component={Profile}/>
    </Router>
</>
  );
}

export default App;
