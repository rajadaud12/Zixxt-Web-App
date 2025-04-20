"use client"

import Link from "next/link"
import Image from "next/image"
import { useContext, useState } from "react"
import { AuthContext } from "@/context/authContext"
import { Search, Bell, ChevronDown, Menu, X } from "lucide-react"

export default function Navbar() {
  const { isLoggedIn, user } = useContext(AuthContext)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E6ECEF] shadow-sm">
      <div className="container mx-auto px-4">
        {/* Main Navigation Bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image src="/images/logo.png" alt="ZIXXT Logo" width={90} height={30} />
            </Link>
          </div>

          {/* Desktop Navigation - Before Login */}
          {!isLoggedIn && (
            <>
              <nav className="hidden md:flex items-center justify-center flex-1 space-x-4">
                <Link href="/" className="nav-link px-4 py-2 text-gray-700 hover:text-[#018cff] font-medium">
                  Home
                </Link>
                <Link href="/services" className="nav-link px-4 py-2 text-gray-700 hover:text-[#018cff] font-medium">
                  Services
                </Link>
                <Link href="/about" className="nav-link px-4 py-2 text-gray-700 hover:text-[#018cff] font-medium">
                  About
                </Link>
                <Link href="/help" className="nav-link px-4 py-2 text-gray-700 hover:text-[#018cff] font-medium">
                  Help
                </Link>
              </nav>

              <div className="hidden md:flex items-center space-x-3">
                <Link 
                  href="/signin" 
                  className="px-5 py-2 text-gray-700 hover:text-[#018cff] font-medium border border-transparent hover:border-[#E6ECEF] rounded-full transition-all"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="btn-primary-custom px-5 py-2 bg-[#018cff] text-white hover:bg-[#0070cc] font-semibold rounded-full transition-all"
                >
                  Sign Up
                </Link>
              </div>
            </>
          )}

          {/* Desktop Navigation - After Login */}
          {isLoggedIn && (
            <>
              {/* Top Navbar with Search and User Controls */}
              <div className="hidden md:flex items-center ml-auto space-x-4">
                <div className="search-bar-container relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="What can we help you find?"
                    className="py-2 pl-10 pr-20 w-64 rounded-full border border-[#CCCCCC] focus:outline-none focus:ring-1 focus:ring-[#018cff] focus:border-[#018cff] text-sm"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-xs text-gray-500 mr-1">Services</span>
                    <ChevronDown className="h-3 w-3 text-gray-500" />
                  </div>
                </div>
                <button className="p-2 text-gray-500 hover:text-[#018cff] relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[#018cff] rounded-full"></span>
                </button>
                <Link href="/orders" className="p-2 text-gray-700 hover:text-[#018cff] font-medium">
                  Orders
                </Link>
                <div className="flex items-center">
                  <Image
                    src={user?.avatar || "/placeholder.svg?height=32&width=32"}
                    alt="User Avatar"
                    width={32}
                    height={32}
                    className="rounded-full border-2 border-white shadow-sm"
                  />
                </div>
              </div>
            </>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMobileMenu} className="p-2 text-gray-700 hover:text-[#018cff] focus:outline-none">
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Secondary Navigation Bar - Only after login */}
        {isLoggedIn && (
          <div className="hidden md:block border-t border-[#E6ECEF]">
            <nav className="flex items-center h-12">
              <div className="custom-dropdown flex items-center mr-4">
                <Link href="/categories" className="nav-link flex items-center text-gray-700 hover:text-[#018cff] font-medium">
                  Categories <ChevronDown className="ml-1 h-4 w-4" />
                </Link>
                <div className="custom-dropdown-content">
                  {/* Dropdown content would go here */}
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <Link href="/home" className="nav-link text-gray-700 hover:text-[#018cff] font-medium">
                  Home
                </Link>
                <div className="custom-dropdown">
                  <button className="nav-link flex items-center text-gray-700 hover:text-[#018cff] font-medium">
                    Services <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  <div className="custom-dropdown-content">
                    {/* Dropdown content would go here */}
                  </div>
                </div>
                <div className="custom-dropdown">
                  <button className="nav-link flex items-center text-gray-700 hover:text-[#018cff] font-medium">
                    Education <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  <div className="custom-dropdown-content">
                    {/* Dropdown content would go here */}
                  </div>
                </div>
                <div className="custom-dropdown">
                  <button className="nav-link flex items-center text-gray-700 hover:text-[#018cff] font-medium">
                    Softwares <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  <div className="custom-dropdown-content">
                    {/* Dropdown content would go here */}
                  </div>
                </div>
                <Link href="/post-request" className="nav-link text-gray-700 hover:text-[#018cff] font-medium">
                  Post Request
                </Link>
                <Link href="/about" className="nav-link text-gray-700 hover:text-[#018cff] font-medium">
                  About
                </Link>
                <Link href="/contact" className="nav-link text-gray-700 hover:text-[#018cff] font-medium">
                  Contact
                </Link>
              </div>
            </nav>
          </div>
        )}

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#E6ECEF]">
            {isLoggedIn ? (
              <>
                <div className="relative mb-4">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="What can we help you find?"
                    className="py-2 pl-10 pr-4 w-full rounded-full border border-[#CCCCCC] focus:outline-none focus:ring-1 focus:ring-[#018cff] focus:border-[#018cff] text-sm"
                  />
                </div>
                <nav className="flex flex-col space-y-3">
                  <Link href="/home" className="px-3 py-2 text-gray-700 hover:text-[#018cff] font-medium">
                    Home
                  </Link>
                  <div className="relative">
                    <button className="px-3 py-2 text-gray-700 hover:text-[#018cff] flex items-center justify-between w-full font-medium">
                      Services <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="relative">
                    <button className="px-3 py-2 text-gray-700 hover:text-[#018cff] flex items-center justify-between w-full font-medium">
                      Education <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="relative">
                    <button className="px-3 py-2 text-gray-700 hover:text-[#018cff] flex items-center justify-between w-full font-medium">
                      Softwares <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                  <Link href="/post-request" className="px-3 py-2 text-gray-700 hover:text-[#018cff] font-medium">
                    Post Request
                  </Link>
                  <Link href="/about" className="px-3 py-2 text-gray-700 hover:text-[#018cff] font-medium">
                    About
                  </Link>
                  <Link href="/contact" className="px-3 py-2 text-gray-700 hover:text-[#018cff] font-medium">
                    Contact
                  </Link>
                  <Link href="/orders" className="px-3 py-2 text-gray-700 hover:text-[#018cff] font-medium">
                    Orders
                  </Link>
                </nav>
              </>
            ) : (
              <nav className="flex flex-col space-y-3">
                <Link href="/" className="px-3 py-2 text-gray-700 hover:text-[#018cff] font-medium">
                  Home
                </Link>
                <Link href="/services" className="px-3 py-2 text-gray-700 hover:text-[#018cff] font-medium">
                  Services
                </Link>
                <Link href="/about" className="px-3 py-2 text-gray-700 hover:text-[#018cff] font-medium">
                  About
                </Link>
                <Link href="/help" className="px-3 py-2 text-gray-700 hover:text-[#018cff] font-medium">
                  Help
                </Link>
                <div className="pt-2 flex flex-col space-y-3">
                  <Link href="/sign-in" className="px-3 py-2 text-gray-700 hover:text-[#018cff] font-medium">
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    className="flex items-center justify-center rounded-full bg-[#018cff] text-white hover:bg-[#0070cc] font-semibold px-6 py-2"
                  >
                    Sign Up
                  </Link>
                </div>
              </nav>
            )}
          </div>
        )}
      </div>
    </header>
  )
}