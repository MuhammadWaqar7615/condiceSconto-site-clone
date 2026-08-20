import React from 'react';

function Newsletter() {
  return (
    <section className="bg-[#f2f2f2] py-8 border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-gray-700 text-base sm:text-lg font-medium mb-4">
          Ricevi i migliori codici sconto via email
        </h3>
        <form className="flex flex-col sm:flex-row justify-center max-w-xl mx-auto gap-2 sm:gap-0">
          <input
            type="email"
            placeholder="La tua email"
            className="w-full sm:flex-1 px-4 py-2 border border-gray-300 rounded sm:rounded-r-none focus:outline-none focus:border-[#7a5276] text-sm"
          />
          <button
            type="submit"
            className="w-full sm:w-auto bg-[#724F70] hover:bg-[#60405d] text-white px-8 py-2 rounded sm:rounded-l-none text-xs font-semibold uppercase tracking-wide transition-colors"
          >
            ISCRIVITI
          </button>
        </form>
      </div>
    </section>
  );
}

export default Newsletter;
