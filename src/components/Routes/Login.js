
// Login.js
import React, { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { useUserContext } from '../User/UserContext';
import { auth } from '../../firebase/firebase';
import { createUserInDB } from '../User/userService';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

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
        <h1 className="login-title">Mental Wellness App</h1>
        <button onClick={handleGoogleSignIn} className="login-button" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign in with Google'}
        </button>
        <form onSubmit={handleEmailLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login with Email/Password'}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <p className="signup-text">
          Don't have an account? <Link to="/signup" className="signup-link">Register</Link>
        </p>
        <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
      </div>
    </div>
  );
};

export default Login;