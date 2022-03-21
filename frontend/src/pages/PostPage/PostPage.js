import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import postPic from '../../assets/images/diego-jimenez-A-NVHPka9Rk-unsplash.jpg';
import { FaUserCircle } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { RiChatDeleteFill } from 'react-icons/ri';

import { getSinglePost, deletePost } from '../../redux/actions/postActions';
import { motion } from 'framer-motion';
import './PostPage.scss';
import Loader, { SmallLoader } from '../../components/Loader/Loader';

const PostPage = () => {
  const [isPostOfLoggedUser, setIsPostOfLoggedUser] = useState(false);

  const dispatch = useDispatch();
  const { postId } = useParams();
  const navigate = useNavigate();

  const singlePost = useSelector((state) => state.singlePost);
  const { loading, error, storeData: post } = singlePost;

  const deletedPost = useSelector((state) => state.deletePost);
  const {
    loading: loadingDelete,
    error: errorDelete,
    storeData: isDeleted,
  } = deletedPost;

  const userLogin = useSelector((state) => state.userLogin);
  const { storeData: currentUser } = userLogin;

  useEffect(() => {
    if (currentUser) {
      if (post) {
        setIsPostOfLoggedUser(currentUser.user._id === post.user);
      }
    }
    console.log('out side delete 1111');
  }, [post, currentUser]);

  useEffect(() => {
    dispatch({ type: 'POST_SINGLE_RESET' });
    dispatch(getSinglePost(postId));
    console.log('out side single reset');
  }, [dispatch, postId]);

  useEffect(() => {
    if (isDeleted === 'success') {
      navigate('/');
      // console.log(loadingDelete);
      alert('Post deleted successfully');
      dispatch({ type: 'POST_REMOVE_RESET' });
    }
    console.log('out side delete');
  }, [dispatch, isDeleted, navigate]);

  const postDeleteHandler = () => {
    // confirm('Are you sure you want to delete this post?')
    // the below dispatch code was completely executed before the if statement, and the post was already deleted at the backend and then the control of the program moved to the next line of code. still think later.
    dispatch(deletePost(postId));
  };

  console.log(loadingDelete);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className='post-page'>
        <div className='postpage-container'>
          <div className='postpage-card'>
            {error && <p>{error}</p>}
            {loading ? (
              <Loader />
            ) : (
              post && (
                <>
                  <h1>{post.title}</h1>
                  <div className='post-info'>
                    <div className='user-photo'>
                      <FaUserCircle />
                    </div>
                    <div className='post-date'>
                      - published on {new Date(post.createdAt).getDate()}{' '}
                      {new Date(post.createdAt).toLocaleString('deafult', {
                        month: 'long',
                      })}
                      , {new Date(post.createdAt).getFullYear()}
                    </div>
                  </div>
                  <div className='post-image'>
                    <img src={postPic} alt='post-image' />
                  </div>
                  <div className='post-content'>
                    {post.body.split('\n').map((item, index) => (
                      <p key={index}>{item}</p>
                    ))}
                  </div>

                  {loadingDelete ? (
                    <SmallLoader />
                  ) : (
                    isPostOfLoggedUser && (
                      <div className='post-edit-delete'>
                        <Link to={`/editpost/${post._id}`}>
                          <button className='btn post-edit'>
                            <FiEdit /> Edit
                          </button>
                        </Link>
                        <button
                          className='btn post-delete'
                          onClick={postDeleteHandler}
                        >
                          <RiChatDeleteFill />
                          Delete
                        </button>
                      </div>
                    )
                  )}
                  {errorDelete && <p>{errorDelete}</p>}

                  <p className='numComments'>2 Comments</p>
                  <div className='postpage-comments'>
                    <div className='comment'>
                      <div className='comment-user-image'>
                        <FaUserCircle />
                      </div>
                      <div className='comment-main'>
                        <div className='comment-info'>
                          <h3>Geralt of Rivia</h3>
                          <p>2 days ago</p>
                        </div>
                        <div className='comment-content'>
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit. At, autem. Lorem ipsum dolor sit, amet
                          consectetur adipisicing elit. Sit voluptates
                          similique, tempora deserunt quidem labore aspernatur
                          facere sapiente delectus corrupti.
                        </div>
                      </div>
                    </div>

                    <div className='comment'>
                      <div className='comment-user-image'>
                        <FaUserCircle />
                      </div>
                      <div className='comment-main'>
                        <div className='comment-info'>
                          <h3>Geralt of Rivia</h3>
                          <p>2 days ago</p>
                        </div>
                        <div className='comment-content'>
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit. At, autem. Lorem ipsum dolor sit, amet
                          consectetur adipisicing elit. Sit voluptates
                          similique, tempora deserunt quidem labore aspernatur
                          facere sapiente delectus corrupti.
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PostPage;
