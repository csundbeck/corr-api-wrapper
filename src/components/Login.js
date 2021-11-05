import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

require('dotenv').config();

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      //***API USER CREDENTIALS BEGIN***//
      Company: '',
      AliasName: process.env.REACT_APP_ALIAS_NAME,
      LoginID: process.env.REACT_APP_LOGIN_ID,
      LoginPassword: process.env.REACT_APP_LOGIN_PASSWORD,
      //***API USER CREDENTIALS END***//
  } 
}

  handleChangeAlias = (event) => {
    event.preventDefault();
    this.setState({
      ...this.state,
      AliasName: event.target.value.toUpperCase()
    });
    console.log(this.state)
  };

  handleChangeCompany = (event) => {
    event.preventDefault();
    let val = event.target.value
    this.setState({
      ...this.state,
      Company: val.replace(/\s/g, '')
    });
    console.log(this.state);
  };

  handleChangeLoginID = (event) => {
    event.preventDefault();
    this.setState({
      ...this.state,
      LoginID: event.target.value.toUpperCase(),
    });
    console.log(this.state)
  };

  handleChangePassword= (event) => {
    event.preventDefault();
    this.setState({
      ...this.state,
      LoginPassword: event.target.value
    });
    console.log(this.state)
  };

  login = (e) => {
    e.preventDefault()
    // set cookie for login
    document.cookie = "loggedIn=true;max-age=60*30000"
    window.location.replace("/Home")
  }

  render() {
    return (
      <div className="mainDiv">
          <form id='loginForm' style={{marginTop: '50px'}} onSubmit={this.login}>
            <div style={{marginTop: '200px'}}>
              <TextField id="standard-basic" label="Company" value={this.state.Company} onChange={this.handleChangeCompany}inputProps={{style: {width: '400px'}}} required /><br></br>
              <TextField id="standard-basic" label="Alias Name" value={this.state.AliasName} onChange={this.handleChangeAlias}inputProps={{style: {textTransform: 'uppercase', width: '400px'}}} required /><br></br>
              <TextField id="standard-basic" label="Login ID" value={this.state.LoginID} onChange={this.handleChangeLoginID}inputProps={{style: {textTransform: 'uppercase', width: '400px'}}} required /><br></br>
              <TextField id="standard-basic" label="Password" type='password' value={this.state.LoginPassword} onChange={this.handleChangePassword}inputProps={{style: {width: '400px'}}} required /><br></br>
              <article id='confirmation-note'></article>
            </div>
            <Button type="submit" variant="contained" onClick={this.login} style={{width: '50%', padding: '2% 4%', margin: '5% auto 0 auto', backgroundColor: '#0000AE', color: '#FFF'}}>Login</Button>
          </form>
      </div>
    );
    }
  }

export default Login;