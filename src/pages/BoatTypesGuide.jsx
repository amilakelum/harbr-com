import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Reveal from "../components/animations/Reveal";

export default function BoatTypesGuide() {
  const { slug } = useParams();
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    document.title = "Complete Guide to Different Types of Boats | Harbr Blog";
  }, []);

  // Intersection Observer for highlighting active section
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          }
        },
        {
          rootMargin: "-20% 0px -60% 0px",
          threshold: 0.1,
        }
      );

      // Observe all heading elements
      const headings = document.querySelectorAll("h2[id], h3[id]");
      for (const heading of headings) {
        observer.observe(heading);
      }

      return () => {
        observer.disconnect();
      };
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const tableOfContents = [
    {
      title: "Recreational Powerboats",
      id: "recreational-powerboats",
    },
    {
      title: "  ↳ Bowriders",
      id: "bowriders",
    },
    {
      title: "  ↳ Center Console Boats",
      id: "center-console",
    },
    {
      title: "  ↳ Pontoon Boats",
      id: "pontoon-boats",
    },
    {
      title: "  ↳ Cuddy Cabin Boats",
      id: "cuddy-cabin",
    },
    {
      title: "Sailboats: Harnessing Wind Power",
      id: "sailboats",
    },
    {
      title: "  ↳ Day Sailers",
      id: "day-sailers",
    },
    {
      title: "  ↳ Cruising Sailboats",
      id: "cruising-sailboats",
    },
    {
      title: "  ↳ Racing Sailboats",
      id: "racing-sailboats",
    },
    {
      title: "Luxury and Cruising Vessels",
      id: "luxury-cruising",
    },
    {
      title: "  ↳ Motor Yachts",
      id: "motor-yachts",
    },
    {
      title: "  ↳ Trawlers",
      id: "trawlers",
    },
    {
      title: "  ↳ Express Cruisers",
      id: "express-cruisers",
    },
    {
      title: "Specialized Watercraft",
      id: "specialized-watercraft",
    },
    {
      title: "  ↳ Personal Watercraft (PWC)",
      id: "personal-watercraft",
    },
    {
      title: "  ↳ Wake/Surf Boats",
      id: "wake-surf-boats",
    },
    {
      title: "  ↳ Bass Boats",
      id: "bass-boats",
    },
    {
      title: "Commercial and Working Vessels",
      id: "commercial-working",
    },
    {
      title: "Choosing Your Perfect Boat",
      id: "choosing-perfect-boat",
    },
    {
      title: "The Bottom Line",
      id: "bottom-line",
    },
  ];

  return (
    <article className="min-h-screen bg-white">
      {/* Header Section */}
      <div className=" px-6 py-16 lg:py-24 lg:px-8">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center">
          <Reveal delay={0.1}>
            {/* Category Tag */}
            <div className="mb-6">
              <span
                className="inline-flex items-center text-xs font-bold uppercase tracking-wide"
                style={{ fontSize: "16px", lineHeight: "22px" }}
              >
                BOAT TYPES & BUYING GUIDE
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.1] tracking-[-0.02em] font-bold mb-6"
              style={{ fontSize: "50px", lineHeight: "54px" }}
            >
              Harbr's Complete Guide to Different Types of Boats: Finding Your
              Perfect Vessel
            </h1>

            {/* Meta Information */}
            <div className="text-center text-sm  mb-8">
              <div className="flex items-center justify-center mb-2">
                <span style={{ fontSize: "16px", lineHeight: "22px" }}>
                  By{" "}
                </span>
                <span
                  className="font-medium mx-1 underline decoration-black"
                  style={{ fontSize: "16px", lineHeight: "22px" }}
                >
                  Michael Chen
                </span>
                <span
                  className="mx-2"
                  style={{ fontSize: "16px", lineHeight: "22px" }}
                >
                  •
                </span>
                <span style={{ fontSize: "16px", lineHeight: "22px" }}>
                  Reviewed by{" "}
                </span>
                <span
                  className="font-medium  mx-1 underline"
                  style={{ fontSize: "16px", lineHeight: "22px" }}
                >
                  Akila
                </span>
              </div>
              <div className="flex items-center justify-center mt-[16px]">
                <span style={{ fontSize: "16px", lineHeight: "22px" }}>
                  January 20, 2025
                </span>
                <span
                  className="mx-2"
                  style={{ fontSize: "16px", lineHeight: "22px" }}
                >
                  •
                </span>
                <span style={{ fontSize: "16px", lineHeight: "22px" }}>
                  12 min read
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Table of Contents - Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Reveal delay={0.2}>
                <div className="bg-zinc-50 rounded-lg p-6">
                  <h3 className="font-semibold text-zinc-900 mb-4">Contents</h3>
                  <nav>
                    <ul className="space-y-2">
                      {tableOfContents.map((item) => {
                        const isActive = activeSection === item.id;
                        const isSubItem = item.title.startsWith("  ↳");
                        return (
                          <li key={item.id}>
                            <button
                              type="button"
                              onClick={() => scrollToSection(item.id)}
                              className={`text-sm text-left block w-full transition-all duration-200 py-1 px-2 rounded ${
                                isActive
                                  ? "text-[#054ada] font-medium"
                                  : "text-zinc-600 hover:text-zinc-900"
                              } ${isSubItem ? "ml-3 text-xs" : ""}`}
                              style={{
                                backgroundColor: isActive
                                  ? "rgba(5, 74, 218, .06)"
                                  : "transparent",
                                fontStyle: "normal",
                                fontWeight: "400",
                                fontSize: "15px",
                                lineHeight: "20px",
                              }}
                              onMouseEnter={(e) => {
                                if (!isActive) {
                                  e.target.style.color = "#f80";
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (!isActive) {
                                  e.target.style.color = "";
                                }
                              }}
                            >
                              {item.title}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Article Content */}
          <div className="lg:col-span-3">
            <div className="prose prose-lg max-w-none">
              {/* Hero Image */}
              <div className="mb-8">
                <img
                  src="/different-type-of-boat.png"
                  alt="Different types of boats - Complete guide to choosing your perfect vessel"
                  className="w-3/4 h-auto rounded-lg shadow-lg mb-8 mx-auto"
                />
              </div>

              {/* Introduction */}
              <div className="mb-8">
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  The world of boating offers an incredible variety of vessels,
                  each designed for specific purposes and adventures. Whether
                  you're a first-time buyer or seasoned mariner looking to
                  expand your fleet, understanding different boat types helps
                  you choose the perfect vessel for your needs.
                </p>
              </div>

              {/* Recreational Powerboats Section */}
              <div className="mb-12">
                <h2
                  id="recreational-powerboats"
                  className="font-bold text-zinc-900 mt-12 mb-6 scroll-mt-24"
                  style={{ fontSize: "50px", lineHeight: "54px" }}
                >
                  Recreational Powerboats
                </h2>

                <h3
                  id="bowriders"
                  className="text-xl lg:text-2xl font-semibold text-zinc-900 mt-8 mb-4 scroll-mt-24"
                  style={{ fontSize: "38px", lineHeight: "42px" }}
                >
                  Bowriders
                </h3>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  The Swiss Army knife of recreational boating, bowriders
                  feature open seating in the bow area and are perfect for
                  families. With versatile layouts accommodating 6-10 people,
                  they're ideal for water sports, day cruising, and
                  entertaining. Most range from 18-35 feet and offer a great
                  balance of performance and comfort.
                </p>

                <h3
                  id="center-console"
                  className="text-xl lg:text-2xl font-semibold text-zinc-900 mt-8 mb-4 scroll-mt-24"
                  style={{ fontSize: "38px", lineHeight: "42px" }}
                >
                  Center Console Boats
                </h3>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Favoured by fishing enthusiasts, these boats feature a central
                  helm station providing 360-degree access around the vessel.
                  Excellent for offshore fishing, diving, and water sports, they
                  typically range from 15-45 feet. The open layout maximises
                  fishing space while providing excellent visibility and
                  manoeuvrability.
                </p>

                <h3
                  id="pontoon-boats"
                  className="text-xl lg:text-2xl font-semibold text-zinc-900 mt-8 mb-4 scroll-mt-24"
                  style={{ fontSize: "38px", lineHeight: "42px" }}
                >
                  Pontoon Boats
                </h3>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Built for relaxation and entertaining, pontoons feature flat
                  decks supported by two or three pontoons. They're incredibly
                  stable, spacious, and perfect for calm water cruising,
                  swimming, and family gatherings. Modern pontoons can be
                  surprisingly fast and luxurious, with some featuring full bars
                  and premium amenities.
                </p>

                <h3
                  id="cuddy-cabin"
                  className="text-xl lg:text-2xl font-semibold text-zinc-900 mt-8 mb-4 scroll-mt-24"
                  style={{ fontSize: "38px", lineHeight: "42px" }}
                >
                  Cuddy Cabin Boats
                </h3>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Offering the best of both worlds, cuddies provide an enclosed
                  cabin space below deck while maintaining an open cockpit area.
                  Perfect for overnight trips and weather protection, they
                  typically range from 20-35 feet and suit families wanting
                  basic overnight capabilities.
                </p>
              </div>

              {/* Sailboats Section */}
              <div className="mb-12">
                <h2
                  id="sailboats"
                  className="font-bold text-zinc-900 mt-12 mb-6 scroll-mt-24"
                  style={{ fontSize: "50px", lineHeight: "54px" }}
                >
                  Sailboats: Harnessing Wind Power
                </h2>

                <h3
                  id="day-sailers"
                  className="text-xl lg:text-2xl font-semibold text-zinc-900 mt-8 mb-4 scroll-mt-24"
                  style={{ fontSize: "38px", lineHeight: "42px" }}
                >
                  Day Sailers
                </h3>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Smaller sailboats (14-25 feet) designed for single-day
                  adventures. They're easy to handle, often trailerable, and
                  perfect for learning to sail or quick recreational outings on
                  lakes and protected waters.
                </p>

                <h3
                  id="cruising-sailboats"
                  className="text-xl lg:text-2xl font-semibold text-zinc-900 mt-8 mb-4 scroll-mt-24"
                  style={{ fontSize: "38px", lineHeight: "42px" }}
                >
                  Cruising Sailboats
                </h3>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Built for comfort and extended voyages, these vessels (25-60+
                  feet) feature full living accommodations including galleys,
                  sleeping quarters, and heads. They're designed for multi-day
                  trips and can handle various weather conditions with proper
                  seamanship.
                </p>

                <h3
                  id="racing-sailboats"
                  className="text-xl lg:text-2xl font-semibold text-zinc-900 mt-8 mb-4 scroll-mt-24"
                  style={{ fontSize: "38px", lineHeight: "42px" }}
                >
                  Racing Sailboats
                </h3>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Purpose-built for speed and performance, racing boats
                  sacrifice comfort for competitive advantage. They feature
                  lightweight construction, advanced sail systems, and minimal
                  accommodations to maximize speed and handling.
                </p>
              </div>

              {/* Luxury and Cruising Vessels Section */}
              <div className="mb-12">
                <h2
                  id="luxury-cruising"
                  className="font-bold text-zinc-900 mt-12 mb-6 scroll-mt-24"
                  style={{ fontSize: "50px", lineHeight: "54px" }}
                >
                  Luxury and Cruising Vessels
                </h2>

                <h3
                  id="motor-yachts"
                  className="text-xl lg:text-2xl font-semibold text-zinc-900 mt-8 mb-4 scroll-mt-24"
                  style={{ fontSize: "38px", lineHeight: "42px" }}
                >
                  Motor Yachts
                </h3>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  The ultimate in luxury boating, motor yachts typically exceed
                  35 feet and feature multiple staterooms, full galleys,
                  entertainment systems, and crew quarters on larger vessels.
                  They're designed for extended cruising in comfort and style.
                </p>

                <h3
                  id="trawlers"
                  className="text-xl lg:text-2xl font-semibold text-zinc-900 mt-8 mb-4 scroll-mt-24"
                  style={{ fontSize: "38px", lineHeight: "42px" }}
                >
                  Trawlers
                </h3>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Built for fuel efficiency and long-range cruising, trawlers
                  feature displacement hulls that move through water rather than
                  over it. They're perfect for extended voyages at slower speeds
                  and often include full living accommodations with excellent
                  storage.
                </p>

                <h3
                  id="express-cruisers"
                  className="text-xl lg:text-2xl font-semibold text-zinc-900 mt-8 mb-4 scroll-mt-24"
                  style={{ fontSize: "38px", lineHeight: "42px" }}
                >
                  Express Cruisers
                </h3>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Combining speed with overnight capabilities, express cruisers
                  feature sleek profiles with enclosed cabin space. They're
                  perfect for weekend getaways and offer a good balance of
                  performance and accommodation.
                </p>
              </div>

              {/* Specialized Watercraft Section */}
              <div className="mb-12">
                <h2
                  id="specialized-watercraft"
                  className="font-bold text-zinc-900 mt-12 mb-6 scroll-mt-24"
                  style={{ fontSize: "50px", lineHeight: "54px" }}
                >
                  Specialized Watercraft
                </h2>

                <h3
                  id="personal-watercraft"
                  className="text-xl lg:text-2xl font-semibold text-zinc-900 mt-8 mb-4 scroll-mt-24"
                  style={{ fontSize: "38px", lineHeight: "42px" }}
                >
                  Personal Watercraft (PWC)
                </h3>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Jet-powered vessels designed for one to three riders, PWCs
                  offer thrilling performance and easy handling. Modern models
                  can exceed 60+ mph and feature advanced technology including
                  GPS, sound systems, and storage compartments. They are also
                  increasingly being adopted by fishing enthusiasts.
                </p>

                <h3
                  id="wake-surf-boats"
                  className="text-xl lg:text-2xl font-semibold text-zinc-900 mt-8 mb-4 scroll-mt-24"
                  style={{ fontSize: "38px", lineHeight: "42px" }}
                >
                  Wake/Surf Boats
                </h3>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Specifically designed for water sports, these boats create
                  large, clean wakes for wakeboarding and wake surfing. They
                  feature ballast systems to adjust wake size and shape, premium
                  sound systems, and specialised hull designs.
                </p>

                <h3
                  id="bass-boats"
                  className="text-xl lg:text-2xl font-semibold text-zinc-900 mt-8 mb-4 scroll-mt-24"
                  style={{ fontSize: "38px", lineHeight: "42px" }}
                >
                  Bass Boats
                </h3>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Purpose-built for freshwater fishing, bass boats feature low
                  profiles, powerful outboard engines, and specialized fishing
                  equipment including live wells, rod storage, and fish finders.
                  They're designed for accessing shallow waters and tournament
                  fishing.
                </p>
              </div>

              {/* Commercial and Working Vessels Section */}
              <div className="mb-12">
                <h2
                  id="commercial-working"
                  className="font-bold text-zinc-900 mt-12 mb-6 scroll-mt-24"
                  style={{ fontSize: "50px", lineHeight: "54px" }}
                >
                  Commercial and Working Vessels
                </h2>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  <span className="font-semibold">Fishing Boats:</span> From
                  small aluminium skiffs to large offshore sportfishers, fishing
                  boats are designed around their primary purpose. Features
                  include fish boxes, outriggers, live wells, and specialised
                  electronics for locating fish.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  <span className="font-semibold">Tugboats:</span> Powerful
                  vessels designed for pushing or pulling other vessels and
                  barges. Despite their size, they're incredibly powerful and
                  manoeuvrable, essential for harbour operations worldwide.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  <span className="font-semibold">
                    Ferries and Water Taxis:
                  </span>{" "}
                  Designed for passenger transport, these vessels prioritize
                  safety, capacity, and schedule reliability over recreational
                  features.
                </p>
              </div>

              {/* Choosing Your Perfect Boat Section */}
              <div className="mb-12">
                <h2
                  id="choosing-perfect-boat"
                  className="font-bold text-zinc-900 mt-12 mb-6 scroll-mt-24"
                  style={{ fontSize: "50px", lineHeight: "54px" }}
                >
                  Choosing Your Perfect Boat
                </h2>

                <h3 className="text-xl lg:text-2xl font-semibold text-zinc-900 mt-8 mb-4">
                  Consider Your Primary Use:
                </h3>
                <ul className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg list-disc pl-6">
                  <li>
                    <strong>Family recreation:</strong> Bowriders, cuddy cabins
                    or pontoons (calm water)
                  </li>
                  <li>
                    <strong>Fishing:</strong> Center console, cuddy cabins or
                    bass boats
                  </li>
                  <li>
                    <strong>Luxury cruising:</strong> Motor yacht or express
                    cruiser
                  </li>
                  <li>
                    <strong>Adventure sailing:</strong> Cruising sailboat
                  </li>
                  <li>
                    <strong>Water sports:</strong> Wake boat or PWC
                  </li>
                </ul>

                <h3 className="text-xl lg:text-2xl font-semibold text-zinc-900 mt-8 mb-4">
                  Think About Your Waters:
                </h3>
                <ul className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg list-disc pl-6">
                  <li>
                    <strong>Calm lakes:</strong> Pontoons, bass boats, day
                    sailers
                  </li>
                  <li>
                    <strong>Coastal waters:</strong> Center console, cuddy
                    cabin, cruising sailboat
                  </li>
                  <li>
                    <strong>Open ocean:</strong> Offshore sportfisher, motor
                    yacht, blue water sailboat
                  </li>
                </ul>

                <h3 className="text-xl lg:text-2xl font-semibold text-zinc-900 mt-8 mb-4">
                  Budget Considerations:
                </h3>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Remember that purchase price is just the beginning. Factor in
                  insurance, maintenance, storage, fuel, and equipment when
                  budgeting for boat ownership. A common estimate of annual
                  maintenance fees is 10% - 15% of the boat value each year.
                </p>
              </div>

              {/* The Bottom Line Section */}
              <div className="mb-12">
                <h2
                  id="bottom-line"
                  className="font-bold text-zinc-900 mt-12 mb-6 scroll-mt-24"
                  style={{ fontSize: "50px", lineHeight: "54px" }}
                >
                  The Bottom Line
                </h2>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  The perfect boat balances your intended use, budget,
                  experience level, and storage capabilities. Whether you're
                  dreaming of peaceful sunset sails, adrenaline-pumping water
                  sports, or luxurious coastal cruising, there's a vessel
                  designed specifically for your boating dreams.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Take time to charter different types before buying, attend
                  boat shows to see options in person, and talk to other boaters
                  about their experiences. The right boat will provide years of
                  memorable adventures on the water.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Ready to find the perfect marina for your new vessel?{" "}
                  <a
                    href="/"
                    className="font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
                  >
                    Discover how Harbr's AI-powered marina management software
                  </a>{" "}
                  can help marina operators provide exceptional service for
                  every type of boat and boater.
                </p>
              </div>
            </div>
          </div>

          {/* Author Sidebar - Right */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Reveal delay={0.3}>
                <div className="bg-white border border-zinc-200 rounded-lg p-6 mb-8">
                  <div className="text-center">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4"
                      style={{ backgroundColor: "rgb(87, 116, 245)" }}
                    >
                      MC
                    </div>
                    <h3 className="font-semibold text-zinc-900 text-lg mb-2">
                      Michael Chen
                    </h3>
                    <p className="text-zinc-600 text-sm leading-relaxed mb-4">
                      Marine industry specialist with 15+ years of experience in
                      boat sales, marina operations, and vessel management
                      systems.
                    </p>
                    <div className="flex justify-center space-x-3">
                      <button
                        type="button"
                        className="text-zinc-400 hover:text-zinc-600 transition-colors"
                        aria-label="Twitter profile"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <title>Twitter</title>
                          <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="text-zinc-400 hover:text-zinc-600 transition-colors"
                        aria-label="LinkedIn profile"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <title>LinkedIn</title>
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Blog */}
      <div className="bg-white border-t border-zinc-200">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Reveal delay={0.5}>
            <Link
              to="/blog"
              className="inline-flex items-center text-zinc-600 hover:text-zinc-900 transition-colors duration-200"
              onMouseEnter={(e) => {
                e.target.style.color = "rgb(87, 116, 245)";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "";
              }}
            >
              ← Back to Blog
            </Link>
          </Reveal>
        </div>
      </div>
    </article>
  );
}
