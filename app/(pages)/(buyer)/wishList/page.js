"use client"
import { useState } from "react";
import { Star } from "lucide-react";

// WishlistCard component based on ServiceCard with improved styling
function WishlistCard({ service }) {
  return (
    <div
      className="w-full bg-white rounded-lg overflow-hidden hover:shadow-md transition-shadow border border-gray-100 cursor-pointer"
    >
      <div className="relative">
        <img
          src={service.image || "/api/placeholder/280/160"}
          alt={service.title}
          className="w-full h-40 object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <img
              src={service.avatar || "/api/placeholder/24/24"}
              alt={service.sellerName}
              className="w-6 h-6 rounded-full mr-2"
            />
            <div className="flex flex-col">
              <span className="font-medium text-sm text-black">{service.sellerName || "kahmiri"}</span>
              <span className="text-xs text-gray-500">{service.location || "pakistan"}</span>
            </div>
          </div>
          <span className="flex items-center justify-center px-3 py-1 text-xs rounded-full bg-amber-50 text-amber-800 font-medium">Gold</span>
        </div>
        
        <p className="text-gray-800 font-medium text-sm leading-tight mb-2 h-10 overflow-hidden">
          {service.title || "AI and Machine Learning Using Python Programming Language"}
        </p>
        
        <div className="flex items-center mb-1">
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-current text-amber-400" />
            <span className="font-medium text-sm text-black ml-1">{service.rating || "4.2"}</span>
            <span className="text-xs text-gray-500 ml-1">/5</span>
          </div>
          <span className="text-xs text-gray-500 ml-1">({service.reviews || "273"})</span>
        </div>
        
        <div className="font-medium text-sm text-black">From pkr {service.price || "1,141"}</div>
      </div>
    </div>
  );
}

// Tabs component with improved styling
function Tabs({ tabs, defaultTab, className = "" }) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id);

  return (
    <div className={className}>
      <div className="flex rounded-full border border-gray-200 p-1 w-full bg-white">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-full transition-all ${
              activeTab === tab.id ? "bg-gray-100 text-gray-800" : "bg-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-8">{tabs.find((tab) => tab.id === activeTab)?.content}</div>
    </div>
  );
}

// Sample data for wishlist items with more realistic images
const wishlistItems = [
  {
    id: 1,
    image: "/api/placeholder/280/160",
    avatar: "/api/placeholder/24/24",
    sellerName: "kahmiri",
    location: "pakistan",
    title: "AI and Machine Learning Using Python Programming Language",
    rating: "4.2",
    reviews: "273",
    price: "1,141"
  },
  {
    id: 2,
    image: "/api/placeholder/280/160",
    avatar: "/api/placeholder/24/24",
    sellerName: "kahmiri",
    location: "pakistan",
    title: "AI and Machine Learning Using Python Programming Language",
    rating: "4.2",
    reviews: "273",
    price: "1,141"
  },
  {
    id: 3,
    image: "/api/placeholder/280/160",
    avatar: "/api/placeholder/24/24",
    sellerName: "kahmiri",
    location: "pakistan",
    title: "AI and Machine Learning Using Python Programming Language",
    rating: "4.2",
    reviews: "273",
    price: "1,141"
  },
  {
    id: 4,
    image: "/api/placeholder/280/160",
    avatar: "/api/placeholder/24/24",
    sellerName: "kahmiri",
    location: "pakistan",
    title: "AI and Machine Learning Using Python Programming Language",
    rating: "4.2",
    reviews: "273",
    price: "1,141"
  },
  {
    id: 5,
    image: "/api/placeholder/280/160",
    avatar: "/api/placeholder/24/24",
    sellerName: "kahmiri",
    location: "pakistan",
    title: "AI and Machine Learning Using Python Programming Language",
    rating: "4.2",
    reviews: "273",
    price: "1,141"
  },
  {
    id: 6,
    image: "/api/placeholder/280/160",
    avatar: "/api/placeholder/24/24",
    sellerName: "kahmiri",
    location: "pakistan",
    title: "AI and Machine Learning Using Python Programming Language",
    rating: "4.2",
    reviews: "273",
    price: "1,141"
  },
  {
    id: 7,
    image: "/api/placeholder/280/160",
    avatar: "/api/placeholder/24/24",
    sellerName: "kahmiri",
    location: "pakistan",
    title: "AI and Machine Learning Using Python Programming Language",
    rating: "4.2",
    reviews: "273",
    price: "1,141"
  },
  {
    id: 8,
    image: "/api/placeholder/280/160",
    avatar: "/api/placeholder/24/24",
    sellerName: "kahmiri",
    location: "pakistan",
    title: "AI and Machine Learning Using Python Programming Language",
    rating: "4.2",
    reviews: "273",
    price: "1,141"
  },
  {
    id: 9,
    image: "/api/placeholder/280/160",
    avatar: "/api/placeholder/24/24",
    sellerName: "kahmiri",
    location: "pakistan",
    title: "AI and Machine Learning Using Python Programming Language",
    rating: "4.2",
    reviews: "273",
    price: "1,141"
  },
  {
    id: 10,
    image: "/api/placeholder/280/160",
    avatar: "/api/placeholder/24/24",
    sellerName: "kahmiri",
    location: "pakistan",
    title: "AI and Machine Learning Using Python Programming Language",
    rating: "4.2",
    reviews: "273",
    price: "1,141"
  },
  {
    id: 11,
    image: "/api/placeholder/280/160",
    avatar: "/api/placeholder/24/24",
    sellerName: "kahmiri",
    location: "pakistan",
    title: "AI and Machine Learning Using Python Programming Language", 
    rating: "4.2",
    reviews: "273",
    price: "1,141"
  },
  {
    id: 12,
    image: "/api/placeholder/280/160",
    avatar: "/api/placeholder/24/24",
    sellerName: "kahmiri",
    location: "pakistan",
    title: "AI and Machine Learning Using Python Programming Language",
    rating: "4.2",
    reviews: "273",
    price: "1,141"
  }
];

// Main WishList component
export default function WishList() {

  const tabs = [
    {
      id: "software",
      label: "Software",
    },
    {
      id: "services",
      label: "Services",
    },
    {
      id: "courses",
      label: "Courses",
    },
  ];

  return (
    <div className="max-w-[1440px] mx-auto mt-[50px] mb-[100px] px-6 md:px-[100px]">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Wish List</h1>
        <p className="text-gray-600">Have your favorite items here!</p>
      </div>
      
      <div className="max-w-[480px] mx-auto mb-10">
        <Tabs tabs={tabs} defaultTab="software" className="w-full" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-[14px] gap-y-[70px] mt-[100px]">
      {wishlistItems.map((item) => (
        <WishlistCard key={item.id} service={item} />
      ))}
    </div>
    </div>
  );
}