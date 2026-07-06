export default function Footer() {
  return (
    <footer id="contact" className="bg-orama-navy">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orama-orange font-serif text-xl font-bold text-white">
                C
              </span>
              <span className="text-sm font-extrabold tracking-[0.45em] text-white uppercase">
                Creatives
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/50">
              Connecting creatives across Africa with the community, opportunities, and
              income they deserve — doing what they love.
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold tracking-widest text-white/40 uppercase">
              Explore
            </p>
            <ul className="space-y-3 text-sm">
              {[
                ["About the survey", "#about"],
                ["What's in it for you", "#opportunities"],
                ["Take the survey", "#survey"],
              ].map(([label, href]) => (
                <li key={href}>
                  <a href={href} className="text-white/70 transition-colors hover:text-orama-orange">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold tracking-widest text-white/40 uppercase">
              Get in touch
            </p>
            <ul className="space-y-3 text-sm text-white/70">
              <li>hello@creativesconnect.africa</li>
              <li>WhatsApp: +256 700 000 000</li>
              <li>Kampala, Uganda</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} All responses remain confidential.
          </p>
          <p className="text-xs text-white/30">Connect · Earn · Grow</p>
        </div>
      </div>
    </footer>
  );
}
