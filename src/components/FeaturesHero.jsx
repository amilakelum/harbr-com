import { motion } from "framer-motion";
import Reveal from "./animations/Reveal";

export default function FeaturesHero() {
  return (
    <div className="bg-gradient-to-br from-white to-zinc-50">
      <div className="relative isolate px-6 pt-14 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <Reveal delay={0.1}>
              <h1 className="text-[46px] leading-[1.1] tracking-[-0.02em] font-normal mb-8">
                Features
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 text-pretty text-zinc-600 text-base font-normal sm:text-lg/8 mb-10 max-w-3xl mx-auto">
                Harbr's end to end marina management software has everything you
                need to elevate your marina operations, impress your customers
                and grow revenue beyond berth/slip rates. We have also
                meticulously incorporated AI where possible to streamline your
                operations.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className="inline-flex items-center justify-center rounded-xl bg-black px-8 py-3.5 text-base font-semibold text-white shadow-md hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black transition-all duration-200 ease-in-out h-[52px] cursor-pointer"
                  onClick={() => {
                    // You can add navigation or modal logic here
                    window.open(
                      "mailto:chris@harbrapp.com?subject=Try%20Harbr%20for%20Free",
                      "_blank"
                    );
                  }}
                >
                  Try Harbr for free
                </motion.button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
