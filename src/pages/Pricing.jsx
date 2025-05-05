import { useEffect } from "react";
import { motion } from "motion/react";
import Reveal from "../components/animations/Reveal";

export default function Pricing() {
  useEffect(() => {
    // Set the document title when the component mounts
    document.title = "Pricing | Harbr";
    
    return () => {
      // Optional cleanup if needed
    };
  }, []);

  return (
    <div className="bg-gradient-to-br from-white to-zinc-50">
      <div id="pricing" className="container mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal delay={0.1}>
            <h1 className="text-[38px] sm:text-[46px] leading-[1.1] tracking-[-0.02em] font-normal text-center mb-6 sm:mb-8">Pricing</h1>
          </Reveal>
          
          <Reveal delay={0.2}>
            <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
              <p className="text-pretty text-zinc-600 text-base sm:text-lg/8">
                Subscriptions are then priced according to how many berths there are 
                in your marina. SMS messages sent from Harbr cost an additional 10¢ each.
                Emails are free.
              </p>
            </div>
          </Reveal>
          
          <div className="w-full mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {/* Pricing Tier 1 */}
              <Reveal delay={0.3}>
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden h-full">
                  <div className="p-4 sm:p-6 h-full flex flex-col">
                    <div className="flex-grow">
                      <h3 className="text-[28px] sm:text-[32px] md:text-[38px] font-normal mb-2 text-center">1</h3>
                      <p className="text-center text-zinc-600 mb-4 sm:mb-6 text-sm sm:text-base">berth</p>
                    </div>
                    <div className="text-center bg-zinc-50 p-3 sm:p-4 -mx-4 sm:-mx-6 -mb-4 sm:-mb-6">
                      <p className="text-lg sm:text-xl md:text-2xl font-normal tracking-[-0.02em] text-black">$95 <span className="text-sm sm:text-base text-zinc-600">/mo</span></p>
                    </div>
                  </div>
                </div>
              </Reveal>
              
              {/* Pricing Tier 2 */}
              <Reveal delay={0.4}>
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden h-full">
                  <div className="p-4 sm:p-6 h-full flex flex-col">
                    <div className="flex-grow">
                      <h3 className="text-[28px] sm:text-[32px] md:text-[38px] font-normal mb-2 text-center">2-5</h3>
                      <p className="text-center text-zinc-600 mb-4 sm:mb-6 text-sm sm:text-base">berths</p>
                    </div>
                    <div className="text-center bg-zinc-50 p-3 sm:p-4 -mx-4 sm:-mx-6 -mb-4 sm:-mb-6">
                      <p className="text-lg sm:text-xl md:text-2xl font-normal tracking-[-0.02em] text-black">$195 <span className="text-sm sm:text-base text-zinc-600">/mo</span></p>
                    </div>
                  </div>
                </div>
              </Reveal>
              
              {/* Pricing Tier 3 */}
              <Reveal delay={0.5}>
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden h-full">
                  <div className="p-4 sm:p-6 h-full flex flex-col">
                    <div className="flex-grow">
                      <h3 className="text-[28px] sm:text-[32px] md:text-[38px] font-normal mb-2 text-center">6-15</h3>
                      <p className="text-center text-zinc-600 mb-4 sm:mb-6 text-sm sm:text-base">berths</p>
                    </div>
                    <div className="text-center bg-zinc-50 p-3 sm:p-4 -mx-4 sm:-mx-6 -mb-4 sm:-mb-6">
                      <p className="text-lg sm:text-xl md:text-2xl font-normal tracking-[-0.02em] text-black">$295 <span className="text-sm sm:text-base text-zinc-600">/mo</span></p>
                    </div>
                  </div>
                </div>
              </Reveal>
              
              {/* Pricing Tier 4 */}
              <Reveal delay={0.6}>
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden h-full">
                  <div className="p-4 sm:p-6 h-full flex flex-col">
                    <div className="flex-grow">
                      <h3 className="text-[28px] sm:text-[32px] md:text-[38px] font-normal mb-2 text-center">16-30</h3>
                      <p className="text-center text-zinc-600 mb-4 sm:mb-6 text-sm sm:text-base">berths</p>
                    </div>
                    <div className="text-center bg-zinc-50 p-3 sm:p-4 -mx-4 sm:-mx-6 -mb-4 sm:-mb-6">
                      <p className="text-lg sm:text-xl md:text-2xl font-normal tracking-[-0.02em] text-black">$395 <span className="text-sm sm:text-base text-zinc-600">/mo</span></p>
                    </div>
                  </div>
                </div>
              </Reveal>
              
              {/* Pricing Tier 5 */}
              <Reveal delay={0.7}>
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden h-full">
                  <div className="p-4 sm:p-6 h-full flex flex-col">
                    <div className="flex-grow">
                      <h3 className="text-[28px] sm:text-[32px] md:text-[38px] font-normal mb-2 text-center">31-75</h3>
                      <p className="text-center text-zinc-600 mb-4 sm:mb-6 text-sm sm:text-base">berths</p>
                    </div>
                    <div className="text-center bg-zinc-50 p-3 sm:p-4 -mx-4 sm:-mx-6 -mb-4 sm:-mb-6">
                      <p className="text-lg sm:text-xl md:text-2xl font-normal tracking-[-0.02em] text-black">$595 <span className="text-sm sm:text-base text-zinc-600">/mo</span></p>
                    </div>
                  </div>
                </div>
              </Reveal>
              
              {/* Pricing Tier 6 */}
              <Reveal delay={0.8}>
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden h-full">
                  <div className="p-4 sm:p-6 h-full flex flex-col">
                    <div className="flex-grow">
                      <h3 className="text-[28px] sm:text-[32px] md:text-[38px] font-normal mb-2 text-center">76+</h3>
                      <p className="text-center text-zinc-600 mb-4 sm:mb-6 text-sm sm:text-base">berths</p>
                    </div>
                    <div className="text-center bg-zinc-50 p-3 sm:p-4 -mx-4 sm:-mx-6 -mb-4 sm:-mb-6">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        className="bg-black text-white rounded-xl px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold hover:bg-zinc-800 transition-all duration-200 ease-in-out"
                        onClick={() => {
                          window.open('mailto:chris@harbrapp.com?subject=Pricing%20Inquiry%20for%20Large%20Marina', '_blank');
                        }}
                      >
                        Contact Sales
                      </motion.button>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
            
            <Reveal delay={0.9}>
              <div className="mt-10 sm:mt-16 text-center">
                <p className="text-base sm:text-lg mb-4 sm:mb-6 text-zinc-600">Need help deciding? Questions about pricing?</p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className="bg-black text-white rounded-xl px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold hover:bg-zinc-800 shadow-md transition-all duration-200 ease-in-out h-[45px] sm:h-[52px]"
                  onClick={() => {
                    window.open('mailto:chris@harbrapp.com?subject=Pricing%20Question', '_blank');
                  }}
                >
                  Contact Us
                </motion.button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
} 