// context/authContext.js
"use client"

import { createContext, useState } from "react"

// Create the authentication context
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)

  // No useEffect needed anymore since we're not checking localStorage

  // Login function - doesn't use localStorage anymore
  const login = (userData, token) => {
    // Update state only (no localStorage)
    setUser(userData)
    setIsLoggedIn(true)
  }

  // Logout function - doesn't clear localStorage anymore
  const logout = () => {
    // Update state only
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