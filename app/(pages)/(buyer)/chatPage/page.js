"use client";

import React, { useState } from 'react';
import { Search, MoreHorizontal, Paperclip, Send, Check } from 'lucide-react';
import { Star } from 'lucide-react';


export default function ChatInterface() {
  const [showOffer, setShowOffer] = useState(false);
  
  const toggleOffer = () => {
    setShowOffer(!showOffer);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-6 mt-[50px] md:px-[100px]">
    <div className="flex max-h-screen bg-whiteGrey font-sans">
      {/* Left sidebar - chat list */}
      <div className="w-100 border-r border-border bg-white">
        {/* Search bar */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textLight w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full bg-white border rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none"
            />
          </div>
        </div>
        
        {/* Chat list */}
        <div className="overflow-y-auto">
          {/* Chat item 1 */}
          <div className="flex items-center p-4 hover:bg-gray-50 cursor-pointer border-l-4 border-primary">
            <div className="relative">
              <img 
                src="/api/placeholder/48/48" 
                alt="Shahab" 
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-white"></div>
            </div>
            <div className="ml-3 flex-grow">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-black">Shahab</h3>
                <span className="text-xs text-textLight">3:40 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xs text-primary">On for 12:30 PM then?</p>
                <span className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">2</span>
              </div>
            </div>
          </div>
          
          {/* Chat item 2 */}
          <div className="flex items-center p-4 hover:bg-gray-50 cursor-pointer">
            <div className="relative">
              <img 
                src="/api/placeholder/48/48" 
                alt="Daud" 
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
            <div className="ml-3 flex-grow">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-black">Daud</h3>
                <span className="text-xs text-textLight">3:40 PM</span>
              </div>
              <p className="text-xs text-textLight truncate">Would you like to pay online or in-person...</p>
            </div>
          </div>
          
          {/* Chat item 3 */}
          <div className="flex items-center p-4 hover:bg-gray-50 cursor-pointer">
            <div className="relative">
              <img 
                src="/api/placeholder/48/48" 
                alt="Hassan" 
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
            <div className="ml-3 flex-grow">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-black">Hassan</h3>
                <span className="text-xs text-textLight">3:40 PM</span>
              </div>
              <p className="text-xs text-textLight truncate">From chew toys to cozy</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main chat area */}
      <div className="flex-grow flex flex-col relative">
        {/* Chat header */}
        <div className="bg-secondary px-6 py-4 border-b border-border flex justify-between items-center">
          <div className="flex items-center">
            <div className="relative">
              <img 
                src="/api/placeholder/40/40" 
                alt="Shahab" 
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
            <div className="ml-3">
              <h3 className="font-medium text-black">Shahab</h3>
              <p className="text-xs text-textLight">last seen 45 minutes ago</p>
            </div>
          </div>
          <button>
            <MoreHorizontal className="text-textLight" />
          </button>
        </div>
        
        {/* Chat messages */}
        <div className="flex-grow overflow-y-auto px-6 py-4 bg-white">
          <div className="text-xs text-center text-textLight mb-4">8/20/2020</div>
          
          {/* Receiver message */}
          <div className="flex justify-start mb-4">
            <div className="bg-secondary rounded-tl-[30px] rounded-tr-[30px] rounded-br-[30px] p-4 max-w-xs md:max-w-md">
              <p className="text-sm text-text">thats great tell me about your requirements</p>
              <span className="text-xs text-textLight block text-right mt-1">11:31 AM</span>
            </div>
          </div>
          
          {/* Sender message */}
          <div className="flex justify-end mb-4">
            <div className="bg-primary rounded-tl-[30px] rounded-tr-[30px] rounded-bl-[30px] p-4 max-w-xs md:max-w-md">
              <p className="text-sm text-white">Hello!!! 👋</p>
              <div className="flex justify-end items-center gap-1 mt-1">
                <span className="text-xs text-white/80">11:31 AM</span>
                <Check className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
          
          {/* Receiver message */}
          <div className="flex justify-start mb-4">
            <div className="bg-secondary rounded-tl-[30px] rounded-tr-[30px] rounded-br-[30px] p-4 max-w-xs md:max-w-md">
              <p className="text-sm text-text">thats great tell me about your requirements</p>
              <span className="text-xs text-textLight block text-right mt-1">11:31 AM</span>
            </div>
          </div>
          
          {/* Sender message */}
          <div className="flex justify-end mb-4">
            <div className="bg-primary rounded-tl-[30px] rounded-tr-[30px] rounded-bl-[30px] p-4 max-w-xs md:max-w-md">
              <p className="text-sm text-white">So I want a Logo design that just fits properly wit my brands voice it should depict it in a good way</p>
              <div className="flex justify-end items-center gap-1 mt-1">
                <span className="text-xs text-white/80">11:31 AM</span>
                <Check className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
          
          {/* Conditional offer block */}
          {!showOffer ? (
            <div className="flex justify-start mb-4">
              <div className="bg-secondary rounded-tl-[30px] rounded-tr-[30px] rounded-br-[30px] p-4 max-w-xs md:max-w-md">
                <p className="text-sm text-text">thats great tell me about your requirements</p>
                <span className="text-xs text-textLight block text-right mt-1">11:31 AM</span>
              </div>
            </div>
          ) : (
            <div className="bg-green-50 rounded-lg p-4 mb-4 border border-green-100">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <span className="text-sm text-black">Seller has sent the </span>
                  <span className="text-sm text-primary ml-1">milestones</span>
                </div>
                <button className="text-sm text-primary">View Details</button>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="font-medium">Total: <span className="text-primary font-semibold">$195</span></div>
                <div className="flex gap-2">
                  <button className="bg-white text-success border border-success rounded-md px-6 py-2 text-sm hover:bg-green-50 transition-colors">
                    Start Order
                  </button>
                  <button className="bg-white text-failure border border-failure rounded-md px-6 py-2 text-sm hover:bg-red-50 transition-colors">
                    Reject
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Chat input */}
        <div className="p-4 border-t border-border bg-white">
          <div className="relative flex items-center">
            <button className="absolute left-4 text-textLight">
              <Paperclip className="w-5 h-5" />
            </button>
            <input 
              type="text" 
              placeholder="Type a message" 
              className="w-full bg-whiteGrey rounded-full py-3 pl-12 pr-12 focus:outline-none"
            />
            <button className="absolute right-4 text-primary">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Right sidebar - Seller details */}
      <div className="w-80 border-l border-border bg-white">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-medium text-black">Seller Details</h2>
        </div>
        
        <div className="p-4 flex flex-col items-center">
          <div className="relative mb-2">
            <img 
              src="/api/placeholder/80/80" 
              alt="Profile" 
              className="w-20 h-20 rounded-full object-cover"
            />
          </div>
          <div className="flex max-w-[200px] items-center mb-2">
            <div className='flex-1 justify-start pr-5'>
          <h3 className="font-medium text-black">kahmiri</h3>
          <p className="text-sm text-textLight mb-2">pakistan</p>
          </div>
          <span className="flex text-center justify-center bg-software bg-opacity-20 text-levelGold text-sm font-medium rounded-[50px] w-[80px] h-[30px] mb-4 pt-1">Gold</span>
          </div>

          <button className="w-full py-2 border border-border rounded-[50px] text-black hover:bg-gray-50 transition-colors mb-6">
            View Profile
          </button>
          
          <div className="w-full space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-textLight">From</span>
              <span className="text-sm font-medium">Islamabad, Pakistan</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-textLight">Languages</span>
              <span className="text-sm font-medium">English, Urdu, Spanish</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-textLight">Rating</span>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-software text-software mr-1" />
                <span className="text-sm font-medium">4.2/5 (273 Orders)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Toggle button for demo purposes */}
        <div className="p-4 flex justify-center">
          <button 
            onClick={toggleOffer}
            className="bg-primary text-white rounded-md px-4 py-2 text-sm hover:bg-blue-600 transition-colors"
          >
            {showOffer ? "Hide Offer" : "Show Offer"}
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}