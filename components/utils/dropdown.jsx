"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export function Dropdown({
  options = [],
  defaultValue = "",
  onChange = () => {},
  variant = "default",
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(defaultValue || options[0])

  const handleSelect = (option) => {
    setSelected(option)
    setIsOpen(false)
    onChange(option)
  }

  // Styles based on variant
  const variantStyles = {
    default: "bg-white border border-inputBorder text-text hover:bg-btnbg",
    small: "bg-btnbg text-text hover:bg-btnbg/80",
  }

  return (
    <div className={`relative w-full ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between rounded-full w-full ${
          variant === "default" ? "px-5 py-3" : "px-4 py-2"
        } ${variantStyles[variant]}`}
      >
        <span>{selected}</span>
        <ChevronDown className="ml-2 h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-lg bg-white shadow-lg border border-inputBorder">
          <ul className="py-1">
            {options.map((option) => (
              <li key={option}>
                <button
                  onClick={() => handleSelect(option)}
                  className={`block w-full text-left px-4 py-2 hover:bg-btnbg ${
                    selected === option ? "text-primary" : "text-text"
                  }`}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
