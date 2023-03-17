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
            green: '#4D8F39FF',
        },
        fontFamily: {
            playfair: ['Playfair Display', 'serif'],
        },
        maxHeight: {
            110: '24rem',
        },
        extend: {},
    },
    plugins: [],
};
