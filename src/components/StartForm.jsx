import { motion } from "motion/react";
import { useState } from "react";
import { Check, Calendar } from "lucide-react";

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
          <p className="text-lg text-zinc-600 mb-4">
            We are revolutionizing how boat owners and members book & interact with marinas. Join us and help shape the future of the marina experience, where boat owners and marina members are the priority.
          </p>
          <p className="text-lg text-zinc-600 font-semibold">
            This is only the beginning.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-12"
        >
          <div className="space-y-6">
            <h2 className="text-base font-medium text-zinc-900">I want to:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { value: "book", label: "I want to book marina berths & slips on Harbr" },
                { value: "list", label: "I want to rent my marina berth or slip to someone else on Harbr" },
                { value: "both", label: "I want to book & list on Harbr" },
                { value: "operator", label: "I am a marina operator/owner" }
              ].map((option) => (
                <label 
                  key={option.value} 
                  className={`relative flex items-center p-4 rounded-2xl cursor-pointer transition-all duration-200 ${
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
                  <div className="flex items-center gap-4 w-full">
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full ring-2 transition-colors ${
                      formData.interest === option.value 
                        ? 'ring-[#5371FF] bg-[#5371FF]' 
                        : 'ring-zinc-300 bg-white'
                    }`}>
                      {formData.interest === option.value && (
                        <Check className="w-3 h-3 text-white m-1" strokeWidth={3} />
                      )}
                    </div>
                    <span className="text-sm text-zinc-600">{option.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-zinc-900 mb-2">Name</label>
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
              <label htmlFor="region" className="block text-sm font-medium text-zinc-900 mb-2">Home marina</label>
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
              <label htmlFor="email" className="block text-sm font-medium text-zinc-900 mb-2">Email address</label>
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
              <label htmlFor="preferredMarinas" className="block text-sm font-medium text-zinc-900 mb-2">Preferred marina(s)</label>
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
              <label htmlFor="startDate" className="block text-sm font-medium text-zinc-900 mb-2">Booking start date</label>
              <div className="relative">
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-xl border border-zinc-200 px-4 py-3 text-zinc-600 shadow-sm placeholder:text-zinc-400 focus:border-[#5371FF] focus:ring-[#5371FF] sm:text-sm"
                  placeholder="dd/mm/yyyy"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label htmlFor="stayLength" className="block text-sm font-medium text-zinc-900 mb-2">Length of stay</label>
              <input
                type="text"
                id="stayLength"
                name="stayLength"
                value={formData.stayLength}
                onChange={handleChange}
                required
                className="block w-full rounded-xl border border-zinc-200 px-4 py-3 text-zinc-600 shadow-sm placeholder:text-zinc-400 focus:border-[#5371FF] focus:ring-[#5371FF] sm:text-sm"
                placeholder="e.g., 1 week, 2 months"
              />
            </div>
          </div>

          <div className="pt-6">
            <div className="flex flex-col items-center gap-6">
              <motion.button
                type="submit"
                className="inline-flex items-center justify-center w-full sm:w-auto min-w-[200px] rounded-xl bg-[#5371FF] px-12 py-4 text-lg font-semibold text-white shadow-sm hover:bg-[#4460E6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5371FF] transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Join Now
              </motion.button>

              <div className="text-center text-sm text-zinc-500 space-y-1.5">
                <p>We will reach out via email to confirm if you qualify.</p>
                <p>We value your privacy. No spam, promised.</p>
              </div>
            </div>
          </div>
        </motion.form>
      </div>
    </div>
  );
} 