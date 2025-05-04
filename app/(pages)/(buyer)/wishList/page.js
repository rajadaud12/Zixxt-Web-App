"use client";

import { useState } from "react";
import { useWishlist } from "../../../../context/wishListContext";
import CourseCard from "../../../../components/buyer/courseCard";
import ServiceCard from "../../../../components/buyer/serviceCard";
import SoftwareCard from "../../../../components/buyer/softwareCard";
import Tabs from "../../../../components/utils/tabs";

export default function WishList() {
  const { wishlist } = useWishlist();
  const [activeTab, setActiveTab] = useState("services");

  const tabs = [
    { id: "services", label: "Services" },
    { id: "software", label: "Software" },
    { id: "courses", label: "Courses" },
  ];

  return (
    <div className="max-w-[1440px] mx-auto mt-[50px] mb-[100px] px-6 md:px-[100px]">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Wish List</h1>
        <p className="text-gray-600">Have your favorite items here!</p>
      </div>

      <div className="max-w-[480px] mx-auto mb-10">
        <Tabs tabs={tabs} defaultTab="services" className="w-full" onTabChange={setActiveTab} />
      </div>

      {activeTab === "services" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-[14px] gap-y-[70px] mt-10">
          {wishlist.services.length > 0 ? (
            wishlist.services.map((item) => <ServiceCard key={item.id} service={item} />)
          ) : (
            <p className="text-gray-500 text-center col-span-4">No services in your wishlist.</p>
          )}
        </div>
      )}

      {activeTab === "software" && (
        <div className="flex flex-col items-center gap-6 mt-10">
          {wishlist.software.length > 0 ? (
            wishlist.software.map((item) => <SoftwareCard key={item.id} software={item} />)
          ) : (
            <p className="text-gray-500 text-center">No software in your wishlist.</p>
          )}
        </div>
      )}

      {activeTab === "courses" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-[14px] gap-y-[70px] mt-10">
          {wishlist.courses.length > 0 ? (
            wishlist.courses.map((item) => <CourseCard key={item.id} course={item} />)
          ) : (
            <p className="text-gray-500 text-center col-span-4">No courses in your wishlist.</p>
          )}
        </div>
      )}
    </div>
  );
}