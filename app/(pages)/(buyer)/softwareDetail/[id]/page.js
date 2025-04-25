'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Heart, Check, ChevronRight, Star, Share2 } from 'lucide-react';
import { Dropdown } from '@/components/utils/dropdown';
import SoftwareCard from '@/components/buyer/softwareCard';
import ReviewTestimonial from '@/components/buyer/reviewTestimonial';
import { ChevronLeft, Send, ArrowRight } from "lucide-react";


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


  // Software data to match your image
  const softwares = [
    {
      id: 1,
      logo: "/api/placeholder/70/70",
      companyName: "Venhash Solutions",
      country: "Pakistan",
      title: "Duality CRM System With Admin Functionalities",
      rating: 4.2,
      reviewCount: 273,
      price: 123,
      level: "Gold",
      description: "A Powerful And Efficient CRM System Designed To Manage Customer Relationships, Track Sales, And Streamline Business Operations With Robust Admin Controls.",
      updated: "Feb 2025",
      features: [
        "Lead & Contact Management",
        "Task & Activity Management",
        "Sales Pipeline Tracking",
        "Reports & Analytics",
        "Lead & Contact Management",
        "Lead & Contact Management",
        "Lead & Contact Management",
        "Lead & Contact Management",
        "Lead & Contact Management"
      ]
    },
    {
      id: 2,
      logo: "/api/placeholder/70/70",
      companyName: "TechCorp",
      country: "USA",
      title: "Enterprise ERP Solution",
      rating: 4.5,
      reviewCount: 150,
      price: 200,
      level: "Platinum",
      description: "Comprehensive ERP system for large enterprises to manage all business operations efficiently. Large enterprises to manage all business operations efficiently.",
      updated: "Jan 2025",
      features: [
        "Inventory Management",
        "HR Management",
        "Financial Reporting",
        "Supply Chain Management",
        "Inventory Management",
        "Inventory Management",
        "Inventory Management",
        "Inventory Management",
        "Inventory Management"
      ]
    }
  ];



