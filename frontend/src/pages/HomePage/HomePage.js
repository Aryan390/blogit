import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import water from '../../assets/images/boxed-water-is-better-stpmvHj6C-o-unsplash.jpg';
import boat from '../../assets/images/luca-bravo-O453M2Liufs-unsplash.jpg';
import Loader from '../../components/Loader/Loader';
import { getListPosts } from '../../redux/actions/postActions';
import { motion } from 'framer-motion';
import './HomePage.scss';

const HomePage = () => {
  const dispatch = useDispatch();
  const listPosts = useSelector((state) => state.listPosts);
  const { storeData: posts, loading, error } = listPosts;

  useEffect(() => {
    dispatch(getListPosts());
  }, [dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className='home-page'>
        <h1>A Blogging Website</h1>
        <div className='home-container'>
          <div className='carousel'>
            <div className='carousel-item'>
              <img src={boat} alt='carousel-item' className='carousel-img' />
              <div className='carousel-content'>
                <h1>Travel Blog</h1>
                <p>by - kalle halden</p>
                <button className='read-btn btn'>Read More</button>
              </div>
            </div>
          </div>
          <div className='post-cards'>
            {error && <p>{error}</p>}
            {loading ? (
              <Loader />
            ) : posts ? (
              <>
                {posts.map((post, index) => (
                  <Link key={index} to={`/post/${post._id}`}>
                    <div className='card'>
                      <div className='card-image'>
                        <img src={water} alt='card' />
                      </div>
                      <div className='card-content'>
                        <h3>{post.title}</h3>
                        <p>{post.body.substring(0, 100)}...</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HomePage;
