import Link from "next/link";
import { ArrowUpRight, ShoppingBag } from "lucide-react";

import { hampers } from "../hampers/data";

export default function FeaturedHampers() {
  const featured = hampers.slice(0, 3);

  return (
    <section className="relative overflow-hidden px-6 py-28 lg:px-12">
      {/* Background */}
      <div className="absolute right-[-100px] top-[100px] h-[300px] w-[300px] rounded-full bg-red-100/60 blur-3xl" />

      <div className="absolute bottom-[-120px] left-[-120px] h-[280px] w-[280px] rounded-full bg-orange-100/60 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Top */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#a31414]">
              Luxury Hampers
            </p>

            <h2 className="mt-5 font-serif text-5xl font-black leading-tight text-black md:text-6xl">
              Curated Gifting
              <br />
              Experiences
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
              Explore premium self-care, coffee, wellness, and pet hampers
              designed to elevate gifting experiences.
            </p>
          </div>

          {/* CTA */}
          <Link
            href="/hampers"
            className="inline-flex items-center gap-2 rounded-2xl bg-[#b11212] px-8 py-5 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#921010]"
          >
            Explore Hampers
            <ArrowUpRight size={18} />
          </Link>
        </div>

        {/* Cards */}
        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {featured.map((hamper) => (
            <div
              key={hamper.id}
              className="group overflow-hidden rounded-[2.5rem] border border-[#e8dfd5] bg-white/70 shadow-[0_10px_40px_rgba(0,0,0,0.04)] backdrop-blur-xl transition duration-500 hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(177,18,18,0.12)]"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={hamper.image}
                  alt={hamper.title}
                  className="h-[380px] w-full object-cover transition duration-700 group-hover:scale-110"
                />

                {/* Category */}
                <div className="absolute left-5 top-5 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#b11212] backdrop-blur">
                  {hamper.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-3xl font-bold leading-tight text-black">
                    {hamper.title}
                  </h3>

                  <ArrowUpRight className="mt-1 text-[#b11212]" />
                </div>

                <p className="mt-5 text-base leading-7 text-neutral-600">
                  {hamper.description}
                </p>

                {/* Bottom */}
                <div className="mt-8 flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.18em] text-neutral-500">
                      Starting From
                    </p>

                    <h4 className="mt-2 text-4xl font-black text-[#b11212]">
                      ₹{hamper.price}
                    </h4>
                  </div>

                  <Link
                    href={`/hampers/${hamper.slug}`}
                    className="flex items-center gap-2 rounded-2xl bg-[#b11212] px-5 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#921010]"
                  >
                    View
                    <ShoppingBag size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/hampers"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#b11212]"
          >
            View Complete Collection
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}