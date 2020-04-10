import React, {useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import {Search as SearchIcon} from '@material-ui/icons';

import "./styles.scss";

function TextField({onInput, onKeyEnter, icon, iconAlign, placeholder}) {
  const inputListener = useCallback((event) => {
    if (onInput) {
      onInput(event.target.value);
    }
  }, [onInput]);
  const keyDownHandler = useCallback(event => {
    if (event.key === 'Enter' && onKeyEnter) {
      onKeyEnter();
    }
  }, [onKeyEnter]);
  const iconClassname = useMemo(() => clsx('textfield__icon', '_' + iconAlign), [iconAlign]);

  return (
    <label className="textfield">
      {icon === 'search' && <SearchIcon className={iconClassname}/>}
      <input
        type="text"
        className="textfield__input"
        placeholder={placeholder}
        onInput={inputListener}
        onKeyDown={keyDownHandler}/>
    </label>
  );
}

TextField.propTypes = {
  icon: PropTypes.oneOf(['', 'search']),
  iconAlign: PropTypes.oneOf(['left', 'right']),
  placeholder: PropTypes.string,
  onInput: PropTypes.func,
  onKeyEnter: PropTypes.func,
};

TextField.defaultProps = {
  iconAlign: 'left',
  placeholder: '',
  icon: ''
};

export default TextField;