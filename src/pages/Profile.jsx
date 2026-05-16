import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Profile = () => {

    const { user, updateProfile } = useAuth();

    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const [previewImage, setPreviewImage] = useState('');

    const [formData, setFormData] = useState({
        fullName: '',
        bio: '',
        location: '',
        phone: '',
        profilePicture: '',
    });

    // =====================================================
    // 🔄 HYDRATE FORM
    // =====================================================
    useEffect(() => {

        if (!user) return;

        setFormData({
            fullName: user.fullName || '',
            bio: user.bio || '',
            location: user.location || '',
            phone: user.phone || '',
            profilePicture: user.profilePicture || '',
        });

        setPreviewImage(user.profilePicture || '');

    }, [user]);

    // =====================================================
    // 🧠 HANDLE INPUT CHANGE
    // =====================================================
    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // =====================================================
    // 🖼️ IMAGE UPLOAD
    // =====================================================
    const handleImageUpload = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = () => {

            setPreviewImage(reader.result);

            setFormData((prev) => ({
                ...prev,
                profilePicture: reader.result,
            }));
        };

        reader.readAsDataURL(file);
    };

    // =====================================================
    // 💾 SAVE PROFILE
    // =====================================================
    const handleSave = async () => {

        try {

            setIsSaving(true);

            await updateProfile(formData);

            setIsEditing(false);

        } catch (err) {

            console.error(err);

        } finally {

            setIsSaving(false);
        }
    };

    // =====================================================
    // 🎭 ROLE BADGE
    // =====================================================
    const roleBadge = {
        admin: '👑 Admin',
        instructor: '🎓 Instructor',
        user: '👤 User',
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                Loading profile...
            </div>
        );
    }

    return (
        <div className="page-shell py-10 space-y-8">

            {/* ================================================= */}
            {/* 👤 PROFILE HERO */}
            {/* ================================================= */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-3xl border border-white/10 p-8"
            >

                <div className="flex flex-col lg:flex-row gap-8 items-start">

                    {/* PROFILE IMAGE */}
                    <div className="flex flex-col items-center gap-4">

                        <div className="w-40 h-40 rounded-3xl overflow-hidden border border-white/10 bg-black/20">

                            {previewImage ? (
                                <img
                                    src={previewImage}
                                    alt="profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-5xl text-gray-500">
                                    👤
                                </div>
                            )}
                        </div>

                        {isEditing && (
                            <label className="cursor-pointer px-4 py-2 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 transition-all text-sm font-medium">

                                Upload Image

                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={handleImageUpload}
                                />
                            </label>
                        )}
                    </div>

                    {/* PROFILE INFO */}
                    <div className="flex-1 space-y-5 w-full">

                        <div className="space-y-2">

                            <div className="flex flex-wrap items-center gap-3">

                                <h1 className="text-4xl font-black text-white">
                                    {user.fullName}
                                </h1>

                                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">
                                    {roleBadge[user.role] || '👤 User'}
                                </span>
                            </div>

                            <p className="text-[var(--color-muted)]">
                                {user.email}
                            </p>

                            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                                Joined {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                        </div>

                        {/* FORM */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* FULL NAME */}
                            <div className="space-y-2">

                                <label className="text-sm text-gray-400">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none disabled:opacity-70"
                                />
                            </div>

                            {/* LOCATION */}
                            <div className="space-y-2">

                                <label className="text-sm text-gray-400">
                                    Location
                                </label>

                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none disabled:opacity-70"
                                />
                            </div>

                            {/* PHONE */}
                            <div className="space-y-2 md:col-span-2">

                                <label className="text-sm text-gray-400">
                                    Phone
                                </label>

                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none disabled:opacity-70"
                                />
                            </div>

                            {/* BIO */}
                            <div className="space-y-2 md:col-span-2">

                                <label className="text-sm text-gray-400">
                                    Bio
                                </label>

                                <textarea
                                    name="bio"
                                    rows="5"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none resize-none disabled:opacity-70"
                                />
                            </div>
                        </div>

                        {/* ACTIONS */}
                        <div className="flex flex-wrap gap-4 pt-4">

                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="px-5 py-3 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 transition-all font-semibold"
                                >
                                    ✏️ Edit Profile
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={handleSave}
                                        disabled={isSaving}
                                        className="px-5 py-3 rounded-xl bg-green-500/20 hover:bg-green-500/30 text-green-400 transition-all font-semibold disabled:opacity-50"
                                    >
                                        {isSaving ? 'Saving...' : '💾 Save Changes'}
                                    </button>

                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="px-5 py-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-all font-semibold"
                                    >
                                        Cancel
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* ================================================= */}
            {/* 📊 ACCOUNT STATS */}
            {/* ================================================= */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <motion.div
                    whileHover={{ y: -3 }}
                    className="glass-card rounded-2xl p-6 border border-white/10"
                >
                    <p className="text-sm text-[var(--color-muted)]">
                        Enrolled Courses
                    </p>

                    <h2 className="text-3xl font-black text-white mt-2">
                        {user.enrolledCourses?.length || 0}
                    </h2>
                </motion.div>

                <motion.div
                    whileHover={{ y: -3 }}
                    className="glass-card rounded-2xl p-6 border border-white/10"
                >
                    <p className="text-sm text-[var(--color-muted)]">
                        Account Role
                    </p>

                    <h2 className="text-2xl font-black text-white mt-2 capitalize">
                        {user.role}
                    </h2>
                </motion.div>

                <motion.div
                    whileHover={{ y: -3 }}
                    className="glass-card rounded-2xl p-6 border border-white/10"
                >
                    <p className="text-sm text-[var(--color-muted)]">
                        Last Login
                    </p>

                    <h2 className="text-lg font-bold text-white mt-2">
                        {user.lastLogin
                            ? new Date(user.lastLogin).toLocaleDateString()
                            : 'Unavailable'}
                    </h2>
                </motion.div>
            </div>
        </div>
    );
};

export default Profile;