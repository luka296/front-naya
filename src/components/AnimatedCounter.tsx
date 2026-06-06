"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  className?: string;
  duration?: number;
}

export function AnimatedCounter({ value, className = "", duration = 2 }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    // Parse the value to extract number and suffix
    const match = value.match(/^([\d.]+)([A-Z%+]*)?$/i);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const num = parseFloat(match[1]);
    const suffix = match[2] || "";
    const isDecimal = match[1].includes(".");

    let currentValue = 0;
    const increment = num / (duration * 60); // Assuming 60fps
    const startTime = Date.now();

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);

      currentValue = num * progress;

      if (isDecimal) {
        setDisplayValue(`${currentValue.toFixed(1)}${suffix}`);
      } else {
        setDisplayValue(`${Math.round(currentValue)}${suffix}`);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    animate();
  }, [isInView, value, duration]);

  return (
    <div ref={ref} className={className}>
      {displayValue}
    </div>
  );
}
