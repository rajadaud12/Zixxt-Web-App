"use client"
import { useState, useRef } from "react"
import { Plus, X, ChevronDown, Edit, Trash2, Check, Book, Settings, FileText, Layers, Upload } from "lucide-react"
import { Dropdown, MultiSelectDropdown } from "@/components/utils/dropdown"
import ImageGallery from "@/components/seller/imageGallery"
import { useRouter } from "next/navigation"

export default function CreateEducationalContent() {
  const router = useRouter()
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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handlePackageInputChange = (e, packageType) => {
    const { name, value } = e.target
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

  const handleCategoryChange = (value) => {
    setFormData({
      ...formData,
      category: value,
      subCategory: "",
    })
  }

  const handleSubCategoryChange = (value) => {
    setFormData({
      ...formData,
      subCategory: value,
    })
  }

  const handleContentTypeChange = (value) => {
    setFormData({
      ...formData,
      contentType: value,
    })
    setContentType(value)
  }

  const handleLanguagesChange = (values) => {
    setFormData({
      ...formData,
      languages: values,
    })
  }

  const handleSkillsChange = (values) => {
    setFormData({
      ...formData,
      skills: values,
    })
  }

  const handleLearningOutcomeChange = (index, value) => {
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
    }
  }

  const removeLearningOutcome = (index) => {
    const newOutcomes = [...formData.learningOutcomes]
    newOutcomes.splice(index, 1)
    setFormData({
      ...formData,
      learningOutcomes: newOutcomes,
    })
  }

  const handleChapterTitleChange = (index, value) => {
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
  }

  const removeChapter = (index) => {
    const newCurriculum = [...formData.curriculum]
    newCurriculum.splice(index, 1)
    setFormData({
      ...formData,
      curriculum: newCurriculum,
    })
  }

  const addTopic = (chapterIndex) => {
    const newCurriculum = [...formData.curriculum]
    newCurriculum[chapterIndex].topics.push("")
    setFormData({
      ...formData,
      curriculum: newCurriculum,
    })
  }

  const removeTopic = (chapterIndex, topicIndex) => {
    const newCurriculum = [...formData.curriculum]
    newCurriculum[chapterIndex].topics.splice(topicIndex, 1)
    setFormData({
      ...formData,
      curriculum: newCurriculum,
    })
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      setFormData({
        ...formData,
        images: [...formData.images, ...files],
      })
    }
  }

  const handleCourseFileUpload = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      setFormData({
        ...formData,
        courseFiles: [...formData.courseFiles, ...files],
      })
    }
  }

  const removeImage = (index) => {
    const newImages = [...formData.images]
    newImages.splice(index, 1)
    setFormData({
      ...formData,
      images: newImages,
    })
  }

  const removeCourseFile = (index) => {
    const newFiles = [...formData.courseFiles]
    newFiles.splice(index, 1)
    setFormData({
      ...formData,
      courseFiles: newFiles,
    })
  }

  const addQuestion = () => {
    if (newQuestion.trim()) {
      setQuestions([...questions, { question: newQuestion }])
      setNewQuestion("")
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
    }
  }

  const deleteQuestion = (index) => {
    const newQuestions = [...questions]
    newQuestions.splice(index, 1)
    setQuestions(newQuestions)
  }

  const toggleCourseContains = (option) => {
    setCourseContains({
      ...courseContains,
      [option]: !courseContains[option],
    })
  }

  const togglePackage = (packageName) => {
    // Don't allow disabling all packages
    if (!enabledPackages[packageName] || Object.values(enabledPackages).filter((value) => value).length > 1) {
      const newEnabledPackages = {
        ...enabledPackages,
        [packageName]: !enabledPackages[packageName],
      }
      setEnabledPackages(newEnabledPackages)

      // If current package is being disabled, switch to first enabled package
      if (packageName === currentPackage && enabledPackages[packageName]) {
        const nextEnabledPackage = Object.keys(newEnabledPackages).find((pkg) => newEnabledPackages[pkg])
        if (nextEnabledPackage) {
          setCurrentPackage(nextEnabledPackage)
        }
      }
    }
  }

  const validatePackageData = (packageData) => {
    const requiredFields = ["name", "revisions", "deliveryDays", "price"]
    return (
      requiredFields.every((field) => packageData[field]?.trim()) && packageData.provides.some((item) => item.trim())
    )
  }

  const validateCourseSummary = () => {
    return (
      formData.duration.trim() &&
      formData.languages.length > 0 &&
      formData.learningOutcomes.some((outcome) => outcome.trim())
    )
  }

  const validateCurriculum = () => {
    return (
      formData.curriculum.length > 0 &&
      formData.curriculum.every((chapter) => chapter.title.trim() && chapter.topics.some((topic) => topic.trim()))
    )
  }

  const handleNext = () => {
    if (currentStep === 1) {
      // Validate first step
      if (!formData.title.trim()) {
        alert("Please enter a title for your educational content")
        return
      }
      if (!formData.category) {
        alert("Please select a category")
        return
      }
      if (!formData.subCategory) {
        alert("Please select a sub-category")
        return
      }
      if (!formData.description.trim()) {
        alert("Please provide a description")
        return
      }

      if (contentType === "courses" && !formData.price.trim()) {
        alert("Please enter a price for your course")
        return
      }

      setCurrentStep(2)
      window.scrollTo(0, 0)
    } else if (currentStep === 2) {
      if (contentType === "courses") {
        // Validate course summary
        if (!validateCourseSummary()) {
          alert("Please complete all required fields in the course summary")
          return
        }
        setCurrentStep(3)
      } else {
        // Check if all enabled packages have complete data
        const allEnabledPackagesValid = Object.keys(enabledPackages)
          .filter((pkg) => enabledPackages[pkg])
          .every((pkg) => validatePackageData(formData.packages[pkg]))

        if (!allEnabledPackagesValid) {
          alert("Please complete all required fields for all enabled packages")
          return
        }
        setCurrentStep(3)
      }
      window.scrollTo(0, 0)
    } else if (currentStep === 3) {
      if (contentType === "courses") {
        // Validate curriculum
        if (!validateCurriculum()) {
          alert("Please complete the curriculum with at least one chapter and topic")
          return
        }

        // For courses, go to questionnaire
        if (questions.length > 0) {
          setCurrentStep(4)
          window.scrollTo(0, 0)
        } else {
          alert("Please add at least one question")
        }
      } else {
        // For educational support, go to questionnaire
        if (questions.length > 0) {
          setCurrentStep(4)
          window.scrollTo(0, 0)
        } else {
          alert("Please add at least one question")
        }
      }
    } else if (currentStep === 4) {
      // For courses, go to confirmation page
      if (contentType === "courses") {
        setCurrentStep(5)
        window.scrollTo(0, 0)
      } else {
        // For educational support, submit form
        console.log("Form submitted:", formData, questions, enabledPackages, courseContains)
        alert("Educational content posted successfully!")
        router.back()
        window.scrollTo(0, 0)
      }
    } else {
      // Submit form for courses
      console.log("Form submitted:", formData, questions, enabledPackages, courseContains)
      alert("Educational content posted successfully!")
      router.back()
      window.scrollTo(0, 0)
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
    window.scrollTo(0, 0)
  }

  const getTotalSteps = () => {
    if (contentType === "courses") {
      return 4 // Info, Course Summary, Program Details, Questionnaire
    } else {
      return 3 // Info, Package Configuration, Questionnaire
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
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="What is the title of your educational content"
            className="formInput"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="category" className="block mb-3 text-[15px] font-medium text-text">
            Category
          </label>
          <Dropdown
            options={categories}
            defaultValue={formData.category || "Select Category"}
            onChange={handleCategoryChange}
          />
        </div>
        <div>
          <label htmlFor="subCategory" className="block mb-3 text-[15px] font-medium text-text">
            Sub Category
          </label>
          <Dropdown
            options={formData.category ? subCategories[formData.category] : []}
            defaultValue={formData.subCategory || "Select Sub Category"}
            onChange={handleSubCategoryChange}
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-3 text-[15px] font-medium text-text">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Write the details of your educational content"
            className="formTextarea h-32"
            value={formData.description}
            onChange={handleInputChange}
          />
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

        {contentType === "courses" && (
          <>
            <div>
              <label className="block mb-3 text-[15px] font-medium text-text">Available in Languages</label>
              <MultiSelectDropdown
                options={languages}
                selectedValues={formData.languages}
                onChange={handleLanguagesChange}
                placeholder="Select languages"
              />
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
              <label className="block mb-3 text-[15px] font-medium text-text">Price</label>
              <div className="relative">
                <input
                  type="text"
                  name="price"
                  placeholder="What is the price of your course"
                  className="formInput pr-16"
                  value={formData.price}
                  onChange={handleInputChange}
                />
                <div className="absolute right-0 top-0 bottom-0 flex items-center px-6 text-textLight typoB3">USD</div>
              </div>
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
          <label className="block mb-3 text-[15px] font-medium text-text">Upload Your Course</label>
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
            <label className="block mb-3 text-[15px] font-medium text-text">Total Video Duration</label>
            <Dropdown
              options={["1-2 hours", "3-5 hours", "6-10 hours", "10+ hours"]}
              defaultValue={formData.totalVideoDuration || "e.g Business"}
              onChange={(value) => setFormData({ ...formData, totalVideoDuration: value })}
            />
          </div>
          <div>
            <label className="block mb-3 text-[15px] font-medium text-text">Chapters</label>
            <Dropdown
              options={["1-3 chapters", "4-6 chapters", "7-10 chapters", "10+ chapters"]}
              defaultValue={formData.chapters || "e.g Cloud, SAAS"}
              onChange={(value) => setFormData({ ...formData, chapters: value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-3 text-[15px] font-medium text-text">Documents</label>
            <Dropdown
              options={["PDF Guides", "Worksheets", "Code Samples", "Documentation", "None"]}
              defaultValue={formData.documents || "e.g Documentation"}
              onChange={(value) => setFormData({ ...formData, documents: value })}
            />
          </div>
          <div>
            <label className="block mb-3 text-[15px] font-medium text-text">Articles</label>
            <Dropdown
              options={["Blog Posts", "Case Studies", "Research Papers", "Tutorials", "None"]}
              defaultValue={formData.articles || "e.g 24/7 Online"}
              onChange={(value) => setFormData({ ...formData, articles: value })}
            />
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
            Course Duration <span className="text-failure">*</span>
          </label>
          <input
            type="text"
            name="duration"
            placeholder="e.g. 6 weeks, 10 hours"
            className="formInput"
            value={formData.duration}
            onChange={handleInputChange}
          />
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
                className="formInput flex-1"
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
            </div>
          ))}
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
                    className="formInput max-w-[300px]"
                    value={chapter.title}
                    onChange={(e) => handleChapterTitleChange(chapterIndex, e.target.value)}
                    placeholder="Chapter Title"
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

              <div className="mb-4">
                <textarea
                  className="formTextarea"
                  value={chapter.description}
                  onChange={(e) => handleChapterDescriptionChange(chapterIndex, e.target.value)}
                  placeholder="Chapter Description (optional)"
                />
              </div>

              <div className="space-y-3 ml-6 mt-6">
                <h4 className="typoB2 text-text mb-3">Topics</h4>
                {chapter.topics.map((topic, topicIndex) => (
                  <div key={topicIndex} className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-btnbg flex items-center justify-center mr-2 typoC2 text-textLight">
                      {topicIndex + 1}
                    </div>
                    <input
                      type="text"
                      className="formInput flex-1"
                      value={topic}
                      onChange={(e) => handleTopicChange(chapterIndex, topicIndex, e.target.value)}
                      placeholder={`Topic ${topicIndex + 1}`}
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
                  </div>
                ))}

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

        {/* Package Cards */}
        <div className="grid grid-cols-3 gap-6">
          {Object.keys(enabledPackages).map((packageName) => (
            <div
              key={packageName}
              className={`bg-white border border-border rounded-[20px] p-6 transition-all duration-300 relative ${
                enabledPackages[packageName] ? "shadow-sm" : "bg-whiteGrey opacity-70"
              } ${currentPackage === packageName && enabledPackages[packageName] ? "ring-2 ring-primary/20" : ""}`}
            >
              {/* Toggle Switch */}
              <div className="absolute top-4 right-4">
                <PackageToggle packageName={packageName} />
              </div>

              {/* Package Icon */}
              <div className={`mb-4 ${enabledPackages[packageName] ? "text-primary" : "text-textLight"}`}>
                <Book size={24} />
              </div>

              {/* Package Name */}
              <h3 className={`typoS1 mb-3 ${!enabledPackages[packageName] && "text-textLight"}`}>{packageName}</h3>

              {/* Package Brief Info */}
              <div className={`typoB3 ${!enabledPackages[packageName] && "text-textLight"}`}>
                <p className="mb-2">
                  Price: {formData.packages[packageName].price ? `$${formData.packages[packageName].price}` : "Not set"}
                </p>
                <p className="mb-2">Delivery: {formData.packages[packageName].deliveryDays || "Not set"} days</p>
                <p>Revisions: {formData.packages[packageName].revisions || "Not set"}</p>
              </div>

              {/* Edit Button */}
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

        {/* Package Editor */}
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
                  className="formInput"
                  value={formData.packages[currentPackage].name}
                  onChange={(e) => handlePackageInputChange(e, currentPackage)}
                />
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
                    className="formInput"
                    value={formData.packages[currentPackage].revisions}
                    onChange={(e) => handlePackageInputChange(e, currentPackage)}
                  />
                </div>
                <div>
                  <label className="formLabel block mb-3">
                    Delivery Days <span className="text-failure">*</span>
                  </label>
                  <input
                    type="text"
                    name="deliveryDays"
                    placeholder="e.g. 1"
                    className="formInput"
                    value={formData.packages[currentPackage].deliveryDays}
                    onChange={(e) => handlePackageInputChange(e, currentPackage)}
                  />
                </div>
                <div>
                  <label className="formLabel block mb-3">
                    Max Extension Time <span className="typoC1">(in days)</span>
                  </label>
                  <input
                    type="text"
                    name="maxExtension"
                    placeholder="e.g. 1"
                    className="formInput"
                    value={formData.packages[currentPackage].maxExtension}
                    onChange={(e) => handlePackageInputChange(e, currentPackage)}
                  />
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
                    className="formInput pr-16"
                    value={formData.packages[currentPackage].price}
                    onChange={(e) => handlePackageInputChange(e, currentPackage)}
                  />
                  <div className="absolute right-0 top-0 bottom-0 flex items-center px-6 text-textLight typoB3">
                    USD
                  </div>
                </div>
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
                      className="formInput flex-1"
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
                  </div>
                ))}
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
                      className="formInput"
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                    />
                    <div className="flex justify-end mt-2 space-x-2">
                      <button
                        onClick={() => {
                          setEditingQuestionIndex(null)
                          setNewQuestion("")
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
            className="formInput"
            placeholder="Add a new question"
            value={editingQuestionIndex === null ? newQuestion : ""}
            onChange={(e) => setNewQuestion(e.target.value)}
            disabled={editingQuestionIndex !== null}
          />
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
                  // Skip disabled packages
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
            {currentStep === 4 && contentType === "educational_support" && renderConfirmPost()}
            {currentStep === 5 && contentType === "courses" && renderConfirmPost()}
          </div>
        </div>
        {/* Image Gallery Modal */}
        {showGallery && (
          <ImageGallery images={formData.images} onClose={() => setShowGallery(false)} onRemove={removeImage} />
        )}
      </div>
    </div>
  )
}
