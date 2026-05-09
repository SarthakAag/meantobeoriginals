"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation, type Variants } from "framer-motion";

/* ─── Global styles ─────────────────────────────────────────── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  @keyframes blink-cursor {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }

  @keyframes shimmer-line {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(200%); }
  }

  @keyframes float-card {
    0%, 100% { transform: translateY(0px) rotate(-1deg); }
    50%       { transform: translateY(-10px) rotate(-0.5deg); }
  }

  @keyframes pulse-ring {
    0%   { box-shadow: 0 0 0 0 rgba(192,57,43,0.35); }
    70%  { box-shadow: 0 0 0 16px rgba(192,57,43,0); }
    100% { box-shadow: 0 0 0 0 rgba(192,57,43,0); }
  }

  @keyframes blink-dot {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.1; }
  }

  @keyframes gradient-shift {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes scan {
    0%   { top: 0%; opacity: 0.7; }
    90%  { opacity: 0.7; }
    100% { top: 100%; opacity: 0; }
  }

  .about-photo-frame:hover .about-photo-shimmer { animation: shimmer-line 1.4s ease forwards; }

  /* Responsive overrides */
  @media (max-width: 900px) {
    .about-grid    { grid-template-columns: 1fr !important; gap: 3rem !important; }
    .about-section { padding: 80px 1.5rem !important; }
  }
  @media (max-width: 480px) {
    .about-section { padding: 60px 1.25rem !important; }
    .about-quote   { padding: 14px 16px !important; }
    .accent-card   { bottom: -14px !important; right: -10px !important; padding: 14px 16px !important; }
  }
