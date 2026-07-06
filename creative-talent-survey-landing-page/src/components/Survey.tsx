import { useMemo, useState } from "react";
import type { CountryData } from "../data/countries";

/* ---------- data ---------- */

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
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  otherValue?: string;
  onOtherChange?: (v: string) => void;
  otherLabel?: string;
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
          {opt}
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

/* ---------- main component ---------- */

export default function Survey({ country }: { country: CountryData }) {
  const [submitted, setSubmitted] = useState(false);

  // Section 1
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [locationOther, setLocationOther] = useState("");
  const [primary, setPrimary] = useState("");
  const [primaryOther, setPrimaryOther] = useState("");
  const [secondary, setSecondary] = useState<string[]>([]);
  const [experience, setExperience] = useState("");

  // Section 2
  const [employment, setEmployment] = useState("");
  const [income, setIncome] = useState("");
  const [incomeOther, setIncomeOther] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [training, setTraining] = useState("");
  const [trainingSpecify, setTrainingSpecify] = useState("");

  // Section 3
  const [taught, setTaught] = useState("");
  const [ageGroups, setAgeGroups] = useState<string[]>([]);
  const [teachSkills, setTeachSkills] = useState("");
  const [teachNeeds, setTeachNeeds] = useState("");

  // Section 4
  const [initiatives, setInitiatives] = useState<string[]>([]);
  const [timeCommit, setTimeCommit] = useState("");
  const [compensation, setCompensation] = useState("");
  const [compensationOther, setCompensationOther] = useState("");

  // Section 5
  const [attractions, setAttractions] = useState<string[]>([]);
  const [challenges, setChallenges] = useState("");

  // Section 6
  const [roadblocks, setRoadblocks] = useState<string[]>([]);
  const [roadblockOther, setRoadblockOther] = useState("");
  const [featureRatings, setFeatureRatings] = useState<Record<string, number>>({});
  const [awesomeRatings, setAwesomeRatings] = useState<Record<string, number>>({});
  const [alignmentRatings, setAlignmentRatings] = useState<Record<string, number>>({});

  const rate =
    (set: React.Dispatch<React.SetStateAction<Record<string, number>>>) =>
    (statement: string, value: number) =>
      set((prev) => ({ ...prev, [statement]: value }));

  const skipTeaching = taught === TAUGHT[3];

  const toggle = (list: string[], set: (v: string[]) => void, v: string, max?: number) => {
    if (list.includes(v)) set(list.filter((x) => x !== v));
    else if (max === undefined || list.length < max) set([...list, v]);
  };

  const progress = useMemo(() => {
    const answered = [
      fullName,
      phone,
      email,
      location,
      primary,
      experience,
      employment,
      income,
      portfolio,
      training,
      taught,
      skipTeaching || ageGroups.length > 0 ? "x" : "",
      skipTeaching || teachSkills ? "x" : "",
      skipTeaching || teachNeeds ? "x" : "",
      initiatives.length > 0 ? "x" : "",
      timeCommit,
      compensation,
      attractions.length > 0 ? "x" : "",
      challenges,
      roadblocks.length > 0 ? "x" : "",
      Object.keys(featureRatings).length >= IDEAL_FEATURES.length ? "x" : "",
      Object.keys(awesomeRatings).length >= AWESOME_STATEMENTS.length ? "x" : "",
      Object.keys(alignmentRatings).length >= ALIGNMENT_STATEMENTS.length ? "x" : "",
      secondary.length > 0 ? "x" : "",
    ].filter(Boolean).length;
    return Math.round((answered / 24) * 100);
  }, [
    fullName, phone, email, location, primary, experience, employment, income,
    portfolio, training, taught, ageGroups, teachSkills, teachNeeds, initiatives,
    timeCommit, compensation, attractions, challenges, roadblocks, featureRatings,
    awesomeRatings, alignmentRatings, secondary, skipTeaching,
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    document.getElementById("survey")?.scrollIntoView({ behavior: "smooth" });
  };

  if (submitted) {
    return (
      <section id="survey" className="bg-orama-cream py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="animate-scale-in rounded-3xl border border-orama-navy/10 bg-white p-10 text-center shadow-2xl sm:p-16">
            <div className="animate-float mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-orama-orange/10 text-4xl">
              🎉
            </div>
            <p className="mb-4 text-xs font-bold tracking-[0.45em] text-orama-orange uppercase">
              Response received
            </p>
            <h2 className="font-serif text-4xl font-bold text-orama-navy sm:text-5xl">
              Thank you for your <span className="gradient-text italic">time</span>!
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-orama-navy/60">
              We are excited about the creative talent in Uganda. Our team will review your
              responses and reach out to you directly if there is a match for our upcoming
              programs.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="#top"
                className="rounded-full bg-orama-orange px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-orama-orange-light"
              >
                Back to top
              </a>
              <button
                onClick={() => setSubmitted(false)}
                className="rounded-full border border-orama-navy/15 px-8 py-3.5 text-sm font-semibold text-orama-navy transition-all hover:bg-orama-orange/5"
              >
                Submit another response
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

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
            money doing what you love? Tell us about your craft — this survey takes about
            10–15 minutes. Your responses will remain confidential and will only be used to
            match you with potential opportunities. Thank you for sharing your time and
            talent with us!
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

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          {/* ---------- SECTION 1 ---------- */}
          <SectionHeader
            index={1}
            title="Getting to Know You"
            subtitle="Understanding who you are and where you are based."
          />

          <QuestionBlock number={1} label="Full Name">
            <TextInput
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your full name"
            />
          </QuestionBlock>

          <QuestionBlock number={2} label="Phone Number / WhatsApp">
            <TextInput
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={`${country.dialCode} ...`}
            />
          </QuestionBlock>

          <QuestionBlock number={3} label="Email Address">
            <TextInput
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </QuestionBlock>

          <QuestionBlock number={4} label={`Where are you currently based in ${country.name}?`}>
            <RadioGroup
              options={country.locations}
              value={location}
              onChange={setLocation}
              otherValue={locationOther}
              onOtherChange={setLocationOther}
            />
          </QuestionBlock>

          <QuestionBlock
            number={5}
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
            number={6}
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
            number={7}
            label="How many years of experience do you have in your primary creative field?"
          >
            <RadioGroup options={EXPERIENCE} value={experience} onChange={setExperience} />
          </QuestionBlock>

          {/* ---------- SECTION 2 ---------- */}
          <SectionHeader
            index={2}
            title="Your Creative Work & Portfolio"
            subtitle="Understanding your current practice and professional background."
          />

          <QuestionBlock number={8} label="Which best describes your current employment status?">
            <RadioGroup options={EMPLOYMENT} value={employment} onChange={setEmployment} />
          </QuestionBlock>

          <QuestionBlock number={9} label="How do you currently earn most of your income?">
            <RadioGroup
              options={INCOME}
              value={income}
              onChange={setIncome}
              otherValue={incomeOther}
              onOtherChange={setIncomeOther}
            />
          </QuestionBlock>

          <QuestionBlock
            number={10}
            label="Please share a link to your portfolio, social media page (Instagram, TikTok, YouTube), or website where we can see your work:"
            hint="If you don't have a link, you can email 3–5 examples of your work to gig.forafrica@gmail.com."
          >
            <TextInput
              value={portfolio}
              onChange={(e) => setPortfolio(e.target.value)}
              placeholder="https://..."
            />
          </QuestionBlock>

          <QuestionBlock
            number={11}
            label="Do you have any formal training, certifications, or degrees in your field?"
          >
            <RadioGroup options={TRAINING} value={training} onChange={setTraining} />
            <div className="mt-3">
              <TextInput
                value={trainingSpecify}
                onChange={(e) => setTrainingSpecify(e.target.value)}
                placeholder="Please specify (Optional)"
              />
            </div>
          </QuestionBlock>

          {/* ---------- SECTION 3 ---------- */}
          <SectionHeader
            index={3}
            title="Teaching & Mentorship Experience"
            subtitle="Assessing your capability and interest in guiding others."
          />

          <QuestionBlock
            number={12}
            label="Have you ever taught, mentored, or run workshops in your creative field?"
          >
            <RadioGroup options={TAUGHT} value={taught} onChange={setTaught} />
            {skipTeaching && (
              <p className="animate-fade-in mt-4 rounded-xl bg-orama-orange/10 px-4 py-3 text-sm font-medium text-orama-orange">
                No problem — questions 13–15 have been skipped. Continue to Section 4 below.
              </p>
            )}
          </QuestionBlock>

          {!skipTeaching && (
            <>
              <QuestionBlock
                number={13}
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
                number={14}
                label="If you were to teach a class, what 1 or 2 specific skills would you focus on?"
                hint='e.g., "Portrait photography with natural light," "Audio mixing for Afrobeats," "Basics of watercolor"'
              >
                <TextArea
                  value={teachSkills}
                  onChange={(e) => setTeachSkills(e.target.value)}
                  placeholder="Describe the skill(s) you would teach..."
                />
              </QuestionBlock>

              <QuestionBlock
                number={15}
                label="What materials, software, or equipment would you absolutely need to teach your specific skill?"
              >
                <TextArea
                  value={teachNeeds}
                  onChange={(e) => setTeachNeeds(e.target.value)}
                  placeholder="List what you would need..."
                />
              </QuestionBlock>
            </>
          )}

          {/* ---------- SECTION 4 ---------- */}
          <SectionHeader
            index={4}
            title="Opportunities & Availability"
            subtitle="Matching you with opportunities to connect, earn, and grow."
          />

          <QuestionBlock
            number={16}
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
            number={17}
            label="How much time could you realistically commit to an opportunity (like teaching or collaborating) right now?"
          >
            <RadioGroup options={TIME_COMMIT} value={timeCommit} onChange={setTimeCommit} />
          </QuestionBlock>

          <QuestionBlock
            number={18}
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

          {/* ---------- SECTION 5 ---------- */}
          <SectionHeader
            index={5}
            title="Logistics & Support"
            subtitle="Understanding what you need to succeed."
          />

          <QuestionBlock
            number={19}
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
            number={20}
            label="Do you anticipate any logistical challenges that might prevent you from participating in these programs?"
            hint="e.g., transportation, internet access, lack of personal equipment"
          >
            <TextArea
              value={challenges}
              onChange={(e) => setChallenges(e.target.value)}
              placeholder="Share any challenges we should know about..."
            />
          </QuestionBlock>

          {/* ---------- SECTION 6 ---------- */}
          <SectionHeader
            index={6}
            title="Overcoming Challenges & Elevating Your Experience"
            subtitle="We want to ensure our partnerships are truly supportive. Help us understand what frustrates you in the creative sector, and what an 'ideal' support system looks like for you."
          />

          <QuestionBlock
            number={21}
            label="What are the biggest roadblocks or pain points currently holding you back in your creative career?"
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
                value={roadblockOther}
                onChange={(e) => setRoadblockOther(e.target.value)}
                placeholder="Any other roadblock? (Optional)"
              />
            </div>
          </QuestionBlock>

          <QuestionBlock
            number={22}
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
            number={23}
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
            number={24}
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
        </form>
      </div>
    </section>
  );
}
