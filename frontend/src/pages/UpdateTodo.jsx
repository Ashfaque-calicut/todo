import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateTodo() {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize navigate
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:4000/todos/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setDescription(response.data.description);
      } catch (error) {
        console.error('Failed to fetch todo:', error);
        setError('Failed to fetch todo. Please try again.');
      }
    };

    fetchTodo();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:4000/todos/${id}`,
        { description },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('Todo updated successfully');
      navigate('/projects'); 
    } catch (error) {
      console.error('Failed to update todo:', error);
      setError('Failed to update todo. Please try again.');
    }
  };

  return (
    <div>
      <h2>Update Todo</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Todo Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Update Todo</button>
      </form>
    </div>
  );
}

export default UpdateTodo;
