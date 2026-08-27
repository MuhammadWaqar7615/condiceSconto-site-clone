"use client";

import React, { startTransition, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AUTH_TOKEN_STORAGE_KEY } from '@/config/auth';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    startTransition(() => {
      setIsAuthenticated(Boolean(window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)));
    });
  }, []);

  /**
   * Returns the appropriate text color class for a nav link
   * based on whether it matches the current route.
   */
  const getNavLinkClass = (href) => {
    const isActive = pathname === href || pathname.startsWith(href + '/');
    return isActive
      ? "text-accent hover:text-accent-hover text-[12px] font-bold uppercase tracking-wide"
      : "text-[#666666] hover:text-accent text-[12px] font-bold uppercase tracking-wide";
  };

  return (
    <nav className="bg-white shadow-sm border-b border-[#eaeaea]">
      <div className="max-w-[1200px] h-[100px] mx-auto pt-4 px-4 sm:px-6">
        <div className="flex justify-between items-center h-[70px]">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center h-full py-2">
            <Link href="/" className="flex items-center h-full" onClick={() => setIsOpen(false)}>
              <img
                src="/images/logo.png"
                alt="CodiceSconto Logo"
                className="h-[40px] w-auto object-contain hidden sm:block"
              />
              {/* Mobile logo */}
              {/* TODO: Replace placeholder with original image */}
              {/* <img
                src="/images/placeholder.png"
                alt="CodiceSconto Logo Mobile"
                className="h-8 object-contain sm:hidden"
              /> */}
            </Link>
          </div>

          {/* Search */}
          <div className="flex-1 mx-4 lg:mx-8 max-w-[450px]">
            <form className="w-full flex relative" action="/cerca">
              <input
                type="text"
                name="q"
                placeholder="Cerca su CodiceSconto"
                className="w-full border border-[#e5e5e5] rounded-[3px] py-[8px] px-4 pr-10 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent text-[13px] text-gray-700 placeholder-gray-400 bg-[#fbfbfb]"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 bottom-0 text-gray-500 w-10 flex items-center justify-center hover:text-accent"
                aria-label="Cerca"
              >
                <svg className="h-[16px] w-[16px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:items-center space-x-[24px]">
            <Link href="/negozi" className={getNavLinkClass("/negozi")}>Negozi</Link>
            <Link href="/offerte" className={getNavLinkClass("/offerte")}>Offerte</Link>
            <Link href="/blog" className={getNavLinkClass("/blog")}>Blog</Link>

            <div className="flex items-center space-x-[8px] pl-[8px]">
              <Link href="/aggiungi-negozio" className="border border-accent text-accent px-[12px] py-[6px] rounded-[3px] text-[11px] font-bold uppercase tracking-wide hover:bg-[#fcfafb] transition-colors">
                Aggiungi negozio
              </Link>
              <Link href={isAuthenticated ? "/dashboard" : "/account/login"} className="bg-primary-dark text-white px-[16px] py-[7px] rounded-[3px] text-[11px] font-bold uppercase tracking-wide hover:bg-primary-dark-hover transition-colors">
                {isAuthenticated ? "Dashboard" : "Accedi"}
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-accent focus:outline-none p-2"
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
        <div className="lg:hidden bg-white border-t border-gray-200 absolute w-full shadow-lg z-50">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <Link href="/negozi" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-md text-[13px] font-bold uppercase text-gray-800 hover:text-accent hover:bg-gray-50 border-b border-gray-100">Negozi</Link>
            <Link href="/offerte" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-md text-[13px] font-bold uppercase text-gray-800 hover:text-accent hover:bg-gray-50 border-b border-gray-100">Offerte</Link>
            <Link href="/blog" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-md text-[13px] font-bold uppercase text-gray-800 hover:text-accent hover:bg-gray-50 border-b border-gray-100">Blog</Link>
            <Link href="/aggiungi-negozio" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-md text-[13px] font-bold uppercase text-accent hover:bg-gray-50 border-b border-gray-100">Aggiungi negozio</Link>
            <Link href={isAuthenticated ? "/dashboard" : "/account/login"} onClick={() => setIsOpen(false)} className="block text-center mt-3 bg-primary-dark text-white px-3 py-3 rounded-sm text-[13px] font-bold uppercase hover:bg-primary-dark-hover">
              {isAuthenticated ? "Dashboard" : "Accedi"}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;