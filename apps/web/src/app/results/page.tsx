import Link from "next/link";

// Mock analysis result — replace with real data from URL params / Supabase
const MOCK_RESULT = {
  name: "Amara",
  season: "Deep Autumn",
  seasonKey: "deep_autumn",
  skinDepth: "Deep",
  undertone: "Warm",
  summary:
    "You have a beautifully rich, warm complexion with golden-brown undertones. Your colouring thrives in earthy, saturated hues that echo autumnal landscapes — think burnt sienna, terracotta, and luxurious gold.",
  confidence: 0.94,
  flatteringColors: [
    { hex: "#8B4513", label: "Saddle Brown" },
    { hex: "#D4A96A", label: "Warm Gold" },
    { hex: "#6B3A2A", label: "Mahogany" },
    { hex: "#C68E5A", label: "Caramel" },
    { hex: "#A0522D", label: "Sienna" },
    { hex: "#E8B88A", label: "Peachy Buff" },
    { hex: "#7B3A1C", label: "Deep Copper" },
    { hex: "#C4763A", label: "Terracotta" },
  ],
  avoidColors: [
    { hex: "#E0E0FF", label: "Icy Lavender" },
    { hex: "#B3E0F2", label: "Baby Blue" },
    { hex: "#F8BBD9", label: "Pastel Pink" },
    { hex: "#C8E6C9", label: "Mint" },
  ],
};

const RECS = [
  { category: "Foundation", tip: "Look for warm-undertone shades — golden beige, caramel, espresso." },
  { category: "Lipstick", tip: "Terracotta, brick red, burnt sienna, and warm nudes flatter your palette." },
  { category: "Eyeshadow", tip: "Warm browns, bronze, copper, and forest green bring out your eyes." },
  { category: "Blush", tip: "Peach, burnt coral, and warm mauves sit beautifully on your skin." },
];

