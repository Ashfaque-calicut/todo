import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProjectsPage from './pages/ProjectsPage';
import AddTodo from './pages/AddTodo';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './pages/Navbar';
import AddProject from './pages/AddProject';
import UpdateTodo from './pages/UpdateTodo';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };



  return (
    <Router>
      <Header/>
      <Routes>
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/projects" /> : <LoginPage onLogin={handleLogin} />}
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/projects"
          element={isLoggedIn ? <ProjectsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/projects" /> : <Navigate to="/login" />}
        />
         <Route path="/add-todo" element={<AddTodo/>} />
         <Route path='/add-Project' element={<AddProject/>}/>
         <Route path='/update-todo/:id' element={<UpdateTodo/>}/>
      </Routes>
    </Router>
  );
}

export default App;
