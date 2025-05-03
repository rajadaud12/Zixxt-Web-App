"use client"

import { useState } from "react"
import { Tabs } from "@/components/utils/tabs"
import { FileText, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function Orders() {
  const [orders] = useState([
    {
      id: 1,
      title: "I will design a custom logo for your brand with unique styles and modern design elements",
      orderNumber: "1023233",
      status: "Completed",
      seller: "kahmiri",
      country: "Pakistan",
      deliveryDate: "2/2/2025",
      price: "$195",
      daysToDeliver: "14 days",
      milestones: [
        { id: 1, title: "Colourless Models", status: "Completed", time: "3:40 PM" },
        { id: 2, title: "Colourless Models", status: "Completed", time: "3:40 PM" },
        { id: 3, title: "Colourless Models", status: "Delivered", time: "3:40 PM", accepted: true },
      ],
      activity: [
        { time: "Feb 17, 8:45 pm", message: "You Placed the Order", type: "user" },
        { time: "Feb 17, 8:45 pm", message: "Seller has delivered a milestone", type: "seller", milestone: 3 },
        { time: "Feb 17, 8:45 pm", message: "Buyer has accepted the milestone", type: "user", milestone: 3 },
        { time: "Feb 17, 9:45 pm", message: "The Milestone 3 has been started", type: "system" },
        { time: "Feb 17, 8:45 pm", message: "Milestone 2 has been completed", type: "system" },
        { time: "Feb 17, 8:45 pm", message: "Seller has delivered a milestone", type: "seller", milestone: 2 },
        { time: "Feb 17, 8:45 pm", message: "Buyer has accepted the milestone", type: "user", milestone: 2 },
        { time: "Feb 17, 8:45 pm", message: "The Milestone 2 has been started", type: "system" },
        { time: "Feb 17, 8:45 pm", message: "Buyer sent the requirements", type: "user" },
      ],
    },
    {
      id: 2,
      title: "I will design a custom logo for your brand with long text to test wrapping",
      orderNumber: "1023234",
      status: "Active (Past Due)",
      seller: "kahmiri",
      country: "Pakistan",
      deliveryDate: "1/2/2025",
      price: "$150",
      daysToDeliver: "10 days",
      milestones: [
        { id: 1, title: "Colourless Models", status: "Completed", time: "3:40 PM" },
        { id: 2, title: "Colourless Models", status: "Completed", time: "3:40 PM" },
        { id: 3, title: "Colourless Models", status: "Active", time: "3:40 PM" },
      ],
      activity: [
        { time: "Feb 17, 8:45 pm", message: "You Placed the Order", type: "user" },
        { time: "Feb 17, 8:45 pm", message: "Seller has delivered a milestone", type: "seller", milestone: 2 },
        { time: "Feb 17, 8:45 pm", message: "Buyer has accepted the milestone", type: "user", milestone: 2 },
        { time: "Feb 17, 8:45 pm", message: "Milestone 2 has been completed", type: "system" },
        { time: "Feb 17, 8:45 pm", message: "The Milestone 3 has been started", type: "system" },
        { time: "Feb 17, 8:45 pm", message: "Buyer sent the requirements", type: "user" },
      ],
    },
    {
      id: 3,
      title: "I will design a custom logo for your brand with very long text that should truncate after two lines",
      orderNumber: "1023235",
      status: "Active (Open Request)",
      seller: "kahmiri",
      country: "Pakistan",
      deliveryDate: "3/2/2025",
      price: "$200",
      daysToDeliver: "15 days",
      milestones: null,
      activity: [
        { time: "Feb 17, 8:45 pm", message: "You Placed the Order", type: "user" },
        { time: "Feb 17, 8:45 pm", message: "Buyer sent the requirements", type: "user" },
      ],
    },
    {
      id: 4,
      title: "I will design a custom logo for your brand",
      orderNumber: "1023236",
      status: "Disputed",
      seller: "kahmiri",
      country: "Pakistan",
      deliveryDate: "2/2/2025",
      price: "$180",
      daysToDeliver: "12 days",
      milestones: [
        { id: 1, title: "Colourless Models", status: "Delivered", time: "3:40 PM", accepted: false },
      ],
      activity: [
        { time: "Feb 17, 8:45 pm", message: "You Placed the Order", type: "user" },
        { time: "Feb 17, 8:45 pm", message: "Seller has delivered a milestone", type: "seller", milestone: 1 },
        { time: "Feb 17, 9:45 pm", message: "Buyer has asked for revision on milestone 1", type: "user", milestone: 1 },
      ],
    },
    {
      id: 5,
      title: "I will design a custom logo for your brand",
      orderNumber: "1023237",
      status: "Cancelled",
      seller: "kahmiri",
      country: "Pakistan",
      deliveryDate: "2/2/2025",
      price: "$160",
      daysToDeliver: "10 days",
      milestones: null,
      activity: [
        { time: "Feb 17, 8:45 pm", message: "You Placed the Order", type: "user" },
        { time: "Feb 17, 8:45 pm", message: "Order has been cancelled", type: "system" },
      ],
    },
  ])

  const tabs = [
    { id: "all", label: "All", statusFilter: null },
    { id: "activePastDue", label: "Active (Past Due)", statusFilter: "Active (Past Due)" },
    { id: "activeOpen", label: "Active (Open Request)", statusFilter: "Active (Open Request)" },
    { id: "disputed", label: "Disputed", statusFilter: "Disputed" },
    { id: "completed", label: "Completed", statusFilter: "Completed" },
    { id: "cancelled", label: "Cancelled", statusFilter: "Cancelled" },
  ]

  const [selectedTab, setSelectedTab] = useState("all")

  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed":
        return "bg-[#EDFAF4] text-success"
      case "Active (Past Due)":
        return "bg-[#FFF8E6] text-software"
      case "Active (Open Request)":
        return "bg-[#ECF6FE] text-primary"
      case "Disputed":
        return "bg-[#FFEEEE] text-failure"
      case "Cancelled":
        return "bg-[#F5F7F9] text-textLight"
      default:
        return "bg-[#FFEEEE] text-failure"
    }
  }

  const selectedTabObj = tabs.find((tab) => tab.id === selectedTab)
  const filteredOrders = orders.filter((order) => {
    if (selectedTab === "all") return true
    return order.status === selectedTabObj?.statusFilter
  })

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Header section */}
        <div className="text-center mb-10">
          <h1 className="typoH1 text-black mb-2">Orders</h1>
          <p className="typoB1 text-textLight">The orders history is given in the table below</p>
        </div>

        {/* Tabs */}
        <Tabs
          tabs={tabs}
          defaultTab="all"
          className="mb-6"
          onTabChange={(tabId) => setSelectedTab(tabId)}
        />

        {/* Orders table */}
        <div className="bg-white rounded-[20px] border border-border overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-12 px-6 py-5 border-b border-border typoB4 text-textLight">
            <div className="col-span-4">Title</div>
            <div className="col-span-2">Order #</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Seller</div>
            <div className="col-span-1">Delivery date</div>
            <div className="col-span-1"></div>
          </div>

          {/* Table content or empty message */}
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div key={order.id} className="grid grid-cols-12 px-6 py-6 border-b border-border items-center gap-x-4">
                <div className="col-span-4 flex items-center gap-6">
                  <div className="w-[106px] h-[60px] bg-gray-100 rounded-[20px] flex items-center justify-center flex-shrink-0">
                    <img src="/api/placeholder/106/60" alt="Thumbnail" className="w-[106px] h-[60px] object-cover" />
                  </div>
                  <span className="typoB3 text-text line-clamp-2" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{order.title}</span>
                </div>
                <div className="col-span-2 typoB3 text-text">{order.orderNumber}</div>
                <div className="col-span-2">
                  <span className={`px-4 py-2 rounded-full text-xs ${getStatusStyle(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                    <img src="/api/placeholder/24/24" alt={order.seller} className="w-6 h-6 object-cover" />
                  </div>
                  <span className="typoB3 text-text">{order.seller}</span>
                  <span className="typoC1 text-textLight">{order.country}</span>
                </div>
                <div className="col-span-1 typoB3 text-textLight">{order.deliveryDate}</div>
                <div className="col-span-1 flex justify-end gap-4">
                  <Link href={`/orderDetail/${order.id}`}>
                    <button className="p-1 rounded-full border border-primary w-8 h-8 flex items-center justify-center">
                      <FileText size={18} strokeWidth={1.5} className="text-textLight hover:text-primary transition-colors" />
                    </button>
                  </Link>
                  {order.status === "Active (Open Request)" && (
                    <button className="p-1 rounded-full border border-primary w-8 h-8 flex items-center justify-center relative">
                      <MessageSquare size={18} strokeWidth={1.5} className="text-textLight hover:text-primary transition-colors" />
                      <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
                    </button>
                  )}
                  {order.status !== "Active (Open Request)" && (
                    <button className="p-1 rounded-full border border-primary w-8 h-8 flex items-center justify-center">
                      <MessageSquare size={18} strokeWidth={1.5} className="text-textLight hover:text-primary transition-colors" />
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center text-textLight typoB1">
              <p>Nothing here yet. Check back later or explore other tabs!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}