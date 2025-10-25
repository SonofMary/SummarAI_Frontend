/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",   // React files
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}", // Flowbite React
    "node_modules/flowbite/**/*.js", // Flowbite Core
  ],
  theme: {
    extend: {
       fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [
    require("flowbite/plugin"),
     require('@tailwindcss/typography'),
  ],
}
