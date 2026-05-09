"use client";

import { useState, useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

/* ─── Data ──────────────────────────────────────────────────── */
const SERVICES = [
  {
    icon: "📣", title: "Performance Marketing",
    tagline: "Grow, connect and stand out in the digital world",
    items: ["Campaigns Creation", "Strategy & Planning", "CPL and ROAS Tracking", "Meta Ads Handling"],
    accentDelay: 0,
  },
  {
    icon: "🎁", title: "Hampers",
    tagline: "Made to Make Moments Memorable",
    items: ["Wellness Hampers", "Lifestyle Hampers", "Personalised Hampers", "Pet Hampers", "Return Gifts & More"],
    accentDelay: 0.08,
  },
  {
    icon: "📱", title: "Social Media Management",
    tagline: "Where Creativity Meets Connection",
    items: ["Scripting with CTA", "High Quality Video Shoot", "Editing", "SEO & Keyword Research", "Content Planning"],
    accentDelay: 0.16,
  },
  {
    icon: "🎉", title: "Event Management",
    tagline: "Where Celebrations Come to Life",
    items: ["Weddings & Receptions", "Birthday Celebrations", "Baby & Naming Ceremonies", "Corporate Events", "Surprise Occasions"],
    accentDelay: 0.24,
  },
  {
    icon: "✦", title: "Branding",
    tagline: "Your Brand's Creative Partner",
    items: ["Brand Identity Design", "Social Media Content", "Creative Marketing", "Packaging & Visual Design", "Digital Branding"],
    accentDelay: 0.32,
  },
  {
    icon: "💻", title: "Software Development",
    tagline: "Smart Solutions, Seamless Experiences",
    items: ["Landing Pages", "E-commerce Websites", "CRM Systems", "ERP Solutions", "Custom Applications"],
    accentDelay: 0.4,
  },
];

/* ─── Design tokens — red & white-cream ─────────────────────── */
const T = {
  bg:          "linear-gradient(145deg, #fff8f6 0%, #fff2ee 35%, #ffe8e2 65%, #fff5f3 100%)",
  blobA:       "rgba(192,57,43,0.18)",
  blobB:       "rgba(220,80,60,0.12)",
  blobC:       "rgba(255,180,160,0.22)",
  cardRest:    "rgba(255,255,255,0.45)",
  cardHover:   "rgba(255,255,255,0.72)",
  borderRest:  "rgba(192,57,43,0.15)",
  borderHover: "rgba(192,57,43,0.38)",
  shadow:      "rgba(192,57,43,0.1)",
  shadowHover: "rgba(192,57,43,0.22)",
  red:         "#C0392B",
  redDark:     "#9B2D1F",
  redGlass:    "rgba(192,57,43,0.12)",
  redBorder:   "rgba(192,57,43,0.32)",
  textH:       "#2a0c06",
  textB:       "rgba(55,16,8,0.7)",
  textMuted:   "rgba(120,40,25,0.55)",
};

/* ─── Global styles ─────────────────────────────────────────── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; }

  @keyframes blink-dot {
    0%,100% { opacity:1; } 50% { opacity:0.12; }
  }
  @keyframes blob-drift {
    0%,100% { transform:translate(0,0) scale(1); }
    33% { transform:translate(24px,-16px) scale(1.06); }
    66% { transform:translate(-16px,12px) scale(0.96); }
  }
  @keyframes noise {
    0%,100%{transform:translate(0,0);}10%{transform:translate(-2%,-3%);}
    30%{transform:translate(3%,2%);}50%{transform:translate(-1%,4%);}
    70%{transform:translate(2%,-2%);}90%{transform:translate(-3%,1%);}
  }
  @keyframes shimmer-sweep {
    0%   { transform: translateX(-100%) skewX(-12deg); opacity:0; }
    10%  { opacity:1; }
    100% { transform: translateX(280%)  skewX(-12deg); opacity:0; }
  }
  @keyframes icon-pop {
    0%,100% { transform: scale(1) rotate(0deg); }
    50%     { transform: scale(1.13) rotate(-5deg); }
  }
  @keyframes pulse-ring {
    0%   { box-shadow: 0 0 0 0 rgba(192,57,43,0.45); }
    70%  { box-shadow: 0 0 0 8px rgba(192,57,43,0); }
    100% { box-shadow: 0 0 0 0 rgba(192,57,43,0); }
  }
  @keyframes float-badge {
    0%,100% { transform: translateY(0px); }
    50%     { transform: translateY(-5px); }
  }
  @keyframes glow-breathe {
    0%,100% { box-shadow: 0 0 0 0 rgba(192,57,43,0.0), 0 6px 28px rgba(192,57,43,0.1); }
    50%     { box-shadow: 0 0 24px 4px rgba(192,57,43,0.12), 0 6px 28px rgba(192,57,43,0.1); }
  }

  @media (max-width: 1024px) { .srv-grid { grid-template-columns: repeat(2,1fr) !important; } }
  @media (max-width: 620px)  { .srv-grid { grid-template-columns: 1fr !important; gap: 1rem !important; } }
  @media (max-width: 900px)  { .srv-section { padding: 80px 1.5rem !important; } }
  @media (max-width: 480px)  { .srv-section { padding: 60px 1rem !important; } }
`;

/* ─── Service Card ──────────────────────────────────────────── */
function ServiceCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.65,
        delay: service.accentDelay,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative", overflow: "hidden",
        borderRadius: 22, padding: "2rem",
        cursor: "default",
        /* White-cream frosted glass */
        background: hovered ? T.cardHover : T.cardRest,
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",
        border: `1px solid ${hovered ? T.borderHover : T.borderRest}`,
        boxShadow: hovered
          ? `0 20px 60px ${T.shadowHover}, inset 0 1px 0 rgba(255,255,255,0.85)`
          : `0 6px 28px ${T.shadow}, inset 0 1px 0 rgba(255,255,255,0.7)`,
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
        animation: hovered ? "glow-breathe 2s ease-in-out infinite" : "none",
      }}
    >
      {/* Shimmer sweep on hover */}
      {hovered && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
          background: "linear-gradient(105deg, transparent 28%, rgba(255,220,210,0.35) 50%, transparent 72%)",
          animation: "shimmer-sweep 0.85s ease forwards",
        }} />
      )}

      {/* ── RED top-bar accent ───────────────────────────────── */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: hovered ? 3 : 2,
        background: hovered
          ? `linear-gradient(90deg, ${T.red}, #e05040, ${T.red})`
          : `linear-gradient(90deg, rgba(192,57,43,0.3), rgba(192,57,43,0.08))`,
        transform: hovered ? "scaleX(1)" : "scaleX(0.35)",
        transformOrigin: "left",
        transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
        borderRadius: "22px 22px 0 0",
      }} />

      {/* Red corner radial glow */}
      <div style={{
        position: "absolute", top: -28, right: -28,
        width: 100, height: 100, borderRadius: "50%",
        background: `radial-gradient(circle, rgba(192,57,43,0.15) 0%, transparent 70%)`,
        filter: "blur(14px)", pointerEvents: "none",
        opacity: hovered ? 1 : 0.3, transition: "opacity 0.35s",
      }} />
      <div style={{
        position: "absolute", bottom: -20, left: -20,
        width: 80, height: 80, borderRadius: "50%",
        background: `radial-gradient(circle, rgba(192,57,43,0.08) 0%, transparent 70%)`,
        filter: "blur(12px)", pointerEvents: "none",
        opacity: hovered ? 1 : 0, transition: "opacity 0.4s",
      }} />

      {/* ── Icon box — transparent red glass ────────────────── */}
      <div style={{
        width: 52, height: 52, borderRadius: 14, marginBottom: "1.25rem",
        background: hovered ? T.redGlass : "rgba(255,235,230,0.6)",
        backdropFilter: "blur(12px)",
        border: `1px solid ${hovered ? T.redBorder : "rgba(192,57,43,0.18)"}`,
        boxShadow: hovered
          ? `0 4px 20px rgba(192,57,43,0.18), inset 0 1px 0 rgba(255,210,200,0.5)`
          : `inset 0 1px 0 rgba(255,255,255,0.8)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 22, transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
        animation: hovered ? "icon-pop 1.6s ease-in-out infinite" : "none",
        position: "relative", zIndex: 1,
      }}>{service.icon}</div>

      {/* Title */}
      <h3 style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: 19, fontWeight: 700, color: T.textH,
        margin: "0 0 0.35rem", lineHeight: 1.2,
        transition: "color 0.25s", position: "relative", zIndex: 1,
      }}>{service.title}</h3>

      {/* Tagline */}
      <p style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 12.5,
        color: hovered ? T.textMuted : "rgba(140,50,30,0.48)",
        margin: "0 0 1.1rem", lineHeight: 1.5, fontStyle: "italic",
        transition: "color 0.25s", position: "relative", zIndex: 1,
      }}>{service.tagline}</p>

      {/* Divider — red on hover */}
      <div style={{
        height: 1, marginBottom: "1rem",
        background: hovered
          ? `linear-gradient(90deg, rgba(192,57,43,0.5), rgba(192,57,43,0.06))`
          : `linear-gradient(90deg, rgba(192,57,43,0.15), transparent)`,
        transition: "background 0.3s",
        position: "relative", zIndex: 1,
      }} />

      {/* Items list */}
      <ul style={{ listStyle: "none", padding: 0, margin: 0, position: "relative", zIndex: 1 }}>
        {service.items.map((item, j) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: service.accentDelay + 0.18 + j * 0.065 }}
            style={{
              display: "flex", alignItems: "center", gap: 9,
              fontFamily: "'DM Sans', sans-serif", fontSize: 13.5,
              color: hovered ? T.textB : "rgba(60,20,10,0.68)",
              padding: "5.5px 0",
              borderBottom: "1px solid rgba(192,57,43,0.08)",
              transition: "color 0.2s",
            }}
          >
            {/* Transparent red bullet chip */}
            <span style={{
              width: 18, height: 18, borderRadius: 6, flexShrink: 0,
              background: hovered ? "rgba(192,57,43,0.15)" : "rgba(192,57,43,0.07)",
              border: `1px solid rgba(192,57,43,${hovered ? 0.35 : 0.2})`,
              backdropFilter: "blur(6px)",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.25s",
            }}>
              <span style={{ color: T.red, fontSize: 8 }}>▸</span>
            </span>
            {item}
          </motion.li>
        ))}
      </ul>

      {/* ── Transparent red glass "Available" pill ───────────── */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: service.accentDelay + 0.55 }}
        style={{
          marginTop: "1.5rem",
          display: "inline-flex", alignItems: "center", gap: 7,
          background: T.redGlass,
          backdropFilter: "blur(12px)",
          border: `1px solid ${T.redBorder}`,
          borderRadius: 100, padding: "5px 14px",
          boxShadow: "inset 0 1px 0 rgba(255,220,215,0.45), 0 2px 10px rgba(192,57,43,0.1)",
          position: "relative", zIndex: 1,
        }}
      >
        <span style={{
          width: 6, height: 6, borderRadius: "50%",
          background: T.red, display: "inline-block",
          animation: "pulse-ring 2s ease-out infinite",
        }} />
        <span style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 10,
          color: T.redDark, letterSpacing: "0.1em",
          textTransform: "uppercase", fontWeight: 600,
        }}>Available</span>
      </motion.div>
    </motion.div>
  );
}

/* ─── Section Header ────────────────────────────────────────── */
function SectionHeader() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });

  const fadeUp: Variants = {
    hidden:  { opacity: 0, y: 22 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      style={{ textAlign: "center", marginBottom: "5rem" }}
    >
      {/* Label row */}
      <motion.div variants={fadeUp} style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: "1.5rem" }}>
        <motion.div
          initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.55, delay: 0.1 }}
          style={{ width: 32, height: 2, background: `linear-gradient(90deg, ${T.red}, #e05040)`, borderRadius: 2, transformOrigin: "right" }}
        />
        <span style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 11,
          color: T.textMuted, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 500,
        }}>What We Bring To You</span>
        <span style={{
          width: 5, height: 5, borderRadius: "50%",
          background: T.red, display: "inline-block",
          animation: "blink-dot 1.5s ease-in-out infinite",
        }} />
        <motion.div
          initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.55, delay: 0.1 }}
          style={{ width: 32, height: 2, background: `linear-gradient(90deg, #e05040, ${T.red})`, borderRadius: 2, transformOrigin: "left" }}
        />
      </motion.div>

      {/* Headline */}
      <motion.h2 variants={fadeUp} style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 700, color: T.textH,
        margin: "0 0 1rem", letterSpacing: "-0.02em", lineHeight: 1.1,
      }}>
        Services Built{" "}
        <motion.em
          animate={{ opacity: [0.35, 0.68, 0.35] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ fontStyle: "italic", color: "rgba(192,57,43,0.55)" }}
        >with Heart</motion.em>
      </motion.h2>

      {/* Subtext */}
      <motion.p variants={fadeUp} style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 16,
        color: "rgba(80,20,10,0.55)", maxWidth: 480, margin: "0 auto",
        lineHeight: 1.75, fontWeight: 300,
      }}>
        Everything we offer is crafted with care, creativity, and a genuine passion for making a difference.
      </motion.p>

      {/* ── Transparent red glass count badge ─────────────────── */}
      <motion.div
        variants={fadeUp}
        style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          marginTop: "1.75rem",
          background: T.redGlass,
          backdropFilter: "blur(18px)",
          border: `1px solid ${T.redBorder}`,
          borderRadius: 100, padding: "8px 22px",
          boxShadow: "inset 0 1px 0 rgba(255,220,215,0.5), 0 4px 18px rgba(192,57,43,0.12)",
          animation: "float-badge 3.5s ease-in-out infinite",
        }}
      >
        <span style={{
          fontFamily: "'Playfair Display', serif", fontSize: 22,
          fontWeight: 800, color: T.red, lineHeight: 1,
        }}>6</span>
        <div style={{ width: 1, height: 18, background: "rgba(192,57,43,0.25)" }} />
        <span style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 11,
          color: T.redDark, letterSpacing: "0.1em",
          textTransform: "uppercase", fontWeight: 600,
        }}>Core Services</span>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main ──────────────────────────────────────────────────── */
