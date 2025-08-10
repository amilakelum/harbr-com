import Reveal from "./animations/Reveal";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Charity() {
  return (
    <div className="relative isolate px-6 py-16 lg:px-8 bg-gradient-to-br from-zinc-100 to-zinc-200">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2 lg:items-center">
          {/* Left side - Content */}
          <Reveal delay={0.4}>
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="/Charity.jpg"
                alt="Charitable Donations"
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>

          {/* Right side - Image */}
          <Reveal delay={0.25}>
            <div className="text-left lg:pr-8">
              <h2 className="text-[46px] leading-[1.1] tracking-[-0.02em] font-normal mb-8">
                1% of all Harbr's subscriptions are donated to charity.
              </h2>
              <p className="text-pretty text-zinc-600 text-base font-normal sm:text-lg/8 mb-8">
                We believe its important to improve the world around us where
                possible. By donating at least 1% of all subscriptions to
                carefully selected charities, we ensure that by choosing Harbr
                you’re also doing your bit. Together we can make a difference in
                the environment that we as marine enthusiasts all enjoy.
              </p>

              {/* <Link to="/charity">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center rounded-xl bg-black px-8 py-4 text-base font-semibold text-white shadow-md hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black transition-all duration-200 ease-in-out cursor-pointer"
                >
                  Find out about our charitable donations
                </motion.button>
              </Link> */}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
