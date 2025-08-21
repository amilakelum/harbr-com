import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Reveal from "../components/animations/Reveal";

export default function BlogPost() {
  const { slug } = useParams();
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    document.title = "Essential Maritime Distress Signals | Harbr Blog";
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
      title: "Understanding Distress Signals: Your First Line of Defense",
      id: "understanding-signals",
    },
    {
      title: "  ↳ Radio Communications: Your Voice in the Darkness",
      id: "radio-communications",
    },
    {
      title: "  ↳ Visual Distress Signals: Cutting Through the Confusion",
      id: "visual-signals",
    },
    {
      title: "Flares: Illuminating Your Emergency",
      id: "flares",
    },
    {
      title: "  ↳ Legal Requirements and Compliance",
      id: "legal-requirements",
    },
    {
      title: "  ↳ Flare Types and Tactical Usage",
      id: "flare-types",
    },
    {
      title: "  ↳ Flare Storage and Maintenance",
      id: "flare-storage",
    },
    {
      title: "  ↳ Disposal Responsibilities",
      id: "disposal-responsibilities",
    },
    {
      title: "Emergency Beacons: Technology That Saves Lives",
      id: "emergency-beacons",
    },
    {
      title: "  ↳ EPIRB Technology and Capabilities",
      id: "epirb-technology",
    },
    {
      title: "  ↳ PLB Advantages for Smaller Craft",
      id: "plb-advantages",
    },
    {
      title: "  ↳ Registration and Maintenance Requirements",
      id: "plb-registration",
    },
    {
      title: "Advanced Safety Considerations",
      id: "advanced-safety-considerations",
    },
    {
      title: "  ↳ Integration with Other Safety Equipment",
      id: "interaction-with-other-equipment",
    },
    {
      title: "  ↳ Training and Preparedness",
      id: "training-and-preparedness",
    },
    {
      title: "  ↳ Weather and Environmental Factors",
      id: "weather-factors",
    },
    {
      title: "Legal Responsibilities and Consequences",
      id: "legal-responsibilities",
    },
    {
      title: "The Technology Evolution",
      id: "technology-evolution",
    },
    {
      title: "Conclusion: Preparation Saves Lives",
      id: "conclusion",
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
                SAFETY & REGULATIONS
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.1] tracking-[-0.02em] font-bold mb-6"
              style={{ fontSize: "50px", lineHeight: "54px" }}
            >
              Essential Maritime Distress Signals: Your Lifeline on the Water
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
                  Sarah Johnson
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
                  January 15, 2025
                </span>
                <span
                  className="mx-2"
                  style={{ fontSize: "16px", lineHeight: "22px" }}
                >
                  •
                </span>
                <span style={{ fontSize: "16px", lineHeight: "22px" }}>
                  8 min read
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
                  src="/blog-images/essential-maritime-distress-signals.png"
                  alt="Essential Maritime Distress Signals - Safety equipment and signaling devices for boaters"
                  className="w-3/4 h-auto rounded-lg shadow-lg mb-8 mx-auto"
                />
              </div>

              {/* Introduction */}
              <div className="mb-8">
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  <span className="font-bold">Disclaimer:</span> The following
                  applies to Australian waters
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Every year, hundreds of recreational boaters find themselves
                  in life-threatening situations on Australian waters. From
                  sudden weather changes and mechanical failures to medical
                  emergencies and navigation errors, the ocean can turn
                  dangerous without warning. When these critical moments arise,
                  your knowledge of proper distress signals and safety equipment
                  becomes the thin line between rescue and tragedy.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Maritime distress signals have saved countless lives
                  throughout history, dating back to the days of signal fires
                  and cannon shots. Today's sophisticated systems combine
                  traditional visual signals with cutting-edge satellite
                  technology, creating multiple layers of safety for anyone
                  venturing onto the water. Understanding these systems isn't
                  just recommended—it's essential for responsible boating.
                </p>
              </div>

              {/* Understanding Distress Signals Section */}
              <div className="mb-12">
                <h2
                  id="understanding-signals"
                  className="font-bold text-zinc-900 mt-12 mb-6 scroll-mt-24"
                  style={{ fontSize: "50px", lineHeight: "54px" }}
                >
                  Understanding Distress Signals: Your First Line of Defense
                </h2>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Distress signals serve a crucial purpose: they communicate to
                  the world that you need immediate assistance. These
                  internationally recognized calls for help have been
                  standardized across the globe, ensuring that whether you're
                  off the Queensland coast or in international waters, your
                  signal will be understood and acted upon.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  The key principle behind distress signals is redundancy. No
                  single method is foolproof, which is why maritime safety
                  protocols emphasize using multiple signals simultaneously.
                  Weather conditions, time of day, proximity to other vessels,
                  and equipment functionality all influence which signals will
                  be most effective in your specific emergency situation.
                </p>

                <h3
                  id="radio-communications"
                  className="text-xl lg:text-2xl font-semibold text-zinc-900 mt-8 mb-4 scroll-mt-24"
                  style={{ fontSize: "38px", lineHeight: "42px" }}
                >
                  Radio Communications: Your Voice in the Darkness
                </h3>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Marine radio remains one of the most effective distress
                  communication methods, offering immediate two-way contact with
                  rescue authorities and nearby vessels. The internationally
                  recognized distress calls each serve specific purposes:
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  <span className="font-bold">"Mayday, mayday, mayday"</span>{" "}
                  represents the most serious emergency call, reserved
                  exclusively for life-threatening situations where immediate
                  assistance is required. When transmitting a mayday call,
                  follow the standard format: state your vessel name, position,
                  nature of emergency, number of people aboard, and any
                  immediate assistance required. Repeat this information clearly
                  and slowly. Panic can make speech difficult to understand.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  <span className="font-bold">"Pan pan, pan pan, pan pan"</span>{" "}
                  indicates an urgent situation that isn't immediately
                  life-threatening but requires assistance. This might include
                  engine failure in calm weather, running aground without
                  immediate danger, or medical situations that need attention
                  but aren't critical. Pan pan calls help prioritise emergency
                  response resources appropriately.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  <span className="font-bold">SOS in Morse code</span> remains
                  the universal distress signal, recognisable even to those
                  unfamiliar with maritime protocols. Three short signals, three
                  long signals, three short signals (dot-dot-dot,
                  dash-dash-dash, dot-dot-dot) can be transmitted using radio,
                  lights, sound signals, or any other signalling method
                  available.
                </p>

                {/* SOS Image */}
                <div className="mb-8">
                  <img
                    src="/blog-images/SOS.png"
                    alt="SOS Morse Code Signal - Three dots, three dashes, three dots"
                    className="w-1/2 h-auto rounded-lg shadow-md mb-6 mx-auto"
                  />
                </div>

                <h3
                  id="visual-signals"
                  className="text-xl lg:text-2xl font-semibold text-zinc-900 mt-8 mb-4 scroll-mt-24"
                  style={{ fontSize: "38px", lineHeight: "42px" }}
                >
                  Visual Distress Signals: Cutting Through the Confusion
                </h3>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Visual signals prove invaluable when radio communication fails
                  or when you need to attract attention from aircraft or distant
                  vessels. Each type of visual signal serves specific conditions
                  and circumstances:
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  <span className="font-bold">V-sheet displays</span> create a
                  large, distinctive visual marker easily spotted by aircraft.
                  The V-shape is internationally recognised as a distress
                  symbol, distinguishing it from other maritime displays.
                  Position your V-sheet in the most visible location on your
                  vessel, ensuring it's secured against wind but clearly visible
                  from above.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  <span className="font-bold">Arm signals</span> provide a
                  simple, equipment-free method of indicating distress. Slowly
                  and repeatedly raising and lowering your arms outstretched to
                  each side creates a distinctive motion pattern that differs
                  from normal waving. This signal works best when you can
                  position yourself in clear view of potential rescuers.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  <span className="font-bold">
                    International code flags N over C
                  </span>{" "}
                  (November over Charlie) represent the universal maritime
                  distress flag combination. These flags should be displayed
                  prominently where they can be seen by passing vessels. The
                  distinctive patterns and colours make them recognisable even
                  at significant distances.
                </p>
              </div>

              {/* Flares Section */}
              <div className="mb-12">
                <h2
                  id="flares"
                  className="font-bold text-zinc-900 mt-12 mb-6 scroll-mt-24"
                  style={{ fontSize: "50px", lineHeight: "54px" }}
                >
                  Flares: Illuminating Your Emergency
                </h2>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Flares represent one of the most visible and
                  attention-grabbing distress signals available to recreational
                  boaters. Understanding the different types, their
                  applications, and proper usage can dramatically improve your
                  chances of rescue.
                </p>

                <h3
                  id="legal-requirements"
                  className="text-xl lg:text-2xl font-semibold text-zinc-900 mt-8 mb-4 scroll-mt-24"
                  style={{ fontSize: "38px", lineHeight: "42px" }}
                >
                  Legal Requirements and Compliance
                </h3>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Queensland's maritime safety regulations mandate specific
                  flare requirements for different vessel types and operating
                  areas. All Queensland-registered ships, visiting interstate
                  vessels, ships under restricted use authority, and personal
                  watercraft operating beyond smooth water limits must carry
                  appropriate flare equipment.
                </p>

                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  The minimum requirement of two orange smoke flares and two red
                  hand flares provides redundancy for both day and night
                  emergencies. However, many experienced mariners carry
                  additional flares beyond the legal minimum, understanding that
                  equipment can fail and emergency situations may require
                  multiple signalling attempts. Authorities won't fine you for
                  carrying out of date flares, as long as you also carry
                  non-expired flares to satisfy the minimum legal requirements.
                </p>

                <h3
                  id="flare-types"
                  className="text-xl lg:text-2xl font-semibold text-zinc-900 mt-8 mb-4 scroll-mt-24"
                  style={{ fontSize: "38px", lineHeight: "42px" }}
                >
                  Flare Types and Tactical Usage
                </h3>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  <span className="font-semibold">Orange smoke flares</span>{" "}
                  excel in daylight conditions, producing a dense, highly
                  visible orange cloud that can be spotted from considerable
                  distances, particularly by aircraft. The orange colour was
                  specifically chosen for its contrast against most natural
                  backgrounds, whether ocean, sky, or land. While effective
                  range is limited to approximately 1.4 nautical miles for
                  surface vessels, aircraft can spot the distinctive orange
                  smoke from much greater distances.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Deploy orange smoke flares when you see or hear aircraft in
                  the area, or when you know search and rescue operations are
                  active in your vicinity. The smoke typically lasts 3-5
                  minutes, providing a substantial window for detection. Wind
                  conditions significantly affect smoke flare visibility. Deploy
                  them upwind of your position when possible to maximise drift
                  time and coverage area.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  <span className="font-semibold">Red hand flares</span> provide
                  brilliant illumination visible for 5-10 nautical miles at
                  night, making them your primary nighttime distress signal. The
                  intense red light cuts through darkness and can be seen by
                  vessels well beyond radio range. Red flares also work during
                  daylight hours, though their effectiveness is reduced compared
                  to smoke signals.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  When deploying red flares, hold them firmly away from your
                  body and point them slightly downwind to avoid smoke and
                  sparks. The flare will burn for approximately 60 seconds at
                  temperatures exceeding 1,000 degrees Celsius, so proper
                  handling is crucial for safety.
                </p>
                <h3
                  id="flare-storage"
                  className="text-xl lg:text-2xl font-semibold text-zinc-900 mt-8 mb-4 scroll-mt-24"
                  style={{ fontSize: "38px", lineHeight: "42px" }}
                >
                  Flare Storage and Maintenance
                </h3>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Proper flare storage extends their lifespan and ensures
                  reliability when needed. Store flares in a dry, easily
                  accessible location where they won't be damaged by normal
                  vessel operations. Many boaters use waterproof storage
                  containers specifically designed for safety equipment, keeping
                  flares clean, dry, and immediately accessible during
                  emergencies.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  The three-year lifespan of flares isn't arbitrary. The
                  chemical compounds that create the pyrotechnic display degrade
                  over time, potentially resulting in flares that fail to ignite
                  or produce inadequate signals. Check expiry dates regularly
                  and replace flares before they expire. Mark replacement dates
                  on your calendar to ensure compliance.
                </p>
                <h3
                  id="disposal-responsibilities"
                  className="text-xl lg:text-2xl font-semibold text-zinc-900 mt-8 mb-4 scroll-mt-24"
                  style={{ fontSize: "38px", lineHeight: "42px" }}
                >
                  Disposal Responsibilities
                </h3>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Expired flares pose environmental and safety hazards when
                  disposed of improperly. Never place old flares in general
                  household waste, as they can ignite during garbage collection
                  or at landfill sites. Contact local battery stores, marine
                  supply retailers, or waste management facilities to find
                  proper disposal options. While a small fee may apply, proper
                  disposal protects both the environment and public safety.
                </p>
              </div>

              {/* Emergency Beacons Section */}
              <div className="mb-12">
                <h2
                  id="emergency-beacons"
                  className="font-bold text-zinc-900 mt-12 mb-6 scroll-mt-24"
                  style={{ fontSize: "50px", lineHeight: "54px" }}
                >
                  Emergency Beacons: Technology That Saves Lives
                </h2>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Modern emergency beacons represent the pinnacle of maritime
                  safety technology, providing precise location data to rescue
                  authorities worldwide. These devices have revolutionized
                  search and rescue operations, dramatically reducing response
                  times and improving rescue success rates.
                </p>
                <h3
                  id="epirb-technology"
                  className="text-xl lg:text-2xl font-semibold text-zinc-900 mt-8 mb-4 scroll-mt-24"
                  style={{ fontSize: "38px", lineHeight: "42px" }}
                >
                  EPIRB Technology and Capabilities
                </h3>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Emergency Position Indicating Radio Beacons (EPIRBs) utilise
                  satellite networks to transmit distress signals and precise
                  location data to rescue coordination centers. When activated,
                  a 406MHz digital EPIRB sends a coded signal containing your
                  unique beacon identification, allowing authorities to access
                  your registration information and contact details immediately.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Modern EPIRBs typically include GPS receivers that provide
                  location accuracy within 100 meters, compared to several
                  kilometres for older beacon technology. This precision
                  dramatically reduces search areas and enables rescue teams to
                  locate you quickly, even in challenging conditions.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  EPIRBs operate continuously for a minimum of 48 hours once
                  activated, though many models provide 72+ hours of operation.
                  The extended operating time ensures your signal remains active
                  even during prolonged rescue operations or when weather
                  conditions delay response efforts.
                </p>
                <h3
                  id="plb-advantages"
                  className="text-xl lg:text-2xl font-semibold text-zinc-900 mt-8 mb-4 scroll-mt-24"
                  style={{ fontSize: "38px", lineHeight: "42px" }}
                >
                  PLB Advantages for Smaller Craft
                </h3>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Personal Locator Beacons (PLBs) offer several advantages for
                  operators of lightweight craft, kayaks, canoes, and small
                  sailing vessels. Their compact size and personal attachment
                  requirements mean they stay with you if you become separated
                  from your vessel, a crucial consideration for single-handed
                  operations or activities where crew overboard situations are
                  possible.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  PLBs must be GPS-enabled and designed to float, ensuring they
                  remain functional even if activated in the water. The
                  requirement to wear PLBs on your person emphasizes their role
                  as personal safety devices rather than vessel equipment.
                </p>
                <h3
                  id="plb-registration"
                  className="text-xl lg:text-2xl font-semibold text-zinc-900 mt-8 mb-4 scroll-mt-24"
                  style={{ fontSize: "38px", lineHeight: "42px" }}
                >
                  Registration and Maintenance Requirements
                </h3>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Both EPIRBs and PLBs require registration with the Australian
                  Maritime Safety Authority (AMSA), a free service that enables
                  rescue authorities to contact you or your emergency contacts
                  immediately when your beacon activates. Registration
                  information should include current contact details, vessel
                  information, and emergency contact information.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Registration renewals are required every two years, ensuring
                  your information remains current. You must also notify AMSA
                  when beacon ownership changes or when vessel details are
                  updated. This information proves crucial during emergency
                  response, helping authorities understand your situation and
                  capabilities.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  The{" "}
                  <a
                    href="https://www.amsa.gov.au/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-600 hover:text-blue-600 hover:underline transition-colors duration-200"
                  >
                    Australian Maritime Safety Authority (AMSA)
                  </a>{" "}
                  website is a great source of information.
                </p>
              </div>

              {/* Backup Signaling Methods Section */}
              <div className="mb-12">
                <h2
                  id="advanced-safety-considerations"
                  className="font-bold text-zinc-900 mt-12 mb-6 scroll-mt-24"
                  style={{ fontSize: "50px", lineHeight: "54px" }}
                >
                  Advanced Safety Considerations
                </h2>
                <h3
                  id="interaction-with-other-equipment"
                  className="text-xl lg:text-2xl font-semibold text-zinc-900 mt-8 mb-4 scroll-mt-24"
                  style={{ fontSize: "38px", lineHeight: "42px" }}
                >
                  Integration with Other Safety Equipment
                </h3>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Distress signals work most effectively when integrated with
                  other safety equipment and procedures. Life jackets with
                  integrated PLBs, EPIRB-equipped life rafts, and vessels with
                  multiple communication systems create overlapping safety nets
                  that significantly improve survival chances.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Consider how your distress signalling equipment works with
                  other safety systems. Can you deploy flares while wearing life
                  jackets? Are your beacons accessible if you need to abandon
                  ship? These practical considerations often determine whether
                  safety equipment proves effective during actual emergencies.
                </p>
                <h3
                  id="training-and-preparedness"
                  className="text-xl lg:text-2xl font-semibold text-zinc-900 mt-8 mb-4 scroll-mt-24"
                  style={{ fontSize: "38px", lineHeight: "42px" }}
                >
                  Training and Preparedness
                </h3>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Regular training with distress signalling equipment builds
                  muscle memory and confidence crucial during high-stress
                  emergency situations. Practice deploying flares (use training
                  flares or expired ones in appropriate locations), simulate
                  radio distress calls, and ensure all crew members understand
                  beacon operation procedures.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Many marine safety organizations offer hands-on courses
                  covering distress signal procedures, emergency communications,
                  and survival techniques. These courses provide invaluable
                  experience and often reveal equipment limitations or usage
                  challenges before you encounter them during actual
                  emergencies.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Boat and PWC training providers like{" "}
                  <a
                    href="https://abcboating.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-600 hover:text-blue-600 hover:underline transition-colors duration-200"
                  >
                    Australian Boating College
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://www.allstateboating.com.au/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-600 hover:text-blue-600 hover:underline transition-colors duration-200"
                  >
                    All State Boat Licensing & Training
                  </a>{" "}
                  provide great courses for boaties of all experience levels,
                  not just initial licensing courses.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  You can find a more detailed list on the{" "}
                  <a
                    href="https://www.qld.gov.au/transport/boating/licences/boatsafe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-600 hover:text-blue-800"
                  >
                    Queensland Government
                  </a>{" "}
                  website here:
                </p>
                <h3
                  id="weather-factors"
                  className="text-xl lg:text-2xl font-semibold text-zinc-900 mt-8 mb-4 scroll-mt-24"
                  style={{ fontSize: "38px", lineHeight: "42px" }}
                >
                  Weather and Environmental Factors
                </h3>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Environmental conditions significantly impact distress signal
                  effectiveness. Heavy rain reduces flare visibility, high winds
                  affect smoke dispersion, and rough seas can make signal
                  deployment challenging. Understanding these limitations helps
                  you choose appropriate signals for current conditions and
                  maintain realistic expectations about rescue timelines.
                </p>
              </div>

              {/* Legal Responsibilities and Consequences Section */}
              <div className="mb-12">
                <h2
                  id="legal-responsibilities"
                  className="font-bold text-zinc-900 mt-12 mb-6 scroll-mt-24"
                  style={{ fontSize: "50px", lineHeight: "54px" }}
                >
                  Legal Responsibilities and Consequences
                </h2>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Maritime law takes distress signal misuse seriously, imposing
                  severe penalties including liability for rescue costs,
                  equipment expenses, and personnel time. False distress calls
                  divert resources from genuine emergencies and can endanger
                  lives when rescue teams respond to non-existent threats.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  These penalties aren't merely financial, they can include
                  criminal charges in cases of deliberate misuse. The Australian
                  Maritime Safety Authority maintains detailed records of beacon
                  activations and investigates all incidents thoroughly.
                </p>
              </div>

              {/* The Technology Evolution Section */}
              <div className="mb-12">
                <h2
                  id="technology-evolution"
                  className="font-bold text-zinc-900 mt-12 mb-6 scroll-mt-24"
                  style={{ fontSize: "50px", lineHeight: "54px" }}
                >
                  The Technology Evolution
                </h2>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Maritime distress signalling continues to evolve with
                  technological advances. Satellite communication systems now
                  enable two-way messaging even in remote areas, while
                  smartphone apps can integrate with beacon systems to provide
                  additional emergency capabilities.{" "}
                  <a
                    href="https://www.starlink.com/au/business/maritime?srsltid=AfmBOorn18fgrLQtK_eNCtAISkJct8fAWDbYdzKpZm5dE6I6_qle-1nY"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-600 hover:text-blue-800"
                  >
                    Starlink’s
                  </a>{" "}
                  satellite internet coverage is also a game-changer for
                  offshore & open ocean boaties.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  However, these advanced systems supplement rather than replace
                  traditional distress signals, which remain the primary safety
                  net for recreational boaters.
                </p>
              </div>

              {/* Conclusion Section */}
              <div className="mb-12">
                <h2
                  id="conclusion"
                  className="font-bold text-zinc-900 mt-12 mb-6 scroll-mt-24"
                  style={{ fontSize: "50px", lineHeight: "54px" }}
                >
                  Conclusion: Preparation Saves Lives
                </h2>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Maritime distress signals represent your lifeline when things
                  go wrong on the water. From traditional flares and radio calls
                  to sophisticated satellite beacons, each element of your
                  safety system serves a vital role in ensuring rescue
                  authorities can find and assist you during emergencies.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  The key to effective emergency signaling lies in preparation,
                  maintenance, and knowledge. Regular equipment checks, ongoing
                  training, and understanding the capabilities and limitations
                  of your safety equipment create the foundation for successful
                  emergency response.Remember that distress signals are only as
                  effective as your ability to deploy them properly when seconds
                  count.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Remember that distress signals work best when used in
                  combination. Radio calls provide immediate two-way
                  communication, visual signals attract attention from distant
                  rescuers, and electronic beacons ensure authorities receive
                  precise location data even if other systems fail. Redundancy
                  saves lives.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Your safety on the water depends on more than just having the
                  right equipment, it requires understanding how to use that
                  equipment effectively and maintaining it properly throughout
                  its service life. The small investment in proper safety
                  equipment and training provides insurance that could mean the
                  difference between a close call and a tragedy.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Keen to improve your boat docking skills? Read{" "}
                  <a
                    href="/blog"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-600 hover:text-blue-800"
                  >
                    Harbr’s detailed guide to mooring at marinas
                  </a>{" "}
                  here.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg italic">
                  Stay safe, stay prepared, and ensure every journey on the
                  water ends with everyone returning home safely.
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
                      SJ
                    </div>
                    <h3 className="font-semibold text-zinc-900 text-lg mb-2">
                      Sarah Johnson
                    </h3>
                    <p className="text-zinc-600 text-sm leading-relaxed mb-4">
                      Marina safety expert with 10+ years of experience in
                      maritime operations and emergency response protocols.
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
