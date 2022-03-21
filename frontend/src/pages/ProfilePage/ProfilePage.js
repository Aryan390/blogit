import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader, { SmallLoader } from '../../components/Loader/Loader';
import profileImg from '../../assets/images/michael-dam-mEZ3PoFGs_k-unsplash.jpg';
import Input from '../../components/Inputs/Input';
import useInput from '../../hooks/use-input';
import { getProfile, updateProfile } from '../../redux/actions/userActions';
import { motion } from 'framer-motion';
import './ProfilePage.scss';

const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false);

  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userProfile);
  const { loading, error, storeData: user } = userProfile;

  const {
    value: name,
    setInputState: setName,
    inputChangeHandler: nameChangeHandler,
    isValid: nameIsValid,
  } = useInput((value) => value.trim().length > 0);

  const {
    value: email,
    setInputState: setEmail,
    inputChangeHandler: emailChangeHandler,
    isValid: emailIsValid,
  } = useInput((value) => value.includes('@') && value.trim().length > 0);

  useEffect(() => {
    if (!user) {
      dispatch(getProfile());
    }
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, user, setName, setEmail]);

  const editModeHandler = () => {
    setEditMode((prevState) => !prevState);
  };

  const submitHandler = () => {
    if (!nameIsValid || !emailIsValid) {
      alert('please enter all field and input valid data');
      return;
    }
    dispatch(updateProfile(name, email));
    alert('profile updated successfully');
    editModeHandler();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className='profile-page'>
        <div className='profilepage-container'>
          <div className='profilepage-card'>
            {error && <div>{error}</div>}
            {loading ? (
              <Loader />
            ) : !user ? null : (
              <>
                <h2>Hey! How's it going</h2>
                <p>{user.name.charAt(0) + user.name.slice(1)}'s Profile</p>
                <div className='profilepage-image'>
                  <img src={profileImg} alt='profile-img' />
                </div>
                <div className='profilepage-credentials'>
                  <div className='credential'>
                    <div className='credential-label'>Username</div>
                    <Input
                      value={name}
                      disabled={!editMode}
                      onChange={nameChangeHandler}
                    />
                  </div>
                  <div className='credential'>
                    <div className='credential-label'>Email</div>
                    <Input
                      value={email}
                      disabled={!editMode}
                      onChange={emailChangeHandler}
                    />
                  </div>
                </div>

                <div className='user-select-photos'></div>

                <div className='profilepage-buttons'>
                  {loading}
                  {editMode ? (
                    <div className='special-btns'>
                      <button
                        className='profile-btn btn'
                        onClick={submitHandler}
                      >
                        Submit
                      </button>
                      <button
                        className='profile-btn btn'
                        onClick={editModeHandler}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      className='profile-btn btn'
                      onClick={editModeHandler}
                    >
                      Edit Profile
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
