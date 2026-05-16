import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { getProfile } from "../api/auth";

const DashBoardGlobal = () => {

    const { user, logout, isAdmin } = useAuth()
    const navigate = useNavigate()
    const [sidebarOpen, setSidebarOpen] = useState(true)

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    const menuItems = [
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
    ]

    const testProfile = async () => {
        try {
            const { data } = await getProfile();
            console.log("PROFILE:", data);
        } catch (err) {
            console.error("ERROR:", err.response?.data);
        }
    };

    return (
        <div>

            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-20 h-[calc(100vh-80px)] bg-[var(--color-surface)] border-r border-white/10 overflow-y-auto transition-all duration-300 z-30 ${sidebarOpen ? 'w-64' : 'w-20'
                    }`}
            >
                <nav className="p-4 space-y-2">
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            to={item.href}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                        >
                            <span className="text-xl flex-shrink-0">{item.icon}</span>
                            {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
                        </Link>
                    ))}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 rounded-sm hover:bg-red-500/30 transition-colors text-red-400 hover:text-red-300"
                    >
                        <span className="text-xl flex-shrink-0">🚪</span>
                        {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
                    </button>

                    <button onClick={testProfile}
                        className="w-full flex items-center gap-3 px-4 py-2 rounded-sm hover:bg-red-500/30 transition-colors text-red-400 hover:text-red-300"
                    >
                        Test Profile
                    </button>
                </div>
            </aside>
        </div>
    )
}

export default DashBoardGlobal


