import { useEffect } from "react";
import FeaturesHero from "../components/FeaturesHero";
import ContentSections from "../components/ContentSections";
import FreeTrial from "../components/FreeTrial";

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
      <FeaturesHero
        title="Harbr's AI Marina Manager"
        description={
          <>
            <strong>
              You know better than anyone what works for your marina.
            </strong>{" "}
            Harbr's AI Marina Manager learns your workflow and operates
            seamlessly in the background, becoming second nature to your marina
            operations. Our revolutionary marina management software combines an
            intelligent AI assistant with advanced automation to streamline your
            daily tasks and save valuable time.
          </>
        }
        includeEmailForm={true}
        source="ai_manager_hero_section"
        buttonText="Get started for free"
        placeholder="Enter your business email"
      />

      {/* Main Content */}
      <ContentSections sections={sections} />

      <FreeTrial />
    </>
  );
}
