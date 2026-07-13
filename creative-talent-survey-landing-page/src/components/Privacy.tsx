import { useState } from "react";

const AFRICAN_DATA_LAWS = [
  { country: "🇺🇬 Uganda", law: "Data Protection and Privacy Act, 2019" },
  { country: "🇰🇪 Kenya", law: "Data Protection Act, 2019" },
  { country: "🇷🇼 Rwanda", law: "Law No. 058/2021 on Personal Data Protection and Privacy" },
  { country: "🇹🇿 Tanzania", law: "Personal Data Protection Act, 2022" },
  { country: "🇸🇸 South Sudan", law: "Constitutional right to privacy (Art. 22, Transitional Constitution)" },
  { country: "🇳🇬 Nigeria", law: "Nigeria Data Protection Act, 2023" },
  { country: "🇿🇦 South Africa", law: "Protection of Personal Information Act (POPIA), 2013" },
  { country: "🇬🇭 Ghana", law: "Data Protection Act, 2012 (Act 843)" },
  { country: "🇪🇬 Egypt", law: "Personal Data Protection Law No. 151, 2020" },
  { country: "🌍 African Union", law: "Malabo Convention on Cyber Security & Personal Data Protection, 2014" },
];

export default function Privacy() {
  const [open, setOpen] = useState(false);

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="rounded-3xl border border-orama-navy/10 bg-orama-cream shadow-sm">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="flex w-full items-center justify-between gap-4 p-6 text-left sm:p-8"
          >
            <span className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orama-orange/10 text-2xl">
                🔒
              </span>
              <span>
                <span className="block font-serif text-xl font-bold text-orama-navy sm:text-2xl">
                  Your privacy is protected by law
                </span>
                <span className="mt-1 block text-sm text-orama-navy/50">
                  How we handle your data — and the laws that back you up.
                </span>
              </span>
            </span>
            <span
              className={`shrink-0 text-orama-orange transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            >
              ▾
            </span>
          </button>

          {open && (
            <div className="animate-fade-in border-t border-orama-navy/10 px-6 pb-8 sm:px-8">
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-orama-navy/70">
                <p>
                  <span className="font-semibold text-orama-navy">Confidential by default.</span>{" "}
                  Your responses are used only to match you with potential opportunities. We
                  never sell your information or share it with third parties without your
                  consent.
                </p>
                <p>
                  <span className="font-semibold text-orama-navy">You stay in control.</span>{" "}
                  You may request to view, correct, or delete your data at any time by
                  contacting us at gig.forafrica@gmail.com.
                </p>
                <p>
                  <span className="font-semibold text-orama-navy">Stored securely.</span>{" "}
                  Responses are kept on access-controlled systems and only reviewed by our
                  matching team.
                </p>
              </div>

              {/* African data protection laws */}
              <div className="mt-8">
                <p className="mb-3 text-xs font-bold tracking-[0.45em] text-orama-orange uppercase">
                  Data protection laws across Africa
                </p>
                <ul className="divide-y divide-orama-navy/5 rounded-2xl border border-orama-navy/10 bg-white">
                  {AFRICAN_DATA_LAWS.map((l) => (
                    <li
                      key={l.country}
                      className="flex flex-col gap-0.5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                    >
                      <span className="shrink-0 text-sm font-semibold text-orama-navy">
                        {l.country}
                      </span>
                      <span className="text-xs text-orama-navy/60 sm:text-right">{l.law}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-orama-navy/40 italic">
                  Wherever you are based in Africa, we honour the data protection standards
                  that apply to you.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
