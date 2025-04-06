import Reveal from "./animations/Reveal";
import { Ripple } from "./animations/Ripple";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import posthog from 'posthog-js';
import { useState } from "react";
import marinaSoftwareImage from "../assets/best_software.png";

export default function CalloutTwo() {
  const [email, setEmail] = useState('');

  const handleCalloutCTAClick = () => {
    posthog.capture('callout_cta_clicked', {
      distinct_id: localStorage.getItem('session_id'),
      button_location: 'callout_section',
      button_text: 'Get started for free',
      email: email,
      timestamp: new Date().toISOString()
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCalloutCTAClick();
    // You can add additional logic here to handle the email submission
  };

  return (
    <div className="relative isolate px-6 lg:px-8 bg-[#FFFDE1] mt-16 sm:mt-24 py-16 sm:py-24 overflow-hidden">
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
                  e.target.src = 'https://via.placeholder.com/500x500?text=Marina+Software';
                }}
              />
            </motion.div>
          </div>
          
          <div className="max-w-xl order-2 md:order-2">
            <Reveal delay={0.1}>
              <motion.h1 
                className="text-left text-4xl font-semibold text-pretty text-black sm:text-5xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                The best marina software in the world, at an (almost) unbelievable value
              </motion.h1>
              <motion.p 
                className="mt-8 text-pretty text-zinc-700 sm:text-xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                You don't have to spend a fortune to run a world-class marina. Replace PacSoft, Dockwa, Dockmaster, and more with Harbr to cut costs and get better results for your marina operations.
              </motion.p>
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
      </div>
    </div>
  );
}
