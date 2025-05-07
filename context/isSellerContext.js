"use client";

import { createContext, useContext, useState } from "react";

// Create the context with a default value
const IsSellerContext = createContext(undefined);

// Create the provider component
export const IsSellerProvider = ({ children }) => {
  const [isSeller, setIsSeller] = useState(false);

  return (
    <IsSellerContext.Provider value={{ isSeller, setIsSeller }}>
      {children}
    </IsSellerContext.Provider>
  );
};

// Custom hook to use the context
export const useIsSeller = () => {
  const context = useContext(IsSellerContext);
  if (!context) {
    throw new Error("useIsSeller must be used within an IsSellerProvider");
  }
  return context;
};