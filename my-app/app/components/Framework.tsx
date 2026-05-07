"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Sparkles,
  RefreshCcw,
  Layers3,
} from "lucide-react";

const frameworkItems = [
  {
    icon: BarChart3,
    title: "Data-Driven Campaigns",
    description:
      "Every decision is backed by analytics, A/B testing, audience behavior, and measurable performance insights.",
  },
  {
    icon: Sparkles,
    title: "Creative + Performance",
    description:
      "We combine compelling visuals with precise targeting strategies to maximize engagement and conversions.",
  },
  {
    icon: RefreshCcw,
    title: "Consistent Optimization",
    description:
      "Weekly reviews and real-time campaign optimization ensure performance keeps improving over time.",
  },
  {
    icon: Layers3,
    title: "Scalable Systems",
    description:
      "Growth frameworks designed to scale your business from your first leads to massive reach and revenue.",
  },
];

const stats = [
  { value: "5.7X", label: "Average ROAS" },
  { value: "12K+", label: "Audience Growth" },
  { value: "320+", label: "Enrollments" },
  { value: "3.2M+", label: "Campaign Reach" },
];

export default function Framework() {
  return (
    <section
      id="framework"
      className="relative overflow-hidden px-6 py-28 lg:px-12"
    >
      {/* Background */}
      <div className="absolute left-[-120px] top-[100px] h-[300px] w-[300px] rounded-full bg-red-100/60 blur-3xl" />

      <div className="absolute bottom-[-120px] right-[-80px] h-[280px] w-[280px] rounded-full bg-orange-100/60 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#a31414]">
            Why This Works
          </p>

          <h2 className="mt-6 font-serif text-5xl font-black leading-tight text-black md:text-6xl">
            Our Proven
            <br />
            Growth Framework
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
            A refined blend of strategy, creativity, and performance systems
            designed to scale modern brands effectively.
          </p>
        </motion.div>

        {/* Framework Cards */}
        <div className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {frameworkItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.12,
                }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-[2.2rem] border border-[#e8dfd5] bg-white/70 p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] backdrop-blur-xl transition duration-500 hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(177,18,18,0.12)]"
              >
                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-red-50/0 to-red-50 opacity-0 transition duration-500 group-hover:opacity-100" />

                {/* Icon */}
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#b11212] text-white shadow-lg transition duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <Icon size={30} strokeWidth={2} />
                </div>

                {/* Text */}
                <div className="relative z-10 mt-8">
                  <h3 className="text-2xl font-bold leading-tight text-black">
                    {item.title}
                  </h3>

                  <p className="mt-5 text-base leading-7 text-neutral-600">
                    {item.description}
                  </p>
                </div>

                {/* Border Glow */}
                <div className="absolute inset-0 rounded-[2.2rem] border border-transparent transition duration-500 group-hover:border-red-200" />
              </motion.div>
            );
          })}
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 overflow-hidden rounded-[2.8rem] border border-[#e7ddd3] bg-white/70 shadow-[0_20px_80px_rgba(0,0,0,0.05)] backdrop-blur-xl"
        >
          <div className="grid gap-0 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`relative p-10 text-center ${
                  index !== stats.length - 1
                    ? "border-b border-[#eee5db] md:border-b-0 md:border-r"
                    : ""
                }`}
              >
                {/* Small Glow */}
                <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-50 blur-2xl" />

                <div className="relative z-10">
                  <h3 className="text-5xl font-black text-[#b11212]">
                    {stat.value}
                  </h3>

                  <p className="mt-4 text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}