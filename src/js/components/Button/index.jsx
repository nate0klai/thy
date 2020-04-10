import React, {useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import "./styles.scss";

function Button({onClick, type, title, mod}) {
  const onButtonClick = useCallback(onClick, [onClick]);
  const className = useMemo(() => clsx('button', {[mod]: mod}), [mod]);

  return (
    <button type={type} className={className} onClick={onButtonClick}>{title}</button>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
  mod: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  title: 'button',
  onClick: () => null
};

export default Button;