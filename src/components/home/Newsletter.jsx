import React from 'react';

function Newsletter() {
  return (
    <section className="bg-[#eaeced] py-4 w-full flex flex-col items-center justify-center">
      <h3 className="text-gray-600 text-[18px] md:text-[22px] font-normal mb-2 text-center tracking-wide">
        Ricevi gli aggiornamenti sui nostri migliori codici sconto
      </h3>

      <div className="flex flex-col items-center w-full max-w-[500px] px-4">
        <input
          type="email"
          placeholder="Inserisci la tua email"
          className="w-full px-4 py-2 bg-white rounded-[3px] border border-gray-200 text-gray-700 text-[15px] focus:outline-none focus:border-[#78546b] mb-4 placeholder-gray-400 shadow-sm"
        />
        <button className="bg-[#815975] hover:bg-[#68485d] text-white text-[15px] font-semibold py-2.5 px-10 rounded-[3px] transition-colors shadow-sm">
          Iscriviti
        </button>
      </div>
    </section>
  );
}

export default Newsletter;
