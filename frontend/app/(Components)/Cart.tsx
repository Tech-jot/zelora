"use client";

import { useState } from "react";
import "../style/cart.css";

// ─── Types ────────────────────────────────────────────────────────────────────
interface CartItem {
  id: number;
  name: string;
  category: string;
  variant: string;
  price: number;
  oldPrice?: number;
  qty: number;
  image: string;
  badge?: "free" | "sale" | "new";
}

interface UpsellItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

// ─── Initial Data ─────────────────────────────────────────────────────────────
const INITIAL_ITEMS: CartItem[] = [
  {
    id: 1,
    name: "Luminous Renewal Serum",
    category: "Serum",
    variant: "30ml · Gold Edition",
    price: 4299,
    oldPrice: 5999,
    qty: 1,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80",
    badge: "sale",
  },
  {
    id: 2,
    name: "Velvet Rose Moisturiser",
    category: "Moisturiser",
    variant: "50ml · All Skin Types",
    price: 3199,
    oldPrice: 3999,
    qty: 2,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&q=80",
    badge: "new",
  },
  {
    id: 3,
    name: "Hydra Glow Sheet Mask",
    category: "Mask",
    variant: "Pack of 5 · Hydrating",
    price: 899,
    oldPrice: 1199,
    qty: 1,
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400&q=80",
    badge: "free",
  },
];

const UPSELL_ITEMS: UpsellItem[] = [
  {
    id: 10,
    name: "Gold Elixir Eye Cream",
    price: 2799,
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=200&q=80",
  },
  {
    id: 11,
    name: "Midnight Repair Oil",
    price: 3599,
    image: "https://images.unsplash.com/photo-1631390803571-9ffd1ec85696?w=200&q=80",
  },
  {
    id: 12,
    name: "Silk Veil Sunscreen SPF 50",
    price: 2299,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=200&q=80",
  },
];

const FREE_SHIPPING_THRESHOLD = 7000;

