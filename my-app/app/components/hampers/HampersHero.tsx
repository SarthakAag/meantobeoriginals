export default function HampersHero() {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-40 lg:px-12">
      {/* Background */}
      <div className="absolute right-[-150px] top-[80px] h-[420px] w-[420px] rounded-full bg-red-100 blur-3xl" />

      <div className="absolute bottom-[-120px] left-[-120px] h-[320px] w-[320px] rounded-full bg-orange-100/70 blur-3xl" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-20 lg:grid-cols-2">
        {/* Left */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#a31414]">
            Luxury Gifting
          </p>

          <h1 className="mt-6 font-serif text-6xl font-black leading-[0.95] text-black md:text-8xl">
            Curated
            <br />
            Hampers
            <br />
            Designed To
            <br />
            Delight
          </h1>

          <p className="mt-10 max-w-xl text-lg leading-8 text-neutral-600">
            Self-care, coffee, wellness, and pet hampers crafted with premium
            products and elegant presentation.
          </p>

          <button className="mt-10 rounded-2xl bg-[#b11212] px-8 py-5 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#921010]">
            Shop Collection
          </button>
        </div>

        {/* Right */}
        <div className="relative">
          <div className="overflow-hidden rounded-[3rem] border border-white/50 bg-white/50 shadow-[0_20px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl">
            <img
              src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0"
              alt="Luxury Hamper"
              className="h-[700px] w-full object-cover"
            />
          </div>

          {/* Floating Card */}
          <div className="absolute -bottom-10 -left-10 rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.18em] text-neutral-500">
              Premium Collections
            </p>

            <h3 className="mt-3 text-4xl font-black text-[#b11212]">
              50+
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}