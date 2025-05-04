"use client";

import { useRouter } from "next/navigation";
import { Star, Heart } from "lucide-react";
import { useWishlist } from "../../context/wishListContext";
import { useState } from "react";

export default function SoftwareCard({ software }) {
  const router = useRouter();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    router.push(`/softwareDetail/${software.id}`);
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    if (isInWishlist(software.id, "software")) {
      removeFromWishlist(software.id, "software");
    } else {
      addToWishlist(software, "software");
    }
  };

  return (
    <div
      className="w-[900px] bg-white rounded-[30px] border border-border overflow-hidden hover:shadow-md transition-shadow cursor-pointer relative"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <button
          className="absolute top-4 right-4 z-10 bg-white rounded-full p-1 shadow-sm transition-opacity"
          onClick={handleWishlistToggle}
        >
          <Heart
            className={`w-6 h-6 ${isInWishlist(software.id, "software") ? "text-red-500 fill-current" : "text-gray-500"}`}
          />
        </button>
      )}
      <div className="p-6">
        <div className="flex mx-[30px] mb-[30px]">
          <div className="mr-8">
            <div className="w-[100px] h-[100px] bg-whiteGrey rounded-[16px] flex items-center justify-center overflow-hidden">
              <img
                src={software.logo || "/api/placeholder/70/70"}
                alt="Company logo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-1">
              <div className="flex">
                <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center mr-2 text-white text-xs font-medium overflow-hidden">
                  <span>Sh</span>
                </div>
                <div>
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
            <h2 className="text-lg font-regular text-light mb-1">
              {software.title || "Duality Crm System With Admin Functionalities"}
            </h2>
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
        <div className="mx-[30px]">
          <p className="text-paragraphText text-light mb-5">
            {software.description ||
              "A Powerful And Efficient CRM System Designed To Manage Customer Relationships, Track Sales, And Streamline Business Operations With Robust Admin Controls."}
            <span className="text-course ml-1">
              {software.updated || "Updated Feb 2025"}
            </span>
          </p>
          <div className="mb-[30px]">
            <h4 className="font-semibold text-base text-black mb-3">Features:</h4>
            <div className="grid grid-cols-3 gap-y-3 gap-x-4">
              {(software.features || [
                "Lead & Contact Management",
                "Task & Activity Management",
                "Sales Pipeline Tracking",
                "Reports & Analytics",
                "Email Integration",
                "Customer Support",
                "Mobile Access",
                "Customizable Dashboard",
                "Data Security",
              ]).map((feature, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-sm text-text">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button className="btn btnPrimary btnMedium">Go to details</button>
            <button className="btn btnDefault btnMedium">View Website</button>
          </div>
        </div>
      </div>
    </div>
  );
}