function ConfidenceBadge({ score }: { score: number }) {
  const pct = Math.round(score * 100);
  return (
    <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-gold/20">
      <div className="relative w-12 h-12">
        <svg viewBox="0 0 36 36" className="w-12 h-12 -rotate-90">
          <circle cx="18" cy="18" r="14" fill="none" stroke="#FAF0E6" strokeWidth="4" />
          <circle
            cx="18" cy="18" r="14" fill="none" stroke="#D4A96A" strokeWidth="4"
            strokeDasharray={`${pct * 0.879} 100`}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gold-600">
          {pct}%
        </span>
      </div>
      <div>
        <p className="text-xs text-navy/50 font-medium">AI Confidence</p>
        <p className="font-semibold text-sm text-violet-700">High accuracy</p>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  const r = MOCK_RESULT;

  return (
    <main className="pt-24 pb-20 min-h-screen bg-cream">
      <div className="max-w-5xl mx-auto px-6 space-y-10">

        {/* ─── Season Hero Card ──────────────────────────────────────────── */}
        <div className="relative rounded-[2rem] overflow-hidden bg-auraa-footer p-8 md:p-12 shadow-violet-lg animate-fade-up">
          {/* Background orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {["#D4A96A","#EDE9FE","#F4B8C1"].map((c,i)=>(
              <div key={i} className="absolute rounded-full blur-3xl opacity-20"
                style={{ backgroundColor:c, width:`${180+i*60}px`, height:`${180+i*60}px`,
                  top:`${i*30}%`, left:`${20+i*30}%` }} />
            ))}
          </div>

          <div className="relative flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Season badge */}
            <div className="flex-shrink-0 text-center">
              <div className="w-28 h-28 rounded-full border-4 border-gold-400 bg-gradient-to-br from-gold-300/30 to-violet-700 flex flex-col items-center justify-center shadow-gold-sm mx-auto">
                <span className="text-3xl">🍂</span>
              </div>
              <p className="font-display text-xl font-bold text-cream mt-3">{r.season}</p>
              <p className="text-cream/60 text-xs mt-1">{r.skinDepth} · {r.undertone} Undertone</p>
            </div>

            <div className="flex-1 space-y-4 text-center md:text-left">
              <div>
                <p className="text-gold-300 text-xs font-semibold uppercase tracking-widest mb-1">
                  Your Color Profile
                </p>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-cream leading-tight">
                  {r.season} Season
                </h1>
              </div>
              <p className="text-cream/75 leading-relaxed max-w-lg">{r.summary}</p>

              <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
                <Link href="/chat" className="btn-gold !py-2.5 !px-6 !text-sm">
                  💬 Chat with AI Stylist
                </Link>
                <button className="btn-outline !border-cream/30 !text-cream !py-2.5 !px-6 !text-sm hover:!bg-cream/10">
                  ↗ Share Palette
                </button>
              </div>
            </div>

            <div className="flex-shrink-0">
              <ConfidenceBadge score={r.confidence} />
            </div>
          </div>
        </div>

        {/* ─── Flattering Colors ─────────────────────────────────────────── */}
        <section className="animate-fade-up delay-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500 mb-1">Your Palette</p>
              <h2 className="font-display text-2xl font-bold text-navy">Colors that make you glow</h2>
            </div>
            <span className="text-xs text-navy/40 bg-gold-100 px-3 py-1 rounded-full font-medium">
              8 flattering shades
            </span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
            {r.flatteringColors.map((c) => (
              <div key={c.hex} className="group flex flex-col items-center gap-2">
                <div
                  className="swatch-card w-full aspect-square rounded-2xl shadow-sm cursor-default"
                  style={{ backgroundColor: c.hex }}
                />
                <p className="text-[10px] text-center text-navy/60 font-medium leading-tight group-hover:text-violet-600 transition-colors">
                  {c.label}
                </p>
                <p className="text-[9px] text-navy/35 font-mono">{c.hex}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Colors to Avoid ───────────────────────────────────────────── */}
        <section className="animate-fade-up delay-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-400 mb-1">Step Back</p>
              <h2 className="font-display text-2xl font-bold text-navy">Colors to avoid</h2>
            </div>
            <span className="text-xs text-navy/40 bg-rose-100 px-3 py-1 rounded-full font-medium">
              4 shades
            </span>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {r.avoidColors.map((c) => (
              <div key={c.hex} className="group flex flex-col items-center gap-2">
                <div className="relative w-full aspect-square">
                  <div
                    className="swatch-card w-full h-full rounded-2xl shadow-sm opacity-55 cursor-default"
                    style={{ backgroundColor: c.hex }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl opacity-50">✕</span>
                  </div>
                </div>
                <p className="text-[10px] text-center text-navy/50 font-medium">{c.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Beauty Recommendations ────────────────────────────────────── */}
        <section className="animate-fade-up delay-300">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500 mb-1">Beauty Edit</p>
            <h2 className="font-display text-2xl font-bold text-navy">Tailored for your palette</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {RECS.map((rec) => (
              <div key={rec.category}
                className="p-5 rounded-2xl bg-white border border-gold/15 hover:border-violet-200 hover:shadow-violet-sm transition-all duration-200">
                <p className="font-semibold text-sm text-violet-700 mb-1.5">
                  <span className="text-gold-400 mr-1.5">✦</span>{rec.category}
                </p>
                <p className="text-sm text-navy/65 leading-relaxed">{rec.tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Next Steps ───────────────────────────────────────────────── */}
        <section className="p-8 rounded-3xl bg-lavender flex flex-col sm:flex-row items-center gap-6 animate-fade-up delay-400">
          <div className="flex-1">
            <h3 className="font-display text-xl font-semibold text-navy mb-1">
              Ready to take it further?
            </h3>
            <p className="text-sm text-navy/60">
              Chat with your AI stylist, try outfits in your palette, or scan your wardrobe.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0 flex-wrap">
            <Link href="/chat" className="btn-violet !py-2.5 !px-5 !text-sm">
              💬 AI Stylist
            </Link>
            <Link href="/analyze" className="btn-outline !py-2.5 !px-5 !text-sm">
              ↩ New Analysis
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
