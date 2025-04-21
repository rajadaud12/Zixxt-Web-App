import { Star } from "lucide-react"

export default function CourseCard({  course }) {
  return (
    <div className="w-[280px] bg-white rounded-[20px] overflow-hidden hover:shadow-md transition-shadow border-b border-l border-r border-[#E6ECEF]">
      <div className="relative">
        <img
          src={course.image || "/api/placeholder/280/160"}
          alt={course.title}
          className="w-full h-36 object-cover"
        />
         {course.duration && (
          <div className="absolute top-0 right-0 bg-white/20 backdrop-blur-md rounded-bl-[20px] text-white text-s px-3 py-2">
            {course.duration}
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-col">
            <div className="flex items-center">
              <img
                src={course.avatar || "/api/placeholder/24/24"}
                alt={course.sellerName}
                className="w-6 h-6 rounded-full mr-2"
              />
              <span className="font-semibold text-base font-medium text-black">{course.sellerName || "kahmiri"}</span>
            </div>
            <span className="text-xs text-gray-500 ml-8">{course.location || "pakistan"}</span>
          </div>
          <span className="flex items-center justify-center w-[72px] h-[28px] text-xs rounded-[12px] bg-software bg-opacity-20 text-levelGold font-medium">Gold</span>
        </div>
        
        <p className="text-paragraphText font-normal leading-tight mb-2 h-10 overflow-hidden text-light">
          {course.title || "AI and Machine Learning Using Python Programming Language"}
        </p>
        
        <div className="flex items-center mb-1">
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-current text-software" />
            <span className="font-semibold text-sm text-black ml-1 font-medium">{course.rating || "4.2"}</span>
            <span className="text-xs text-gray-500 ml-1">/5</span>
          </div>
          <span className="text-xs text-gray-500 ml-1">({course.reviews || "273"})</span>
        </div>
        
        <div className="font-semibold text-base font-medium text-black">From pkr {course.price || "1,141"}</div>
      </div>
    </div>
  );
}