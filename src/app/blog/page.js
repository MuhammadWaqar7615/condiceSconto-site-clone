import React from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogGrid from "@/components/blog/BlogGrid";

export const metadata = {
  title: "Blog - CodiceSconto",
  description: "Articoli e consigli per risparmiare con i codici sconto",
};

const featuredPost = {
  title: "Zaino di serie TV: ecco cosa mettere nel tuo zaino",
  description: "Inizia il nuovo anno scolastico con il piede giusto, approfitta dei nostri codici sconto per risparmiare su tutto il materiale scolastico e universitario.",
  image: "/images-page4/00921efd1d861f0a3987c033c443a5d8.jpg",
  url: "#"
};

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      
      {/* Page Header (Full Width) */}
      <div className="w-full bg-primary-dark">
        <div className="max-w-[1000px] mx-auto px-4 py-[16px]">
          <h1 className="text-white text-[24px] font-medium tracking-wide">
            Tutti gli articoli
          </h1>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-grow w-full bg-main">
        <div className="max-w-[1000px] mx-auto px-4 pt-[32px] pb-[40px]">
          
          {/* Featured Post */}
          <div className="bg-white flex flex-col md:flex-row w-full mb-[32px] shadow-sm">
            {/* Image Side */}
            <div className="w-full md:w-[55%] relative">
              {/* TODO: Replace placeholder with original image */}
              <img 
                src={featuredPost.image} 
                alt={featuredPost.title} 
                className="w-full h-full object-cover min-h-[300px]"
              />
            </div>
            {/* Content Side */}
            <div className="w-full md:w-[45%] flex flex-col justify-center items-center text-center p-[40px]">
              <h2 className="text-[#333333] text-[22px] font-bold mb-[16px] leading-tight">
                {featuredPost.title}
              </h2>
              <p className="text-[#666666] text-[14px] leading-relaxed max-w-[90%]">
                {featuredPost.description}
              </p>
              <a 
                href={featuredPost.url}
                className="mt-[24px] bg-accent text-white px-[24px] py-[10px] rounded-[3px] text-[12px] font-bold uppercase tracking-wide hover:bg-accent-hover transition-colors inline-block"
              >
                Leggi l'articolo
              </a>
            </div>
          </div>

          {/* Interactive Posts Grid */}
          <BlogGrid />

          {/* Breadcrumb */}
          <div className="text-[12px] text-[#999999] pt-[20px] border-t border-[#eaeaea]">
            CodiceSconto {'>'} Articoli
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
