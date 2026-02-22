"use client";

import { useState } from "react";
import "../../../../../style/productdetail.css";
// ─── Types ────────────────────────────────────────────────────────────────────
interface Tab     { id: string; label: string; content: string }
interface Review  { id: number; name: string; avatar: string; rating: number; date: string; title: string; text: string }
interface Feature { icon: string; title: string; desc: string }
interface FAQItem { q: string; a: string }

// ─── Data ─────────────────────────────────────────────────────────────────────
const GALLERY: string[] = [
  "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=700&q=80",
  "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=700&q=80",
  "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=700&q=80",
  "https://images.unsplash.com/photo-1614159102697-a34c7d7bd5e1?w=700&q=80",
];

const TABS: Tab[] = [
  {
    id: "description",
    label: "Description",
    content:
      "Indulge your skin with our Luminous Renewal Serum — a masterpiece of modern skincare alchemy. Crafted from rare botanicals harvested at peak potency, this weightless serum melts into skin, delivering an immediate surge of hydration and a visible luminosity that lasts all day. Formulated for all skin types, it works harmoniously with your skin's natural barrier to restore radiance from within.",
  },
  {
    id: "ingredients",
    label: "Ingredients",
    content:
      "Pure Hyaluronic Acid Complex (3 molecular weights), Bakuchiol (nature's retinol), 24K Gold Microparticles, Rosa Damascena Flower Water, Vitamin C Ethyl Ascorbic Acid 15%, Niacinamide 5%, Centella Asiatica Extract, Argan Stem Cells, Peptide Complex Matrixyl 3000, Squalane, Ceramide NP, Ferulic Acid, Allantoin, Panthenol B5, Tocopherol Vitamin E.",
  },
  {
    id: "howtouse",
    label: "How to Use",
    content:
      "Step 1: Cleanse and tone your face. Step 2: Dispense 3–4 drops onto fingertips. Step 3: Gently press and pat onto face, neck, and décolletage. Step 4: Allow 60 seconds for full absorption. Step 5: Follow with SPF 30+ in the morning. Use twice daily for best results. Visible results in 7–14 days.",
  },
  {
    id: "benefits",
    label: "Benefits",
    content:
      "Visibly reduces fine lines and wrinkles within 4 weeks. Delivers 72-hour deep hydration. Evens skin tone and fades dark spots. Strengthens skin barrier and reduces sensitivity. Boosts natural collagen synthesis. Provides antioxidant protection against environmental aggressors. Imparts an immediate glass-skin glow. Non-comedogenic and dermatologist-tested.",
  },
];

const FEATURES: Feature[] = [
  { icon: "✦", title: "Clinically Proven",    desc: "94% saw visible radiance improvement in 4 weeks." },
  { icon: "◈", title: "Vegan & Cruelty-Free", desc: "100% ethically sourced, never tested on animals." },
  { icon: "❋", title: "Dermatologist Tested", desc: "Recommended for all skin types including sensitive." },
  { icon: "◉", title: "Luxury Packaging",     desc: "Refillable borosilicate glass with gold dropper." },
];

const REVIEWS: Review[] = [
  {
    id: 1,
    name: "Isabelle Fontaine",
    avatar: "https://i.pravatar.cc/80?img=47",
    rating: 5,
    date: "January 2025",
    title: "My skin has never looked this good",
    text: "I've tried every luxury serum on the market. This one genuinely delivers. After two weeks my skin is visibly firmer and the glow is absolutely otherworldly. Worth every penny.",
  },
  {
    id: 2,
    name: "Priya Malhotra",
    avatar: "https://i.pravatar.cc/80?img=25",
    rating: 5,
    date: "December 2024",
    title: "Transformed my dull, stressed skin",
    text: "Sceptical about the gold particles, but this serum absorbed immediately with zero residue. My hyperpigmentation has faded noticeably — colleagues keep asking if I've had a facial.",
  },
  {
    id: 3,
    name: "Camille Beaumont",
    avatar: "https://i.pravatar.cc/80?img=32",
    rating: 4,
    date: "February 2025",
    title: "Luxurious ritual, real results",
    text: "The scent is divine and the texture is cloud-like. Fine lines around my eyes are softer after just ten days. This has become the centrepiece of my morning routine.",
  },
];

