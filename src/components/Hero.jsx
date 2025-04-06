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
            <div className="text-4xl font-semibold text-pretty tracking-tight text-zinc-900 sm:text-6xl">
            AI Marina Management Software
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-pretty text-zinc-600 text-base font-normal sm:text-lg/8">
              Custom technology that understands and enhances what makes your marina special
            </p>
          </Reveal>
          <Reveal
            delay={0.1}
            className="mt-12 flex items-center justify-center gap-x-3"
          >
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-y-3 sm:gap-x-3 w-full max-w-xl">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your business email"
                required
                className="w-full px-5 py-4 text-base rounded-2xl border border-zinc-300 shadow-sm focus:outline-none focus:border-[#F7F76E] focus:ring-1 focus:ring-[#F7F76E] h-[56px] text-[16px]"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl bg-[#F7F76E] px-8 py-4 text-lg font-semibold text-black shadow-md hover:bg-[#E8E85F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F7F76E] hover:scale-[1.02] transition-all duration-200 ease-in-out whitespace-nowrap h-[56px]"
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
