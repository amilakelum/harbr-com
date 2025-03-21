import screenshot from "../assets/Screenshot-25.png";
import Reveal from "./animations/Reveal";
import { motion } from "motion/react";

export default function IntroVideo() {
  return (
    <Reveal
      delay={0.4}
      className="container mx-auto px-4 sm:px-20 overflow-hidden"
    >
      <div className="p-2 sm:p-4 bg-gradient-to-br from-zinc-50 to-zinc-100 rounded-2xl sm:rounded-3xl shadow-lg">
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
          className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-zinc-200/80"
        >
          <div className="absolute inset-0 pointer-events-none shadow-inner"></div>
          <img 
            src={screenshot}
            alt="Harbr Platform Screenshot"
            className="w-full object-cover shadow-xl"
            style={{ 
              boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 5px 15px -5px rgba(0, 0, 0, 0.05)",
            }}
          />
          <div className="absolute inset-0 rounded-xl sm:rounded-2xl shadow-[inset_0_0_0_1px_rgba(83,113,255,0.05)]"></div>
        </motion.div>
      </div>
    </Reveal>
  );
}
