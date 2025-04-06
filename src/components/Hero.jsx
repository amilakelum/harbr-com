import Reveal from "./animations/Reveal";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import BoatAnimation from "./animations/BoatAnimation";
import posthog from 'posthog-js';

export default function Hero() {
  const [termIndex, setTermIndex] = useState(0);
  const [email, setEmail] = useState('');
  const terms = [
    "berths",
    "slips",
    "moorings",
    "jetties",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTermIndex((prevIndex) => (prevIndex + 1) % terms.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleHeroCTAClick = (buttonType) => {
    posthog.capture('hero_cta_clicked', {
      distinct_id: localStorage.getItem('session_id'),
      button_location: 'hero_section',
      button_text: buttonType,
      email: email,
      timestamp: new Date().toISOString()
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleHeroCTAClick('Get started for free');
    // You can add additional logic here to handle the email submission
  };

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8 mb-[10px] overflow-visible">
      <div className="mx-auto max-w-2xl pb-16 sm:pb-16 lg:pb-16">
        {/* <Reveal
          delay={0.1}
          className="mb-4 sm:mb-6 sm:flex sm:justify-center text-center"
        >
          <div className="inline-flex items-center">
            <div className="rounded-xl w-[14px] h-2 mr-2 bg-blue-500"></div>
            <p className="uppercase text-sm leading-[14px] text-blue-500">
            Harbr
            </p>
          </div>
        </Reveal> */}
    
        <div className="text-center pb-6">
          <Reveal delay={0.1}>
            <h2 className="text-[46px] leading-[1.1] tracking-[-0.02em] font-normal">
            Everything you need to <br/> grow your marina
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-pretty text-zinc-600 text-base font-normal sm:text-lg/8">
              Custom technology that understands and enhances<br/> what makes your marina special
            </p>
          </Reveal>
          <Reveal
              delay={0.25}
              className="mt-10"
            >
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4 sm:gap-x-4 bg-white p-2 rounded-2xl shadow-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your business email"
                  required
                  className="w-full flex-grow px-5 py-3.5 text-base rounded-xl border-0 bg-white text-black focus:outline-none focus:ring-0 h-[52px] text-[16px] placeholder-zinc-400"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-black px-6 py-3.5 text-base font-semibold text-white shadow-md hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black transition-all duration-200 ease-in-out whitespace-nowrap h-[52px]"
                >
                  Get started for free
                </motion.button>
              </form>
            </Reveal>
        </div>
      </div>
      
      {/* Boat Animation */}
      {/* <BoatAnimation /> */}
    </div>
  );
}
