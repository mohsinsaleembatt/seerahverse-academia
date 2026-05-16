import womenLeadership from '../images/women-leadership.webp'
import mentorship from '../images/mentorship.webp'
import artificialIntelligence from '../images/artificial-intelligence.webp'
import socialSciences from '../images/social-sciences.webp'
import physics from '../images/stem/physics.webp'
import chemistry from '../images/stem/chemistry.webp'
import biology from '../images/stem/biology.webp'
import quranicMaths from '../images/stem/quranic-maths.webp'

export const featuredCourses = [
  {
    _id: 'women-leadership-course',
    slug: 'women-leadership',
    category: 'leadership',
    title: 'Women Leadership',
    duration: '15 Months',
    level: 'Beginner',
    weeklyHours: '2 Hrs/Wk',
    priceUsd: '19/Month',
    priceInr: '1499/Month',
    instructor: 'Ghabit Nabi',
    image: womenLeadership,
    blurb: 'Harness Islamic values to lead with purpose, passion, and integrity.',
    description:
      'A leadership journey centering Islamic values, confidence, and strategic thinking so learners can lead teams and communities with clarity.',
    outcomes: ['Purpose-driven leadership', 'Strategic communication', 'Community-first decision making'],
  },
  {
    _id: 'mentorship-course',
    slug: 'mentorship',
    category: 'leadership',
    title: 'Mentorship',
    duration: '1 Year',
    level: 'Beginner',
    weeklyHours: '2 Hrs/Wk',
    priceUsd: '24/Month',
    priceInr: '1999/Month',
    instructor: 'Ghabit Nabi',
    image: mentorship,
    blurb: 'Apply lessons from the Seerah of Prophet Muhammad ﷺ in real scenarios.',
    description:
      'A practical program to translate Seerah lessons into modern contexts with guided projects, reflection, and peer mentorship.',
    outcomes: ['Applied Seerah projects', 'Ethical frameworks for work', 'Mentoring playbook'],
  },
  {
    _id: 'artificial-intelligence-course',
    slug: 'artificial-intelligence',
    category: 'technology',
    title: 'Artificial Intelligence',
    duration: '15 Months',
    level: 'Beginner',
    weeklyHours: '2 Hrs/Wk',
    priceUsd: '12.79/Month',
    priceInr: '1299/Month',
    instructor: 'TBD',
    image: artificialIntelligence,
    blurb: 'Build AI solutions that prioritize ethics and impact for good.',
    description:
      'Foundations of AI with an ethics-first mindset—covering data literacy, model basics, and responsible deployment patterns.',
    outcomes: ['Data + model literacy', 'AI ethics toolkit', 'Deploying AI for social good'],
  },
  {
    _id: 'social-sciences-course',
    slug: 'social-sciences',
    category: 'leadership',
    title: 'Social Sciences',
    duration: '2 Years',
    level: 'Beginner',
    weeklyHours: '2 Hrs/Wk',
    priceUsd: '11.60/Month',
    priceInr: '999/Month',
    instructor: 'TBD',
    image: socialSciences,
    blurb: 'Learn holistic, critical perspectives on societal structures.',
    description:
      'Critical perspectives on society, policy, and ethics rooted in both contemporary research and Islamic intellectual traditions.',
    outcomes: ['Systems thinking', 'Policy literacy', 'Community research methods'],
  },
  {
    _id: 'physics-course',
    slug: 'physics',
    category: 'stem',
    title: 'Physics',
    duration: '2 Years',
    level: 'Beginner',
    weeklyHours: '2 Hrs/Wk',
    priceUsd: '11.60/Month',
    priceInr: '999/Month',
    instructor: 'TBD',
    image: physics,
    blurb: 'Explore physics through the Qur’an—seeing every concept as an Ayah.',
    description:
      'Motion to light, explored through Qur’anic lenses with lab-first practice, so learners read nature as a sign (Ayah).',
    outcomes: ['Foundational physics toolkit', 'Lab and observation habits', 'Qur’anic reflections on nature'],
  },
  {
    _id: 'chemistry-course',
    slug: 'chemistry',
    category: 'stem',
    title: 'Chemistry',
    duration: '2 Years',
    level: 'Beginner',
    weeklyHours: '2 Hrs/Wk',
    priceUsd: '11.60/Month',
    priceInr: '999/Month',
    instructor: 'TBD',
    image: chemistry,
    blurb: 'Blend core chemical principles with Islamic scholarly contributions.',
    description:
      'From atoms to reactions with historical contributions from Islamic scholars, plus modern applications and lab safety.',
    outcomes: ['Chemical intuition', 'Safety + lab readiness', 'Historical context for modern chem'],
  },
  {
    _id: 'biology-course',
    slug: 'biology',
    category: 'stem',
    title: 'Biology',
    duration: '2 Years',
    level: 'Beginner',
    weeklyHours: '2 Hrs/Wk',
    priceUsd: '11.60/Month',
    priceInr: '999/Month',
    instructor: 'TBD',
    image: biology,
    blurb: 'Comprehensive life sciences journey with ethics and breakthroughs.',
    description:
      'Life sciences from cell foundations to modern bioethics with practical labs and case studies on stewardship.',
    outcomes: ['Cell-to-systems mastery', 'Bioethics grounding', 'Research literacy'],
  },
  {
    _id: 'quranic-maths-course',
    slug: 'quranic-maths',
    category: 'stem',
    title: "Qur'anic Mathematics",
    duration: '2 Years',
    level: 'Beginner',
    weeklyHours: '2 Hrs/Wk',
    priceUsd: '11.60/Month',
    priceInr: '999/Month',
    instructor: 'TBD',
    image: quranicMaths,
    blurb: 'Integrate Islamic heritage with modern mathematical applications.',
    description:
      'Structured mathematics syllabus weaving Islamic heritage with modern STEM applications and problem-solving.',
    outcomes: ['Problem solving fluency', 'Historical appreciation', 'STEM application mindset'],
  },
]

export const findCourseBySlug = (slug) =>
  featuredCourses.find((course) => course.slug === slug)

