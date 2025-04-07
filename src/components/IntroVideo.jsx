import screenshot from "../assets/hero6.png";
import Reveal from "./animations/Reveal";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
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

// Add custom cursor blink animation
const cursorStyle = {
  "@keyframes blink": {
    "0%, 100%": { opacity: 1 },
    "50%": { opacity: 0 }
  },
  animation: "blink 1s ease-in-out infinite"
};

export default function IntroVideo() {
  const phrases = [
    "approve bookings",
    "increase revenue",
    "optimize vacancy",
    "manage insurance",
    "enrich data",
    "grow your business",
  ];
  
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [isPaused, setIsPaused] = useState(false);
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: null, text: null });
  
  useEffect(() => {
    let timer;
    
    if (isPaused) {
      timer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 3000);
    } else {
      timer = setTimeout(() => {
        // Handle the typing and deleting logic
        if (!isDeleting) {
          // Typing mode
          const currentPhrase = phrases[currentPhraseIndex];
          setCurrentText(currentPhrase.substring(0, currentText.length + 1));
          
          // If we've completed typing this phrase
          if (currentText === currentPhrase) {
            setIsPaused(true);
          } else {
            // Normal typing speed (slightly random for natural effect)
            setTypingSpeed(80 + Math.random() * 40);
          }
        } else {
          // Deleting mode
          setCurrentText(currentText.substring(0, currentText.length - 1));
          // Faster when deleting
          setTypingSpeed(30 + Math.random() * 20);
          
          // If we've deleted the entire phrase
          if (currentText === "") {
            setIsDeleting(false);
            // Move to the next phrase (cycling if needed)
            setCurrentPhraseIndex((currentPhraseIndex + 1) % phrases.length);
            // Small pause before starting next phrase
            setTypingSpeed(700);
          }
        }
      }, typingSpeed);
    }
    
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentPhraseIndex, phrases, typingSpeed, isPaused]);
  
  // Auto-dismiss form feedback message after 6 seconds
  useEffect(() => {
    if (submitMessage.text) {
      const timer = setTimeout(() => {
        clearMessage();
      }, 6000);
      
      return () => clearTimeout(timer);
    }
  }, [submitMessage]);
  
  const handleVideoCTAClick = (buttonType) => {
    const distinctId = email || getDistinctId();
    
    try {
      posthog.capture('video_cta_clicked', {
        distinct_id: distinctId,
        button_location: 'intro_video_section',
        button_text: buttonType,
        email: email,
        timestamp: new Date().toISOString()
      });
      
      console.log('Video CTA tracked with distinct_id:', distinctId);
    } catch (error) {
      console.error('Error tracking video CTA:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMessage({ type: null, text: null });
    
    // Track click event in PostHog
    handleVideoCTAClick('Get started for free');
    
    try {
      // Save email to Supabase
      const result = await saveEmailSubscription(email, 'intro_video_section', {
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
    <Reveal
      delay={0.4}
      className="container mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="relative">
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
          className="relative w-full h-full rounded-2xl overflow-hidden"
        >
          <img 
            src={screenshot}
            alt="Harbr Platform Screenshot"
            className="w-full h-[90vh] object-cover object-center rounded-2xl"
          />
          
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/10"></div>
          
          <div className="absolute inset-0 flex flex-col justify-center p-8 sm:p-12 lg:p-16">
            <div className="max-w-2xl">
              <p className="text-white text-sm font-mono uppercase tracking-wide mb-2">
                <span className="py-1 rounded-md">HARBR AI MARINA SOFTWARE</span>
              </p>
              <h1 className="text-white text-[46px] leading-[1.1] tracking-[-0.02em] font-normal">
                <span className="opacity-80">Software for people<br />
                to </span>
                <span className="text-[#F7F76E] font-medium inline-block min-w-16">{currentText}</span>
                <span 
                  className={`inline-block w-1.5 h-[1em] bg-[#F7F76E] ml-1 align-middle`}
                  style={!isPaused && !isDeleting ? cursorStyle : { opacity: isPaused ? 1 : 0 }}
                ></span>
              </h1>
              
              
              <div className="mt-6 hidden sm:block">
              <Reveal
              delay={0.25}
              className="mt-10"
            >
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4 sm:gap-x-4 bg-white p-2 rounded-2xl shadow-sm max-w-lg">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your business email"
                  required
                  className="w-full flex-grow px-5 py-3.5 text-base rounded-xl border-0 bg-white text-black focus:outline-none focus:ring-0 h-[52px] text-[16px] placeholder-zinc-400"
                  disabled={submitting}
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-black px-6 py-3.5 text-base font-semibold text-white shadow-md hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black transition-all duration-200 ease-in-out whitespace-nowrap h-[52px]"
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Get started for free'}
                </motion.button>
              </form>
              <FormFeedback
                isSubmitting={submitting}
                message={submitMessage}
                onDismiss={clearMessage}
                className="bg-opacity-90 backdrop-blur-sm max-w-lg"
              />
            </Reveal>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Mobile form outside image */}
        <div className="sm:hidden mt-6 bg-zinc-50 p-6 rounded-2xl shadow-sm border border-zinc-100 ">
            <Reveal
              delay={0.25}
              className="mt-10"
            >
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4 sm:gap-x-4 bg-white p-2 rounded-2xl shadow-sm mx-auto max-w-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your business email"
                  required
                  className="w-full flex-grow px-5 py-3.5 text-base rounded-xl border-0 bg-white text-black focus:outline-none focus:ring-0 h-[52px] text-[16px] placeholder-zinc-400"
                  disabled={submitting}
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-black px-6 py-3.5 text-base font-semibold text-white shadow-md hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black transition-all duration-200 ease-in-out whitespace-nowrap h-[52px]"
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Get started for free'}
                </motion.button>
              </form>
              <FormFeedback
                isSubmitting={submitting}
                message={submitMessage}
                onDismiss={clearMessage}
                className="max-w-sm"
              />
            </Reveal>
        </div>
      </div>
    </Reveal>
  );
}
