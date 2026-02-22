"use client";

import { useState, useMemo } from "react";
import "../../../../../../style/product.css";
import {
  HeartOutlined,
  HeartFilled,
  ShoppingCartOutlined,
  CheckOutlined,
  SearchOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  DownOutlined,
  UpOutlined,
  PlusOutlined,
  MinusOutlined,
  CloseOutlined,
  FilterOutlined,
  StarFilled,
  StarOutlined,
  ClearOutlined,
} from "@ant-design/icons";

interface Product {
  id: number;
  name: string;
  tagline: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: "new" | "sale" | "bestseller";
  tags: string[];
}

type SortOption = "featured" | "price-asc" | "price-desc" | "rating" | "newest";
type ViewMode   = "grid" | "list";

// ─── Products Data ────────────────────────────────────────────────────────────
const ALL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Luminous Renewal Serum",
    tagline: "Pure radiance in one iconic drop",
    category: "Serum",
    price: 4299,
    oldPrice: 5999,
    rating: 5,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80",
    badge: "bestseller",
    tags: ["serum", "hydrating", "anti-aging"],
  },
  {
    id: 2,
    name: "Velvet Rose Moisturiser",
    tagline: "24-hour plump & dewy finish",
    category: "Moisturiser",
    price: 3199,
    oldPrice: 3999,
    rating: 5,
    reviews: 94,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&q=80",
    badge: "new",
    tags: ["moisturiser", "hydrating", "sensitive"],
  },
  {
    id: 3,
    name: "Gold Elixir Eye Cream",
    tagline: "Lift, firm and brighten under-eyes",
    category: "Eye Care",
    price: 2799,
    rating: 4,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500&q=80",
    tags: ["eye-care", "anti-aging", "firming"],
  },
  {
    id: 4,
    name: "Petal Soft Cleanser",
    tagline: "Melts away impurities gently",
    category: "Cleanser",
    price: 1899,
    oldPrice: 2499,
    rating: 4,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1614159102697-a34c7d7bd5e1?w=500&q=80",
    badge: "sale",
    tags: ["cleanser", "sensitive", "gentle"],
  },
  {
    id: 5,
    name: "Midnight Repair Oil",
    tagline: "Overnight transformation while you sleep",
    category: "Face Oil",
    price: 3599,
    rating: 5,
    reviews: 83,
    image: "https://images.unsplash.com/photo-1631390803571-9ffd1ec85696?w=500&q=80",
    badge: "new",
    tags: ["face-oil", "anti-aging", "repair"],
  },
  {
    id: 6,
    name: "Silk Veil Sunscreen SPF 50",
    tagline: "Invisible protection, zero white cast",
    category: "Sun Care",
    price: 2299,
    oldPrice: 2799,
    rating: 4,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&q=80",
    badge: "sale",
    tags: ["sunscreen", "spf", "sensitive"],
  },
  {
    id: 7,
    name: "Rose Quartz Exfoliant",
    tagline: "Buffed, glowing skin in 60 seconds",
    category: "Exfoliant",
    price: 2499,
    rating: 4,
    reviews: 48,
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&q=80",
    tags: ["exfoliant", "brightening", "gentle"],
  },
  {
    id: 8,
    name: "Hydra Glow Sheet Mask",
    tagline: "Intense 20-min glow treatment",
    category: "Mask",
    price: 899,
    oldPrice: 1199,
    rating: 5,
    reviews: 201,
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=500&q=80",
    badge: "sale",
    tags: ["mask", "hydrating", "brightening"],
  },
  {
    id: 9,
    name: "Retinol Resurfacing Toner",
    tagline: "Resurface, refine and renew",
    category: "Toner",
    price: 2099,
    rating: 4,
    reviews: 72,
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=500&q=80",
    tags: ["toner", "anti-aging", "resurfacing"],
  },
  {
    id: 10,
    name: "Ceramide Barrier Balm",
    tagline: "Restore and shield sensitive skin",
    category: "Moisturiser",
    price: 3299,
    rating: 5,
    reviews: 59,
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=500&q=80",
    badge: "new",
    tags: ["moisturiser", "sensitive", "repair"],
  },
  {
    id: 11,
    name: "Vitamin C Brightening Serum",
    tagline: "Fade spots, amplify glow",
    category: "Serum",
    price: 3799,
    oldPrice: 4999,
    rating: 5,
    reviews: 147,
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=500&q=80",
    badge: "bestseller",
    tags: ["serum", "brightening", "vitamin-c"],
  },
  {
    id: 12,
    name: "Micellar Cleansing Water",
    tagline: "Zero-rinse effortless makeup removal",
    category: "Cleanser",
    price: 1499,
    rating: 4,
    reviews: 88,
    image: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=500&q=80",
    tags: ["cleanser", "gentle", "sensitive"],
  },
];

