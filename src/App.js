import React from 'react';
import { BrowserRouter} from 'react-router-dom';
import Header from './components/Header';
import Router from './Router'

require('dotenv').config()

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      //***API USER CREDENTIALS BEGIN***//
      AliasName: process.env.REACT_APP_ALIAS_NAME,
      Company: '',
      LoginID: process.env.REACT_APP_LOGIN_ID,
      LoginPassword: process.env.REACT_APP_LOGIN_PASSWORD,
      //***API USER CREDENTIALS END***//
    }
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <Header />
          <Router />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;