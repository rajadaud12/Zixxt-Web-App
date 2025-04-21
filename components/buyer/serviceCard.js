
import { Star } from "lucide-react"

export default function ServiceCard({ service }) {
  return (
    <div className="w-48 bg-white rounded overflow-hidden shadow-sm">
      <div className="relative">
        <img
          src={service.image || "/api/placeholder/200/160"}
          alt={service.title}
          className="w-full h-32 object-cover"
        />
      </div>
      <div className="p-3">
        <div className="flex items-center mb-1">
          <div className="flex items-center">
            <img
              src={service.avatar || "/api/placeholder/24/24"}
              alt={service.sellerName}
              className="w-5 h-5 rounded-full mr-1"
            />
            <span className="text-xs font-medium">{service.sellerName}</span>
          </div>
          <span className="ml-auto text-xs px-1.5 rounded bg-amber-100 text-amber-600 font-medium">Gold</span>
        </div>
        
        <p className="text-xs font-medium leading-tight mb-1 h-8 overflow-hidden">
          {service.title || "AI and Machine Learning Using Python Programming Language"}
        </p>
        
        <div className="flex items-center mb-1">
          <div className="flex items-center text-amber-500">
            <Star className="w-3 h-3 fill-current" />
            <span className="text-xs ml-0.5">{service.rating || "4.2"}</span>
          </div>
          <span className="text-xs text-gray-500 ml-1">({service.reviews || "3,275"})</span>
        </div>
        
        <div className="text-xs font-medium">From plr {service.price || "1,141"}</div>
      </div>
    </div>
  );
}