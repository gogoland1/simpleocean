import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        ocean: {
          light: '#8ecae6',
          DEFAULT: '#219ebc',
          dark: '#023047',
        },
        coral: {
          light: '#ffb4a2',
          DEFAULT: '#e07a5f',
          dark: '#ae2012',
        },
        sand: {
          light: '#f8edeb',
          DEFAULT: '#f9dcc4',
          dark: '#e6ccb2',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;