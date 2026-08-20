import React from 'react';
import DealCard from './DealCard';

const mockDeals = [
  {
    store: "Europcar",
    discount: "20%",
    type: "Fino al",
    title: "Codice Sconto del 20% su Auto",
    dealUrl: "#",
    logo: "/images/europcar.png"
  },
  {
    store: "LG",
    discount: "5%",
    type: "",
    title: "Sconto extra 5% su LG",
    dealUrl: "#",
    logo: "/images/mova.png"
  },
  {
    store: "Stylevana",
    discount: "22%",
    type: "",
    title: "Codice Sconto Stylevana 22% sui solari",
    dealUrl: "#",
    logo: "/images/stylevana.png"
  },
  {
    store: "Lenovo",
    discount: "3%",
    type: "Extra",
    title: "Codice sconto Lenovo 3%",
    dealUrl: "#",
    logo: "/images/flexispot.png"
  },
  {
    store: "ZenHotels",
    discount: "OFFERTA",
    type: "",
    title: "Scopri le Offerte ZenHotels",
    dealUrl: "#",
    logo: "/images/zenhotels.png"
  },
  {
    store: "IBS",
    discount: "20€",
    type: "",
    title: "Sconto 20€ su Libri",
    dealUrl: "#",
    logo: "/images/nencinisport.png"
  },
  {
    store: "Expedia",
    discount: "50%",
    type: "Fino al",
    title: "Risparmia fino al 50% su Expedia",
    dealUrl: "#",
    logo: "/images/expedia.png"
  },
  {
    store: "Norauto",
    discount: "8%",
    type: "",
    title: "Codice sconto Norauto 8%",
    dealUrl: "#",
    logo: "/images/rgmania.png"
  },
  {
    store: "Hostinger",
    discount: "75%",
    type: "Fino al",
    title: "Sconto 75% su Hosting",
    dealUrl: "#",
    logo: "/images/hostinger.png"
  }
];

function MosaicGrid() {
  return (
    <section className="py-10 bg-[#fafafa]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <div className="text-center mb-8 relative">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200 -z-10"></div>
          <h2 className="inline-block bg-[#fafafa] px-6 text-xl sm:text-2xl font-light text-gray-700">
            Offerte in evidenza
          </h2>
        </div>

        {/* 3x3 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {mockDeals.map((deal, index) => (
            <DealCard key={index} deal={deal} />
          ))}
        </div>

      </div>
    </section>
  );
}

export default MosaicGrid;