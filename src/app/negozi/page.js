"use client";

import React, { useState, Suspense, useEffect, useCallback } from "react";
import { stores, alphabetLetters } from "@/data/stores/storesData";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

function NegoziContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [isCashbackOnly, setIsCashbackOnly] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState(null);

  // Sync state with URL params on mount and when params change
  useEffect(() => {
    setIsCashbackOnly(searchParams.get("cashback") === "true");
    setSelectedLetter(searchParams.get("letter") || null);
  }, [searchParams]);

  // Update URL params which in turn updates state via the effect
  const updateParams = useCallback((updates) => {
    const params = new URLSearchParams(searchParams.toString());

    if (updates.letter !== undefined) {
      if (updates.letter === null) params.delete("letter");
      else params.set("letter", updates.letter);
    }

    if (updates.cashback !== undefined) {
      if (updates.cashback === false) params.delete("cashback");
      else params.set("cashback", "true");
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, router, pathname]);

  // Exact store counts from the screenshots
  const countsAll = {
    "#": 27, "A": 238, "B": 210, "C": 322, "D": 116, "E": 161, "F": 211, "G": 106,
    "H": 100, "I": 121, "J": 23, "K": 23, "L": 157, "M": 217, "N": 98, "O": 63,
    "P": 282, "Q": 10, "R": 99, "S": 248, "T": 114, "U": 41, "V": 121, "W": 45,
    "X": 5, "Y": 20, "Z": 17
  };

  const countsCashback = {
    "#": 6, "A": 87, "B": 81, "C": 113, "D": 39, "E": 60, "F": 82, "G": 34,
    "H": 33, "I": 42, "J": 5, "K": 8, "L": 50, "M": 69, "N": 31, "O": 29,
    "P": 82, "Q": 4, "R": 27, "S": 89, "T": 38, "U": 17, "V": 39, "W": 15,
    "X": 1, "Y": 6, "Z": 6
  };

  const alphabetLayout = [
    ["#", "A", "B", "C", "D", "E"],
    ["F", "G", "H", "I", "J", "K"],
    ["L", "M", "N", "O", "P", "Q"],
    ["R", "S", "T", "U", "V", "W"],
    ["X", "Y", "Z"]
  ];

  // Group stores by first letter
  const groupedStores = {};
  alphabetLetters.forEach(letter => {
    groupedStores[letter] = [];
  });

  // For UI simulation, we just filter deterministically for cashback view so it visibly changes
  const baseStores = isCashbackOnly ? stores.filter((s, i) => i % 3 === 0) : stores;
  const storeCountTotal = isCashbackOnly ? 1191 : 3568;

  baseStores.forEach((store) => {
    const firstChar = store.name.charAt(0).toUpperCase();
    if (/[A-Z]/.test(firstChar)) {
      if (!groupedStores[firstChar]) groupedStores[firstChar] = [];
      groupedStores[firstChar].push(store);
    } else {
      if (!groupedStores["#"]) groupedStores["#"] = [];
      groupedStores["#"].push(store);
    }
  });

  // Sort each group
  Object.keys(groupedStores).forEach(key => {
    groupedStores[key].sort((a, b) => a.name.localeCompare(b.name));
  });

  // Determine subnavbar title
  const getSubnavTitle = () => {
    if (selectedLetter) {
      return isCashbackOnly
        ? `Negozi cashback che iniziano per ${selectedLetter}`
        : `Negozi che iniziano per ${selectedLetter}`;
    }
    return isCashbackOnly ? "Negozi cashback" : "Tutti i negozi";
  };

  return (
    <>
      {/* Sub-navbar */}
      <div className="bg-[#835674] w-full py-4">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex justify-between items-center">
          <h1
            className="text-white text-2xl font-light cursor-pointer hover:underline"
            onClick={() => {
              updateParams({ letter: null, cashback: false });
            }}
          >
            {getSubnavTitle()}
          </h1>
          <button
            onClick={() => {
              updateParams({ cashback: !isCashbackOnly, letter: null });
            }}
            className="text-white/80 hover:text-white text-sm cursor-pointer transition-colors font-medium"
          >
            {isCashbackOnly ? "Tutti i negozi" : "Solo negozi cashback"}
          </button>
        </div>
      </div>

      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-4 py-4">
        <div className="flex flex-col md:flex-row gap-6">

          {/* Left Sidebar - Alphabet Filter */}
          <div className="w-full md:w-[300px] shrink-0">
            <div className="bg-white rounded-sm shadow-sm p-6 sticky top-6">
              <div
                className="text-[17px] text-gray-700 font-light mb-4 pb-4 border-b border-gray-100 cursor-pointer hover:text-[#835674] transition-colors"
                onClick={() => updateParams({ letter: null })}
              >
                Tutti i <strong className="text-[#835674] font-bold">{storeCountTotal}</strong> negozi
              </div>
              <div className="grid grid-cols-6 gap-y-3 gap-x-1 text-center text-[15px] font-medium text-gray-800">
                {alphabetLayout.map((row, rowIndex) => (
                  <React.Fragment key={rowIndex}>
                    {row.map((letter) => (
                      <button
                        key={letter}
                        onClick={() => updateParams({ letter })}
                        className={`hover:text-[#835674] cursor-pointer hover:font-bold transition-colors block py-1 ${selectedLetter === letter ? 'text-[#835674] font-bold' : ''
                          }`}
                      >
                        {letter}
                      </button>
                    ))}
                    {/* Fill empty grid cells if the row has less than 6 items (e.g. X Y Z) */}
                    {Array.from({ length: 6 - row.length }).map((_, i) => (
                      <div key={`empty-${rowIndex}-${i}`}></div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Right Main Content - Store Badges */}
          <div className="flex-1 flex flex-col space-y-6">
            {alphabetLetters
              .filter(letter => !selectedLetter || letter === selectedLetter)
              .map((letter) => {
                const allLetterStores = groupedStores[letter];
                if (!allLetterStores || allLetterStores.length === 0) return null;

                // Use actual numbers from our manual mapping
                const totalCountForLetter = isCashbackOnly
                  ? (countsCashback[letter] || allLetterStores.length)
                  : (countsAll[letter] || allLetterStores.length);

                // Universally pad the array up to the hardcoded total count
                let paddedBadges = [...allLetterStores];
                while (paddedBadges.length < totalCountForLetter) {
                  const storeToCopy = allLetterStores[paddedBadges.length % allLetterStores.length]
                    || { name: `Store Placeholder ${paddedBadges.length}` };
                  paddedBadges.push(storeToCopy);
                }
                paddedBadges = paddedBadges.slice(0, totalCountForLetter);

                // Determine display array based on mode
                let displayedBadges = paddedBadges;
                if (!selectedLetter) {
                  // Preview mode limit: 4 for cashback, 8 for all
                  const previewLimit = isCashbackOnly ? 4 : 8;
                  displayedBadges = paddedBadges.slice(0, previewLimit);
                }

                return (
                  <div key={letter} id={`section-${letter === "#" ? "hash" : letter}`} className="scroll-mt-4">
                    {/* Section Header */}
                    <div className="flex items-center mb-3 shadow-sm rounded-sm overflow-hidden h-10">
                      <div className="bg-[#835674] text-white w-12 h-full flex items-center justify-center font-bold text-sm">
                        {letter}
                      </div>
                      <div className="bg-white flex-1 h-full flex items-center justify-end px-4 text-xs font-light">
                        {/* If in preview mode, make this text a button that expands the section */}
                        {!selectedLetter ? (
                          <button
                            className="text-gray-500 cursor-pointer hover:text-[#835674] transition-colors"
                            onClick={() => updateParams({ letter })}
                          >
                            Tutti i <strong className="text-[#835674] font-bold mx-1">{totalCountForLetter}</strong> {isCashbackOnly ? "negozi cashback" : "negozi"}
                          </button>
                        ) : (
                          <span className="text-gray-500">
                            Tutti i <strong className="text-[#835674] font-bold mx-1">{totalCountForLetter}</strong> {isCashbackOnly ? "negozi cashback" : "negozi"}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Stores Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                      {displayedBadges.map((store, index) => (
                        <a
                          key={`${store.slug || store.name}-${index}`}
                          href={`/store/${store.slug}`}
                          className="bg-white border border-transparent hover:border-gray-200 rounded-sm shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col items-center justify-center h-[120px] group"
                        >
                          <div className="h-12 w-full relative flex items-center justify-center mb-3">
                            {store.logoPath ? (
                              <img
                                src={store.logoPath}
                                alt={`Logo ${store.name}`}
                                className="max-h-full max-w-full object-contain"
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center bg-gray-50 text-gray-400 text-xs text-center p-2 rounded">
                                {/* TODO: Replace placeholder with original image */}
                                No Logo
                              </div>
                            )}
                          </div>
                          <span className="text-gray-500 text-[13px] text-center group-hover:text-[#835674] transition-colors line-clamp-1 w-full">
                            {store.name}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>

        </div>
      </div>
    </>
  );
}

export default function NegoziPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f0f2f5]">
      <Navbar />
      <Suspense fallback={<div className="p-8 text-center text-gray-500">Caricamento...</div>}>
        <NegoziContent />
      </Suspense>
      <Footer />
    </div>
  );
}
