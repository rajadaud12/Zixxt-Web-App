"use client"
import { useState } from "react";
import { Star, Heart } from "lucide-react";

// WishlistCard component for services and courses
function WishlistCard({ service, onRemove }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="w-full bg-white rounded-lg overflow-hidden hover:shadow-md transition-shadow border border-gray-100 cursor-pointer relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Heart icon that appears only on hover */}
      {isHovered && (
        <button 
          className="absolute top-2 right-2 z-10 bg-secondary rounded-full p-1 shadow-sm transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(service.id);
          }}
        >
          <Heart className="w-5 h-5 text-red-500 fill-current" />
        </button>
      )}
      
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

// SoftwareCard component with heart icon
function SoftwareCard({ software, onRemove }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="w-[900px] bg-white rounded-[30px] border border-border overflow-hidden hover:shadow-md transition-shadow cursor-pointer relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Heart icon that appears only on hover */}
      {isHovered && (
        <button 
          className="absolute top-4 right-4 z-10 bg-secondary rounded-full p-1 shadow-sm transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(software.id);
          }}
        >
          <Heart className="w-6 h-6 text-red-500 fill-current" />
        </button>
      )}

      <div className="p-6">
        <div className="flex mx-[30px] mb-[30px]">
          {/* Left side with logo */}
          <div className="mr-8">
            <div className="w-[100px] h-[100px] bg-whiteGrey rounded-[16px] flex items-center justify-center overflow-hidden">
              <img
                src={software.logo || "/api/placeholder/70/70"}
                alt="Company logo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Main content area */}
          <div className="flex-1">
            {/* Header with company name and price on the same line */}
            <div className="flex justify-between items-start mb-1">
              <div className="flex">
                {/* Small company logo */}
                <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center mr-2 text-white text-xs font-medium overflow-hidden">
                  <span>Sh</span>
                </div>
                <div>
                  {/* Company name with Gold badge */}
                  <div className="flex items-center mb-1">
                    <div className="flex flex-col gap-[1px]">
                      <h3 className="text-base font-semibold text-black mr-2 leading-tight">
                        {software.companyName || "Sh Solutions"}
                      </h3>
                      <span className="text-sm text-gray-500 leading-tight">
                        {software.location || "pakistan"}
                      </span>
                    </div>
                    <span className="ml-3 px-4 py-1 bg-software bg-opacity-20 text-levelGold text-xs rounded-full font-medium">
                      Gold
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-1">from </span>
                <span className="text-4xl font-medium text-black">
                  {`$${software.price || "123.00"}`}
                </span>
              </div>
            </div>

            {/* Product title */}
            <h2 className="text-lg font-regular text-light mb-1">
              {software.title || "Duality Crm System With Admin Functionalities"}
            </h2>

            {/* Rating */}
            <div className="flex items-center">
              <Star className="w-5 h-5 fill-current text-software" />
              <span className="text-sm font-semibold text-black ml-1">
                {software.rating || "4.2"}
              </span>
              <span className="text-xs text-gray-500 ml-1">/5</span>
              <span className="text-xs text-gray-500 ml-1">
                ({software.reviews || "273"})
              </span>
            </div>
          </div>
        </div>

        {/* Content below logo with equal margins */}
        <div className="mx-[30px]">
          {/* Description */}
          <p className="text-paragraphText text-light mb-5">
            {software.description ||
              "A Powerful And Efficient CRM System Designed To Manage Customer Relationships, Track Sales, And Streamline Business Operations With Robust Admin Controls."}
            <span className="text-course ml-1">
              {software.updated || "Updated Feb 2025"}
            </span>
          </p>

          {/* Features */}
          <div className="mb-[30px]">
            <h4 className="font-semibold text-base text-black mb-3">Features:</h4>
            <div className="grid grid-cols-3 gap-y-3 gap-x-4">
              {(software.features || [
                "Lead & Contact Management",
                "Task & Activity Management",
                "Lead & Contact Management",
                "Sales Pipeline Tracking",
                "Reports & Analytics",
                "Lead & Contact Management",
                "Lead & Contact Management",
                "Lead & Contact Management",
                "Lead & Contact Management",
              ]).map((feature, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-sm text-text">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons aligned to the right */}
          <div className="flex justify-end space-x-4">
            <button className="btn btnPrimary btnMedium">Go to details</button>
            <button className="btn btnDefault btnMedium">View Website</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Tabs component with improved styling
function Tabs({ tabs, defaultTab, className = "", onTabChange }) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    onTabChange(tabId);
  };

  return (
    <div className={className}>
      <div className="flex rounded-full border border-gray-200 p-1 w-full bg-white">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-full transition-all ${
              activeTab === tab.id ? "bg-gray-100 text-gray-800" : "bg-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// Sample data for wishlist items
const sampleServices = [
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
];

const sampleSoftware = [
  {
    id: 101,
    logo: "/api/placeholder/70/70",
    companyName: "Sh Solutions",
    location: "pakistan",
    title: "Duality Crm System With Admin Functionalities",
    rating: "4.2",
    reviews: "273",
    price: "123.00",
    description: "A Powerful And Efficient CRM System Designed To Manage Customer Relationships, Track Sales, And Streamline Business Operations With Robust Admin Controls.",
    updated: "Updated Feb 2025",
    features: [
      "Lead & Contact Management",
      "Task & Activity Management",
      "Sales Pipeline Tracking",
      "Reports & Analytics",
      "Email Integration",
      "Customer Support",
      "Mobile Access",
      "Customizable Dashboard",
      "Data Security"
    ]
  },
  {
    id: 102,
    logo: "/api/placeholder/70/70",
    companyName: "Tech Solutions",
    location: "United States",
    title: "Enterprise Project Management Software",
    rating: "4.5",
    reviews: "425",
    price: "299.00",
    description: "Comprehensive project management solution for enterprises with resource allocation, budget tracking, and team collaboration features.",
    updated: "Updated Mar 2025",
    features: [
      "Gantt Charts",
      "Resource Management",
      "Budget Tracking",
      "Team Collaboration",
      "Time Tracking",
      "Document Management",
      "Risk Assessment",
      "Reporting Dashboard",
      "API Integration"
    ]
  },
  {
    id: 103,
    logo: "/api/placeholder/70/70",
    companyName: "Tech Solutions",
    location: "United States",
    title: "Enterprise Project Management Software",
    rating: "4.5",
    reviews: "425",
    price: "299.00",
    description: "Comprehensive project management solution for enterprises with resource allocation, budget tracking, and team collaboration features.",
    updated: "Updated Mar 2025",
    features: [
      "Gantt Charts",
      "Resource Management",
      "Budget Tracking",
      "Team Collaboration",
      "Time Tracking",
      "Document Management",
      "Risk Assessment",
      "Reporting Dashboard",
      "API Integration"
    ]
  },
  {
    id: 104,
    logo: "/api/placeholder/70/70",
    companyName: "Tech Solutions",
    location: "United States",
    title: "Enterprise Project Management Software",
    rating: "4.5",
    reviews: "425",
    price: "299.00",
    description: "Comprehensive project management solution for enterprises with resource allocation, budget tracking, and team collaboration features.",
    updated: "Updated Mar 2025",
    features: [
      "Gantt Charts",
      "Resource Management",
      "Budget Tracking",
      "Team Collaboration",
      "Time Tracking",
      "Document Management",
      "Risk Assessment",
      "Reporting Dashboard",
      "API Integration"
    ]
  }
];

// Main WishList component
export default function WishList() {
  const [activeTab, setActiveTab] = useState("services");
  const [services, setServices] = useState(sampleServices);
  const [software, setSoftware] = useState(sampleSoftware);
  const [courses, setCourses] = useState([...sampleServices]); // Using services as courses for this example

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const removeService = (id) => {
    setServices(services.filter(item => item.id !== id));
  };

  const removeSoftware = (id) => {
    setSoftware(software.filter(item => item.id !== id));
  };

  const removeCourse = (id) => {
    setCourses(courses.filter(item => item.id !== id));
  };

  const tabs = [
    {
      id: "services",
      label: "Services",
    },
    {
      id: "software",
      label: "Software",
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
        <Tabs tabs={tabs} defaultTab="services" className="w-full" onTabChange={handleTabChange} />
      </div>

      {activeTab === "services" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-[14px] gap-y-[70px] mt-10">
          {services.map((item) => (
            <WishlistCard key={item.id} service={item} onRemove={removeService} />
          ))}
        </div>
      )}

      {activeTab === "software" && (
        <div className="flex flex-col items-center gap-6 mt-10">
          {software.map((item) => (
            <SoftwareCard key={item.id} software={item} onRemove={removeSoftware} />
          ))}
        </div>
      )}

      {activeTab === "courses" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-[14px] gap-y-[70px] mt-10">
          {courses.map((item) => (
            <WishlistCard key={item.id} service={item} onRemove={removeCourse} />
          ))}
        </div>
      )}
    </div>
  );
}