import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SupervisorDashboard from './SupervisorDashboard';
import Login from './Login';
import AdminPage from './AdminPage'; 
import ViewTaskList from './ViewTaskList';

// For environment setup: set NODE_OPTIONS=--openssl-legacy-provider and then run npm start

const App = () => {
  return (
    <Routes>
      {/* Root route redirects to login page */}
      <Route path="/" element={<Login />} /> {/* Add a route for the root path */}
      
      {/* Define the Supervisor Dashboard and Admin Page Routes */}
      <Route path="/dashboard" element={<SupervisorDashboard />} />
      <Route path="/admin" element={<AdminPage />} />
      
      {/* Define Task List Route */}
      <Route path="/tasks-list" element={<ViewTaskList />} />
      
      {/* Define Login Route */}
      <Route path="/login" element={<Login />} />
      
      {/* Optionally, handle not found routes */}
      <Route path="*" element={<div>404 Not Found</div>} /> {/* Route for unknown paths */}
    </Routes>
  );
};

export default App;
