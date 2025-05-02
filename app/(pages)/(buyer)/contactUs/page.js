"use client";

import { useState } from 'react';
import { Upload } from 'lucide-react';
import { Dropdown } from "@/components/utils/dropdown"

export default function ContactForm() {
  const [dragActive, setDragActive] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    subject: '',
    message: ''
  });
  
  const defaultChoose  = "Help Me Please";
  const chooseOptions = ['Help Me Please', 'Oranges Are Sour', 'I am pretty sure', 'I am not sure'];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file drop logic here
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-black mb-2">Contact Us</h1>
        <p className="text-lg text-gray-600">For assistance or inquiries, please reach out to the customer support team</p>
      </div>
      
      <div className="flex justify-center">
        <div className="w-full max-w-4xl border border-gray-200 rounded-xl overflow-hidden">
          <div className="flex flex-col md:flex-row m-[20px]">
            {/* Left side with dark background */}
            <div className="bg-black text-white p-8 md:w-2/5 relative overflow-hidden rounded-[16px]">
              <div className="relative z-10 flex flex-col justify-start h-full">
                <h2 className="text-3xl font-bold mb-2">Feel Free To Reach Out</h2>
                <p className="text-gray-300">your voice matters to us</p>
              </div>
              
              {/* Decorative circles */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gray-800 rounded-full opacity-50"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-gray-800 rounded-full opacity-30"></div>
            </div>
            
            {/* Right side with form */}
            <div className="bg-white p-8 md:p-10 md:w-3/5">
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                <div className='flex-1'>
                  <label className="formLabel mb-2 block">Name</label>
                  <input
                    type="text"
                    value=""
                    onChange={(e) => setTitle(e.target.value)}
                    className="formInput"
                    placeholder="Enter your full name"
                  />
                </div>
                  <div className='flex-1'>
                  <label className="formLabel mb-2 block">Email</label>
                  <input
                    type="email"
                    value=""
                    onChange={(e) => setTitle(e.target.value)}
                    className="formInput"
                    placeholder="Enter your email"
                  />
                </div>
                </div>
                
                <div>
                  <label className="formLabel mb-2 block">Subject</label>
                  <Dropdown
                    options={chooseOptions}
                    defaultValue={defaultChoose}
                    onChange={(value) => setCategory(value)}
                    variant="default"
                  />
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
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-600"
                    required
                  ></textarea>
                </div>
                
                <div>
                  <label className="block mb-2 font-medium text-gray-700">Drop files here</label>
                  <div 
                    className={`border-2 border-dashed rounded-lg p-6 text-center ${dragActive ? "border-black bg-gray-50" : "border-gray-300"}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="p-3 bg-gray-100 rounded-lg">
                        <Upload className="h-6 w-6 text-gray-500" />
                      </div>
                      <p className="text-gray-500">Drag and Drop or Upload media</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button 
                    onClick={handleSubmit}
                    className="flex items-center justify-center space-x-2 bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}