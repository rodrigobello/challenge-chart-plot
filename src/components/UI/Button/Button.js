import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

/**
 * Pre-customized button to be reused.
 */
const Button = ({
  color,
  onClick,
  children,
}) => (
  <button
    className={`Button ${color === 'secondary' ? 'secondary' : 'primary'}`}
    type="button"
    onClick={onClick}
  >
    { children }
  </button>
);

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  color: PropTypes.string,
};

Button.defaultProps = {
  color: 'primary',
  onClick: () => null,
};

export default Button;
