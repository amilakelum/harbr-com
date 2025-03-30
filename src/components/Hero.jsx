import Reveal from "./animations/Reveal";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import BoatAnimation from "./animations/BoatAnimation";
import posthog from 'posthog-js';

export default function Hero() {
  const [termIndex, setTermIndex] = useState(0);
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

  const handleHeroCTAClick = () => {
    posthog.capture('hero_cta_clicked', {
      distinct_id: localStorage.getItem('session_id'),
      button_location: 'hero_section',
      button_text: 'Book yours',
      timestamp: new Date().toISOString()
    });
  };

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8 mb-[10px] overflow-visible">
      <div className="mx-auto max-w-2xl py-24 sm:py-24 lg:py-32 pb-16 sm:pb-16 lg:pb-16">
        {/* <Reveal
          delay={0.1}
          className="mb-4 sm:mb-6 sm:flex sm:justify-center text-center"
        >
          <div className="inline-flex items-center">
            <div className="rounded-xl w-[14px] h-2 mr-2 bg-blue-500"></div>
            <p className="uppercase text-sm leading-[14px] text-blue-500">
            Smart marina stays
            </p>
          </div>
        </Reveal> */}
        <div className="text-center pb-6">
          <Reveal delay={0.1}>
            <div className="text-4xl font-semibold text-pretty tracking-tight text-zinc-900 sm:text-6xl">
              Book marina berths and slips near you
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-pretty text-zinc-600 text-base font-normal sm:text-lg/8">
              Search real-time marina availability, compare marina fees and book online immediately.
            </p>
          </Reveal>
          <Reveal
            delay={0.1}
            className="mt-10 flex items-center justify-center gap-x-6"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="z-20 relative"
            >
              <Link
                to="/start"
                onClick={handleHeroCTAClick}
                className="inline-flex items-center justify-center rounded-2xl bg-[#5371FF] px-8 py-4 text-lg font-semibold text-white shadow-md hover:bg-[#4460E6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5371FF] hover:scale-[1.02] transition-all duration-200 ease-in-out min-w-[200px]"
              >
                Book yours
              </Link>
            </motion.div>
          </Reveal>
        </div>
      </div>
      
      {/* Boat Animation */}
      <BoatAnimation />
    </div>
  );
}
