"use client"

import { useState, useRef, useEffect } from "react"
import SectionCard from "@/components/buyer/sectionCard"
import CourseCard from "@/components/buyer/courseCard"
import SoftwareCard from "@/components/buyer/softwareCard"
import ServiceCard from "@/components/buyer/serviceCard"
import { Main } from "@/components/buyer/heroComponents"
import { courses,services,softwares } from "@/app/data/products";

import { ChevronRight, ChevronLeft, Send} from "lucide-react";


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


const FaqAnswer = ({ question, answer }) => {
  return (
    <article className="flex flex-col px-20 py-14 w-full leading-7 bg-secondary rounded-2xl max-md:px-5 max-md:max-w-full">
      <div className="max-md:max-w-full">
        <h2 className="text-lg font-bold text-zinc-900 text-left">
          {question}
        </h2>
        <p className="mt-10 text-sm text-black max-md:max-w-full text-left">
          {answer}
        </p>
      </div>
    </article>
  );
};

// FaqItem Component
const FaqItem = ({
  question,
  isActive,
  onClick,
  isFirst = false,
}) => {
  return (
    <article
      className={`flex flex-col justify-center ${
        isActive
          ? "px-8 py-6 mt-4 w-full leading-6 bg-secondary min-h-24 rounded-[100px] max-md:px-5 max-md:max-w-full"
          : "px-4 py-6 mt-4 w-full bg-white border border-solid border-neutral-200 min-h-[72px] rounded-[100px] max-md:max-w-full"
      } ${isFirst && !isActive ? "mt-0" : ""}`}
      onClick={onClick}
    >
      <div className="flex justify-between items-center w-full">
        <div className="flex gap-4 items-center">
          <span
            className={`flex shrink-0 w-2.5 h-2.5 rounded-full ${
              isActive ? "bg-black" : "bg-neutral-200"
            }`}
          />
          <p className="text-left">
            {question}
          </p>
        </div>
        {!isActive && (
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/70b67c9298b5e9c7109364b66acbe2a5ee3f81e1?placeholderIfAbsent=true&apiKey=fd53637cc6c641ad946d3c2bb56284bd"
            className="w-6 aspect-square"
            alt="Expand"
          />
        )}
      </div>
    </article>
  );
};



export default function Home() {
  const [activeFaqIndex, setActiveFaqIndex] = useState(0);
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

  const handleFaqClick = (index) => {
    setActiveFaqIndex(index);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
  };


  const faqs = [
    {
      question:
        "Do I need to pay to Instapay even when there is no transaction going on in my business?",
      answer:
        "No, you do not need to pay Instapay where there is no transaction happening. With one of the lowest transaction charges in the industry, pay only when you get paid!No, you do not need to pay Instapay where there is no transaction happening. With one of the lowest transaction charges in the industry, pay only when you get paid!, you do not need to pay Instapay where there is no transaction happening. With one of the lowest transaction charges in the industry, pay only when you get paid!No, you do not need to pay Instapay where there is no transaction happening. With one of the lowest transaction charges",
    },
    {
      question: "What is Zixxt?",
      answer:
        "Zixxt is a comprehensive platform that provides various services to help businesses manage their operations efficiently. It offers tools for payment processing, customer management, and more.",
    },
    {
      question: "What services zixxt offers?",
      answer:
        "Zixxt offers a wide range of services including payment processing, customer relationship management, inventory tracking, analytics, and reporting tools to help businesses streamline their operations.",
    },
    {
      question:
        "How privacy is handled in zixxt? what type of data is gathered",
      answer:
        "Zixxt takes privacy seriously. We only collect essential data needed to provide our services. This includes transaction information, account details, and usage patterns. All data is encrypted and stored securely following industry best practices.",
    },
    {
      question: "Does ACME provide international payments support?",
      answer:
        "Yes, ACME provides comprehensive international payment support. Our platform enables businesses to receive payments from customers worldwide in multiple currencies with competitive exchange rates.",
    },
  ];
 
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
    <main className="homeContainer bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-16 to-white py-30">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[100px] text-center mt-[50px]">
          <Main />
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[100px]">
          <SectionCard />
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
             <SoftwareCard software={software}/>
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
      <div className="max-w-[1440px] mx-auto px-4 md:px-[100px] text-center mt-[50px] mb-[50px]">

    <section className="flex flex-col">
      <header className="flex flex-col text-left w-full bg-white mx-auto mb-8 max-md:max-w-full">
        <h1 className="text-4xl font-medium text-zinc-900">
          Frequently Asked Questions
        </h1>
      </header>
      <div className="w-full max-md:max-w-full">
        <div className="flex gap-5 items-start max-md:flex-col">
          <div className="w-6/12 max-md:ml-0 max-md:w-full">
            <div className="text-base text-black max-md:max-w-full">
              <div className="flex flex-col max-w-full w-full">
                {faqs.map((faq, index) => (
                  <FaqItem
                    key={index}
                    question={faq.question}
                    isActive={index === activeFaqIndex}
                    onClick={() => handleFaqClick(index)}
                    isFirst={index === 0}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="w-6/12 max-md:ml-0 max-md:w-full">
            <FaqAnswer
              question={faqs[activeFaqIndex].question}
              answer={faqs[activeFaqIndex].answer}
            />
          </div>
        </div>
      </div>
    </section>
    </div>
    </main>
  )
}