"use client";

import { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState({
    services: [],
    software: [],
    courses: [],
  });

  const addToWishlist = (item, type) => {
    setWishlist((prev) => ({
      ...prev,
      [type]: [...prev[type], item],
    }));
  };

  const removeFromWishlist = (id, type) => {
    setWishlist((prev) => ({
      ...prev,
      [type]: prev[type].filter((item) => item.id !== id),
    }));
  };

  const isInWishlist = (id, type) => {
    return wishlist[type].some((item) => item.id === id);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}