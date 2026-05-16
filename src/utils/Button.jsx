import React, { memo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Button = memo(({
    text = 'Button',
    href = '#',
    onClick = () => { },
    variant = 'primary',
    size = 'md',
    className = '',
    isLink = false,
    disabled = false,
    ariaLabel = '',
    children = null,
}) => {
    // Size variants
    const sizeClasses = {
        sm: 'px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm',
        md: 'px-3 sm:px-4 py-2 sm:py-3 text-sm md:text-base',
        lg: 'px-4 sm:px-6 py-3 sm:py-4 text-base md:text-lg',
        xl: 'px-6 sm:px-8 py-4 sm:py-5 text-lg md:text-xl',
    }

    // Variant styles
    const variantClasses = {
        primary: 'bg-gradient-to-r from-[var(--color-primary)]/20 to-transparent text-[var(--color-primary)] group-hover:text-[var(--color-bg)] group-hover:bg-white/5',
        secondary: 'bg-gradient-to-r from-[var(--color-secondary)]/20 to-transparent text-[var(--color-secondary)] group-hover:text-white group-hover:bg-white/5',
        danger: 'bg-red-500/10 text-red-400 hover:bg-red-500/20',
        success: 'bg-green-500/10 text-green-400 hover:bg-green-500/20',
        outline: 'border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10',
    }

    // Background animation color
    const bgAnimationColor = {
        primary: 'bg-[var(--color-primary)]',
        secondary: 'bg-[var(--color-secondary)]',
        danger: 'bg-red-500',
        success: 'bg-green-500',
        outline: 'bg-[var(--color-primary)]/20',
    }

    const baseClasses = `
    group inline-flex items-center gap-2 shadow-md 
    font-semibold transition-all duration-300 relative overflow-hidden
    disabled:opacity-50 disabled:cursor-not-allowed
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `.trim()

    // Motion animation variants
    const motionVariants = {
        whileHover: { scale: disabled ? 1 : 1.02 },
        whileTap: { scale: disabled ? 1 : 0.95 },
    }

    // Render arrow icon
    const renderArrow = () => (
        <motion.span
            aria-hidden
            className="z-20 font-black text-[var(--color-primary)] group-hover:text-[var(--color-bg)] ml-2 transition-all duration-300 overflow-hidden -rotate-180 group-hover:rotate-0"
            animate={{ rotate: -90 }}
            // whileHover={{ rotate: 0 }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
            >
                <path
                    fillRule="evenodd"
                    d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"
                />
            </svg>
        </motion.span>
    )

    // Base button content
    const buttonContent = (
        <>
            {text && (
                <span className="relative z-10 transition-colors text-[var(--color-primary)] group-hover:text-[var(--color-bg)] duration-300 font-bold">
                    {text}
                </span>
            )}
            {children && <span className="relative z-10">{children}</span>}
            {!children && renderArrow()}
            <span className={`absolute inset-0 z-0 h-full w-0 ${bgAnimationColor[variant]} transition-all duration-400 ease-out group-hover:w-full`}></span>
        </>
    )

    // Render as NavLink (React Router)
    if (isLink && href.startsWith('/')) {
        return (
            <motion.div
                {...motionVariants}
            >
                <Link
                    to={href}
                    onClick={onClick}
                    disabled={disabled}
                    aria-label={ariaLabel || text}
                    className={baseClasses}
                >
                    {buttonContent}
                </Link>
            </motion.div>
        )
    }

    // Render as external link
    if (href && href !== '#') {
        return (
            <motion.a
                href={href}
                onClick={onClick}
                disabled={disabled}
                aria-label={ariaLabel || text}
                className={baseClasses}
                {...motionVariants}
            >
                {buttonContent}
            </motion.a>
        )
    }

    // Render as button element
    return (
        <motion.button
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel || text}
            className={baseClasses}
            {...motionVariants}
            type="button"
        >
            {buttonContent}
        </motion.button>
    )
})

Button.displayName = 'Button'

export default Button