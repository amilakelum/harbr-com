import { useEffect } from "react";
import FeaturePageHero from "../components/FeaturePageHero";
import FeatureParallaxSection from "../components/FeatureParallaxSection";
import FeaturePageCTA from "../components/FeaturePageCTA";

export default function OnlineBookingsFeatures() {
  useEffect(() => {
    // Set the document title when the component mounts
    document.title = "Online Bookings & Customer Portal | Harbr";
  }, []);

  const features = [
    {
      id: "online-bookings",
      title: "Online Bookings",
      description:
        "With Harbr you can take bookings 24/7, reducing the time you or your marina staff spend taking bookings over the phone—and it's all automatically synchronised with real time berth availability. Customers can also view your marina documents such as berth agreements, marina map, information & more.",
    },
    {
      id: "customer-portal",
      title: "Customer Portal",
      description:
        "Customers can view their boat & vehicle info, reservations, payment details, invoices due/paid and clearly see where they are paid up to, minimising enquiries to the marina office. Let Harbr's customer portal automate time intensive tasks traditionally completed over the phone or via emails to customers.",
    },
    {
      id: "secure-payments",
      title: "Secure Payments",
      description:
        "All payments via online bookings or through the customer portal are processed securely by STRIPE, the same payment processor used by Air Bnb, Uber & others. Rest easy knowing your customers payment details and info are securely stored.",
    },
    {
      id: "your-brand",
      title: "Our Tech, Your Brand",
      description:
        "Harbr's tech operates seamlessly in the back end, ensuring your marina & brand shine through. All Online Booking & customer portal tech can be branded in accordance with your internal branding guidelines.",
    },
  ];

  const images = [
    {
      id: "online-bookings-img",
      src: "/reservation1.png",
      alt: "Online Bookings",
    },
    {
      id: "customer-portal-img",
      src: "/screenshot-1.png",
      alt: "Customer Portal",
    },
    {
      id: "secure-payments-img",
      src: "/screenshot-2.webp",
      alt: "Secure Payments",
    },
    {
      id: "your-brand-img",
      src: "/Screenshot-23.png",
      alt: "Our Tech, Your Brand",
    },
  ];

  return (
    <>
      <FeaturePageHero
        title="Online Bookings & Customer Portal"
        description="Harbr's customizable online booking and customer portal means you set the level of access your customers have to view availability, pricing & book online. Offer your customers a simple online calendar only to minimise phone enquiries for availability, or make money while you sleep with a full end to end online booking function that integrates with your current marina website."
        imageSrc="/onlineBooking.png"
        imageAlt="Online Bookings & Customer Portal"
        source="online_bookings_features_hero"
      />

      <FeatureParallaxSection features={features} images={images} />

      <FeaturePageCTA
        title="Ready to streamline your booking process?"
        description="Experience the power of 24/7 online bookings and automated customer portal with Harbr's comprehensive marina management system."
        source="online_bookings_features_cta"
      />
    </>
  );
}
