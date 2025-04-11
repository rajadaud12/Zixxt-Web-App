export const metadata = {
  title: "Design System",
  description: "A comprehensive design system with components",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-background min-h-screen">{children}</body>
    </html>
  )
}


import './globals.css'