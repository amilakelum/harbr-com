import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

export default function Reveal({
  children,
  duration = 0.4,
  delay = 0,
  slideY = 20,
  once = true,
  ...props
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    margin: "0px 0px -100px 0px", // Start animation slightly before element comes into view
    amount: 0.2, // Only need 20% of element to be visible to trigger
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: slideY }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: duration, 
          ease: "easeOut", 
          delay,
        },
      } : { opacity: 0, y: slideY }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
