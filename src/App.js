import React,{useContext} from 'react';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
// import Home from './Components/Home';
import Upload from './Components/Upload';
import Profile from './Components/Profile';
import Register from './Components/Register';
import Admin  from './Components/Admin';
import Mod  from './Components/Mod';
import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { AuthContext } from './Context/AuthContext';
 
function App() {
const {dark,open2,setOpenn} = useContext(AuthContext);

  return (
    <Router onClick={() => {
      if (open2) {
          setOpenn(false)
      console.log("deja de tocarme")

      }
  }}>
      <Navbar/>
      {/* <Route exact path="/" component={Home}/> */}
      <UnPrivateRoute exact path="/login" component={Login}/>
      <UnPrivateRoute path="/register" component={Register}/>
      <PrivateRoute path="/admin" roles={["admin","mod"]} component={Admin}/>
      <PrivateRoute path="/mod" roles={["mod"]} component={Mod}/>
      <PrivateRoute path="/upload" roles={["user","admin","mod"]} component={Upload}/>
      <PrivateRoute path="/profile" roles={["user","admin","mod"]} component={Profile}/>
    </Router>
  );
}

export default App;
