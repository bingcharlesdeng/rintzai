import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { useUserContext } from '../User/UserContext';
import { auth } from '../../firebase/firebase';
import { createUserInDB } from '../User/userService';
import './signup.css';
import signup from '../../assets/signup.jpeg';

const Signup = () => {
  const { setUser } = useUserContext();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });
      await createUserInDB(user);

      setUser(user);
      navigate('/home');
    } catch (error) {
      console.error("Error during signup:", error);
      setError(error.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <img src={signup} alt="Logo" className="logo" />
        <h2 className="signup-title">Create Your Account</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="form-input"
            />
          </div>
          <button type="submit" className="signup-button" disabled={isLoading}>
            {isLoading ? 'Signing up...' : 'Sign Up'}
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
        <p className="login-text">
          Already have an account? <Link to="/login" className="login-link">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;