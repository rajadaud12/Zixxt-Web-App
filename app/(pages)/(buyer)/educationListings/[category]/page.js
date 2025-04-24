"use client"

import { useState, useEffect, useRef } from "react"
import { Dropdown } from "@/components/utils/Dropdown"
import { SearchInput } from "@/components/utils/input"
import CourseCard from "@/components/buyer/CourseCard"
import { Star, ChevronRight, ChevronLeft } from "lucide-react"

// Updated mockCourses with online, sellerLevel, and type fields
const mockCourses = [
  {
    id: 1,
    image: "/images/servicesPictures/service1.png",
    avatar: "/placeholder.svg?height=24&width=24",
    sellerName: "kashmiri",
    title: "AI and Machine Learning Using Python Programming Language",
    rating: 4.2,
    reviews: 273,
    price: 1141,
    location: "Pakistan",
    duration: "6 weeks",
    online: true,
    sellerLevel: "Premium",
    type: "Freelancer",
  },
  {
    id: 2,
    image: "/images/servicesPictures/service1.png",
    avatar: "/placeholder.svg?height=24&width=24",
    sellerName: "john",
    title: "Web Development with React",
    rating: 4.8,
    reviews: 150,
    price: 1824,
    location: "USA",
    duration: "8 weeks",
    online: false,
    sellerLevel: "Elite",
    type: "Agency",
  },
  {
    id: 3,
    image: "/images/servicesPictures/service1.png",
    avatar: "/placeholder.svg?height=24&width=24",
    sellerName: "alice",
    title: "Graphic Design Masterclass",
    rating: 3.5,
    reviews: 50,
    price: 570,
    location: "India",
    duration: "4 weeks",
    online: true,
    sellerLevel: "Regular",
    type: "Freelancer",
  },
  {
    id: 4,
    image: "/images/servicesPictures/service1.png",
    avatar: "/placeholder.svg?height=24&width=24",
    sellerName: "bob",
    title: "Mobile App Development with Flutter",
    rating: 4.0,
    reviews: 100,
    price: 2280,
    location: "Pakistan",
    duration: "10 weeks",
    online: true,
    sellerLevel: "Premium",
    type: "Agency",
  },
  {
    id: 5,
    image: "/images/servicesPictures/service1.png",
    avatar: "/placeholder.svg?height=24&width=24",
    sellerName: "charlie",
    title: "SEO Optimization Techniques",
    rating: 4.5,
    reviews: 200,
    price: 912,
    location: "USA",
    duration: "5 weeks",
    online: false,
    sellerLevel: "Elite",
    type: "Freelancer",
  },
  {
    id: 6,
    image: "/images/servicesPictures/service1.png",
    avatar: "/placeholder.svg?height=24&width=24",
    sellerName: "emma",
    title: "Content Writing Essentials",
    rating: 4.0,
    reviews: 80,
    price: 456,
    location: "India",
    duration: "3 weeks",
    online: true,
    sellerLevel: "Regular",
    type: "Freelancer",
  },
  {
    id: 7,
    image: "/images/servicesPictures/service1.png",
    avatar: "/placeholder.svg?height=24&width=24",
    sellerName: "david",
    title: "UI/UX Design Fundamentals",
    rating: 4.7,
    reviews: 120,
    price: 2052,
    location: "USA",
    duration: "7 weeks",
    online: true,
    sellerLevel: "Elite",
    type: "Agency",
  },
  {
    id: 8,
    image: "/images/servicesPictures/service1.png",
    avatar: "/placeholder.svg?height=24&width=24",
    sellerName: "sophia",
    title: "Digital Marketing Strategies",
    rating: 3.8,
    reviews: 60,
    price: 798,
    location: "Pakistan",
    duration: "6 weeks",
    online: false,
    sellerLevel: "Premium",
    type: "Freelancer",
  },
  {
    id: 9,
    image: "/images/servicesPictures/service1.png",
    avatar: "/placeholder.svg?height=24&width=24",
    sellerName: "liam",
    title: "Blockchain Development Basics",
    rating: 4.9,
    reviews: 300,
    price: 3420,
    location: "India",
    duration: "12 weeks",
    online: true,
    sellerLevel: "Elite",
    type: "Agency",
  },
  {
    id: 10,
    image: "/images/servicesPictures/service1.png",
    avatar: "/placeholder.svg?height=24&width=24",
    sellerName: "olivia",
    title: "Video Editing with Premiere Pro",
    rating: 4.3,
    reviews: 90,
    price: 1026,
    location: "USA",
    duration: "5 weeks",
    online: true,
    sellerLevel: "Regular",
    type: "Freelancer",
  },
]

