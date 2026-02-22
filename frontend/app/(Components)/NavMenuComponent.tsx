"use client";

import { TypeWithCategories, Category } from "@/lib/services/types";
import Link from "next/link";
import { useState, useRef } from "react";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}

function MegaMenuPanel({ cat }: { cat: TypeWithCategories }) {
  const { categories } = cat;

  if (!categories || categories.length === 0) {
    return (
      <div className="mega-panel-inline bg-white shadow-[0_8px_32px_rgba(0,0,0,0.13)] border border-gray-200 rounded-2xl">
        <div className="p-5" style={{ minWidth: "200px" }}>
          <Link
            href={`/home/${cat.name}/cat/${cat.id}`}
            className="text-[13px] font-semibold text-gray-900 no-underline flex items-center gap-1.5 hover:text-gray-600 transition-colors"
          >
            Browse all {cat.name}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mega-panel-inline bg-white shadow-[0_8px_32px_rgba(0,0,0,0.13)] border border-gray-200 rounded-2xl">
      <div className="p-5">
        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: `repeat(${Math.min(categories.length, 4)}, 172px)`,
          }}
        >
          {categories.map((item: Category) => (
            <div key={item.id}>
              <Link
                href={`/home/${cat.name}/cat/${cat.id}/${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="mega-item flex items-center gap-2 px-2 py-1.5 rounded-lg no-underline text-inherit"
              >
                <span className="mega-icon w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-[15px] flex-shrink-0 text-gray-500">
                  📦
                </span>
                <span className="block text-[12.5px] font-semibold text-gray-900 leading-tight">
                  {item.name}
                </span>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
          <p className="text-[11px] text-gray-400 m-0">
            <strong className="text-gray-600 font-semibold">
              Free shipping
            </strong>{" "}
            over $150
          </p>
          <Link
            href={`/home/${cat.name}/cat/${cat.id}`}
            className="text-[12px] font-semibold text-gray-900 no-underline flex items-center gap-1 hover:text-gray-600 transition-colors"
          >
            Shop all {cat.name}
          </Link>
        </div>
      </div>
    </div>
  );
}

export function NavMenuComponent({
  menuData,
}: {
  menuData: TypeWithCategories[];
}) {
  const [openCat, setOpenCat] = useState<TypeWithCategories | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openWith = (cat: TypeWithCategories) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenCat(cat);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpenCat(null), 120);
  };

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  return (
    <>
      {menuData.map((cat) => {
        const isOpen = openCat?.id === cat.id;

        return (
          <div
            key={cat.id}
            className="relative"
            onMouseEnter={() => openWith(cat)}
            onMouseLeave={scheduleClose}
          >
            <Link
              href={`/home/${cat.name}/cat/${cat.id}`}
              data-open={String(isOpen)}
              className={`cat-link inline-flex items-center gap-1 px-3.5 h-12 text-[14px] font-semibold tracking-wide no-underline whitespace-nowrap ${
                isOpen ? "text-gray-900" : "text-gray-600"
              }`}
            >
              {cat.name}
              <Chevron open={isOpen} />
            </Link>

            {isOpen && (
              <div
                className="absolute top-full pt-2 z-50"
                onMouseEnter={cancelClose}
                onMouseLeave={scheduleClose}
              >
                <MegaMenuPanel cat={cat} />
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
