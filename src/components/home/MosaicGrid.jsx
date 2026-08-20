import React from 'react';
import DealCard from './DealCard';

const mockDeals = [
  {
    store: "assaperlo.com",
    discount: "10%",
    title: "Sconto Assaperlo.com 10% assicurazione nazionale e internazionale",
    dealUrl: "#",
    // TODO: Replace placeholder with original image
    logo: "/images/assaperlo.png"
  },
  {
    store: "exNovo computer",
    discount: "3%",
    labelBottom: "EXTRA",
    title: "Codice sconto ExNovo Computer 3%",
    dealUrl: "#",
    // TODO: Replace placeholder with original image
    logo: "/images/exnovocomputer.png"
  },
  {
    store: "TRAINPAL",
    discount: "70%",
    labelTop: "FINO AL",
    title: "Sconto TrainPal 70% treni Italia",
    dealUrl: "#",
    // TODO: Replace placeholder with original image
    logo: "/images/trainpal.png"
  },
  {
    store: "Lene",
    discount: "OFFERTA",
    title: "Offerta Lene luce 100% energia rinnovabile",
    dealUrl: "#",
    // TODO: Replace placeholder with original image
    logo: "/images/lene.png"
  },
  {
    store: "TITANO SPORT",
    discount: "8%",
    labelBottom: "EXTRA",
    title: "Codice sconto Titano Sport 8%",
    dealUrl: "#",
    // TODO: Replace placeholder with original image
    logo: "/images/titanosport.png"
  },
  {
    store: "acer store",
    discount: "10%",
    title: "Codice sconto Acer 10% schede grafiche & archiviazione",
    dealUrl: "#",
    // TODO: Replace placeholder with original image
    logo: "/images/acer.png"
  },
  {
    store: "Europcar",
    discount: "20%",
    labelTop: "FINO AL",
    title: "Sconto Europcar 20% Italia",
    dealUrl: "#",
    // TODO: Replace placeholder with original image
    logo: "/images/europcar.png"
  },
  {
    store: "volagratis",
    discount: "50€",
    title: "Codice sconto Volagratis 50€ volo+hotel",
    dealUrl: "#",
    // TODO: Replace placeholder with original image
    logo: "/images/volagratis.png"
  },
  {
    store: "Walt Disney World",
    discount: "25%",
    labelTop: "FINO AL",
    title: "Sconto Walt Disney World 25%",
    dealUrl: "#",
    // TODO: Replace placeholder with original image
    logo: "/images/waltdisneyworld.png"
  }
];

function MosaicGrid() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6">

        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-[30px] font-light text-gray-500">
            Offerte in evidenza
          </h2>
        </div>

        {/* 3x3 Grid Wrapper */}
        <div className="bg-[#e9ecef] p-3 sm:p-4 rounded-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {mockDeals.map((deal, idx) => (
              <DealCard key={idx} deal={deal} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default MosaicGrid;