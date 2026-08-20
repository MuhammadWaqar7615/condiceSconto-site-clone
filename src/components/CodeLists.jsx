import React from 'react';

const newCodes = [
  { store: "Ecolab", title: "Sconto del 10% su Ecolab", logo: "/images/nencinisport.png" },
  { store: "Samsung", title: "Codice Sconto 5% su Smartphone", logo: "/images/sony.png" },
  { store: "eBay", title: "Sconto 15% Ricambi", logo: "/images/rgmania.png" },
  { store: "Nike", title: "Extra 20% Saldi", logo: "/images/nike.png" },
  { store: "Adidas", title: "Spedizione Gratuita", logo: "/images/lastminute.png" },
  { store: "Decathlon", title: "Sconto 10€", logo: "/images/europcar.png" },
  { store: "IBS", title: "Codice sconto libri -15%", logo: "/images/flexispot.png" },
];

const expiringCodes = [
  { store: "Braun", title: "Risparmia 20€ su rasoi Braun", logo: "/images/mova.png" },
  { store: "Unieuro", title: "Sconto 5% a carrello", logo: "/images/itaairways.png" },
  { store: "BENU", title: "Codice Sconto Farmacia", logo: "/images/zenhotels.png" },
  { store: "Booking", title: "Sconto 15% soggiorni", logo: "/images/expedia.png" },
  { store: "TrainPal", title: "Sconto 5% Treni", logo: "/images/italo.png" },
  { store: "Italo", title: "Fino al 30% Offerta Estate", logo: "/images/italo.png" },
  { store: "MediaWorld", title: "Consegna gratuita", logo: "/images/shein.png" },
];

function CodeLists() {
  return (
    <section className="bg-[#724F70] py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6">
          
          {/* Left Column: Nuovi */}
          <div className="w-full md:w-1/2">
            <h3 className="text-white text-center text-lg font-medium mb-4">
              Codici sconto nuovi
            </h3>
            <div className="bg-white px-4 py-2 shadow-sm rounded-sm">
              {newCodes.map((item, index) => (
                <a key={index} href="#" className={`flex items-center py-4 ${index !== newCodes.length - 1 ? 'border-b border-gray-100' : ''} group`}>
                  <div className="w-16 h-8 flex-shrink-0 flex items-center justify-center mr-4">
                    <img src={item.logo} alt={item.store} className="max-h-full object-contain" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 font-bold uppercase mb-0.5">{item.store}</div>
                    <div className="text-xs font-semibold text-gray-800 group-hover:text-[#724F70] transition-colors">{item.title}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: In Scadenza */}
          <div className="w-full md:w-1/2">
            <h3 className="text-white text-center text-lg font-medium mb-4">
              Codici sconto in scadenza
            </h3>
            <div className="bg-white px-4 py-2 shadow-sm rounded-sm">
              {expiringCodes.map((item, index) => (
                <a key={index} href="#" className={`flex items-center py-4 ${index !== expiringCodes.length - 1 ? 'border-b border-gray-100' : ''} group`}>
                  <div className="w-16 h-8 flex-shrink-0 flex items-center justify-center mr-4">
                    <img src={item.logo} alt={item.store} className="max-h-full object-contain" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 font-bold uppercase mb-0.5">{item.store}</div>
                    <div className="text-xs font-semibold text-gray-800 group-hover:text-[#724F70] transition-colors">{item.title}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default CodeLists;
