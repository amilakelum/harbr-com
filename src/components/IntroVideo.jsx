import screenshot from "../assets/hero1.png";
import Reveal from "./animations/Reveal";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import posthog from 'posthog-js';

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
    "optimize calls",
    "approve bookings",
    "manage documents",
    "grow your business",
    "o"
  ];
  
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [isPaused, setIsPaused] = useState(false);
  const [email, setEmail] = useState('');
  
  useEffect(() => {
    let timer;
    
    if (isPaused) {
      timer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 2000);
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
  
  const handleVideoCTAClick = (buttonType) => {
    posthog.capture('video_cta_clicked', {
      distinct_id: localStorage.getItem('session_id'),
      button_location: 'intro_video_section',
      button_text: buttonType,
      email: email,
      timestamp: new Date().toISOString()
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleVideoCTAClick('Get started for free');
    // You can add additional logic here to handle the email submission
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
            className="w-full h-[400px] sm:h-[500px] object-cover object-center rounded-2xl"
          />
          
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
          
          <div className="absolute inset-0 flex flex-col justify-center p-8 sm:p-12 lg:p-16">
            <div className="max-w-2xl">
              <p className="text-white text-sm font-mono uppercase tracking-wide mb-2">
                <span className="py-1 px-2 rounded-md">HARBR AI MARINA SOFTWARE</span>
              </p>
              <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-tight">
                <span className="opacity-80">Software for people<br />
                to </span>
                <span className="text-[#F7F76E] font-medium inline-block min-w-16">{currentText}</span>
                <span 
                  className={`inline-block w-1.5 h-[1em] bg-[#F7F76E] ml-1 align-middle ${isPaused ? 'animate-pulse' : ''}`}
                  style={!isPaused ? cursorStyle : {}}
                ></span>
              </h1>
              
              
              <div className="mt-6 hidden sm:block">
                <form onSubmit={handleSubmit} className="flex items-center gap-x-3 w-full max-w-md">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your business email"
                    required
                    className="w-full px-4 py-3 text-base rounded-xl border border-white/20 bg-white/90 text-black shadow-sm focus:outline-none focus:border-[#F7F76E] focus:ring-1 focus:ring-[#F7F76E] h-[48px] text-[16px]"
                  />
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-auto inline-flex items-center justify-center rounded-xl bg-[#F7F76E] px-6 py-3 text-base font-semibold text-black shadow-md hover:bg-[#F7F76E]/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F7F76E] transition-all duration-200 ease-in-out whitespace-nowrap h-[48px]"
                  >
                    Get started free
                  </motion.button>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Mobile form outside image */}
        <div className="sm:hidden mt-6 bg-zinc-50 p-6 rounded-2xl shadow-sm border border-zinc-100">
          <form onSubmit={handleSubmit} className="flex flex-col gap-y-3 w-full">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your business email"
              required
              className="w-full px-4 py-3 text-base rounded-xl border border-zinc-300 shadow-sm focus:outline-none focus:border-[#F7F76E] focus:ring-1 focus:ring-[#F7F76E] h-[48px] text-[16px]"
            />
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full inline-flex items-center justify-center rounded-xl bg-[#F7F76E] px-6 py-3 text-base font-semibold text-black shadow-md hover:bg-[#F7F76E]/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F7F76E] transition-all duration-200 ease-in-out h-[48px]"
            >
              Get started free
            </motion.button>
          </form>
        </div>
      </div>
    </Reveal>
  );
}
