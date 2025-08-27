import Reveal from "./animations/Reveal";
import { motion } from "framer-motion";
import EmailSubscriptionForm from "./EmailSubscriptionForm";

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
              <div className="max-w-lg mx-auto">
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
