import { useEffect } from "react";
import { motion } from "framer-motion";
import Reveal from "../components/animations/Reveal";

export default function AIManager() {
  useEffect(() => {
    document.title = "AI Marina Manager | Harbr";
  }, []);

  const sections = [
    {
      title: "Predictive Analytics & Optimisation",
      content:
        "Advanced AI algorithms that learn from your marina's unique patterns to optimize operations and maximize revenue potential.",
      features: [
        "Occupancy Forecasting: Predict busy periods using historical data and seasonal patterns",
        "Dynamic Pricing: Automatically adjust berth rates based on demand, weather, and events in your local area",
        "Berth Allocation Optimisation: Intelligently assign berths based on availability, vessel size, duration, and custom preferences",
        "Resource Planning: Forecast staffing needs and equipment requirements",
      ],
    },
    {
      title: "Automated Operations",
      content:
        "Streamline your daily operations with intelligent automation that handles routine tasks, allowing your team to focus on delivering exceptional customer service.",
      features: [
        "Smart Berth Assignment: Real-time berth matching for incoming reservations",
        "Automated Check-in/Check-out: GPS-triggered and/or QR Code availability for arrival notifications and billing automation",
        "Maintenance Scheduling: Predictive maintenance alerts based on usage patterns and sensor data (subject to hardware availability)",
        "Queue Management: Intelligent handling of peak periods and customer flow",
      ],
    },
    {
      title: "Customer Experience",
      content:
        "Enhance customer satisfaction with AI-powered personalization and 24/7 support that anticipates needs and delivers seamless service.",
      features: [
        "AI Chatbot: 24/7 customer support for bookings, inquiries, and basic troubleshooting integrated into your marina website",
        "Personalised Recommendations: Suggest services and amenities based on customer history",
        "Smart Notifications: Automated weather alerts, berth availability, and service reminders",
        "Wait List Management: Intelligent queue management for high-demand periods",
      ],
    },
    {
      title: "Business Intelligence",
      content:
        "Transform data into actionable insights with comprehensive analytics that drive strategic decision-making and business growth.",
      features: [
        "Revenue Analytics: Identify trends, optimize pricing strategies, and forecast income",
        "Customer Insights: Analyse behavior patterns and preferences for targeted marketing",
        "Operational Efficiency: Track KPIs and suggest process improvements",
        "Compliance Monitoring: Ensure regulatory adherence and documentation requirements",
      ],
    },
    {
      title: "Integration Capabilities",
      content:
        "Seamlessly connect with your existing systems and smart marina infrastructure for a unified, intelligent management platform.",
      features: [
        "IoT Sensor Integration: Connect with smart marina infrastructure and monitoring devices",
        "Payment Processing: Automated billing and payment reconciliation",
        "Third-party APIs: Weather services and navigation systems",
        "Mobile App Connectivity: Seamless smartphone integration for staff and customers",
      ],
    },
    {
      title: "Reporting & Analytics",
      content:
        "Comprehensive reporting suite that provides real-time insights and long-term strategic planning capabilities for informed decision making.",
      features: [
        "Executive Dashboards: Real-time KPI monitoring and performance metrics",
        "Custom Reports: Automated generation of financial, operational, and compliance reports",
        "Trend Analysis: Long-term pattern recognition for strategic planning",
        "ROI Tracking: Measure effectiveness of AI recommendations and optimisations",
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
              Harbr's AI Marina Manager
            </h1>
            <p className="text-lg mb-8 max-w-3xl mx-auto text-zinc-600">
              <strong>
                You know better than anyone what works for your marina.
              </strong>{" "}
              Harbr's AI Marina Manager learns your workflow and operates
              seamlessly in the background, becoming second nature to your
              marina operations. Our revolutionary marina management software
              combines an intelligent AI assistant with advanced automation to
              streamline your daily tasks and save valuable time.
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
      {/* <div className="bg-gray-50 py-16 lg:py-20 border-t border-gray-200">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <Reveal delay={0.1}>
            <h2 className="text-[46px] leading-[1.1] tracking-[-0.02em] font-normal mb-4 text-black">
              Ready to Experience AI-Powered Marina Management?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover how Harbr's AI Marina Manager can transform your
              operations, increase efficiency, and boost revenue with
              intelligent automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 font-medium border-2 rounded-md px-8 py-4 bg-[#5774f5] text-white border-[#5774f5] transition-all duration-200 hover:bg-[#4a63d8] hover:border-[#4a63d8]"
              >
                Schedule AI Demo
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 16.1 31.59"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-label="Arrow"
                >
                  <title>Arrow</title>
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
                Learn More About AI Features
              </motion.button>
            </div>
          </Reveal>
        </div>
      </div> */}

      {/* AI Capabilities Timeline */}
    </>
  );
}
