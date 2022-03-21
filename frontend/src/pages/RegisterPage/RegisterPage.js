import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../components/Inputs/Input';
import { SmallLoader } from '../../components/Loader/Loader';
import loginSvg from '../../assets/images/undraw_welcoming_re_x0qo.svg';
import useInput from '../../hooks/use-input';
import { register } from '../../redux/actions/userActions';
import { motion } from 'framer-motion';

import '../LoginPage/LoginPage.scss';
// import './RegisterPage.scss';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    storeData: user,
    loading,
    error,
  } = useSelector((state) => state.userLogin);

  const {
    value: name,
    isValid: nameIsValid,
    inputChangeHandler: nameChangeHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== '');

  const {
    value: email,
    isValid: emailIsValid,
    inputChangeHandler: emailChangeHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes('@') && value.trim() !== '');

  const {
    value: password,
    isValid: passwordIsValid,
    inputChangeHandler: passwordChangeHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim() !== '');

  const {
    value: confirmPassword,
    isValid: confirmPasswordIsValid,
    inputChangeHandler: confirmPasswordChangeHandler,
    reset: resetConfirmPasswordInput,
  } = useInput((value) => value.trim() !== '');

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      !nameIsValid ||
      !emailIsValid ||
      !passwordIsValid ||
      !confirmPasswordIsValid
    ) {
      alert('Your email or password is invalid');
      resetNameInput();
      resetEmailInput();
      resetPasswordInput();
      resetConfirmPasswordInput();
      return;
    }

    if (password !== confirmPassword) {
      alert('Your passwords do not match');
      resetPasswordInput();
      resetConfirmPasswordInput();
      return;
    }

    dispatch(register(name, email, password));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className='login-page'>
        <div className='container'>
          <div className='card'>
            <div className='login-svg'>
              <img src={loginSvg} alt='login' />
            </div>
            <form className='login-details'>
              <div className='input-container'>
                <Input
                  type='text'
                  placeholder='Enter your Username...'
                  value={name}
                  onChange={nameChangeHandler}
                />
              </div>

              <div className='input-container'>
                <Input
                  type='email'
                  placeholder='Enter your Email...'
                  value={email}
                  onChange={emailChangeHandler}
                />
              </div>

              <div className='input-container'>
                <Input
                  type='password'
                  placeholder='Enter your Password...'
                  value={password}
                  onChange={passwordChangeHandler}
                />
              </div>

              <div className='input-container'>
                <Input
                  type='password'
                  placeholder='Confirm your Password...'
                  value={confirmPassword}
                  onChange={confirmPasswordChangeHandler}
                />
              </div>

              {loading ? (
                <SmallLoader />
              ) : (
                <button
                  className='login-btn btn'
                  type='submit'
                  onClick={submitHandler}
                >
                  Register
                </button>
              )}

              {error && 'There was an error here'}
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;
