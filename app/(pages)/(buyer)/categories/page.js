"use client";

import { Tabs } from "@/components/utils/tabs";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categoriesData = {
  services: [
    {
      name: "ART & DESIGN",
      subcategories: [
        "Coupon Design",
        "Design Editing",
        "Fashion Design",
        "Font And Typography",
        "Illustrations",
        "Image Design And Editing",
        "Fashion Design",
        "Coupon Design",
        "Design Editing",
        "Fashion Design",
        "Font And Typography",
        "Illustrations",
        "Image Design And Editing",
        "Fashion Design",
        "Coupon Design",
        "Design Editing",
        "Fashion Design",
        "Font And Typography",
        "Illustrations",
        "Image Design And Editing",
        "Fashion Design",
        "Fashion Design",
        "Font And Typography",
        "Illustrations",
        "Image Design And Editing",
        "Fashion Design",
        "Coupon Design",
        "Design Editing",
        "Fashion Design",
        "Font And Typography",
        "Illustrations",
        "Image Design And Editing",
        "Fashion Design",
        "Fashion Design",
        "Font And Typography",
        "Illustrations",
        "Image Design And Editing",
        "Fashion Design",
        "Coupon Design",
        "Design Editing",
        "Fashion Design",
        "Font And Typography",
        "Illustrations",
        "Image Design And Editing",
        "Fashion Design",
      ],
      image: "/images/logoDesignCategory.png",
    },
    {
      name: "ART & DESIGN",
      subcategories: [
        "Coupon Design",
        "Design Editing",
        "Fashion Design",
        "Font And Typography",
        "Illustrations",
        "Image Design And Editing",
        "Fashion Design",
        "Coupon Design",
        "Design Editing",
        "Fashion Design",
        "Font And Typography",
        "Illustrations",
        "Image Design And Editing",
        "Fashion Design",
        "Coupon Design",
        "Design Editing",
        "Fashion Design",
        "Font And Typography",
        "Illustrations",
        "Image Design And Editing",
        "Fashion Design",
        "Coupon Design",
        "Design Editing",
        "Fashion Design",
        "Font And Typography",
        "Illustrations",
        "Image Design And Editing",
        "Fashion Design",
        "Coupon Design",
        "Design Editing",
        "Fashion Design",
        "Font And Typography",
        "Illustrations",
        "Image Design And Editing",
        "Fashion Design",
        "Coupon Design",
        "Design Editing",
        "Fashion Design",
        "Font And Typography",
        "Illustrations",
        "Image Design And Editing",
        "Fashion Design",
      ],
      image: "/images/logoDesignCategory.png",
    },
  ],
  softwares: [
    {
      name: "SOFTWARE DEVELOPMENT",
      subcategories: [
        "Web Development",
        "Mobile Apps",
        "Backend Services",
        "Frontend Design",
        "API Integration",
        "Database Management",
        "Cloud Computing",
      ],
      image: "/path-to-stylized-image.jpg",
    },
  ],
  education: [
    {
      name: "EDUCATION & TRAINING",
      subcategories: [
        "Online Courses",
        "Tutoring Services",
        "Skill Workshops",
        "Certification Programs",
        "Language Learning",
        "Career Counseling",
      ],
      image: "/path-to-stylized-image.jpg",
    },
  ],
};

export default function CategoriesPage() {
  const [activeTab, setActiveTab] = useState("services");

  const tabs = [
    { id: "services", label: "SERVICES" },
    { id: "softwares", label: "SOFTWARES" },
    { id: "education", label: "EDUCATION" },
  ];

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Title Section */}
      <div className="relative text-center z-10 mb-8">
        <div className="inline-block relative">
          <div className="absolute inset-0 bg-white bg-opacity-100 scale-125 rounded-full shadow-[0_0_30px_20px_rgba(255,255,255,0.3)]"></div>
          <div className="relative px-6 py-3">
            <h1 className="typoH1 text-black">Categories</h1>
            <p className="typoS2 text-textLight mt-2">Change the tabs to see respective categories</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        tabs={tabs}
        defaultTab="services"
        className="max-w-2xl mx-auto mb-8"
        onTabChange={(id) => setActiveTab(id)}
      />

      {/* Category Cards Container */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <CategoryList categories={categoriesData[activeTab]} />
      </div>
    </div>
  );
}

function CategoryList({ categories }) {
  return (
    <div className="grid grid-cols-1 gap-8">
      {categories.map((category, index) => (
        <CategoryCard key={index} category={category} />
      ))}
    </div>
  );
}

