import Link from "next/link";

const links = [
  { name: "Services", href: "#services" },
  { name: "Case Studies", href: "#cases" },
  { name: "Framework", href: "#framework" },
  { name: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="px-6 pb-10 pt-24 lg:px-12">
      <div className="mx-auto max-w-7xl rounded-[3rem] border border-[#e8dfd5] bg-white/70 px-8 py-10 shadow-[0_10px_40px_rgba(0,0,0,0.04)] backdrop-blur-xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-4">
              <h2 className="text-3xl font-black tracking-tight text-black">
                MTO
              </h2>

              <div className="h-8 w-px bg-neutral-300" />

              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#a31414]">
                Originals
              </span>
            </div>

            <p className="mt-6 max-w-md text-base leading-7 text-neutral-600">
              Building high-converting brands, campaigns, and digital
              experiences designed for modern business growth.
            </p>
          </div>

          {/* Nav */}
          <div className="flex flex-wrap gap-6">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-700 transition hover:text-[#b11212]"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-4 border-t border-[#ebe2d8] pt-8 text-sm text-neutral-500 md:flex-row md:items-center md:justify-between">
          <p>© 2025 MTO Originals. All rights reserved.</p>

          <p>
            Branding · Leads · Conversions · Growth · Web Dev
          </p>
        </div>
      </div>
    </footer>
  );
}