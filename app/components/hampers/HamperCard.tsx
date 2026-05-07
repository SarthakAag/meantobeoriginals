import Link from "next/link";
import { ArrowUpRight, ShoppingBag } from "lucide-react";

type HamperCardProps = {
  hamper: {
    slug: string;
    title: string;
    category: string;
    description: string;
    image: string;
    price: number;
  };
};

export default function HamperCard({
  hamper,
}: HamperCardProps) {
  return (
    <div className="group overflow-hidden rounded-[2rem] border border-[#e7ddd2] bg-white/70 shadow-[0_10px_40px_rgba(0,0,0,0.04)] backdrop-blur-xl transition duration-500 hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(177,18,18,0.12)]">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={hamper.image}
          alt={hamper.title}
          className="h-[320px] w-full object-cover transition duration-700 group-hover:scale-110"
        />

        <div className="absolute left-5 top-5 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#b11212] backdrop-blur">
          {hamper.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-7">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-2xl font-bold text-black">
            {hamper.title}
          </h3>

          <ArrowUpRight className="mt-1 text-[#b11212]" />
        </div>

        <p className="mt-4 text-base leading-7 text-neutral-600">
          {hamper.description}
        </p>

        {/* Bottom */}
        <div className="mt-8 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-neutral-500">
              Starting From
            </p>

            <h4 className="mt-1 text-3xl font-black text-[#b11212]">
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
  );
}