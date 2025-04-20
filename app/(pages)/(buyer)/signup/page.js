"use client"

import { useState, useContext } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { EyeIcon } from '@/app/ui/eye-icon'
import { AuthContext } from "@/context/authContext"
import '@/styles/utils.css'

export default function Signup() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [error, setError] = useState("")
  const router = useRouter()
  const { login } = useContext(AuthContext)

  const slides = [0, 1, 2, 3] 
  
  const handleSignup = (e) => {
    e.preventDefault()
    setError("")
    
    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }
    
    try {
      // Call signup function from context
      const success = login(username, email, password)
      
      if (success) {
        // Redirect to home page after successful signup
        router.push("/home")
      } else {
        setError("Signup failed. Please try again.")
      }
    } catch (err) {
      setError("An error occurred during signup.")
      console.error(err)
    }
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <main className="flex min-h-screen signupContainer">
      {/* Left side - Signup Form */}
      <div className="w-1/2 p-8 flex flex-col justify-center items-center">
        <div className="w-full max-w-md">
          {/* Logo container aligned to the left */}
          <div className="mb-8 text-left">
            <Image src="/images/logo.png" alt="ZIXXT Logo" width={120} height={50}  />
          </div>

          {/* Form content with left-aligned heading */}
          <div className="w-full">
            <h1 className="typoH1 text-black mb-8 text-left">Sign Up</h1>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSignup}>
              <div className="mb-6">
                <label htmlFor="username" className="block formLabel mb-2">
                  User Name
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter a unique username"
                  className="formInput"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block formLabel mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="formInput"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block formLabel mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter a unique password"
                    className="formInput pr-10"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-5 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    <EyeIcon open={showPassword} />
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block formLabel mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="formInput pr-10"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-5 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    <EyeIcon open={showConfirmPassword} />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-10">
                <button type="submit" className="btn btnMedium btnDark w-full">
                  Sign Up
                </button>

                <div className="flex items-center justify-center">
                  <span className="typoB3 text-textLight">OR</span>
                </div>

                <button type="button" className="btn btnMedium btnDefault w-full flex justify-center items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M18.1711 8.36788H17.5V8.33329H10V11.6666H14.6422C13.9272 13.6063 12.1133 15 10 15C7.23859 15 5.00001 12.7614 5.00001 9.99998C5.00001 7.23856 7.23859 5 10 5C11.2558 5 12.4033 5.48351 13.2819 6.27212L15.6711 3.88288C14.1443 2.45205 12.1718 1.66663 10 1.66663C5.39765 1.66663 1.66667 5.39761 1.66667 9.99996C1.66667 14.6023 5.39765 18.3333 10 18.3333C14.6024 18.3333 18.3333 14.6023 18.3333 9.99996C18.3333 9.44321 18.2756 8.89779 18.1711 8.36788Z"
                      fill="#FFC107"
                    />
                    <path
                      d="M2.62744 6.12445L5.36745 8.12937C6.10748 6.29507 7.90261 5 10 5C11.2558 5 12.4033 5.48351 13.2819 6.27212L15.6711 3.88288C14.1443 2.45205 12.1718 1.66663 10 1.66663C6.83831 1.66663 4.12498 3.50263 2.62744 6.12445Z"
                      fill="#FF3D00"
                    />
                    <path
                      d="M10 18.3334C12.1275 18.3334 14.0637 17.5823 15.5798 16.2083L12.9603 13.9792C12.0996 14.6417 11.0521 15.0001 10 15.0001C7.89903 15.0001 6.09098 13.6188 5.37044 11.6917L2.58301 13.8334C4.06378 16.5001 6.79937 18.3334 10 18.3334Z"
                      fill="#4CAF50"
                    />
                    <path
                      d="M18.1711 8.36788H17.5V8.33329H10V11.6666H14.6422C14.2987 12.5891 13.7065 13.3843 12.9592 13.9792L12.9603 13.9783L15.5798 16.2075C15.4063 16.3658 18.3333 14.1667 18.3333 10C18.3333 9.44321 18.2756 8.89779 18.1711 8.36788Z"
                      fill="#1976D2"
                    />
                  </svg>
                  Google
                </button>
              </div>
            </form>

            <div className="mt-8 text-center">
              <p className="typoB3 text-text">
                Already have an account?{" "}
                <Link href="/" className="text-primary font-medium">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className="w-1/2 bg-whiteGrey p-8 flex flex-col justify-center items-center relative border-l border-border">
      <div className="max-w-md">
          <div className="relative">
            <div className="mb-8">
              <Image
                src="/images/illustration1.svg"
                alt="Platform features"
                width={500}
                height={500}
                onClick={nextSlide}
              />
            </div>

            <h2 className="typoH2 text-black mb-4">One Platform, Endless Possibilities</h2>
            <p className="typoB1 text-text mb-8">
              Discover a world of services, software, and educational content — all in one place. Whether you're looking
              to learn, grow, or create, we've got you covered.
            </p>

            <div className="flex items-center justify-between">
              <button onClick={prevSlide} className="p-2 rounded-full" aria-label="Previous slide">
                <span className="text-2xl">‹</span>
              </button>

              <div className="flex space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full ${currentSlide === index ? "bg-black" : "bg-inputBorder"}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <button onClick={nextSlide} className="p-2 rounded-full" aria-label="Next slide">
                <span className="text-2xl">›</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}