import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Box, Avatar, CircularProgress} from "@material-ui/core";
import Pagination from "components/Pagination";
import {gitApiReposDataRequest} from "actions/index";

import "./styles.scss";

const itemsPerPage = 30;

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorDetected: false,
      list: null
    };
  }

  getPageList = async () => {
    const {login} = this.props;
    const list = this.state.list || [];
    const requestData = await gitApiReposDataRequest(login, (list.length/itemsPerPage) + 1, itemsPerPage);
    console.log(requestData);
    switch (requestData.type) {
      case 'list': this.setState({list: [...list, ...requestData.list]}); return;
      case 'error': this.setState({errorDetected: true}); return;
    }
  };

  render() {
    const {getPageList, props: {name, avatar, reposCount}, state: {errorDetected, list}} = this;

    ((!list || list.length < reposCount) && !errorDetected) && getPageList();
    
    return (
      <Box className="user" mt={2}>
        <Box className="user__info">
          <Avatar alt={name} src={avatar} />
          <Box ml={2} className="user__data">
            <Box>{name}</Box>
            <Box>public repos: {reposCount}</Box>
          </Box>
        </Box>
        <Box className="user__list" p={1}>
          {list ? <Pagination count={reposCount} list={list}/> : <CircularProgress color="secondary" />}
        </Box>
      </Box>
    )
  }
}

User.defaultProps = {
  name: ''
};

User.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string
};

export default User;