"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check } from "lucide-react"

// Import the Tabs component
const Tabs = ({ tabs, defaultTab, className = "", onTabChange }) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id);
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (onTabChange) {
      onTabChange(tabId);
    }
  };
  return (
    <div className={className}>
      <div className="flex rounded-full border border-border p-1 w-full">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`flex-1 px-4 py-3 text-sm font-medium rounded-full transition-all ${
              activeTab === tab.id ? "bg-btnbg text-text" : "bg-transparent text-textLight hover:text-text"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default function UpgradeAccount() {
  const router = useRouter()
  const [selectedPeriod, setSelectedPeriod] = useState("12months")

  const periodTabs = [
    { id: "3months", label: "3 months" },
    { id: "6months", label: "6 months" },
    { id: "12months", label: "12 months" }
  ]

  const handlePeriodChange = (periodId) => {
    setSelectedPeriod(periodId)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Header section */}
        <div className="text-center mb-8">
          <h1 className="typoH1 text-black mb-2">Upgrade To Premium</h1>
          <p className="typoB1 text-textLight">Get numerous benefits with the subscription features listed below.</p>
        </div>

        {/* Pricing periods */}
        <div className="max-w-md mx-auto mb-12 relative">
          <Tabs 
            tabs={periodTabs} 
            defaultTab="12months" 
            onTabChange={handlePeriodChange} 
          />
          
          {/* Save tags */}
          {selectedPeriod === "6months" && (
            <div className="absolute right-1/3 top-0 transform -translate-y-1/2">
              <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                Save 15%
              </span>
            </div>
          )}
          
          {selectedPeriod === "12months" && (
            <div className="absolute right-6 top-0 transform -translate-y-1/2">
              <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                Save 30%
              </span>
            </div>
          )}
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Tier */}
          <div className="rounded-[20px] border border-border p-8">
            <h2 className="typoH2 mb-4">Free Tier</h2>
            
            <div className="inline-block mb-6">
              <span className="py-1 px-4 rounded-full bg-gray-100 text-sm font-medium">Currently Using</span>
            </div>
            
            <p className="text-textLight mb-6">
              List services, connect with buyers, and access basic features with standard fees.
            </p>
            
            <div className="mb-6">
              <h3 className="typoB4 text-textLight mb-2">Features</h3>
              <p className="typoB3 text-textLight mb-4">Everything in the plan includes</p>
            </div>
            
            {/* Feature list */}
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mr-3">
                  <Check size={14} color="white" />
                </div>
                <span className="typoB3">List services and educational content.</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mr-3">
                  <Check size={14} color="white" />
                </div>
                <span className="typoB3">Secure payments and order management.</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mr-3">
                  <Check size={14} color="white" />
                </div>
                <span className="typoB3">Manage listings and transactions.</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                </div>
                <span className="typoB3 text-textLight line-through">Access to Trade Leads</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                </div>
                <span className="typoB3 text-textLight line-through">Lower Transaction Fees for Services</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                </div>
                <span className="typoB3 text-textLight line-through">Lower Fees for Educational Content</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                </div>
                <span className="typoB3 text-textLight line-through">Higher Visibility across the platform</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                </div>
                <span className="typoB3 text-textLight line-through">Less Deduction from Tip Fees</span>
              </div>
            </div>
          </div>

          {/* Premium Tier */}
          <div className="rounded-[20px] border border-primary p-8 relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="bg-gradient-to-r from-primary via-software to-course bg-clip-text text-transparent typoH2">Premium</h2>
              <div className="rounded-full bg-secondary text-primary text-xs px-3 py-1 font-medium">
                popular
              </div>
            </div>
            
            <p className="text-textLight mb-6">
              List services, connect with buyers, and access basic features with standard fees.
            </p>
            
            <div className="mb-6">
              <span className="typoH1 text-primary">$09</span>
              <span className="typoB3 text-textLight">/Month (billed annually)</span>
            </div>
            
            <button 
              className="btn btnMedium btnPrimary w-full mb-6"
              onClick={() => router.push("/checkout")}
            >
              Upgrade Now
            </button>
            
            <div className="mb-6">
              <h3 className="typoB4 text-textLight mb-2">Features</h3>
              <p className="typoB3 text-textLight mb-4">Everything in the plan includes</p>
            </div>
            
            {/* Feature list */}
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mr-3">
                  <Check size={14} color="white" />
                </div>
                <span className="typoB3">List services and educational content.</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mr-3">
                  <Check size={14} color="white" />
                </div>
                <span className="typoB3">Secure payments and order management.</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mr-3">
                  <Check size={14} color="white" />
                </div>
                <span className="typoB3">Manage listings and transactions.</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mr-3">
                  <Check size={14} color="white" />
                </div>
                <span className="typoB3">Access to Trade Leads</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mr-3">
                  <Check size={14} color="white" />
                </div>
                <span className="typoB3">Lower Transaction Fees for Services</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mr-3">
                  <Check size={14} color="white" />
                </div>
                <span className="typoB3">Lower Fees for Educational Content</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mr-3">
                  <Check size={14} color="white" />
                </div>
                <span className="typoB3">Higher Visibility across the platform</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mr-3">
                  <Check size={14} color="white" />
                </div>
                <span className="typoB3">Less Deduction from Tip Fees</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}