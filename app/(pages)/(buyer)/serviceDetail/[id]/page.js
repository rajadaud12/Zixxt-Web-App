'use client'
import React, { useState } from 'react';
import { Heart, Clock, Check, ChevronDown, ChevronRight, Info, Star } from 'lucide-react';

// Mock ServiceCard component - normally this would be imported
const ServiceCard = ({ image, title, rating, reviews, price }) => (
  <div className="flex flex-col bg-white rounded-lg overflow-hidden shadow-sm border border-border">
    <div className="relative h-40">
      <img src={image} alt={title} className="w-full h-full object-cover" />
    </div>
    <div className="p-4">
      <h3 className="typoB2 mb-2 line-clamp-2">{title}</h3>
      <div className="flex items-center mb-2">
        <Star className="w-4 h-4 text-software fill-software" />
        <span className="text-text ml-1 text-sm">{rating}</span>
        <span className="text-textLight ml-1 text-sm">({reviews})</span>
      </div>
      <div className="flex justify-between items-center mt-2">
        <p className="text-sm">From <span className="font-semibold">${price}</span></p>
      </div>
    </div>
  </div>
);

export default function ServiceDetail({ params }) {
  const { id } = params;
  const [wishlist, setWishlist] = useState(false);

  // Mock data for the service
  const service = {
    id,
    title: "I will design a custom logo for your brand",
    instructor: {
      name: "kahmiri",
      level: "Gold",
      rating: 4.2,
      reviews: 273,
      avatar: "/instructor-avatar.jpg"
    },
    price: 75.99,
    duration: 3,
    options: [
      {
        title: "Starter Logo Design",
        features: [
          "3 Logo Concepts",
          "High-Resolution PNG & JPG",
          "For Startups, personal brands, small projects"
        ]
      }
    ],
    languages: ["Eng", "Urdu", "Spanish"],
    description: "I Believe A Great Logo Is More Than Just A Design – It's The Face Of Your Brand. With Years Of Experience And A Passion For Creativity, I Offer High-Quality Designs That Reflect Your Brand's Identity And Values. You'll Receive Not Only A Stunning Logo But Also A Smooth, Collaborative Experience From Start To Finish.",
    whatYouGet: [
      "3-5 Custom Logo Designs And Delivered From Scratch. I Pay Close Attention To Your Requirements And Provide Designs That Align Perfectly With Your Vision.",
      "My Service Includes High-Resolution Files, Fast Delivery, And Professional Customer Support To Ensure You're Completely Satisfied."
    ],
    designApproach: [
      "I Start By Understanding Your Brand's Message, Audience, And Style Preferences. From There, I Brainstorm And Sketch Multiple Ideas Before Refining Them Into Polished Logo Concepts.",
      "Once You Choose Your Favorite, I'll Make Any Necessary Adjustments To Ensure It's Perfect For Your Brand.",
      "Ready To Take Your Brand To The Next Level? Place Your Order Today, And Let's Create A Logo That Captures Your Brand's Essence And Leaves A Lasting Impression. I Look Forward To Working With You And Bringing Your Vision To Life."
    ],
    technicalInfo: {
      afterSaleSupport: "This Seller Offers after-sale support at hourly charges",
      supportRate: 4
    },
    discount: {
      percent: 2,
      condition: "This order includes an automatic discount applied in case of a missed deadline."
    },
    reviews: {
      average: 4.2,
      total: 273,
      distribution: [
        { rating: 5.0, count: 171 },
        { rating: 4.0, count: 58 },
        { rating: 3.0, count: 26 },
        { rating: 2.0, count: 12 },
        { rating: 1.0, count: 6 }
      ],
      testimonials: [
        {
          avatar: "/user-avatar1.jpg",
          name: "kahmiri",
          date: "2 days ago",
          rating: 4.2,
          text: "Introduction To Python This Chapter Provides A Beginner-Friendly Introduction To Python Programming, Covering The Essentials Like Variables, Data Types, Control Structures, Functions, And Libraries Commonly Used In AI And ML."
        },
        {
          avatar: "/user-avatar2.jpg",
          name: "kahmiri",
          date: "3 days ago",
          rating: 4.5,
          text: "Introduction To Python This Chapter Provides A Beginner-Friendly Introduction To Python Programming, Covering The Essentials Like Variables, Data Types, Control Structures, Functions, And Libraries Commonly Used In AI And ML."
        }
      ]
    },
    relatedServices: [
      {
        id: 1,
        title: "AI and Machine Learning Using Python Programming Language",
        image: "/course-image1.jpg",
        rating: 4.2,
        reviews: 273,
        price: 34.99
      },
      {
        id: 2,
        title: "AI and Machine Learning Using Python Programming Language",
        image: "/course-image2.jpg",
        rating: 4.7,
        reviews: 142,
        price: 49.99
      },
      {
        id: 3,
        title: "AI and Machine Learning Using Python Programming Language",
        image: "/course-image3.jpg",
        rating: 4.2,
        reviews: 273,
        price: 39.99
      },
      {
        id: 4,
        title: "AI and Machine Learning Using Python Programming Language",
        image: "/course-image4.jpg",
        rating: 4.5,
        reviews: 195,
        price: 44.99
      }
    ]
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Content (Gallery and Description) */}
          <div className="lg:w-2/3">
            {/* Title for mobile */}
            <div className="block lg:hidden mb-6">
              <h1 className="typoH1 text-text mb-4">{service.title}</h1>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <img src={service.instructor.avatar} alt={service.instructor.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="typoB4 text-text">{service.instructor.name}</span>
                    <span className="ml-2 px-2 py-0.5 bg-secondary text-xs rounded-full text-levelGold">
                      {service.instructor.level}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-software fill-software" />
                    <span className="text-text ml-1 text-sm">{service.instructor.rating}</span>
                    <span className="text-textLight ml-1 text-sm">({service.instructor.reviews} Orders)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery */}
            <div className="mb-8 rounded-lg overflow-hidden relative">
              <img src="/logo-gallery-main.jpg" alt="Logo Gallery" className="w-full h-[400px] object-cover" />
              <button 
                className={`absolute top-4 right-4 p-2 rounded-full bg-white ${wishlist ? 'text-primary' : 'text-textLight'}`}
                onClick={() => setWishlist(!wishlist)}
              >
                <Heart className={`w-5 h-5 ${wishlist ? 'fill-primary' : ''}`} />
              </button>
              <div className="flex overflow-x-auto mt-2 gap-2">
                <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-primary">
                  <img src="/thumb1.jpg" alt="Thumbnail" className="w-full h-full object-cover" />
                </div>
                <div className="w-20 h-20 rounded-lg overflow-hidden">
                  <img src="/thumb2.jpg" alt="Thumbnail" className="w-full h-full object-cover" />
                </div>
                <div className="w-20 h-20 rounded-lg overflow-hidden">
                  <img src="/thumb3.jpg" alt="Thumbnail" className="w-full h-full object-cover" />
                </div>
                <div className="w-20 h-20 rounded-lg overflow-hidden">
                  <img src="/thumb4.jpg" alt="Thumbnail" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Desktop Title (Hidden on mobile) */}
            <div className="hidden lg:block mb-6">
              <h1 className="typoH1 text-text mb-4">{service.title}</h1>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <img src={service.instructor.avatar} alt={service.instructor.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="typoB4 text-text">{service.instructor.name}</span>
                    <span className="ml-2 px-2 py-0.5 bg-secondary text-xs rounded-full text-levelGold">
                      {service.instructor.level}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-software fill-software" />
                    <span className="text-text ml-1 text-sm">{service.instructor.rating}</span>
                    <span className="text-textLight ml-1 text-sm">({service.instructor.reviews} Orders)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Auto Discount Alert */}
            <div className="flex items-start bg-secondary rounded-lg p-4 mb-8">
              <div className="p-2 bg-primary rounded-full text-white mr-3">
                <Info className="w-4 h-4" />
              </div>
              <div>
                <h3 className="typoB4 text-text mb-1">Auto Discount</h3>
                <p className="typoB3 text-textLight">
                  This order includes an automatic discount applied in case of a missed deadline.
                </p>
              </div>
              <div className="ml-auto">
                <span className="text-primary font-bold text-xl">{service.discount.percent}%</span>
                <span className="text-textLight text-xs block">per day</span>
              </div>
            </div>
            
            {/* Description Section */}
            <div className="mb-8">
              <h2 className="typoS1 text-text mb-4 text-blue-500">Description</h2>
              <div className="typoB3 text-text space-y-4">
                <p>{service.description}</p>
              </div>
            </div>

            {/* What You'll Get Section */}
            <div className="mb-8">
              <h2 className="typoS1 text-text mb-4">What You'll Get</h2>
              <div className="typoB3 text-text space-y-4">
                {service.whatYouGet.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </div>
            </div>

            {/* Design Approach Section */}
            <div className="mb-8">
              <h2 className="typoS1 text-text mb-4">My Design Approach</h2>
              <div className="typoB3 text-text space-y-4">
                {service.designApproach.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </div>
            </div>

            {/* Technical Information */}
            <div className="mb-12">
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
                    If you have any specific preferences or concerns, please discuss them with the instructor.
                  </p>
                  <div className="ml-auto">
                    <span className="text-black font-bold text-xl">${service.technicalInfo.supportRate}</span>
                    <span className="text-textLight text-xs block">per hour</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="mb-12">
              <h2 className="typoS1 text-text mb-4 text-blue-500">Reviews</h2>
              
              {/* Review Summary */}
              <div className="flex items-start mb-8">
                <div className="mr-8">
                  <div className="text-3xl font-bold">{service.reviews.average}</div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-software fill-software" />
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
                          <Star className="w-4 h-4 text-software fill-software" />
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
            <div className="sticky top-4">
              <div className="border border-border rounded-lg overflow-hidden bg-white shadow-sm mb-6">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="typoS2">SERVICE SUMMARY</h3>
                    <span className="text-xs text-primary font-medium bg-secondary px-3 py-1 rounded-full">3 DAYS</span>
                  </div>
                  
                  <div className="border-y border-border py-4 mb-4">
                    <h4 className="typoB2 mb-3">Starter Logo Design</h4>
                    <ul className="space-y-2">
                      {service.options[0].features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="w-4 h-4 text-success mr-2" />
                          <span className="typoB3">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                      <span className="typoC2 text-textLight mr-1">DELIVERY</span>
                      <Clock className="w-3 h-3 text-textLight mr-1" />
                      <span className="typoC2 text-text">3 DAYS</span>
                    </div>
                    <div className="flex items-center">
                      <span className="typoC2 text-textLight mr-1">REVISIONS</span>
                      <span className="typoC2 text-text">UNLIMITED</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-textLight">price</span>
                      <span className="text-2xl font-bold text-text">${service.price}</span>
                    </div>
                    <button className="btn btnPrimary btnMedium w-full mb-2">Buy Now</button>
                    <button className="btn btnDefault btnMedium w-full">Ask for Quote</button>
                  </div>
                </div>
              </div>
              
              <div className="border border-border rounded-lg overflow-hidden bg-white shadow-sm p-4">
                <p className="typoB3 text-text text-center">
                  Got questions? Contact the seller directly for more information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* You May Also Like Section */}
      <div className="bg-whiteGrey py-12">
        <div className="container mx-auto px-4">
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