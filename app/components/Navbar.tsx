"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed",
          top: scrolled ? "12px" : "0px",
          left: scrolled ? "16px" : "0px",
          right: scrolled ? "16px" : "0px",
          zIndex: 100,
          padding: scrolled ? "0 1.75rem" : "0 2.5rem",
          height: scrolled ? "58px" : "68px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: scrolled
            ? "rgba(255,249,242,0.82)"
            : "rgba(255,255,255,0.45)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderRadius: scrolled ? "18px" : "0px",
          border: scrolled
            ? "1px solid rgba(210,185,155,0.45)"
            : "1px solid transparent",
          borderBottom: scrolled
            ? "1px solid rgba(210,185,155,0.45)"
            : "1px solid rgba(210,185,155,0.18)",
          boxShadow: scrolled
            ? "0 8px 32px rgba(140,90,50,0.1), 0 2px 8px rgba(140,90,50,0.06)"
            : "none",
          transition:
            "top 0.45s cubic-bezier(0.22,1,0.36,1), left 0.45s cubic-bezier(0.22,1,0.36,1), right 0.45s cubic-bezier(0.22,1,0.36,1), height 0.45s cubic-bezier(0.22,1,0.36,1), border-radius 0.45s cubic-bezier(0.22,1,0.36,1), background 0.4s ease, box-shadow 0.4s ease, padding 0.45s ease, border 0.4s ease",
        }}
      >
        {/* ── Logo ── */}
        <motion.a
          href="#home"
          style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          {/* Swap src to your logo path, e.g. "/logo.png" */}
          <div style={{
            width: "38px", height: "38px", borderRadius: "50%",
            background: "rgba(192,57,43,0.1)", border: "1.5px solid rgba(192,57,43,0.28)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "16px", flexShrink: 0, overflow: "hidden",
            transition: "all 0.3s ease",
          }}>
            {/* Replace this div content with:
                <Image src="/logo.png" alt="Logo" width={38} height={38} style={{ objectFit:"cover", borderRadius:"50%" }} />
            */}
            <span style={{ fontSize: "17px" }}>✦</span>
          </div>

          <div style={{ lineHeight: 1 }}>
            <span style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: scrolled ? "15px" : "17px",
              fontWeight: 700, color: "#1e1008", letterSpacing: "0.01em",
              display: "block", transition: "font-size 0.3s ease",
            }}>
              Meant to Be
            </span>
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "9.5px", fontWeight: 400,
              letterSpacing: "0.16em", color: "rgba(80,50,30,0.5)",
              textTransform: "uppercase", display: "block", marginTop: "1px",
            }}>
              Originals
            </span>
          </div>
        </motion.a>

        {/* ── Desktop Links ── */}
        <div
          className="nav-desktop"
          style={{ display: "flex", gap: "2rem", alignItems: "center" }}
        >
          {NAV_LINKS.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease: "easeOut" }}
              onClick={() => setActiveLink(link.label)}
              style={{
                color: activeLink === link.label ? "#C0392B" : "rgba(50,28,14,0.65)",
                textDecoration: "none",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12.5px", fontWeight: 400,
                letterSpacing: "0.08em", textTransform: "uppercase",
                position: "relative", paddingBottom: "3px",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#C0392B")}
              onMouseLeave={e => {
                if (activeLink !== link.label)
                  e.currentTarget.style.color = "rgba(50,28,14,0.65)";
              }}
            >
              {link.label}
              {/* Underline indicator */}
              <motion.span
                style={{
                  position: "absolute", bottom: 0, left: 0,
                  height: "1.5px", background: "#C0392B",
                  borderRadius: "2px",
                }}
                initial={{ width: "0%" }}
                animate={{ width: activeLink === link.label ? "100%" : "0%" }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.25 }}
              />
            </motion.a>
          ))}

          {/* CTA Button */}
          <motion.a
            href="#contact"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: "#C0392B", color: "#fff",
              padding: "9px 22px", borderRadius: "9px", textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif", fontSize: "12.5px", fontWeight: 500,
              letterSpacing: "0.07em", textTransform: "uppercase",
              boxShadow: "0 4px 18px rgba(192,57,43,0.3)",
              display: "inline-block",
              transition: "background 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "#A93226";
              e.currentTarget.style.boxShadow = "0 8px 26px rgba(192,57,43,0.38)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "#C0392B";
              e.currentTarget.style.boxShadow = "0 4px 18px rgba(192,57,43,0.3)";
            }}
          >
            Let&apos;s Talk
          </motion.a>
        </div>

        {/* ── Hamburger ── */}
        <motion.button
          className="nav-mobile"
          onClick={() => setMenuOpen(!menuOpen)}
          whileTap={{ scale: 0.9 }}
          style={{
            background: "rgba(255,248,238,0.7)", border: "1px solid rgba(200,175,145,0.35)",
            borderRadius: "10px", cursor: "pointer",
            display: "none", flexDirection: "column",
            gap: "5px", padding: "9px 10px",
          }}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              animate={{
                rotate: menuOpen && i === 0 ? 45 : menuOpen && i === 2 ? -45 : 0,
                y: menuOpen && i === 0 ? 7 : menuOpen && i === 2 ? -7 : 0,
                opacity: menuOpen && i === 1 ? 0 : 1,
                width: menuOpen && i === 1 ? "0px" : "22px",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{
                display: "block", height: "2px",
                background: "#2a1a0e", borderRadius: "2px",
                transformOrigin: "center",
              }}
            />
          ))}
        </motion.button>
      </motion.nav>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed",
              top: scrolled ? "84px" : "76px",
              left: scrolled ? "16px" : "12px",
              right: scrolled ? "16px" : "12px",
              zIndex: 99,
              background: "rgba(255,249,242,0.96)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderRadius: "18px",
              border: "1px solid rgba(210,185,155,0.4)",
              boxShadow: "0 16px 48px rgba(140,90,50,0.12), 0 4px 12px rgba(140,90,50,0.08)",
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.3 }}
                onClick={() => { setMenuOpen(false); setActiveLink(link.label); }}
                style={{
                  color: activeLink === link.label ? "#C0392B" : "#2a1a0e",
                  textDecoration: "none",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "15px", fontWeight: 400,
                  padding: "12px 14px", borderRadius: "10px",
                  letterSpacing: "0.04em",
                  background: activeLink === link.label
                    ? "rgba(192,57,43,0.07)" : "transparent",
                  transition: "all 0.2s ease",
                  display: "flex", alignItems: "center", gap: "10px",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "rgba(192,57,43,0.06)";
                  e.currentTarget.style.color = "#C0392B";
                  e.currentTarget.style.paddingLeft = "18px";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = activeLink === link.label
                    ? "rgba(192,57,43,0.07)" : "transparent";
                  e.currentTarget.style.color = activeLink === link.label ? "#C0392B" : "#2a1a0e";
                  e.currentTarget.style.paddingLeft = "14px";
                }}
              >
                <span style={{
                  width: "6px", height: "6px", borderRadius: "50%",
                  background: activeLink === link.label ? "#C0392B" : "rgba(180,150,110,0.5)",
                  flexShrink: 0, transition: "background 0.2s",
                }}/>
                {link.label}
              </motion.a>
            ))}

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              style={{
                height: "1px", background: "rgba(200,175,145,0.3)",
                margin: "0.5rem 0", borderRadius: "1px",
              }}
            />

            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setMenuOpen(false)}
              style={{
                background: "#C0392B", color: "#fff",
                padding: "13px 22px", borderRadius: "12px",
                textDecoration: "none",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px", fontWeight: 500,
                textAlign: "center", letterSpacing: "0.05em",
                boxShadow: "0 4px 18px rgba(192,57,43,0.28)",
              }}
            >
              Let&apos;s Talk ✦
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop dimmer for mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            style={{
              position: "fixed", inset: 0, zIndex: 98,
              background: "rgba(30,16,8,0.08)",
              backdropFilter: "blur(2px)",
            }}
          />
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .nav-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}