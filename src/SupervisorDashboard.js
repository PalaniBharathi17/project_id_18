import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const SupervisorDashboard = () => {
  const initialFormState = {
    taskId: '',
    date: new Date().toISOString().split('T')[0], // Set current date as default
    session: 'AM', // Default value
    location: 'AS Block', // Default value
    numberOfWorkers: '1', // Default value
    natureOfWork: '',
    nameOfWorkers: '',
    duration: '',
    status: 'ongoing', // Default value
    remarks: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [errorFields, setErrorFields] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Load tasks when component mounts
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Remove from errorFields if user starts typing in a field
    if (errorFields.includes(name)) {
      setErrorFields(errorFields.filter(field => field !== name));
    }
    
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const requiredFields = [
      'taskId', 'date', 'session', 'location', 'numberOfWorkers',
      'natureOfWork', 'nameOfWorkers', 'duration', 'status'
    ];
    
    const emptyFields = requiredFields.filter(field => !formData[field]);
    
    if (emptyFields.length > 0) {
      setErrorFields(emptyFields);
      displayMessage('Please fill in all required fields.', 'error');
      return false;
    }
    
    // Check if taskId is unique
    const taskExists = tasks.some(task => task.taskId === formData.taskId);
    if (taskExists) {
      setErrorFields(['taskId']);
      displayMessage('Task ID already exists. Please use a unique ID.', 'error');
      return false;
    }
    
    return true;
  };

  const displayMessage = (text, type = 'success') => {
    setMessage(text);
    setMessageType(type);
    
    // Clear message after 5 seconds
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 5000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Create a new task with a timestamp
      const newTask = {
        ...formData,
        createdAt: new Date().toISOString(),
      };
      
      const updatedTasks = [...tasks, newTask];
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
      
      // Success message
      displayMessage('Task successfully saved!', 'success');
      
      // Reset form
      setFormData(initialFormState);
      setErrorFields([]);
      setShowForm(false);
    } catch (error) {
      displayMessage('An error occurred while saving the task. Please try again.', 'error');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSidebarClick = (section) => {
    if (section === 'Task Management') {
      navigate('/tasks-list');
    } else if (section === 'Logout') {
      // Only remove user session, not tasks
      localStorage.removeItem('user');
      navigate('/login');
    } else if (section === 'Home') {
      setShowForm(false);
    } else if (section === 'Dashboard') {
      setShowForm(false);
    } else if (section === 'Settings') {
      displayMessage('Settings feature coming soon!', 'info');
    } else if (section === 'Reports') {
      displayMessage('Reports feature coming soon!', 'info');
    }
  };

  // Generate a unique task ID suggestion
  const generateTaskId = () => {
    const today = new Date();
    const dateString = today.toISOString().slice(0, 10).replace(/-/g, '');
    const randomDigits = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `T${dateString}-${randomDigits}`;
  };

  const handleGenerateTaskId = () => {
    setFormData({
      ...formData,
      taskId: generateTaskId()
    });
  };

  const handleCancel = () => {
    setFormData(initialFormState);
    setErrorFields([]);
    setShowForm(false);
  };
  
  return (

    
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="profile">
          <div className="logo">
            <img src="/assets/campus-logo.jpg" alt="Campus Logo" />
          </div>
          <h2>Supervisor Dashboard</h2>
        </div>
        <nav>
          <ul>
            <li onClick={() => handleSidebarClick('Dashboard')} className="active">
              <i className="fas fa-home"></i> Dashboard
            </li>
            <li onClick={() => handleSidebarClick('Task Management')}>
              <i className="fas fa-tasks"></i> Task Management
            </li>
            <li onClick={() => handleSidebarClick('Reports')}>
              <i className="fas fa-chart-bar"></i> Reports
            </li>
            <li onClick={() => handleSidebarClick('Settings')}>
              <i className="fas fa-cog"></i> Settings
            </li>
            <li onClick={() => handleSidebarClick('Logout')} className="logout">
              <i className="fas fa-sign-out-alt"></i> Logout
            </li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <header className="header">
          <h1>Campus Maintenance Portal</h1>
          <div className="header-right">
            <span className="date">{new Date().toLocaleDateString()}</span>
            <div className="user-info">
              <i className="fas fa-user-circle"></i>
              <span>Supervisor</span>
            </div>
          </div>
        </header>
        
        <section className="dashboard-summary">
          <div className="summary-card">
            <h3>Total Tasks</h3>
            <p className="count">{tasks.length}</p>
          </div>
          <div className="summary-card">
            <h3>Ongoing Tasks</h3>
            <p className="count">{tasks.filter(task => task.status === 'ongoing').length}</p>
          </div>
          <div className="summary-card">
            <h3>Completed Tasks</h3>
            <p className="count">{tasks.filter(task => task.status === 'completed').length}</p>
          </div>
        </section>
        
        {message && (
          <div className={`message ${messageType}`}>
            {message}
            <button className="close-btn" onClick={() => setMessage('')}>×</button>
          </div>
        )}
        
        <section className="task-section">
          {!showForm ? (
            <button
              className="add-task-button"
              onClick={() => setShowForm(true)}
            >
              <i className="fas fa-plus"></i> Add New Task
            </button>
          ) : (
            <div className="task-form-container">
              <h2>Add New Maintenance Task</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className={`form-group ${errorFields.includes('taskId') ? 'error' : ''}`}>
                    <label htmlFor="taskId">Task ID: <span className="required">*</span></label>
                    <div className="input-with-button">
                      <input
                        type="text"
                        id="taskId"
                        name="taskId"
                        value={formData.taskId}
                        onChange={handleChange}
                        placeholder="Enter task ID"
                      />
                      <button 
                        type="button" 
                        className="generate-btn"
                        onClick={handleGenerateTaskId}
                        title="Generate Task ID"
                      >
                        <i className="fas fa-sync"></i>
                      </button>
                    </div>
                  </div>
                  
                  <div className={`form-group ${errorFields.includes('date') ? 'error' : ''}`}>
                    <label htmlFor="date">Date: <span className="required">*</span></label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className={`form-group ${errorFields.includes('session') ? 'error' : ''}`}>
                    <label htmlFor="session">Session: <span className="required">*</span></label>
                    <select
                      id="session"
                      name="session"
                      value={formData.session}
                      onChange={handleChange}
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-row">
                  <div className={`form-group ${errorFields.includes('location') ? 'error' : ''}`}>
                    <label htmlFor="location">Location: <span className="required">*</span></label>
                    <select
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                    >
                      <option value="AS Block">AS Block</option>
                      <option value="IB Block">IB Block</option>
                      <option value="SF Block">SF Block</option>
                      <option value="Mechanical Block">Mechanical Block</option>
                      <option value="Quarters">Quarters</option>
                      <option value="Boys Hostel">Boys Hostel</option>
                      <option value="Girls Hostel">Girls Hostel</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                  
                  <div className={`form-group ${errorFields.includes('numberOfWorkers') ? 'error' : ''}`}>
                    <label htmlFor="numberOfWorkers">Number of Workers: <span className="required">*</span></label>
                    <select
                      id="numberOfWorkers"
                      name="numberOfWorkers"
                      value={formData.numberOfWorkers}
                      onChange={handleChange}
                    >
                      {[...Array(15)].map((_, index) => (
                        <option key={index + 1} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className={`form-group ${errorFields.includes('duration') ? 'error' : ''}`}>
                    <label htmlFor="duration">Duration: <span className="required">*</span></label>
                    <input
                      type="text"
                      id="duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      placeholder="E.g., 2 hours"
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className={`form-group full-width ${errorFields.includes('natureOfWork') ? 'error' : ''}`}>
                    <label htmlFor="natureOfWork">Nature of Work: <span className="required">*</span></label>
                    <textarea
                      id="natureOfWork"
                      name="natureOfWork"
                      maxLength={50}
                      value={formData.natureOfWork}
                      onChange={handleChange}
                      placeholder="Describe the nature of work (max 50 words)"
                      rows="2"
                    ></textarea>
                    <span className="char-count">{formData.natureOfWork.length}/50</span>
                  </div>
                </div>
                
                <div className="form-row">
                  <div className={`form-group full-width ${errorFields.includes('nameOfWorkers') ? 'error' : ''}`}>
                    <label htmlFor="nameOfWorkers">Name of Workers: <span className="required">*</span></label>
                    <input
                      type="text"
                      id="nameOfWorkers"
                      name="nameOfWorkers"
                      value={formData.nameOfWorkers}
                      onChange={handleChange}
                      placeholder="Enter worker names, separated by commas"
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className={`form-group ${errorFields.includes('status') ? 'error' : ''}`}>
                    <label htmlFor="status">Status: <span className="required">*</span></label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  
                  <div className={`form-group wide ${errorFields.includes('remarks') ? 'error' : ''}`}>
                    <label htmlFor="remarks">Remarks:</label>
                    <textarea
                      id="remarks"
                      name="remarks"
                      maxLength={50}
                      value={formData.remarks}
                      onChange={handleChange}
                      placeholder="Any additional remarks (optional)"
                      rows="2"
                    ></textarea>
                    <span className="char-count">{formData.remarks.length}/50</span>
                  </div>
                </div>
                
                <div className="form-buttons">
                  <button type="button" className="cancel-button" onClick={handleCancel}>
                    Cancel
                  </button>
                  <button type="submit" className="submit-button" disabled={isLoading}>
                    {isLoading ? 'Submitting...' : 'Submit Task'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </section>
        
        {tasks.length > 0 && !showForm && (
          <section className="recent-tasks">
            <h2>Recent Tasks</h2>
            <div className="tasks-table-container">
              <table className="tasks-table">
                <thead>
                  <tr>
                    <th>Task ID</th>
                    <th>Date</th>
                    <th>Location</th>
                    <th>Nature of Work</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.slice().reverse().slice(0, 5).map((task) => (
                    <tr key={task.taskId}>
                      <td>{task.taskId}</td>
                      <td>{task.date} ({task.session})</td>
                      <td>{task.location}</td>
                      <td>{task.natureOfWork}</td>
                      <td>
                        <span className={`status-badge ${task.status}`}>
                          {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="view-all-link">
              <button onClick={() => handleSidebarClick('Task Management')}>
                View All Tasks <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </section>
        )}
        
        
        
        
        {tasks.length === 0 && !showForm && (
          <div className="no-tasks">
            <i className="fas fa-clipboard-list"></i>
            <p>No tasks have been added yet. Click "Add New Task" to get started.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default SupervisorDashboard;