import React from 'react';
import { Star } from "lucide-react";

export default function SoftwareCard() {
  return (
    <div className="w-[810px] bg-white rounded-[30px] border border-border overflow-hidden">
      <div className="p-6">
        <div className="flex ml-[30px] mb-[30px]">
          {/* Left side with logo */}
          <div className="mr-8">
            <div className="w-[100px] h-[100px] bg-whiteGrey rounded-[16px] flex items-center justify-center overflow-hidden">
              <img 
                src="/api/placeholder/70/70"
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
                    <h3 className="text-base font-semibold text-black mr-2 leading-tight">Sh Solutions</h3>
                    <span className="text-sm text-gray-500 leading-tight">pakistan</span>
                      </div>
                    <span className="ml-3 px-4 py-1 bg-software bg-opacity-20 text-levelGold text-xs rounded-full font-medium">Gold</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-1">from</span>
                <span className="text-4xl font-medium text-black">$123.00</span>
              </div>
            </div>
            
            {/* Product title */}
            <h2 className="text-lg font-regular text-light mb-1">Duality Crm System With Admin Functionalities</h2>
            
            {/* Rating */}
            <div className="flex items-center">
              <Star className="w-5 h-5 fill-current text-software" />
              <span className="text-sm font-semibold text-black ml-1">4.2</span>
              <span className="text-xs text-gray-500 ml-1">/5</span>
              <span className="text-xs text-gray-500 ml-1">(273)</span>
            </div>
          </div>
        </div>
        
        {/* Content below logo with left margin */}
        <div className="ml-[30px]">
          {/* Description */}
          <p className="text-paragraphText text-light mb-5">
            A Powerful And Efficient CRM System Designed To Manage Customer Relationships, Track Sales, And Streamline Business Operations With Robust Admin Controls.
            <span className="text-course ml-1">Updated Feb 2025</span>
          </p>
          
          {/* Features */}
          <div className="mb-[30px]">
            <h4 className="font-semibold text-base text-black mb-3">Features:</h4>
            <div className="grid grid-cols-3 gap-y-3 gap-x-4">
              <div className="flex items-center">
                <span className="text-primary mr-2">✓</span>
                <span className="text-sm text-text">Lead & Contact Management</span>
              </div>
              <div className="flex items-center">
                <span className="text-primary mr-2">✓</span>
                <span className="text-sm text-text">Task & Activity Management</span>
              </div>
              <div className="flex items-center">
                <span className="text-primary mr-2">✓</span>
                <span className="text-sm text-text">Lead & Contact Management</span>
              </div>
              <div className="flex items-center">
                <span className="text-primary mr-2">✓</span>
                <span className="text-sm text-text">Sales Pipeline Tracking</span>
              </div>
              <div className="flex items-center">
                <span className="text-primary mr-2">✓</span>
                <span className="text-sm text-text">Reports & Analytics</span>
              </div>
              <div className="flex items-center">
                <span className="text-primary mr-2">✓</span>
                <span className="text-sm text-text">Lead & Contact Management</span>
              </div>
              <div className="flex items-center">
                <span className="text-primary mr-2">✓</span>
                <span className="text-sm text-text">Lead & Contact Management</span>
              </div>
              <div className="flex items-center">
                <span className="text-primary mr-2">✓</span>
                <span className="text-sm text-text">Lead & Contact Management</span>
              </div>
              <div className="flex items-center">
                <span className="text-primary mr-2">✓</span>
                <span className="text-sm text-text">Lead & Contact Management</span>
              </div>
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