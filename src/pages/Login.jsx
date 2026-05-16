import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import PageTransition from '../components/PageTransition.jsx'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Valid email is required'
    if (!formData.password) newErrors.password = 'Password is required'
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      // ✅ IMPORTANT FIX
      await login(formData.email, formData.password);

      navigate("/dashboard");
    } catch (error) {
      setErrors({ submit: error.message || "Login failed" });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <PageTransition>
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center pt-20 pb-10 px-4">
        <div className="w-full max-w-md">
          <div className="glass-card rounded-2xl p-6 sm:p-8 shadow-soft">
            <h1 className="text-3xl font-bold mb-2 text-[var(--color-text-primary)]">Welcome Back</h1>
            <p className="text-[var(--color-muted)] mb-6">Sign in to your SeerahVerse Academia account</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                  placeholder="you@example.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                  placeholder="••••••••"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="rounded border-white/10 bg-white/5"
                  />
                  <span className="text-sm text-[var(--color-muted)]">Remember me</span>
                </label>
                <Link to="#" className="text-sm text-[var(--color-primary)] hover:underline">
                  Forgot password?
                </Link>
              </div>

              {errors.submit && <p className="text-red-500 text-sm">{errors.submit}</p>}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[var(--color-primary)] to-orange-500 text-white font-semibold py-2 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <p className="text-center text-[var(--color-muted)] mt-6">
              Don't have an account?{' '}
              <Link to="/register" className="text-[var(--color-primary)] hover:underline font-semibold">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

export default Login
