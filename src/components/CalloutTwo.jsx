import Reveal from "./animations/Reveal";
import { motion } from "framer-motion";
import marinaSoftwareImage from "../assets/best_software.png";
import EmailSubscriptionForm from "./EmailSubscriptionForm";

export default function CalloutTwo() {
  return (
    <div className="relative isolate px-6 lg:px-8 bg-[#FFFDE1] py-16 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="flex justify-center md:justify-start order-1 md:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative w-full max-w-md"
            >
              <img
                src={marinaSoftwareImage}
                alt="Marina Software 3D Illustration"
                className="w-full h-auto object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/500x500?text=Marina+Software";
                }}
              />
            </motion.div>
          </div>

          <div className="max-w-xl order-2 md:order-2">
            <Reveal delay={0.1}>
              <motion.h1
                className="text-[46px] leading-[1.1] tracking-[-0.02em] font-normal"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                The best marina software in the world, at an (almost)
                unbelievable value
              </motion.h1>
              <motion.p
                className="mt-8 text-pretty text-zinc-600 text-base font-normal sm:text-lg/8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                You don't have to spend a fortune to run a world-class marina.
                Replace PacSoft, Dockwa, Dockmaster, and more with Harbr to cut
                costs and get better results for your marina operations.
              </motion.p>
            </Reveal>

            <Reveal delay={0.25} className="mt-10">
              <div className="max-w-lg">
                <EmailSubscriptionForm
                  source="free_trial_section"
                  buttonText="Get started for free"
                  placeholder="Enter your business email"
                  className=""
                  formClassName="bg-zinc-50 border border-zinc-200"
                  inputClassName="bg-white"
                  buttonClassName=""
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
