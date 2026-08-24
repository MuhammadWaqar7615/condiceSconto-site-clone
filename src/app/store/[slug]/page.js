import React from "react";
import { notFound } from "next/navigation";
import { stores } from "@/data/stores/storesData";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";


export function generateStaticParams() {
  return stores.map((store) => ({
    slug: store.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const store = stores.find((s) => s.slug === slug);
  
  if (!store) {
    return {
      title: "Store Not Found | CodiceSconto",
    };
  }

  return {
    title: `${store.name} Offerte e Codici Sconto | CodiceSconto`,
    description: `Scopri le migliori offerte e codici sconto per ${store.name}.`,
  };
}

export default async function StorePage({ params }) {
  const { slug } = await params;
  const store = stores.find((s) => s.slug === slug);

  if (!store) {
    notFound();
  }

  const storeProducts = [
    {
      type: "CODICE",
      discount: "10%",
      title: `Codice sconto ${store.name} 10% su tutto il catalogo`,
      description: `Applica questo codice nel carrello per ottenere il 10% di sconto su tutti i prodotti ${store.name}. Offerta valida solo online.`,
      expires: "Scade tra 3 giorni",
      verified: true,
    },
    {
      type: "OFFERTA",
      discount: "50€",
      title: `Sconto ${store.name} di 50€ sui nuovi arrivi`,
      description: `Scopri la nuova collezione e risparmia 50€ sui tuoi acquisti superiori a 150€. Sconto applicato in automatico al checkout.`,
      expires: "Scade il 31/12/2026",
      verified: true,
    },
    {
      type: "SPEDIZIONE",
      discount: "GRATIS",
      title: `Spedizione Gratuita su ${store.name}`,
      description: `Ottieni la spedizione gratuita su tutti gli ordini effettuati oggi. Non è richiesto un acquisto minimo.`,
      expires: "Fino a esaurimento scorte",
      verified: true,
    },
    {
      type: "SCONTO",
      discount: "20%",
      title: `Extra sconto del 20% nella sezione Outlet`,
      description: `Non perdere l'occasione di risparmiare un ulteriore 20% sui prodotti già scontati nell'area outlet del sito.`,
      expires: "Scade domani",
      verified: false,
    },
    {
      type: "REGALO",
      discount: "OMAGGIO",
      title: `Ricevi un omaggio esclusivo con il tuo ordine ${store.name}`,
      description: `Effettua un ordine di almeno 50€ e riceverai un omaggio esclusivo a sorpresa all'interno del tuo pacco.`,
      expires: "Senza scadenza",
      verified: true,
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f0f2f5]">
      <Navbar />
      
      {/* Breadcrumb Area */}
      <div className="bg-[#835674] w-full py-3">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-white/80 text-[13px] flex items-center gap-2 font-light">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span>&gt;</span>
            <a href="/negozi" className="hover:text-white transition-colors">Negozi</a>
            <span>&gt;</span>
            <span className="text-white font-medium">{store.name}</span>
          </div>
        </div>
      </div>

      <main className="flex-grow w-full max-w-[1200px] mx-auto px-4 py-8">
        
        <div className="flex flex-col md:flex-row gap-6">
          
          {/* Left Sidebar - Store Info */}
          <div className="w-full md:w-[300px] shrink-0">
            <div className="bg-white rounded-sm shadow-sm p-6 sticky top-6 border border-gray-100 flex flex-col items-center">
              <div className="w-[180px] h-[100px] flex items-center justify-center p-2 mb-4">
                <img 
                  src={store.logoPath} 
                  alt={`${store.name} logo`} 
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              </div>
              <h1 className="text-xl font-bold text-gray-800 mb-2 text-center">{store.name}</h1>
              <p className="text-[13px] text-gray-500 text-center mb-6 leading-relaxed">
                Scopri tutte le offerte, i prodotti e i codici sconto attivi per acquistare su {store.name} al miglior prezzo.
              </p>
              
              <div className="w-full flex justify-between text-[13px] text-gray-500 border-t border-gray-100 pt-4">
                <span>Offerte attive:</span>
                <span className="font-bold text-[#835674] bg-[#f8f4f7] px-2 py-0.5 rounded-sm">{storeProducts.length}</span>
              </div>
            </div>
          </div>

          {/* Right Main Content - Products / Deals List */}
          <div className="flex-1 flex flex-col space-y-5">
            
            <h2 className="text-[22px] font-light text-gray-800 mb-2">
              Codici Sconto e Offerte <strong className="font-bold text-[#835674]">{store.name}</strong>
            </h2>

            {storeProducts.map((product, index) => (
              <div key={index} className="bg-white rounded-sm shadow-sm border border-transparent hover:border-gray-200 hover:shadow-md transition-all flex flex-col sm:flex-row overflow-hidden group">
                
                {/* Left Discount Badge */}
                <div className="w-full sm:w-[140px] bg-[#f8f9fa] sm:border-r border-gray-100 flex flex-col items-center justify-center p-4 flex-shrink-0 group-hover:bg-[#f8f4f7] transition-colors">
                  <span className="text-[11px] font-bold text-[#835674] uppercase tracking-wider mb-1">{product.type}</span>
                  <span className="text-[26px] font-bold text-gray-800 leading-none text-center tracking-tight">{product.discount}</span>
                </div>

                {/* Middle Content */}
                <div className="flex-1 p-5 flex flex-col justify-center">
                  <h3 className="text-[16px] font-bold text-[#333] mb-2 hover:text-[#835674] cursor-pointer transition-colors leading-tight">
                    {product.title}
                  </h3>
                  <p className="text-[13.5px] text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center text-[12px] text-gray-500 gap-4 mt-auto">
                    {product.verified && (
                      <span className="flex items-center gap-1.5 text-green-600 font-medium">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                        Verificato
                      </span>
                    )}
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {product.expires}
                    </span>
                  </div>
                </div>

                {/* Right Action Button */}
                <div className="w-full sm:w-[170px] p-5 flex items-center justify-center border-t sm:border-t-0 sm:border-l border-gray-100">
                  <button className="w-full bg-[#835674] hover:bg-[#724F70] text-white text-[13px] font-bold py-[12px] px-2 rounded-sm transition-colors shadow-sm uppercase tracking-wider">
                    Vedi l'offerta
                  </button>
                </div>

              </div>
            ))}
            
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
