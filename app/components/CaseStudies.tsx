"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const caseStudies = [
  {
    category: "Fashion",
    title: "Boutique & Fashion Brand",
    description:
      "End-to-end social commerce campaign for an independent fashion label with aggressive scaling strategies.",
    stats: [
      { label: "Impressions", value: 2.8, suffix: "M+" },
      { label: "ROAS", value: 5.7, suffix: "X" },
      { label: "Revenue Growth", value: 38, suffix: "%" },
    ],
  },
  {
    category: "Restaurant",
    title: "Restaurant Brand Growth",
    description:
      "Multi-city restaurant campaign combining social media, paid ads, and local targeting strategies.",
    stats: [
      { label: "Reach", value: 3.2, suffix: "M+" },
      { label: "Leads", value: 4500, suffix: "+" },
      { label: "ROI", value: 4.5, suffix: "X" },
    ],
  },
  {
    category: "Real Estate",
    title: "Luxury Real Estate Campaign",
    description:
      "High-intent lead generation funnels for premium residential and luxury real estate projects.",
    stats: [
      { label: "Qualified Leads", value: 1200, suffix: "+" },
      { label: "Cost / Lead", value: 180, prefix: "₹" },
      { label: "ROI", value: 5.2, suffix: "X" },
    ],
  },
  {
    category: "Education",
    title: "Education Enrollment Campaign",
    description:
      "Student acquisition strategy focused on enrollments, remarketing, and scalable ad performance.",
    stats: [
      { label: "Enrollments", value: 320, suffix: "+" },
      { label: "Cost / Lead", value: 90, prefix: "₹" },
      { label: "ROI", value: 3.8, suffix: "X" },
    ],
  },
];

function Counter({
  value,
  suffix = "",
  prefix = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;

    const duration = 1500;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;

      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {prefix}
      {value >= 1000
        ? Math.floor(count).toLocaleString()
        : count.toFixed(value % 1 !== 0 ? 1 : 0)}
      {suffix}
    </span>
  );
}

export default function CaseStudies() {
  const [activeTab, setActiveTab] = useState(0);

  const activeCase = useMemo(
    () => caseStudies[activeTab],
    [activeTab]
  );

  return (
    <section
      id="cases"
      className="relative overflow-hidden px-6 py-28 lg:px-12"
    >
      {/* Background */}
      <div className="absolute right-[-120px] top-[120px] h-[300px] w-[300px] rounded-full bg-red-100/70 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Heading */}
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#a31414]">
            Case Studies
          </p>

          <h2 className="mt-6 font-serif text-5xl font-black leading-tight text-black md:text-6xl">
            Proven Results
            <br />
            Across Industries
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
            Performance-driven campaigns engineered to generate measurable
            business growth.
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-4">
          {caseStudies.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`rounded-2xl px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition-all duration-300 ${
                activeTab === index
                  ? "bg-[#b11212] text-white shadow-lg"
                  : "border border-[#ddd2c7] bg-white/70 text-neutral-700 hover:bg-white"
              }`}
            >
              {item.category}
            </button>
          ))}
        </div>

        {/* Content Card */}
        <div className="mt-16 overflow-hidden rounded-[3rem] border border-[#e6ddd2] bg-white/70 shadow-[0_20px_80px_rgba(0,0,0,0.05)] backdrop-blur-xl">
          <div className="grid gap-0 lg:grid-cols-2">
            {/* LEFT */}
            <div className="relative overflow-hidden bg-[#b11212] p-10 text-white md:p-14">
              {/* Glow */}
              <div className="absolute right-[-100px] top-[-100px] h-[240px] w-[240px] rounded-full bg-red-400/30 blur-3xl" />

              <div className="relative z-10">
                <p className="text-sm uppercase tracking-[0.3em] text-red-100">
                  Featured Campaign
                </p>

                <h3 className="mt-6 font-serif text-5xl font-black leading-tight">
                  {activeCase.title}
                </h3>

                <p className="mt-8 max-w-lg text-lg leading-8 text-red-50/90">
                  {activeCase.description}
                </p>

                <button className="mt-10 flex items-center gap-2 rounded-2xl bg-white px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#b11212] transition hover:scale-[1.03]">
                  View Full Case Study
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col justify-center bg-[#fcfaf7] p-10 md:p-14">
              <div className="grid gap-6 sm:grid-cols-3">
                {activeCase.stats.map((stat, index) => (
                  <div
                    key={index}
                    className="rounded-[2rem] border border-[#e8dfd5] bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                  >
                    <p className="text-sm uppercase tracking-[0.18em] text-neutral-500">
                      {stat.label}
                    </p>

                    <h4 className="mt-5 text-5xl font-black leading-none text-[#b11212]">
                      <Counter
                        value={stat.value}
                        suffix={stat.suffix}
                        prefix={stat.prefix}
                      />
                    </h4>
                  </div>
                ))}
              </div>

              {/* Bottom */}
              <div className="mt-12 rounded-[2rem] border border-[#ebe2d8] bg-white p-8">
                <p className="text-sm uppercase tracking-[0.18em] text-neutral-500">
                  Results Delivered
                </p>

                <div className="mt-6 grid gap-4 text-lg text-neutral-700">
                  <div>✓ Fully managed paid campaigns</div>
                  <div>✓ Audience targeting & retargeting</div>
                  <div>✓ Weekly performance optimization</div>
                  <div>✓ Creative strategy & ad scaling</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}