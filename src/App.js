import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SupervisorDashboard from './SupervisorDashboard';
import Login from './Login';
import AdminPage from './AdminPage'; 
import ViewTaskList from './ViewTaskList';

const App = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<SupervisorDashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<AdminPage />} /> {/* Add the route for AdminPage */}
      <Route path="/tasks-list" element={<ViewTaskList />} />
      {/* Add more routes if needed */}
    </Routes>
  );
};

export default App;