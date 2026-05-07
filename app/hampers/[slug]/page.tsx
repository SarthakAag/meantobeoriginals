import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

import { hampers } from "../data";

import {
  ShoppingBag,
  Truck,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";

import Link from "next/link";

type Props = {
  params: {
    slug: string;
  };
};

export default function HamperDetailPage({
  params,
}: Props) {
  const hamper = hampers.find(
    (item) => item.slug === params.slug
  );

  if (!hamper) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f4ee]">
        <h1 className="text-3xl font-bold">
          Hamper Not Found
        </h1>
      </main>
    );
  }

  return (
    <main className="bg-[#f8f4ee] text-black">
      <Navbar />

      <section className="px-6 pb-24 pt-40 lg:px-12">
        <div className="mx-auto max-w-7xl">
          {/* Back */}
          <Link
            href="/hampers"
            className="mb-10 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#b11212]"
          >
            <ArrowLeft size={18} />
            Back To Hampers
          </Link>

          {/* Layout */}
          <div className="grid gap-16 lg:grid-cols-2">
            {/* LEFT IMAGE */}
            <div className="relative">
              <div className="overflow-hidden rounded-[3rem] border border-[#e7ddd2] bg-white/70 shadow-[0_20px_80px_rgba(0,0,0,0.06)]">
                <img
                  src={hamper.image}
                  alt={hamper.title}
                  className="h-[700px] w-full object-cover"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute bottom-8 left-8 rounded-2xl bg-white/80 px-6 py-4 shadow-xl backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.18em] text-neutral-500">
                  Premium Collection
                </p>

                <h3 className="mt-2 text-2xl font-black text-[#b11212]">
                  {hamper.category}
                </h3>
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="flex flex-col justify-center">
              {/* Category */}
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#a31414]">
                {hamper.category}
              </p>

              {/* Title */}
              <h1 className="mt-5 font-serif text-6xl font-black leading-[1] text-black">
                {hamper.title}
              </h1>

              {/* Description */}
              <p className="mt-8 max-w-xl text-lg leading-8 text-neutral-600">
                {hamper.description}
              </p>

              {/* Price */}
              <div className="mt-10">
                <p className="text-sm uppercase tracking-[0.18em] text-neutral-500">
                  Price
                </p>

                <h2 className="mt-2 text-6xl font-black text-[#b11212]">
                  ₹{hamper.price}
                </h2>
              </div>

              {/* Features */}
              <div className="mt-12 grid gap-5">
                <div className="flex items-center gap-4 rounded-2xl border border-[#e7ddd2] bg-white/70 p-5">
                  <Truck className="text-[#b11212]" />

                  <div>
                    <h4 className="font-bold text-black">
                      Free Shipping
                    </h4>

                    <p className="text-neutral-600">
                      Premium delivery across India
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-[#e7ddd2] bg-white/70 p-5">
                  <ShieldCheck className="text-[#b11212]" />

                  <div>
                    <h4 className="font-bold text-black">
                      Secure Packaging
                    </h4>

                    <p className="text-neutral-600">
                      Carefully packed for gifting
                    </p>
                  </div>
                </div>
              </div>

              {/* Includes */}
              <div className="mt-12 rounded-[2rem] border border-[#e7ddd2] bg-white/70 p-8">
                <p className="text-sm uppercase tracking-[0.18em] text-neutral-500">
                  What's Included
                </p>

                <div className="mt-6 grid gap-4 text-lg text-neutral-700">
                  <div>✓ Premium curated products</div>
                  <div>✓ Elegant gift packaging</div>
                  <div>✓ Personalized message card</div>
                  <div>✓ Luxury presentation box</div>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-12 flex flex-col gap-4 sm:flex-row">
                <button className="flex items-center justify-center gap-2 rounded-2xl bg-[#b11212] px-8 py-5 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#921010]">
                  Add To Cart
                  <ShoppingBag size={18} />
                </button>

                <button className="rounded-2xl border border-[#ddd2c7] bg-white/70 px-8 py-5 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-white">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}