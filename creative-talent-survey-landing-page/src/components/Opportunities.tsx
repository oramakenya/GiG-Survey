import { useEffect, useRef, useState } from "react";
import {
  COUNTRIES,
  OTHER_AFRICA,
  makeCountryData,
  type CountryData,
} from "../data/countries";

/* ---------- rotating creative disciplines ---------- */

const DISCIPLINE_POOL = [
  "Visual Arts",
  "Music",
  "Performing Arts",
  "Dance & Choreography",
  "Photography",
  "Film & Video",
  "Design",
  "Digital Media",
  "Writing",
  "Crafts & Maker Arts",
  "Illustration",
  "Animation",
  "Fashion Design",
  "Poetry & Spoken Word",
  "Sculpture",
  "DJing & Sound",
  "Muralism",
  "Content Creation",
  "Comedy",
  "Podcasting",
  "Ceramics",
  "Jewelry Making",
  "Calligraphy",
  "Game Design",
];

const VISIBLE_SLOTS = 10;

/** Orange, navy & royal blue theme variants, randomly assigned per pill */
const PILL_VARIANTS = [
  "border-orama-navy/10 bg-white text-orama-navy/70",
  "border-orama-orange/30 bg-orama-orange/10 text-orama-orange",
  "border-transparent bg-orama-navy text-white/90",
  "border-transparent bg-orama-orange text-white",
  "border-orama-navy/20 bg-orama-navy/5 text-orama-navy/60",
  "border-orama-orange/40 bg-white text-orama-orange",
  "border-transparent bg-[#2743a6] text-white",
  "border-[#2743a6]/30 bg-[#2743a6]/10 text-[#2743a6]",
  "border-[#2743a6]/40 bg-white text-[#2743a6]",
];

interface Pill {
  label: string;
  variant: string;
}

const randomStyle = () => ({
  variant: PILL_VARIANTS[Math.floor(Math.random() * PILL_VARIANTS.length)],
});

