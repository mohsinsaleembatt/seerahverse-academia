import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import PageTransition from '../components/PageTransition.jsx'

const UserProfile = () => {
  const navigate = useNavigate()
  const { user, updateProfile, uploadProfilePicture, logout } = useAuth()
  const fileInputRef = useRef(null)
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  if (!user) {
    navigate('/login')
    return null
  }

  const handleProfilePictureClick = () => {
    fileInputRef.current?.click()
  }

  const handleProfilePictureUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setErrors({ image: 'Please select a valid image file' })
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors({ image: 'Image size must be less than 5MB' })
      return
    }

    setIsLoading(true)
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const imageData = event.target?.result
        uploadProfilePicture(imageData)
        setSuccessMessage('Profile picture updated successfully!')
        setTimeout(() => setSuccessMessage(''), 3000)
      } catch (error) {
        setErrors({ image: error.message || 'Failed to upload image' })
      } finally {
        setIsLoading(false)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)
    try {
      updateProfile({ fullName: formData.fullName })
      setSuccessMessage('Profile updated successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      setErrors({ submit: error.message || 'Failed to update profile' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout()
      navigate('/')
    }
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-[var(--color-bg)] pt-24 pb-10">
        <div className="page-shell max-w-2xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-2">My Profile</h1>
            <p className="text-[var(--color-muted)]">Manage your account settings and preferences</p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 glass-card rounded-2xl p-4 border border-green-500/50 bg-green-500/10">
              <p className="text-green-400 text-sm font-semibold flex items-center gap-2">
                <span>✓</span> {successMessage}
              </p>
            </div>
          )}

          {/* Profile Picture Section */}
          <div className="glass-card rounded-2xl p-8 mb-6">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">Profile Picture</h2>

            <div className="flex flex-col sm:flex-row items-center gap-8">
              {/* Picture */}
              <div className="relative">
                <img
                  src={user?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.fullName || 'User')}&size=200&background=random`}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-[var(--color-primary)]/20"
                />
                <button
                  onClick={handleProfilePictureClick}
                  disabled={isLoading}
                  className="absolute bottom-0 right-0 bg-[var(--color-primary)] text-[var(--color-bg)] rounded-full p-3 hover:shadow-lg transition-all disabled:opacity-50"
                  title="Change profile picture"
                >
                  📷
                </button>
              </div>

              {/* Info */}
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">{user?.fullName}</h3>
                <p className="text-[var(--color-muted)] mb-4">{user?.email}</p>
                <p className="text-sm text-[var(--color-text-muted-secondary)]">
                  Member since {new Date(user?.createdAt).toLocaleDateString()}
                </p>
                {user?.verified && (
                  <p className="text-sm text-[var(--color-primary)] mt-2 flex items-center gap-1">
                    ✓ Verified User
                  </p>
                )}
              </div>

              {/* File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleProfilePictureUpload}
                className="hidden"
              />
            </div>

            {errors.image && <p className="text-red-500 text-sm mt-4">{errors.image}</p>}
          </div>

          {/* Profile Settings */}
          <div className="glass-card rounded-2xl p-8 mb-6">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">Settings</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2\">Full Name</label>
                <input
                  type=\"text\"
                name=\"fullName\"
                value={formData.fullName}
                onChange={handleChange}
                className=\"w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors\"
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>

              {/* Email (Read Only) */}
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-[var(--color-muted)] opacity-50 cursor-not-allowed"
                />
                <p className="text-xs text-[var(--color-muted)] mt-1">Email cannot be changed</p>
              </div>

              {errors.submit && <p className="text-red-500 text-sm">{errors.submit}</p>}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[var(--color-primary)] to-orange-500 text-white font-semibold py-2 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>

          {/* Security Settings */}
          <div className="glass-card rounded-2xl p-8 mb-6">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">Security</h2>

            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <h3 className="font-semibold text-[var(--color-text-primary)] mb-2">Password</h3>
                <p className="text-sm text-[var(--color-muted)] mb-4">Last changed: Never</p>
                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-colors">
                  Change Password
                </button>
              </div>

              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <h3 className="font-semibold text-[var(--color-text-primary)] mb-2">Two-Factor Authentication</h3>
                <p className="text-sm text-[var(--color-muted)] mb-4">Not enabled</p>
                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-colors">
                  Enable 2FA
                </button>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="glass-card rounded-2xl p-8 border border-red-500/20 bg-red-500/5">
            <h2 className="text-2xl font-bold text-red-400 mb-6">Danger Zone</h2>

            <div className="space-y-4">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 rounded-lg text-red-400 font-semibold transition-colors"
              >
                🚪 Logout
              </button>

              <button className="w-full px-4 py-3 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 rounded-lg text-red-400 font-semibold transition-colors">
                🗑️ Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

export default UserProfile
