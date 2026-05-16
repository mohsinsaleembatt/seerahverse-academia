// import { useEffect, useState, useCallback } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import Button from '../utils/Button.jsx';

// const AdminCourses = () => {
//     const { user } = useAuth();
//     const navigate = useNavigate();
//     const [courses, setCourses] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [editingId, setEditingId] = useState(null);
//     const [showForm, setShowForm] = useState(false);
//     const [formData, setFormData] = useState({
//         title: '',
//         category: '',
//         duration: '',
//         level: 'beginner',
//         weeklyHours: '',
//         priceUsd: '',
//         priceInr: '',
//         instructor: '',
//         image: '',
//         blurb: '',
//         description: '',
//         curriculum: [],
//     });

//     const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

//     // ✅ Check if user is admin/instructor
//     useEffect(() => {
//         if (!user) {
//             navigate('/login');
//             return;
//         }
//         if (user.role !== 'admin' && user.role !== 'instructor') {
//             navigate('/');
//         }
//     }, [user, navigate]);

//     // ✅ Fetch courses
//     const fetchCourses = useCallback(async () => {
//         try {
//             setLoading(true);
//             const response = await fetch(`${API_BASE_URL}/courses`);
//             const data = await response.json();
//             setCourses(data.courses || []);
//         } catch (err) {
//             console.error('Error fetching courses:', err);
//             alert('Error fetching courses');
//         } finally {
//             setLoading(false);
//         }
//     }, [API_BASE_URL]);

//     useEffect(() => {
//         fetchCourses();
//     }, [fetchCourses]);

