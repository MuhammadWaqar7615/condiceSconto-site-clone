import React from 'react';
import ImageOfferCard from './ImageOfferCard';

const mockOffers = [
  {
    store: "MOVA",
    discount: "550€",
    type: "Fino a",
    title: "Codice sconto MOVA 550€",
    dealUrl: "#",
    image: "/images/mova3.jpg",
    logo: "/images/mova.png"
  },
  {
    store: "Store 2",
    discount: "20%",
    type: "",
    title: "Codice Sconto del 20%",
    dealUrl: "#",
    image: "/images/flexispot6.jpg",
    logo: "/images/flexispot.png"
  },
  {
    store: "Samsung",
    discount: "10%",
    type: "",
    title: "Risparmia il 10% sui prodotti Samsung Galaxy",
    dealUrl: "#",
    image: "/images/sony2.jpg",
    logo: "/images/sony.png"
  },
  {
    store: "Dreame",
    discount: "900€",
    type: "Fino a",
    title: "Sconto fino a 900€",
    dealUrl: "#",
    image: "/images/dreame7.jpg",
    logo: "/images/placeholder.png"
  },
  {
    store: "Store 5",
    discount: "20%",
    type: "",
    title: "Sconto extra 20%",
    dealUrl: "#",
    image: "/images/flextax7.jpg",
    logo: "/images/flextax.png"
  },
  {
    store: "Klook",
    discount: "5%",
    type: "",
    title: "Codice sconto Klook 5%",
    dealUrl: "#",
    image: "/images/mobilifiver.jpg",
    logo: "/images/mobilifiver.png"
  },
  {
    store: "Store 7",
    discount: "10%",
    type: "Fino al",
    title: "Sconto fino al 10%",
    dealUrl: "#",
    image: "/images/hostinger9.jpg",
    logo: "/images/hostinger.png"
  },
  {
    store: "Huawei",
    discount: "10%",
    type: "",
    title: "Codice sconto HUAWEI 10%",
    dealUrl: "#",
    image: "/images/leroymerlin4.jpg",
    logo: "/images/leroymerlin.png"
  },
  {
    store: "Lastminute.com",
    discount: "50€",
    type: "",
    title: "Codice promozionale lastminute.com 50€ sui voli",
    dealUrl: "#",
    image: "/images/pulsee.jpg",
    logo: "/images/pulsee.png"
  }
];

function SecondaryOffers() {
  return (
    <section className="py-10 bg-[#5c5c5c]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 3x3 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 md:gap-4 lg:gap-6">
          {mockOffers.map((deal, index) => (
            <ImageOfferCard key={index} deal={deal} />
          ))}
        </div>

      </div>
    </section>
  );
}

export default SecondaryOffers;
