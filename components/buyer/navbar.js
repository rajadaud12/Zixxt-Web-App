"use client"

  import Link from "next/link"
  import Image from "next/image"
  import { useContext, useState } from "react"
  import { AuthContext } from "@/context/authContext"
  import {DropdownSearchBar} from "@/components/utils/input"
  import { Search, Bell, ChevronDown, Menu, X, Heart, MessageSquare } from "lucide-react"

  export default function Navbar() {
    const { isLoggedIn, user } = useContext(AuthContext)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isServicesOpen, setIsServicesOpen] = useState(false)
    const [isEducationOpen, setIsEducationOpen] = useState(false)
    const [isSoftwaresOpen, setIsSoftwaresOpen] = useState(false)

    const toggleMobileMenu = () => {
      setMobileMenuOpen(!mobileMenuOpen)
    }

    return (
      <header className="sticky top-0 z-50">
        {/* Main Navigation Bar */}
        <div className="relative">
          {/* Curved Background for non-logged in state */}
          {!isLoggedIn && (
            <div className="absolute inset-0 max-w-[1200px] mx-auto bg-white rounded-b-[70px] shadow-sm border-b border-border"></div>
          )}

          {/* Regular background for logged in state */}
          {isLoggedIn && (
            <div className="absolute inset-0 bg-white shadow-sm border-b border-border"></div>
          )}

          <div className="relative w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">

              {!isLoggedIn && (
                <>
                  {/* Before login: Max-width 1200px centered with increased spacing */}
                  <div className="hidden mx-auto max-w-[1100px] md:flex items-center justify-between w-full">
                  {/* Logo with increased left margin */}
                    <div className="flex-shrink-0 mr-6 ml-4">
                      <Link href="/" className="flex items-center">
                        <Image src="/images/logo.png" alt="ZIXI Logo" width={90} height={30} />
                      </Link>
                    </div>
                    <nav className="flex items-center justify-center space-x-10">
                      <Link href="/" className="px-2 py-2 text-text hover:text-primary font-medium">
                        Home
                      </Link>
                      <Link href="/services" className="px-2 py-2 text-text hover:text-primary font-medium">
                        Services
                      </Link>
                      <Link href="/about" className="px-2 py-2 text-text hover:text-primary font-medium">
                        About
                      </Link>
                      <Link href="/help" className="px-2 py-2 text-text hover:text-primary font-medium">
                        Help
                      </Link>
                    </nav>

                    {/* Increased spacing between nav links and buttons */}
                    <div className="flex items-center space-x-4 ml-16">
                      <Link
                        href="/signin"
                        className="btn2 btnDefault btnMedium"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/signup"
                        className="btn2 btnPrimary btnMedium"
                      >
                        Sign Up
                      </Link>
                    </div>
                  </div>
                </>
              )}

              {isLoggedIn && (
                <div className="hidden mx-auto md:flex items-center justify-between w-full">
                  {/* Logo with increased left margin */}
                  <div className="flex-shrink-0 mr-6 ml-4">
                    <Link href="/" className="flex items-center">
                      <Image src="/images/logo.png" alt="ZIXI Logo" width={90} height={30} />
                    </Link>
                  </div>
                  <div className="flex-2 w-[500px]">

                  <DropdownSearchBar />
                  </div>
                  {/* Icons and User with improved spacing */}
                  <div className="flex items-center space-x-8 mr-4">
                    <button className="text-textLight hover:text-primary">
                      <Heart className="h-5 w-5" />
                    </button>
                    <button className="text-textLight hover:text-primary relative">
                      <MessageSquare className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
                    </button>
                    <button className="text-textLight hover:text-primary relative">
                      <Bell className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
                    </button>
                    <Link href="/orders" className="text-text hover:text-primary font-medium">
                      Orders
                    </Link>
                    <div className="flex items-center ml-2">
                      <Image
                        src={user?.avatar || "/api/placeholder/32/32"}
                        alt="User Avatar"
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center">
                <button onClick={toggleMobileMenu} className="p-2 text-text hover:text-primary focus:outline-none">
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Navigation Bar - Only after login - with Glass Effect */}
        {isLoggedIn && (
          <div className="relative">
            {/* Curved Glass Effect Background with max-width 1200px */}
            <div className="max-w-[1200px] h-[70px] mx-auto relative">
              {/* Glass Effect Overlay */}
              <div className="absolute inset-0 bg-secondary backdrop-filter backdrop-blur-sm rounded-b-[70px]"></div>

              {/* Navigation Content with better centering and spacing */}
              <div className="hidden md:block relative z-10 h-full">
                <div className="max-w-[1200px] mx-auto px-6 h-full">
                  <nav className="flex items-center justify-center h-full">
                    <div className="flex items-center justify-center space-x-10 px-4">
                      <Link href="/categories" className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm">
                        Categories <ChevronDown className="ml-1 h-4 w-4" />
                      </Link>
                      <Link href="/home" className="text-text hover:text-primary text-sm font-medium px-1">
                        Home
                      </Link>

                      {/* Services Dropdown */}
                      <div className="relative">
                        <button
                          onClick={() => setIsServicesOpen(!isServicesOpen)}
                          className="flex items-center text-text hover:text-primary text-sm font-medium"
                        >
                          Services <ChevronDown className="ml-1 h-4 w-4" />
                        </button>
                        {isServicesOpen && (
                          <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                            <Link href="/services/web-development" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              Web Development
                            </Link>
                            <Link href="/services/mobile-apps" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              Mobile Applications
                            </Link>
                            <Link href="/services/design" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              Design Services
                            </Link>
                          </div>
                        )}
                      </div>

                      {/* Education Dropdown */}
                      <div className="relative">
                        <button
                          onClick={() => setIsEducationOpen(!isEducationOpen)}
                          className="flex items-center text-text hover:text-primary text-sm font-medium"
                        >
                          Education <ChevronDown className="ml-1 h-4 w-4" />
                        </button>
                        {isEducationOpen && (
                          <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                            <Link href="/education/courses" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              Courses
                            </Link>
                            <Link href="/education/workshops" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              Workshops
                            </Link>
                            <Link href="/education/resources" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              Resources
                            </Link>
                          </div>
                        )}
                      </div>

                      {/* Softwares Dropdown */}
                      <div className="relative">
                        <button
                          onClick={() => setIsSoftwaresOpen(!isSoftwaresOpen)}
                          className="flex items-center text-text hover:text-primary text-sm font-medium"
                        >
                          Softwares <ChevronDown className="ml-1 h-4 w-4" />
                        </button>
                        {isSoftwaresOpen && (
                          <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                            <Link href="/softwares/desktop" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              Desktop Apps
                            </Link>
                            <Link href="/softwares/web" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              Web Apps
                            </Link>
                            <Link href="/softwares/mobile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              Mobile Apps
                            </Link>
                          </div>
                        )}
                      </div>

                      <Link href="/post-request" className="text-text hover:text-primary text-sm font-medium px-1">
                        Post Request
                      </Link>
                      <Link href="/about" className="text-text hover:text-primary text-sm font-medium px-1">
                        About
                      </Link>
                      <Link href="/contact" className="text-text hover:text-primary text-sm font-medium px-1">
                        Contact
                      </Link>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden py-4 ${!isLoggedIn ? "rounded-b-[40px]" : "border-t border-border"} bg-white`}>
            <div className="max-w-[1200px] mx-auto px-4">
              {isLoggedIn ? (
                <>
                  <div className="relative mb-4">

                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Search className="h-4 w-4 text-textLight" />
                    </div>
                    <DropdownSearchBar />
                  </div>
                  <nav className="flex flex-col space-y-3">
                    <Link href="/categories" className="px-3 py-2 text-blue-600 hover:text-blue-800 font-medium flex items-center">
                      Categories <ChevronDown className="ml-1 h-4 w-4" />
                    </Link>
                    <Link href="/home" className="px-3 py-2 text-text hover:text-primary font-medium">
                      Home
                    </Link>
                    <div className="relative">
                      <button
                        onClick={() => setIsServicesOpen(!isServicesOpen)}
                        className="px-3 py-2 text-text hover:text-primary flex items-center justify-between w-full font-medium"
                      >
                        Services <ChevronDown className="h-4 w-4" />
                      </button>
                      {isServicesOpen && (
                        <div className="pl-6 mt-1 space-y-1">
                          <Link href="/services/web-development" className="block px-3 py-1 text-sm text-gray-700 hover:text-primary">
                            Web Development
                          </Link>
                          <Link href="/services/mobile-apps" className="block px-3 py-1 text-sm text-gray-700 hover:text-primary">
                            Mobile Applications
                          </Link>
                          <Link href="/services/design" className="block px-3 py-1 text-sm text-gray-700 hover:text-primary">
                            Design Services
                          </Link>
                        </div>
                      )}
                    </div>
                    <div className="relative">
                      <button
                        onClick={() => setIsEducationOpen(!isEducationOpen)}
                        className="px-3 py-2 text-text hover:text-primary flex items-center justify-between w-full font-medium"
                      >
                        Education <ChevronDown className="h-4 w-4" />
                      </button>
                      {isEducationOpen && (
                        <div className="pl-6 mt-1 space-y-1">
                          <Link href="/education/courses" className="block px-3 py-1 text-sm text-gray-700 hover:text-primary">
                            Courses
                          </Link>
                          <Link href="/education/workshops" className="block px-3 py-1 text-sm text-gray-700 hover:text-primary">
                            Workshops
                          </Link>
                          <Link href="/education/resources" className="block px-3 py-1 text-sm text-gray-700 hover:text-primary">
                            Resources
                          </Link>
                        </div>
                      )}
                    </div>
                    <div className="relative">
                      <button
                        onClick={() => setIsSoftwaresOpen(!isSoftwaresOpen)}
                        className="px-3 py-2 text-text hover:text-primary flex items-center justify-between w-full font-medium"
                      >
                        Softwares <ChevronDown className="h-4 w-4" />
                      </button>
                      {isSoftwaresOpen && (
                        <div className="pl-6 mt-1 space-y-1">
                          <Link href="/softwares/desktop" className="block px-3 py-1 text-sm text-gray-700 hover:text-primary">
                            Desktop Apps
                          </Link>
                          <Link href="/softwares/web" className="block px-3 py-1 text-sm text-gray-700 hover:text-primary">
                            Web Apps
                          </Link>
                          <Link href="/softwares/mobile" className="block px-3 py-1 text-sm text-gray-700 hover:text-primary">
                            Mobile Apps
                          </Link>
                        </div>
                      )}
                    </div>
                    <Link href="/post-request" className="px-3 py-2 text-text hover:text-primary font-medium">
                      Post Request
                    </Link>
                    <Link href="/about" className="px-3 py-2 text-text hover:text-primary font-medium">
                      About
                    </Link>
                    <Link href="/contact" className="px-3 py-2 text-text hover:text-primary font-medium">
                      Contact
                    </Link>
                    <Link href="/orders" className="px-3 py-2 text-text hover:text-primary font-medium">
                      Orders
                    </Link>
                    <div className="flex space-x-4 px-3 py-2">
                      <button className="text-textLight hover:text-primary">
                        <Heart className="h-5 w-5" />
                      </button>
                      <button className="text-textLight hover:text-primary relative">
                        <MessageSquare className="h-5 w-5" />
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
                      </button>
                      <button className="text-textLight hover:text-primary relative">
                        <Bell className="h-5 w-5" />
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
                      </button>
                    </div>
                  </nav>
                </>
              ) : (
                <nav className="flex flex-col space-y-3">
                                  {/* Logo with increased left margin */}
                                  <div className="flex-shrink-0 mr-6 ml-4">
                    <Link href="/" className="flex items-center">
                      <Image src="/images/logo.png" alt="ZIXI Logo" width={90} height={30} />
                    </Link>
                  </div>
                  <Link href="/" className="px-3 py-2 text-text hover:text-primary font-medium">
                    Home
                  </Link>
                  <Link href="/services" className="px-3 py-2 text-text hover:text-primary font-medium">
                    Services
                  </Link>
                  <Link href="/about" className="px-3 py-2 text-text hover:text-primary font-medium">
                    About
                  </Link>
                  <Link href="/help" className="px-3 py-2 text-text hover:text-primary font-medium">
                    Help
                  </Link>
                  <div className="pt-4 flex flex-col space-y-4">
                    <Link href="/signin" className="px-5 py-2 text-text hover:text-primary font-medium rounded-full border border-gray-200 text-center">
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      className="flex items-center justify-center rounded-full bg-primary text-white hover:bg-blue-600 font-semibold px-6 py-2"
                    >
                      Sign Up
                    </Link>
                  </div>
                </nav>
              )}
            </div>
          </div>
        )}
      </header>
    )
  }