import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import PageTransition from '../components/PageTransition.jsx'
import DashboardSidebar from '../components/DashboardSidebar.jsx'
import DashboardNavbar from '../components/DashboardNavbar.jsx'
import DashboardCard from '../components/DashboardCard.jsx'

const Dashboard = () => {
  const { user, isLoading, isAdmin, logout, updateProfile } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [formState, setFormState] = useState({ fullName: '', bio: '', phone: '', location: '' })
  const [imagePreview, setImagePreview] = useState('')
  const [status, setStatus] = useState({ success: '', error: '' })
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (user) {
      setFormState({
        fullName: user.fullName || '',
        bio: user.bio || '',
        phone: user.phone || '',
        location: user.location || '',
      })
      setImagePreview(user.profilePicture || '')
    }
  }, [user])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageSelect = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSaving(true)
    setStatus({ success: '', error: '' })

    try {
      await updateProfile({
        ...formState,
        profilePicture: imagePreview,
      })
      setStatus({ success: 'Profile successfully updated', error: '' })
    } catch (err) {
      setStatus({ success: '', error: err.message || 'Unable to update profile' })
    } finally {
      setIsSaving(false)
    }
  }

  const enrolledCoursesCount = user?.enrolledCourses?.length ?? 0
  const welcomeName = user?.fullName?.split(' ')[0] || 'Learner'
  const userImage = imagePreview || user?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.fullName || 'User')}&background=random`

  const menuItems = useMemo(
    () => [
      { label: 'Dashboard', icon: '📊', href: '/dashboard' },
      { label: 'Profile', icon: '👤', href: '/dashboard/profile' },
      { label: 'Enrolled Courses', icon: '📚', href: '/dashboard/courses' },
      { label: 'Submissions', icon: '📝', href: '/dashboard/submissions' },
      { label: 'Messages', icon: '💬', href: '/dashboard/messages' },
      ...(isAdmin
        ? [
          { label: 'Article Management', icon: '✍️', href: '/admin/articles' },
          { label: 'User Management', icon: '👥', href: '/admin/users' },
        ]
        : []),
    ],
    [isAdmin]
  )

  const statCards = [
    {
      icon: '📚',
      label: 'Enrolled Courses',
      value: enrolledCoursesCount,
      detail: 'Updated live from your profile data',
    },
    {
      icon: '📈',
      label: 'Activity Score',
      value: '72%',
      detail: 'Learning momentum for this week',
    },
    {
      icon: '💬',
      label: 'Messages',
      value: 5,
      detail: 'New messages in your inbox',
    },
  ]

  if (isLoading) {
    return (
      <PageTransition>
        <div className="min-h-[calc(100vh-var(--header-height))] bg-[var(--color-bg)] pt-6">
          <div className="mx-auto max-w-[var(--content-max)] px-4 sm:px-6 lg:px-8">
            <div className="glass-card rounded-[var(--radius-lg)] p-10 text-center text-[var(--color-text-muted)] shadow-soft">
              Loading your dashboard...
            </div>
          </div>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="min-h-[calc(100vh-var(--header-height))] bg-[var(--color-bg)]">
        <div className="mx-auto max-w-[var(--content-max)] px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col gap-6 xl:flex-row">
            <div className="xl:w-72">
              <DashboardSidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                menuItems={menuItems}
                user={user}
                onLogout={handleLogout}
              />
            </div>

            <main className="flex-1 space-y-6">
              <DashboardNavbar user={user} onToggleSidebar={() => setSidebarOpen((prev) => !prev)} onLogout={handleLogout} />

              <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
                <div className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {statCards.map((card) => (
                      <DashboardCard key={card.label} icon={card.icon} label={card.label} value={card.value} detail={card.detail} />
                    ))}
                  </div>

                  <div className="glass-card rounded-[var(--radius-lg)] border border-white/10 p-6 shadow-soft">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-primary)]">Hello, {welcomeName}</p>
                        <h2 className="mt-3 text-2xl font-semibold text-[var(--color-text-primary)]">Your student summary</h2>
                        <p className="mt-2 max-w-2xl text-sm text-[var(--color-text-muted)]">
                          Your dashboard now uses real data for enrolled courses and profile details. Keep your profile current for personalized recommendations.
                        </p>
                      </div>
                      <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-[var(--color-text-muted)]">
                        <p className="font-medium text-[var(--color-text-primary)]">Role</p>
                        <p className="mt-1">{user?.role || 'user'}</p>
                      </div>
                    </div>
                  </div>

                  <section className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
                    <div className="glass-card rounded-[var(--radius-lg)] border border-white/10 p-6 shadow-soft">
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                          <img src={userImage} alt="Profile" className="h-20 w-20 rounded-3xl object-cover border border-white/10" />
                          <div>
                            <p className="text-lg font-semibold text-[var(--color-text-primary)]">{user?.fullName || 'User'}</p>
                            <p className="text-sm text-[var(--color-text-muted)]">{user?.email || 'no-email@example.com'}</p>
                          </div>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="rounded-3xl bg-white/5 p-4">
                            <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-primary)]">Courses</p>
                            <p className="mt-2 text-2xl font-semibold text-[var(--color-text-primary)]">{enrolledCoursesCount}</p>
                          </div>
                          <div className="rounded-3xl bg-white/5 p-4">
                            <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-primary)]">Status</p>
                            <p className="mt-2 text-2xl font-semibold text-[var(--color-text-primary)]">Active</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="glass-card rounded-[var(--radius-lg)] border border-white/10 p-6 shadow-soft">
                      <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">Quick next steps</h3>
                      <ul className="mt-5 space-y-3 text-sm text-[var(--color-text-muted)]">
                        <li className="rounded-3xl bg-white/5 p-4">Review your enrolled courses and continue your most recent lesson.</li>
                        <li className="rounded-3xl bg-white/5 p-4">Upload a profile picture to personalize your account.</li>
                        <li className="rounded-3xl bg-white/5 p-4">Check messages to stay on top of updates.</li>
                      </ul>
                    </div>
                  </section>
                </div>

                <div className="space-y-6">
                  <div className="glass-card rounded-[var(--radius-lg)] border border-white/10 p-6 shadow-soft">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-primary)]">Profile settings</p>
                        <h2 className="mt-2 text-2xl font-semibold text-[var(--color-text-primary)]">Update your profile</h2>
                      </div>
                      <span className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase text-[var(--color-primary)]">Secure</span>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <label className="block text-sm font-medium text-[var(--color-text-muted)]">
                          Full name
                          <input
                            name="fullName"
                            value={formState.fullName}
                            onChange={handleChange}
                            className="mt-2 w-full rounded-3xl border border-white/10 bg-[var(--color-bg)] px-4 py-3 text-sm text-[var(--color-text-primary)] outline-none transition focus:border-white/20 focus:ring-2 focus:ring-[var(--color-focus)]"
                          />
                        </label>
                        <label className="block text-sm font-medium text-[var(--color-text-muted)]">
                          Phone
                          <input
                            name="phone"
                            value={formState.phone}
                            onChange={handleChange}
                            className="mt-2 w-full rounded-3xl border border-white/10 bg-[var(--color-bg)] px-4 py-3 text-sm text-[var(--color-text-primary)] outline-none transition focus:border-white/20 focus:ring-2 focus:ring-[var(--color-focus)]"
                          />
                        </label>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <label className="block text-sm font-medium text-[var(--color-text-muted)]">
                          Role
                          <input
                            value={user?.role || 'user'}
                            disabled
                            className="mt-2 w-full rounded-3xl border border-white/10 bg-[var(--color-bg)] px-4 py-3 text-sm text-[var(--color-text-muted)] outline-none"
                          />
                        </label>
                        <label className="block text-sm font-medium text-[var(--color-text-muted)]">
                          Location
                          <input
                            name="location"
                            value={formState.location}
                            onChange={handleChange}
                            className="mt-2 w-full rounded-3xl border border-white/10 bg-[var(--color-bg)] px-4 py-3 text-sm text-[var(--color-text-primary)] outline-none transition focus:border-white/20 focus:ring-2 focus:ring-[var(--color-focus)]"
                          />
                        </label>
                      </div>

                      <label className="block text-sm font-medium text-[var(--color-text-muted)]">
                        About me
                        <textarea
                          name="bio"
                          rows={4}
                          value={formState.bio}
                          onChange={handleChange}
                          className="mt-2 w-full rounded-[var(--radius-lg)] border border-white/10 bg-[var(--color-bg)] px-4 py-3 text-sm text-[var(--color-text-primary)] outline-none transition focus:border-white/20 focus:ring-2 focus:ring-[var(--color-focus)]"
                        />
                      </label>

                      <div className="space-y-3">
                        <p className="text-sm font-medium text-[var(--color-text-muted)]">Profile image</p>
                        <div className="grid gap-4 sm:grid-cols-[120px_auto] items-center">
                          <img src={userImage} alt="Preview" className="h-28 w-28 rounded-3xl object-cover border border-white/10" />
                          <label className="grid gap-2 rounded-3xl border border-white/10 bg-[var(--color-bg)] p-4 text-sm text-[var(--color-text-muted)] transition hover:border-white/20 hover:bg-white/5 cursor-pointer">
                            <span>Select image</span>
                            <input type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
                          </label>
                        </div>
                      </div>

                      {status.error && <p className="text-sm text-red-400">{status.error}</p>}
                      {status.success && <p className="text-sm text-emerald-400">{status.success}</p>}

                      <button
                        type="submit"
                        disabled={isSaving}
                        className="inline-flex w-full items-center justify-center rounded-3xl bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-[var(--color-bg)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isSaving ? 'Saving...' : 'Save profile'}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

export default Dashboard
