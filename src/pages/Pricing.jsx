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
      <div id="pricing" className="container mx-auto px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal delay={0.1}>
            <h1 className="text-[46px] leading-[1.1] tracking-[-0.02em] font-normal text-center mb-8">Pricing</h1>
          </Reveal>
          
          <Reveal delay={0.2}>
            <div className="max-w-3xl mx-auto text-center mb-16">
          
              <p className="text-pretty text-zinc-600 text-base sm:text-lg/8">
                Subscriptions are then priced according to how many berths there are 
                in your marina. SMS messages sent from Harbr cost an additional 10¢ each.
                Emails are free.
              </p>
            </div>
          </Reveal>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Pricing Tier 1 */}
              <Reveal delay={0.3}>
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  <div className="p-8 h-full flex flex-col">
                    <div className="flex-grow">
                      <h3 className="text-[42px] font-normal mb-2 text-center">1</h3>
                      <p className="text-center text-zinc-600 mb-8">berth</p>
                    </div>
                    <div className="text-center bg-zinc-50 p-4 -mx-8 -mb-8">
                      <p className="text-3xl font-normal tracking-[-0.02em] text-black">$95 <span className="text-xl text-zinc-600">/mo</span></p>
                    </div>
                  </div>
                </div>
              </Reveal>
              
              {/* Pricing Tier 2 */}
              <Reveal delay={0.4}>
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  <div className="p-8 h-full flex flex-col">
                    <div className="flex-grow">
                      <h3 className="text-[42px] font-normal mb-2 text-center">2 <span className="text-2xl">to</span> 5</h3>
                      <p className="text-center text-zinc-600 mb-8">berths</p>
                    </div>
                    <div className="text-center bg-zinc-50 p-4 -mx-8 -mb-8">
                      <p className="text-3xl font-normal tracking-[-0.02em] text-black">$195 <span className="text-xl text-zinc-600">/mo</span></p>
                    </div>
                  </div>
                </div>
              </Reveal>
              
              {/* Pricing Tier 3 */}
              <Reveal delay={0.5}>
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  <div className="p-8 h-full flex flex-col">
                    <div className="flex-grow">
                      <h3 className="text-[42px] font-normal mb-2 text-center">6 <span className="text-2xl">to</span> 15</h3>
                      <p className="text-center text-zinc-600 mb-8">berths</p>
                    </div>
                    <div className="text-center bg-zinc-50 p-4 -mx-8 -mb-8">
                      <p className="text-3xl font-normal tracking-[-0.02em] text-black">$295 <span className="text-xl text-zinc-600">/mo</span></p>
                    </div>
                  </div>
                </div>
              </Reveal>
              
              {/* Pricing Tier 4 */}
              <Reveal delay={0.6}>
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  <div className="p-8 h-full flex flex-col">
                    <div className="flex-grow">
                      <h3 className="text-[42px] font-normal mb-2 text-center">16 <span className="text-2xl">to</span> 30</h3>
                      <p className="text-center text-zinc-600 mb-8">berths</p>
                    </div>
                    <div className="text-center bg-zinc-50 p-4 -mx-8 -mb-8">
                      <p className="text-3xl font-normal tracking-[-0.02em] text-black">$395 <span className="text-xl text-zinc-600">/mo</span></p>
                    </div>
                  </div>
                </div>
              </Reveal>
              
              {/* Pricing Tier 5 */}
              <Reveal delay={0.7}>
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  <div className="p-8 h-full flex flex-col">
                    <div className="flex-grow">
                      <h3 className="text-[42px] font-normal mb-2 text-center">31 <span className="text-2xl">to</span> 75</h3>
                      <p className="text-center text-zinc-600 mb-8">berths</p>
                    </div>
                    <div className="text-center bg-zinc-50 p-4 -mx-8 -mb-8">
                      <p className="text-3xl font-normal tracking-[-0.02em] text-black">595 <span className="text-xl text-zinc-600">/mo</span></p>
                    </div>
                  </div>
                </div>
              </Reveal>
              
              {/* Pricing Tier 6 */}
              <Reveal delay={0.8}>
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  <div className="p-8 h-full flex flex-col">
                    <div className="flex-grow">
                      <h3 className="text-[42px] font-normal mb-2 text-center">76+</h3>
                      <p className="text-center text-zinc-600 mb-8">berths</p>
                    </div>
                    <div className="text-center bg-zinc-50 p-4 -mx-8 -mb-8">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        className="bg-black text-white rounded-xl px-6 py-3 font-semibold hover:bg-zinc-800 transition-all duration-200 ease-in-out"
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
              <div className="mt-16 text-center">
                <p className="text-lg mb-6 text-zinc-600">Need help deciding? Questions about pricing?</p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className="bg-black text-white rounded-xl px-8 py-3.5 font-semibold hover:bg-zinc-800 shadow-md transition-all duration-200 ease-in-out h-[52px]"
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