import Reveal from "./animations/Reveal";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Pricing() {
  const [berthNumber, setBerthNumber] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Handle form submission here
    console.log("Berth Number:", berthNumber);
    console.log("Email:", email);

    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setBerthNumber("");
      setEmail("");
    }, 1000);
  };

  const pricingTiers = [
    {
      range: "Up to 20",
      price: "AUD 99 /mo",
    },
    {
      range: "21 to 100",
      price: "AUD 299 /mo",
    },
    {
      range: "100+",
      price: "AUD 499 /mo onwards",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-zinc-100 to-zinc-200">
      <div className="relative isolate px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="text-center mb-16">
            <Reveal delay={0.1}>
              <motion.h2
                className="text-[46px] leading-[1.1] tracking-[-0.02em] font-normal mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                Simple & Transparent Pricing
              </motion.h2>
            </Reveal>

            <Reveal delay={0.2}>
              <motion.p
                className="text-pretty text-zinc-600 text-base font-normal sm:text-lg/8 max-w-3xl mx-auto mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              >
                <strong>
                  Harbr Marina Management Software is free to try for the first
                  30 days.
                </strong>{" "}
                <br />
                Subscriptions are then priced according to how many berths/slips
                there are in your marina. SMS messages sent from Harbr cost 10c.
                Emails are free.
              </motion.p>
            </Reveal>

            <Reveal delay={0.3}>
              <motion.p
                className="text-zinc-600 text-base font-normal mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              ></motion.p>
            </Reveal>
          </div>

          {/* Pricing Tiers, Footer Note, and Quote Form in one container */}
          <Reveal delay={0.5}>
            <div className="bg-white rounded-2xl shadow-sm p-8 mb-16">
              {/* Pricing Tiers */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {pricingTiers.map((tier) => (
                  <div
                    key={tier.range}
                    className="bg-zinc-50 rounded-2xl shadow-sm overflow-hidden h-full"
                  >
                    <div className="p-4 sm:p-6 h-full flex flex-col">
                      <div className="flex-grow">
                        <h3 className="text-[28px] sm:text-[32px] md:text-[38px] font-normal mb-2 text-center">
                          {tier.range}
                        </h3>
                        <p className="text-center text-zinc-600 mb-4 sm:mb-6 text-sm sm:text-base">
                          berths
                        </p>
                      </div>
                      <div className="text-center bg-white p-3 sm:p-4 -mx-4 sm:-mx-6 -mb-4 sm:-mb-6">
                        <p className="text-lg sm:text-xl md:text-2xl font-normal tracking-[-0.02em] text-black">
                          {tier.price}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer Note */}
              <div className="text-right mb-8">
                <p className="text-sm text-zinc-500 font-medium">
                  Prices are in AUD & Exclude GST
                </p>
              </div>

              {/* Quote Form */}
              <div className="max-w-6xl mx-auto">
                {/* <p className="text-black font-normal mb-8 text-center text-[23px]">
                  Enter your berth number to get a free quote.
                </p> */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  {/* Left Column - Image */}
                  <div className="flex justify-center">
                    <img
                      src="/Dollar.png"
                      alt="Marina berths"
                      className="w-full max-w-xs"
                    />
                  </div>

                  {/* Right Column - Form */}
                  <div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <input
                        type="number"
                        value={berthNumber}
                        onChange={(e) => setBerthNumber(e.target.value)}
                        placeholder="Number of berths"
                        required
                        className="w-full px-5 py-3.5 text-base rounded-xl border border-zinc-200 bg-white text-black focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:border-transparent h-[52px] text-[16px] placeholder-zinc-400"
                        disabled={submitting}
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="w-full px-5 py-3.5 text-base rounded-xl border border-zinc-200 bg-white text-black focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:border-transparent h-[52px] text-[16px] placeholder-zinc-400"
                        disabled={submitting}
                      />
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full inline-flex items-center justify-center rounded-xl bg-black px-6 py-3.5 text-base font-semibold text-white shadow-md hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black transition-all duration-200 ease-in-out h-[52px] cursor-pointer"
                        disabled={submitting}
                      >
                        {submitting ? "Getting Quote..." : "Get Free Quote"}
                      </motion.button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
