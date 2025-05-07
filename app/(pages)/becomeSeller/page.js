"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { Dropdown, MultiSelectDropdown } from "@/components/utils/dropdown"
import "@/styles/utils.css"
import { useIsSeller } from "@/context/isSellerContext"

export default function BecomeSeller() {
    
  const router = useRouter()
  const [sellerType, setSellerType] = useState("")
  const { setIsSeller } = useIsSeller(); // Add the hook to access the context
  const [currentStep, setCurrentStep] = useState(0) // 0 = selection, 1-4 = actual steps
  const [individualFormData, setIndividualFormData] = useState({
    fullName: "",
    displayName: "",
    country: "",
    state: "",
    city: "",
    postalCode: "",
    languages: [],
    introduction: "",
  })
  const [companyFormData, setCompanyFormData] = useState({
    workEmail: "",
    companyName: "",
    yearEstablished: "",
    employeesCount: "",
    country: "",
    state: "",
    city: "",
    postalCode: "",
    languages: [],
    introduction: "",
  })
  const [wordCount, setWordCount] = useState(0)

  // Get the current form data based on seller type
  const formData = sellerType === "individual" ? individualFormData : companyFormData
  const setFormData = sellerType === "individual" ? setIndividualFormData : setCompanyFormData

  // Calculate total steps based on seller type
  const totalSteps = sellerType === "individual" ? 3 : 4

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    if (name === "introduction") {
      setWordCount(value.trim().split(/\s+/).filter(Boolean).length)
    }
  }

  const handleLanguagesChange = (selectedLanguages) => {
    setFormData({
      ...formData,
      languages: selectedLanguages,
    })
  }

  const handleDropdownChange = (name) => (value) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleNext = () => {
    setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleSellerTypeSelect = (type) => {
    // If changing seller type, reset form data for that type
    if (sellerType !== type) {
      if (type === "individual") {
        setIndividualFormData({
          fullName: "",
          displayName: "",
          country: "",
          state: "",
          city: "",
          postalCode: "",
          languages: [],
          introduction: "",
        })
      } else {
        setCompanyFormData({
          workEmail: "",
          companyName: "",
          yearEstablished: "",
          employeesCount: "",
          country: "",
          state: "",
          city: "",
          postalCode: "",
          languages: [],
          introduction: "",
        })
      }
    }
    setSellerType(type)
  }

  const handleCreateAccount = () => {
    // Here you would typically submit the data to your backend
    console.log("Submitting seller data:", formData);
    // Set isSeller to true after successful account creation
    setIsSeller(true);
    // Redirect to dashboard or confirmation page
    router.push("/dashboard");
  };
  // Reset word count when introduction changes
  useEffect(() => {
    if (formData.introduction) {
      setWordCount(formData.introduction.trim().split(/\s+/).filter(Boolean).length)
    } else {
      setWordCount(0)
    }
  }, [formData.introduction, sellerType])

  // Available languages for the multi-select dropdown
  const languageOptions = [
    "English",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Japanese",
    "Russian",
    "Arabic",
    "Portuguese",
    "Hindi",
    "Italian",
  ]

  // Country options for dropdown
  const countryOptions = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "Japan",
    "China",
    "India",
    "Brazil",
  ]

  // City options - would typically be based on country/state selection
  const cityOptions = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Toronto",
    "London",
    "Paris",
    "Berlin",
    "Tokyo",
    "Sydney",
  ]

  // Year options for company established year
  const yearOptions = Array.from({ length: 74 }, (_, i) => (2024 - i).toString())

  // Employee count options
  const employeeCountOptions = ["1-10", "11-50", "51-200", "201-500", "501-1000", "1001-5000", "5000+"]

  // Render the stepper only for steps 1-4 (not for the selection screen)
  const renderStepper = () => {
    if (currentStep === 0) return null

    return (
      <div className="flex items-center mb-8">
        <div
          className={`flex items-center justify-center w-14 h-14 rounded-full ${
            currentStep >= 1 ? "bg-primary" : "bg-gray-100 text-gray-400"
          } text-white font-semibold`}
        >
          01
        </div>
        <div className={`h-0.5 w-32 ${currentStep >= 2 ? "bg-primary" : "bg-gray-200"}`}></div>
        <div
          className={`flex items-center justify-center w-14 h-14 rounded-full ${
            currentStep >= 2 ? "bg-primary" : "bg-gray-100 text-gray-400"
          } text-white font-semibold`}
        >
          02
        </div>
        <div className={`h-0.5 w-32 ${currentStep >= 3 ? "bg-primary" : "bg-gray-200"}`}></div>
        <div
          className={`flex items-center justify-center w-14 h-14 rounded-full ${
            currentStep >= 3 ? "bg-primary" : "bg-gray-100 text-gray-400"
          } text-white font-semibold`}
        >
          03
        </div>
        {sellerType === "company" && (
          <>
            <div className={`h-0.5 w-32 ${currentStep >= 4 ? "bg-primary" : "bg-gray-200"}`}></div>
            <div
              className={`flex items-center justify-center w-14 h-14 rounded-full ${
                currentStep >= 4 ? "bg-primary" : "bg-gray-100 text-gray-400"
              } text-white font-semibold`}
            >
              04
            </div>
          </>
        )}
      </div>
    )
  }

  // Get right side content based on step and seller type
  const getRightSideContent = () => {
    if (currentStep === 0) {
      return {
        image: "/images/becomeSeller/illustration1.svg",
        title: "Sell Smarter, Earn More",
        description:
          "Offer top-tier services, cutting-edge software, and valuable educational content to a global audience. Expand your reach and maximize your impact.",
      }
    }

    if (sellerType === "individual") {
      switch (currentStep) {
        case 1:
          return {
            image: "/images/becomeSeller/illustration2.svg",
            title: "Monetize Your Expertise with Ease",
            description:
              "Turn your skills into a thriving business. Provide high-quality services, attract clients, and build lasting relationships—all in one place.",
          }
        case 2:
          return {
            image: "/images/becomeSeller/illustration3.svg",
            title: "Develop Software, Drive Sales",
            description:
              "Bring your software to market effortlessly. Reach the right audience, showcase your innovation, and scale your business like never before.",
          }
        case 3:
          return {
            image: "/images/becomeSeller/illustration4.svg",
            title: "Teach, Inspire, Profit",
            description:
              "Share your knowledge and get rewarded. Create and sell educational content that empowers learners while growing your brand.",
          }
        default:
          return {
            image: "/images/becomeSeller/illustration4.svg",
            title: "Start Your Journey",
            description: "Begin your selling journey and reach customers worldwide.",
          }
      }
    } else {
      // Company content
      switch (currentStep) {
        case 1:
          return {
            image: "/images/becomeSeller/illustration2.svg",
            title: "Your Company, Your Rules",
            description:
              "Gain full control over your business with customizable options, advanced analytics, and seamless transaction management. Start selling today!",
          }
        case 2:
          return {
            image: "/images/becomeSeller/illustration3.svg",
            title: "Expand Your Business Reach",
            description:
              "Connect with customers globally. Our platform provides the tools and visibility your company needs to grow in today's digital marketplace.",
          }
        case 3:
          return {
            image: "/images/becomeSeller/illustration3.2.svg",
            title: "Develop Software, Drive Sales",
            description:
              "Bring your software to market effortlessly. Reach the right audience, showcase your innovation, and scale your business like never before.",
          }
        case 4:
          return {
            image: "/images/becomeSeller/illustration4.svg",
            title: "Teach, Inspire, Profit",
            description:
              "Share your company's knowledge and get rewarded. Create and sell educational content that empowers learners while growing your brand.",
          }
        default:
          return {
            image: "/images/becomeSeller/illustration4.svg",
            title: "Start Your Company's Journey",
            description: "Begin your company's selling journey and reach customers worldwide.",
          }
      }
    }
  }

  // Check if current step is valid based on form data
  const isStepValid = () => {
    if (currentStep === 0) return !!sellerType

    if (sellerType === "individual") {
      switch (currentStep) {
        case 1:
          return !!formData.fullName && !!formData.displayName
        case 2:
          return (
            !!formData.country &&
            !!formData.state &&
            !!formData.city &&
            !!formData.postalCode &&
            formData.languages.length > 0
          )
        case 3:
          return !!formData.introduction
        default:
          return false
      }
    } else {
      // Company validation
      switch (currentStep) {
        case 1:
          return (
            !!formData.workEmail && !!formData.companyName && !!formData.yearEstablished && !!formData.employeesCount
          )
        case 2:
          return !!formData.fullName && !!formData.displayName
        case 3:
          return (
            !!formData.country &&
            !!formData.state &&
            !!formData.city &&
            !!formData.postalCode &&
            formData.languages.length > 0
          )
        case 4:
          return !!formData.introduction
        default:
          return false
      }
    }
  }

  const rightSideContent = getRightSideContent()

  return (
    <main className="flex min-h-screen">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center">
        <div className="w-full max-w-[580px]">
          {/* Logo */}
          <div className="mb-8">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={120}
              height={50}
              style={{ width: "7.5rem", height: "auto" }}
            />
          </div>

          {/* Progress indicator */}
          {renderStepper()}

          {/* Heading based on current step */}
          <h1 className="typoH1 text-black mb-8">
            {currentStep === 0 && "Start Selling"}
            {currentStep > 0 && "Create your seller account"}
          </h1>

          {/* Step 0: Choose seller type */}
          {currentStep === 0 && (
            <div>
              <p className="typoB1 text-text mb-6">Are you an individual or Company?</p>

              <div className="grid grid-cols-2 gap-4 mb-16">
                <div
                  className={`border rounded-lg p-20 flex flex-col items-center justify-center cursor-pointer transition-all ${
                    sellerType === "individual" ? "border-primary bg-secondary" : "border-border bg-white"
                  }`}
                  onClick={() => handleSellerTypeSelect("individual")}
                >
                  <div className="w-16 h-16 flex items-center justify-center mb-4">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M24 24C29.5228 24 34 19.5228 34 14C34 8.47715 29.5228 4 24 4C18.4772 4 14 8.47715 14 14C14 19.5228 18.4772 24 24 24Z"
                        stroke={sellerType === "individual" ? "#018CFF" : "#767B7F"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M40 44C40 34.0589 32.8366 26 24 26C15.1634 26 8 34.0589 8 44"
                        stroke={sellerType === "individual" ? "#018CFF" : "#767B7F"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span
                    className={sellerType === "individual" ? "text-primary font-medium" : "text-textLight font-medium"}
                  >
                    Individual
                  </span>
                </div>

                <div
                  className={`border rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-all ${
                    sellerType === "company" ? "border-primary bg-secondary" : "border-border bg-white"
                  }`}
                  onClick={() => handleSellerTypeSelect("company")}
                >
                  <div className="w-16 h-16 flex items-center justify-center mb-4">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M6 42H42"
                        stroke={sellerType === "company" ? "#018CFF" : "#767B7F"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 42V10C10 8.93913 10.4214 7.92172 11.1716 7.17157C11.9217 6.42143 12.9391 6 14 6H34C35.0609 6 36.0783 6.42143 36.8284 7.17157C37.5786 7.92172 38 8.93913 38 10V42"
                        stroke={sellerType === "company" ? "#018CFF" : "#767B7F"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M18 42V34H30V42"
                        stroke={sellerType === "company" ? "#018CFF" : "#767B7F"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M18 26H22"
                        stroke={sellerType === "company" ? "#018CFF" : "#767B7F"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M26 26H30"
                        stroke={sellerType === "company" ? "#018CFF" : "#767B7F"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M18 18H22"
                        stroke={sellerType === "company" ? "#018CFF" : "#767B7F"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M26 18H30"
                        stroke={sellerType === "company" ? "#018CFF" : "#767B7F"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span
                    className={sellerType === "company" ? "text-primary font-medium" : "text-textLight font-medium"}
                  >
                    Company
                  </span>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  disabled={!sellerType}
                  className={`btn btnMedium ${
                    sellerType ? "btnDark" : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  } flex items-center justify-center gap-2`}
                >
                  Next
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Company Step 1: Company Information */}
          {currentStep === 1 && sellerType === "company" && (
            <div>
              <div className="space-y-6 mb-16">
                <div>
                  <label htmlFor="workEmail" className="block formLabel mb-2">
                    Work Email
                  </label>
                  <input
                    id="workEmail"
                    name="workEmail"
                    type="email"
                    value={formData.workEmail}
                    onChange={handleInputChange}
                    placeholder="Enter your work email"
                    className="formInput"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="companyName" className="block formLabel mb-2">
                    Company Name
                  </label>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Enter your company name"
                    className="formInput"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="yearEstablished" className="block formLabel mb-2">
                      Year Established In
                    </label>
                    <Dropdown
                      options={yearOptions}
                      defaultValue={formData.yearEstablished || "Select Year"}
                      onChange={handleDropdownChange("yearEstablished")}
                    />
                  </div>

                  <div>
                    <label htmlFor="employeesCount" className="block formLabel mb-2">
                      No of Employees
                    </label>
                    <Dropdown
                      options={employeeCountOptions}
                      defaultValue={formData.employeesCount || "Select Range"}
                      onChange={handleDropdownChange("employeesCount")}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={handleBack}
                  className="btn btnMedium btnDefault flex items-center justify-center gap-2"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Back
                </button>

                <button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className={`btn btnMedium ${
                    isStepValid() ? "btnDark" : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  } flex items-center justify-center gap-2`}
                >
                  Next
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 1 (Individual) or Step 2 (Company): Basic profile information */}
          {((currentStep === 1 && sellerType === "individual") || (currentStep === 2 && sellerType === "company")) && (
            <div>
              <div className="space-y-6 mb-16">
                <div>
                  <label htmlFor="profilePicture" className="block formLabel mb-2">
                    Profile Picture
                  </label>
                  <div className="relative w-24 h-24">
                    <div className="w-24 h-24 bg-whiteGrey rounded-full flex items-center justify-center overflow-hidden">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                          stroke="#018CFF"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M20 21C20 16.5817 16.4183 13 12 13C7.58172 13 4 16.5817 4 21"
                          stroke="#018CFF"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <label
                      htmlFor="profilePicture"
                      className="absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center cursor-pointer"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 5V19"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M5 12H19"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <input type="file" id="profilePicture" className="hidden" accept="image/*" />
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="fullName" className="block formLabel mb-2">
                    Full Name
                  </label>
                  <input
                   id="fullName"
                   name="fullName"
                   type="text"
                   value={formData.fullName}
                   onChange={handleInputChange}
                   placeholder="Enter your full name"
                   className="formInput"
                   required
                  />
                </div>

                <div>
                  <label htmlFor="displayName" className="block formLabel mb-2">
                    Display Name
                  </label>
                  <input
                    id="displayName"
                    name="displayName"
                    type="text"
                    value={formData.displayName}
                    onChange={handleInputChange}
                    placeholder="Enter your display name"
                    className="formInput"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={handleBack}
                  className="btn btnMedium btnDefault flex items-center justify-center gap-2"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Back
                </button>

                <button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className={`btn btnMedium ${
                    isStepValid() ? "btnDark" : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  } flex items-center justify-center gap-2`}
                >
                  Next
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2 (Individual) or Step 3 (Company): Location and languages */}
          {((currentStep === 2 && sellerType === "individual") || (currentStep === 3 && sellerType === "company")) && (
            <div>
              <div className="space-y-6 mb-16">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="country" className="block formLabel mb-2">
                      Country
                    </label>
                    <Dropdown
                      options={countryOptions}
                      defaultValue={formData.country || "Select your Country"}
                      onChange={handleDropdownChange("country")}
                    />
                  </div>

                  <div>
                    <label htmlFor="state" className="block formLabel mb-2">
                      State
                    </label>
                    <Dropdown
                      options={["California", "New York", "Texas", "Florida"]}
                      defaultValue={formData.state || "Enter your State"}
                      onChange={handleDropdownChange("state")}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block formLabel mb-2">
                      City
                    </label>
                    <Dropdown
                      options={cityOptions}
                      defaultValue={formData.city || "Select your City"}
                      onChange={handleDropdownChange("city")}
                    />
                  </div>

                  <div>
                    <label htmlFor="postalCode" className="block formLabel mb-2">
                      Postal Code
                    </label>
                    <input
                      id="postalCode"
                      name="postalCode"
                      type="text"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="Enter your Postal Code"
                      className="formInput"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="languages" className="block formLabel mb-2">
                    Languages
                  </label>
                  <MultiSelectDropdown
                    options={languageOptions}
                    selectedValues={formData.languages}
                    onChange={handleLanguagesChange}
                    placeholder="Select the languages you are able to speak"
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={handleBack}
                  className="btn btnMedium btnDefault flex items-center justify-center gap-2"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Back
                </button>

                <button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className={`btn btnMedium ${
                    isStepValid() ? "btnDark" : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  } flex items-center justify-center gap-2`}
                >
                  Next
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3 (Individual) or Step 4 (Company): Introduction */}
          {((currentStep === 3 && sellerType === "individual") || (currentStep === 4 && sellerType === "company")) && (
            <div>
              <div className="mb-16">
                <label htmlFor="introduction" className="block formLabel mb-2">
                  Brief Introduction
                </label>
                <textarea
                  id="introduction"
                  name="introduction"
                  value={formData.introduction}
                  onChange={handleInputChange}
                  placeholder={`Write a short description of the ${
                    sellerType === "individual" ? "seller's" : "company's"
                  } background, expertise, and offerings`}
                  className="formTextarea h-64"
                  maxLength={400}
                  required
                ></textarea>
                <div className="text-right text-textLight mt-2">{wordCount} / 400 words</div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={handleBack}
                  className="btn btnMedium btnDefault flex items-center justify-center gap-2"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Back
                </button>

                <button
                  onClick={handleCreateAccount}
                  disabled={!isStepValid()}
                  className={`btn btnMedium ${
                    isStepValid() ? "btnDark" : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  } flex items-center justify-center gap-2`}
                >
                  Create Account
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

 {/* Right side - Illustration */}
 <div className="hidden md:block md:w-1/2 bg-whiteGrey p-8 border-l border-border">
 <div className="max-w-md h-full flex flex-col justify-center items-start mx-auto">
    <div className="mb-8">
      <Image
        src={rightSideContent.image || "/placeholder.svg"}
        alt={rightSideContent.title}
        width={500}
        height={320}
        style={{ width: '100%', height: '25rem', objectFit: 'contain' }}
      />
    </div>
    <div className="mb-8">
      <h2 className="typoH2 text-black mb-4">{rightSideContent.title}</h2>
      <p className="typoB1 text-text">{rightSideContent.description}</p>
    </div>
  </div>
</div>
    </main>
  )
}