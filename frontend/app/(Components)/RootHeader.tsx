// Server Component — no "use client"
import { getBrands } from "@/lib/actions/brands";
import { getTypesCategories } from "@/lib/actions/types";
import {
  CarOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import "../style/RootHeader.css";
import { BrandsDropdown } from "./Brandsdropdown";
import { NavMenuComponent } from "./NavMenuComponent";

export default async function RootHeader() {
  const menuData = await getTypesCategories();
  const brandsData = await getBrands();

  return (
    <header
      className="header-root sticky top-0 z-50 bg-white
                 shadow-[0_1px_0_#e5e7eb,0_2px_8px_rgba(0,0,0,0.06)]"
    >
      {/* ── UTILITY BAR ──────────────────────────────────────────── */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-9 flex items-center justify-between">
          <span className="text-xs text-gray-500 tracking-wide flex items-center gap-1.5">
            <CarOutlined style={{ fontSize: 12 }} />
            Free shipping on orders over $150 &nbsp;·&nbsp; New collection now
            live
          </span>
          <div className="flex items-center gap-5">
            {["Help", "Track Order", "Sign In"].map((t) => (
              <Link
                key={t}
                href="/"
                className="util-link text-[11.5px] font-medium text-gray-500
                           no-underline tracking-wide opacity-90"
              >
                {t}
              </Link>
            ))}
          </div>
        </div>

        {/* ── MAIN NAV ─────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-6 h-[76px] flex items-center justify-between gap-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center no-underline flex-shrink-0"
          >
            <img
              src="/images/logo1.png"
              alt="Logo"
              className="h-11 w-auto object-contain"
            />
          </Link>

          {/* Nav */}
          <nav
            aria-label="Main navigation"
            className="flex items-center gap-0.5"
          >
            {/* Dynamic category triggers — client component */}
            <NavMenuComponent menuData={menuData} />

            {/* Brands dropdown — client component (fetches brands via API) */}
            <BrandsDropdown brandsData={brandsData} />

            {/* Divider */}
            <span className="w-px h-5 bg-gray-200 mx-2" />

            {/* Search */}
            <button
              aria-label="Search"
              className="search-btn p-2 rounded-lg border-none cursor-pointer
                       bg-transparent text-gray-500 flex items-center"
            >
              <SearchOutlined style={{ fontSize: 18 }} />
            </button>

            {/* Cart */}
            <Link
              href="/cart"
              className="cart-btn ml-1 inline-flex items-center gap-1.5
                       px-5 py-2.5 rounded-xl text-[13.5px] font-semibold
                       text-white no-underline tracking-wide bg-gray-900
                       border border-gray-800 shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
            >
              <ShoppingCartOutlined style={{ fontSize: 15 }} />
              Cart
              <span className="bg-white text-gray-900 rounded-full text-[10px] font-extrabold px-1.5 leading-4">
                3
              </span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
