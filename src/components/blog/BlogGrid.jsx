"use client";

import React, { useState } from 'react';

const initialPosts = [
  {
    id: 1,
    title: "SOS Saldi Estivi",
    description: "È il momento per i saldi estivi, scopri i nostri sconti più validi della stagione.",
    image: "/images-page4/00af6c56afb7dc1d395679d6c0e885ed.jpg"
  },
  {
    id: 2,
    title: "Giardino smart",
    description: "Le luci che fanno per te e per il comfort delle tue sere estive del tuo giardino per goderti il fresco sera.",
    image: "/images-page4/011880d0ef11dbc889de30ad8596bdfd.jpg"
  },
  {
    id: 3,
    title: "Primavera del risparmio, come preparare casa e giardino per i primi caldi",
    description: "Inizia con il fare un po' di spesa online dei top brand per arredare la tua casa per l'estate senza stress.",
    image: "/images-page4/02593e72e3fc545714ca2653fde4a489.jpg"
  },
  {
    id: 4,
    title: "Pasqua last minute",
    description: "Sei un po' in ritardo per i tuoi regali di Pasqua o l'acquisto di colombe ed uova per il pranzo.",
    image: "/images-page4/03f523b2b719a7287e32521934276482.jpg"
  },
  {
    id: 5,
    title: "Il regalo perfetto per la Festa del Papà",
    description: "Questi sono i nostri consigli per farti trovare online il regalo perfetto per la Festa del Papà ed il tuo papà.",
    image: "/images-page4/05735db0f774c514a43daf02b09bc0e6.jpg"
  },
  {
    id: 6,
    title: "Amore sì, ma con lo sconto",
    description: "Che cosa c'è di più bello di un regalo da sognare, ma di fatto, approfitta dei nostri codici sconto e rendi felice anche il tuo budget.",
    image: "/images-page4/059421526868d044b0c4c7c62fab204c.jpg"
  },
  {
    id: 7,
    title: "Guida ai saldi invernali 2024",
    description: "Hai disperato prima e approfitta degli sconti invernali per la spesa online per rinnovare il tuo stile.",
    image: "/images-page4/05bdd24fe8ac8f291649f0026f9df050.jpg"
  },
  {
    id: 8,
    title: "Manuale di sopravvivenza ai regali di Natale (e ai parenti)",
    description: "Ecco come puoi sentirti felice nei regali di Natale, con idee per un regalo perfetto per ogni tipo di parente o amico.",
    image: "/images-page4/061986c79dca0a7fc1a4b485a9ccba10.jpg"
  },
  {
    id: 9,
    title: "Black Friday e Cyber Monday 2023",
    description: "Scopri che disastri si nascondono nel web online al tuo shopping per i tuoi Black Friday e del Cyber Monday.",
    image: "/images-page4/06a08ddfcc908435d1619ab0040e6b0d.jpg"
  },
  {
    id: 10,
    title: "Halloween da paura: un trucco e un mostro da leggenda",
    description: "Affronta le nostre strategie per preparare ed un dolcetto e scherzetto in tua casa una paurosa cena e fumiere e in testa.",
    image: "/images-page4/075e6dacf6278ae00d7de78d4ad9fd42.jpg"
  },
  {
    id: 11,
    title: "Ritorno a Scuola 2023: guida al risparmio per alunni e genitori",
    description: "Per tornare a scuola con stile, approfitta dei nostri sconti e delle offerte online su cartoleria, libri, dispo ed astucci ed zaino.",
    image: "/images-page4/07e3c72f475177e6be9844c3078fd85c.jpg"
  },
  {
    id: 12,
    title: "L'estate in un click",
    description: "Leggi il nostro blog per trovare le tue preferite per le tue giornate estive durante l'estate che sta arrivando.",
    image: "/images-page4/096b3f637cf0e6f44fb2fe70ddc25d43.jpg"
  }
];

// Duplicate the posts to simulate having a larger database of blogs
const allPosts = [
  ...initialPosts,
  ...initialPosts.map(p => ({ ...p, id: p.id + 12 }))
];

export default function BlogGrid() {
  const [visibleCount, setVisibleCount] = useState(12);

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 6, allPosts.length));
  };

  const hasMore = visibleCount < allPosts.length;

  return (
    <>
      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
        {allPosts.slice(0, visibleCount).map((post) => (
          <a href="#" key={post.id} className="bg-white flex flex-col shadow-sm group hover:shadow-md transition-shadow">
            <div className="w-full aspect-[16/9] relative overflow-hidden">
              {/* TODO: Replace placeholder with original image */}
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-[20px] flex-grow flex flex-col">
              <h3 className="text-accent text-[16px] font-bold mb-[8px] leading-snug group-hover:text-accent-hover transition-colors">
                {post.title}
              </h3>
              <p className="text-[#666666] text-[13px] leading-relaxed">
                {post.description}
              </p>
            </div>
          </a>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center mt-[40px] mb-[40px]">
          <button 
            onClick={handleLoadMore}
            className="bg-white border border-[#e5e5e5] text-[#666666] px-[20px] py-[8px] rounded-full text-[11px] font-bold uppercase tracking-wide flex items-center gap-[6px] hover:bg-gray-50 transition-colors shadow-sm cursor-pointer"
          >
            MOSTRA ALTRI
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
