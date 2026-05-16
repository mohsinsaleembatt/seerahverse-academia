import { useState, useRef, useEffect, memo } from 'react'

const OptimizedImage = memo(({
	src,
	alt,
	className = '',
	placeholder = 'blur',
	...props
}) => {
	const [isLoaded, setIsLoaded] = useState(false)
	const [isInView, setIsInView] = useState(false)
	const [hasError, setHasError] = useState(false)
	const imgRef = useRef(null)

	// Intersection Observer for lazy loading
	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsInView(true)
					observer.disconnect()
				}
			},
			{
				threshold: 0.1,
				rootMargin: '50px'
			}
		)

		if (imgRef.current) {
			observer.observe(imgRef.current)
		}

		return () => observer.disconnect()
	}, [])

	// Handle image load
	const handleLoad = () => {
		setIsLoaded(true)
	}

	// Handle image error
	const handleError = () => {
		setHasError(true)
		setIsLoaded(true)
	}

	// Generate placeholder
	const getPlaceholder = () => {
		if (hasError) {
			return (
				<div className={`flex items-center justify-center bg-gray-200 text-gray-500 ${className}`}>
					<svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
						<path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
					</svg>
				</div>
			)
		}

		return (
			<div className={`bg-gray-200 animate-pulse ${className}`}></div>
		)
	}

	return (
		<div ref={imgRef} className="relative overflow-hidden">
			{/* Placeholder */}
			{!isLoaded && getPlaceholder()}

			{/* Actual Image */}
			{isInView && (
				<img
					src={src}
					alt={alt}
					onLoad={handleLoad}
					onError={handleError}
					className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
					loading="lazy"
					decoding="async"
					{...props}
				/>
			)}
		</div>
	)
})

OptimizedImage.displayName = 'OptimizedImage'

export default OptimizedImage
