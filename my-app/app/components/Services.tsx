import {
  Megaphone,
  Users,
  BarChart3,
  Rocket,
  MonitorSmartphone,
  ArrowUpRight,
} from "lucide-react";

const services = [
  {
    icon: Megaphone,
    title: "Branding",
    description:
      "Build a memorable identity that creates trust, authority, and long-term recognition.",
  },
  {
    icon: Users,
    title: "Lead Generation",
    description:
      "Attract high-intent customers with targeted campaigns designed to scale consistently.",
  },
  {
    icon: BarChart3,
    title: "Conversions",
    description:
      "Turn clicks into paying customers through optimized funnels and smart user journeys.",
  },
  {
    icon: Rocket,
    title: "Growth Strategy",
    description:
      "Data-backed systems and marketing frameworks that compound your business growth.",
  },
  {
    icon: MonitorSmartphone,
    title: "Web Development",
    description:
      "High-converting websites and landing pages built for performance and user experience.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden px-6 py-28 lg:px-12"
    >
      {/* Background */}
      <div className="absolute left-[-150px] top-[100px] h-[300px] w-[300px] rounded-full bg-red-100/60 blur-3xl" />

      <div className="absolute bottom-[-150px] right-[-100px] h-[320px] w-[320px] rounded-full bg-orange-100/70 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Heading */}
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#a31414]">
            What We Do
          </p>

          <h2 className="mt-6 font-serif text-5xl font-black leading-tight text-black md:text-6xl">
            Five Pillars
            <br />
            of Growth
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
            We combine strategy, design, performance marketing, and technology
            to create scalable digital growth systems.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-[2rem] border border-[#e8dfd5] bg-white/70 p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(177,18,18,0.15)]"
              >
                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-red-50/0 to-red-50 opacity-0 transition duration-500 group-hover:opacity-100" />

                {/* Top Icon */}
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#b11212] text-white shadow-lg transition duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <Icon size={30} strokeWidth={2} />
                </div>

                {/* Content */}
                <div className="relative z-10 mt-8">
                  <h3 className="text-2xl font-bold text-black">
                    {service.title}
                  </h3>

                  <p className="mt-5 text-base leading-7 text-neutral-600">
                    {service.description}
                  </p>
                </div>

                {/* Bottom Link */}
                <div className="relative z-10 mt-10 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-[#a31414] opacity-0 transition duration-500 group-hover:opacity-100">
                  Learn More
                  <ArrowUpRight size={16} />
                </div>

                {/* Border Glow */}
                <div className="absolute inset-0 rounded-[2rem] border border-transparent transition duration-500 group-hover:border-red-200" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}