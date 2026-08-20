import React from 'react';

const newCodes = [
  { tag: "CODICE", title: "Codice sconto PhotoSì dal 20% al 40%", logo: "/images/photosi.png" },
  { tag: "SPEDIZIONE", title: "Spedizione gratuita OVS", logo: "/images/ovs.png" },
  { tag: "CODICE EXTRA", title: "Codice sconto OVS 20% compleanno", logo: "/images/ovs.png" },
  { tag: "CODICE EXTRA", title: "Codice sconto OVS 10%", logo: "/images/ovs.png" },
  { tag: "SPEDIZIONE", title: "Spedizione gratuita FarmaNika", logo: "/images/farmanika.png" },
  { tag: "CODICE", title: "Codice sconto FarmaNika 5%", logo: "/images/farmanika.png" },
  { tag: "CODICE", title: "Codice sconto eDreams 65€ Porto Rico", logo: "/images/edreams.png" },
  { tag: "CODICE", title: "Codice sconto eDreams 60€ Repubblica Dominicana", logo: "/images/edreams.png" },
  { tag: "CODICE", title: "Codice sconto eDreams 40€ Madeira", logo: "/images/edreams.png" },
  { tag: "CODICE", title: "Codice sconto eDreams 10€ Marocco", logo: "/images/edreams.png" },
];

const expiringCodes = [
  { tag: "CODICE", title: "Codice sconto MyParking 10%", logo: "/images/myparking.png" },
  { tag: "SCONTO", title: "Sconto Decathlon 80% offerte", logo: "/images/decathlon.png" },
  { tag: "CODICE EXTRA", title: "Codice sconto Redcare 10%", logo: "/images/redcare.png" },
  { tag: "CODICE", title: "Codice sconto Havaianas 10%", logo: "/images/havaianas.png" },
  { tag: "CODICE", title: "Buono sconto Lyca Mobile 10€ porta un amico", logo: "/images/lycamobile.png" },
  { tag: "SCONTO", title: "Sconto Tutete 50%", logo: "/images/tutete.png" },
  { tag: "CODICE EXTRA", title: "Codice sconto BENU Farma 10%", logo: "/images/benufarma.png" },
  { tag: "CODICE", title: "Coupon illy 15%", logo: "/images/illy.png" },
  { tag: "CODICE EXTRA", title: "Codice sconto Redcare 5€", logo: "/images/redcare.png" },
  { tag: "CODICE EXTRA", title: "Codice sconto TWINSET Milano 15%", logo: "/images/twinset.png" },
];

function CodeLists() {
  return (
    <section className="bg-[#724F70] py-12">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6">

        {/* Titles Row */}
        <div className="flex flex-col md:flex-row mb-5">
          <div className="w-full md:w-1/2">
            <h3 className="text-white text-center text-[19px] sm:text-[22px]">
              <span className="font-bold">Codici sconto</span> <span className="font-light">novità</span>
            </h3>
          </div>
          <div className="w-full md:w-1/2 hidden md:block">
            <h3 className="text-white text-center text-[19px] sm:text-[22px]">
              <span className="font-bold">Codici sconto</span> <span className="font-light">in scadenza</span>
            </h3>
          </div>
        </div>

        {/* Light Grey Background Container */}
        <div className="bg-[#f0f4f6] p-3 sm:p-4 rounded-md">
          <div className="flex flex-col md:flex-row gap-3 sm:gap-4">

            {/* Left Column: Nuovi */}
            <div className="w-full md:w-1/2 flex flex-col gap-2">
              {newCodes.map((item, index) => (
                <a key={index} href="#" className="bg-white flex items-center h-[76px] sm:h-[80px] hover:shadow-md transition-shadow group rounded-sm overflow-hidden">
                  <div className="w-[110px] sm:w-[130px] h-full flex-shrink-0 flex items-center justify-center p-3">
                    {/* TODO: Replace placeholder with original image if needed */}
                    <img src={item.logo} alt="Store Logo" className="max-h-[35px] max-w-[85px] object-contain" />
                  </div>

                  <div className="h-[55%] border-l border-dashed border-[#825a71] opacity-40"></div>

                  <div className="flex-1 pl-4 pr-3 py-2 flex flex-col justify-center">
                    <div className="text-[10px] font-bold text-[#825a71] uppercase tracking-wider mb-0.5">{item.tag}</div>
                    <div className="text-[12px] sm:text-[13px] text-gray-700 group-hover:text-[#825a71] transition-colors leading-tight line-clamp-2">{item.title}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Mobile Title for Right Column */}
            <div className="w-full md:hidden mt-4 mb-2">
              <h3 className="text-gray-800 text-center text-[18px]">
                <span className="font-bold">Codici sconto</span> <span className="font-light">in scadenza</span>
              </h3>
            </div>

            {/* Right Column: In Scadenza */}
            <div className="w-full md:w-1/2 flex flex-col gap-2">
              {expiringCodes.map((item, index) => (
                <a key={index} href="#" className="bg-white flex items-center h-[76px] sm:h-[80px] hover:shadow-md transition-shadow group rounded-sm overflow-hidden">
                  <div className="w-[110px] sm:w-[130px] h-full flex-shrink-0 flex items-center justify-center p-3">
                    {/* TODO: Replace placeholder with original image if needed */}
                    <img src={item.logo} alt="Store Logo" className="max-h-[35px] max-w-[85px] object-contain" />
                  </div>

                  <div className="h-[55%] border-l border-dashed border-[#825a71] opacity-40"></div>

                  <div className="flex-1 pl-4 pr-3 py-2 flex flex-col justify-center">
                    <div className="text-[10px] font-bold text-[#825a71] uppercase tracking-wider mb-0.5">{item.tag}</div>
                    <div className="text-[12px] sm:text-[13px] text-gray-700 group-hover:text-[#825a71] transition-colors leading-tight line-clamp-2">{item.title}</div>
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
