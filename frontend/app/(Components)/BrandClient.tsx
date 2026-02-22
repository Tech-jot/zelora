"use client";

import {
  AppstoreOutlined,
  ArrowRightOutlined,
  BarsOutlined,
  CrownOutlined,
  FireOutlined,
  GiftOutlined,
  HeartFilled,
  HeartOutlined,
  SearchOutlined,
  StarFilled,
  StarOutlined,
} from "@ant-design/icons";

import Link from "next/link";
import { useRef, useState } from "react";
import "../style/brandpage.css";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// ✅ Plain object type (NO React components inside)
export type BrandItem = {
  name: string;
  desc: string;
  products: number;
  rating: number;
  image: string;
  founded?: string;
  tag?: "crown" | "fire" | "none"; // 👈 string instead of TagIcon
};

type Props = {
  brandsData: Record<string, BrandItem[]>;
};

export function BrandsClient({ brandsData }: Props) {
  const [search, setSearch] = useState("");
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");
  const listRef = useRef<HTMLDivElement>(null);

  const [wished, setWished] = useState(false);
  const [imgError, setImgError] = useState(false);

  const slug = (brand: any) =>
    brand.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  // ✅ Map string → icon INSIDE client component
  const renderTagIcon = (brand: any) => {
    switch (brand.tag) {
      case "crown":
        return <CrownOutlined />;
      case "fire":
        return <FireOutlined />;
      default:
        return null;
    }
  };
  const displayData: Record<string, BrandItem[]> = {};

  ALPHABET.forEach((letter) => {
    const brands = brandsData[letter] ?? [];
    const filtered = search.trim()
      ? brands.filter((b) =>
          b.name.toLowerCase().includes(search.toLowerCase()),
        )
      : brands;

    if (filtered.length) displayData[letter] = filtered;
  });

  const scrollToLetter = (letter: string) => {
    setActiveLetter(letter);
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-letter="${letter}"]`,
    );
    if (!el) return;

    const stickyEls = document.querySelectorAll<HTMLElement>(
      '[class*="header-root"], .bp-controls',
    );

    let totalStickyHeight = 0;
    stickyEls.forEach((s) => {
      totalStickyHeight += s.getBoundingClientRect().height;
    });

    const top =
      el.getBoundingClientRect().top + window.scrollY - totalStickyHeight - 16;

    window.scrollTo({ top, behavior: "smooth" });
  };

  const totalBrands = Object.values(displayData).reduce(
    (a, b) => a + b.length,
    0,
  );

  return (
    <div className="bp-root">
      <div className="bp-hero">
        <div className="bp-hero-noise" />
        <div className="bp-hero-content">
          <p className="bp-hero-eyebrow">
            <FireOutlined /> Curated Selection
          </p>
          <h1 className="bp-hero-title">
            Shop by <em>Brand</em>
          </h1>
          <p className="bp-hero-sub">
            Discover 200+ of the world's most coveted beauty brands — from
            ultra-luxury to clean beauty pioneers.
          </p>
          <div className="bp-hero-stats">
            {[
              { n: "200+", l: "Brands" },
              { n: "10K+", l: "Products" },
              { n: "50+", l: "Countries" },
              { n: "4.9★", l: "Avg. Rating" },
            ].map((s) => (
              <div key={s.l} className="bp-hero-stat">
                <span className="bp-hero-stat-num">{s.n}</span>
                <span className="bp-hero-stat-lbl">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bp-controls">
        <div className="bp-controls-inner">
          <div className="bp-search-wrap">
            <SearchOutlined className="bp-search-icon" />
            <input
              type="text"
              placeholder="Search brands..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bp-search-input"
            />
            {search && (
              <button className="bp-search-clear" onClick={() => setSearch("")}>
                ✕
              </button>
            )}
          </div>

          <span className="bp-count">{totalBrands} Brands</span>

          <div className="bp-view-toggle">
            <button
              className={`bp-view-btn${view === "grid" ? " active" : ""}`}
              onClick={() => setView("grid")}
            >
              <AppstoreOutlined />
            </button>
            <button
              className={`bp-view-btn${view === "list" ? " active" : ""}`}
              onClick={() => setView("list")}
            >
              <BarsOutlined />
            </button>
          </div>
        </div>
      </div>

      {/* A–Z Sidebar */}
      <div className="bp-body">
        <aside className="bp-az-sidebar">
          <p className="bp-az-label">A–Z</p>
          <div className="bp-az-grid">
            {ALPHABET.map((letter) => {
              const has = !!displayData[letter];
              return (
                <button
                  key={letter}
                  className={`bp-az-btn${activeLetter === letter ? " active" : ""}${!has ? " no-brands" : ""}`}
                  onClick={() => has && scrollToLetter(letter)}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </aside>

        <div className="bp-grid-area" ref={listRef}>
          {ALPHABET.map((letter) => {
            const brands = displayData[letter];
            if (!brands?.length) return null;

            return (
              <div key={letter} data-letter={letter}>
                <div className="bp-letter-heading">
                  <span className="bp-letter-char">{letter}</span>
                  <span className="bp-letter-line" />
                  <span className="bp-letter-count">
                    {brands.length} brand{brands.length > 1 ? "s" : ""}
                  </span>
                </div>

                <div
                  className={
                    view === "grid" ? "bp-brand-grid" : "bp-brand-list"
                  }
                >
                  {brands.map((brand) => {
                    console.log("brand image ", brand.image);

                    return (
                      <div key={brand.name} className="bp-brand-card">
                        <button
                          className="bp-wish-btn"
                          onClick={() => setWished(!wished)}
                        >
                          {wished ? (
                            <HeartFilled style={{ color: "#e05577" }} />
                          ) : (
                            <HeartOutlined />
                          )}
                        </button>

                        {renderTagIcon(brand)}

                        <div className="bp-brand-img-wrap">
                          {!imgError && (
                            <img
                              src={
                                process.env.NEXT_PUBLIC_API_URL + brand.image
                              }
                              alt={brand.name}
                              onError={() => setImgError(true)}
                            />
                          )}
                        </div>

                        <div className="bp-card-body">
                          <h3>{brand.name}</h3>
                          <p>{brand.desc}</p>
                          <div className="bp-brand-meta">
                            <span className="bp-brand-products">
                              {brand.products} Products
                            </span>

                            <div className="bp-brand-stars">
                              <div>
                                {[1, 2, 3, 4, 5].map((s) =>
                                  s <= brand.rating ? (
                                    <StarFilled key={s} />
                                  ) : (
                                    <StarOutlined key={s} />
                                  ),
                                )}
                              </div>
                            </div>
                          </div>

                          <Link
                            href={`/brands/${brand.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                            className="bp-shop-btn"
                          >
                            Shop Brand{" "}
                            <ArrowRightOutlined style={{ fontSize: 11 }} />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* ══ BOTTOM BANNER ══ */}
      <div className="bp-banner">
        <div className="bp-banner-blob bp-banner-blob-1" />
        <div className="bp-banner-blob bp-banner-blob-2" />
        <div className="bp-banner-inner">
          <p className="bp-banner-tag">
            <CrownOutlined /> Partner with Us
          </p>
          <h2 className="bp-banner-title">
            Can't find your <em>favourite brand?</em>
          </h2>
          <p className="bp-banner-sub">
            We're constantly expanding our brand portfolio. Let us know which
            brands you'd love to see.
          </p>
          <button className="bp-banner-btn">
            <GiftOutlined /> Request a Brand <ArrowRightOutlined />
          </button>
        </div>
      </div>
    </div>
  );
}

