import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddProject.css';

function AddProject() {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:4000/projects/add',
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('Project added successfully:', response.data);
      navigate('/projects');
    } catch (error) {
      console.error('Failed to add project:', error);
      setError('Failed to add project. Please try again.');
    }
  };

  return (
    <div className="add-project-container">
      <h2 className="add-project-heading">Add Project</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="add-project-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="add-project-input"
          required
        />
        <button type="submit" className="add-project-button">Add Project</button>
      </form>
    </div>
  );
}

export default AddProject;
