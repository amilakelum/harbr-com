import Reveal from "./animations/Reveal";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import BoatAnimation from "./animations/BoatAnimation";
import posthog from 'posthog-js';
import { saveEmailSubscription } from "../lib/supabaseUtils";
import FormFeedback from "./ui/FormFeedback";

// Function to get or create a distinct ID for PostHog
function getDistinctId() {
  let distinctId = localStorage.getItem('ph_distinct_id');
  
  if (!distinctId) {
    distinctId = crypto.randomUUID ? crypto.randomUUID() : 
      `anon_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
      
    try {
      localStorage.setItem('ph_distinct_id', distinctId);
    } catch (e) {
      console.error('Could not store distinct ID:', e);
    }
  }
  
  return distinctId;
}

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
    const distinctId = email || getDistinctId();
    
    try {
      posthog.capture('hero_cta_clicked', {
        distinct_id: distinctId,
        button_location: 'hero_section',
        button_text: buttonType,
        email: email,
        timestamp: new Date().toISOString()
      });
      
      console.log('Hero CTA tracked with distinct_id:', distinctId);
    } catch (error) {
      console.error('Error tracking hero CTA:', error);
    }
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
        // Handle already subscribed case specially
        if (result.isExistingEmail) {
          setSubmitMessage({ 
            type: 'info', 
            text: result.message || "You're already subscribed! We've updated your information."
          });
        } else {
          setSubmitMessage({ 
            type: 'success', 
            text: result.message || 'Thank you! We\'ll be in touch soon.' 
          });
          // Only clear email field on successful new subscription
          setEmail('');
        }
      } else {
        // Display specific error based on error type
        switch (result.errorType) {
          case 'duplicate_email':
            setSubmitMessage({ 
              type: 'info', 
              text: 'This email is already subscribed. Thanks for your enthusiasm!' 
            });
            break;
          case 'validation':
            setSubmitMessage({ 
              type: 'error', 
              text: 'Please enter a valid email address.' 
            });
            break;
          case 'auth':
            setSubmitMessage({ 
              type: 'error', 
              text: 'Authentication error. Please try again later.' 
            });
            break;
          default:
            setSubmitMessage({ 
              type: 'error', 
              text: result.error || 'Something went wrong. Please try again.' 
            });
        }
      }
    } catch (error) {
      console.error('Error saving subscription:', error);
      setSubmitMessage({ 
        type: 'error', 
        text: 'Connection error. Please try again later.' 
      });
    } finally {
      setSubmitting(false);
    }
  };

  const clearMessage = () => {
    setSubmitMessage({ type: null, text: null });
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
              Custom technology that understands and <br/>enhances what makes your marina special
            </p>
          </Reveal>
          <Reveal
              delay={0.25}
              className="mt-10"
            >
              <div className="bg-white p-2 rounded-2xl shadow-sm">
                <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your business email"
                    required
                    className="w-full flex-grow px-5 py-3.5 text-base rounded-xl border-0 bg-white text-black focus:outline-none focus:ring-0 h-[52px] text-[16px] placeholder-zinc-400"
                    disabled={submitting}
                  />
                  <div className="w-full lg:w-auto">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full inline-flex items-center justify-center rounded-xl bg-black px-6 py-3.5 text-base font-semibold text-white shadow-md hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black transition-all duration-200 ease-in-out whitespace-nowrap h-[52px]"
                      disabled={submitting}
                    >
                      {submitting ? 'Submitting...' : 'Get started for free'}
                    </motion.button>
                  </div>
                </form>
              </div>
              <FormFeedback
                isSubmitting={submitting}
                message={submitMessage}
                onDismiss={clearMessage}
              />
            </Reveal>
        </div>
      </div>
      
      {/* Boat Animation */}
      {/* <BoatAnimation /> */}
    </div>
  );
}
