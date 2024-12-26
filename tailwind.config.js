/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Includes all files in the src directory and its subdirectories
    "./global.css",          // Include your global CSS explicitly
    "./App.jsx",                 // Explicitly include App.jsx if it's directly in src
    "./App.js",                 // Explicitly include App.jsx if it's directly in src
    "./src/App.jsx",                 // Explicitly include App.jsx if it's directly in src
    "./src/App.js",                 // Explicitly include App.jsx if it's directly in src
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};