// ✅ BrandCard (Safe — no class objects passed)
// export function BrandCard({
//   brand,
//   view,
// }: {
//   brand: BrandItem;
//   view: "grid" | "list";
// }) {
//   const [wished, setWished] = useState(false);
//   const [imgError, setImgError] = useState(false);

//   const slug = brand.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

//   // ✅ Map string → icon INSIDE client component
//   const renderTagIcon = () => {
//     switch (brand.tag) {
//       case "crown":
//         return <CrownOutlined />;
//       case "fire":
//         return <FireOutlined />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="bp-brand-card">
//       <button
//         className="bp-wish-btn"
//         onClick={() => setWished(!wished)}
//       >
//         {wished ? (
//           <HeartFilled style={{ color: "#e05577" }} />
//         ) : (
//           <HeartOutlined />
//         )}
//       </button>

//       {renderTagIcon()}

//       <div className="bp-brand-img-wrap">
//         {!imgError && (
//           <img
//             src={brand.image}
//             alt={brand.name}
//             onError={() => setImgError(true)}
//           />
//         )}
//       </div>

//       <h3>{brand.name}</h3>
//       <p>{brand.desc}</p>

//       <div>
//         {[1, 2, 3, 4, 5].map((s) =>
//           s <= brand.rating ? (
//             <StarFilled key={s} />
//           ) : (
//             <StarOutlined key={s} />
//           )
//         )}
//       </div>

//       <Link href={`/brands/${slug}`}>
//         Shop Brand <ArrowRightOutlined />
//       </Link>
//     </div>
//   );
// }
