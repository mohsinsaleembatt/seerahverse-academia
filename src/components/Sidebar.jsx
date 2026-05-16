import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useSidebar } from '../context/SidebarContext'

const Sidebar = () => {
  const { isOpen, setIsOpen } = useSidebar()
  const { isAuthenticated, user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const menuItems = [
    { label: 'Home', path: '/', icon: '🏠' },
    { label: 'Courses', path: '/courses', icon: '📚' },
    { label: 'Articles', path: '/articles', icon: '📰' },
    { label: 'Community', path: '/community', icon: '👥' },
    { label: 'Free Learning', path: '/free-learning', icon: '🎓' },
    { label: 'About', path: '/about', icon: 'ℹ️' },
    { label: 'Services', path: '/services', icon: '🛠️' },
    { label: 'Instructor', path: '/instructor', icon: '👨‍🏫' },
    { label: 'Homeschooling', path: '/homeschooling', icon: '🏠' },
    { label: 'Contact', path: '/contact', icon: '📧' },
  ]

  const authenticatedItems = [
    { label: 'Dashboard', path: '/dashboard', icon: '📊' },
    { label: 'My Profile', path: '/profile', icon: '👤' },
  ]

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    logout()
    setIsOpen(false)
    navigate('/')
  }

  return (
    <>
      <style>{`
        .sidebar-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .sidebar-scrollbar::-webkit-scrollbar-track {
          background: rgba(59, 130, 246, 0.05);
          border-radius: 10px;
        }
        .sidebar-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, rgba(59, 130, 246, 0.6), rgba(139, 92, 246, 0.6));
          border-radius: 10px;
          border: 2px solid transparent;
          background-clip: padding-box;
        }
        .sidebar-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, rgba(59, 130, 246, 0.8), rgba(139, 92, 246, 0.8));
          background-clip: padding-box;
        }
        .sidebar-scrollbar {
          scrollbar-color: rgba(59, 130, 246, 0.6) rgba(59, 130, 246, 0.05);
          scrollbar-width: thin;
        }
      `}</style>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-20 left-4 z-50 md:hidden p-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg transition-colors"
      >
        <svg className="w-6 h-6 text-[var(--color-text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Overlay Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-35 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed left-0 top-0 h-full w-80 bg-[var(--color-surface)] border-r border-white/10 z-40 md:hidden transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } overflow-y-auto sidebar-scrollbar flex flex-col`}
      >
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-xl font-bold">Menu</h2>
          <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="p-4 flex-1 space-y-2">
          <div>
            <h3 className="text-xs uppercase font-bold text-[var(--color-muted)] px-3 py-2 mb-2">Main</h3>
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-lg transition-colors ${isActive(item.path)
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'text-[var(--color-muted)] hover:bg-white/5'
                  }`}
              >
                <span className="mr-2">{item.icon}</span> {item.label}
              </Link>
            ))}
          </div>
        </nav>

        {isAuthenticated && (
          <div className="p-4 border-t border-white/10">
            <h3 className="text-xs uppercase font-bold text-[var(--color-muted)] px-3 py-2 mb-2">Account</h3>
            {authenticatedItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-lg transition-colors ${isActive(item.path)
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'text-[var(--color-muted)] hover:bg-white/5'
                  }`}
              >
                <span className="mr-2">{item.icon}</span> {item.label}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="w-full mt-2 px-3 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg"
            >
              🚪 Logout
            </button>
          </div>
        )}

        <div className="p-4 border-t border-white/10">
          <h3 className="text-xs uppercase font-bold text-[var(--color-muted)] px-3 py-2 mb-2">Resources</h3>
          <Link to="/privacy" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-[var(--color-muted)] hover:bg-white/5 rounded">
            Privacy Policy
          </Link>
          <Link to="/terms" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-[var(--color-muted)] hover:bg-white/5 rounded">
            Terms & Conditions
          </Link>
        </div>

        {!isAuthenticated && (
          <div className="p-4 border-t border-white/10 space-y-2">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block w-full px-3 py-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-center"
            >
              🔐 Login
            </Link>
            <Link
              to="/register"
              onClick={() => setIsOpen(false)}
              className="block w-full px-3 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border border-blue-500/30 rounded-lg text-center"
            >
              ✨ Register
            </Link>
          </div>
        )}
      </div>

      {/* Desktop Sidebar */}
      <div className={`hidden md:flex md:flex-col h-screen bg-[var(--color-surface)] border-r border-white/10 sticky top-0 transition-all duration-300 ${isOpen ? 'md:w-64' : 'md:w-20'
        }`}>
        <div className="p-4 border-b border-white/10 flex items-center justify-between gap-3">
          {isOpen && <h2 className="text-xl font-bold whitespace-nowrap">Menu</h2>}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="ml-auto group p-3 bg-gradient-to-r from-[var(--color-primary)]/20 to-transparent rounded-sm hover:rounded-none transition-all duration-200 flex-shrink-0 w-10 h-10 flex items-center justify-center shadow-sm shadow-white/40 hover:shadow-slate-200/50 rotate-180 hover:rotate-0 cursor-pointer"
            title={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            aria-label="Toggle sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              )}
            </svg>
            <span class="absolute inset-0 z-0 h-full w-0 bg-[var(--color-primary)]/30 transition-all duration-400 ease-out group-hover:w-full"></span>
          </button>
        </div>

        <nav className={`p-4 flex-1 space-y-2 overflow-y-auto sidebar-scrollbar ${!isOpen && 'hidden'
          }`}>
          <div>
            <h3 className="text-xs uppercase font-bold text-[var(--color-muted)] px-3 py-2 mb-2">Main</h3>
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-lg transition-colors ${isActive(item.path)
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'text-[var(--color-muted)] hover:bg-white/5'
                  }`}
              >
                <span className="mr-2">{item.icon}</span> {item.label}
              </Link>
            ))}
          </div>
        </nav>

        {isAuthenticated && (
          <div className={`p-4 border-t border-white/10 ${!isOpen && 'hidden'}`}>
            <h3 className="text-xs uppercase font-bold text-[var(--color-muted)] px-3 py-2 mb-2">Account</h3>
            {authenticatedItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-lg transition-colors ${isActive(item.path)
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'text-[var(--color-muted)] hover:bg-white/5'
                  }`}
              >
                <span className="mr-2">{item.icon}</span> {item.label}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="w-full mt-2 px-3 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg"
            >
              🚪 Logout
            </button>
          </div>
        )}

        <div className={`p-4 border-t border-white/10 overflow-y-auto sidebar-scrollbar ${!isOpen && 'hidden'
          }`}>
          <h3 className="text-xs uppercase font-bold text-[var(--color-muted)] px-3 py-2 mb-2">Resources</h3>
          <Link to="/privacy" className="block px-3 py-2 text-[var(--color-muted)] hover:bg-white/5 rounded">
            Privacy Policy
          </Link>
          <Link to="/terms" className="block px-3 py-2 text-[var(--color-muted)] hover:bg-white/5 rounded">
            Terms & Conditions
          </Link>
        </div>

        {!isAuthenticated && (
          <div className={`p-4 border-t border-white/10 space-y-2 overflow-y-auto sidebar-scrollbar ${!isOpen && 'hidden'
            }`}>
            <Link
              to="/login"
              className="block w-full px-3 py-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-center"
            >
              🔐 Login
            </Link>
            <Link
              to="/register"
              className="block w-full px-3 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border border-blue-500/30 rounded-lg text-center"
            >
              ✨ Register
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

export default Sidebar
