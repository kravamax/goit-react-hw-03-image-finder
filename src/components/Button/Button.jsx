import React from 'react';
import s from './Button.module.css';

const Button = ({ onClick }) => {
  return (
    <button className={s.button} onClick={onClick}>
      Load more
    </button>
  );
};

export default Button;
