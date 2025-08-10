import { useEffect } from "react";
import FeaturesHero from "../components/FeaturesHero";
import AIDynamicPricing from "../components/AIDynamicPricing";
import FeatureGrid from "../components/FeatureGrid";
import FinanceManagement from "../components/FinanceManagement";
import FeaturesCallout from "../components/FeaturesCallout";
import ReportingTracking from "../components/ReportingTracking";
import Integrations from "../components/Integrations";
import FreeTrial from "../components/FreeTrial";

export default function Features() {
  useEffect(() => {
    // Set the document title when the component mounts
    document.title = "Features | Harbr";

    return () => {
      // Optional cleanup if needed
    };
  }, []);

  return (
    <>
      <FeaturesHero />
      <AIDynamicPricing />
      <FeatureGrid />
      <FeaturesCallout />
      <FinanceManagement />
      <ReportingTracking />
      <Integrations />
      <FreeTrial />
    </>
  );
}
