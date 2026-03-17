"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#features", label: "Features" },
  { href: "/#stories", label: "Stories" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 glass border-b border-gold/20">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-violet-sm group-hover:scale-110 transition-transform duration-200"
               style={{ background: "linear-gradient(135deg, #7C3AED, #4C1D95)" }}>
            <span className="text-cream font-display font-bold text-sm">A</span>
          </div>
          <span className="font-display font-semibold text-lg text-violet-600 tracking-tight">
            Auraa
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 text-violet-700 hover:bg-violet-50"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link href="/analyze" className="hidden md:block btn-violet !py-2 !px-6 !text-sm">
          ✦ Get Started
        </Link>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 rounded-lg text-violet-600 hover:bg-violet-50 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden glass border-t border-gold/20 px-6 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium transition-colors text-violet-700 hover:bg-violet-50"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/analyze" onClick={() => setMenuOpen(false)} className="btn-violet !py-2.5 mt-2 justify-center">
            ✦ Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
