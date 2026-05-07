import { hampers } from "@/app/hampers/data";
import HamperCard from "./HamperCard";

export default function HampersGrid() {
  return (
    <section className="px-6 pb-28 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-14">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#a31414]">
            Curated Collections
          </p>

          <h2 className="mt-5 font-serif text-5xl font-black leading-tight text-black">
            Premium Hampers
          </h2>
        </div>

        {/* Grid */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {hampers.map((hamper) => (
            <HamperCard
              key={hamper.id}
              hamper={hamper}
            />
          ))}
        </div>
      </div>
    </section>
  );
}