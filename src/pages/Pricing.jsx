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
                Subscriptions are priced according to how many berths there are in your marina. SMS messages sent from Harbr cost an additional 10¢ each.
                Emails are free.
              </p>
            </div>
          </Reveal>

            {/* Promotional Banner */}
            <Reveal delay={0.25}>
              <div className="bg-[#5371FF] text-white rounded-2xl p-6 sm:p-8 mb-10 sm:mb-16 text-center mt-10 sm:mt-16">
                <h2 className="text-2xl sm:text-3xl font-semibold mb-3">Limited Time Offer!</h2>
                <p className="text-lg sm:text-xl mb-4">Get 50% off for the first 3 months</p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className="bg-white text-[#5371FF] rounded-xl px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold hover:bg-[#EEF1FF] shadow-md transition-all duration-200 ease-in-out"
                  onClick={() => {
                    window.open('mailto:chris@harbrapp.com?subject=50%25%20Discount%20Offer', '_blank');
                  }}
                >
                  Contact Us Now
                </motion.button>
              </div>
            </Reveal>
          
          <div className="w-full mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
              {/* Pricing Tier 1 */}
              <Reveal delay={0.3}>
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden h-full">
                  <div className="p-4 sm:p-6 h-full flex flex-col">
                    <div className="flex-grow">
                      <h3 className="text-[28px] sm:text-[32px] md:text-[38px] font-normal mb-2 text-center">1-30</h3>
                      <p className="text-center text-zinc-600 mb-4 sm:mb-6 text-sm sm:text-base">berth</p>
                    </div>
                    <div className="text-center bg-zinc-50 p-3 sm:p-4 -mx-4 sm:-mx-6 -mb-4 sm:-mb-6">
                      <p className="text-lg sm:text-xl md:text-2xl font-normal tracking-[-0.02em] text-black">$395 <span className="text-sm sm:text-base text-zinc-600">/mo</span></p>
                    </div>
                  </div>
                </div>
              </Reveal>
              
              {/* Pricing Tier 2 */}
              <Reveal delay={0.4}>
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden h-full">
                  <div className="p-4 sm:p-6 h-full flex flex-col">
                    <div className="flex-grow">
                      <h3 className="text-[28px] sm:text-[32px] md:text-[38px] font-normal mb-2 text-center">31-75</h3>
                      <p className="text-center text-zinc-600 mb-4 sm:mb-6 text-sm sm:text-base">berths</p>
                    </div>
                    <div className="text-center bg-zinc-50 p-3 sm:p-4 -mx-4 sm:-mx-6 -mb-4 sm:-mb-6">
                      <p className="text-lg sm:text-xl md:text-2xl font-normal tracking-[-0.02em] text-black">$695 <span className="text-sm sm:text-base text-zinc-600">/mo</span></p>
                    </div>
                  </div>
                </div>
              </Reveal>
              
              {/* Pricing Tier 3 */}
              <Reveal delay={0.5}>
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden h-full">
                  <div className="p-4 sm:p-6 h-full flex flex-col">
                    <div className="flex-grow">
                      <h3 className="text-[28px] sm:text-[32px] md:text-[38px] font-normal mb-2 text-center">76-150</h3>
                      <p className="text-center text-zinc-600 mb-4 sm:mb-6 text-sm sm:text-base">berths</p>
                    </div>
                    <div className="text-center bg-zinc-50 p-3 sm:p-4 -mx-4 sm:-mx-6 -mb-4 sm:-mb-6">
                      <p className="text-lg sm:text-xl md:text-2xl font-normal tracking-[-0.02em] text-black">$995 <span className="text-sm sm:text-base text-zinc-600">/mo</span></p>
                    </div>
                  </div>
                </div>
              </Reveal>
              
              
              {/* Pricing Tier 6 */}
              <Reveal delay={0.8}>
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden h-full">
                  <div className="p-4 sm:p-6 h-full flex flex-col">
                    <div className="flex-grow">
                      <h3 className="text-[28px] sm:text-[32px] md:text-[38px] font-normal mb-2 text-center">150+</h3>
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
            
            <div className="text-right text-zinc-600 mt-6 mb-8">
              <p>Prices are in Australian dollars (AUD). Prices exclude GST.</p>
            </div>



          </div>

          {/* Details Section */}
          <div className="max-w-7xl mx-auto px-4 py-14 mb-12 flex flex-col md:flex-row gap-4 md:gap-8 rounded-xl">
            {/* Left: Features List */}
            <div className="flex-1 md:pl-8 md:ml-8 mb-5 pb-5">
              <h2 className="text-xl font-bold text-zinc-800 mb-3">All subscriptions include:</h2>
              <ul className="space-y-1 text-base text-zinc-700">
                <li className="flex items-start"><span className="text-green-500 mr-2 mt-1">✓</span>Every Harbr feature</li>
                <li className="flex items-start"><span className="text-green-500 mr-2 mt-1">✓</span>100% free support</li>
                <li className="flex items-start"><span className="text-green-500 mr-2 mt-1">✓</span>Unlimited customers</li>
                <li className="flex items-start"><span className="text-green-500 mr-2 mt-1">✓</span>Unlimited file storage</li>
                <li className="flex items-start"><span className="text-green-500 mr-2 mt-1">✓</span>24/7 Monitoring</li>
                <li className="flex items-start"><span className="text-green-500 mr-2 mt-1">✓</span>Constant updates</li>
                <li className="flex items-start"><span className="text-green-500 mr-2 mt-1">✓</span>2% donated to charity</li>
              </ul>
            </div>
            {/* Right: FAQ */}
            <div className="flex-1 space-y-14">
              <div>
                <h3 className="text-xl font-semibold text-zinc-800 mb-1">Are there any upfront costs?</h3>
                <p className="text-base text-zinc-700">Absolutely not! You'll only be charged if you decide to subscribe.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-zinc-800 mb-1">What fees will I be charged?</h3>
                <p className="text-base text-zinc-700">Your monthly subscription fee.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-zinc-800 mb-1">Is there a minimum contract term?</h3>
                <p className="text-base text-zinc-700">No, you can cancel your subscription at any time and you won't be billed again. We hope you will stick around because you love using Harbr, not because we locked you into a contract.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-zinc-800 mb-1">What payment types are accepted?</h3>
                <p className="text-base text-zinc-700">We accept Visa and Mastercard. We only accept payments online.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-zinc-800 mb-1">Any questions?</h3>
                <p className="text-base text-zinc-700">Contact us at <a href="mailto:chris@harbrapp.com" className="text-blue-500 hover:text-blue-600">chris@harbrapp.com</a>.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 