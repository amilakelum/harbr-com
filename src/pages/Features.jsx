import { useEffect } from "react";

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
              Harbr's AI occupancy prediction eliminates guesswork and maximizes your marina's revenue potential. Our intuitive system analyzes your historical booking data alongside local events and weather patterns to accurately forecast demand. Set your pricing strategy once, then let Harbr automatically adjust rates to ensure optimal occupancy and revenue throughout changing seasons and market conditions.
            </p>
            <div className="mb-4">
              <p className="font-medium mb-2">AI occupancy prediction features:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Historical data analysis identifies booking patterns and trends</li>
                <li>Local event integration captures surge opportunities</li>
                <li>Weather forecast correlation predicts seasonal fluctuations</li>
                <li>Real-time market condition monitoring</li>
                <li>Automated price adjustment recommendations</li>
                <li>Customizable rule-based pricing parameters</li>
                <li>Performance tracking with revenue impact reporting</li>
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
          <div className="bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-600 italic">Marina management dashboard with pricing analytics</p>
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