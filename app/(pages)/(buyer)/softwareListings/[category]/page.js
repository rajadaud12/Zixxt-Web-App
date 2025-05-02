"use client"

import { useState, useEffect, useRef } from "react"
import { Dropdown } from "@/components/utils/Dropdown"
import { SearchInput } from "@/components/utils/input"
import SoftwareCard from "@/components/buyer/SoftwareCard"
import { Star, ChevronRight, ChevronLeft } from "lucide-react"
import { softwares } from "@/app/data/products";


// Extend softwares to have enough data for pagination
const extendedsoftwares = Array.from({ length: 48 }, (_, index) => {
  const baseSoftware = softwares[index % softwares.length]
  return {
    ...baseSoftware,
    id: index + 1,
    title: `${baseSoftware.title} - Variant ${index + 1}`,
  }
})

// Constants for filter options
const COMPANY_SIZES = ["0-15", "50-100", "200-1000", "1000+"]
const PRICE_RANGES = ["Under $30", "$30 - $60", "$60 and above", "Custom"]
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
    image: "/images/sponsored/banner3.png",
    alt: "Sponsored Banner 3",
    url: "https://example.com/banner3",
  }
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
      const deltaTime = (timestamp - lastTimestampRef.current) / 1000

      if (!isHovered) {
        progressRef.current += (deltaTime * 50) / (sponsoredBanners.length * 1120)
        const totalWidth = sponsoredBanners.length * (1120 + 4)
        const translateX = (progressRef.current * totalWidth) % totalWidth
        slideshow.style.transform = `translateX(-${translateX}px)`
      }

      lastTimestampRef.current = timestamp
      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [isHovered])

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
          left: "calc(-50vw + 50%)",
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

export default function SoftwareListings() {
  const [companySize, setCompanySize] = useState(null)
  const [priceRange, setPriceRange] = useState(null)
  const [customPrice, setCustomPrice] = useState("")
  const [rating, setRating] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("Relevance")
  const [currentPage, setCurrentPage] = useState(1)
  const [sidebarHeight, setSidebarHeight] = useState("auto")

  const softwaresPerPage = 8

  // Filter logic
  const filteredSoftware = extendedsoftwares.filter((software) => {
    if (companySize) {
      const sizeRange = companySize.split("-").map(Number)
      const size = parseInt(software.id % 1000) // Simulate company size
      if (companySize === "0-15" && size > 15) return false
      if (companySize === "50-100" && (size < 50 || size > 100)) return false
      if (companySize === "200-1000" && (size < 200 || size > 1000)) return false
      if (companySize === "1000+" && size <= 1000) return false
    }
    if (priceRange) {
      if (priceRange === "Under $30" && software.price >= 30) return false
      if (priceRange === "$30 - $60" && (software.price < 30 || software.price > 60)) return false
      if (priceRange === "$60 and above" && software.price <= 60) return false
      if (priceRange === "Custom" && customPrice !== "" && software.price !== Number(customPrice)) return false
    }
    if (rating) {
      const minRating = Number.parseInt(rating.split(" ")[0])
      if (software.rating < minRating) return false
    }
    if (searchQuery && !software.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  // Sort logic
  const sortedSoftware = [...filteredSoftware].sort((a, b) => {
    if (sortBy === "Price: Low to High") return a.price - b.price
    if (sortBy === "Price: High to Low") return b.price - a.price
    if (sortBy === "Rating: High to Low") return b.rating - a.rating
    return 0
  })

  // Pagination logic
  const totalPages = Math.ceil(sortedSoftware.length / softwaresPerPage)
  const startIndex = (currentPage - 1) * softwaresPerPage
  const paginatedSoftware = sortedSoftware.slice(startIndex, startIndex + softwaresPerPage)

  // Calculate sidebar height to match the 4th software card
  useEffect(() => {
    const calculateSidebarHeight = () => {
      const fourthSoftware = document.querySelector(".software-card-3") // 4th card (index 3)
      if (fourthSoftware) {
        const fourthSoftwareBottom = fourthSoftware.getBoundingClientRect().bottom
        const mainSection = document.querySelector(".main-section")
        const mainSectionTop = mainSection.getBoundingClientRect().top
        const newHeight = fourthSoftwareBottom - mainSectionTop
        setSidebarHeight(`${newHeight-360}px`)
      }
    }

    calculateSidebarHeight()
    window.addEventListener("resize", calculateSidebarHeight)
    return () => window.removeEventListener("resize", calculateSidebarHeight)
  }, [paginatedSoftware])

  return (
    <div className="softwareDetailContainer min-h-screen overflow-x-hidden">
      {/* Header Section */}
      <div className="relative h-[300px] flex items-center justify-center mb-8 mt-8 mx-auto max-w-[1240px] px-4">
        <div className="absolute inset-0">
          <img
            src="/images/categoryBgPictures/softwaresBg.png"
            alt="CMS Software Illustration"
            className="w-full h-[300px] object-cover rounded-[20px]"
          />
          <div className="absolute inset-0 rounded-lg"></div>
        </div>
        <div className="relative text-center z-10">
          <div className="inline-block relative">
            <div className="absolute inset-0 bg-white bg-opacity-100 scale-125 rounded-full shadow-[0_0_30px_20px_rgba(255,255,255,0.3)]"></div>
            <div className="relative px-6 py-3">
              <h1 className="typoH1 text-black">CMS Software</h1>
              <p className="typoS2 text-text mt-2">Explore top CMS Software</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-[1240px] py-6 relative">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <aside
            className="w-full md:w-1/4 bg-white text-text p-6 border border-border rounded-[20px] overflow-hidden"
            style={{ height: sidebarHeight }}
          >
            <div className="mb-6">
              <h2 className="typoS2 mb-3">Company Size</h2>
              <div className="flex flex-col gap-2">
                {COMPANY_SIZES.map((size) => (
                  <label key={size} className="flex items-center typoB3">
                    <input
                      type="radio"
                      name="companySize"
                      value={size}
                      checked={companySize === size}
                      onChange={() => setCompanySize(size)}
                      className="mr-2 accent-primary"
                    />
                    {size}
                  </label>
                ))}
              </div>
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

          {/* Main Software Listings */}
          <main className="w-full md:w-3/4 main-section">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
              <div className="w-full md:w-2/3">
                <SearchInput
                  placeholder="Find your desired service here"
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

            {paginatedSoftware.length > 0 ? (
              <div>
                {paginatedSoftware.map((software, index) => (
                  <div key={software.id} className={`mb-4 software-card-${index}`}>
                    <SoftwareCard software={software} />
                    {index === 3 && (
                      <div className="relative w-[100vw] -mx-[calc(50vw-32%)] rounded-[20px]">
                        <SponsoredSlideshow />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-textLight">No software found matching your criteria.</p>
            )}
          </main>
        </div>

        {/* Pagination */}
        {paginatedSoftware.length > 0 && (
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

        {/* Second Slideshow (At Bottom) */}
        {paginatedSoftware.length > 0 && (
          <div className="relative w-[100vw] -mx-[calc(50vw-50%)] rounded-[20px] mt-8">
            <SponsoredSlideshow />
          </div>
        )}
      </div>
    </div>
  )
}