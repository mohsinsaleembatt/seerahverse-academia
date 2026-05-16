import arabicAdult from '../images/languages/arabic-adult.webp'
import arabicKids from '../images/languages/arabic-kids.webp'
import englishAdult from '../images/languages/english-adult.webp'
import englishKids from '../images/languages/english-kids.webp'
import counseling from '../images/services/1-on-1-Counselling.png.webp'
import darsEQuran from '../images/f-SoG/dars-e-quran.webp'
import seerahSessions from '../images/f-SoG/seerah-sessions.webp'
import advancedPsychology from '../images/upcoming/advanced-psychology.webp'
import youthTraining from '../images/upcoming/youth-traning-nexus.webp'
import divineDesign from '../images/upcoming/divine-design.webp'


export const ctaCard = [
  {
    eyebrow: 'Homeschooling Program',
    title: 'Empowering young minds with knowledge and character.',
    body: 'Where home becomes the heart of learning—coaching for parents and learners together.',
    actionLabel: 'Enroll now',
    href: '/homeschooling',
  },
  {
    eyebrow: 'Join Our Community',
    title: 'Connect, learn, and grow with like-minded individuals.',
    body: 'Be part of a vibrant community dedicated to knowledge and leadership.',
    actionLabel: 'Get Started',
    href: '/community',
  },
]


// Language tracks reuse the same shape as courses to keep card UI consistent.
export const languageTracks = [
  {
    slug: 'arabic-adults',
    title: 'Arabic for Adults',
    duration: '2 Years',
    level: 'Beginner',
    weeklyHours: '2 Hrs/Wk',
    priceUsd: '11.60/Month',
    priceInr: '999/Month',
    instructor: 'TBD',
    image: arabicAdult,
    blurb: 'Build fluency and confidence in classical + modern Arabic contexts.',
  },
  {
    slug: 'arabic-kids',
    title: 'Arabic for Kids',
    duration: '2 Years',
    level: 'Beginner',
    weeklyHours: '2 Hrs/Wk',
    priceUsd: '11.60/Month',
    priceInr: '999/Month',
    instructor: 'TBD',
    image: arabicKids,
    blurb: 'Age-appropriate fluency through stories, activities, and reflection.',
  },
  {
    slug: 'english-adults',
    title: 'English for Adults',
    duration: '1 Year',
    level: 'Beginner',
    weeklyHours: '1 Hr/Wk',
    priceUsd: '11.60/Month',
    priceInr: '999/Month',
    instructor: 'TBD',
    image: englishAdult,
    blurb: 'Communication, presentation, and writing skills for global contexts.',
  },
  {
    slug: 'english-kids',
    title: 'English for Kids',
    duration: '1 Year',
    level: 'Beginner',
    weeklyHours: '1 Hr/Wk',
    priceUsd: '11.60/Month',
    priceInr: '999/Month',
    instructor: 'TBD',
    image: englishKids,
    blurb: 'Story-first learning with projects that keep kids engaged.',
  },
]

export const services = [
  {
    title1: 'Personalized One-on-One Counseling',
    descriptionTitle1:
      'Rediscover balance, clarity, and purpose through tailored guidance and compassionate support.',
    bullets: [
      'Personal Therapy',
      'Family Therapy',
      'Life Coaching',
      'Career + Purpose Planning'],

    title2: 'Transformative Corporate Training',
    descriptionTitle2:
      'Elevate your organization’s capabilities with our high-impact corporate training solutions, designed to empower teams and leaders at every level',
    bullets: [
      'Leadership development',
      'Emotional intelligence mastery',
      'Communication & team building',
      'Productivity & performance optimization',
    ],
    image: counseling,
  },
]

export const freeCourses = [
  {
    slug: 'dars-e-quran',
    title: 'Dars e Quran',
    priceUsd: 'Free',
    priceInr: 'Free',
    duration: 'Ongoing',
    level: 'Open',
    weeklyHours: '1 Hr/Wk',
    image: darsEQuran,
    blurb: 'Transformative journey through every verse of the Holy Quran.',
  },
  {
    slug: 'seerah-sessions',
    title: 'Seerah ﷺ Sessions',
    priceUsd: 'Free',
    priceInr: 'Free',
    duration: 'Ongoing',
    level: 'Open',
    weeklyHours: '1 Hr/Wk',
    image: seerahSessions,
    blurb: 'Deep understanding of the Seerah with reflective discussion.',
  },
]

export const upcomingCourses = [
  {
    slug: 'advanced-psychology',
    title: 'Advanced Psychology',
    duration: '15 Months',
    level: 'Beginner',
    weeklyHours: '2 Hrs/Wk',
    priceUsd: 'TBD',
    priceInr: 'TBD',
    instructor: 'TBD',
    image: advancedPsychology,
    blurb: 'Integrating modern psychology with ethics and purpose.',
  },
  {
    slug: 'youth-training-nexus',
    title: 'Youth Training Nexus',
    duration: '15 Months',
    level: 'Beginner',
    weeklyHours: '2 Hrs/Wk',
    priceUsd: 'TBD',
    priceInr: 'TBD',
    instructor: 'TBD',
    image: youthTraining,
    blurb: 'Youth leadership labs with mentorship and projects.',
  },
  {
    slug: 'divine-design',
    title: 'Divine Design',
    duration: '15 Months',
    level: 'Beginner',
    weeklyHours: '2 Hrs/Wk',
    priceUsd: 'TBD',
    priceInr: 'TBD',
    instructor: 'TBD',
    image: divineDesign,
    blurb: 'Design thinking rooted in service and stewardship.',
  },
]

export const visionCopy = {
  headline: 'SeerahVerse Academia Vision',
  paragraphs: [
    'We are on a mission to create leaders for the next generations, integrating scientific excellence with the timeless wisdom of Islamic philosophy.',
    'We cultivate responsibility and ethical leadership, empowering students to become catalysts for positive change across their communities.',
    'Through innovative programs, we build a brighter future where knowledge is applied for the greater good.',
  ],
}

