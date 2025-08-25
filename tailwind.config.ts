// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class", // 👈 enables dark mode via `class="dark"`
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
