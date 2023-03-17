/** @type {import('tailwindcss').Config} */
module.exports = {
    important: true,
    content: ['./src/**/*.{js,ts,tsx,jsx}'],
    theme: {
        colors: {
            brown: '#906942',
            beige: '#EBDDCD',
            'dark-brown': '#9876547F',
            white: '#FFFFFF',
        },
        fontFamily: {
            playfair: ['Playfair Display', 'serif'],
        },
        extend: {},
    },
    plugins: [],
};
