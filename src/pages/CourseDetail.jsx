import { Link, useParams } from 'react-router-dom'
import { findCourseBySlug } from '../assets/data/courses.js'
import NotFound from './NotFound.jsx'
import Notetaker from '../components/Notetaker.jsx'

const CourseDetail = () => {
  const { slug } = useParams()
  const course = findCourseBySlug(slug)

  if (!course) {
    return <NotFound message="We could not find that course. Please pick another option." />
  } 

  return (
    <div className="space-y-10">
      <section className="page-shell">
        <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
          <div className="glass-card rounded-sm p-6 shadow-soft space-y-4">
            <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">{course.level}</p>
            <h1 className="text-3xl font-semibold">{course.title}</h1>
            <p className="text-[var(--color-muted)]">{course.description}</p>
            <div className="flex flex-wrap gap-3 text-sm text-[var(--color-muted)]">
              <span className="rounded-[var(--radius-pill)] bg-white/5 px-3 py-1">Duration: {course.duration}</span>
              <span className="rounded-[var(--radius-pill)] bg-white/5 px-3 py-1">Weekly: {course.weeklyHours}</span>
              <span className="rounded-[var(--radius-pill)] bg-white/5 px-3 py-1">Instructor: {course.instructor}</span>
            </div>
          </div>

          <div className="glass-card rounded-sm overflow-hidden shadow-soft">
            <img src={course.image} alt={course.title} className="h-100 w-full object-cover" loading="lazy" />
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between text-sm font-semibold">
                <div>
                  <p className="text-white flex items-center gap-2">
                    <span aria-hidden>💲</span> {course.priceUsd}
                  </p>
                  <p className="text-[var(--color-text-muted)] flex items-center gap-2">
                    <span aria-hidden>₹</span> {course.priceInr}
                  </p>
                </div>
                <Link
                  to="/instructor"
                  className="rounded-xs bg-gradient-to-r from-[var(--color-yellow)] to-transparent shadow-sm shadow-white/50 hover:shadow-none transition-all duration-250 px-4 py-2 text-xs uppercase tracking-wider"
                >
                  Reserve the spot
                </Link>
              </div>
              <div>
                <p className="text-sm text-[var(--color-text-muted)]">
                  You will receive the onboarding form, payment link, and schedule after reserving your seat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell grid gap-6 lg:grid-cols-2">
        <div className="glass-card rounded-[var(--radius-lg)] p-6 shadow-soft">
          <h3 className="text-xl font-semibold">Learning outcomes</h3>
          <ul className="mt-3 space-y-2 text-[var(--color-text-muted)]">
            {course.outcomes?.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span aria-hidden>•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="glass-card rounded-[var(--radius-lg)] p-6 shadow-soft space-y-3">
          <h3 className="text-xl font-semibold">Next steps</h3>
          <p className="text-[var(--color-muted)]">
            Speak with an advisor to align the track to your goals and confirm the start date. We keep cohorts small for
            stronger mentorship.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link
              to="/homeschooling"
              className="rounded-[var(--radius-pill)] border border-white/15 px-4 py-2 font-semibold hover:bg-white/5"
            >
              Talk to us
            </Link>
            <a
              href="mailto:info@seerahverse.org"
              className="rounded-[var(--radius-pill)] bg-white/10 px-4 py-2 font-semibold hover:bg-white/20"
            >
              info@seerahverse.org
            </a>
          </div>
        </div>
      </section>

      <section className="page-shell">
        <Notetaker courseSlug={slug} />
      </section>
    </div>
  )
}

export default CourseDetail

