"use client"
import { useState, useRef } from "react"
import { Plus, X, ChevronDown, Edit, Trash2, Check, Book, Settings, FileText, Layers, Upload } from "lucide-react"
import { Dropdown, MultiSelectDropdown } from "@/components/utils/dropdown"
import ImageGallery from "@/components/seller/imageGallery"
import { useRouter } from "next/navigation"
import { useToast } from "@/context/toastContext"

export default function CreateEducationalContent() {
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [contentType, setContentType] = useState("courses")
  const [currentPackage, setCurrentPackage] = useState("Simple")
  const [showGallery, setShowGallery] = useState(false)
  const [enabledPackages, setEnabledPackages] = useState({
    Simple: true,
    Standard: true,
    Complex: true,
  })
  const [questions, setQuestions] = useState([
    { question: "What is your current knowledge level in this subject?" },
    { question: "What are your learning goals for this course?" },
  ])
  const [newQuestion, setNewQuestion] = useState("")
  const [editingQuestionIndex, setEditingQuestionIndex] = useState(null)
  const [courseContains, setCourseContains] = useState({
    Quiz: false,
    Assignment: false,
    "Test Questions": false,
    "Multiple Choices": false,
  })
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    subCategory: "",
    description: "",
    images: [],
    contentType: "courses",
    languages: [],
    skills: [],
    price: "",
    level: "",
    duration: "",
    learningOutcomes: ["", "", ""],
    courseFiles: [],
    totalVideoDuration: "",
    chapters: "",
    documents: "",
    articles: "",
    curriculum: [{ title: "Chapter 1", description: "", topics: ["", ""] }],
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
  const courseFileInputRef = useRef(null)

  const categories = ["Programming", "Design", "Business", "Marketing", "Personal Development", "Languages"]
  const subCategories = {
    Programming: ["Web Development", "Mobile Development", "Data Science", "Game Development"],
    Design: ["Graphic Design", "UX/UI Design", "3D Modeling", "Animation"],
    Business: ["Entrepreneurship", "Finance", "Management", "Strategy"],
    Marketing: ["Digital Marketing", "Social Media", "Content Marketing", "SEO"],
    "Personal Development": ["Leadership", "Communication", "Time Management", "Productivity"],
    Languages: ["English", "Spanish", "French", "German", "Chinese"],
  }

  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Japanese",
    "Russian",
    "Arabic",
    "Portuguese",
    "Italian",
  ]

  const skills = [
    "Programming",
    "Design",
    "Analytics",
    "Problem solving",
    "Communication",
    "Leadership",
    "Marketing",
    "Sales",
    "Finance",
    "Project Management",
  ]

  const levels = ["Beginner", "Intermediate", "Advanced", "All Levels"]

  // Validation functions
  const validateText = (text) => {
    return text.trim() && /^[a-zA-Z\s]+$/.test(text)
  }

  const validateInteger = (num) => {
    return num.trim() && /^\d+$/.test(num) && parseInt(num) > 0
  }

  const validateDecimal = (num) => {
    return num.trim() && /^\d+(\.\d{1,2})?$/.test(num) && parseFloat(num) > 0
  }

  const validateDuration = (duration) => {
    // Accepts formats like "6 weeks", "10 hours", "2 months", etc.
    return duration.trim() && /^\d+\s+(weeks?|hours?|months?|days?)$/i.test(duration)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    let newErrors = { ...errors }

    switch (name) {
      case "title":
        if (!validateText(value)) {
          newErrors.title = "Title must contain only letters and spaces and cannot be empty"
        } else {
          delete newErrors.title
        }
        break
      case "description":
        if (!value.trim()) {
          newErrors.description = "Description is required"
        } else if (value.length > 1000) {
          newErrors.description = "Description cannot exceed 1000 characters"
        } else {
          delete newErrors.description
        }
        break
      case "price":
        if (!validateDecimal(value)) {
          newErrors.price = "Price must be a valid positive number (e.g., 99.99) and cannot be zero"
        } else {
          delete newErrors.price
        }
        break
      case "duration":
        if (!validateDuration(value)) {
          newErrors.duration = "Duration must be in the format 'number unit' (e.g., '6 weeks', '10 hours')"
        } else {
          delete newErrors.duration
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
          newErrors[`${packageType}.name`] = "Package name must contain only letters and spaces and cannot be empty"
        } else {
          delete newErrors[`${packageType}.name`]
        }
        break
      case "revisions":
      case "deliveryDays":
      case "maxExtension":
        if (!validateInteger(value)) {
          newErrors[`${packageType}.${name}`] = "Must be a positive integer greater than zero"
        } else {
          delete newErrors[`${packageType}.${name}`]
        }
        break
      case "price":
        if (!validateDecimal(value)) {
          newErrors[`${packageType}.price`] = "Price must be a valid positive number (e.g., 99.99) and cannot be zero"
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
      newErrors[`${packageType}.provides.${index}`] = "Feature must contain only letters and spaces and cannot be empty"
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
      toast.success("Added new feature field")
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

  const handleContentTypeChange = (value) => {
    setFormData({
      ...formData,
      contentType: value,
    })
    setContentType(value)
    toast.success(`Switched to ${value === "courses" ? "Courses" : "Educational Support"}`)
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

  const handleSkillsChange = (values) => {
    setFormData({
      ...formData,
      skills: values,
    })
  }

  const handleLearningOutcomeChange = (index, value) => {
    let newErrors = { ...errors }
    if (!validateText(value)) {
    } else {
      delete newErrors[`learningOutcomes.${index}`]
    }

    setErrors(newErrors)
    const newOutcomes = [...formData.learningOutcomes]
    newOutcomes[index] = value
    setFormData({
      ...formData,
      learningOutcomes: newOutcomes,
    })
  }

  const addMoreLearningOutcome = () => {
    if (formData.learningOutcomes.length < 8) {
      setFormData({
        ...formData,
        learningOutcomes: [...formData.learningOutcomes, ""],
      })
      toast.success("Added new learning outcome field")
    } else {
      toast.error("Maximum 8 learning outcomes allowed")
    }
  }

  const removeLearningOutcome = (index) => {
    const newOutcomes = [...formData.learningOutcomes]
    newOutcomes.splice(index, 1)
    setFormData({
      ...formData,
      learningOutcomes: newOutcomes,
    })
    toast.success("Learning outcome removed successfully")
  }

  const handleChapterTitleChange = (index, value) => {
    let newErrors = { ...errors }
    if (!validateText(value)) {
      newErrors[`curriculum.${index}.title`] = "Chapter title must contain only letters and spaces and cannot be empty"
    } else {
      delete newErrors[`curriculum.${index}.title`]
    }

    setErrors(newErrors)
    const newCurriculum = [...formData.curriculum]
    newCurriculum[index].title = value
    setFormData({
      ...formData,
      curriculum: newCurriculum,
    })
  }

  const handleChapterDescriptionChange = (index, value) => {
    const newCurriculum = [...formData.curriculum]
    newCurriculum[index].description = value
    setFormData({
      ...formData,
      curriculum: newCurriculum,
    })
  }

  const handleTopicChange = (chapterIndex, topicIndex, value) => {
    let newErrors = { ...errors }
    if (!validateText(value)) {
      newErrors[`curriculum.${chapterIndex}.topics.${topicIndex}`] = "Topic must contain only letters and spaces and cannot be empty"
    } else {
      delete newErrors[`curriculum.${chapterIndex}.topics.${topicIndex}`]
    }

    setErrors(newErrors)
    const newCurriculum = [...formData.curriculum]
    newCurriculum[chapterIndex].topics[topicIndex] = value
    setFormData({
      ...formData,
      curriculum: newCurriculum,
    })
  }

  const addChapter = () => {
    setFormData({
      ...formData,
      curriculum: [
        ...formData.curriculum,
        { title: `Chapter ${formData.curriculum.length + 1}`, description: "", topics: ["", ""] },
      ],
    })
    toast.success("New chapter added")
  }

  const removeChapter = (index) => {
    const newCurriculum = [...formData.curriculum]
    newCurriculum.splice(index, 1)
    setFormData({
      ...formData,
      curriculum: newCurriculum,
    })
    toast.success("Chapter removed successfully")
  }

  const addTopic = (chapterIndex) => {
    const newCurriculum = [...formData.curriculum]
    newCurriculum[chapterIndex].topics.push("")
    setFormData({
      ...formData,
      curriculum: newCurriculum,
    })
    toast.success("New topic added")
  }

  const removeTopic = (chapterIndex, topicIndex) => {
    const newCurriculum = [...formData.curriculum]
    newCurriculum[chapterIndex].topics.splice(topicIndex, 1)
    setFormData({
      ...formData,
      curriculum: newCurriculum,
    })
    toast.success("Topic removed successfully")
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

  const handleCourseFileUpload = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      setFormData({
        ...formData,
        courseFiles: [...formData.courseFiles, ...files],
      })
      toast.success(`${files.length} file(s) uploaded successfully`)
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

  const removeCourseFile = (index) => {
    const newFiles = [...formData.courseFiles]
    newFiles.splice(index, 1)
    setFormData({
      ...formData,
      courseFiles: newFiles,
    })
    toast.success("File removed successfully")
  }

  const addQuestion = () => {
    if (newQuestion.trim()) {
      setQuestions([...questions, { question: newQuestion }])
      setNewQuestion("")
      toast.success("Question added successfully")
    } else {
      toast.error("Please enter a valid question")
      setErrors({ ...errors, newQuestion: "Question cannot be empty" })
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
      setErrors({ ...errors, newQuestion: "Question cannot be empty" })
    }
  }

  const deleteQuestion = (index) => {
    const newQuestions = [...questions]
    newQuestions.splice(index, 1)
    setQuestions(newQuestions)
    toast.success("Question deleted successfully")
  }

  const toggleCourseContains = (option) => {
    setCourseContains({
      ...courseContains,
      [option]: !courseContains[option],
    })
    toast.success(`${option} ${courseContains[option] ? "removed from" : "added to"} course content`)
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
    const requiredFields = ["name", "revisions", "deliveryDays", "price"]
    return (
      requiredFields.every((field) => packageData[field]?.trim()) &&
      validateText(packageData.name) &&
      validateInteger(packageData.revisions) &&
      validateInteger(packageData.deliveryDays) &&
      validateDecimal(packageData.price) &&
      packageData.provides.some((item) => item.trim() && validateText(item))
    )
  }

  const validateCourseSummary = () => {
    return (
      formData.duration.trim() &&
      validateDuration(formData.duration) &&
      formData.languages.length > 0 &&
      formData.learningOutcomes.some((outcome) => outcome.trim() && validateText(outcome)) &&
      formData.level.trim() &&
      formData.totalVideoDuration.trim() &&
      formData.chapters.trim() &&
      formData.documents.trim() &&
      formData.articles.trim() &&
      formData.courseFiles.length > 0
    )
  }

  const validateCurriculum = () => {
    return (
      formData.curriculum.length > 0 &&
      formData.curriculum.every(
        (chapter) =>
          chapter.title.trim() &&
          validateText(chapter.title) &&
          chapter.topics.some((topic) => topic.trim() && validateText(topic))
      )
    )
  }

  const validateStep = () => {
    let newErrors = {}

    if (currentStep === 1) {
      if (!formData.title.trim()) newErrors.title = "Title is required"
      else if (!validateText(formData.title)) newErrors.title = "Title must contain only letters and spaces"
      if (!formData.category) newErrors.category = "Category is required"
      if (!formData.subCategory) newErrors.subCategory = "Sub-category is required"
      if (!formData.description.trim()) newErrors.description = "Description is required"
      if (formData.images.length === 0) newErrors.images = "At least one image is required"
      if (contentType === "courses") {
        if (!formData.price.trim()) newErrors.price = "Price is required"
        else if (!validateDecimal(formData.price)) newErrors.price = "Price must be a valid positive number (e.g., 99.99)"
        if (formData.languages.length === 0) newErrors.languages = "At least one language is required"
        if (!formData.level) newErrors.level = "Level is required"
      }
    } else if (currentStep === 2 && contentType === "courses") {
      if (!formData.duration.trim()) newErrors.duration = "Duration is required"
      else if (!validateDuration(formData.duration)) newErrors.duration = "Duration must be in the format 'number unit' (e.g., '6 weeks')"
      if (formData.languages.length === 0) newErrors.languages = "At least one language is required"
      if (!formData.learningOutcomes.some((outcome) => outcome.trim())) {
        newErrors.learningOutcomes = "At least one learning outcome is required"
      }
      if (!formData.level) newErrors.level = "Level is required"
      if (!formData.totalVideoDuration) newErrors.totalVideoDuration = "Total video duration is required"
      if (!formData.chapters) newErrors.chapters = "Chapters selection is required"
      if (!formData.documents) newErrors.documents = "Documents selection is required"
      if (!formData.articles) newErrors.articles = "Articles selection is required"
      if (formData.courseFiles.length === 0) newErrors.courseFiles = "At least one course file is required"
 
    } else if (currentStep === 2 && contentType === "educational_support") {
      Object.keys(enabledPackages).forEach((pkg) => {
        if (enabledPackages[pkg]) {
          const packageData = formData.packages[pkg]
          if (!packageData.name.trim()) newErrors[`${pkg}.name`] = "Package name is required"
          else if (!validateText(packageData.name)) newErrors[`${pkg}.name`] = "Package name must contain only letters and spaces"
          if (!packageData.revisions.trim()) newErrors[`${pkg}.revisions`] = "Revisions are required"
          else if (!validateInteger(packageData.revisions)) newErrors[`${pkg}.revisions`] = "Revisions must be a positive integer"
          if (!packageData.deliveryDays.trim()) newErrors[`${pkg}.deliveryDays`] = "Delivery days are required"
          else if (!validateInteger(packageData.deliveryDays)) newErrors[`${pkg}.deliveryDays`] = "Delivery days must be a positive integer"
          if (!packageData.price.trim()) newErrors[`${pkg}.price`] = "Price is required"
          else if (!validateDecimal(packageData.price)) newErrors[`${pkg}.price`] = "Price must be a valid positive number (e.g., 99.99)"
          if (!packageData.provides.some((item) => item.trim())) {
            newErrors[`${pkg}.provides`] = "At least one feature is required"
          }
          packageData.provides.forEach((item, index) => {
            if (item && !validateText(item)) {
              newErrors[`${pkg}.provides.${index}`] = "Feature must contain only letters and spaces"
            }
          })
        }
      })
    } else if (currentStep === 3 && contentType === "courses") {
      formData.curriculum.forEach((chapter, index) => {
        if (!chapter.title.trim()) newErrors[`curriculum.${index}.title`] = "Chapter title is required"
        if (!chapter.topics.some((topic) => topic.trim())) {
          newErrors[`curriculum.${index}.topics`] = "At least one topic is required"
        }
        chapter.topics.forEach((topic, topicIndex) => {
          if (topic && !validateText(topic)) {
            newErrors[`curriculum.${index}.topics.${topicIndex}`] = "Topic must contain only letters and spaces"
          }
        })
      })
    } else if ((currentStep === 3 && contentType === "educational_support") || 
               (currentStep === 4 && contentType === "courses")) {
      if (questions.length === 0) {
        newErrors.questions = "At least one question is required"
      }
    } else if (currentStep === 5 && contentType === "courses") {
      // Final confirmation step: re-validate all previous steps
      if (!formData.title.trim() || !validateText(formData.title)) newErrors.title = "Valid title is required"
      if (!formData.category) newErrors.category = "Category is required"
      if (!formData.subCategory) newErrors.subCategory = "Sub-category is required"
      if (!formData.description.trim()) newErrors.description = "Description is required"
      if (formData.images.length === 0) newErrors.images = "At least one image is required"
      if (!formData.price.trim() || !validateDecimal(formData.price)) newErrors.price = "Valid positive price is required"
      if (!formData.duration.trim() || !validateDuration(formData.duration)) newErrors.duration = "Valid duration is required"
      if (formData.languages.length === 0) newErrors.languages = "At least one language is required"
      if (!formData.level) newErrors.level = "Level is required"
      if (!formData.totalVideoDuration) newErrors.totalVideoDuration = "Total video duration is required"
      if (!formData.chapters) newErrors.chapters = "Chapters selection is required"
      if (!formData.documents) newErrors.documents = "Documents selection is required"
      if (!formData.articles) newErrors.articles = "Articles selection is required"
      if (formData.courseFiles.length === 0) newErrors.courseFiles = "At least one course file is required"
      if (!formData.learningOutcomes.some((outcome) => outcome.trim() && validateText(outcome))) {
        newErrors.learningOutcomes = "At least one valid learning outcome is required"
      }
      if (!validateCurriculum()) {
        formData.curriculum.forEach((chapter, index) => {
          if (!chapter.title.trim() || !validateText(chapter.title)) {
            newErrors[`curriculum.${index}.title`] = "Valid chapter title is required"
          }
          if (!chapter.topics.some((topic) => topic.trim() && validateText(topic))) {
            newErrors[`curriculum.${index}.topics`] = "At least one valid topic is required"
          }
        })
      }
      if (questions.length === 0) {
        newErrors.questions = "At least one question is required"
      }
    } else if (currentStep === 4 && contentType === "educational_support") {
      // Final confirmation step: re-validate all previous steps
      if (!formData.title.trim() || !validateText(formData.title)) newErrors.title = "Valid title is required"
      if (!formData.category) newErrors.category = "Category is required"
      if (!formData.subCategory) newErrors.subCategory = "Sub-category is required"
      if (!formData.description.trim()) newErrors.description = "Description is required"
      if (formData.images.length === 0) newErrors.images = "At least one image is required"
      Object.keys(enabledPackages).forEach((pkg) => {
        if (enabledPackages[pkg]) {
          const packageData = formData.packages[pkg]
          if (!packageData.name.trim() || !validateText(packageData.name)) newErrors[`${pkg}.name`] = "Valid package name is required"
          if (!packageData.revisions.trim() || !validateInteger(packageData.revisions)) newErrors[`${pkg}.revisions`] = "Valid revisions are required"
          if (!packageData.deliveryDays.trim() || !validateInteger(packageData.deliveryDays)) newErrors[`${pkg}.deliveryDays`] = "Valid delivery days are required"
          if (!packageData.price.trim() || !validateDecimal(packageData.price)) newErrors[`${pkg}.price`] = "Valid positive price is required"
          if (!packageData.provides.some((item) => item.trim() && validateText(item))) {
            newErrors[`${pkg}.provides`] = "At least one valid feature is required"
          }
        }
      })
      if (questions.length === 0) {
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
        if (contentType === "courses") {
          setCurrentStep(3)
        } else {
          setCurrentStep(3)
        }
        window.scrollTo(0, 0)
      } else if (currentStep === 3) {
        if (contentType === "courses") {
          setCurrentStep(4)
        } else {
          setCurrentStep(4)
        }
        window.scrollTo(0, 0)
      } else if (currentStep === 4) {
        if (contentType === "courses") {
          setCurrentStep(5)
        } else {
          console.log("Form submitted:", formData, questions, enabledPackages, courseContains)
          toast.success("Educational content posted successfully!")
          router.back()
          window.scrollTo(0, 0)
        }
      } else {
        console.log("Form submitted:", formData, questions, enabledPackages, courseContains)
        toast.success("Educational content posted successfully!")
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
    } else if (currentStep === 5) {
      setCurrentStep(4)
    }
    setErrors({})
    window.scrollTo(0, 0)
  }

  const getTotalSteps = () => {
    if (contentType === "courses") {
      return 5 // Info, Course Summary, Program Details, Questionnaire, Confirm
    } else {
      return 4 // Info, Package Configuration, Questionnaire, Confirm
    }
  }

  const renderSteppers = () => {
    const totalSteps = getTotalSteps()

    return (
      <div className="flex justify-center mb-12">
        <div className="flex items-center">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  currentStep >= index + 1 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                {String(index + 1).padStart(2, "0")}
              </div>
              {index < totalSteps - 1 && (
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

  const renderEducationalContentInfo = () => {
    return (
      <div className="space-y-8">
        <h2 className="typoH2 text-center text-text">Educational Content Information</h2>

        <div>
          <label className="block mb-3 text-[15px] font-medium text-text">What are you selling?</label>
          <div className="grid grid-cols-2 gap-4">
            <div
              className={`p-6 border rounded-[20px] cursor-pointer transition-all ${
                contentType === "courses" ? "border-primary bg-secondary" : "border-border bg-white hover:bg-whiteGrey"
              }`}
              onClick={() => handleContentTypeChange("courses")}
            >
              <div className="flex items-center mb-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    contentType === "courses" ? "bg-course text-white" : "bg-btnbg text-textLight"
                  }`}
                >
                  <Book size={20} />
                </div>
                <h3 className={`ml-3 font-medium ${contentType === "courses" ? "text-course" : "text-text"}`}>
                  Courses
                </h3>
              </div>
              <p className="text-sm text-textLight">
                Complete educational programs with structured curriculum and learning outcomes
              </p>
            </div>

            <div
              className={`p-6 border rounded-[20px] cursor-pointer transition-all ${
                contentType === "educational_support"
                  ? "border-primary bg-secondary"
                  : "border-border bg-white hover:bg-whiteGrey"
              }`}
              onClick={() => handleContentTypeChange("educational_support")}
            >
              <div className="flex items-center mb-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    contentType === "educational_support" ? "bg-primary text-white" : "bg-btnbg text-textLight"
                  }`}
                >
                  <FileText size={20} />
                </div>
                <h3
                  className={`ml-3 font-medium ${contentType === "educational_support" ? "text-primary" : "text-text"}`}
                >
                  Educational Support
                </h3>
              </div>
              <p className="text-sm text-textLight">
                Tutoring, homework help, assignment assistance, and other educational services
              </p>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="title" className="block mb-3 text-[15px] font-medium text-text">
            Title <span className="text-failure">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="What is the title of your educational content"
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
            placeholder="Write the details of your educational content"
            className={`formTextarea h-32 ${errors.description ? "border-red-500" : ""}`}
            value={formData.description}
            onChange={handleInputChange}
            required
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>
        <div>
          <label className="block mb-3 text-[15px] font-medium text-text">Upload Pictures <span className="text-failure">*</span></label>
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
          {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}
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

        {contentType === "courses" && (
          <>
            <div>
              <label className="block mb-3 text-[15px] font-medium text-text">
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
              <label className="block mb-3 text-[15px] font-medium text-text">What Skills Your Course Offer</label>
              <MultiSelectDropdown
                options={skills}
                selectedValues={formData.skills}
                onChange={handleSkillsChange}
                placeholder="Select skills"
              />
            </div>

            <div>
              <label className="block mb-3 text-[15px] font-medium text-text">
                Level <span className="text-failure">*</span>
              </label>
              <Dropdown
                options={levels}
                defaultValue={formData.level || "Select Level"}
                onChange={(value) => setFormData({ ...formData, level: value })}
                className={errors.level ? "border-red-500" : ""}
              />
              {errors.level && <p className="text-red-500 text-sm mt-1">{errors.level}</p>}
            </div>

            <div>
              <label className="block mb-3 text-[15px] font-medium text-text">
                Price <span className="text-failure">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="price"
                  placeholder="What is the price of your course"
                  className={`formInput pr-16 ${errors.price ? "border-red-500" : ""}`}
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
                <div className="absolute right-0 top-0 bottom-0 flex items-center px-6 text-textLight typoB3">USD</div>
              </div>
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>
          </>
        )}

        <div className="flex justify-end pt-6">
          <button type="button" onClick={handleNext} className="btn btnMedium btnDark">
            Next
          </button>
        </div>
      </div>
    )
  }

  const renderCourseSummary = () => {
    return (
      <div className="space-y-8">
        <h2 className="typoH2 text-center text-text">Course Summary</h2>

        <div>
          <label className="block mb-3 text-[15px] font-medium text-text">Upload Your Course <span className="text-failure">*</span></label>
          <div
            className="bg-[#F5F5F6] border border-dashed border-inputBorder rounded-[20px] p-8 flex flex-col items-center justify-center cursor-pointer"
            onClick={() => courseFileInputRef.current.click()}
          >
            <div className="w-16 h-16 bg-gray-200 rounded-[20px] flex items-center justify-center mb-2">
              <Upload size={24} className="text-textLight" />
            </div>
            <p className="text-textLight text-sm">Click to Upload or Drag and Drop Files</p>
            <input ref={courseFileInputRef} type="file" multiple className="hidden" onChange={handleCourseFileUpload} />
          </div>
          {errors.courseFiles && <p className="text-red-500 text-sm mt-1">{errors.courseFiles}</p>}
          {formData.courseFiles.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-textLight">{formData.courseFiles.length} files uploaded</p>
              <ul className="mt-2 space-y-1">
                {formData.courseFiles.map((file, index) => (
                  <li key={index} className="flex items-center justify-between bg-whiteGrey p-2 rounded-md">
                    <span className="text-sm truncate max-w-[300px]">{file.name}</span>
                    <button onClick={() => removeCourseFile(index)} className="text-textLight hover:text-failure">
                      <X size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-3 text-[15px] font-medium text-text">Total Video Duration <span className="text-failure">*</span></label>
            <Dropdown
              options={["1-2 hours", "3-5 hours", "6-10 hours", "10+ hours"]}
              defaultValue={formData.totalVideoDuration || "Select duration"}
              onChange={(value) => setFormData({ ...formData, totalVideoDuration: value })}
              className={errors.totalVideoDuration ? "border-red-500" : ""}
            />
            {errors.totalVideoDuration && <p className="text-red-500 text-sm mt-1">{errors.totalVideoDuration}</p>}
          </div>
          <div>
            <label className="block mb-3 text-[15px] font-medium text-text">Chapters <span className="text-failure">*</span></label>
            <Dropdown
              options={["1-3 chapters", "4-6 chapters", "7-10 chapters", "10+ chapters"]}
              defaultValue={formData.chapters || "Select chapters"}
              onChange={(value) => setFormData({ ...formData, chapters: value })}
              className={errors.chapters ? "border-red-500" : ""}
            />
            {errors.chapters && <p className="text-red-500 text-sm mt-1">{errors.chapters}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-3 text-[15px] font-medium text-text">Documents <span className="text-failure">*</span></label>
            <Dropdown
              options={["PDF Guides", "Worksheets", "Code Samples", "Documentation", "None"]}
              defaultValue={formData.documents || "Select documents"}
              onChange={(value) => setFormData({ ...formData, documents: value })}
              className={errors.documents ? "border-red-500" : ""}
            />
            {errors.documents && <p className="text-red-500 text-sm mt-1">{errors.documents}</p>}
          </div>
          <div>
            <label className="block mb-3 text-[15px] font-medium text-text">Articles <span className="text-failure">*</span></label>
            <Dropdown
              options={["Blog Posts", "Case Studies", "Research Papers", "Tutorials", "None"]}
              defaultValue={formData.articles || "Select articles"}
              onChange={(value) => setFormData({ ...formData, articles: value })}
              className={errors.articles ? "border-red-500" : ""}
            />
            {errors.articles && <p className="text-red-500 text-sm mt-1">{errors.articles}</p>}
          </div>
        </div>

        <div>
          <label className="block mb-3 text-[15px] font-medium text-text">
            Which of the following does your Course Contain
          </label>
          <div className="space-y-2 mt-2">
            {Object.keys(courseContains).map((option) => (
              <div
                key={option}
                className={`p-3 rounded-full border flex items-center cursor-pointer ${
                  courseContains[option]
                    ? "bg-secondary border-primary text-primary"
                    : "bg-whiteGrey border-inputBorder text-textLight"
                }`}
                onClick={() => toggleCourseContains(option)}
              >
                <div
                  className={`w-5 h-5 rounded-full border mr-2 flex items-center justify-center ${
                    courseContains[option] ? "bg-primary border-primary" : "border-gray-300"
                  }`}
                >
                  {courseContains[option] && <Check className="h-3 w-3 text-white" />}
                </div>
                <span>{option}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-3 text-[15px] font-medium text-text">
            Level <span className="text-failure">*</span>
          </label>
          <Dropdown
            options={levels}
            defaultValue={formData.level || "Select Level"}
            onChange={(value) => setFormData({ ...formData, level: value })}
            className={errors.level ? "border-red-500" : ""}
          />
          {errors.level && <p className="text-red-500 text-sm mt-1">{errors.level}</p>}
        </div>

        <div>
          <label className="block mb-3 text-[15px] font-medium text-text">
            Course Duration <span className="text-failure">*</span>
          </label>
          <input
            type="text"
            name="duration"
            placeholder="e.g. 6 weeks, 10 hours"
            className={`formInput ${errors.duration ? "border-red-500" : ""}`}
            value={formData.duration}
            onChange={handleInputChange}
            required
          />
          {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
        </div>

        <div>
          <label className="block mb-3 text-[15px] font-medium text-text">
            Learning Outcomes <span className="text-failure">*</span>
          </label>
          {formData.learningOutcomes.map((outcome, index) => (
            <div key={index} className="flex items-center mb-3">
              <div className="w-6 h-6 rounded-full bg-btnbg flex items-center justify-center mr-2 typoC2 text-textLight">
                {index + 1}
              </div>
              <input
                type="text"
                placeholder={`e.g. ${
                  index === 0
                    ? "Build responsive websites using HTML, CSS, and JavaScript"
                    : index === 1
                      ? "Create interactive user interfaces with React"
                      : "Deploy web applications to production environments"
                }`}
                className={`formInput flex-1 ${errors[`learningOutcomes.${index}`] ? "border-red-500" : ""}`}
                value={outcome}
                onChange={(e) => handleLearningOutcomeChange(index, e.target.value)}
              />
              {index > 2 && (
                <button
                  type="button"
                  onClick={() => removeLearningOutcome(index)}
                  className="ml-2 text-textLight hover:text-failure"
                >
                  <X size={18} />
                </button>
              )}
              {errors[`learningOutcomes.${index}`] && (
                <p className="text-red-500 text-sm mt-1">{errors[`learningOutcomes.${index}`]}</p>
              )}
            </div>
          ))}
          {errors.learningOutcomes && (
            <p className="text-red-500 text-sm mt-1">{errors.learningOutcomes}</p>
          )}
          {formData.learningOutcomes.length < 8 && (
            <button
              type="button"
              onClick={addMoreLearningOutcome}
              className="btn btnSmall btnDefault mt-2 flex items-center"
            >
              <Plus size={14} className="mr-1" /> Add More
            </button>
          )}
          {formData.learningOutcomes.length >= 8 && (
            <p className="typoC1 text-textLight mt-2">Maximum 8 items allowed</p>
          )}
        </div>

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

  const renderCurriculum = () => {
    return (
      <div className="space-y-8">
        <h2 className="typoH2 text-center text-text">Program Details</h2>

        <div className="space-y-6">
          {formData.curriculum.map((chapter, chapterIndex) => (
            <div key={chapterIndex} className="bg-whiteGrey p-6 rounded-[20px] border border-border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-course text-white flex items-center justify-center mr-3">
                    <Layers size={20} />
                  </div>
                  <input
                    type="text"
                    className={`formInput max-w-[300px] ${errors[`curriculum.${chapterIndex}.title`] ? "border-red-500" : ""}`}
                    value={chapter.title}
                    onChange={(e) => handleChapterTitleChange(chapterIndex, e.target.value)}
                    placeholder="Chapter Title"
                    required
                  />
                </div>
                {formData.curriculum.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeChapter(chapterIndex)}
                    className="text-textLight hover:text-failure"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
              {errors[`curriculum.${chapterIndex}.title`] && (
                <p className="text-red-500 text-sm mt-1">{errors[`curriculum.${chapterIndex}.title`]}</p>
              )}

              <div className="mb-4">
                <textarea
                  className="formTextarea"
                  value={chapter.description}
                  onChange={(e) => handleChapterDescriptionChange(chapterIndex, e.target.value)}
                  placeholder="Chapter Description (optional)"
                />
              </div>

              <div className="space-y-3 ml-6 mt-6">
                <h4 className="typoB2 text-text mb-3">Topics <span className="text-failure">*</span></h4>
                {chapter.topics.map((topic, topicIndex) => (
                  <div key={topicIndex} className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-btnbg flex items-center justify-center mr-2 typoC2 text-textLight">
                      {topicIndex + 1}
                    </div>
                    <input
                      type="text"
                      className={`formInput flex-1 ${errors[`curriculum.${chapterIndex}.topics.${topicIndex}`] ? "border-red-500" : ""}`}
                      value={topic}
                      onChange={(e) => handleTopicChange(chapterIndex, topicIndex, e.target.value)}
                      placeholder={`Topic ${topicIndex + 1}`}
                      required
                    />
                    {chapter.topics.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTopic(chapterIndex, topicIndex)}
                        className="ml-2 text-textLight hover:text-failure"
                      >
                        <X size={18} />
                      </button>
                    )}
                    {errors[`curriculum.${chapterIndex}.topics.${topicIndex}`] && (
                      <p className="text-red-500 text-sm mt-1">{errors[`curriculum.${chapterIndex}.topics.${topicIndex}`]}</p>
                    )}
                  </div>
                ))}
                {errors[`curriculum.${chapterIndex}.topics`] && (
                  <p className="text-red-500 text-sm mt-1">{errors[`curriculum.${chapterIndex}.topics`]}</p>
                )}
                <button
                  type="button"
                  onClick={() => addTopic(chapterIndex)}
                  className="btn btnSmall btnDefault mt-2 flex items-center"
                >
                  <Plus size={14} className="mr-1" /> Add Topic
                </button>
              </div>
            </div>
          ))}

          <button type="button" onClick={addChapter} className="btn btnMedium btnPrimary flex items-center mx-auto">
            <Plus size={16} className="mr-1" /> Add Chapter
          </button>
        </div>

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

  const renderPackageSelector = () => {
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
                  Price: {formData.packages[packageName].price ? `$${formData.packages[packageName].price}` : "Not set"}
                </p>
                <p className="mb-2">Delivery: {formData.packages[packageName].deliveryDays || "Not set"} days</p>
                <p>Revisions: {formData.packages[packageName].revisions || "Not set"}</p>
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
                  Name Your Package <span className="text-failure">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="What is the title of your package"
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
                    Max Extension Time <span className="text-failure">*</span>
                  </label>
                  <input
                    type="text"
                    name="maxExtension"
                    placeholder="e.g. 1"
                    className={`formInput ${errors[`${currentPackage}.maxExtension`] ? "border-red-500" : ""}`}
                    value={formData.packages[currentPackage].maxExtension}
                    onChange={(e) => handlePackageInputChange(e, currentPackage)}
                    required
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
                  <div className="absolute right-0 top-0 bottom-0 flex items-center px-6 text-textLight typoB3">
                    USD
                  </div>
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
                          ? "One-on-one tutoring sessions"
                          : index === 1
                            ? "Detailed feedback on assignments"
                            : "Study materials and resources"
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
                      <button onClick={saveEditQuestion} className="btn btnSmall btnPrimaryLink">
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <input type="text" className="formInput flex-grow" value={q.question} readOnly />
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
        {errors.questions && <p className="text-red-500 text-sm mt-1">{errors.questions}</p>}
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

  const renderConfirmPost = () => {
    return (
      <div className="space-y-8">
        <h2 className="typoH2 text-center text-text">Confirm Post</h2>
        <div className="space-y-6">
          <div className="bg-whiteGrey p-6 rounded-[20px]">
            <h3 className="typoS1 mb-4 text-text">Educational Content Details</h3>
            <div className="space-y-3">
              <div>
                <span className="text-textLight typoB3">Title:</span>
                <p className="typoB3">{formData.title || "Not provided"}</p>
              </div>
              <div>
                <span className="text-textLight typoB3">Type:</span>
                <p className="typoB3">{formData.contentType === "courses" ? "Course" : "Educational Support"}</p>
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
              {contentType === "courses" && (
                <>
                  <div>
                    <span className="text-textLight typoB3">Price:</span>
                    <p className="typoB3">{formData.price ? `$${formData.price} USD` : "Not provided"}</p>
                  </div>
                  <div>
                    <span className="text-textLight typoB3">Languages:</span>
                    <p className="typoB3">{formData.languages.join(", ") || "Not provided"}</p>
                  </div>
                  <div>
                    <span className="text-textLight typoB3">Skills Offered:</span>
                    <p className="typoB3">{formData.skills.join(", ") || "Not provided"}</p>
                  </div>
                  <div>
                    <span className="text-textLight typoB3">Level:</span>
                    <p className="typoB3">{formData.level || "Not provided"}</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {formData.contentType === "courses" && (
            <>
              <div className="bg-whiteGrey p-6 rounded-[20px]">
                <h3 className="typoS1 mb-4 text-text">Course Summary</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-textLight typoB3">Course Files:</span>
                    <p className="typoB3">{formData.courseFiles.length} files uploaded</p>
                  </div>
                  <div>
                    <span className="text-textLight typoB3">Total Video Duration:</span>
                    <p className="typoB3">{formData.totalVideoDuration || "Not provided"}</p>
                  </div>
                  <div>
                    <span className="text-textLight typoB3">Chapters:</span>
                    <p className="typoB3">{formData.chapters || "Not provided"}</p>
                  </div>
                  <div>
                    <span className="text-textLight typoB3">Documents:</span>
                    <p className="typoB3">{formData.documents || "Not provided"}</p>
                  </div>
                  <div>
                    <span className="text-textLight typoB3">Articles:</span>
                    <p className="typoB3">{formData.articles || "Not provided"}</p>
                  </div>
                  <div>
                    <span className="text-textLight typoB3">Course Contains:</span>
                    <p className="typoB3">
                      {Object.keys(courseContains)
                        .filter((key) => courseContains[key])
                        .join(", ") || "None selected"}
                    </p>
                  </div>
                  <div>
                    <span className="text-textLight typoB3">Level:</span>
                    <p className="typoB3">{formData.level || "Not provided"}</p>
                  </div>
                  <div>
                    <span className="text-textLight typoB3">Duration:</span>
                    <p className="typoB3">{formData.duration || "Not provided"}</p>
                  </div>
                  <div>
                    <span className="text-textLight typoB3">Learning Outcomes:</span>
                    <ul className="list-disc pl-5 mt-1">
                      {formData.learningOutcomes
                        .filter((item) => item)
                        .map((item, i) => (
                          <li key={i} className="typoB3">
                            {item}
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-whiteGrey p-6 rounded-[20px]">
                <h3 className="typoS1 mb-4 text-text">Curriculum</h3>
                <div className="space-y-4">
                  {formData.curriculum.map((chapter, chapterIndex) => (
                    <div key={chapterIndex} className="border-b border-border pb-4 last:border-0 last:pb-0">
                      <h4 className="typoB2 text-course mb-2">{chapter.title}</h4>
                      {chapter.description && <p className="typoB3 mb-2">{chapter.description}</p>}
                      <div>
                        <span className="text-textLight typoB3">Topics:</span>
                        <ul className="list-disc pl-5 mt-1">
                          {chapter.topics
                            .filter((item) => item)
                            .map((item, i) => (
                              <li key={i} className="typoB3">
                                {item}
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {formData.contentType === "educational_support" && (
            <div className="bg-whiteGrey p-6 rounded-[20px]">
              <h3 className="typoS1 mb-4 text-text">Packages</h3>
              <div className="space-y-4">
                {Object.entries(formData.packages).map(([packageName, packageData]) => {
                  if (!enabledPackages[packageName]) {
                    return null
                  }
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
          )}

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

  return (
    <div className="min-h-screen bg-[#F5F5F6] py-10">
      <div className="max-w-[1240px] mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="typoH1 mb-2 text-[#3F3F3F]">Post Educational Content</h1>
          <p className="text-textLight">Share your knowledge and expertise with the world!</p>
        </div>
        {renderSteppers()}
        <div>
          <div className="bg-white rounded-[20px] shadow-sm px-[80px] py-[50px] border border-border">
            {currentStep === 1 && renderEducationalContentInfo()}
            {currentStep === 2 && contentType === "courses" && renderCourseSummary()}
            {currentStep === 2 && contentType === "educational_support" && renderPackageSelector()}
            {currentStep === 3 && contentType === "courses" && renderCurriculum()}
            {currentStep === 3 && contentType === "educational_support" && renderQuestionnaire()}
            {currentStep === 4 && contentType === "courses" && renderQuestionnaire()}
            {currentStep === 5 && contentType === "courses" && renderConfirmPost()}
            {currentStep === 4 && contentType === "educational_support" && renderConfirmPost()}
          </div>
        </div>
        {showGallery && (
          <ImageGallery images={formData.images} onClose={() => setShowGallery(false)} onRemove={removeImage} />
        )}
      </div>
    </div>
  )
}