import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import PageTransition from '../components/PageTransition.jsx'

const Contact = () => {
  const { isAuthenticated, user } = useAuth()
  const [formData, setFormData] = useState({
    fullName: isAuthenticated ? user?.fullName : '',
    email: isAuthenticated ? user?.email : '',
    phone: '',
    age: '',
    dob: '',
    courseChoice: '',
    city: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Valid email is required'
    if (!formData.phone.match(/^[\d\s\-\+\(\)]{10,}$/)) newErrors.phone = 'Valid phone number is required'
    if (!formData.dob) newErrors.dob = 'Date of birth is required'
    if (!formData.courseChoice.trim()) newErrors.courseChoice = 'Please select a course'
    if (!formData.city.trim()) newErrors.city = 'City/District is required'
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // Save to localStorage (in production, send to backend)
      const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]')
      submissions.push({
        id: Date.now(),
        ...formData,
        submittedAt: new Date().toISOString(),
      })
      localStorage.setItem('contactSubmissions', JSON.stringify(submissions))
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setFormData({
          fullName: isAuthenticated ? user?.fullName : '',
          email: isAuthenticated ? user?.email : '',
          phone: '',
          age: '',
          dob: '',
          courseChoice: '',
          city: '',
        })
      }, 3000)
    } catch (error) {
      setErrors({ submit: 'Failed to submit form. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const calculateAge = (dob) => {
    if (!dob) return ''
    const today = new Date()
    const birthDate = new Date(dob)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  const handleDobChange = (e) => {
    const dob = e.target.value
    setFormData((prev) => ({
      ...prev,
      dob,
      age: calculateAge(dob),
    }))
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-[var(--color-bg)] pt-20 pb-10">
        <div className="page-shell max-w-2xl">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4">Get in Touch</h1>
            <p className="text-lg text-[var(--color-text-muted)]">
              Have questions about our courses? Fill out the form below and we'll get back to you soon.
            </p>
          </div>

          {submitted && (
            <div className="mb-8 glass-card rounded-2xl p-6 border border-green-500/50 bg-green-500/10">
              <p className="text-green-400 font-semibold flex items-center gap-2">
                <span>✓</span> Thank you! Your submission has been received.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={isAuthenticated}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors disabled:opacity-50\"
                  placeholder="John Doe"
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2\">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isAuthenticated}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors disabled:opacity-50\"
                  placeholder="you@example.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2\">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors\"
                  placeholder="+1 (555) 000-0000"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2\">Date of Birth *</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleDobChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors\"
                />
                {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
              </div>

              {/* Age Display */}
              {formData.age && (
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2\">Age</label>
                  <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-[var(--color-text-primary)]\">
                    {formData.age}
                  </div>
                </div>
              )}

              {/* Course Choice */}
              <div className={formData.age ? '' : 'sm:col-span-2'}>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2\">Course Choice *</label>
                <select
                  name="courseChoice"
                  value={formData.courseChoice}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors\"
                >
                  <option value="">Select a course...</option>
                  <option value="artificialintelligence">Artificial Intelligence</option>
                  <option value="quranicmaths">Quranic Maths</option>
                  <option value="physics">Physics</option>
                  <option value="chemistry">Chemistry</option>
                  <option value="biology">Biology & Quran</option>
                  <option value="english">English</option>
                  <option value="mentorship">Mentorship Program</option>
                </select>
                {errors.courseChoice && <p className="text-red-500 text-sm mt-1">{errors.courseChoice}</p>}
              </div>

              {/* City */}
              <div className={formData.age ? '' : 'sm:col-span-2'}>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2\">City / District *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors\"
                  placeholder="New York"
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
              </div>
            </div>

            {errors.submit && <p className="text-red-500 text-sm">{errors.submit}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[var(--color-primary)] to-orange-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed\"
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </PageTransition>
  )
}

export default Contact
