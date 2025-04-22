'use client';
import React, { useState, useRef } from 'react';
import { Heart, Clock, Check, ChevronRight, Star, Share2, FileText, List, Video } from 'lucide-react';
import { Dropdown } from '@/components/utils/dropdown';
import ServiceCard from '@/components/buyer/serviceCard';
import ReviewTestimonial from '@/components/buyer/reviewTestimonial'

export default function CourseDetail({ params }) {
    const { id } = React.use(params);
    const [wishlist, setWishlist] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [thumbnailPage, setThumbnailPage] = useState(0);
    const thumbnailContainerRef = useRef(null);
    const [reviewFilter, setReviewFilter] = useState('All Ratings');
    const [selectedChapter, setSelectedChapter] = useState(1); // Track the currently selected chapter

    // Handle image change (for arrows and thumbnails)
    const handleImageChange = (index) => {
        if (index < 0) {
            setCurrentImageIndex(course.galleryImages.length - 1);
        } else if (index >= course.galleryImages.length) {
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

    const course = {
        id,
        title: 'Machine Learning for Everybody',
        profile: {
            name: 'Silly Vein',
            level: 'Gold',
            rating: 4.2,
            reviews: 273,
            avatar: '/images/profile1.png',
            location: 'Pakistan',
        },
        price: 75.99,
        duration: '30 Hrs',
        lessons: 15,
        videoDuration: '15 hr',
        chapters: 30,
        documents: 12,
        articles: 11,
        features: [
            'Assignments',
            'Quizes',
            'Test Questions',
            'MCQs',
        ],
        languages: ['ENG', 'Urdu', 'Spanish'],
        skills: ['Python', 'AI', 'Machine Learning'],
        description:
            "Ready to kickstart your journey into the world of Artificial Intelligence and Machine Learning? This 30-day course is designed to take you from a beginner to a confident AI and ML practitioner using Python, whether you’re an aspiring data scientist, software engineer, or tech enthusiast. This course will equip you with the essential knowledge and practical skills needed to build intelligent systems and make data-driven decisions.",
        whatYouLearn: [
            "Fundamentals of Artificial Intelligence and Machine Learning",
            "Python Programming Basics & Libraries for AI/ML (NumPy, Pandas, Matplotlib, Scikit-learn, TensorFlow, etc.)",
            "Data Preprocessing and Exploration Techniques",
            "Supervised and Unsupervised Learning Algorithms",
            "Building and Evaluating ML Models",
            "Introduction to Neural Networks and Deep Learning",
            "Real-World Projects and Hands-On Exercises",
        ],
        whyTakeThisCourse: [
            "Learn by Doing: Complete Practical Assignments and Projects",
            "Fast and Focused: Grasp Key Concepts in Just 30 Days",
            "Real-World Applications: Solve Practical Problems with AI and ML",
            "Career Boost: Skills in-Demand Aimed to Add to Your Resume",
        ],
        programDetails: [
            {
                chapter: 1,
                title: 'Introduction to Python',
                description: 'Introduction to Python This chapter provides a beginner-friendly introduction to Python programming, covering the essentials like variables, data types, control structures, functions, and libraries commonly used in AI and ML. You’ll write your first Python scripts and get comfortable with the syntax and style of the language.',
                topics: [
                    'Introduction to Python',
                    'Setting Up the Python Environment',
                    'Basic Syntax, Variables, and Data Types',
                    'Control Structures',
                    'Functions and Modules',
                    'Working with Libraries (NumPy)',
                    'Writing and Running Simple Python Scripts',
                ],
            },
            {
                chapter: 2,
                title: 'Setting Up the Environment',
                description: 'Learn how to set up your Python environment, install necessary libraries, and configure your development tools for AI and ML projects.',
                topics: [
                    'Installing Python',
                    'Setting Up a Virtual Environment',
                    'Installing Libraries with pip',
                    'Configuring an IDE',
                ],
            },
            {
                chapter: 3,
                title: 'Working with Python (NumPy)',
                description: 'Dive into NumPy, a fundamental library for numerical computing in Python, and learn how to work with arrays, perform mathematical operations, and handle large datasets efficiently.',
                topics: [
                    'Introduction to NumPy',
                    'Working with Arrays',
                    'Array Operations',
                    'Handling Large Datasets',
                ],
            },
            {
                chapter: 4,
                title: 'Data Preprocessing',
                description: 'Learn techniques for cleaning, transforming, and preparing data for machine learning models.',
                topics: [
                    'Handling Missing Data',
                    'Data Normalization',
                    'Feature Scaling',
                    'Encoding Categorical Data',
                ],
            },
            {
                chapter: 5,
                title: 'Supervised Learning',
                description: 'Explore supervised learning algorithms like linear regression, logistic regression, and decision trees.',
                topics: [
                    'Linear Regression',
                    'Logistic Regression',
                    'Decision Trees',
                    'Model Evaluation',
                ],
            },
            {
                chapter: 6,
                title: 'Unsupervised Learning',
                description: 'Understand unsupervised learning techniques such as clustering and dimensionality reduction.',
                topics: [
                    'K-Means Clustering',
                    'Hierarchical Clustering',
                    'PCA (Principal Component Analysis)',
                    't-SNE',
                ],
            },
            {
                chapter: 7,
                title: 'Neural Networks',
                description: 'Introduction to neural networks, including perceptrons, activation functions, and backpropagation.',
                topics: [
                    'Perceptrons',
                    'Activation Functions',
                    'Backpropagation',
                    'Building a Simple Neural Network',
                ],
            },
            {
                chapter: 8,
                title: 'Deep Learning with TensorFlow',
                description: 'Learn the basics of deep learning using TensorFlow, including building and training deep neural networks.',
                topics: [
                    'Introduction to TensorFlow',
                    'Building Deep Neural Networks',
                    'Training and Optimizing Models',
                    'Using Pre-trained Models',
                ],
            },
            {
                chapter: 9,
                title: 'Real-World Projects',
                description: 'Apply your skills to real-world projects, such as building a predictive model or image classification system.',
                topics: [
                    'Predictive Modeling',
                    'Image Classification',
                    'Natural Language Processing Basics',
                    'Project Deployment',
                ],
            },
        ],
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
                        knowledge: { rating: 4.5, comment: "The instructor was very knowledgeable and provided great insights." },
                        deadlines: { rating: 4.0, comment: "Content was delivered on time." },
                        quality: { rating: 4.2, comment: "The quality of the course material was impressive." },
                        recommendation: { rating: 4.8, comment: "I would definitely recommend this course to others!" },
                        responseTime: { rating: 4.3, comment: "The instructor responded quickly to my queries." },
                        expectations: { rating: 4.1, comment: "Overall, the course met my expectations well." },
                        additionalImages: ['/images/servicesPictures/service1.png', '/images/servicesPictures/service2.png', '/images/servicesPictures/service3.png',],
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
                        deadlines: { rating: 4.5, comment: "All content was available on schedule." },
                        quality: { rating: 4.6, comment: "High-quality lectures, exceeded expectations." },
                        recommendation: { rating: 4.9, comment: "Highly recommend this course!" },
                        responseTime: { rating: 4.4, comment: "Responses were prompt and helpful." },
                        expectations: { rating: 4.5, comment: "Fully met my expectations." },
                        additionalImages: ['/images/servicesPictures/service1.png', '/images/servicesPictures/service2.png',],
                    },
                },
            ],
        },
        relatedCourses: [
            {
                id: 1,
                title: 'AI and Machine Learning Using Python Programming Language',
                image: '/course-image1.jpg',
                rating: 4.2,
                reviews: 273,
                price: 34.99,
                avatar: '',
                sellerName: 'Silly Vein',
                location: 'Pakistan',
            },
            {
                id: 2,
                title: 'AI and Machine Learning Using Python Programming Language',
                image: '/course-image2.jpg',
                rating: 4.7,
                reviews: 142,
                price: 49.99,
                avatar: '',
                sellerName: 'Silly Vein',
                location: 'Pakistan',
            },
            {
                id: 3,
                title: 'AI and Machine Learning Using Python Programming Language',
                image: '/course-image3.jpg',
                rating: 4.2,
                reviews: 273,
                price: 39.99,
                avatar: '',
                sellerName: 'Silly Vein',
                location: 'Pakistan',
            },
            {
                id: 4,
                title: 'AI and Machine Learning Using Python Programming Language',
                image: '/course-image4.jpg',
                rating: 4.5,
                reviews: 195,
                price: 44.99,
                avatar: '',
                sellerName: 'Silly Vein',
                location: 'Pakistan',
            },
        ],
        galleryImages: [
            '/images/servicesPictures/service1.png',
            '/images/servicesPictures/service2.png',
            '/images/servicesPictures/service3.png',
            '/images/servicesPictures/service1.png',
            '/images/servicesPictures/service2.png',
        ],
    };

    const thumbnailsPerPage = 6;
    const totalPages = Math.ceil(course.galleryImages.length / thumbnailsPerPage);

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

    const filterOptions = [
        'All Ratings',
        '5 Stars',
        '4 Stars and Above',
        '3 Stars and Above',
        '2 Stars and Above',
        '1 Star and Above',
    ];

    const filteredTestimonials = course.reviews.testimonials.filter((review) => {
        if (reviewFilter === 'All Ratings') return true;
        const ratingThreshold = parseFloat(reviewFilter.charAt(0));
        return review.rating >= ratingThreshold;
    });

    // Find the currently selected chapter
    const currentChapter = course.programDetails.find(ch => ch.chapter === selectedChapter);

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="mx-auto px-4 py-8 max-w-[1240px]">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Content (Gallery and Description) */}
                    <div className="lg:w-[60%]">
                        <div className="w-full bg-white">
                            {/* Title and Instructor Info */}
                            <div className="mx-auto pt-6 pb-2">
                                <h1 className="text-3xl lg:text-4xl font-bold text-black mb-4">{course.title}</h1>

                                <div className="flex congruence mb-6">
                                    <div className="mr-4">
                                        <div className="w-20 h-20 rounded-full overflow-hidden relative border-2">
                                            <img
                                                src={course.profile.avatar}
                                                alt={course.profile.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center mb-0">
                                            <h2 className="text-lg lg:text-xl font-semibold text-black mr-2 capitalize">{course.profile.name}</h2>
                                            <span className="px-3 py-1 bg-[#FFF8E1] rounded-full text-[#FFD700] text-xs lg:text-sm">{course.profile.level}</span>
                                        </div>
                                        <p className="text-sm lg:text-base text-textLight mb-1 capitalize">{course.profile.location}</p>
                                        <div className="flex items-center">
                                            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                            <span className="text-sm lg:text-base text-black ml-1">{course.profile.rating}/5</span>
                                            <span className="text-sm lg:text-base text-textLight ml-1">({course.profile.reviews} Reviews)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Image Gallery */}
                            <div className="relative w-full rounded-lg overflow-hidden mx-auto mt-0" style={{ aspectRatio: '653 / 371' }}>
                                <img
                                    src={course.galleryImages[currentImageIndex]}
                                    alt="Course Preview"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-5 right-5 bg-black/80 text-white text-xs lg:text-sm px-3 py-1 rounded-full">
                                    {String(currentImageIndex + 1).padStart(2, '0')} / {String(course.galleryImages.length).padStart(2, '0')}
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
                                        {course.galleryImages.map((image, index) => (
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

                            {/* Languages and Skills - Moved Below Gallery */}
                            <div className="mx-auto pt-6">
                                <div className="border border-border rounded-[20px] p-6 flex justify-between">
                                    <div className="flex-1 pr-4">
                                        <p className="text-sm font-semibold text-text mb-1">Available In</p>
                                        <p className="text-base text-text">{course.languages.join(', ')}</p>
                                    </div>
                                    <div className="w-px bg-border mx-4"></div> {/* Vertical Divider */}
                                    <div className="flex-1 pl-4">
                                        <p className="text-sm font-semibold text-text mb-1">Skills You'll Gain</p>
                                        <p className="text-base text-text">{course.skills.join(', ')}</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Description Section */}
                        <div className="mx-auto mb-20 mt-8">
                            <h2 className="text-[20px] font-semibold text-primary mb-4">Description</h2>
                            <div className="typoB3 text-text space-y-4">
                                <p>{course.description}</p>
                            </div>
                        </div>

                        {/* What You'll Learn Section */}
                        <div className="mx-auto mb-20">
                            <h2 className="text-[15px] font-semibold text-text mb-4">What You'll Learn</h2>
                            <div className="typoB3 text-text space-y-4">
                                {course.whatYouLearn.map((item, index) => (
                                    <p key={index} className="flex items-start">
                                        <span className="text-primary mr-2">•</span>
                                        <span>{item}</span>
                                    </p>
                                ))}
                            </div>
                        </div>

                        {/* Why Take This Course Section */}
                        <div className="mx-auto mb-20">
                            <h2 className="text-[15px] font-semibold text-text mb-4">Why Take This Course?</h2>
                            <div className="typoB3 text-text space-y-4">
                                {course.whyTakeThisCourse.map((item, index) => (
                                    <p key={index} className="flex items-start">
                                        <span className="text-primary mr-2">•</span>
                                        <span>{item}</span>
                                    </p>
                                ))}
                            </div>
                        </div>

                        {/* Program Details Section */}
                        <div className="mx-auto mb-20">
                            <h2 className="text-[20px] font-semibold text-primary mb-4">Program Details</h2>
                            <div className="flex gap-6">
                                {/* Sidebar: Chapter Navigation */}
                                <div className="w-1/4">
                                    <div className="bg-white border border-border rounded-[20px] p-4">
                                        <h3 className="text-sm font-semibold text-text mb-4">Chapters</h3>
                                        <div className="space-y-2">
                                            {course.programDetails.map((chapter) => (
                                                <button
                                                    key={chapter.chapter}
                                                    className={`w-full text-left py-2 px-4 rounded-lg text-sm ${selectedChapter === chapter.chapter
                                                            ? 'bg-primary text-white'
                                                            : 'text-textLight hover:bg-gray-100'
                                                        }`}
                                                    onClick={() => setSelectedChapter(chapter.chapter)}
                                                >
                                                    Chapter {chapter.chapter}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Main Content: Selected Chapter Details */}
                                <div className="w-3/4">
                                    {currentChapter && (
                                        <div className="p-6 border border-border rounded-[20px]">
                                            <h3 className="text-[15px] font-medium text-text mb-2">
                                                Chapter {currentChapter.chapter}: {currentChapter.title}
                                            </h3>
                                            <p className="typoB3 text-textLight mb-4">{currentChapter.description}</p>
                                            {currentChapter.topics.length > 0 && (
                                                <div>
                                                    <h4 className="text-sm font-semibold text-text mb-2">Topics Covered</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {currentChapter.topics.map((topic, topicIndex) => (
                                                            <span
                                                                key={topicIndex}
                                                                className="px-4 py-2 bg-whiteGrey border border-border rounded-full text-text text-sm"
                                                            >
                                                                {topic}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* About The Instructor Section */}
                        <div className="mx-auto mb-20">
                            <h2 className="typoS1 text-primary mb-6">About The Instructor</h2>
                            <div className="p-6 border border-border rounded-[20px] bg-white shadow-sm">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start">
                                        <div className="mr-4">
                                            <div className="w-20 h-20 rounded-full overflow-hidden relative border-2">
                                                <img
                                                    src={course.profile.avatar}
                                                    alt={course.profile.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center mb-1">
                                                <h2 className="typoS2 text-black mr-2 capitalize">{course.profile.name}</h2>
                                                <span className="px-3 py-1 bg-[#FFF8E1] rounded-full text-[#FFD700] text-xs font-medium">
                                                    {course.profile.level}
                                                </span>
                                            </div>
                                            <p className="typoC1 text-textLight mb-2 capitalize">{course.profile.location}</p>
                                            <div className="flex items-center mb-3">
                                                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-1" />
                                                <span className="typoB3 text-black">{course.profile.rating}/5</span>
                                                <span className="typoC1 text-textLight ml-1">({course.profile.reviews} Reviews)</span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="typoC1 text-textLight">Courses Taught</p>
                                                    <p className="typoB4 text-black">{course.profile.reviews}</p>
                                                </div>
                                                <div>
                                                    <p className="typoC1 text-textLight">Languages</p>
                                                    <p className="typoB4 text-black">{course.languages.join(', ')}</p>
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

                        {/* Review Section */}
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

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 bg-white border border-border rounded-[20px] p-6 mb-8">
                                <div className="flex flex-col items-center justify-center lg:items-start h-full">
                                    <div className="flex items-center mb-2">
                                        <span className="text-5xl font-bold text-text mr-2">{course.reviews.average}</span>
                                        <Star className="w-8 h-8 text-primary fill-primary" />
                                    </div>
                                    <span className="text-sm text-textLight">{course.reviews.total} Ratings</span>
                                </div>

                                <div className="col-span-2 flex flex-col justify-center">
                                    {course.reviews.distribution.map((item, index) => (
                                        <div key={index} className="flex items-center mb-2">
                                            <span className="text-sm text-text w-12">{item.rating.toFixed(1)}</span>
                                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-primary rounded-full"
                                                    style={{ width: `${(item.count / course.reviews.total) * 100}%` }}
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
                                    <div className="flex justify-between items-center mb-6">
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
                                        <h3 className="typoS2 text-text">COURSE SUMMARY</h3>
                                        <span className="text-xs text-primary font-medium bg-[#E6F2FF] px-3 py-1 rounded-full">
                                            {course.duration}
                                        </span>
                                    </div>

                                    <div className="mb-6">
                                        <h4 className="typoB2 text-text mb-3">About</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="flex items-center">
                                                <Video className="w-5 h-5 text-textLight mr-2" />
                                                <span className="typoB3 text-text">Video Duration {course.videoDuration}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <List className="w-5 h-5 text-textLight mr-2" />
                                                <span className="typoB3 text-text">Chapters {course.chapters}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <FileText className="w-5 h-5 text-textLight mr-2" />
                                                <span className="typoB3 text-text">Documents {course.documents}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <List className="w-5 h-5 text-textLight mr-2" />
                                                <span className="typoB3 text-text">Articles {course.articles}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <h4 className="typoB2 text-text mb-3">Features</h4>
                                        <ul className="space-y-2">
                                            {course.features.map((feature, index) => (
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
                                            <span className="text-3xl font-bold text-text">${course.price}</span>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button className="btn btnDark btnMedium flex-1 bg-black text-white rounded-full">Buy Now</button>
                                            <button className="btn btnDefault btnMedium flex-1 border border-border rounded-full text-text">Ask for Quote</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Explore Similar Courses Section */}
            <div className="bg-whiteGrey py-12 relative z-20">
                <div className="mx-auto px-4 max-w-[1240px]">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="typoH2 text-text">Explore Similar Courses</h2>
                        <p className="text-textLight">Expand your knowledge and skills further</p>
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
                        {course.relatedCourses.map((item) => (
                            <ServiceCard
                                key={item.id}
                                service={item}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}