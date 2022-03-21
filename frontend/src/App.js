import { Routes, Route, useLocation } from 'react-router-dom';
import ProtectedRoute from './utils/ProtectedRoute';
import ScrollToTop from './utils/ScrollToTop';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import AllPostsPage from './pages/AllPostsPage/AllPostsPage';
import AddPostPage from './pages/AddPostPage/AddPostPage';
import PostPage from './pages/PostPage/PostPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import { AnimatePresence } from 'framer-motion';
import './App.css';

const App = () => {
  const location = useLocation();
  return (
    <>
      <ScrollToTop />
      <Header />
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<HomePage />} />
          <Route path='/post/:postId' element={<PostPage />} />
          <Route
            path='/addpost'
            element={
              <ProtectedRoute redirectTo='/login'>
                <AddPostPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/editpost/:postId'
            element={
              <ProtectedRoute redirectTo='/login'>
                <AddPostPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/posts'
            element={
              <ProtectedRoute redirectTo='/login'>
                <AllPostsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute redirectTo='/login'>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;
