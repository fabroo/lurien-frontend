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
  firebase.initializeApp(JSON.parse(process.env.REACT_APP_FIREBASE))
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
