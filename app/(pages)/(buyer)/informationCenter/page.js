"use client";
import React, { useState } from "react";

// FaqAnswer Component
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

// Main InformationCenter Component
const InformationCenter = () => {
  const [activeFaqIndex, setActiveFaqIndex] = useState(0);
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
  
  const handleFaqClick = (index) => {
    setActiveFaqIndex(index);
  };
  
  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-[100px] text-center mt-[50px] mb-[50px]">

    <section className="flex flex-col">
      <header className="flex flex-col items-center w-full bg-white max-w-[949px] mx-auto mb-8 max-md:max-w-full">
        <h1 className="text-4xl font-medium text-zinc-900">
          Information Center
        </h1>
        <p className="mt-2 text-xl text-center text-zinc-500 max-md:max-w-full">
          Got questions? We've got answers.
        </p>
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
  );
};

export default InformationCenter;