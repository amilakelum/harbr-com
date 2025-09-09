import screenshot from "../assets/hero6.png";
import Reveal from "./animations/Reveal";
import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import EmailSubscriptionForm from "./EmailSubscriptionForm";

// Add custom cursor blink animation
const cursorStyle = {
  "@keyframes blink": {
    "0%, 100%": { opacity: 1 },
    "50%": { opacity: 0 },
  },
  animation: "blink 1s ease-in-out infinite",
};

export default function IntroVideo() {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [isPaused, setIsPaused] = useState(false);

  const phrases = useMemo(
    () => [
      "approve bookings",
      "increase revenue",
      "optimize vacancy",
      "manage insurance",
      "enrich data",
      "grow your business",
    ],
    []
  );

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
  }, [
    currentText,
    isDeleting,
    currentPhraseIndex,
    phrases,
    typingSpeed,
    isPaused,
  ]);

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

          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/10" />

          <div className="absolute inset-0 flex flex-col justify-center p-8 sm:p-12 lg:p-16">
            <div className="max-w-2xl">
              <p className="text-white text-sm font-mono uppercase tracking-wide mb-2">
                <span className="py-1 rounded-md">
                  HARBR AI MARINA SOFTWARE
                </span>
              </p>
              <h1 className="text-white text-[46px] leading-[1.1] tracking-[-0.02em] font-normal">
                <span className="opacity-80">
                  Software for people
                  <br />
                  to{" "}
                </span>
                <span className="text-[#F7F76E] font-medium inline-block min-w-16">
                  {currentText}
                </span>
                <span
                  className="inline-block w-1.5 h-[1em] bg-[#F7F76E] ml-1 align-middle"
                  style={
                    !isPaused && !isDeleting
                      ? cursorStyle
                      : { opacity: isPaused ? 1 : 0 }
                  }
                />
              </h1>

              <div className="mt-6 hidden sm:block">
                <Reveal delay={0.25} className="mt-10">
                  <div className="max-w-lg">
                    <EmailSubscriptionForm
                      source="intro_video_section"
                      buttonText="Get started for free"
                      placeholder="Enter your business email"
                      className=""
                      formClassName="bg-zinc-50 border border-zinc-200"
                      inputClassName="bg-white"
                      buttonClassName="bg-black hover:bg-zinc-800 focus-visible:outline-black"
                    />
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mobile form outside image */}
        <div className="sm:hidden mt-6 bg-zinc-50 p-6 rounded-2xl shadow-sm border border-zinc-100 ">
          <Reveal delay={0.25} className="mt-10">
            <div className="max-w-sm mx-auto">
              <EmailSubscriptionForm
                source="intro_video_section"
                buttonText="Get started for free"
                placeholder="Enter your business email"
                className=""
                formClassName="bg-zinc-50 border border-zinc-200"
                inputClassName="bg-white"
                buttonClassName="bg-black hover:bg-zinc-800 focus-visible:outline-black"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </Reveal>
  );
}
