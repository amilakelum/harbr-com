import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "../components/animations/Reveal";

export default function CrmFeatures() {
  const [activeFeature, setActiveFeature] = useState(1);

  useEffect(() => {
    // Set the document title when the component mounts
    document.title = "CRM Features | Harbr";

    // Scroll observer for parallax image changes
    const observerOptions = {
      threshold: 0.3,
      rootMargin: "-10% 0px -10% 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const featureId = entry.target.getAttribute("id");
          const featureNumber = Number.parseInt(featureId.split("-")[1], 10);
          console.log("Feature in view:", featureNumber); // Debug log
          setActiveFeature(featureNumber);
        }
      }
    }, observerOptions);

    // Observe all feature sections
    const sections = document.querySelectorAll(".scroll-section");
    for (const section of sections) {
      observer.observe(section);
    }

    return () => {
      for (const section of sections) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <>
      {/* Hero Section - header1_component equivalent */}
      <div className="relative isolate px-6 py-16 lg:py-24 lg:px-8 bg-gradient-to-br from-white to-zinc-50">
        <div className="mx-auto container">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2 lg:items-center">
            {/* Left side - Content */}
            <Reveal delay={0.1}>
              <div className="text-left">
                <h1 className="text-[52px] sm:text-[60px] lg:text-[68px] leading-[1.1] tracking-[-0.02em] font-normal mb-8">
                  CRM Features
                </h1>
                <p className="text-pretty text-zinc-600 text-lg sm:text-xl/8 mb-8 max-w-2xl">
                  Experience unprecedented access to your customers, powered by
                  Harbr's AI Marina Manager.
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center rounded-xl bg-black px-8 py-4 text-base font-semibold text-white shadow-md hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black transition-all duration-200 ease-in-out cursor-pointer"
                >
                  Book a Demo
                </motion.button>
              </div>
            </Reveal>

            {/* Right side - Image */}
            <Reveal delay={0.2}>
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="/crm.png"
                  alt="CRM Features"
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Parallax Section - SharperMMS style with normal page scroll */}
      <div className="relative bg-white">
        <div className="mx-auto container">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Side - Scrolling Content */}
            <div className="px-6 lg:px-12">
              {/* Feature 1 - Template Library */}
              <div
                id="feature-1"
                className="scroll-section py-32 min-h-screen flex flex-col justify-center"
              >
                <Reveal delay={0.1}>
                  <h2 className="text-[42px] leading-[1.1] tracking-[-0.02em] font-normal mb-6 text-black">
                    Template Library
                  </h2>
                  <p className="text-pretty text-zinc-700 text-lg/8 mb-8 max-w-xl">
                    Leverage AI to create, edit & save custom email and SMS
                    templates for communicating with customers. Send directly
                    from the Harbr platform - no more toggling between software
                    and Outlook.
                  </p>
                </Reveal>
              </div>

              {/* Feature 2 - Automation */}
              <div
                id="feature-2"
                className="scroll-section py-32 min-h-screen flex flex-col justify-center"
              >
                <Reveal delay={0.2}>
                  <h2 className="text-[42px] leading-[1.1] tracking-[-0.02em] font-normal mb-6 text-black">
                    Automation
                  </h2>
                  <p className="text-pretty text-zinc-700 text-lg/8 mb-8 max-w-xl">
                    Set regular communications to customers, as well as
                    reminders for expiring insurance, invoices, missing customer
                    data & more.
                  </p>
                </Reveal>
              </div>

              {/* Feature 3 - Trip history */}
              <div
                id="feature-3"
                className="scroll-section py-32 min-h-screen flex flex-col justify-center"
              >
                <Reveal delay={0.3}>
                  <h2 className="text-[42px] leading-[1.1] tracking-[-0.02em] font-normal mb-6 text-black">
                    Trip history
                  </h2>
                  <p className="text-pretty text-zinc-700 text-lg/8 mb-8 max-w-xl">
                    Record all previous bookings per customer to learn more
                    about their reservation behavior.
                  </p>
                </Reveal>
              </div>

              {/* Feature 4 - Smart Notes & Rating System */}
              <div
                id="feature-4"
                className="scroll-section py-32 min-h-screen flex flex-col justify-center"
              >
                <Reveal delay={0.4}>
                  <h2 className="text-[42px] leading-[1.1] tracking-[-0.02em] font-normal mb-6 text-black">
                    Smart Notes & Rating System
                  </h2>
                  <p className="text-pretty text-zinc-700 text-lg/8 mb-8 max-w-xl">
                    Record notes on customers, vessels or bookings to generate
                    insights into customer behavior. Rate customers to ensure a
                    record of who you want back at your marina (and who you
                    don't!).
                  </p>
                </Reveal>
              </div>
            </div>

            {/* Right Side - Fixed/Sticky Images */}
            <div className="relative">
              <div className="lg:sticky lg:top-0 lg:h-screen flex items-center justify-center p-6 lg:p-12">
                <div className="relative w-full h-[600px] lg:h-[700px] overflow-hidden rounded-2xl">
                  {/* Background Image - Always visible */}
                  <div className="absolute inset-0 w-full h-full">
                    {/* <img
                      src="/og-image.jpg"
                      alt="Background"
                      className="w-full h-full object-cover opacity-100"
                    /> */}
                  </div>

                  {/* Feature 1 Image - Template Library */}
                  <motion.div
                    className="absolute top-0 right-0 w-full h-full flex items-center justify-end"
                    animate={{ opacity: activeFeature === 1 ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <img
                      src="/reservation1.png"
                      alt="Template Library"
                      className="w-full h-full object-contain rounded-lg shadow-lg"
                    />
                  </motion.div>

                  {/* Feature 2 Image - Automation */}
                  <motion.div
                    className="absolute top-0 right-0 w-full h-full flex items-center justify-end"
                    animate={{ opacity: activeFeature === 2 ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <img
                      src="/screenshot-1.png"
                      alt="Automation"
                      className="w-full h-full object-contain rounded-lg shadow-lg"
                    />
                  </motion.div>

                  {/* Feature 3 Image - Trip history */}
                  <motion.div
                    className="absolute top-0 right-0 w-full h-full flex items-center justify-end"
                    animate={{ opacity: activeFeature === 3 ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <img
                      src="/screenshot-2.webp"
                      alt="Trip history"
                      className="w-full h-full object-contain rounded-lg shadow-lg"
                    />
                  </motion.div>

                  {/* Feature 4 Image - Smart Notes & Rating System */}
                  <motion.div
                    className="absolute top-0 right-0 w-full h-full flex items-center justify-end"
                    animate={{ opacity: activeFeature === 4 ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <img
                      src="/Screenshot-23.png"
                      alt="Smart Notes & Rating System"
                      className="w-full h-full object-contain rounded-lg shadow-lg"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-br from-white to-zinc-50 py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <Reveal delay={0.1}>
            <h2 className="text-[46px] leading-[1.1] tracking-[-0.02em] font-normal mb-8">
              Ready to transform your customer relationships?
            </h2>
            <p className="text-pretty text-zinc-600 text-lg/8 mb-8 max-w-2xl mx-auto">
              Experience the power of AI-driven customer relationship management
              with Harbr's comprehensive CRM system.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center rounded-xl bg-black px-8 py-4 text-base font-semibold text-white shadow-md hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black transition-all duration-200 ease-in-out cursor-pointer"
            >
              Start Free Trial
            </motion.button>
          </Reveal>
        </div>
      </div>
    </>
  );
}
