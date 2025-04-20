import Image from "next/image"
import { Star } from "lucide-react"

export default function ServiceCard({ service }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-border hover:shadow-md transition-shadow">
      <div className="relative">
        <Image
          src={service.image || "/placeholder.svg?height=200&width=300"}
          alt={service.title}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center mb-2">
          <div className="flex items-center mr-2">
            <Image
              src={service.sellerAvatar || "/placeholder.svg?height=24&width=24"}
              alt={service.sellerName}
              width={24}
              height={24}
              className="rounded-full mr-2"
            />
            <span className="text-sm font-medium">{service.sellerName}</span>
          </div>
          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded">Gold</span>
        </div>

        <h3 className="font-medium text-sm mb-2 line-clamp-2 h-10">{service.title}</h3>

        <div className="flex items-center mb-2">
          <div className="flex items-center text-yellow-400">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-xs ml-1">{service.rating}</span>
          </div>
          <span className="text-xs text-textLight ml-1">({service.reviewCount})</span>
        </div>

        <div className="text-sm font-semibold">From per {service.price}</div>
      </div>
    </div>
  )
}
