import React from 'react';
import css from './Button.module.css';

const Button = ({ onClick, disabled }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={css.button}
  >
    <span>Load more</span>
  </button>
);

export default Button;
