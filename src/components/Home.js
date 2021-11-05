import React from 'react';
import Button from '@material-ui/core/Button';

class Home extends React.Component {
  constructor(props) {
    super(props);
}

userManagement = (e) => {
  e.preventDefault()
  // set cookie for login
  window.location.replace("/UserManagement");
}

inventory = (e) => {
  e.preventDefault()
  // set cookie for login
  window.location.replace("/Inventory");
}

company = (e) => {
  e.preventDefault()
  // set cookie for login
  window.location.replace("/CompanyDatabase");
}

  render() {
    return (
      <div className="homeDiv">
        <Button color="link" style={{fontSize: '16px'}} onClick={this.userManagement}>User Management</Button>
        <Button color="link" style={{fontSize: '16px'}} onClick={this.inventory}>Inventory</Button>
        <Button color="link" style={{fontSize: '16px'}} onClick={this.company}>Company Database</Button>
      </div>
    );
    }
  }

export default Home;