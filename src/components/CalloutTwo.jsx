import Reveal from "./animations/Reveal";
import { Ripple } from "./animations/Ripple";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import posthog from 'posthog-js';
import { useState } from "react";

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
    <div className="relative isolate px-6 lg:px-8 bg-radial from-stone-950 from-10%  to-zinc-950 mt-16 sm:mt-24 py-16 sm:py-24 overflow-hidden">
      <Ripple />
      <div className="mx-auto max-w-3xl">
        <Reveal delay={0.1} className="text-center">
          <motion.h1 
            className="mx-auto max-w-2xl text-center text-4xl font-semibold text-pretty text-white sm:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            The future of marina bookings
          </motion.h1>
          <motion.p 
            className="mx-auto mt-8 max-w-xl text-pretty text-white sm:text-xl/7"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Join thousands of members already booking online at your marina.
          </motion.p>
        </Reveal>

        <Reveal
          delay={0.25}
          className="mt-12 flex items-center justify-center"
        >
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row w-full max-w-xl gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your business email"
              required
              className="flex-grow px-5 py-4 text-base rounded-2xl border border-zinc-600 bg-transparent text-white shadow-sm focus:outline-none focus:border-[#5371FF] focus:ring-1 focus:ring-[#5371FF] h-[56px] text-[16px]"
            />
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(83, 113, 255, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="inline-flex items-center justify-center rounded-2xl bg-[#5371FF] px-8 py-4 text-lg font-semibold text-white shadow-md hover:bg-[#4460E6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5371FF] hover:scale-[1.02] transition-all duration-200 ease-in-out whitespace-nowrap h-[56px]"
            >
              Get started for free
            </motion.button>
          </form>
        </Reveal>
      </div>
    </div>
  );
}
