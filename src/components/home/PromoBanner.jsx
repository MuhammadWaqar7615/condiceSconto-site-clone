import React from 'react';

function PromoBanner() {
  return (
    <section className="bg-[#E9EDEE] py-5">
      <div className="max-w-[850px] mx-auto px-4 sm:px-6">
        <div className="bg-white shadow-sm flex flex-col md:flex-row items-stretch overflow-hidden h-auto md:h-[230px]">

          {/* Left: Illustration */}
          <div className="w-full md:w-1/2 h-[200px] md:h-full relative">
            {/* TODO: Replace placeholder with original image */}
            <img
              src="/images/banner-img.jpg"
              alt="Back to School Promo"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>

          {/* Right: Text and Button */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col items-center justify-center text-center px-4 sm:px-12">
            <h3 className="text-[#825a71] text-[14px] sm:text-[16px] font-bold mb-3">
              Dimmi chi sei e ti dirò cosa mettere nel tuo zaino
            </h3>

            <p className="text-[13px] sm:text-[14px] text-gray-500 leading-relaxed mb-6 px-2">
              Inizia il nuovo anno accademico con il piede giusto, approfitta dei nostri codici sconto per risparmiare su tutto il materiale scolastico e universitario.
            </p>

            <div className="w-40 h-px bg-[#825a71] opacity-60 mb-5"></div>

            <a href="#" className="bg-[#825a71] hover:bg-[#68485d] text-white text-[14px] py-2 px-5 rounded-sm transition-colors">
              Leggi l&apos;articolo
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

export default PromoBanner;
