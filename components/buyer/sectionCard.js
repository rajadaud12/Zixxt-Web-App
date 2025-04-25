import React from "react";

export default function SectionCard() {
  const categories = [
    {
      title: "Services",
      description: "Unlock a wide range of expert solutions designed to meet your needs.",
      link: "/services",
      iconColor: "bg-blue-400",
      gradientClass: "bg-gradient-to-b from-blue-50 to-white",
      linkText: "View Services",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>
      )
    },
    {
      title: "Education",
      description: "Unlock a wide range of expert solutions designed to meet your needs.",
      link: "/education",
      iconColor: "bg-green-500",
      gradientClass: "bg-gradient-to-b from-green-50 to-white",
      linkText: "View Educational Content",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      )
    },
    {
      title: "Softwares",
      description: "Unlock a wide range of expert solutions designed to meet your needs.",
      link: "/softwares",
      iconColor: "bg-yellow-400",
      gradientClass: "bg-gradient-to-b from-yellow-50 to-white",
      linkText: "View Softwares",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>
      )
    }
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full max-w-6xl mx-auto p-4">
      {categories.map((category, index) => (
        <div 
          key={index} 
          className={`${category.gradientClass} rounded-[40px] p-6 flex-1 flex flex-col hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300`}
        >
          <div className={`${category.iconColor} rounded-full w-14 h-14 flex items-center justify-center mb-4`}>
            {category.icon}
          </div>
          
          <h3 className="text-l font-normal mb-1 text-black">{category.title}</h3>
          
          <p className="text-gray-600 text-xs mb-6">
            {category.description}
          </p>
          
          <a 
            href={category.link} 
            className="mt-auto inline-flex items-center text-sm font-medium text-black hover:underline"
          >
            {category.linkText}
            <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      ))}
    </div>
  );
}