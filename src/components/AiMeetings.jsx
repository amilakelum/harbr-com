import Reveal from "./animations/Reveal";
import { motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import posthog from 'posthog-js';
import meetingImage from "../assets/reservation1.png";

export default function AiMeetings() {
  const [email, setEmail] = useState('');

  const handleCTAClick = (buttonType) => {
    posthog.capture('ai_meetings_cta_clicked', {
      distinct_id: localStorage.getItem('session_id'),
      button_location: 'ai_meetings_section',
      button_text: buttonType,
      email: email,
      timestamp: new Date().toISOString()
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCTAClick('Get started for free');
  };

  return (
    <div className="relative isolate px-6 pt-24 lg:px-8 bg-[#E1EFFF]">
      <div className="mx-auto max-w-7xl">
        {/* Top section with heading and CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-96 items-start mb-16">
          {/* Left column - Heading and buttons */}
          <div>
            <Reveal delay={0.1}>
              <motion.h2 
                className="text-[46px] leading-[1.1] tracking-[-0.02em] font-normal"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                Manage your entire marina with <br/>intuitive AI-powered tools
              </motion.h2>
            </Reveal>
          </div>

          {/* Right column - Feature bullets */}
          <div>
            <Reveal delay={0.2}>
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 rounded-md p-1.5 w-8 h-8 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-800">
                      <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                      <path d="M3 9h18"></path>
                      <path d="M9 21V9"></path>
                    </svg>
                  </div>
                  <p className="text-pretty text-zinc-600 text-base font-normal sm:text-lg/8">
                  Occupancy prediction & dynamic pricing 
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 rounded-md p-1.5 w-8 h-8 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-800">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <p className="text-pretty text-zinc-600 text-base font-normal sm:text-lg/8">
                  Intelligent document processing
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 rounded-md p-1.5 w-8 h-8 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-800">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 16v-4"></path>
                      <path d="M12 8h.01"></path>
                    </svg>
                  </div>
                  <p className="text-pretty text-zinc-600 text-base font-normal sm:text-lg/8">
                    Centralized data management
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 rounded-md p-1.5 w-8 h-8 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-800">
                      <path d="M4 3h16a2 2 0 0 1 2 2v6a10 10 0 0 1-10 10A10 10 0 0 1 2 11V5a2 2 0 0 1 2-2z"></path>
                      <path d="M8 10h8"></path>
                      <path d="M8 14h4"></path>
                    </svg>
                  </div>
                  <p className="text-pretty text-zinc-600 text-base font-normal sm:text-lg/8">
                  Seamless API integrations 
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Bottom section - Screenshot */}
        <Reveal delay={0.4}>
          <div className="w-full overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="rounded-t-2xl overflow-hidden shadow-2xl"
            >
              <div className="h-[200px] sm:h-[300px] md:h-[420px] lg:h-[720px] overflow-hidden">
                <img 
                  src={meetingImage}
                  alt="Sales Dashboard"
                  className="w-full object-cover object-top"
                  style={{ maxHeight: 'none' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/1200x400?text=Sales+Dashboard';
                  }}
                />
              </div>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </div>
  );
} 