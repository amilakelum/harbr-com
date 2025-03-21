import Reveal from "./animations/Reveal";
import { Ripple } from "./animations/Ripple";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

export default function CalloutTwo() {
  return (
    <div className="relative isolate px-6 lg:px-8 bg-radial from-stone-950 from-10%  to-zinc-950 mt-16 sm:mt-24 py-16 sm:py-24 overflow-hidden">
      <Ripple />
      <div className="mx-auto max-w-3xl">
        <Reveal delay={0.1} className="text-center">
          <motion.h1 
            className="mx-auto max-w-2xl text-center text-4xl font-semibold text-pretty text-white sm:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            The future of marina bookings
          </motion.h1>
          <motion.p 
            className="mx-auto mt-8 max-w-xl text-pretty text-white sm:text-xl/7"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Join thousands of members already booking online at your marina.
          </motion.p>
        </Reveal>

        <Reveal
          delay={0.25}
          className="mt-10 flex items-center justify-center gap-x-6"
        >
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(83, 113, 255, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <Link
              to="/start"
              className="rounded-2xl bg-[#5371FF] px-6 py-3 text-base font-semibold text-white shadow-xs hover:bg-[#4460E6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5371FF] hover:scale-[1.02] transition-all duration-200 ease-in-out"
            >
              Book Now
            </Link>
          </motion.div>
        </Reveal>
      </div>
    </div>
  );
}
