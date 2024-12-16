/** @type {import('tailwindcss').Config} */

import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    // colors: {
    //   'Primary': '#001337', // Primary Dark Blue
    //   'Secondary': '#ff7c5b', // Accent Color (Soft Red)
    // },
  },
  plugins: [daisyui],
};
