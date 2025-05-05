import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function RevenueGrowthChart() {
  const [isMobile, setIsMobile] = useState(false);
  
  // Check for mobile viewport on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check immediately
    checkMobile();
    
    // Add resize listener
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Adjust data points based on screen size
  const dataPoints = [
    { id: 'q1', x: 12.5, y: 84, size: isMobile ? 6 : 8, delay: 1.0 },
    { id: 'q2', x: 37.5, y: 60, size: isMobile ? 6 : 8, delay: 1.4 },
    { id: 'q3', x: 62.5, y: 20, size: isMobile ? 6 : 8, delay: 1.8 },
    { id: 'q4', x: 87.5, y: 5, size: isMobile ? 6 : 8, delay: 2.2 }
  ];

  // Adjust growth indicators based on screen size
  const growthArrows = [
    { id: 'arrow1', x: 25, y: 72, rotation: -50, delay: 2.4, scale: isMobile ? 0.6 : 0.8 },
    { id: 'arrow2', x: 50, y: 35, rotation: -60, delay: 2.6, scale: isMobile ? 0.8 : 1 },
    { id: 'arrow3', x: 75, y: 12, rotation: -70, delay: 2.8, scale: isMobile ? 0.9 : 1.2 }
  ];

  // Adjust growth percentage indicators based on screen size
  const growthIndicators = [
    { id: 'growth-1', x: 23, y: 65, scale: isMobile ? 0.6 : 0.8, delay: 3.0 },
    { id: 'growth-2', x: 48, y: 30, scale: isMobile ? 0.8 : 1, delay: 3.1 },
    { id: 'growth-3', x: 72, y: 8, scale: isMobile ? 0.9 : 1.2, delay: 3.2 }
  ];
  
  return (
    <div className="bg-gradient-to-br from-white to-slate-50 rounded-lg overflow-hidden shadow-md relative h-[250px] md:h-[300px] flex flex-col border border-slate-100">
      <div className="p-2 md:p-3 flex flex-col h-full">
        {/* Main visualization area */}
        <div className="relative flex-1 overflow-hidden">
          {/* Background grid */}
          <div className="absolute inset-0 grid grid-cols-12 md:grid-cols-24 grid-rows-8 md:grid-rows-12">
            {Array.from({ length: isMobile ? 96 : 288 }).map((_, i) => (
              <motion.div 
                key={`grid-cell-${i}-${Math.floor(i/(isMobile ? 12 : 24))}-${i%(isMobile ? 12 : 24)}`}
                className="border-r border-b border-slate-100/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.005 * (i % (isMobile ? 12 : 24)), duration: 0.2 }}
              />
            ))}
          </div>

          {/* Revenue growth area - filled gradient with stronger growth curve */}
          <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
            <defs>
              <linearGradient id="growthGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#5371FF" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#5371FF" stopOpacity="0.25" />
              </linearGradient>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#5371FF" />
                <stop offset="100%" stopColor="#5C88FF" />
              </linearGradient>
            </defs>
            
            {/* Revenue growth area - more dramatic curve */}
            <motion.path 
              d="M0,250 C50,240 100,230 150,210 C200,190 250,170 300,140 C350,110 400,80 450,60 C500,40 550,30 600,20 C650,15 700,10 750,8 C800,6 850,5 900,4 L900,300 L0,300 Z"
              fill="url(#growthGradient)"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.3 }}
            />
          </svg>

          {/* Revenue growth line - more pronounced growth */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" aria-hidden="true">
            {/* Primary revenue trend line with stronger curve */}
            <motion.path 
              d="M0,250 C50,240 100,230 150,210 C200,190 250,170 300,140 C350,110 400,80 450,60 C500,40 550,30 600,20 C650,15 700,10 750,8 C800,6 850,5 900,4"
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth={isMobile ? "2" : "3"}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2.5, delay: 0.5 }}
            />
          </svg>

          {/* Quarterly data points - repositioned for stronger growth */}
          {dataPoints.map((point) => (
            <motion.div
              key={point.id}
              className="absolute flex items-center justify-center"
              style={{ 
                left: `${point.x}%`, 
                top: `${point.y}%` 
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: point.delay, duration: 0.6, type: 'spring' }}
            >
              {/* Outer pulse */}
              <motion.div
                className="absolute rounded-full bg-[#5371FF]/20"
                style={{ width: point.size * 3, height: point.size * 3 }}
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 0.2, 0.6]
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 2,
                  ease: "easeInOut"
                }}
              />
              
              {/* Inner dot */}
              <div className={`rounded-full bg-[#5371FF] ${isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'} z-10`} />
            </motion.div>
          ))}

          {/* Growth indicator arrows - positioned to emphasize growth */}
          {growthArrows.map((arrow) => (
            <motion.div
              key={arrow.id}
              className="absolute"
              style={{ 
                left: `${arrow.x}%`, 
                top: `${arrow.y}%`,
                transform: `rotate(${arrow.rotation}deg)` 
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: arrow.scale }}
              transition={{ delay: arrow.delay, duration: 0.5 }}
            >
              <svg width={isMobile ? "18" : "24"} height={isMobile ? "18" : "24"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#5371FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          ))}

          {/* Growth percentage indicators */}
          {growthIndicators.map((indicator) => (
            <motion.div
              key={indicator.id}
              className={`absolute bg-[#5371FF]/10 rounded-full flex items-center justify-center ${isMobile ? 'w-8 h-8' : 'w-10 h-10'}`}
              style={{ 
                left: `${indicator.x}%`, 
                top: `${indicator.y}%`,
                transform: `translate(-50%, -50%) scale(${indicator.scale})` 
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: indicator.scale }}
              transition={{ delay: indicator.delay, duration: 0.6 }}
            >
              <motion.div 
                className={`rounded-full bg-[#5371FF]/20 flex items-center justify-center ${isMobile ? 'w-5 h-5' : 'w-6 h-6'}`}
                animate={{ 
                  boxShadow: ['0 0 0 0 rgba(83, 113, 255, 0.2)', '0 0 0 4px rgba(83, 113, 255, 0)', '0 0 0 0 rgba(83, 113, 255, 0.2)']
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 2,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          ))}

          {/* Revenue milestone indicators */}
          <div className="absolute inset-y-0 left-0 w-[1px] h-full flex flex-col justify-between py-6">
            {[
              { id: 'milestone-1', position: 1 },
              { id: 'milestone-2', position: 2 },
              { id: 'milestone-3', position: 3 },
              { id: 'milestone-4', position: 4 }
            ].map((milestone, index) => (
              <motion.div
                key={milestone.id}
                className="w-2 h-[1px] bg-slate-300"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 8 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
              />
            ))}
          </div>

          {/* Time period indicators */}
          <div className="absolute bottom-0 inset-x-0 h-[1px] w-full flex justify-between px-8">
            {[
              { id: 'period-1', position: 1 },
              { id: 'period-2', position: 2 },
              { id: 'period-3', position: 3 },
              { id: 'period-4', position: 4 }
            ].map((period, index) => (
              <motion.div
                key={period.id}
                className="h-2 w-[1px] bg-slate-300"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 8 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
              />
            ))}
          </div>

          {/* Accent elements for visual interest */}
          {!isMobile && (
            <motion.div
              className="absolute bottom-[10%] right-[15%] w-16 h-16 rounded-full border border-[#5371FF]/10"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 3.3, duration: 0.8 }}
            />
          )}
          
          {/* Small decorative dots - reduced for mobile */}
          {(isMobile ? [
            { id: 'dot1', x: 15, y: 90, delay: 3.4, size: 2 },
            { id: 'dot3', x: 55, y: 50, delay: 3.6, size: 3 },
            { id: 'dot5', x: 90, y: 15, delay: 3.8, size: 2 }
          ] : [
            { id: 'dot1', x: 15, y: 90, delay: 3.4, size: 3 },
            { id: 'dot2', x: 35, y: 80, delay: 3.5, size: 2 },
            { id: 'dot3', x: 55, y: 50, delay: 3.6, size: 4 },
            { id: 'dot4', x: 75, y: 30, delay: 3.7, size: 2 },
            { id: 'dot5', x: 90, y: 15, delay: 3.8, size: 3 }
          ]).map((dot) => (
            <motion.div
              key={dot.id}
              className="absolute rounded-full bg-[#5371FF]/40"
              style={{ 
                left: `${dot.x}%`, 
                top: `${dot.y}%`,
                width: dot.size,
                height: dot.size 
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: dot.delay, duration: 0.3 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 