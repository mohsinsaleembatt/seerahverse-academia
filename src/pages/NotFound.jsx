import { Link } from 'react-router-dom'

const NotFound = ({ message = 'Page not found' }) => {
  return (
    <section className="page-shell flex min-h-[60vh] flex-col items-center justify-center text-center space-y-4">
      <p className="text-sm uppercase tracking-[0.12em] text-[var(--color-muted)]">404</p>
      <h1 className="text-3xl font-semibold">Oops, nothing lives here.</h1>
      <p className="text-[var(--color-muted)] max-w-md">{message}</p>
      <Link
        to="/"
        className="rounded-[var(--radius-pill)] bg-gradient-to-r from-[var(--color-primary)] to-orange-500 px-5 py-3 text-sm font-semibold shadow-soft"
      >
        Go home
      </Link>
    </section>
  )
}

export default NotFound

