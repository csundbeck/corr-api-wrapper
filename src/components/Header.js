import React from 'react'
import { AppBar } from '@material-ui/core'
import Button from '@material-ui/core/Button';

require('dotenv').config();

const logout = () => {
    document.cookie = "loggedIn=";
    window.location.replace("/Login")
}

const rtnHome = () => {
  //window.location.replace("/Home");
  console.log(process.env.REACT_APP_ALIAS_NAME);
}

const getCookie = (cookieName) => {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

let cval = getCookie("loggedIn");

const Header = () => {
    return (
        <AppBar style={{backgroundColor: '#0000AE'}}>
            <h1 style={{margin: "1% auto"}}>CORRIDOR API Wrapper</h1>
            <div className='headerBtnDiv'>
              <Button id="homeBtn" style={{display: cval=true ? 'flex' : 'none'}} onClick={rtnHome}>Home</Button>
              <Button id="logoutBtn" style={{display: cval=true ? 'flex' : 'none'}} onClick={logout}>Logout</Button>
            </div>
        </AppBar>
    )
}

export default Header