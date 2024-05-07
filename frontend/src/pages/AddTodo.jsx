
import React, { useState } from 'react';
import axios from 'axios';

function AddTodo({ project }) {
  const [description, setDescription] = useState('');

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:4000/todos/${project._id}`, { description }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      window.location.href = '/projects';
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  return (
    <div className="add-todo-container">
      <h2>Add Todo</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            required
          />
        </div>
        <br/>
        <button className='submit'  type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddTodo;
