import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Reveal({
  children,
  duration = 0.2, // Reduced from 0.4
  delay = 0,
  slideY = 10, // Reduced from 20 for less movement
  once = true,
  ...props
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    margin: "0px 0px -50px 0px", // Less aggressive margin
    amount: 0.1, // Reduced threshold
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: slideY }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              transition: {
                duration: duration,
                ease: "easeOut",
                delay,
              },
            }
          : { opacity: 0, y: slideY }
      }
      style={{ willChange: "opacity, transform" }} // Optimize for animations
      {...props}
    >
      {children}
    </motion.div>
  );
}
