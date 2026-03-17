import Link from "next/link";

const SEASON_EXAMPLES = [
  { name: "Deep Autumn", swatch: "#8B4513" },
  { name: "Cool Winter", swatch: "#4B0082" },
  { name: "Warm Spring", swatch: "#FF7F50" },
  { name: "Soft Summer", swatch: "#BC8F8F" },
];

const FEATURES = [
  {
    icon: "✦",
    title: "Inclusive AI",
    desc: "Trained on thousands of skin tones across South Asian, African, Latina, Middle Eastern, and Southeast Asian complexions.",
  },
  {
    icon: "◈",
    title: "12-Season System",
    desc: "Beyond the outdated 4-season model — our extended palette system finds your true archetype.",
  },
  {
    icon: "◎",
    title: "Instant Results",
    desc: "Upload or snap a selfie and receive your complete color profile in seconds.",
  },
];

const STEPS = [
  { num: "01", title: "Snap or Upload", desc: "Take a selfie in natural light or upload a clear photo." },
  { num: "02", title: "AI Analyzes", desc: "Claude Vision reads your undertone, skin depth, and coloring." },
  { num: "03", title: "Receive Your Palette", desc: "Get 8 flattering colors, 4 to avoid, and your seasonal archetype." },
];

const TESTIMONIALS = [
  {
    quote: "Finally, an app that actually gets my deep brown skin tone right. My colour analysis from Auraa changed how I shop.",
    name: "Priya S.",
    location: "Mumbai, India",
    season: "Deep Autumn",
  },
  {
    quote: "Every other app told me I was a Winter. Auraa said Warm Autumn and my wardrobe has never looked better.",
    name: "Amara O.",
    location: "Lagos, Nigeria",
    season: "Warm Autumn",
  },
  {
    quote: "I'm olive-toned and always got misclassified. Auraa nailed my undertone on the first try.",
    name: "Sofia M.",
    location: "Mexico City, Mexico",
    season: "Soft Summer",
  },
];

export default function HomePage() {
  return (
    <main className="pt-16">
      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#FDF8F5]">
        {/* Floating orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full bg-[#EDE9FE]/60 blur-3xl animate-float" />
          <div className="absolute top-1/3 -left-20 w-80 h-80 rounded-full bg-[#F5E6D3]/70 blur-3xl animate-float delay-300" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-[#EDE9FE]/40 blur-2xl animate-float delay-500" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
          {/* ── Left: Copy ── */}
          <div className="space-y-8">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
              style={{ backgroundColor: "#F3EEFF", color: "#7C3AED" }}
            >
              <span className="w-2 h-2 rounded-full bg-[#7C3AED] animate-pulse-soft" />
              AI Color Analysis · All Skin Tones
            </div>

            {/* Headline — "Stop guessing." dark, "Start glowing." italic violet */}
            <div className="space-y-1">
              <h1 className="font-display text-6xl lg:text-7xl font-bold leading-[1.05] animate-fade-up opacity-0" style={{ color: "#1A1A2E" }}>
                Stop guessing.
              </h1>
              <h1
                className="font-display text-6xl lg:text-7xl font-bold leading-[1.05] italic animate-fade-up delay-500 opacity-0"
                style={{ color: "#7C3AED" }}
              >
                Start glowing.
              </h1>
            </div>

            <p className="text-lg leading-relaxed max-w-md" style={{ color: "#1A1A2Eaa" }}>
              Auraa is the first AI color analyst built for{" "}
              <span className="font-semibold" style={{ color: "#7C3AED" }}>
                every woman, every skin tone.
              </span>{" "}
              Discover the colors that make you luminous.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link href="/analyze" className="btn-violet">
                <span>✦</span> Discover My Palette
              </Link>
              <Link href="#how-it-works" className="btn-outline">
                How it works →
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex -space-x-2">
                {["#D4956A","#8B5E3C","#C4A882","#6B3A2A","#E8C4A0"].map((c, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[#FDF8F5] flex-shrink-0" style={{ backgroundColor: c }} />
                ))}
              </div>
              <p className="text-sm" style={{ color: "#1A1A2Eaa" }}>
                <span className="font-semibold" style={{ color: "#7C3AED" }}>12,000+</span> women found their glow
              </p>
            </div>
          </div>

          {/* ── Right: Floating palette card ── */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Card — sand image-section background */}
              <div
                className="rounded-3xl p-7 w-80 lg:w-[340px] animate-float relative z-10"
                style={{
                  backgroundColor: "#F5E6D3",
                  border: "1px solid rgba(124,58,237,0.12)",
                  boxShadow: "0 24px 50px rgba(124,58,237,0.15), 0 8px 24px rgba(26,26,46,0.08)"
                }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-violet-sm"
                    style={{ background: "linear-gradient(135deg, #7C3AED, #4C1D95)" }}>
                    <span className="text-white font-display font-bold">A</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "#1A1A2E" }}>Auraa Analysis</p>
                    <p className="text-xs" style={{ color: "#1A1A2E77" }}>Deep Autumn · Warm Undertone</p>
                  </div>
                </div>

                <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#1A1A2E55" }}>
                  Your Flattering Colors
                </p>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {["#8B4513","#D4A96A","#6B3A2A","#C68E5A","#A0522D","#E8B88A","#7B3A1C","#F0D0A0"].map((hex, i) => (
                    <div key={i} className="h-10 rounded-xl shadow-sm swatch-card" style={{ backgroundColor: hex }} />
                  ))}
                </div>

                <div className="pt-3" style={{ borderTop: "1px solid rgba(124,58,237,0.12)" }}>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#1A1A2E55" }}>Avoid</p>
                  <div className="flex gap-2">
                    {["#E0E0FF","#C8E6C9","#B3E0F2","#F8BBD9"].map((hex, i) => (
                      <div key={i} className="h-8 flex-1 rounded-lg opacity-50" style={{ backgroundColor: hex }} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating season badge */}
              <div
                className="absolute -top-4 -right-4 rounded-2xl px-4 py-2.5 shadow-violet-sm animate-float delay-200"
                style={{ backgroundColor: "#F3EEFF", border: "1px solid rgba(124,58,237,0.15)" }}
              >
                <p className="text-xs font-semibold" style={{ color: "#D4A96A" }}>✦ Season Found</p>
                <p className="font-display text-sm font-bold" style={{ color: "#7C3AED" }}>Deep Autumn</p>
              </div>

              {/* Floating undertone badge */}
              <div
                className="absolute -bottom-4 -left-6 rounded-2xl px-4 py-2.5 shadow-violet-sm animate-float delay-400"
                style={{ backgroundColor: "#FDF8F5", border: "1px solid rgba(124,58,237,0.12)" }}
              >
                <p className="text-xs" style={{ color: "#1A1A2E55" }}>Undertone</p>
                <p className="font-semibold text-sm" style={{ color: "#7C3AED" }}>Warm · Olive</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Season Showcase ───────────────────────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] mb-6" style={{ color: "#1A1A2E44" }}>
            Your season could be
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {SEASON_EXAMPLES.map((s) => (
              <div key={s.name} className="flex items-center gap-3 px-5 py-3 rounded-2xl" style={{ backgroundColor: "#F3EEFF" }}>
                <div className="w-5 h-5 rounded-full" style={{ backgroundColor: s.swatch }} />
                <span className="font-medium text-sm" style={{ color: "#7C3AED" }}>{s.name}</span>
              </div>
            ))}
            <div className="flex items-center gap-3 px-5 py-3 rounded-2xl" style={{ backgroundColor: "#F3EEFF" }}>
              <div className="flex -space-x-1">
                {["#E2B97F","#9E6B4A","#4A2A1A"].map(c => (
                  <div key={c} className="w-4 h-4 rounded-full border border-white" style={{ backgroundColor: c }} />
                ))}
              </div>
              <span className="font-medium text-sm" style={{ color: "#7C3AED" }}>+8 more</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Features ─────────────────────────────────────────────────────── */}
      <section id="features" className="py-24" style={{ backgroundColor: "#FDF8F5" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#D4A96A" }}>Why Auraa</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold" style={{ color: "#1A1A2E" }}>
              Color analysis,{" "}
              <em className="italic" style={{ color: "#7C3AED" }}>reimagined</em>
            </h2>
            <p className="max-w-xl mx-auto text-lg" style={{ color: "#1A1A2Eaa" }}>
              Built from the ground up to honour every complexion on earth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {FEATURES.map((f) => (
              <div key={f.title}
                className="group p-8 rounded-3xl bg-white hover:shadow-violet-md transition-all duration-300"
                style={{ border: "1px solid rgba(124,58,237,0.1)" }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-5 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: "#F3EEFF", color: "#7C3AED" }}
                >
                  {f.icon}
                </div>
                <h3 className="font-display text-xl font-semibold mb-3" style={{ color: "#1A1A2E" }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#1A1A2Eaa" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#D4A96A" }}>The Process</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold" style={{ color: "#1A1A2E" }}>
              Three steps to luminous
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div
              className="hidden md:block absolute top-8 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px"
              style={{ background: "linear-gradient(to right, #D4A96A, #C4B5FD, #D4A96A)" }}
            />
            {STEPS.map((s) => (
              <div key={s.num} className="relative text-center space-y-4 p-6">
                <div className="w-16 h-16 rounded-full bg-white border-2 flex items-center justify-center mx-auto shadow-violet-sm"
                  style={{ borderColor: "#7C3AED" }}>
                  <span className="font-display text-xl font-bold" style={{ color: "#7C3AED" }}>{s.num}</span>
                </div>
                <h3 className="font-display text-xl font-semibold" style={{ color: "#1A1A2E" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#1A1A2Eaa" }}>{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/analyze" className="btn-gold">✦ Try It Free</Link>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─────────────────────────────────────────────────── */}
      <section id="stories" className="py-24" style={{ backgroundColor: "#FDF8F5" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#D4A96A" }}>Stories</p>
            <h2 className="font-display text-4xl font-bold" style={{ color: "#1A1A2E" }}>Women who found their glow</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name}
                className="p-7 rounded-3xl bg-white hover:shadow-violet-md transition-all duration-300 space-y-4"
                style={{ border: "1px solid rgba(124,58,237,0.1)" }}
              >
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-sm" style={{ color: "#D4A96A" }}>★</span>
                  ))}
                </div>
                <p className="italic font-display text-base leading-relaxed" style={{ color: "#1A1A2Ecc" }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center justify-between pt-2" style={{ borderTop: "1px solid #F3EEFF" }}>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "#1A1A2E" }}>{t.name}</p>
                    <p className="text-xs" style={{ color: "#1A1A2E66" }}>{t.location}</p>
                  </div>
                  <span
                    className="text-xs px-3 py-1 rounded-full font-medium"
                    style={{ backgroundColor: "#F3EEFF", color: "#7C3AED" }}
                  >
                    {t.season}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ───────────────────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #7C3AED 0%, #4C1D95 100%)" }}>
        <div className="absolute inset-0 pointer-events-none opacity-15">
          {["#D4A96A","#F4B8C1","#EDE9FE"].map((c, i) => (
            <div key={i} className="absolute rounded-full blur-2xl"
              style={{ backgroundColor: c, width: `${180 + i * 80}px`, height: `${180 + i * 80}px`,
                       top: `${20 + i * 20}%`, left: `${10 + i * 35}%` }}
            />
          ))}
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center space-y-6">
          <h2 className="font-display text-4xl lg:text-5xl font-bold" style={{ color: "#FDF8F5" }}>
            Your most radiant self is{" "}
            <em className="italic" style={{ color: "#D4A96A" }}>waiting.</em>
          </h2>
          <p className="text-lg" style={{ color: "rgba(253,248,245,0.75)" }}>
            Join 12,000+ women who discovered their true color palette.
          </p>
          <Link href="/analyze" className="btn-gold">✦ Start My Free Analysis</Link>
        </div>
      </section>

      {/* ─── Footer ───────────────────────────────────────────────────────── */}
      <footer style={{ backgroundColor: "#1A1A2E", color: "rgba(253,248,245,0.55)" }} className="py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #7C3AED, #4C1D95)" }}>
              <span className="text-xs font-bold" style={{ color: "#FDF8F5" }}>A</span>
            </div>
            <span className="font-display font-semibold" style={{ color: "rgba(253,248,245,0.85)" }}>Auraa</span>
          </div>
          <p className="text-sm">Stop guessing. Start glowing. · © 2026 Auraa</p>
          <div className="flex gap-5 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
