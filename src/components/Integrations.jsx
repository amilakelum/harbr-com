import Reveal from "./animations/Reveal";
import { motion } from "framer-motion";

export default function Integrations() {
  const integrations = [
    {
      name: "MYOB",
      description:
        "Seamless accounting integration for comprehensive financial management.",
      logo: "/myob-seeklogo.png", // Placeholder - replace with actual MYOB logo
    },
    {
      name: "Xero",
      description:
        "Real-time synchronization with your existing accounting workflows.",
      logo: "/xero-seeklogo.png", // Placeholder - replace with actual Xero logo
    },
    {
      name: "QuickBooks",
      description:
        "Comprehensive accounting integration with automated bookkeeping.",
      logo: "/quickbooks.png", // Placeholder - replace with actual QuickBooks logo
    },
    {
      name: "Tallykey",
      description: "Advanced metering & utilities system connectivity.",
      logo: "/tallykey.png", // Placeholder - replace with actual Tallykey logo
    },
    {
      name: "Integriti",
      description:
        "Secure access infrastructure integration for enhanced security.",
      logo: "/Intigriti.png", // Placeholder - replace with actual Integriti logo
    },
    {
      name: "Custom APIs",
      description: "We'll build custom integrations for your specific needs.",
      logo: "/API.png", // Placeholder - replace with custom API icon
    },
  ];

  return (
    <div className="relative isolate px-6 py-16 lg:px-8 bg-[#E1EFFF]">
      <div className="container mx-auto">
        <div className="mx-auto max-w-7xl">
          {/* Header Section */}
          <div className="text-center mb-16">
            <Reveal delay={0.1}>
              <h2 className="text-[46px] leading-[1.1] tracking-[-0.02em] font-normal mb-8">
                Integrations
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-pretty text-zinc-600 text-base font-normal sm:text-lg/8 max-w-4xl mx-auto mb-8">
                <strong>
                  Harbr can integrate with most apps and online tools that
                  support API Integration.
                </strong>{" "}
                If we don't have an existing integration you need, we will do
                everything we can to build one. Harbr's overarching goal is to
                be one operating system that consolidates everything from
                accounting (MYOB, Xero, QuickBooks etc), metering & utilities
                systems (Tallykey etc.) as well as secure access infrastructure
                (integriti etc.)
              </p>
            </Reveal>
          </div>

          {/* Integration Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {integrations.map((integration, index) => (
              <Reveal delay={0.3 + index * 0.1} key={integration.name}>
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <div className="p-8 h-full flex flex-col text-center">
                    {/* Logo Section */}
                    <div className="mb-6">
                      <div className="w-48 h-48 mx-auto mb-4 rounded-2xl flex items-center justify-center">
                        <img
                          src={integration.logo}
                          alt={`${integration.name} logo`}
                          className="w-40 h-40 object-contain"
                        />
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-grow">
                      <h3 className="text-2xl font-semibold text-black tracking-[-0.02em] mb-4">
                        {integration.name}
                      </h3>
                      <p className="text-zinc-600 text-base font-normal">
                        {integration.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Call to Action */}
          {/* <Reveal delay={0.9}>
            <div className="text-center">
              <p className="text-lg mb-6 text-zinc-600">
                Don't see the integration you need?
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="inline-flex items-center justify-center rounded-xl bg-black px-8 py-4 text-base font-semibold text-white shadow-md hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black transition-all duration-200 ease-in-out cursor-pointer"
                onClick={() => {
                  window.open(
                    "mailto:chris@harbrapp.com?subject=Custom%20Integration%20Request",
                    "_blank"
                  );
                }}
              >
                Request Custom Integration
              </motion.button>
            </div>
          </Reveal> */}
        </div>
      </div>
    </div>
  );
}
