import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextFieldMui from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  searchStyle: {
    padding: theme.spacing(1),
    background: 'white',
    borderRadius: '35px'
  }
}));

export default function TextField({onInput}) {
  const {searchStyle} = useStyles();
  const input = React.createRef();
  const inputListener = (event) => {
    onInput(event.target.value);
  };

  return (
    <TextFieldMui
      ref={input}
      className={searchStyle}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        disableUnderline: true
      }}
      onInput={inputListener}
    />
  );
}