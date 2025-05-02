"use client"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

export function SearchInput({ placeholder = "What can we help you find?", buttonText, className = "", ...props }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          className="w-4 h-4 text-textLight"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      {buttonText ? (
        <div className="flex">
          <input
            type="search"
            className="w-full p-3 pl-10 rounded-l-full border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder-gray-400"
            placeholder={placeholder}
            {...props}
          />
          <button className="px-5 py-3 text-white bg-black rounded-r-full">{buttonText}</button>
        </div>
      ) : (
        <input
          type="search"
          className="w-full p-3 pl-10 rounded-full bg-btnbg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder-gray-400"
          placeholder={placeholder}
          {...props}
        />
      )}
    </div>
  )
}

export function SearchBar({ className = "" }) {
  return (
    <div className={`flex items-center rounded-full bg-btnbg ${className}`}>
      <div className="flex items-center flex-1">
        <div className="pl-3">
          <svg
            className="w-5 h-5 text-textLight"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          className="w-full p-3 pl-2 bg-transparent border-none focus:outline-none focus:ring-0 placeholder-gray-400"
          placeholder="What can we help you find?"
        />
      </div>
      <div className="border-l border-border">
        <button className="flex items-center px-4 py-3 text-textLight bg-secondary rounded-r-full">
          Services
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
      </div>
    </div>
  )
}
export function DropdownSearchBar({ className = "" }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState("Services")
  const options = ["Services", "Softwares", "Education"]

  const handleSelect = (option) => {
    setSelected(option)
    setIsOpen(false)
  }

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center h-full rounded-full bg-btnbg overflow-hidden">
        <div className="flex items-center flex-1 h-full">
          <div className="pl-3">
            <svg
              className="w-4 h-4 text-textLight"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            className="w-full h-full py-1 pl-2 bg-transparent border-none focus:outline-none focus:ring-0 placeholder-gray-400 text-sm"
            placeholder="What can we help you find?"
          />
        </div>
        <div className="h-full">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center h-full px-3 text-text bg-secondary rounded-r-full text-sm"
            type="button"
          >
            {selected}
            <ChevronDown className="ml-1 h-3 w-3" />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full right-0 rounded-lg bg-white shadow-lg border border-border">
          <ul className="py-1">
            {options.map((option) => (
              <li key={option}>
                <button
                  onClick={() => handleSelect(option)}
                  className={`block w-full text-left px-4 py-1.5 hover:bg-btnbg text-sm ${
                    selected === option ? "text-primary" : "text-text"
                  }`}
                  type="button"
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