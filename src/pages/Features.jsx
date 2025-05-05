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
    <div id="features" className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Features</h1>
      <p className="mb-4">
            Manage your berths, bookings, customer records, invoices, and so much more - all on one, easy-to-use platform. Try every feature now!
          </p>
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-lg text-center text-gray-600 mb-8">

        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold mb-3">AI Occupancy Prediction & Dynamic Pricing</h2>
            <p className="mb-4">
              Harbr's AI helps marina managers to eliminate guesswork and maximizes marina revenue. Harbr AI analyzes your historical booking data alongside local events and weather patterns to accurately set marina pricing strategy.
            </p>
            <div className="mb-4">
              <p className="font-medium mb-2">AI occupancy prediction features:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Observe trends via historical data</li>
                <li>Capture opportunities by listining to local events</li>
                <li>Weather forecast correlation predicts seasonal fluctuations</li>
                <li>Automated price adjustment recommendations</li>
              </ul>
            </div>
            <div className="bg-white p-2 rounded-2xl shadow-sm mb-4">
              <form className="flex flex-col lg:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your business email"
                  required
                  className="w-full flex-grow px-5 py-3.5 text-base rounded-xl border-0 bg-gray-50 text-black focus:outline-none focus:ring-0 h-[52px] text-[16px] placeholder-zinc-400"
                />
                <div className="w-full lg:w-auto">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center rounded-xl bg-black px-6 py-3.5 text-base font-semibold text-white shadow-md hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black transition-all duration-200 ease-in-out whitespace-nowrap h-[52px]"
                  >
                    Get started for free
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg overflow-hidden shadow-md relative h-[400px] flex flex-col">
            <div className="p-4 flex flex-col h-full">
              {/* Main visualization area */}
              <div className="relative flex-1 overflow-hidden">
                {/* Background grid */}
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-5">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <motion.div 
                      key={`grid-cell-${i}-${Math.floor(i/6)}-${i%6}`}
                      className="border-r border-b border-slate-700/30"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.05 * (i % 6), duration: 0.5 }}
                    />
                  ))}
                </div>

                {/* Animated price waves - background effect */}
                <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>
                  <motion.path 
                    d="M0,200 C150,100 250,300 400,200 C550,100 650,300 800,200 L800,400 L0,400 Z" 
                    fill="url(#gradient1)"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, delay: 0.2 }}
                  />
                </svg>

                {/* Data circles with ripple effect */}
                {[
                  { x: 15, y: 30, size: 54, color: 'emerald', value: '$82', label: 'Standard' },
                  { x: 40, y: 60, size: 92, color: 'blue', value: '$95', label: 'Premium' },
                  { x: 75, y: 35, size: 72, color: 'purple', value: '$120', label: 'Luxury' },
                ].map((point, index) => (
                  <motion.div 
                    key={`price-point-${point.label}-${point.value}`}
                    className="absolute flex flex-col items-center justify-center"
                    style={{ 
                      left: `${point.x}%`, 
                      top: `${point.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      delay: 0.5 + index * 0.3,
                      duration: 0.6,
                      type: 'spring'
                    }}
                  >
                    {/* Outer ripple */}
                    <motion.div 
                      className={`absolute rounded-full bg-${point.color}-400/10`}
                      style={{ width: point.size, height: point.size }}
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 0.3, 0.7]
                      }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 3,
                        ease: "easeInOut"
                      }}
                    />
                    
                    {/* Inner circle */}
                    <div className={`relative flex items-center justify-center rounded-full bg-${point.color}-500 shadow-lg shadow-${point.color}-900/20 h-16 w-16 z-10`}>
                      <div className="text-center">
                        <motion.div 
                          className="text-white font-bold text-xl"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1 + index * 0.3 }}
                        >
                          {point.value}
                        </motion.div>
                      </div>
                    </div>
                    <motion.div 
                      className="mt-2 bg-slate-800/80 backdrop-blur-sm px-2 py-0.5 rounded text-xs text-white font-medium"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 + index * 0.3 }}
                    >
                      {point.label}
                    </motion.div>
                  </motion.div>
                ))}

                {/* AI recommendation highlight */}
                <motion.div 
                  className="absolute rounded-xl border border-dashed border-blue-400 bg-blue-400/5 p-3"
                  style={{ top: '20%', right: '15%', width: '35%', height: '35%' }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.2, duration: 0.5 }}
                >
                  <div className="absolute -top-2.5 left-4 bg-slate-900 px-2 text-xs font-semibold text-blue-400">
                    AI RECOMMENDS
                  </div>
                  <div className="h-full flex flex-col justify-center items-center">
                    <motion.div 
                      className="text-3xl font-bold text-blue-400"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2.5 }}
                    >
                      +18%
                    </motion.div>
                    <motion.div 
                      className="text-xs text-blue-300"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.7 }}
                    >
                      Revenue Increase
                    </motion.div>
                  </div>
                </motion.div>

                {/* "Dynamic" label with pulse */}
                <motion.div 
                  className="absolute left-5 top-4 text-emerald-400 font-bold text-xl tracking-wide"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Dynamic Pricing
                </motion.div>

                {/* Animated graph line */}
                <svg className="absolute left-0 bottom-1/4 w-full h-1/3 overflow-visible" preserveAspectRatio="none" aria-hidden="true">
                  <motion.path 
                    d="M0,80 C60,40 140,100 200,60 C260,20 280,80 400,30 C520,0 620,50 800,15"
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, delay: 0.8 }}
                  />
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="50%" stopColor="#0EA5E9" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Pulse indicators along line */}
                {[
                  { position: 20, delayMultiplier: 0 },
                  { position: 45, delayMultiplier: 1 },
                  { position: 68, delayMultiplier: 2 }
                ].map((marker) => (
                  <motion.div
                    key={`pulse-marker-${marker.position}`}
                    className="absolute bottom-1/4 w-3 h-3 rounded-full bg-gradient-to-r from-emerald-400 to-blue-400 shadow-lg shadow-blue-500/30"
                    style={{ left: `${marker.position}%` }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: [0, 1.2, 1] }}
                    transition={{ delay: 1.5 + marker.delayMultiplier * 0.3, duration: 0.8 }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full bg-blue-400"
                      animate={{ 
                        opacity: [1, 0.2, 1],
                        scale: [1, 1.8, 1] 
                      }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 2,
                        delay: marker.delayMultiplier * 0.7
                      }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Bottom stats area */}
              <motion.div 
                className="mt-3 h-20 bg-slate-800/60 backdrop-blur-sm rounded-xl p-3 flex items-center justify-between"
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2.8, duration: 0.5 }}
              >
                {/* Three key metrics */}
                {[
                  { value: '92%', label: 'Occupancy', color: 'text-emerald-400' },
                  { value: '+24%', label: 'Revenue', color: 'text-blue-400' },
                  { value: '45%', label: 'Seasonal Adj.', color: 'text-amber-400' }
                ].map((stat) => (
                  <motion.div 
                    key={`stat-metric-${stat.label}`}
                    className="flex-1 text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3 + ['Occupancy', 'Revenue', 'Seasonal Adj.'].indexOf(stat.label) * 0.15 }}
                  >
                    <div className={`text-2xl font-bold ${stat.color}`}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-400">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-200 rounded-lg flex items-center justify-center order-2 md:order-1">
            <p className="text-gray-600 italic">Interactive marina map with berth allocation</p>
          </div>
          <div className="flex flex-col order-1 md:order-2">
            <h2 className="text-2xl font-bold mb-3">Smart Berth Allocation</h2>
            <p className="mb-4">
              Our intelligent berth matching algorithm considers vessel specifications, owner preferences, and marina layout to recommend the perfect berth for each booking. Eliminate manual guesswork and optimize your marina's space utilization.
            </p>
            <a href="/features/berth-allocation" className="text-blue-600 hover:text-blue-800 font-medium">Berth allocation features</a>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold mb-3">Automated Document Processing</h2>
            <p className="mb-4">
              Stop manually entering data from insurance documents and registration forms. Our AI instantly extracts, verifies, and flags discrepancies in vessel documentation, saving hours of administrative work and reducing human error.
            </p>
            <a href="/features/document-processing" className="text-blue-600 hover:text-blue-800 font-medium">Document processing features</a>
          </div>
          <div className="bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-600 italic">Document scanning and data extraction interface</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-200 rounded-lg flex items-center justify-center order-2 md:order-1">
            <p className="text-gray-600 italic">Marina performance analytics dashboard</p>
          </div>
          <div className="flex flex-col order-1 md:order-2">
            <h2 className="text-2xl font-bold mb-3">Interactive Marina Map</h2>
            <p className="mb-4">
              Real-time visualization of your marina with color-coded status indicators for arrivals, departures, and maintenance needs. Identify available berths instantly and manage your marina at a glance with our interactive digital twin.
            </p>
            <a href="/features/marina-map" className="text-blue-600 hover:text-blue-800 font-medium">Marina map features</a>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold mb-3">Streamlined Customer Communications</h2>
            <p className="mb-4">
              Automated, personalized email sequences for booking confirmations, insurance renewal reminders, and weather alerts. Maintain professional communication with minimal effort while providing exceptional customer service.
            </p>
            <a href="/features/communications" className="text-blue-600 hover:text-blue-800 font-medium">Communication features</a>
          </div>
          <div className="bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-600 italic">Customer communication hub with template builder</p>
          </div>
        </div>
        
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-semibold mb-2">Free for 30 days</h3>
          <p className="mb-4">Create an account to get full access to Harbr. You'll only be charged if you choose not to cancel your subscription at the end of your 30-day trial.</p>
          <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg mt-2">
            Try Harbr for free
          </button>
        </div>
      </div>
    </div>
  );
} 