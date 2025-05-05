import { motion } from "motion/react";
import Reveal from "./animations/Reveal";

export default function PricingCard({ 
  tier, 
  price, 
  berthRange, 
  delay = 0.3, 
  isContactSales = false,
  contactEmail = "chris@harbrapp.com"
}) {
  return (
    <Reveal delay={delay}>
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-8 h-full flex flex-col">
          <div className="flex-grow">
            <h3 className="text-[42px] font-normal mb-2 text-center">{tier}</h3>
            <p className="text-center text-zinc-600 mb-8">
              {berthRange === "1" ? "berth" : "berths"}
            </p>
          </div>
          <div className="text-center bg-zinc-50 p-4 -mx-8 -mb-8">
            {isContactSales ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="bg-black text-white rounded-xl px-6 py-3 font-semibold hover:bg-zinc-800 transition-all duration-200 ease-in-out"
                onClick={() => {
                  window.open(`mailto:${contactEmail}?subject=Pricing%20Inquiry%20for%20Large%20Marina`, '_blank');
                }}
              >
                Contact Sales
              </motion.button>
            ) : (
              <p className="text-3xl font-normal tracking-[-0.02em] text-black">
                ${price} <span className="text-xl text-zinc-600">/mo</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
} 