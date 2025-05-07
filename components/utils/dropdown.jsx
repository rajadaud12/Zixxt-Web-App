"use client"

import { useState, useRef, useEffect } from "react"
import { X, Check, ChevronDown, Plus } from "lucide-react"

export function Dropdown({
  options = [],
  defaultValue = "",
  onChange = () => {},
  variant = "default",
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(defaultValue || options[0])
  const dropdownRef = useRef(null)

  useEffect(() => {
    // Close dropdown when clicking outside
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

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
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
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
  <div className="absolute z-10 mt-1 w-full rounded-lg bg-white shadow-lg border border-inputBorder max-h-60 overflow-auto">
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

export function MultiSelectDropdown({
  options = [],
  selectedValues = [],
  onChange = () => {},
  placeholder = "Select options",
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(selectedValues)
  const [showAllModal, setShowAllModal] = useState(false)
  const dropdownRef = useRef(null)
  const maxDisplayItems = 3

  useEffect(() => {
    // Update local state if props change
    setSelected(selectedValues)
  }, [selectedValues])

  useEffect(() => {
    // Close dropdown when clicking outside
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
        setShowAllModal(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleToggle = (option) => {
    let updatedSelection

    if (selected.includes(option)) {
      updatedSelection = selected.filter((item) => item !== option)
    } else {
      updatedSelection = [...selected, option]
    }

    setSelected(updatedSelection)
    onChange(updatedSelection)
  }

  const removeOption = (option, e) => {
    e.stopPropagation()
    const updatedSelection = selected.filter((item) => item !== option)
    setSelected(updatedSelection)
    onChange(updatedSelection)
  }

  const toggleShowAllModal = (e) => {
    e.stopPropagation()
    setShowAllModal(!showAllModal)
  }

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center flex-wrap min-h-[50px] px-6 py-3 rounded-full border border-inputBorder focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer ${
          isOpen ? "border-primary ring-2 ring-primary/20" : ""
        }`}
      >
        {selected.length === 0 ? (
          <span className="text-gray-400">{placeholder}</span>
        ) : (
          <div className="flex flex-wrap gap-2 items-center">
            {selected.slice(0, maxDisplayItems).map((option) => (
              <div key={option} className="flex items-center gap-1 bg-secondary text-primary px-2 py-1 rounded-full">
                <span className="text-sm">{option}</span>
                <button onClick={(e) => removeOption(option, e)} className="text-primary hover:text-primary/80">
                  <X size={14} />
                </button>
              </div>
            ))}
            {selected.length > maxDisplayItems && (
              <button
                onClick={toggleShowAllModal}
                className="flex items-center justify-center w-6 h-6 bg-secondary text-primary rounded-full"
              >
                <Plus size={14} />
              </button>
            )}
          </div>
        )}
        <div className="ml-auto">
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-lg bg-white shadow-lg border border-inputBorder max-h-60 overflow-auto">
          <ul className="py-1">
            {options.map((option) => (
              <li key={option}>
                <button
                  type="button"
                  onClick={() => handleToggle(option)}
                  className="flex items-center w-full text-left px-4 py-2 hover:bg-btnbg"
                >
                  <div
                    className={`w-5 h-5 border rounded mr-2 flex items-center justify-center ${
                      selected.includes(option) ? "bg-primary border-primary" : "border-gray-300"
                    }`}
                  >
                    {selected.includes(option) && <Check className="h-3 w-3 text-white" />}
                  </div>
                  <span className={selected.includes(option) ? "text-primary" : "text-text"}>{option}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Modal to show all selected languages */}
      {showAllModal && (
        <div className="absolute z-20 mt-1 w-full rounded-lg bg-white shadow-lg border border-inputBorder p-3">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium">All Selected Languages</h4>
            <button onClick={toggleShowAllModal} className="text-gray-500 hover:text-gray-700">
              <X size={16} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
            {selected.map((option) => (
              <div key={option} className="flex items-center gap-1 bg-secondary text-primary px-2 py-1 rounded-full">
                <span className="text-sm">{option}</span>
                <button onClick={(e) => removeOption(option, e)} className="text-primary hover:text-primary/80">
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
