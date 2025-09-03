/** @type {import('tailwindcss').Config} */
import { heroui } from '@heroui/react'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1600px',
      '4xl': '1920px',
      '5xl': '2560px',
    },
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      fontFamily: {
        'pacifico': ['Pacifico', 'cursive'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      colors: {
        'theme': 'var(--theme)',
        'dark-theme': 'var(--dark-theme)',
        'dark-theme-3': 'var(--dark-theme-3)',
        'dark-theme-2': 'var(--dark-theme-2)',
        'bg-anim-from': 'var(--bg-anim-from)',
        'bg-anim-to': 'var(--bg-anim-to)',
        'theme-bg': 'var(--theme-bg)',
        'theme-bg-2': 'var(--theme-bg-2)',
        'bg-light': 'var(--bg-light)',
        'bg-light-2': 'var(--bg-light-2)',
        'bg-light-3': 'var(--bg-light-3)',
        'theme-bg-opacity': 'var(--theme-bg-opacity)',
        'theme-bg-opacity-2': 'var(--theme-bg-opacity-2)',
        'theme-color': 'var(--theme-color)',
        'main-color': 'var(--main-color)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      fontFamily: {
        'pacifico': ['Pacifico', 'cursive'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      transform: {
        '[-10deg]': 'skew(-10deg)',
      },
    },
  },
  plugins: [
    heroui({
      defaultTheme: 'quasar',
      themes: {
        "quasar": {
          extend: "dark",
          colors: {
            background: "#0D001A",
            foreground: "#94a3b8", // it seems it using for placeholder and like that
            primary: {
              // it brokes the notification color
              // 50: "rgb(71 85 105 / 0.4)",
              // 100: "#520F83",
              // 200: "#7318A2",
              // 300: "#9823C2",
              // 400: "#c031e2",
              // 500: "#DD62ED",
              600: "rgba(0, 163, 255, 0.9)",
              700: "#FCADF9",
              800: "#FDD5F9",
              900: "#FEECFE",
              DEFAULT: "rgba(0, 163, 255, 0.9)",
              foreground: "#ffffff",
            },
            content1: 'rgb(71 85 105 / 0.8)',
            default: {
              50: "rgb(71 85 105 / 0.3)",
              100: "rgb(71 85 105 / 0.4)",
              200: "rgb(71 85 105 / 0.5)",
              300: "rgb(71 85 105 / 0.6)",
              400: "rgb(71 85 105 / 0.7)",
              500: "rgb(71 85 105 / 0.8)",
              600: "#fff", // generally uses for text color
              700: "#fff",
              800: "rgb(71 85 105 / 1)",
              900: "rgb(71 85 105 / 1)",
              DEFAULT: "rgb(71 85 105 / 0.8)",
              foreground: "#ffffff",
            },
            focus: "rgba(0, 163, 255, 0.9)",
          },
          layout: {
            disabledOpacity: "0.3",
            radius: {
              small: "4px",
              medium: "6px",
              large: "8px",
            },
            borderWidth: {
              small: "1px",
              medium: "2px",
              large: "4px",
            },
          },
        },

      }
    })
  ],
  darkMode: "class",
}