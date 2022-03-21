import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../../components/Inputs/Input';
import { SmallLoader } from '../../components/Loader/Loader';
import useInput from '../../hooks/use-input';
import { login } from '../../redux/actions/userActions';
import loginSvg from '../../assets/images/undraw_people_re_8spw.svg';
import { motion } from 'framer-motion';
import './LoginPage.scss';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, storeData: user } = userLogin;

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

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!emailIsValid || !passwordIsValid) {
      alert('Your email or password is invalid');
      resetEmailInput();
      resetPasswordInput();
      return;
    }

    dispatch(login(email, password));
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
            <form className='login-details'>
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

              {loading ? (
                <SmallLoader />
              ) : (
                <button
                  className='login-btn btn'
                  type='submit'
                  onClick={submitHandler}
                >
                  Login
                </button>
              )}

              {error && 'There was an error here'}
            </form>
            <div className='login-svg'>
              <img src={loginSvg} alt='login' />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;
