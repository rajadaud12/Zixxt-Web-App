'use client';
import React, { useState, useRef } from 'react';
import { Heart, Clock, Check, ChevronDown, ChevronRight, Info, Star, Share2, Download } from 'lucide-react';
import { Dropdown } from '@/components/utils/dropdown'

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
    const [reviewFilter, setReviewFilter] = useState('All Ratings'); // State for review filter

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
            name: 'Daud Bin Nasar',
            level: 'Gold',
            rating: 4.2,
            reviews: 273,
            avatar: '/images/profile1.png',
            location: 'Pakistan',
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
        languages: ['English', 'Urdu', 'Spanish'],
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
                    detailedReview: {
                        knowledge: { rating: 4.5, comment: "The seller was very knowledgeable and provided great insights." },
                        deadlines: { rating: 4.0, comment: "Deadlines were mostly met, with a slight delay on one deliverable." },
                        quality: { rating: 4.2, comment: "The quality of the logo was impressive and met my expectations." },
                        recommendation: { rating: 4.8, comment: "I would definitely recommend this seller to others!" },
                        responseTime: { rating: 4.3, comment: "The seller responded quickly to my queries." },
                        expectations: { rating: 4.1, comment: "Overall, the seller met my expectations well." },
                        additionalImages: ['/images/servicesPictures/service1.png', '/images/servicesPictures/service2.png','/images/servicesPictures/service1.png'],
                    },
                },
                {
                    avatar: '/user-avatar2.jpg',
                    name: 'kahmiri',
                    date: '3 days ago',
                    rating: 4.5,
                    text: 'Introduction To Python This Chapter Provides A Beginner-Friendly Introduction To Python Programming, Covering The Essentials Like Variables, Data Types, Control Structures, Functions, And Libraries Commonly Used In AI And ML.',
                    detailedReview: {
                        knowledge: { rating: 4.7, comment: "Extremely knowledgeable, explained concepts clearly." },
                        deadlines: { rating: 4.5, comment: "All deadlines were met on time." },
                        quality: { rating: 4.6, comment: "High-quality work, exceeded expectations." },
                        recommendation: { rating: 4.9, comment: "Highly recommend this seller!" },
                        responseTime: { rating: 4.4, comment: "Responses were prompt and helpful." },
                        expectations: { rating: 4.5, comment: "Fully met my expectations." },
                        additionalImages: ['/images/servicesPictures/service3.png', '/images/servicesPictures/service2.png'],
                    },
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

    // Filter reviews based on the selected rating
    const filterOptions = [
        'All Ratings',
        '5 Stars',
        '4 Stars and Above',
        '3 Stars and Above',
        '2 Stars and Above',
        '1 Star and Above',
    ];

    const filteredTestimonials = service.reviews.testimonials.filter((review) => {
        if (reviewFilter === 'All Ratings') return true;
        const ratingThreshold = parseFloat(reviewFilter.charAt(0));
        return review.rating >= ratingThreshold;
    });

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="mx-auto px-4 py-8 max-w-[1240px]">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Content (Gallery and Description) - Adjusted width */}
                    <div className="lg:w-[60%]">
                        <div className="w-full bg-white">
                            {/* Title and Seller Info */}
                            <div className="mx-auto pt-6 pb-2">
                                <h1 className="text-3xl lg:text-4xl font-bold text-black mb-4">{service.title}</h1>

                                <div className="flex congruence mb-6">
                                    <div className="mr-4">
                                        <div className="w-20 h-20 rounded-full overflow-hidden relative border-2">
                                            <img
                                                src={service.profile.avatar}
                                                alt={service.profile.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center mb-0">
                                            <h2 className="text-lg lg:text-xl font-semibold text-black mr-2 capitalize">{service.profile.name}</h2>
                                            <span className="px-3 py-1 bg-[#FFF8E1] rounded-full text-[#FFD700] text-xs lg:text-sm">{service.profile.level}</span>
                                        </div>
                                        <p className="text-sm lg:text-base text-textLight mb-1 capitalize">{service.profile.location}</p>
                                        <div className="flex items-center">
                                            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                            <span className="text-sm lg:text-base text-black ml-1">{service.profile.rating}/5</span>
                                            <span className="text-sm lg:text-base text-textLight ml-1">({service.profile.reviews} Orders)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Image Gallery */}
                            <div className="relative w-full rounded-lg overflow-hidden mx-auto mt-0" style={{ aspectRatio: '653 / 371' }}>
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
                        <div className="mx-auto flex items-center bg-secondary border border-border rounded-[20px] p-4 mt-8 mb-16">
                            <div className="p-3 bg-primary rounded-full text-white mr-4">
                                <Download className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-[15px] font-medium text-text mb-1">Auto Discount</h3>
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
                        <div className="mx-auto mb-20">
                            <h2 className="text-[20px] font-semibold text-primary mb-4">Description</h2>
                            <div className="typoB3 text-text space-y-4">
                                <p>{service.description}</p>
                            </div>
                        </div>

                        {/* What You'll Get Section */}
                        <div className="mx-auto mb-20">
                            <h2 className="text-[15px] font-semibold text-text mb-4">What You'll Get</h2>
                            <div className="typoB3 text-text space-y-4">
                                <p>{service.whatYouGet[0]}</p>
                                <p>{service.whatYouGet[1]}</p>
                            </div>
                        </div>

                        {/* Design Approach Section */}
                        <div className="mx-auto mb-20">
                            <h2 className="text-[15px] font-semibold text-text mb-4">My Design Approach</h2>
                            <div className="typoB3 text-text space-y-4">
                                <p>{service.designApproach[0]}</p>
                                <p>{service.designApproach[1]}</p>
                            </div>
                        </div>

                        {/* Technical Information */}
                        <div className="mx-auto mb-20">
                            <h2 className="text-[20px] font-semibold text-primary mb-4">Technical Information</h2>
                            <div className="p-4 bg-secondary border border-border rounded-[20px]">
                                <div className="flex items-center">
                                    <div className="p-3 bg-primary rounded-full text-white mr-4">
                                        <Info className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-[15px] font-medium text-text mb-1">After Sale Support</h3>
                                        <p className="typoB3 text-textLight">{service.technicalInfo.afterSaleSupport}</p>
                                    </div>
                                    <div className="ml-auto text-right">
                                        <span className="text-black font-bold text-xl block">${service.technicalInfo.supportRate}</span>
                                        <span className="text-textLight text-xs">per hour</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* About The Seller Section */}
                        <div className="mx-auto mb-20">
                            <h2 className="typoS1 text-primary mb-6">About The Seller</h2>
                            <div className="p-6 border border-border rounded-[20px] bg-white shadow-sm">
                                <div className="flex items-start justify-between">
                                    {/* Left Section: Avatar and Seller Info */}
                                    <div className="flex items-start">
                                        <div className="mr-4">
                                            <div className="w-20 h-20 rounded-full overflow-hidden relative border-2">
                                                <img
                                                    src={service.profile.avatar}
                                                    alt={service.profile.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center mb-1">
                                                <h2 className="typoS2 text-black mr-2 capitalize">{service.profile.name}</h2>
                                                <span className="px-3 py-1 bg-[#FFF8E1] rounded-full text-[#FFD700] text-xs font-medium">
                                                    {service.profile.level}
                                                </span>
                                            </div>
                                            <p className="typoC1 text-textLight mb-2 capitalize">{service.profile.location}</p>
                                            <div className="flex items-center mb-3">
                                                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-1" />
                                                <span className="typoB3 text-black">{service.profile.rating}/5</span>
                                                <span className="typoC1 text-textLight ml-1">({service.profile.reviews} Orders)</span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="typoC1 text-textLight">Orders Delivered</p>
                                                    <p className="typoB4 text-black">{service.profile.reviews}</p>
                                                </div>
                                                <div>
                                                    <p className="typoC1 text-textLight">Languages</p>
                                                    <p className="typoB4 text-black">{service.languages.join(', ')}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Right Section: Contact Button */}
                                    <button className="btn btnDefault btnMedium border border-border rounded-full text-text hover:bg-btnbg">
                                        Contact
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Review Section */}
                        <div className="mx-auto mb-20">
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

                            {/* Review Summary - Updated with border and centered average rating */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 bg-white border border-border rounded-[20px] p-6 mb-8">
                                {/* Left: Average Rating - Centered Vertically */}
                                <div className="flex flex-col items-center justify-center lg:items-start h-full">
                                    <div className="flex items-center mb-2">
                                        <span className="text-5xl font-bold text-text mr-2">{service.reviews.average}</span>
                                        <Star className="w-8 h-8 text-primary fill-primary" />
                                    </div>
                                    <span className="text-sm text-textLight">{service.reviews.total} Ratings</span>
                                </div>

                                {/* Right: Rating Distribution */}
                                <div className="col-span-2 flex flex-col justify-center">
                                    {service.reviews.distribution.map((item, index) => (
                                        <div key={index} className="flex items-center mb-2">
                                            <span className="text-sm text-text w-12">{item.rating.toFixed(1)}</span>
                                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-primary rounded-full"
                                                    style={{ width: `${(item.count / service.reviews.total) * 100}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-sm text-textLight w-24 text-right">({item.count} reviews)</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Review Cards - Using Tailwind Config Colors */}
                            <div className="space-y-6">
                                {filteredTestimonials.length > 0 ? (
                                    filteredTestimonials.map((review, index) => {
                                        const [isExpanded, setIsExpanded] = useState(false);

                                        return (
                                            <div
                                                key={index}
                                                className="bg-white border border-border rounded-[20px] p-6"
                                            >
                                                {/* Review Header */}
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="flex items-center">
                                                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-border">
                                                            <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                                                        </div>
                                                        <div>
                                                            <span className="typoB4 text-text capitalize font-semibold">{review.name}</span>
                                                            <span className="text-textLight ml-3 typoC1">{review.date}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="typoB4 text-text mr-2 font-semibold">{review.rating}</span>
                                                        <div className="flex">
                                                            {[...Array(5)].map((_, starIndex) => (
                                                                <Star
                                                                    key={starIndex}
                                                                    className={`w-5 h-5 ${starIndex < Math.round(review.rating)
                                                                            ? 'text-primary fill-primary'
                                                                            : 'text-textLight'
                                                                        }`}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Review Text */}
                                                <p className="typoB3 text-text mb-4 leading-relaxed">{review.text}</p>

                                                {/* Review Images */}
                                                {review.detailedReview?.additionalImages?.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                        {review.detailedReview.additionalImages.map((img, imgIndex) => (
                                                            <div
                                                                key={imgIndex}
                                                                className="w-16 h-16 rounded-lg overflow-hidden border border-border"
                                                            >
                                                                <img src={img} alt={`Review ${imgIndex + 1}`} className="w-full h-full object-cover" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* View Detailed Review Button */}
                                                <button
                                                    className="btn btnPrimaryLink typoC2 flex items-center text-primary hover:underline"
                                                    onClick={() => setIsExpanded(!isExpanded)}
                                                >
                                                    {isExpanded ? 'Hide Detailed Review' : 'View Detailed Review'}
                                                    <ChevronDown
                                                        className={`ml-2 w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                                                    />
                                                </button>

                                                {/* Detailed Review Content */}
                                                {isExpanded && review.detailedReview && (
                                                    <div className="mt-6 p-6 bg-gray-50 rounded-lg shadow-inner">
                                                        <h3 className="typoS2 text-text mb-6 font-semibold">Detailed Feedback</h3>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            {[
                                                                { label: 'Seller Knowledge', data: review.detailedReview.knowledge },
                                                                { label: 'Meeting Deadlines', data: review.detailedReview.deadlines },
                                                                { label: 'Quality of Work', data: review.detailedReview.quality },
                                                                { label: 'Recommendation', data: review.detailedReview.recommendation },
                                                                { label: 'Response Time', data: review.detailedReview.responseTime },
                                                                { label: 'Met Expectations', data: review.detailedReview.expectations },
                                                            ].map((item, idx) => (
                                                                <div key={idx} className="bg-white p-4 rounded-lg">
                                                                    <p className="typoB4 text-textLight mb-2 font-medium">{item.label}</p>
                                                                    <div className="flex items-center mb-2">
                                                                        <span className="typoB3 text-text mr-2 font-semibold">{item.data.rating}</span>
                                                                        <div className="flex">
                                                                            {[...Array(5)].map((_, starIndex) => (
                                                                                <Star
                                                                                    key={starIndex}
                                                                                    className={`w-4 h-4 ${starIndex < Math.round(item.data.rating)
                                                                                            ? 'text-primary fill-primary'
                                                                                            : 'text-textLight'
                                                                                        }`}
                                                                                />
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                    <p className="typoB3 text-text leading-relaxed">{item.data.comment}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="text-center py-8 bg-white border border-border rounded-[20px]">
                                        <p className="typoB3 text-textLight">No reviews match the selected filter.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar (Sticky Pricing) - Takes remaining space */}
                    <div className="lg:w-[40%]">
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