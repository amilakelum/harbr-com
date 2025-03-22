import { motion } from "motion/react";
import { useState } from "react";
import { Check, Calendar, Anchor, ShieldCheck, Clock, MapPin, ArrowRight, ExternalLink } from "lucide-react";

export default function StartForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    region: "",
    email: "",
    preferredMarinas: "",
    startDate: "",
    stayLength: "",
    interest: "book"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      console.log(formData);
      setSubmitted(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (submitted) {
    return (
      <div className="relative isolate px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-6 sm:p-12 shadow-xl ring-1 ring-zinc-900/10 text-center relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-[#5371FF] to-purple-500"></div>
            <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-[#EEF1FF] opacity-40 blur-xl"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-[#EEF1FF] opacity-40 blur-xl"></div>
            
            <div className="relative">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-100 mb-6 sm:mb-8"
              >
                <Check className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
              </motion.div>
              
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-3 sm:mb-4"
              >
                Thank you for registering!
              </motion.h2>
              
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-base sm:text-lg text-zinc-600 mb-3"
              >
                We're excited to have you join the marina revolution. Stay tuned for updates!
              </motion.p>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl mb-4 sm:mb-8 mt-6 sm:mt-8"
              >
                <p className="text-base sm:text-lg text-zinc-700 font-medium">
                  Based in Australia or New Zealand?
                </p>
                <p className="mb-3 sm:mb-4 text-sm sm:text-base text-zinc-600">
                  Check out our regional platform:
                </p>
                <a 
                  href="https://www.harbourhound.com.au" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-white border border-zinc-200 text-[#5371FF] text-sm sm:text-base font-medium hover:bg-[#5371FF] hover:text-white transition-colors duration-200 max-w-full break-words"
                >
                  <span className="truncate">www.harbourhound.com.au</span>
                  <ExternalLink className="w-4 h-4 ml-2 flex-shrink-0" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative isolate px-6 lg:px-8 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-16"
        >
          <h1 className="text-3xl sm:text-4xl font-semibold text-pretty tracking-tight text-zinc-900 sm:text-5xl mb-4 sm:mb-6">
            Join the Marina Revolution
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
            We are revolutionizing how boat owners and members book & interact with marinas.
          </p>
          
          {/* <div className="flex flex-col sm:grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
            <div className="flex items-center gap-3 justify-center">
              <Anchor className="w-5 h-5 text-[#5371FF]" />
              <span className="text-sm text-zinc-600">500+ Marinas</span>
            </div>
            <div className="hidden sm:flex items-center gap-3 justify-center">
              <ShieldCheck className="w-5 h-5 text-[#5371FF]" />
              <span className="text-sm text-zinc-600">Secure Booking</span>
            </div>
            <div className="hidden sm:flex items-center gap-3 justify-center">
              <Clock className="w-5 h-5 text-[#5371FF]" />
              <span className="text-sm text-zinc-600">24/7 Support</span>
            </div>
          </div> */}
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-8 sm:space-y-12 bg-white rounded-2xl p-6 sm:p-8 shadow-lg ring-1 ring-zinc-900/5"
        >
          {step === 1 ? (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-zinc-900 mb-4">Get Started</h2>
                {/* <p className="text-zinc-600">Enter your email to begin the registration process</p> */}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-900 mb-2">
                  <div className="flex items-center gap-2">
                    <span>Email address</span>
                    <span className="text-[#5371FF]">*</span>
                  </div>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-xl border-2 border-zinc-200 px-4 py-3.5 text-zinc-600 shadow-sm placeholder:text-zinc-400 focus:border-[#5371FF] focus:ring-2 focus:ring-[#5371FF]/20 focus:outline-none transition-all duration-200 text-base sm:text-sm"
                    placeholder="you@example.com"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#5371FF] animate-pulse"></div>
                  </div>
                </div>
                <p className="mt-1.5 text-xs text-zinc-500">We'll send your confirmation to this email</p>
              </div>

              <div className="flex flex-col items-center gap-6">
                <motion.button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto min-w-[240px] rounded-xl bg-[#5371FF] px-6 sm:px-12 py-4 text-lg font-semibold text-white shadow-md hover:bg-[#4460E6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5371FF] transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-zinc-900">How would you like to use Harbr?</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { 
                        value: "book", 
                        label: "I want to book marina berths & slips on Harbr",
                        description: "Find and book available berths instantly"
                      },
                      { 
                        value: "list", 
                        label: "I want to rent my marina berth or slip to someone else on Harbr",
                        description: "Earn money from your unused berth"
                      },
                      { 
                        value: "both", 
                        label: "I want to book & list on Harbr",
                        description: "Get the best of both worlds"
                      },
                      { 
                        value: "operator", 
                        label: "I am a marina operator/owner",
                        description: "Manage your marina efficiently"
                      }
                    ].map((option) => (
                      <label 
                        key={option.value} 
                        className={`relative flex flex-col p-4 rounded-2xl cursor-pointer transition-all duration-200 ${
                          formData.interest === option.value 
                            ? 'bg-[#EEF1FF] ring-2 ring-[#5371FF]' 
                            : 'bg-white ring-1 ring-zinc-200 hover:ring-zinc-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="interest"
                          value={option.value}
                          checked={formData.interest === option.value}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div className="flex items-start gap-4 w-full">
                          <div className={`flex-shrink-0 w-5 h-5 rounded-full ring-2 transition-colors mt-0.5 ${
                            formData.interest === option.value 
                              ? 'ring-[#5371FF] bg-[#5371FF]' 
                              : 'ring-zinc-300 bg-white'
                          }`}>
                            {formData.interest === option.value && (
                              <Check className="w-3 h-3 text-white m-1" strokeWidth={3} />
                            )}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-zinc-900">{option.label}</span>
                            <span className="text-xs text-zinc-500 mt-1">{option.description}</span>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-zinc-900">Your Information</h2>
                  
                  {/* Name field - moved to top for all screen sizes */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-zinc-900 mb-2">
                      <div className="flex items-center gap-2">
                        <span>Name</span>
                        <span className="text-[#5371FF]">*</span>
                      </div>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="block w-full rounded-xl border-2 border-zinc-200 px-4 py-3.5 text-zinc-600 shadow-sm placeholder:text-zinc-400 focus:border-[#5371FF] focus:ring-2 focus:ring-[#5371FF]/20 focus:outline-none transition-all duration-200 text-base sm:text-sm"
                        placeholder="Enter your name"
                      />
                    </div>
                  </div>

                  {/* Home marina field - moved up for all screen sizes */}
                  <div>
                    <label htmlFor="region" className="block text-sm font-medium text-zinc-900 mb-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#5371FF]" />
                        <span>Home marina</span>
                        <span className="text-[#5371FF]">*</span>
                      </div>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="region"
                        name="region"
                        value={formData.region}
                        onChange={handleChange}
                        required
                        className="block w-full rounded-xl border-2 border-zinc-200 px-4 py-3.5 text-zinc-600 shadow-sm placeholder:text-zinc-400 focus:border-[#5371FF] focus:ring-2 focus:ring-[#5371FF]/20 focus:outline-none transition-all duration-200 text-base sm:text-sm"
                        placeholder="Enter marina address"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="preferredMarinas" className="block text-sm font-medium text-zinc-900 mb-2">
                        <div className="flex items-center gap-2">
                          <Anchor className="w-4 h-4 text-[#5371FF]" />
                          <span>Preferred marina(s)</span>
                          <span className="text-xs text-zinc-500">(Optional)</span>
                        </div>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="preferredMarinas"
                          name="preferredMarinas"
                          value={formData.preferredMarinas}
                          onChange={handleChange}
                          className="block w-full rounded-xl border-2 border-zinc-200 px-4 py-3.5 text-zinc-600 shadow-sm placeholder:text-zinc-400 focus:border-[#5371FF] focus:ring-2 focus:ring-[#5371FF]/20 focus:outline-none transition-all duration-200 text-base sm:text-sm"
                          placeholder="Enter marina names"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="startDate" className="block text-sm font-medium text-zinc-900 mb-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#5371FF]" />
                          <span>Booking start date</span>
                          <span className="text-xs text-zinc-500">(Optional)</span>
                        </div>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          onFocus={(e) => e.target.type = 'date'}
                          onBlur={(e) => {
                            if (!e.target.value) {
                              e.target.type = 'text'
                            }
                          }}
                          id="startDate"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleChange}
                          className="block w-full rounded-xl border-2 border-zinc-200 px-4 py-3.5 text-zinc-600 shadow-sm placeholder:text-zinc-400 focus:border-[#5371FF] focus:ring-2 focus:ring-[#5371FF]/20 focus:outline-none transition-all duration-200 text-base sm:text-sm appearance-none"
                          placeholder="dd/mm/yyyy"
                        />
                        <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="stayLength" className="block text-sm font-medium text-zinc-900 mb-2">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#5371FF]" />
                        <span>Length of stay</span>
                        <span className="text-xs text-zinc-500">(Optional)</span>
                      </div>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="stayLength"
                        name="stayLength"
                        value={formData.stayLength}
                        onChange={handleChange}
                        className="block w-full rounded-xl border-2 border-zinc-200 px-4 py-3.5 text-zinc-600 shadow-sm placeholder:text-zinc-400 focus:border-[#5371FF] focus:ring-2 focus:ring-[#5371FF]/20 focus:outline-none transition-all duration-200 text-base sm:text-sm"
                        placeholder="e.g., 1 week, 2 months"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flex flex-col items-center gap-6">
                  <motion.button
                    type="submit"
                    className="inline-flex items-center justify-center w-full sm:w-auto min-w-[240px] rounded-xl bg-[#5371FF] px-6 sm:px-12 py-4 text-lg font-semibold text-white shadow-md hover:bg-[#4460E6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5371FF] transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Join Now — It's Free
                  </motion.button>

                  <div className="flex items-center gap-4 text-center text-sm text-zinc-500">
                    <div className="space-y-1">
                      {/* <p className="font-medium">Your information is secure</p>
                      <p>We value your privacy. No spam, promised.</p> */}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </motion.form>
      </div>
    </div>
  );
} 