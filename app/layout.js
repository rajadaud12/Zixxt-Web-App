import { AuthProvider } from "@/context/authContext";
import { WishlistProvider } from "../context/wishListContext";
import { IsSellerProvider } from "@/context/isSellerContext";
import { ToastProvider } from '@/context/toastContext';

import "@/app/globals.css";

export const metadata = {
  title: "Design System",
  description: "A comprehensive design system with components",
  generator: "v0.dev",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-background min-h-screen">
        <AuthProvider>
          <WishlistProvider>
            <ToastProvider> 

            <IsSellerProvider>{children}</IsSellerProvider> {/* Add IsSellerProvider */}
            </ToastProvider>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}