"use client"

import { useState, useEffect, useRef } from "react"
import { Dropdown } from "@/components/utils/Dropdown"
import { SearchInput } from "@/components/utils/input"
import ServiceCard from "@/components/buyer/ServiceCard"
import { Star, ChevronRight, ChevronLeft } from "lucide-react"
import { services } from "@/app/data/products";


// Extend services to have enough data for pagination (at least 48 services for 2 pages)
const extendedservices = Array.from({ length: 48 }, (_, index) => {
  const baseService = services[index % services.length]
  return {
    ...baseService,
    id: index + 1,
    title: `${baseService.title} - Variant ${index + 1}`,
  }
})

// Constants for filter options
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
        // Continuous scroll: increment progress without resetting
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
      {/* Full-width slideshow positioned relative to the viewport */}
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
              className="flex-shrink-0 mx-2" // Add gap between banners
              style={{ height: "280px" }} // Fixed banner width
            >
              <img
                src={banner.image || "/placeholder.svg"}
                alt={banner.alt}
                style={{ height: "280px" }}
                className="object-cover rounded-[20px]" // Add border radius
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ServiceListings() {
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

  const servicesPerPage = 24 // 8 rows * 3 columns
  const servicesPerRow = 3

  // Filter logic
  const filteredServices = extendedservices.filter((service) => {
    if (sellerStatus === "Online" && !service.online) return false
    if (sellerLevel === "Premium" && !["Premium", "Elite"].includes(service.sellerLevel)) return false
    if (sellerLevel === "Elite" && service.sellerLevel !== "Elite") return false
    if (type && service.type !== type) return false
    if (country !== "Select one or more" && service.country !== country) return false
    if (priceRange) {
      if (priceRange === "Under $30" && service.price >= 30) return false
      if (priceRange === "$30 - $60" && (service.price < 30 || service.price > 60)) return false
      if (priceRange === "$60 and above" && service.price <= 60) return false
      if (priceRange === "Custom" && customPrice !== "" && service.price !== Number(customPrice)) return false
    }
    if (rating) {
      const minRating = Number.parseInt(rating.split(" ")[0])
      if (service.rating < minRating) return false
    }
    if (searchQuery && !service.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  // Sort logic
  const sortedServices = [...filteredServices].sort((a, b) => {
    if (sortBy === "Price: Low to High") return a.price - b.price
    if (sortBy === "Price: High to Low") return b.price - a.price
    if (sortBy === "Rating: High to Low") return b.rating - a.rating
    return 0 // Default to original order for "Relevance"
  })

  // Pagination logic
  const totalPages = Math.ceil(sortedServices.length / servicesPerPage)
  const startIndex = (currentPage - 1) * servicesPerPage
  const paginatedServices = sortedServices.slice(startIndex, startIndex + servicesPerPage)

  // Split services into rows
  const serviceRows = []
  for (let i = 0; i < paginatedServices.length; i += servicesPerRow) {
    serviceRows.push(paginatedServices.slice(i, i + servicesPerRow))
  }

  // Calculate sidebar height to match the 4th row
  useEffect(() => {
    const calculateSidebarHeight = () => {
      const fourthRow = document.querySelector(".service-row-3") // 4th row (index 3)
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
  }, [serviceRows])

  return (
    <div className="serviceListingsContainer min-h-screen overflow-x-hidden">
      {/* Header Section */}
      <div className="relative h-[300px] flex items-center justify-center mb-8 mt-8 mx-auto max-w-[1240px] px-4">
        <div className="absolute inset-0">
          <img
            src="/images/categoryBgPictures/servicesBg.png"
            alt="Logo Design Illustration"
            className="w-full h-[300px] object-cover rounded-[20px]"
          />
          <div className="absolute inset-0 rounded-lg"></div>
        </div>
        <div className="relative text-center z-10">
          <div className="inline-block relative">
            <div className="absolute inset-0 bg-white bg-opacity-100 scale-125 rounded-full shadow-[0_0_30px_20px_rgba(255,255,255,0.3)]"></div>
            <div className="relative px-6 py-3">
              <h1 className="typoH1 text-black">Logo Design</h1>
              <p className="typoS2 text-text mt-2">Explore top talent in Logo designs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-[1240px]  py-6 relative">
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
                options={["Select one or more", "Pakistan", "India Assimilation", "USA"]}
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

          {/* Main Service Listings */}
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

            {serviceRows.length > 0 ? (
              <div>
                {serviceRows.map((row, rowIndex) => (
                  <div key={rowIndex}>
                    <div
                      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 service-row-${rowIndex}`}
                    >
                      {row.map((service) => (
                        <ServiceCard key={service.id} service={service} />
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
              <p className="text-center text-textLight">No services found matching your criteria.</p>
            )}
          </main>
        </div>
         {/* Pagination */}
{serviceRows.length > 0 && (
  <div className="flex justify-center mt-8">
    <div className="flex items-center gap-4">
      {/* Left Arrow */}
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        className={`w-12 h-12 flex items-center justify-center rounded-full border border-[#E6ECEF] ${
          currentPage === 1 ? "bg-white text-[#767B7F] cursor-not-allowed" : "bg-white text-[#3F3F3F]"
        } transition-colors duration-200`}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="w-7 h-7" />
      </button>

      {/* Page Buttons */}
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

      {/* Right Arrow */}
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
        {serviceRows.length > 0 && (
          <div className="relative w-[100vw] -mx-[calc(50vw-50%)] rounded-[20px] mt-8">
            <SponsoredSlideshow />
          </div>
        )}

      
      </div>
    </div>
  )
}