//     // ✅ Handle form input change
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     // ✅ Handle submit (create or update)
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!formData.title || !formData.category || !formData.instructor) {
//             alert('Title, Category, and Instructor are required');
//             return;
//         }

//         try {
//             setLoading(true);
//             const token = localStorage.getItem('authToken');

//             const method = editingId ? 'PUT' : 'POST';
//             const url = editingId
//                 ? `${API_BASE_URL}/courses/${editingId}`
//                 : `${API_BASE_URL}/courses`;

//             const response = await fetch(url, {
//                 method,
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${token}`,
//                 },
//                 body: JSON.stringify(formData),
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(data.error || 'Failed to save course');
//             }

//             alert(editingId ? 'Course updated!' : 'Course created!');

//             // Reset form
//             setFormData({
//                 title: '',
//                 category: '',
//                 duration: '',
//                 level: 'beginner',
//                 weeklyHours: '',
//                 priceUsd: '',
//                 priceInr: '',
//                 instructor: '',
//                 image: '',
//                 blurb: '',
//                 description: '',
//                 curriculum: [],
//             });
//             setEditingId(null);
//             setShowForm(false);

//             // Refetch courses
//             await fetchCourses();
//         } catch (err) {
//             console.error('Error:', err);
//             alert('Error: ' + err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // ✅ Handle edit
//     const handleEdit = (course) => {
//         setFormData({
//             title: course.title,
//             category: course.category,
//             duration: course.duration,
//             level: course.level,
//             weeklyHours: course.weeklyHours,
//             priceUsd: course.priceUsd,
//             priceInr: course.priceInr,
//             instructor: course.instructor,
//             image: course.image,
//             blurb: course.blurb,
//             description: course.description,
//             curriculum: course.curriculum || [],
//         });
//         setEditingId(course._id);
//         setShowForm(true);
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//     };

//     // ✅ Handle delete
//     const handleDelete = async (id) => {
//         if (!confirm('Delete this course? This action cannot be undone.')) return;

//         try {
//             setLoading(true);
//             const token = localStorage.getItem('authToken');

//             const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
//                 method: 'DELETE',
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to delete course');
//             }

//             alert('Course deleted!');
//             await fetchCourses();
//         } catch (err) {
//             console.error('Error:', err);
//             alert('Error: ' + err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // ✅ Handle cancel edit
//     const handleCancel = () => {
//         setEditingId(null);
//         setShowForm(false);
//         setFormData({
//             title: '',
//             category: '',
//             duration: '',
//             level: 'beginner',
//             weeklyHours: '',
//             priceUsd: '',
//             priceInr: '',
//             instructor: '',
//             image: '',
//             blurb: '',
//             description: '',
//             curriculum: [],
//         });
//     };

//     if (!user || (user.role !== 'admin' && user.role !== 'instructor')) {
//         return null;
//     }

//     return (
//         <div className="page-shell space-y-8 py-8">
//             <div className="flex justify-between items-center">
//                 <h1 className="text-3xl font-bold text-white">Manage Courses</h1>
//                 {!showForm && (
//                     <button
//                         onClick={() => setShowForm(true)}
//                         className="px-4 py-2 bg-green-500/20 text-green-400 rounded hover:bg-green-500/30 transition-colors font-semibold"
//                     >
//                         + Add Course
//                     </button>
//                 )}
//             </div>

//             {/* Form */}
//             {showForm && (
//                 <form onSubmit={handleSubmit} className="glass-card rounded-md p-6 space-y-4">
//                     <h2 className="text-xl font-semibold text-white">
//                         {editingId ? 'Edit Course' : 'Create New Course'}
//                     </h2>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {/* Title */}
//                         <input
//                             type="text"
//                             name="title"
//                             placeholder="Course Title"
//                             value={formData.title}
//                             onChange={handleChange}
//                             className="px-3 py-2 bg-white/10 rounded border border-white/20 text-white placeholder-gray-400 focus:border-white/40 outline-none transition-colors"
//                             required
//                         />

//                         {/* Category */}
//                         <select
//                             name="category"
//                             value={formData.category}
//                             onChange={handleChange}
//                             className="px-3 py-2 bg-white/10 rounded border border-white/20 text-white focus:border-white/40 outline-none transition-colors"
//                             required
//                         >
//                             <option value="">Select Category</option>
//                             <option value="artificial-intelligence">Artificial Intelligence</option>
//                             <option value="biology-quran">Biology & Quran</option>
//                             <option value="chemistry">Chemistry</option>
//                             <option value="english">English</option>
//                             <option value="physics">Physics</option>
//                             <option value="quranic-maths">Quranic Mathematics</option>
//                             <option value="social-science">Social Science</option>
//                             <option value="women">Women Leadership</option>
//                             <option value="other">Other</option>
//                         </select>

//                         {/* Instructor */}
//                         <input
//                             type="text"
//                             name="instructor"
//                             placeholder="Instructor Name"
//                             value={formData.instructor}
//                             onChange={handleChange}
//                             className="px-3 py-2 bg-white/10 rounded border border-white/20 text-white placeholder-gray-400 focus:border-white/40 outline-none transition-colors"
//                             required
//                         />

//                         {/* Level */}
//                         <select
//                             name="level"
//                             value={formData.level}
//                             onChange={handleChange}
//                             className="px-3 py-2 bg-white/10 rounded border border-white/20 text-white focus:border-white/40 outline-none transition-colors"
//                         >
//                             <option value="beginner">Beginner</option>
//                             <option value="intermediate">Intermediate</option>
//                             <option value="advanced">Advanced</option>
//                         </select>

//                         {/* Duration */}
//                         <input
//                             type="text"
//                             name="duration"
//                             placeholder="Duration (e.g., 15 Months)"
//                             value={formData.duration}
//                             onChange={handleChange}
//                             className="px-3 py-2 bg-white/10 rounded border border-white/20 text-white placeholder-gray-400 focus:border-white/40 outline-none transition-colors"
//                         />

//                         {/* Weekly Hours */}
//                         <input
//                             type="number"
//                             name="weeklyHours"
//                             placeholder="Weekly Hours"
//                             value={formData.weeklyHours}
//                             onChange={handleChange}
//                             className="px-3 py-2 bg-white/10 rounded border border-white/20 text-white placeholder-gray-400 focus:border-white/40 outline-none transition-colors"
//                         />

//                         {/* Price USD */}
//                         <input
//                             type="number"
//                             name="priceUsd"
//                             placeholder="Price USD"
//                             value={formData.priceUsd}
//                             onChange={handleChange}
//                             className="px-3 py-2 bg-white/10 rounded border border-white/20 text-white placeholder-gray-400 focus:border-white/40 outline-none transition-colors"
//                         />

//                         {/* Price INR */}
//                         <input
//                             type="number"
//                             name="priceInr"
//                             placeholder="Price INR"
//                             value={formData.priceInr}
//                             onChange={handleChange}
//                             className="px-3 py-2 bg-white/10 rounded border border-white/20 text-white placeholder-gray-400 focus:border-white/40 outline-none transition-colors"
//                         />

//                         {/* Image URL */}
//                         <input
//                             type="text"
//                             name="image"
//                             placeholder="Image URL"
//                             value={formData.image}
//                             onChange={handleChange}
//                             className="px-3 py-2 bg-white/10 rounded border border-white/20 text-white placeholder-gray-400 focus:border-white/40 outline-none transition-colors col-span-2"
//                         />
//                     </div>

//                     {/* Blurb */}
//                     <textarea
//                         name="blurb"
//                         placeholder="Short description (max 200 chars)"
//                         value={formData.blurb}
//                         onChange={handleChange}
//                         rows="2"
//                         maxLength="200"
//                         className="w-full px-3 py-2 bg-white/10 rounded border border-white/20 text-white placeholder-gray-400 focus:border-white/40 outline-none transition-colors resize-none"
//                     />

//                     {/* Description */}
//                     <textarea
//                         name="description"
//                         placeholder="Full description"
//                         value={formData.description}
//                         onChange={handleChange}
//                         rows="4"
//                         className="w-full px-3 py-2 bg-white/10 rounded border border-white/20 text-white placeholder-gray-400 focus:border-white/40 outline-none transition-colors resize-none"
//                     />

//                     {/* Buttons */}
//                     <div className="flex gap-3 pt-4">
//                         <button
//                             type="submit"
//                             disabled={loading}
//                             className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30 transition-colors disabled:opacity-50 font-semibold"
//                         >
//                             {loading ? 'Saving...' : editingId ? 'Update Course' : 'Create Course'}
//                         </button>
//                         <button
//                             type="button"
//                             onClick={handleCancel}
//                             className="px-4 py-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-colors font-semibold"
//                         >
//                             Cancel
//                         </button>
//                     </div>
//                 </form>
//             )}

//             {/* Courses List */}
//             <div className="glass-card rounded-md p-6">
//                 <h2 className="text-xl font-semibold text-white mb-4">
//                     Courses ({courses.length})
//                 </h2>

//                 {loading && !showForm && (
//                     <p className="text-gray-400 text-center py-8">Loading courses...</p>
//                 )}

//                 {courses.length === 0 && !loading && !showForm && (
//                     <p className="text-gray-400 text-center py-8">No courses yet. Create one!</p>
//                 )}

//                 <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-hide">
//                     {courses.map((course) => (
//                         <div
//                             key={course._id}
//                             className="bg-white/5 p-4 rounded-md flex justify-between items-start hover:bg-white/10 transition-colors border border-white/10"
//                         >
//                             <div className="flex-1">
//                                 <h3 className="font-semibold text-white text-lg">{course.title}</h3>
//                                 <p className="text-sm text-gray-400 mt-1">
//                                     {course.instructor} • {course.duration}
//                                 </p>
//                                 <p className="text-xs text-gray-500 mt-1">
//                                     ${course.priceUsd} / ₹{course.priceInr} • {course.level}
//                                 </p>
//                             </div>
//                             <div className="flex gap-2 ml-4">
//                                 <button
//                                     onClick={() => handleEdit(course)}
//                                     className="px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded text-sm hover:bg-blue-500/30 transition-colors font-medium whitespace-nowrap"
//                                 >
//                                     ✏️ Edit
//                                 </button>
//                                 <button
//                                     onClick={() => handleDelete(course._id)}
//                                     className="px-3 py-1.5 bg-red-500/20 text-red-400 rounded text-sm hover:bg-red-500/30 transition-colors font-medium whitespace-nowrap"
//                                 >
//                                     🗑️ Delete
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminCourses;




import { useEffect, useState, useCallback, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const initialFormState = {
    title: '',
    category: '',
    duration: '',
    level: 'beginner',
    weeklyHours: '',
    priceUsd: '',
    priceInr: '',
    instructor: '',
    image: '',
    blurb: '',
    description: '',
    curriculum: [],
    status: 'draft',
};

const categories = [
    'artificial-intelligence',
    'biology-quran',
    'chemistry',
    'english',
    'physics',
    'quranic-maths',
    'social-science',
    'women',
    'other',
];

const AdminCourses = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const [formData, setFormData] = useState(initialFormState);

    const API_BASE_URL =
        import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

    // =========================================================
    // 🔐 AUTHORIZATION CHECK
    // =========================================================
    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        if (user.role !== 'admin' && user.role !== 'instructor') {
            navigate('/');
        }
    }, [user, navigate]);

    // =========================================================
    // 📚 FETCH COURSES
    // =========================================================
    const fetchCourses = useCallback(async () => {
        try {
            setLoading(true);

            const response = await fetch(`${API_BASE_URL}/courses`);

            const data = await response.json();

            setCourses(data.courses || []);
        } catch (err) {
            console.error('Error fetching courses:', err);
        } finally {
            setLoading(false);
        }
    }, [API_BASE_URL]);

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    // =========================================================
    // 🔍 FILTERED COURSES
    // =========================================================
    const filteredCourses = useMemo(() => {
        return courses.filter((course) => {
            const matchesSearch =
                course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.instructor
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase());

            const matchesStatus =
                statusFilter === 'all'
                    ? true
                    : (course.status || 'draft') === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [courses, searchQuery, statusFilter]);

    // =========================================================
    // 📊 STATS
    // =========================================================
    const stats = useMemo(() => {
        return {
            total: courses.length,

            published: courses.filter(
                (c) => (c.status || 'draft') === 'published'
            ).length,

            drafts: courses.filter(
                (c) => (c.status || 'draft') === 'draft'
            ).length,

            enrollments: courses.reduce(
                (acc, course) => acc + (course.enrolledStudents?.length || 0),
                0
            ),
        };
    }, [courses]);

    // =========================================================
    // 🧠 HANDLE INPUT CHANGE
    // =========================================================
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // =========================================================
    // ➕ CREATE / ✏️ UPDATE COURSE
    // =========================================================
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.category || !formData.instructor) {
            return;
        }

        try {
            setLoading(true);

            // ✅ FIXED TOKEN
            const token = localStorage.getItem('token');

            const method = editingId ? 'PUT' : 'POST';

            const url = editingId
                ? `${API_BASE_URL}/courses/${editingId}`
                : `${API_BASE_URL}/courses`;

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to save course');
            }

            await fetchCourses();

            setFormData(initialFormState);

            setEditingId(null);

            setShowForm(false);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // =========================================================
    // ✏️ EDIT COURSE
    // =========================================================
    const handleEdit = (course) => {
        setFormData({
            title: course.title || '',
            category: course.category || '',
            duration: course.duration || '',
            level: course.level || 'beginner',
            weeklyHours: course.weeklyHours || '',
            priceUsd: course.priceUsd || '',
            priceInr: course.priceInr || '',
            instructor: course.instructor || '',
            image: course.image || '',
            blurb: course.blurb || '',
            description: course.description || '',
            curriculum: course.curriculum || [],
            status: course.status || 'draft',
        });

        setEditingId(course._id);

        setShowForm(true);

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    // =========================================================
    // 🗑️ DELETE COURSE
    // =========================================================
    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            'Delete this course permanently?'
        );

        if (!confirmed) return;

        try {
            setLoading(true);

            // ✅ FIXED TOKEN
            const token = localStorage.getItem('token');

            const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete course');
            }

            setCourses((prev) => prev.filter((course) => course._id !== id));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // =========================================================
    // ❌ CANCEL FORM
    // =========================================================
    const handleCancel = () => {
        setEditingId(null);

        setShowForm(false);

        setFormData(initialFormState);
    };

    if (!user) return null;

    return (
        <div className="page-shell py-8 space-y-8">

            {/* ================================================= */}
            {/* 🧠 HEADER */}
            {/* ================================================= */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <div>
                    <p className="uppercase tracking-[0.2em] text-xs text-[var(--color-muted)]">
                        Admin Control Center
                    </p>

                    <h1 className="text-3xl md:text-4xl font-black text-white">
                        Course Management
                    </h1>
                </div>

                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="px-5 py-3 rounded-xl bg-green-500/20 hover:bg-green-500/30 text-green-400 transition-all font-semibold"
                    >
                        + Create Course
                    </button>
                )}
            </div>

            {/* ================================================= */}
            {/* 📊 STATS CARDS */}
            {/* ================================================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

                <motion.div
                    whileHover={{ y: -3 }}
                    className="glass-card rounded-2xl p-5 border border-white/10"
                >
                    <p className="text-sm text-[var(--color-muted)]">
                        Total Courses
                    </p>

                    <h2 className="text-3xl font-black text-white mt-2">
                        {stats.total}
                    </h2>
                </motion.div>

                <motion.div
                    whileHover={{ y: -3 }}
                    className="glass-card rounded-2xl p-5 border border-white/10"
                >
                    <p className="text-sm text-[var(--color-muted)]">
                        Published
                    </p>

                    <h2 className="text-3xl font-black text-green-400 mt-2">
                        {stats.published}
                    </h2>
                </motion.div>

                <motion.div
                    whileHover={{ y: -3 }}
                    className="glass-card rounded-2xl p-5 border border-white/10"
                >
                    <p className="text-sm text-[var(--color-muted)]">
                        Drafts
                    </p>

                    <h2 className="text-3xl font-black text-yellow-400 mt-2">
                        {stats.drafts}
                    </h2>
                </motion.div>

                <motion.div
                    whileHover={{ y: -3 }}
                    className="glass-card rounded-2xl p-5 border border-white/10"
                >
                    <p className="text-sm text-[var(--color-muted)]">
                        Enrollments
                    </p>

                    <h2 className="text-3xl font-black text-blue-400 mt-2">
                        {stats.enrollments}
                    </h2>
                </motion.div>
            </div>

            {/* ================================================= */}
            {/* 🔍 SEARCH + FILTER */}
            {/* ================================================= */}
            <div className="glass-card rounded-2xl p-5 border border-white/10 flex flex-col md:flex-row gap-4">

                <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 outline-none focus:border-white/30"
                />

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none"
                >
                    <option value="all">All</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                </select>
            </div>

            {/* ================================================= */}
            {/* 📝 FORM */}
            {/* ================================================= */}
            {showForm && (
                <form
                    onSubmit={handleSubmit}
                    className="glass-card rounded-2xl p-6 border border-white/10 space-y-5"
                >

                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-white">
                            {editingId ? 'Edit Course' : 'Create Course'}
                        </h2>

                        <span className="text-xs uppercase tracking-[0.15em] text-[var(--color-muted)]">
                            {editingId ? 'Editing Mode' : 'Creation Mode'}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <input
                            type="text"
                            name="title"
                            placeholder="Course Title"
                            value={formData.title}
                            onChange={handleChange}
                            className="px-4 py-3 bg-white/5 rounded-xl border border-white/10 text-white outline-none"
                            required
                        />

                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="px-4 py-3 bg-white/5 rounded-xl border border-white/10 text-white outline-none"
                            required
                        >
                            <option value="">Select Category</option>

                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>

                        <input
                            type="text"
                            name="instructor"
                            placeholder="Instructor"
                            value={formData.instructor}
                            onChange={handleChange}
                            className="px-4 py-3 bg-white/5 rounded-xl border border-white/10 text-white outline-none"
                            required
                        />

                        <select
                            name="level"
                            value={formData.level}
                            onChange={handleChange}
                            className="px-4 py-3 bg-white/5 rounded-xl border border-white/10 text-white outline-none"
                        >
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>

                        <input
                            type="text"
                            name="duration"
                            placeholder="Duration"
                            value={formData.duration}
                            onChange={handleChange}
                            className="px-4 py-3 bg-white/5 rounded-xl border border-white/10 text-white outline-none"
                        />

                        <input
                            type="number"
                            name="weeklyHours"
                            placeholder="Weekly Hours"
                            value={formData.weeklyHours}
                            onChange={handleChange}
                            className="px-4 py-3 bg-white/5 rounded-xl border border-white/10 text-white outline-none"
                        />

                        <input
                            type="number"
                            name="priceUsd"
                            placeholder="Price USD"
                            value={formData.priceUsd}
                            onChange={handleChange}
                            className="px-4 py-3 bg-white/5 rounded-xl border border-white/10 text-white outline-none"
                        />

                        <input
                            type="number"
                            name="priceInr"
                            placeholder="Price INR"
                            value={formData.priceInr}
                            onChange={handleChange}
                            className="px-4 py-3 bg-white/5 rounded-xl border border-white/10 text-white outline-none"
                        />

                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="px-4 py-3 bg-white/5 rounded-xl border border-white/10 text-white outline-none"
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>

                        <input
                            type="text"
                            name="image"
                            placeholder="Image URL"
                            value={formData.image}
                            onChange={handleChange}
                            className="px-4 py-3 bg-white/5 rounded-xl border border-white/10 text-white outline-none md:col-span-2"
                        />
                    </div>

                    {/* 🖼️ IMAGE PREVIEW */}
                    {formData.image && (
                        <div className="rounded-2xl overflow-hidden border border-white/10">
                            <img
                                src={formData.image}
                                alt="preview"
                                className="w-full h-64 object-cover"
                            />
                        </div>
                    )}

                    <textarea
                        name="blurb"
                        placeholder="Short description"
                        value={formData.blurb}
                        onChange={handleChange}
                        rows="2"
                        className="w-full px-4 py-3 bg-white/5 rounded-xl border border-white/10 text-white outline-none resize-none"
                    />

                    <textarea
                        name="description"
                        placeholder="Full course description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="5"
                        className="w-full px-4 py-3 bg-white/5 rounded-xl border border-white/10 text-white outline-none resize-none"
                    />

                    <div className="flex flex-wrap gap-3">

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-5 py-3 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 transition-all font-semibold disabled:opacity-50"
                        >
                            {loading
                                ? 'Saving...'
                                : editingId
                                    ? 'Update Course'
                                    : 'Create Course'}
                        </button>

                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-5 py-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-all font-semibold"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            {/* ================================================= */}
            {/* 📚 COURSES LIST */}
            {/* ================================================= */}
            <div className="glass-card rounded-2xl p-6 border border-white/10">

                <div className="flex items-center justify-between mb-6">

                    <div>
                        <h2 className="text-2xl font-bold text-white">
                            Courses
                        </h2>

                        <p className="text-sm text-[var(--color-muted)] mt-1">
                            {filteredCourses.length} course(s) found
                        </p>
                    </div>
                </div>

                {loading && (
                    <div className="py-12 text-center text-[var(--color-muted)]">
                        Loading...
                    </div>
                )}

                {!loading && filteredCourses.length === 0 && (
                    <div className="py-16 text-center">

                        <h3 className="text-xl font-semibold text-white">
                            No courses found
                        </h3>

                        <p className="text-[var(--color-muted)] mt-2">
                            Try changing filters or create a new course.
                        </p>
                    </div>
                )}

                <div className="space-y-4">

                    {filteredCourses.map((course) => (
                        <motion.div
                            key={course._id}
                            whileHover={{ y: -2 }}
                            className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col xl:flex-row xl:items-center gap-5"
                        >

                            {/* IMAGE */}
                            <div className="w-full xl:w-52 h-36 rounded-xl overflow-hidden bg-black/20 flex-shrink-0">

                                {course.image ? (
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                                        No Image
                                    </div>
                                )}
                            </div>

                            {/* CONTENT */}
                            <div className="flex-1 space-y-2">

                                <div className="flex flex-wrap items-center gap-2">

                                    <h3 className="text-xl font-bold text-white">
                                        {course.title}
                                    </h3>

                                    <span
                                        className={`text-xs px-3 py-1 rounded-full font-semibold ${(course.status || 'draft') === 'published'
                                                ? 'bg-green-500/20 text-green-400'
                                                : 'bg-yellow-500/20 text-yellow-400'
                                            }`}
                                    >
                                        {(course.status || 'draft') === 'published'
                                            ? 'Published'
                                            : 'Draft'}
                                    </span>
                                </div>

                                <p className="text-sm text-[var(--color-muted)]">
                                    {course.instructor} • {course.duration}
                                </p>

                                <p className="text-sm text-gray-400 line-clamp-2">
                                    {course.blurb}
                                </p>

                                <div className="flex flex-wrap gap-2 pt-2">

                                    <span className="px-3 py-1 rounded-full bg-white/5 text-xs text-gray-300">
                                        {course.level}
                                    </span>

                                    <span className="px-3 py-1 rounded-full bg-white/5 text-xs text-gray-300">
                                        ${course.priceUsd}
                                    </span>

                                    <span className="px-3 py-1 rounded-full bg-white/5 text-xs text-gray-300">
                                        ₹{course.priceInr}
                                    </span>
                                </div>
                            </div>

                            {/* ACTIONS */}
                            <div className="flex gap-3">

                                <button
                                    onClick={() => handleEdit(course)}
                                    className="px-4 py-2 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 transition-all font-medium"
                                >
                                    ✏️ Edit
                                </button>

                                <button
                                    onClick={() => handleDelete(course._id)}
                                    className="px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-all font-medium"
                                >
                                    🗑️ Delete
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminCourses;