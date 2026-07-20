import { useMemo, useState } from "react";
import type { CountryData } from "../data/countries";
/* ---------- shared data ---------- */
const DISCIPLINES = [
  "Visual Arts (Painting, Drawing, Sculpture, Muralism)",
  "Music (Performance, Production, Composition, Vocal)",
  "Performing Arts (Theater, Acting, Spoken Word)",
  "Dance & Choreography",
  "Photography",
  "Film & Video (Directing, Cinematography, Editing)",
  "Design (Graphic, Fashion, Interior, Product)",
  "Digital Media (Animation, UI/UX, Web Design)",
  "Writing (Copywriting, Screenwriting, Creative Writing)",
  "Crafts & Maker Arts (Ceramics, Textiles, Jewelry)",
];
const AGE_BRACKETS = ["12 – 20", "21 – 35", "36 – 47", "48+"];
const RESPONDENT_TYPES = [
  "An individual",
  "A company / organization",
];
const SEGMENTS = [
  {
    value: "Aspiring Creative",
    detail:
      "I'm building my creative career — I need networking, skill guidance, and experience to grow.",
  },
  {
    value: "Established Creative",
    detail:
      "I'm a seasoned creative professional — I need tools to build teams, manage projects, and reach bigger clients.",
  },
  {
    value: "Hustler (Non-Creative)",
    detail:
      "I'm not a creative professional, but I need income-generating avenues through gig work.",
  },
  {
    value: "Supporter / Client (Non-Creative)",
    detail:
      "I'm here for entertainment, to hire creatives for projects, or to advertise a business.",
  },
];
const EXPERIENCE = ["Less than 1 year", "1 to 3 years", "4 to 7 years", "8 to 10 years", "Over 10 years"];
const EMPLOYMENT = [
  "Full-time freelance / Independent creative",
  "Employed full-time in my creative field",
  "Employed part-time in my creative field",
  "Employed in a non-creative field, but doing creative work on the side",
  "Student / Apprentice",
  "Unemployed / Looking for opportunities",
];
const INCOME = [
  "Client commissions / Freelance gigs",
  "Selling original art/products",
  "Salaried employment",
  "Teaching / Workshops",
  "Grants / Residencies",
];
const CREATIVE_INCOME_LEVEL = [
  "It doesn't earn money yet",
  "It covers a small part of my needs",
  "It covers about half of my needs",
  "It covers most of my needs",
  "It fully supports me (and others)",
];
const TRAINING = [
  "Yes, a university degree or diploma",
  "Yes, short courses or specialized certifications",
  "No, I am primarily self-taught",
  "No, I learned through traditional apprenticeship / mentorship",
];
const TAUGHT = [
  "Yes, formally (e.g., at a school, university, or established institution)",
  "Yes, informally (e.g., community workshops, private tutoring, mentoring peers)",
  "No, but I am very interested in learning how to teach",
  "No, and I am not interested in teaching",
];
const AGE_GROUPS = [
  "Children (Primary school age)",
  "Youth / Teenagers (High school age)",
  "Young Adults / University level",
  "Adult Beginners",
  "Advanced / Professional Masterclasses",
];
const INITIATIVES = [
  {
    value: "Teaching",
    detail: "Teaching structured, ongoing creative arts classes to students.",
  },
  {
    value: "Collaborating",
    detail: "Participating in community-driven creative projects, exhibitions, or short-term workshops.",
  },
  {
    value: "Freelancing",
    detail: "Receiving notifications for paid, short-term client projects and freelance gigs in your field.",
  },
];
const TIME_COMMIT = [
  "1–5 hours a week",
  "6–10 hours a week",
  "10–20 hours a week (Part-time)",
  "20+ hours a week (Full-time)",
  "I am only available for one-off, short-term gigs",
];
const COMPENSATION = ["Hourly rate", "Monthly salary / Retainer", "Per-project / Per-workshop fee"];
const ATTRACTIONS = [
  "Reliable, on-time payment",
  "Flexible scheduling",
  "Access to professional equipment/studio space",
  "Opportunities to network with other creatives",
  "Creative freedom in how I teach or work",
  "Transport allowance or logistical support",
];
const ROADBLOCKS = [
  {
    value: "Financial Instability",
    detail: "Delayed payments from clients or inconsistent income.",
  },
  {
    value: "Lack of Equipment/Space",
    detail: "No access to high-end cameras, software licenses, instruments, studios, or workshops.",
  },
  {
    value: "Market Access",
    detail: "Difficulty finding high-paying clients, audiences, or distribution channels.",
  },
  {
    value: "High Operational Costs",
    detail: "The prohibitive cost of internet data, electricity, transport, or raw materials.",
  },
  {
    value: "Isolation",
    detail: "Lack of mentorship, peer networks, or a supportive community to collaborate with.",
  },
  {
    value: "Under-valuation",
    detail: "Clients not respecting the time, skill, or worth of creative work.",
  },
  {
    value: "Exploitation/Copyright issues",
    detail: "Lack of knowledge or protection regarding intellectual property and contracts.",
  },
];
const IDEAL_FEATURES = [
  "Clear, structured, and guaranteed upfront payment timelines.",
  "Shared co-working spaces or studios with free high-speed internet and equipment.",
  "Regular masterclasses and mentorship from international or top-tier local experts.",
  "A platform that actively markets my work to premium local and global clients.",
  "Mental health support, community meetups, and wellness spaces for creatives.",
  "Legal aid for contract reviews and copyright protection.",
];
const AWESOME_STATEMENTS = [
  "I need complete creative freedom over my syllabus and the way I work.",
  "I highly value opportunities to collaborate with creatives outside of my own discipline.",
  "It is crucial that the environment feels like a professional creative studio, not a traditional classroom.",
  "I want to be involved in shaping the overall direction of the programs I participate in.",
];
const ALIGNMENT_STATEMENTS = [
  "My primary goal right now is to pass on my skills and mentor the next generation.",
  "I am actively seeking new, long-term partnerships to elevate my professional profile.",
  "I have the bandwidth right now to fully commit to a structured program if it is the right fit.",
  "I am looking for a community to belong to, rather than just independent gig work.",
  "I want to make more money and live comfortably doing what I love.",
];
/* ---------- segment-specific data ---------- */
// Aspiring Creative
const ASPIRING_NEEDS = [
  "Mentorship from experienced creatives",
  "Structured skill training / masterclasses",
  "Networking with other creatives",
  "Landing my first paying clients",
  "Help building a strong portfolio",
  "Access to equipment, software, or studio space",
  "Exposure and audience for my work",
];
// Established Creative
const ESTABLISHED_HIRING = [
  "Yes, I regularly build teams / hire creatives",
  "Sometimes, on a per-project basis",
  "Not yet, but I want to start",
  "No, I work alone by choice",
];
const ESTABLISHED_TOOLS = [
  "Finding vetted talent to build project teams",
  "Project management & collaboration tools",
  "Invoicing, contracts & secure payments",
  "Targeted advertising for my services",
  "Access to bigger / premium clients",
  "Market data & analytics on my industry",
];
// Hustler
const HUSTLER_SITUATIONS = [
  "Student looking for side income",
  "Recent graduate looking for my first opportunity",
  "Unemployed and actively job hunting",
  "Doing informal / casual work",
  "Employed, but I need extra income",
];
const HUSTLER_GIGS = [
  "Event support (setup, ushering, crew)",
  "Sales, promotion & brand activations",
  "Delivery & errands",
  "Digital tasks (data entry, social media, research)",
  "Assisting creatives (photo/video/stage assistance)",
  "Skilled trades (tailoring, carpentry, hair & beauty)",
  "Anything available — I need income",
];
const HUSTLER_LEARNING = [
  "Yes, immediately — sign me up",
  "Yes, if the training is free or affordable",
  "Maybe, depending on the skill",
  "No, I just want gigs right now",
];
const DEVICE_ACCESS = [
  "Smartphone with reliable internet",
  "Smartphone, but data is expensive for me",
  "Basic phone only",
  "I share or borrow a device",
];
const HUSTLER_FEATURES = [
  "Fast payouts immediately after completing a gig.",
  "A steady stream of gigs near where I live.",
  "Free or affordable training that leads to better-paying work.",
  "A trusted rating system so good work brings me more gigs.",
  "Transport, airtime, or data support for gigs.",
];
// Supporter / Client
const CLIENT_INTERESTS = [
  "Discovering events & entertainment",
  "Buying art, fashion, or handmade products",
  "Hiring creatives for projects",
  "Advertising my business / brand",
  "Sponsoring or investing in creative talent",
];
const CLIENT_SERVICES = [
  "Photography & video",
  "Music, DJs & live performers",
  "Design & branding",
  "Fashion, crafts & handmade products",
  "Content creation & social media",
  "Events & entertainment",
  "Writing & copywriting",
];
const CLIENT_DISCOVERY = [
  "Word of mouth / personal referrals",
  "Social media",
  "Agencies",
  "Online platforms / marketplaces",
  "I struggle to find them at all",
];
const CLIENT_FRUSTRATIONS = [
  "Hard to verify quality before paying",
  "Unreliable delivery / missed deadlines",
  "Unclear or inconsistent pricing",
  "No secure way to pay",
  "Hard to discover events & entertainment near me",
  "Limited choice of creatives where I live",
];
const CLIENT_SPEND = [
  "Almost nothing",
  "A little, occasionally",
  "A steady monthly amount",
  "Significant — it's part of my business budget",
];
const CLIENT_PLATFORM = [
  "Definitely — I'd use it right away",
  "Probably",
  "Maybe",
  "No",
];
const CLIENT_FEATURES = [
  "Verified portfolios and reviews before I hire.",
  "Transparent, upfront pricing.",
  "Secure payments with delivery protection.",
  "Easy discovery of local events and entertainment.",
  "Tools to run targeted ads with local creatives.",
];
// Shared economy pulse
const LOCAL_ECONOMY = [
  "Very limited — almost no way to earn from creativity here",
  "Weak — a few opportunities, hard to find",
  "Growing — opportunities exist but are inconsistent",
  "Active — steady opportunities if you know where to look",
  "Thriving — the creative scene here is strong",
];
/* ---------- small UI helpers ---------- */
function QuestionBlock({
  number,
  label,
  hint,
  children,
}: {
  number: number;
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-orama-navy/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8">
      <p className="mb-1 flex items-start gap-3 font-semibold text-orama-navy">
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orama-orange/10 text-xs font-bold text-orama-orange">
          {number}
        </span>
        <span>{label}</span>
      </p>
      {hint && <p className="mb-3 ml-9 text-sm text-orama-navy/50 italic">{hint}</p>}
      <div className="ml-9 mt-4">{children}</div>
    </div>
  );
}
function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full rounded-xl border border-orama-navy/15 bg-orama-cream/50 px-4 py-3 text-sm text-orama-navy outline-none transition-all placeholder:text-orama-navy/30 focus:border-orama-orange focus:ring-2 focus:ring-orama-orange/20"
    />
  );
}
function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      rows={3}
      {...props}
      className="w-full rounded-xl border border-orama-navy/15 bg-orama-cream/50 px-4 py-3 text-sm text-orama-navy outline-none transition-all placeholder:text-orama-navy/30 focus:border-orama-orange focus:ring-2 focus:ring-orama-orange/20"
    />
  );
}
function RadioGroup({
  options,
  value,
  onChange,
  otherValue,
  onOtherChange,
  otherLabel = "Other:",
  details,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  otherValue?: string;
  onOtherChange?: (v: string) => void;
  otherLabel?: string;
  details?: Record<string, string>;
}) {
  return (
    <div className="space-y-2">
      {options.map((opt) => (
        <label
          key={opt}
          className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 text-sm transition-all ${
            value === opt
              ? "border-orama-orange bg-orama-orange/5 text-orama-navy"
              : "border-orama-navy/10 text-orama-navy/70 hover:border-orama-orange/30 hover:bg-orama-orange/5"
          }`}
        >
          <span
            className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
              value === opt ? "border-orama-orange" : "border-orama-navy/30"
            }`}
          >
            {value === opt && <span className="h-2 w-2 rounded-full bg-orama-orange" />}
          </span>
          <input
            type="radio"
            className="sr-only"
            checked={value === opt}
            onChange={() => onChange(opt)}
          />
          <span>
            <span className={value === opt ? "font-semibold" : ""}>{opt}</span>
            {details?.[opt] && (
              <span className="mt-0.5 block text-xs text-orama-navy/50">{details[opt]}</span>
            )}
          </span>
        </label>
      ))}
      {onOtherChange && (
        <label
          className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-all ${
            value === "__other__"
              ? "border-orama-orange bg-orama-orange/5"
              : "border-orama-navy/10 hover:border-orama-orange/30"
          }`}
        >
          <span
            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
              value === "__other__" ? "border-orama-orange" : "border-orama-navy/30"
            }`}
          >
            {value === "__other__" && <span className="h-2 w-2 rounded-full bg-orama-orange" />}
          </span>
          <input
            type="radio"
            className="sr-only"
            checked={value === "__other__"}
            onChange={() => onChange("__other__")}
          />
          <span className="shrink-0 text-orama-navy/70">{otherLabel}</span>
          <input
            type="text"
            value={otherValue ?? ""}
            onFocus={() => onChange("__other__")}
            onChange={(e) => onOtherChange(e.target.value)}
            placeholder="Please specify"
            className="w-full border-b border-orama-navy/20 bg-transparent px-1 py-0.5 text-sm outline-none focus:border-orama-orange"
          />
        </label>
      )}
    </div>
  );
}
function CheckboxGroup({
  options,
  values,
  onToggle,
  max,
  renderDetail,
}: {
  options: string[];
  values: string[];
  onToggle: (v: string) => void;
  max?: number;
  renderDetail?: (v: string) => string | undefined;
}) {
  return (
    <div className="space-y-2">
      {options.map((opt) => {
        const checked = values.includes(opt);
        const disabled = !checked && max !== undefined && values.length >= max;
        const detail = renderDetail?.(opt);
        return (
          <label
            key={opt}
            className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm transition-all ${
              checked
                ? "border-orama-orange bg-orama-orange/5 text-orama-navy"
                : disabled
                  ? "cursor-not-allowed border-orama-navy/10 text-orama-navy/30"
                  : "cursor-pointer border-orama-navy/10 text-orama-navy/70 hover:border-orama-orange/30 hover:bg-orama-orange/5"
            }`}
          >
            <span
              className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border-2 transition-all ${
                checked ? "border-orama-orange bg-orama-orange" : "border-orama-navy/30"
              }`}
            >
              {checked && (
                <svg className="h-3 w-3 text-white" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              )}
            </span>
            <input
              type="checkbox"
              className="sr-only"
              checked={checked}
              disabled={disabled}
              onChange={() => onToggle(opt)}
            />
            <span>
              <span className={checked ? "font-semibold" : ""}>{opt}</span>
              {detail && <span className="mt-0.5 block text-xs text-orama-navy/50">{detail}</span>}
            </span>
          </label>
        );
      })}
    </div>
  );
}
function LikertGroup({
  statements,
  ratings,
  onRate,
  lowLabel,
  highLabel,
}: {
  statements: string[];
  ratings: Record<string, number>;
  onRate: (statement: string, value: number) => void;
  lowLabel: string;
  highLabel: string;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs font-medium text-orama-navy/50">
        <span>1 = {lowLabel}</span>
        <span>5 = {highLabel}</span>
      </div>
      {statements.map((s) => {
        const current = ratings[s] ?? 0;
        return (
          <div
            key={s}
            className={`rounded-xl border px-4 py-4 transition-all ${
              current > 0
                ? "border-orama-orange bg-orama-orange/5"
                : "border-orama-navy/10 hover:border-orama-orange/30"
            }`}
          >
            <p className="text-sm font-medium text-orama-navy">{s}</p>
            <div className="mt-3 flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => onRate(s, n)}
                  aria-label={`Rate ${n} out of 5`}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-all sm:h-11 sm:w-11 ${
                    current === n
                      ? "scale-110 border-orama-orange bg-orama-orange text-white shadow-lg shadow-orama-orange/30"
                      : n < current
                        ? "border-orama-orange/40 bg-orama-orange/10 text-orama-orange"
                        : "border-orama-navy/15 bg-white text-orama-navy/50 hover:border-orama-orange/50 hover:text-orama-orange"
                  }`}
                >
                  {n}
                </button>
              ))}
              {current > 0 && (
                <span className="animate-fade-in ml-2 hidden text-xs font-semibold text-orama-orange sm:inline">
                  {current}/5
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
function SectionHeader({
  index,
  title,
  subtitle,
}: {
  index: number;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="pt-4">
      <p className="mb-2 text-xs font-bold tracking-[0.45em] text-orama-orange uppercase">
        Section {index}
      </p>
      <h3 className="font-serif text-3xl font-bold text-orama-navy">{title}</h3>
      <p className="mt-2 text-orama-navy/60">{subtitle}</p>
      <div className="mt-4 h-px w-full bg-gradient-to-r from-orama-orange/40 to-transparent" />
    </div>
  );
}
/* ---------- serialization helpers for Formspree ---------- */
const joinList = (arr: string[]) => arr.join("; ");
const joinRatings = (r: Record<string, number>) =>
  Object.entries(r)
    .map(([k, v]) => `${k} => ${v}/5`)
    .join(" | ");
/* ---------- main component ---------- */
export default function Survey({ country }: { country: CountryData }) {
  // Section 1 — everyone
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [ageBracket, setAgeBracket] = useState("");
  const [location, setLocation] = useState("");
  const [locationOther, setLocationOther] = useState("");
  const [respondentType, setRespondentType] = useState("");
  const [segment, setSegment] = useState("");
  // Creative work (aspiring + established)
  const [primary, setPrimary] = useState("");
  const [primaryOther, setPrimaryOther] = useState("");
  const [secondary, setSecondary] = useState<string[]>([]);
  const [experience, setExperience] = useState("");
  const [employment, setEmployment] = useState("");
  const [income, setIncome] = useState("");
  const [incomeOther, setIncomeOther] = useState("");
  const [creativeIncomeLevel, setCreativeIncomeLevel] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [training, setTraining] = useState("");
  const [trainingSpecify, setTrainingSpecify] = useState("");
  // Aspiring-specific
  const [aspiringNeeds, setAspiringNeeds] = useState<string[]>([]);
  const [aspiringSkillsWanted, setAspiringSkillsWanted] = useState("");
  // Established-specific
  const [hiringStatus, setHiringStatus] = useState("");
  const [scalingTools, setScalingTools] = useState<string[]>([]);
  const [scalingBottleneck, setScalingBottleneck] = useState("");
  // Teaching (creatives)
  const [taught, setTaught] = useState("");
  const [ageGroups, setAgeGroups] = useState<string[]>([]);
  const [teachSkills, setTeachSkills] = useState("");
  const [teachNeeds, setTeachNeeds] = useState("");
  // Opportunities (creatives)
  const [initiatives, setInitiatives] = useState<string[]>([]);
  const [timeCommit, setTimeCommit] = useState("");
  const [compensation, setCompensation] = useState("");
  const [compensationOther, setCompensationOther] = useState("");
  const [attractions, setAttractions] = useState<string[]>([]);
  const [challenges, setChallenges] = useState("");
  // Hustler-specific
  const [hustlerSituation, setHustlerSituation] = useState("");
  const [hustlerGigs, setHustlerGigs] = useState<string[]>([]);
  const [hustlerSkills, setHustlerSkills] = useState("");
  const [hustlerLearning, setHustlerLearning] = useState("");
  const [hustlerTime, setHustlerTime] = useState("");
  const [deviceAccess, setDeviceAccess] = useState("");
  const [hustlerRatings, setHustlerRatings] = useState<Record<string, number>>({});
  // Client-specific
  const [clientInterests, setClientInterests] = useState<string[]>([]);
  const [clientServices, setClientServices] = useState<string[]>([]);
  const [clientDiscovery, setClientDiscovery] = useState("");
  const [clientDiscoveryOther, setClientDiscoveryOther] = useState("");
  const [clientFrustrations, setClientFrustrations] = useState<string[]>([]);
  const [clientSpend, setClientSpend] = useState("");
  const [clientPlatform, setClientPlatform] = useState("");
  const [clientRatings, setClientRatings] = useState<Record<string, number>>({});
  // Shared closing
  const [localEconomy, setLocalEconomy] = useState("");
  const [roadblocks, setRoadblocks] = useState<string[]>([]);
  const [roadblockOther, setRoadblockOther] = useState("");
  const [featureRatings, setFeatureRatings] = useState<Record<string, number>>({});
  const [awesomeRatings, setAwesomeRatings] = useState<Record<string, number>>({});
  const [alignmentRatings, setAlignmentRatings] = useState<Record<string, number>>({});
  const rate =
    (set: React.Dispatch<React.SetStateAction<Record<string, number>>>) =>
    (statement: string, value: number) =>
      set((prev) => ({ ...prev, [statement]: value }));
  const toggle = (list: string[], set: (v: string[]) => void, v: string, max?: number) => {
    if (list.includes(v)) set(list.filter((x) => x !== v));
    else if (max === undefined || list.length < max) set([...list, v]);
  };
  /* ---------- segment flags ---------- */
  const isAspiring = segment === SEGMENTS[0].value;
  const isEstablished = segment === SEGMENTS[1].value;
  const isHustler = segment === SEGMENTS[2].value;
  const isClient = segment === SEGMENTS[3].value;
  const isCreative = isAspiring || isEstablished;
  const skipTeaching = taught === TAUGHT[3];
  /* ---------- progress (adapts to segment) ---------- */
  const progress = useMemo(() => {
    const base: (string | boolean)[] = [
      fullName,
      phone,
      email,
      ageBracket,
      location,
      respondentType,
      segment,
    ];
    let branch: (string | boolean)[] = [];
    if (isCreative) {
      branch = [
        primary,
        secondary.length > 0,
        experience,
        employment,
        income,
        creativeIncomeLevel,
        portfolio,
        training,
        ...(isAspiring
          ? [aspiringNeeds.length > 0, aspiringSkillsWanted]
          : [hiringStatus, scalingTools.length > 0, scalingBottleneck]),
        taught,
        skipTeaching || ageGroups.length > 0,
        skipTeaching || !!teachSkills,
        skipTeaching || !!teachNeeds,
        initiatives.length > 0,
        timeCommit,
        compensation,
        attractions.length > 0,
        challenges,
      ];
    } else if (isHustler) {
      branch = [
        hustlerSituation,
        hustlerGigs.length > 0,
        hustlerSkills,
        hustlerLearning,
        hustlerTime,
        deviceAccess,
        Object.keys(hustlerRatings).length >= HUSTLER_FEATURES.length,
      ];
    } else if (isClient) {
      branch = [
        clientInterests.length > 0,
        clientServices.length > 0,
        clientDiscovery,
        clientFrustrations.length > 0,
        clientSpend,
        clientPlatform,
        Object.keys(clientRatings).length >= CLIENT_FEATURES.length,
      ];
    }
    let closing: (string | boolean)[] = [];
    if (segment) {
      closing = [localEconomy];
      if (!isClient) closing.push(roadblocks.length > 0);
      if (isCreative)
        closing.push(
          Object.keys(featureRatings).length >= IDEAL_FEATURES.length,
          Object.keys(awesomeRatings).length >= AWESOME_STATEMENTS.length,
          Object.keys(alignmentRatings).length >= ALIGNMENT_STATEMENTS.length
        );
    }
    const all = [...base, ...branch, ...closing];
    const answered = all.filter(Boolean).length;
    return Math.round((answered / all.length) * 100);
  }, [
    fullName, phone, email, ageBracket, location, respondentType, segment,
    primary, secondary, experience, employment, income, creativeIncomeLevel,
    portfolio, training, aspiringNeeds, aspiringSkillsWanted, hiringStatus,
    scalingTools, scalingBottleneck, taught, ageGroups, teachSkills, teachNeeds,
    initiatives, timeCommit, compensation, attractions, challenges,
    hustlerSituation, hustlerGigs, hustlerSkills, hustlerLearning, hustlerTime,
    deviceAccess, hustlerRatings, clientInterests, clientServices, clientDiscovery,
    clientFrustrations, clientSpend, clientPlatform, clientRatings, localEconomy,
    roadblocks, featureRatings, awesomeRatings, alignmentRatings,
    isCreative, isAspiring, isHustler, isClient, skipTeaching,
  ]);
  /* ---------- dynamic question numbering ---------- */
 let qn = 0;
  const num = () => ++qn;
  let sn = 1;
  const sec = () => ++sn;

  const customSubmitHandler = async (e: any) => {
  
    e.preventDefault(); 
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      // Hardcoding the URL here so we can remove it from the HTML
      const response = await fetch("https://formspree.io/f/mnjeqdwj", {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        window.location.href = "/thankyou.html"; 
      } else {
        alert("There was an issue submitting your form. Please try again.");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <section id="survey" className="bg-orama-cream py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <p className="mb-4 text-xs font-bold tracking-[0.45em] text-orama-orange uppercase">
            The Survey
          </p>
          <h2 className="font-serif text-4xl font-bold text-orama-navy sm:text-5xl">
            Creative Talent & <span className="gradient-text italic">Opportunity</span>{" "}
            Survey
          </h2>
          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-orama-navy/60">
            Hello! Would you love to connect with creatives across Africa and earn more
            money doing what you love? Whether you create, hustle, hire, or simply enjoy —
            this survey adapts to you and takes about 10–15 minutes. Your responses will
            remain confidential and will only be used to match you with potential
            opportunities. Thank you for sharing your time with us!
          </p>
        </div>
        {/* sticky progress */}
        <div className="sticky top-20 z-40 mt-10 rounded-full border border-orama-navy/10 bg-white/90 p-2 shadow-lg shadow-orama-navy/5 backdrop-blur-sm">
          <div className="flex items-center gap-3 px-2">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-orama-navy/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-orama-orange to-orama-orange-light transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs font-bold text-orama-navy/60">{progress}%</span>
          </div>
        </div>
        <form
          action="https://formspree.io/f/mnjeqdwj"
          method="POST"
          onSubmit={customSubmitHandler}
          className="mt-10 space-y-6"
        >
          <input
            type="hidden"
            name="_next"
            value="https://creativesurveyafrica.netlify.app/thankyou.html"
          />
          <input type="hidden" name="_subject" value="New Creative Survey Response" />
          {/* ---- hidden fields: everything the custom controls collect ---- */}
          <input type="hidden" name="country" value={country.name} />
          <input type="hidden" name="dial_code" value={country.dialCode} />
          <input type="hidden" name="age_bracket" value={ageBracket} />
          <input
            type="hidden"
            name="location"
            value={location === "__other__" ? `Other: ${locationOther}` : location}
          />
          <input type="hidden" name="respondent_type" value={respondentType} />
          <input type="hidden" name="customer_segment" value={segment} />
          {isCreative && (
            <>
              <input
                type="hidden"
                name="primary_discipline"
                value={primary === "__other__" ? `Other: ${primaryOther}` : primary}
              />
              <input type="hidden" name="secondary_disciplines" value={joinList(secondary)} />
              <input type="hidden" name="years_of_experience" value={experience} />
              <input type="hidden" name="employment_status" value={employment} />
              <input
                type="hidden"
                name="main_income_source"
                value={income === "__other__" ? `Other: ${incomeOther}` : income}
              />
              <input type="hidden" name="creative_income_level" value={creativeIncomeLevel} />
              <input type="hidden" name="formal_training" value={training} />
              <input type="hidden" name="teaching_experience" value={taught} />
              <input type="hidden" name="teaching_age_groups" value={joinList(ageGroups)} />
              <input type="hidden" name="opportunity_interests" value={joinList(initiatives)} />
              <input type="hidden" name="time_commitment" value={timeCommit} />
              <input
                type="hidden"
                name="compensation_preference"
                value={compensation === "__other__" ? `Other: ${compensationOther}` : compensation}
              />
              <input type="hidden" name="opportunity_attractions" value={joinList(attractions)} />
              <input type="hidden" name="ideal_feature_ratings" value={joinRatings(featureRatings)} />
              <input type="hidden" name="awesome_experience_ratings" value={joinRatings(awesomeRatings)} />
              <input type="hidden" name="goal_alignment_ratings" value={joinRatings(alignmentRatings)} />
            </>
          )}
          {isAspiring && (
            <input type="hidden" name="aspiring_growth_needs" value={joinList(aspiringNeeds)} />
          )}
          {isEstablished && (
            <>
              <input type="hidden" name="team_building_status" value={hiringStatus} />
              <input type="hidden" name="scaling_tools_needed" value={joinList(scalingTools)} />
            </>
          )}
          {isHustler && (
            <>
              <input type="hidden" name="hustler_situation" value={hustlerSituation} />
              <input type="hidden" name="gig_types_wanted" value={joinList(hustlerGigs)} />
              <input type="hidden" name="open_to_learning_skill" value={hustlerLearning} />
              <input type="hidden" name="gig_time_available" value={hustlerTime} />
              <input type="hidden" name="device_and_internet_access" value={deviceAccess} />
              <input type="hidden" name="gig_platform_feature_ratings" value={joinRatings(hustlerRatings)} />
            </>
          )}
          {isClient && (
            <>
              <input type="hidden" name="client_interests" value={joinList(clientInterests)} />
              <input type="hidden" name="services_would_pay_for" value={joinList(clientServices)} />
              <input
                type="hidden"
                name="how_they_find_creatives"
                value={clientDiscovery === "__other__" ? `Other: ${clientDiscoveryOther}` : clientDiscovery}
              />
              <input type="hidden" name="hiring_frustrations" value={joinList(clientFrustrations)} />
              <input type="hidden" name="monthly_creative_spend" value={clientSpend} />
              <input type="hidden" name="would_use_platform" value={clientPlatform} />
              <input type="hidden" name="client_platform_feature_ratings" value={joinRatings(clientRatings)} />
            </>
          )}
          {segment && (
            <>
              <input type="hidden" name="local_creative_economy_rating" value={localEconomy} />
              {!isClient && (
                <input type="hidden" name="career_roadblocks" value={joinList(roadblocks)} />
              )}
            </>
          )}
          {/* ---------- SECTION 1: everyone ---------- */}
          <SectionHeader
            index={1}
            title="Getting to Know You"
            subtitle="Understanding who you are — the rest of the survey adapts to your answers. Note: Feel free to skip any contact question that would seem an invasion of privacy but we do encourage you to leave at least one contact point (email or phone number) for any questions on this matter, please refer to the privacy policy."
          />
          <QuestionBlock number={num()} label="Full Name">
            <TextInput
              required
              name="full_name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your full name (Optional if you prefer to remain anonymous)"
            />
          </QuestionBlock>
          <QuestionBlock number={num()} label="Phone Number / WhatsApp">
            <TextInput
              required
              name="phone_number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={`${country.dialCode} ...`}
            />
          </QuestionBlock>
          <QuestionBlock number={num()} label="Email Address">
            <TextInput
              required
              name="email_address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </QuestionBlock>
          <QuestionBlock number={num()} label="What is your age bracket?">
            <RadioGroup options={AGE_BRACKETS} value={ageBracket} onChange={setAgeBracket} />
          </QuestionBlock>
          <QuestionBlock number={num()} label={`Where are you currently based in ${country.name}?`}>
            <RadioGroup
              options={country.locations}
              value={location}
              onChange={setLocation}
              otherValue={locationOther}
              onOtherChange={setLocationOther}
            />
          </QuestionBlock>
          <QuestionBlock number={num()} label="Are you answering as an individual or on behalf of a company?">
            <RadioGroup
              options={RESPONDENT_TYPES}
              value={respondentType}
              onChange={setRespondentType}
            />
          </QuestionBlock>
          <QuestionBlock
            number={num()}
            label="Which of these best describes you right now?"
            hint="Your answer shapes the rest of the survey — pick the one closest to your situation."
          >
            <RadioGroup
              options={SEGMENTS.map((s) => s.value)}
              value={segment}
              onChange={setSegment}
              details={Object.fromEntries(SEGMENTS.map((s) => [s.value, s.detail]))}
            />
          </QuestionBlock>
          {!segment && (
            <p className="animate-fade-in rounded-xl bg-orama-orange/10 px-4 py-3 text-center text-sm font-medium text-orama-orange">
              ✨ Choose the option above that fits you best — your personalized questions
              will appear here.
            </p>
          )}
          {/* ---------- CREATIVE PATH (Aspiring + Established) ---------- */}
          {isCreative && (
            <>
              <SectionHeader
                index={sec()}
                title="Your Creative Work & Portfolio"
                subtitle="Understanding your current practice and professional background."
              />
              <QuestionBlock
                number={num()}
                label="What is your primary creative discipline?"
                hint="Select the one you focus on most."
              >
                <RadioGroup
                  options={DISCIPLINES}
                  value={primary}
                  onChange={setPrimary}
                  otherValue={primaryOther}
                  onOtherChange={setPrimaryOther}
                />
              </QuestionBlock>
              <QuestionBlock
                number={num()}
                label="Do you practice any secondary creative disciplines?"
                hint="Check all that apply."
              >
                <CheckboxGroup
                  options={DISCIPLINES}
                  values={secondary}
                  onToggle={(v) => toggle(secondary, setSecondary, v)}
                />
              </QuestionBlock>
              <QuestionBlock
                number={num()}
                label="How many years of experience do you have in your primary creative field?"
              >
                <RadioGroup options={EXPERIENCE} value={experience} onChange={setExperience} />
              </QuestionBlock>
              <QuestionBlock number={num()} label="Which best describes your current employment status?">
                <RadioGroup options={EMPLOYMENT} value={employment} onChange={setEmployment} />
              </QuestionBlock>
              <QuestionBlock number={num()} label="How do you currently earn most of your income?">
                <RadioGroup
                  options={INCOME}
                  value={income}
                  onChange={setIncome}
                  otherValue={incomeOther}
                  onOtherChange={setIncomeOther}
                />
              </QuestionBlock>
              <QuestionBlock
                number={num()}
                label="How much of your living costs does your creative work currently cover?"
                hint="This helps us map how the creative economy is really performing where you live."
              >
                <RadioGroup
                  options={CREATIVE_INCOME_LEVEL}
                  value={creativeIncomeLevel}
                  onChange={setCreativeIncomeLevel}
                />
              </QuestionBlock>
              <QuestionBlock
                number={num()}
                label="Please share a link to your portfolio, social media page (Instagram, TikTok, YouTube), or website where we can see your work:"
                hint="If you don't have a link, you can email 3–5 examples of your work to gig.forafrica@gmail.com."
              >
                <TextInput
                  name="portfolio"
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                  placeholder="https://..."
                />
              </QuestionBlock>
              <QuestionBlock
                number={num()}
                label="Do you have any formal training, certifications, or degrees in your field?"
              >
                <RadioGroup options={TRAINING} value={training} onChange={setTraining} />
                <div className="mt-3">
                  <TextInput
                    name="training_details"
                    value={trainingSpecify}
                    onChange={(e) => setTrainingSpecify(e.target.value)}
                    placeholder="Please specify (Optional)"
                  />
                </div>
              </QuestionBlock>
              {/* ---- Aspiring-only ---- */}
              {isAspiring && (
                <>
                  <SectionHeader
                    index={sec()}
                    title="Growing Your Career"
                    subtitle="What you need most right now to move from aspiring to established."
                  />
                  <QuestionBlock
                    number={num()}
                    label="What do you most need right now to grow your creative career?"
                    hint={`Select up to 3. (${aspiringNeeds.length}/3 selected)`}
                  >
                    <CheckboxGroup
                      options={ASPIRING_NEEDS}
                      values={aspiringNeeds}
                      onToggle={(v) => toggle(aspiringNeeds, setAspiringNeeds, v, 3)}
                      max={3}
                    />
                  </QuestionBlock>
                  <QuestionBlock
                    number={num()}
                    label="Which specific skills do you most want to learn or sharpen?"
                    hint='e.g., "Color grading in DaVinci," "Pricing my design work," "Stage presence"'
                  >
                    <TextArea
                      name="skills_wanted"
                      value={aspiringSkillsWanted}
                      onChange={(e) => setAspiringSkillsWanted(e.target.value)}
                      placeholder="The skills that would change your career..."
                    />
                  </QuestionBlock>
                </>
              )}
              {/* ---- Established-only ---- */}
              {isEstablished && (
                <>
                  <SectionHeader
                    index={sec()}
                    title="Scaling Your Practice"
                    subtitle="Understanding how you build teams, manage projects, and grow your client base."
                  />
                  <QuestionBlock
                    number={num()}
                    label="Do you currently build teams or hire other creatives for projects?"
                  >
                    <RadioGroup
                      options={ESTABLISHED_HIRING}
                      value={hiringStatus}
                      onChange={setHiringStatus}
                    />
                  </QuestionBlock>
                  <QuestionBlock
                    number={num()}
                    label="Which business tools would most help you scale?"
                    hint={`Select up to 3. (${scalingTools.length}/3 selected)`}
                  >
                    <CheckboxGroup
                      options={ESTABLISHED_TOOLS}
                      values={scalingTools}
                      onToggle={(v) => toggle(scalingTools, setScalingTools, v, 3)}
                      max={3}
                    />
                  </QuestionBlock>
                  <QuestionBlock
                    number={num()}
                    label="What is your biggest bottleneck when managing larger projects or clients?"
                  >
                    <TextArea
                      name="scaling_bottleneck"
                      value={scalingBottleneck}
                      onChange={(e) => setScalingBottleneck(e.target.value)}
                      placeholder="Tell us what slows you down..."
                    />
                  </QuestionBlock>
                </>
              )}
              {/* ---- Teaching (both creative segments) ---- */}
              <SectionHeader
                index={sec()}
                title="Teaching & Mentorship Experience"
                subtitle="Assessing your capability and interest in guiding others."
              />
              <QuestionBlock
                number={num()}
                label="Have you ever taught, mentored, or run workshops in your creative field?"
              >
                <RadioGroup options={TAUGHT} value={taught} onChange={setTaught} />
                {skipTeaching && (
                  <p className="animate-fade-in mt-4 rounded-xl bg-orama-orange/10 px-4 py-3 text-sm font-medium text-orama-orange">
                    No problem — the teaching questions have been skipped. Continue below.
                  </p>
                )}
              </QuestionBlock>
              {!skipTeaching && (
                <>
                  <QuestionBlock
                    number={num()}
                    label="Which age groups or skill levels do you feel most comfortable teaching?"
                    hint="Check all that apply."
                  >
                    <CheckboxGroup
                      options={AGE_GROUPS}
                      values={ageGroups}
                      onToggle={(v) => toggle(ageGroups, setAgeGroups, v)}
                    />
                  </QuestionBlock>
                  <QuestionBlock
                    number={num()}
                    label="If you were to teach a class, what 1 or 2 specific skills would you focus on?"
                    hint='e.g., "Portrait photography with natural light," "Audio mixing for Afrobeats," "Basics of watercolor"'
                  >
                    <TextArea
                      name="skills_would_teach"
                      value={teachSkills}
                      onChange={(e) => setTeachSkills(e.target.value)}
                      placeholder="Describe the skill(s) you would teach..."
                    />
                  </QuestionBlock>
                  <QuestionBlock
                    number={num()}
                    label="What materials, software, or equipment would you absolutely need to teach your specific skill?"
                  >
                    <TextArea
                      name="materials_needed_to_teach"
                      value={teachNeeds}
                      onChange={(e) => setTeachNeeds(e.target.value)}
                      placeholder="List what you would need..."
                    />
                  </QuestionBlock>
                </>
              )}
              {/* ---- Opportunities & Logistics (both creative segments) ---- */}
              <SectionHeader
                index={sec()}
                title="Opportunities & Availability"
                subtitle="Matching you with opportunities to connect, earn, and grow."
              />
              <QuestionBlock
                number={num()}
                label="Which kinds of opportunities interest you?"
                hint="Check all that apply."
              >
                <CheckboxGroup
                  options={INITIATIVES.map((i) => i.value)}
                  values={initiatives}
                  onToggle={(v) => toggle(initiatives, setInitiatives, v)}
                  renderDetail={(v) => INITIATIVES.find((i) => i.value === v)?.detail}
                />
              </QuestionBlock>
              <QuestionBlock
                number={num()}
                label="How much time could you realistically commit to an opportunity (like teaching or collaborating) right now?"
              >
                <RadioGroup options={TIME_COMMIT} value={timeCommit} onChange={setTimeCommit} />
              </QuestionBlock>
              <QuestionBlock
                number={num()}
                label="What is your preferred compensation structure for teaching or collaborating?"
              >
                <RadioGroup
                  options={COMPENSATION}
                  value={compensation}
                  onChange={setCompensation}
                  otherValue={compensationOther}
                  onOtherChange={setCompensationOther}
                />
              </QuestionBlock>
              <QuestionBlock
                number={num()}
                label="What would make an opportunity (like teaching or taking on a gig) most attractive to you?"
                hint={`Select up to 3. (${attractions.length}/3 selected)`}
              >
                <CheckboxGroup
                  options={ATTRACTIONS}
                  values={attractions}
                  onToggle={(v) => toggle(attractions, setAttractions, v, 3)}
                  max={3}
                />
              </QuestionBlock>
              <QuestionBlock
                number={num()}
                label="Do you anticipate any logistical challenges that might prevent you from participating in these programs?"
                hint="e.g., transportation, internet access, lack of personal equipment"
              >
                <TextArea
                  name="logistical_challenges"
                  value={challenges}
                  onChange={(e) => setChallenges(e.target.value)}
                  placeholder="Share any challenges we should know about..."
                />
              </QuestionBlock>
            </>
          )}
          {/* ---------- HUSTLER PATH ---------- */}
          {isHustler && (
            <>
              <SectionHeader
                index={sec()}
                title="Your Hustle & Income Needs"
                subtitle="Understanding your situation so we can connect you with real, paying gig work."
              />
              <QuestionBlock number={num()} label="Which best describes your current situation?">
                <RadioGroup
                  options={HUSTLER_SITUATIONS}
                  value={hustlerSituation}
                  onChange={setHustlerSituation}
                />
              </QuestionBlock>
              <QuestionBlock
                number={num()}
                label="What kinds of paid gigs would you take?"
                hint="Check all that apply."
              >
                <CheckboxGroup
                  options={HUSTLER_GIGS}
                  values={hustlerGigs}
                  onToggle={(v) => toggle(hustlerGigs, setHustlerGigs, v)}
                />
              </QuestionBlock>
              <QuestionBlock
                number={num()}
                label="What skills or experience do you already have?"
                hint="Anything counts — school, past jobs, things you do for family and friends."
              >
                <TextArea
                  name="existing_skills"
                  value={hustlerSkills}
                  onChange={(e) => setHustlerSkills(e.target.value)}
                  placeholder="Tell us what you can do..."
                />
              </QuestionBlock>
              <QuestionBlock
                number={num()}
                label="Would you learn a creative or digital skill if it led to paid work?"
              >
                <RadioGroup
                  options={HUSTLER_LEARNING}
                  value={hustlerLearning}
                  onChange={setHustlerLearning}
                />
              </QuestionBlock>
              <QuestionBlock number={num()} label="How much time can you commit to gig work?">
                <RadioGroup options={TIME_COMMIT} value={hustlerTime} onChange={setHustlerTime} />
              </QuestionBlock>
              <QuestionBlock
                number={num()}
                label="What phone and internet access do you have?"
                hint="This helps us design a gig platform that works for your reality."
              >
                <RadioGroup options={DEVICE_ACCESS} value={deviceAccess} onChange={setDeviceAccess} />
              </QuestionBlock>
              <QuestionBlock
                number={num()}
                label="Please rate how important each of the following would be on a gig platform."
                hint="1 = Not at all important, 5 = Extremely important"
              >
                <LikertGroup
                  statements={HUSTLER_FEATURES}
                  ratings={hustlerRatings}
                  onRate={rate(setHustlerRatings)}
                  lowLabel="Not at all important"
                  highLabel="Extremely important"
                />
              </QuestionBlock>
            </>
          )}
          {/* ---------- CLIENT / SUPPORTER PATH ---------- */}
          {isClient && (
            <>
              <SectionHeader
                index={sec()}
                title="Entertainment, Hiring & Advertising"
                subtitle="Understanding what you look for — and what stops you — when engaging the creative scene."
              />
              <QuestionBlock
                number={num()}
                label="What brings you to the creative scene?"
                hint="Check all that apply."
              >
                <CheckboxGroup
                  options={CLIENT_INTERESTS}
                  values={clientInterests}
                  onToggle={(v) => toggle(clientInterests, setClientInterests, v)}
                />
              </QuestionBlock>
              <QuestionBlock
                number={num()}
                label="Which creative services or experiences would you pay for?"
                hint="Check all that apply."
              >
                <CheckboxGroup
                  options={CLIENT_SERVICES}
                  values={clientServices}
                  onToggle={(v) => toggle(clientServices, setClientServices, v)}
                />
              </QuestionBlock>
              <QuestionBlock
                number={num()}
                label="How do you currently find creatives to hire, or events to attend?"
              >
                <RadioGroup
                  options={CLIENT_DISCOVERY}
                  value={clientDiscovery}
                  onChange={setClientDiscovery}
                  otherValue={clientDiscoveryOther}
                  onOtherChange={setClientDiscoveryOther}
                />
              </QuestionBlock>
              <QuestionBlock
                number={num()}
                label="What frustrates you most about hiring creatives or finding entertainment?"
                hint={`Select up to 3. (${clientFrustrations.length}/3 selected)`}
              >
                <CheckboxGroup
                  options={CLIENT_FRUSTRATIONS}
                  values={clientFrustrations}
                  onToggle={(v) => toggle(clientFrustrations, setClientFrustrations, v, 3)}
                  max={3}
                />
              </QuestionBlock>
              <QuestionBlock
                number={num()}
                label="In a typical month, how much do you (or your business) spend on creative services or entertainment?"
              >
                <RadioGroup options={CLIENT_SPEND} value={clientSpend} onChange={setClientSpend} />
              </QuestionBlock>
              <QuestionBlock
                number={num()}
                label="If a platform offered vetted creatives, clear pricing, and secure payments — would you use it?"
              >
                <RadioGroup
                  options={CLIENT_PLATFORM}
                  value={clientPlatform}
                  onChange={setClientPlatform}
                />
              </QuestionBlock>
              <QuestionBlock
                number={num()}
                label="Please rate how important each of the following features would be to you."
                hint="1 = Not at all important, 5 = Extremely important"
              >
                <LikertGroup
                  statements={CLIENT_FEATURES}
                  ratings={clientRatings}
                  onRate={rate(setClientRatings)}
                  lowLabel="Not at all important"
                  highLabel="Extremely important"
                />
              </QuestionBlock>
            </>
          )}
          {/* ---------- SHARED CLOSING (everyone with a segment) ---------- */}
          {segment && (
            <>
              <SectionHeader
                index={sec()}
                title="The Creative Economy Around You"
                subtitle="Help us map the real state of the creative economy in your location — and what a solution must fix."
              />
              <QuestionBlock
                number={num()}
                label={`How would you rate the opportunities to earn from creativity in your area of ${country.name}?`}
              >
                <RadioGroup options={LOCAL_ECONOMY} value={localEconomy} onChange={setLocalEconomy} />
              </QuestionBlock>
              {!isClient && (
                <QuestionBlock
                  number={num()}
                  label="What are the biggest roadblocks or pain points currently holding you back?"
                  hint={`Select up to 3. (${roadblocks.length}/3 selected)`}
                >
                  <CheckboxGroup
                    options={ROADBLOCKS.map((r) => r.value)}
                    values={roadblocks}
                    onToggle={(v) => toggle(roadblocks, setRoadblocks, v, 3)}
                    max={3}
                    renderDetail={(v) => ROADBLOCKS.find((r) => r.value === v)?.detail}
                  />
                  <div className="mt-3 flex items-center gap-3">
                    <span className="shrink-0 text-sm text-orama-navy/70">Other:</span>
                    <TextInput
                      name="roadblock_other"
                      value={roadblockOther}
                      onChange={(e) => setRoadblockOther(e.target.value)}
                      placeholder="Any other roadblock? (Optional)"
                    />
                  </div>
                </QuestionBlock>
              )}
              {isCreative && (
                <>
                  <QuestionBlock
                    number={num()}
                    label="Please rate how important each of the following features is to keeping you happy and motivated."
                    hint="1 = Not at all important, 5 = Extremely important"
                  >
                    <LikertGroup
                      statements={IDEAL_FEATURES}
                      ratings={featureRatings}
                      onRate={rate(setFeatureRatings)}
                      lowLabel="Not at all important"
                      highLabel="Extremely important"
                    />
                  </QuestionBlock>
                  <QuestionBlock
                    number={num()}
                    label="To ensure a teaching or collaborative experience feels 'awesome' rather than just like a regular job, please rate how much you agree with the following statements."
                    hint="1 = Strongly Disagree, 5 = Strongly Agree"
                  >
                    <LikertGroup
                      statements={AWESOME_STATEMENTS}
                      ratings={awesomeRatings}
                      onRate={rate(setAwesomeRatings)}
                      lowLabel="Strongly Disagree"
                      highLabel="Strongly Agree"
                    />
                  </QuestionBlock>
                  <QuestionBlock
                    number={num()}
                    label="Thinking about your current creative journey and career goals, please rate how accurately the following statements describe you right now."
                    hint="1 = Does not describe me at all, 5 = Describes me perfectly"
                  >
                    <LikertGroup
                      statements={ALIGNMENT_STATEMENTS}
                      ratings={alignmentRatings}
                      onRate={rate(setAlignmentRatings)}
                      lowLabel="Does not describe me at all"
                      highLabel="Describes me perfectly"
                    />
                  </QuestionBlock>
                </>
              )}
              <div className="pt-6 text-center">
                <button
                  type="submit"
                  className="animate-pulse-glow w-full rounded-full bg-orama-orange px-10 py-4 text-base font-semibold text-white shadow-xl transition-all hover:-translate-y-1 hover:bg-orama-orange-light active:translate-y-0 sm:w-auto"
                >
                  Submit My Responses →
                </button>
                <p className="mt-4 text-xs text-orama-navy/40">
                  Your responses remain confidential and are used only to match you with
                  opportunities.
                </p>
              </div>
            </>
          )}
        </form>
      </div>
    </section>
  );
}