"use client";

import React, { useState } from 'react';

const mockMerchants = [
  {
    id: 135,
    name: "Sony",
    logo: "/images/sony.png",
    dealUrl: "#",
    title: "Risparmia il 10% sulle migliori TV Sony",
    discount: "10%",
    image: "/images/sony2.jpg",
  },
  {
    id: 479,
    name: "Costa Crociere",
    logo: "/images/costacrociere.png",
    dealUrl: "#",
    title: "Trova la tua crociera last minute su Costa Crociere",
    discount: "A PARTIRE DA 699€",
    image: "/images/costacrociere16.jpg",
  },
  {
    id: 1090,
    name: "Leroy Merlin",
    logo: "/images/leroymerlin.png",
    dealUrl: "#",
    title: "Più spendi e più risparmi con Leroy Merlin",
    discount: "FINO A 20€",
    image: "/images/leroymerlin4.jpg",
  },
  {
    id: 2828,
    name: "VEVOR",
    logo: "/images/vevor.png",
    dealUrl: "#",
    title: "Non farti sfuggire questo Codice Sconto VEVOR",
    discount: "6% EXTRA",
    image: "/images/vevor.jpg",
  },
  {
    id: 3000,
    name: "Hostinger",
    logo: "/images/hostinger.png",
    dealUrl: "#",
    title: "Sconti imperdibili sui piani hosting",
    discount: "75%",
    image: "/images/hostinger9.jpg",
  },
];

function MerchantSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + mockMerchants.length) % mockMerchants.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % mockMerchants.length);
  };

  const activeMerchant = mockMerchants[currentSlide];

  return (
    <div className="bg-[#1c222e] text-white w-full py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row bg-[#2b3240] rounded-xl overflow-hidden shadow-2xl h-auto md:h-[450px]">
          
          {/* Left Side: Merchant Info */}
          <div className="w-full md:w-1/3 p-6 sm:p-8 flex flex-col items-center justify-center text-center relative">
            {/* Logo */}
            <div className="mb-6 bg-white p-3 rounded-lg w-32 h-16 flex items-center justify-center shadow-md">
              <img
                src={activeMerchant.logo}
                alt={activeMerchant.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            
            {/* Title */}
            <h2 className="text-xl sm:text-2xl font-bold mb-4 px-2 leading-tight">
              {activeMerchant.title}
            </h2>
            
            {/* Discount Badge */}
            <div className="bg-blue-600 text-white font-black text-2xl px-6 py-2 rounded-md mb-8 shadow-lg transform -rotate-2">
              {activeMerchant.discount}
            </div>
            
            {/* CTA Button */}
            <a
              href={activeMerchant.dealUrl}
              className="bg-green-500 hover:bg-green-600 text-white text-lg py-3 px-8 rounded-full transition-colors w-full sm:w-auto font-medium shadow-md inline-block"
            >
              Scopri <span className="font-extrabold">Codice</span>
            </a>
          </div>

          {/* Right Side: Hero Image & Controls */}
          <div className="w-full md:w-2/3 relative h-[300px] md:h-full group">
            <img
              src={activeMerchant.image}
              alt={activeMerchant.title}
              className="w-full h-full object-cover"
            />
            
            {/* Overlay for better text/button visibility on images if needed */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#2b3240] via-transparent to-transparent opacity-60 md:opacity-100 w-16"></div>

            {/* Left Arrow */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full transition-colors opacity-100 md:opacity-0 md:group-hover:opacity-100"
              aria-label="Precedente"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Right Arrow */}
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full transition-colors opacity-100 md:opacity-0 md:group-hover:opacity-100"
              aria-label="Successivo"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Slider Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
              {mockMerchants.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors shadow-sm ${
                    index === currentSlide ? 'bg-white w-4' : 'bg-white/60 hover:bg-white/80'
                  }`}
                  aria-label={`Vai alla slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MerchantSlider;