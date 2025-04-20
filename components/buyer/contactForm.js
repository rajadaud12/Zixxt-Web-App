"use client"

import { useState } from "react"
import { Twitter, Facebook, Instagram } from "lucide-react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    message: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Add your form submission logic here
  }

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-black text-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
            <p className="mb-8">We'd love to hear from you</p>
            <div className="flex space-x-4 mt-auto">
              <a href="#" className="text-white hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="formLabel block mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter your First Name"
                    className="formInput"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="formLabel block mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter your Last Name"
                    className="formInput"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="formLabel block mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className="w-full px-6 py-3 rounded-2xl border border-inputBorder focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary h-32"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="flex items-center justify-center rounded-full bg-black text-white hover:bg-black/90 font-semibold px-6 py-3"
              >
                Send Message
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 ml-2"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
