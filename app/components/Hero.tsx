"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, type Variants } from "framer-motion";

// --- Keyframe styles injected globally ---
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  @keyframes blink-dot {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.15; }
  }

  @keyframes blink-cursor {
    0%, 100% { border-right-color: #C0392B; }
    50%       { border-right-color: transparent; }
  }

  @keyframes float-slow {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33%       { transform: translateY(-18px) rotate(1.5deg); }
    66%       { transform: translateY(-8px) rotate(-1deg); }
  }

  @keyframes float-medium {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50%       { transform: translateY(-24px) rotate(-2deg); }
  }

  @keyframes shimmer {
    0%   { background-position: -600px 0; }
    100% { background-position: 600px 0; }
  }

  @keyframes orbit {
    from { transform: rotate(0deg) translateX(140px) rotate(0deg); }
    to   { transform: rotate(360deg) translateX(140px) rotate(-360deg); }
  }

  @keyframes orbit-reverse {
    from { transform: rotate(0deg) translateX(90px) rotate(0deg); }
    to   { transform: rotate(-360deg) translateX(90px) rotate(360deg); }
  }

  @keyframes grain {
    0%, 100% { transform: translate(0, 0); }
    10%  { transform: translate(-2%, -3%); }
    30%  { transform: translate(3%, 2%); }
    50%  { transform: translate(-1%, 4%); }
    70%  { transform: translate(2%, -2%); }
    90%  { transform: translate(-3%, 1%); }
  }

  @keyframes glow-pulse {
    0%, 100% { box-shadow: 0 6px 24px rgba(192,57,43,0.3); }
    50%       { box-shadow: 0 10px 40px rgba(192,57,43,0.55), 0 0 60px rgba(192,57,43,0.2); }
  }

  @keyframes scan-line {
    0%   { top: -10%; }
    100% { top: 110%; }
  }

  .hero-cta-primary {
    animation: glow-pulse 2.8s ease-in-out infinite;
    transition: all 0.25s ease;
  }
  .hero-cta-primary:hover {
    background: #A93226 !important;
    transform: translateY(-3px) scale(1.03);
    animation: none;
    box-shadow: 0 14px 40px rgba(192,57,43,0.45) !important;
  }
  .hero-cta-secondary:hover {
    background: rgba(255,240,230,0.9) !important;
    transform: translateY(-3px);
    border-color: rgba(192,57,43,0.4) !important;
  }

  @media (max-width: 768px) {
    .hero-headline  { font-size: clamp(32px, 9vw, 58px) !important; }
    .hero-sub       { font-size: 15px !important; }
    .hero-stats     { gap: 2rem !important; }
    .hero-stat-num  { font-size: 28px !important; }
    .hero-orb-right { display: none; }
    .hero-grid      { gap: 0.75rem !important; }
    .hero-ctas      { flex-direction: column; align-items: center; }
    .hero-cta-primary, .hero-cta-secondary { width: 100%; max-width: 320px; text-align: center; }
  }

  @media (max-width: 480px) {
    .hero-badge     { font-size: 10px !important; padding: 5px 14px !important; }
    .hero-headline  { font-size: clamp(28px, 10vw, 44px) !important; letter-spacing: -0.01em !important; }
  }
`;

// Floating particle
function Particle({ x, y, size, delay, duration }: { x: string; y: string; size: number; delay: number; duration: number }) {
  return (
    <motion.div
      style={{
        position: "absolute", left: x, top: y,
        width: size, height: size, borderRadius: "50%",
        background: "rgba(192,57,43,0.25)",
        pointerEvents: "none",
      }}
      animate={{ y: [0, -30, 0], opacity: [0.2, 0.7, 0.2], scale: [1, 1.3, 1] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

// Blinking status dot
function BlinkDot() {
  return (
    <span style={{
      display: "inline-block", width: 7, height: 7, borderRadius: "50%",
      background: "#C0392B",
      animation: "blink-dot 1.4s ease-in-out infinite",
    }} />
  );
}

// Animated underline path
function AnimatedUnderline() {
  return (
    <motion.svg viewBox="0 0 340 14" style={{
      position: "absolute", bottom: "-8px", left: 0,
      width: "100%", height: "12px", overflow: "visible",
    }}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.2, delay: 1.0, ease: "easeOut" }}
    >
      <motion.path
        d="M4 9 Q85 2 170 7 Q255 12 336 5"
        stroke="#C0392B" strokeWidth="2.5" fill="none" strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: 1.0, ease: "easeOut" }}
      />
    </motion.svg>
  );
}

// Orbiting dot system
function OrbitalRing() {
  return (
    <div style={{
      position: "absolute", top: "10%", right: "6%",
      width: 300, height: 300, pointerEvents: "none",
    }} className="hero-orb-right">
      {/* Ring 1 */}
      <div style={{
        position: "absolute", inset: "15%",
        borderRadius: "50%", border: "1px dashed rgba(192,57,43,0.2)",
      }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          width: 8, height: 8, borderRadius: "50%",
          background: "#C0392B", marginTop: -4, marginLeft: -4,
          animation: "orbit 6s linear infinite",
          boxShadow: "0 0 8px rgba(192,57,43,0.6)",
        }} />
      </div>
      {/* Ring 2 */}
      <div style={{
        position: "absolute", inset: "35%",
        borderRadius: "50%", border: "1px solid rgba(192,57,43,0.12)",
      }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          width: 5, height: 5, borderRadius: "50%",
          background: "rgba(192,57,43,0.5)", marginTop: -2.5, marginLeft: -2.5,
          animation: "orbit-reverse 4s linear infinite",
        }} />
      </div>
      {/* Centre glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        width: 20, height: 20, borderRadius: "50%",
        background: "rgba(192,57,43,0.3)",
        transform: "translate(-50%,-50%)",
        boxShadow: "0 0 30px rgba(192,57,43,0.4)",
        animation: "blink-dot 2s ease-in-out infinite",
      }} />
    </div>
  );
}

// Stat counter
function StatItem({ num, label, delay }: { num: string; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      style={{ textAlign: "center" }}
    >
      <motion.p
        className="hero-stat-num"
        whileHover={{ scale: 1.12, color: "#C0392B" }}
        transition={{ duration: 0.2 }}
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "36px", fontWeight: 700, color: "#1e1008",
          margin: "0 0 4px", lineHeight: 1, cursor: "default",
          transition: "color 0.2s",
        }}
      >{num}</motion.p>
      <p style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: "11px",
        color: "rgba(80,50,30,0.5)", margin: 0,
        letterSpacing: "0.12em", textTransform: "uppercase",
      }}>{label}</p>
    </motion.div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll({ target: sectionRef });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => { setMounted(true); }, []);

  // Stagger variants
  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  };

  const particles = [
    { x: "12%", y: "22%", size: 5, delay: 0, duration: 4.2 },
    { x: "88%", y: "35%", size: 4, delay: 1.1, duration: 5.5 },
    { x: "25%", y: "72%", size: 6, delay: 0.6, duration: 3.8 },
    { x: "75%", y: "80%", size: 3, delay: 1.8, duration: 6.1 },
    { x: "55%", y: "15%", size: 4, delay: 0.3, duration: 4.7 },
    { x: "40%", y: "88%", size: 5, delay: 2.0, duration: 5.0 },
  ];

  return (
    <>
      <style>{globalStyles}</style>

      <section ref={sectionRef} id="home" style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        justifyContent: "center", position: "relative",
        padding: "clamp(100px, 15vw, 140px) clamp(1.25rem, 5vw, 3rem) 80px",
        overflow: "hidden",
        background: "linear-gradient(160deg, #fdf7f2 0%, #faeee4 50%, #f5e4d4 100%)",
      }}>

        {/* Grain overlay */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          animation: "grain 0.5s steps(1) infinite",
          opacity: 0.6,
        }} />

        {/* Paralax background blobs */}
        <motion.div style={{ y: bgY, position: "absolute", inset: 0, pointerEvents: "none" }}>
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.18, 0.28, 0.18] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute", top: "8%", right: "5%",
              width: "clamp(220px, 35vw, 440px)", height: "clamp(220px, 35vw, 440px)",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(210,130,100,0.35) 0%, rgba(210,185,155,0.12) 70%)",
              filter: "blur(55px)",
            }}
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.12, 0.22, 0.12] }}
            transition={{ duration: 9, delay: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute", bottom: "10%", left: "3%",
              width: "clamp(180px, 28vw, 350px)", height: "clamp(180px, 28vw, 350px)",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(192,57,43,0.25) 0%, rgba(225,200,170,0.08) 70%)",
              filter: "blur(50px)",
            }}
          />
          <motion.div
            animate={{ x: [0, 20, 0], y: [0, -15, 0], opacity: [0.08, 0.16, 0.08] }}
            transition={{ duration: 11, delay: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute", top: "55%", right: "25%",
              width: "clamp(120px, 20vw, 260px)", height: "clamp(120px, 20vw, 260px)",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(230,160,80,0.28) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
        </motion.div>

        {/* Floating particles */}
        {mounted && particles.map((p, i) => <Particle key={i} {...p} />)}

        {/* Orbital ring decoration */}
        <OrbitalRing />

        {/* Scan-line shimmer bar */}
        <div style={{
          position: "absolute", left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg, transparent 0%, rgba(192,57,43,0.3) 50%, transparent 100%)",
          animation: "scan-line 5s linear infinite",
          pointerEvents: "none", zIndex: 0,
        }} />

        {/* Main content */}
        <AnimatePresence>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ maxWidth: "900px", width: "100%", textAlign: "center", position: "relative", zIndex: 1 }}
          >
            {/* Badge */}
            <motion.div variants={itemVariants} style={{ marginBottom: "2rem" }}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "10px",
                  background: "rgba(255,248,240,0.75)", border: "1px solid rgba(192,57,43,0.22)",
                  borderRadius: "100px", padding: "7px 20px",
                  backdropFilter: "blur(14px)",
                  boxShadow: "0 2px 16px rgba(192,57,43,0.1), inset 0 1px 0 rgba(255,255,255,0.6)",
                }}
                className="hero-badge"
              >
                <BlinkDot />
                <span style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: "11px",
                  color: "rgba(80,45,25,0.7)", letterSpacing: "0.12em", textTransform: "uppercase",
                }}>Creative Agency & Digital Studio</span>
                <BlinkDot />
              </motion.div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="hero-headline"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(42px, 7vw, 86px)", fontWeight: 700,
                color: "#1e1008", lineHeight: 1.08, margin: "0 0 1.5rem",
                letterSpacing: "-0.025em",
              }}
            >
              Where Every{" "}
              <motion.em
                animate={{ opacity: [0.35, 0.55, 0.35] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ fontStyle: "italic", color: "rgba(80,45,25,0.45)", display: "inline" }}
              >
                Idea
              </motion.em>
              <br />
              Becomes{" "}
              <span style={{ position: "relative", display: "inline-block", whiteSpace: "nowrap" }}>
                <motion.span
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  style={{
                    backgroundImage: "linear-gradient(90deg, #1e1008, #C0392B, #e07050, #1e1008)",
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Unforgettable
                </motion.span>
                <AnimatedUnderline />
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={itemVariants}
              className="hero-sub"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(15px, 2vw, 18px)", color: "rgba(60,35,20,0.62)",
                lineHeight: 1.8, maxWidth: "580px", margin: "0 auto 3rem", fontWeight: 300,
              }}
            >
              From surprise hampers and performance marketing to software development — we build
              experiences that connect, inspire, and leave lasting impressions.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="hero-ctas"
              style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
            >
              <motion.a
                href="#services"
                className="hero-cta-primary"
                whileTap={{ scale: 0.97 }}
                style={{
                  background: "#C0392B", color: "#fff",
                  padding: "15px 38px", borderRadius: "12px",
                  textDecoration: "none", fontFamily: "'DM Sans', sans-serif",
                  fontSize: "15px", fontWeight: 500, letterSpacing: "0.05em",
                  display: "inline-block",
                }}
              >
                Explore Our Services →
              </motion.a>
              <motion.a
                href="#about"
                className="hero-cta-secondary"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: "rgba(255,248,240,0.65)", color: "#2a1a0e",
                  padding: "15px 38px", borderRadius: "12px",
                  textDecoration: "none", fontFamily: "'DM Sans', sans-serif",
                  fontSize: "15px", fontWeight: 400, letterSpacing: "0.05em",
                  border: "1px solid rgba(192,57,43,0.2)",
                  backdropFilter: "blur(12px)", display: "inline-block",
                  transition: "all 0.25s",
                }}
              >
                Our Story
              </motion.a>
            </motion.div>

            {/* Divider */}
            <motion.div
              variants={itemVariants}
              style={{
                display: "flex", alignItems: "center", gap: "1rem",
                margin: "4rem auto 0", maxWidth: "400px",
              }}
            >
              <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, rgba(192,57,43,0.25))" }} />
              <BlinkDot />
              <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(192,57,43,0.25), transparent)" }} />
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="hero-stats"
              style={{ display: "flex", justifyContent: "center", gap: "3.5rem", marginTop: "2.5rem", flexWrap: "wrap" }}
            >
              <StatItem num="6+"   label="Services Offered"  delay={1.1} />
              <StatItem num="100%" label="Passion Driven"    delay={1.25} />
              <StatItem num="∞"   label="Creative Ideas"    delay={1.4} />
            </motion.div>

          </motion.div>
        </AnimatePresence>

        {/* Bottom fade */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "80px",
          background: "linear-gradient(to bottom, transparent, rgba(245,228,212,0.4))",
          pointerEvents: "none",
        }} />

      </section>
    </>
  );
}