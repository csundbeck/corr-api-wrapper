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
import { AppBar } from '@material-ui/core';

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

class TabsTest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      //***API USER CREDENTIALS BEGIN***//
      AliasName: 'CS_120183',
      LoginID: 'APIUSER',
      LoginPassword: 'KNWZtcj',
      //***API USER CREDENTIALS END***//
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

  render() {
    return (
      <div className="mainDiv">
        <Tabs className='requestTabGroup' value={this.state.RequestTab} onChange={this.handleRequestTabChange} aria-label="simple tabs example" variant="scrollable" scrollButtons="auto">
            <Tab label="Alternate Parts" {...a11yProps(0)} style={{fontWeight: 'bold'}} />
            <Tab label="Warehouse/Bin Change" {...a11yProps(1)} style={{fontWeight: 'bold'}} />
            <Tab label="Superceded Parts" {...a11yProps(2)} style={{fontWeight: 'bold'}} />
            <Tab label="Parts Pricing" {...a11yProps(3)} style={{fontWeight: 'bold'}} />
        </Tabs>
        <Tabs className='updateTabGroup' value={this.state.UpdateTab} onChange={this.handleUpdateTabChange} aria-label="simple tabs example">
            <Tab label="Batch Update" {...a11yProps(0)} />
            <Tab label="Single Update" {...a11yProps(1)} />
        </Tabs>
        <TabPanelRequest value={this.state.RequestTab} index={0}>
          <TabPanelUpdate value={this.state.UpdateTab} index={0}>
                Alt batch
            </TabPanelUpdate>
            <TabPanelUpdate value={this.state.UpdateTab} index={1}>
                Alt single
            </TabPanelUpdate>
        </TabPanelRequest>
        <TabPanelRequest value={this.state.RequestTab} index={1}>
            <TabPanelUpdate value={this.state.UpdateTab} index={0}>
                WH batch
            </TabPanelUpdate>
            <TabPanelUpdate value={this.state.UpdateTab} index={1}>
                WH single
            </TabPanelUpdate>
        </TabPanelRequest>
        <TabPanelRequest value={this.state.RequestTab} index={2}>
            <TabPanelUpdate value={this.state.UpdateTab} index={0}>
                Superceded batch
            </TabPanelUpdate>
            <TabPanelUpdate value={this.state.UpdateTab} index={1}>
                Superceded single
            </TabPanelUpdate>
        </TabPanelRequest>
        <TabPanelRequest value={this.state.RequestTab} index={3}>
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

export default TabsTest