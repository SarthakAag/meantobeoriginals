"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const SERVICES = [
  {
    image: "/images/hampers.jpg",
    title: "Hampers",
    tagline: "Made to Make Moments Memorable",
    desc: "Thoughtfully curated hampers for every occasion — from wellness to celebrations.",
    items: [
      "Wellness Hampers",
      "Lifestyle Hampers",
      "Personalised Hampers",
      "Pet Hampers",
      "Return Gifts & More",
    ],
    delay: 0,
  },
  {
    image: "/images/marketing.jpg",
    title: "Performance Marketing",
    tagline: "Grow, connect & stand out",
    desc: "Data-driven campaigns that maximise reach, leads and return on ad spend.",
    items: [
      "Campaigns Creation",
      "Strategy & Planning",
      "CPL & ROAS Tracking",
      "Meta Ads Handling",
    ],
    delay: 0.1,
  },
  {
    image: "/images/social.jpg",
    title: "Social Media Management",
    tagline: "Where Creativity Meets Connection",
    desc: "End-to-end social presence — from scripting to posting, we handle it all.",
    items: [
      "Scripting with CTA",
      "High Quality Video Shoot",
      "Editing",
      "SEO & Keywords",
      "Content Planning",
    ],
    delay: 0.2,
  },
  {
    image: "/images/events.jpg",
    title: "Event Management",
    tagline: "Where Celebrations Come to Life",
    desc: "From intimate ceremonies to grand corporate events — flawlessly executed.",
    items: [
      "Weddings & Receptions",
      "Birthday Celebrations",
      "Baby & Naming Ceremonies",
      "Corporate Events",
      "Surprise Occasions",
    ],
    delay: 0.3,
  },
  {
    image: "/images/branding.jpg",
    title: "Branding",
    tagline: "Your Brand's Creative Partner",
    desc: "Visual identity and storytelling that makes your brand impossible to ignore.",
    items: [
      "Brand Identity Design",
      "Social Media Content",
      "Packaging Design",
      "Digital Branding",
    ],
    delay: 0.4,
  },
  {
    image: "/images/software.jpg",
    title: "Software Development",
    tagline: "Smart Solutions, Seamless Experiences",
    desc: "Custom-built digital products that work beautifully for your business.",
    items: [
      "Landing Pages",
      "E-commerce Websites",
      "CRM Systems",
      "ERP Solutions",
      "Custom Applications",
    ],
    delay: 0.5,
  },
];

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  @keyframes blob-drift {
    0%,100% { transform: translate(0,0) scale(1); }
    33% { transform: translate(20px,-14px) scale(1.05); }
    66% { transform: translate(-14px,10px) scale(0.97); }
  }

  @keyframes pulse-ring {
    0% { box-shadow: 0 0 0 0 rgba(192,57,43,0.4); }
    70% { box-shadow: 0 0 0 7px rgba(192,57,43,0); }
    100% { box-shadow: 0 0 0 0 rgba(192,57,43,0); }
  }

  .services-section {
    overflow: hidden;
  }

  @media (max-width: 768px) {
    .srow-wrap {
      flex-direction: column !important;
      gap: 2rem !important;
    }

    .srow-wrap.reverse {
      flex-direction: column !important;
    }

    .box-side {
      width: 100% !important;
      padding-top: 70px !important;
    }

    .content-side {
      width: 100% !important;
      padding: 0 !important;
      align-items: flex-start !important;
      text-align: left !important;
      margin-top: 1rem;
    }

    .chips-wrap {
      justify-content: flex-start !important;
    }

    .divider-line {
      margin-left: 0 !important;
    }

    .services-container {
      gap: 90px !important;
    }

    .service-image {
      width: 160px !important;
      height: 170px !important;
      left: 50% !important;
      right: auto !important;
      transform: translateX(-50%) !important;
    }

    .service-card {
      height: auto !important;
      min-height: 130px !important;
      padding: 100px 20px 20px !important;
      text-align: center !important;
      justify-content: center !important;
    }

    .service-title {
      font-size: 24px !important;
    }

    .service-tagline {
      font-size: 14px !important;
    }

    .service-description {
      font-size: 15px !important;
      line-height: 1.8 !important;
    }

    .chips-wrap span {
      font-size: 12px !important;
      padding: 5px 12px !important;
    }

    .section-heading {
      font-size: clamp(34px, 9vw, 50px) !important;
    }

    .section-subtitle {
      font-size: 16px !important;
      padding: 0 10px;
    }
  }

  @media (max-width: 560px) {
    .services-section {
      padding: 80px 20px 60px !important;
    }

    .services-container {
      gap: 75px !important;
    }

    .service-image {
      width: 140px !important;
      height: 150px !important;
    }

    .service-card {
      padding: 90px 16px 18px !important;
      border-radius: 20px !important;
    }

    .service-title {
      font-size: 21px !important;
    }

    .service-tagline {
      font-size: 12px !important;
    }

    .service-description {
      font-size: 14px !important;
    }
  }
