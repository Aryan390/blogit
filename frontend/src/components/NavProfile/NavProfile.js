import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { RiUserReceivedFill } from 'react-icons/ri';
import { MdDocumentScanner } from 'react-icons/md';
import { BiMessageSquareAdd } from 'react-icons/bi';
import { BiLogOut } from 'react-icons/bi';
import { logout } from '../../redux/actions/userActions';
import './NavProfile.scss';

const NavProfile = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      <div className='nav-profile'>
        <div className='profile'>
          <FaUserCircle />
        </div>
        <div className='nav-dropdown'>
          <div className='dropdown-wrapper'>
            <Link to='/profile' className='nav-items'>
              <RiUserReceivedFill />
              <div>Profile</div>
            </Link>
            <Link to='/posts' className='nav-items'>
              <MdDocumentScanner />
              <div>Your Posts</div>
            </Link>
            <Link to='/addpost' className='nav-items'>
              <BiMessageSquareAdd />
              <div>New Post</div>
            </Link>
            <button className='nav-items' onClick={logoutHandler}>
              <BiLogOut />
              <div>Logout</div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavProfile;
