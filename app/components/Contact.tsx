"use client";

import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const people = [
    { name: "Aryan", phone: "8217872439", initials: "A" },
    { name: "Shruthi", phone: "6380217412", initials: "S" },
  ];

  const socials = [
    { icon: "📸", label: "Instagram", value: "@meant.to.be_originals", href: "https://instagram.com/meant.to.be_originals" },
    { icon: "✉️", label: "Email", value: "meanttobe.orginals@gmail.com", href: "mailto:meanttobe.orginals@gmail.com" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Outfit:wght@300;400;500;600&display=swap');

        :root {
          --cream: #FDF6EC;
          --warm-white: #FFFAF3;
          --parchment: #F5E9D3;
          --gold: #C9913D;
          --gold-light: #E4B96A;
          --red: #B83A2F;
          --red-deep: #8E2B21;
          --ink: #1A0F07;
          --ink-60: rgba(26,15,7,0.6);
          --ink-35: rgba(26,15,7,0.35);
          --ink-15: rgba(26,15,7,0.15);
          --card-bg: rgba(255,250,243,0.72);
          --border: rgba(201,145,61,0.22);
          --border-hover: rgba(201,145,61,0.5);
        }

        .contact-section {
          padding: 110px 2rem 80px;
          max-width: 1120px;
          margin: 0 auto;
          font-family: 'Outfit', sans-serif;
          position: relative;
        }

        /* Decorative background orbs */
        .contact-section::before {
          content: '';
          position: fixed;
          top: -200px;
          right: -200px;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(201,145,61,0.07) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        /* ---- HEADER ---- */
        .contact-header {
          text-align: center;
          margin-bottom: 4.5rem;
          position: relative;
          z-index: 1;
        }

        .contact-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 1.5rem;
        }

        .eyebrow-line {
          width: 36px;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold));
        }
        .eyebrow-line.right {
          background: linear-gradient(90deg, var(--gold), transparent);
        }

        .eyebrow-text {
          font-family: 'Outfit', sans-serif;
          font-size: 11px;
          font-weight: 500;
          color: var(--gold);
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        .contact-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(36px, 6vw, 62px);
          font-weight: 600;
          color: var(--ink);
          margin: 0 0 1.1rem;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .contact-title em {
          font-style: italic;
          font-weight: 300;
          color: var(--gold);
        }

        .contact-subtitle {
          font-family: 'Outfit', sans-serif;
          font-size: 16px;
          font-weight: 300;
          color: var(--ink-60);
          max-width: 400px;
          margin: 0 auto;
          line-height: 1.75;
        }

        /* ---- GRID ---- */
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 2.5rem;
          align-items: start;
          position: relative;
          z-index: 1;
        }

        /* ---- INFO CARDS ---- */
        .info-stack {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .info-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 1.2rem 1.4rem;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          display: flex;
          align-items: center;
          gap: 1rem;
          box-shadow: 0 2px 20px rgba(201,145,61,0.06), inset 0 1px 0 rgba(255,255,255,0.6);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          cursor: default;
        }

        .info-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(201,145,61,0.12), inset 0 1px 0 rgba(255,255,255,0.7);
          border-color: var(--border-hover);
        }

        .avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--red) 0%, var(--red-deep) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-weight: 700;
          color: #fff;
          flex-shrink: 0;
          box-shadow: 0 4px 14px rgba(184,58,47,0.3);
        }

        .info-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 17px;
          font-weight: 600;
          color: var(--ink);
          margin: 0 0 3px;
        }

        .info-phone {
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 400;
          color: var(--ink-60);
          text-decoration: none;
          transition: color 0.2s;
        }

        .info-phone:hover { color: var(--red); }

        .icon-badge {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: linear-gradient(135deg, var(--parchment), #EDD9B5);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
          border: 1px solid var(--border);
        }

        .info-label {
          font-family: 'Outfit', sans-serif;
          font-size: 10px;
          font-weight: 500;
          color: var(--gold);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin: 0 0 3px;
        }

        .info-link {
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          color: var(--ink-60);
          text-decoration: none;
          word-break: break-all;
          transition: color 0.2s;
          font-weight: 400;
        }

        .info-link:hover { color: var(--red); }

        /* ---- FORM CARD ---- */
        .form-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 2.75rem;
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          box-shadow: 0 8px 40px rgba(201,145,61,0.08), inset 0 1px 0 rgba(255,255,255,0.7);
          position: relative;
          overflow: hidden;
        }

        /* Subtle corner accent */
        .form-card::after {
          content: '';
          position: absolute;
          top: 0; right: 0;
          width: 120px; height: 120px;
          background: radial-gradient(circle at top right, rgba(201,145,61,0.08), transparent 70%);
          pointer-events: none;
        }

        .form-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 26px;
          font-weight: 600;
          color: var(--ink);
          margin: 0 0 0.35rem;
          letter-spacing: -0.01em;
        }

        .form-tagline {
          font-size: 13px;
          font-weight: 300;
          color: var(--ink-35);
          margin: 0 0 1.8rem;
          font-family: 'Outfit', sans-serif;
        }

        .form-inner {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .field-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .field-group { display: flex; flex-direction: column; }

        .field-label {
          font-family: 'Outfit', sans-serif;
          font-size: 10px;
          font-weight: 600;
          color: var(--gold);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-bottom: 7px;
        }

        .field-input, .field-textarea {
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: var(--ink);
          background: rgba(255,250,243,0.5);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 12px 15px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          width: 100%;
          box-sizing: border-box;
        }

        .field-input::placeholder, .field-textarea::placeholder {
          color: var(--ink-35);
          font-weight: 300;
        }

        .field-input.focused, .field-textarea.focused {
          border-color: var(--gold-light);
          background: rgba(255,253,248,0.85);
          box-shadow: 0 0 0 3px rgba(201,145,61,0.08);
        }

        .field-textarea { resize: vertical; min-height: 110px; }

        .submit-btn {
          background: linear-gradient(135deg, var(--red) 0%, var(--red-deep) 100%);
          color: #fff;
          border: none;
          border-radius: 12px;
          padding: 15px 32px;
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          font-weight: 500;
          letter-spacing: 0.05em;
          cursor: pointer;
          width: 100%;
          box-shadow: 0 6px 24px rgba(184,58,47,0.28);
          transition: all 0.25s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          position: relative;
          overflow: hidden;
        }

        .submit-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.08), transparent);
          opacity: 0;
          transition: opacity 0.25s;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(184,58,47,0.35);
        }

        .submit-btn:hover::before { opacity: 1; }
        .submit-btn:active { transform: translateY(0); }

        .btn-arrow {
          display: inline-block;
          transition: transform 0.25s;
        }
        .submit-btn:hover .btn-arrow { transform: translateX(4px); }

        /* ---- SUCCESS ---- */
        .success-state {
          text-align: center;
          padding: 3rem 1.5rem;
        }

        .success-icon {
          font-size: 52px;
          margin-bottom: 1.1rem;
          display: block;
          animation: popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both;
        }

        @keyframes popIn {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .success-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 600;
          color: var(--ink);
          margin: 0 0 0.6rem;
        }

        .success-body {
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          font-weight: 300;
          color: var(--ink-60);
          line-height: 1.7;
          margin: 0 0 1.5rem;
        }

        .reset-btn {
          background: transparent;
          border: 1px solid var(--border-hover);
          color: var(--red);
          padding: 10px 26px;
          border-radius: 10px;
          cursor: pointer;
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 500;
          transition: all 0.2s;
          letter-spacing: 0.04em;
        }

        .reset-btn:hover {
          background: rgba(184,58,47,0.05);
          border-color: var(--red);
          transform: translateY(-1px);
        }

        /* ---- DIVIDER ---- */
        .form-divider {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 0.2rem 0;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: var(--border);
        }

        .divider-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--gold);
          opacity: 0.5;
        }

        /* ---- RESPONSIVE ---- */
        @media (max-width: 860px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .info-stack {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.9rem;
          }

          .form-card {
            padding: 2rem;
          }

          .field-row {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 560px) {
          .contact-section {
            padding: 80px 1.25rem 60px;
          }

          .info-stack {
            grid-template-columns: 1fr;
          }

          .form-card {
            padding: 1.5rem 1.25rem;
          }

          .contact-title {
            font-size: clamp(32px, 9vw, 48px);
          }

          .form-title {
            font-size: 22px;
          }
        }

        @media (max-width: 380px) {
          .info-card {
            padding: 1rem 1rem;
          }

          .field-input, .field-textarea {
            font-size: 16px; /* prevent iOS zoom */
          }
        }
      `}</style>

      <section id="contact" className="contact-section">
        {/* Header */}
        <div className="contact-header">
          <div className="contact-eyebrow">
            <div className="eyebrow-line" />
            <span className="eyebrow-text">Let&apos;s Talk</span>
            <div className="eyebrow-line right" />
          </div>
          <h2 className="contact-title">
            Get In <em>Touch</em>
          </h2>
          <p className="contact-subtitle">
            We&apos;d love to hear from you. Let&apos;s create something beautiful together.
          </p>
        </div>

        <div className="contact-grid">
          {/* Info Cards */}
          <div className="info-stack">
            {people.map(p => (
              <div key={p.name} className="info-card">
                <div className="avatar">{p.initials}</div>
                <div>
                  <p className="info-name">{p.name}</p>
                  <a href={`tel:${p.phone}`} className="info-phone">+91 {p.phone}</a>
                </div>
              </div>
            ))}

            {socials.map(item => (
              <div key={item.label} className="info-card">
                <div className="icon-badge">{item.icon}</div>
                <div>
                  <p className="info-label">{item.label}</p>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="info-link">
                    {item.value}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="form-card">
            {submitted ? (
              <div className="success-state">
                <span className="success-icon">🎉</span>
                <h3 className="success-title">Message Sent!</h3>
                <p className="success-body">
                  Thank you for reaching out.<br />We&apos;ll get back to you shortly!
                </p>
                <button
                  className="reset-btn"
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", message: "" }); }}
                >
                  Send Another →
                </button>
              </div>
            ) : (
              <>
                <h3 className="form-title">Send us a message</h3>
                <p className="form-tagline">We typically respond within 24 hours</p>

                <div className="form-divider">
                  <div className="divider-line" />
                  <div className="divider-dot" />
                  <div className="divider-line" />
                </div>

                <form
                  onSubmit={e => { e.preventDefault(); setSubmitted(true); }}
                  className="form-inner"
                  style={{ marginTop: "1.4rem" }}
                >
                  <div className="field-row">
                    {[
                      { id: "name", label: "Your Name", type: "text", placeholder: "e.g. Rahul Sharma" },
                      { id: "email", label: "Email Address", type: "email", placeholder: "rahul@example.com" },
                    ].map(field => (
                      <div key={field.id} className="field-group">
                        <label htmlFor={field.id} className="field-label">{field.label}</label>
                        <input
                          id={field.id}
                          type={field.type}
                          placeholder={field.placeholder}
                          required
                          value={form[field.id as keyof typeof form]}
                          onChange={e => setForm({ ...form, [field.id]: e.target.value })}
                          className={`field-input${focused === field.id ? " focused" : ""}`}
                          onFocus={() => setFocused(field.id)}
                          onBlur={() => setFocused(null)}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="field-group">
                    <label htmlFor="message" className="field-label">Your Message</label>
                    <textarea
                      id="message"
                      placeholder="Tell us about your project or idea…"
                      rows={5}
                      required
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      className={`field-textarea${focused === "message" ? " focused" : ""}`}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                    />
                  </div>

                  <button type="submit" className="submit-btn">
                    Send Message <span className="btn-arrow">→</span>
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