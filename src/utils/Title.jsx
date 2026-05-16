import React from 'react'

const Title = ({
    title,
    subtitle,
    text,
    align = 'left',
    size = 'xl',
    font = 'black',
    className = ''
}) => {

    const alignClasses = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
    }

    const fontSizes = {
        normal: 'font-normal',
        semibold: 'font-semibold',
        bold: 'font-bold',
        black: 'font-black',
    }

    return (
        <div className={`space-y-3 ${className}`}>
            {title && (
                <h2
                    className={`mt-30 -mb-30 uppercase ${alignClasses[align]} ${fontSizes[font]}`}>
                    {title}
                </h2>
            )}
            {subtitle && (
                <p className={`text-[1rem] pt-35 pb-10 text-[var(--color-bg)] leading-5 tracking-[0.09rem] ${alignClasses[align]}`}>
                    {subtitle}
                </p>
            )}
            {text && (
                <p className={`text-sm text-[var(--color-text-muted)] ${alignClasses[align]}`}>
                    {text}
                </p>
            )}
        </div>
    )
}

export default Title
