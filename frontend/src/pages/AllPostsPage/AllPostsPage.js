import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import water from '../../assets/images/boxed-water-is-better-stpmvHj6C-o-unsplash.jpg';
import Loader from '../../components/Loader/Loader';
import { getListPosts } from '../../redux/actions/postActions';
import { motion } from 'framer-motion';
import './AllPostsPage.scss';

const AllPostsPage = () => {
  const dispatch = useDispatch();
  let postsOfLoggedUser;

  const listPosts = useSelector((state) => state.listPosts);
  const { loading, error, storeData: posts } = listPosts;

  const userLogin = useSelector((state) => state.userLogin);
  const {
    storeData: { user },
  } = userLogin;

  useEffect(() => {
    dispatch(getListPosts());
  }, [dispatch]);

  if (user) {
    if (posts) {
      postsOfLoggedUser = posts.filter((post) => post.user === user._id);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className='allposts-page'>
        <h1>Your Posts</h1>
        <div className='post-cards'>
          {loading ? (
            <Loader />
          ) : postsOfLoggedUser ? (
            postsOfLoggedUser.length === 0 ? (
              <div className='no-posts'>No Posts Found</div>
            ) : (
              postsOfLoggedUser.map((post, index) => (
                <Link to={`/post/${post._id}`} key={index}>
                  <div className='card' key={index}>
                    <div className='card-image'>
                      <img src={water} alt='card' />
                    </div>
                    <div className='card-content'>
                      <div className='post-info'>
                        <h3>{post.title}</h3>
                        <p>- March 20, 2020</p>
                      </div>
                      <p>{post.body.substring(0, 100)}</p>
                    </div>
                  </div>
                </Link>
              ))
            )
          ) : null}
        </div>
      </div>
    </motion.div>
  );
};

export default AllPostsPage;
