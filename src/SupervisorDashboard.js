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
    natureOfWork: '',
    nameOfWorkers: '',
    duration: '',
    status: '',
    remarks: '',
  });
  const [message, setMessage] = useState('');
  const [errorFields, setErrorFields] = useState([]);
  const [showForm, setShowForm] = useState(false); // State to toggle between form and Add Task button
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emptyFields = Object.keys(formData).filter((key) => !formData[key]);
    if (emptyFields.length > 0) {
      setErrorFields(emptyFields);
      setMessage('Please fill in all fields.');
      return;
    }

    try {
      const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const updatedTasks = [...storedTasks, formData];
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setMessage('Task successfully saved!');
      setFormData({
        taskId: '',
        date: '',
        session: '',
        location: '',
        numberOfWorkers: '',
        natureOfWork: '',
        nameOfWorkers: '',
        duration: '',
        status: '',
        remarks: '',
      });
      setErrorFields([]);
      setShowForm(false); // Hide the form after submission
    } catch (error) {
      setMessage('An error occurred while saving the task. Please try again.');
      console.error(error);
    }
  };

  const handleSidebarClick = (section) => {
    if (section === 'Task Management') {
      navigate('/tasks-list');
    } else if (section === 'Logout') {
      localStorage.removeItem('tasks');
      navigate('/login');
    } else if (section === 'Home') {
      setShowForm(false); // Show only Add Task button
    } else if (section === 'Settings') {
      navigate('/404'); // Redirect to a "404 Not Found" page
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="profile">
          <h2>Supervisor Dashboard</h2>
        </div>
        <nav>
          <ul>
            <li onClick={() => handleSidebarClick('Home')}>Home</li>
            <li onClick={() => handleSidebarClick('Task Management')}>Task Management</li>
            <li onClick={() => handleSidebarClick('Reports')}>Reports</li>
            <li onClick={() => handleSidebarClick('Settings')}>Settings</li>
            <li onClick={() => handleSidebarClick('Logout')}>Logout</li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <header className="header">
          <h1>Campus Maintenance</h1>
        </header>
        <section className="task-form">
          {message && <p className="message">{message}</p>}
          {!showForm ? (
            <button
              className="add-task-button"
              onClick={() => setShowForm(true)}
            >
              Add Task
            </button>
          ) : (
            <>
              <h2>Add New Task</h2>
              <form onSubmit={handleSubmit}>
                {/* Form Fields */}
                <div className={`form-group ${errorFields.includes('taskId') ? 'error' : ''}`}>
                  <label htmlFor="taskId">Task ID:</label>
                  <input
                    type="text"
                    id="taskId"
                    name="taskId"
                    value={formData.taskId}
                    onChange={handleChange}
                  />
                </div>
                <div className={`form-group ${errorFields.includes('date') ? 'error' : ''}`}>
                  <label htmlFor="date">Date:</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>
                <div className={`form-group ${errorFields.includes('session') ? 'error' : ''}`}>
                  <label htmlFor="session">Session:</label>
                  <select
                    id="session"
                    name="session"
                    value={formData.session}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
                <div className={`form-group ${errorFields.includes('location') ? 'error' : ''}`}>
                  <label htmlFor="location">Location:</label>
                  <select
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
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
                  <label htmlFor="numberOfWorkers">Number of Workers:</label>
                  <select
                    id="numberOfWorkers"
                    name="numberOfWorkers"
                    value={formData.numberOfWorkers}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    {[...Array(15)].map((_, index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={`form-group ${errorFields.includes('natureOfWork') ? 'error' : ''}`}>
                  <label htmlFor="natureOfWork">Nature of Work:</label>
                  <input
                    type="text"
                    id="natureOfWork"
                    name="natureOfWork"
                    maxLength={50}
                    value={formData.natureOfWork}
                    onChange={handleChange}
                  />
                </div>
                <div className={`form-group ${errorFields.includes('nameOfWorkers') ? 'error' : ''}`}>
                  <label htmlFor="nameOfWorkers">Name of Workers:</label>
                  <input
                    type="text"
                    id="nameOfWorkers"
                    name="nameOfWorkers"
                    value={formData.nameOfWorkers}
                    onChange={handleChange}
                  />
                </div>
                <div className={`form-group ${errorFields.includes('duration') ? 'error' : ''}`}>
                  <label htmlFor="duration">Duration:</label>
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                  />
                </div>
                <div className={`form-group ${errorFields.includes('status') ? 'error' : ''}`}>
                  <label htmlFor="status">Status:</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div className={`form-group ${errorFields.includes('remarks') ? 'error' : ''}`}>
                  <label htmlFor="remarks">Remarks:</label>
                  <textarea
                    id="remarks"
                    name="remarks"
                    maxLength={50}
                    value={formData.remarks}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <button type="submit" className="submit-button">
                  Submit
                </button>
              </form>
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default SupervisorDashboard;
