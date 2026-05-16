import { Component } from 'react'
import { motion } from 'framer-motion'

class ErrorBoundary extends Component {
	constructor(props) {
		super(props)
		this.state = { hasError: false, error: null, errorInfo: null }
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI
		return { hasError: true }
	}

	componentDidCatch(error, errorInfo) {
		// Log error to console in development
		console.error('Error Boundary caught an error:', error, errorInfo)

		// Store error details for debugging
		this.setState({
			error: error,
			errorInfo: errorInfo
		})

		// In production, you would send this to an error reporting service
		// logErrorToService(error, errorInfo)
	}

	render() {
		if (this.state.hasError) {
			return (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] text-[var(--color-text-primary)]"
				>
					<div className="text-center space-y-6 p-8 max-w-md">
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ delay: 0.2, type: "spring" }}
							className="text-6xl"
						>
							😔
						</motion.div>

						<div className="space-y-4">
							<h1 className="text-2xl font-bold text-[var(--color-primary)]">
								Oops! Something went wrong
							</h1>

							<p className="text-[var(--color-text-muted)]">
								We apologize for the inconvenience. The application encountered an unexpected error.
							</p>

							<div className="space-y-3">
								<button
									onClick={() => window.location.reload()}
									className="px-6 py-3 bg-[var(--color-primary)] text-[var(--color-bg)] rounded-lg font-medium hover:bg-[var(--color-primary)] transition-colors"
								>
									Refresh Page
								</button>

								<button
									onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
									className="block mx-auto px-6 py-3 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
								>
									Try Again
								</button>
							</div>
						</div>

						{/* Error details for development */}
						{process.env.NODE_ENV === 'development' && this.state.error && (
							<motion.details
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className="text-left mt-8 p-4 bg-[var(--color-surface)] rounded-lg border border-white/10"
							>
								<summary className="cursor-pointer text-sm font-mono text-[var(--color-primary)]">
									Error Details (Development Only)
								</summary>
								<pre className="mt-2 text-xs text-[var(--color-text-muted)] overflow-auto max-h-40">
									{this.state.error && this.state.error.toString()}
									<br />
									{this.state.errorInfo.componentStack}
								</pre>
							</motion.details>
						)}
					</div>
				</motion.div>
			)
		}

		return this.props.children
	}
}

export default ErrorBoundary
