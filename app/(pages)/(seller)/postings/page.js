"use client";

import { useState } from "react";
import { Edit, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import Tabs from "@/components/utils/tabs";

export default function Postings() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("services");

  const tabs = [
    { id: "services", label: "Services" },
    { id: "software", label: "Software" },
    { id: "education", label: "Education" },
  ];

  const [postings, setPostings] = useState([
    {
      id: 1,
      title: "I will design a custom logo for your brand",
      price: "$100",
      clicks: 10,
      impressions: 53,
      orders: 3,
      category: "services",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      title: "I will design a custom logo for your brand",
      price: "$100",
      clicks: 10,
      impressions: 53,
      orders: 3,
      category: "services",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 3,
      title: "I will create a mobile app for your business",
      price: "$100",
      clicks: 10,
      impressions: 53,
      orders: 3,
      category: "software",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 4,
      title: "I will teach you graphic design basics",
      price: "$100",
      clicks: 10,
      impressions: 53,
      orders: 3,
      category: "education",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 5,
      title: "I will design a custom logo for your brand",
      price: "$100",
      clicks: 10,
      impressions: 53,
      orders: 3,
      category: "services",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 6,
      title: "I will develop a web application",
      price: "$100",
      clicks: 10,
      impressions: 53,
      orders: 3,
      category: "software",
      image: "/placeholder.svg?height=80&width=80",
    },
  ]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleCreatePosting = () => {
    if (activeTab === "services") {
      router.push("/createService");
    } else if (activeTab === "software") {
      router.push("/createSoftware");
    } else if (activeTab === "education") {
      router.push("/createEducationalContent");
    }
  };

  const filteredPostings = postings.filter(
    (posting) => posting.category === activeTab
  );

  const showOrdersColumn = activeTab !== "software";

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="text-center mb-10">
          <h1 className="typoH1 text-black mb-2">Manage Postings</h1>
          <p className="typoB1 text-textLight">
            Create postings and start your sales journey!
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="w-full md:w-1/3">
            <Tabs
              tabs={tabs}
              defaultTab="services"
              onTabChange={handleTabChange}
            />
          </div>

          <button className="btn btnMedium btnPrimary" onClick={handleCreatePosting}>
            Create Posting
          </button>
        </div>

        <div className="bg-white rounded-[20px] border border-border overflow-hidden">
          <div className="grid grid-cols-12 px-6 py-5 border-b border-border typoB4 text-textLight">
            <div className="col-span-5">Title</div>
            <div className="col-span-2 text-center">Base Price</div>
            <div className="col-span-1 text-center">Clicks</div>
            <div className="col-span-2 text-center">Impressions</div>
            {showOrdersColumn && (
              <div className="col-span-1 text-center">Orders</div>
            )}
            <div
              className={`${
                showOrdersColumn ? "col-span-1" : "col-span-2"
              } text-right pr-8`}
            >
              Actions
            </div>
          </div>

          {filteredPostings.length > 0 ? (
            filteredPostings.map((posting) => (
              <div
                key={posting.id}
                className="grid grid-cols-12 px-6 py-5 border-b border-border items-center"
              >
                <div className="col-span-5 flex items-center gap-4">
                  <div className="w-20 h-12 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                    <img
                      src={posting.image || "/placeholder.svg"}
                      alt="Posting thumbnail"
                      className="w-20 h-12 object-cover"
                    />
                  </div>
                  <span className="typoB3 text-text">{posting.title}</span>
                </div>
                <div className="col-span-2 text-center typoB3 text-text font-medium">
                  {posting.price}
                </div>
                <div className="col-span-1 text-center typoB3 text-textLight">
                  {posting.clicks}
                </div>
                <div className="col-span-2 text-center typoB3 text-textLight">
                  {posting.impressions}
                </div>
                {showOrdersColumn && (
                  <div className="col-span-1 text-center typoB3 text-textLight">
                    {posting.orders}
                  </div>
                )}
                <div
                  className={`${
                    showOrdersColumn ? "col-span-1" : "col-span-2"
                  } flex justify-end items-center gap-2 pr-6`}
                >
                  <button className="p-1">
                    <Edit
                      size={18}
                      strokeWidth={1.5}
                      className="text-textLight hover:text-primary transition-colors"
                    />
                  </button>
                  <button className="p-1">
                    <Trash
                      size={18}
                      strokeWidth={1.5}
                      className="text-textLight hover:text-primary transition-colors"
                    />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center">
              <p className="typoB2 text-textLight">
                No postings found for this category.
              </p>
              <button
                className="mt-4 btn btnSmall btnDefault"
                onClick={handleCreatePosting}
              >
                Create your first posting
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
