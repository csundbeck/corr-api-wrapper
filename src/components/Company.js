import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import PropTypes from 'prop-types';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { CSVReader } from 'react-papaparse';

require('dotenv').config();

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

class Company extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      //***API USER CREDENTIALS BEGIN***//
      AliasName: process.env.REACT_APP_ALIAS_NAME,
      LoginID: process.env.REACT_APP_LOGIN_ID,
      LoginPassword: process.env.REACT_APP_LOGIN_PASSWORD,
      //***API USER CREDENTIALS END***//
      AccountCode: "",
      BatchAccountCode: [],
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
      if (data[i].data.AccountCode !== null) {
        this.state.BatchAccountCode.push(data[i].data.AccountCode);
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
      BatchRegularCost: []
    })
    if (buttonRef.current) {
      buttonRef.current.removeFile(e)
    }
  }
  
  handleTabChange = (event, newValue) => {
    this.setState({tab: (this.state.tab === 0 ? 1 : 0)});
  };

  handleChangeAccountCode = (event) => {
    event.preventDefault();
    this.setState({
      ...this.state,
      AccountCode: event.target.value.toUpperCase()
    });
    console.log(this.state)
  };

  inactivateComp = () => {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.open('POST', 'http://mobilesupport.cati.local/12.1/cws/CustomerDatabase.asmx', true);
    let xmlRequest = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cws="http://corridor.aero/cws/">
    <soapenv:Header/>
    <soapenv:Body>
       <cws:InactivateCompany>
          <cws:input>
             <cws:AliasName>${this.state.AliasName}</cws:AliasName>
             <cws:LoginID>${this.state.LoginID}</cws:LoginID>
             <cws:LoginPassword>${this.state.LoginPassword}</cws:LoginPassword>
             <cws:CompanyCode>${this.state.AccountCode}</cws:CompanyCode>
          </cws:input>
       </cws:InactivateCompany>
    </soapenv:Body>
 </soapenv:Envelope>`;

         xmlhttp.onreadystatechange = function () {
          if (xmlhttp.readyState == 4) {
              if (xmlhttp.status == 200) {
                 console.log('Fire away!');
              } else {
                 console.log(xmlhttp.responseText);
              }
          }
      }

      xmlhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
      xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
      xmlhttp.send(xmlRequest);
      console.log(xmlRequest);
      // reset the state
      this.setState({
        AccountCode: "",
        BatchAccountCode: [],
        tab: 0
      });
      document.getElementsByClassName('MuiCheckbox-root').checked = false;
  }

  //batch
  batchInactivateComp = () => {
    for (let i=0; i < this.state.BatchPartNumber.length; i++) {
        var xmlhttp = new XMLHttpRequest();
  
        xmlhttp.open('POST', 'http://mobilesupport.cati.local/12.1/cws/CustomerDatabase.asmx', true);
        let xmlRequest = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cws="http://corridor.aero/cws/">
        <soapenv:Header/>
        <soapenv:Body>
           <cws:InactivateCompany>
              <cws:input>
                 <cws:AliasName>${this.state.AliasName}</cws:AliasName>
                 <cws:LoginID>${this.state.LoginID}</cws:LoginID>
                 <cws:LoginPassword>${this.state.LoginPassword}</cws:LoginPassword>
                 <cws:CompanyCode>${this.state.BatchAccountCode[i]}</cws:CompanyCode>
              </cws:input>
           </cws:InactivateCompany>
        </soapenv:Body>
     </soapenv:Envelope>`;
  
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
      }
      // reset the state
      this.setState({
        AccountCode: "",
        BatchAccountCode: [],
        tab: 0
      });
      document.getElementsByClassName('MuiCheckbox-root').checked = false;
  }

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
          <Button variant="contained" onClick={this.batchInactivateComp} style={{width: '50%', padding: '2% 4%', margin: '5% auto 0 auto', backgroundColor: '#0000AE', color: '#FFF'}}>Submit</Button>
        </TabPanel>
        <TabPanel value={this.state.tab} index={1}>
        <form id='inactivateCompanyForm'>
          <div style={{marginTop: '50px'}}>
            <TextField id="standard-5sic" label="Account Code" value={this.state.AccountCode} onChange={this.handleChangeAccountCode}inputProps={{style: {textTransform: 'uppercase', width: '400px', marginBottom: '3%'}}} required /><br></br>
          </div>
          <Button variant="contained" onClick={this.inactivateComp} style={{width: '50%', padding: '2% 4%', margin: '5% auto 0 auto', backgroundColor: '#0000AE', color: '#FFF'}}>Submit</Button>
        </form>
        </TabPanel>
      </div>
    );
    }
}

export default Company