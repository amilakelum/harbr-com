import Reveal from "./animations/Reveal";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function FreeTrial() {
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="text-center">
            <Reveal delay={0.1}>
              <motion.h2
                className="text-[46px] leading-[1.1] tracking-[-0.02em] font-normal mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                Free for 30 days
              </motion.h2>
            </Reveal>

            <Reveal delay={0.2}>
              <motion.p
                className="text-pretty text-zinc-600 text-base font-normal sm:text-lg/8 max-w-3xl mx-auto mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              >
                Create an account to get full access to Harbr. You'll only be
                charged should you choose not to cancel your subscription after
                30 days.
              </motion.p>
            </Reveal>

            <Reveal delay={0.3}>
              <Link to="/free-trial">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center rounded-xl bg-black px-8 py-4 text-base font-semibold text-white shadow-md hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black transition-all duration-200 ease-in-out cursor-pointer"
                >
                  Try Harbr for free
                </motion.button>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
