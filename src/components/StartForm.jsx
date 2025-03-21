import { motion } from "motion/react";
import { useState } from "react";
import { Check, Calendar, Anchor, ShieldCheck, Clock, MapPin } from "lucide-react";

export default function StartForm() {
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
    console.log(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="relative isolate px-6 lg:px-8 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-semibold text-pretty tracking-tight text-zinc-900 sm:text-5xl mb-6">
            Join the Marina Revolution
          </h1>
          <p className="text-lg text-zinc-600 mb-8 max-w-2xl mx-auto">
            We are revolutionizing how boat owners and members book & interact with marinas.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
            <div className="flex items-center gap-3 justify-center">
              <Anchor className="w-5 h-5 text-[#5371FF]" />
              <span className="text-sm text-zinc-600">500+ Marinas</span>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <ShieldCheck className="w-5 h-5 text-[#5371FF]" />
              <span className="text-sm text-zinc-600">Secure Booking</span>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <Clock className="w-5 h-5 text-[#5371FF]" />
              <span className="text-sm text-zinc-600">24/7 Support</span>
            </div>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-12 bg-white rounded-2xl p-8 shadow-lg ring-1 ring-zinc-900/5"
        >
          <div className="space-y-6">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-zinc-900 mb-2">
                <div className="flex items-center gap-2">
                  <span>Name</span>
                  <span className="text-[#5371FF]">*</span>
                </div>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="block w-full rounded-xl border border-zinc-200 px-4 py-3 text-zinc-600 shadow-sm placeholder:text-zinc-400 focus:border-[#5371FF] focus:ring-[#5371FF] sm:text-sm"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-900 mb-2">
                <div className="flex items-center gap-2">
                  <span>Email address</span>
                  <span className="text-[#5371FF]">*</span>
                </div>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="block w-full rounded-xl border border-zinc-200 px-4 py-3 text-zinc-600 shadow-sm placeholder:text-zinc-400 focus:border-[#5371FF] focus:ring-[#5371FF] sm:text-sm"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="region" className="block text-sm font-medium text-zinc-900 mb-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#5371FF]" />
                  <span>Home marina</span>
                  <span className="text-[#5371FF]">*</span>
                </div>
              </label>
              <input
                type="text"
                id="region"
                name="region"
                value={formData.region}
                onChange={handleChange}
                required
                className="block w-full rounded-xl border border-zinc-200 px-4 py-3 text-zinc-600 shadow-sm placeholder:text-zinc-400 focus:border-[#5371FF] focus:ring-[#5371FF] sm:text-sm"
                placeholder="Enter marina address"
              />
            </div>

            <div>
              <label htmlFor="preferredMarinas" className="block text-sm font-medium text-zinc-900 mb-2">
                <div className="flex items-center gap-2">
                  <Anchor className="w-4 h-4 text-[#5371FF]" />
                  <span>Preferred marina(s)</span>
                  <span className="text-[#5371FF]">*</span>
                </div>
              </label>
              <input
                type="text"
                id="preferredMarinas"
                name="preferredMarinas"
                value={formData.preferredMarinas}
                onChange={handleChange}
                required
                className="block w-full rounded-xl border border-zinc-200 px-4 py-3 text-zinc-600 shadow-sm placeholder:text-zinc-400 focus:border-[#5371FF] focus:ring-[#5371FF] sm:text-sm"
                placeholder="Enter marina names"
              />
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
                  className="block w-full rounded-xl border border-zinc-200 px-4 py-3 text-zinc-600 shadow-sm placeholder:text-zinc-400 focus:border-[#5371FF] focus:ring-[#5371FF] sm:text-sm appearance-none"
                  placeholder="dd/mm/yyyy"
                />
                <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 pointer-events-none" />
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
              <input
                type="text"
                id="stayLength"
                name="stayLength"
                value={formData.stayLength}
                onChange={handleChange}
                className="block w-full rounded-xl border border-zinc-200 px-4 py-3 text-zinc-600 shadow-sm placeholder:text-zinc-400 focus:border-[#5371FF] focus:ring-[#5371FF] sm:text-sm"
                placeholder="e.g., 1 week, 2 months"
              />
            </div>
          </div>

          <div className="pt-6">
            <div className="flex flex-col items-center gap-6">
              <div className="text-xs text-zinc-500 mb-2">

              </div>
              <motion.button
                type="submit"
                className="inline-flex items-center justify-center w-full sm:w-auto min-w-[240px] rounded-xl bg-[#5371FF] px-12 py-4 text-lg font-semibold text-white shadow-md hover:bg-[#4460E6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5371FF] transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Join Now — It's Free
              </motion.button>

              <div className="flex items-center gap-4 text-center text-sm text-zinc-500">
                <div className="space-y-1">
                  <p className="font-medium">Your information is secure</p>
                  <p>We value your privacy. No spam, promised.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.form>
      </div>
    </div>
  );
} 