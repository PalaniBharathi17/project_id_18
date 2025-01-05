import axios from "axios";

// Create a custom axios instance
const axiosInstance = axios.create({
    baseURL: "http://localhost:8080", // Spring Boot backend URL
    headers: {
        "Content-Type": "application/json", // Default content type
    },
});

// Export the custom axios instance
export default axiosInstance;
