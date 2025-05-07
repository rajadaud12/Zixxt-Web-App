"use client"
import { useState, useRef } from "react"
import { Plus, X, ChevronDown, Settings, Check, Book, Loader2 } from "lucide-react"
import { Dropdown, MultiSelectDropdown } from "@/components/utils/dropdown"
import ImageGallery from "@/components/seller/imageGallery"
import { useRouter } from "next/navigation"
import Tabs from "@/components/utils/tabs"
import { useToast } from "@/context/toastContext"

export default function CreateSoftware() {
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [currentPackage, setCurrentPackage] = useState("Monthly")
  const [showGallery, setShowGallery] = useState(false)
  const [billingType, setBillingType] = useState("Monthly")
  const [enabledPackages, setEnabledPackages] = useState({
    Monthly: true,
    Yearly: true,
    "One Time": true,
  })
  const [selectedSubscription, setSelectedSubscription] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isPurchaseSuccess, setIsPurchaseSuccess] = useState(false)
  const fileInputRef = useRef(null)
  const videoInputRef = useRef(null)
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    title: "",
    category: [],
    subCategory: [],
    description: "",
    websiteUrl: "",
    images: [],
    videos: [],
    useType: "",
    deployment: "",
    training: "",
    support: "",
    languages: [],
    packages: {
      monthly: {
        price: "",
        provides: ["", "", ""],
      },
      yearly: {
        price: "",
        provides: ["", "", ""],
      },
      oneTime: {
        price: "",
        provides: ["", "", ""],
      },
    },
  })

  const categories = ["Development", "Business", "Design", "Marketing", "Education"]
  const subCategories = {
    Development: ["Web Development", "Mobile Development", "Desktop Development"],
    Business: ["ERP", "CRM", "Accounting"],
    Design: ["Graphic Tools", "UI/UX Software"],
    Marketing: ["SEO Tools", "Analytics"],
    Education: ["E-Learning", "Course Management"],
  }

  const useTypes = ["Business", "Personal", "Enterprise"]
  const deployments = ["Cloud, SAAS", "On-Premise", "Hybrid"]
  const trainings = ["Documentation", "Video Tutorials", "Live Training"]
  const supports = ["24/7 Online", "Email Support", "Phone Support"]
  const languages = ["English", "Japanese", "Spanish", "French", "German"]

  const subscriptionPlans = {
    Monthly: {
      Basic: 13,
      Standard: 31,
      Premium: 45,
    },
    Yearly: {
      Basic: Math.round(13 * 12 * 0.8),
      Standard: Math.round(31 * 12 * 0.8),
      Premium: Math.round(45 * 12 * 0.8),
    },
  }

  const packageLimits = {
    Basic: { categories: 1, images: 5, videos: 0 },
    Standard: { categories: 5, images: 10, videos: 0 },
    Premium: { categories: 20, images: 20, videos: 3 }
  }

  // Validation functions
  const validateEmail = (url) => {
    return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(url) || url === ""
  }

  const validateText = (text) => {
    return /^[a-zA-Z\s]+$/.test(text) || text === ""
  }

  const validateNumber = (num) => {
    return /^\d+(\.\d{1,2})?$/.test(num) || num === ""
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    let newErrors = { ...errors }

    switch (name) {
      case "title":
        if (!validateText(value)) {
          newErrors.title = "Title should contain only letters and spaces"
        } else {
          delete newErrors.title
        }
        break
      case "description":
        if (value.length > 1000) {
          newErrors.description = "Description cannot exceed 1000 characters"
        } else {
          delete newErrors.description
        }
        break
      case "websiteUrl":
        if (!validateEmail(value)) {
          newErrors.websiteUrl = "Please enter a valid URL"
        } else {
          delete newErrors.websiteUrl
        }
        break
    }

    setErrors(newErrors)
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handlePackageInputChange = (e, packageType) => {
    const { name, value } = e.target
    let newErrors = { ...errors }

    if (name === "price") {
      if (!validateNumber(value) || value === "" || value === "0" || value === "0.00" | value === "0.0" ) {
        newErrors[`${packageType}.price`] = "Price must be a valid number"
      } else {
        delete newErrors[`${packageType}.price`]
      }
    }

    setErrors(newErrors)
    setFormData({
      ...formData,
      packages: {
        ...formData.packages,
        [packageType]: {
          ...formData.packages[packageType],
          [name]: value,
        },
      },
    })
  }

  const handleProvideChange = (index, value, packageType) => {
    let newErrors = { ...errors }
    if (!validateText(value)) {
    } else {
      delete newErrors[`${packageType}.provides.${index}`]
    }

    setErrors(newErrors)
    const newProvides = [...formData.packages[packageType].provides]
    newProvides[index] = value
    setFormData({
      ...formData,
      packages: {
        ...formData.packages,
        [packageType]: {
          ...formData.packages[packageType],
          provides: newProvides,
        },
      },
    })
  }

  const addMoreProvide = (packageType) => {
    if (formData.packages[packageType].provides.length < 8) {
      setFormData({
        ...formData,
        packages: {
          ...formData.packages,
          [packageType]: {
            ...formData.packages[packageType],
            provides: [...formData.packages[packageType].provides, ""],
          },
        },
      })
    } else {
      toast.error("Maximum 8 features allowed per package")
    }
  }

  const removeProvide = (index, packageType) => {
    const newProvides = [...formData.packages[packageType].provides]
    newProvides.splice(index, 1)
    setFormData({
      ...formData,
      packages: {
        ...formData.packages,
        [packageType]: {
          ...formData.packages[packageType],
          provides: newProvides,
        },
      },
    })
  }

  const handleCategoryChange = (values) => {
    setFormData({
      ...formData,
      category: values,
      subCategory: [],
    })
    if (values.length > 0) {
      setErrors({ ...errors, category: "" })
    }
  }

  const handleSubCategoryChange = (values) => {
    setFormData({
      ...formData,
      subCategory: values,
    })
    if (values.length > 0) {
      setErrors({ ...errors, subCategory: "" })
    }
  }

  const handleLanguagesChange = (values) => {
    setFormData({
      ...formData,
      languages: values,
    })
    if (values.length > 0) {
      setErrors({ ...errors, languages: "" })
    }
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const maxImages = packageLimits[selectedSubscription].images
    if (formData.images.length + files.length <= maxImages) {
      setFormData({
        ...formData,
        images: [...formData.images, ...files],
      })
      toast.success(`${files.length} image(s) uploaded successfully`)
    } else {
      toast.error(`Maximum ${maxImages} images allowed for ${selectedSubscription} subscription`)
    }
  }

  const handleVideoUpload = (e) => {
    const files = Array.from(e.target.files)
    const maxVideos = packageLimits[selectedSubscription].videos
    const validVideos = files.filter(file => {
      const isValidType = ['video/mp4', 'video/webm'].includes(file.type)
      const isValidSize = file.size <= 100 * 1024 * 1024 // 100MB limit
      return isValidType && isValidSize
    })

    if (formData.videos.length + validVideos.length <= maxVideos) {
      setFormData({
        ...formData,
        videos: [...formData.videos, ...validVideos],
      })
      toast.success(`${validVideos.length} video(s) uploaded successfully`)
    } else {
      toast.error(`Maximum ${maxVideos} videos allowed for ${selectedSubscription} subscription`)
    }
  }

  const removeImage = (index) => {
    const newImages = [...formData.images]
    newImages.splice(index, 1)
    setFormData({
      ...formData,
      images: newImages,
    })
    toast.success("Image removed successfully")
  }

  const removeVideo = (index) => {
    const newVideos = [...formData.videos]
    newVideos.splice(index, 1)
    setFormData({
      ...formData,
      videos: newVideos,
    })
    toast.success("Video removed successfully")
  }

  const togglePackage = (packageName) => {
    if (!enabledPackages[packageName] || Object.values(enabledPackages).filter((value) => value).length > 1) {
      const newEnabledPackages = {
        ...enabledPackages,
        [packageName]: !enabledPackages[packageName],
      }
      setEnabledPackages(newEnabledPackages)

      if (packageName === currentPackage && enabledPackages[packageName]) {
        const nextEnabledPackage = Object.keys(newEnabledPackages).find((pkg) => newEnabledPackages[pkg])
        if (nextEnabledPackage) {
          setCurrentPackage(nextEnabledPackage)
        }
      }
      toast.success(`${packageName} package ${newEnabledPackages[packageName] ? "enabled" : "disabled"}`)
    } else {
      toast.error("At least one package must remain enabled")
    }
  }

  const validatePackageData = (packageData) => {
    const requiredFields = ["price"]
    return (
      requiredFields.every((field) => packageData[field]?.trim()) && 
      packageData.provides.some((item) => item.trim())
    )
  }

  const validateStep = () => {
    let newErrors = {};
  
    if (currentStep === 2) {
      if (!formData.title.trim()) newErrors.title = "Title is required";
      if (formData.category.length === 0) newErrors.category = "At least one category is required";
      if (formData.subCategory.length === 0) newErrors.subCategory = "At least one sub-category is required";
      if (!formData.description.trim()) newErrors.description = "Description is required";
      if (formData.languages.length === 0) newErrors.languages = "At least one language is required";
    } else if (currentStep === 3) {
      const packageKeys = {
        Monthly: "monthly",
        Yearly: "yearly",
        "One Time": "oneTime",
      };
      Object.keys(enabledPackages).forEach((pkg) => {
        if (enabledPackages[pkg]) {
          const packageData = formData.packages[packageKeys[pkg]];
          if (!packageData.price.trim()) {
            newErrors[`${packageKeys[pkg]}.price`] = "Price is required";
          }
          if (!packageData.provides.every((item) => item.trim())) {
            newErrors[`${packageKeys[pkg]}.provides`] = "All features are required";
          }
        }
      });
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        setIsPurchaseSuccess(true)
        toast.success("Subscription purchased successfully!")
        setTimeout(() => {
          setIsPurchaseSuccess(false)
          setCurrentStep(2)
          window.scrollTo(0, 0)
        }, 2000)
      }, 2000)
    } else if (currentStep === 2) {
      if (validateStep()) {
        setCurrentStep(3)
        window.scrollTo(0, 0)
      } else {
        toast.error("Please fill all required fields correctly")
      }
    } else if (currentStep === 3) {
      if (validateStep()) {
        setCurrentStep(4)
        window.scrollTo(0, 0)
      } else {
        toast.error("Please complete all required fields for enabled packages")
      }
    } else {
      console.log("Form submitted:", formData)
      toast.success("Software posted successfully!")
      router.back()
      window.scrollTo(0, 0)
    }
  }

  const handleBack = () => {
    if (currentStep === 2) setCurrentStep(1)
    else if (currentStep === 3) setCurrentStep(2)
    else if (currentStep === 4) setCurrentStep(3)
    setErrors({})
    window.scrollTo(0, 0)
  }

  const renderStep1 = () => {
    const tabs = [
      { id: "Monthly", label: "Monthly" },
      { id: "Yearly", label: "Yearly" },
    ]

    return (
      <div className="space-y-4">
        <h2 className="typoH2 text-center text-text">Subscribe Now</h2>
        <p className="text-textLight text-center">To post a software product, you need to purchase one of the subscription</p>
        <div className="justify-center mb-6 w-[400px] mx-auto">
          <Tabs
            tabs={tabs}
            defaultTab={billingType}
            onTabChange={(tabId) => setBillingType(tabId)}
          />
        </div>
        <p className="text-textLight text-sm bg-secondary border border-blue-300 rounded-[20px] p-4">
          ℹ️ When you purchase a subscription plan (Basic, Standard, or Premium), it applies to a single software product listing. If you want to list multiple software products, you need to buy a separate subscription for each one.
        </p>
        <div className="grid grid-cols-3 gap-6">
          {/* Basic Tier */}
          <div className="rounded-[20px] border border-primary p-8 relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="typoH2 text-primary">Basic</h2>
            </div>
            <p className="text-textLight mb-6 typoB3">
              List services, connect with buyers, and access basic features with standard fees.
            </p>
            <div className="mb-6">
              <span className="typoH1 text-primary">
                ${billingType === "Monthly" ? subscriptionPlans.Monthly.Basic : subscriptionPlans.Yearly.Basic}
              </span>
              <span className="typoB3 text-textLight">
                /{billingType === "Monthly" ? "Month (billed annually)" : "Year"}
              </span>
            </div>
            <button
              onClick={() => {
                setSelectedSubscription("Basic")
                handleNext()
              }}
              className="btn btnMedium btnPrimary w-full mb-6"
              disabled={isLoading}
            >
              {isLoading && selectedSubscription === "Basic" ? (
                <Loader2 className="animate-spin mr-2" size={16} />
              ) : isPurchaseSuccess && selectedSubscription === "Basic" ? (
                <Check className="mr-2" size={16} />
              ) : (
                "Upgrade and Post"
              )}
              {isPurchaseSuccess && selectedSubscription === "Basic" && " Purchased!"}
            </button>
            <div className="mb-6">
              <h3 className="typoB4 text-textLight mb-2">Features</h3>
              <p className="typoB3 text-textLight mb-4">Everything in the plan includes</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mr-3">
                  <Check size={14} color="white" />
                </div>
                <span className="typoB3">Listing in 1 category</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mr-3">
                  <Check size={14} color="white" />
                </div>
                <span className="typoB3">Up to 5 software pictures</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mr-3">
                  <Check size={14} color="white" />
                </div>
                <span className="typoB3">Unlimited clicks</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                  <X size={14} color="white" />
                </div>
                <span className="typoB3 text-gray-400">Profile View Report</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                  <X size={14} color="white" />
                </div>
                <span className="typoB3 text-gray-400">Priority Display</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                  <X size={14} color="white" />
                </div>
                <span className="typoB3 text-gray-400">Short Videos</span>
              </div>
            </div>
          </div>

          {/* Standard Tier */}
          <div className="rounded-[20px] border border-primary p-8 relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="bg-gradient-to-r from-primary via-software to-course bg-clip-text text-transparent typoH2">Standard</h2>
              <div className="rounded-full bg-secondary text-primary text-xs px-3 py-1 font-medium">
                popular
              </div>
            </div>
            <p className="text-textLight mb-6 typoB3">
              List services, connect with buyers, and access basic features with standard fees.
            </p>
            <div className="mb-6">
              <span className="typoH1 text-primary">
                ${billingType === "Monthly" ? subscriptionPlans.Monthly.Standard : subscriptionPlans.Yearly.Standard}
              </span>
              <span className="typoB3 text-textLight">
                /{billingType === "Monthly" ? "Month (billed annually)" : "Year"}
              </span>
            </div>
            <button
              onClick={() => {
                setSelectedSubscription("Standard")
                handleNext()
              }}
              className="btn btnMedium btnPrimary w-full mb-6"
              disabled={isLoading}
            >
              {isLoading && selectedSubscription === "Standard" ? (
                <Loader2 className="animate-spin mr-2" size={16} />
              ) : isPurchaseSuccess && selectedSubscription === "Standard" ? (
                <Check className="mr-2" size={16} />
              ) : (
                "Upgrade and Post"
              )}
              {isPurchaseSuccess && selectedSubscription === "Standard" && " Purchased!"}
            </button>
            <div className="mb-6">
              <h3 className="typoB4 text-textLight mb-2">Features</h3>
              <p className="typoB3 text-textLight mb-4">Everything in the plan includes</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mr-3">
                  <Check size={14} color="white" />
                </div>
                <span className="typoB3">Listing in 5 categories</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mr-3">
                  <Check size={14} color="white" />
                </div>
                <span className="typoB3">Up to 10 software pictures</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mr-3">
                  <Check size={14} color="white" />
                </div>
                <span className="typoB3">Unlimited clicks</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mr-3">
                  <Check size={14} color="white" />
                </div>
                <span className="typoB3">Profile View Report</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mr-3">
                  <Check size={14} color="white" />
                </div>
                <span className="typoB3">Priority Display</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                  <X size={14} color="white" />
                </div>
                <span className="typoB3 text-gray-400">Short Videos</span>
              </div>
            </div>
          </div>

          {/* Premium Tier */}
          <div className="rounded-[20px] border border-primary p-8 relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="bg-gradient-to-r from-primary via-software to-course bg-clip-text text-transparent typoH2">Premium</h2>
            </div>
            <p className="text-textLight mb-6 typoB3">
              List services, connect with buyers, and access premium features including video uploads.
            </p>
            <div className="mb-6">
              <span className="typoH1 text-primary">
                ${billingType === "Monthly" ? subscriptionPlans.Monthly.Premium : subscriptionPlans.Yearly.Premium}
              </span>
              <span className="typoB3 text-textLight">
                /{billingType === "Monthly" ? "Month (billed annually)" : "Year"}
              </span>
            </div>
            <button
              onClick={() => {
                setSelectedSubscription("Premium")
                handleNext()
              }}
              className="btn btnMedium btnPrimary w-full mb-6"
              disabled={isLoading}
            >
              {isLoading && selectedSubscription === "Premium" ? (
                <Loader2 className="animate-spin mr-2" size={16} />
              ) : isPurchaseSuccess && selectedSubscription === "Premium" ? (
                <Check className="mr-2" size={16} />
              ) : (
                "Upgrade and Post"
              )}
              {isPurchaseSuccess && selectedSubscription === "Premium" && " Purchased!"}
            </button>
            <div className="mb-6">
              <h3 className="typoB4 text-textLight mb-2">Features</h3>
              <p className="typoB3 text-textLight mb-4">Everything in the plan includes</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mr-3">
                  <Check size={14} color="white" />
                </div>
                <span className="typoB3">Listing in 20 categories</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mr-3">
                  <Check size={14} color="white" />
                </div>
                <span className="typoB3">Up to 20 software pictures</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mr-3">
                  <Check size={14} color="white" />
                </div>
                <span className="typoB3">Up to 3 short videos</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mr-3">
                  <Check size={14} color="white" />
                </div>
                <span className="typoB3">Unlimited clicks</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mr-3">
                  <Check size={14} color="white" />
                </div>
                <span className="typoB3">Profile View Report</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mr-3">
                  <Check size={14} color="white" />
                </div>
                <span className="typoB3">Top Priority Display</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderStep2 = () => {
    return (
      <div className="space-y-8">
        <h2 className="typoH2 text-center text-text">Software Information</h2>
        <div>
          <label htmlFor="title" className="formLabel block mb-3">
            Title <span className="text-failure">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="What is the title of your service"
            className={`formInput ${errors.title ? "border-red-500" : ""}`}
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>
        <div>
          <label htmlFor="category" className="formLabel block mb-3">
            Category <span className="text-failure">*</span>
          </label>
          <MultiSelectDropdown
            options={categories}
            selectedValues={formData.category}
            onChange={handleCategoryChange}
            placeholder="Select categories"
            maxSelections={packageLimits[selectedSubscription].categories}
            className={errors.category ? "border-red-500" : ""}
          />
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>
        <div>
          <label htmlFor="subCategory" className="formLabel block mb-3">
            Sub Category <span className="text-failure">*</span>
          </label>
          <MultiSelectDropdown
            options={formData.category.length > 0 ? subCategories[formData.category[0]] : []}
            selectedValues={formData.subCategory}
            onChange={handleSubCategoryChange}
            placeholder="Select sub-categories"
            maxSelections={packageLimits[selectedSubscription].categories}
            className={errors.subCategory ? "border-red-500" : ""}
          />
          {errors.subCategory && <p className="text-red-500 text-sm mt-1">{errors.subCategory}</p>}
        </div>
        <div>
          <label htmlFor="description" className="formLabel block mb-3">
            Description <span className="text-failure">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Write the details of your requirement"
            className={`formTextarea h-32 ${errors.description ? "border-red-500" : ""}`}
            value={formData.description}
            onChange={handleInputChange}
            required
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>
        <div>
          <label htmlFor="websiteUrl" className="formLabel block mb-3">
            Website URL
          </label>
          <input
            type="url"
            id="websiteUrl"
            name="websiteUrl"
            placeholder="Enter the website URL (e.g., https://example.com)"
            className={`formInput ${errors.websiteUrl ? "border-red-500" : ""}`}
            value={formData.websiteUrl}
            onChange={handleInputChange}
          />
          {errors.websiteUrl && <p className="text-red-500 text-sm mt-1">{errors.websiteUrl}</p>}
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="formLabel block mb-3">Use type</label>
            <Dropdown
              options={useTypes}
              defaultValue={formData.useType || "Select Use Type"}
              onChange={(value) => setFormData({ ...formData, useType: value })}
            />
          </div>
          <div>
            <label className="formLabel block mb-3">Deployment</label>
            <Dropdown
              options={deployments}
              defaultValue={formData.deployment || "Select Deployment"}
              onChange={(value) => setFormData({ ...formData, deployment: value })}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="formLabel block mb-3">Training</label>
            <Dropdown
              options={trainings}
              defaultValue={formData.training || "Select Training"}
              onChange={(value) => setFormData({ ...formData, training: value })}
            />
          </div>
          <div>
            <label className="formLabel block mb-3">Support</label>
            <Dropdown
              options={supports}
              defaultValue={formData.support || "Select Support"}
              onChange={(value) => setFormData({ ...formData, support: value })}
            />
          </div>
        </div>
        <div>
          <label className="formLabel block mb-3">
            Available in Languages <span className="text-failure">*</span>
          </label>
          <MultiSelectDropdown
            options={languages}
            selectedValues={formData.languages}
            onChange={handleLanguagesChange}
            placeholder="Select languages"
            className={errors.languages ? "border-red-500" : ""}
          />
          {errors.languages && <p className="text-red-500 text-sm mt-1">{errors.languages}</p>}
        </div>
        <div>
          <label className="formLabel block mb-3">Upload Pictures</label>
          <div
            className="bg-[#F5F5F6] border border-dashed border-inputBorder rounded-[20px] p-8 flex flex-col items-center justify-center cursor-pointer max-w-[400px] h-[200px]"
            onClick={() => fileInputRef.current.click()}
          >
            <div className="w-16 h-16 bg-gray-200 rounded-[20px] flex items-center justify-center mb-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                  stroke="#767B7F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M14 2V8H20" stroke="#767B7F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-textLight text-sm">Click to Upload or Drag and Drop Files</p>
            <input
              ref={fileInputRef}
              id="fileUpload"
              type="file"
              multiple
              className="hidden"
              onChange={handleImageUpload}
              accept="image/*"
            />
          </div>
          {formData.images.length > 0 && (
            <div className="mt-4">
              <button
                type="button"
                onClick={() => setShowGallery(true)}
                className="text-primary text-sm flex items-center"
              >
                <ChevronDown className="w-4 h-4 mr-1" /> View {formData.images.length} uploaded images
              </button>
            </div>
          )}
        </div>
        {selectedSubscription === "Premium" && (
          <div>
            <label className="formLabel block mb-3">Upload Short Videos Max 3, MP4/WebM, 100M</label>
            <div
              className="bg-[#F5F5F6] border border-dashed border-inputBorder rounded-[20px] p-8 flex flex-col items-center justify-center cursor-pointer max-w-[400px] h-[200px]"
              onClick={() => videoInputRef.current.click()}
            >
              <div className="w-16 h-16 bg-gray-200 rounded-[20px] flex items-center justify-center mb-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M21 15V9C21 7.89543 20.1046 7 19 7H5C3.89543 7 3 7.89543 3 9V15C3 16.1046 3.89543 17 5 17H19C20.1046 17 21 16.1046 21 15Z"
                    stroke="#767B7F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 10L14 12L10 14V10Z"
                    stroke="#767B7F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="text-textLight text-sm">Click to Upload or Drag and Drop Videos</p>
              <input
                ref={videoInputRef}
                id="videoUpload"
                type="file"
                multiple
                className="hidden"
                onChange={handleVideoUpload}
                accept="video/mp4,video/webm"
              />
            </div>
            {formData.videos.length > 0 && (
              <div className="mt-4">
                <p className="text-primary text-sm">{formData.videos.length} videos uploaded</p>
                <ul className="mt-2 space-y-2">
                  {formData.videos.map((video, index) => (
                    <li key={index} className="flex items-center justify-between">
                      <span className="text-sm text-textLight">{video.name}</span>
                      <button
                        type="button"
                        onClick={() => removeVideo(index)}
                        className="text-failure hover:text-red-700"
                      >
                        <X size={18} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        <div className="flex justify-between pt-6">
          <button type="button" onClick={handleBack} className="btn btnMedium btnDefault">
            Back
          </button>
          <button type="button" onClick={handleNext} className="btn btnMedium btnDark">
            Next
          </button>
        </div>
      </div>
    )
  }

  const PackageToggle = ({ packageName }) => (
    <div className="flex items-center">
      <div
        onClick={() => togglePackage(packageName)}
        className={`w-12 h-6 rounded-full p-1 flex items-center cursor-pointer transition-colors duration-200 ${enabledPackages[packageName] ? "bg-primary" : "bg-gray-300"}`}
      >
        <div
          className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-200 ${enabledPackages[packageName] ? "translate-x-6" : "translate-x-0"}`}
        ></div>
      </div>
      <span className="ml-2 typoC2 text-textLight">{enabledPackages[packageName] ? "Enabled" : "Disabled"}</span>
    </div>
  )

  const renderStep3 = () => {
    const packageKeys = {
      Monthly: "monthly",
      Yearly: "yearly",
      "One Time": "oneTime",
    }

    return (
      <div className="space-y-8">
        <h2 className="typoH2 text-center text-text">Package Configuration</h2>
        <div className="grid grid-cols-3 gap-6">
          {Object.keys(enabledPackages).map((packageName) => (
            <div
              key={packageName}
              className={`bg-white border border-border rounded-[20px] p-6 transition-all duration-300 relative ${
                enabledPackages[packageName] ? "shadow-sm" : "bg-whiteGrey opacity-70"
              } ${currentPackage === packageName && enabledPackages[packageName] ? "ring-2 ring-primary/20" : ""}`}
            >
              <div className="absolute top-4 right-4">
                <PackageToggle packageName={packageName} />
              </div>
              <div className={`mb-4 ${enabledPackages[packageName] ? "text-primary" : "text-textLight"}`}>
                <Book size={24} />
              </div>
              <h3 className={`typoS1 mb-3 ${!enabledPackages[packageName] && "text-textLight"}`}>{packageName}</h3>
              <div className={`typoB3 ${!enabledPackages[packageName] && "text-textLight"}`}>
                <p className="mb-2">
                  Price: {formData.packages[packageKeys[packageName]]?.price ? `$${formData.packages[packageKeys[packageName]].price}` : "Not set"}
                </p>
              </div>
              <button
                onClick={() => enabledPackages[packageName] && setCurrentPackage(packageName)}
                disabled={!enabledPackages[packageName]}
                className={`btn btnSmall w-full mt-4 flex items-center justify-center ${
                  enabledPackages[packageName]
                    ? currentPackage === packageName
                      ? "btnPrimary"
                      : "btnDefault"
                    : "bg-btnbg text-textLight cursor-not-allowed"
                }`}
              >
                <Settings size={14} className="mr-1" />
                {currentPackage === packageName ? "Currently Editing" : "Edit Details"}
              </button>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-[20px] border border-border p-8 shadow-sm">
          <h2 className="typoS1 mb-6 flex items-center text-text">
            <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-2">
              <Settings size={16} />
            </span>
            Editing {currentPackage} Package
          </h2>
          {enabledPackages[currentPackage] ? (
            <div className="space-y-6">
              <div>
                <label className="formLabel block mb-3">
                  Price <span className="text-failure">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="price"
                    placeholder="Enter price in USD"
                    className={`formInput pr-16 ${errors[`${packageKeys[currentPackage]}.price`] ? "border-red-500" : ""}`}
                    value={formData.packages[packageKeys[currentPackage]]?.price || ""}
                    onChange={(e) => handlePackageInputChange(e, packageKeys[currentPackage])}
                    required
                  />
                  <div className="absolute right-0 top-0 bottom-0 flex items-center px-6 text-textLight typoB3">
                    USD
                  </div>
                </div>
                {errors[`${packageKeys[currentPackage]}.price`] && (
                  <p className="text-red-500 text-sm mt-1">{errors[`${packageKeys[currentPackage]}.price`]}</p>
                )}
              </div>
              <div>
                <label className="formLabel block mb-3">
                  What Features Will You Provide <span className="text-failure">*</span>
                </label>
                {formData.packages[packageKeys[currentPackage]]?.provides.map((item, index) => (
                  <div key={index} className="flex items-center mb-3">
                    <div className="w-6 h-6 rounded-full bg-btnbg flex items-center justify-center mr-2 typoC2 text-textLight">
                      {index + 1}
                    </div>
                    <input
                      type="text"
                      placeholder={
                        index === 0
                          ? "e.g. One complete Logo Design Concept"
                          : index === 1
                          ? "e.g. High resolution PNGs"
                          : "e.g. Editable SVGs"
                      }
                      className={`formInput flex-1 ${errors[`${packageKeys[currentPackage]}.provides.${index}`] ? "border-red-500" : ""}`}
                      value={item}
                      onChange={(e) => handleProvideChange(index, e.target.value, packageKeys[currentPackage])}
                    />
                    {index > 2 && (
                      <button
                        type="button"
                        onClick={() => removeProvide(index, packageKeys[currentPackage])}
                        className="ml-2 text-textLight hover:text-failure"
                      >
                        <X size={18} />
                      </button>
                    )}
                    {errors[`${packageKeys[currentPackage]}.provides.${index}`] && (
                      <p className="text-red-500 text-sm mt-1">{errors[`${packageKeys[currentPackage]}.provides.${index}`]}</p>
                    )}
                  </div>
                ))}
                {errors[`${packageKeys[currentPackage]}.provides`] && (
                  <p className="text-red-500 text-sm mt-1">{errors[`${packageKeys[currentPackage]}.provides`]}</p>
                )}
                {formData.packages[packageKeys[currentPackage]]?.provides.length < 8 && (
                  <button
                    type="button"
                    onClick={() => addMoreProvide(packageKeys[currentPackage])}
                    className="btn btnSmall btnDefault mt-2 flex items-center"
                  >
                    <Plus size={14} className="mr-1" /> Add More
                  </button>
                )}
                {formData.packages[packageKeys[currentPackage]]?.provides.length >= 8 && (
                  <p className="typoC1 text-textLight mt-2">Maximum 8 items allowed</p>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 bg-whiteGrey rounded-[20px] border border-dashed border-inputBorder">
              <div className="text-textLight mb-4">
                <X size={40} className="mx-auto" />
              </div>
              <p className="typoB3 text-textLight text-center mb-4">This package is currently disabled</p>
              <button
                onClick={() => togglePackage(currentPackage)}
                className="btn btnMedium btnPrimary flex items-center"
              >
                <Check size={16} className="mr-1" /> Enable package
              </button>
            </div>
          )}
          <div className="flex justify-between pt-6 mt-8 border-t border-border">
            <button type="button" onClick={handleBack} className="btn btnMedium btnDefault">
              Back
            </button>
            <button type="button" onClick={handleNext} className="btn btnMedium btnDark">
              Next
            </button>
          </div>
        </div>
      </div>
    )
  }

  const renderStep4 = () => {
    const packageKeys = {
      Monthly: "monthly",
      Yearly: "yearly",
      "One Time": "oneTime",
    }

    return (
      <div className="space-y-8">
        <h2 className="typoH2 text-center text-text">Confirm Post</h2>
        <div className="bg-whiteGrey p-6 rounded-[20px]">
          <h3 className="typoS1 mb-4 text-text">Software Details</h3>
          <div className="space-y-3">
            <div>
              <span className="text-textLight typoB3">Title:</span>
              <p className="typoB3">{formData.title || "Not provided"}</p>
            </div>
            <div>
              <span className="text-textLight typoB3">Category:</span>
              <p className="typoB3">{formData.category.join(", ") || "Not provided"}</p>
            </div>
            <div>
              <span className="text-textLight typoB3">Sub Category:</span>
              <p className="typoB3">{formData.subCategory.join(", ") || "Not provided"}</p>
            </div>
            <div>
              <span className="text-textLight typoB3">Description:</span>
              <p className="typoB3">{formData.description || "Not provided"}</p>
            </div>
            <div>
              <span className="text-textLight typoB3">Website URL:</span>
              <p className="typoB3">{formData.websiteUrl || "Not provided"}</p>
            </div>
            <div>
              <span className="text-textLight typoB3">Use Type:</span>
              <p className="typoB3">{formData.useType || "Not provided"}</p>
            </div>
            <div>
              <span className="text-textLight typoB3">Deployment:</span>
              <p className="typoB3">{formData.deployment || "Not provided"}</p>
            </div>
            <div>
              <span className="text-textLight typoB3">Training:</span>
              <p className="typoB3">{formData.training || "Not provided"}</p>
            </div>
            <div>
              <span className="text-textLight typoB3">Support:</span>
              <p className="typoB3">{formData.support || "Not provided"}</p>
            </div>
            <div>
              <span className="text-textLight typoB3">Languages:</span>
              <p className="typoB3">{formData.languages.join(", ") || "Not provided"}</p>
            </div>
            <div>
              <span className="text-textLight typoB3">Images:</span>
              <p className="typoB3">{formData.images.length} images uploaded</p>
            </div>
            {selectedSubscription === "Premium" && (
              <div>
                <span className="text-textLight typoB3">Videos:</span>
                <p className="typoB3">{formData.videos.length} videos uploaded</p>
                {formData.videos.length > 0 && (
                  <ul className="mt-2 space-y-2">
                    {formData.videos.map((video, index) => (
                      <li key={index} className="text-sm text-text">{video.name}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
            <div>
              <span className="text-textLight typoB3">Subscription Plan:</span>
              <p className="typoB3">{selectedSubscription || "Not provided"}</p>
            </div>
          </div>
        </div>
        <div className="bg-whiteGrey p-6 rounded-[20px]">
          <h3 className="typoS1 mb-4 text-text">Packages</h3>
          <div className="space-y-4">
            {Object.keys(enabledPackages).map((packageName) => {
              if (!enabledPackages[packageName]) return null
              const packageData = formData.packages[packageKeys[packageName]]
              return (
                <div key={packageName} className="border-b border-border pb-4 last:border-0 last:pb-0">
                  <h4 className="typoB2 text-primary mb-2">{packageName}</h4>
                  <div className="grid grid-cols-2 gap-2 typoB3">
                    <div>
                      <span className="text-textLight">Price:</span>
                      <p>{packageData?.price ? `$${packageData.price} USD` : "Not provided"}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-textLight">Provides:</span>
                      <ul className="list-disc pl-5 mt-1">
                        {packageData?.provides
                          .filter((item) => item)
                          .map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="flex justify-between pt-6">
          <button type="button" onClick={handleBack} className="btn btnMedium btnDefault">
            Back
          </button>
          <button type="button" onClick={handleNext} className="btn btnMedium btnDark">
            Confirm Post
          </button>
        </div>
      </div>
    )
  }

  const renderSteppers = () => {
    return (
      <div className="flex justify-center mb-12">
        <div className="flex items-center">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  currentStep >= index + 1 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                {String(index + 1).padStart(2, "0")}
              </div>
              {index < 3 && (
                <div className="relative w-32">
                  <div className="absolute top-1/2 transform -translate-y-1/2 h-px w-full bg-gray-200"></div>
                  {currentStep > index + 1 && (
                    <div
                      className="absolute top-1/2 transform -translate-y-1/2 h-px bg-primary"
                      style={{ width: "100%" }}
                    ></div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F5F5F6] py-10">
      <div className="max-w-[1240px] mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="typoH1 mb-2 text-[#3F3F3F]">Post A Software</h1>
          <p className="text-textLight">Showcase your software and connect with users!</p>
        </div>
        {renderSteppers()}
        <div>
          <div className="bg-white rounded-[20px] shadow-sm px-[80px] py-[50px] border border-border">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
          </div>
        </div>
        {showGallery && (
          <ImageGallery images={formData.images} onClose={() => setShowGallery(false)} onRemove={removeImage} />
        )}
      </div>
    </div>
  )
}