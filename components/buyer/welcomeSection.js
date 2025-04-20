"use client"

import Link from "next/link"
import { useContext } from "react"
import { AuthContext } from "@/context/authContext"

export default function WelcomeSection() {
  const { user } = useContext(AuthContext)

  return (
    <div className="bg-gradient-to-r from-[#f0f7ff] to-[#f9fcff] py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-4">
          <div className="h-1 w-1 rounded-full bg-primary mr-2"></div>
          <span className="text-primary text-sm font-medium">Welcome back to Zixxt</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">
              Hi,
              <br />
              {user?.name || "User"}
            </h1>
            <p className="text-textLight">Ready to explore the best and most diverse range of Listings</p>
            <Link
              href="/explore"
              className="flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90 font-semibold px-6 py-3 w-[160px]"
            >
              Explore Now
            </Link>
            <div className="mt-2">
              <button className="flex items-center text-textLight hover:text-primary">
                <span>Services</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 ml-1"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full mb-4">
                <span className="text-primary font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2">Have Something Specific In Mind</h3>
              <p className="text-textLight text-sm mb-4">
                Post a Request and check solutions offers from top-rated talents
              </p>
              <Link
                href="/post-request"
                className="flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90 font-semibold px-4 py-2 text-sm"
              >
                Post a Request
              </Link>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full mb-4">
                <span className="text-primary font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2">To Do's</h3>
              <p className="text-textLight text-sm mb-4">
                Post a Request and check solutions offers from top-rated talents
              </p>
              <div className="space-y-2">
                <Link href="/post-request" className="text-primary text-sm flex items-center">
                  <span className="mr-1">+</span> Post a Request
                </Link>
                <Link href="/complete-profile" className="text-textLight text-sm block">
                  Complete Profile
                </Link>
                <Link href="/view-post" className="text-textLight text-sm block">
                  View a Post
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
