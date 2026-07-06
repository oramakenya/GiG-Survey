import { useEffect, useState } from "react";

const links = [
  { label: "About", href: "#about" },
  { label: "For You", href: "#opportunities" },
  { label: "The Survey", href: "#survey" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-lg shadow-orama-navy/5" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orama-orange font-serif text-xl font-bold text-white shadow-lg shadow-orama-orange/30">
            C
          </span>
          <span className="leading-tight">
            <span
              className={`block text-sm font-extrabold tracking-[0.45em] uppercase ${
                scrolled ? "text-orama-navy" : "text-white"
              }`}
            >
              Creatives
            </span>
            <span
              className={`block text-[10px] font-medium tracking-[0.08em] uppercase ${
                scrolled ? "text-orama-gray" : "text-white/60"
              }`}
            >
              Connect · Earn · Grow
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors hover:text-orama-orange ${
                scrolled ? "text-orama-navy/80" : "text-white/80"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#survey"
            className="rounded-full bg-orama-orange px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orama-orange/10 transition-all hover:-translate-y-0.5 hover:bg-orama-orange-light hover:shadow-orama-orange/30 active:translate-y-0"
          >
            Take the Survey
          </a>
        </div>

        <button
          className={`lg:hidden ${scrolled ? "text-orama-navy" : "text-white"}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="glass border-t border-orama-navy/10 px-4 pb-6 pt-2 lg:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm font-medium text-orama-navy/80 transition-colors hover:text-orama-orange"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#survey"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-full bg-orama-orange px-6 py-3 text-center text-sm font-semibold text-white"
          >
            Take the Survey
          </a>
        </div>
      )}
    </header>
  );
}
