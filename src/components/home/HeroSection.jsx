"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

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
  {
    id: 1,
    image: "/images/pulsee.jpg",
    logo: "/images/pulsee.png",
    text: "Risparmia sulla tua bolletta grazie a questo Codice Sconto Pulsee",
    discount: "245€"
  },
  {
    id: 2,
    image: "/images/vevor.jpg",
    logo: "/images/vevor.png", /* TODO: Replace placeholder with original image */
    text: "Approfitta delle migliori offerte su attrezzature professionali",
    discount: "6%"
  },
  {
    id: 3,
    image: "/images/mobilifiver.jpg",
    logo: "/images/mobilifiver.png", /* TODO: Replace placeholder with original image */
    text: "Rinnova i tuoi spazi con i mobili di design esclusivi",
    discount: "15€"
  },
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
    <section className="bg-main pt-3 pb-2">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">

        {/* Main Hero Card & Image Area */}
        <div className="flex flex-col md:flex-row shadow-lg bg-white rounded-sm h-auto md:h-[350px] overflow-hidden">

          {/* Left: Featured Offer Card (Sliding, no arrows, visible on mobile) */}
          <div className="w-full md:w-[35%] relative h-[350px] md:h-full bg-white">
            {mockSlides.map((slide, index) => (
              <div
                key={`left-${slide.id}`}
                className={`absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-white transition-opacity duration-500 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
              >
                <div className="h-10 mb-4 flex items-center justify-center">
                  <img src={slide.logo} alt="Logo" className="max-h-full object-contain" />
                </div>

                <p className="text-gray-500 text-[15px] leading-relaxed mb-6 px-4">
                  {slide.text}
                </p>

                <div className="w-full border-t border-dashed border-gray-300 my-2"></div>

                <div className="mt-4 flex flex-col items-center">
                  <span className="text-gray-600 font-bold text-xs uppercase tracking-wider mb-1">FINO A</span>
                  <span className="text-[42px] font-bold text-accent leading-none mb-6">{slide.discount}</span>
                </div>

                <a href="#" className="bg-accent hover:bg-accent-hover text-white text-[15px] font-semibold py-3 px-8 rounded-sm transition-colors w-full sm:w-auto">
                  Scopri Codice
                </a>
              </div>
            ))}
          </div>

          {/* Right: Promotional Advertisement Image (Sliding, has arrows, hidden on mobile) */}
          <div className="hidden md:block w-full md:w-[65%] relative h-full group">
            {mockSlides.map((slide, index) => (
              <div
                key={`right-${slide.id}`}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
              >
                <img
                  src={slide.image}
                  alt={`Slide ${slide.id}`}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            ))}

            {/* Slider Navigation Arrows (Only on the right pane) */}
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

        {/* Store Logos Row (Offers Slider) */}
        <div className="mt-4 flex overflow-x-auto md:flex-wrap lg:flex-nowrap gap-1.5 pb-2 snap-x hide-scrollbar">
          {mockStores.map((store, idx) => (
            <a key={idx} href="#" className="bg-white rounded-sm p-4 flex-1 flex flex-col items-center justify-between min-w-[30%] sm:min-w-[15%] md:min-w-[12%] lg:min-w-0 shrink-0 snap-start hover:shadow-md transition-shadow h-[90px]">
              <div className="flex-1 flex items-center justify-center w-full">
                <img src={store.logo} alt={store.name} className="max-h-[32px] max-w-full object-contain" />
              </div>
              <span className="text-[11px] text-gray-500 font-medium mt-2 tracking-wide">{store.name}</span>
            </a>
          ))}
          {/* Last distinct item: "Tutti i 3568 negozi" */}
          <Link href="/negozi" className="bg-white rounded-sm p-4 flex-1 flex flex-col items-center justify-center min-w-[30%] sm:min-w-[15%] md:min-w-[12%] lg:min-w-0 shrink-0 snap-start hover:shadow-md transition-shadow h-[90px] border border-transparent hover:border-accent">
            <span className="text-gray-500 text-[11px] font-semibold uppercase tracking-wider text-center leading-tight">
              TUTTI I <br />
              <span className="text-accent text-xl font-bold">3568</span> <br />
              NEGOZI
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
}

export default HeroSection;
