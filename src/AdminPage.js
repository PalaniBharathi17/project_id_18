import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css';

const AdminPage = () => {
    const [taskId, setTaskId] = useState('');
    const [taskDetails, setTaskDetails] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSearch = async () => {
        try {
            // Sending an API request to fetch task details from the backend
            const response = await fetch(`http://localhost:8080/api/tasks/${taskId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Handling response
            if (response.ok) {
                const data = await response.json();
                if (data) {
                    setTaskDetails(data);
                    setMessage('');
                } else {
                    setTaskDetails(null);
                    setMessage('Task not found.');
                }
            } else {
                setMessage('Failed to fetch task details.');
                setTaskDetails(null);
            }
        } catch (error) {
            setMessage('Error fetching task details.');
            setTaskDetails(null);
        }
    };

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <div className="admin-container">
            <h1>Admin Dashboard</h1>
            <div className="search-form">
                <label htmlFor="taskId">Enter Task ID:</label>
                <input
                    type="text"
                    id="taskId"
                    value={taskId}
                    onChange={(e) => setTaskId(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            {message && <p>{message}</p>}
            {taskDetails && (
                <div className="task-details">
                    <h2>Task Details</h2>
                    <p><strong>Task ID:</strong> {taskDetails.taskId}</p>
                    <p><strong>Date:</strong> {taskDetails.date}</p>
                    <p><strong>Session:</strong> {taskDetails.session}</p>
                    <p><strong>Location:</strong> {taskDetails.location}</p>
                    <p><strong>Number of Workers:</strong> {taskDetails.numberOfWorkers}</p>
                    <p><strong>Name of Workers:</strong> {taskDetails.nameOfWorkers}</p>
                    <p><strong>Duration:</strong> {taskDetails.duration}</p>
                    <p><strong>Status:</strong> {taskDetails.status}</p>
                </div>
            )}
            <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
    );
};

export default AdminPage;
