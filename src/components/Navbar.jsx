"use client";

import React, { useState } from 'react';
import Link from 'next/link';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-[100px]">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center h-full py-2">
            <Link href="/" className="flex items-center h-full">
              {/* TODO: Replace placeholder with original image */}
              <img
                src="/images/logo.png"
                alt="CodiceSconto Logo"
                className="h-10 w-auto object-contain hidden sm:block"
              />
              {/* Mobile logo */}
              {/* TODO: Replace placeholder with original image */}
              <img
                src="/images/placeholder.png"
                alt="CodiceSconto Logo Mobile"
                className="h-8 object-contain sm:hidden"
              />
            </Link>
          </div>

          {/* Search */}
          <div className="flex-1 mx-4 lg:mx-8 max-w-[450px]">
            <form className="w-full flex relative" action="/cerca">
              <input
                type="text"
                name="q"
                placeholder="Cerca su CodiceSconto"
                className="w-full border border-gray-200 rounded-sm py-2 px-4 pr-10 focus:outline-none focus:ring-1 focus:ring-[#78546b] focus:border-[#78546b] text-[13px] text-gray-700 placeholder-gray-400 bg-[#fbfbfb]"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 bottom-0 text-gray-600 w-10 flex items-center justify-center hover:text-[#78546b]"
                aria-label="Cerca"
              >
                <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:items-center space-x-5">
            <Link href="/negozi" className="text-[#78546b] hover:text-[#68485d] text-[11px] font-bold uppercase tracking-wide">Negozi</Link>
            <Link href="/categorie" className="text-[#666666] hover:text-[#78546b] text-[11px] font-bold uppercase tracking-wide">Categorie</Link>
            <Link href="/blog" className="text-[#666666] hover:text-[#78546b] text-[11px] font-bold uppercase tracking-wide">Blog</Link>

            <div className="flex items-center space-x-2 ml-2">
              <Link href="/aggiungi-negozio" className="border border-[#78546b] text-[#78546b] px-3 py-1.5 rounded-sm text-[11px] font-bold uppercase tracking-wide hover:bg-gray-50 transition-colors">
                Aggiungi negozio
              </Link>
              <Link href="/account/login" className="bg-[#78546b] text-white px-4 py-1.5 rounded-sm text-[11px] font-bold uppercase tracking-wide hover:bg-[#68485d] transition-colors">
                Accedi
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-[#78546b] focus:outline-none p-2"
              aria-label="Apri/Chiudi menù"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <Link href="/negozi" className="block px-3 py-3 rounded-md text-[13px] font-bold uppercase text-gray-800 hover:text-[#78546b] hover:bg-gray-50 border-b border-gray-100">Negozi</Link>
            <Link href="/categorie" className="block px-3 py-3 rounded-md text-[13px] font-bold uppercase text-gray-800 hover:text-[#78546b] hover:bg-gray-50 border-b border-gray-100">Categorie</Link>
            <Link href="/blog" className="block px-3 py-3 rounded-md text-[13px] font-bold uppercase text-gray-800 hover:text-[#78546b] hover:bg-gray-50 border-b border-gray-100">Blog</Link>
            <Link href="/aggiungi-negozio" className="block px-3 py-3 rounded-md text-[13px] font-bold uppercase text-[#78546b] hover:bg-gray-50 border-b border-gray-100">Aggiungi negozio</Link>
            <Link href="/account/login" className="block text-center mt-3 bg-[#78546b] text-white px-3 py-3 rounded-sm text-[13px] font-bold uppercase hover:bg-[#68485d]">
              Accedi
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;