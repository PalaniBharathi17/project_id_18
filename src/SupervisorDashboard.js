import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const SupervisorDashboard = () => {
  const [formData, setFormData] = useState({
    taskId: '',
    date: '',
    session: '',
    location: '',
    numberOfWorkers: '',
    nameOfWorkers: '',
    duration: '',
    status: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.taskId || !formData.date || !formData.session || !formData.location || !formData.numberOfWorkers || !formData.nameOfWorkers || !formData.duration || !formData.status) {
      setMessage('Please fill in all fields.');
      return;
    }

    try {
      const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const updatedTasks = [...storedTasks, formData];
      localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Store tasks in localStorage
      navigate('/tasks-list'); // Redirect to tasks list page
    } catch (error) {
      setMessage('An error occurred while saving the task. Please try again.');
      console.error(error);
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const handleViewTasks = () => {
    navigate('/tasks-list');
  };

  return (
    <div className="dashboard-container">
      <h1>Supervisor's Dashboard</h1>
      <form className="dashboard-form" onSubmit={handleSubmit}>
        {/* Form fields */}
        <div className="form-group">
          <label htmlFor="taskId">Task ID:</label>
          <input
            type="text"
            id="taskId"
            name="taskId"
            value={formData.taskId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="session">Session:</label>
          <select
            id="session"
            name="session"
            value={formData.session}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <select
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="AS Block">AS Block</option>
            <option value="IB Block">IB Block</option>
            <option value="Mechanical Block">Mechanical Block</option>
            <option value="Research Park">Research Park</option>
            <option value="SF Block">SF Block</option>
            <option value="BOYS Hostel">BOYS Hostel</option>
            <option value="GIRLS Hostel">GIRLS Hostel</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="numberOfWorkers">Number of Workers:</label>
          <input
            type="number"
            id="numberOfWorkers"
            name="numberOfWorkers"
            value={formData.numberOfWorkers}
            onChange={handleChange}
            max="10"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="nameOfWorkers">Name of Workers:</label>
          <input
            type="text"
            id="nameOfWorkers"
            name="nameOfWorkers"
            value={formData.nameOfWorkers}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duration of Work:</label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="PENDING">PENDING</option>
            <option value="NOT COMPLETED">NOT COMPLETED</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>
        </div>
        {message && <p className="error-message">{message}</p>}
        <div className="button-container">
          <button type="button" onClick={handleViewTasks} className="button-small">View Tasks List</button>
          <button type="submit" className="button-small">Submit</button>
          <button type="button" onClick={handleLogout} className="button-small">Logout</button>
        </div>
      </form>
    </div>
  );
};

export default SupervisorDashboard;