function RotatingDisciplines() {
  const [items, setItems] = useState<Pill[]>(() =>
    DISCIPLINE_POOL.slice(0, VISIBLE_SLOTS).map((label) => ({
      label,
      ...randomStyle(),
    }))
  );
  const [fadingSlot, setFadingSlot] = useState<number | null>(null);
  const itemsRef = useRef(items);
  itemsRef.current = items;

  useEffect(() => {
    const id = setInterval(() => {
      const slot = Math.floor(Math.random() * VISIBLE_SLOTS);
      setFadingSlot(slot);
      setTimeout(() => {
        setItems((prev) => {
          // never allow two of the same on screen: pick only from what's not displayed
          const shown = prev.map((p) => p.label);
          const pool = DISCIPLINE_POOL.filter((d) => !shown.includes(d));
          const next = pool[Math.floor(Math.random() * pool.length)];
          const copy = [...prev];
          copy[slot] = { label: next, ...randomStyle() };
          return copy;
        });
        setFadingSlot(null);
      }, 400);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mx-auto mt-8 flex max-w-xl flex-wrap items-center justify-center gap-x-2 gap-y-3">
      {items.map((p, i) => (
        <span
          key={i}
          className={`rounded-full border px-3 py-1 text-xs font-medium shadow-sm transition-all duration-400 ${p.variant} ${
            fadingSlot === i
              ? "scale-90 opacity-0 blur-[2px]"
              : "scale-100 opacity-100 blur-0"
          }`}
        >
          {p.label}
        </span>
      ))}
    </div>
  );
}

/* ---------- country selection ---------- */

const MAIN_COUNTRY_NAMES = COUNTRIES.map((c) => c.name);

function CountryPicker({
  country,
  onCountryChange,
}: {
  country: CountryData;
  onCountryChange: (c: CountryData) => void;
}) {
  const [panelOpen, setPanelOpen] = useState(false);
  const [query, setQuery] = useState("");

  const isOther = !MAIN_COUNTRY_NAMES.includes(country.name);
  const filtered = OTHER_AFRICA.filter((c) =>
    c.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <div className="mt-8">
      <p className="mb-3 text-xs font-bold tracking-[0.45em] text-orama-orange uppercase">
        Where are you based?
      </p>
      <div className="flex flex-wrap gap-2">
        {COUNTRIES.map((c) => (
          <button
            key={c.name}
            type="button"
            onClick={() => {
              onCountryChange(c);
              setPanelOpen(false);
            }}
            className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all ${
              country.name === c.name
                ? "border-orama-orange bg-orama-orange text-white shadow-lg shadow-orama-orange/30"
                : "border-orama-navy/15 bg-white text-orama-navy/70 hover:border-orama-orange/50 hover:bg-orama-orange/5 hover:text-orama-orange"
            }`}
          >
            <span>{c.flag}</span> {c.name}
          </button>
        ))}
        {/* rest of Africa tab */}
        <button
          type="button"
          onClick={() => setPanelOpen((o) => !o)}
          className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all ${
            isOther
              ? "border-orama-orange bg-orama-orange text-white shadow-lg shadow-orama-orange/30"
              : "border-dashed border-orama-navy/25 bg-white text-orama-navy/70 hover:border-orama-orange/50 hover:bg-orama-orange/5 hover:text-orama-orange"
          }`}
        >
          <span>{isOther ? country.flag : "🌍"}</span>{" "}
          {isOther ? country.name : "More of Africa"}
          <span
            className={`text-xs transition-transform duration-300 ${panelOpen ? "rotate-180" : ""}`}
          >
            ▾
          </span>
        </button>
      </div>

      {/* the flag mosaic — a searchable wall of Africa */}
      {panelOpen && (
        <div className="animate-scale-in mt-4 rounded-3xl border border-orama-navy/10 bg-white p-5 shadow-xl shadow-orama-navy/5">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-lg">🔎</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Start typing your country..."
              className="w-full border-b border-orama-navy/15 bg-transparent px-1 py-2 text-sm text-orama-navy outline-none transition-colors placeholder:text-orama-navy/30 focus:border-orama-orange"
            />
          </div>
          <div className="flex max-h-56 flex-wrap gap-2 overflow-y-auto pr-1">
            {filtered.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => {
                  onCountryChange(makeCountryData(c));
                  setPanelOpen(false);
                  setQuery("");
                }}
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                  country.name === c.name
                    ? "border-orama-orange bg-orama-orange text-white"
                    : "border-orama-navy/10 bg-orama-cream text-orama-navy/70 hover:-translate-y-0.5 hover:border-orama-orange/50 hover:bg-orama-orange/10 hover:text-orama-orange"
                }`}
              >
                <span className="text-sm">{c.flag}</span> {c.name}
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="w-full py-4 text-center text-sm text-orama-navy/40 italic">
                No match — try another spelling.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const SPARKLES = [
  { sx: "-28px", sy: "-20px", delay: "0s", char: "✦", size: "text-lg" },
  { sx: "30px", sy: "-26px", delay: "0.08s", char: "✧", size: "text-sm" },
  { sx: "40px", sy: "10px", delay: "0.16s", char: "✦", size: "text-base" },
  { sx: "-36px", sy: "14px", delay: "0.12s", char: "✧", size: "text-lg" },
  { sx: "6px", sy: "-34px", delay: "0.22s", char: "✦", size: "text-sm" },
  { sx: "-10px", sy: "30px", delay: "0.1s", char: "✧", size: "text-base" },
  { sx: "22px", sy: "26px", delay: "0.18s", char: "✦", size: "text-xs" },
  { sx: "-48px", sy: "-2px", delay: "0.26s", char: "✧", size: "text-xs" },
  { sx: "50px", sy: "-6px", delay: "0.3s", char: "✦", size: "text-sm" },
];

const STARDUST = [
  { sx: "-46px", sy: "-8px", delay: "0.05s" },
  { sx: "48px", sy: "-14px", delay: "0.12s" },
  { sx: "-20px", sy: "-38px", delay: "0.2s" },
  { sx: "26px", sy: "36px", delay: "0.1s" },
  { sx: "-40px", sy: "28px", delay: "0.16s" },
  { sx: "44px", sy: "20px", delay: "0.08s" },
  { sx: "-8px", sy: "-46px", delay: "0.24s" },
  { sx: "12px", sy: "44px", delay: "0.14s" },
];

const ORBITERS = [
  { r: "34px", delay: "0s", size: "text-xs" },
  { r: "42px", delay: "0.12s", size: "text-sm" },
  { r: "38px", delay: "0.24s", size: "text-xs" },
];

const EMBERS = [
  { sx: "-18px", sy: "-10px", delay: "0.15s" },
  { sx: "8px", sy: "-14px", delay: "0.3s" },
  { sx: "24px", sy: "-8px", delay: "0.45s" },
  { sx: "-30px", sy: "-12px", delay: "0.55s" },
  { sx: "16px", sy: "-16px", delay: "0.65s" },
];

function MagicCity({ city }: { city: string }) {
  return (
    <span className="relative inline-block whitespace-nowrap align-baseline">
      {/* glow flash behind the word */}
      <span
        key={`g-${city}`}
        aria-hidden
        className="animate-magic-glow pointer-events-none absolute top-1/2 left-1/2 h-16 w-32 rounded-full bg-orama-orange/40 blur-xl"
      />
      {/* twin expanding spell rings */}
      <span
        key={`r1-${city}`}
        aria-hidden
        className="animate-spell-ring pointer-events-none absolute top-1/2 left-1/2 h-14 w-28 rounded-full border border-orama-orange-light/70"
      />
      <span
        key={`r2-${city}`}
        aria-hidden
        className="animate-spell-ring pointer-events-none absolute top-1/2 left-1/2 h-14 w-28 rounded-full border border-white/40"
        style={{ animationDelay: "0.2s" }}
      />
      {/* the word, conjured letter by letter */}
      <span
        key={city}
        className="animate-city-in relative inline-block overflow-visible italic"
      >
        {city.split("").map((ch, i) => (
          <span
            key={i}
            className="animate-letter-in gradient-text inline-block"
            style={{ animationDelay: `${i * 0.055}s` }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
        {/* shimmer sweep across the word */}
        <span
          key={`sh-${city}`}
          aria-hidden
          className="animate-shimmer pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/70 to-transparent"
          style={{ animationDelay: "0.35s", mixBlendMode: "overlay" }}
        />
      </span>
      {/* particle theatre */}
      <span key={`s-${city}`} aria-hidden className="pointer-events-none absolute inset-0">
        {/* sparkle burst */}
        {SPARKLES.map((s, i) => (
          <span
            key={i}
            className={`animate-sparkle absolute top-1/2 left-1/2 ${s.size} text-orama-orange`}
            style={
              {
                "--sx": s.sx,
                "--sy": s.sy,
                animationDelay: s.delay,
              } as React.CSSProperties
            }
          >
            {s.char}
          </span>
        ))}
        {/* stardust scatter */}
        {STARDUST.map((d, i) => (
          <span
            key={`d-${i}`}
            className="animate-stardust absolute top-1/2 left-1/2 h-1 w-1 rounded-full bg-orama-orange-light"
            style={
              {
                "--sx": d.sx,
                "--sy": d.sy,
                animationDelay: d.delay,
              } as React.CSSProperties
            }
          />
        ))}
        {/* orbiting sparkles circling the word */}
        {ORBITERS.map((o, i) => (
          <span
            key={`o-${i}`}
            className={`animate-orbit absolute top-1/2 left-1/2 ${o.size} text-orama-orange-light`}
            style={
              {
                "--r": o.r,
                animationDelay: o.delay,
              } as React.CSSProperties
            }
          >
            ✦
          </span>
        ))}
        {/* rising embers */}
        {EMBERS.map((e, i) => (
          <span
            key={`e-${i}`}
            className="animate-ember absolute top-1/2 left-1/2 h-1.5 w-1.5 rounded-full bg-orama-orange"
            style={
              {
                "--sx": e.sx,
                "--sy": e.sy,
                animationDelay: e.delay,
                boxShadow: "0 0 6px 2px rgba(242, 122, 26, 0.5)",
              } as React.CSSProperties
            }
          />
        ))}
      </span>
    </span>
  );
}

function RotatingCities({ cities }: { cities: string[] }) {
  const [cityA, setCityA] = useState(cities[0]);
  const [cityB, setCityB] = useState(cities[1]);
  const cityARef = useRef(cityA);
  const cityBRef = useRef(cityB);
  const turnRef = useRef<"A" | "B">("A");
  cityARef.current = cityA;
  cityBRef.current = cityB;

  useEffect(() => {
    const id = setInterval(() => {
      const t = turnRef.current;
      const pool = cities.filter(
        (c) => c !== cityARef.current && c !== cityBRef.current
      );
      const next = pool[Math.floor(Math.random() * pool.length)];
      if (t === "A") setCityA(next);
      else setCityB(next);
      turnRef.current = t === "A" ? "B" : "A";
    }, 3000);
    return () => clearInterval(id);
  }, [cities]);

  return (
    <>
      From <MagicCity city={cityA} /> to <MagicCity city={cityB} /> — we're listening.
    </>
  );
}

const cards = [
  {
    icon: "🌍",
    tag: "Connect",
    title: "Join a Continental Network",
    body: "Plug into a growing community of artists, designers, musicians, filmmakers, and makers across Africa. Collaborate, share, and grow together.",
    points: ["Meet like-minded creatives", "Collaborate across borders", "Grow your visibility"],
  },
  {
    icon: "💰",
    tag: "Earn",
    title: "Get Paid For Your Craft",
    body: "Your talent deserves fair, reliable income. Tell us what you do and we'll connect you with paid opportunities that match your skills and availability.",
    points: ["Paid opportunities in your field", "Matched to your discipline", "Flexible to your schedule"],
  },
  {
    icon: "🚀",
    tag: "Grow",
    title: "Level Up Your Career",
    body: "Whether you're self-taught or formally trained, we help you take the next step — sharing your skills, building your portfolio, and reaching new audiences.",
    points: ["Share and teach your skills", "Build your portfolio", "Reach new audiences"],
  },
];

export default function Opportunities({
  country,
  onCountryChange,
}: {
  country: CountryData;
  onCountryChange: (c: CountryData) => void;
}) {
  return (
    <>
      {/* About */}
      <section id="about" className="bg-orama-cream py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-12 md:flex-row md:items-start">
            <div className="md:w-1/3">
              <p className="mb-4 text-xs font-bold tracking-[0.45em] text-orama-orange uppercase">
                Why this survey
              </p>
              <h2 className="font-serif text-4xl font-bold text-orama-navy sm:text-5xl">
                Every creative <span className="gradient-text italic">counts</span>.
              </h2>
            </div>
            <div className="md:w-2/3">
              <p className="text-lg leading-relaxed text-orama-navy/70">
                Whether you are a seasoned professional, a self-taught artist, or an
                experienced educator — we want to hear from you. This survey takes about{" "}
                <span className="font-semibold text-orama-navy">10–15 minutes</span> to
                complete. Your responses remain{" "}
                <span className="font-semibold text-orama-navy">confidential</span> and are
                used only to match you with potential opportunities.
              </p>

              {/* country selection */}
              <CountryPicker country={country} onCountryChange={onCountryChange} />

              {/* ever-changing creative disciplines */}
              <RotatingDisciplines />
            </div>
          </div>
        </div>
      </section>

      {/* Opportunities */}
      <section id="opportunities" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-4 text-xs font-bold tracking-[0.45em] text-orama-orange uppercase">
              What's in it for you
            </p>
            <h2 className="font-serif text-4xl font-bold text-orama-navy sm:text-5xl">
              Connect. Earn. <span className="gradient-text italic">Grow.</span>
            </h2>
            <p className="mt-4 text-lg text-orama-navy/60">
              Tell us about your craft and we'll match you with the right opportunities.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {cards.map((c) => (
              <div
                key={c.title}
                className="group rounded-3xl border border-orama-navy/10 bg-orama-cream p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orama-orange/30 hover:shadow-xl hover:shadow-orama-navy/5"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-orama-orange/10 text-2xl transition-all group-hover:scale-110 group-hover:bg-orama-orange/20">
                  {c.icon}
                </div>
                <p className="mb-2 text-xs font-bold tracking-[0.45em] text-orama-orange uppercase">
                  {c.tag}
                </p>
                <h3 className="font-serif text-2xl font-bold text-orama-navy">{c.title}</h3>
                <p className="mt-3 leading-relaxed text-orama-navy/60">{c.body}</p>
                <ul className="mt-6 space-y-2">
                  {c.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-orama-navy/70">
                      <span className="text-orama-orange">✦</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regions band */}
      <section className="relative overflow-hidden bg-orama-navy py-20">
        <div className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full bg-orama-orange/15 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-10 text-center">
            <div>
              <p className="mb-4 text-xs font-bold tracking-[0.45em] text-orama-orange uppercase">
                Nationwide reach
              </p>
              <h2 className="font-serif text-4xl font-bold text-white sm:text-5xl">
                <RotatingCities key={country.name} cities={country.cities} />
              </h2>
            </div>
            <div className="grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
              {country.regions.map((r) => (
                <div
                  key={r.region}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all hover:bg-white/8"
                >
                  <p className="text-xs font-bold tracking-widest text-orama-orange uppercase">
                    {r.region}
                  </p>
                  <p className="mt-2 text-sm font-medium text-white/80">{r.city}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-white/50">
              Based somewhere else? The survey has room for you too.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
