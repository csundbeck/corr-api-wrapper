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

function TabPanelRequest(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
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

TabPanelRequest.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function TabPanelUpdate(props) {
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
  
  TabPanelUpdate.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const buttonRef = React.createRef()

class Inventory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      //***API USER CREDENTIALS BEGIN***//
      AliasName: process.env.REACT_APP_ALIAS_NAME,
      LoginID: process.env.REACT_APP_LOGIN_ID,
      LoginPassword: process.env.REACT_APP_LOGIN_PASSWORD,
      //***API USER CREDENTIALS END***//
      PartNumber: "",
      SupercededPN: "",
      AltPartNumber: "",
      AltComments: "",
      AltSource: "",
      SupercededComments: "",
      SupercededSource: "",
      SupercededStartDate: "",
      SupercededEndDate: "",
      LotNumber: "",
      Warehouse: "",
      Bin: "",
      ChangeWHReason: "",
      ChangeWHQty: null,
      DisassociatePurchaseOrders: 0,
      SetPartMasterSupercedingEndDate: 0,
      AltInterchange: false,
      BatchPartNumber: [],
      BatchLotNumber: [],
      BatchSupercededPN: [],
      BatchAltPart: [],
      BatchAltComments: [],
      BatchAltSource: [],
      BatchInterChange: [],
      BatchSupercededComments: [],
      BatchSupercededSource: [],
      BatchSupercededStartDate: [],
      BatchSupercededEndDate: [],
      BatchDisassociatePurchaseOrders: [],
      BatchSetPartMasterSupersedingEndDate: [],
      BatchWarehouse: [],
      BatchBin: [],
      BatchChangeWHReason: [],
      BatchChangeWHQty: [],
      RequestTab: 0,
      UpdateTab: 0
    }
  }

  handleRequestTabChange = (event, newValue) => {
    this.setState({RequestTab: newValue});
    console.log(this.state.RequestTab)
  };

  handleUpdateTabChange = (event, newValue) => {
    this.setState({UpdateTab: (this.state.UpdateTab === 0 ? 1 : 0)});
  };

  handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e)
    }
  }

  // Need to create a template csv and modify this based on the field names
  handleAPOnFileLoad = (data) => {
    for (let i=0; i<data.length-1; i++) {
      if (data[i].data.PartNumber !== null || data[i].data.AltPartNumber !== null) {
        this.state.BatchPartNumber.push(data[i].data.PartNumber);
        this.state.BatchAltPart.push(data[i].data.AltPartNumber);
        this.state.BatchAltComments.push(data[i].data.AltComments);
        this.state.BatchAltSource.push(data[i].data.AltSource);
        this.state.BatchInterChange.push(data[i].data.AltInterchange);
      }        
    }
  }

  // Need to create a template csv and modify this based on the field names
  handleSPOnFileLoad = (data) => {
    for (let i=0; i<data.length-1; i++) {
      if (data[i].data.PartNumber !== null || data[i].data.SupercededPN !== null) {
        this.state.BatchPartNumber.push(data[i].data.PartNumber);
        this.state.BatchSupercededPN.push(data[i].data.SupercededPN);
        this.state.BatchSupercededComments.push(data[i].data.SupercededComments);
        this.state.BatchSupercededSource.push(data[i].data.SupercededSource);
        this.state.BatchSupercededStartDate.push(data[i].data.SupercededStartDate);
        this.state.BatchSupercededEndDate.push(data[i].data.SupercededEndDate);
        this.state.BatchDisassociatePurchaseOrders.push(data[i].data.DisassociatePurchaseOrders);
        this.state.BatchSetPartMasterSupersedingEndDate.push(data[i].data.SetPartMasterSupersedingEndDate);
      }        
    }
  }

  // Need to create a template csv and modify this based on the field names
  handleWHOnFileLoad = (data) => {
    for (let i=0; i<data.length-1; i++) {
      if (data[i].data.LotNumber !== null || data[i].data.SupercededPN !== null) {
        this.state.BatchPartNumber.push(data[i].data.PartNumber);
      }
    }
  }

  // handleWHOnFileLoad = (data) => {
  //   for (let i=0; i<data.length-1; i++) {
  //     if (data[i].data.PartNumber !== null) {
  //       this.state.BatchPartNumber.push(data[i].data.PartNumber);
  //     }
  //   }
  // }

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  handleOnRemoveFile = (data) => {
    console.log(data)
  }

  handleRemoveFile = (e) => {
    this.setState({
      BatchPartNumber: [],
      BatchLotNumber: [],
      BatchSupercededPN: [],
      BatchAltPart: [],
      BatchAltComments: [],
      BatchAltSource: [],
      BatchInterChange: [],
      BatchSupercededComments: [],
      BatchSupercededSource: [],
      BatchSupercededStartDate: [],
      BatchSupercededEndDate: [],
      BatchDisassociatePurchaseOrders: [],
      BatchSetPartMasterSupersedingEndDate: [],
      BatchWarehouse: [],
      BatchBin: [],
      BatchChangeWHReason: [],
      BatchChangeWHQty: []
    })
    // if (buttonRef.current) {
    //   buttonRef.current.removeFile(e)
    // }
  }
  
  handleTabChange = (event, newValue) => {
    this.setState({tab: (this.state.tab === 0 ? 1 : 0)});
  };

  handleChangePartNumber = (event) => {
    event.preventDefault();
    this.setState({
      ...this.state,
      PartNumber: event.target.value
    });
    console.log(this.state)
  };

  handleAltInterchange = (event) => {
    this.setState({
      ...this.state,
      AltInterchange: this.state.AltInterchange === false ? true : false});
    console.log(this.state);
  };

  handleChangeAltPart = (event) => {
    event.preventDefault();
    this.setState({
      ...this.state,
      AltPartNumber: event.target.value,
    });
    console.log(this.state)
  };

  handleChangeAltComments = (event) => {
    event.preventDefault();
    this.setState({
      ...this.state,
      AltComments: event.target.value
    });
    console.log(this.state)
  };

  handleChangeAltSource = (event) => {
    event.preventDefault();
    this.setState({
      ...this.state,
      AltSource: event.target.value
    });
    console.log(this.state)
  };

  handleChangeSupercededPN = (event) => {
    event.preventDefault();
    this.setState({
      ...this.state,
      SupercededPN: event.target.value
    });
    console.log(this.state)
  };

  handleChangeSupercededComments = (event) => {
    event.preventDefault();
    this.setState({
      ...this.state,
      SupercededComments: event.target.value
    });
    console.log(this.state)
  };

  handleChangeSupercededSource = (event) => {
    event.preventDefault();
    this.setState({
      ...this.state,
      SupercededSource: event.target.value
    });
    console.log(this.state)
  };

  handleChangeSupercededStartDate = (event) => {
    event.preventDefault();
    this.setState({
      ...this.state,
      SupercededStartDate: event.target.value
    });
    console.log(this.state)
  };

  handleChangeSupercededEndDate = (event) => {
    event.preventDefault();
    this.setState({
      ...this.state,
      SupercededEndDate: event.target.value
    });
    console.log(this.state)
  };

  handleChangeDisassociatePurchaseOrders = (event) => {
    event.preventDefault();
    this.setState({
      ...this.state,
      DisassociatePurchaseOrders: this.state.DisassociatePurchaseOrders === false ? true : false
    });
    console.log(this.state)
  };

  handleChangeSetPartMasterSupercedingEndDate = (event) => {
    event.preventDefault();
    this.setState({
      ...this.state,
      SetPartMasterSupercedingEndDate: this.state.SetPartMasterSupercedingEndDate === false ? true : false
    });
    console.log(this.state)
  };

  handleChangeLot = (event) => {
    event.preventDefault();
    this.setState({
      ...this.state,
      LotNumber: event.target.value
    });
    console.log(this.state)
  };

  handleChangeWarehouse = (event) => {
    event.preventDefault();
    this.setState({
      ...this.state,
      Warehouse: event.target.value
    });
    console.log(this.state)
  };

  handleChangeBin = (event) => {
    event.preventDefault();
    this.setState({
      ...this.state,
      Bin: event.target.value
    });
    console.log(this.state)
  };

  handleChangeWarehouseReason = (event) => {
    event.preventDefault();
    this.setState({
      ...this.state,
      ChangeWHReason: event.target.value
    });
    console.log(this.state)
  };

  handleChangeWarehouseQTY = (event) => {
    event.preventDefault();
    this.setState({
      ...this.state,
      ChangeWHQty: event.target.value
    });
    console.log(this.state)
  };

  addAltPart = () => {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.open('POST', 'http://mobilesupport.cati.local/12.1/cws/PartMaster.asmx', true);
    let xmlRequest = `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:cws="http://corridor.aero/cws/">
   <soap:Header/>
   <soap:Body>
      <cws:AddAlternatePartRequest>
         <cws:input>
            <cws:AliasName>${this.state.AliasName}</cws:AliasName>
            <cws:LoginID>${this.state.LoginID}</cws:LoginID>
            <cws:LoginPassword>${this.state.LoginPassword}</cws:LoginPassword>
            <cws:PartNumber>${this.state.PartNumber}</cws:PartNumber>
            <cws:AlternatePartNumber>${this.state.AltPartNumber}</cws:AlternatePartNumber>
            <cws:AlternateComments>${this.state.AltComments}</cws:AlternateComments>
            <cws:AlternateSource>${this.state.AltSource}</cws:AlternateSource>
            <cws:AlternateInterchangeable>${this.state.AltInterchange}</cws:AlternateInterchangeable>
         </cws:input>
      </cws:AddAlternatePartRequest>
   </soap:Body>
</soap:Envelope>`;

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
      // reset the state
      this.setState({
        PartNumber: "",
        SupercededPN: "",
        AltPartNumber: "",
        AltComments: "",
        AltSource: "",
        SupercededComments: "",
        SupercededSource: "",
        SupercededStartDate: "",
        SupercededEndDate: "",
        DisassociatePurchaseOrders: 0,
        SetPartMasterSupercedingEndDate: 0,
        AltInterchange: false,
        BatchPartNumber: [],
        BatchSupercededPN: [],
        BatchAltPart: [],
        BatchAltComments: [],
        BatchAltSource: [],
        BatchInterChange: [],
        BatchSupercededComments: [],
        BatchSupercededSource: [],
        BatchSupercededStartDate: [],
        BatchSupercededEndDate: [],
        BatchDisassociatePurchaseOrders: [],
        BatchSetPartMasterSupersedingEndDate: [],
        RequestTab: 0,
        UpdateTab: 0
      });
      document.getElementsByClassName('MuiCheckbox-root').checked = false;
  }

  //batch
  addBatchAltPart = () => {
    for (let i=0; i < this.state.BatchPartNumber.length; i++) {
        var xmlhttp = new XMLHttpRequest();
  
        xmlhttp.open('POST', 'http://mobilesupport.cati.local/12.1/cws/PartMaster.asmx', true);
        let xmlRequest = `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:cws="http://corridor.aero/cws/">
        <soap:Header/>
        <soap:Body>
           <cws:AddAlternatePartRequest>
              <cws:input>
                 <cws:AliasName>${this.state.AliasName}</cws:AliasName>
                 <cws:LoginID>${this.state.LoginID}</cws:LoginID>
                 <cws:LoginPassword>${this.state.LoginPassword}</cws:LoginPassword>
                 <cws:PartNumber>${this.state.BatchPartNumber[i]}</cws:PartNumber>
                 <cws:AlternatePartNumber>${this.state.BatchAltPart[i]}</cws:AlternatePartNumber>
                 <cws:AlternateComments>${this.state.BatchAltComments[i]}</cws:AlternateComments>
                 <cws:AlternateSource>${this.state.BatchAltSource[i]}</cws:AlternateSource>
                 <cws:AlternateInterchangeable>${this.state.BatchInterChange[i]}</cws:AlternateInterchangeable>
              </cws:input>
           </cws:AddAlternatePartRequest>
        </soap:Body>
     </soap:Envelope>`;
     console.log(xmlRequest);
  
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
        PartNumber: "",
        SupercededPN: "",
        AltPartNumber: "",
        AltComments: "",
        AltSource: "",
        SupercededComments: "",
        SupercededSource: "",
        SupercededStartDate: "",
        SupercededEndDate: "",
        DisassociatePurchaseOrders: 0,
        SetPartMasterSupercedingEndDate: 0,
        AltInterchange: false,
        BatchPartNumber: [],
        BatchSupercededPN: [],
        BatchAltPart: [],
        BatchAltComments: [],
        BatchAltSource: [],
        BatchInterChange: [],
        BatchSupercededComments: [],
        BatchSupercededSource: [],
        BatchSupercededStartDate: [],
        BatchSupercededEndDate: [],
        BatchDisassociatePurchaseOrders: [],
        BatchSetPartMasterSupersedingEndDate: [],
        RequestTab: 0,
        UpdateTab: 0
      });
      document.getElementsByClassName('MuiCheckbox-root').checked = false;
  }

  addSupercededPart = () => {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.open('POST', 'http://mobilesupport.cati.local/12.1/cws/PartMaster.asmx', true);
    let xmlRequest = `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:cws="http://corridor.aero/cws/">
    <soap:Header/>
    <soap:Body>
       <cws:AddSupersededPartRequest>
          <cws:input>
             <cws:AliasName>${this.state.AliasName}</cws:AliasName>
             <cws:LoginID>${this.state.LoginID}</cws:LoginID>
             <cws:LoginPassword>${this.state.LoginPassword}</cws:LoginPassword>
             <cws:PartNumber>${this.state.PartNumber}</cws:PartNumber>
             <cws:SupersededPartNumber>${this.state.SupercededPN}</cws:SupersededPartNumber>
             <cws:SupersededComments>${this.state.SupercededComments}</cws:SupersededComments>
             <cws:SupersededSource>${this.state.SupercededSource}</cws:SupersededSource>
             <cws:SupersededEffectiveDate>${this.state.SupercededStartDate}</cws:SupersededEffectiveDate>
             <cws:SupersededEndDate>${this.state.SupercededEndDate}</cws:SupersededEndDate>
             <cws:DisassociatePurchaseOrders>${this.state.DisassociatePurchaseOrders}</cws:DisassociatePurchaseOrders>
             <cws:SetPartMasterSupersedingEndDate>${this.state.SetPartMasterSupercedingEndDate}</cws:SetPartMasterSupersedingEndDate>
          </cws:input>
       </cws:AddSupersededPartRequest>
    </soap:Body>
 </soap:Envelope>`;

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
      // reset the state
      this.setState({
        PartNumber: "",
        SupercededPN: "",
        AltPartNumber: "",
        AltComments: "",
        AltSource: "",
        SupercededComments: "",
        SupercededSource: "",
        SupercededStartDate: "",
        SupercededEndDate: "",
        DisassociatePurchaseOrders: 0,
        SetPartMasterSupercedingEndDate: 0,
        AltInterchange: false,
        BatchPartNumber: [],
        BatchSupercededPN: [],
        BatchAltPart: [],
        BatchAltComments: [],
        BatchAltSource: [],
        BatchInterChange: [],
        BatchSupercededComments: [],
        BatchSupercededSource: [],
        BatchSupercededStartDate: [],
        BatchSupercededEndDate: [],
        BatchDisassociatePurchaseOrders: [],
        BatchSetPartMasterSupersedingEndDate: [],
        RequestTab: 0,
        UpdateTab: 0
      });
      document.getElementsByClassName('MuiCheckbox-root').checked = false;
  }

  //batch
  addBatchSupercededPart = () => {
    for (let i=0; i < this.state.BatchPartNumber.length; i++) {
        var xmlhttp = new XMLHttpRequest();
  
        xmlhttp.open('POST', 'http://mobilesupport.cati.local/12.1/cws/PartMaster.asmx', true);
        let xmlRequest = `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:cws="http://corridor.aero/cws/">
        <soap:Header/>
        <soap:Body>
           <cws:AddSupersededPartRequest>
              <cws:input>
                 <cws:AliasName>${this.state.AliasName}</cws:AliasName>
                 <cws:LoginID>${this.state.LoginID}</cws:LoginID>
                 <cws:LoginPassword>${this.state.LoginPassword}</cws:LoginPassword>
                 <cws:PartNumber>${this.state.BatchPartNumber[i]}</cws:PartNumber>
                 <cws:SupersededPartNumber>${this.state.BatchSupercededPN[i]}</cws:SupersededPartNumber>
                 <cws:SupersededComments>${this.state.BatchSupercededComments[i]}</cws:SupersededComments>
                 <cws:SupersededSource>${this.state.BatchSupercededSource[i]}</cws:SupersededSource>
                 <cws:SupersededEffectiveDate>${this.state.BatchSupercededStartDate[i]}</cws:SupersededEffectiveDate>
                 <cws:SupersededEndDate>${this.state.BatchSupercededEndDate[i]}</cws:SupersededEndDate>
                 <cws:DisassociatePurchaseOrders>${this.state.BatchDisassociatePurchaseOrders[i]}</cws:DisassociatePurchaseOrders>
                 <cws:SetPartMasterSupersedingEndDate>${this.state.BatchSetPartMasterSupercedingEndDate[i]}</cws:SetPartMasterSupersedingEndDate>
              </cws:input>
           </cws:AddSupersededPartRequest>
        </soap:Body>
     </soap:Envelope>`;

        console.log(xmlRequest);
  
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
        PartNumber: "",
        SupercededPN: "",
        AltPartNumber: "",
        AltComments: "",
        AltSource: "",
        SupercededComments: "",
        SupercededSource: "",
        SupercededStartDate: "",
        SupercededEndDate: "",
        DisassociatePurchaseOrders: 0,
        SetPartMasterSupercedingEndDate: 0,
        AltInterchange: false,
        BatchPartNumber: [],
        BatchSupercededPN: [],
        BatchAltPart: [],
        BatchAltComments: [],
        BatchAltSource: [],
        BatchInterChange: [],
        BatchSupercededComments: [],
        BatchSupercededSource: [],
        BatchSupercededStartDate: [],
        BatchSupercededEndDate: [],
        BatchDisassociatePurchaseOrders: [],
        BatchSetPartMasterSupersedingEndDate: [],
        RequestTab: 0,
        UpdateTab: 0
      });
      document.getElementsByClassName('MuiCheckbox-root').checked = false;
  }

  changeWHBin = () => {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.open('POST', 'http://mobilesupport.cati.local/12.1/cws/PartMaster.asmx', true);
    let xmlRequest = `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:cws="http://corridor.aero/cws/">
    <soap:Header/>
    <soap:Body>
       <cws:UpdateLotRequest>
          <cws:input>
             <cws:AliasName>${this.state.AliasName}</cws:AliasName>
             <cws:LoginID>${this.state.LoginID}</cws:LoginID>
             <cws:LoginPassword>${this.state.LoginPassword}</cws:LoginPassword>
             <cws:Warehouse>${this.state.Warehouse}</cws:Warehouse>
             <cws:Bin>${this.state.Bin}</cws:Bin>
             <cws:LotNumber>${this.state.LotNumber}</cws:LotNumber>
             <cws:ChangeWarehouseReason>${this.state.ChangeWHReason}</cws:ChangeWarehouseReason>
             <cws:ChangeWarehouseQty>${this.state.ChangeWHQty}</cws:ChangeWarehouseQty>
          </cws:input>
       </cws:UpdateLotRequest>
    </soap:Body>
 </soap:Envelope>`;

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
      // reset the state
      this.setState({
        PartNumber: "",
        SupercededPN: "",
        AltPartNumber: "",
        AltComments: "",
        AltSource: "",
        SupercededComments: "",
        SupercededSource: "",
        SupercededStartDate: "",
        SupercededEndDate: "",
        LotNumber: "",
        Warehouse: "",
        Bin: "",
        ChangeWHReason: "",
        ChangeWHQty: null,
        DisassociatePurchaseOrders: 0,
        SetPartMasterSupercedingEndDate: 0,
        AltInterchange: false,
        BatchPartNumber: [],
        BatchSupercededPN: [],
        BatchAltPart: [],
        BatchAltComments: [],
        BatchAltSource: [],
        BatchInterChange: [],
        BatchSupercededComments: [],
        BatchSupercededSource: [],
        BatchSupercededStartDate: [],
        BatchSupercededEndDate: [],
        BatchDisassociatePurchaseOrders: [],
        BatchSetPartMasterSupersedingEndDate: [],
        RequestTab: 0,
        UpdateTab: 0
      });
      document.getElementsByClassName('MuiCheckbox-root').checked = false;
  }

  //batch
  changeBatchWHBin = () => {
    for (let i=0; i < this.state.BatchLotNumber.length; i++) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'http://mobilesupport.cati.local/12.1/cws/PartMaster.asmx', true);
    let xmlRequest = `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:cws="http://corridor.aero/cws/">
    <soap:Header/>
    <soap:Body>
       <cws:UpdateLotRequest>
          <cws:input>
             <cws:AliasName>${this.state.AliasName}</cws:AliasName>
             <cws:LoginID>${this.state.LoginID}</cws:LoginID>
             <cws:LoginPassword>${this.state.LoginPassword}</cws:LoginPassword>
             <cws:Warehouse>${this.state.BatchWarehouse[i]}</cws:Warehouse>
             <cws:Bin>${this.state.BatchBin[i]}</cws:Bin>
             <cws:LotNumber>${this.state.BatchLotNumber[i]}</cws:LotNumber>
             <cws:ChangeWarehouseReason>${this.state.BatchChangeWHReason[i]}</cws:ChangeWarehouseReason>
             <cws:ChangeWarehouseQty>${this.state.BatchChangeWHQty[i]}</cws:ChangeWarehouseQty>
          </cws:input>
       </cws:UpdateLotRequest>
    </soap:Body>
 </soap:Envelope>`;

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
        PartNumber: "",
        SupercededPN: "",
        AltPartNumber: "",
        AltComments: "",
        AltSource: "",
        SupercededComments: "",
        SupercededSource: "",
        SupercededStartDate: "",
        SupercededEndDate: "",
        LotNumber: "",
        Warehouse: "",
        Bin: "",
        ChangeWHReason: "",
        ChangeWHQty: null,
        DisassociatePurchaseOrders: 0,
        SetPartMasterSupercedingEndDate: 0,
        AltInterchange: false,
        BatchPartNumber: [],
        BatchSupercededPN: [],
        BatchAltPart: [],
        BatchAltComments: [],
        BatchAltSource: [],
        BatchInterChange: [],
        BatchSupercededComments: [],
        BatchSupercededSource: [],
        BatchSupercededStartDate: [],
        BatchSupercededEndDate: [],
        BatchDisassociatePurchaseOrders: [],
        BatchSetPartMasterSupersedingEndDate: [],
        RequestTab: 0,
        UpdateTab: 0
      });
      document.getElementsByClassName('MuiCheckbox-root').checked = false;
  }

  inactivatePN = () => {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', 'http://mobilesupport.cati.local/12.1/cws/PartMaster.asmx', true);
      let xmlRequest = `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:cws="http://corridor.aero/cws/">
      <soap:Header/>
      <soap:Body>
         <cws:InactivatePartMaster>
            <cws:partMasterReference>
               <cws:AliasName>${this.state.AliasName}</cws:AliasName>
                <cws:LoginID>${this.state.LoginID}</cws:LoginID>
                <cws:LoginPassword>${this.state.LoginPassword}</cws:LoginPassword>
               <cws:PartNumber>${this.state.PartNumber}</cws:PartNumber>
            </cws:partMasterReference>
         </cws:InactivatePartMaster>
      </soap:Body>
   </soap:Envelope>`;
  
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
      
        // reset the state
        this.setState({
          PartNumber: "",
          SupercededPN: "",
          AltPartNumber: "",
          AltComments: "",
          AltSource: "",
          SupercededComments: "",
          SupercededSource: "",
          SupercededStartDate: "",
          SupercededEndDate: "",
          LotNumber: "",
          Warehouse: "",
          Bin: "",
          ChangeWHReason: "",
          ChangeWHQty: null,
          DisassociatePurchaseOrders: 0,
          SetPartMasterSupercedingEndDate: 0,
          AltInterchange: false,
          BatchPartNumber: [],
          BatchSupercededPN: [],
          BatchAltPart: [],
          BatchAltComments: [],
          BatchAltSource: [],
          BatchInterChange: [],
          BatchSupercededComments: [],
          BatchSupercededSource: [],
          BatchSupercededStartDate: [],
          BatchSupercededEndDate: [],
          BatchDisassociatePurchaseOrders: [],
          BatchSetPartMasterSupersedingEndDate: [],
          RequestTab: 0,
          UpdateTab: 0
        });
        document.getElementsByClassName('MuiCheckbox-root').checked = false;
  }

  inactivatePNBatch = () => {
    for (let i=0; i < this.state.BatchPartNumber.length; i++) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'http://mobilesupport.cati.local/12.1/cws/PartMaster.asmx', true);
    let xmlRequest = `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:cws="http://corridor.aero/cws/">
    <soap:Header/>
    <soap:Body>
       <cws:InactivatePartMaster>
          <cws:partMasterReference>
             <cws:AliasName>${this.state.AliasName}</cws:AliasName>
              <cws:LoginID>${this.state.LoginID}</cws:LoginID>
              <cws:LoginPassword>${this.state.LoginPassword}</cws:LoginPassword>
             <cws:PartNumber>${this.state.BatchPartNumber[i]}</cws:PartNumber>
          </cws:partMasterReference>
       </cws:InactivatePartMaster>
    </soap:Body>
 </soap:Envelope>`;

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
        PartNumber: "",
        SupercededPN: "",
        AltPartNumber: "",
        AltComments: "",
        AltSource: "",
        SupercededComments: "",
        SupercededSource: "",
        SupercededStartDate: "",
        SupercededEndDate: "",
        LotNumber: "",
        Warehouse: "",
        Bin: "",
        ChangeWHReason: "",
        ChangeWHQty: null,
        DisassociatePurchaseOrders: 0,
        SetPartMasterSupercedingEndDate: 0,
        AltInterchange: false,
        BatchPartNumber: [],
        BatchSupercededPN: [],
        BatchAltPart: [],
        BatchAltComments: [],
        BatchAltSource: [],
        BatchInterChange: [],
        BatchSupercededComments: [],
        BatchSupercededSource: [],
        BatchSupercededStartDate: [],
        BatchSupercededEndDate: [],
        BatchDisassociatePurchaseOrders: [],
        BatchSetPartMasterSupersedingEndDate: [],
        RequestTab: 0,
        UpdateTab: 0
      });
      document.getElementsByClassName('MuiCheckbox-root').checked = false;
  }

  activatePN = () => {
    var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', 'http://mobilesupport.cati.local/12.1/cws/PartMaster.asmx', true);
      let xmlRequest = `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:cws="http://corridor.aero/cws/">
      <soap:Header/>
      <soap:Body>
         <cws:ReactivatePartMaster>
            <cws:partMasterReference>
               <cws:AliasName>${this.state.AliasName}</cws:AliasName>
                <cws:LoginID>${this.state.LoginID}</cws:LoginID>
                <cws:LoginPassword>${this.state.LoginPassword}</cws:LoginPassword>
               <cws:PartNumber>${this.state.PartNumber}</cws:PartNumber>
            </cws:partMasterReference>
         </cws:ReactivatePartMaster>
      </soap:Body>
   </soap:Envelope>`;
  
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
      
        // reset the state
        this.setState({
          PartNumber: "",
          SupercededPN: "",
          AltPartNumber: "",
          AltComments: "",
          AltSource: "",
          SupercededComments: "",
          SupercededSource: "",
          SupercededStartDate: "",
          SupercededEndDate: "",
          LotNumber: "",
          Warehouse: "",
          Bin: "",
          ChangeWHReason: "",
          ChangeWHQty: null,
          DisassociatePurchaseOrders: 0,
          SetPartMasterSupercedingEndDate: 0,
          AltInterchange: false,
          BatchPartNumber: [],
          BatchSupercededPN: [],
          BatchAltPart: [],
          BatchAltComments: [],
          BatchAltSource: [],
          BatchInterChange: [],
          BatchSupercededComments: [],
          BatchSupercededSource: [],
          BatchSupercededStartDate: [],
          BatchSupercededEndDate: [],
          BatchDisassociatePurchaseOrders: [],
          BatchSetPartMasterSupersedingEndDate: [],
          RequestTab: 0,
          UpdateTab: 0
        });
        document.getElementsByClassName('MuiCheckbox-root').checked = false;
  }

  activatePNBatch = () => {
    for (let i=0; i < this.state.BatchPartNumber.length; i++) {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', 'http://mobilesupport.cati.local/12.1/cws/PartMaster.asmx', true);
      let xmlRequest = `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:cws="http://corridor.aero/cws/">
      <soap:Header/>
      <soap:Body>
         <cws:ReactivatePartMaster>
            <cws:partMasterReference>
               <cws:AliasName>${this.state.AliasName}</cws:AliasName>
                <cws:LoginID>${this.state.LoginID}</cws:LoginID>
                <cws:LoginPassword>${this.state.LoginPassword}</cws:LoginPassword>
               <cws:PartNumber>${this.state.BatchPartNumber[i]}</cws:PartNumber>
            </cws:partMasterReference>
         </cws:ReactivatePartMaster>
      </soap:Body>
   </soap:Envelope>`;
  
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
          PartNumber: "",
          SupercededPN: "",
          AltPartNumber: "",
          AltComments: "",
          AltSource: "",
          SupercededComments: "",
          SupercededSource: "",
          SupercededStartDate: "",
          SupercededEndDate: "",
          LotNumber: "",
          Warehouse: "",
          Bin: "",
          ChangeWHReason: "",
          ChangeWHQty: null,
          DisassociatePurchaseOrders: 0,
          SetPartMasterSupercedingEndDate: 0,
          AltInterchange: false,
          BatchPartNumber: [],
          BatchSupercededPN: [],
          BatchAltPart: [],
          BatchAltComments: [],
          BatchAltSource: [],
          BatchInterChange: [],
          BatchSupercededComments: [],
          BatchSupercededSource: [],
          BatchSupercededStartDate: [],
          BatchSupercededEndDate: [],
          BatchDisassociatePurchaseOrders: [],
          BatchSetPartMasterSupersedingEndDate: [],
          RequestTab: 0,
          UpdateTab: 0
        });
        document.getElementsByClassName('MuiCheckbox-root').checked = false;
  }

  render() {
    return (
      <div className="mainDiv">
        <Tabs className='requestTabGroup' value={this.state.RequestTab} onChange={this.handleRequestTabChange} aria-label="simple tabs example" variant="scrollable" scrollButtons="auto">
            <Tab label="Alternate Parts" {...a11yProps(0)} style={{fontWeight: 'bold'}} />
            <Tab label="Superceded Parts" {...a11yProps(1)} style={{fontWeight: 'bold'}} />
            <Tab label="Warehouse/Bin Change" {...a11yProps(2)} style={{fontWeight: 'bold'}} />
            <Tab label="Inactivate Parts" {...a11yProps(3)} style={{fontWeight: 'bold'}} />
            <Tab label="Activate Parts" {...a11yProps(4)} style={{fontWeight: 'bold'}} />
            <Tab label="Parts Pricing" {...a11yProps(5)} style={{fontWeight: 'bold'}} />
        </Tabs>
        <Tabs className='updateTabGroup' value={this.state.UpdateTab} onChange={this.handleUpdateTabChange} aria-label="simple tabs example">
            <Tab label="Batch Update" {...a11yProps(0)} />
            <Tab label="Single Update" {...a11yProps(1)} />
        </Tabs>
        <TabPanelRequest value={this.state.RequestTab} index={0}>
        <h2>Add/Update Alternate Part Numbers</h2>
          <TabPanelUpdate value={this.state.UpdateTab} index={0}>
            <form className="batchFileSelect">
              <h3>Select a file to import</h3>
              <CSVReader
              ref={buttonRef}
              onFileLoad={this.handleAPOnFileLoad}
              onError={this.handleOnError}
              noClick
              noDrag
              config={{header: true}}
              onRemoveFile={this.handleOnRemoveFile}> 
            {({ file }) => (
            <article
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginBottom: 15,
              padding: '2% 0.5%'
            }}>
            <button
              type='button'
              onClick={this.handleOpenDialog}
              style={{
                backgroundColor: '#659CEF',
                color: '#ffffff',
                border: 'none',
                fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
                borderRadius: '6px 0px 0px 6px'
              }}>
              Choose file...
            </button>
            <div
              style={{
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: '#ccc',
                width: 300,
                fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
              }}>
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
            >Remove
            </button>
          </article>
        )}</CSVReader>
          </form>
          <Button variant="contained" onClick={this.addBatchAltPart} style={{width: '50%', padding: '2% 4%', margin: '5% auto 0 auto', backgroundColor: '#0000AE', color: '#FFF'}}>Submit</Button>
            </TabPanelUpdate>
            <TabPanelUpdate value={this.state.UpdateTab} index={1}>
            <form id='altPartsForm'>
              <div style={{marginTop: '50px'}}>
                <TextField id="standard-5sic" label="Part Number" value={this.state.PartNumber} onChange={this.handleChangePartNumber}inputProps={{style: {textTransform: 'uppercase', width: '400px', marginBottom: '3%'}}} required /><br></br>
                <TextField id="standard-5sic" label="Alternate Part Number" value={this.state.AltPartNumber} onChange={this.handleChangeAltPart}inputProps={{style: {textTransform: 'uppercase', width: '400px', marginBottom: '3%'}}} required /><br></br>
                <TextField id="standard-5sic" label="Alternate Part Comments" value={this.state.AltComments} onChange={this.handleChangeAltComments}inputProps={{style: {width: '400px', marginBottom: '3%'}}} /><br></br>
                <TextField id="standard-5sic" label="Alternate Part Source" value={this.state.AltSource} onChange={this.handleChangeAltSource}inputProps={{style: { width: '400px', marginBottom: '3%'}}} /><br></br>
                <article id='checkBoxContainer'><a href="#" onClick={this.handleAltInterchange}><Checkboxes id='customizeRatesBox' checked={this.state.AltInterchange} /></a><p id='customizeRatesLabel'>Interchangeable?</p></article>
              </div>
              <Button variant="contained" onClick={this.addAltPart} style={{width: '50%', padding: '2% 4%', margin: '5% auto 0 auto', backgroundColor: '#0000AE', color: '#FFF'}}>Submit</Button>
            </form>
            </TabPanelUpdate>
        </TabPanelRequest>
        <TabPanelRequest value={this.state.RequestTab} index={1}>
        <h2>Add/Update Superceded Part Numbers</h2>
            <TabPanelUpdate value={this.state.UpdateTab} index={0}>
              <form className="batchFileSelect">
                <h3>Select a file to import</h3>
                <CSVReader
                  ref={buttonRef}
                  onFileLoad={this.handleSPOnFileLoad}
                  onError={this.handleOnError}
                  noClick
                  noDrag
                  config={{header: true}}
                  onRemoveFile={this.handleOnRemoveFile}> 
                {({ file }) => (
                <article
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginBottom: 15,
                  padding: '2% 0.5%'
                }}>
                <button
                  type='button'
                  onClick={this.handleOpenDialog}
                  style={{
                    backgroundColor: '#659CEF',
                    color: '#ffffff',
                    border: 'none',
                    fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
                    borderRadius: '6px 0px 0px 6px'
                  }}>
                  Choose file...
                </button>
                <div
                  style={{
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: '#ccc',
                    width: 300,
                    fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
                  }}>
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
                >Remove
                </button>
              </article>
            )}</CSVReader>
              </form>
              <Button variant="contained" onClick={this.addBatchSupercededPart} style={{width: '50%', padding: '2% 4%', margin: '5% auto 0 auto', backgroundColor: '#0000AE', color: '#FFF'}}>Submit</Button>
            </TabPanelUpdate>
            <TabPanelUpdate value={this.state.UpdateTab} index={1}>
            <form id='altPartsForm'>
              <div style={{marginTop: '50px'}}>
                <TextField id="standard-5sic" label="Part Number" value={this.state.PartNumber} onChange={this.handleChangePartNumber} inputProps={{style: {textTransform: 'uppercase', width: '400px', marginBottom: '3%'}}} required /><br></br>
                <TextField id="standard-5sic" label="Superceded Part Number" value={this.state.SupercededPN} onChange={this.handleChangeSupercededPN} inputProps={{style: {textTransform: 'uppercase', width: '400px', marginBottom: '3%'}}} required /><br></br>
                <TextField id="standard-5sic" label="Superceded Part Comments" value={this.state.SupercededComments} onChange={this.handleChangeSupercededComments} inputProps={{style: {width: '400px', marginBottom: '3%'}}} /><br></br>
                <TextField id="standard-5sic" label="Superceded Part Source" value={this.state.SupercededSource} onChange={this.handleChangeSupercededSource} inputProps={{style: { width: '400px', marginBottom: '3%'}}} /><br></br>
                <TextField id="standard-5sic" type="date" label="Superceded Effective Date" value={this.state.SupercededStartDate} onChange={this.handleChangeSupercededStartDate} inputProps={{style: { width: '400px', marginBottom: '3%'}}} required /><br></br>
                <TextField id="standard-5sic" type="date" label="Superceded End Date" value={this.state.SupercededEndDate} onChange={this.handleChangeSupercededEndDate} inputProps={{style: { width: '400px', marginBottom: '3%'}}} /><br></br>
                <div style={{display: 'inline-flex', flexDirection: 'row'}}>
                  <article id='checkBoxContainer'><a href="#" onClick={this.handleChangeDisassociatePurchaseOrders}><Checkboxes id='customizeRatesBox' checked={this.state.DisassociatePurchaseOrders} /></a><p id='customizeRatesLabel'>Disassociate From PO's?</p></article>
                  <article id='checkBoxContainer'><a href="#" onClick={this.handleChangeSetPartMasterSupercedingEndDate}><Checkboxes id='customizeRatesBox' checked={this.state.SetPartMasterSupercedingEndDate} /></a><p id='customizeRatesLabel'>Set Part Master Superseding End Date?</p></article>
                </div>
              </div>
              <Button variant="contained" onClick={this.addSupercededPart} style={{width: '50%', padding: '2% 4%', margin: '5% auto 0 auto', backgroundColor: '#0000AE', color: '#FFF'}}>Submit</Button>
            </form>
            </TabPanelUpdate>
        </TabPanelRequest>
        <TabPanelRequest value={this.state.RequestTab} index={2}>
        <h2>Update Part Warehouse/Bin Location</h2>
        <TabPanelUpdate value={this.state.UpdateTab} index={0}>
              <form className="batchFileSelect">
                <h3>Select a file to import</h3>
                <CSVReader
                  ref={buttonRef}
                  onFileLoad={this.handleWHOnFileLoad}
                  onError={this.handleOnError}
                  noClick
                  noDrag
                  config={{header: true}}
                  onRemoveFile={this.handleOnRemoveFile}> 
                {({ file }) => (
                <article
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginBottom: 15,
                  padding: '2% 0.5%'
                }}>
                <button
                  type='button'
                  onClick={this.handleOpenDialog}
                  style={{
                    backgroundColor: '#659CEF',
                    color: '#ffffff',
                    border: 'none',
                    fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
                    borderRadius: '6px 0px 0px 6px'
                  }}>
                  Choose file...
                </button>
                <div
                  style={{
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: '#ccc',
                    width: 300,
                    fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
                  }}>
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
                >Remove
                </button>
              </article>
            )}</CSVReader>
              </form>
              <Button variant="contained" onClick={this.changeBatchWHBin} style={{width: '50%', padding: '2% 4%', margin: '5% auto 0 auto', backgroundColor: '#0000AE', color: '#FFF'}}>Submit</Button>
            </TabPanelUpdate>
            <TabPanelUpdate value={this.state.UpdateTab} index={1}>
            <form id=''>
              <div style={{marginTop: '50px'}}>
                <TextField id="standard-5sic" label="Lot Number" value={this.state.LotNumber} onChange={this.handleChangeLot} inputProps={{style: {textTransform: 'uppercase', width: '400px', marginBottom: '3%'}}} required /><br></br>
                <TextField id="standard-5sic" label="New Warehouse" value={this.state.Warehouse} onChange={this.handleChangeWarehouse} inputProps={{style: {textTransform: 'uppercase', width: '400px', marginBottom: '3%'}}} required /><br></br>
                <TextField id="standard-5sic" label="New Bin" value={this.state.Bin} onChange={this.handleChangeBin} inputProps={{style: {width: '400px', marginBottom: '3%'}}} /><br></br>
                <TextField id="standard-5sic" label="Change Warehouse Reason" value={this.state.ChangeWHReason} onChange={this.handleChangeWarehouseReason} inputProps={{style: { width: '400px', marginBottom: '3%'}}} required /><br></br>
                <TextField id="standard-5sic" type="number" label="Change Warehouse Quantity" value={this.state.ChangeWHQty} onChange={this.handleChangeWarehouseQTY} inputProps={{style: { width: '400px', marginBottom: '3%'}}} required /><br></br>
              </div>
              <Button variant="contained" onClick={this.changeWHBin} style={{width: '50%', padding: '2% 4%', margin: '5% auto 0 auto', backgroundColor: '#0000AE', color: '#FFF'}}>Submit</Button>
            </form>
            </TabPanelUpdate>
        </TabPanelRequest>
        <TabPanelRequest value={this.state.RequestTab} index={3}>
            <h2>Inactivate Parts Masters</h2>
            <TabPanelUpdate value={this.state.UpdateTab} index={0}>
            <form className="batchFileSelect">
                <h3>Select a file to import</h3>
                <CSVReader
                  ref={buttonRef}
                  onFileLoad={this.handleSPOnFileLoad}
                  onError={this.handleOnError}
                  noClick
                  noDrag
                  config={{header: true}}
                  onRemoveFile={this.handleOnRemoveFile}> 
                {({ file }) => (
                <article
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginBottom: 15,
                  padding: '2% 0.5%'
                }}>
                <button
                  type='button'
                  onClick={this.handleOpenDialog}
                  style={{
                    backgroundColor: '#659CEF',
                    color: '#ffffff',
                    border: 'none',
                    fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
                    borderRadius: '6px 0px 0px 6px'
                  }}>
                  Choose file...
                </button>
                <div
                  style={{
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: '#ccc',
                    width: 300,
                    fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
                  }}>
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
                >Remove
                </button>
              </article>
            )}</CSVReader>
              </form>
              <Button variant="contained" onClick={this.inactivatePNBatch} style={{width: '50%', padding: '2% 4%', margin: '5% auto 0 auto', backgroundColor: '#0000AE', color: '#FFF'}}>Submit</Button>
            </TabPanelUpdate>
            <TabPanelUpdate value={this.state.UpdateTab} index={1}>
                <TextField id="standard-5sic" label="Part Number" value={this.state.PartNumber} onChange={this.handleChangePartNumber} inputProps={{style: {textTransform: 'uppercase', width: '400px', marginBottom: '3%'}}} required /><br></br>
                <Button variant="contained" onClick={this.inactivatePN} style={{width: '50%', padding: '2% 4%', margin: '5% auto 0 auto', backgroundColor: '#0000AE', color: '#FFF'}}>Submit</Button>
            </TabPanelUpdate>
        </TabPanelRequest>
        <TabPanelRequest value={this.state.RequestTab} index={4}>
            <h2>Activate Part Numbers</h2>
            <TabPanelUpdate value={this.state.UpdateTab} index={0}>
            <form className="batchFileSelect">
                <h3>Select a file to import</h3>
                <CSVReader
                  ref={buttonRef}
                  onFileLoad={this.handleSPOnFileLoad}
                  onError={this.handleOnError}
                  noClick
                  noDrag
                  config={{header: true}}
                  onRemoveFile={this.handleOnRemoveFile}> 
                {({ file }) => (
                <article
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginBottom: 15,
                  padding: '2% 0.5%'
                }}>
                <button
                  type='button'
                  onClick={this.handleOpenDialog}
                  style={{
                    backgroundColor: '#659CEF',
                    color: '#ffffff',
                    border: 'none',
                    fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
                    borderRadius: '6px 0px 0px 6px'
                  }}>
                  Choose file...
                </button>
                <div
                  style={{
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: '#ccc',
                    width: 300,
                    fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
                  }}>
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
                >Remove
                </button>
              </article>
            )}</CSVReader>
              </form>
              <Button variant="contained" onClick={this.activatePNBatch} style={{width: '50%', padding: '2% 4%', margin: '5% auto 0 auto', backgroundColor: '#0000AE', color: '#FFF'}}>Submit</Button>
            </TabPanelUpdate>
            <TabPanelUpdate value={this.state.UpdateTab} index={1}>
              <TextField id="standard-5sic" label="Part Number" value={this.state.PartNumber} onChange={this.handleChangePartNumber} inputProps={{style: {textTransform: 'uppercase', width: '400px', marginBottom: '3%'}}} required /><br></br>
              <Button variant="contained" onClick={this.activatePN} style={{width: '50%', padding: '2% 4%', margin: '5% auto 0 auto', backgroundColor: '#0000AE', color: '#FFF'}}>Submit</Button>
            </TabPanelUpdate>
        </TabPanelRequest>
        <TabPanelRequest value={this.state.RequestTab} index={5}>
            <TabPanelUpdate value={this.state.UpdateTab} index={0}>
                part Pricing batch
            </TabPanelUpdate>
            <TabPanelUpdate value={this.state.UpdateTab} index={1}>
                part Pricing single
            </TabPanelUpdate>
        </TabPanelRequest>
      </div>
    );
  }
}

export default Inventory