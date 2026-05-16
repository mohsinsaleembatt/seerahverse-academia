/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            // Add other theme extensions here if needed
        },
    },
    plugins: [
        // Scrollbar hiding plugin
        function ({ addUtilities }) {
            addUtilities({
                '.scrollbar-hide': {
                    '-ms-overflow-style': 'none',
                    'scrollbar-width': 'none',
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                },
                '.scrollbar-default': {
                    '-ms-overflow-style': 'auto',
                    'scrollbar-width': 'auto',
                },
            });
        },
    ],
}