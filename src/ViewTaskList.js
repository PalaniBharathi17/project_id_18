import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ViewTaskList.css'; // Ensure this file contains your styling

const ViewTasksList = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  // Fetch tasks from localStorage when the component mounts
  useEffect(() => {
    try {
      const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      setTasks(storedTasks);
    } catch (error) {
      console.error('Failed to fetch tasks from localStorage:', error);
    }
  }, []);

  // Handle clearing the task list
  const handleClearList = () => {
    const confirmClear = window.confirm('Are you sure you want to clear the tasks list?');
    if (confirmClear) {
      setTasks([]);
      localStorage.removeItem('tasks'); // Clear tasks from localStorage
    }
  };

  // Handle navigation back to the dashboard
  const handleBackToDashboard = () => {
    navigate('/dashboard'); // Navigate to the dashboard route
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
              <strong>Remarks:</strong> {task.remarks} <br />
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
