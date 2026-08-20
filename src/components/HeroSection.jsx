"use client";

import React, { useState, useEffect } from 'react';

// Using known valid images from /public/images/
const mockStores = [
  { name: "HUAWEI", logo: "/images/huawei.png" },
  { name: "Temu", logo: "/images/temu.png" },
  { name: "YOOX", logo: "/images/yoox.png" },
  { name: "Amazon", logo: "/images/amazon.png" },
  { name: "SHEIN", logo: "/images/shein.png" },
  { name: "H&M", logo: "/images/handm.png" },
];

const mockSlides = [
  { id: 1, image: "/images/pulsee.jpg" },
  { id: 2, image: "/images/vevor.jpg" },
  { id: 3, image: "/images/mobilifiver.jpg" },
];

function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % mockSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? mockSlides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % mockSlides.length);
  };

  return (
    <section className="bg-[#78546b] pt-8 pb-10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">

        {/* Main Hero Card & Image Area - Single connected block */}
        <div className="flex flex-col md:flex-row shadow-lg bg-white rounded-sm overflow-hidden h-auto md:h-[350px]">

          {/* Left: Featured Offer Card */}
          <div className="w-full md:w-[35%] flex flex-col items-center justify-center text-center p-8">
            <div className="h-10 mb-4 flex items-center justify-center">
              <img src="/images/pulsee.png" alt="Pulsee" className="max-h-full object-contain" />
            </div>

            <p className="text-gray-500 text-[15px] leading-relaxed mb-6 px-4">
              Risparmia sulla tua bolletta grazie a questo Codice Sconto Pulsee
            </p>

            <div className="w-full border-t border-dashed border-gray-300 my-2"></div>

            <div className="mt-4 flex flex-col items-center">
              <span className="text-gray-600 font-bold text-xs uppercase tracking-wider mb-1">FINO A</span>
              <span className="text-[42px] font-bold text-[#78546b] leading-none mb-6">245€</span>
            </div>

            <a href="#" className="bg-[#78546b] hover:bg-[#68485d] text-white text-[15px] font-semibold py-3 px-8 rounded-sm transition-colors w-full sm:w-auto">
              Scopri Codice
            </a>
          </div>

          {/* Right: Promotional Slider */}
          <div className="w-full md:w-[65%] relative h-[250px] md:h-full bg-yellow-400 group">
            {mockSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              >
                <img
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            ))}

            {/* Slider Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-16 bg-black/10 hover:bg-black/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous slide"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-16 bg-black/10 hover:bg-black/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next slide"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

        </div>

        {/* Store Logos Row */}
        <div className="mt-4 flex flex-wrap lg:flex-nowrap justify-between gap-1.5">
          {mockStores.map((store, idx) => (
            <a key={idx} href="#" className="bg-white rounded-sm p-4 flex-1 flex flex-col items-center justify-between min-w-[28%] sm:min-w-[12%] lg:min-w-0 hover:shadow-md transition-shadow h-[90px]">
              <div className="flex-1 flex items-center justify-center w-full">
                <img src={store.logo} alt={store.name} className="max-h-[32px] max-w-full object-contain" />
              </div>
              <span className="text-[11px] text-gray-500 font-medium mt-2 tracking-wide">{store.name}</span>
            </a>
          ))}
          {/* Last distinct item: "Tutti i 3568 negozi" */}
          <a href="/negozi" className="bg-white rounded-sm p-4 flex-1 flex flex-col items-center justify-center min-w-[28%] sm:min-w-[12%] lg:min-w-0 hover:shadow-md transition-shadow h-[90px] border border-transparent hover:border-[#78546b]">
            <span className="text-gray-500 text-[11px] font-semibold uppercase tracking-wider text-center leading-tight">
              TUTTI I <br />
              <span className="text-[#78546b] text-xl font-bold">3568</span> <br />
              NEGOZI
            </span>
          </a>
        </div>

      </div>
    </section>
  );
}

export default HeroSection;
