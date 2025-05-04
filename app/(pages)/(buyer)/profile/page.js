"use client";
import { Star } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import ServiceCard from '@/components/buyer/serviceCard';
import { ChevronRight, ChevronLeft, Send, ArrowRight } from "lucide-react";
import Link from "next/link";



const CardSlider = ({ title, subtitle, items, renderItem, cardWidth = 280, cardType }) => {
    const sliderRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
  
    // Check if we need to show navigation arrows
    useEffect(() => {
      if (!sliderRef.current) return;
      
      const checkArrows = () => {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5); // 5px buffer
      };
      
      checkArrows();
      sliderRef.current.addEventListener('scroll', checkArrows);
      return () => {
        if (sliderRef.current) {
          sliderRef.current.removeEventListener('scroll', checkArrows);
        }
      };
    }, [items]);
  
    // Mouse drag handlers
    const handleMouseDown = (e) => {
      setIsDragging(true);
      setStartPos(e.pageX - sliderRef.current.offsetLeft);
      setScrollLeft(sliderRef.current.scrollLeft);
    };
  
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - sliderRef.current.offsetLeft;
      const walk = (x - startPos) * 2; // Multiply for faster scrolling
      sliderRef.current.scrollLeft = scrollLeft - walk;
    };
  
    const handleMouseUp = () => {
      setIsDragging(false);
    };
  
    const handleMouseLeave = () => {
      setIsDragging(false);
    };
  
    // Navigation handlers
    const slideLeft = () => {
      if (!sliderRef.current) return;
      sliderRef.current.scrollBy({
        left: -cardWidth - 14, // Scroll one card width + padding
        behavior: 'smooth'
      });
    };
  
    const scrollRight = () => {
      if (!sliderRef.current) return;
      sliderRef.current.scrollBy({
        left: cardWidth + 14, // Scroll one card width + padding
        behavior: 'smooth'
      });
    };
  
    return (
      <div className="w-full">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-5xl font-semiBold text-black">{title}</h2>
            <p className="text-sm text-gray-500">{subtitle}</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={slideLeft}
              className={`p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-opacity ${!showLeftArrow ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!showLeftArrow}
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={scrollRight}
              className={`p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-opacity ${!showRightArrow ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!showRightArrow}
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
        
        <div 
          className="w-full overflow-hidden"
        >
          <div 
            ref={sliderRef}
            className={`flex overflow-x-auto scrollbar-hide scroll-smooth`}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
  {items.map((item, index) => (
    <div 
      key={index} 
      className="flex-none mr-[14px] first:pl-0"
      style={{ width: cardType === 'software' ? 'auto' : `${cardWidth}px` }} 
    >
      {renderItem(item, index)}
    </div>
  ))}
          </div>
        </div>
      </div>
    );
  };

  

  const services = [
    {
      id: 1,
      image: "/service1.jpg",
      sellerName: "kahmiri",
      location: "pakistan",
      title: "AI and Machine Learning Using Python Programming Language",
      rating: "4.2",
      reviews: "273",
      price: "1,141",
    },
    {
      id: 2,
      image: "/service2.jpg",
      sellerName: "kahmiri",
      location: "pakistan",
      title: "AI and Machine Learning Using Python Programming Language",
      rating: "4.2",
      reviews: "273",
      price: "1,141",
    },
    {
      id: 3,
      image: "/service3.jpg",
      sellerName: "kahmiri",
      location: "pakistan",
      title: "AI and Machine Learning Using Python Programming Language",
      rating: "4.2",
      reviews: "273",
      price: "1,141",
    },
    {
      id: 4,
      image: "/service4.jpg",
      sellerName: "kahmiri",
      location: "pakistan",
      title: "AI and Machine Learning Using Python Programming Language",
      rating: "4.2",
      reviews: "273",
      price: "1,141",
    },
    {
      id: 5,
      image: "/service1.jpg",
      sellerName: "kahmiri",
      location: "pakistan",
      title: "AI and Machine Learning Using Python Programming Language",
      rating: "4.2",
      reviews: "273",
      price: "1,141",
    },
    {
      id: 6,
      image: "/service1.jpg",
      sellerName: "kahmiri",
      location: "pakistan",
      title: "AI and Machine Learning Using Python Programming Language",
      rating: "4.2",
      reviews: "273",
      price: "1,141",
    },
    {
      id: 7,
      image: "/service1.jpg",
      sellerName: "kahmiri",
      location: "pakistan",
      title: "AI and Machine Learning Using Python Programming Language",
      rating: "4.2",
      reviews: "273",
      price: "1,141",
    },
    {
      id: 8,
      image: "/service1.jpg",
      sellerName: "kahmiri",
      location: "pakistan",
      title: "AI and Machine Learning Using Python Programming Language",
      rating: "4.2",
      reviews: "273",
      price: "1,141",
    },
  ];



