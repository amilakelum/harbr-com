import { useEffect } from "react";
import FeaturePageHero from "../components/FeaturePageHero";
import FeatureParallaxSection from "../components/FeatureParallaxSection";
import FeaturePageCTA from "../components/FeaturePageCTA";

export default function CrmFeatures() {
  useEffect(() => {
    // Set the document title when the component mounts
    document.title = "CRM Features | Harbr";
  }, []);

  const features = [
    {
      id: "template-library",
      title: "Template Library",
      description:
        "Leverage AI to create, edit & save custom email and SMS templates for communicating with customers. Send directly from the Harbr platform - no more toggling between software and Outlook.",
    },
    {
      id: "automation",
      title: "Automation",
      description:
        "Set regular communications to customers, as well as reminders for expiring insurance, invoices, missing customer data & more.",
    },
    {
      id: "trip-history",
      title: "Trip history",
      description:
        "Record all previous bookings per customer to learn more about their reservation behavior.",
    },
    {
      id: "smart-notes-rating",
      title: "Smart Notes & Rating System",
      description:
        "Record notes on customers, vessels or bookings to generate insights into customer behavior. Rate customers to ensure a record of who you want back at your marina (and who you don't!).",
    },
  ];

  const images = [
    {
      id: "template-library-img",
      src: "/reservation1.png",
      alt: "Template Library",
    },
    {
      id: "automation-img",
      src: "/screenshot-1.png",
      alt: "Automation",
    },
    {
      id: "trip-history-img",
      src: "/screenshot-2.webp",
      alt: "Trip history",
    },
    {
      id: "smart-notes-img",
      src: "/Screenshot-23.png",
      alt: "Smart Notes & Rating System",
    },
  ];

  return (
    <>
      <FeaturePageHero
        title="CRM Features"
        description="Experience unprecedented access to your customers, powered by Harbr's AI Marina Manager."
        imageSrc="/crm1.png"
        imageAlt="CRM Features"
        source="crm_features_hero"
      />

      <FeatureParallaxSection features={features} images={images} />

      <FeaturePageCTA
        title="Ready to transform your customer relationships?"
        description="Experience the power of AI-driven customer relationship management with Harbr's comprehensive CRM system."
        source="crm_features_cta"
      />
    </>
  );
}
