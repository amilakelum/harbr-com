import { useEffect } from "react";
import FeaturePageHero from "../components/FeaturePageHero";
import FeatureParallaxSection from "../components/FeatureParallaxSection";
import FeaturePageCTA from "../components/FeaturePageCTA";

export default function BookingsFeatures() {
  useEffect(() => {
    // Set the document title when the component mounts
    document.title = "Bookings & Berth Management | Harbr";
  }, []);

  const features = [
    {
      id: "online-bookings",
      title: "Online Bookings",
      description:
        "Harbr's customisable online booking and customer portal means you set the level of access your customers have to view availability, pricing & book online. Offer your customers a simple online calendar only to minimise phone enquires for availability, or make money while you sleep with a full end to end online booking function that integrates with your current marina website.",
    },
    {
      id: "calendar-view",
      title: "Calendar view",
      description:
        "Prefer to manually manage bookings? Easily view berth availability & apply filters to match customers booking requests",
    },
    {
      id: "customisable-dashboard",
      title: "Customisable Dashboard",
      description:
        "Harbr's main dashboard is customisable allowing you to choose the data you want to see. Think vessel movements for the day, invoices due or outstanding, insurances due to expire & more.",
    },
    {
      id: "one-click-editing",
      title: "One click editing",
      description:
        "Renew, extend or cancel bookings with one click. Re-allocate vessels to different berths with ease.",
    },
    {
      id: "find-add-customers",
      title: "Quickly find and add customers",
      description: "Harbr's clever search autocompletes names as you type.",
    },
    {
      id: "automated-emails-sms",
      title: "Set up automated emails and SMS",
      description:
        "Messages to customers at any point during their marina experience. You can customise follow-up messages to reach the specific customers that you want, at intervals that you choose. No more manually chasing expired insurance or overdue invoices.",
    },
  ];

  const images = [
    {
      id: "online-bookings-img",
      src: "/reservation1.png",
      alt: "Online Bookings",
    },
    {
      id: "calendar-view-img",
      src: "/screenshot-1.png",
      alt: "Calendar view",
    },
    {
      id: "dashboard-img",
      src: "/screenshot-2.webp",
      alt: "Customisable Dashboard",
    },
    {
      id: "editing-img",
      src: "/Screenshot-23.png",
      alt: "One click editing",
    },
    {
      id: "customers-img",
      src: "/Screenshot-24.png",
      alt: "Quickly find and add customers",
    },
    {
      id: "automation-img",
      src: "/Screenshot-25.png",
      alt: "Set up automated emails and SMS",
    },
  ];

  return (
    <>
      <FeaturePageHero
        title="Bookings & Berth Management"
        description="With Harbr you can assign and manage marina berths to customers with ease, as well as streamline customer, vessel & payment data entry. Add & remove berths to the rental pool with one click & manage availability like never before."
        imageSrc="/BookingandBerth.png"
        imageAlt="Bookings & Berth Management"
        source="bookings_features_hero"
      />

      <FeatureParallaxSection features={features} images={images} />

      <FeaturePageCTA
        title="Ready to transform your marina operations?"
        description="Experience the power of AI-driven marina management with Harbr's comprehensive booking and berth management system."
        source="bookings_features_cta"
      />
    </>
  );
}
