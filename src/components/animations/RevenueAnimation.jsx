import NumberFlow from "@number-flow/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export default function RevenueAnimation() {
  const [revenue, setRevenue] = useState(45562);
  const [refilled, setRefilled] = useState(6339);
  const [_isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const startAnimation = async () => {
      // Random interval between 2-6 seconds
      const timeout = Math.floor(Math.random() * 4000) + 2000;

      timeoutRef.current = setTimeout(() => {
        setIsAnimating(true);
        if (revenue > 100000) {
          setRevenue(45562);
          setRefilled(5562);
        }
        // Update revenue with random increment
        const increment = Math.floor(Math.random() * 1000) + 100;
        setRevenue((prev) => (prev > 90000 ? 45562 : prev + increment));
        setRefilled((prev) =>
          prev > 50000 ? 5562 : prev + Math.floor(increment * 0.3),
        );

        setIsAnimating(false);

        // Restart the animation cycle
        startAnimation();
      }, timeout);
    };

    startAnimation();

    return () => {
      // Clean up the timeout when component unmounts
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="h-56 relative m-4 p-4 bg-white rounded-lg fancy-shadow border border-zinc-100 flex flex-col gap-4">
      <span class="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 flex size-4 opacity-80">
        <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
        <span class="relative inline-flex size-4 rounded-full bg-sky-500"></span>
      </span>
      <div className="flex flex-col gap-1 z-2">
        <div className="flex gap-2 items-center text-base text-zinc-600">
          <span className="block rounded-full size-2 bg-zinc-300" />
          <span>Net Revenue</span>
        </div>
        <NumberFlow
          value={revenue}
          trend={0}
          format={{
            notation: "standard",
            trailingZeroDisplay: "stripIfInteger",
          }}
          prefix="$"
          className="text-3xl font-medium -tracking-[0.64px] text-zinc-900"
        />
      </div>
      <div className="flex flex-col gap-1 z-2">
        <div className="text-base text-zinc-400"></div>
        <div className="flex gap-2 items-center text-base text-zinc-600">
          <span className="block rounded-full size-2 bg-emerald-300" />
          <span>Refilled</span>
        </div>
        <NumberFlow
          value={refilled}
          trend={1}
          format={{
            notation: "standard",
            trailingZeroDisplay: "stripIfInteger",
          }}
          prefix="$"
          className="text-3xl font-medium -tracking-[0.64px] text-zinc-900"
        />
      </div>
      <div className="absolute z-1 top-0 left-0 w-full h-full overflow-hidden bg-transparent">
        <div className="bg-chart"></div>
      </div>
    </div>
  );
}
