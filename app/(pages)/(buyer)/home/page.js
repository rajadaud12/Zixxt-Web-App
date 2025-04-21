// app/dashboard/page.js
"use client"

import { useContext, useEffect } from "react"
import { AuthContext } from "@/context/authContext"
import { useRouter } from "next/navigation"
import BuyerLayout from "@/layout/buyer/buyerLayout"
import WelcomeSection from "@/components/buyer/welcomeSection"
import SectionHeader from "@/components/buyer/sectionHeader"
import ServiceCard from "@/components/buyer/serviceCard"
import CourseCard from "@/components/buyer/courseCard"
import SoftwareCard from "@/components/buyer/softwareCard"
import ContactForm from "@/components/buyer/contactForm"

// Sample data
const services = [
  {
    id: 1,
    title: "AI and Machine Learning Using Python Programming Language",
    sellerName: "talentX1",
    sellerAvatar: "/placeholder.svg?height=24&width=24",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.9,
    reviewCount: 175,
    price: "$45",
  },
  {
    id: 2,
    title: "Web Development Learning Using Python Programming Language",
    sellerName: "talentX1",
    sellerAvatar: "/placeholder.svg?height=24&width=24",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.8,
    reviewCount: 145,
    price: "$45",
  },
  {
    id: 3,
    title: "Data Science Learning Using Python Programming Language",
    sellerName: "talentX1",
    sellerAvatar: "/placeholder.svg?height=24&width=24",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.7,
    reviewCount: 125,
    price: "$45",
  },
  {
    id: 4,
    title: "Mobile App Development Using Python Programming Language",
    sellerName: "talentX1",
    sellerAvatar: "/placeholder.svg?height=24&width=24",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.9,
    reviewCount: 175,
    price: "$45",
  },
]

const courses = [
  {
    id: 1,
    title: "Learn AI and Machine Learning Using Python in 30 days",
    instructorName: "talentX1",
    instructorAvatar: "/placeholder.svg?height=24&width=24",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.9,
    reviewCount: 175,
    price: "$45",
    duration:'30 min'
  },
  {
    id: 2,
    title: "Learn Web Development Using Python in 30 days",
    instructorName: "talentX1",
    instructorAvatar: "/placeholder.svg?height=24&width=24",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.8,
    reviewCount: 145,
    price: "$45",
    duration:'30 min'

  },
  {
    id: 3,
    title: "Learn Data Science Using Python in 30 days",
    instructorName: "talentX1",
    instructorAvatar: "/placeholder.svg?height=24&width=24",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.7,
    reviewCount: 125,
    price: "$45",
    duration:'30 min'

  },
  {
    id: 4,
    title: "Learn Mobile App Development Using Python in 30 days",
    instructorName: "talentX1",
    instructorAvatar: "/placeholder.svg?height=24&width=24",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.9,
    reviewCount: 175,
    price: "$45",
    duration:'30 min'

  },
]

const software = [
  {
    id: 1,
    title: "Quality CRM System With Admin Functionalities",
    provider: "XD Solutions",
    logo: "/placeholder.svg?height=60&width=60",
    rating: 4.9,
    reviewCount: 175,
    price: "123.00",
    description:
      "A Powerful And Efficient CRM System Designed To Manage Customer Relationships, Track Sales, And Streamline Business Operations With Robust Admin Controls, Detailed Reporting, And More.",
    features: [
      "Lead & Contact Management",
      "Sales Pipeline Tracking",
      "Task & Activity Management",
      "Reports & Analytics",
      "Lead & Contact Management",
      "Lead & Contact Management",
    ],
  },
  {
    id: 2,
    title: "Quality CRM System (Mini)",
    provider: "XD Solutions",
    logo: "/placeholder.svg?height=60&width=60",
    rating: 4.8,
    reviewCount: 145,
    price: "79.00",
    description:
      "A Powerful And Efficient CRM System Designed To Streamline Business Operations With Robust Admin Controls.",
    features: [
      "Lead & Contact Management",
      "Sales Pipeline Tracking",
      "Task & Activity Management",
      "Reports & Analytics",
      "Lead & Contact Management",
      "Lead & Contact Management",
    ],
  },
]

export default function Dashboard() {
  const { isLoggedIn, loading, logout } = useContext(AuthContext)
  const router = useRouter()

  // Redirect unauthenticated users to login page
  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push('/signin')
    }
  }, [isLoggedIn, loading, router])

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!isLoggedIn) {
    return null // Don't render anything while redirecting
  }

  return (
    <BuyerLayout>
      <WelcomeSection />

      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Services"
            description="Expert solutions for your business growth"
            viewAllLink="/services"
            showControls={true}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </div>

      <div className="py-12 bg-whiteGrey">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Courses"
            description="Learn top skills from industry experts"
            viewAllLink="/courses"
            showControls={true}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </div>

      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Software"
            description="Explore smart software for seamless performance"
            viewAllLink="/software"
            showControls={true}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {software.map((item) => (
              <SoftwareCard key={item.id} software={item} />
            ))}
          </div>
        </div>
      </div>

      <ContactForm />
    </BuyerLayout>
  )
}