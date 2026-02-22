"use client";
import React, { useEffect, useState } from "react";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  HeartFilled,
  StarFilled,
  StarOutlined,
  CheckCircleFilled,
  ArrowRightOutlined,
  DownOutlined,
  FireOutlined,
  GiftOutlined,
  TrophyOutlined,
  ExperimentOutlined,
  SafetyCertificateOutlined,
  GlobalOutlined,
  ThunderboltOutlined,
  CrownOutlined,
  RiseOutlined,
  InstagramOutlined,
  TagOutlined,
  AppstoreOutlined,
  BarsOutlined,
  SmileOutlined,
  MedicineBoxOutlined,
  SkinOutlined,
  HighlightOutlined,
  BulbOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import "../style/home.css"

function SectionHead({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="hp-head">
      <p className="hp-eyebrow">{eyebrow}</p>
      <h2 className="hp-title" dangerouslySetInnerHTML={{ __html: title }} />
      {sub && <p className="hp-sub">{sub}</p>}
      <div className="hp-line" />
    </div>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────
interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  category: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const categories = [
  {
    id: 1,
    name: "Skincare",
    desc: "Radiant Glow",
    longDesc:
      "Hydrate, repair & illuminate your skin with science-backed botanicals.",
    count: "124 Products",
    Icon: SkinOutlined,
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=85",
    accent: "#be8a5a",
    accentBg: "#fdf6ee",
  },
  {
    id: 2,
    name: "Makeup",
    desc: "Bold & Beautiful",
    longDesc:
      "Pigment-rich, long-wear formulas to define and dazzle every look.",
    count: "89 Products",
    Icon: HighlightOutlined,
    image:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&q=85",
    accent: "#b86080",
    accentBg: "#fdf0f4",
  },
  {
    id: 3,
    name: "Haircare",
    desc: "Silky Perfection",
    longDesc:
      "Nourish every strand from root to tip with our luxe hair rituals.",
    count: "67 Products",
    Icon: BulbOutlined,
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=85",
    accent: "#5878b8",
    accentBg: "#eef3fd",
  },
  {
    id: 4,
    name: "Fragrance",
    desc: "Alluring Scents",
    longDesc:
      "Captivating eau de parfums crafted from the rarest global ingredients.",
    count: "45 Products",
    Icon: EnvironmentOutlined,
    image:
      "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=600&q=85",
    accent: "#8058b8",
    accentBg: "#f4f0fd",
  },
];
function ProductCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const [wish, setWish] = useState(false);
  const badgeBg =
    product.badge === "Luxury"
      ? "#be8a5a"
      : product.badge === "New"
        ? "#b86080"
        : "#111";
  return (
    <div className="pc">
      {product.badge && (
        <div className="pc-badge" style={{ background: badgeBg }}>
          {product.badge}
        </div>
      )}
      <button
        className="pc-wish"
        onClick={() => setWish(!wish)}
        style={{ color: wish ? "#e05577" : "#bbb" }}
      >
        {wish ? (
          <HeartFilled style={{ color: "#e05577" }} />
        ) : (
          <HeartOutlined />
        )}
      </button>
      <div className="pc-img-wrap">
        <img src={product.image} alt={product.name} className="pc-img" />
      </div>
      <div className="pc-body">
        <p className="pc-cat">{product.category}</p>
        <h3 className="pc-name">{product.name}</h3>
        <div className="pc-stars">
          {[1, 2, 3, 4, 5].map((s) =>
            s <= product.rating ? (
              <StarFilled key={s} style={{ fontSize: 13, color: "#be8a5a" }} />
            ) : (
              <StarOutlined key={s} style={{ fontSize: 13, color: "#ddd" }} />
            ),
          )}
          <span className="pc-reviews">({product.reviews})</span>
        </div>
        <div className="pc-price-row">
          <span className="pc-price">{product.price}</span>
          {product.originalPrice && (
            <span className="pc-original">{product.originalPrice}</span>
          )}
        </div>
        <button
          className={`pc-btn${added ? " added" : ""}`}
          onClick={() => {
            setAdded(true);
            setTimeout(() => setAdded(false), 1500);
          }}
        >
          {added ? (
            <>
              <CheckCircleFilled /> Added
            </>
          ) : (
            <>
              <ShoppingCartOutlined /> Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}

const products: Product[] = [
  {
    id: 1,
    name: "Lumière Serum",
    price: "₹2,499",
    originalPrice: "₹3,199",
    rating: 5,
    reviews: 284,
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80",
    badge: "Best Seller",
    category: "Skincare",
  },
  {
    id: 2,
    name: "Velvet Matte Lip",
    price: "₹899",
    originalPrice: "₹1,099",
    rating: 4,
    reviews: 156,
    image:
      "https://images.unsplash.com/photo-1586495777744-4e6232bf2c27?w=400&q=80",
    badge: "New",
    category: "Makeup",
  },
  {
    id: 3,
    name: "Rose Gold Elixir",
    price: "₹3,299",
    rating: 5,
    reviews: 421,
    image:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&q=80",
    badge: "Luxury",
    category: "Skincare",
  },
  {
    id: 4,
    name: "Silk Night Cream",
    price: "₹1,899",
    originalPrice: "₹2,499",
    rating: 4,
    reviews: 193,
    image:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80",
    category: "Skincare",
  },
  {
    id: 5,
    name: "Golden Glow Oil",
    price: "₹2,099",
    rating: 5,
    reviews: 312,
    image:
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&q=80",
    badge: "Limited",
    category: "Skincare",
  },
  {
    id: 6,
    name: "Petal Blush Palette",
    price: "₹1,599",
    originalPrice: "₹1,999",
    rating: 4,
    reviews: 87,
    image:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&q=80",
    badge: "New",
    category: "Makeup",
  },
  {
    id: 7,
    name: "Éclat Eye Cream",
    price: "₹2,799",
    rating: 5,
    reviews: 198,
    image:
      "https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=400&q=80",
    category: "Skincare",
  },
  {
    id: 8,
    name: "Mystic Oud Perfume",
    price: "₹4,499",
    originalPrice: "₹5,499",
    rating: 5,
    reviews: 502,
    image:
      "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400&q=80",
    badge: "Luxury",
    category: "Fragrance",
  },
];

const newArrivals: Product[] = [
  {
    id: 9,
    name: "Aura Radiance Mist",
    price: "₹1,299",
    rating: 5,
    reviews: 42,
    image:
      "https://images.unsplash.com/photo-1629732052614-cfbfe4e5068d?w=500&q=85",
    category: "Skincare",
  },
  {
    id: 10,
    name: "Celestial Toner",
    price: "₹1,799",
    rating: 4,
    reviews: 28,
    image:
      "https://images.unsplash.com/photo-1601049676869-702ea24cfd58?w=500&q=85",
    category: "Skincare",
  },
  {
    id: 11,
    name: "Velvet Foundation",
    price: "₹2,199",
    rating: 5,
    reviews: 63,
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&q=85",
    category: "Makeup",
  },
  {
    id: 12,
    name: "Moonlit Serum",
    price: "₹3,099",
    rating: 5,
    reviews: 17,
    image:
      "https://images.unsplash.com/photo-1570194065650-d99fb4b8ccb0?w=500&q=85",
    category: "Skincare",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Beauty Blogger",
    review:
      "The Lumière Serum transformed my skin in just 2 weeks. My skin has never felt so hydrated and radiant. Absolutely worth every penny!",
    rating: 5,
    avatar: "PS",
  },
  {
    id: 2,
    name: "Ananya Mehta",
    role: "Verified Buyer",
    review:
      "I've tried countless luxury brands but this one truly stands apart. The packaging is gorgeous and the products smell divine. Completely obsessed!",
    rating: 5,
    avatar: "AM",
  },
  {
    id: 3,
    name: "Riya Kapoor",
    role: "Skincare Enthusiast",
    review:
      "Finally found a brand that delivers on its promises. The Rose Gold Elixir gives me that lit-from-within glow. My skin loves it!",
    rating: 5,
    avatar: "RK",
  },
  {
    id: 4,
    name: "Sneha Patel",
    role: "Makeup Artist",
    review:
      "Professional quality at its finest. My clients always ask what I use. The texture and longevity is unmatched by anything else I've tried.",
    rating: 5,
    avatar: "SP",
  },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=85",
  "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&q=85",
  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=85",
  "https://images.unsplash.com/photo-1583241800678-9b5abbe31f31?w=400&q=85",
  "https://images.unsplash.com/photo-1631730486784-74757d5eeef0?w=400&q=85",
  "https://images.unsplash.com/photo-1573461169015-99c8ca27c0da?w=400&q=85",
];

const wcuFeatures = [
  {
    Icon: SafetyCertificateOutlined,
    title: "Natural Ingredients",
    desc: "Sourced from the world's most pristine botanicals with zero compromise on purity.",
    accent: "#3a8a4a",
  },
  {
    Icon: ExperimentOutlined,
    title: "Dermatologically Tested",
    desc: "Clinically proven and safety-tested by leading dermatologists for all skin types.",
    accent: "#3a68c4",
  },
  {
    Icon: HeartFilled,
    title: "Cruelty Free",
    desc: "Proudly certified cruelty-free. No animal testing — ever. Beauty with a conscience.",
    accent: "#c44a70",
  },
  {
    Icon: CrownOutlined,
    title: "Premium Quality",
    desc: "Luxury-grade formulations with the finest global ingredients and latest science.",
    accent: "#be8a5a",
  },
];

const featuredBrands = [
  {
    name: "Charlotte Tilbury",
    tag: "Luxury",
    desc: "Iconic British glamour & iconic formulas",
    initial: "CT",
    accent: "#c4936a",
    bg: "#fdf6ee",
    TagIcon: CrownOutlined,
  },
  {
    name: "Rare Beauty",
    tag: "Trending",
    desc: "Inclusive beauty by Selena Gomez",
    initial: "RB",
    accent: "#d4607a",
    bg: "#fdf0f4",
    TagIcon: RiseOutlined,
  },
  {
    name: "La Mer",
    tag: "Prestige",
    desc: "The legendary crème de la mer",
    initial: "LM",
    accent: "#4a7a9a",
    bg: "#eef4f8",
    TagIcon: TrophyOutlined,
  },
  {
    name: "Fenty Beauty",
    tag: "Inclusive",
    desc: "40+ shades for every skin tone",
    initial: "FB",
    accent: "#8a5aa0",
    bg: "#f5f0fd",
    TagIcon: GlobalOutlined,
  },
  {
    name: "Tatcha",
    tag: "Japanese",
    desc: "Ancient Japanese rituals, modern science",
    initial: "TA",
    accent: "#7a6a4a",
    bg: "#faf6ee",
    TagIcon: SmileOutlined,
  },
  {
    name: "Drunk Elephant",
    tag: "Clean",
    desc: "Biocompatible skincare, nothing suspicious",
    initial: "DE",
    accent: "#c06a3a",
    bg: "#fdf3ee",
    TagIcon: SafetyCertificateOutlined,
  },
  {
    name: "Rhode",
    tag: "New",
    desc: "Hailey Bieber's glow-first philosophy",
    initial: "RH",
    accent: "#9a6a7a",
    bg: "#fdf0f4",
    TagIcon: ThunderboltOutlined,
  },
  {
    name: "Sisley Paris",
    tag: "Botanical",
    desc: "French botanical luxury since 1976",
    initial: "SP",
    accent: "#4a8a5a",
    bg: "#eef8f0",
    TagIcon: MedicineBoxOutlined,
  },
];

const HomeComponent = () => {
  const [loaded, setLoaded] = useState(false);
  const [activeCat, setActiveCat] = useState<number | null>(null);
  const [naAdded, setNaAdded] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => setLoaded(true), []);
  return (
    <>
      {/* ════════════════════════════════════
          2. BRANDS
      ════════════════════════════════════ */}
      <section className="brands-section">
        {/* <BrandTicker /> */}
        <div className="hp-wrap">
          <SectionHead
            eyebrow="Our Partners"
            title="Shop by <em>Brand</em>"
            sub="Discover 200+ of the world's most coveted beauty brands, all in one place."
          />
          <div className="brands-grid">
            {featuredBrands.map((brand, i) => (
              <div
                key={brand.name}
                className="brand-card"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <div
                  className="brand-card-accent"
                  style={{ background: brand.accent }}
                />
                <div className="brand-card-inner">
                  {/* <div
                    className="brand-initial"
                    style={{
                      background: brand.bg,
                      color: brand.accent,
                      border: `1.5px solid ${brand.accent}22`,
                    }}
                  >
                    {brand.initial}
                  </div>
                  <span
                    className="brand-tag"
                    style={{
                      background: brand.accent + "18",
                      color: brand.accent,
                    }}
                  >
                    <brand.TagIcon style={{ fontSize: 9 }} /> {brand.tag}
                  </span> */}
                  <h3 className="brand-name">{brand.name}</h3>
                  <p className="brand-desc">{brand.desc}</p>
                  <div className="brand-cta" >
                    Shop Brand <ArrowRightOutlined />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="brands-bottom-cta">
            <p className="brands-count-txt">
              <strong>200+</strong> brands available — from luxury to clean
              beauty
            </p>
            <button className="btn-dark">
              <GlobalOutlined /> Explore All Brands
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          3. CATEGORIES
      ════════════════════════════════════ */}
      <section className="cat-section">
        <div className="hp-wrap">
          <SectionHead
            eyebrow="Explore"
            title="Shop by <em>Category</em>"
            sub="Curated collections designed for every step of your beauty ritual."
          />
          <div className="cat-grid">
            {categories.map((cat) => {
              const active = activeCat === cat.id;
              return (
                <div
                  key={cat.id}
                  className="cat-card"
                  onMouseEnter={() => setActiveCat(cat.id)}
                  onMouseLeave={() => setActiveCat(null)}
                >
                  <div
                    className="cat-accent-bar"
                    style={{ background: cat.accent }}
                  />
                  <div className="cat-img-wrap">
                    <img src={cat.image} alt={cat.name} className="cat-img" />
                    <div className="cat-img-overlay" />
                    <span className="cat-count-badge">{cat.count}</span>
                  </div>
                  <div
                    className="cat-body"
                    style={{ background: active ? cat.accentBg : "#fff" }}
                  >
                    <div className="cat-icon-row">
                      <div
                        className="cat-icon-circle"
                        style={{
                          background: cat.accent + "18",
                          color: cat.accent,
                        }}
                      >
                        <cat.Icon style={{ fontSize: 20 }} />
                      </div>
                      <button
                        className="cat-arrow-btn"
                        style={
                          active
                            ? { background: cat.accent, color: "#fff" }
                            : {}
                        }
                      >
                        <ArrowRightOutlined />
                      </button>
                    </div>
                    <h3 className="cat-name">{cat.name}</h3>
                    <p className="cat-desc">
                      {active ? cat.longDesc : cat.desc}
                    </p>
                    <div className="cat-divider" />
                    <div className="cat-meta-row">
                      <span
                        className="cat-product-count"
                        style={{ color: cat.accent }}
                      >
                        {cat.count}
                      </span>
                      <span
                        className="cat-shop-now"
                        style={{ color: cat.accent }}
                      >
                        Shop Now <ArrowRightOutlined />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="cat-cta-wrap">
            <button className="btn-dark">
              <BarsOutlined /> View All Categories
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          4. BEST SELLERS
      ════════════════════════════════════ */}
      <section className="bs-section">
        <div className="hp-wrap">
          <SectionHead
            eyebrow="Top Picks"
            title="Best <em>Selling</em> Products"
            sub="Our most-loved formulas, beloved by thousands of beauty devotees worldwide."
          />
          <div className="bs-grid">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="bs-cta">
            <button className="btn-dark">
              <RiseOutlined /> View All Products
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          5. WHY CHOOSE US
      ════════════════════════════════════ */}
      <section className="wcu-section">
        <div className="hp-wrap">
          <SectionHead
            eyebrow="Our Promise"
            title="Why Choose <em>Lumière</em>"
            sub="Every product is crafted with intention, integrity, and deep care for your skin."
          />
          <div className="wcu-grid">
            {wcuFeatures.map((f) => (
              <div
                key={f.title}
                className="wcu-card"
                style={{ "--card-accent": f.accent } as React.CSSProperties}
              >
                <div
                  className="wcu-icon"
                  style={{ background: f.accent + "14", color: f.accent }}
                >
                  <f.Icon style={{ fontSize: 28 }} />
                </div>
                <h3 className="wcu-name">{f.title}</h3>
                <p className="wcu-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          6. NEW ARRIVALS
      ════════════════════════════════════ */}
      <section className="na-section">
        <div className="hp-wrap">
          <SectionHead
            eyebrow="Fresh & New"
            title="New <em>Arrivals</em>"
            sub="Be the first to experience our latest luxury formulations, just landed."
          />
          <div className="na-grid">
            {newArrivals.map((p) => (
              <div key={p.id} className="na-card">
                <div className="na-img-wrap">
                  <img src={p.image} alt={p.name} className="na-img" />
                  <span className="na-pill">
                    <ThunderboltOutlined /> Just Arrived
                  </span>
                  <div className="na-overlay">
                    <button
                      className="na-quick-add"
                      onClick={() => {
                        setNaAdded(p.id);
                        setTimeout(() => setNaAdded(null), 1500);
                      }}
                    >
                      {naAdded === p.id ? (
                        <>
                          <CheckCircleFilled /> Added!
                        </>
                      ) : (
                        <>
                          <ShoppingCartOutlined /> Quick Add
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <div className="na-body">
                  <p className="na-cat">{p.category}</p>
                  <h3 className="na-name">{p.name}</h3>
                  <div className="na-bottom">
                    <span className="na-price">{p.price}</span>
                    <div className="na-stars">
                      {[1, 2, 3, 4, 5].map((s) =>
                        s <= p.rating ? (
                          <StarFilled
                            key={s}
                            style={{ fontSize: 12, color: "#be8a5a" }}
                          />
                        ) : (
                          <StarOutlined
                            key={s}
                            style={{ fontSize: 12, color: "#ddd" }}
                          />
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          7. TESTIMONIALS
      ════════════════════════════════════ */}
      <section className="testi-section">
        <div className="hp-wrap">
          <SectionHead
            eyebrow="Real Stories"
            title="What Our <em>Clients</em> Say"
            sub="Thousands of women have transformed their beauty ritual — hear their stories."
          />
          <div className="testi-grid">
            {testimonials.map((t) => (
              <div key={t.id} className="testi-card">
                <div className="testi-quote">
                  <SmileOutlined />
                </div>
                <div className="testi-stars">
                  {[1, 2, 3, 4, 5].map((s) =>
                    s <= t.rating ? (
                      <StarFilled
                        key={s}
                        style={{ fontSize: 14, color: "#be8a5a" }}
                      />
                    ) : (
                      <StarOutlined
                        key={s}
                        style={{ fontSize: 14, color: "#ddd" }}
                      />
                    ),
                  )}
                </div>
                <p className="testi-review">{t.review}</p>
                <div className="testi-divider" />
                <div className="testi-author">
                  <div className="testi-avatar">{t.avatar}</div>
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          8. PROMO BANNER
      ════════════════════════════════════ */}
      <section className="promo-section">
        <div className="promo-blob promo-blob-1" />
        <div className="promo-blob promo-blob-2" />
        <div className="promo-inner">
          <div className="promo-top-line" />
          <div className="promo-tag">
            <GiftOutlined /> Exclusive Offer <GiftOutlined />
          </div>
          <h2 className="promo-title">
            Glow More, <em>Spend Less</em>
          </h2>
          <p className="promo-desc">
            Enjoy <strong>30% OFF</strong> on all skincare orders above ₹2,000
          </p>
          <p className="promo-code">
            Use Code: <strong>GLOW30</strong> 
          </p>
          <button className="promo-btn">
            <TagOutlined /> Claim Your Offer <ArrowRightOutlined />
          </button>
        </div>
      </section>

      {/* ════════════════════════════════════
         9. BEAUTY GALLERY
      ════════════════════════════════════ */}
      <section className="gallery-section">
        <div className="hp-wrap">
          <SectionHead
            eyebrow="Gallery"
            title="Beauty <em>Moments</em>"
            sub="Real looks, real glow — follow us @lumiere.beauty"
          />
          <div className="gallery-grid">
            {galleryImages.map((src, i) => (
              <div key={i} className="gallery-item">
                <img
                  src={src}
                  alt={`beauty-${i + 1}`}
                  className="gallery-img"
                />
                <div className="gallery-overlay">
                  <span className="gallery-icon">
                    <HeartFilled />
                  </span>
                  <span className="gallery-txt">View Post</span>
                </div>
              </div>
            ))}
          </div>
          <p className="gallery-handle">
            Follow us on Instagram{" "}
            <a href="#">
              <InstagramOutlined /> @lumiere.beauty
            </a>
          </p>
        </div>
      </section>
    </>
  );
};

export default HomeComponent;
