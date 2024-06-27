import React, { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { useUserContext } from '../User/UserContext';
import { auth } from '../../firebase/firebase';
import { createUserInDB } from '../User/userService';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import './login.css';
import logo from '../../assets/logo.png'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUserContext();

  const handleGoogleSignIn = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await createUserInDB(user);
      setUser(user);
      navigate('/home');
    } catch (error) {
      console.error('Google Sign-In error:', error);
      setError('An error occurred during Google Sign-In. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUser(user);
      navigate('/home');
    } catch (error) {
      console.error('Email/Password Login error:', error);
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img src={logo} alt="Mental Wellness App Logo" className="logo" />
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Your journey to better mental health continues here</p>
        <button onClick={handleGoogleSignIn} className="login-button google-button" disabled={isLoading}>
          <FaGoogle className="button-icon" />
          {isLoading ? 'Signing in...' : 'Sign in with Google'}
        </button>
        <div className="separator">or</div>
        <form onSubmit={handleEmailLogin} className="login-form">
          <div className="form-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              className="form-input"
            />
          </div>
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <p className="signup-text">
          New to our app? <Link to="/signup" className="signup-link">Create an account</Link>
        </p>
        <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
      </div>
    </div>
  );
};

export default Login;