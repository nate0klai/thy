import React, {Component, useReducer} from 'react';
import "./styles.scss";

import { Box, Modal } from "@material-ui/core";
import { ErrorOutline as ErrorOutlineIcon } from "@material-ui/icons";
import TextField from 'components/TextField';
import Button from 'components/Button';
import User from 'components/User';
import {gitApiUserDataRequest} from "actions";

const errorMessages = {
  404: 'Sorry! User not found! try to change the login and search again :)',
  100: 'Sorry! there is network error! try again later :)',
  101: 'Sorry! there is unknown error! connect with adminisrator ;)'
};

class Search extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      error: {
        detected: false,
        data: null
      },
      searchValue: 'vsevolodroschupkin',
      userData: null
    }
  }
  
  onSearchFieldInputListener = (val) => {
    this.setState({searchValue: val});
  };
  onSearchButtonClickListener = async () => {
    const {searchValue} = this.state;
    this.setState({userData: null});
    const requestData = await gitApiUserDataRequest(searchValue);
    switch (requestData.type) {
      case 'user': this.setState({userData: requestData}); return;
      case 'error': this.setState({error: {detected: true, data: {message: errorMessages[requestData.status]}}}); return;
    }
  };
  handleModalClose = () => {
    this.setState({error: {detected: false, data: null}});
  };
  
  render() {
    const {error: {detected, data}, userData, searchValue} = this.state;
    
    console.log('data', data);
    
    return (
      <Box className="search">
        <Box className="search__textfield">
          <TextField onInput={this.onSearchFieldInputListener}/>
        </Box>
        <Box className="search__button" mt={2}>
          <Button onClick={this.onSearchButtonClickListener} title="search!" permanent={true}/>
        </Box>
        {userData && userData.type === 'user' && <Box className="search__userdata"><User name={userData.name} avatar={userData.avatar} reposCount={userData.reposCount} login={searchValue}/></Box>}
        <Modal
          open={detected}
          onClose={this.handleModalClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <Box className="modal modal-error">
            <ErrorOutlineIcon color="secondary" style={{fontSize: 80}}/>
            <Box className="modal-error__text" mt={2} p={2}>{data && data.message}</Box>
          </Box>
        </Modal>
      </Box>
    )
  }
}

export default Search;