/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      animation: {
        'toast-in': 'toast-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'toast-out': 'toast-out 0.5s cubic-bezier(0.6, -0.28, 0.735, 0.045) forwards',
        'scale-in': 'scale-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
      },
      keyframes: {
        'toast-in': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '60%': { transform: 'translateX(-5%)' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        'toast-out': {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(120%)', opacity: '0' }
        },
        'scale-in': {
          '0%': { transform: 'scale(0)' },
          '70%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' }
        }
      },
      transitionTimingFunction: {
        'bounce': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
         border: "#E6ECEF",
         black: "#181818",
         primary: "#018CFF",
         secondary: "#ECF6FE",
         text: "#3F3F3F",
         textLight: "#767B7F",
         success: "#03AA64",
         failure: "#FF6A6D",
         btnbg: "#F4F4F4",
         white: "#FFFFFF",
         whiteGrey: '#F5F7F9',
         inputBorder: '#CCCCCC',
         software: '#FFB400',
         course: '#03AA64',
         levelGold:'#7E5600',
         background:'F5F5F6'
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Albert Sans", "sans-serif"],
      },
      fontSize: {
        paragraphText: '15px',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