`;

/* ─── Typewriter hook ───────────────────────────────────────── */
function useTypewriter(text: string, speed = 38, startDelay = 300) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const started = useRef(false);

  const start = () => {
    if (started.current) return;
    started.current = true;
    let i = 0;
    const delayTimer = setTimeout(() => {
      const timer = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(timer); setDone(true); }
      }, speed);
    }, startDelay);
    return () => clearTimeout(delayTimer);
  };

  return { displayed, done, start };
}

/* ─── Typewriter paragraph ──────────────────────────────────── */
function TypewriterText({ text, speed = 22, delay = 0, className = "", style = {} }: {
  text: string; speed?: number; delay?: number; className?: string; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { displayed, done, start } = useTypewriter(text, speed, delay);

  useEffect(() => { if (inView) start(); }, [inView]);

  return (
    <p ref={ref} className={className} style={style}>
      {displayed}
      {!done && (
        <span style={{
          display: "inline-block", width: "2px", height: "1em",
          background: "#C0392B", marginLeft: "2px", verticalAlign: "middle",
          animation: "blink-cursor 0.7s ease-in-out infinite",
        }} />
      )}
    </p>
  );
}

/* ─── Section label ─────────────────────────────────────────── */
function SectionLabel({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "1.5rem" }}
    >
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: 36 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ height: "2px", background: "linear-gradient(90deg, #C0392B, #e05a40)", borderRadius: 2 }}
      />
      <span style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: "11px",
        color: "rgba(80,50,30,0.55)", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 500,
      }}>{text}</span>
      <span style={{
        width: 5, height: 5, borderRadius: "50%", background: "#C0392B",
        display: "inline-block", animation: "blink-dot 1.6s ease-in-out infinite",
      }} />
    </motion.div>
  );
}

/* ─── Glass red accent card ─────────────────────────────────── */
function AccentCard() {
  return (
    <motion.div
      className="accent-card"
      initial={{ opacity: 0, scale: 0.7, rotate: -6 }}
      whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.5, type: "spring", stiffness: 160 }}
      whileHover={{ scale: 1.07, rotate: 0 }}
      style={{
        position: "absolute", bottom: "-20px", right: "-20px",
        /* Transparent red glass box */
        background: "rgba(192,57,43,0.12)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(192,57,43,0.35)",
        borderRadius: "18px", padding: "20px 26px",
        boxShadow: "0 8px 40px rgba(192,57,43,0.2), inset 0 1px 0 rgba(255,255,255,0.25)",
        animation: "float-card 4s ease-in-out infinite",
        cursor: "default", zIndex: 2,
        /* Glowing ring on hover via CSS class below */
      }}
    >
      {/* Inner glow strip */}
      <div style={{
        position: "absolute", top: 0, left: "15%", right: "15%", height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(255,120,80,0.7), transparent)",
        borderRadius: 1,
      }} />

      {/* Content */}
      <p style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: "38px", fontWeight: 800, color: "#C0392B",
        margin: "0 0 2px", lineHeight: 1,
        textShadow: "0 2px 12px rgba(192,57,43,0.3)",
      }}>2</p>
      <p style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: "11px",
        color: "rgba(192,57,43,0.85)", margin: 0,
        letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500,
      }}>Dreamers &<br />Creators</p>

      {/* Decorative corner dots */}
      {[["4px","4px"], ["4px","auto"], ["auto","4px"], ["auto","auto"]].map(([t,r], i) => (
        <div key={i} style={{
          position: "absolute",
          top: t !== "auto" ? t : undefined, bottom: t === "auto" ? "4px" : undefined,
          right: r !== "auto" ? r : undefined, left: r === "auto" ? "4px" : undefined,
          width: 3, height: 3, borderRadius: "50%",
          background: "rgba(192,57,43,0.45)",
        }} />
      ))}
    </motion.div>
  );
}

/* ─── Photo placeholder frame ───────────────────────────────── */
function PhotoFrame() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50, rotate: -3 }}
      whileInView={{ opacity: 1, x: 0, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: "relative" }}
    >
      {/* Corner accent lines */}
      {[
        { top: -10, left: -10, borderTop: "2px solid rgba(192,57,43,0.5)", borderLeft: "2px solid rgba(192,57,43,0.5)" },
        { top: -10, right: -10, borderTop: "2px solid rgba(192,57,43,0.5)", borderRight: "2px solid rgba(192,57,43,0.5)" },
        { bottom: 10, left: -10, borderBottom: "2px solid rgba(192,57,43,0.5)", borderLeft: "2px solid rgba(192,57,43,0.5)" },
        { bottom: 10, right: -10, borderBottom: "2px solid rgba(192,57,43,0.5)", borderRight: "2px solid rgba(192,57,43,0.5)" },
      ].map((s, i) => (
        <div key={i} style={{ position: "absolute", width: 22, height: 22, ...s }} />
      ))}

      <div
        className="about-photo-frame"
        style={{
          aspectRatio: "4/5", borderRadius: "22px",
          background: "linear-gradient(145deg, rgba(255,248,238,0.7) 0%, rgba(245,230,210,0.5) 100%)",
          border: "1px solid rgba(210,185,155,0.5)",
          backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          overflow: "hidden", position: "relative",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 16px 60px rgba(150,100,60,0.12), inset 0 1px 0 rgba(255,255,255,0.5)",
        }}
      >
        {/* Scan line */}
        <div style={{
          position: "absolute", left: 0, right: 0, height: "60px",
          background: "linear-gradient(to bottom, transparent, rgba(192,57,43,0.05), transparent)",
          animation: "scan 4s linear infinite", pointerEvents: "none", zIndex: 1,
        }} />

        {/* Shimmer on hover */}
        <div className="about-photo-shimmer" style={{
          position: "absolute", inset: 0, zIndex: 2,
          background: "linear-gradient(105deg, transparent 30%, rgba(255,220,180,0.25) 50%, transparent 70%)",
          transform: "translateX(-100%)",
        }} />

        {/* Placeholder */}
        <div style={{ textAlign: "center", padding: "2rem", position: "relative", zIndex: 3 }}>
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.5, 0.35] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{ fontSize: "60px", marginBottom: "1rem" }}
          >📸</motion.div>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "11px",
            color: "rgba(80,50,30,0.35)", letterSpacing: "0.12em", textTransform: "uppercase",
          }}>Your photo here</p>
        </div>

        {/* Grid overlay */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0, opacity: 0.04,
          backgroundImage: "linear-gradient(rgba(80,40,20,1) 1px, transparent 1px), linear-gradient(90deg, rgba(80,40,20,1) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }} />
      </div>

      <AccentCard />
    </motion.div>
  );
}

/* ─── Animated quote block ──────────────────────────────────── */
function QuoteBlock({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.4 }}
      whileHover={{ x: 4 }}
      className="about-quote"
      style={{
        /* Transparent red glass quote box */
        background: "rgba(192,57,43,0.07)",
        backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(192,57,43,0.2)",
        borderLeft: "3px solid #C0392B",
        borderRadius: "0 14px 14px 0",
        padding: "18px 22px", position: "relative", overflow: "hidden",
        boxShadow: "0 4px 24px rgba(192,57,43,0.08), inset 0 1px 0 rgba(255,255,255,0.3)",
        transition: "box-shadow 0.3s",
      }}
    >
      {/* Top shimmer stripe */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: "linear-gradient(90deg, #C0392B, rgba(192,57,43,0.1))",
      }} />

      {/* Giant quote mark */}
      <span style={{
        position: "absolute", top: -8, right: 14,
        fontFamily: "'Playfair Display', serif", fontSize: "72px",
        color: "rgba(192,57,43,0.12)", lineHeight: 1, pointerEvents: "none",
        userSelect: "none", fontWeight: 700,
      }}>"</span>

      {inView ? (
        <TypewriterText
          text={text}
          speed={20}
          delay={400}
          style={{
            fontFamily: "'Playfair Display', Georgia, serif", fontSize: "15px",
            fontStyle: "italic", color: "rgba(50,30,15,0.78)", margin: 0, lineHeight: 1.7,
          }}
        />
      ) : (
        <p style={{ margin: 0, opacity: 0 }}>{text}</p>
      )}
    </motion.div>
  );
}

/* ─── Main Component ────────────────────────────────────────── */
export default function About() {
  const p1 = "We're a couple with a shared dream of building something meaningful through creativity, love, and thoughtful experiences. In the middle of everyday life and busy routines, we started this journey to create beautiful gifting experiences, support growing brands, and bring smiles to people through the little things that matter most.";
  const p2 = "From surprise hampers and creative concepts to helping small businesses grow, everything we do comes from the heart. We believe even the smallest gesture can create lasting memories and meaningful connections.";

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
  };

  return (
    <>
      <style>{globalStyles}</style>

      <section
        id="about"
        className="about-section"
        style={{
          padding: "110px 2rem",
          background: "linear-gradient(170deg, #fdf7f2 0%, #faeee4 60%, #f5e4d4 100%)",
          position: "relative", overflow: "hidden",
        }}
      >
        {/* Subtle background orb */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute", top: "20%", right: "-10%",
            width: "45vw", height: "45vw", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(192,57,43,0.3) 0%, transparent 70%)",
            filter: "blur(60px)", pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div
            className="about-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }}
          >
            {/* LEFT — photo */}
            <PhotoFrame />

            {/* RIGHT — text */}
            <motion.div
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <motion.div variants={fadeUp}>
                <SectionLabel text="About Us" />
              </motion.div>

              {/* Headline with writing effect */}
              <motion.h2
                variants={fadeUp}
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 700, color: "#1e1008",
                  lineHeight: 1.15, margin: "0 0 1.5rem", letterSpacing: "-0.015em",
                }}
              >
                A Couple with a{" "}
                <motion.em
                  animate={{ opacity: [0.35, 0.6, 0.35] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ fontStyle: "italic", color: "rgba(192,57,43,0.55)" }}
                >
                  Shared Dream
                </motion.em>
              </motion.h2>

              {/* Paragraph 1 — typewriter */}
              <motion.div variants={fadeUp}>
                <TypewriterText
                  text={p1}
                  speed={14}
                  delay={200}
                  style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(14px, 1.5vw, 16px)",
                    color: "rgba(50,30,15,0.65)", lineHeight: 1.85,
                    margin: "0 0 1.25rem", fontWeight: 300,
                  }}
                />
              </motion.div>

              {/* Paragraph 2 — typewriter (offset delay) */}
              <motion.div variants={fadeUp}>
                <TypewriterText
                  text={p2}
                  speed={14}
                  delay={p1.length * 14 + 400}
                  style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(14px, 1.5vw, 16px)",
                    color: "rgba(50,30,15,0.65)", lineHeight: 1.85,
                    margin: "0 0 2rem", fontWeight: 300,
                  }}
                />
              </motion.div>

              {/* Glass red quote block */}
              <motion.div variants={fadeUp}>
                <QuoteBlock text="This is more than just a business — it's our passion, our dream, and a journey we're excited to share with you." />
              </motion.div>

              {/* Signature row */}
              <motion.div
                variants={fadeUp}
                style={{ display: "flex", alignItems: "center", gap: "14px", marginTop: "2rem" }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: "50%",
                  background: "rgba(192,57,43,0.12)", border: "1px solid rgba(192,57,43,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "18px", animation: "pulse-ring 2.5s ease-out infinite",
                }}>✦</div>
                <div>
                  <p style={{
                    fontFamily: "'Playfair Display', serif", fontSize: "14px",
                    fontStyle: "italic", color: "#1e1008", margin: 0, fontWeight: 600,
                  }}>Aryan & Shruthi</p>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: "11px",
                    color: "rgba(80,50,30,0.45)", margin: 0, letterSpacing: "0.1em", textTransform: "uppercase",
                  }}>Founders, with love</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}