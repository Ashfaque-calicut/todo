import React, { useState } from 'react';
import axios from 'axios';
import './SignupPage.css';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/auth/signup', { username, password });
      console.log('Signup response:', response.data);
    } catch (error) {
      console.error('Failed to create user:', error.response.data.message); 
      setError('Failed to create user. Please try again.'); 
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="input-field"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input-field"
        />
        <button type="submit" className="submit-button">Signup</button>
      </form>
    </div>
  );
}

export default SignupPage;
