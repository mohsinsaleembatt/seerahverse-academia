import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import PageTransition from './PageTransition.jsx'

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth()

  if (isLoading) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)] mx-auto mb-4"></div>
            <p className="text-[var(--color-muted)]">Loading...</p>
          </div>
        </div>
      </PageTransition>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (requireAdmin && !isAdmin) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">Access Denied</h1>
            <p className="text-[var(--color-muted)] mb-6">You don't have permission to access this page.</p>
            <a href="/" className="text-[var(--color-primary)] hover:underline">
              Go back to home
            </a>
          </div>
        </div>
      </PageTransition>
    )
  }

  return children
}

export default ProtectedRoute
