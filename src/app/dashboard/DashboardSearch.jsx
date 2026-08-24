"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useCallback, useEffect } from "react";

const alphabetLetters = ["#", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

export default function DashboardSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [search, setSearch] = useState("");
  const currentLetter = searchParams.get("letter") || "";

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  const updateParams = useCallback(
    (key, value) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router]
  );

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateParams("search", search);
  };

  return (
    <div className="mb-6 space-y-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
      <form onSubmit={handleSearchSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Search stores by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#835674] focus:border-transparent outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-[#835674] text-white rounded-lg text-sm font-medium hover:bg-[#6c4660] transition-colors"
        >
          Search
        </button>
        {searchParams.has("search") && (
          <button
            type="button"
            onClick={() => {
              setSearch("");
              updateParams("search", "");
            }}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            Clear
          </button>
        )}
      </form>

      <div>
        <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Filter Alphabetically</div>
        <div className="flex flex-wrap gap-1">
          <button
            onClick={() => updateParams("letter", "")}
            className={`px-3 py-1 text-xs font-medium rounded border ${!currentLetter ? "bg-[#835674] text-white border-[#835674]" : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"}`}
          >
            All
          </button>
          {alphabetLetters.map((letter) => (
            <button
              key={letter}
              onClick={() => updateParams("letter", letter)}
              className={`px-3 py-1 text-xs font-medium rounded border ${currentLetter === letter ? "bg-[#835674] text-white border-[#835674]" : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"}`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
