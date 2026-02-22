import {
  AppstoreOutlined,
  DownOutlined,
  GiftOutlined,
  HeartFilled,
  ShoppingCartOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import HomeComponent from "./(Components)/HomeComponent";
import "./style/home.css";

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function HomePage() {
  // const [loaded,     setLoaded]     = useState(false);
  // const [activeCat,  setActiveCat]  = useState<number | null>(null);
  // const [naAdded,    setNaAdded]    = useState<number | null>(null);
  // const [email,      setEmail]      = useState("");
  // const [subscribed, setSubscribed] = useState(false);

  // useEffect(() => setLoaded(true), []);

  return (
    <main>
      {/* ════════════════════════════════════
          1. HERO
      ════════════════════════════════════ */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-left-bar" />
        <div
          className="hero-content"
          // style={{ opacity: loaded ? 1 : 0 }}
        >
          <div className="hero-eyebrow-row">
            <span className="hero-eyebrow-bar" />
            <span className="hero-eyebrow-txt">New Collection 2025</span>
          </div>
          <h1 className="hero-h1">Glow From</h1>
          <span className="hero-h1-em">Within</span>
          <p className="hero-para">
            Discover luxury skincare rituals crafted from nature's finest
            ingredients. Unveil your most radiant, luminous self.
          </p>
          <div className="hero-btns">
            <button className="btn-dark">
              <ShoppingCartOutlined /> Shop Now
            </button>
            <button className="btn-ghost">
              <GiftOutlined /> Explore Collection
            </button>
          </div>
          <div className="hero-stats">
            {[
              { n: "50K+", l: "Happy Clients", Icon: HeartFilled },
              { n: "200+", l: "Products", Icon: AppstoreOutlined },
              { n: "15+", l: "Awards", Icon: TrophyOutlined },
            ].map(({ n, l, Icon }) => (
              <div key={l}>
                <div
                  style={{ color: "#be8a5a", marginBottom: 4, fontSize: 18 }}
                >
                  <Icon />
                </div>
                <div className="hero-stat-num">{n}</div>
                <div className="hero-stat-lbl">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-scroll">
          <div className="hero-scroll-line" />
          <span className="hero-scroll-txt">
            <DownOutlined style={{ color: "rgba(255,255,255,0.35)" }} />
          </span>
        </div>
      </section>

      <HomeComponent />
    </main>
  );
}
