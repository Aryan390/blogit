import { useState, useCallback } from 'react';

const useInput = (validation) => {
  const [inputValue, setInputValue] = useState('');

  const isValid = validation(inputValue);

  const setInputState = useCallback((value) => setInputValue(value), []);

  const inputChangeHandler = (event) => {
    setInputValue(event.target.value);
  };

  const reset = () => {
    setInputValue('');
  };

  return {
    value: inputValue,
    setInputState,
    inputChangeHandler,
    isValid,
    reset,
  };
};

export default useInput;
