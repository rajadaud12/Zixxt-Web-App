// ToastContext.js
"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

// Toast types
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
};

// Create context
const ToastContext = createContext(undefined);

// Maximum number of toasts to show at once
const MAX_TOASTS = 3;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  // Add a new toast
  const addToast = (message, type = TOAST_TYPES.SUCCESS, duration = 5000) => {
    const id = Date.now();
    // Add new toast and limit to MAX_TOASTS (keep only the most recent ones)
    setToasts((prevToasts) => {
      const updatedToasts = [...prevToasts, { id, message, type, duration, visible: true }];
      // Return only the most recent MAX_TOASTS
      return updatedToasts.slice(-MAX_TOASTS);
    });
    return id;
  };

  // Remove a toast by ID
  const removeToast = (id) => {
    // First, set the toast to not visible to trigger exit animation
    setToasts((prevToasts) =>
      prevToasts.map((toast) =>
        toast.id === id ? { ...toast, visible: false } : toast
      )
    );
    
    // After animation duration, actually remove the toast
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, 500); // Increased to match new animation duration
  };

  // Helper functions for different toast types
  const toast = {
    success: (message, duration) => addToast(message, TOAST_TYPES.SUCCESS, duration),
    error: (message, duration) => addToast(message, TOAST_TYPES.ERROR, duration),
    warning: (message, duration) => addToast(message, TOAST_TYPES.WARNING, duration),
  };

  return (
    <ToastContext.Provider value={{ toast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

// Custom hook to use toast
export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

// The actual toast container component
function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast 
          key={toast.id} 
          toast={toast} 
          onClose={() => removeToast(toast.id)} 
        />
      ))}
    </div>
  );
}

// Individual toast component
function Toast({ toast, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, toast.duration);

    return () => clearTimeout(timer);
  }, [onClose, toast.duration]);

  // Determine styles based on toast type
  const getToastStyles = () => {
    switch (toast.type) {
      case TOAST_TYPES.SUCCESS:
        return {
          baseStyle: 'bg-success text-white',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ),
        };
      case TOAST_TYPES.ERROR:
        return {
          baseStyle: 'text-white', 
          bgColor: '#FF6A6D',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ),
        };
      case TOAST_TYPES.WARNING:
        return {
          baseStyle: 'bg-software text-white',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          ),
        };
      default:
        return {
          baseStyle: 'bg-primary text-white',
          icon: null,
        };
    }
  };

  const { baseStyle, icon, bgColor } = getToastStyles();

  // Apply inline style if bgColor is provided
  const style = bgColor ? { backgroundColor: bgColor } : {};
  
  // Enhanced animation classes
  const animationClasses = toast.visible
    ? 'animate-toast-in'
    : 'animate-toast-out';

  return (
    <div 
      className={`flex items-center justify-between p-4 rounded-md shadow-lg min-w-[300px] max-w-md transform transition-all duration-500 ease-in-out ${animationClasses} ${baseStyle}`}
      style={{
        ...style,
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
      }}
      role="alert"
    >
      <div className="flex items-center gap-3">
        <div className="transform transition-all duration-500 ease-bounce scale-in">
          {icon}
        </div>
        <p className="text-paragraphText font-medium">{toast.message}</p>
      </div>
      <button
        onClick={onClose}
        className="ml-4 text-white focus:outline-none hover:opacity-70 transition-opacity hover:rotate-90 transform duration-300"
        aria-label="Close"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}
