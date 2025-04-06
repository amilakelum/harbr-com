import screenshot from "../assets/background-laptop3.png";
import Reveal from "./animations/Reveal";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

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
  
  return (
    <Reveal
      delay={0.4}
      className="container mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3 }}
        className="relative w-full h-full rounded-2xl overflow-hidden"
      >
        <img 
          src={screenshot}
          alt="Harbr Platform Screenshot"
          className="w-full object-cover rounded-2xl"
        />
        
        <div className="absolute inset-0 flex flex-col justify-center p-8 sm:p-12 lg:p-16">
          <div className="max-w-2xl">
            <p className="text-white text-sm font-mono uppercase tracking-wide mb-2">
              HARBR AI MARINA SOFTWARE
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
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
}
