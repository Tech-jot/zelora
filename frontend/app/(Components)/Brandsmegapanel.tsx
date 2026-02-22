"use client";

import { Brand } from "@/lib/services/brand";
import { SearchOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRef, useState } from "react";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

interface BrandsMegaPanelProps {
  brandsData: Brand[];
}

// Group Brand[] into Record<string, Brand[]> by first letter of name
function groupByLetter(brands: Brand[]): Record<string, Brand[]> {
  return brands.reduce<Record<string, Brand[]>>((acc, brand) => {
    const letter = brand.name.charAt(0).toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(brand);
    return acc;
  }, {});
}

export function BrandsMegaPanel({ brandsData }: BrandsMegaPanelProps) {
  const [search, setSearch] = useState("");
  const [activeLetter, setActive] = useState("A");
  const listRef = useRef<HTMLDivElement>(null);

  const isSearching = search.trim().length > 0;

  const filtered = isSearching
    ? brandsData.filter((b) =>
        b.name.toLowerCase().includes(search.toLowerCase())
      )
    : brandsData;

  const displayData = groupByLetter(filtered);

  const scrollToLetter = (letter: string) => {
    setActive(letter);
    if (isSearching) return;
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-letter="${letter}"]`
    );
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      className="mega-panel-inline bg-white shadow-[0_8px_32px_rgba(0,0,0,0.13)] border border-gray-200 rounded-2xl overflow-hidden"
      style={{ width: "500px" }}
    >
      {/* Two-column layout */}
      <div className="flex" style={{ height: "300px" }}>
        {/* LEFT — fixed 185px */}
        <div
          className="flex flex-col gap-3 p-4 border-r border-gray-100"
          style={{ width: "185px", minWidth: "185px", flexShrink: 0 }}
        >
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="brands-search w-full h-9 pl-3.5 pr-8 rounded-full border border-gray-200 bg-white text-[12.5px] text-gray-800 placeholder-gray-400 outline-none focus:border-gray-400 transition-colors"
            />
            <SearchOutlined
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              style={{ fontSize: 13 }}
            />
          </div>

          {/* A–Z grid */}
          <div className="brands-alpha-grid">
            {ALPHABET.map((letter) => (
              <button
                key={letter}
                onClick={() => scrollToLetter(letter)}
                className={`brands-alpha-btn ${
                  activeLetter === letter && !isSearching
                    ? "brands-alpha-active"
                    : ""
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT — scrollable brand list */}
        <div
          ref={listRef}
          className="flex-1 overflow-y-auto brands-list-scroll p-4"
          style={{ minWidth: 0 }}
        >
          {Object.keys(displayData).length === 0 ? (
            <p className="text-[12px] text-gray-400 mt-2">No brands found.</p>
          ) : (
            ALPHABET.map((letter) => {
              const brands = displayData[letter];
              if (!brands?.length) return null;
              return (
                <div key={letter} data-letter={letter} className="mb-4">
                  <p className="text-[12px] font-bold text-gray-900 mb-1.5 pb-1 border-b border-gray-100">
                    {letter}
                  </p>
                  <ul className="list-none m-0 p-0">
                    {brands.map((brand) => (
                      <li key={brand.id}>
                        <Link
                          href={`/brands/${brand.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                          className="brand-list-link block text-[12px] text-gray-600 no-underline py-1 hover:text-gray-900 transition-colors leading-tight"
                        >
                          {brand.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-100 flex justify-end bg-white">
        <Link
          href="/brand"
          className="text-[12px] font-semibold text-gray-900 no-underline flex items-center gap-1 hover:text-gray-600 transition-colors"
        >
          View all brands
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}