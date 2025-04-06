import Reveal from "./animations/Reveal";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import BoatAnimation from "./animations/BoatAnimation";
import posthog from 'posthog-js';
import { saveEmailSubscription } from "../lib/supabaseUtils";

export default function Hero() {
  const [termIndex, setTermIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: null, text: null });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMessage({ type: null, text: null });
    
    // Track click event in PostHog
    handleHeroCTAClick('Get started for free');
    
    try {
      // Save email to Supabase
      const result = await saveEmailSubscription(email, 'hero_section', {
        page: window.location.pathname,
        button_text: 'Get started for free'
      });
      
      if (result.success) {
        setSubmitMessage({ 
          type: 'success', 
          text: 'Thank you! We\'ll be in touch soon.' 
        });
        setEmail('');
      } else {
        setSubmitMessage({ 
          type: 'error', 
          text: 'Something went wrong. Please try again.' 
        });
      }
    } catch (error) {
      console.error('Error saving subscription:', error);
      setSubmitMessage({ 
        type: 'error', 
        text: 'Something went wrong. Please try again.' 
      });
    } finally {
      setSubmitting(false);
    }
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
                disabled={submitting}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl bg-[#F7F76E] px-8 py-4 text-lg font-semibold text-black shadow-md hover:bg-[#E8E85F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F7F76E] hover:scale-[1.02] transition-all duration-200 ease-in-out whitespace-nowrap h-[56px]"
                disabled={submitting}
              >
                {submitting ? 'Submitting...' : 'Get started for free'}
              </motion.button>
            </form>
          </Reveal>
          {submitMessage.text && (
            <Reveal delay={0.1}>
              <p className={`mt-3 text-sm ${submitMessage.type === 'error' ? 'text-red-500' : 'text-green-600'}`}>
                {submitMessage.text}
              </p>
            </Reveal>
          )}
        </div>
      </div>
      
      {/* Boat Animation */}
      {/* <BoatAnimation /> */}
    </div>
  );
}
