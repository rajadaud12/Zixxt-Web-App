"use client"

import { useState } from "react"

export function Tabs({ tabs, defaultTab, className = "", onTabChange }) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id)

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    if (onTabChange) {
      onTabChange(tabId)
    }
  }

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
      <div className="mt-4">{tabs.find((tab) => tab.id === activeTab)?.content}</div>
    </div>
  )
}