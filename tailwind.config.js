/** @type {import('tailwindcss').Config} */
module.exports = {
    important: true,
    content: ['./src/**/*.{js,ts,tsx,jsx}'],
    theme: {
        extend: {
            colors: {
                brown: '#906942',
                beige: '#EBDDCD',
                'dark-brown': '#9876547F',
                'darker-brown': '#9876547F',
                white: '#FFFFFF',
                green: '#4D8F39FF',
            },
            fontFamily: {
                playfair: ['Playfair Display', 'serif'],
            },
            maxHeight: {
                110: '24rem',
            },
        },
    },
    plugins: [],
};