const CATEGORIES  = ["All", "Serum", "Moisturiser", "Eye Care", "Cleanser", "Face Oil", "Sun Care", "Exfoliant", "Mask", "Toner"];
const CONCERNS    = ["Hydrating", "Anti-aging", "Brightening", "Sensitive", "Firming", "Repair", "Gentle"];
const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured",   label: "Featured" },
  { value: "newest",     label: "Newest First" },
  { value: "price-asc",  label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating",     label: "Top Rated" },
];

// ─── Stars ────────────────────────────────────────────────────────────────────
const Stars = ({ rating }: { rating: number }) => (
  <div className="ap-card__stars">
    {[1, 2, 3, 4, 5].map((n) => (
      <span key={n} className={`ap-card__star${n <= rating ? " ap-card__star--filled" : ""}`}>
        {n <= rating ? <StarFilled /> : <StarOutlined />}
      </span>
    ))}
  </div>
);

// ─── Badge ────────────────────────────────────────────────────────────────────
const Badge = ({ type }: { type: Product["badge"] }) => {
  if (!type) return null;
  const labels = { new: "New", sale: "Sale", bestseller: "Best Seller" };
  return <span className={`ap-badge ap-badge--${type}`}>{labels[type]}</span>;
};

// ─── Product Card ─────────────────────────────────────────────────────────────
const ProductCard = ({
  product,
  listView,
  wished,
  onWish,
}: {
  product: Product;
  listView: boolean;
  wished: boolean;
  onWish: (id: number) => void;
}) => {
  const [addedToCart, setAddedToCart] = useState(false);

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  const handleCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1800);
  };

  return (
    <article className="ap-card">
      {/* Image */}
      <div className="ap-card__img-wrap">
        <img src={product.image} alt={product.name} className="ap-card__img" loading="lazy" />

        {/* Badges */}
        <div className="ap-card__badges">
          <Badge type={product.badge} />
        </div>

        {/* Wishlist button */}
        <button
          className={`ap-card__wish-icon${wished ? " ap-card__wish-icon--active" : ""}`}
          onClick={(e) => { e.stopPropagation(); onWish(product.id); }}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        >
          {wished ? <HeartFilled /> : <HeartOutlined />}
        </button>

        {/* Hover Actions */}
        {!listView && (
          <div className="ap-card__actions">
            <button
              className="ap-card__action-btn ap-card__action-btn--cart"
              onClick={handleCart}
            >
              {addedToCart
                ? <><CheckOutlined /> Added</>
                : <><ShoppingCartOutlined /> Cart</>}
            </button>
            <button
              className="ap-card__action-btn ap-card__action-btn--wish"
              onClick={(e) => { e.stopPropagation(); onWish(product.id); }}
            >
              {wished ? <HeartFilled /> : <HeartOutlined />}
            </button>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="ap-card__body">
        <p className="ap-card__category">{product.category}</p>
        <h3 className="ap-card__name">{product.name}</h3>
        <p className="ap-card__tagline">{product.tagline}</p>

        <div className="ap-card__stars-row">
          <Stars rating={product.rating} />
          <span className="ap-card__review-count">({product.reviews})</span>
        </div>

        <div className="ap-card__price-row">
          <span className="ap-card__price">₹{product.price.toLocaleString()}</span>
          {product.oldPrice && (
            <span className="ap-card__price--old">₹{product.oldPrice.toLocaleString()}</span>
          )}
          {discount && (
            <span className="ap-card__discount">{discount}% off</span>
          )}
        </div>

        {/* List view add to cart */}
        {listView && (
          <div className="ap-card__actions">
            <button
              className="ap-card__action-btn ap-card__action-btn--cart"
              onClick={handleCart}
            >
              {addedToCart
                ? <><CheckOutlined /> Added to Cart</>
                : <><ShoppingCartOutlined /> Add to Cart</>}
            </button>
            <button
              className="ap-card__action-btn ap-card__action-btn--wish"
              onClick={(e) => { e.stopPropagation(); onWish(product.id); }}
            >
              {wished ? <HeartFilled /> : <HeartOutlined />}
            </button>
          </div>
        )}
      </div>
    </article>
  );
};

// ─── Filter Card ──────────────────────────────────────────────────────────────
const FilterSection = ({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`ap-filter-card${open ? " ap-filter-card--open" : ""}`}>
      <div className="ap-filter-card__header" onClick={() => setOpen((o) => !o)}>
        <span className="ap-filter-card__title">{title}</span>
        <span className="ap-filter-card__arrow">
          {open ? <MinusOutlined /> : <PlusOutlined />}
        </span>
      </div>
      <div className="ap-filter-card__body">
        <div className="ap-filter-card__inner">{children}</div>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AllProductsPage() {
  const [activeCategory,  setActiveCategory]  = useState("All");
  const [activeConcerns,  setActiveConcerns]   = useState<string[]>([]);
  const [maxPrice,        setMaxPrice]         = useState(6000);
  const [sortBy,          setSortBy]           = useState<SortOption>("featured");
  const [viewMode,        setViewMode]         = useState<ViewMode>("grid");
  const [searchQuery,     setSearchQuery]      = useState("");
  const [wishlist,        setWishlist]         = useState<number[]>([]);
  const [visibleCount,    setVisibleCount]     = useState(9);
  const [sidebarOpen,     setSidebarOpen]      = useState(false);

  const toggleConcern = (c: string) =>
    setActiveConcerns((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );

  const toggleWish = (id: number) =>
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const clearFilters = () => {
    setActiveCategory("All");
    setActiveConcerns([]);
    setMaxPrice(6000);
    setSearchQuery("");
  };

  const filtered = useMemo(() => {
    let list = ALL_PRODUCTS;
    if (activeCategory !== "All") list = list.filter((p) => p.category === activeCategory);
    if (activeConcerns.length > 0)
      list = list.filter((p) => activeConcerns.some((c) => p.tags.includes(c.toLowerCase())));
    list = list.filter((p) => p.price <= maxPrice);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q)
      );
    }
    switch (sortBy) {
      case "price-asc":  return [...list].sort((a, b) => a.price - b.price);
      case "price-desc": return [...list].sort((a, b) => b.price - a.price);
      case "rating":     return [...list].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
      case "newest":     return [...list].filter((p) => p.badge === "new").concat(list.filter((p) => p.badge !== "new"));
      default:           return list;
    }
  }, [activeCategory, activeConcerns, maxPrice, sortBy, searchQuery]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const activePills: { label: string; onRemove: () => void }[] = [
    ...(activeCategory !== "All" ? [{ label: activeCategory, onRemove: () => setActiveCategory("All") }] : []),
    ...activeConcerns.map((c) => ({ label: c, onRemove: () => toggleConcern(c) })),
    ...(maxPrice < 6000 ? [{ label: `≤ ₹${maxPrice.toLocaleString()}`, onRemove: () => setMaxPrice(6000) }] : []),
    ...(searchQuery ? [{ label: `"${searchQuery}"`, onRemove: () => setSearchQuery("") }] : []),
  ];

  return (
    <div className="ap-root">

      {/* ════════════════════════════════════════════════════════
          HERO BANNER
      ════════════════════════════════════════════════════════ */}
      <section className="ap-hero">
        <div className="ap-hero__inner">
          <p className="ap-hero__eyebrow">Our Collection</p>
          <h1 className="ap-hero__title ap-display">
            Luxury Beauty,<br />Redefined
          </h1>
          <p className="ap-hero__subtitle">
            Explore our curated range of premium skincare — crafted with rare botanicals,
            backed by science, and designed for every skin type.
          </p>
          <div className="ap-hero__stats">
            <div className="ap-hero__stat">
              <span className="ap-hero__stat-num">50+</span>
              <span className="ap-hero__stat-label">Products</span>
            </div>
            <div className="ap-hero__stat">
              <span className="ap-hero__stat-num">4.8★</span>
              <span className="ap-hero__stat-label">Avg. Rating</span>
            </div>
            <div className="ap-hero__stat">
              <span className="ap-hero__stat-num">12K+</span>
              <span className="ap-hero__stat-label">Happy Clients</span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          MAIN LAYOUT
      ════════════════════════════════════════════════════════ */}
      <div className="ap-layout">

        {/* ── SIDEBAR ──────────────────────────────────────── */}
        <aside className="ap-sidebar">

          {/* Mobile toggle */}
          <button
            className="ap-sidebar__toggle"
            onClick={() => setSidebarOpen((o) => !o)}
          >
            <span><FilterOutlined /> Filters {activePills.length > 0 && `(${activePills.length})`}</span>
            <span>{sidebarOpen ? <UpOutlined /> : <DownOutlined />}</span>
          </button>

          <div className={`ap-sidebar__filters${sidebarOpen ? " ap-sidebar__filters--open" : ""}`}>

            {/* Category */}
            <FilterSection title="Category">
              {CATEGORIES.map((cat) => (
                <label key={cat} className="ap-filter-option">
                  <input
                    type="checkbox"
                    checked={activeCategory === cat}
                    onChange={() => setActiveCategory(cat)}
                  />
                  <span className="ap-filter-option__label">{cat}</span>
                  {cat !== "All" && (
                    <span className="ap-filter-option__count">
                      {ALL_PRODUCTS.filter((p) => p.category === cat).length}
                    </span>
                  )}
                </label>
              ))}
            </FilterSection>

            {/* Skin Concerns */}
            <FilterSection title="Skin Concern" defaultOpen={false}>
              {CONCERNS.map((c) => (
                <label key={c} className="ap-filter-option">
                  <input
                    type="checkbox"
                    checked={activeConcerns.includes(c)}
                    onChange={() => toggleConcern(c)}
                  />
                  <span className="ap-filter-option__label">{c}</span>
                </label>
              ))}
            </FilterSection>

            {/* Price Range */}
            <FilterSection title="Price Range" defaultOpen={false}>
              <div className="ap-price-range">
                <input
                  type="range"
                  min={500}
                  max={6000}
                  step={100}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
                <div className="ap-price-range__labels">
                  <span>₹500</span>
                  <span>Up to ₹{maxPrice.toLocaleString()}</span>
                </div>
              </div>
            </FilterSection>

            {/* Clear */}
            {activePills.length > 0 && (
              <button className="ap-clear-btn" onClick={clearFilters}>
                <ClearOutlined /> Clear All Filters
              </button>
            )}
          </div>
        </aside>

        {/* ── CONTENT ──────────────────────────────────────── */}
        <div className="ap-content">

          {/* Toolbar */}
          <div className="ap-toolbar">
            <div className="ap-toolbar__left">
              <p className="ap-toolbar__count">
                Showing <strong>{visible.length}</strong> of <strong>{filtered.length}</strong> products
              </p>
            </div>
            <div className="ap-toolbar__right">
              {/* Search */}
              <div className="ap-search">
                <span className="ap-search__icon"><SearchOutlined /></span>
                <input
                  type="text"
                  placeholder="Search products…"
                  className="ap-search__input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Sort */}
              <select
                className="ap-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>

              {/* View Toggle */}
              <div className="ap-view-toggle">
                <button
                  className={`ap-view-btn${viewMode === "grid" ? " ap-view-btn--active" : ""}`}
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                >
                  <AppstoreOutlined />
                </button>
                <button
                  className={`ap-view-btn${viewMode === "list" ? " ap-view-btn--active" : ""}`}
                  onClick={() => setViewMode("list")}
                  aria-label="List view"
                >
                  <UnorderedListOutlined />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Pills */}
          {activePills.length > 0 && (
            <div className="ap-active-filters">
              {activePills.map((pill) => (
                <button
                  key={pill.label}
                  className="ap-filter-pill"
                  onClick={pill.onRemove}
                >
                  {pill.label}
                  <span className="ap-filter-pill__close"><CloseOutlined /></span>
                </button>
              ))}
            </div>
          )}

          {/* Product Grid */}
          <div className={`ap-grid${viewMode === "list" ? " ap-grid--list" : ""}`}>
            {visible.length > 0 ? (
              visible.map((product, i) => (
                <div key={product.id} style={{ animationDelay: `${i * 0.05}s` }}>
                  <ProductCard
                    product={product}
                    listView={viewMode === "list"}
                    wished={wishlist.includes(product.id)}
                    onWish={toggleWish}
                  />
                </div>
              ))
            ) : (
              <div className="ap-empty">
                <span className="ap-empty__icon"><SearchOutlined /></span>
                <h3 className="ap-empty__title">No products found</h3>
                <p className="ap-empty__sub">Try adjusting your filters or search query</p>
              </div>
            )}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="ap-load-more">
              <button
                className="ap-load-more__btn"
                onClick={() => setVisibleCount((c) => c + 6)}
              >
                Load More Products ({filtered.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}