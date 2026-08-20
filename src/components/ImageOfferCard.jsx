import React from 'react';

function ImageOfferCard({ deal }) {
  return (
    <div className="bg-white flex flex-col h-full hover:shadow-lg transition-shadow cursor-pointer overflow-hidden border border-gray-100">
      
      {/* Top Image */}
      <div className="w-full h-[140px] sm:h-[160px] bg-gray-200">
        <a href={deal.dealUrl} className="block w-full h-full">
          {/* TODO: Replace placeholder with original image */}
          <img
            src="/images/placeholder.png"
            alt={deal.store}
            className="w-full h-full object-cover"
          />
        </a>
      </div>

      {/* Bottom Content */}
      <div className="flex-1 flex flex-col items-center justify-between p-5">
        
        {/* Logo */}
        <div className="w-full flex justify-center mb-3 h-6 sm:h-8">
          <a href={deal.dealUrl} className="flex items-center justify-center">
            {/* TODO: Replace placeholder with original image */}
            <img
              src="/images/placeholder.png"
              alt={deal.store}
              className="max-h-full max-w-[100px] object-contain"
            />
          </a>
        </div>
        
        {/* Discount */}
        <div className="text-center w-full mb-3">
          {deal.type && (
            <div className="text-[10px] font-bold text-gray-500 mb-0.5 uppercase tracking-wider">{deal.type}</div>
          )}
          <span className="text-xl sm:text-2xl font-bold text-gray-800 leading-none">{deal.discount}</span>
        </div>

        {/* Dashed Divider */}
        <div className="w-full border-t border-dashed border-gray-300 my-2"></div>
        
        {/* Description */}
        <div className="text-center mt-2 px-1 w-full">
          <a
            href={deal.dealUrl}
            className="text-gray-600 text-[11px] sm:text-xs hover:text-[#724F70] transition-colors leading-relaxed line-clamp-2"
          >
            {deal.title}
          </a>
        </div>

      </div>
      
    </div>
  );
}

export default ImageOfferCard;
