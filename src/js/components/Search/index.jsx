import React, {useState, useCallback} from 'react';
import "./styles.scss";

import {Box, Modal} from "@material-ui/core";
import {ErrorOutline as ErrorOutlineIcon} from "@material-ui/icons";
import TextField from 'components/TextField';
import Button from 'components/Button';
import User from 'components/User';
import {gitApiUserDataRequest} from "actions";

const errorMessages = {
  404: 'Sorry! User not found! try to change the login and search again :)',
  100: 'Sorry! there is network error! try again later :)',
  101: 'Sorry! there is unknown error! connect to adminisrator ;)'
};

function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState({detected: false, data: null});

  const onSearchFieldInputListener = useCallback(val => setSearchValue(val), []);
  const onSearchButtonClickListener = useCallback(async () => {
    setUserData(null);
    const requestData = await gitApiUserDataRequest(searchValue);
    switch (requestData.type) {
      case 'user':
        setUserData(requestData);
        return;
      case 'error':
        setError({
          detected: true,
          data: {
            message: errorMessages[requestData.status]
          }
        });
        return;
    }
  }, [searchValue]);
  const handleModalClose = useCallback(() => {
    setError({detected: false, data: null});
  }, []);

  return (
    <Box className="search">
      <Box className="search__textfield">
        <TextField onInput={onSearchFieldInputListener} icon="search" onKeyEnter={onSearchButtonClickListener} placeholder="enter someone login"/>
      </Box>
      <Box className="search__button" mt={2}>
        <Button onClick={onSearchButtonClickListener} title="search!"/>
      </Box>
      {userData && userData.type === 'user' && (
        <Box className="search__userdata">
          <User
            name={userData.name}
            avatar={userData.avatar}
            reposCount={userData.reposCount}
            login={searchValue}
          />
        </Box>)}
      <Modal
        open={error.detected}
        onClose={handleModalClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box className="modal modal-error">
          <ErrorOutlineIcon color="secondary" style={{fontSize: 80}}/>
          <Box className="modal-error__text" mt={2} p={2}>{error.data && error.data.message}</Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default Search;