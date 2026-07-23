export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-orama-navy">
      {/* decorative blobs */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-orama-orange/20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -left-32 h-80 w-80 rounded-full bg-orama-blue blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 bottom-0 h-64 w-64 rounded-full bg-orama-orange/10 blur-2xl" />

      {/* subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 pt-36 pb-24 sm:px-6 lg:px-8 lg:pt-44 lg:pb-32">
        <div className="max-w-3xl">
          <p className="animate-fade-in-up mb-6 text-xs font-bold tracking-[0.45em] text-orama-orange uppercase">
            For Creatives, By Creatives
          </p>
          <h1 className="animate-fade-in-up delay-100 font-serif text-5xl leading-[1.05] font-bold text-white sm:text-6xl md:text-7xl lg:text-8xl">
            Do what you
            <br />
            <span className="gradient-text italic">love</span>. Earn
            <br />
            more doing it.
          </h1>
          <p className="animate-fade-in-up delay-200 mt-8 max-w-xl text-lg leading-relaxed text-white/70 sm:text-xl">
            Turn your voice into impact and your passion into profit. Tell us about your craft and your interaction with the African Creative Space. To get matched with exclusive opportunities and to begin a movement of change, let your voice be heard! Take the survey, and let's shape the African creative landscape together.
          </p>

          <div className="animate-fade-in-up delay-300 mt-10 flex flex-col gap-4 sm:flex-row">
  {/* Primary CTA - Now points to #about and replaces Learn More */}
  <a
    href="#about"
    className="animate-pulse-glow rounded-full bg-orama-orange px-8 py-4 text-center text-base font-semibold text-white shadow-xl transition-all hover:-translate-y-1 hover:bg-orama-orange-light active:translate-y-0"
  >
    Start the Survey →
  </a>
</div>

          <div className="animate-fade-in-up delay-500 mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { value: "10–15", label: "Minutes to complete" },
              { value: "100%", label: "Confidential" },
              { value: "8+", label: "Regions covered" },
              { value: "∞", label: "Room to grow" },
            ].map((s) => (
              <div key={s.label} className="border-l-2 border-orama-orange/40 pl-4">
                <p className="font-serif text-3xl font-bold text-white">{s.value}</p>
                <p className="mt-1 text-xs font-medium tracking-wider text-white/50 uppercase">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-orama-cream to-transparent" />
    </section>
  );
}