// Extend mockCourses to have enough data for pagination (at least 48 courses for 2 pages)
const extendedMockCourses = Array.from({ length: 48 }, (_, index) => {
  const baseCourse = mockCourses[index % mockCourses.length]
  return {
    ...baseCourse,
    id: index + 1,
    title: `${baseCourse.title} - Variant ${index + 1}`,
  }
})

// Constants for filter options
const PRICE_RANGES = ["Under 700", "700 - 1400", "1400 and above", "Custom"]
const RATING_OPTIONS = [
  { value: "1 star and above", stars: 1 },
  { value: "2 stars and above", stars: 2 },
  { value: "3 stars and above", stars: 3 },
  { value: "4 stars and above", stars: 4 },
  { value: "5 stars", stars: 5 },
]

// Mock data for sponsored banners
const sponsoredBanners = [
  {
    id: 1,
    image: "/images/sponsored/banner1.png",
    alt: "Sponsored Banner 1",
    url: "https://example.com/banner1",
  },
  {
    id: 2,
    image: "/images/sponsored/banner2.png",
    alt: "Sponsored Banner 2",
    url: "https://example.com/banner2",
  },
  {
    id: 3,
    image: "/images/sponsored/banner2.png",
    alt: "Sponsored Banner 3",
    url: "https://example.com/banner3",
  },
  {
    id: 4,
    image: "/images/sponsored/advertismentPic1.png",
    alt: "Sponsored Banner 3",
    url: "https://example.com/banner3",
  },
  {
    id: 5,
    image: "/images/sponsored/banner2.png",
    alt: "Sponsored Banner 3",
    url: "https://example.com/banner3",
  },
]

