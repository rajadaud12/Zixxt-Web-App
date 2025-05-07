// context/authContext.js
"use client"

import { createContext, useState } from "react"

// Create the authentication context
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)


  const login = (userData, token) => {
    setUser(userData)
    setIsLoggedIn(true)
  }

  const logout = () => {
    setUser(null)
    setIsLoggedIn(false)
  }

  const value = {
    isLoggedIn,
    loading,
    user,
    login,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}