export default function SoftwareDetail({ params }) {
  const { id } = React.use(params);
  const [wishlist, setWishlist] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [thumbnailPage, setThumbnailPage] = useState(0);
  const thumbnailContainerRef = useRef(null);
  const [reviewFilter, setReviewFilter] = useState('All Ratings');
  const [activeTab, setActiveTab] = useState('monthly');

  // Handle image change (for arrows and thumbnails)
  const handleImageChange = (index) => {
    if (index < 0) {
      setCurrentImageIndex(software.galleryImages.length - 1);
    } else if (index >= software.galleryImages.length) {
      setCurrentImageIndex(0);
    } else {
      setCurrentImageIndex(index);
    }

    const thumbnailsPerPage = 6;
    const newPage = Math.floor(index / thumbnailsPerPage);
    setThumbnailPage(newPage);
  };

  // Add key navigation for gallery images
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handleImageChange(currentImageIndex - 1);
      } else if (e.key === 'ArrowRight') {
        handleImageChange(currentImageIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentImageIndex]);

  const software = {
    id,
    title: 'Quality CRM System with Admin Functionalities & Dual Interface',
    profile: {
      name: 'SH Solutions',
      level: 'Gold',
      rating: 4.2,
      reviews: 273,
      avatar: '/images/sh-solutions-logo.png',
      location: 'Pakistan',
    },
    packages: {
      monthly: {
        title: 'Monthly Subscription',
        price: 75.99,
        duration: 5,
        revisions: 'Online, 24/7 Live Chat',
        features: [
          'Organize and track customer information.',
          'Streamline sales processes and pipelines.',
          'Assign and monitor team activities.',
          'Capture and nurture potential leads.',
          'Gain insights through detailed reports, Qs',
          'Automate repetitive tasks efficiently.',
          'Manage inquiries and resolve issues.',
          'Access CRM anytime, anywhere.',
        ],
      },
      yearly: {
        title: 'Yearly Subscription',
        price: 799.00,
        duration: 5,
        revisions: 'Online, 24/7 Live Chat',
        features: [
          'All monthly features included.',
          'Priority support with dedicated manager.',
          'Access to advanced analytics dashboard.',
          'Custom integrations with third-party apps.',
          'Annual performance review and optimization.',
        ],
      },
      onetime: {
        title: 'One-Time Purchase',
        price: 1999.00,
        duration: 5,
        revisions: 'Online, 24/7 Live Chat',
        features: [
          'Lifetime access to all features.',
          'One-time setup and training included.',
          'Dedicated support for the first year.',
          'Free updates for the first two years.',
          'Customizable source code access.',
        ],
      },
    },
    languages: ['Eng', 'Urdu', 'Spanish'],
    useType: 'business',
    description:
      'The Quality CRM System is a Powerful, All-in-One Solution Designed to Streamline Customer Relationship Management and Optimize Business Operations. It Offers a Dual-Interface Approach, Providing Dedicated Functionalities for Both Users and Admins. This Ensures Smooth Workflow Management, Effective Customer Engagement, and Strategic Growth for Businesses of All Sizes.',
    whatYouGet: [
      'With the Quality CRM System, Businesses Can Efficiently Manage Customer Information, Track Leads, Automate Sales Processes, and Assign Tasks – All From a Single Platform. Its Real-time Reporting and Analytics Provide Deep Insights, Helping Businesses Make Data-Driven Decisions and Improve Performance.',
      'For Admins, the System Offers Advanced Control Features. Admins Can Manage Users, Assign Roles, Customize System Settings, and Monitor Team Productivity, Task Assignment, Data Management, and Performance Tracking Become Seamless, Creating an Organized and Highly Efficient Work Environment.',
    ],
    designApproach: [
      'Online, In-Person, Documentation',
      'Online, Phone, 24/7 Live Chat',
    ],
    whyChoose: [
      'This Software Enhances Efficiency By Automating Repetitive Tasks and Optimizing Daily Operations. It Helps Businesses Build and Maintain Strong Client Relationships, Improve Team Collaboration, and Boost Overall Productivity. With Mobile Accessibility and Integration Capabilities, the Quality CRM System Ensures That You Stay Connected and In Control Anytime, Anywhere.',
      "Let the Quality CRM System Be the Key to Your Business's Growth, Efficiency, and Success.",
    ],
    technicalInfo: {
      useType: 'Business',
      deployment: 'Cloud, SaaS',
    },
    discount: {
      percent: 2,
      condition: 'This order includes an automatic discount applied in case of a missed deadline.',
    },
    reviews: {
      average: 4.2,
      total: 273,
      distribution: [
        { rating: 5.0, count: 171 },
        { rating: 4.0, count: 58 },
        { rating: 3.0, count: 26 },
        { rating: 2.0, count: 12 },
        { rating: 1.0, count: 6 },
      ],
      testimonials: [
        {
          avatar: '/user-avatar1.jpg',
          name: 'kahmiri',
          date: '2 days ago',
          rating: 4.2,
          text: 'Introduction To Python This Chapter Provides A Beginner-Friendly Introduction To Python Programming, Covering The Essentials Like Variables, Data Types, Control Structures, Functions, And Libraries Commonly Used In AI And ML.',
          detailedReview: {
            knowledge: { rating: 4.5, comment: 'The seller was very knowledgeable and provided great insights.' },
            deadlines: { rating: 4.0, comment: 'Deadlines were mostly met, with a slight delay on one deliverable.' },
            quality: { rating: 4.2, comment: 'The quality of the software was impressive and met my expectations.' },
            recommendation: { rating: 4.8, comment: 'I would definitely recommend this seller to others!' },
            responseTime: { rating: 4.3, comment: 'The seller responded quickly to my queries.' },
            expectations: { rating: 4.1, comment: 'Overall, the seller met my expectations well.' },
            additionalImages: ['/images/softwarePictures/software1.png', '/images/softwarePictures/software2.png', '/images/softwarePictures/software1.png'],
          },
        },
        {
          avatar: '/user-avatar2.jpg',
          name: 'kahmiri',
          date: '3 days ago',
          rating: 4.5,
          text: 'Introduction To Python This Chapter Provides A Beginner-Friendly Introduction To Python Programming, Covering The Essentials Like Variables, Data Types, Control Structures, Functions, And Libraries Commonly Used In AI And ML.',
          detailedReview: {
            knowledge: { rating: 4.7, comment: 'Extremely knowledgeable, explained concepts clearly.' },
            deadlines: { rating: 4.5, comment: 'All deadlines were met on time.' },
            quality: { rating: 4.6, comment: 'High-quality work, exceeded expectations.' },
            recommendation: { rating: 4.9, comment: 'Highly recommend this seller!' },
            responseTime: { rating: 4.4, comment: 'Responses were prompt and helpful.' },
            expectations: { rating: 4.5, comment: 'Fully met my expectations.' },
            additionalImages: ['/images/softwarePictures/software3.png', '/images/softwarePictures/software2.png'],
          },
        },
      ],
    },
    relatedSoftwares: [
      {
        id: 1,
        title: 'Quality CRM System with Admin Functionalities',
        image: '/software-image1.jpg',
        rating: 4.2,
        reviews: 273,
        price: 123.00,
        avatar: '',
        sellerName: 'SH Solutions',
        location: 'Pakistan',
      },
      {
        id: 2,
        title: 'Quality CRM System with Admin Functionalities',
        image: '/software-image2.jpg',
        rating: 4.7,
        reviews: 142,
        price: 249.00,
        avatar: '',
        sellerName: 'SH Solutions',
        location: 'Pakistan',
      },
    ],
    galleryImages: [
      '/images/servicesPictures/service1.png',
      '/images/servicesPictures/service2.png',
      '/images/servicesPictures/service3.png',
      '/images/servicesPictures/service1.png',
      '/images/servicesPictures/service3.png',
      '/images/servicesPictures/service2.png',
      '/images/servicesPictures/service1.png',
    ],
  };

  const thumbnailsPerPage = 6;
  const totalPages = Math.ceil(software.galleryImages.length / thumbnailsPerPage);

  const handleThumbnailNext = () => {
    if (thumbnailPage < totalPages - 1) {
      setThumbnailPage(thumbnailPage + 1);
    }
  };

  const handleThumbnailPrev = () => {
    if (thumbnailPage > 0) {
      setThumbnailPage(thumbnailPage - 1);
    }
  };

  const currentPackage = software.packages[activeTab];

  const filterOptions = [
    'All Ratings',
    '5 Stars',
    '4 Stars and Above',
    '3 Stars and Above',
    '2 Stars and Above',
    '1 Star and Above',
  ];

  const filteredTestimonials = software.reviews.testimonials.filter((review) => {
    if (reviewFilter === 'All Ratings') return true;
    const ratingThreshold = parseFloat(reviewFilter.charAt(0));
    return review.rating >= ratingThreshold;
  });

  return (
    <div className="softwareDetailContainer bg-white">
      {/* Hero Section */}
      <div className="mx-auto px-4 py-8 max-w-[1240px]">
        <div className="flex flex-col lg:flex-row gap-12 min-h-screen">
          {/* Left Content (Gallery and Description) */}
          <div className="lg:w-[60%]">
            <div className="w-full bg-white">
              {/* Title and Seller Info */}
              <div className="pt-6 pb-2">
                <h1 className="text-3xl lg:text-4xl font-bold text-black mb-4">{software.title}</h1>

                <div className="flex congruence mb-6">
                  <div className="mr-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden relative border-2">
                      <img
                        src={software.profile.avatar}
                        alt={software.profile.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center mb-0">
                      <h2 className="text-lg lg:text-xl font-semibold text-black mr-2 capitalize">{software.profile.name}</h2>
                      <span className="px-3 py-1 bg-[#FFF8E1] rounded-full text-[#FFD700] text-xs lg:text-sm">{software.profile.level}</span>
                    </div>
                    <p className="text-sm lg:text-base text-textLight mb-1 capitalize">{software.profile.location}</p>
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm lg:text-base text-black ml-1">{software.profile.rating}/5</span>
                      <span className="text-sm lg:text-base text-textLight ml-1">({software.profile.reviews} Orders)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Gallery */}
              <div className="relative w-full rounded-lg overflow-hidden mx-auto mt-0" style={{ aspectRatio: '653 / 371' }}>
                <img
                  src={software.galleryImages[currentImageIndex]}
                  alt="Software Gallery"
                  className="w-full h-full object-cover"
                />

                <div className="absolute top-5 right-5 bg-black/80 text-white text-xs lg:text-sm px-3 py-1 rounded-full">
                  {String(currentImageIndex + 1).padStart(2, '0')} / {String(software.galleryImages.length).padStart(2, '0')}
                </div>

                <button
                  className="absolute top-1/2 left-4 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white border-2 border-border flex items-center justify-center"
                  onClick={() => handleImageChange(currentImageIndex - 1)}
                >
                  <ChevronRight className="w-6 h-6 text-black rotate-180" />
                </button>

                <button
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white border-2 border-border flex items-center justify-center"
                  onClick={() => handleImageChange(currentImageIndex + 1)}
                >
                  <ChevronRight className="w-6 h-6 text-black" />
                </button>
              </div>

              {/* Thumbnail Navigation */}
              <div className="mx-auto pt-6 flex items-center">
                <button
                  className="mr-2 p-2 rounded-full bg-white border-2 border-border flex items-center justify-center"
                  onClick={handleThumbnailPrev}
                  disabled={thumbnailPage === 0}
                >
                  <ChevronRight className="w-5 h-5 text-black rotate-180" />
                </button>

                <div className="flex-1 overflow-hidden">
                  <div
                    ref={thumbnailContainerRef}
                    className="flex space-x-2 transition-transform duration-300"
                    style={{ transform: `translateX(-${thumbnailPage * (100 / thumbnailsPerPage)}%)` }}
                  >
                    {software.galleryImages.map((image, index) => (
                      <div
                        key={index}
                        className={`w-[calc(100%/${thumbnailsPerPage})] h-[3.5625rem] lg:h-[4.25rem] flex-shrink-0 overflow-hidden cursor-pointer ${index === currentImageIndex ? 'border-2 border-[#3B82F6]' : 'border border-gray-300'} rounded-2xl`}
                        style={{ aspectRatio: '653 / 371' }}
                        onClick={() => handleImageChange(index)}
                      >
                        <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  className="ml-2 p-2 rounded-full bg-white border-2 border-border flex items-center justify-center"
                  onClick={handleThumbnailNext}
                  disabled={thumbnailPage === totalPages - 1}
                >
                  <ChevronRight className="w-5 h-5 text-black" />
                </button>
              </div>
            </div>

            {/* Languages and Use Type */}
            <div className="pt-6">
              <div className="border border-border rounded-[20px] p-6 flex justify-between">
                <div className="flex-1 pr-4">
                  <p className="text-sm font-semibold text-text mb-1">Available In</p>
                  <p className="text-base text-text">{software.languages.join(', ')}</p>
                </div>
                <div className="w-px bg-border mx-4"></div>
                <div className="flex-1 pl-4">
                  <p className="text-sm font-semibold text-text mb-1">Use Type</p>
                  <p className="text-base text-text">{software.useType}</p>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="pt-6">
              <h2 className="text-[20px] font-semibold text-primary mb-4">Description</h2>
              <div className="typoB3 text-text space-y-4">
                <p>{software.description}</p>
              </div>
            </div>

            {/* What This System Offers Section */}
            <div className="pt-6">
              <h2 className="text-[15px] font-semibold text-text mb-4">What This System Offers:</h2>
              <div className="typoB3 text-text space-y-4">
                <p>{software.whatYouGet[0]}</p>
                <p>{software.whatYouGet[1]}</p>
              </div>
            </div>

            {/* Why Choose Quality CRM System Section */}
            <div className="pt-6">
              <h2 className="text-[15px] font-semibold text-text mb-4">Why Choose Quality CRM System:</h2>
              <div className="typoB3 text-text space-y-4">
                <p>{software.whyChoose[0]}</p>
                <p>{software.whyChoose[1]}</p>
              </div>
            </div>

            {/* Technical Information */}
            <div className="pt-6">
              <h2 className="text-[20px] font-semibold text-primary mb-4">Technical Information</h2>
              <div className="border border-border rounded-[20px] p-6 flex justify-between">
                <div className="flex-1 pr-4">
                  <p className="text-sm font-semibold text-text mb-1">Use Type</p>
                  <p className="text-base text-text">{software.technicalInfo.useType}</p>
                </div>
                <div className="w-px bg-border mx-4"></div>
                <div className="flex-1 pl-4">
                  <p className="text-sm font-semibold text-text mb-1">Deployment</p>
                  <p className="text-base text-text">{software.technicalInfo.deployment}</p>
                </div>
              </div>
            </div>

            {/* Training & Support Section */}
            <div className="pt-6">
              <h2 className="text-[20px] font-semibold text-primary mb-4">Training & Support</h2>
              <div className="border border-border rounded-[20px] p-6 flex justify-between">
                <div className="flex-1 pr-4">
                  <p className="text-sm font-semibold text-text mb-1">Training</p>
                  <p className="text-base text-text">{software.designApproach[0]}</p>
                </div>
                <div className="w-px bg-border mx-4"></div>
                <div className="flex-1 pl-4">
                  <p className="text-sm font-semibold text-text mb-1">Support</p>
                  <p className="text-base text-text">{software.designApproach[1]}</p>
                </div>
              </div>
            </div>

            {/* About The Company Section */}
            <div className="pt-6">
              <h2 className="typoS1 text-primary mb-6">About The Company</h2>
              <div className="p-6 border border-border rounded-[20px] bg-white shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className="mr-4">
                      <div className="w-20 h-20 rounded-full overflow-hidden relative border-2">
                        <img
                          src={software.profile.avatar}
                          alt={software.profile.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <h2 className="typoS2 text-black mr-2 capitalize">{software.profile.name}</h2>
                        <span className="px-3 py-1 bg-[#FFF8E1] rounded-full text-[#FFD700] text-xs font-medium">
                          {software.profile.level}
                        </span>
                      </div>
                      <p className="typoC1 text-textLight mb-2 capitalize">{software.profile.location}</p>
                      <div className="flex items-center mb-3">
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-1" />
                        <span className="typoB3 text-black">{software.profile.rating}/5</span>
                        <span className="typoC1 text-textLight ml-1">({software.profile.reviews} Orders)</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="typoC1 text-textLight">Established In</p>
                          <p className="typoB4 text-black">Online, In-Person, Documentation</p>
                        </div>
                        <div>
                          <p className="typoC1 text-textLight">Company Size</p>
                          <p className="typoB4 text-black">Up to 1000+ Employees</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="btn btnDefault btnMedium border border-border rounded-full text-text hover:bg-btnbg">
                    Contact
                  </button>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="pt-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="typoS1 text-primary">Reviews</h2>
                <div className="w-48">
                  <Dropdown
                    options={filterOptions}
                    defaultValue={reviewFilter}
                    onChange={(value) => setReviewFilter(value)}
                    variant="default"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 bg-white border border-border rounded-[20px] p-6 mb-8">
                <div className="flex flex-col items-center justify-center lg:items-start h-full">
                  <div className="flex items-center mb-2">
                    <span className="text-5xl font-bold text-text mr-2">{software.reviews.average}</span>
                    <Star className="w-8 h-8 text-primary fill-primary" />
                  </div>
                  <span className="text-sm text-textLight">{software.reviews.total} Ratings</span>
                </div>

                <div className="col-span-2 flex flex-col justify-center">
                  {software.reviews.distribution.map((item, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <span className="text-sm text-text w-12">{item.rating.toFixed(1)}</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${(item.count / software.reviews.total) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-textLight w-24 text-right">({item.count} reviews)</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                {filteredTestimonials.length > 0 ? (
                  filteredTestimonials.map((review, index) => (
                    <ReviewTestimonial key={index} review={review} index={index} />
                  ))
                ) : (
                  <div className="text-center py-8 bg-white border border-border rounded-[20px]">
                    <p className="typoB3 text-textLight">No reviews match the selected filter.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar (Sticky Pricing) */}
          <div className="lg:w-[40%]">
            <div className="sticky top-[170px] z-10">
              <div className="border border-border rounded-[20px] overflow-hidden bg-white">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex space-x-2">
                      <button className="p-2 rounded-full bg-white border border-border">
                        <Heart
                          className={`w-5 h-5 ${wishlist ? 'text-red-500 fill-red-500' : 'text-textLight'}`}
                          onClick={() => setWishlist(!wishlist)}
                        />
                      </button>
                      <button className="p-2 rounded-full bg-white border border-border">
                        <Share2 className="w-5 h-5 text-textLight" />
                      </button>
                    </div>
                    <h3 className="typoS2 text-text">SOFTWARE SUMMARY</h3>
                    <span className="text-xs text-primary font-medium bg-[#E6F2FF] px-3 py-1 rounded-full">
                      FREE TRIAL
                    </span>
                  </div>

                  <div className="flex w-full mb-4">
                    {['monthly', 'yearly', 'onetime'].map((tab, index) => (
                      <button
                        key={tab}
                        className={`flex-1 py-3 typoC2 text-center border border-border 
                          ${activeTab === tab ? 'bg-white text-text font-medium' : 'bg-[#F5F7F9] text-textLight'}
                          ${index !== 2 ? 'border-r-0' : ''}`}
                        onClick={() => setActiveTab(tab)}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  <div className="mb-6">
                    <ul className="space-y-2">
                      {currentPackage.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="w-4 h-4 text-primary mr-2 mt-1" />
                          <span className="typoB3 text-text">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-baseline space-x-2 mb-4">
                      <span className="text-sm text-textLight">price</span>
                      <span className="text-3xl font-bold text-text">
                        ${currentPackage.price}
                        {activeTab === 'monthly' ? '/Month' : activeTab === 'yearly' ? '/Year' : ''}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="btn btnDark btnMedium flex-1">Visit Website</button>
                      <button className="btn btnDefault btnMedium flex-1">Ask for Quote</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Software Section */}
      <section className="py-16">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[100px]">
          <CardSlider 
            title="Explore Software"
            subtitle="A seamless business operations system designed to scale"
            items={softwares}
            cardType="software"
            renderItem={(software, index) => (
             <SoftwareCard software={software}/>
            )}
          />
        </div>
      </section>
    </div>
  );
}