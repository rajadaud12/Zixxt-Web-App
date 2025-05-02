import { useState } from "react";
import { ChevronDown,Star } from 'lucide-react';

export default function ReviewTestimonial  ({ review, index }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div key={index} className="bg-white border border-border rounded-[20px] p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-border">
                        <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <span className="typoB4 text-text capitalize font-semibold">{review.name}</span>
                        <span className="text-textLight ml-3 typoC1">{review.date}</span>
                    </div>
                </div>
                <div className="flex items-center">
                    <span className="typoB4 text-text mr-2 font-semibold">{review.rating}</span>
                    <div className="flex">
                        {[...Array(5)].map((_, starIndex) => (
                            <Star
                                key={starIndex}
                                className={`w-5 h-5 ${starIndex < Math.round(review.rating)
                                        ? 'text-primary fill-primary'
                                        : 'text-textLight'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <p className="typoB3 text-text mb-4 leading-relaxed">{review.text}</p>

            {review.detailedReview?.additionalImages?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {review.detailedReview.additionalImages.map((img, imgIndex) => (
                        <div
                            key={imgIndex}
                            className="w-16 h-16 rounded-lg overflow-hidden border border-border"
                        >
                            <img src={img} alt={`Review ${imgIndex + 1}`} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
            )}

            <button
                className="btn btnPrimaryLink typoC2 flex items-center text-primary hover:underline"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                {isExpanded ? 'Hide Detailed Review' : 'View Detailed Review'}
                <ChevronDown
                    className={`ml-2 w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                />
            </button>

            {isExpanded && review.detailedReview && (
                <div className="mt-6 p-6 bg-gray-50 rounded-lg shadow-inner">
                    <h3 className="typoS2 text-text mb-6 font-semibold">Detailed Feedback</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { label: 'Seller Knowledge', data: review.detailedReview.knowledge },
                            { label: 'Meeting Deadlines', data: review.detailedReview.deadlines },
                            { label: 'Quality of Work', data: review.detailedReview.quality },
                            { label: 'Recommendation', data: review.detailedReview.recommendation },
                            { label: 'Response Time', data: review.detailedReview.responseTime },
                            { label: 'Met Expectations', data: review.detailedReview.expectations },
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white p-4 rounded-lg">
                                <p className="typoB4 text-textLight mb-2 font-medium">{item.label}</p>
                                <div className="flex items-center mb-2">
                                    <span className="typoB3 text-text mr-2 font-semibold">{item.data.rating}</span>
                                    <div className="flex">
                                        {[...Array(5)].map((_, starIndex) => (
                                            <Star
                                                key={starIndex}
                                                className={`w-4 h-4 ${starIndex < Math.round(item.data.rating)
                                                        ? 'text-primary fill-primary'
                                                        : 'text-textLight'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <p className="typoB3 text-text leading-relaxed">{item.data.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