`;

function ServiceRow({
  service,
  index,
}: {
  service: typeof SERVICES[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-60px",
  });

  const isReversed = index % 2 !== 0;

  return (
    <div ref={ref}>
      <div
        className={`srow-wrap ${
          isReversed ? "reverse" : ""
        }`}
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: isReversed
            ? "row-reverse"
            : "row",
        }}
      >
        {/* LEFT SIDE */}
        <div
          className="box-side"
          style={{
            flex: "0 0 52%",
            position: "relative",
            paddingTop: 83,
          }}
        >
          {/* IMAGE */}
          <motion.div
            className="service-image"
            animate={
              inView
                ? { y: 0, opacity: 1 }
                : { y: 20, opacity: 0 }
            }
            transition={{
              duration: 0.6,
              delay: service.delay + 0.1,
            }}
            whileHover={{
              y: -10,
              scale: 1.03,
            }}
            style={{
              position: "absolute",
              top: 0,
              left: isReversed ? "auto" : 18,
              right: isReversed ? 18 : "auto",
              width: 190,
              height: 200,
              zIndex: 20,
              borderRadius: 18,
              overflow: "hidden",
            }}
          >
            <Image
              src={service.image}
              alt={service.title}
              fill
              style={{
                objectFit: "cover",
              }}
            />
          </motion.div>

          {/* CARD */}
          <motion.div
            className="service-card"
            animate={
              inView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
            }
            transition={{
              duration: 0.6,
              delay: service.delay,
            }}
            whileHover={{
              y: -4,
              boxShadow:
                "0 20px 60px rgba(192,57,43,0.16)",
            }}
            style={{
              background: "rgba(255,255,255,0.35)",
              backdropFilter: "blur(28px)",
              border:
                "1px solid rgba(255,255,255,0.65)",
              borderRadius: 24,
              height: 125,
              display: "flex",
              alignItems: "center",
              paddingLeft: isReversed ? 24 : 210,
              paddingRight: isReversed ? 210 : 24,
              boxShadow:
                "0 8px 36px rgba(192,57,43,0.1)",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background:
                  "linear-gradient(90deg, #C0392B, rgba(192,57,43,0.08))",
                borderRadius: "24px 24px 0 0",
                opacity: 0.55,
              }}
            />

            <div>
              <h3
                className="service-title"
                style={{
                  fontFamily:
                    "'Playfair Display', serif",
                  fontSize: 24,
                  fontWeight: 800,
                  color: "#2a0c06",
                  lineHeight: 1.2,
                  margin: 0,
                }}
              >
                {service.title}
              </h3>

              <p
                className="service-tagline"
                style={{
                  fontFamily:
                    "'DM Sans', sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "rgba(130,50,20,0.6)",
                  fontStyle: "italic",
                  margin: "6px 0 0",
                }}
              >
                {service.tagline}
              </p>
            </div>
          </motion.div>
        </div>

        {/* CONTENT */}
        <motion.div
          className="content-side"
          animate={
            inView
              ? { opacity: 1, x: 0 }
              : {
                  opacity: 0,
                  x: isReversed ? 30 : -30,
                }
          }
          transition={{
            duration: 0.65,
            delay: service.delay + 0.15,
          }}
          style={{
            flex: "0 0 48%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: isReversed
              ? "flex-end"
              : "flex-start",
            textAlign: isReversed ? "right" : "left",
            paddingLeft: isReversed ? 8 : 32,
            paddingRight: isReversed ? 32 : 8,
          }}
        >
          <div
            className="divider-line"
            style={{
              width: 42,
              height: 3,
              background:
                "rgba(192,57,43,0.5)",
              borderRadius: 2,
              marginBottom: 14,
              marginLeft: isReversed
                ? "auto"
                : 0,
            }}
          />

          <p
            className="service-description"
            style={{
              fontFamily:
                "'DM Sans', sans-serif",
              fontSize: 16,
              color: "rgba(60,20,8,0.72)",
              lineHeight: 1.8,
              marginBottom: 16,
              fontWeight: 500,
            }}
          >
            {service.desc}
          </p>

          {/* CHIPS */}
          <div
            className="chips-wrap"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              marginBottom: 16,
              justifyContent: isReversed
                ? "flex-end"
                : "flex-start",
            }}
          >
            {service.items.map((item, i) => (
              <motion.span
                key={item}
                initial={{
                  opacity: 0,
                  scale: 0.85,
                }}
                animate={
                  inView
                    ? {
                        opacity: 1,
                        scale: 1,
                      }
                    : {}
                }
                transition={{
                  duration: 0.3,
                  delay:
                    service.delay +
                    0.3 +
                    i * 0.07,
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  fontSize: 14,
                  fontWeight: 600,
                  color:
                    "rgba(55,18,6,0.8)",
                  background:
                    "rgba(192,57,43,0.07)",
                  border:
                    "1px solid rgba(192,57,43,0.18)",
                  borderRadius: 100,
                  padding: "6px 14px",
                }}
              >
                <span
                  style={{
                    color: "#C0392B",
                    fontSize: 8,
                  }}
                >
                  ▸
                </span>

                {item}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <>
      <style>{globalStyles}</style>

      <section
        className="services-section"
        style={{
          background:
            "linear-gradient(135deg,#fff8f6 0%,#fff2ee 40%,#ffe8e2 70%,#fff5f3 100%)",
          padding: "100px 40px 80px",
          position: "relative",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "5rem",
          }}
        >
          <p
            style={{
              fontFamily:
                "'DM Sans', sans-serif",
              fontSize: 13,
              color:
                "rgba(120,40,25,0.6)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 700,
              marginBottom: 14,
            }}
          >
            What We Bring To You
          </p>

          <h2
            className="section-heading"
            style={{
              fontFamily:
                "'Playfair Display', serif",
              fontSize:
                "clamp(38px,5vw,62px)",
              fontWeight: 800,
              color: "#2a0c06",
              lineHeight: 1.1,
              margin: "0 0 14px",
            }}
          >
            Services Built{" "}
            <em
              style={{
                fontStyle: "italic",
                color:
                  "rgba(192,57,43,0.55)",
              }}
            >
              with Heart
            </em>
          </h2>

          <p
            className="section-subtitle"
            style={{
              fontFamily:
                "'DM Sans', sans-serif",
              fontSize: 18,
              color:
                "rgba(80,20,10,0.58)",
              fontWeight: 500,
              lineHeight: 1.8,
              maxWidth: 520,
              margin: "0 auto",
            }}
          >
            Everything crafted with care,
            creativity, and genuine passion.
          </p>
        </div>

        {/* SERVICES */}
        <div
          className="services-container"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 110,
            maxWidth: 920,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          {SERVICES.map((service, i) => (
            <ServiceRow
              key={service.title}
              service={service}
              index={i}
            />
          ))}
        </div>
      </section>
    </>
  );
}