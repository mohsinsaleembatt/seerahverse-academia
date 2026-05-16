import { motion } from 'framer-motion'
import ProfileDropdown from './ProfileDropdown.jsx'

const DashboardNavbar = ({ user, onToggleSidebar, onLogout }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="glass-card rounded-[var(--radius-lg)] border border-white/10 p-4 shadow-soft"
        >
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-primary)]">Dashboard</p>
                            <h1 className="text-2xl sm:text-3xl font-semibold text-[var(--color-text-primary)]">Welcome back, {user?.fullName?.split(' ')[0] || 'Learner'}!</h1>
                        </div>
                        <button
                            type="button"
                            onClick={onToggleSidebar}
                            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-[var(--color-text-primary)] transition hover:bg-white/10 xl:hidden"
                        >
                            <span>Menu</span>
                            <span aria-hidden>☰</span>
                        </button>
                    </div>
                    <p className="max-w-2xl text-sm text-[var(--color-text-muted)]">
                        Manage your learning experience, track course progress, and update your profile in one clean workspace.
                    </p>
                </div>

                <div className="flex items-center justify-between gap-3">
                    <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-[var(--color-text-muted)] shadow-soft">
                        <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted-secondary)]">Role</p>
                        <p className="mt-1 text-sm font-semibold text-[var(--color-text-primary)]">{user?.role || 'user'}</p>
                    </div>
                    <ProfileDropdown user={user} onLogout={onLogout} />
                </div>
            </div>
        </motion.div>
    )
}

export default DashboardNavbar
