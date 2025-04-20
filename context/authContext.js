// context/authContext.js
"use client"

import { createContext, useState, useEffect } from "react"

// Create the authentication context
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  // Check if user is logged in on mount
  useEffect(() => {
    // Check local storage for auth token or user data
    const checkAuthStatus = () => {
      const token = localStorage.getItem('authToken')
      const userData = localStorage.getItem('userData')
      
      if (token && userData) {
        setUser(JSON.parse(userData))
        setIsLoggedIn(true)
      }
      
      setLoading(false)
    }
    
    checkAuthStatus()
  }, [])

  // Login function
  const login = (userData, token) => {
    // Store auth data in local storage
    localStorage.setItem('authToken', token)
    localStorage.setItem('userData', JSON.stringify(userData))
    
    // Update state
    setUser(userData)
    setIsLoggedIn(true)
  }

  // Logout function
  const logout = () => {
    // Clear auth data from local storage
    localStorage.removeItem('authToken')
    localStorage.removeItem('userData')
    
    // Update state
    setUser(null)
    setIsLoggedIn(false)
  }

  // Auth context value
  const value = {
    isLoggedIn,
    loading,
    user,
    login,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}