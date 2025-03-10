import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    mode: 'jit',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                poppins: ["Poppins", "sans-serif"],
                nunito: ["Nunito", "sans-serif"],
            },
            colors: {
                primary: "#fff9f9",
                headersiswa: "#8AACA2",
            },
        },
        screens: { 'mobile': '320px', 'sm': '400px', 'md': '1199px', 'lg': '1200px', 'xl': '1280px', },
    },

    plugins: [forms, require('daisyui')],
};
