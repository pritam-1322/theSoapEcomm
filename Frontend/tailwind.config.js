/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily:{
        robo:['Roboto Mono']
      },
      animation: {
        scrollUp: 'scrollUp 3s ease-in-out forwards', // Define animation duration
      },
      keyframes: {
        scrollUp: {
          '0%': {
            transform: 'translateY(100%)', // Start below the container
          },
          '50%': {
            transform: 'translateY(0%)', // Middle position (visible)
          },
          '100%': {
            transform: 'translateY(-100%)', // End above the container
          },
        },
      }






      
    },
  },
  plugins: [],
}

