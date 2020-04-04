import React from 'react';
import PropTypes from 'prop-types';

import ButtonMui from '@material-ui/core/Button';

function Button({onClick, title}) {

  return (
    <ButtonMui variant="contained" color="primary" onClick={onClick}>{title}</ButtonMui>
  );
}

Button.propTypes = {
  title: PropTypes.string
};

Button.defaultProps = {
  title: 'button'
};

export default Button;