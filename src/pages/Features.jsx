import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Features() {
  useEffect(() => {
    // Set the document title when the component mounts
    document.title = "Features | Harbr";
    
    return () => {
      // Optional cleanup if needed
    };
  }, []);

  return (
    <>
      <div className="relative isolate px-6 pt-14 lg:px-8 mb-[10px] overflow-visible">
        <div className="mx-auto max-w-2xl pb-16 sm:pb-16 lg:pb-16">
          <div className="text-center pb-6">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-[46px] leading-[1.1] tracking-[-0.02em] font-normal"
            >
              Everything you need to <br/> manage your marina
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="mt-8 text-pretty text-zinc-600 text-base font-normal sm:text-lg/8"
            >
              Manage your berths, bookings, customer records, invoices, and so much more - <br/>all on one, easy-to-use platform. Try every feature now!
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="mt-10"
            >
              <div className="bg-white p-2 rounded-2xl shadow-sm">
                <form className="flex flex-col lg:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="Enter your business email"
                    required
                    className="w-full flex-grow px-5 py-3.5 text-base rounded-xl border-0 bg-gray-50 text-black focus:outline-none focus:ring-0 h-[52px] text-[16px] placeholder-zinc-400"
                  />
                  <div className="w-full lg:w-auto">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full inline-flex items-center justify-center rounded-xl bg-black px-6 py-3.5 text-base font-semibold text-white shadow-md hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black transition-all duration-200 ease-in-out whitespace-nowrap h-[52px]"
                    >
                      Get started for free
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-zinc-50 to-zinc-100">
        <div className="container mx-auto px-4 py-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="bg-white rounded-lg shadow-md p-8"
          >
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold mb-3">AI Dynamic Pricing</h2>
                <p className="mb-4">
                Harbr's AI helps marina managers eliminate guesswork and maximize marina revenue by analyzing historical booking data, local events, and weather patterns to automatically set optimal pricing strategies.                </p>
                <div className="mb-4">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Observe trends via historical data</li>
                    <li>Listen to local events</li>
                    <li>Predicts seasonal fluctuations</li>
                    <li>Automated price adjustments</li>
                  </ul>
                </div>

              </div>
              <div className="bg-gradient-to-br from-white to-slate-50 rounded-lg overflow-hidden shadow-md relative h-[300px] flex flex-col border border-slate-100">
                <div className="p-3 flex flex-col h-full">
                  {/* Main visualization area */}
                  <div className="relative flex-1 overflow-hidden">
                    {/* Background grid */}
                    <div className="absolute inset-0 grid grid-cols-24 grid-rows-12">
                      {Array.from({ length: 288 }).map((_, i) => (
                        <motion.div 
                          key={`grid-cell-${i}-${Math.floor(i/24)}-${i%24}`}
                          className="border-r border-b border-slate-100/60"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.005 * (i % 24), duration: 0.2 }}
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
                        strokeWidth="3"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 2.5, delay: 0.5 }}
                      />
                    </svg>

                    {/* Quarterly data points - repositioned for stronger growth */}
                    {[
                      { id: 'q1', x: 12.5, y: 84, size: 8, delay: 1.0 },
                      { id: 'q2', x: 37.5, y: 60, size: 8, delay: 1.4 },
                      { id: 'q3', x: 62.5, y: 20, size: 8, delay: 1.8 },
                      { id: 'q4', x: 87.5, y: 5, size: 8, delay: 2.2 }
                    ].map((point) => (
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
                        <div className="rounded-full bg-[#5371FF] w-2 h-2 z-10" />
                      </motion.div>
                    ))}

                    {/* Growth indicator arrows - positioned to emphasize growth */}
                    {[
                      { id: 'arrow1', x: 25, y: 72, rotation: -50, delay: 2.4, scale: 0.8 },
                      { id: 'arrow2', x: 50, y: 35, rotation: -60, delay: 2.6, scale: 1 },
                      { id: 'arrow3', x: 75, y: 12, rotation: -70, delay: 2.8, scale: 1.2 }
                    ].map((arrow) => (
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
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation">
                          <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#5371FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </motion.div>
                    ))}

                    {/* Growth percentage indicators */}
                    {[
                      { id: 'growth-1', x: 23, y: 65, scale: 0.8, delay: 3.0 },
                      { id: 'growth-2', x: 48, y: 30, scale: 1, delay: 3.1 },
                      { id: 'growth-3', x: 72, y: 8, scale: 1.2, delay: 3.2 }
                    ].map((indicator) => (
                      <motion.div
                        key={indicator.id}
                        className="absolute bg-[#5371FF]/10 rounded-full flex items-center justify-center w-10 h-10"
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
                          className="w-6 h-6 rounded-full bg-[#5371FF]/20 flex items-center justify-center"
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
                    <motion.div
                      className="absolute bottom-[10%] right-[15%] w-16 h-16 rounded-full border border-[#5371FF]/10"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 3.3, duration: 0.8 }}
                    />
                    
                    {/* Small decorative dots */}
                    {[
                      { id: 'dot1', x: 15, y: 90, delay: 3.4, size: 3 },
                      { id: 'dot2', x: 35, y: 80, delay: 3.5, size: 2 },
                      { id: 'dot3', x: 55, y: 50, delay: 3.6, size: 4 },
                      { id: 'dot4', x: 75, y: 30, delay: 3.7, size: 2 },
                      { id: 'dot5', x: 90, y: 15, delay: 3.8, size: 3 }
                    ].map((dot) => (
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
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
                <h3 className="text-xl font-bold mb-2">Smart Berth Allocation</h3>
                <p className="text-sm mb-3">
                  Our intelligent algorithm matches vessels to berths based on specifications and preferences, optimizing space utilization.
                </p>
                {/* <a href="/features/berth-allocation" className="text-blue-600 hover:text-blue-800 text-sm font-medium">Berth allocation features</a> */}
              </div>
              
              <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
                <h3 className="text-xl font-bold mb-2">Document Processing</h3>
                <p className="text-sm mb-3">
                  AI extracts and verifies data from vessel documentation, reducing manual entry and human error in administrative work.
                </p>
                {/* <a href="/features/document-processing" className="text-blue-600 hover:text-blue-800 text-sm font-medium">Document processing features</a> */}
              </div>
              
              <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
                <h3 className="text-xl font-bold mb-2">Interactive Marina Map</h3>
                <p className="text-sm mb-3">
                  Real-time visualization with color-coded status indicators for berths, arrivals, departures, and maintenance needs.
                </p>
                {/* <a href="/features/marina-map" className="text-blue-600 hover:text-blue-800 text-sm font-medium">Marina map features</a> */}
              </div>
              
              <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
                <h3 className="text-xl font-bold mb-2">Customer Communications</h3>
                <p className="text-sm mb-3">
                  Automated, personalized emails for bookings, insurance renewals, and weather alerts with minimal effort.
                </p>
                {/* <a href="/features/communications" className="text-blue-600 hover:text-blue-800 text-sm font-medium">Communication features</a> */}
              </div>
            </div>
            

          </motion.div>
        </div>
      </div>
    </>
  );
} 