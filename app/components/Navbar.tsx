"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const links = [
  { name: "Services", href: "#services" },
  { name: "Case Studies", href: "#cases" },
  { name: "Framework", href: "#framework" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
          isScrolled ? "px-4 pt-4" : "px-0 pt-0"
        }`}
      >
        <nav
          className={`mx-auto flex items-center justify-between transition-all duration-500
          
          ${
            isScrolled
              ? "max-w-7xl rounded-3xl border border-[#e7dfd7] bg-[#f8f4ee]/90 px-8 py-5 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl"
              : "max-w-full bg-transparent px-6 py-7 lg:px-12"
          }
        `}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4">
            <h1 className="text-3xl font-black tracking-tight text-black">
              MTO
            </h1>

            <div className="h-8 w-px bg-neutral-300" />

            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#a31414]">
              Originals
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-10 lg:flex">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="group relative text-sm font-medium uppercase tracking-[0.18em] text-neutral-800 transition"
              >
                {link.name}

                <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-[#a31414] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:block">
            <Link
              href="#contact"
              className="flex items-center gap-2 rounded-2xl bg-[#b11212] px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:scale-[1.03] hover:bg-[#921010]"
            >
              Book a Free Call
              <ArrowUpRight size={18} />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="lg:hidden"
          >
            {mobileMenu ? (
              <X className="h-8 w-8 text-black" />
            ) : (
              <Menu className="h-8 w-8 text-black" />
            )}
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed right-4 top-24 z-40 w-[90%] max-w-sm rounded-[2rem] border border-[#e7dfd7] bg-[#f8f4ee] p-8 shadow-2xl transition-all duration-500 lg:hidden ${
          mobileMenu
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-10 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-6">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenu(false)}
              className="border-b border-neutral-200 pb-4 text-sm font-medium uppercase tracking-[0.2em] text-neutral-800"
            >
              {link.name}
            </Link>
          ))}

          <Link
            href="#contact"
            className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-[#b11212] px-6 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-white"
          >
            Book a Free Call
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </>
  );
}