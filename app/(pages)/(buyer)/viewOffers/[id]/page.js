'use client'

import { useState, useEffect } from 'react';
import { ChevronDown, Star } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';

export default function ViewAllOffers() {
  const router = useRouter();
  const params = useParams();
  const tradeLeadId = params.id; // Extract trade lead ID from URL

  const [offers, setOffers] = useState([
    { 
      id: 1, 
      provider: "kahmiri", 
      amount: "$55", 
      country: "Pakistan", 
      rating: 4.2, 
      orders: 273, 
      level: "Gold", 
      deliveryMethods: ["Online", "In-Person", "Documentation"], 
      languages: ["English", "Urdu", "Spanish"], 
      offerDetails: "I will create the logo for your brand in the given time along with brand identity", 
      actualAmount: "$39" 
    },
    { 
      id: 2, 
      provider: "daud77", 
      amount: "$45", 
      country: "India", 
      rating: 4.8, 
      orders: 150, 
      level: "Silver", 
      deliveryMethods: ["Online"], 
      languages: ["English"], 
      offerDetails: "I will design a professional logo with 3 revisions", 
      actualAmount: "$40" 
    }
  ]);

  // Simulate fetching offers for the trade lead (replace with actual API call in production)
  useEffect(() => {
    // Example: Fetch offers for tradeLeadId
    console.log(`Fetching offers for trade lead ID: ${tradeLeadId}`);
    // In a real app: setOffers(fetchedOffers);
  }, [tradeLeadId]);

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="typoH1 text-black mb-2">View Offers</h1>
          <p className="typoB1 text-textLight">The offers on the selected trade lead are given below</p>
        </div>

        {/* Search/Filter Section */}
        <div className="flex justify-center mb-6">
          <div className="relative w-full max-w-[600px]">
            <input
              type="text"
              placeholder="I want a customized logo for my brand"
              className="formInput w-full pr-10 rounded-[10px] border border-border py-2 px-4"
            />
            <ChevronDown
              size={20}
              strokeWidth={1.5}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-textLight"
            />
          </div>
        </div>

        {/* Offers List */}
        <div className="space-y-6">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-[20px] border border-border p-6"
            >
              {/* Provider Information */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                      src="/api/placeholder/48/48"
                      alt={offer.provider}
                      className="w-12 h-12 object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="typoB2 text-text">{offer.provider}</span>
                      <span className="px-2 py-0.5 rounded-full text-xs bg-[#FFF8E6] text-levelGold">
                        {offer.level}
                      </span>
                    </div>
                    <div className="mb-1">
                      <span className="typoC1 text-textLight">{offer.country}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={16} strokeWidth={2} className="text-yellow-400" fill="currentColor" />
                      <span className="typoC1 text-text">{offer.rating}/5</span>
                      <span className="typoC1 text-textLight">({offer.orders} Orders)</span>
                    </div>
                  </div>
                </div>
                <button className="btn btnSmall btnDefault">
                  Contact
                </button>
              </div>

              {/* Additional Details */}
              <div className="grid grid-cols-2 gap-4 mb-6 border-b border-border pb-4">
                <div>
                  <span className="typoC2 text-textLight">Orders Delivered</span>
                  <p className="typoB3 text-text">{offer.deliveryMethods.join(", ")}</p>
                </div>
                <div>
                  <span className="typoC2 text-textLight">Languages</span>
                  <p className="typoB3 text-text">{offer.languages.join(", ")}</p>
                </div>
              </div>

              {/* Offer Description */}
              <div className="mb-6">
                <h4 className="typoC2 text-textLight mb-2">Offer:</h4>
                <p className="typoB3 text-text">{offer.offerDetails}</p>
              </div>

              {/* Amount Information and Action Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex gap-6">
                  <div>
                    <span className="typoC2 text-textLight">Actual Amount</span>
                    <p className="typoB2 text-text font-medium">{offer.actualAmount}</p>
                  </div>
                  <div>
                    <span className="typoC2 text-textLight">Proposed Amount</span>
                    <p className="typoB2 text-primary font-medium">{offer.amount}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="btn btnMedium btnDark">
                    Accept
                  </button>
                  <button className="btn btnMedium btnDefault">
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div className="flex justify-start mt-6">
          <button
            className="btn btnMedium btnDefault"
            onClick={() => router.push('/tradeLeads')}
          >
            Back to Trade Leads
          </button>
        </div>
      </div>
    </div>
  );
}