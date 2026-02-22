import Link from "next/link";
import { Constants } from "../utils/Constants";
import "../style/RootFooter.css";
import {
  InstagramOutlined,
  FacebookOutlined,
  XOutlined,
  YoutubeOutlined,
  LockOutlined,
  EnvironmentOutlined,
  CrownOutlined,
  CarOutlined,
} from "@ant-design/icons";

// ─── Footer nav data ───────────────────────────────────────────────────────────
const footerLinks = {
  Shop: [
    { label: "New Arrivals",  href: "/new" },
    { label: "Best Sellers",  href: "/best-sellers" },
    { label: "Sale",          href: "/sale" },
    { label: "All Products",  href: "/products" },
    { label: "Brands",        href: "/brands" },
  ],
  Help: [
    { label: "Track Order",   href: "/track" },
    { label: "Returns",       href: "/returns" },
    { label: "Shipping Info", href: "/shipping" },
    { label: "FAQs",          href: "/faqs" },
    { label: "Contact Us",    href: "/contact" },
  ],
  Company: [
    { label: "About Us",       href: "/about" },
    { label: "Careers",        href: "/careers" },
    { label: "Press",          href: "/press" },
    { label: "Sustainability",  href: "/sustainability" },
    { label: "Affiliates",     href: "/affiliates" },
  ],
};

// ─── Social icons ──────────────────────────────────────────────────────────────
const socials = [
  { label: "Instagram",  href: "#", icon: <InstagramOutlined /> },
  { label: "Facebook",   href: "#", icon: <FacebookOutlined /> },
  { label: "Twitter / X",href: "#", icon: <XOutlined /> },
  { label: "YouTube",    href: "#", icon: <YoutubeOutlined /> },
];

// ─── Trust badges ──────────────────────────────────────────────────────────────
const trustBadges = [
  { key: "Secure",  icon: <LockOutlined />,        label: "Secure"  },
  { key: "Eco",     icon: <EnvironmentOutlined />,  label: "Eco"     },
  { key: "Premium", icon: <CrownOutlined />,        label: "Premium" },
  { key: "Fast",    icon: <CarOutlined />,           label: "Fast"    },
];

// ─── Root Footer ───────────────────────────────────────────────────────────────
export default function RootFooter() {
  return (
    <footer className="footer-root bg-white border-t border-gray-200">

      {/* Decorative top line */}
      <div className="footer-top-line" />

      {/* ── MAIN FOOTER BODY ── */}
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1.4fr]">

          {/* ── Brand column ── */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="inline-block">
              <img
                src="/images/logo1.png"
                alt={Constants.PROJECT_NAME}
                className="footer-logo h-12 w-auto object-contain"
              />
            </Link>

            <p className="text-[13px] text-gray-500 leading-relaxed max-w-[220px]">
              Premium beauty, skincare & wellness — curated for you. Natural
              ingredients, luxurious results.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2 mt-1">
              {socials.map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label} className="social-btn">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Nav columns ── */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <p className="footer-heading">{heading}</p>
              <ul className="flex flex-col gap-2.5 list-none m-0 p-0">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="footer-link">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* ── Newsletter column ── */}
          <div>
            <p className="footer-heading">Stay in the loop</p>
            <p className="text-[12.5px] text-gray-500 mb-4 leading-relaxed">
              New drops, exclusive offers & beauty tips straight to your inbox.
            </p>

            <div className="flex">
              <input
                type="email"
                placeholder="your@email.com"
                className="newsletter-input"
                aria-label="Email address"
              />
              <button type="button" className="newsletter-btn">
                Subscribe
              </button>
            </div>

            <p className="text-[11px] text-gray-400 mt-3 leading-relaxed">
              By subscribing you agree to our&nbsp;
              <Link href="/privacy" className="underline hover:text-black transition-colors">
                Privacy Policy
              </Link>.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-1.5 mt-5">
              {trustBadges.map((b) => (
                <span key={b.key} className="pay-badge" style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                  {b.icon} {b.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <hr className="footer-divider" />
      <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between gap-4">

        <p className="text-[11.5px] text-gray-400 m-0">
          © {new Date().getFullYear()} {Constants.PROJECT_NAME}. All rights reserved.
        </p>

        <div className="flex items-center gap-5">
          {[
            { label: "Privacy Policy",   href: "/privacy" },
            { label: "Terms of Service", href: "/terms" },
            { label: "Cookie Policy",    href: "/cookies" },
          ].map(({ label, href }) => (
            <Link key={label} href={href} className="legal-link">{label}</Link>
          ))}
        </div>

        {/* Payment method badges */}
        <div className="hidden md:flex items-center gap-1.5">
          {["VISA", "MC", "AMEX", "PayPal", "GPay"].map((p) => (
            <span key={p} className="pay-badge">{p}</span>
          ))}
        </div>
      </div>

    </footer>
  );
}