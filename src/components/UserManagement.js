import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import PropTypes from 'prop-types';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import { CSVReader } from 'react-papaparse';

function Checkboxes() {
  const [checked, setChecked] = React.useState(false);

  const handleCheckChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div>
      <Checkbox
        color= 'primary'
        checked={checked}
        onChange={handleCheckChange}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
    </div>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const buttonRef = React.createRef()

class UserManagement extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      //***API USER CREDENTIALS BEGIN***//
      AliasName: process.env.REACT_APP_ALIAS_NAME,
      LoginID: process.env.REACT_APP_LOGIN_ID,
      LoginPassword: process.env.REACT_APP_LOGIN_PASSWORD,
      //***API USER CREDENTIALS END***//
      Username: '',
      CustomRate: false,
      RegularCost: 0.00,
      OvertimeCost: 0.00,
      DoubleTimeCost: 0.00,
      BatchUsername: [],
      BatchRegularCost: [],
      BatchOverCost: [],
      BatchDoubleCost: [],
      tab: 0
    }
  }

  handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e)
    }
  }

  handleOnFileLoad = (data) => {
    //console.log(data[0].data.Username);
    for (let i=0; i<data.length-1; i++) {
      if (data[i].data.Username !== null && data[i].data.RegularCost) {
        this.state.BatchUsername.push(data[i].data.Username);
        this.state.BatchRegularCost.push(data[i].data.RegularCost);
        if (data[i].data.OvertimeCost === null && data[i].data.DoubleCost === null) {
          this.state.BatchOverCost.push(data[i].data.OvertimeCost);
          this.state.BatchDoubleCost.push(data[i].data.DoubleCost);
        } else {
          this.state.BatchOverCost.push((data[i].data.RegularCost) * 1.5);
          this.state.BatchDoubleCost.push((data[i].data.RegularCost) * 2);
        }
      }        
    }
    console.log(this.state);
  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  handleOnRemoveFile = (data) => {
    console.log(data)
  }

  handleRemoveFile = (e) => {
    this.setState({
      BatchUsername: [],
      BatchRegularCost: [],
      BatchOverCost: [],
      BatchDoubleCost: [],
    })
    // if (buttonRef.current) {
    //   buttonRef.current.removeFile(e)
    // }
  }
  
  handleTabChange = (event, newValue) => {
    this.setState({tab: (this.state.tab === 0 ? 1 : 0)});
  };

  handleChangeUsername = (event) => {
    event.preventDefault();
    this.setState({
      ...this.state,
      Username: event.target.value.toUpperCase()
    });
    console.log(this.state)
  };

  handleCustomizeRate = (event) => {
    this.setState({
      ...this.state,
      CustomRate: this.state.CustomRate === false ? true : false});
    console.log(this.state);
  };

  handleChangeRegularCost = (event) => {
    event.preventDefault();
    this.setState({
      ...this.state,
      RegularCost: event.target.value,
      OvertimeCost: event.target.value * 1.5,
      DoubleTimeCost: event.target.value * 2
    });
    console.log(this.state)
  };

  handleChangeOvertimeCost = (event) => {
    event.preventDefault();
    this.setState({
      ...this.state,
      OvertimeCost: event.target.value
    });
    console.log(this.state)
  };

  handleChangeDoubleTimeCost = (event) => {
    event.preventDefault();
    this.setState({
      ...this.state,
      DoubleTimeCost: event.target.value
    });
    console.log(this.state)
  };

  updateRateSingle = () => {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.open('POST', 'http://mobilesupport.cati.local/12.1/cws/UserManagement.asmx', true);
    let xmlRequest = `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:cws="http://corridor.aero/cws/"><soap:Header/><soap:Body><cws:UpdateUser><cws:userData>
            <cws:AliasName>${this.state.AliasName}</cws:AliasName>
            <cws:LoginID>${this.state.LoginID}</cws:LoginID>
            <cws:LoginPassword>${this.state.LoginPassword}</cws:LoginPassword>
            <cws:Username>${this.state.Username}</cws:Username>
            <cws:RegularCost>${this.state.RegularCost}</cws:RegularCost>
            <cws:OvertimeCost>${this.state.OvertimeCost}</cws:OvertimeCost>
            <cws:DoubleTimeCost>${this.state.DoubleTimeCost}</cws:DoubleTimeCost>
            </cws:userData></cws:UpdateUser></soap:Body></soap:Envelope>`;

         xmlhttp.onreadystatechange = function () {
          if (xmlhttp.readyState == 4) {
              if (xmlhttp.status == 200) {
                 console.log('Fire away!');
              } else {
                 console.log(xmlhttp.responseText);
              }
          }
      }

      xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
      xmlhttp.send(xmlRequest);

    // fetch("http://mobilesupport.cati.local/12.1/cws/UserManagement.asmx?WSDL", {
    //   method: 'POST',
    //   body: payload,
    //   headers: {"Content-Type": "text/xml; charset=UTF-8"},
    //   mode: 'no-cors'
    // })
    //   .then(res => res.text())
    //   .then(data => console.log(data))
    //   .catch(error => console.log('Error: ', error));
      // reset the state
      this.setState({
        Username: '',
        CustomRate: false,
        RegularCost: 0.00,
        OvertimeCost: 0.00,
        DoubleTimeCost: 0.00,
        BatchUsername: [],
        BatchRegularCost: [],
        BatchOverCost: [],
        BatchDoubleCost: [],
        tab: 0
      });
      document.getElementsByClassName('MuiCheckbox-root').checked = false;
  }

  updateRateBatch = () => {
    let xmlRequest = '';
    let parser = new DOMParser();
    let payload;

    for (let i=0; i<this.state.BatchUsername.length; i++) {
      xmlRequest = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:cws="http://corridor.aero/cws/"><soap:Header/><soap:Body><cws:UpdateUser><cws:userData>' +
            `<cws:AliasName>${this.state.AliasName}</cws:AliasName>` +
            `<cws:LoginID>${this.state.LoginID}</cws:LoginID>` +
            `<cws:LoginPassword>${this.state.LoginPassword}</cws:LoginPassword>` +
            `<cws:Username>${this.state.BatchUsername[i]}</cws:Username>` +
            `<cws:RegularCost>${this.state.BatchRegularCost[i]}</cws:RegularCost>` +
            `<cws:OvertimeCost>${this.state.BatchOverCost[i]}</cws:OvertimeCost>` +
            `<cws:DoubleTimeCost>${this.state.BatchDoubleCost[i]}</cws:DoubleTimeCost>` +
            '</cws:userData></cws:UpdateUser></soap:Body></soap:Envelope>';

      payload = parser.parseFromString(xmlRequest,"text/xml");

      console.log(payload);

      fetch("http://mobilesupport.cati.local/12.1/cws/UserManagement.asmx?WSDL", {
      method: 'POST',
      body: payload,
      headers: {"Content-Type": "text/xml; charset=UTF-8"},
      mode: 'no-cors'
    })
      .then(res => res.text())
      .then(data => console.log(data))
      .catch(error => console.log('Error: ', error));
    }
      // reset the state
      this.setState({
        Username: '',
        CustomRate: false,
        RegularCost: 0.00,
        OvertimeCost: 0.00,
        DoubleTimeCost: 0.00,
        BatchUsername: [],
        BatchRegularCost: [],
        BatchOverCost: [],
        BatchDoubleCost: [],
        tab: 0
      });
      document.getElementsByClassName('MuiCheckbox-root').checked = false;
  }

  //http://mobilesupport.cati.local/12.1/cws/UserManagement.asmx

  //https://jsonplaceholder.typicode.com/posts/101


  render() {
    return (
      <div className="mainDiv">
        <Tabs value={this.state.tab} onChange={this.handleTabChange} aria-label="simple tabs example">
          <Tab label="Batch Update" {...a11yProps(0)} />
          <Tab label="Single Update" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={this.state.tab} index={0}>
          <form className="batchFileSelect">
            <h3>Select a file to import</h3>
            <CSVReader
              ref={buttonRef}
              onFileLoad={this.handleOnFileLoad}
              onError={this.handleOnError}
              noClick
              noDrag
              config={{header: true}}
              onRemoveFile={this.handleOnRemoveFile}

            > 
            {({ file }) => (
            <article
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginBottom: 15,
              padding: '2% 0.5%'
            }}
          >
            <button
              type='button'
              onClick={this.handleOpenDialog}
              style={{
                backgroundColor: '#659CEF',
                color: '#ffffff',
                border: 'none',
                fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
                borderRadius: '6px 0px 0px 6px'
              }}
            >
              Choose file...
            </button>
            <div
              style={{
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: '#ccc',
                width: 300,
                fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
              }}
            >
              {file && file.name}
            </div>
            <button
              onClick={this.handleRemoveFile}
              style={{
                backgroundColor: '#BDC1C4',
                color: '#000000',
                border: 'none',
                fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
                borderRadius: '0px 6px 6px 0px'
              }}
            >
              Remove
            </button>
          </article>
        )}</CSVReader>
          </form>
          <Button variant="contained" onClick={this.updateRateBatch} style={{width: '50%', padding: '2% 4%', margin: '5% auto 0 auto', backgroundColor: '#0000AE', color: '#FFF'}}>Submit</Button>
        </TabPanel>
        <TabPanel value={this.state.tab} index={1}>
        <form id='userRatesForm'>
          <div style={{marginTop: '50px'}}>
            <TextField id="standard-5sic" label="Username" value={this.state.Username} onChange={this.handleChangeUsername}inputProps={{style: {textTransform: 'uppercase', width: '400px', marginBottom: '3%'}}} required /><br></br>
            <article id='checkBoxContainer'><a href="#" onClick={this.handleCustomizeRate}><Checkboxes id='customizeRatesBox' checked={this.state.CustomRate} /></a><p id='customizeRatesLabel'>Customize Rates</p></article>
            <CurrencyTextField
              style={{marginBottom: '2.5%', display: 'block'}}
              placeholder='0.00'
              label='Regular Rate'
              variant="standard"
              value={this.state.RegularCost}
              currencySymbol=""
              minimumValue="0"
              outputFormat="string"
              decimalCharacter="."
              digitGroupSeparator=""
              onChange={this.handleChangeRegularCost}
              required={true}
            />
            <CurrencyTextField
              style={{marginBottom: '2.5%', display: 'block'}}
              placeholder='0.00'
              label={this.state.CustomRate === true ? 'Overtime Rate' : 'Overtime Rate (Disabled)'}
              variant="standard"
              value={this.state.OvertimeCost}
              currencySymbol=""
              minimumValue="0"
              outputFormat="string"
              decimalCharacter="."
              digitGroupSeparator=""
              disabled={this.state.CustomRate === true ? false : true}
              onChange={this.handleChangeOvertimeCost}
              required={this.state.CustomRate === true ? true : false}
            />
            <CurrencyTextField
              style={{marginBottom: '2.5%', display: 'block'}}
              placeholder='0.00'
              label={this.state.CustomRate === true ? 'Double Time Rate' : 'Double Time Rate (Disabled)'}
              variant="standard"
              value={this.state.DoubleTimeCost}
              currencySymbol=""
              minimumValue="0"
              outputFormat="string"
              decimalCharacter="."
              digitGroupSeparator=""
              disabled={this.state.CustomRate === true ? false : true}
              onChange={this.handleChangeDoubleTimeCost}
              required={this.state.CustomRate === true ? true : false}
            />
            <article id='confirmation-note'></article>
          </div>
          <Button variant="contained" onClick={this.updateRateSingle} style={{width: '50%', padding: '2% 4%', margin: '5% auto 0 auto', backgroundColor: '#0000AE', color: '#FFF'}}>Submit</Button>
        </form>
        </TabPanel>
      </div>
    );
    }
}

export default UserManagement