import { featuredCourses } from './courses.js'

export const navLinks = [
  { label: 'Home', to: '/' },
  {
    label: 'Courses',
    to: '/courses',
    children: featuredCourses.map((course) => ({
      label: course.title,
      to: `/courses/${course.slug}`,
    })),
  },
  { label: 'Homeschooling', to: '/homeschooling' },
  { label: 'Services', to: '/services' },
  { label: 'Free Learning', to: '/free-learning' },
  { label: 'About', to: '/about' },
  { label: 'Instructor', to: '/instructor' },
]

