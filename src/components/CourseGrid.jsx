import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Title from '../utils/Title.jsx'
import Button from '../utils/Button.jsx'

const CourseGrid = ({ courses, title, subtitle, id, onEnroll, isEnrolling }) => {
  // ✅ Add validation
  if (!courses || !Array.isArray(courses)) {
    return null;
  }

  return (
    <section id={id} className="page-shell space-y-4 sm:space-y-6">
      <div>
        <div className="w-full sm:w-auto">
          <Title
            title={title}
            subtitle={subtitle}
            align='center'
            className='mb-30 bg-[var(--color-primary)]/60 z-50 text-[var(--color-bg)] text-[5rem] md:text-[3rem] sm:text-[1rem] xs:text-[0.8rem] shadow-[0 0 5px 0 rgba(0 0 0 1)] pl-5 -pt-5 leading-tight tracking-[0.3em] font-black'
          />
        </div>
      </div>

      <div className="grid gap-3 sm:gap-4 md:gap-[var(--grid-gap)] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {courses.map((course, index) => (
          <motion.article
            key={course._id || course.slug || index}  // ✅ IMPROVED: _id first, then slug, then index as fallback
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 * index }}
            className="glass-card rounded-md overflow-hidden flex flex-col h-full"
          >
            <img
              src={course.image}
              alt={course.title}
              className="h-32 sm:h-full md:h-full w-full object-cover"
              loading="lazy"
            />

            <div className="flex-1 space-y-2 sm:space-y-3 p-3 sm:p-4">
              <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] uppercase tracking-[0.08em] flex-wrap gap-2">
                <span>{course.duration}</span>
                <span>{course.level}</span>
              </div>

              <h3 className="text-base sm:text-lg md:text-xl font-semibold line-clamp-2">
                {course.title}
              </h3>

              <p className="text-xs sm:text-sm text-[var(--color-text-muted)] line-clamp-2">
                {course.blurb}
              </p>

              {/* Course Tags */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-[var(--color-text-muted)]">
                <span className="rounded-[var(--radius-pill)] bg-white/5 px-2 sm:px-3 py-1">
                  {course.weeklyHours}
                </span>
                <span className="rounded-[var(--radius-pill)] bg-white/5 px-2 sm:px-3 py-1 line-clamp-1">
                  Instructor: {course.instructor}
                </span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="border-t border-white/5 p-3 sm:p-4">
              <div className="flex justify-around items-center gap-2">
                <p className="text-white flex items-center gap-1 text-xs font-semibold">
                  <span aria-hidden>💲</span> {course.priceUsd}
                </p>
                <p className="text-[var(--color-text-muted)] flex items-center gap-1 text-xs font-semibold">
                  <span aria-hidden>₹</span> {course.priceInr}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-around items-center gap-2 p-3 sm:p-4 border-t border-white/5">
              {/* Explore Button */}
              <Button
                text="Explore"
                href={`/courses/${course.slug}`}
                variant="primary"
                size="md"
                className="h-8 w-fit text-xs"
              />

              {/* Enroll Button */}
              {/* <button
                onClick={() => onEnroll(course._id)}
                disabled={isEnrolling === course._id}  // ✅ IMPROVED: Show loading state
                className="h-8 px-3 cursor-pointer bg-green-500/20 hover:bg-green-500/30 text-white text-xs sm:text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded"
              >
                {isEnrolling === course._id ? (
                  <span className="flex items-center gap-1">
                    <span className="inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Enrolling...
                  </span>
                ) : (
                  'Enroll'
                )}
              </button> */}

              <button
                onClick={() => onEnroll(course)}
                className="h-8 px-3 cursor-pointer bg-green-800 hover:bg-green-500/30 text-white text-xs sm:text-sm transition-all duration-200"
              >
                Enroll
              </button>
            </div>
          </motion.article>
        ))}
      </div>

      {/* View All Button */}
      <div className='flex justify-center items-center'>
        <Button
          text="View all"
          href="/courses"
          variant="primary"
          size="md"
          className="mt-10"
        />
      </div>
    </section>
  )
}

export default CourseGrid