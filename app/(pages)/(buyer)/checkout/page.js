"use client"

import { useState } from 'react';
import { ChevronRight, ChevronDown, Plus, Eye, Clock } from 'lucide-react';

export default function CheckoutPage() {
  return (
    <div className="flex flex-col max-w-[1440px] mx-auto px-6 md:flex-row md:px-[100px] justify-center mt-[50px] gap-4 p-4 max-w-6xl mx-auto bg-white min-h-screen font-sans">
      {/* Left Section - Address */}
      <div className="w-full md:w-1/2 p-4">
        <div className="bg-white p-6 border rounded-2xl mb-4">
          <h2 className="text-xl font-normal text-black mb-6">Address</h2>
          
          <div className="space-y-4">
            <div className="relative">
              <div className="flex justify-between items-center border border-inputBorder rounded-full p-4 cursor-pointer">
                <span className="text-grey">Country</span>
                <ChevronRight size={20} className="text-textLight" />
              </div>
            </div>
            
            <div className="relative">
              <div className="flex justify-between items-center border border-inputBorder rounded-full p-4 cursor-pointer">
                <span className="text-grey">State / Province</span>
                <ChevronDown size={20} className="text-textLight" />
              </div>
            </div>
            
            <div className="relative">
              <div className="flex justify-between items-center border border-inputBorder rounded-full p-4 cursor-pointer">
                <span className="text-grey">City</span>
                <ChevronDown size={20} className="text-textLight" />
              </div>
            </div>
            
            <div className="relative">
              <input 
                type="text" 
                placeholder="Postal Code" 
                className="w-full border border-inputBorder rounded-full p-4 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
          
          <p className="text-failure mt-4 text-sm">Note : Tax may vary on the basis of your location.</p>
        </div>
        
        <div className="bg-white p-6 border rounded-2xl">
          <h2 className="text-xl font-normal text-black mb-6">Payment Method</h2>
          
          <div className="space-y-4">
            <div className="bg-gray-100 rounded-full p-4">
              <p className="text-textLight text-center">1234 56** **** ****</p>
            </div>
            
            <button className="w-full flex items-center justify-center gap-2 border border-inputBorder rounded-full p-4 hover:bg-btnbg transition">
              <Plus size={20} />
              <span>Add New Method</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Right Section - Checkout Details */}
      <div className="w-full md:w-1/2 p-4">
        <div className="bg-white p-6 rounded-2xl border">
          <h2 className="text-xl text-black font-semibold mb-4 text-center">Checkout details</h2>
          
          <div className="flex items-center gap-4 pb-6">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" 
                alt="Designer profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-lg">I will design a custom logo for your brand</h3>
            </div>
          </div>
          
          <div className="py-6">
            {/* Updated layout to match the image - Gold badge and reviews */}
            <div className="flex justify-between items-center mb-4">
              <div className="bg-levelGold bg-opacity-20 rounded-full py-3 px-8 inline-block text-center w-[200px]">
                <span className="font-semibold text-levelGold">Gold</span>
              </div>
              
              <div className="flex items-center gap-1 rounded-full border px-4 py-3 border-border">
                <span className="text-software">★</span>
                <span className="font-medium">4.2</span>
                <span className="text-textLight text-sm">/ 5 ( 273 Orders )</span>
              </div>
            </div>
            
            {/* Updated layout for seller and buyer info */}
            <div className="flex text-center justify-between py-3 px-4 border border-border mb-4 rounded-full">
                <div className="flex items-center justify-center px-4">
              <span>Seller</span>
              </div>
              <div className="flex items-center justify-center px-4">
                <span className="font-normal text-bold">kahmiri</span>
                <span className="text-textLight text-sm ml-1">- (Pakistan)</span>
              </div>
            </div>
            
            <div className="flex justify-between py-3 px-4 border border-border mb-6 rounded-full">
                <div className="flex items-center justify-center px-4">
              <span>Buyer</span>
              </div>
              <div className="flex items-center justify-center px-4">
                <span className="font-normal text-bold">kahmiri</span>
                <span className="text-textLight text-sm ml-1">- (Pakistan)</span>
              </div>
            </div>
            
            <h3 className="font-semibold text-lg mb-4">Simple Package</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-2">
                <div className="min-w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>1 Simple Logo Concept</span>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="min-w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>High-Resolution PNG & JPG</span>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="min-w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>For Startups, personal brands, small projects</span>
              </div>
            </div>
            
            <div className="flex gap-6 mb-6">
              <div className="flex items-center gap-2 bg-gray-100 rounded-full py-2 px-4">
                <Eye size={16} />
                <span className="text-sm">3 DAYS DELIVERY</span>
              </div>
              
              <div className="flex items-center gap-2 bg-gray-100 rounded-full py-2 px-4">
                <Clock size={16} />
                <span className="text-sm">2 REVISIONS</span>
              </div>
            </div>
            
            <ul className="list-disc pl-5 space-y-2 mb-6 text-sm">
              <li>2days MAX Extension time</li>
              <li>deadline (Starting from now - 05/05/2025)</li>
              <li>5% discount after deadline</li>
            </ul>
            
            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span>Quoted Amount</span>
                <span className="font-semibold">$100</span>
              </div>
              
              <div className="flex justify-between">
                <span>Service Fee (5%)</span>
                <span className="font-semibold">$5</span>
              </div>
              
              <div className="flex justify-between">
                <span>Tax (10%)</span>
                <span className="font-semibold">$13</span>
              </div>
              
              <div className="flex justify-between text-lg font-bold mt-4 pt-4 border-t border-border">
                <span>Total Amount</span>
                <span>$118</span>
              </div>
            </div>
            
            <button className="w-full bg-black text-white rounded-full py-4 font-medium hover:opacity-90 transition">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}