import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css';

const AdminPage = () => {
    const [taskId, setTaskId] = useState('');
    const [taskDetails, setTaskDetails] = useState(null);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Function to handle task search
    const handleSearch = async () => {
        // Basic validation for task ID
        if (!taskId.trim()) {
            setMessage('Please enter a task ID.');
            return;
        }

        setIsLoading(true);
        setMessage('');

        try {
            // API call to fetch task details
            const response = await fetch(`http://localhost:8080/api/tasks/${taskId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

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
                setMessage(`Failed to fetch task details. Status: ${response.status}`);
                setTaskDetails(null);
            }
        } catch (error) {
            setMessage('Error fetching task details. Check your network or try again later.');
            setTaskDetails(null);
            console.error('Fetch error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Function to handle logout
    const handleLogout = () => {
        navigate('/login');
    };

    // Helper function to render task details
    const renderTaskDetails = () => {
        if (!taskDetails) return null;

        return (
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
        );
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
                <button onClick={handleSearch} disabled={isLoading}>
                    {isLoading ? 'Searching...' : 'Search'}
                </button>
            </div>
            {message && <p className="message">{message}</p>}
            {isLoading ? <p>Loading...</p> : renderTaskDetails()}
            <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
    );
};

export default AdminPage;