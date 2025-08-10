import { BotMessageSquare, CheckCircle, XCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

// Pulsing Circle component that emits and fades away
const PulsingCircles = () => {
  return (
    <>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-zinc-100"
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{
            opacity: 0,
            scale: 1.7,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 1,
            ease: "easeOut",
          }}
          style={{
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </>
  );
};

// Animated label that changes from cancelled to refilled
const AnimatedLabel = ({ lineIndex }) => {
  const [labelState, setLabelState] = useState("cancelled");
  const verticalOffset = (lineIndex - 1) * 10; // -10, 0, or 10 based on line

  useEffect(() => {
    // Change label state when it reaches the middle
    const timer = setTimeout(() => {
      setLabelState("refilled");
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className={`absolute top-1/2 left-0 flex items-center justify-center shadow-lg bg-white text-xs font-bold px-3 py-1 rounded-md ${
        labelState === "cancelled" ? "text-red-600" : "text-green-600"
      }`}
      initial={{
        x: -50,
        y: verticalOffset - 12, // Center on the line with adjustment for label height
        opacity: 0,
      }}
      animate={{
        x: "100%",
        // x: labelState === "cancelled" ? 115 : 150,
        y: verticalOffset - 12,
        opacity: 1,
      }}
      transition={{
        duration: 3,
        ease: "linear",
      }}
    >
      <span className="flex items-center gap-1">
        {labelState === "cancelled" ? (
          <>
            <XCircle size={14} />
            CANCELLED
          </>
        ) : (
          <>
            <CheckCircle size={14} />
            REFILLED
          </>
        )}
      </span>
    </motion.div>
  );
};

export default function AnimatedFlow() {
  const [showAnimatedLabel, setShowAnimatedLabel] = useState(false);
  const [activeLine, setActiveLine] = useState(1); // 0, 1, or 2 for the three lines

  // Start animation periodically
  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveLine(Math.floor(Math.random() * 3)); // Choose random line (0, 1, or 2)
      setShowAnimatedLabel(true);

      // Reset after animation completes
      setTimeout(() => {
        setShowAnimatedLabel(false);
      }, 3500); // Slightly longer than the animation duration
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full flex items-center justify-center [mask-image:radial-gradient(white,transparent)] my-16">
      <div className="relative w-96 h-96">
        {/* Horizontal lines */}
        <div className="absolute top-1/2 -translate-y-10 left-0 w-full origin-left border-dashed border-t border-zinc-200" />
        <div className="absolute top-1/2 left-0 w-full origin-left border-dashed border-t border-zinc-200" />
        <div className="absolute top-1/2 translate-y-10 left-0 w-full origin-left border-dashed border-t border-zinc-200" />

        {/* Pulsing circles animation */}
        <PulsingCircles />

        {/* Animated label */}
        <AnimatePresence>
          {showAnimatedLabel && <AnimatedLabel lineIndex={activeLine} />}
        </AnimatePresence>

        {/* Center circle */}
        <div className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white backdrop-blur-sm rounded-full shadow-xl border border-zinc-100 flex flex-col items-center justify-center z-10">
          <BotMessageSquare className="stroke-zinc-600" size={32} />
        </div>
      </div>
    </div>
  );
}
