"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp, Clock, Calendar, CheckCircle } from "lucide-react"
import  Tabs  from "@/components/utils/tabs"

export default function OrderDetail() {
  const [orderID, setOrderID] = useState(1)
  const [activeTab, setActiveTab] = useState("activity")
  const [showNextMilestone, setShowNextMilestone] = useState(false)
  const [activityItems, setActivityItems] = useState([])
  const [expandedItems, setExpandedItems] = useState({})
  const [expandedMilestones, setExpandedMilestones] = useState({})
  const [revisionCount, setRevisionCount] = useState(1) // Track revision count for unique IDs
  const [toast, setToast] = useState({ show: false, message: "", type: "" })
  const [expandedMilestone, setExpandedMilestone] = useState(3) // Only milestone 3 is expanded by default

  // Milestone-based order data
  const [orders, setOrders] = useState({
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
        id: 2,
        title: "Refined Sketches",
        price: "50",
      },
      milestones: [
        {
          id: 1,
          title: "Initial Sketches",
          status: "Active",
          time: "3:40 PM",
          startDate: "Feb 17, 2025",
          deliveryDate: "Feb 20, 2025",
          showDetails: false, // Changed to false by default
        },
        {
          id: 2,
          title: "Refined Sketches",
          status: "Later On",
          time: "3:40 PM",
          startDate: "Feb 21, 2025",
          deliveryDate: "Feb 24, 2025",
          showDetails: false, // Changed to false by default
        },
        {
          id: 3,
          title: "Coloured Models with text",
          status: "Later On",
          time: "3:40 PM",
          startDate: "Feb 25, 2025",
          deliveryDate: "Feb 28, 2025",
          showDetails: false, // Changed to false by default
        },
        {
          id: 4,
          title: "Final Deliverables",
          status: "Later On",
          time: "3:40 PM",
          startDate: "Mar 1, 2025",
          deliveryDate: "Mar 4, 2025",
          showDetails: false, // Changed to false by default
        },
      ],
      timeToDeliver: {
        days: "04",
        hours: "22",
        minutes: "40",
      },
      orderCompleted: false, // Added to track order completion status
    },
  })

  // Single order data
  const [singleOrders, setSingleOrders] = useState({
    "2": {
      title: "I will design a professional website",
      orderNumber: "1023234",
      status: "Active",
      seller: "webdesigner",
      country: "India",
      price: "$350",
      daysToDeliver: "7 days",
      timeToDeliver: {
        days: "07",
        hours: "12",
        minutes: "30",
      },
      startDate: "Feb 17, 2025",
      deliveryDate: "Feb 24, 2025",
      orderCompleted: false, // Added to track order completion status
    },
  })

  // Initial milestone timeline items (oldest first, will be reversed for display)
  const initialMilestoneItems = [
    {
      id: "order-placed",
      time: "Feb 17, 8:45 pm",
      message: "You Placed the Order",
      type: "user-placed",
      expanded: false, // Changed to false by default
    },
    {
      id: "buyer-requirements",
      time: "Feb 17, 8:50 pm",
      message: "Buyer sent the requirements",
      type: "buyer",
      content:
        "I need a professional logo that represents my tech company. The logo should be modern, clean, and scalable.",
      expanded: false, // Changed to false by default
      questions: [
        { question: "What colors do you prefer?", answer: "Blue and white" },
        { question: "What style are you looking for?", answer: "Minimalist and modern" },
        {
          question: "Any specific symbols to include?",
          answer: "Something that represents technology and innovation",
        },
      ],
    },
    {
      id: "milestone1-start",
      time: "Feb 17, 9:00 pm",
      message: "The Milestone 1 has been started",
      type: "started",
      expanded: false, // Changed to false by default
      milestoneData: {
        startDate: "Feb 17, 2025",
        deliveryDate: "Feb 20, 2025",
      },
    },
    {
      id: "milestone1-delivery",
      time: "Feb 20, 3:45 pm",
      message: "Seller has delivered a milestone",
      type: "seller",
      milestone: 1,
      content: "Here are the initial sketches for your logo. Please let me know what you think!",
      attachments: 3,
      expanded: true, // This is the latest message, so it's expanded by default
      showActions: true,
      isLatest: true, // Mark as latest
    },
  ]

  // Initial single order timeline items
  const initialSingleOrderItems = [
    {
      id: "order-placed",
      time: "Feb 17, 8:45 pm",
      message: "You Placed the Order",
      type: "user-placed",
      expanded: false, // Changed to false by default
    },
    {
      id: "buyer-requirements",
      time: "Feb 17, 8:50 pm",
      message: "Buyer sent the requirements",
      type: "buyer",
      content: "I need a professional website for my business. It should be modern, responsive, and easy to navigate.",
      expanded: false, // Changed to false by default
      questions: [
        { question: "What colors do you prefer?", answer: "Blue and white" },
        { question: "How many pages do you need?", answer: "5 pages - Home, About, Services, Portfolio, Contact" },
        { question: "Any specific features?", answer: "Contact form, image gallery, and responsive design" },
      ],
    },
    {
      id: "order-started",
      time: "Feb 17, 9:00 pm",
      message: "The Order has been started",
      type: "started",
      expanded: false, // Changed to false by default
      orderData: {
        startDate: "Feb 17, 2025",
        deliveryDate: "Feb 24, 2025",
      },
    },
    {
      id: "order-delivery",
      time: "Feb 23, 5:15 pm",
      message: "Seller has delivered the order",
      type: "seller",
      content:
        "Here is your completed website as requested. I've included all the pages and features you asked for. Please review and let me know if you need any adjustments.",
      attachments: 5,
      expanded: true, // This is the latest message, so it's expanded by default
      showActions: true,
      isLatest: true, // Mark as latest
    },
  ]

  // Order data
  const orderData = {
    id: 1,
    title: "I will create a custom logo for your brand",
    seller: {
      name: "kahmiri",
      country: "pakistan",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "Active",
    package: {
      name: "Custom Package",
      features: ["1 Simple Logo Concept", "High-Resolution PNG & JPG", "For Startups, personal brands, small projects"],
      delivery: "3 DAYS DELIVERY",
      revisions: "2 REVISIONS",
    },
    additionalInfo: ["2days MAX Extension time", "5% discount after deadline"],
    pricing: {
      quotedAmount: "$100",
      serviceFee: "$5",
      tax: "$13",
      totalAmount: "$118",
      paidAmount: "$55",
    },
    dates: {
      orderPlaced: "Feb 12, 2025",
      finalDelivery: "Feb 21, 2025",
    },
    milestones: [
      {
        id: 1,
        title: "Colourless Models",
        status: "Completed",
        expanded: false,
      },
      {
        id: 2,
        title: "Colourless Models",
        status: "Completed",
        expanded: false,
      },
      {
        id: 3,
        title: "Colourless Models",
        status: "Active",
        expanded: true,
        price: "$50",
        revisions: "2",
        deliveryDate: "Feb 17 (12 days)",
        maxExtension: "4 days",
      },
    ],
  }

  // Show toast message
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type })

    // Auto-hide toast after 3 seconds
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" })
    }, 3000)
  }

  // Set initial activity items based on order type
  useEffect(() => {
    if (orderID === 1) {
      // For milestone orders, we display newest first
      setActivityItems([...initialMilestoneItems].reverse())

      // Initialize expanded state for all items
      const initialExpandedState = {}
      initialMilestoneItems.forEach((item) => {
        initialExpandedState[item.id] = item.expanded
      })
      setExpandedItems(initialExpandedState)

      // Initialize expanded state for milestones
      const initialMilestoneState = {}
      orders[1].milestones.forEach((milestone) => {
        initialMilestoneState[milestone.id] = milestone.showDetails
      })
      setExpandedMilestones(initialMilestoneState)
    } else {
      // For single orders, we display newest first
      setActivityItems([...initialSingleOrderItems].reverse())

      // Initialize expanded state for all items
      const initialExpandedState = {}
      initialSingleOrderItems.forEach((item) => {
        initialExpandedState[item.id] = item.expanded
      })
      setExpandedItems(initialExpandedState)
    }
  }, [orderID])

  const toggleExpand = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const toggleMilestoneDetails = (id) => {
    setExpandedMilestones((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const acceptDelivery = () => {
    if (orderID === 1) {
      // For milestone-based order
      const currentMilestone = orders[1].milestones.find((m) => m.status === "Active")

      if (currentMilestone) {
        // Update milestone status
        const updatedMilestones = orders[1].milestones.map((milestone) => {
          if (milestone.id === currentMilestone.id) {
            return { ...milestone, status: "Completed" }
          } else if (milestone.id === currentMilestone.id + 1) {
            return { ...milestone, status: "Active" }
          }
          return milestone
        })

        // Update orders state with new milestone statuses
        setOrders((prev) => ({
          ...prev,
          "1": {
            ...prev["1"],
            milestones: updatedMilestones,
          },
        }))

        // Add acceptance message
        const newAcceptItem = {
          id: `milestone${currentMilestone.id}-accept-${Date.now()}`, // Ensure unique ID
          time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
          message: "Buyer has accepted the milestone",
          type: "buyer",
          expanded: false,
          isLatest: false,
        }

        // Add completion message
        const newCompleteItem = {
          id: `milestone${currentMilestone.id}-complete-${Date.now()}`, // Ensure unique ID
          time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
          message: `Milestone ${currentMilestone.id} has been completed`,
          type: "completed",
          expanded: false,
          isLatest: false,
        }

        // Update ALL delivery items to hide action buttons and isLatest flag
        const updatedItems = activityItems.map((item) => {
          if (item.type === "seller") {
            return { ...item, showActions: false, isLatest: false }
          }
          return { ...item, isLatest: false }
        })

        // Add next milestone start message if not the last milestone
        if (currentMilestone.id < orders[1].milestones.length) {
          const nextMilestone = orders[1].milestones.find((m) => m.id === currentMilestone.id + 1)

          if (nextMilestone) {
            // Show next milestone prompt
            setOrders((prev) => ({
              ...prev,
              "1": {
                ...prev["1"],
                nextMilestone: {
                  id: nextMilestone.id,
                  title: nextMilestone.title,
                  price: "50",
                },
              },
            }))
            setShowNextMilestone(true)

            // Update activity items with new messages at the top
            setActivityItems([newCompleteItem, newAcceptItem, ...updatedItems])

            // Show toast message
            showToast(`Milestone ${currentMilestone.id} accepted successfully!`)
          }
        } else {
          // This was the last milestone
          const newOrderCompleteItem = {
            id: `order-complete-${Date.now()}`, // Ensure unique ID
            time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
            message: "Order has been completed",
            type: "completed",
            expanded: true,
            isLatest: true,
          }

          // Update activity items with new messages at the top
          setActivityItems([newOrderCompleteItem, newCompleteItem, newAcceptItem, ...updatedItems])
          setShowNextMilestone(false)

          // Update order status
          setOrders((prev) => ({
            ...prev,
            "1": {
              ...prev["1"],
              status: "Completed",
              orderCompleted: true,
            },
          }))

          // Show toast message
          showToast("Order completed successfully!")
        }
      }
    } else {
      // For single order
      const newAcceptItem = {
        id: `order-accept-${Date.now()}`, // Ensure unique ID
        time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
        message: "Buyer has accepted the order",
        type: "buyer",
        expanded: false,
        isLatest: false,
      }

      const newCompleteItem = {
        id: `order-complete-${Date.now()}`, // Ensure unique ID
        time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
        message: "Order has been completed",
        type: "completed",
        expanded: true,
        isLatest: true,
      }

      // Update ALL delivery items to hide action buttons and isLatest flag
      const updatedItems = activityItems.map((item) => {
        if (item.type === "seller") {
          return { ...item, showActions: false, isLatest: false }
        }
        return { ...item, isLatest: false }
      })

      // Update activity items with new messages at the top
      setActivityItems([newCompleteItem, newAcceptItem, ...updatedItems])

      // Update order status
      setSingleOrders((prev) => ({
        ...prev,
        "2": {
          ...prev["2"],
          status: "Completed",
          orderCompleted: true,
        },
      }))

      // Show toast message
      showToast("Order completed successfully!")
    }
  }

  const rejectDelivery = () => {
    if (orderID === 1) {
      // For milestone-based order
      const currentMilestone = orders[1].milestones.find((m) => m.status === "Active")

      if (currentMilestone) {
        // Update milestone status to show it's pending again
        const updatedMilestones = orders[1].milestones.map((milestone) => {
          if (milestone.id === currentMilestone.id) {
            return { ...milestone, status: "Active" } // Keep as active but will be shown as pending
          }
          return milestone
        })

        // Update orders state
        setOrders((prev) => ({
          ...prev,
          "1": {
            ...prev["1"],
            milestones: updatedMilestones,
          },
        }))

        // Increment revision count
        const newRevisionCount = revisionCount + 1
        setRevisionCount(newRevisionCount)

        const newRevisionItem = {
          id: `milestone${currentMilestone.id}-revision-request-${newRevisionCount}`, // Ensure unique ID with revision count
          time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
          message: `Buyer has asked for revision for milestone ${currentMilestone.id}`,
          type: "buyer",
          content: "I need some changes to the design. Could you make it more aligned with our brand guidelines?",
          expanded: false,
          isLatest: false,
        }

        const newRevisedDeliveryItem = {
          id: `milestone${currentMilestone.id}-delivery-revised-${newRevisionCount}`, // Ensure unique ID with revision count
          time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true }),
          message: "Seller has delivered a milestone",
          type: "seller",
          milestone: currentMilestone.id,
          content: `Here is the revised design for milestone ${currentMilestone.id}. I've made the requested changes.`,
          attachments: 3,
          expanded: true,
          showActions: true,
          isLatest: true,
        }

        // Create a new array with updated items - hide action buttons on ALL previous deliveries and reset isLatest flag
        const updatedItems = activityItems.map((item) => {
          // Check if this is a delivery item for the current milestone
          if (
            (item.type === "seller" && item.milestone === currentMilestone.id) ||
            item.id === `milestone${currentMilestone.id}-delivery` ||
            item.id.startsWith(`milestone${currentMilestone.id}-delivery-revised`)
          ) {
            return { ...item, showActions: false, isLatest: false }
          }
          return { ...item, isLatest: false }
        })

        // Update activity items with new messages at the top
        setActivityItems([newRevisedDeliveryItem, newRevisionItem, ...updatedItems])

        // Show toast message
        showToast("Revision requested successfully", "info")
      }
    } else {
      // For single order
      // Increment revision count
      const newRevisionCount = revisionCount + 1
      setRevisionCount(newRevisionCount)

      const newRevisionItem = {
        id: `order-revision-request-${newRevisionCount}`, // Ensure unique ID with revision count
        time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
        message: "Buyer has asked for revision",
        type: "buyer",
        content:
          "The website looks great overall, but I'd like a few changes. Could you make the font size larger on mobile devices and add a newsletter signup form to the footer?",
        expanded: false,
        isLatest: false,
      }

      const newRevisedDeliveryItem = {
        id: `order-delivery-revised-${newRevisionCount}`, // Ensure unique ID with revision count
        time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true }),
        message: "Seller has delivered the order",
        type: "seller",
        content:
          "I've made all the requested revisions. The font size is now larger on mobile devices and I've added a newsletter signup form to the footer of all pages.",
        attachments: 5,
        expanded: true,
        showActions: true,
        isLatest: true,
      }

      // Create a new array with updated items - hide action buttons on ALL previous deliveries and reset isLatest flag
      const updatedItems = activityItems.map((item) => {
        // Check if this is any delivery item (original or revised)
        if (item.type === "seller" || item.id === "order-delivery" || item.id.startsWith("order-delivery-revised")) {
          return { ...item, showActions: false, isLatest: false }
        }
        return { ...item, isLatest: false }
      })

      // Update activity items with new messages at the top
      setActivityItems([newRevisedDeliveryItem, newRevisionItem, ...updatedItems])

      // Show toast message
      showToast("Revision requested successfully", "info")
    }
  }

  const startNextMilestone = () => {
    const nextMilestoneId = orders[1].nextMilestone.id
    const nextMilestone = orders[1].milestones.find((m) => m.id === nextMilestoneId)

    if (nextMilestone) {
      // Update milestone status
      const updatedMilestones = orders[1].milestones.map((milestone) => {
        if (milestone.id === nextMilestoneId) {
          return { ...milestone, status: "Active" }
        }
        return milestone
      })

      // Update orders state
      setOrders((prev) => ({
        ...prev,
        "1": {
          ...prev["1"],
          milestones: updatedMilestones,
        },
      }))

      // Add milestone start message
      const newStartItem = {
        id: `milestone${nextMilestoneId}-start-${Date.now()}`, // Ensure unique ID
        time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
        message: `The Milestone ${nextMilestoneId} has been started`,
        type: "started",
        expanded: false,
        isLatest: false,
        milestoneData: {
          startDate: nextMilestone.startDate,
          deliveryDate: nextMilestone.deliveryDate,
        },
      }

      // Add delivery message immediately
      const newDeliveryItem = {
        id: `milestone${nextMilestoneId}-delivery-${Date.now()}`, // Ensure unique ID
        time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true }),
        message: "Seller has delivered a milestone",
        type: "seller",
        milestone: nextMilestoneId,
        content: `Here are the designs for milestone ${nextMilestoneId}. Please review and let me know what you think!`,
        attachments: 3,
        expanded: true,
        showActions: true,
        isLatest: true,
      }

      // Make sure all previous deliveries have action buttons hidden and reset isLatest flag
      const updatedItems = activityItems.map((item) => {
        if (item.type === "seller") {
          return { ...item, showActions: false, isLatest: false }
        }
        return { ...item, isLatest: false }
      })

      // Update activity items with new messages at the top
      setActivityItems([newDeliveryItem, newStartItem, ...updatedItems])
      setShowNextMilestone(false)

      // Show toast message
      showToast(`Milestone ${nextMilestoneId} started successfully`)
    }
  }

  const renderActivityTimeline = () => {
    return (
      <div className="relative">
        {/* Vertical line that runs through the entire timeline */}
        <div className="absolute left-5 top-6 bottom-0 w-px bg-border"></div>

        {/* Next milestone prompt - only for milestone orders */}
        {orderID === 1 && showNextMilestone && (
          <div className="bg-[#F5FFF5] p-4 mb-8 ml-10 rounded-[20px] relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text mb-1">Start the order for next milestone</p>
                <p className="text-sm font-medium text-text">
                  Milestone {orders[1].nextMilestone.id}:{" "}
                  <span className="text-primary">{orders[1].nextMilestone.title}</span> - $
                  {orders[1].nextMilestone.price}
                </p>
              </div>
              <button
                className="inline-flex items-center justify-center rounded-[20px] font-medium transition-colors focus:outline-none bg-primary text-white hover:bg-primary/90 px-6 py-2 text-sm"
                onClick={startNextMilestone}
              >
                Start Order
              </button>
            </div>
          </div>
        )}

        {/* Date separator */}
        <div className="py-2 text-center relative mb-8">
          <div className="absolute left-0 right-0 top-1/2 h-px bg-border -z-0"></div>
          <span className="text-xs text-textLight bg-white px-4 relative z-10 rounded-full py-1">Yesterday</span>
        </div>

        {/* Activity items - newest first */}
        {activityItems.map((item, index) => (
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
                        <path
                          d="M18 20C18 16.6863 15.3137 14 12 14C8.68629 14 6 16.6863 6 20"
                          stroke="#007AFF"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  ) : item.type === "user-placed" ? (
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
                  ) : (
                    <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center border-4 border-white">
                      <img
                        src={`/placeholder.svg?height=40&width=40`}
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
                    {item.isLatest && (
                      <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                        Latest
                      </span>
                    )}
                  </div>

                  {(item.content ||
                    item.type === "seller" ||
                    item.type === "buyer" ||
                    item.milestoneData ||
                    item.orderData) && (
                    <button className="text-textLight" onClick={() => toggleExpand(item.id)}>
                      {expandedItems[item.id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  )}
                </div>

                {/* Show milestone or order dates */}
                {expandedItems[item.id] && item.milestoneData && (
                  <div className="bg-white p-4 rounded-[20px] my-3 border border-border">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-primary" />
                        <div>
                          <p className="text-xs text-textLight">Start Date</p>
                          <p className="text-sm font-medium">{item.milestoneData.startDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-primary" />
                        <div>
                          <p className="text-xs text-textLight">Delivery Date</p>
                          <p className="text-sm font-medium">{item.milestoneData.deliveryDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Show order dates */}
                {expandedItems[item.id] && item.orderData && (
                  <div className="bg-white p-4 rounded-[20px] my-3 border border-border">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-primary" />
                        <div>
                          <p className="text-xs text-textLight">Start Date</p>
                          <p className="text-sm font-medium">{item.orderData.startDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-primary" />
                        <div>
                          <p className="text-xs text-textLight">Delivery Date</p>
                          <p className="text-sm font-medium">{item.orderData.deliveryDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Show requirements with predefined questions */}
                {expandedItems[item.id] && item.questions && (
                  <div className="bg-white p-4 rounded-[20px] my-3 border border-border">
                    <p className="text-sm text-text mb-3">{item.content}</p>
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium">Requirement Details:</h4>
                      {item.questions.map((q, idx) => (
                        <div key={idx} className="bg-whiteGrey p-3 rounded-[20px]">
                          <p className="text-xs text-textLight mb-1">{q.question}</p>
                          <p className="text-sm text-text">{q.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Show content and attachments */}
                {expandedItems[item.id] && item.content && !item.questions && (
                  <div className="bg-white p-4 rounded-[20px] my-3 border border-border">
                    <p className="text-sm text-text">{item.content}</p>
                    {item.attachments && (
                      <div className="flex gap-2 mt-3">
                        {Array.from({ length: item.attachments }).map((_, idx) => (
                          <div key={idx} className="w-10 h-10 bg-gray-100 rounded-md"></div>
                        ))}
                      </div>
                    )}

                    {/* Show actions for delivery items */}
                    {item.type === "seller" && item.showActions && (
                      <div className="flex gap-2 mt-4">
                        <button
                          className="inline-flex items-center justify-center rounded-[20px] font-medium transition-colors focus:outline-none min-w-[200px] text-success text-[12px] leading-[16px] px-6 py-2 border border-success"
                          onClick={acceptDelivery}
                        >
                          Accept Delivery
                        </button>
                        <button
                          className="inline-flex items-center justify-center rounded-[20px] font-medium transition-colors focus:outline-none min-w-[200px] text-failure border border-failure text-[12px] leading-[16px] px-6 py-2"
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

            {index < activityItems.length - 1 && <div className="border-t border-border my-4 ml-10"></div>}
          </div>
        ))}
      </div>
    )
  }

  const renderOrderDetails = () => {
    const order = orderID === 1 ? orders[1] : singleOrders[2]

    return (
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
          {orderID === 2 && (
            <>
              <div>
                <p className="text-xs text-textLight">Start Date</p>
                <p className="text-sm text-text">{order.startDate}</p>
              </div>
              <div>
                <p className="text-xs text-textLight">Delivery Date</p>
                <p className="text-sm text-text">{order.deliveryDate}</p>
              </div>
            </>
          )}
          {orderID === 1 && (
            <div>
              <p className="text-xs text-textLight">Delivery Date</p>
              <p className="text-sm text-text">{order.deliveryDate}</p>
            </div>
          )}
          <div>
            <p className="text-xs text-textLight">Price</p>
            <p className="text-sm text-text">{order.price}</p>
          </div>
          <div>
            <p className="text-xs text-textLight">Delivery Time</p>
            <p className="text-sm text-text">{order.daysToDeliver}</p>
          </div>
        </div>
      </div>
    )
  }

  const tabContent = {
    activity: renderActivityTimeline(),
    details: renderOrderDetails(),
  }

  const order = orderID === 1 ? orders[1] : singleOrders[2]

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
  }

  const toggleMilestone = (id) => {
    setExpandedMilestone(expandedMilestone === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-white relative">
      {/* Toast notification */}
      {toast.show && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
            toast.type === "success"
              ? "bg-green-100 text-green-800"
              : toast.type === "error"
                ? "bg-red-100 text-red-800"
                : "bg-blue-100 text-blue-800"
          }`}
        >
          <div className="flex items-center">
            {toast.type === "success" && <CheckCircle className="w-5 h-5 mr-2" />}
            {toast.type === "error" && (
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            )}
            {toast.type === "info" && (
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-text mb-2">Order</h1>
          <p className="text-base text-textLight">The activity and details related to order are given below</p>
        </div>

        <Tabs
          tabs={[
            { id: "activity", label: "Activity" },
            { id: "details", label: "Details" },
          ]}
          defaultTab="activity"
          className="max-w-2xl mx-auto mb-8"
          onTabChange={handleTabChange}
        />

        {activeTab === "activity" && (
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left sidebar */}
            <div className="w-full md:w-1/3">
              <h2 className="text-lg font-semibold mb-4">Activated Order</h2>

              <div className="border border-success rounded-[20px] p-4 mb-6">
                <div className="flex items-center gap-4">
                  <img
                    src="/placeholder.svg?height=90&width=90"
                    alt="Logo thumbnail"
                    className="w-[90px] h-[90px] rounded-[10px] object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-text">{order.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-primary font-medium">{order.price}</span>
                      <div className="flex items-center gap-1 text-textLight">
                        <Clock size={14} />
                        <span className="text-xs">{order.daysToDeliver}</span>
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
                      <div
                        className={`w-6 h-6 rounded-full ${order.orderCompleted ? "bg-primary" : "border-2 border-primary"} flex items-center justify-center mt-0.5`}
                      >
                        {order.orderCompleted && (
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M20 6L9 17L4 12"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                      <div className="ml-3">
                        <span className="text-sm font-medium text-text">Order In Progress</span>
                      </div>
                    </div>
                    {order.orderCompleted && (
                      <div className="flex items-start mt-4">
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-0.5">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
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
                          <span className="text-sm font-medium text-text">Order Completed</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Deliverables - Only show for milestone orders */}
                  {orderID === 1 && (
                    <div>
                      <h4 className="text-sm font-medium text-text mb-2">Deliverables</h4>
                      {orders[1].milestones
                        .filter((m) => m.status !== "Later On")
                        .map((milestone) => (
                          <div key={milestone.id} className="mb-4">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-whiteGrey rounded-full flex items-center justify-center mr-3">
                                <span className="text-textLight">{milestone.id}</span>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium text-text">{milestone.title}</span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-textLight">{milestone.time}</span>
                                    {milestone.status === "Active" ? (
                                      <span className="bg-levelGold text-white px-3 py-1 rounded-full text-xs">
                                        Pending
                                      </span>
                                    ) : (
                                      <span className="bg-whiteGrey text-textLight px-3 py-1 rounded-full text-xs">
                                        Completed
                                      </span>
                                    )}
                                    <button onClick={() => toggleMilestoneDetails(milestone.id)}>
                                      {expandedMilestones[milestone.id] ? (
                                        <ChevronUp size={18} className="text-textLight" />
                                      ) : (
                                        <ChevronDown size={18} className="text-textLight" />
                                      )}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Milestone details dropdown */}
                            {expandedMilestones[milestone.id] && (
                              <div className="ml-14 mt-3 bg-whiteGrey p-3 rounded-[20px]">
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center gap-2">
                                    <Calendar size={16} className="text-primary" />
                                    <div>
                                      <p className="text-xs text-textLight">Start Date</p>
                                      <p className="text-sm font-medium">{milestone.startDate}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Calendar size={16} className="text-primary" />
                                    <div>
                                      <p className="text-xs text-textLight">Delivery Date</p>
                                      <p className="text-sm font-medium">{milestone.deliveryDate}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  )}

                  {/* Later On - Only show for milestone orders */}
                  {orderID === 1 && (
                    <div>
                      <h4 className="text-sm font-medium text-text mb-2">Later On</h4>
                      {orders[1].milestones
                        .filter((m) => m.status === "Later On")
                        .map((milestone) => (
                          <div key={milestone.id} className="mb-4">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-whiteGrey rounded-full flex items-center justify-center mr-3">
                                <span className="text-textLight">{milestone.id}</span>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium text-text">{milestone.title}</span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-textLight">{milestone.time}</span>
                                    <button onClick={() => toggleMilestoneDetails(milestone.id)}>
                                      {expandedMilestones[milestone.id] ? (
                                        <ChevronUp size={18} className="text-textLight" />
                                      ) : (
                                        <ChevronDown size={18} className="text-textLight" />
                                      )}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Milestone details dropdown */}
                            {expandedMilestones[milestone.id] && (
                              <div className="ml-14 mt-3 bg-whiteGrey p-3 rounded-[20px]">
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center gap-2">
                                    <Calendar size={16} className="text-primary" />
                                    <div>
                                      <p className="text-xs text-textLight">Start Date</p>
                                      <p className="text-sm font-medium">{milestone.startDate}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Calendar size={16} className="text-primary" />
                                    <div>
                                      <p className="text-xs text-textLight">Delivery Date</p>
                                      <p className="text-sm font-medium">{milestone.deliveryDate}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  )}

                  {/* Single Order Details */}
                  {orderID === 2 && (
                    <div>
                      <h4 className="text-sm font-medium text-text mb-2">Order Details</h4>
                      <div className="bg-whiteGrey p-4 rounded-[20px]">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-primary" />
                            <div>
                              <p className="text-xs text-textLight">Start Date</p>
                              <p className="text-sm font-medium">{order.startDate}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-primary" />
                            <div>
                              <p className="text-xs text-textLight">Delivery Date</p>
                              <p className="text-sm font-medium">{order.deliveryDate}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle size={16} className="text-success" />
                          <span className="text-sm text-text">Single Delivery</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Main content area */}
            <div className="w-full md:w-2/3">
              <div className="flex justify-between items-center mb-6">
                <button className="inline-flex items-center justify-center rounded-[20px] font-medium transition-colors focus:outline-none bg-white text-text border border-border hover:bg-gray-50 px-6 py-3 text-sm">
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

              <div className="bg-white border border-border rounded-[20px] p-6">{renderActivityTimeline()}</div>
            </div>
          </div>
        )}

        {activeTab === "details" && (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left column */}
            <div className="w-full lg:w-2/3">
              <div className="bg-white border border-border rounded-[20px] p-6 mb-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="grid grid-cols-3 gap-1 w-[108px]">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-[34px] h-[34px] bg-gray-100 rounded-md"></div>
                      ))}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                      <img
                        src={orderData.seller.avatar || "/placeholder.svg"}
                        alt={orderData.seller.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="font-medium">{orderData.seller.name}</span>
                      <span className="text-xs text-textLight">{orderData.seller.country}</span>
                      <span className="ml-auto bg-secondary text-primary text-xs px-3 py-1 rounded-full">
                        {orderData.status}
                      </span>
                    </div>
                    <h2 className="text-lg font-medium mb-6">{orderData.title}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="font-medium mb-4">Custom Package</h3>
                        <ul className="space-y-2">
                          {orderData.package.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <CheckCircle className="text-primary w-4 h-4" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="flex gap-4 mt-4">
                          <div className="flex items-center gap-1 bg-whiteGrey px-3 py-1 rounded-full">
                            <Clock className="w-4 h-4 text-textLight" />
                            <span className="text-xs">{orderData.package.delivery}</span>
                          </div>
                          <div className="flex items-center gap-1 bg-whiteGrey px-3 py-1 rounded-full">
                            <span className="text-xs">{orderData.package.revisions}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-4">Additional Info</h3>
                        <ul className="space-y-2">
                          {orderData.additionalInfo.map((info, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-primary rounded-full"></div>
                              <span className="text-sm">{info}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-border rounded-[20px] p-6">
                <h3 className="font-medium mb-6">Milestones</h3>
                <div className="space-y-4">
                  {orderData.milestones.map((milestone) => (
                    <div key={milestone.id} className="border-b border-border pb-4 last:border-0">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${milestone.status === "Completed" ? "bg-whiteGrey text-textLight" : "bg-black"}`}
                        >
                          {milestone.id}
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{milestone.title}</span>
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-xs px-3 py-1 rounded-full ${milestone.status === "Completed" ? "bg-whiteGrey text-textLight" : "bg-secondary text-primary"}`}
                              >
                                {milestone.status}
                              </span>
                              {milestone.id === 3 && (
                                <button onClick={() => toggleMilestone(milestone.id)}>
                                  {expandedMilestone === milestone.id ? (
                                    <ChevronUp className="w-4 h-4 text-textLight" />
                                  ) : (
                                    <ChevronDown className="w-4 h-4 text-textLight" />
                                  )}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {expandedMilestone === milestone.id && (
                        <div className="mt-4 pl-11 grid grid-cols-2 gap-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-textLight">Price</span>
                            <span className="text-sm font-medium">{milestone.price}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-textLight">Revisions</span>
                            <span className="text-sm font-medium">{milestone.revisions}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-textLight">Delivery Date</span>
                            <span className="text-sm font-medium">{milestone.deliveryDate}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-textLight">Max extension</span>
                            <span className="text-sm font-medium">{milestone.maxExtension}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="w-full lg:w-1/3">
              <div className="bg-white border border-border rounded-[20px] p-6">
                <h3 className="font-medium mb-6">Pricing and Date</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-textLight">Quoted Amount</span>
                    <span className="text-sm font-medium">{orderData.pricing.quotedAmount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-textLight">Service Fee (5%)</span>
                    <span className="text-sm font-medium">{orderData.pricing.serviceFee}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-textLight">Tax (10%)</span>
                    <span className="text-sm font-medium">{orderData.pricing.tax}</span>
                  </div>
                  <div className="border-t border-border pt-4 flex items-center justify-between">
                    <span className="text-sm font-medium">Total Amount</span>
                    <span className="text-lg font-semibold">{orderData.pricing.totalAmount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-textLight">Paid Amount</span>
                    <span className="text-sm font-medium">{orderData.pricing.paidAmount}</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-textLight">Order Placed on</span>
                    <span className="text-sm font-medium">{orderData.dates.orderPlaced}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-textLight">Final Delivery Date</span>
                    <span className="text-sm font-medium">{orderData.dates.finalDelivery}</span>
                  </div>
                </div>

                <div className="mt-6 text-xs text-failure">
                  Note : Paid Amount will be updated after each milestone is paid
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-20 right-20 z-50">
        <button className="inline-flex items-center justify-center rounded-[20px] font-medium transition-colors bg-primary text-white hover:bg-primary/90 px-4 py-2 text-sm gap-2">
          <img src={`/placeholder.svg?height=24&width=24`} alt="Chat" className="w-6 h-6 rounded-full object-cover" />
          Chat Now
        </button>
      </div>
    </div>
  )
}
