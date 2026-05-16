import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const EnrollmentModal = ({
    isOpen,
    onClose,
    course,
    onSubmit,
    isSubmitting = false,
}) => {

    const { user } = useAuth();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        age: '',
        gender: '',
        location: '',
        education: '',
        experience: '',
        goals: '',
        notes: '',
    });

    // =====================================================
    // 🔄 AUTO-FILL USER DATA
    // =====================================================
    useEffect(() => {

        if (!user) return;

        setFormData((prev) => ({
            ...prev,
            fullName: user.fullName || '',
            email: user.email || '',
            phone: user.phone || '',
            location: user.location || '',
        }));

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
    // 🚀 HANDLE SUBMIT
    // =====================================================
    const handleSubmit = async (e) => {

        e.preventDefault();

        if (
            !formData.fullName ||
            !formData.email ||
            !formData.phone
        ) {
            return;
        }

        try {

            await onSubmit({
                ...formData,
                courseId: course?._id,
            });

        } catch (err) {

            console.error(err);
        }
        console.log('📚 COURSE OBJECT:', course);

        console.log('🆔 COURSE ID:', course?._id);
    };

    // =====================================================
    // ❌ CLOSE MODAL
    // =====================================================
    const handleClose = () => {

        if (isSubmitting) return;

        onClose();
    };

    return (
        <AnimatePresence>

            {isOpen && (

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
                >

                    {/* ================================================= */}
                    {/* MODAL CONTAINER */}
                    {/* ================================================= */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.2 }}
                        className="w-full max-w-4xl glass-card rounded-3xl border border-white/10 overflow-hidden"
                    >

                        {/* ================================================= */}
                        {/* HEADER */}
                        {/* ================================================= */}
                        <div className="border-b border-white/10 p-6 flex items-start justify-between gap-4">

                            <div className="space-y-2">

                                <p className="uppercase tracking-[0.2em] text-xs text-[var(--color-muted)]">
                                    Course Enrollment
                                </p>

                                <h2 className="text-3xl font-black text-white">
                                    {course?.title || 'Enroll in Course'}
                                </h2>

                                <p className="text-sm text-[var(--color-muted)]">
                                    Complete your application to continue enrollment.
                                </p>
                            </div>

                            <button
                                onClick={handleClose}
                                disabled={isSubmitting}
                                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-white text-xl"
                            >
                                ✕
                            </button>
                        </div>

                        {/* ================================================= */}
                        {/* CONTENT */}
                        {/* ================================================= */}
                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px]">

                            {/* ================================================= */}
                            {/* FORM */}
                            {/* ================================================= */}
                            <form
                                onSubmit={handleSubmit}
                                className="p-6 space-y-6"
                            >

                                {/* PERSONAL INFO */}
                                <div className="space-y-4">

                                    <div>
                                        <h3 className="text-xl font-bold text-white">
                                            👤 Personal Information
                                        </h3>

                                        <p className="text-sm text-[var(--color-muted)] mt-1">
                                            Basic information required for enrollment.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                        <input
                                            type="text"
                                            name="fullName"
                                            placeholder="Full Name *"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none"
                                            required
                                        />

                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email Address *"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none"
                                            required
                                        />

                                        <input
                                            type="text"
                                            name="phone"
                                            placeholder="Phone Number *"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none"
                                            required
                                        />

                                        <input
                                            type="number"
                                            name="age"
                                            placeholder="Age"
                                            min="10"
                                            max="100"
                                            value={formData.age}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none"
                                        />

                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none"
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                            <option value="prefer-not-to-say">
                                                Prefer not to say
                                            </option>
                                        </select>

                                        <input
                                            type="text"
                                            name="location"
                                            placeholder="Location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none"
                                        />
                                    </div>
                                </div>

                                {/* EDUCATION */}
                                <div className="space-y-4">

                                    <div>
                                        <h3 className="text-xl font-bold text-white">
                                            🎓 Learning Background
                                        </h3>

                                        <p className="text-sm text-[var(--color-muted)] mt-1">
                                            Help us personalize your learning experience.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                        <input
                                            type="text"
                                            name="education"
                                            placeholder="Education Level"
                                            value={formData.education}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none"
                                        />

                                        <input
                                            type="text"
                                            name="experience"
                                            placeholder="Prior Experience"
                                            value={formData.experience}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none"
                                        />
                                    </div>

                                    <textarea
                                        name="goals"
                                        rows="4"
                                        placeholder="Why do you want to join this course?"
                                        value={formData.goals}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none resize-none"
                                    />

                                    <textarea
                                        name="notes"
                                        rows="3"
                                        placeholder="Additional notes (optional)"
                                        value={formData.notes}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none resize-none"
                                    />
                                </div>

                                {/* ACTIONS */}
                                <div className="flex flex-wrap gap-4 pt-4">

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-6 py-3 rounded-xl bg-green-500/20 hover:bg-green-500/30 text-green-400 transition-all font-semibold disabled:opacity-50"
                                    >
                                        {isSubmitting
                                            ? 'Processing Enrollment...'
                                            : 'Continue Enrollment'}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleClose}
                                        disabled={isSubmitting}
                                        className="px-6 py-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-all font-semibold"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>

                            {/* ================================================= */}
                            {/* COURSE SUMMARY */}
                            {/* ================================================= */}
                            <div className="border-l border-white/10 bg-black/10 p-6 space-y-6">

                                <div className="space-y-4">

                                    <div className="rounded-2xl overflow-hidden border border-white/10">

                                        {course?.image ? (
                                            <img
                                                src={course.image}
                                                alt={course.title}
                                                className="w-full h-52 object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-52 flex items-center justify-center text-gray-500 bg-black/20">
                                                No Image
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2">

                                        <h3 className="text-2xl font-bold text-white">
                                            {course?.title}
                                        </h3>

                                        <p className="text-sm text-[var(--color-muted)]">
                                            {course?.blurb}
                                        </p>
                                    </div>

                                    <div className="space-y-3 pt-2">

                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-[var(--color-muted)]">
                                                Instructor
                                            </span>

                                            <span className="text-white font-medium">
                                                {course?.instructor || 'Unknown'}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-[var(--color-muted)]">
                                                Duration
                                            </span>

                                            <span className="text-white font-medium">
                                                {course?.duration || 'N/A'}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-[var(--color-muted)]">
                                                Level
                                            </span>

                                            <span className="text-white font-medium capitalize">
                                                {course?.level || 'Beginner'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* PRICE */}
                                    <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-5 space-y-2">

                                        <p className="text-sm text-green-300 uppercase tracking-[0.15em]">
                                            Enrollment Fee
                                        </p>

                                        <div className="space-y-1">

                                            <h2 className="text-3xl font-black text-white">
                                                ₹{course?.priceInr || '0'}
                                            </h2>

                                            <p className="text-sm text-green-200">
                                                ${course?.priceUsd || '0'} USD
                                            </p>
                                        </div>
                                    </div>

                                    {/* FUTURE PAYMENT NOTE */}
                                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">

                                        <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                                            💳 Secure payment integration with Razorpay /
                                            Stripe will continue after enrollment confirmation.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default EnrollmentModal;