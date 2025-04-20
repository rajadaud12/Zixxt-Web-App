import Link from "next/link"
import Image from "next/image"
import { Star, Check } from "lucide-react"

export default function SoftwareCard({ software }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-border hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-start">
          <div className="mr-4">
            <Image
              src={software.logo || "/placeholder.svg?height=60&width=60"}
              alt={software.title}
              width={60}
              height={60}
              className="rounded-md"
            />
          </div>
          <div>
            <div className="flex items-center mb-1">
              <div className="flex items-center mr-2">
                <span className="text-sm font-medium">{software.provider}</span>
              </div>
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded">Gold</span>
            </div>

            <h3 className="font-medium text-sm mb-1">{software.title}</h3>

            <div className="flex items-center mb-2">
              <div className="flex items-center text-yellow-400">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-xs ml-1">{software.rating}</span>
              </div>
              <span className="text-xs text-textLight ml-1">({software.reviewCount})</span>
            </div>
          </div>
          <div className="ml-auto text-right">
            <div className="text-lg font-bold text-gray-700">from ${software.price}</div>
          </div>
        </div>

        <p className="text-xs text-textLight mb-4 mt-2">{software.description}</p>

        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-2">Features:</h4>
          <div className="grid grid-cols-2 gap-2">
            {software.features?.map((feature, index) => (
              <div key={index} className="flex items-center text-xs">
                <Check className="h-3 w-3 mr-1 text-primary" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <button className="text-xs text-primary hover:underline">Go to details</button>
          <Link href={`/software/${software.id}`} className="text-xs text-primary hover:underline">
            View Website
          </Link>
        </div>
      </div>
    </div>
  )
}
