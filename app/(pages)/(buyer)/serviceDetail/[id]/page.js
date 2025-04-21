'use client';
import React, { useState, useRef } from 'react';
import { Heart, Clock, Check, ChevronDown, ChevronRight, Info, Star, Share2, Download } from 'lucide-react';

// Mock ServiceCard component - normally this would be imported
const ServiceCard = ({ image, title, rating, reviews, price }) => (
  <div className="flex flex-col bg-white rounded-lg overflow-hidden shadow-sm border border-border">
    <div className="relative h-40">
      <img src={image} alt={title} className="w-full h-full object-cover" />
    </div>
    <div className="p-4">
      <h3 className="typoB2 mb-2 line-clamp-2">{title}</h3>
      <div className="flex items-center mb-2">
        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        <span className="text-text ml-1 text-sm">{rating}</span>
        <span className="text-textLight ml-1 text-sm">({reviews})</span>
      </div>
      <div className="flex justify-between items-center mt-2">
        <p className="text-sm">
          From <span className="font-semibold">${price}</span>
        </p>
      </div>
    </div>
  </div>
);

export default function ServiceDetail({ params }) {
  const { id } = React.use(params); // Unwrap the params Promise using React.use()
  const [wishlist, setWishlist] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [thumbnailPage, setThumbnailPage] = useState(0);
  const thumbnailContainerRef = useRef(null);
  const [activeTab, setActiveTab] = useState('simple'); // State for active tab

  // Handle image change (for arrows and thumbnails)
  const handleImageChange = (index) => {
    if (index < 0) {
      setCurrentImageIndex(service.galleryImages.length - 1);
    } else if (index >= service.galleryImages.length) {
      setCurrentImageIndex(0);
    } else {
      setCurrentImageIndex(index);
    }

    // Ensure the selected thumbnail is visible
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

  const service = {
    id,
    title: 'I will design a custom logo for your brand',
    profile: {
      name: 'kahmiri',
      level: 'Gold',
      rating: 4.2,
      reviews: 273,
      avatar: '/images/profile1.png',
      location: 'pakistan',
    },
    packages: {
      simple: {
        title: 'Starter Logo Design',
        price: 75.99,
        duration: 3,
        revisions: 2,
        features: [
          '1 Simple Logo Concept',
          'High-Resolution PNG & JPG',
          'For Startups, personal brands, small projects',
        ],
      },
      standard: {
        title: 'Standard Logo Design',
        price: 150.0,
        duration: 5,
        revisions: 4,
        features: [
          '3 Logo Concepts',
          'High-Resolution PNG, JPG & Vector',
          'For Small to Medium Businesses',
        ],
      },
      complex: {
        title: 'Complex Logo Design',
        price: 300.0,
        duration: 7,
        revisions: 6,
        features: [
          '5 Logo Concepts',
          'High-Resolution PNG, JPG, Vector & Source Files',
          'For Large Businesses and Enterprises',
        ],
      },
    },
    languages: ['Eng', 'Urdu', 'Spanish'],
    description:
      "I believe a great logo is more than just a design – it's the face of your brand. With years of experience and a passion for creativity, I offer high-quality designs that reflect your brand's identity and values. You'll receive not only a stunning logo but also a smooth, collaborative experience from start to finish.",
    whatYouGet: [
      'Every logo I create is 100% original and designed from scratch. I pay close attention to your requirements and provide designs that align perfectly with your vision.',
      'My service includes high-resolution files, fast delivery, and professional customer support to ensure you’re completely satisfied.',
    ],
    designApproach: [
      "I start by understanding your brand's message, audience, and style preferences. From there, I brainstorm and sketch multiple ideas before refining them into polished logo concepts.",
      'Once you choose your favorite, I’ll make any necessary adjustments to ensure it’s perfect for your brand.',
    ],
    getStarted: ["Let's get started."],
    technicalInfo: {
      afterSaleSupport: 'This Seller Offers after-sale support at hourly charges',
      supportRate: 4,
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
        },
        {
          avatar: '/user-avatar2.jpg',
          name: 'kahmiri',
          date: '3 days ago',
          rating: 4.5,
          text: 'Introduction To Python This Chapter Provides A Beginner-Friendly Introduction To Python Programming, Covering The Essentials Like Variables, Data Types, Control Structures, Functions, And Libraries Commonly Used In AI And ML.',
        },
      ],
    },
    relatedServices: [
      {
        id: 1,
        title: 'AI and Machine Learning Using Python Programming Language',
        image: '/course-image1.jpg',
        rating: 4.2,
        reviews: 273,
        price: 34.99,
      },
      {
        id: 2,
        title: 'AI and Machine Learning Using Python Programming Language',
        image: '/course-image2.jpg',
        rating: 4.7,
        reviews: 142,
        price: 49.99,
      },
      {
        id: 3,
        title: 'AI and Machine Learning Using Python Programming Language',
        image: '/course-image3.jpg',
        rating: 4.2,
        reviews: 273,
        price: 39.99,
      },
      {
        id: 4,
        title: 'AI and Machine Learning Using Python Programming Language',
        image: '/course-image4.jpg',
        rating: 4.5,
        reviews: 195,
        price: 44.99,
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

  // Handle thumbnail navigation
  const thumbnailsPerPage = 6;
  const totalPages = Math.ceil(service.galleryImages.length / thumbnailsPerPage);

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

  // Get current package based on active tab
  const currentPackage = service.packages[activeTab];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="mx-auto px-4 py-8 max-w-[1240px]">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Content (Gallery and Description) */}
          <div className="lg:w-2/3">
            <div className="w-full bg-white">
              {/* Title and Seller Info */}
              <div className="mx-auto pt-6 pb-8">
                <h1 className="text-3xl lg:text-4xl font-bold text-black mb-4">{service.title}</h1>

                <div className="flex congruence mb-6">
                  <div className="mr-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden relative">
                      <img
                        src={service.profile.avatar}
                        alt={service.profile.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center mb-1">
                      <h2 className="text-lg lg:text-xl font-semibold text-black mr-2">{service.profile.name}</h2>
                      <span className="px-3 py-1 bg-[#FFF8E1] rounded-full text-[#FFD700] text-xs lg:text-sm">{service.profile.level}</span>
                    </div>
                    <p className="text-sm lg:text-base text-gray-500 mb-1 capitalize">{service.profile.location}</p>
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm lg:text-base text-black ml-1">{service.profile.rating}/5</span>
                      <span className="text-sm lg:text-base text-gray-500 ml-1">({service.profile.reviews} Orders)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Gallery */}
              <div className="relative w-full rounded-lg overflow-hidden mx-auto mt-8" style={{ aspectRatio: '653 / 371' }}>
                {/* Main Gallery Image */}
                <img
                  src={service.galleryImages[currentImageIndex]}
                  alt="Logo Gallery"
                  className="w-full h-full object-cover"
                />

                {/* Page Counter */}
                <div className="absolute top-5 right-5 bg-black/80 text-white text-xs lg:text-sm px-3 py-1 rounded-full">
                  {String(currentImageIndex + 1).padStart(2, '0')} / {String(service.galleryImages.length).padStart(2, '0')}
                </div>

                {/* Navigation Arrows */}
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
                    {service.galleryImages.map((image, index) => (
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

            {/* Auto Discount Alert */}
            <div className="mx-auto flex items-start bg-secondary border border-border rounded-lg p-4 mt-8 mb-8">
              <div className="p-2 bg-primary rounded-full text-white mr-3">
                <Download className="w-4 h-4" />
              </div>
              <div>
                <h3 className="typoB4 text-text mb-1">Auto Discount</h3>
                <p className="typoB3 text-textLight">
                  This order includes an automatic discount applied in case of a missed deadline.
                </p>
              </div>
              <div className="ml-auto text-right">
                <span className="text-primary font-bold text-xl block">{service.discount.percent}%</span>
                <span className="text-textLight text-xs">per day</span>
              </div>
            </div>

            {/* Description Section */}
            <div className="mx-auto mb-8">
              <h2 className="typoS1 text-primary mb-4">Description</h2>
              <div className="typoB3 text-text space-y-4">
                <p>{service.description}</p>
              </div>
            </div>

            {/* What You'll Get Section */}
            <div className="mx-auto mb-8">
              <h2 className="typoS1 text-text mb-4">What You'll Get</h2>
              <div className="typoB3 text-text space-y-4">
                {service.whatYouGet.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </div>
            </div>

            {/* Design Approach Section */}
            <div className="mx-auto mb-8">
              <h2 className="typoS1 text-text mb-4">My Design Approach</h2>
              <div className="typoB3 text-text space-y-4">
                {service.designApproach.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </div>
            </div>

            {/* Let's Get Started Section */}
            <div className="mx-auto mb-8">
              <h2 className="typoS1 text-text mb-4">Let's Get Started</h2>
              <div className="typoB3 text-text space-y-4">
                {service.getStarted.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </div>
            </div>

            {/* Technical Information */}
            <div className="mx-auto mb-12">
              <h2 className="typoS1 text-text mb-4 text-blue-500">Technical Information</h2>
              <div className="mb-4">
                <h3 className="typoB2 mb-1">After-Sale Support</h3>
                <p className="typoB3 text-text">{service.technicalInfo.afterSaleSupport}</p>
              </div>
              <div className="mb-4 p-4 border border-border rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 bg-secondary rounded-full mr-3">
                    <Info className="w-4 h-4 text-primary" />
                  </div>
                  <p className="typoB3 text-textLight flex-1">
                    If you have any specific preferences or concerns, please discuss them with the profile.
                  </p>
                  <div className="ml-auto">
                    <span className="text-black font-bold text-xl">${service.technicalInfo.supportRate}</span>
                    <span className="text-textLight text-xs block">per hour</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="mx-auto mb-12">
              <h2 className="typoS1 text-text mb-4 text-blue-500">Reviews</h2>

              {/* Review Summary */}
              <div className="flex items-start mb-8">
                <div className="mr-8">
                  <div className="text-3xl font-bold">{service.reviews.average}</div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-textLight ml-1 text-sm">{service.reviews.total} ratings</span>
                  </div>
                </div>

                <div className="flex-1">
                  {service.reviews.distribution.map((item, index) => (
                    <div key={index} className="flex items-center mb-1">
                      <span className="text-sm w-8">{item.rating.toFixed(1)}</span>
                      <div className="mx-2 flex-1 h-2 bg-whiteGrey rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500"
                          style={{ width: `${(item.count / service.reviews.total) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-textLight">({item.count} reviews)</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <button className="btn btnDefault btnSmall">
                  4 stars and above
                  <ChevronDown className="ml-2 w-4 h-4" />
                </button>
              </div>

              {/* Review Cards */}
              <div className="space-y-6">
                {service.reviews.testimonials.map((review, index) => (
                  <div key={index} className="border-b border-border pb-6">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                        <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <span className="typoB4 text-text">{review.name}</span>
                          <span className="text-textLight ml-3 text-sm">{review.date}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-text font-bold mr-1">{review.rating}</span>
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        </div>
                      </div>
                    </div>
                    <p className="typoB3 text-text">{review.text}</p>
                    <div className="flex mt-2">
                      <div className="w-10 h-10 rounded-lg overflow-hidden mx-1">
                        <img src="/review-thumb1.jpg" alt="Review" className="w-full h-full object-cover" />
                      </div>
                      <div className="w-10 h-10 rounded-lg overflow-hidden mx-1">
                        <img src="/review-thumb2.jpg" alt="Review" className="w-full h-full object-cover" />
                      </div>
                      <div className="w-10 h-10 rounded-lg overflow-hidden mx-1">
                        <img src="/review-thumb3.jpg" alt="Review" className="w-full h-full object-cover" />
                      </div>
                      <div className="w-10 h-10 rounded-lg overflow-hidden mx-1">
                        <img src="/review-thumb4.jpg" alt="Review" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <button className="btn btnLink typoC2 mt-2">
                      View Detailed Review <ChevronRight className="ml-1 w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar (Sticky Pricing) */}
          <div className="lg:w-1/3">
            <div className="sticky top-[150px] z-10">
              <div className="border border-border rounded-[20px] overflow-hidden bg-white">
                <div className="p-6">
                  {/* Top Section: Icons and Title */}
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
                    <h3 className="typoS2 text-text">SERVICE SUMMARY</h3>
                    <span className="text-xs text-primary font-medium bg-[#E6F2FF] px-3 py-1 rounded-full">
                      {String(currentPackage.duration).padStart(2, '0')} DAYS
                    </span>
                  </div>

                  {/* Tabs */}
                  <div className="flex w-full mb-4">
                    {['simple', 'standard', 'complex'].map((tab, index) => (
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

                  {/* Package Details */}
                  <div className="mb-6">
                    <h4 className="typoB2 text-text mb-3">{currentPackage.title}</h4>
                    <ul className="space-y-2">
                      {currentPackage.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="w-4 h-4 text-primary mr-2 mt-1" />
                          <span className="typoB3 text-text">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Delivery and Revisions */}
                  <div className="flex space-x-2 mb-6">
                    <div className="flex items-center bg-[#F5F7F9] rounded-full h-10 flex-1 px-3">
                      <Clock className="w-4 h-4 text-textLight mr-2" />
                      <span className="typoC2 text-text">{currentPackage.duration} DAYS DELIVERY</span>
                    </div>
                    <div className="flex items-center bg-[#F5F7F9] rounded-full h-10 flex-1 px-3">
                      <Share2 className="w-4 h-4 text-textLight mr-2 rotate-90" />
                      <span className="typoC2 text-text">{currentPackage.revisions} REVISIONS</span>
                    </div>
                  </div>

                  {/* Price and Buttons */}
                  <div className="mb-4">
                    <div className="flex items-baseline space-x-2 mb-4">
                      <span className="text-sm text-textLight">price</span>
                      <span className="text-3xl font-bold text-text">${currentPackage.price}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="btn btnDark btnMedium flex-1">Buy Now</button>
                      <button className="btn btnDefault btnMedium flex-1">Ask for Quote</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* You May Also Like Section */}
      <div className="bg-whiteGrey py-12 relative z-20">
        <div className="mx-auto px-4 max-w-[1240px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="typoH2 text-text">You May Also Like</h2>
            <p className="text-textLight">Expert solutions tailored to drive your success</p>
            <div className="flex space-x-2">
              <button className="p-2 rounded-full border border-border bg-white">
                <ChevronRight className="w-5 h-5 rotate-180" />
              </button>
              <button className="p-2 rounded-full border border-border bg-white">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {service.relatedServices.map((item) => (
              <ServiceCard
                key={item.id}
                image={item.image}
                title={item.title}
                rating={item.rating}
                reviews={item.reviews}
                price={item.price}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}