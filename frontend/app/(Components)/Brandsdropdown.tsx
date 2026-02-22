"use client";

import { Brand } from "@/lib/services/brand";
import { useRef, useState } from "react";
import { BrandsMegaPanel } from "./Brandsmegapanel";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`caret-icon opacity-40 ${open ? "caret-open" : ""}`}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

interface BrandsDropdownProps {
  brandsData: Brand[];
}

export function BrandsDropdown({ brandsData }: BrandsDropdownProps) {
  const [brandsOpen, setBrandsOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const open = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setBrandsOpen(true);
  };

  const scheduleClose = () => {
    timerRef.current = setTimeout(() => setBrandsOpen(false), 180);
  };

  const cancelClose = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  return (
    <div className="relative" onMouseEnter={open} onMouseLeave={scheduleClose}>
      <button
        data-open={String(brandsOpen)}
        className={`cat-link inline-flex items-center gap-1 px-3.5 h-12
                    text-[14px] font-semibold tracking-wide
                    border-none cursor-pointer bg-transparent whitespace-nowrap
                    ${brandsOpen ? "text-gray-900" : "text-gray-600"}`}
      >
        Brands
        <Chevron open={brandsOpen} />
      </button>

      {brandsOpen && (
        <div
          className="absolute top-full pt-2 z-50"
          style={{ right: 0 }}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          <BrandsMegaPanel brandsData={brandsData} />
        </div>
      )}
    </div>
  );
}