export default function Services() {
  return (
    <>
      <style>{globalStyles}</style>

      <section
        id="services"
        className="srv-section"
        style={{
          padding: "110px 2rem",
          position: "relative", overflow: "hidden",
          /* Red + white-cream base */
          background: T.bg,
        }}
      >
        {/* ── Background blobs — red-tinted ─────────────────── */}
        <div style={{
          position: "absolute", top: "-15%", right: "-10%",
          width: "55vw", height: "55vw", borderRadius: "50%",
          background: `radial-gradient(circle, ${T.blobA} 0%, rgba(220,80,60,0.08) 45%, transparent 70%)`,
          filter: "blur(80px)", pointerEvents: "none",
          animation: "blob-drift 12s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", bottom: "-12%", left: "-6%",
          width: "50vw", height: "50vw", borderRadius: "50%",
          background: `radial-gradient(circle, ${T.blobB} 0%, rgba(200,60,40,0.06) 52%, transparent 70%)`,
          filter: "blur(70px)", pointerEvents: "none",
          animation: "blob-drift 16s ease-in-out reverse infinite",
        }} />
        <div style={{
          position: "absolute", top: "40%", left: "36%",
          width: "36vw", height: "36vw", borderRadius: "50%",
          background: `radial-gradient(circle, ${T.blobC} 0%, transparent 65%)`,
          filter: "blur(60px)", pointerEvents: "none",
        }} />

        {/* Noise texture */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.35,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
          animation: "noise 0.4s steps(1) infinite",
        }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <SectionHeader />

          <div
            className="srv-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}
          >
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.title} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}