import React from 'react';
import { useSelector } from 'react-redux';

import { NavLink } from 'react-router-dom';
import NavProfile from '../NavProfile/NavProfile';
import './Headers.scss';

const Header = () => {
  const { storeData: user } = useSelector((state) => state.userLogin);
  // console.log('from header');
  return (
    <div className='header'>
      <div className='container'>
        <div className='flex-header-container'>
          <NavLink to='/'>
            <div className='header__logo'>
              <h1>
                Blog <span className='colored'>it.</span>
              </h1>
            </div>
          </NavLink>
          {user ? (
            <NavProfile />
          ) : (
            <div className='login-register-btns'>
              <NavLink
                to='/register'
                className={(navData) =>
                  navData.isActive ? 'sign-btn active-btn' : 'sign-btn'
                }
              >
                Sign up
              </NavLink>
              <NavLink
                to='/login'
                className={(navData) =>
                  navData.isActive ? 'sign-btn active-btn' : 'sign-btn'
                }
              >
                Login
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
