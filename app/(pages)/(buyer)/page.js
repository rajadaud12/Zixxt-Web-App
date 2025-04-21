"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import CategoryCard from "@/components/buyer/categoryCard"
import CourseCard from "@/components/buyer/courseCard"
import SoftwareCard from "@/components/buyer/softwareCard"
import ServiceCard from "@/components/buyer/serviceCard"

import { ChevronRight, ChevronLeft, Send } from "lucide-react"
import '@/styles/utils.css'
// Enhanced CardSlider component to match the design in images
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
          <h2 className="text-2xl font-bold text-black">{title}</h2>
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

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
  };

  const categories = [
    {
      title: "Services",
      description: "Discover a range of expert solutions designed to meet your needs.",
      link: "/services",
      icon: "/services-icon.svg", // Placeholder for the icon
    },
    {
      title: "Education",
      description: "Explore courses to learn top skills from industry experts.",
      link: "/education",
      icon: "/education-icon.svg", // Placeholder for the icon
    },
    {
      title: "Softwares",
      description: "Explore top software for seamless performance.",
      link: "/softwares",
      icon: "/software-icon.svg", // Placeholder for the icon
    },
  ];

  const faqs = [
    {
      id: 0,
      question: "What is a Payment Gateway?",
      answer:
        "A payment gateway is a service that authorizes and processes payments for online transactions. It securely transfers payment information between the customer, merchant, and bank, ensuring smooth and safe transactions.",
    },
    {
      id: 1,
      question: "Do I need to pay to Instapay even when there is no transaction going on in my business?",
      answer:
        "No, you do not need to pay Instapay where there is no transaction happening. With one of the lowest transaction charges in the industry, pay only when you get paid!",
    },
    {
      id: 2,
      question: "What platforms does ACME payment gateway support?",
      answer:
        "ACME payment gateway supports a wide range of platforms, including web, mobile apps (iOS and Android), and various e-commerce platforms like Shopify, WooCommerce, and Magento.",
    },
    {
      id: 3,
      question: "Does ACME provide international payments support?",
      answer:
        "Yes, ACME offers international payment support, allowing you to accept payments from customers worldwide with multi-currency support and the lowest transaction charges.",
    },
  ];

  const courses = [
    {
      image: "/course1.jpg",
      sellerName: "kahmiri",
      location: "pakistan",
      title: "Learn AI and Machine Learning with Python in 30 days",
      rating: "4.2",
      reviews: "273",
      price: "1,141",
      hours: "30 hrs"
    },
    {
      image: "/course2.jpg",
      sellerName: "kahmiri",
      location: "pakistan",
      title: "Learn AI and Machine Learning with Python in 30 days",
      rating: "4.2",
      reviews: "273",
      price: "1,141",
      hours: "30 hrs"
    },
    {
      image: "/course3.jpg",
      sellerName: "kahmiri",
      location: "pakistan",
      title: "Learn AI and Machine Learning with Python in 30 days",
      rating: "4.2",
      reviews: "273",
      price: "1,141",
      hours: "30 hrs"
    },
    {
      image: "/course4.jpg",
      sellerName: "kahmiri",
      location: "pakistan",
      title: "Learn AI and Machine Learning with Python in 30 days",
      rating: "4.2",
      reviews: "273",
      price: "1,141",
      hours: "30 hrs"
    },
    {
      image: "/course2.jpg",
      sellerName: "kahmiri",
      location: "pakistan",
      title: "Learn AI and Machine Learning with Python in 30 days",
      rating: "4.2",
      reviews: "273",
      price: "1,141",
      hours: "30 hrs"
    },
    {
      image: "/course2.jpg",
      sellerName: "kahmiri",
      location: "pakistan",
      title: "Learn AI and Machine Learning with Python in 30 days",
      rating: "4.2",
      reviews: "273",
      price: "1,141",
      hours: "30 hrs"
    },
    {
      image: "/course2.jpg",
      sellerName: "kahmiri",
      location: "pakistan",
      title: "Learn AI and Machine Learning with Python in 30 days",
      rating: "4.2",
      reviews: "273",
      price: "1,141",
      hours: "30 hrs"
    },
    {
      image: "/course2.jpg",
      sellerName: "kahmiri",
      location: "pakistan",
      title: "Learn AI and Machine Learning with Python in 30 days",
      rating: "4.2",
      reviews: "273",
      price: "1,141",
      hours: "30 hrs"
    },
  ];

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

  // Software data to match your image
  const softwares = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id:3,
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // CSS for hiding scrollbars
  useEffect(() => {
    // Create style element
    const style = document.createElement('style');
    style.textContent = `
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[100px] text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Your All In One Platform For Services, Education, And Software
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            A Unified Hub Offering Endless Possibilities In Services, Education, And Software
          </p>
          <div className="flex justify-center space-x-4 mb-12">
            <Link
              href="/signup"
              className="px-6 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-all"
            >
              Join Now
            </Link>
            <Link
              href="/signin"
              className="px-6 py-3 bg-white text-black border border-gray-300 rounded-full font-semibold hover:bg-gray-100 transition-all"
            >
              Sign In
            </Link>
          </div>
          <div className="flex justify-center">
            <Image
              src="/hero-illustration.png" // Placeholder for the hero illustration
              alt="Services, Education, Software Flow"
              width={800}
              height={400}
              className="w-full max-w-4xl"
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[100px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[14px]">
            {categories.map((category, index) => (
              <CategoryCard key={index} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[100px]">
          <CardSlider 
            title="Courses"
            subtitle="Learn top skills from industry experts."
            items={courses}
            cardWidth={280}
            renderItem={(course, index) => (
              <CourseCard key={index} course={course} />
            )}
          />
          </div>
      </section>

      {/* Software Section */}
      <section className="py-16">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[100px]">
          <CardSlider 
            title="Software"
            subtitle="Explore Smart software for seamless performance."
            items={softwares}
            cardType="software"
            renderItem={(software, index) => (
             <SoftwareCard/>
            )}
          />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[100px]">
          <CardSlider 
            title="Services"
            subtitle="Expert solutions for your business growth."
            items={services}
            cardWidth={280}
            renderItem={(service, index) => (
              <ServiceCard key={index} service={service} />
            )}
          />
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-16">
        <div className="max-w-[1440px] mx-auto px-6 md:px-[100px]">
          <div className="flex flex-col md:flex-row rounded-xl overflow-hidden border border-border">
            {/* Left Column - Black Background */}
            <div className="bg-black text-white p-12 md:w-1/3 relative overflow-hidden m-[8px] rounded-[20px]">
              <h2 className="text-3xl font-bold mb-2">Contact Us</h2>
              <p className="text-gray-300 mb-12">your voice matters to us</p>
              
              {/* Social Media Icons */}
              <div className="flex space-x-4 mt-auto">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
              </div>
              
              {/* Background Circles */}
              <div className="absolute right-0 bottom-0 w-64 h-64 rounded-full bg-gray-300 opacity-70 -mr-20 -mb-20"></div>
              <div className="absolute left-12 bottom-32 w-24 h-24 rounded-full bg-gray-200 opacity-70"></div>
            </div>
            
            {/* Right Column - Form */}
            <div className="bg-white p-8 md:p-12 md:w-2/3">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="Enter your First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Enter your Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="what you want to say"
                    value={formData.message}
                    onChange={handleChange}
                    rows="7"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    required
                  ></textarea>
                </div>
                
                <div className="pt-4">
                  <button
                    type="submit"
                    className="flex items-center justify-center space-x-2 bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors"
                  >
                    <span>Send Message</span>
                    <Send size={16} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-[1440px] mx-auto px-6 md:px-[100px]">
          <h2 className="text-4xl font-bold text-black mb-12">Frequently Asked Questions</h2>
          
          <div className="flex flex-col md:flex-row">
            {/* Questions Column */}
            <div className="md:w-1/2 space-y-4">
              {faqs.map((faq) => (
                <button
                  key={faq.id}
                  onClick={() => toggleFAQ(faq.id)}
                  className={`w-full text-left p-6 rounded-xl flex items-center justify-between transition-all duration-300 
                    ${activeIndex === faq.id ? "bg-blue-50" : "bg-white border border-gray-200 hover:border-gray-300"}`}
                >
                  <div className="flex items-center">
                    <div 
                      className={`w-4 h-4 rounded-full mr-4 transition-colors duration-300 
                        ${activeIndex === faq.id ? "bg-blue-600" : "bg-gray-200"}`} 
                    />
                    <h3 className="text-base font-semibold text-black">{faq.question}</h3>
                  </div>
                  <ChevronRight 
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 
                      ${activeIndex === faq.id ? "rotate-90" : ""}`} 
                  />
                </button>
              ))}
            </div>
            
            {/* Answer Column */}
            <div className="md:w-1/2 md:pl-8 mt-8 md:mt-0">
              <div className="bg-blue-50 p-8 rounded-xl h-full relative overflow-hidden">
                {faqs.map((faq) => (
                  <div 
                    key={faq.id}
                    className={`absolute inset-0 p-8 transition-all duration-500 ease-in-out transform 
                      ${activeIndex === faq.id 
                        ? "translate-x-0 opacity-100" 
                        : "translate-x-full opacity-0 pointer-events-none"}`}
                  >
                    <h3 className="text-xl font-semibold text-black mb-4">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
                
                {activeIndex === null && (
                  <div className="text-center text-gray-500 h-full flex items-center justify-center">
                    <p>Select a question to view the answer</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}