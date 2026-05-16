import { useMemo, useState, useEffect, useRef, memo, useCallback, Suspense } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext.jsx'
import { useSidebar } from '../context/SidebarContext.jsx'
import { navLinks } from '../assets/data/navigation.js'
import logo from '../assets/images/logo.webp'


const NavItem = memo(({ to, label, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      [
        'px-3 py-2 uppercase rounded-xs hover:rounded-none text-xs font-medium transition-colors whitespace-nowrap',
        isActive ? 'text-white bg-white/5' : 'text-[var(--color-primary)] hover:text-[var(--color-muted)] ',
      ].join(' ')
    }
  >
    {label}
  </NavLink>
))

const ExpandableMenuItem = memo(({ link, onClick }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="space-y-1 border-b border-white/10 pb-2">
      {link.children ? (
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xs text-sm font-medium text-[var(--color-muted)] hover:text-white hover:bg-white/30 transition-colors"
        >
          <span className="truncate">{link.label}</span>
          <motion.svg
            animate={{ rotate: expanded ? 180 : 0 }}
            className="w-4 h-4 flex-shrink-0 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </motion.svg>
        </button>
      ) : (
        <NavLink
          to={link.to}
          onClick={onClick}
          className={({ isActive }) =>
            [
              'block px-3 py-2 rounded-xs text-sm font-medium transition-colors truncate',
              isActive ? 'text-white bg-white/10' : 'text-[var(--color-muted)] hover:text-white hover:bg-white/30',
            ].join(' ')
          }
        >
          {link.label}
        </NavLink>
      )}

      {/* Dropdown Menu */}
      <AnimatePresence>
        {expanded && link.children && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="pl-3 space-y-1 overflow-hidden bg-red-500/5"
          >
            {link.children.map((child) => (
              <NavLink
                key={child.to}
                to={child.to}
                onClick={onClick}
                className={({ isActive }) =>
                  [
                    'block px-3 py-2 rounded-xs text-xs font-medium transition-colors truncate',
                    isActive ? 'text-white bg-white/10' : 'text-[var(--color-muted)]/70 hover:text-white hover:bg-white/5',
                  ].join(' ')
                }
              >
                → {child.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

ExpandableMenuItem.displayName = 'ExpandableMenuItem'

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  const { isOpen: sidebarOpen } = useSidebar()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const userMenuRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const toggleButtonRef = useRef(null)
  const navItems = useMemo(() => navLinks, [])

  const handleLogout = useCallback(() => {
    logout()
    setOpen(false)
    setShowUserMenu(false)
  }, [logout])

  const toggleMobileMenu = useCallback(() => {
    setOpen(prev => !prev)
  }, [open])

  const toggleUserMenu = useCallback(() => {
    setShowUserMenu(prev => !prev)
  }, [])

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false)
      }
    }

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showUserMenu])

  // Close mobile menu when clicking outside (but not on toggle button)
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is on toggle button - if so, don't close
      if (toggleButtonRef.current && toggleButtonRef.current.contains(event.target)) {
        return
      }

      // Close if clicking outside menu
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && open) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  // Close mobile menu on window resize to xl breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-[var(--color-bg)] border-b border-white/5 transition-all duration-300">
      <div className="w-full px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8">
        <div className="py-3 sm:py-3.5 md:py-4 flex items-center justify-between gap-2 sm:gap-3 md:gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1 sm:gap-2 flex-shrink-0 min-w-0">
            <div className="tracking-widest shadow-xs hover:shadow-none opacity-70 hover:opacity-100 transition-all duration-300 p-0.5 sm:p-1 text-center shadow-white/30">
              <p className="font-black text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl leading-10 lg:tracking-[0.3rem] sm:tracking-[0.05rem] md:tracking-[0.1rem] text-[var(--color-primary)] bg-[var(--color-reader)] px-1 sm:px-1.5 uppercase">
                SeerahVerse
              </p>
              <p className="text-[8px] sm:text-[10px] md:text-xs lg:text-sm -mt-0.5 sm:-mt-1 font-black uppercase text-[var(--color-bg)] bg-[var(--color-primary)] tracking-[0.2rem] sm:tracking-[0.3rem] md:tracking-[0.6rem] px-1 sm:px-1.5">
                Academia
              </p>
            </div>
          </Link>

          {/* Desktop Navigation - Hidden on tablet and below */}
          <nav className="hidden xl:flex items-center gap-2 2xl:gap-4 flex-1 justify-center px-4">
            {navItems.map((link) => (
              <div key={link.label} className="relative group">
                <NavItem to={link.to} label={link.label} />
                {link.children && (
                  <div className="absolute left-0 mt-2 hidden min-w-[220px] flex-col gap-1 rounded-lg bg-[var(--color-surface)] p-2 shadow-soft group-hover:flex z-50">
                    {link.children.map((child) => (
                      <NavItem key={child.to} to={child.to} label={child.label} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 ml-auto">
            {isAuthenticated ? (
              <div className="relative hidden sm:block" ref={userMenuRef}>
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="User menu"
                >
                  <img
                    src={user?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.fullName || 'User')}&background=random`}
                    alt="Profile"
                    className="w-6 sm:w-8 h-6 sm:h-8 rounded-full object-cover border border-white/10 flex-shrink-0"
                  />
                  <span className="text-xs sm:text-sm font-medium text-[var(--color-text-primary)] hidden md:block truncate">
                    {user?.fullName?.split(' ')[0]}
                  </span>
                </button>

                {/* User Menu Dropdown */}
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-40 sm:w-48 bg-[var(--color-surface)] rounded-lg shadow-soft border border-white/10 overflow-hidden z-50"
                    >
                      <Link
                        to="/dashboard"
                        className="block px-3 sm:px-4 py-2 text-xs sm:text-sm text-[var(--color-muted)] hover:bg-white/5 transition-colors border-b border-white/5"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/profile"
                        className="block px-3 sm:px-4 py-2 text-xs sm:text-sm text-[var(--color-muted)] hover:bg-white/5 transition-colors border-b border-white/5"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Profile
                      </Link>
                      {user?.role === 'admin' && (
                        <Link
                          to="/admin/courses"
                          className="block px-3 sm:px-4 py-2 text-xs sm:text-sm text-[var(--color-muted)] hover:bg-white/5 transition-colors border-b border-white/5"
                          onClick={() => setShowUserMenu(false)}
                        >
                          👑 Manage Courses
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 sm:px-4 py-2 text-xs sm:text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-1 sm:gap-2">
                <Link
                  to="/login"
                  className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-sm text-xs sm:text-sm font-medium text-[var(--color-muted)] hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-sm hover:rounded-none text-xs sm:text-sm font-medium bg-gradient-to-r from-[var(--color-primary)]/40 to-transparent text-[var(--color-primary)] hover:shadow-lg transition-all duration-300"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Toggle Button - Hamburger/Close Icon with HIGH Z-INDEX */}
            <motion.button
              ref={toggleButtonRef}
              onClick={toggleMobileMenu}
              className="xl:hidden inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white/10 flex-shrink-0 relative z-50 mr-2"
              aria-label={open ? "Close navigation" : "Toggle navigation"}
              aria-expanded={open}
              animate={{ rotate: open ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {open ? (
                // Close Icon (X)
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger Icon (three lines)
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Responsive width and height */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full w-64 sm:w-72 md:w-80 bg-[var(--color-bg)] border-l border-white/10 overflow-y-auto xl:hidden z-40 shadow-lg hide-scrollbar"
          >
            <div className="px-2 sm:px-3 py-3 sm:py-4 space-y-2 pt-20 sm:pt-24 md:pt-28">
              {/* Main Navigation */}
              {navItems.map((link) => (
                <ExpandableMenuItem
                  key={link.label}
                  link={link}
                  onClick={() => !link.children && setOpen(false)}
                />
              ))}

              {/* Auth Section */}
              <div className="border-t border-white/10 pt-3 sm:pt-4 mt-3 sm:mt-4 space-y-2">
                {isAuthenticated ? (
                  <>
                    <NavLink
                      to="/dashboard"
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        [
                          'block px-3 py-2 rounded-md text-sm font-medium transition-colors truncate',
                          isActive ? 'text-white bg-white/10' : 'text-[var(--color-muted)] hover:text-white hover:bg-white/10',
                        ].join(' ')
                      }
                    >
                      👤 Dashboard
                    </NavLink>
                    <NavLink
                      to="/profile"
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        [
                          'block px-3 py-2 rounded-md text-sm font-medium transition-colors truncate',
                          isActive ? 'text-white bg-white/10' : 'text-[var(--color-muted)] hover:text-white hover:bg-white/10',
                        ].join(' ')
                      }
                    >
                      👤 Profile
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="w-full px-3 py-2 rounded-lg text-sm font-medium bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors text-left"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/login"
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        [
                          'block px-3 py-2 rounded-md text-sm font-medium transition-colors truncate',
                          isActive ? 'text-white bg-white/10' : 'text-[var(--color-muted)] hover:text-white hover:bg-white/10',
                        ].join(' ')
                      }
                    >
                      Sign In
                    </NavLink>
                    <Link
                      to="/register"
                      onClick={() => setOpen(false)}
                      className="block w-full px-3 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-[var(--color-primary)] to-orange-500 text-white hover:shadow-lg transition-all text-center"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

NavItem.displayName = 'NavItem'

export default memo(Navbar)
