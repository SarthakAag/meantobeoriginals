"use client";

import { useState, useRef, useEffect } from "react";

import {
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa";

import { MdEmail } from "react-icons/md";

const services = [
  {
    value: "Performance Marketing",
    icon: "📣",
    svgIcon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11l19-9-9 19-2-8-8-2z"/>
      </svg>
    ),
    desc: "Ads, ROI, growth campaigns",
    iconBg: "linear-gradient(135deg,#FDEFE4,#F7DDCC)",
    iconColor: "#B83A2F",
    iconBgActive: "linear-gradient(135deg,#B83A2F,#8E2B21)",
  },
  {
    value: "Social Media Management",
    icon: "📱",
    svgIcon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
    desc: "Content, scheduling, engagement",
    iconBg: "linear-gradient(135deg,#EDE9FE,#DDD5FD)",
    iconColor: "#6D28D9",
    iconBgActive: "linear-gradient(135deg,#7C3AED,#5B21B6)",
  },
  {
    value: "Event Management",
    svgIcon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 8 22 8 12 13 2 8"/>
        <path d="M2 8l10-5 10 5v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8z"/>
        <line x1="12" y1="22" x2="12" y2="13"/>
      </svg>
    ),
    desc: "Planning, coordination, execution",
    iconBg: "linear-gradient(135deg,#FEF3C7,#FDE68A)",
    iconColor: "#92400E",
    iconBgActive: "linear-gradient(135deg,#D97706,#92400E)",
  },
  {
    value: "Branding",
    svgIcon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    desc: "Identity, logo, visual design",
    iconBg: "linear-gradient(135deg,#FCE7F3,#FBCFE8)",
    iconColor: "#9D174D",
    iconBgActive: "linear-gradient(135deg,#DB2777,#9D174D)",
  },
  {
    value: "Software Development",
    svgIcon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    desc: "Web, mobile, custom builds",
    iconBg: "linear-gradient(135deg,#E0F2FE,#BAE6FD)",
    iconColor: "#075985",
    iconBgActive: "linear-gradient(135deg,#0284C7,#075985)",
  },
  {
    value: "Hampers",
    svgIcon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 12 20 22 4 22 4 12"/>
        <rect x="2" y="7" width="20" height="5"/>
        <line x1="12" y1="22" x2="12" y2="7"/>
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
      </svg>
    ),
    desc: "Curated gifting, special occasions",
    iconBg: "linear-gradient(135deg,#ECFDF5,#A7F3D0)",
    iconColor: "#065F46",
    iconBgActive: "linear-gradient(135deg,#059669,#065F46)",
  },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    category: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedService = services.find(
    (s) => s.value === form.category
  );

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const people = [
    { name: "Aryan", phone: "8217872439", initials: "A" },
    { name: "Shruthi", phone: "6380217412", initials: "S" },
  ];

  const socials = [
    {
      icon: <FaInstagram />,
      label: "Instagram",
      value: "@meant.to.be_originals",
      href: "https://www.instagram.com/meanttobe.originals?igsh=MWF0azJ1bmpzazMxcw%3D%3D&utm_source=qr",
    },
    {
      icon: <FaFacebookF />,
      label: "Facebook",
      value: "Meant To Be Originals",
      href: "https://www.facebook.com/people/Meant-to-be/61589726623889/",
    },
    {
      icon: <MdEmail />,
      label: "Email",
      value: "meanttobe.originals@gmail.com",
      href: "mailto:meanttobe.originals@gmail.com",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
        setForm({ name: "", email: "", mobile: "", category: "", message: "" });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.log(error);
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=Outfit:wght@300;400;500;600;700&display=swap');

        :root {
          --cream: #FFF8F3;
          --warm-white: #FFFFFF;
          --parchment: #F8E9DB;
          --gold: #C9913D;
          --gold-light: #E4B96A;
          --red: #B83A2F;
          --red-deep: #8E2B21;
          --ink: #2E140D;
          --ink-soft: rgba(46,20,13,0.65);
        }

        * { box-sizing: border-box; }

        .contact-section {
          padding: 110px 24px 90px;
          max-width: 1180px;
          margin: 0 auto;
          font-family: 'Outfit', sans-serif;
        }

        .contact-header {
          text-align: center;
          margin-bottom: 70px;
        }

        .contact-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(42px, 6vw, 74px);
          font-weight: 700;
          color: var(--ink);
          margin-bottom: 14px;
        }

        .contact-title span {
          color: var(--red);
          font-style: italic;
        }

        .contact-subtitle {
          max-width: 620px;
          margin: 0 auto;
          font-size: 17px;
          line-height: 1.9;
          color: var(--ink-soft);
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 0.95fr 1.25fr;
          gap: 32px;
        }

        .info-stack {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .info-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(252,244,236,0.95));
          border: 1px solid rgba(184,58,47,0.08);
          border-radius: 24px;
          padding: 22px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: 0 10px 30px rgba(184,58,47,0.05);
          transition: all 0.3s ease;
        }

        .info-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 40px rgba(184,58,47,0.08);
        }

        .avatar, .icon-badge {
          width: 58px;
          height: 58px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .avatar {
          background: linear-gradient(135deg, var(--red), var(--red-deep));
          color: white;
          font-weight: 700;
          font-size: 20px;
        }

        .icon-badge {
          background: linear-gradient(135deg, #FDEFE4, #F7DDCC);
          color: var(--red);
          font-size: 20px;
        }

        .info-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px;
          color: var(--ink);
          margin-bottom: 4px;
        }

        .info-phone, .info-link {
          color: var(--ink-soft);
          text-decoration: none;
          font-size: 15px;
          transition: 0.2s ease;
        }

        .info-phone:hover, .info-link:hover { color: var(--red); }

        .info-label {
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 4px;
          font-weight: 700;
        }

        .form-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.92), rgba(252,244,236,0.95));
          border: 1px solid rgba(184,58,47,0.08);
          border-radius: 34px;
          padding: 42px;
          box-shadow: 0 24px 60px rgba(184,58,47,0.08);
          backdrop-filter: blur(20px);
        }

        .form-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 40px;
          color: var(--ink);
          margin-bottom: 10px;
        }

        .form-tagline {
          color: var(--ink-soft);
          margin-bottom: 34px;
          line-height: 1.8;
        }

        .form-inner {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .field-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }

        .field-group {
          display: flex;
          flex-direction: column;
        }

        .field-label {
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 8px;
          font-weight: 700;
        }

        .field-input, .field-textarea {
          border: 1px solid rgba(184,58,47,0.12);
          border-radius: 18px;
          padding: 16px 18px;
          background: linear-gradient(135deg, rgba(255,255,255,0.98), rgba(248,237,228,0.96));
          font-size: 15px;
          font-family: 'Outfit', sans-serif;
          color: #5A2D24;
          outline: none;
          transition: all 0.3s ease;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.7), 0 10px 24px rgba(184,58,47,0.03);
        }

        .field-input:focus, .field-textarea:focus {
          border-color: var(--gold);
          box-shadow: 0 0 0 4px rgba(201,145,61,0.10), 0 18px 40px rgba(184,58,47,0.06);
        }

        .field-textarea {
          resize: vertical;
          min-height: 130px;
        }

        /* ── Custom Dropdown ─────────────────────────────── */
        .custom-dropdown {
          position: relative;
          width: 100%;
        }

        .dropdown-trigger {
          width: 100%;
          cursor: pointer;
          border: 1px solid rgba(184,58,47,0.14);
          border-radius: 20px;
          padding: 14px 52px 14px 14px;
          font-size: 15px;
          font-weight: 500;
          font-family: 'Outfit', sans-serif;
          color: #5A2D24;
          background: linear-gradient(135deg, rgba(255,252,248,0.98), rgba(248,237,228,0.96));
          box-shadow: 0 12px 35px rgba(184,58,47,0.05), inset 0 1px 0 rgba(255,255,255,0.8);
          transition: all 0.3s ease;
          outline: none;
          display: flex;
          align-items: center;
          gap: 12px;
          user-select: none;
        }

        .dropdown-trigger:hover {
          transform: translateY(-1px);
          border-color: rgba(184,58,47,0.28);
          box-shadow: 0 18px 40px rgba(184,58,47,0.08), inset 0 1px 0 rgba(255,255,255,0.9);
        }

        .dropdown-trigger.open {
          border-color: var(--gold);
          box-shadow: 0 0 0 4px rgba(201,145,61,0.12), 0 18px 40px rgba(184,58,47,0.08);
        }

        .trigger-svc-icon {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s ease;
        }

        .trigger-svc-label {
          flex: 1;
          line-height: 1;
        }

        .trigger-svc-label.placeholder {
          color: rgba(90,45,36,0.45);
        }

        .dropdown-arrow {
          position: absolute;
          top: 50%;
          right: 14px;
          transform: translateY(-50%);
          pointer-events: none;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #C0392B, #8E2B21);
          color: #fff;
          font-size: 13px;
          box-shadow: 0 8px 20px rgba(192,57,43,0.22);
          transition: transform 0.3s ease;
        }

        .dropdown-arrow.open {
          transform: translateY(-50%) rotate(180deg);
        }

        .dropdown-arrow svg {
          width: 14px;
          height: 14px;
          stroke: white;
          stroke-width: 2.5;
          fill: none;
        }

        .dropdown-panel {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          right: 0;
          z-index: 100;
          background: linear-gradient(135deg, rgba(255,252,248,0.99), rgba(251,241,231,0.99));
          border: 1px solid rgba(184,58,47,0.14);
          border-radius: 22px;
          box-shadow: 0 24px 60px rgba(184,58,47,0.13), 0 4px 16px rgba(184,58,47,0.06);
          overflow: hidden;
          opacity: 0;
          transform: translateY(-8px);
          pointer-events: none;
          transition: opacity 0.22s ease, transform 0.22s ease;
        }

        .dropdown-panel.open {
          opacity: 1;
          transform: translateY(0);
          pointer-events: all;
        }

        .dropdown-option {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 16px;
          cursor: pointer;
          transition: background 0.18s ease;
          border-bottom: 1px solid rgba(184,58,47,0.06);
        }

        .dropdown-option:last-child { border-bottom: none; }

        .dropdown-option:hover { background: rgba(184,58,47,0.04); }

        .dropdown-option.selected { background: rgba(201,145,61,0.07); }

        .opt-icon-wrap {
          width: 38px;
          height: 38px;
          border-radius: 11px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.22s ease;
        }

        .opt-icon-wrap svg {
          width: 17px;
          height: 17px;
          stroke-width: 2;
          fill: none;
          stroke: currentColor;
          transition: stroke 0.22s ease;
        }

        .opt-text { flex: 1; }

        .opt-name {
          font-size: 14.5px;
          font-weight: 500;
          color: #4B241B;
          line-height: 1.2;
        }

        .opt-desc {
          font-size: 11.5px;
          color: var(--ink-soft);
          margin-top: 2px;
        }

        .opt-check {
          font-size: 15px;
          color: var(--gold);
          opacity: 0;
          transition: opacity 0.15s;
          flex-shrink: 0;
        }

        .dropdown-option.selected .opt-check { opacity: 1; }

        .dropdown-option:hover .opt-icon-wrap,
        .dropdown-option.selected .opt-icon-wrap {
          color: #fff !important;
        }

        /* ── Submit Button ───────────────────────────────── */
        .submit-btn {
          margin-top: 10px;
          border: none;
          border-radius: 18px;
          padding: 18px 26px;
          background: linear-gradient(135deg, var(--red), var(--red-deep));
          color: white;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 16px 36px rgba(184,58,47,0.22);
          font-family: 'Outfit', sans-serif;
        }

        .submit-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 44px rgba(184,58,47,0.28);
        }

        .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }

        .success-state {
          text-align: center;
          padding: 50px 20px;
        }

        .success-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 40px;
          margin-bottom: 10px;
          color: var(--ink);
        }

        @media (max-width: 920px) {
          .contact-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 640px) {
          .field-row { grid-template-columns: 1fr; }
          .form-card { padding: 28px; }
          .contact-section { padding: 90px 18px 70px; }
          .contact-title { font-size: 52px; }
        }
      `}</style>

      <section id="contact" className="contact-section">
        <div className="contact-header">
          <h2 className="contact-title">
            Get In <span>Touch</span>
          </h2>
          <p className="contact-subtitle">
            Let's create beautiful experiences together with thoughtful services
            crafted specially for your brand and celebrations.
          </p>
        </div>

        <div className="contact-grid">
          {/* LEFT SIDE */}
          <div className="info-stack">
            {people.map((p) => (
              <div key={p.name} className="info-card">
                <div className="avatar">{p.initials}</div>
                <div>
                  <p className="info-name">{p.name}</p>
                  <a href={`tel:${p.phone}`} className="info-phone">
                    +91 {p.phone}
                  </a>
                </div>
              </div>
            ))}

            {socials.map((item) => (
              <div key={item.label} className="info-card">
                <div className="icon-badge">{item.icon}</div>
                <div>
                  <p className="info-label">{item.label}</p>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="info-link"
                  >
                    {item.value}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* FORM */}
          <div className="form-card">
            {submitted ? (
              <div className="success-state">
                <h3 className="success-title">Message Sent!</h3>
                <p>Thank you for reaching out. We'll get back to you shortly.</p>
              </div>
            ) : (
              <>
                <h3 className="form-title">Send us a message</h3>
                <p className="form-tagline">We typically respond within 24 hours.</p>

                <form onSubmit={handleSubmit} className="form-inner">
                  <div className="field-row">
                    <div className="field-group">
                      <label className="field-label">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Rahul Sharma"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="field-input"
                      />
                    </div>
                    <div className="field-group">
                      <label className="field-label">Mobile Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 8390220930"
                        value={form.mobile}
                        onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                        className="field-input"
                      />
                    </div>
                  </div>

                  <div className="field-row">
                    <div className="field-group">
                      <label className="field-label">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="abc@gmail.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="field-input"
                      />
                    </div>

                    {/* ── Custom Dropdown ── */}
                    <div className="field-group">
                      <label className="field-label">Category</label>
                      <div className="custom-dropdown" ref={dropdownRef}>
                        {/* Hidden native input for form validation */}
                        <input
                          type="text"
                          required
                          value={form.category}
                          onChange={() => {}}
                          style={{ position: "absolute", opacity: 0, pointerEvents: "none", width: 0, height: 0 }}
                          tabIndex={-1}
                        />

                        <div
                          className={`dropdown-trigger${dropdownOpen ? " open" : ""}`}
                          onClick={() => setDropdownOpen((o) => !o)}
                          role="combobox"
                          aria-expanded={dropdownOpen}
                          aria-haspopup="listbox"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") setDropdownOpen((o) => !o);
                            if (e.key === "Escape") setDropdownOpen(false);
                          }}
                        >
                          {/* Trigger icon */}
                          <div
                            className="trigger-svc-icon"
                            style={{
                              background: selectedService
                                ? selectedService.iconBgActive
                                : "linear-gradient(135deg,#FDEFE4,#F7DDCC)",
                              color: selectedService ? "#fff" : "var(--red)",
                            }}
                          >
                            {selectedService ? (
                              <span style={{ display: "flex" }}>
                                {selectedService.svgIcon}
                              </span>
                            ) : (
                              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                                <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                              </svg>
                            )}
                          </div>

                          <span className={`trigger-svc-label${selectedService ? "" : " placeholder"}`}>
                            {selectedService ? selectedService.value : "Choose a Service"}
                          </span>
                        </div>

                        {/* Arrow badge */}
                        <span className={`dropdown-arrow${dropdownOpen ? " open" : ""}`}>
                          <svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
                        </span>

                        {/* Panel */}
                        <div
                          className={`dropdown-panel${dropdownOpen ? " open" : ""}`}
                          role="listbox"
                        >
                          {services.map((svc) => (
                            <div
                              key={svc.value}
                              className={`dropdown-option${form.category === svc.value ? " selected" : ""}`}
                              role="option"
                              aria-selected={form.category === svc.value}
                              onClick={() => {
                                setForm({ ...form, category: svc.value });
                                setDropdownOpen(false);
                              }}
                            >
                              <div
                                className="opt-icon-wrap"
                                style={{
                                  background:
                                    form.category === svc.value
                                      ? svc.iconBgActive
                                      : svc.iconBg,
                                  color:
                                    form.category === svc.value
                                      ? "#fff"
                                      : svc.iconColor,
                                }}
                              >
                                {svc.svgIcon}
                              </div>
                              <div className="opt-text">
                                <div className="opt-name">{svc.value}</div>
                                <div className="opt-desc">{svc.desc}</div>
                              </div>
                              <span className="opt-check">✦</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="field-group">
                    <label className="field-label">Your Message</label>
                    <textarea
                      required
                      placeholder="Tell us about your requirements..."
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="field-textarea"
                    />
                  </div>

                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Message →"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
