import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ViewTaskList.css'; // Add CSS file if needed

const ViewTasksList = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  const handleClearList = () => {
    setTasks([]);
    localStorage.removeItem('tasks'); // Clear tasks from localStorage
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="tasks-list-container">
      <h1>Tasks List</h1>
      <button onClick={handleBackToDashboard} className="button-small">Back to Dashboard</button>
      <button onClick={handleClearList} className="button-small">Clear List</button>
      <ul className="tasks-list">
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <li key={index}>
              <strong>Task ID:</strong> {task.taskId} <br />
              <strong>Date:</strong> {task.date} <br />
              <strong>Session:</strong> {task.session} <br />
              <strong>Location:</strong> {task.location} <br />
              <strong>Number of Workers:</strong> {task.numberOfWorkers} <br />
              <strong>Name of Workers:</strong> {task.nameOfWorkers} <br />
              <strong>Duration:</strong> {task.duration} <br />
              <strong>Status:</strong> {task.status} <br />
            </li>
          ))
        ) : (
          <p>No tasks available.</p>
        )}
      </ul>
    </div>
  );
};

export default ViewTasksList;
