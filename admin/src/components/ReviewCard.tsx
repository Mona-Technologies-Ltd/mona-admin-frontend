'use client';

import { Star } from 'lucide-react';
import React from 'react';

const ReviewCard = () => {
  return (
    <div className="w-[350px] bg-white shadow-md rounded-none p-6 relative font-sans overflow-hidden">
      {/* Diagonal Stripes */}
      <div className="absolute top-6 -right-5 left-40 flex flex-col items-end pr-2 pt-2 gap-[4px] rotate-45 origin-top-right">
        <div className="w-[250px] h-[4px] bg-blue-600 rounded-full" />
        <div className="w-[100px] h-[4px] bg-cyan-400 rounded-full" />
      </div>

      {/* User & Claim */}
      <h2 className="text-lg font-semibold text-black">John Doe</h2>
     <div className='flex flex-col'>
         <a
        href="#"
        className="text-sm font-medium text-[#004AAD] underline hover:text-blue-900"
      >
        Claim ID: CL-134763
      </a>

      {/* Badge */}
      <span className="w-[40%] inline-block mt-2 px-3 py-1 bg-[#E6F0FA] text-[#38B6FF] text-[10px] rounded-none font-medium">
        Accidental Damage
      </span>
     </div>

      {/* Review */}
      <p className="w-[50%] text-sm text-gray-700 mt-4 leading-relaxed">
        Aliyu did a great job assisting us with the repairs of my Iphone 13
      </p>

      {/* Rating */}
      <div className="flex items-center gap-1 mt-4">
        {[1, 2, 3, 4].map((_, i) => (
          <Star key={i} size={18} className="fill-yellow-400 stroke-yellow-400" />
        ))}
        <Star size={18} className="stroke-gray-300" />
      </div>

      {/* Time */}
      <p className="text-xs text-gray-500 mt-2">2 months ago</p>

      {/* Score Badge */}
      <div className="absolute top-1/2 right-6 transform -translate-y-1/2">
        <div className="w-16 h-16 rounded-full bg-lime-100 flex items-center justify-center">
          <span className="text-lime-700 text-2xl font-semibold">4.5</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
