import axios from "axios";

const API = axios.create({
    // This reads the live variable from Vercel/Netlify, or falls back to your local port 4000
    baseURL: import.meta.env.VITE_API_URL
        ? `${import.meta.env.VITE_API_URL}/api`
        : "http://localhost:4000/api",
});

// Attach token automatically
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const getProfile = () => API.get("/auth/profile");
export const updateProfile = (data) => API.put("/auth/profile", data);

export const getCourses = () => API.get("/courses");

export const enrollCourse = (courseId) =>
    API.post("/courses/enroll", { courseId });
