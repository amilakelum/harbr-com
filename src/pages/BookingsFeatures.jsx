import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "../components/animations/Reveal";

export default function BookingsFeatures() {
  const [activeFeature, setActiveFeature] = useState(1);

  useEffect(() => {
    // Set the document title when the component mounts
    document.title = "Bookings & Berth Management | Harbr";

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
                  Bookings & Berth Management
                </h1>
                <p className="text-pretty text-zinc-600 text-lg sm:text-xl/8 mb-8 max-w-2xl">
                  With Harbr you can assign and manage marina berths to
                  customers with ease, as well as streamline customer, vessel &
                  payment data entry. Add & remove berths to the rental pool
                  with one click & manage availability like never before.
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
                  src="/BookingandBerth.png"
                  alt="Bookings & Berth Management"
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
              {/* Feature 1 - Online Bookings */}
              <div
                id="feature-1"
                className="scroll-section py-32 min-h-screen flex flex-col justify-center"
              >
                <Reveal delay={0.1}>
                  <h2 className="text-[42px] leading-[1.1] tracking-[-0.02em] font-normal mb-6 text-black">
                    Online Bookings
                  </h2>
                  <p className="text-pretty text-zinc-700 text-lg/8 mb-8 max-w-xl">
                    Harbr's customisable online booking and customer portal
                    means you set the level of access your customers have to
                    view availability, pricing & book online. Offer your
                    customers a simple online calendar only to minimise phone
                    enquires for availability, or make money while you sleep
                    with a full end to end online booking function that
                    integrates with your current marina website.
                  </p>
                </Reveal>
              </div>

              {/* Feature 2 - Calendar view */}
              <div
                id="feature-2"
                className="scroll-section py-32 min-h-screen flex flex-col justify-center"
              >
                <Reveal delay={0.2}>
                  <h2 className="text-[42px] leading-[1.1] tracking-[-0.02em] font-normal mb-6 text-black">
                    Calendar view
                  </h2>
                  <p className="text-pretty text-zinc-700 text-lg/8 mb-8 max-w-xl">
                    Prefer to manually manage bookings? Easily view berth
                    availability & apply filters to match customers booking
                    requests
                  </p>
                </Reveal>
              </div>

              {/* Feature 3 - Customisable Dashboard */}
              <div
                id="feature-3"
                className="scroll-section py-32 min-h-screen flex flex-col justify-center"
              >
                <Reveal delay={0.3}>
                  <h2 className="text-[42px] leading-[1.1] tracking-[-0.02em] font-normal mb-6 text-black">
                    Customisable Dashboard
                  </h2>
                  <p className="text-pretty text-zinc-700 text-lg/8 mb-8 max-w-xl">
                    Harbr's main dashboard is customisable allowing you to
                    choose the data you want to see. Think vessel movements for
                    the day, invoices due or outstanding, insurances due to
                    expire & more.
                  </p>
                </Reveal>
              </div>

              {/* Feature 4 - One click editing */}
              <div
                id="feature-4"
                className="scroll-section py-32 min-h-screen flex flex-col justify-center"
              >
                <Reveal delay={0.4}>
                  <h2 className="text-[42px] leading-[1.1] tracking-[-0.02em] font-normal mb-6 text-black">
                    One click editing
                  </h2>
                  <p className="text-pretty text-zinc-700 text-lg/8 mb-8 max-w-xl">
                    Renew, extend or cancel bookings with one click. Re-allocate
                    vessels to different berths with ease.
                  </p>
                </Reveal>
              </div>

              {/* Feature 5 - Quickly find and add customers */}
              <div
                id="feature-5"
                className="scroll-section py-32 min-h-screen flex flex-col justify-center"
              >
                <Reveal delay={0.5}>
                  <h2 className="text-[42px] leading-[1.1] tracking-[-0.02em] font-normal mb-6 text-black">
                    Quickly find and add customers
                  </h2>
                  <p className="text-pretty text-zinc-700 text-lg/8 mb-8 max-w-xl">
                    Harbr's clever search autocompletes names as you type.
                  </p>
                </Reveal>
              </div>

              {/* Feature 6 - Set up automated emails and SMS */}
              <div
                id="feature-6"
                className="scroll-section py-32 min-h-screen flex flex-col justify-center"
              >
                <Reveal delay={0.6}>
                  <h2 className="text-[42px] leading-[1.1] tracking-[-0.02em] font-normal mb-6 text-black">
                    Set up automated emails and SMS
                  </h2>
                  <p className="text-pretty text-zinc-700 text-lg/8 mb-8 max-w-xl">
                    Messages to customers at any point during their marina
                    experience. You can customise follow-up messages to reach
                    the specific customers that you want, at intervals that you
                    choose. No more manually chasing expired insurance or
                    overdue invoices.
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
                    <img
                      src="/og-image.jpg"
                      alt="Background"
                      className="w-full h-full object-cover opacity-100"
                    />
                  </div>

                  {/* Feature 1 Image - Online Bookings */}
                  <motion.div
                    className="absolute top-0 right-0 w-3/4 h-full flex items-center justify-end"
                    animate={{ opacity: activeFeature === 1 ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <img
                      src="/src/assets/reservation1.png"
                      alt="Online Bookings"
                      className="w-full h-4/5 object-contain rounded-lg shadow-lg"
                    />
                  </motion.div>

                  {/* Feature 2 Image - Calendar view */}
                  <motion.div
                    className="absolute top-0 right-0 w-3/4 h-full flex items-center justify-end"
                    animate={{ opacity: activeFeature === 2 ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <img
                      src="/src/assets/screenshot-1.png"
                      alt="Calendar view"
                      className="w-full h-4/5 object-contain rounded-lg shadow-lg"
                    />
                  </motion.div>

                  {/* Feature 3 Image - Customisable Dashboard */}
                  <motion.div
                    className="absolute top-0 right-0 w-3/4 h-full flex items-center justify-end"
                    animate={{ opacity: activeFeature === 3 ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <img
                      src="/src/assets/screenshot-2.webp"
                      alt="Customisable Dashboard"
                      className="w-full h-4/5 object-contain rounded-lg shadow-lg"
                    />
                  </motion.div>

                  {/* Feature 4 Image - One click editing */}
                  <motion.div
                    className="absolute top-0 right-0 w-3/4 h-full flex items-center justify-end"
                    animate={{ opacity: activeFeature === 4 ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <img
                      src="/src/assets/Screenshot-23.png"
                      alt="One click editing"
                      className="w-full h-4/5 object-contain rounded-lg shadow-lg"
                    />
                  </motion.div>

                  {/* Feature 5 Image - Quickly find and add customers */}
                  <motion.div
                    className="absolute top-0 right-0 w-3/4 h-full flex items-center justify-end"
                    animate={{ opacity: activeFeature === 5 ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <img
                      src="/src/assets/Screenshot-24.png"
                      alt="Quickly find and add customers"
                      className="w-full h-4/5 object-contain rounded-lg shadow-lg"
                    />
                  </motion.div>

                  {/* Feature 6 Image - Set up automated emails and SMS */}
                  <motion.div
                    className="absolute top-0 right-0 w-3/4 h-full flex items-center justify-end"
                    animate={{ opacity: activeFeature === 6 ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <img
                      src="/src/assets/Screenshot-25.png"
                      alt="Set up automated emails and SMS"
                      className="w-full h-4/5 object-contain rounded-lg shadow-lg"
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
              Ready to transform your marina operations?
            </h2>
            <p className="text-pretty text-zinc-600 text-lg/8 mb-8 max-w-2xl mx-auto">
              Experience the power of AI-driven marina management with Harbr's
              comprehensive booking and berth management system.
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
