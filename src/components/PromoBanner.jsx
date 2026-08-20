import React from 'react';

function PromoBanner() {
  return (
    <section className="bg-[#fafafa] py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-sm border border-gray-100 flex flex-col md:flex-row items-center overflow-hidden h-auto md:h-48">
          
          {/* Left: Illustration */}
          <div className="w-full md:w-[40%] h-48 md:h-full bg-[#f2fae6] flex items-center justify-center p-4">
            <img src="/images/placeholder.png" alt="Promo Illustration" className="max-h-full object-contain" />
          </div>
          
          {/* Right: Text and Button */}
          <div className="w-full md:w-[60%] p-6 md:p-8 flex flex-col items-center md:items-start text-center md:text-left justify-center">
            <h3 className="text-gray-800 text-sm sm:text-base mb-4 font-medium leading-relaxed">
              Ricevi subito un <strong>buono sconto di 5€</strong>!<br className="hidden md:block"/>
              Iscriviti alla nostra newsletter per non perderti nessuna offerta.
            </h3>
            <a href="#" className="bg-[#724F70] hover:bg-[#60405d] text-white text-xs font-semibold uppercase tracking-wide py-2.5 px-6 rounded transition-colors">
              ISCRIVITI ORA
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

export default PromoBanner;
