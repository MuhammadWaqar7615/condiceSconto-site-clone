import React from 'react';
import ImageOfferCard from './ImageOfferCard';

const mockOffers = [
  {
    store: "SAMSUNG",
    discount: "OMAGGIO",
    title: "Promo Samsung Galaxy S26+ | Ultra per te Tab S10 FE in omaggio",
    dealUrl: "#",
    // TODO: Replace placeholder with original image
    image: "/images/samsung-prof.jpg",
    // TODO: Replace placeholder with original image
    logo: "/images/samsung.png"
  },
  {
    store: "MOVA",
    discount: "550€",
    labelTop: "FINO A",
    title: "Sconto MOVA 550€",
    dealUrl: "#",
    // TODO: Replace placeholder with original image
    image: "/images/mova3.jpg",
    // TODO: Replace placeholder with original image
    logo: "/images/mova.png"
  },
  {
    store: "Redcare",
    discount: "12%",
    title: "Codice sconto Lampade.it 12€",
    dealUrl: "#",
    // TODO: Replace placeholder with original image
    image: "/images/lampade7.jpg",
    // TODO: Replace placeholder with original image
    logo: "/images/lampade.png"
  },
  {
    store: "radissonhotels",
    labelTop: "FINO AL",
    discount: "10%",
    title: "Codice sconto Radisson Hotels 25% + 10% membri",
    dealUrl: "#",
    // TODO: Replace placeholder with original image
    image: "/images/radissonhotels.jpg",
    // TODO: Replace placeholder with original image
    logo: "/images/radissonhotels.png"
  },
  {
    store: "lastminute.com",
    discount: "50€",
    labelTop: "VOLO+HOTEL",
    title: "Codice sconto lastminute.com 50€ volo+hotel",
    dealUrl: "#",
    // TODO: Replace placeholder with original image
    image: "/images/lastminute.jpg",
    // TODO: Replace placeholder with original image
    logo: "/images/lastminute.png"
  },
  {
    store: "aquazoomania",
    discount: "5%",
    title: "Coupon aquaZooMania 5%",
    dealUrl: "#",
    // TODO: Replace placeholder with original image
    image: "/images/aquazoomania4.jpg",
    // TODO: Replace placeholder with original image
    logo: "/images/aquazoomania.png"
  },
  {
    store: "AirHelp",
    discount: "8%",
    title: "Codice sconto AirHelp 8% Smart",
    dealUrl: "#",
    // TODO: Replace placeholder with original image
    image: "/images/airhelp.jpg",
    // TODO: Replace placeholder with original image
    logo: "/images/airhelp.png"
  },
  {
    store: "bellaoggi",
    discount: "20%",
    title: "Codice sconto BELLAOGGI 20%",
    dealUrl: "#",
    // TODO: Replace placeholder with original image
    image: "/images/bellaoggi.jpg",
    // TODO: Replace placeholder with original image
    logo: "/images/bellaoggi.png"
  },
  {
    store: "shark ninja",
    discount: "10%",
    title: "Coupon SharkNinja 10%",
    dealUrl: "#",
    // TODO: Replace placeholder with original image
    image: "/images/sharkninja.jpg",
    // TODO: Replace placeholder with original image
    logo: "/images/sharkninja.png"
  },
];

function SecondaryOffers() {
  return (
    <section className="py-12 bg-[#787878]">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6">

        {/* 3x3 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {mockOffers.map((deal, index) => (
            <ImageOfferCard key={index} deal={deal} />
          ))}
        </div>

      </div>
    </section>
  );
}

export default SecondaryOffers;
