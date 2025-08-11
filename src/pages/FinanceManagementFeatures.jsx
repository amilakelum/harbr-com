import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "../components/animations/Reveal";

export default function FinanceManagementFeatures() {
  const [activeFeature, setActiveFeature] = useState(1);

  useEffect(() => {
    // Set the document title when the component mounts
    document.title = "Finance Management Features | Harbr";

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
                  Finance Management Features
                </h1>
                <p className="text-pretty text-zinc-600 text-lg sm:text-xl/8 mb-8 max-w-2xl">
                  Manage your invoices, payments, expenses, sales and more with
                  Harbr's simple and comprehensive financial tools. You can work
                  with confidence knowing all transactions are synced with your
                  customer profiles, stored communications and trip history.
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
                  src="/Finance.png"
                  alt="Finance Management Features"
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
              {/* Feature 1 - Invoices */}
              <div
                id="feature-1"
                className="scroll-section py-32 min-h-screen flex flex-col justify-center"
              >
                <Reveal delay={0.1}>
                  <h2 className="text-[42px] leading-[1.1] tracking-[-0.02em] font-normal mb-6 text-black">
                    Invoices
                  </h2>
                  <p className="text-pretty text-zinc-700 text-lg/8 mb-8 max-w-xl">
                    Seamlessly create invoices from the booking calendar
                  </p>
                </Reveal>
              </div>

              {/* Feature 2 - Batch Invoicing & Disbursements */}
              <div
                id="feature-2"
                className="scroll-section py-32 min-h-screen flex flex-col justify-center"
              >
                <Reveal delay={0.2}>
                  <h2 className="text-[42px] leading-[1.1] tracking-[-0.02em] font-normal mb-6 text-black">
                    Batch Invoicing & Disbursements
                  </h2>
                  <p className="text-pretty text-zinc-700 text-lg/8 mb-8 max-w-xl">
                    Pay multiple invoices at a time or add multiple invoices to
                    customer communications. Disburse funds to multiple berth
                    owners with ease.
                  </p>
                </Reveal>
              </div>

              {/* Feature 3 - Related invoice items */}
              <div
                id="feature-3"
                className="scroll-section py-32 min-h-screen flex flex-col justify-center"
              >
                <Reveal delay={0.3}>
                  <h2 className="text-[42px] leading-[1.1] tracking-[-0.02em] font-normal mb-6 text-black">
                    Related invoice items
                  </h2>
                  <p className="text-pretty text-zinc-700 text-lg/8 mb-8 max-w-xl">
                    Automatically relate certain services and products to
                    bookings, helping to automate the invoicing process.
                  </p>
                </Reveal>
              </div>

              {/* Feature 4 - Statements */}
              <div
                id="feature-4"
                className="scroll-section py-32 min-h-screen flex flex-col justify-center"
              >
                <Reveal delay={0.4}>
                  <h2 className="text-[42px] leading-[1.1] tracking-[-0.02em] font-normal mb-6 text-black">
                    Statements
                  </h2>
                  <p className="text-pretty text-zinc-700 text-lg/8 mb-8 max-w-xl">
                    Create account statements to see how much a client owes, has
                    paid, or both over a certain period of time.
                  </p>
                </Reveal>
              </div>

              {/* Feature 5 - Financial Reporting */}
              <div
                id="feature-5"
                className="scroll-section py-32 min-h-screen flex flex-col justify-center"
              >
                <Reveal delay={0.5}>
                  <h2 className="text-[42px] leading-[1.1] tracking-[-0.02em] font-normal mb-6 text-black">
                    Financial Reporting
                  </h2>
                  <p className="text-pretty text-zinc-700 text-lg/8 mb-8 max-w-xl">
                    Run reports for total revenue, outstanding invoices, and
                    daily/weekly/monthly payments.
                  </p>
                </Reveal>
              </div>

              {/* Feature 6 - Integration */}
              <div
                id="feature-6"
                className="scroll-section py-32 min-h-screen flex flex-col justify-center"
              >
                <Reveal delay={0.6}>
                  <h2 className="text-[42px] leading-[1.1] tracking-[-0.02em] font-normal mb-6 text-black">
                    Integration
                  </h2>
                  <p className="text-pretty text-zinc-700 text-lg/8 mb-8 max-w-xl">
                    Harbr's software integrates with all major accounting
                    software programs including Xero, Myob & Quickbooks.
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

                  {/* Feature 1 Image - Invoices */}
                  <motion.div
                    className="absolute top-0 right-0 w-full h-full flex items-center justify-end"
                    animate={{ opacity: activeFeature === 1 ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <img
                      src="/reservation1.png"
                      alt="Invoices"
                      className="w-full h-full object-contain rounded-lg shadow-lg"
                    />
                  </motion.div>

                  {/* Feature 2 Image - Batch Invoicing & Disbursements */}
                  <motion.div
                    className="absolute top-0 right-0 w-full h-full flex items-center justify-end"
                    animate={{ opacity: activeFeature === 2 ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <img
                      src="/screenshot-1.png"
                      alt="Batch Invoicing & Disbursements"
                      className="w-full h-full object-contain rounded-lg shadow-lg"
                    />
                  </motion.div>

                  {/* Feature 3 Image - Related invoice items */}
                  <motion.div
                    className="absolute top-0 right-0 w-full h-full flex items-center justify-end"
                    animate={{ opacity: activeFeature === 3 ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <img
                      src="/screenshot-2.webp"
                      alt="Related invoice items"
                      className="w-full h-full object-contain rounded-lg shadow-lg"
                    />
                  </motion.div>

                  {/* Feature 4 Image - Statements */}
                  <motion.div
                    className="absolute top-0 right-0 w-full h-full flex items-center justify-end"
                    animate={{ opacity: activeFeature === 4 ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <img
                      src="/Screenshot-23.png"
                      alt="Statements"
                      className="w-full h-full object-contain rounded-lg shadow-lg"
                    />
                  </motion.div>

                  {/* Feature 5 Image - Financial Reporting */}
                  <motion.div
                    className="absolute top-0 right-0 w-full h-full flex items-center justify-end"
                    animate={{ opacity: activeFeature === 5 ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <img
                      src="/Screenshot-24.png"
                      alt="Financial Reporting"
                      className="w-full h-full object-contain rounded-lg shadow-lg"
                    />
                  </motion.div>

                  {/* Feature 6 Image - Integration */}
                  <motion.div
                    className="absolute top-0 right-0 w-full h-full flex items-center justify-end"
                    animate={{ opacity: activeFeature === 6 ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <img
                      src="/Screenshot-25.png"
                      alt="Integration"
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
              Ready to streamline your financial operations?
            </h2>
            <p className="text-pretty text-zinc-600 text-lg/8 mb-8 max-w-2xl mx-auto">
              Experience comprehensive financial management with Harbr's
              integrated invoicing, reporting, and accounting software
              integration.
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
