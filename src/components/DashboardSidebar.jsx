import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'


const DashboardSidebar = ({ isOpen, onClose, menuItems, user, onLogout }) => {
    return (
        <>
            <motion.aside
                className={`fixed inset-y-0 left-0 z-40 w-72 transform overflow-y-auto border-r border-white/10 bg-[var(--color-surface)] p-5 shadow-soft transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} xl:static xl:translate-x-0 xl:shadow-none`}
            >
                <div className="flex items-center justify-between gap-3 pb-5 xl:hidden">
                    <div>
                        <p className="text-lg font-semibold text-[var(--color-text-primary)]">Dashboard</p>
                        <p className="text-xs text-[var(--color-text-muted)]">Menu</p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-2xl border border-white/10 px-3 py-2 text-sm text-[var(--color-text-muted)] hover:bg-white/5"
                    >
                        Close
                    </button>
                </div>

                <div className="mb-8 flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 p-4">
                    <img
                        src={user?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.fullName || 'User')}&background=random`}
                        alt="Profile"
                        className="h-14 w-14 rounded-2xl object-cover"
                    />
                    <div>
                        <p className="text-sm font-semibold text-[var(--color-text-primary)]">{user?.fullName || 'User'}</p>
                        <p className="text-xs text-[var(--color-text-muted)]">{user?.email || 'no-email@example.com'}</p>
                    </div>
                </div>

                <nav className="space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            to={item.href}
                            onClick={onClose}
                            className="block rounded-3xl px-4 py-3 text-sm font-medium text-[var(--color-text-muted)] transition hover:bg-white/5 hover:text-[var(--color-text-primary)]"
                        >
                            <span className="mr-3 text-lg">{item.icon}</span>
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="mt-10 pt-5 border-t border-white/10">
                    <button
                        type="button"
                        onClick={onLogout}
                        className="w-full rounded-3xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-500/20"
                    >
                        Logout
                    </button>
                </div>
            </motion.aside>

            <div
                onClick={onClose}
                className={`fixed inset-0 z-30 bg-black/20 backdrop-blur-sm transition-opacity xl:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            />
        </>
    )
}

export default DashboardSidebar
