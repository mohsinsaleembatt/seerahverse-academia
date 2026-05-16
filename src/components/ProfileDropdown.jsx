import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

const ProfileDropdown = ({ user, onLogout }) => {
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false)
            }
        }

        if (open) {
            document.addEventListener('mousedown', handleClickOutside)
            return () => document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [open])

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[var(--color-surface)] px-3 py-2 text-left transition hover:border-white/20"
            >
                <img
                    src={user?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.fullName || 'User')}&background=random`}
                    alt="Profile"
                    className="h-10 w-10 rounded-full object-cover"
                />
                <div className="hidden sm:block">
                    <p className="text-sm font-semibold text-[var(--color-text-primary)]">{user?.fullName?.split(' ')[0] || 'User'}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{user?.role || 'user'}</p>
                </div>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 z-50 mt-2 w-56 rounded-3xl border border-white/10 bg-[var(--color-surface)] p-3 shadow-soft"
                    >
                        <Link
                            to="/profile"
                            onClick={() => setOpen(false)}
                            className="block rounded-2xl px-3 py-2 text-sm text-[var(--color-text-primary)] hover:bg-white/5"
                        >
                            View Profile
                        </Link>
                        <button
                            type="button"
                            onClick={() => {
                                onLogout()
                                setOpen(false)
                            }}
                            className="mt-2 w-full rounded-2xl px-3 py-2 text-sm text-[var(--color-danger)] hover:bg-red-500/10"
                        >
                            Logout
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default ProfileDropdown
