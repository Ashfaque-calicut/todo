import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ProjectsPage.css';
import AddTodo from './AddTodo';

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [todosMap, setTodosMap] = useState({});

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:4000/projects/all', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Projects:', response.data); 
        setProjects(response.data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
        setError('Failed to fetch projects. Please try again.'); 
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    projects.forEach(async (project) => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:4000/projects/${project._id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTodosMap((prevTodosMap) => ({
          ...prevTodosMap,
          [project._id]: response.data.todos
        }));
      } catch (error) {
        console.error(`Failed to fetch todos for project ${project._id}:`, error);
      }
    });
  }, [projects]);

  const handleTodoClick = async (todoId, projectId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:4000/todos/${todoId}`, { status: 'completed' }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTodosMap((prevTodosMap) => ({
        ...prevTodosMap,
        [projectId]: prevTodosMap[projectId].map((todo) =>
          todo._id === todoId ? { ...todo, status: 'completed' } : todo
        )
      }));
    } catch (error) {
      console.error('Failed to mark todo as completed:', error);
    }
  };

  const handleRemoveTodo = async (todoId, projectId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:4000/todos/${todoId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTodosMap((prevTodosMap) => ({
        ...prevTodosMap,
        [projectId]: prevTodosMap[projectId].filter((todo) => todo._id !== todoId)
      }));
    } catch (error) {
      console.error('Failed to remove todo:', error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:4000/projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const updatedProjects = projects.filter((project) => project._id !== projectId);
      setProjects(updatedProjects);
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  if (error) {
    return <div>Error: {error}</div>; 
  }

  return (
    <div className="projects-container">
      <h2 className="projects-heading">Projects</h2>
      <ul className="projects-list">
        {projects.map((project) => (
          <li key={project._id} className="project-item">
            <div className="project-details">
              <h3>{project.title}</h3>
              <button className="delete-button" onClick={() => handleDeleteProject(project._id)}>Delete</button>
            </div>
            <div>
              <h4>Pending Todos</h4>
              <ul>
                {todosMap[project._id]
                  ? todosMap[project._id].map((todo) =>
                      todo.status === 'pending' ? (
                        <li key={todo._id} className="todo-item">
                          <input
                            type="checkbox"
                            checked={false}
                            onChange={() => handleTodoClick(todo._id, project._id)}
                          />
                          <span>{todo.description}</span>
                          <button className="remove-button" onClick={() => handleRemoveTodo(todo._id, project._id)}>Remove</button>
                          <Link to={`/update-todo/${todo._id}`} className="update-button">Update</Link>
                        </li>
                      ) : null
                    )
                  : null}
              </ul>
              <h4>Completed Todos</h4>
              <ul>
                {todosMap[project._id]
                  ? todosMap[project._id].map((todo) =>
                      todo.status === 'completed' ? (
                        <li key={todo._id} className="todo-item">
                          <input type="checkbox" checked={true} readOnly />
                          <span>{todo.description}</span>
                          <button className="remove-button" onClick={() => handleRemoveTodo(todo._id, project._id)}>Remove</button>
                        </li>
                      ) : null
                    )
                  : null}
              </ul>
            </div>
            <AddTodo project={project} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectsPage;