const FAQS: FAQItem[] = [
  { q: "Is this suitable for sensitive skin?",  a: "Yes. The formula is fragrance-free, hypoallergenic, and dermatologist-tested. It contains Centella Asiatica and Allantoin to calm irritation." },
  { q: "Can I use it with retinol?",            a: "Use our serum in the morning and retinol in the evening. Alternatively apply it first as a buffer layer to enhance retinol tolerance." },
  { q: "How long does one bottle last?",        a: "One 30ml bottle provides approximately 60 days of twice-daily use when 3–4 drops are applied per session." },
  { q: "Is the packaging eco-friendly?",        a: "Our borosilicate glass bottle is fully refillable. Refill pouches use 90% less plastic and all outer cartons are FSC-certified." },
  { q: "When will I see results?",              a: "Most customers notice an immediate post-application glow. Significant improvements in texture, tone, and hydration are visible within 7–14 days." },
];

// ─── Stars Component ──────────────────────────────────────────────────────────
const Stars = ({ rating }: { rating: number }) => (
  <div className="pp-stars">
    {[1, 2, 3, 4, 5].map((n) => (
      <span key={n} className={`pp-star${n <= rating ? " pp-star--filled" : ""}`}>★</span>
    ))}
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ProductPage() {
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab,   setActiveTab]   = useState("description");
  const [qty,         setQty]         = useState(1);
  const [openFaq,     setOpenFaq]     = useState<number | null>(null);
  const [added,       setAdded]       = useState(false);

  const handleCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const tabContent = TABS.find((t) => t.id === activeTab)?.content ?? "";

  return (
    <main className="pp-root">

      {/* ════════════════════════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════════════════════════ */}
      <section className="pp-hero">

        {/* ── Gallery ──────────────────────────────────────────── */}
        <div className="pp-gallery">

          {/* Main Image */}
          <div className="pp-gallery__main">
            <img
              key={activeImage}
              src={GALLERY[activeImage]}
              alt="Luminous Renewal Serum"
            />
            <span className="pp-gallery__badge">New Arrival</span>
          </div>

          {/* Thumbnails */}
          <div className="pp-gallery__thumbs">
            {GALLERY.map((src, i) => (
              <button
                key={i}
                className={`pp-gallery__thumb${activeImage === i ? " pp-gallery__thumb--active" : ""}`}
                onClick={() => setActiveImage(i)}
                aria-label={`View angle ${i + 1}`}
              >
                <img src={src} alt={`View ${i + 1}`} />
              </button>
            ))}
          </div>
        </div>

        {/* ── Product Info ─────────────────────────────────────── */}
        <div className="pp-info">

          <p className="pp-info__collection">Luminous Collection · 2025</p>

          <h1 className="pp-info__name">
            Luminous Renewal<br />Serum
          </h1>

          <p className="pp-info__tagline">
            Pure radiance, distilled into one iconic drop.
          </p>

          {/* Rating */}
          <div className="pp-stars-row">
            <Stars rating={5} />
            <span className="pp-info__review-count">128 verified reviews</span>
          </div>

          {/* Price */}
          <div className="pp-price-row">
            <span className="pp-price">₹4,299</span>
            <span className="pp-price pp-price--old">₹5,999</span>
            <span className="pp-discount-badge">28% OFF</span>
          </div>

          <p className="pp-info__stock">✓ In Stock — Ships within 24 hours</p>

          {/* Quantity */}
          <div className="pp-qty-row">
            <span className="pp-qty-label">Qty</span>
            <div className="pp-qty-ctrl">
              <button
                className="pp-qty-ctrl__btn"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >−</button>
              <span className="pp-qty-ctrl__val">{qty}</span>
              <button
                className="pp-qty-ctrl__btn"
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
              >+</button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="pp-actions">
            <button
              className={`pp-btn pp-btn--cart${added ? " pp-btn--cart--added" : ""}`}
              onClick={handleCart}
            >
              {added ? "✓  Added to Cart" : "Add to Cart"}
            </button>
            <button className="pp-btn pp-btn--buy">Buy Now</button>
          </div>

          {/* Trust */}
          <div className="pp-trust">
            <span>🔒 Secure Checkout</span>
            <span>↩ Easy Returns</span>
            <span>✦ Luxury Packaging</span>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          2. PRODUCT TABS
      ════════════════════════════════════════════════════════════ */}
      <section className="pp-tabs-section">

        {/* Tab Nav */}
        <div className="pp-tabs__nav">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`pp-tab-btn${activeTab === t.id ? " pp-tab-btn--active" : ""}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="pp-tabs__content" key={activeTab}>
          <p>{tabContent}</p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          3. WHY CHOOSE — Glass Cards
      ════════════════════════════════════════════════════════════ */}
      <section className="pp-features">
        <div className="pp-section-header">
          <h2 className="pp-section-title">Why Choose This Serum</h2>
          <div className="pp-section-rule" />
        </div>

        <div className="pp-features__grid">
          {FEATURES.map((f) => (
            <div className="pp-feature-card" key={f.title}>
              <div className="pp-feature-card__icon">{f.icon}</div>
              <h3 className="pp-feature-card__title">{f.title}</h3>
              <p className="pp-feature-card__desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          4. REVIEWS — Glassmorphism
      ════════════════════════════════════════════════════════════ */}
      <section className="pp-reviews">
        <div className="pp-section-header">
          <h2 className="pp-section-title">What Our Clients Say</h2>
          <div className="pp-section-rule" />
          <div className="pp-reviews__avg">
            <Stars rating={5} />
            <span>4.9 out of 5 · 128 reviews</span>
          </div>
        </div>

        <div className="pp-reviews__grid">
          {REVIEWS.map((r) => (
            <div className="pp-review-card" key={r.id}>

              {/* Top row */}
              <div className="pp-review-card__top">
                <img
                  src={r.avatar}
                  alt={r.name}
                  className="pp-review-card__avatar"
                />
                <div>
                  <p className="pp-review-card__name">{r.name}</p>
                  <p className="pp-review-card__date">{r.date}</p>
                </div>
                <Stars rating={r.rating} />
              </div>

              <h4 className="pp-review-card__title">"{r.title}"</h4>
              <p className="pp-review-card__text">{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          5. FAQ ACCORDION
      ════════════════════════════════════════════════════════════ */}
      <section className="pp-faq">
        <div className="pp-section-header">
          <h2 className="pp-section-title">Frequently Asked Questions</h2>
          <div className="pp-section-rule" />
        </div>

        <div className="pp-faq__list">
          {FAQS.map((item, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={i}
                className={`pp-faq__item${isOpen ? " pp-faq__item--open" : ""}`}
              >
                <button
                  className="pp-faq__question"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                >
                  <span>{item.q}</span>
                  <span className="pp-faq__icon">{isOpen ? "−" : "+"}</span>
                </button>

                <div className="pp-faq__answer">
                  <p>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          6. NEWSLETTER
      ════════════════════════════════════════════════════════════ */}
      <section className="pp-newsletter">
        <div className="pp-newsletter__inner">
          <p className="pp-newsletter__eyebrow">Join the inner circle</p>
          <h2 className="pp-newsletter__title">Unlock 15% Off Your First Order</h2>
          <p className="pp-newsletter__sub">
            Subscribe for beauty rituals, exclusive launches, and curated offers.
          </p>

          <form
            className="pp-newsletter__form"
            onSubmit={(e) => {
              e.preventDefault();
              (e.currentTarget.querySelector("input") as HTMLInputElement).value = "";
            }}
          >
            <input
              type="email"
              required
              placeholder="Your email address"
              className="pp-newsletter__input"
            />
            <button type="submit" className="pp-newsletter__btn">
              Subscribe
            </button>
          </form>
        </div>
      </section>

    </main>
  );
}