import axios from 'axios';

// =========================================================
// 🌐 API INSTANCE
// =========================================================
const API = axios.create({
    baseURL: 'http://localhost:4000/api',
});

// =========================================================
// 🔐 ATTACH JWT TOKEN
// =========================================================
API.interceptors.request.use((req) => {

    const token = localStorage.getItem('token');

    if (token) {

        req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
});

// =========================================================
// 📚 CREATE ENROLLMENT
// =========================================================
export const createEnrollment = (enrollmentData) =>
    API.post('/enrollments', enrollmentData);