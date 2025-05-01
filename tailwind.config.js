/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
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
