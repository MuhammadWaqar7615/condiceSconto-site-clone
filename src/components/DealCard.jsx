import React from 'react';

function DealCard({ deal }) {
  return (
    <div className="bg-white border border-gray-100 flex flex-col items-center justify-between p-5 sm:p-6 h-full hover:shadow-md transition-shadow cursor-pointer">
      
      {/* Top Logo */}
      <div className="w-full flex justify-center mb-4 h-8 sm:h-10">
        <a href={deal.dealUrl} className="flex items-center justify-center">
          {/* TODO: Replace placeholder with original image */}
          <img
            src="/images/placeholder.png"
            alt={deal.store}
            className="max-h-full max-w-[120px] object-contain"
          />
        </a>
      </div>
      
      {/* Discount */}
      <div className="text-center w-full mb-3">
        <span className="text-2xl sm:text-3xl font-bold text-gray-800 leading-none">{deal.discount}</span>
        {deal.type && (
          <div className="text-[10px] font-bold text-gray-500 mt-1 uppercase tracking-wider">{deal.type}</div>
        )}
      </div>

      {/* Dashed Divider */}
      <div className="w-full border-t border-dashed border-gray-300 my-2"></div>
      
      {/* Description */}
      <div className="text-center mt-2 px-1 w-full">
        <a
          href={deal.dealUrl}
          className="text-gray-600 text-xs hover:text-[#724F70] transition-colors leading-relaxed line-clamp-2"
        >
          {deal.title}
        </a>
      </div>
      
    </div>
  );
}

export default DealCard;
