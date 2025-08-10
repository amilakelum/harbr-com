import { useEffect } from "react";
import { motion } from "framer-motion";
import Reveal from "../components/animations/Reveal";

export default function Support() {
  useEffect(() => {
    document.title = "Support | Harbr";
  }, []);

  const sections = [
    {
      title: "Launch Support",
      content:
        "The important part, because we are dedicated to ongoing support for our customers not simply selling you our software and disappearing over the horizon…",
      features: [
        "Dedicated Success Manager: Personal point of contact during transition period to Harbr software",
        "Progress Tracking: Real-time onboarding milestone monitoring",
        "Quick Start Guide: Essential daily operations checklist",
        "30-Day Health Check: Performance review and optimisation recommendations",
        "24/7 Support Access: Dedicated onboarding support during first 30 days",
      ],
    },
    {
      title: "Ongoing Support",
      content:
        "We provide comprehensive ongoing support to ensure your success with Harbr throughout your entire partnership with us.",
      features: [
        "Interactive Training Modules: Self-paced learning for core software functions",
        "Live Demo Sessions: Scheduled training calls with implementation specialists",
        "Video Tutorial Library: Comprehensive how-to guides for all Harbr's major features",
        "Direct Phone Support: Call us anytime with questions or feedback!",
      ],
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="relative isolate px-6 py-24 lg:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal delay={0.1}>
            <h1 className="text-[50px] sm:text-[48px] lg:text-[52px] leading-[1.1] tracking-[-0.02em] font-bold mb-6">
              Unlimited Free Support
            </h1>
            <p className="text-lg mb-8 max-w-3xl mx-auto text-zinc-600">
              We want you to think of the entire Harbr team as an extension of
              your marina management team. We are 100% committed to servicing
              your marina and ensuring that you are looked after throughout our
              entire partnership. Examples of our ongoing dedication to our
              customers from the start includes:
            </p>
          </Reveal>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          {sections.map((section, index) => (
            <Reveal key={section.title} delay={0.1 + index * 0.1}>
              <div className="mb-16 last:mb-0">
                {/* Section Header */}
                <div className="mb-8">
                  <h2 className="text-[46px] leading-[1.1] tracking-[-0.02em] font-normal mb-4 text-black">
                    {section.title}
                  </h2>
                  <p className="text-lg text-zinc-600 leading-relaxed">
                    {section.content}
                  </p>
                </div>

                {/* Features List */}
                {section.features && (
                  <div className="space-y-4">
                    {section.features.map((feature, featureIndex) => {
                      const [title, description] = feature.split(": ");
                      return (
                        <motion.div
                          key={`${section.title}-${featureIndex}`}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: featureIndex * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#5774f5] transition-colors duration-200"
                        >
                          {/* Icon */}
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-2 h-2 bg-[#5774f5] rounded-full" />
                          </div>
                          {/* Content */}
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {title}
                            </h3>
                            {description && (
                              <p className="text-gray-600 text-sm leading-relaxed">
                                {description}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}

                {/* Separator */}
                {index < sections.length - 1 && (
                  <div className="mt-16 pt-8 border-t border-gray-200" />
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      {/* <div className=" py-16 lg:py-20 ">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <Reveal delay={0.1}>
            <h2 className="text-[46px] leading-[1.1] tracking-[-0.02em] font-normal mb-4 text-black">
              Ready to Get Help?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Our support team is standing by to help you with any questions
              about Harbr. Get in touch and experience our award-winning
              customer service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 font-medium border-2 rounded-md px-8 py-4 bg-[#5774f5] text-white border-[#5774f5] transition-all duration-200 hover:bg-[#4a63d8] hover:border-[#4a63d8]"
              >
                Start Live Chat
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 16.1 31.59"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-label="Arrow"
                >
                  <path
                    d="M.5 31.09l15.1-15.3L.5.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 font-medium border-2 rounded-md px-8 py-4 bg-transparent text-[#5774f5] border-[#5774f5] transition-all duration-200 hover:bg-[#5774f5] hover:text-white"
              >
                Contact Support Team
              </motion.button>
            </div>
          </Reveal>
        </div>
      </div> */}

      {/* Support Timeline */}
    </>
  );
}
