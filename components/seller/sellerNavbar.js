"use client"

import Link from "next/link"
import Image from "next/image"
import { useContext, useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { AuthContext } from "@/context/authContext"
import { Bell, MessageCircle, User } from "lucide-react"

export default function SellerNavbar() {
  const { user } = useContext(AuthContext)
  const pathname = usePathname()
  const [showProfileOverlay, setShowProfileOverlay] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const profileRef = useRef(null)

  // Navigation items for seller dashboard
  const navItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Orders", href: "/orders" },
    { name: "Postings", href: "/postings" },
    { name: "Trade Lead", href: "/trade-lead" },
    { name: "Earnings", href: "/earnings" },
    { name: "Advert", href: "/advert" },
  ]

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const toggleProfileOverlay = () => {
    setShowProfileOverlay((prev) => !prev)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileOverlay(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const ProfileOverlay = ({ isOpen, onClose }) =>
    isOpen && (
      <div
        className="absolute right-0 mt-2 w-72 bg-white rounded-[20px] shadow-lg z-50 border border-gray-200 overflow-hidden"
        ref={profileRef}
      >
        <div className="p-4 pb-2">
          <div className="flex items-center space-x-3">
            <Image
              src={user?.profilePicture || "/images/profile-placeholder.png"}
              alt="Profile"
              width={48}
              height={48}
              className="rounded-full"
            />
            <div>
              <p className="text-sm font-semibold text-gray-800">{user?.name || "User Name"}</p>
              <p className="text-xs text-gray-500">{user?.location || "Location"}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200">
          <ul className="py-2">
            <li>
              <Link
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={onClose}
              >
                My profile
              </Link>
            </li>
            <li>
              <Link
                href="/settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={onClose}
              >
                Settings
              </Link>
            </li>
            <li>
              <Link
                href="/level-overview"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={onClose}
              >
                Level Overview
              </Link>
            </li>
            <li>
              <Link
                href="/boost-posting"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={onClose}
              >
                Boost your Posting
              </Link>
            </li>
            <li>
              <Link
                href="/logout"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={onClose}
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>

        <Link
          href="/home"
          className="block w-full text-center py-3 text-sm text-white bg-blue-500 rounded-b-[20px]"
          onClick={onClose}
        >
          Switch to Buying
        </Link>
      </div>
    )

  return (
    <header className="sticky top-0 z-[120] bg-white border-b border-border shadow-sm">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/dashboard" className="flex items-center">
              <Image src="/images/logo.png" alt="ZIXI Logo" width={90} height={30} />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-2 py-2 text-sm font-medium transition-colors ${
                  pathname === item.href ? "text-primary" : "text-text hover:text-primary"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/upgradeAccount"
              className="px-4 py-1.5 text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary via-software to-course hover:opacity-80 transition-all"
            >
              UPGRADE ACCOUNT
            </Link>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-6">
            {/* Message icon */}
            <Link href="/messages" className="text-textLight hover:text-primary relative">
              <MessageCircle className="h-5 w-5 stroke-[1.5] transition-colors" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
            </Link>

            {/* Notification icon */}
            <Link href="/notifications" className="text-textLight hover:text-primary relative">
              <Bell className="h-5 w-5 stroke-[1.5] transition-colors" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
            </Link>

            {/* Profile picture with overlay */}
            <div className="relative" ref={profileRef}>
              <button onClick={toggleProfileOverlay} className="relative">
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white ring-1 ring-border">
                  {user?.profilePicture ? (
                    <Image
                      src={user.profilePicture || "/placeholder.svg"}
                      alt="Profile"
                      width={32}
                      height={32}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <Image
                      src="/placeholder.svg?height=32&width=32"
                      alt="Profile"
                      width={32}
                      height={32}
                      className="object-cover w-full h-full bg-gray-200"
                    />
                  )}
                </div>
              </button>
              <ProfileOverlay
                isOpen={showProfileOverlay}
                onClose={() => setShowProfileOverlay(false)}
              />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-text hover:text-primary focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden py-4 bg-white border-t border-border">
          <div className="max-w-[1200px] mx-auto px-4">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 font-medium ${
                    pathname === item.href ? "text-primary" : "text-text hover:text-primary"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/upgrade"
                className="px-4 py-2 bg-clip-text text-transparent bg-gradient-to-r from-primary via-software to-course hover:opacity-80 transition-all text-center mt-2"
              >
                UPGRADE ACCOUNT
              </Link>
              <div className="flex space-x-6 px-3 py-2">
                <Link href="/messages" className="text-textLight hover:text-primary relative">
                  <MessageCircle className="h-5 w-5 stroke-[1.5] transition-colors" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
                </Link>
                <Link href="/notifications" className="text-textLight hover:text-primary relative">
                  <Bell className="h-5 w-5 stroke-[1.5] transition-colors" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
                </Link>
                <Link href="/profile" className="text-textLight hover:text-primary">
                  <User className="h-6 w-6 stroke-[1.5] transition-colors" />
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}