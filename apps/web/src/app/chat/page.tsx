"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const SUGGESTED_QUESTIONS = [
  "What colors work for office wear in my season?",
  "What should I wear to a wedding?",
  "Which hair color would suit my palette?",
  "What jewellery metals flatter Deep Autumn?",
];

const MOCK_RESPONSES: Record<string, string> = {
  default:
    "As a Deep Autumn, your wardrobe thrives in rich, warm, earthy tones. Think terracotta, burnt sienna, olive green, and deep gold. Avoid icy pastels and pure whites — they can wash out your warm, rich complexion.",
  office:
    "For the office, lean into your palette's sophistication. A deep olive blazer over a warm caramel blouse is effortlessly professional. Rich brown trousers paired with a burnt sienna silk top signal confidence. Avoid grey and navy — they fight your warmth.",
  wedding:
    "For a wedding, you'll shine in deep jewel tones from your palette — a rich terracotta rust, a warm burgundy, or a deep forest green gown. Add gold jewellery and you'll be luminous. Avoid pastels and cool pinks, which will look washed out against your complexion.",
  hair: "Deep Autumn hair colours to try: warm chestnut, rich auburn, dark honey blonde, or espresso brown. Highlights in golden copper or warm caramel look stunning. Avoid platinum blonde, ash (cool) tones, or jet black — all fight your warmth.",
  jewellery:
    "Yellow gold, rose gold, and bronze are your best friends — they echo your warm undertones. Amber, tortoiseshell, and wood accessories complete the look. Avoid silver and platinum, which can make your skin look sallow.",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("office") || lower.includes("work")) return MOCK_RESPONSES["office"]!;
  if (lower.includes("wedding") || lower.includes("event")) return MOCK_RESPONSES["wedding"]!;
  if (lower.includes("hair")) return MOCK_RESPONSES["hair"]!;
  if (lower.includes("jewellery") || lower.includes("jewelry") || lower.includes("metal")) return MOCK_RESPONSES["jewellery"]!;
  return MOCK_RESPONSES["default"]!;
}

function TypingIndicator() {
  return (
    <div className="flex gap-1.5 items-center px-4 py-3">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full bg-violet-300"
          style={{ animation: `typingDot 1.2s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  );
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "0",
      role: "assistant",
      content:
        "Hello! I'm your Auraa AI Stylist 💄 I can see you're a **Deep Autumn** with warm undertones. Ask me anything about dressing for your palette — outfits, makeup, occasions, or wardrobe edits!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate response delay
    await new Promise((r) => setTimeout(r, 1200 + Math.random() * 600));
    setIsTyping(false);

    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: getResponse(text),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, aiMsg]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <main className="pt-16 h-screen flex flex-col bg-cream">
      <div className="flex flex-1 overflow-hidden max-w-5xl mx-auto w-full px-6 gap-6 py-6">

        {/* ─── Sidebar ──────────────────────────────────────────────────── */}
        <aside className="hidden lg:flex w-64 flex-shrink-0 flex-col gap-4">
          {/* Profile */}
          <div className="p-5 rounded-3xl bg-auraa-footer shadow-violet-lg text-cream">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-300 to-gold-500 flex items-center justify-center shadow-gold-sm">
                <span className="text-navy font-bold">A</span>
              </div>
              <div>
                <p className="font-semibold text-sm">Your Profile</p>
                <p className="text-xs text-cream/70">Deep Autumn</p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {["#8B4513","#D4A96A","#6B3A2A","#C68E5A","#A0522D","#E8B88A","#7B3A1C","#C4763A"].map(c=>(
                <div key={c} className="aspect-square rounded-lg" style={{ backgroundColor: c }} />
              ))}
            </div>
            <Link href="/results" className="mt-4 block text-center text-xs text-cream/70 hover:text-cream transition-colors">
              ← View full palette
            </Link>
          </div>

          {/* Suggested questions */}
          <div className="p-5 rounded-3xl bg-white border border-gold/20 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold-500 mb-3">Ask me about</p>
            <div className="flex flex-col gap-2">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-left text-xs text-violet-600 bg-violet-50 hover:bg-violet-100 transition-colors px-3 py-2.5 rounded-xl leading-snug"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* ─── Chat Area ────────────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col min-w-0 bg-white rounded-3xl shadow-violet-sm border border-gold/20 overflow-hidden">
          {/* Chat header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-gold/15 glass">
            <div className="relative">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-violet-sm"
                   style={{ background: "linear-gradient(135deg, #7C3AED, #4C1D95)" }}>
                <span className="text-cream text-base">✦</span>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-white" />
            </div>
            <div>
              <p className="font-semibold text-sm text-navy">Auraa AI Stylist</p>
              <p className="text-xs text-green-500 font-medium">Online · Deep Autumn specialist</p>
            </div>
            <div className="ml-auto flex gap-2">
              <Link href="/results" className="text-xs btn-outline !py-1.5 !px-4 !text-xs">
                My Palette
              </Link>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-violet-sm"
                       style={{ background: "linear-gradient(135deg, #7C3AED, #4C1D95)" }}>
                    <span className="text-cream text-xs">✦</span>
                  </div>
                )}
                <div
                  className={`max-w-[75%] px-5 py-3.5 text-sm leading-relaxed ${
                    msg.role === "user" ? "bubble-user" : "bubble-ai text-navy"
                  }`}
                >
                  {/* Simple markdown bold renderer */}
                  {msg.content.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
                    /^\*\*.*\*\*$/.test(part) ? (
                      <strong key={i}>{part.slice(2, -2)}</strong>
                    ) : (
                      <span key={i}>{part}</span>
                    )
                  )}
                </div>
                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-gold-sm"
                       style={{ background: "linear-gradient(135deg, #D4A96A, #B88A4A)" }}>
                    <span className="text-cream text-xs font-bold">U</span>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-violet-sm"
                     style={{ background: "linear-gradient(135deg, #7C3AED, #4C1D95)" }}>
                  <span className="text-cream text-xs">✦</span>
                </div>
                <div className="bubble-ai">
                  <TypingIndicator />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Mobile suggested questions */}
          <div className="lg:hidden flex gap-2 px-4 py-2 overflow-x-auto border-t border-gold/10">
            {SUGGESTED_QUESTIONS.slice(0, 2).map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="flex-shrink-0 text-xs bg-violet-50 text-violet-600 px-3 py-2 rounded-xl whitespace-nowrap"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input area */}
          <div className="px-4 py-4 border-t border-gold/15">
            <div className="flex gap-3 items-end">
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask your AI stylist anything…"
                className="flex-1 resize-none bg-white border border-gold/20 rounded-2xl px-4 py-3 text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-100 transition-all max-h-28"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isTyping}
                className="btn-violet !py-3 !px-4 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none flex-shrink-0"
                aria-label="Send message"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </div>
            <p className="text-center text-xs text-navy/30 mt-2">
              Enter to send · Shift+Enter for new line
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