// Slideshow Component for Sponsored Banners
const SponsoredSlideshow = () => {
  const [isHovered, setIsHovered] = useState(false)
  const slideshowRef = useRef(null)
  const progressRef = useRef(0)
  const lastTimestampRef = useRef(null)

  useEffect(() => {
    const slideshow = slideshowRef.current
    let animationFrame

    const animate = (timestamp) => {
      if (!lastTimestampRef.current) lastTimestampRef.current = timestamp
      const deltaTime = (timestamp - lastTimestampRef.current) / 1000 // Convert to seconds

      if (!isHovered) {
        progressRef.current += (deltaTime * 50) / (sponsoredBanners.length * 1120) // Adjust speed: 50px per second
        const totalWidth = sponsoredBanners.length * (1120 + 4) // Total width of one set of banners (1120px + 4px gap)
        const translateX = (progressRef.current * totalWidth) % totalWidth // Continuous loop
        slideshow.style.transform = `translateX(-${translateX}px)`
      }

      lastTimestampRef.current = timestamp
      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [isHovered])

  // Duplicate banners 3 times to ensure smooth looping
  const bannerSets = [...sponsoredBanners, ...sponsoredBanners, ...sponsoredBanners]

  return (
    <div className="relative my-20 w-full h-[280px]">
      <div className="absolute -top-3 left-8 z-10">
        <span className="bg-[#E7F2FF] text-[#0055BA] text-xs font-medium px-3 py-1 rounded-lg">Sponsored</span>
      </div>
      <div
        className="absolute top-0 h-[280px] overflow-hidden"
        style={{
          width: "100vw",
          left: "calc(-50vw + 50%)", // Aligns with the viewport's left edge
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div ref={slideshowRef} className="flex" style={{ willChange: "transform" }}>
          {bannerSets.map((banner, index) => (
            <a
              key={`${banner.id}-${index}`}
              href={banner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 mx-2"
              style={{ height: "280px" }}
            >
              <img
                src={banner.image || "/placeholder.svg"}
                alt={banner.alt}
                style={{ height: "280px" }}
                className="object-cover rounded-[20px]"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function CourseListings() {
  const [sellerStatus, setSellerStatus] = useState("All")
  const [sellerLevel, setSellerLevel] = useState("Regular and Above")
  const [type, setType] = useState(null)
  const [country, setCountry] = useState("Select one or more")
  const [priceRange, setPriceRange] = useState(null)
  const [customPrice, setCustomPrice] = useState("")
  const [rating, setRating] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("Relevance")
  const [currentPage, setCurrentPage] = useState(1)
  const [sidebarHeight, setSidebarHeight] = useState("auto")

  const coursesPerPage = 24 // 8 rows * 3 columns
  const coursesPerRow = 3

  // Filter logic
  const filteredCourses = extendedMockCourses.filter((course) => {
    if (sellerStatus === "Online" && !course.online) return false
    if (sellerLevel === "Premium" && !["Premium", "Elite"].includes(course.sellerLevel)) return false
    if (sellerLevel === "Elite" && course.sellerLevel !== "Elite") return false
    if (type && course.type !== type) return false
    if (country !== "Select one or more" && course.location !== country) return false
    if (priceRange) {
      if (priceRange === "Under 700" && course.price >= 700) return false
      if (priceRange === "700 - 1400" && (course.price < 700 || course.price > 1400)) return false
      if (priceRange === "1400 and above" && course.price <= 1400) return false
      if (priceRange === "Custom" && customPrice !== "" && course.price !== Number(customPrice)) return false
    }
    if (rating) {
      const minRating = Number.parseInt(rating.split(" ")[0])
      if (course.rating < minRating) return false
    }
    if (searchQuery && !course.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  // Sort logic
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === "Price: Low to High") return a.price - b.price
    if (sortBy === "Price: High to Low") return b.price - a.price
    if (sortBy === "Rating: High to Low") return b.rating - a.rating
    return 0 // Default to original order for "Relevance"
  })

  // Pagination logic
  const totalPages = Math.ceil(sortedCourses.length / coursesPerPage)
  const startIndex = (currentPage - 1) * coursesPerPage
  const paginatedCourses = sortedCourses.slice(startIndex, startIndex + coursesPerPage)

  // Split courses into rows
  const courseRows = []
  for (let i = 0; i < paginatedCourses.length; i += coursesPerRow) {
    courseRows.push(paginatedCourses.slice(i, i + coursesPerRow))
  }

  // Calculate sidebar height to match the 4th row
  useEffect(() => {
    const calculateSidebarHeight = () => {
      const fourthRow = document.querySelector(".course-row-3") // 4th row (index 3)
      if (fourthRow) {
        const fourthRowBottom = fourthRow.getBoundingClientRect().bottom
        const mainSection = document.querySelector(".main-section")
        const mainSectionTop = mainSection.getBoundingClientRect().top
        const newHeight = fourthRowBottom - mainSectionTop
        setSidebarHeight(`${newHeight}px`)
      }
    }

    calculateSidebarHeight()
    window.addEventListener("resize", calculateSidebarHeight)
    return () => window.removeEventListener("resize", calculateSidebarHeight)
  }, [courseRows])

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Header Section */}
      <div className="relative h-[300px] flex items-center justify-center mb-8 mt-8 mx-auto max-w-[1240px] px-4">
        <div className="absolute inset-0">
          <img
            src="/images/categoryBgPictures/servicesBg.png"
            alt="Online Courses Illustration"
            className="w-full h-[300px] object-cover rounded-[20px]"
          />
          <div className="absolute inset-0 rounded-lg"></div>
        </div>
        <div className="relative text-center z-10">
          <div className="inline-block relative">
            <div className="absolute inset-0 bg-white bg-opacity-100 scale-125 rounded-full shadow-[0_0_30px_20px_rgba(255,255,255,0.3)]"></div>
            <div className="relative px-6 py-3">
              <h1 className="typoH1 text-black">Online Courses</h1>
              <p className="typoS2 text-text mt-2">Explore top courses from expert instructors</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-[1240px] py-6 relative">
        {/* Flex layout for sidebar and main content */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <aside
            className="w-full md:w-1/4 bg-white text-text p-6 border border-border rounded-[20px] overflow-hidden"
            style={{ height: sidebarHeight }}
          >
            <div className="mb-6">
              <h2 className="typoS2 mb-3">Seller</h2>
              <div className="flex gap-3">
                <label className="flex items-center typoB3">
                  <input
                    type="radio"
                    name="sellerStatus"
                    value="All"
                    checked={sellerStatus === "All"}
                    onChange={() => setSellerStatus("All")}
                    className="mr-2 accent-primary"
                  />
                  All
                </label>
                <label className="flex items-center typoB3">
                  <input
                    type="radio"
                    name="sellerStatus"
                    value="Online"
                    checked={sellerStatus === "Online"}
                    onChange={() => setSellerStatus("Online")}
                    className="mr-2 accent-primary"
                  />
                  Online
                </label>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="typoS2 mb-3">Seller Level</h2>
              <Dropdown
                options={["Regular and Above", "Premium", "Elite"]}
                defaultValue="Regular and Above"
                onChange={setSellerLevel}
                variant="default"
              />
            </div>

            <div className="mb-6">
              <h2 className="typoS2 mb-3">Type</h2>
              <div className="flex gap-3">
                <label className="flex items-center typoB3">
                  <input
                    type="radio"
                    name="type"
                    value="Freelancer"
                    checked={type === "Freelancer"}
                    onChange={() => setType("Freelancer")}
                    className="mr-2 accent-primary"
                  />
                  Freelancer
                </label>
                <label className="flex items-center typoB3">
                  <input
                    type="radio"
                    name="type"
                    value="Agency"
                    checked={type === "Agency"}
                    onChange={() => setType("Agency")}
                    className="mr-2 accent-primary"
                  />
                  Agency
                </label>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="typoS2 mb-3">Country</h2>
              <Dropdown
                options={["Select one or more", "Pakistan", "India", "USA"]}
                defaultValue="Select one or more"
                onChange={setCountry}
                variant="default"
              />
            </div>

            <div className="mb-6">
              <h2 className="typoS2 mb-3">Price</h2>
              <div className="flex flex-col gap-2">
                {PRICE_RANGES.map((range) => (
                  <label key={range} className="flex items-center typoB3">
                    <input
                      type="radio"
                      name="price"
                      value={range}
                      checked={priceRange === range}
                      onChange={() => setPriceRange(range)}
                      className="mr-2 accent-primary"
                    />
                    {range}
                  </label>
                ))}
                {priceRange === "Custom" && (
                  <input
                    type="number"
                    placeholder="$"
                    value={customPrice}
                    onChange={(e) => setCustomPrice(e.target.value)}
                    className="ml-4 w-24 border border-border rounded px-2 py-1"
                  />
                )}
              </div>
            </div>

            <div className="mb-6">
              <h2 className="typoS2 mb-3">Ratings</h2>
              <div className="flex flex-col gap-2">
                {RATING_OPTIONS.map((option) => (
                  <label key={option.value} className="flex items-center typoB3">
                    <input
                      type="radio"
                      name="rating"
                      value={option.value}
                      checked={rating === option.value}
                      onChange={() => setRating(option.value)}
                      className="mr-2 accent-primary"
                    />
                    <span className="flex items-center">
                      {[...Array(option.stars)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" stroke="none" />
                      ))}
                      <span className="ml-1">{option.value.includes("5 stars") ? "" : "and above"}</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Course Listings */}
          <main className="w-full md:w-3/4 main-section">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
              <div className="w-full md:w-2/3">
                <SearchInput
                  placeholder="Find your desired course here"
                  buttonText="Search"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="w-full md:w-1/3 md:pl-4">
                <Dropdown
                  options={["Relevance", "Price: Low to High", "Price: High to Low", "Rating: High to Low"]}
                  defaultValue="Relevance"
                  onChange={setSortBy}
                  variant="default"
                />
              </div>
            </div>

            {courseRows.length > 0 ? (
              <div>
                {courseRows.map((row, rowIndex) => (
                  <div key={rowIndex}>
                    <div
                      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 course-row-${rowIndex}`}
                    >
                      {row.map((course) => (
                        <CourseCard key={course.id} course={course} />
                      ))}
                    </div>
                    {/* Render the first slideshow directly after the 4th row (index 3) */}
                    {rowIndex === 3 && (
                      <div className="relative w-[100vw] -mx-[calc(50vw-32%)] rounded-[20px]">
                        <SponsoredSlideshow />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-textLight">No courses found matching your criteria.</p>
            )}
          </main>
        </div>

        {/* Pagination */}
        {courseRows.length > 0 && (
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={`w-12 h-12 flex items-center justify-center rounded-full border border-[#E6ECEF] ${
                  currentPage === 1 ? "bg-white text-[#767B7F] cursor-not-allowed" : "bg-white text-[#3F3F3F]"
                } transition-colors duration-200`}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-7 h-7" />
              </button>

              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-12 h-12 flex items-center justify-center rounded-full border border-[#E6ECEF] ${
                    currentPage === page ? "bg-[#181818] text-white" : "bg-white text-[#3F3F3F]"
                  } text-lg font-medium transition-colors duration-200`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className={`w-12 h-12 flex items-center justify-center rounded-full border border-[#E6ECEF] ${
                  currentPage === totalPages ? "bg-white text-[#767B7F] cursor-not-allowed" : "bg-white text-[#3F3F3F]"
                } transition-colors duration-200`}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="w-7 h-7" />
              </button>
            </div>
          </div>
        )}

        {courseRows.length > 0 && (
          <div className="relative w-[100vw] -mx-[calc(50vw-50%)] rounded-[20px] mt-8">
            <SponsoredSlideshow />
          </div>
        )}
      </div>
    </div>
  )
}