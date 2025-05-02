'use client'

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Dropdown } from "@/components/utils/dropdown"

export default function PostRequest() {
  const [category, setCategory] = useState('Service');
  const [subCategory, setSubCategory] = useState('Select the subcategory');
  const [budget, setBudget] = useState('$45');
  const [title, setTitle] = useState('');
  const [timeFrame, setTimeFrame] = useState('7 days');
  const [description, setDescription] = useState('');

  const categoryOptions = ['Service', 'Education', 'Software'];
  const subCategoryOptions = ['Subcategory 1', 'Subcategory 2', 'Subcategory 3'];
  const timeFrameOptions = ['7 days', '14 days', '30 days'];

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8 pt-10 pb-12 mb-[100px]">
        {/* Header section - matching TradeLeads */}
        <div className="text-center mb-10">
          <h1 className="typoH1 text-black mb-2">Post A Request</h1>
          <p className="typoB1 text-textLight">
            Post a Request and unlock exclusive offers from top-rated sellers!
          </p>
        </div>

        {/* Form section with relative positioning */}
        <div className="relative">
          {/* Form Container */}
          <div className="bg-white rounded-[20px] border border-border p-8 flex gap-6">
            {/* Left Image Placeholder */}
            <div className="w-[300px] bg-gray-100 rounded-[20px] overflow-hidden">
              <img
                src="/images/tradelead.png"
                alt="Placeholder"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Form Fields */}
            <div className="flex-1 mt-5">
              {/* Category and Subcategory Dropdowns */}
              <div className="grid grid-cols-2 gap-4 mb-12">
                <div>
                  <label className="formLabel mb-2 block">What you are looking for?</label>
                  <Dropdown
                    options={categoryOptions}
                    defaultValue={category}
                    onChange={(value) => setCategory(value)}
                    variant="default"
                  />
                </div>
                <div>
                  <label className="formLabel mb-2 block">Select Category</label>
                  <Dropdown
                    options={subCategoryOptions}
                    defaultValue="Select Category"
                    onChange={(value) => setSubCategory(value)}
                    variant="default"
                  />
                </div>
              </div>

              {/* Subcategory and Budget */}
              <div className="grid grid-cols-2 gap-4 mb-12">
                <div>
                  <label className="formLabel mb-2 block">Select the subcategory</label>
                  <Dropdown
                    options={subCategoryOptions}
                    defaultValue={subCategory}
                    onChange={(value) => setSubCategory(value)}
                    variant="default"
                  />
                </div>
                <div>
                  <label className="formLabel mb-2 block">Enter your budget in $</label>
                  <input
                    type="text"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="formInput"
                    placeholder="e.g $45"
                  />
                </div>
              </div>

              {/* Title and Time Frame */}
              <div className="grid grid-cols-2 gap-4 mb-12">
                <div>
                  <label className="formLabel mb-2 block">Title Request</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="formInput"
                    placeholder="Enter the title of the request"
                  />
                </div>
                <div>
                  <label className="formLabel mb-2 block">Time Frame</label>
                  <Dropdown
                    options={timeFrameOptions}
                    defaultValue={timeFrame}
                    onChange={(value) => setTimeFrame(value)}
                    variant="default"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="mb-10">
                <label className="formLabel mb-2 block">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="formTextarea w-full h-[100px] rounded-[20px] resize-none"
                  placeholder="Write the details of your requirement"
                />
              </div>
            </div>
          </div>

          {/* Submit Button - Positioned outside the container */}
          <div className="absolute my-[28px] right-0">
            <button className="btn btnMedium btnDark flex items-center gap-2">
              Post Request
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 2L2 14M14 2H6M14 2V10"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}