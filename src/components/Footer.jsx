import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/images/logoFooter.webp'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setSubscribed(true)
      // In production: send to backend
      localStorage.setItem('newsletter_' + email, new Date().toISOString())
      setTimeout(() => {
        setEmail('')
        setSubscribed(false)
      }, 3000)
    }
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[var(--color-surface)] border-t border-white/5 mt-16">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section with Newsletter */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="SeerahVerse Logo" className="h-10 w-auto" />
              <div>
                <p className="font-bold text-[var(--color-text-primary)]">SeerahVerse</p>
                <p className="text-xs text-[var(--color-text-muted)]">Academia</p>
              </div>
            </div>
            <p className="text-sm text-[var(--color-text-muted)] mb-6">
              Integrating science with timeless wisdom.
            </p>

            {/* Newsletter Subscription */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-primary)] mb-3">
                Join Our Newsletter
              </p>
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-xs text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[var(--color-primary)] to-orange-500 text-white text-xs font-semibold py-2 rounded hover:shadow-lg transition-all\"
                >
                  {subscribed ? '✓ Subscribed' : 'Subscribe'}
                </button>
              </form>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-[var(--color-text-primary)] mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/articles" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
                  Articles
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Services & Info */}
          <div>
            <h4 className="font-bold text-[var(--color-text-primary)] mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/instructor" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
                  Become an Instructor
                </Link>
              </li>
              <li>
                <Link to="/homeschooling" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
                  Homeschooling
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h4 className="font-bold text-[var(--color-text-primary)] mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="mailto:info@seerahverse.com" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
                  Email: info@seerahverse.com
                </a>
              </li>
              <li>
                <a href="tel:+1234567890" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
                  Phone: +91 7006021145
                </a>
              </li>
              <li className="text-sm text-[var(--color-text-muted)]">
                Srinagar, Jammu & Kashmir, India
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <p className="text-xs text-[var(--color-text-muted)]">
              © {currentYear} SeerahVerse Academia. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 sm:justify-end">
              <a href="/privacy" className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
                Terms & Conditions
              </a>
              <a href="/cookies" className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 text-[var(--color-text-muted)]">
            <a href="#" title="Facebook" className="hover:text-[var(--color-primary)] transition-colors text-sm">
              f
            </a>
            <a href="#" title="Twitter" className="hover:text-[var(--color-primary)] transition-colors text-sm">
              𝕏
            </a>
            <a href="#" title="LinkedIn" className="hover:text-[var(--color-primary)] transition-colors text-sm">
              in
            </a>
            <a href="#" title="YouTube" className="hover:text-[var(--color-primary)] transition-colors text-sm">
              ▶
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

