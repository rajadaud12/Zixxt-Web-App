"use client"

import { useRouter } from "next/navigation"
import { Star } from "lucide-react"

export default function ServiceCard({ service }) {
  const router = useRouter()

  // Function to handle card click
  const handleCardClick = () => {
    router.push(`/serviceDetail/${service.id}`)
  }

  return (
    <div
      className="w-[280px] bg-white rounded-[20px] overflow-hidden hover:shadow-md transition-shadow border-b border-l border-r border-[#E6ECEF] cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img
          src={service.image || "/api/placeholder/280/160"}
          alt={service.title}
          className="w-full h-36 object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-col">
            <div className="flex items-center">
              <img
                src={service.avatar || "/api/placeholder/24/24"}
                alt={service.sellerName}
                className="w-6 h-6 rounded-full mr-2"
              />
              <span className="font-semibold text-base font-medium text-black">{service.sellerName || "kahmiri"}</span>
            </div>
            <span className="text-xs text-gray-500 ml-8">{service.location || "pakistan"}</span>
          </div>
          <span className="flex items-center justify-center w-[72px] h-[28px] text-xs rounded-[12px] bg-software bg-opacity-20 text-levelGold font-medium">Gold</span>
        </div>
        
        <p className="text-paragraphText font-normal leading-tight mb-2 h-10 overflow-hidden text-light">
          {service.title || "AI and Machine Learning Using Python Programming Language"}
        </p>
        
        <div className="flex items-center mb-1">
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-current text-software" />
            <span className="font-semibold text-sm text-black ml-1 font-medium">{service.rating || "4.2"}</span>
            <span className="text-xs text-gray-500 ml-1">/5</span>
          </div>
          <span className="text-xs text-gray-500 ml-1">({service.reviews || "273"})</span>
        </div>
        
        <div className="font-semibold text-base font-medium text-black">From pkr {service.price || "1,141"}</div>
      </div>
    </div>
  )
}