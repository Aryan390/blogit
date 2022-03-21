import React from 'react';
import './Input.scss';

const Input = (props) => {
  const { placeholder, ...newProps } = props;

  return (
    <input
      {...newProps}
      className='input-fields form-control'
      placeholder={placeholder}
    />
  );
};

export default Input;
