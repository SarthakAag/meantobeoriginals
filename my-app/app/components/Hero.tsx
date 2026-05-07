import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 pt-36 lg:px-12">
      {/* Background Gradients */}
      <div className="absolute right-[-180px] top-[80px] h-[520px] w-[520px] rounded-full bg-red-100 blur-3xl" />

      <div className="absolute bottom-[-200px] left-[-100px] h-[420px] w-[420px] rounded-full bg-orange-100/70 blur-3xl" />

      <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/30 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-20 lg:grid-cols-2">
        {/* LEFT */}
        <div>
          {/* Label */}
          <div className="mb-8 flex items-center gap-4">
            <div className="h-[2px] w-14 bg-[#b11212]" />

            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#a31414]">
              Bringing The Good Out
            </p>
          </div>

          {/* Heading */}
          <h1 className="max-w-3xl font-serif text-6xl font-black leading-[0.92] tracking-tight text-black md:text-7xl xl:text-8xl">
            Enhancing
            <br />
            Your Business
            <br />
            Growth
          </h1>

          {/* Description */}
          <p className="mt-10 max-w-xl text-lg leading-8 text-neutral-600">
            We build high-converting brands, campaigns, and digital experiences
            that generate leads, increase conversions, and scale your business.
          </p>

          {/* Tags */}
          <div className="mt-10 flex flex-wrap gap-3">
            {[
              "Branding",
              "Leads",
              "Conversions",
              "Growth",
              "Web Dev",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#d8cfc4] bg-white/70 px-5 py-2 text-sm font-medium text-neutral-700 shadow-sm backdrop-blur"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <button className="flex items-center justify-center gap-2 rounded-2xl bg-[#b11212] px-8 py-5 text-sm font-semibold uppercase tracking-[0.18em] text-white transition duration-300 hover:scale-[1.02] hover:bg-[#921010]">
              See Our Work
              <ArrowUpRight size={18} />
            </button>

            <button className="rounded-2xl border border-[#d8cfc4] bg-white/60 px-8 py-5 text-sm font-semibold uppercase tracking-[0.18em] text-black backdrop-blur transition hover:bg-white">
              Book Strategy Call
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative hidden lg:flex">
          {/* Main Card */}
          <div className="relative ml-auto w-full max-w-[520px] rounded-[2.5rem] border border-white/50 bg-white/60 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl">
            {/* Top */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">
                  Growth Report
                </p>

                <h3 className="mt-2 text-3xl font-bold text-black">
                  5.7X ROAS
                </h3>
              </div>

              <div className="rounded-2xl bg-[#b11212] px-4 py-3 text-sm font-semibold text-white">
                +38%
              </div>
            </div>

            {/* Bars */}
            <div className="mt-10 space-y-4">
              <div className="h-3 w-[70%] rounded-full bg-[#eadfd5]" />
              <div className="h-3 w-[85%] rounded-full bg-[#d89b9b]" />
              <div className="h-3 w-[95%] rounded-full bg-[#b11212]" />
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 gap-5">
              <div className="rounded-2xl bg-[#faf7f2] p-5">
                <p className="text-sm text-neutral-500">Impressions</p>

                <h4 className="mt-2 text-3xl font-bold">2.8M+</h4>
              </div>

              <div className="rounded-2xl bg-[#faf7f2] p-5">
                <p className="text-sm text-neutral-500">Cost / Lead</p>

                <h4 className="mt-2 text-3xl font-bold">₹145</h4>
              </div>
            </div>
          </div>

          {/* Floating Card */}
          <div className="absolute -bottom-10 -left-10 rounded-[2rem] border border-white/60 bg-white/70 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
              New Followers
            </p>

            <h3 className="mt-3 text-4xl font-black text-[#b11212]">
              12K+
            </h3>

            <p className="mt-2 text-sm text-neutral-500">
              Instagram & Facebook
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}