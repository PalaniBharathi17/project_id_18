import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Ensure this file contains your styling

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('supervisor');
    const navigate = useNavigate();

    const handleLogin = () => {
        // Client-side validation
        if (!username || !password) {
            alert('Please enter both username and password.');
            return;
        }

        // Example login logic
        if (role === 'supervisor') {
            if (username === '2023UCD5001' && password === '17') {
                navigate('/dashboard');
            } else {
                alert('Invalid login credentials for supervisor');
            }
        } else if (role === 'admin') {
            if (username === '7376231CD501' && password === '1721') {
                navigate('/admin');
            } else {
                alert('Invalid login credentials for admin');
            }
        }
    };

    const handleGoogleLogin = () => {
        // Logic for handling Google login
        alert('Google login clicked');
        // You would typically integrate Google login here
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <img
                    src="https://gyaanarth.com/wp-content/uploads/2022/08/BITLOGO.jpg"
                    alt="Campus Maintenance"
                    className="login-image"
                />
                <h2 className="login-title">Campus Maintenance Portal</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="role">Role</label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="supervisor">Supervisor</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="login-btn">Login</button>
                </form>
                <div className="google-login">
                    <button onClick={handleGoogleLogin} className="google-btn">
                        <img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAK4SURBVHgBtZbPSxRhGMefZ2ZWDV0ZyUQhYi5Fp9qBFRYqGi2imz/yoKe2W9FBuwSSoXux6JLeA+20kgUKQUHqjjcrK/0LnIQoCnTMX7E77zy9sz90f8y0q25fGHbmefZ5Ps/s87zvuwhF9OtqSCNgbfxWQyKFAOW0y3Aubpu2KqSpprcLhlcO9HL8bG0Oc+8gv1WgNI0znxhxgxVA1q+HlESCjTmVwyFkk3Cvce79iCckDYhB6dW7CA2fP67WTS2ZGYtQbgBjQks2IAfyTwCCjkgt26y6rmH2IzoXMFCB4JaTOBvQpHv0JN3kMRenCUgdJ2YWdfDQdy2koMj6iIkjboA9yJ8X1Ss7b04p1mpNDsBiouoVeBCJ1ozYjsfY7cpza4A8s7XqT3kI7jTGPuhQBkmAQhsQJR+qLv4AsWEXdmMnjeOTy+NQJklEFMg2+M5sgHT69yhMugdoT7YCogVPoUQRkCnxz0C+A4GWvIIkRrJNqEHJQlOA/y/ZgZj5VkRBhjJK4IusAEJkB6BsQkPiG9o874GSMX1O1MPAZvAywGvXkJl+vw4eu3fr8FYf73TOUPCXMAR+HoxnDM92zsLdjQuwbldqwYnOPji4egssRMtIMZC/xmtXhrdU2XmL/RLAlGyfutAzYUAJan20Pcj3+aF8u+0DVcAWMLvWr0VyAMkKQGaYiDVHO8NF8sOVxzu9bgC+g+j6/Zqlvd82OHHjC7ismeSX+alnI0z7K5iud0wlByUU7VbiENf45NwUrHqt+ls/oJVbqAigvnuQBQlF2xWGYowOeZ5wEFSutYNv81LKYFNk7qF/KF3kvo4KcuSAqtbans8O1IYztoJRPCqIx41+6n6VM5me/1aSDUccLB2GOidEFnte6gWeYqHBaJfGF2uYEM9DatHK6YoNdI5egnn+qLslz+gvWlEbVtdxWJYAAAAASUVORK5CYI"
                            alt="Google Icon"
                            className="google-icon"
                        />
                        Sign in with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;