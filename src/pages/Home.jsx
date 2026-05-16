import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'

import Hero from '../components/Hero.jsx'
import CourseGrid from '../components/CourseGrid.jsx'
import EnrollmentModal from '../components/EnrollmentModal.jsx'
import { createEnrollment } from '../api/enrollment.js';


import { featuredCourses } from '../assets/data/courses.js'

import {
  languageTracks,
  freeCourses,
  upcomingCourses,
  services,
  ctaCard,
} from '../assets/data/siteContent.js'

import Vision from '../components/vision/Vision.jsx'
import Title from '../utils/Title.jsx'

const Home = () => {

  // =====================================================
  // 📚 COURSES
  // =====================================================
  const topCourses = useMemo(
    () => featuredCourses.slice(0, 4),
    []
  )

  const stemCourses = useMemo(
    () =>
      featuredCourses.filter(
        (course) => course.category === 'stem'
      ),
    []
  )

  // =====================================================
  // 🎭 ANIMATION VARIANTS
  // =====================================================
  const sectionVariants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: 16,
        scale: 0.995,
      },

      show: {
        opacity: 1,
        y: 0,
        scale: 1,

        transition: {
          duration: 0.4,
          ease: 'easeOut',
        },
      },
    }),
    []
  )

  // =====================================================
  // 🧾 ENROLLMENT MODAL STATE
  // =====================================================
  const [selectedCourse, setSelectedCourse] = useState(null)

  const [isEnrollmentOpen, setIsEnrollmentOpen] =
    useState(false)

  const [isSubmittingEnrollment, setIsSubmittingEnrollment] =
    useState(false)

  // =====================================================
  // 🚀 OPEN ENROLLMENT MODAL
  // =====================================================
  const handleEnroll = (course) => {

    setSelectedCourse(course)

    setIsEnrollmentOpen(true)
  }

  // =====================================================
  // 📚 HANDLE ENROLLMENT SUBMIT
  // =====================================================
  const handleEnrollmentSubmit = async (formData) => {

    try {

      setIsSubmittingEnrollment(true);

      const { data } = await createEnrollment(formData);

      console.log('✅ Enrollment Success:', data);

      alert(data.message);

      setIsEnrollmentOpen(false);

    } catch (err) {

      console.error(err);

      alert(
        err.response?.data?.error ||
        'Enrollment failed'
      );

    } finally {

      setIsSubmittingEnrollment(false);
    }
  };


  return (
    <div className="space-y-12">

      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}
      <Hero />

      {/* ================================================= */}
      {/* CTA CARD SECTION */}
      {/* ================================================= */}
      <motion.section
        className="page-shell grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4 sm:gap-6 xl:gap-6 mb-6 sm:mb-12 items-center min-h-[40vh] sm:h-[60vh] xl:h-full"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10%' }}
      >

        {ctaCard.map((card, index) => (

          <div
            key={index}
            className="glass-card h-full rounded-sm hover:rounded-none shadow-2xl pl-4 sm:pl-8 md:pl-10 pr-4 sm:pr-6 py-4 sm:py-6 transition-all duration-300"
          >

            <div className='group -z-10'>

              <p className="text-xs sm:text-sm group text-[var(--color-bg)] bg-[var(--color-text-muted-secondary)] group-hover:bg-[var(--color-bg)] w-fit font-black mb-2 sm:mb-5 px-2 sm:px-5 py-1 group-hover:text-[var(--color-primary)] uppercase tracking-[0.2em] sm:tracking-[0.5em] shadow-lg">
                {card.eyebrow}
              </p>

              <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl text-[var(--color-text-muted-secondary)] mb-3 sm:mb-10 font-semibold leading-tight">
                {card.title}
              </h3>

              <p className="text-xs sm:text-sm md:text-md w-full sm:w-3/4 lg:w-1/2 text-[var(--color-text-muted)]">
                {card.body}
              </p>

              <span className="absolute rounded-l-sm group-hover:rounded-none pr-1 sm:pr-8 inset-0 -z-50 h-full w-0 bg-[var(--color-primary)]/20 transition-all duration-400 ease-out group-hover:w-full"></span>

            </div>

            <motion.a
              href={card.href}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="button group inline-flex mt-4 sm:mt-10 items-center gap-2 rounded-sm shadow-md text-transparent bg-gradient-to-r from-[var(--color-primary)]/20 to-transparent px-2 sm:px-3 lg:px-4 pr-3 sm:pr-4 lg:pr-6 hover:pr-3 sm:hover:pr-4 lg:hover:pr-10 py-2 sm:py-3 lg:py-4 text-xs sm:text-sm md:text-md font-semibold hover:bg-white/5 transition-all duration-300"
            >

              <span className="relative z-10 text-lg transition-colors duration-300 font-bold text-[var(--color-primary)] group-hover:text-[var(--color-bg)]">
                {card.actionLabel}
              </span>

              <span
                aria-hidden
                className='z-20 text-[var(--color-primary)] group-hover:text-[var(--color-bg)] ml-2 group-hover:mt-0 group-hover:opacity-100 transition-all duration-300 overflow-hidden rotate-90 group-hover:rotate-270'
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-arrow-down"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"
                  />
                </svg>
              </span>

              <span className="absolute inset-0 z-0 h-full w-0 bg-[var(--color-primary)] transition-all duration-400 ease-out group-hover:w-full"></span>

            </motion.a>
          </div>
        ))}
      </motion.section>

      {/* ================================================= */}
      {/* FEATURED COURSES */}
      {/* ================================================= */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10%' }}
      >

        <CourseGrid
          id="courses"
          title="Featured Courses"
          subtitle="Discover our most popular courses tailored for your learning journey."
          courses={topCourses}
          onEnroll={handleEnroll}
        />

      </motion.div>

      {/* ================================================= */}
      {/* STEM COURSES */}
      {/* ================================================= */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10%' }}
      >

        <CourseGrid
          id="stem"
          title="Stem"
          subtitle="Explore our STEM courses designed to inspire and educate."
          courses={stemCourses}
          onEnroll={handleEnroll}
        />

      </motion.div>

      {/* ================================================= */}
      {/* VISION SECTION */}
      {/* ================================================= */}
      <motion.div
        id="vision"
        className="page-shell"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10%' }}
      >

        <Title
          title="VISION"
          subtitle="Our vision is to cultivate transformative leaders for the next century by providing unparalleled knowledge and leadership development opportunities."
          align='center'
          className='mb-10 bg-[var(--color-primary)]/60 z-50 text-[var(--color-bg)] text-[5rem] md:text-[3rem] sm:text-[1rem] xs:text-[0.8rem] shadow-[0 0 5px 0 rgba(0 0 0 1)] pl-5 -pt-5 leading-tight tracking-[0.3em] font-black'
        />

        <Vision />

      </motion.div>

      {/* ================================================= */}
      {/* ENROLLMENT MODAL */}
      {/* ================================================= */}
      <EnrollmentModal
        isOpen={isEnrollmentOpen}
        onClose={() => setIsEnrollmentOpen(false)}
        course={selectedCourse}
        onSubmit={handleEnrollmentSubmit}
        isSubmitting={isSubmittingEnrollment}
      />

    </div>
  )
}

export default Home