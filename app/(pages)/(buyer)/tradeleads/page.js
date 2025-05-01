'use client'

import { useState } from 'react';
import { ChevronDown, Edit, Trash, X, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';


export default function TradeLeads() {
  const router = useRouter();

  const [leads, setLeads] = useState([
    {
      id: 1,
      title: "I will design a custom logo for your brand",
      category: "Service",
      status: "Active",
      expiry: "2/2/2025",
      budget: "$45",
      offers: 12
    },
    {
      id: 2,
      title: "I will design a custom logo for your brand",
      category: "Education",
      status: "Active",
      expiry: "2/2/2025",
      budget: "$41",
      offers: 2
    },
    {
      id: 3,
      title: "I will design a custom logo for your brand",
      category: "Software",
      status: "Active",
      expiry: "2/2/2025",
      budget: "$450",
      offers: 4
    },
    {
      id: 4,
      title: "I will design a custom logo for your brand",
      category: "Service",
      status: "Expired",
      expiry: "2/2/2025",
      budget: "$42",
      offers: 3
    }
  ]);

  const [offers, setOffers] = useState([
    { id: 1, provider: "kahmiri", amount: "$55", country: "Pakistan", rating: 4.2, orders: 273, level: "Gold", deliveryMethods: ["Online", "In-Person", "Documentation"], languages: ["English", "Urdu", "Spanish"], offerDetails: "I will create the logo for your brand in the given time along with brand identity", actualAmount: "$39" },
    { id: 2, provider: "daud77", amount: "$45", country: "India", rating: 4.8, orders: 150, level: "Silver", deliveryMethods: ["Online"], languages: ["English"], offerDetails: "I will design a professional logo with 3 revisions", actualAmount: "$40" }
  ]);

  const [expandedOffersId, setExpandedOffersId] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);

  const toggleOffers = (id) => {
    setExpandedOffersId(expandedOffersId === id ? null : id);
  };

  const getCategoryStyle = (category) => {
    switch (category) {
      case "Software":
        return "bg-[#FFF8E6] text-software";
      case "Education":
        return "bg-[#EDFAF4] text-success";
      case "Service":
      default:
        return "bg-[#ECF6FE] text-primary";
    }
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Header section */}
        <div className="text-center mb-10">
          <h1 className="typoH1 text-black mb-2">Trade Leads</h1>
          <p className="typoB1 text-textLight">Post a Request and unlock exclusive offers from top-rated sellers!</p>
        </div>

        {/* Action button */}
        <div className="flex justify-end mb-6">
          <button
            className="btn btnMedium btnPrimary"
            onClick={() => router.push('/postRequest')}
          >
            Post a request
          </button>
        </div>


        {/* Leads table */}
        <div className="bg-white rounded-[20px] border border-border overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-12 px-6 py-5 border-b border-border typoB4 text-textLight">
            <div className="col-span-4">Title</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-1">Expiry</div>
            <div className="col-span-1">Budget</div>
            <div className="col-span-2 text-right pr-8">Offers</div>
          </div>

          {/* Table content */}
          {leads.map((lead) => (
            <div key={lead.id}>
              <div className="grid grid-cols-12 px-6 py-5 border-b border-border items-center">
                <div className="col-span-4 flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center">
                    <img src="/api/placeholder/40/40" alt="Logo" className="w-10 h-10 object-cover" />
                  </div>
                  <span className="typoB3 text-text">{lead.title}</span>
                </div>
                <div className="col-span-2">
                  <span className={`px-4 py-1 rounded-full text-xs ${getCategoryStyle(lead.category)}`}>
                    {lead.category}
                  </span>
                </div>
                <div className="col-span-2">
                  <span
                    className={`px-4 py-1 rounded-full text-xs ${lead.status === "Active" ? "bg-[#EDFAF4] text-success" : "bg-[#FFEEEE] text-failure"
                      }`}
                  >
                    {lead.status}
                  </span>
                </div>
                <div className="col-span-1 typoB3 text-textLight">{lead.expiry}</div>
                <div className="col-span-1 typoB3 text-text font-medium">{lead.budget}</div>
                <div className="col-span-2 flex justify-end items-center gap-6">
                  <button
                    className="flex items-center gap-1 cursor-pointer"
                    onClick={() => toggleOffers(lead.id)}
                  >
                    <span className="typoB3 text-text font-medium">
                      {lead.offers.toString().padStart(2, "0")}
                    </span>
                    <ChevronDown
                      size={16}
                      strokeWidth={1.5}
                      className={`text-text transition-transform ${expandedOffersId === lead.id ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div className="flex gap-2">
                    <button className="p-1">
                      <Edit
                        size={18}
                        strokeWidth={1.5}
                        className="text-textLight hover:text-primary transition-colors"
                      />
                    </button>
                    <button className="p-1">
                      <Trash
                        size={18}
                        strokeWidth={1.5}
                        className="text-textLight hover:text-primary transition-colors"
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Offers section - shown when expanded */}
              {expandedOffersId === lead.id && (
                <div className="px-6 py-4 bg-[#FAFBFC] border-b border-border">
                  <h3 className="typoB4 text-text mb-4">All Offers</h3>
                  <div className="space-y-3">
                    {offers.map((offer, idx) => (
                      <div
                        key={offer.id}
                        className="flex items-center justify-between p-3 bg-white rounded-lg border border-border"
                      >
                        <div className="flex items-center gap-3">
                          <span className="typoC2 text-textLight w-6">
                            {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                          </span>
                          <div className="w-6 h-6 bg-gray-200 rounded-full overflow-hidden">
                            <img
                              src="/api/placeholder/24/24"
                              alt={offer.provider}
                              className="w-6 h-6 object-cover"
                            />
                          </div>
                          <span className="typoB4 text-text">{offer.provider}</span>
                          <span className="typoB4 text-textLight">offered</span>
                          <span className="typoB4 text-primary font-medium">{offer.amount}</span>
                        </div>
                        <button
                          className="btn btnSmall btnDefault"
                          onClick={() => setSelectedOffer(offer)}
                        >
                          View Offer
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <button className="typoB4 text-textLight hover:text-primary" onClick={()=>router.push(`/viewOffers/${lead}`)
}>
                      View All Offers
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Offer Modal */}
      {selectedOffer && (
        <OfferModal offer={selectedOffer} onClose={() => setSelectedOffer(null)} />
      )}
    </div>
  );
}

// Offer Modal Component
function OfferModal({ offer, onClose }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[121]"
      onClick={handleOverlayClick}
    >
      {/* Modal Content */}
      <div className="bg-white rounded-[20px] w-full max-w-[800px] p-6 shadow-lg border border-border z-50 relative">


        {/* Seller Info */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src="/api/placeholder/48/48"
              alt={offer.provider}
              className="w-12 h-12 object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="typoB2 text-text">{offer.provider}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs bg-[#FFF8E6] text-levelGold`}>
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
          <button className="btn btnSmall btnDefault">
            Contact
          </button>
        </div>

        {/* Delivery Methods and Languages */}
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

        {/* Offer Details */}
        <div className="mb-6">
          <h4 className="typoC2 text-textLight mb-2">OFFER:</h4>
          <p className="typoB3 text-text">{offer.offerDetails}</p>
        </div>

        {/* Amounts and Action Buttons */}
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
    </div>
  );
}