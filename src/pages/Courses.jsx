import { useEffect, useState, useCallback, useMemo } from 'react';
import CourseGrid from '../components/CourseGrid.jsx';
import { getCourses, enrollCourse } from "../api/auth";
import { featuredCourses } from '../assets/data/courses.js';

// Loading skeleton component
const CoursesSkeleton = () => (
    <div className="p-8 text-center space-y-4">
        <div className="h-8 bg-white/10 rounded animate-pulse max-w-xs mx-auto"></div>
        <div className="h-4 bg-white/5 rounded animate-pulse max-w-2xl mx-auto"></div>
    </div>
)

// Error component
const CoursesError = ({ error, onRetry }) => (
    <section className="page-shell">
        <div className="glass-card rounded-sm p-6 shadow-soft space-y-4 border border-red-500/20 bg-red-500/5">
            <p className="text-sm text-red-400 font-semibold">⚠️ Error loading courses</p>
            <p className="text-[var(--color-muted)]">{error}</p>
            <button
                onClick={onRetry}
                className="px-4 py-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-colors text-sm font-medium"
            >
                Try Again
            </button>
        </div>
    </section>
)

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [enrollingId, setEnrollingId] = useState(null);

    // ✅ Memoize courses to prevent unnecessary re-renders
    const memoizedCourses = useMemo(() => courses, [courses]);

    // 📚 Fetch courses from backend
    const fetchCourses = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            console.log("🔄 Starting to fetch courses...");

            const { data } = await getCourses();

            console.log("🔍 RESPONSE DATA:", data);
            console.log("🔍 DATA TYPE:", typeof data);

            if (!data) {
                throw new Error('No course data received from server');
            }

            let coursesList = Array.isArray(data)
                ? data
                : (data.courses || data.items || data.results || []);

            console.log("🔍 COURSES LIST:", coursesList);
            console.log("🔍 COURSES LIST LENGTH:", coursesList.length);

            // ✅ FALLBACK: If API returns empty, use featured courses
            if (!Array.isArray(coursesList) || coursesList.length === 0) {
                console.log("⚠️ API returned empty, using featured courses as fallback");
                coursesList = featuredCourses;
            }

            if (!Array.isArray(coursesList)) {
                throw new Error('Invalid courses data format');
            }

            setCourses(coursesList);
            console.log("✅ COURSES SET SUCCESSFULLY");

        } catch (err) {
            // ✅ FALLBACK: On error, also use featured courses
            console.warn("⚠️ Error fetching from API, using featured courses as fallback:", err.message);
            setCourses(featuredCourses);

            const errorMessage = err.response?.data?.message
                || err.response?.data?.error
                || err.message
                || 'Using offline course catalog';

            console.error("FETCH COURSES ERROR:", errorMessage);
            // Don't set error state so we still show courses
            setError(null);

        } finally {
            setIsLoading(false);
        }
    }, []);

    // ✅ Fetch courses on mount
    useEffect(() => {
        console.log("🚀 FETCHING COURSES ON MOUNT");
        fetchCourses();
    }, [fetchCourses]);

    // 🎯 Enroll handler with better UX
    const handleEnroll = useCallback(async (courseId) => {
        // ✅ Validate courseId
        if (!courseId) {
            console.error("Invalid course ID");
            return;
        }

        try {
            setEnrollingId(courseId);

            const { data } = await enrollCourse(courseId);

            console.log("ENROLLED:", data);
            alert("Successfully enrolled! 🎉");

            // ✅ Refetch courses
            await fetchCourses();

        } catch (err) {
            const errorMessage = err.response?.data?.message
                || err.response?.data?.error
                || "Enrollment failed. Please try again.";

            console.error("ENROLL ERROR:", errorMessage);
            alert(errorMessage);

        } finally {
            setEnrollingId(null);
        }
    }, [fetchCourses]);

    console.log("🎯 RENDER STATE - Loading:", isLoading, "Error:", error, "Courses:", memoizedCourses.length);

    // ✅ Handle loading state
    if (isLoading) {
        console.log("⏳ SHOWING LOADING SKELETON");
        return (
            <div className="space-y-12">
                <section className="page-shell">
                    <CoursesSkeleton />
                </section>
            </div>
        );
    }

    // ✅ Handle error state (only if no courses)
    if (error && memoizedCourses.length === 0) {
        console.log("❌ SHOWING ERROR STATE");
        return (
            <div className="space-y-12">
                <CoursesError error={error} onRetry={fetchCourses} />
            </div>
        );
    }

    // ✅ Handle empty state (should not happen with fallback)
    if (memoizedCourses.length === 0) {
        console.log("📭 SHOWING EMPTY STATE");
        return (
            <div className="space-y-12">
                <section className="page-shell">
                    <div className="glass-card rounded-sm p-6 shadow-soft space-y-3">
                        <p className="text-sm text-[var(--color-muted)] uppercase tracking-[0.08em]">
                            All programs
                        </p>
                        <h1 className="text-3xl font-semibold">Courses & Tracks</h1>
                        <p className="text-[var(--color-muted)]">
                            No courses available at the moment. Please check back later.
                        </p>
                    </div>
                </section>
            </div>
        );
    }

    console.log("✅ SHOWING COURSES GRID WITH", memoizedCourses.length, "COURSES");

    return (
        <div className="space-y-12">
            {/* Hero Section */}
            <section className="page-shell">
                <div className="glass-card rounded-sm p-6 shadow-soft space-y-3">
                    <p className="text-sm text-[var(--color-muted)] uppercase tracking-[0.08em]">
                        All programs
                    </p>
                    <h1 className="text-3xl font-semibold">
                        Courses & Tracks
                    </h1>
                    <p className="text-[var(--color-muted)]">
                        Browse {memoizedCourses.length} course{memoizedCourses.length !== 1 ? 's' : ''} and enroll directly from the platform.
                    </p>
                </div>
            </section>

            {/* Courses Grid */}
            <CourseGrid
                id="courses-grid"
                title="All Courses"
                courses={memoizedCourses}
                onEnroll={handleEnroll}
                isEnrolling={enrollingId}
            />
        </div>
    );
};

export default Courses;