// Helper function to group subcategories into columns of 7
const groupIntoColumns = (subcategories, itemsPerColumn) => {
  const columns = [];
  for (let i = 0; i < subcategories.length; i += itemsPerColumn) {
    columns.push(subcategories.slice(i, i + itemsPerColumn));
  }
  return columns;
};

function CategoryCard({ category }) {
  const containerRef = useRef(null);
  const subcategoriesRef = useRef(null);
  const [startIndex, setStartIndex] = useState(0);
  const [columnWidth, setColumnWidth] = useState(0);

  // Group subcategories into columns of 7
  const columns = groupIntoColumns(category.subcategories, 7);
  const columnsPerView = 4; // Show 5 columns at once
  const canScrollLeft = startIndex > 0;
  const canScrollRight = startIndex < columns.length - columnsPerView;

  // Calculate column width based on container width
  useEffect(() => {
    if (containerRef.current) {
      // Get the width of the container and divide by columns to display
      const containerWidth = containerRef.current.offsetWidth;
      const width = containerWidth / columnsPerView;
      setColumnWidth(width);
    }
  }, [columnsPerView]);

  const scrollLeft = () => {
    if (canScrollLeft) {
      setStartIndex((prev) => prev - 1);
    }
  };

  const scrollRight = () => {
    if (canScrollRight) {
      setStartIndex((prev) => prev + 1);
    }
  };

  // Scroll effect with smooth transition
  useEffect(() => {
    if (subcategoriesRef.current && columnWidth) {
      subcategoriesRef.current.style.transform = `translateX(-${startIndex * columnWidth}px)`;
      subcategoriesRef.current.style.transition = "transform 0.3s ease-in-out";
    }
  }, [startIndex, columnWidth]);

  return (
    <div className="bg-white rounded-[20px] border border-border shadow-sm overflow-hidden">
      <div className="flex">
        {/* Left Side - Image (Fixed Width) */}
        <div className="w-[128px] md:w-[160px] lg:w-[200px] min-w-[128px] md:min-w-[160px] lg:min-w-[200px] relative flex-shrink-0">
          <Image
            src={category.image}
            alt={category.name}
            width={200}
            height={400}
            className="h-full w-full object-cover rounded-l-[20px]"
            priority
          />
        </div>

        {/* Right Side - Content */}
        <div className="flex-1 flex flex-col">
          {/* Category Title */}
          <div className="border-b border-border py-5 px-4">
            <h3 className="text-black font-medium text-[20px] leading-[20px] font-sans uppercase">
              {category.name}
            </h3>
          </div>

          {/* Subcategories Container */}
          <div 
            ref={containerRef}
            className="relative overflow-hidden py-10 px-4 flex-1"
          >
            {/* Visual mask to show only 5 columns */}
            <div className="relative overflow-hidden">
              <div
                ref={subcategoriesRef}
                className="flex transition-transform duration-300 ease-in-out"
              >
                {columns.map((column, colIndex) => (
                  <div
                    key={colIndex}
                    className="flex flex-col gap-y-5 px-3"
                    style={{ width: `${columnWidth}px`, flexShrink: 0 }}
                  >
                    {column.map((subcategory, idx) => (
                      <p
                        key={idx}
                        className="text-textLight text-sm hover:text-text cursor-pointer font-sans whitespace-nowrap"
                      >
                        {subcategory}
                      </p>
                    ))}
                    {/* Pad with empty rows to ensure exactly 7 rows */}
                    {column.length < 7 &&
                      Array.from({ length: 7 - column.length }).map((_, idx) => (
                        <div key={`empty-${idx}`} className="h-[1.25rem]" />
                      ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Arrows and Scroll Indicator */}
          {columns.length > columnsPerView && (
            <div className="flex justify-left py-3 px-3">
              <div className="flex items-center gap-2 bg-white rounded-full shadow-[0_0_10px_rgba(0,0,0,0.1)] px-4 py-2">
                <button
                  onClick={scrollLeft}
                  className={`p-2 rounded-full bg-btnbg text-text hover:bg-gray-200 transition-colors duration-200 ${!canScrollLeft && "opacity-50 cursor-not-allowed"}`}
                  disabled={!canScrollLeft}
                >
                  <ChevronLeft size={20} />
                </button>
                {/* Scroll Indicator Dots */}
                <div className="flex gap-1">
                  {Array.from({ length: columns.length - columnsPerView + 1 }).map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        idx === startIndex ? "bg-gray-600" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={scrollRight}
                  className={`p-2 rounded-full bg-btnbg text-text hover:bg-gray-200 transition-colors duration-200 ${!canScrollRight && "opacity-50 cursor-not-allowed"}`}
                  disabled={!canScrollRight}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}