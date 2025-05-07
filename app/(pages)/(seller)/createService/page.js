"use client"
import { useState, useRef } from "react"
import { Plus, X, ChevronDown, Edit, Trash2, Check, Package, Settings } from "lucide-react"
import { Dropdown } from "@/components/utils/dropdown"
import ImageGallery from "./components/createServiceComponents"
import { useRouter } from "next/navigation"
import { useToast } from "@/context/toastContext"

export default function CreateService() {
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [currentPackage, setCurrentPackage] = useState("Simple")
  const [showGallery, setShowGallery] = useState(false)
  const [enabledPackages, setEnabledPackages] = useState({
    Simple: true,
    Standard: true,
    Complex: true
  })
  const [questions, setQuestions] = useState([
    { question: "What are the initial requirements for the logo ?" },
    { question: "Is there anything related to branding that I should keep in mind ?" },
  ])
  const [newQuestion, setNewQuestion] = useState("")
  const [editingQuestionIndex, setEditingQuestionIndex] = useState(null)
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    subCategory: "",
    description: "",
    images: [],
    packages: {
      Simple: {
        name: "",
        revisions: "",
        deliveryDays: "",
        maxExtension: "",
        price: "",
        provides: ["", "", ""],
      },
      Standard: {
        name: "",
        revisions: "",
        deliveryDays: "",
        maxExtension: "",
        price: "",
        provides: ["", "", ""],
      },
      Complex: {
        name: "",
        revisions: "",
        deliveryDays: "",
        maxExtension: "",
        price: "",
        provides: ["", "", ""],
      },
    },
  })

  const fileInputRef = useRef(null)

  const categories = ["Design", "Development", "Marketing", "Writing", "Video & Animation", "Music & Audio"]
  const subCategories = {
    Design: ["Logo Design", "Web Design", "App Design", "UX/UI Design"],
    Development: ["Web Development", "App Development", "WordPress", "E-commerce"],
    Marketing: ["Social Media", "SEO", "Content Marketing", "Email Marketing"],
    Writing: ["Articles & Blog Posts", "Website Content", "Creative Writing", "Technical Writing"],
    "Video & Animation": ["Video Editing", "Animation", "Motion Graphics", "Intros & Outros"],
    "Music & Audio": ["Voice Over", "Mixing & Mastering", "Sound Effects", "Music Composition"],
  }

  // Validation functions
  const validateText = (text) => {
    return /^[a-zA-Z\s]+$/.test(text) || text === ""
  }

  const validateInteger = (num) => {
    return /^\d+$/.test(num) || num === ""
  }

  const validatePackageData = (packageData) => {
    const requiredFields = ['name', 'revisions', 'deliveryDays', 'price']
    return requiredFields.every(field => packageData[field]?.trim()) && 
           packageData.provides.some(item => item.trim())
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

    switch (name) {
      case "name":
        if (!validateText(value)) {
          newErrors[`${packageType}.name`] = "Package name should contain only letters and spaces"
        } else {
          delete newErrors[`${packageType}.name`]
        }
        break
      case "revisions":
      case "deliveryDays":
      case "maxExtension":
        if (!validateInteger(value)) {
          newErrors[`${packageType}.${name}`] = "Please enter a valid number"
        } else {
          delete newErrors[`${packageType}.${name}`]
        }
        break
      case "price":
        if (!/^\d+(\.\d{1,2})?$/.test(value) && value !== "" || value === "0" || value === 0 || value === "0.0" || value === "0.00") {
          newErrors[`${packageType}.price`] = "Price must be a valid number"
        } else {
          delete newErrors[`${packageType}.price`]
        }
        break
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
    toast.success("Feature removed successfully")
  }

  const handleCategoryChange = (value) => {
    setFormData({
      ...formData,
      category: value,
      subCategory: "",
    })
    if (value) {
      setErrors({ ...errors, category: "" })
    }
  }

  const handleSubCategoryChange = (value) => {
    setFormData({
      ...formData,
      subCategory: value,
    })
    if (value) {
      setErrors({ ...errors, subCategory: "" })
    }
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      setFormData({
        ...formData,
        images: [...formData.images, ...files],
      })
      toast.success(`${files.length} image(s) uploaded successfully`)
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

  const addQuestion = () => {
    if (newQuestion.trim()) {
      setQuestions([...questions, { question: newQuestion }])
      setNewQuestion("")
      toast.success("Question added successfully")
    } else {
      toast.error("Please enter a valid question")
    }
  }

  const startEditQuestion = (index) => {
    setEditingQuestionIndex(index)
    setNewQuestion(questions[index].question)
  }

  const saveEditQuestion = () => {
    if (editingQuestionIndex !== null && newQuestion.trim()) {
      const newQuestions = [...questions]
      newQuestions[editingQuestionIndex].question = newQuestion
      setQuestions(newQuestions)
      setEditingQuestionIndex(null)
      setNewQuestion("")
      toast.success("Question updated successfully")
    } else {
      toast.error("Please enter a valid question")
    }
  }

  const deleteQuestion = (index) => {
    const newQuestions = [...questions]
    newQuestions.splice(index, 1)
    setQuestions(newQuestions)
    toast.success("Question deleted successfully")
  }

  const togglePackage = (packageName) => {
    if (!enabledPackages[packageName] || Object.values(enabledPackages).filter(value => value).length > 1) {
      const newEnabledPackages = {
        ...enabledPackages,
        [packageName]: !enabledPackages[packageName]
      }
      setEnabledPackages(newEnabledPackages)
      
      if (packageName === currentPackage && enabledPackages[packageName]) {
        const nextEnabledPackage = Object.keys(newEnabledPackages).find(pkg => newEnabledPackages[pkg])
        if (nextEnabledPackage) {
          setCurrentPackage(nextEnabledPackage)
        }
      }
      toast.success(`${packageName} package ${newEnabledPackages[packageName] ? "enabled" : "disabled"}`)
    } else {
      toast.error("At least one package must remain enabled")
    }
  }

  const validateStep = () => {
    let newErrors = {}

    if (currentStep === 1) {
      if (!formData.title.trim()) newErrors.title = "Title is required"
      if (!formData.category) newErrors.category = "Category is required"
      if (!formData.subCategory) newErrors.subCategory = "Sub-category is required"
      if (!formData.description.trim()) newErrors.description = "Description is required"
    } else if (currentStep === 2) {
      Object.keys(enabledPackages).forEach((pkg) => {
        if (enabledPackages[pkg]) {
          const packageData = formData.packages[pkg]
          if (!packageData.name.trim()) newErrors[`${pkg}.name`] = "Package name is required"
          if (!packageData.revisions.trim()) newErrors[`${pkg}.revisions`] = "Revisions are required"
          if (!packageData.deliveryDays.trim()) newErrors[`${pkg}.deliveryDays`] = "Delivery days are required"
          if (!packageData.price.trim()) newErrors[`${pkg}.price`] = "Price is required"
          if (!packageData.provides.every(item => item.trim())) {
            newErrors[`${pkg}.provides`] = "All features must be filled"
          }
        }
      })
    } else if (currentStep === 3) {
      if (questions.length !== 0) {
        newErrors.questions = "At least one question is required"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep === 1) {
        setCurrentStep(2)
        window.scrollTo(0, 0)
      } else if (currentStep === 2) {
        setCurrentStep(3)
        window.scrollTo(0, 0)
      } else if (currentStep === 3) {
        setCurrentStep(4)
        window.scrollTo(0, 0)
      } else {
        console.log("Form submitted:", formData, questions, enabledPackages)
        toast.success("Service posted successfully!")
        router.back()
        window.scrollTo(0, 0)
      }
    } else {
      toast.error("Please fill all required fields correctly")
    }
  }

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1)
    } else if (currentStep === 3) {
      setCurrentStep(2)
    } else if (currentStep === 4) {
      setCurrentStep(3)
    }
    setErrors({})
    window.scrollTo(0, 0)
  }

  const renderServiceInfo = () => {
    return (
      <div className="space-y-8">
        <h2 className="typoH2 text-center text-text">Service Information</h2>
        <div>
          <label htmlFor="title" className="block mb-3 text-[15px] font-medium text-text">
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
          <label htmlFor="category" className="block mb-3 text-[15px] font-medium text-text">
            Category <span className="text-failure">*</span>
          </label>
          <Dropdown
            options={categories}
            defaultValue={formData.category || "Select Category"}
            onChange={handleCategoryChange}
            className={errors.category ? "border-red-500" : ""}
          />
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>
        <div>
          <label htmlFor="subCategory" className="block mb-3 text-[15px] font-medium text-text">
            Sub Category <span className="text-failure">*</span>
          </label>
          <Dropdown
            options={formData.category ? subCategories[formData.category] : []}
            defaultValue={formData.subCategory || "Select Sub Category"}
            onChange={handleSubCategoryChange}
            className={errors.subCategory ? "border-red-500" : ""}
          />
          {errors.subCategory && <p className="text-red-500 text-sm mt-1">{errors.subCategory}</p>}
        </div>
        <div>
          <label htmlFor="description" className="block mb-3 text-[15px] font-medium text-text">
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
          <label className="block mb-3 text-[15px] font-medium text-text">Upload Pictures</label>
          <div
            className="bg-[#F5F5F6] border border-dashed border-inputBorder rounded-[20px] p-8 flex flex-col items-center justify-center cursor-pointer max-w-[400px] h-[200px]"
            onClick={() => fileInputRef.current.click()}
          >
            <div className="w-16 h-16 bg-gray-200 rounded-[20px] flex items-center justify-center mb-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 4.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
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
        <div className="flex justify-end pt-6">
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
        className={`w-12 h-6 rounded-full p-1 flex items-center cursor-pointer transition-colors duration-200 ${enabledPackages[packageName] ? 'bg-primary' : 'bg-gray-300'}`}
      >
        <div className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-200 ${enabledPackages[packageName] ? 'translate-x-6' : 'translate-x-0'}`}></div>
      </div>
      <span className="ml-2 typoC2 text-textLight">{enabledPackages[packageName] ? 'Enabled' : 'Disabled'}</span>
    </div>
  )

  const renderPackageSelector = () => {
    return (
      <div className="space-y-8">
        <h2 className="typoH2 text-center text-text">Package Configuration</h2>
        
        <div className="grid grid-cols-3 gap-6">
          {Object.keys(enabledPackages).map(packageName => (
            <div 
              key={packageName}
              className={`bg-white border border-border rounded-[20px] p-6 transition-all duration-300 relative ${
                enabledPackages[packageName] 
                  ? 'shadow-sm' 
                  : 'bg-whiteGrey opacity-70'
              } ${
                currentPackage === packageName && enabledPackages[packageName]
                  ? 'ring-2 ring-primary/20' 
                  : ''
              }`}
            >
              <div className="absolute top-4 right-4">
                <PackageToggle packageName={packageName} />
              </div>
              
              <div className={`mb-4 ${enabledPackages[packageName] ? 'text-primary' : 'text-textLight'}`}>
                <Package size={24} />
              </div>
              
              <h3 className={`typoS1 mb-3 ${!enabledPackages[packageName] && 'text-textLight'}`}>
                {packageName}
              </h3>
              
              <div className={`typoB3 ${!enabledPackages[packageName] && 'text-textLight'}`}>
                <p className="mb-2">
                  Price: {formData.packages[packageName].price ? `$${formData.packages[packageName].price}` : 'Not set'}
                </p>
                <p className="mb-2">
                  Delivery: {formData.packages[packageName].deliveryDays || 'Not set'} days
                </p>
                <p>
                  Revisions: {formData.packages[packageName].revisions || 'Not set'}
                </p>
              </div>
              
              <button
                onClick={() => enabledPackages[packageName] && setCurrentPackage(packageName)}
                disabled={!enabledPackages[packageName]}
                className={`btn btnSmall w-full mt-4 flex items-center justify-center ${
                  enabledPackages[packageName]
                    ? currentPackage === packageName
                      ? 'btnPrimary'
                      : 'btnDefault'
                    : 'bg-btnbg text-textLight cursor-not-allowed'
                }`}
              >
                <Settings size={14} className="mr-1" />
                {currentPackage === packageName ? 'Currently Editing' : 'Edit Details'}
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
                  Name Your Package <span className="text-failure">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="What is the title of your service"
                  className={`formInput ${errors[`${currentPackage}.name`] ? "border-red-500" : ""}`}
                  value={formData.packages[currentPackage].name}
                  onChange={(e) => handlePackageInputChange(e, currentPackage)}
                  required
                />
                {errors[`${currentPackage}.name`] && (
                  <p className="text-red-500 text-sm mt-1">{errors[`${currentPackage}.name`]}</p>
                )}
              </div>
            
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="formLabel block mb-3">
                    Number of revisions <span className="text-failure">*</span>
                  </label>
                  <input
                    type="text"
                    name="revisions"
                    placeholder="e.g. 1"
                    className={`formInput ${errors[`${currentPackage}.revisions`] ? "border-red-500" : ""}`}
                    value={formData.packages[currentPackage].revisions}
                    onChange={(e) => handlePackageInputChange(e, currentPackage)}
                    required
                  />
                  {errors[`${currentPackage}.revisions`] && (
                    <p className="text-red-500 text-sm mt-1">{errors[`${currentPackage}.revisions`]}</p>
                  )}
                </div>
                <div>
                  <label className="formLabel block mb-3">
                    Delivery Days <span className="text-failure">*</span>
                  </label>
                  <input
                    type="text"
                    name="deliveryDays"
                    placeholder="e.g. 1"
                    className={`formInput ${errors[`${currentPackage}.deliveryDays`] ? "border-red-500" : ""}`}
                    value={formData.packages[currentPackage].deliveryDays}
                    onChange={(e) => handlePackageInputChange(e, currentPackage)}
                    required
                  />
                  {errors[`${currentPackage}.deliveryDays`] && (
                    <p className="text-red-500 text-sm mt-1">{errors[`${currentPackage}.deliveryDays`]}</p>
                  )}
                </div>
                <div>
                  <label className="formLabel block mb-3">
                    Max Extension Time <span className="typoC1">(in days)</span>
                  </label>
                  <input
                    type="text"
                    name="maxExtension"
                    placeholder="e.g. 1"
                    className={`formInput ${errors[`${currentPackage}.maxExtension`] ? "border-red-500" : ""}`}
                    value={formData.packages[currentPackage].maxExtension}
                    onChange={(e) => handlePackageInputChange(e, currentPackage)}
                  />
                  {errors[`${currentPackage}.maxExtension`] && (
                    <p className="text-red-500 text-sm mt-1">{errors[`${currentPackage}.maxExtension`]}</p>
                  )}
                </div>
              </div>
            
              <div>
                <label className="formLabel block mb-3">
                  Price <span className="text-failure">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="price"
                    placeholder="Enter price"
                    className={`formInput pr-16 ${errors[`${currentPackage}.price`] ? "border-red-500" : ""}`}
                    value={formData.packages[currentPackage].price}
                    onChange={(e) => handlePackageInputChange(e, currentPackage)}
                    required
                  />
                  <div className="absolute right-0 top-0 bottom-0 flex items-center px-6 text-textLight typoB3">USD</div>
                </div>
                {errors[`${currentPackage}.price`] && (
                  <p className="text-red-500 text-sm mt-1">{errors[`${currentPackage}.price`]}</p>
                )}
              </div>
            
              <div>
                <label className="formLabel block mb-3">
                  What Will You Provide <span className="text-failure">*</span>
                </label>
                {formData.packages[currentPackage].provides.map((item, index) => (
                  <div key={index} className="flex items-center mb-3">
                    <div className="w-6 h-6 rounded-full bg-btnbg flex items-center justify-center mr-2 typoC2 text-textLight">
                      {index + 1}
                    </div>
                    <input
                      type="text"
                      placeholder={`e.g. ${
                        index === 0
                          ? "One complete Logo Design Concept"
                          : index === 1
                            ? "High resolution PNGs"
                            : "Editable SVGs"
                      }`}
                      className={`formInput flex-1 ${errors[`${currentPackage}.provides.${index}`] ? "border-red-500" : ""}`}
                      value={item}
                      onChange={(e) => handleProvideChange(index, e.target.value, currentPackage)}
                    />
                    {index > 2 && (
                      <button
                        type="button"
                        onClick={() => removeProvide(index, currentPackage)}
                        className="ml-2 text-textLight hover:text-failure"
                      >
                        <X size={18} />
                      </button>
                    )}
                    {errors[`${currentPackage}.provides.${index}`] && (
                      <p className="text-red-500 text-sm mt-1">{errors[`${currentPackage}.provides.${index}`]}</p>
                    )}
                  </div>
                ))}
                {errors[`${currentPackage}.provides`] && (
                  <p className="text-red-500 text-sm mt-1">{errors[`${currentPackage}.provides`]}</p>
                )}
                {formData.packages[currentPackage].provides.length < 8 && (
                  <button
                    type="button"
                    onClick={() => addMoreProvide(currentPackage)}
                    className="btn btnSmall btnDefault mt-2 flex items-center"
                  >
                    <Plus size={14} className="mr-1" /> Add More
                  </button>
                )}
                {formData.packages[currentPackage].provides.length >= 8 && (
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
            <button 
              type="button" 
              onClick={handleBack} 
              className="btn btnMedium btnDefault"
            >
              Back
            </button>
            <button 
              type="button" 
              onClick={handleNext} 
              className="btn btnMedium btnDark"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    )
  }

  const renderQuestionnaire = () => {
    return (
      <div className="space-y-8">
        <h2 className="typoH2 text-center text-text">Questionnaire</h2>
        <div className="space-y-4">
          {questions.map((q, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-start gap-4">
                {editingQuestionIndex === index ? (
                  <div className="flex-grow">
                    <input
                      type="text"
                      className={`formInput ${errors.newQuestion ? "border-red-500" : ""}`}
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                    />
                    {errors.newQuestion && editingQuestionIndex === index && (
                      <p className="text-red-500 text-sm mt-1">{errors.newQuestion}</p>
                    )}
                    <div className="flex justify-end mt-2 space-x-2">
                      <button
                        onClick={() => {
                          setEditingQuestionIndex(null)
                          setNewQuestion("")
                          setErrors({ ...errors, newQuestion: "" })
                        }}
                        className="btn btnSmall btnLink"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={saveEditQuestion} 
                        className="btn btnSmall btnPrimaryLink"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <input 
                      type="text" 
                      className="formInput flex-grow" 
                      value={q.question} 
                      readOnly 
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEditQuestion(index)}
                        className="p-2 border border-inputBorder rounded-md hover:bg-btnbg"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => deleteQuestion(index)}
                        className="p-2 border border-inputBorder rounded-md hover:bg-btnbg"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <input
            type="text"
            className={`formInput ${errors.newQuestion && editingQuestionIndex === null ? "border-red-500" : ""}`}
            placeholder="Add a new question"
            value={editingQuestionIndex === null ? newQuestion : ""}
            onChange={(e) => setNewQuestion(e.target.value)}
            disabled={editingQuestionIndex !== null}
          />
          {errors.newQuestion && editingQuestionIndex === null && (
            <p className="text-red-500 text-sm mt-1">{errors.newQuestion}</p>
          )}
          {editingQuestionIndex === null && (
            <button
              type="button"
              onClick={addQuestion}
              className="btn btnMedium btnPrimary"
              disabled={!newQuestion.trim()}
            >
              Add a Question
            </button>
          )}
        </div>
        <div className="flex justify-between pt-6">
          <button 
            type="button" 
            onClick={handleBack} 
            className="btn btnMedium btnDefault"
          >
            Back
          </button>
          <button 
            type="button" 
            onClick={handleNext} 
            className="btn btnMedium btnDark"
          >
            Next
          </button>
        </div>
      </div>
    )
  }

  const renderConfirmPost = () => {
    return (
      <div className="space-y-8">
        <h2 className="typoH2 text-center text-text">Confirm Post</h2>
        <div className="space-y-6">
          <div className="bg-whiteGrey p-6 rounded-[20px]">
            <h3 className="typoS1 mb-4 text-text">Service Details</h3>
            <div className="space-y-3">
              <div>
                <span className="text-textLight typoB3">Title:</span>
                <p className="typoB3">{formData.title || "Not provided"}</p>
              </div>
              <div>
                <span className="text-textLight typoB3">Category:</span>
                <p className="typoB3">{formData.category || "Not provided"}</p>
              </div>
              <div>
                <span className="text-textLight typoB3">Sub Category:</span>
                <p className="typoB3">{formData.subCategory || "Not provided"}</p>
              </div>
              <div>
                <span className="text-textLight typoB3">Description:</span>
                <p className="typoB3">{formData.description || "Not provided"}</p>
              </div>
              <div>
                <span className="text-textLight typoB3">Images:</span>
                <p className="typoB3">{formData.images.length} images uploaded</p>
              </div>
            </div>
          </div>
          <div className="bg-whiteGrey p-6 rounded-[20px]">
            <h3 className="typoS1 mb-4 text-text">Packages</h3>
            <div className="space-y-4">
              {Object.entries(formData.packages).map(([packageName, packageData]) => {
                if (!enabledPackages[packageName]) return null
                return (
                  <div key={packageName} className="border-b border-border pb-4 last:border-0 last:pb-0">
                    <h4 className="typoB2 text-primary mb-2">{packageName}</h4>
                    <div className="grid grid-cols-2 gap-2 typoB3">
                      <div>
                        <span className="text-textLight">Name:</span>
                        <p>{packageData.name || "Not provided"}</p>
                      </div>
                      <div>
                        <span className="text-textLight">Price:</span>
                        <p>{packageData.price ? `$${packageData.price} USD` : "Not provided"}</p>
                      </div>
                      <div>
                        <span className="text-textLight">Revisions:</span>
                        <p>{packageData.revisions || "Not provided"}</p>
                      </div>
                      <div>
                        <span className="text-textLight">Delivery Days:</span>
                        <p>{packageData.deliveryDays || "Not provided"}</p>
                      </div>
                      <div>
                        <span className="text-textLight">Max Extension:</span>
                        <p>{packageData.maxExtension || "Not provided"} days</p>
                      </div>
                      <div className="col-span-2">
                        <span className="text-textLight">Provides:</span>
                        <ul className="list-disc pl-5 mt-1">
                          {packageData.provides
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
          {questions.length > 0 && (
            <div className="bg-whiteGrey p-6 rounded-[20px]">
              <h3 className="typoS1 mb-4 text-text">Questions</h3>
              <div className="space-y-3">
                {questions.map((q, i) => (
                  <div key={i}>
                    <p className="typoB3">{q.question}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-between pt-6">
          <button 
            type="button" 
            onClick={handleBack} 
            className="btn btnMedium btnDefault"
          >
            Back
          </button>
          <button 
            type="button" 
            onClick={handleNext} 
            className="btn btnMedium btnDark"
          >
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
          <h1 className="typoH1 mb-2 text-[#3F3F3F]">Post A Service</h1>
          <p className="text-textLight">Offer your service and reach the right people!</p>
        </div>
        {renderSteppers()}
        <div>
          <div className="bg-white rounded-[20px] shadow-sm px-[80px] py-[50px] border border-border">
            {currentStep === 1 && renderServiceInfo()}
            {currentStep === 2 && renderPackageSelector()}
            {currentStep === 3 && renderQuestionnaire()}
            {currentStep === 4 && renderConfirmPost()}
          </div>
        </div>
        {showGallery && (
          <ImageGallery images={formData.images} onClose={() => setShowGallery(false)} onRemove={removeImage} />
        )}
      </div>
    </div>
  )
}