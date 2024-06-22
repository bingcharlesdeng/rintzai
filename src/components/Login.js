import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { useUserContext } from './UserContext';
import { auth } from '../firebase/firebase';
import { createUserInDB } from './userService';
import './login.css';
import Navbar from './Navbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userContext = useUserContext();
  console.log('Login component rendered. UserContext:', userContext);

  const handleGoogleSignIn = async () => {
    setError(null);
    try {
      console.log('Attempting Google Sign-In');
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Google Sign-In successful. User:', user);
      await createUserInDB(user);
      if (userContext && typeof userContext.setUser === 'function') {
        userContext.setUser(user);
        console.log('User set in context');
      } else {
        console.error('setUser is not available in userContext');
      }
      navigate('/home');
    } catch (error) {
      console.error('Google Sign-In error:', error);
      setError('An error occurred during Google Sign-In. Please try again.');
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      console.log('Attempting Email/Password Login');
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Email/Password Login successful. User:', user);
      if (userContext && typeof userContext.setUser === 'function') {
        userContext.setUser(user);
        console.log('User set in context');
      } else {
        console.error('setUser is not available in userContext');
      }
      navigate('/home');
    } catch (error) {
      console.error('Email/Password Login error:', error);
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="login-card">
          <h1 className="login-title">Mental Wellness App</h1>
          <button onClick={handleGoogleSignIn} className="login-button">
            Sign in with Google
          </button>
          <form onSubmit={handleEmailLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <button type="submit" className="login-button">
              Login with Email/Password
            </button>
          </form>
          {error && <p className="error-message">{error}</p>}
          <p className="signup-text">
            Don't have an account? <Link to="/signup" className="signup-link">Register</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;