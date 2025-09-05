import Reveal from "./animations/Reveal";
import { motion } from "framer-motion";
import PricingQuoteForm from "./PricingQuoteForm";

export default function Pricing() {
  const pricingTiers = [
    {
      range: "Up to 20",
      price: "$ 99 /mo",
    },
    {
      range: "21 to 100",
      price: "$ 299 /mo",
    },
    {
      range: "100+",
      price: "$ 499 /mo onwards",
    },
  ];

  return (
    <div className=" bg-[#E1EFFF]">
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
              />
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
                    className="bg-zinc-50 rounded-2xl overflow-hidden h-full shadow-lg"
                    style={{ border: "1px solid #5371FF" }}
                  >
                    <div className="p-4 sm:p-6 h-full flex flex-col">
                      <div className="flex flex-col justify-center h-1/2">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-medium mb-2 text-center text-zinc-600">
                          {tier.range}
                        </h3>
                        <p className="text-center text-zinc-500 text-sm sm:text-base">
                          berths
                        </p>
                      </div>
                      <div className="text-center bg-white p-3 sm:p-4 -mx-4 sm:-mx-6 -mb-4 sm:-mb-6 h-1/2 flex items-center justify-center">
                        <p className="text-[28px] sm:text-[32px] md:text-[38px] font-bold tracking-[-0.02em] text-black">
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
                <div className="grid grid-cols-1 lg:grid-cols-1 items-center">
                  <PricingQuoteForm
                    source="pricing_page"
                    buttonText="Get Free Quote"
                    className="max-w-6xl mx-auto"
                    formClassName=""
                    onSuccess={(result) => {
                      console.log(
                        "Quote request submitted successfully:",
                        result
                      );
                    }}
                    onError={(error) => {
                      console.error("Quote request failed:", error);
                    }}
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