const VALID_COUPONS: Record<string, number> = {
  GLOW20:   0.20,
  BEAUTY15: 0.15,
  FIRST10:  0.10,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (n: number) => `₹${n.toLocaleString("en-IN")}`;

// ─── Subcomponents ────────────────────────────────────────────────────────────

const StepProgress = ({ step }: { step: number }) => {
  const steps = ["Cart", "Address", "Payment", "Confirm"];
  return (
    <div className="ct-progress">
      <div className="ct-progress__inner">
        {steps.map((s, i) => (
          <>
            <div
              key={s}
              className={`ct-step${i + 1 === step ? " ct-step--active" : ""}${i + 1 < step ? " ct-step--done" : ""}`}
            >
              <div className="ct-step__circle">
                {i + 1 < step ? "✓" : i + 1}
              </div>
              <span className="ct-step__label">{s}</span>
            </div>
            {i < steps.length - 1 && (
              <div key={`line-${i}`} className={`ct-step__line${i + 1 < step ? " ct-step__line--done" : ""}`} />
            )}
          </>
        ))}
      </div>
    </div>
  );
};

// ─── Main Cart Page ───────────────────────────────────────────────────────────
export default function CartPage() {
  const [items,         setItems]         = useState<CartItem[]>(INITIAL_ITEMS);
  const [removingId,    setRemovingId]    = useState<number | null>(null);
  const [couponCode,    setCouponCode]    = useState("");
  const [couponState,   setCouponState]   = useState<"idle" | "success" | "error">("idle");
  const [couponDiscount, setCouponDiscount] = useState(0);

  // ── Calculations ──────────────────────────────────────────────
  const subtotal     = items.reduce((acc, i) => acc + i.price * i.qty, 0);
  const savings      = items.reduce((acc, i) => acc + ((i.oldPrice ?? i.price) - i.price) * i.qty, 0);
  const couponSave   = Math.round(subtotal * couponDiscount);
  const shipping     = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 199;
  const tax          = Math.round((subtotal - couponSave) * 0.18);
  const total        = subtotal - couponSave + shipping + tax;
  const toFreeShip   = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shipProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const totalItems   = items.reduce((acc, i) => acc + i.qty, 0);

  // ── Handlers ──────────────────────────────────────────────────
  const updateQty = (id: number, delta: number) => {
    setItems(prev =>
      prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
    );
  };

  const removeItem = (id: number) => {
    setRemovingId(id);
    setTimeout(() => {
      setItems(prev => prev.filter(i => i.id !== id));
      setRemovingId(null);
    }, 350);
  };

  const clearCart = () => {
    setItems([]);
    setCouponDiscount(0);
    setCouponState("idle");
    setCouponCode("");
  };

  const applyCoupon = () => {
    const key = couponCode.trim().toUpperCase();
    if (VALID_COUPONS[key]) {
      setCouponDiscount(VALID_COUPONS[key]);
      setCouponState("success");
    } else {
      setCouponDiscount(0);
      setCouponState("error");
    }
  };

  const addUpsell = (u: UpsellItem) => {
    setItems(prev => {
      const exists = prev.find(i => i.id === u.id);
      if (exists) return prev.map(i => i.id === u.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, {
        id: u.id,
        name: u.name,
        category: "Skincare",
        variant: "30ml",
        price: u.price,
        qty: 1,
        image: u.image,
      }];
    });
  };

  const badgeLabel: Record<string, string> = { free: "Free Gift", sale: "Sale", new: "New" };

  return (
    <div className="ct-root">

      {/* ── Header ─────────────────────────────────────────────── */}
      <header className="ct-header">
        <div className="ct-header__inner">
          <nav className="ct-breadcrumb">
            <span className="ct-breadcrumb__item">Home</span>
            <span className="ct-breadcrumb__sep">›</span>
            <span className="ct-breadcrumb__item">Shop</span>
            <span className="ct-breadcrumb__sep">›</span>
            <span className="ct-breadcrumb__current">Shopping Cart</span>
          </nav>
          <div className="ct-header__secure">
            🔒 Secure Checkout
          </div>
        </div>
      </header>

      {/* ── Progress Stepper ───────────────────────────────────── */}
      <StepProgress step={1} />

      {/* ── Main Layout ────────────────────────────────────────── */}
      <div className="ct-layout">

        {/* ══════════════════════════════════════════════════════
            LEFT — Cart Items
        ══════════════════════════════════════════════════════ */}
        <div className="ct-left">

          {/* Section Header */}
          <div className="ct-section-head">
            <div>
              <h1 className="ct-section-title">Your Cart</h1>
              <span className="ct-section-count">{totalItems} item{totalItems !== 1 ? "s" : ""}</span>
            </div>
            {items.length > 0 && (
              <button className="ct-clear-btn" onClick={clearCart}>Clear all</button>
            )}
          </div>

          {/* Free Shipping Progress */}
          {items.length > 0 && (
            <div className="ct-shipping-bar">
              <div className="ct-shipping-bar__top">
                <p className="ct-shipping-bar__label">
                  {toFreeShip === 0
                    ? <><strong>🎉 Free shipping unlocked!</strong></>
                    : <>Add {fmt(toFreeShip)} more for <strong>free shipping</strong></>}
                </p>
                <span className="ct-shipping-bar__amount">{fmt(subtotal)} / {fmt(FREE_SHIPPING_THRESHOLD)}</span>
              </div>
              <div className="ct-shipping-bar__track">
                <div className="ct-shipping-bar__fill" style={{ width: `${shipProgress}%` }} />
              </div>
            </div>
          )}

          {/* Cart Items */}
          {items.length === 0 ? (
            <div className="ct-empty">
              <div className="ct-empty__icon">🛍</div>
              <h2 className="ct-empty__title">Your cart is empty</h2>
              <p className="ct-empty__sub">
                Looks like you haven't added any products yet. Explore our curated luxury collection.
              </p>
              <button className="ct-empty__btn">Continue Shopping</button>
            </div>
          ) : (
            <div className="ct-items">
              {items.map((item, i) => {
                const disc = item.oldPrice
                  ? Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100)
                  : null;

                return (
                  <div
                    key={item.id}
                    className={`ct-item${removingId === item.id ? " ct-item--removing" : ""}`}
                    style={{ animationDelay: `${i * 0.07}s` }}
                  >
                    {/* Image */}
                    <div className="ct-item__img-wrap">
                      <img src={item.image} alt={item.name} className="ct-item__img" loading="lazy" />
                    </div>

                    {/* Details */}
                    <div className="ct-item__details">
                      <p className="ct-item__category">{item.category}</p>
                      <h3 className="ct-item__name">{item.name}</h3>
                      <p className="ct-item__variant">{item.variant}</p>
                      {item.badge && (
                        <div className="ct-item__badges">
                          <span className={`ct-item__badge ct-item__badge--${item.badge}`}>
                            {badgeLabel[item.badge]}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Right: price + qty + remove */}
                    <div className="ct-item__right">
                      <div className="ct-item__price-block">
                        <span className="ct-item__price">{fmt(item.price * item.qty)}</span>
                        {item.oldPrice && (
                          <span className="ct-item__price--old">{fmt(item.oldPrice * item.qty)}</span>
                        )}
                        {disc && (
                          <span className="ct-item__discount">{disc}% off</span>
                        )}
                      </div>

                      {/* Qty */}
                      <div className="ct-qty">
                        <button
                          className="ct-qty__btn"
                          onClick={() => updateQty(item.id, -1)}
                          disabled={item.qty <= 1}
                          aria-label="Decrease"
                        >−</button>
                        <span className="ct-qty__val">{item.qty}</span>
                        <button
                          className="ct-qty__btn"
                          onClick={() => updateQty(item.id, 1)}
                          aria-label="Increase"
                        >+</button>
                      </div>

                      {/* Remove */}
                      <button className="ct-item__remove" onClick={() => removeItem(item.id)}>
                        🗑 Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Coupon */}
          {items.length > 0 && (
            <div className="ct-coupon">
              <p className="ct-coupon__title">🏷 Promo Code</p>
              <div className="ct-coupon__form">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  className={`ct-coupon__input${
                    couponState === "success" ? " ct-coupon__input--success"
                    : couponState === "error" ? " ct-coupon__input--error"
                    : ""
                  }`}
                  value={couponCode}
                  onChange={e => { setCouponCode(e.target.value); setCouponState("idle"); }}
                  onKeyDown={e => e.key === "Enter" && applyCoupon()}
                />
                <button className="ct-coupon__btn" onClick={applyCoupon}>Apply</button>
              </div>
              {couponState === "success" && (
                <p className="ct-coupon__msg ct-coupon__msg--success">
                  ✓ Coupon applied! You save {fmt(couponSave)}
                </p>
              )}
              {couponState === "error" && (
                <p className="ct-coupon__msg ct-coupon__msg--error">
                  ✕ Invalid coupon code. Try: GLOW20, BEAUTY15
                </p>
              )}
            </div>
          )}
        </div>

        {/* ══════════════════════════════════════════════════════
            RIGHT — Order Summary + Upsell
        ══════════════════════════════════════════════════════ */}
        <div className="ct-right">

          {/* Order Summary */}
          <div className="ct-summary">
            <div className="ct-summary__head">
              <h2 className="ct-summary__title">Order Summary</h2>
              <span className="ct-summary__items-count">{totalItems} item{totalItems !== 1 ? "s" : ""}</span>
            </div>

            <div className="ct-summary__body">
              <div className="ct-summary__row">
                <span className="ct-summary__row-label">Subtotal</span>
                <span className="ct-summary__row-val">{fmt(subtotal)}</span>
              </div>

              {savings > 0 && (
                <div className="ct-summary__row">
                  <span className="ct-summary__row-label">Product Savings</span>
                  <span className="ct-summary__row-val--green">− {fmt(savings)}</span>
                </div>
              )}

              {couponDiscount > 0 && (
                <div className="ct-summary__row">
                  <span className="ct-summary__row-label">Coupon ({Math.round(couponDiscount * 100)}% off)</span>
                  <span className="ct-summary__row-val--green">− {fmt(couponSave)}</span>
                </div>
              )}

              <div className="ct-summary__row">
                <span className="ct-summary__row-label">Shipping</span>
                <span className={shipping === 0 ? "ct-summary__row-val--green" : "ct-summary__row-val"}>
                  {shipping === 0 ? "FREE" : fmt(shipping)}
                </span>
              </div>

              <div className="ct-summary__row">
                <span className="ct-summary__row-label">GST (18%)</span>
                <span className="ct-summary__row-val">{fmt(tax)}</span>
              </div>

              <div className="ct-summary__divider" />

              <div className="ct-summary__total">
                <span className="ct-summary__total-label">Total</span>
                <span className="ct-summary__total-val">{fmt(total)}</span>
              </div>

              <p className="ct-summary__tax-note">Inclusive of all taxes and duties</p>

              <button className="ct-checkout-btn" disabled={items.length === 0}>
                Proceed to Checkout →
              </button>

              <div className="ct-pay-divider"><span>or pay with</span></div>

              <div className="ct-pay-options">
                <button className="ct-pay-btn">💳 Card</button>
                <button className="ct-pay-btn">📱 UPI</button>
                <button className="ct-pay-btn">🏦 NetBanking</button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="ct-trust">
              <div className="ct-trust__item">
                <div className="ct-trust__item-icon">🔒</div>
                <span>256-bit SSL Secure Checkout</span>
              </div>
              <div className="ct-trust__item">
                <div className="ct-trust__item-icon">↩</div>
                <span>30-day hassle-free returns</span>
              </div>
              <div className="ct-trust__item">
                <div className="ct-trust__item-icon">🚚</div>
                <span>Express delivery in 2–4 business days</span>
              </div>
              <div className="ct-trust__item">
                <div className="ct-trust__item-icon">💬</div>
                <span>24/7 customer support</span>
              </div>
            </div>
          </div>

          {/* You May Also Like */}
          <div className="ct-upsell">
            <div className="ct-upsell__head">
              <h3 className="ct-upsell__title">You May Also Like</h3>
            </div>
            <div className="ct-upsell__list">
              {UPSELL_ITEMS.map(u => (
                <div key={u.id} className="ct-upsell__item">
                  <img src={u.image} alt={u.name} className="ct-upsell__img" loading="lazy" />
                  <div className="ct-upsell__info">
                    <p className="ct-upsell__name">{u.name}</p>
                    <p className="ct-upsell__price">{fmt(u.price)}</p>
                  </div>
                  <button className="ct-upsell__add" onClick={() => addUpsell(u)} aria-label="Add to cart">
                    +
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile Sticky Footer ──────────────────────────────── */}
      <div className="ct-mobile-footer">
        <div className="ct-mobile-footer__row">
          <span className="ct-mobile-footer__label">Total ({totalItems} items)</span>
          <span className="ct-mobile-footer__total">{fmt(total)}</span>
        </div>
        <button className="ct-mobile-footer__btn" disabled={items.length === 0}>
          Proceed to Checkout →
        </button>
      </div>

    </div>
  );
}