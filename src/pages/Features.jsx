import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import RevenueGrowthChart from "../components/charts/RevenueGrowthChart";
import Reveal from "../components/animations/Reveal";
import FormFeedback from "../components/ui/FormFeedback";
import { saveEmailSubscription } from "../lib/supabaseUtils";

export default function Features() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: null, text: null });

  useEffect(() => {
    // Set the document title when the component mounts
    document.title = "Features | Harbr";
    
    return () => {
      // Optional cleanup if needed
    };
  }, []);

  // Auto-dismiss form feedback message after 6 seconds
  useEffect(() => {
    if (submitMessage.text) {
      const timer = setTimeout(() => {
        clearMessage();
      }, 6000);
      
      return () => clearTimeout(timer);
    }
  }, [submitMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMessage({ type: null, text: null });
    
    try {
      // Save email to Supabase
      const result = await saveEmailSubscription(email, 'features_page', {
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
    <>
      <div className="bg-gradient-to-br from-white to-zinc-50">
        <div className="relative isolate px-6 pt-14 lg:px-8 mb-[10px] overflow-visible">
          <div className="mx-auto max-w-2xl pb-16 sm:pb-16 lg:pb-16">
            <div className="text-center pb-6">
              <Reveal delay={0.1}>
                <h2 className="text-[46px] leading-[1.1] tracking-[-0.02em] font-normal">
                  Everything you need to <br/> manage your marina
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-8 text-pretty text-zinc-600 text-base font-normal sm:text-lg/8">
                  Manage your berths, bookings, customer records, invoices, and so much more - <br/>all on one, easy-to-use platform. Try every feature now!
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="mt-10">
                  <div className="bg-white p-2 rounded-2xl shadow-sm">
                    <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-4">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your business email"
                        required
                        className="w-full flex-grow px-5 py-3.5 text-base rounded-xl border-0 bg-gray-50 text-black focus:outline-none focus:ring-0 h-[52px] text-[16px] placeholder-zinc-400"
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
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <Reveal delay={0.4}>
              <div className="bg-white rounded-2xl shadow-sm p-8 mb-12">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="flex flex-col">
                    <h2 className="text-3xl font-normal mb-4 tracking-[-0.02em]">AI Dynamic Pricing</h2>
                    <p className="mb-6 text-zinc-600 text-lg">
                      Harbr's AI helps marina managers eliminate guesswork and maximize marina revenue by analyzing historical booking data, local events, and weather patterns to automatically set optimal pricing strategies.
                    </p>
                    <div className="mb-4">
                      <ul className="list-disc pl-5 space-y-2 text-zinc-600">
                        <li>Observe trends via historical data</li>
                        <li>Listen to local events</li>
                        <li>Predicts seasonal fluctuations</li>
                        <li>Automated price adjustments</li>
                      </ul>
                    </div>
                  </div>
                  <RevenueGrowthChart />
                </div>
              </div>
            </Reveal>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <Reveal delay={0.5}>
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  <div className="p-8 h-full flex flex-col">
                    <div className="flex-grow">
                      <h3 className="text-2xl font-normal mb-3 tracking-[-0.02em]">Smart Berth Allocation</h3>
                      <p className="text-zinc-600 mb-3">
                        Our intelligent algorithm matches vessels to berths based on specifications optimizing space utilization.
                      </p>
                    </div>
                    <div className="bg-zinc-50 p-4 -mx-8 -mb-8 mt-4">
                      {/* Future link or CTA could go here */}
                    </div>
                  </div>
                </div>
              </Reveal>
              
              <Reveal delay={0.6}>
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  <div className="p-8 h-full flex flex-col">
                    <div className="flex-grow">
                      <h3 className="text-2xl font-normal mb-3 tracking-[-0.02em]">Document Processing</h3>
                      <p className="text-zinc-600 mb-3">
                        AI extracts data from vessel documentation, reducing manual entry and human error in administrative work.
                      </p>
                    </div>
                    <div className="bg-zinc-50 p-4 -mx-8 -mb-8 mt-4">
                      {/* Future link or CTA could go here */}
                    </div>
                  </div>
                </div>
              </Reveal>
              
              <Reveal delay={0.7}>
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  <div className="p-8 h-full flex flex-col">
                    <div className="flex-grow">
                      <h3 className="text-2xl font-normal mb-3 tracking-[-0.02em]">Interactive Marina Map</h3>
                      <p className="text-zinc-600 mb-3">
                        Real-time visualization with color-coded status indicators for berths and maintenance needs.
                      </p>
                    </div>
                    <div className="bg-zinc-50 p-4 -mx-8 -mb-8 mt-4">
                      {/* Future link or CTA could go here */}
                    </div>
                  </div>
                </div>
              </Reveal>
              
              <Reveal delay={0.8}>
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  <div className="p-8 h-full flex flex-col">
                    <div className="flex-grow">
                      <h3 className="text-2xl font-normal mb-3 tracking-[-0.02em]">Customer Communications</h3>
                      <p className="text-zinc-600 mb-3">
                        Automated, personalized emails for bookings, insurance renewals, with minimal effort.
                      </p>
                    </div>
                    <div className="bg-zinc-50 p-4 -mx-8 -mb-8 mt-4">
                      {/* Future link or CTA could go here */}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
            
            <Reveal delay={0.9}>
              <div className="text-center">
                <p className="text-lg mb-6 text-zinc-600">Ready to transform your marina operations?</p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className="bg-black text-white rounded-xl px-8 py-3.5 font-semibold hover:bg-zinc-800 shadow-md transition-all duration-200 ease-in-out h-[52px]"
                  onClick={() => {
                    window.open('mailto:chris@harbrapp.com?subject=Harbr%20Features%20Inquiry', '_blank');
                  }}
                >
                  Contact Us
                </motion.button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </>
  );
} 