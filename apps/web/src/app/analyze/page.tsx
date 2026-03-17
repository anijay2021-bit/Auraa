"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const TIPS = [
  "Face natural light directly (near a window)",
  "Remove heavy makeup if possible",
  "Wear a plain white or nude top",
  "Avoid strong filters or harsh flash",
];

export default function AnalyzePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const LOADING_STEPS = [
    "Reading your skin tone…",
    "Detecting undertone…",
    "Identifying your season…",
    "Building your palette…",
  ];

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
      setFileName(file.name);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleAnalyze = async () => {
    if (!preview) return;
    setLoading(true);

    // Simulate loading steps for demo
    for (let i = 0; i < LOADING_STEPS.length; i++) {
      setLoadingStep(i);
      await new Promise((r) => setTimeout(r, 900));
    }
    router.push("/results");
  };

  return (
    <main className="pt-24 pb-20 min-h-screen bg-auraa-hero">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 space-y-4 animate-fade-up">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">Step 1</p>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-navy">
            Upload your selfie
          </h1>
          <p className="text-navy/60 text-lg max-w-md mx-auto">
            A clear photo in natural light gives the most accurate analysis.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Upload zone — spans 3 cols */}
          <div className="lg:col-span-3">
            {!preview ? (
              <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`upload-zone cursor-pointer flex flex-col items-center justify-center gap-6 p-16 min-h-[380px] transition-all duration-300 animate-fade-up delay-100 ${dragging ? "drag-active" : ""}`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleInputChange}
                />

                {/* Upload icon */}
                <div className={`w-20 h-20 rounded-full bg-lavender flex items-center justify-center transition-transform duration-300 ${dragging ? "scale-110" : ""}`}>
                  <svg className="w-8 h-8 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                </div>

                <div className="text-center">
                  <p className="font-semibold text-violet-700 text-lg">
                    {dragging ? "Drop to upload ✦" : "Drop your photo here"}
                  </p>
                  <p className="text-sm text-navy/50 mt-1">or click to browse</p>
                  <p className="text-xs text-navy/40 mt-3">JPEG · PNG · WEBP · up to 10 MB</p>
                </div>

                <button className="btn-outline !py-2.5 !px-6 !text-sm pointer-events-none">
                  Choose Photo
                </button>
              </div>
            ) : (
              /* Preview state */
              <div className="relative rounded-3xl overflow-hidden shadow-violet-lg animate-fade-up">
                <img src={preview} alt="Your upload" className="w-full object-cover max-h-[460px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="glass rounded-xl px-3 py-2 text-xs text-violet-700 font-medium max-w-[180px] truncate">
                    {fileName}
                  </div>
                  <button
                    onClick={() => { setPreview(null); setFileName(""); }}
                    className="glass rounded-xl px-3 py-2 text-xs text-rose-500 font-medium hover:bg-rose-50 transition-colors"
                  >
                    Change photo
                  </button>
                </div>
              </div>
            )}

            {/* Analyze button */}
            {preview && !loading && (
              <button onClick={handleAnalyze} className="btn-violet w-full justify-center mt-6 animate-fade-up text-base">
                <span>✦</span> Analyze My Colors
              </button>
            )}

            {/* Loading state */}
            {loading && (
              <div className="mt-6 glass rounded-2xl p-6 space-y-4 animate-fade-up">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border-2 border-violet-300 border-t-violet-500 animate-spin" />
                  <p className="font-medium text-violet-700">{LOADING_STEPS[loadingStep]}</p>
                </div>
                <div className="w-full bg-violet-100 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-violet-500 to-violet-400 h-2 rounded-full transition-all duration-700"
                    style={{ width: `${((loadingStep + 1) / LOADING_STEPS.length) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-navy/50">
                  Claude Vision is reading your coloring…
                </p>
              </div>
            )}
          </div>

          {/* Tips sidebar — spans 2 cols */}
          <div className="lg:col-span-2 space-y-6 animate-fade-up delay-200">
            <div className="p-6 rounded-3xl bg-white border border-gold/20 shadow-sm">
              <h3 className="font-display text-lg font-semibold text-navy mb-4">
                ✦ Tips for best results
              </h3>
              <ul className="space-y-3">
                {TIPS.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-navy/70">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-gold-100 text-gold-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                      {i + 1}
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-lavender border border-violet-100">
              <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-2">Privacy First</p>
              <p className="text-sm text-violet-700 leading-relaxed">
                Your photo is analyzed instantly and <strong>never stored</strong> without your consent. Results are saved to your account only.
              </p>
            </div>

            <div className="p-5 rounded-2xl glass-violet text-center">
              <p className="text-xs text-navy/50 mb-1">Powered by</p>
              <p className="font-semibold text-sm text-violet-700">Claude Sonnet Vision</p>
              <p className="text-xs text-navy/40 mt-1">Anthropic · inclusive AI</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
