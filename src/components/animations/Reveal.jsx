import { motion } from "motion/react";

export default function Reveal({
  children,
  duration = 0.4,
  delay = 0,
  slideY = 20,
  once = true,
  ...props
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: slideY }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: duration, ease: "easeOut", delay },
      }}
      viewport={{ once }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
