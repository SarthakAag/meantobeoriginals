"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  type Variants,
} from "framer-motion";

// --- Global Styles ---
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
  }

  @keyframes blink-dot {
    0%,100% { opacity:1; }
    50% { opacity:0.15; }
  }

  @keyframes grain {
    0%,100% { transform: translate(0,0); }
    10% { transform: translate(-2%,-3%); }
    30% { transform: translate(3%,2%); }
    50% { transform: translate(-1%,4%); }
    70% { transform: translate(2%,-2%); }
    90% { transform: translate(-3%,1%); }
  }

  @keyframes glow-pulse {
    0%,100% {
      box-shadow: 0 6px 24px rgba(192,57,43,0.3);
    }
    50% {
      box-shadow: 0 10px 40px rgba(192,57,43,0.55),
                  0 0 60px rgba(192,57,43,0.2);
    }
  }

  @keyframes logoFloat {
    0%,100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-18px);
    }
  }

  @keyframes logoGlow {
    0%,100% {
      filter: drop-shadow(0 0 10px rgba(192,57,43,0.15));
    }
    50% {
      filter: drop-shadow(0 0 35px rgba(192,57,43,0.4));
    }
  }

  @keyframes rotateBorder {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .hero-cta-primary {
    animation: glow-pulse 2.8s ease-in-out infinite;
    transition: all 0.25s ease;
  }

  .hero-cta-primary:hover {
    background: #A93226 !important;
    transform: translateY(-3px) scale(1.03);
    animation: none;
  }

  .hero-cta-secondary:hover {
    background: rgba(255,240,230,0.9) !important;
    transform: translateY(-3px);
    border-color: rgba(192,57,43,0.4) !important;
  }

  .hero-layout {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo-glow-ring {
    position: absolute;
    width: 115%;
    height: 115%;
    border-radius: 50%;
    background: conic-gradient(
      from 0deg,
      rgba(192,57,43,0.15),
      rgba(255,255,255,0),
      rgba(192,57,43,0.25),
      rgba(255,255,255,0)
    );
    animation: rotateBorder 12s linear infinite;
    filter: blur(18px);
  }

  .hero-logo {
    position: relative;
    z-index: 2;
    animation:
      logoFloat 4.5s ease-in-out infinite,
      logoGlow 4s ease-in-out infinite;
    transition: transform 0.4s ease;
  }

  .hero-logo:hover {
    transform: scale(1.05);
  }

  @media (max-width: 992px) {
    .hero-layout {
      flex-direction: column;
      text-align: center;
      gap: 2rem !important;
    }

    .hero-logo-wrap {
      justify-content: center !important;
      width: 100%;
      order: 1;
    }

    .hero-content {
      order: 2;
      text-align: center !important;
    }

    .hero-ctas {
      justify-content: center !important;
    }

    .hero-stats {
      justify-content: center !important;
    }
  }

  @media (max-width: 768px) {
    .hero-headline {
      font-size: clamp(34px, 9vw, 58px) !important;
    }

    .hero-sub {
      font-size: 15px !important;
    }

    .hero-stats {
      gap: 2rem !important;
    }

    .hero-stat-num {
      font-size: 28px !important;
    }

    .hero-ctas {
      flex-direction: column;
      align-items: center;
    }

    .hero-cta-primary,
    .hero-cta-secondary {
      width: 100%;
      max-width: 320px;
      text-align: center;
    }

    .hero-logo {
      max-width: 320px !important;
    }
  }

  @media (max-width: 480px) {
    .hero-headline {
      font-size: clamp(28px, 10vw, 44px) !important;
    }

    .hero-badge {
      font-size: 10px !important;
      padding: 5px 14px !important;
    }
  }
`;

// Floating particle
function Particle({
  x,
  y,
  size,
  delay,
  duration,
}: {
  x: string;
  y: string;
  size: number;
  delay: number;
  duration: number;
}) {
  return (
    <motion.div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "50%",
        background: "rgba(192,57,43,0.25)",
        pointerEvents: "none",
      }}
      animate={{
        y: [0, -30, 0],
        opacity: [0.2, 0.7, 0.2],
        scale: [1, 1.3, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

// Blinking Dot
function BlinkDot() {
  return (
    <span
      style={{
        display: "inline-block",
        width: 7,
        height: 7,
        borderRadius: "50%",
        background: "#C0392B",
        animation: "blink-dot 1.4s ease-in-out infinite",
      }}
    />
  );
}

// Stats
function StatItem({
  num,
  label,
  delay,
}: {
  num: string;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay,
        duration: 0.6,
      }}
      style={{
        textAlign: "center",
      }}
    >
      <motion.p
        className="hero-stat-num"
        whileHover={{
          scale: 1.12,
          color: "#C0392B",
        }}
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "36px",
          fontWeight: 700,
          color: "#1e1008",
          margin: "0 0 4px",
          lineHeight: 1,
        }}
      >
        {num}
      </motion.p>

      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "11px",
          color: "rgba(80,50,30,0.5)",
          margin: 0,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </p>
    </motion.div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const [mounted, setMounted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
  });

  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "30%"]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 32,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const particles = [
    { x: "12%", y: "22%", size: 5, delay: 0, duration: 4.2 },
    { x: "88%", y: "35%", size: 4, delay: 1.1, duration: 5.5 },
    { x: "25%", y: "72%", size: 6, delay: 0.6, duration: 3.8 },
    { x: "75%", y: "80%", size: 3, delay: 1.8, duration: 6.1 },
  ];

  return (
    <>
      <style>{globalStyles}</style>

      <section
        ref={sectionRef}
        id="home"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          padding: "clamp(100px, 15vw, 140px) 1rem 80px",
          overflow: "hidden",
          background:
            "linear-gradient(160deg, #fdf7f2 0%, #faeee4 50%, #f5e4d4 100%)",
        }}
      >
        {/* Grain */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
            animation: "grain 0.5s steps(1) infinite",
            opacity: 0.6,
          }}
        />

        {/* Background blob */}
        <motion.div
          style={{
            y: bgY,
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
          }}
        >
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.18, 0.28, 0.18],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              top: "8%",
              right: "5%",
              width: "clamp(220px, 35vw, 440px)",
              height: "clamp(220px, 35vw, 440px)",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(210,130,100,0.35) 0%, rgba(210,185,155,0.12) 70%)",
              filter: "blur(55px)",
            }}
          />
        </motion.div>

        {/* Particles */}
        {mounted &&
          particles.map((p, i) => (
            <Particle key={i} {...p} />
          ))}

        {/* Main Layout */}
        <AnimatePresence>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="hero-layout"
            style={{
              maxWidth: "1400px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "4rem",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* LOGO */}
            <motion.div
              variants={itemVariants}
              className="hero-logo-wrap"
              style={{
                flex: "0 0 40%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <div className="logo-container">
                <div className="logo-glow-ring" />

                <img
                  src="/logo1.png"
                  alt="Logo"
                  className="hero-logo"
                  style={{
                    width: "100%",
                    maxWidth: "500px",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </div>
            </motion.div>

            {/* CONTENT */}
            <div
              className="hero-content"
              style={{
                flex: 1,
                textAlign: "left",
              }}
            >
              {/* Badge */}
              <motion.div
                variants={itemVariants}
                style={{
                  marginBottom: "2rem",
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="hero-badge"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    background: "rgba(255,248,240,0.75)",
                    border:
                      "1px solid rgba(192,57,43,0.22)",
                    borderRadius: "100px",
                    padding: "7px 20px",
                    backdropFilter: "blur(14px)",
                  }}
                >
                  <BlinkDot />

                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "11px",
                      color: "rgba(80,45,25,0.7)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    Creative Agency & Digital Studio
                  </span>

                  <BlinkDot />
                </motion.div>
              </motion.div>

              {/* Heading */}
              <motion.h1
                variants={itemVariants}
                className="hero-headline"
                style={{
                  fontFamily:
                    "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(42px, 7vw, 86px)",
                  fontWeight: 700,
                  color: "#1e1008",
                  lineHeight: 1.08,
                  margin: "0 0 1.5rem",
                  letterSpacing: "-0.025em",
                }}
              >
                Where Every <em>Idea</em>
                <br />
                Becomes{" "}
                <span style={{ color: "#C0392B" }}>
                  Unforgettable
                </span>
              </motion.h1>

              {/* Subtext */}
              <motion.p
                variants={itemVariants}
                className="hero-sub"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "clamp(15px, 2vw, 18px)",
                  color: "rgba(60,35,20,0.62)",
                  lineHeight: 1.8,
                  maxWidth: "580px",
                  margin: "0 0 3rem",
                  fontWeight: 300,
                }}
              >
                From surprise hampers and performance
                marketing to software development — we
                build experiences that connect, inspire,
                and leave lasting impressions.
              </motion.p>

              {/* CTA */}
              <motion.div
                variants={itemVariants}
                className="hero-ctas"
                style={{
                  display: "flex",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <motion.a
                  href="/hamper"
                  className="hero-cta-primary"
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: "#C0392B",
                    color: "#fff",
                    padding: "15px 38px",
                    borderRadius: "12px",
                    textDecoration: "none",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "15px",
                    fontWeight: 500,
                    letterSpacing: "0.05em",
                    display: "inline-block",
                  }}
                >
                  Explore Our hampers →
                </motion.a>

                <motion.a
                  href="#about"
                  className="hero-cta-secondary"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background:
                      "rgba(255,248,240,0.65)",
                    color: "#2a1a0e",
                    padding: "15px 38px",
                    borderRadius: "12px",
                    textDecoration: "none",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "15px",
                    fontWeight: 400,
                    letterSpacing: "0.05em",
                    border:
                      "1px solid rgba(192,57,43,0.2)",
                    backdropFilter: "blur(12px)",
                    display: "inline-block",
                  }}
                >
                  Our Story
                </motion.a>
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={itemVariants}
                className="hero-stats"
                style={{
                  display: "flex",
                  gap: "3.5rem",
                  marginTop: "3rem",
                  flexWrap: "wrap",
                }}
              >
                <StatItem
                  num="6+"
                  label="Services Offered"
                  delay={1.1}
                />

                <StatItem
                  num="100%"
                  label="Passion Driven"
                  delay={1.25}
                />

                <StatItem
                  num="∞"
                  label="Creative Ideas"
                  delay={1.4}
                />
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>
    </>
  );
}