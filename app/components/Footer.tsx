"use client";

export default function Footer() {
  return (
    <>
      <style>{`
        .footer {
          border-top: 1px solid rgba(201,145,61,0.2);
          padding: 2.5rem 2rem;
          background: linear-gradient(to bottom, transparent, rgba(245,233,211,0.18));
        }

        .footer-inner {
          max-width: 1120px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .footer-brand {
          font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
          font-size: 17px;
          font-weight: 700;
          color: #1A0F07;
          letter-spacing: -0.01em;
          white-space: nowrap;
        }

        .footer-brand span {
          color: #C9913D;
          margin-right: 6px;
        }

        .footer-copy {
          font-family: 'Outfit', 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 300;
          color: rgba(80,50,30,0.45);
          margin: 0;
          text-align: center;
          flex: 1;
        }

        .footer-nav {
          display: flex;
          gap: 1.75rem;
          align-items: center;
        }

        .footer-nav a {
          font-family: 'Outfit', 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(80,50,30,0.4);
          text-decoration: none;
          transition: color 0.2s;
          white-space: nowrap;
        }

        .footer-nav a:hover { color: #B83A2F; }

        /* ---- Responsive ---- */
        @media (max-width: 680px) {
          .footer-inner {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 1.1rem;
          }

          .footer-copy {
            order: 3;
            flex: unset;
          }

          .footer-nav {
            gap: 1.5rem;
          }
        }

        @media (max-width: 360px) {
          .footer-nav {
            gap: 1rem;
          }

          .footer-nav a {
            font-size: 11px;
          }
        }
      `}</style>

      <footer className="footer">
        <div className="footer-inner">
          <span className="footer-brand">
            <span>✦</span>Meant to Be Originals
          </span>

          <p className="footer-copy">
            © {new Date().getFullYear()} Meant to Be Originals. Made with ❤️
          </p>

          <nav className="footer-nav">
            {["Home", "Services", "Contact"].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`}>{link}</a>
            ))}
          </nav>
        </div>
      </footer>
    </>
  );
}