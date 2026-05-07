"use client";

import { useEffect, useRef, useState } from "react";

type AnimatedStatProps = {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
};

export default function AnimatedStat({
  value,
  duration = 1800,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}: AnimatedStatProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          let start = 0;

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
        }
      },
      {
        threshold: 0.4,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  const formattedNumber =
    value >= 1000
      ? Math.floor(count).toLocaleString()
      : count.toFixed(decimals);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formattedNumber}
      {suffix}
    </span>
  );
}