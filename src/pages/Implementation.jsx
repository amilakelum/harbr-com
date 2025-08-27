import { useEffect } from "react";
import FeaturesHero from "../components/FeaturesHero";
import ContentSections from "../components/ContentSections";
import FreeTrial from "../components/FreeTrial";

export default function Implementation() {
  useEffect(() => {
    document.title = "Implementation | Harbr";
  }, []);

  const sections = [
    {
      title: "Initial Setup & Configuration",
      content:
        "We work with you and your marina team on marina profile creation, basic configuration, berth/pier set up & mapping and price configuration for berth rental and other products & services.",
    },
    {
      title: "Data Migration & Import",
      content:
        "We have onboarded marinas from all major marina management software programs, meaning your switch to Harbr won't be a painful experience.",
      features: [
        "Legacy Data Import: Automated migration from existing systems (Excel, MYOB, Xero, competitors)",
        "Customer Database Transfer: Bulk import of existing customer records and contact information",
        "Berth Assignment Migration: Transfer current berth allocations and lease agreements",
        "Financial Data Import: Historical billing, payments, and accounting records integration",
      ],
    },
    {
      title: "Integration & Customisation",
      content:
        "We also ensure that any and all existing integrations and customisations are operating correctly prior to going live.",
      features: [
        "Payment Gateway Setup: Connect existing merchant accounts and billing systems",
        "Email/SMS Configuration: Automated notification templates and communication setup",
        "Custom Fields Creation: Tailor forms and records to specific marina needs",
        "Third-party Integrations: Connect accounting software, weather services etc.",
      ],
    },
    {
      title: "Testing & Validation",
      content:
        "Rest easy knowing your Harbr experience will be flawless, prior to switching any existing software programs off. Our onboarding process includes:",
      features: [
        "Sandbox Environment: Safe testing space to practice before going live",
        "Data Verification Tools: Automated checks to ensure import accuracy",
        "Trial Run Mode: Simulate operations without affecting real data or interactions with customers",
        "Go-Live Checklist: Comprehensive readiness assessment before launch",
      ],
    },
    {
      title: "Launch Support",
      content:
        "The important part, because we are dedicated to ongoing support for our customers not simply selling you our software and disappearing over the horizon…",
      features: [
        "Dedicated Success Manager: Personal point of contact during transition period",
        "Progress Tracking: Real-time onboarding milestone monitoring",
        "Quick Start Guide: Essential daily operations checklist",
        "30-Day Health Check: Performance review and optimisation recommendations",
      ],
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <FeaturesHero
        title="Hassle-free Implementation"
        description={
          <>
            <strong>
              Switching to Harbr doesn't need to be a painful experience.
            </strong>{" "}
            We handle the entire process meaning you can focus on your
            customers. Onboarding is also completely free of charge – simple.
          </>
        }
        includeEmailForm={true}
        source="implementation_hero_section"
        buttonText="Get started for free"
        placeholder="Enter your business email"
      />

      {/* Main Content */}
      <ContentSections sections={sections} />

      <FreeTrial />
    </>
  );
}