export default function ProfilePage() {
  return (
    <div className="bg-white">
      <div className="max-w-[1440px] mx-auto px-6 mt-[50px] md:px-[150px] grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Profile Card */}
        <div className="bg-white rounded-[20px] p-6 border">
          <div className="flex items-center">
            <div className="relative">
              <img 
                src="/api/placeholder/80/80" 
                alt="Profile" 
                className="h-16 w-16 rounded-full object-cover"
              />
              <div className="absolute top-0 right-0 h-3 w-3 bg-success rounded-full"></div>
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-black">Shahab Hassan Riaz</h2>
              <p className="text-sm text-textLight">@Shahab568</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <div className="flex items-center">
              <div className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center">
                <span className="text-xs text-white">📍</span>
              </div>
              <span className="text-sm text-textLight ml-2">Islamabad, Pakistan</span>
            </div>
            
            <div className="flex items-center">
              <div className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center">
                <span className="text-xs text-white">🌐</span>
              </div>
              <span className="text-sm text-textLight ml-2">Urdu, English, Spanish</span>
            </div>
          </div>
          
        </div>

        {/* Right Contact Card */}
        <div className="bg-white rounded-[20px] p-6 border">
          <div className="flex items-center">
            <div className="relative">
              <img 
                src="/api/placeholder/80/80" 
                alt="Profile" 
                className="h-12 w-12 rounded-full object-cover"
              />
              <div className="absolute top-0 right-0 h-2 w-2 bg-success rounded-full"></div>
            </div>
            <div className="ml-3">
              <h2 className="text-base font-semibold text-black">Shahab Hassan Riaz</h2>
              <p className="text-xs text-success">Online</p>
            </div>
          </div>
          <Link href="/chatPage">
          <button className="w-full mt-6 py-2 px-8 border border-gray-300 rounded-[50px] text-black hover:bg-gray-50 transition-colors">
            Contact Me
          </button>
          </Link>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-[20px] p-6 border">
          <h3 className="text-lg font-normal text-black mb-4">About</h3>
          <p className="text-paragraphText text-text leading-relaxed">
            I bring ideas to life through bold and captivating designs. With a sharp eye for 
            detail and a passion for creativity, I craft visuals that not only look stunning but 
            also tell a story. Whether it's branding, illustrations, or digital artwork, I ensure 
            every design leaves a lasting impact.
          </p>
        </div>

        {/* Rating and Level */}
        <div className="bg-white rounded-[20px] p-6 border">
          <h3 className="text-lg font-normal text-black mb-4">Rating and Level</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-textLight">My Level</span>
              <span className="font-medium text-black">Regular</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-textLight">Rating</span>
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-software text-software" />
                <span className="ml-1 font-medium text-black">4.2/5</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-textLight">Total Orders</span>
              <span className="font-semibold text-black">273</span>
            </div>
          </div>
        </div>

        {/* Company Information */}
        <div className="bg-white rounded-[20px] p-6 border col-span-1 md:col-span-2 lg:col-span-1">
          <h3 className="text-lg font-normal text-black mb-4">Company Information</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-textLight">Company Name</span>
              <span className="font-medium text-black">StrawHash Solutions</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-textLight">No of Employees</span>
              <span className="font-medium text-black">97</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-textLight">Established In</span>
              <span className="font-medium text-black">12 Oct 2022</span>
            </div>
          </div>
        </div>
      </div>
       {/* Services Section */}
       <section className="flex py-16 justify-center items-center">
                    <div className="max-w-[1440px] md:px-[150px] mb-[50px]">
                      <CardSlider 
                        title="My Services"
                        subtitle="Explore Services I am offering"
                        items={services}
                        cardWidth={280}
                        renderItem={(service, index) => (
                          <ServiceCard key={index} service={service} />
                        )}
                      />
                    </div>
                  </section>
    </div>
  );
}