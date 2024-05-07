import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './LoginPage.css';

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/auth/login', { username, password });
      const { token } = response.data;
      localStorage.setItem('token', token); 
      onLogin();
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container ">
      <h2 className="login-heading">Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="login-input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="login-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" type="submit">Login</button>
      </form>
      <p className="signup-link">Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
}

export default LoginPage;
