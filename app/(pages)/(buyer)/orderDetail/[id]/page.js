"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Clock } from "lucide-react"

import { Tabs } from "@/components/utils/tabs"


export default function OrderDetail() {
  const orderID = 1
  const [activeTab, setActiveTab] = useState("activity")
  const [showNextMilestone, setShowNextMilestone] = useState(true)
  const [activityItems, setActivityItems] = useState([
    {
      id: "order-placed",
      time: "Feb 17, 8:45 pm",
      message: "You Placed the Order",
      type: "user-placed",
      expanded: false,
    },
    {
      id: "milestone3-revision",
      time: "Feb 17, 9:45 pm",
      message: "Buyer has asked for revision for milestone 3",
      type: "buyer",
      expanded: false,
    },
    {
      id: "milestone3-delivery",
      time: "Feb 17, 8:45 pm",
      message: "Seller has delivered a milestone",
      type: "seller",
      milestone: 3,
      content: "So I want a Logo design that just fits properly w/my brands voice it should depict it in a good way",
      attachments: 3,
      expanded: true,
      showActions: true,
    },
    {
      id: "milestone3-start",
      time: "Feb 17, 9:45 pm",
      message: "The Milestone 3 has been started",
      type: "started",
      expanded: false,
    },
    {
      id: "milestone2-complete",
      time: "Feb 17, 9:45 pm",
      message: "Milestone 2 has been completed",
      type: "completed",
      expanded: false,
    },
    {
      id: "milestone2-accept",
      time: "Feb 17, 8:45 pm",
      message: "Buyer has accepted the milestone",
      type: "buyer",
      expanded: false,
    },
    {
      id: "milestone2-delivery",
      time: "Feb 17, 8:45 pm",
      message: "Seller has delivered a milestone",
      type: "seller",
      milestone: 2,
      content: "So I want a Logo design that just fits properly w/my brands voice it should depict it in a good way",
      attachments: 3,
      expanded: false,
    },
    {
      id: "milestone2-start",
      time: "Feb 17, 9:45 pm",
      message: "The Milestone 2 has been started",
      type: "started",
      expanded: false,
    },
    {
      id: "requirements-sent",
      time: "Feb 17, 8:45 pm",
      message: "Buyer sent the requirements",
      type: "buyer",
      expanded: false,
    },
  ])

  const orders = {
    "1": {
      title: "I will create a custom logo",
      orderNumber: "1023233",
      status: "Active",
      seller: "kahmiri",
      country: "Pakistan",
      deliveryDate: "2/2/2025",
      price: "$195",
      daysToDeliver: "14 days",
      nextMilestone: {
        id: 3,
        title: "Coloured Models with text",
        price: "50",
      },
      milestones: [
        { id: 3, title: "Colourless Models", status: "Active", time: "3:40 PM" },
        { id: 2, title: "Colourless Models", status: "Completed", time: "3:40 PM" },
        { id: 1, title: "Colourless Models", status: "Completed", time: "3:40 PM" },
        { id: 4, title: "Colourless Models", status: "Later On", time: "3:40 PM" },
      ],
      timeToDeliver: {
        days: "04",
        hours: "22",
        minutes: "40",
      },
    },
  }

  const order = orderID && orders[orderID] ? orders[orderID] : null

  if (!orderID || !order) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8 pt-8 pb-12">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-semibold text-text mb-2">Order</h1>
            <p className="text-base text-textLight">
              {!orderID ? "No order ID provided." : `Order not found for ID: ${orderID}.`}
            </p>
          </div>
        </div>
      </div>
    )
  }

  const toggleExpand = (id) => {
    setActivityItems(activityItems.map((item) => (item.id === id ? { ...item, expanded: !item.expanded } : item)))
  }

  const acceptDelivery = () => {
    const newCompleteItem = {
      id: "milestone3-complete",
      time: "Feb 17, 9:45 pm",
      message: "Milestone 3 has been completed",
      type: "completed",
      expanded: false,
    }

    const newAcceptItem = {
      id: "milestone3-accept",
      time: "Feb 17, 8:45 pm",
      message: "Buyer has accepted the milestone",
      type: "buyer",
      milestone: 3,
      expanded: false,
    }

    // Add new next milestone item
    const newNextMilestoneItem = {
      id: "milestone4-start",
      time: "Feb 17, 9:45 pm",
      message: "The Milestone 4 has been started",
      type: "started",
      expanded: false,
    }

    const updatedItems = [
      activityItems[0], 
      newAcceptItem,
      newCompleteItem,
      ...activityItems.slice(1).map((item) => {
        if (item.id === "milestone3-delivery") {
          return { ...item, showActions: false }
        }
        return item
      }),
    ]

    setActivityItems(updatedItems)
    setShowNextMilestone(true)
  }

  const rejectDelivery = () => {
    const newRevisionItem = {
      id: "milestone3-revision-request",
      time: "Feb 17, 9:45 pm",
      message: "Buyer has asked for revision for milestone 3",
      type: "buyer",
      content: "I need the colors to be more vibrant and the font to be more modern.",
      expanded: true,
    }

    const updatedItems = [
      activityItems[0],
      newRevisionItem,
      ...activityItems.slice(1).map((item) => {
        if (item.id === "milestone3-delivery") {
          return { ...item, showActions: false }
        }
        return item
      }),
    ]

    setActivityItems(updatedItems)
  }

  const renderActivityTimeline = () => {
    return (
      <div className="relative">
        {/* Vertical line that runs through the entire timeline */}
        <div className="absolute left-5 top-6 bottom-0 w-px bg-border"></div>

        {/* First item - Order Placed */}
        <div className="relative mb-8">
          <div className="flex">
            {/* Left side - avatar */}
            <div className="flex-shrink-0 relative">
              <div className="absolute left-5 transform -translate-x-1/2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#E6F4FF] border-4 border-white">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="#007AFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Right side - content */}
            <div className="flex-grow pl-10">
              <div className="bg-[#E6F4FF] rounded-lg p-4">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-text mr-2">{activityItems[0].message}</span>
                  <span className="text-xs text-textLight">{activityItems[0].time}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next milestone prompt */}
        {showNextMilestone && (
          <div className="bg-[#F5FFF5] p-4 mb-8 ml-10 rounded-lg relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text mb-1">Start the order for next milestone</p>
                <p className="text-sm font-medium text-text">
                  Milestone 3: <span className="text-primary">Coloured Models with text</span> - $50
                </p>
              </div>
              <button className="inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none bg-primary text-white hover:bg-primary/90 px-6 py-2 text-sm">Start Order</button>
            </div>
          </div>
        )}

        {/* Date separator */}
        <div className="py-2 text-center relative mb-8">
          <div className="absolute left-0 right-0 top-1/2 h-px bg-border -z-0"></div>
          <span className="text-xs text-textLight bg-white px-4 relative z-10 rounded-full py-1">Yesterday</span>
        </div>

        {/* Subsequent items */}
        {activityItems.slice(1).map((item, index) => {
          const isLast = index === activityItems.slice(1).length - 1

          return (
            <div key={item.id} className="relative mb-12">
              <div className="flex">
                {/* Left side - avatar */}
                <div className="flex-shrink-0 relative">
                  <div className="absolute left-5 transform -translate-x-1/2">
                    {item.type === "completed" ? (
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#E6FFF6] border-4 border-white">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M20 6L9 17L4 12"
                            stroke="#00BA7C"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    ) : item.type === "started" ? (
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#E6FFF6] border-4 border-white">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M5 12H19M19 12L12 5M19 12L12 19"
                            stroke="#00BA7C"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    ) : item.type === "buyer" ? (
                      <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center border-4 border-white bg-[#E6F4FF]">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="8" r="4" stroke="#007AFF" strokeWidth="2" />
                          <path d="M18 20C18 16.6863 15.3137 14 12 14C8.68629 14 6 16.6863 6 20" stroke="#007AFF" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center border-4 border-white">
                        <img
                          src={`/api/placeholder/40/40`}
                          alt={item.type === "seller" ? "Seller" : "Buyer"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Right side - content */}
                <div className="flex-grow pl-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-text mr-2">{item.message}</span>
                      <span className="text-xs text-textLight">{item.time}</span>
                    </div>

                    {(item.content || item.type === "seller" || item.type === "buyer") && (
                      <button className="text-textLight" onClick={() => toggleExpand(item.id)}>
                        {item.expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    )}
                  </div>

                  {item.content && item.expanded && (
                    <div className="bg-white p-4 rounded-lg my-3 border border-border">
                      <p className="text-sm text-text">{item.content}</p>
                      {item.attachments && (
                        <div className="flex gap-2 mt-3">
                          {Array.from({ length: item.attachments }).map((_, idx) => (
                            <div key={idx} className="w-10 h-10 bg-gray-100 rounded-md"></div>
                          ))}
                        </div>
                      )}

                      {item.type === "seller" && item.showActions && (
                        <div className="flex gap-2 mt-4">
                          <button 
                            className="inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none min-w-[200px] text-success text-[12px] leading-[16px] px-6 py-2 border border-success"
                            onClick={acceptDelivery}
                          >
                            Accept Delivery
                          </button>
                          <button 
                            className="inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none min-w-[200px] text-failure border border-failure text-[12px] leading-[16px] px-6 py-2"
                            onClick={rejectDelivery}
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {!isLast && (
                <div className="border-t border-border my-4 ml-10"></div>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  const tabContent = {
    activity: renderActivityTimeline(),
    details: (
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4">Order Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-textLight">Order Number</p>
            <p className="text-sm text-text">{order.orderNumber}</p>
          </div>
          <div>
            <p className="text-xs text-textLight">Status</p>
            <p className="text-sm text-text">{order.status}</p>
          </div>
          <div>
            <p className="text-xs text-textLight">Seller</p>
            <p className="text-sm text-text">{order.seller}</p>
          </div>
          <div>
            <p className="text-xs text-textLight">Country</p>
            <p className="text-sm text-text">{order.country}</p>
          </div>
          <div>
            <p className="text-xs text-textLight">Delivery Date</p>
            <p className="text-sm text-text">{order.deliveryDate}</p>
          </div>
          <div>
            <p className="text-xs text-textLight">Price</p>
            <p className="text-sm text-text">{order.price}</p>
          </div>
        </div>
      </div>
    ),
  }

  return (
    <div className="min-h-screen bg-white relative">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-text mb-2">Order</h1>
          <p className="text-base text-textLight">The activity and details related to order are given below</p>
        </div>

        <Tabs
          tabs={[
            { id: "activity", label: "Activity", content: null },
            { id: "details", label: "Details", content: null },
          ]}
          defaultTab="activity"
          className="max-w-2xl mx-auto mb-8"
          onTabChange={setActiveTab}
        />

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left sidebar */}
          <div className="w-full md:w-1/3">
            <h2 className="text-lg font-semibold mb-4">Activated Order</h2>

            <div className="border border-success rounded-[20px] p-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="flex gap-1">
                  <div className="w-[30px] h-[30px] bg-software rounded-[5px] flex items-center justify-center overflow-hidden">
                    <span className="text-white text-xs">⭐</span>
                  </div>
                  <div className="w-[30px] h-[30px] bg-muted rounded-[5px] flex items-center justify-center overflow-hidden">
                    <span className="text-textLight text-xs">✓</span>
                  </div>
                  <div className="w-[30px] h-[30px] bg-black rounded-[5px] flex items-center justify-center overflow-hidden">
                    <span className="text-white text-xs">B</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-text">{order.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-primary font-medium">$ 195</span>
                    <div className="flex items-center gap-1 text-textLight">
                      <Clock size={14} />
                      <span className="text-xs">14 days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-border rounded-[20px] p-4 mb-6">
              <h3 className="text-base font-medium text-primary mb-4">Order Tracking</h3>
              <div className="border-t border-border mb-6"></div>

              <div className="space-y-6">
                {/* Order Status */}
                <div>
                  <h4 className="text-sm font-medium text-text mb-2">Order Status</h4>
                  <div className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-0.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M20 6L9 17L4 12"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <span className="text-sm font-medium text-text">Requirements Submitted</span>
                    </div>
                  </div>
                  <div className="flex items-start mt-4">
                    <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center mt-0.5"></div>
                    <div className="ml-3">
                      <span className="text-sm font-medium text-text">Order In Progress</span>
                    </div>
                  </div>
                </div>

                {/* Deliverables */}
                <div>
                  <h4 className="text-sm font-medium text-text mb-2">Deliverables</h4>
                  {order.milestones
                    .filter((m) => m.status !== "Later On")
                    .map((milestone) => (
                      <div key={milestone.id} className="mb-4 flex items-center">
                        <div className="w-10 h-10 bg-whiteGrey rounded-full flex items-center justify-center mr-3">
                          <span className="text-textLight">{milestone.id}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-text">{milestone.title}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-textLight">{milestone.time}</span>
                              {milestone.status === "Active" ? (
                                <span className="bg-levelGold text-white px-3 py-1 rounded-full text-xs">Pending</span>
                              ) : (
                                <span className="bg-whiteGrey text-textLight px-3 py-1 rounded-full text-xs">Completed</span>
                              )}
                              <ChevronDown size={18} className="text-textLight" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Later On */}
                <div>
                  <h4 className="text-sm font-medium text-text mb-2">Later On</h4>
                  {order.milestones
                    .filter((m) => m.status === "Later On")
                    .map((milestone) => (
                      <div key={milestone.id} className="mb-4 flex items-center">
                        <div className="w-10 h-10 bg-whiteGrey rounded-full flex items-center justify-center mr-3">
                          <span className="text-textLight">{milestone.id}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-text">{milestone.title}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-textLight">{milestone.time}</span>
                              <ChevronDown size={18} className="text-textLight" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="w-full md:w-2/3">
            <div className="flex justify-between items-center mb-6">
              <button className="inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none bg-white text-text border border-border hover:bg-gray-50 px-6 py-3 text-sm">
                Order Actions
              </button>

              <div className="bg-gray-50 rounded-[20px] p-3">
                <div className="flex items-center gap-4">
                  <span className="text-xs text-textLight">
                    Time
                    <br />
                    To Deliver
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col items-center">
                      <span className="text-base font-medium text-text">{order.timeToDeliver.days}</span>
                      <span className="text-xs text-textLight">days</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-base font-medium text-text">{order.timeToDeliver.hours}</span>
                      <span className="text-xs text-textLight">hours</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-base font-medium text-text">{order.timeToDeliver.minutes}</span>
                      <span className="text-xs text-textLight">minutes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-border rounded-[20px] p-6">
              {activeTab === "activity" ? tabContent.activity : tabContent.details}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-20 right-20 z-50">
        <button className="inline-flex items-center justify-center rounded-full font-medium transition-colors bg-primary text-white hover:bg-primary/90 px-4 py-2 text-sm gap-2">
          <img src={`/api/placeholder/24/24`} alt="Chat" className="w-6 h-6 rounded-full object-cover" />
          Chat Now
        </button>
      </div>
    </div>
  )
}