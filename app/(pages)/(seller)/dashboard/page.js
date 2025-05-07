"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { DollarSign, FileText, ShoppingBag } from "lucide-react"
import "@/styles/utils.css"
import { Dropdown } from "@/components/utils/dropdown"

export default function Dashboard() {
  const [category, setCategory] = useState("Services")
  const postings = [
    { title: "I will design a custom logo for your brand", price: "$100", clicks: 10, impressions: 53, orders: 3, category: "Services" },
    { title: "I will design a custom logo for your brand", price: "$100", clicks: 10, impressions: 53, orders: 3, category: "Services" },
    { title: "I will create a mobile app for your business", price: "$200", clicks: 15, impressions: 60, orders: 2, category: "Software" },
    { title: "I will teach you graphic design basics", price: "$150", clicks: 12, impressions: 45, orders: 1, category: "Education" },
    { title: "I will design a custom logo for your brand", price: "$100", clicks: 10, impressions: 53, orders: 3, category: "Services" },
    { title: "I will develop a web application", price: "$250", clicks: 20, impressions: 70, orders: 4, category: "Software" },
  ]
  const filteredPostings = postings.filter(posting => posting.category === category)

  return (
    <div className="flex flex-col md:flex-row bg-white pt-24">
      <div className="max-w-[1240px] w-full mx-auto flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-[300px] border border-border rounded-[20px] p-6 flex flex-col space-y-6">
          {/* User Profile */}
          <div className="flex flex-col items-center space-y-2 pb-6 border-b border-border">
            <div className="relative">
              <div className="w-[120px] h-[120px] rounded-full overflow-hidden">
                <Image
                  src="/placeholder.svg?height=120&width=120"
                  alt="Profile"
                  width={120}
                  height={120}
                  className="object-cover"
                />
              </div>
              <div className="absolute top-2 right-2 w-4 h-4 bg-success rounded-full border-2 border-white"></div>
            </div>
            <h2 className="typoS1 text-center">Daud Bin Nasar</h2>
            <p className="typoB3 text-textLight">@Daud192</p>
            <button className="btnDefault btnSmall w-full mt-2 rounded-[20px]">View Profile</button>
          </div>

          {/* Rating and Level */}
          <div className="space-y-4 pb-6 border-b border-border">
            <h3 className="typoS2">Rating and Level</h3>

            <div className="flex justify-between items-center">
              <span className="typoB3 text-textLight">My Level</span>
              <span className="typoB2">Regular</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="typoB4 text-textLight">Rating</span>
              <div className="flex items-center">
                <span className="text-software">★</span>
                <span className="typoB2 ml-1">4.2/5</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="typoB3 text-textLight">Total Orders</span>
              <span className="typoB2">203</span>
            </div>

            <div className="bg-secondary rounded-lg p-4 mt-2">
              <p className="typoC1 text-primary">Earn $180 in 3 days to advance to next level</p>
            </div>

            <div className="flex justify-between items-center mt-4">
              <span className="typoB3 text-textLight">Earned this month</span>
              <span className="typoB2">$1213</span>
            </div>
          </div>

          {/* Inbox */}
          <div className="space-y-4 flex-grow">
            <div className="flex justify-between items-center">
              <h3 className="typoS2">Inbox</h3>
              <Link href="/inbox" className="typoC2 text-primary">
                View All
              </Link>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt="Shahab"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-[10px]">2</span>
                  </div>
                </div>
                <div className="flex-grow">
                  <p className="typoB4">Shahab</p>
                  <p className="typoC1 text-textLight truncate">On for 12:30 PM then?</p>
                </div>
                <span className="typoC3 text-textLight">3:40 PM</span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt="Taha"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-[10px]">2</span>
                  </div>
                </div>
                <div className="flex-grow">
                  <p className="typoB4">Taha</p>
                  <p className="typoC1 text-textLight truncate">Ok I will see it</p>
                </div>
                <span className="typoC3 text-textLight">3:40 PM</span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt="Wahab"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex-grow">
                  <p className="typoB4">Wahab</p>
                  <p className="typoC1 text-textLight truncate">Done I will do it tonight</p>
                </div>
                <span className="typoC3 text-textLight">3:40 PM</span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt="Rayyan"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex-grow">
                  <p className="typoB4">Rayyan</p>
                  <p className="typoC1 text-textLight truncate">Done I will do it tonight</p>
                </div>
                <span className="typoC3 text-textLight">3:40 PM</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-grow">
          {/* Header Section */}
          <section className="mb-8">
            <div className="space-y-2">
              <h1 className="text-4xl font-semibold">
                <span className="text-primary">Hi,</span> Daud Bin Nasar
              </h1>
              <p className="typoB3 text-textLight">Sell smarter. Manage better. Grow faster</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {/* Available Balance */}
              <div className="border border-border rounded-[20px] p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="typoC2 text-textLight">Available Balance</p>
                    <h3 className="typoH2">$ 12000</h3>
                  </div>
                </div>
              </div>

              {/* Total Earnings */}
              <div className="border border-border rounded-[20px] p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="typoC2 text-textLight">Total Earnings</p>
                    <h3 className="typoH2">$ 12000</h3>
                  </div>
                </div>
              </div>

              {/* Balance Paid */}
              <div className="border border-border rounded-[20px] p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="typoC2 text-textLight">Balance Paid</p>
                    <h3 className="typoH2">$ 12000</h3>
                  </div>
                </div>
              </div>

              {/* Active Orders */}
              <div className="border border-border rounded-[20px] p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-failure/10 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-failure" />
                  </div>
                  <div>
                    <p className="typoC2 text-textLight">Active Orders</p>
                    <h3 className="typoH2">05</h3>
                  </div>
                </div>
              </div>

              {/* Total Orders */}
              <div className="border border-border rounded-[20px] p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-failure/10 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-failure" />
                  </div>
                  <div>
                    <p className="typoC2 text-textLight">Total Orders</p>
                    <h3 className="typoH2">203</h3>
                  </div>
                </div>
              </div>

              {/* Total Postings */}
              <div className="border border-border rounded-[20px] p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-failure/10 rounded-full flex items-center justify-center">
                    <FileText className="w-6 h-6 text-failure" />
                  </div>
                  <div>
                    <p className="typoC2 text-textLight">Total Postings</p>
                    <h3 className="typoH2">54</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Postings Table */}
            <div>
              <div className="flex justify-between items-center mt-16 mb-8">
                <h3 className="typoS2">Your Posts</h3>
                <div className="flex gap-4">
                  <Dropdown
                    options={["Services", "Software", "Education"]}
                    defaultValue="Services"
                    onChange={setCategory}
                    className="w-[150px]"
                  />
                  <button className="btnPrimary btnMedium rounded-[500px] min-w-[150px]">Create Posting</button>
                </div>
              </div>
              <div className="bg-white rounded-[20px] border border-border overflow-hidden">
                <div className="grid grid-cols-12 px-6 py-5 border-b border-border typoB4 text-textLight">
                  <div className="col-span-5">Title</div>
                  <div className="col-span-2 text-center">Base Price</div>
                  <div className="col-span-1 text-center">Clicks</div>
                  <div className="col-span-2 text-center">Impressions</div>
                  <div className="col-span-1 text-center">Orders</div>
                  <div className="col-span-1 text-right pr-8"></div>
                </div>
                {filteredPostings.map((posting, index) => (
                  <div key={index} className="grid grid-cols-12 px-6 py-5 border-b border-border items-center">
                    <div className="col-span-5 flex items-center gap-4">
                      <div className="w-20 h-12 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                        <img src="/placeholder.svg?height=80&width=80" alt="Posting thumbnail" className="w-20 h-12 object-cover" />
                      </div>
                      <span className="typoB3 text-text">{posting.title}</span>
                    </div>
                    <div className="col-span-2 text-center typoB3 text-text font-medium">{posting.price}</div>
                    <div className="col-span-1 text-center typoB3 text-textLight">{posting.clicks}</div>
                    <div className="col-span-2 text-center typoB3 text-textLight">{posting.impressions}</div>
                    <div className="col-span-1 text-center typoB3 text-textLight">{posting.orders}</div>
                    <div className="col-span-1 text-right pr-8"></div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Upgrade Section */}
          <section className="mt-16 mb-8">
            <div>
              <h3 className="typoS2">Upgrade Your Business</h3>
              <div className="bg-white rounded-[20px] border border-border p-6 flex flex-col md:flex-row items-center justify-between mt-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="typoB3 text-text">Expand Your Business With Premium</p>
                    <p className="typoB3 text-text">Explore powerful tools and exclusive benefits designed to take your success to the next level</p>
                  </div>
                </div>
                <button className="btnPrimary btnMedium mt-4 md:mt-0 rounded-[500px]">Upgrade Now</button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}