import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function BoatAnimation() {
  const [animationState, setAnimationState] = useState("docked"); // docked, traveling, parking
  
  // Effect to create a travel and park animation cycle
  useEffect(() => {
    const animationCycle = () => {
      // Start traveling
      setAnimationState("traveling");
      
      // After traveling for a while, start parking
      setTimeout(() => {
        setAnimationState("parking");
        
        // After parking, return to docked state
        setTimeout(() => {
          setAnimationState("docked");
        }, 3000);
      }, 20000);
    };
    
    // Initial delay before first cycle
    const initialTimerId = setTimeout(() => {
      animationCycle();
      
      // Set up recurring animation cycle
      const intervalId = setInterval(animationCycle, 30000);
      return () => clearInterval(intervalId);
    }, 5000);
    
    return () => clearTimeout(initialTimerId);
  }, []);

  // Define animation variants based on state
  const boatVariants = {
    docked: {
      x: -100,
      y: [0, -2, 0],
      rotate: [0, 0.3, 0, -0.3, 0],
      opacity: 0.9,
      transition: {
        x: { duration: 0 },
        y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        opacity: { duration: 0.5 }
      }
    },
    traveling: {
      x: [null, 300],
      y: [0, -3, 0, -5, 0],
      rotate: [0, 0.5, 0, -0.5, 0],
      opacity: 0.9,
      transition: {
        x: { duration: 20, ease: "linear" },
        y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        opacity: { duration: 0.5 }
      }
    },
    parking: {
      x: [null, 340],
      y: [0, -1, 0],
      rotate: [0, 0.2, 0],
      opacity: 0.9,
      transition: {
        x: { duration: 3, ease: [0.4, 0.0, 0.2, 1] }, // Uber-inspired deceleration curve
        y: { duration: 2, ease: "easeInOut" },
        rotate: { duration: 2, ease: "easeInOut" },
        opacity: { duration: 0.5 }
      }
    }
  };

  return (
    <div className="absolute bottom-0 w-full overflow-hidden pointer-events-none z-10 left-0 h-[100px]">
      <div className="max-w-6xl mx-auto relative h-full">
        {/* Animated waves using SVG */}
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-[60px] text-[#EEF1FF] absolute bottom-0 left-0"
          fill="currentColor"
        >
          <motion.path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            initial={{ opacity: 0.4 }}
            animate={{ 
              x: [0, -20, 0],
              opacity: [0.3, 0.4, 0.3]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            initial={{ opacity: 0.3 }}
            animate={{ 
              x: [0, 20, 0],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
        </svg>
        
        {/* Animated boat */}
        <motion.div
          className="absolute bottom-[30px] right-[10%]"
          initial={{ x: -100, opacity: 0 }}
          animate={animationState}
          variants={boatVariants}
        >
          <svg 
            width="100" 
            height="50" 
            viewBox="0 0 80 40" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-[80px] h-[40px] sm:w-[90px] sm:h-[45px] md:w-[100px] md:h-[50px]"
          >
            {/* Boat body */}
            <path 
              d="M10 25C10 25 20 30 40 30C60 30 70 25 70 25L65 35H15L10 25Z" 
              fill="#5371FF" 
            />
            {/* Boat cabin */}
            <rect x="30" y="15" width="20" height="10" rx="2" fill="#5371FF" />
            
            {/* Boat flag */}
            <motion.path 
              d="M50 5L50 15L45 12.5L50 10L50 5Z" 
              fill="#5371FF"
              animate={{ 
                rotate: [0, 5, 0], 
                originX: 50,
                originY: 15
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
            {/* Mast */}
            <rect x="49.5" y="5" width="1" height="15" fill="#5371FF" />
            
            {/* Window */}
            <rect x="35" y="17.5" width="10" height="5" rx="1" fill="#EEF1FF" />
            
            {/* Ripple/wake effect - only visible during traveling */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: animationState === "traveling" ? [0, 0.7, 0] : 0 }}
              transition={{ duration: 2, repeat: animationState === "traveling" ? Infinity : false }}
            >
              <path d="M5 30C5 30 8 32 12 30" stroke="#EEF1FF" strokeWidth="1" strokeLinecap="round" />
              <path d="M3 33C3 33 7 35 12 33" stroke="#EEF1FF" strokeWidth="1" strokeLinecap="round" />
              <path d="M1 36C1 36 6 38 12 36" stroke="#EEF1FF" strokeWidth="1" strokeLinecap="round" />
            </motion.g>
          </svg>
        </motion.div>
      </div>
    </div>
  );
}