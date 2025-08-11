import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "../components/animations/Reveal";

export default function OnlineBookingsFeatures() {
  const [activeFeature, setActiveFeature] = useState(1);

  useEffect(() => {
    // Set the document title when the component mounts
    document.title = "Online Bookings & Customer Portal | Harbr";

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
      {/* Hero Section */}
      <div className="relative isolate px-6 py-16 lg:py-24 lg:px-8 bg-gradient-to-br from-white to-zinc-50">
        <div className="mx-auto container">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2 lg:items-center">
            {/* Left side - Content */}
            <Reveal delay={0.1}>
              <div className="text-left">
                <h1 className="text-[52px] sm:text-[60px] lg:text-[68px] leading-[1.1] tracking-[-0.02em] font-normal mb-8">
                  Online Bookings & Customer Portal
                </h1>
                <p className="text-pretty text-zinc-600 text-lg sm:text-xl/8 mb-8 max-w-2xl">
                  Harbr's customizable online booking and customer portal means
                  you set the level of access your customers have to view
                  availability, pricing & book online. Offer your customers a
                  simple online calendar only to minimise phone enquiries for
                  availability, or make money while you sleep with a full end to
                  end online booking function that integrates with your current
                  marina website.
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
                  src="/onlineBooking.png"
                  alt="Online Bookings & Customer Portal"
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Parallax Section */}
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
                    With Harbr you can take bookings 24/7, reducing the time you
                    or your marina staff spend taking bookings over the
                    phone—and it's all automatically synchronised with real time
                    berth availability. Customers can also view your marina
                    documents such as berth agreements, marina map, information
                    & more.
                  </p>
                </Reveal>
              </div>

              {/* Feature 2 - Customer Portal */}
              <div
                id="feature-2"
                className="scroll-section py-32 min-h-screen flex flex-col justify-center"
              >
                <Reveal delay={0.2}>
                  <h2 className="text-[42px] leading-[1.1] tracking-[-0.02em] font-normal mb-6 text-black">
                    Customer Portal
                  </h2>
                  <p className="text-pretty text-zinc-700 text-lg/8 mb-8 max-w-xl">
                    Customers can view their boat & vehicle info, reservations,
                    payment details, invoices due/paid and clearly see where
                    they are paid up to, minimising enquiries to the marina
                    office. Let Harbr's customer portal automate time intensive
                    tasks traditionally completed over the phone or via emails
                    to customers.
                  </p>
                </Reveal>
              </div>

              {/* Feature 3 - Secure Payments */}
              <div
                id="feature-3"
                className="scroll-section py-32 min-h-screen flex flex-col justify-center"
              >
                <Reveal delay={0.3}>
                  <h2 className="text-[42px] leading-[1.1] tracking-[-0.02em] font-normal mb-6 text-black">
                    Secure Payments
                  </h2>
                  <p className="text-pretty text-zinc-700 text-lg/8 mb-8 max-w-xl">
                    All payments via online bookings or through the customer
                    portal are processed securely by STRIPE, the same payment
                    processor used by Air Bnb, Uber & others. Rest easy knowing
                    your customers payment details and info are securely stored.
                  </p>
                </Reveal>
              </div>

              {/* Feature 4 - Our Tech, Your Brand */}
              <div
                id="feature-4"
                className="scroll-section py-32 min-h-screen flex flex-col justify-center"
              >
                <Reveal delay={0.4}>
                  <h2 className="text-[42px] leading-[1.1] tracking-[-0.02em] font-normal mb-6 text-black">
                    Our Tech, Your Brand
                  </h2>
                  <p className="text-pretty text-zinc-700 text-lg/8 mb-8 max-w-xl">
                    Harbr's tech operates seamlessly in the back end, ensuring
                    your marina & brand shine through. All Online Booking &
                    customer portal tech can be branded in accordance with your
                    internal branding guidelines.
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

                  {/* Feature 1 Image - Online Bookings */}
                  <motion.div
                    className="absolute top-0 right-0 w-full h-full flex items-center justify-end"
                    animate={{ opacity: activeFeature === 1 ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <img
                      src="/reservation1.png"
                      alt="Online Bookings"
                      className="w-full h-full object-contain rounded-lg shadow-lg"
                    />
                  </motion.div>

                  {/* Feature 2 Image - Customer Portal */}
                  <motion.div
                    className="absolute top-0 right-0 w-full h-full flex items-center justify-end"
                    animate={{ opacity: activeFeature === 2 ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <img
                      src="/screenshot-1.png"
                      alt="Customer Portal"
                      className="w-full h-full object-contain rounded-lg shadow-lg"
                    />
                  </motion.div>

                  {/* Feature 3 Image - Secure Payments */}
                  <motion.div
                    className="absolute top-0 right-0 w-full h-full flex items-center justify-end"
                    animate={{ opacity: activeFeature === 3 ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <img
                      src="/screenshot-2.webp"
                      alt="Secure Payments"
                      className="w-full h-full object-contain rounded-lg shadow-lg"
                    />
                  </motion.div>

                  {/* Feature 4 Image - Our Tech, Your Brand */}
                  <motion.div
                    className="absolute top-0 right-0 w-full h-full flex items-center justify-end"
                    animate={{ opacity: activeFeature === 4 ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <img
                      src="/Screenshot-23.png"
                      alt="Our Tech, Your Brand"
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
              Ready to streamline your booking process?
            </h2>
            <p className="text-pretty text-zinc-600 text-lg/8 mb-8 max-w-2xl mx-auto">
              Experience the power of 24/7 online bookings and automated
              customer portal with Harbr's comprehensive marina management
              system.
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
