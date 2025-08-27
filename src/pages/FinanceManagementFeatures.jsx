import { useEffect } from "react";
import FeaturePageHero from "../components/FeaturePageHero";
import FeatureParallaxSection from "../components/FeatureParallaxSection";
import FeaturePageCTA from "../components/FeaturePageCTA";

export default function FinanceManagementFeatures() {
  useEffect(() => {
    // Set the document title when the component mounts
    document.title = "Finance Management Features | Harbr";
  }, []);

  const features = [
    {
      id: "invoices",
      title: "Invoices",
      description: "Seamlessly create invoices from the booking calendar",
    },
    {
      id: "batch-invoicing",
      title: "Batch Invoicing & Disbursements",
      description:
        "Pay multiple invoices at a time or add multiple invoices to customer communications. Disburse funds to multiple berth owners with ease.",
    },
    {
      id: "related-invoice-items",
      title: "Related invoice items",
      description:
        "Automatically relate certain services and products to bookings, helping to automate the invoicing process.",
    },
    {
      id: "statements",
      title: "Statements",
      description:
        "Create account statements to see how much a client owes, has paid, or both over a certain period of time.",
    },
    {
      id: "financial-reporting",
      title: "Financial Reporting",
      description:
        "Run reports for total revenue, outstanding invoices, and daily/weekly/monthly payments.",
    },
    {
      id: "integration",
      title: "Integration",
      description:
        "Harbr's software integrates with all major accounting software programs including Xero, Myob & Quickbooks.",
    },
  ];

  const images = [
    {
      id: "invoices-img",
      src: "/reservation1.png",
      alt: "Invoices",
    },
    {
      id: "batch-invoicing-img",
      src: "/screenshot-1.png",
      alt: "Batch Invoicing & Disbursements",
    },
    {
      id: "related-items-img",
      src: "/screenshot-2.webp",
      alt: "Related invoice items",
    },
    {
      id: "statements-img",
      src: "/Screenshot-23.png",
      alt: "Statements",
    },
    {
      id: "reporting-img",
      src: "/Screenshot-24.png",
      alt: "Financial Reporting",
    },
    {
      id: "integration-img",
      src: "/Screenshot-25.png",
      alt: "Integration",
    },
  ];

  return (
    <>
      <FeaturePageHero
        title="Finance Management Features"
        description="Manage your invoices, payments, expenses, sales and more with Harbr's simple and comprehensive financial tools. You can work with confidence knowing all transactions are synced with your customer profiles, stored communications and trip history."
        imageSrc="/Finance1.png"
        imageAlt="Finance Management Features"
        source="finance_features_hero"
      />

      <FeatureParallaxSection features={features} images={images} />

      <FeaturePageCTA
        title="Ready to streamline your financial operations?"
        description="Experience comprehensive financial management with Harbr's integrated invoicing, reporting, and accounting software integration."
        source="finance_features_cta"
      />
    </>
  );
}
