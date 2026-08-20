import React from 'react';
import DealCard from './DealCard';

const mockRemainingDeals = [
  {
    merchantId: 1,
    name: "Nike",
    logo: "/images/nike.png",
    dealUrl: "#",
    discount: "FINO AL 50%",
    title: "Offerte del giorno su Nike"
  },
  {
    merchantId: 2,
    name: "Expedia",
    logo: "/images/expedia.png",
    dealUrl: "#",
    discount: "20€",
    title: "Sconto di 20€ su voli e hotel"
  },
  {
    merchantId: 3,
    name: "Nencini Sport",
    logo: "/images/nencinisport.png",
    dealUrl: "#",
    discount: "15% EXTRA",
    title: "Codice sconto 15% su abbigliamento sportivo"
  },
  {
    merchantId: 4,
    name: "Lastminute",
    logo: "/images/lastminute.png",
    dealUrl: "#",
    discount: "10%",
    title: "Risparmia il 10% sui pacchetti vacanza"
  },
  {
    merchantId: 5,
    name: "Shein",
    logo: "/images/shein.png",
    dealUrl: "#",
    discount: "SPEDIZIONE GRATIS",
    title: "Spedizione gratuita su tutti gli ordini"
  },
  {
    merchantId: 6,
    name: "Mova",
    logo: "/images/mova.png",
    dealUrl: "#",
    discount: "FINO AL 20%",
    title: "Offerte speciali: risparmia fino al 20%"
  },
];

function RemainingDealsSection() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Ultime <span className="text-blue-600">Offerte</span>
          </h2>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {mockRemainingDeals.map((deal, index) => (
            <DealCard key={index} deal={deal} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-12 text-center">
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-8 rounded-full transition-colors border border-gray-300">
            Vedi tutte le offerte
          </button>
        </div>

      </div>
    </section>
  );
}

export default RemainingDealsSection;