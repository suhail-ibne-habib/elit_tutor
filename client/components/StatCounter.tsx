"use client";

import { useEffect, useState } from "react";

type StatCounterProps = {
  value: number;
  suffix?: string;
  prefix?: string;
};

export default function StatCounter({ value, suffix = "", prefix = "" }: StatCounterProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let next = 0;
    const step = Math.max(1, Math.ceil(value / 60));
    let frame = 0;

    const tick = () => {
      next = Math.min(value, next + step);
      setCurrent(next);
      if (next < value) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return (
    <strong>
      {prefix}
      {current.toLocaleString()}
      {suffix}
    </strong>
  );
}
