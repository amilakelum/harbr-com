import { useEffect } from "react";
import FeaturesHero from "../components/FeaturesHero";
import ContentSections from "../components/ContentSections";
import FreeTrial from "../components/FreeTrial";

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
      <FeaturesHero
        title="Unlimited Free Support"
        description={
          <>
            <strong>
              We want you to think of the entire Harbr team as an extension of
              your marina management team.
            </strong>{" "}
            We are 100% committed to servicing your marina and ensuring that you
            are looked after throughout our entire partnership. Examples of our
            ongoing dedication to our customers from the start includes:
          </>
        }
        includeEmailForm={true}
        source="support_hero_section"
        buttonText="Get Support"
        placeholder="Enter your business email"
      />

      {/* Main Content */}
      <ContentSections sections={sections} />

      <FreeTrial />
    </>
  );
}
