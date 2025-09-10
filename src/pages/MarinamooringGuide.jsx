import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/animations/Reveal";

export default function MarinamooringGuide() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    document.title = "Complete Guide to Mastering Marina Mooring | Harbr Blog";
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
      title: "Before You Approach: Preparation is Everything",
      id: "before-you-approach",
    },
    {
      title: "The Approach: Patience and Precision",
      id: "the-approach",
    },
    {
      title: "Securing Your Boat: The Critical Moments",
      id: "securing-your-boat",
    },
    {
      title: "Marina Etiquette: Being a Good Neighbour",
      id: "marina-etiquette",
    },
    {
      title: "Pro Tips for Confident Docking",
      id: "pro-tips",
    },
    {
      title: "When Things Go Wrong: Staying Cool Under Pressure",
      id: "when-things-go-wrong",
    },
    {
      title: "Building Confidence Through Practice",
      id: "building-confidence",
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
                BOATING SKILLS & TECHNIQUES
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.1] tracking-[-0.02em] font-bold mb-6"
              style={{ fontSize: "50px", lineHeight: "54px" }}
            >
              Harbr's Complete Guide to Mastering Marina Mooring: Essential Tips
              for Confident Docking
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
                  Sarah Johnson
                </span>
              </div>
              <div className="flex items-center justify-center mt-[16px]">
                <span style={{ fontSize: "16px", lineHeight: "22px" }}>
                  July 30, 2025
                </span>
                <span
                  className="mx-2"
                  style={{ fontSize: "16px", lineHeight: "22px" }}
                >
                  •
                </span>
                <span style={{ fontSize: "16px", lineHeight: "22px" }}>
                  14 min read
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
                  src="/blog-images/marina-mooring-guide.webp"
                  alt="Complete guide to mastering marina mooring and docking techniques"
                  className="w-3/4 h-auto rounded-lg shadow-lg mb-8 mx-auto"
                />
              </div>

              {/* Introduction */}
              <div className="mb-8">
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Mooring your boat at a marina berth doesn't have to be the
                  stress-inducing experience that keeps many boaters awake at
                  night. Whether you're a weekend warrior or a seasoned sailor,
                  perfecting your docking technique is one of the most valuable
                  skills you can develop. With the right preparation, technique,
                  and mindset, you can dock like a pro every time, earning the
                  respect of fellow mariners and ensuring the safety of your
                  vessel and crew.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  The art of mooring combines seamanship, physics, and
                  psychology. Understanding how your boat behaves in different
                  conditions, reading wind and current patterns, and maintaining
                  calm under pressure all contribute to successful docking. Here
                  are Harbr's comprehensive tips to transform your marina
                  experience from stressful to smooth.
                </p>
              </div>

              {/* Before You Approach Section */}
              <div className="mb-12">
                <h2
                  id="before-you-approach"
                  className="font-bold text-zinc-900 mt-12 mb-6 scroll-mt-24"
                  style={{ fontSize: "50px", lineHeight: "54px" }}
                >
                  Before You Approach: Preparation is Everything
                </h2>

                <h4
                  id="prepare-lines-fenders"
                  className="text-lg lg:text-xl font-semibold text-zinc-900 mt-6 mb-3 scroll-mt-24"
                  style={{ fontSize: "24px", lineHeight: "28px" }}
                >
                  Prepare Your Lines and Fenders
                </h4>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Success at the dock begins long before you enter the marina.
                  Set up your dock lines and fenders while you're still in open
                  water, giving yourself time to organise equipment without the
                  pressure of an approaching berth. Have spring lines, bow and
                  stern lines ready and properly coiled, ensuring they're long
                  enough for your assigned berth but not so long they'll tangle.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Position fenders on both sides of your vessel initially. You
                  can always remove those you don't need, but scrambling to
                  deploy additional fenders while manoeuvring is a recipe for
                  disaster. Modern fenders should be positioned at your boat's
                  widest point and adjusted for the dock height. For larger
                  vessels, consider having crew members ready with boat hooks to
                  tend fenders during the approach.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Nothing looks more amateur than scrambling to prepare
                  equipment while other boaters wait, engines idling, and marina
                  staff watch with growing concern. Professional preparation
                  demonstrates seamanship and creates confidence in your crew.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Looking to purchase lines and fenders?{" "}
                  <a
                    href="https://www.theboatwarehouse.com.au"
                    className="font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    The Boat Warehouse
                  </a>{" "}
                  has a great selection of mooring and general boating
                  equipment.
                </p>

                {/* <div className="mb-8">
                  <img
                    src="/blog-images/boat_warehouse.png"
                    alt="Complete guide to mastering marina mooring and docking techniques"
                    className="w-3/4 h-auto rounded-lg shadow-lg mb-8 mx-auto"
                  />
                </div> */}

                <h4
                  id="scout-berth-conditions"
                  className="text-lg lg:text-xl font-semibold text-zinc-900 mt-6 mb-3 scroll-mt-24"
                  style={{ fontSize: "24px", lineHeight: "28px" }}
                >
                  Scout Your Berth and Assess Conditions
                </h4>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Note which side you'll be tying up to and adjust your fender
                  placement accordingly. Observe how other boats are lying in
                  their berths. This tells you about current wind and current
                  patterns.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Pay attention to finger pier width, cleat positions, and any
                  overhead obstacles like power lines or neighbouring boat
                  rigging. Check for unusual currents around the marina,
                  sometimes breakwaters create unexpected eddies that can catch
                  inexperienced mariners off guard.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  If possible, have crew positioned with lines ready and assign
                  specific responsibilities. Clear communication during the
                  scouting pass ensures everyone understands their role before
                  the pressure of docking begins.
                </p>
              </div>

              {/* The Approach Section */}
              <div className="mb-12">
                <h2
                  id="the-approach"
                  className="font-bold text-zinc-900 mt-12 mb-6 scroll-mt-24"
                  style={{ fontSize: "50px", lineHeight: "54px" }}
                >
                  The Approach: Patience and Precision
                </h2>

                <h4
                  id="go-slow-steady"
                  className="text-lg lg:text-xl font-semibold text-zinc-900 mt-6 mb-3 scroll-mt-24"
                  style={{ fontSize: "24px", lineHeight: "28px" }}
                >
                  Go Slow and Steady
                </h4>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  The golden rule of docking is simple: approach at idle speed.
                  Momentum is your enemy in tight spaces, and you can always add
                  power, but it's much harder to take it away once you've
                  committed to an approach. Use short bursts of power rather
                  than continuous throttle, allowing your boat to settle between
                  adjustments.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Remember that your boat will continue moving even after you
                  cut the engine. Heavier vessels carry significant momentum,
                  while lighter boats may be more affected by wind.
                  Understanding your vessel's momentum characteristics in
                  different conditions is crucial for timing your final
                  approach.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Consider your boat's turning radius and how it behaves in
                  reverse. Many boats walk sideways when backing down due to
                  propeller rotation, and this characteristic can be used to
                  your advantage with practice.
                </p>

                <h4
                  id="wind-current"
                  className="text-lg lg:text-xl font-semibold text-zinc-900 mt-6 mb-3 scroll-mt-24"
                  style={{ fontSize: "24px", lineHeight: "28px" }}
                >
                  Account for Wind and Current
                </h4>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Always approach into the strongest force whether that's wind
                  or current. If wind is pushing you toward the dock, approach
                  at a steeper angle to maintain control as the wind helps
                  settle you against the pier. If wind is pushing you away from
                  the dock, come in more parallel to the berth and be prepared
                  to use more power to maintain position.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Current can be trickier to read than wind, especially in areas
                  with complex tidal flows. Watch debris or other boats to
                  observe current direction and strength. In areas with strong
                  current, timing your approach with slack water can make
                  docking significantly easier.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Crosswinds present particular challenges, especially for boats
                  with high superstructures. Modern motor yachts with large
                  flybridge areas act like sails, requiring careful power
                  management and sometimes creative approaches to maintain
                  control.
                </p>

                {/* <div className="mb-8">
                  <img
                    src="/blog-images/account_for_wind.png"
                    alt="The Boat Warehouse"
                    className="w-3/4 h-auto rounded-lg shadow-lg mb-8 mx-auto"
                  />
                </div> */}
              </div>

              {/* Securing Your Boat Section */}
              <div className="mb-12">
                <h2
                  id="securing-your-boat"
                  className="font-bold text-zinc-900 mt-12 mb-6 scroll-mt-24"
                  style={{ fontSize: "50px", lineHeight: "54px" }}
                >
                  Securing Your Boat: The Critical Moments
                </h2>

                <h4
                  id="lines-first"
                  className="text-lg lg:text-xl font-semibold text-zinc-900 mt-6 mb-3 scroll-mt-24"
                  style={{ fontSize: "24px", lineHeight: "28px" }}
                >
                  Lines First, Then Perfect Positioning
                </h4>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Get at least one line secured quickly, usually a spring line
                  amidships or whatever line your crew can safely reach first.
                  This initial line gives you control while you organise
                  remaining lines and adjust positioning. Don't worry about
                  perfect positioning initially; you can always adjust once
                  you're secured.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Having that first line fast is crucial. It prevents wind or
                  current from setting you away from the dock while you sort out
                  remaining lines. Train your crew to be ready with this crucial
                  first line and ensure they understand it's more important to
                  get something attached quickly than to wait for the perfect
                  line.
                </p>

                <h4
                  id="proper-line-technique"
                  className="text-lg lg:text-xl font-semibold text-zinc-900 mt-6 mb-3 scroll-mt-24"
                  style={{ fontSize: "24px", lineHeight: "28px" }}
                >
                  Master Proper Line Technique
                </h4>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Understanding proper line configuration is essential for both
                  security and seamanship appearance. Bow and stern lines should
                  run slightly forward and aft respectively, preventing the boat
                  from surging forward or backward in its berth. Spring lines
                  prevent fore-and-aft movement and are particularly important
                  in areas with wake or current.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Keep lines tight but not over-tensioned. Lines should hold the
                  boat securely but allow for tidal movement and thermal
                  expansion. Over-tensioned lines can damage cleats, stress your
                  boat's structure, and make departure more difficult.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Use appropriate cleats and ensure lines won't chafe against
                  sharp edges or rough surfaces. Chafe protection is especially
                  important for boats staying at berths for extended periods.
                  Inspect chafe points regularly and adjust or protect lines as
                  needed.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Familiarise yourself with the{" "}
                  <a
                    href="/blog/essential-sailing-knots-every-boater-should-know"
                    className="font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
                  >
                    Three most important sailing knots, the Bowline, Clove Hitch
                    and Cleat Hitch.
                  </a>
                </p>

                {/* <div className="mb-8">
                  <img
                    src="/blog-images/securing_your_boat.png"
                    alt="Account for Wind"
                    className="w-3/4 h-auto rounded-lg shadow-lg mb-8 mx-auto"
                  />
                </div> */}

                <h4
                  id="berth-types"
                  className="text-lg lg:text-xl font-semibold text-zinc-900 mt-6 mb-3 scroll-mt-24"
                  style={{ fontSize: "24px", lineHeight: "28px" }}
                >
                  Understanding Different Berth Types
                </h4>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Finger piers offer the most straightforward docking
                  experience, with cleats positioned for easy line handling.
                  Mediterranean mooring requires backing to a dock with an
                  anchor deployed forward, demanding different skills and
                  equipment. Side-tie berths require careful fender placement
                  and awareness of neighbouring boats.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Each berth type requires adapted techniques. Practice
                  different scenarios in less pressured environments before
                  attempting challenging berths during busy periods.
                </p>
              </div>

              {/* Marina Etiquette Section */}
              <div className="mb-12">
                <h2
                  id="marina-etiquette"
                  className="font-bold text-zinc-900 mt-12 mb-6 scroll-mt-24"
                  style={{ fontSize: "50px", lineHeight: "54px" }}
                >
                  Marina Etiquette: Being a Good Neighbour
                </h2>

                <h4
                  id="respect-neighbours"
                  className="text-lg lg:text-xl font-semibold text-zinc-900 mt-6 mb-3 scroll-mt-24"
                  style={{ fontSize: "24px", lineHeight: "28px" }}
                >
                  Respect Your Neighbours
                </h4>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Marina living requires consideration for fellow boaters who
                  may be living aboard or using their vessels as peaceful
                  retreats. Keep music at reasonable levels, especially during
                  evening hours when sound travels clearly across calm water.
                  Walk quietly on docks and avoid slamming hatches, doors, or
                  equipment.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Remember that your generator use, bright deck lighting, and
                  entertaining can significantly impact neighbouring boats. Many
                  marinas have specific quiet hours. Respect them even if
                  they're not strictly enforced.
                </p>

                <h4
                  id="professional-berth"
                  className="text-lg lg:text-xl font-semibold text-zinc-900 mt-6 mb-3 scroll-mt-24"
                  style={{ fontSize: "24px", lineHeight: "28px" }}
                >
                  Keep Your Berth Professional
                </h4>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Coil lines neatly after docking, secure loose equipment, and
                  keep your berth area clean and organised. This isn't just
                  about appearances, it's about safety for everyone using the
                  marina. Loose lines can tangle with other boats, unsecured
                  equipment can blow overboard or damage neighbouring vessels,
                  and cluttered berths create tripping hazards.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Professional-looking berths also reflect well on the marina
                  and the boating community generally. Take pride in your
                  seamanship by maintaining high standards even when you think
                  nobody's watching.
                </p>
              </div>

              {/* Pro Tips Section */}
              <div className="mb-12">
                <h2
                  id="pro-tips"
                  className="font-bold text-zinc-900 mt-12 mb-6 scroll-mt-24"
                  style={{ fontSize: "50px", lineHeight: "54px" }}
                >
                  Pro Tips for Confident Docking
                </h2>

                <h4
                  id="practice-makes-perfect"
                  className="text-lg lg:text-xl font-semibold text-zinc-900 mt-6 mb-3 scroll-mt-24"
                  style={{ fontSize: "24px", lineHeight: "28px" }}
                >
                  Practice Makes Perfect
                </h4>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Consider practicing docking manoeuvres in less crowded areas
                  first. Many harbours have practice areas or less busy docks
                  where you can refine techniques without pressure. Practice
                  backing into slips, approaching in different wind conditions,
                  and manoeuvring in tight spaces.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Some{" "}
                  <a
                    href="https://www.qld.gov.au/transport/boating/licences/boatsafe"
                    className="font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    boating schools and training providers
                  </a>{" "}
                  offer docking courses using your own vessel, providing
                  professional instruction tailored to your boat's handling
                  characteristics.
                </p>

                <h4
                  id="know-equipment"
                  className="text-lg lg:text-xl font-semibold text-zinc-900 mt-6 mb-3 scroll-mt-24"
                  style={{ fontSize: "24px", lineHeight: "28px" }}
                >
                  Know Your Equipment and Limitations
                </h4>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Understand your boat's dimensions and how it handles in
                  reverse. Know your engine's response characteristics. Some
                  engines have significant lag between throttle movement and
                  thrust response. Understand how your boat behaves at very low
                  speeds and practice manoeuvring using short power bursts.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Use dock carts efficiently and return them promptly for other
                  users. Have a backup plan, sometimes weather conditions or
                  equipment issues require aborting an approach and trying
                  again.
                </p>

                <h4
                  id="communication-key"
                  className="text-lg lg:text-xl font-semibold text-zinc-900 mt-6 mb-3 scroll-mt-24"
                  style={{ fontSize: "24px", lineHeight: "28px" }}
                >
                  Communication is Key
                </h4>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Communicate clearly with crew using simple, specific
                  instructions. Avoid shouting. Tension in your voice creates
                  tension in your crew. Establish hand signals for situations
                  where verbal communication might be difficult.
                </p>
              </div>

              {/* When Things Go Wrong Section */}
              <div className="mb-12">
                <h2
                  id="when-things-go-wrong"
                  className="font-bold text-zinc-900 mt-12 mb-6 scroll-mt-24"
                  style={{ fontSize: "50px", lineHeight: "54px" }}
                >
                  When Things Go Wrong: Staying Cool Under Pressure
                </h2>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Don't panic if your first attempt isn't perfect. Professional
                  mariners know that conditions can change, equipment can fail,
                  and sometimes the best seamanship decision is recognising when
                  to abort an approach and try again. It's always better to back
                  out and reassess than to force a bad approach that could
                  damage your boat or others.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Most marina staff and fellow boaters are happy to lend a hand
                  if you're struggling. There's no shame in asking for help or
                  accepting assistance. The boating community generally supports
                  each other, and today's helper might need assistance tomorrow.
                </p>

                <h4
                  id="learning-curve"
                  className="text-lg lg:text-xl font-semibold text-zinc-900 mt-6 mb-3 scroll-mt-24"
                  style={{ fontSize: "24px", lineHeight: "28px" }}
                >
                  Remember the Learning Curve
                </h4>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Even experienced captains have challenging docking days.
                  Weather, unfamiliar berths, equipment issues, and fatigue can
                  make mooring tricky for anyone. Stay calm, take your time, and
                  prioritise safety over speed or appearances.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Weather conditions can change rapidly, turning an easy docking
                  into a challenging manoeuvre. Don't hesitate to wait for
                  better conditions if safety is questionable.
                </p>
              </div>

              {/* Conclusion Section */}
              <div className="mb-12">
                <h2
                  id="building-confidence"
                  className="font-bold text-zinc-900 mt-12 mb-6 scroll-mt-24"
                  style={{ fontSize: "50px", lineHeight: "54px" }}
                >
                  Building Confidence Through Practice
                </h2>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  With practice and patience, mooring will become second nature,
                  transforming from a stressful ordeal into a satisfying
                  demonstration of seamanship. Focus on fundamentals, maintain
                  your equipment properly, and never stop learning from each
                  docking experience.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Soon you'll be the experienced mariner offering helpful hands
                  to newcomers learning the ropes, contributing to the
                  supportive community that makes boating such a rewarding
                  pursuit.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Heading offshore? Read{" "}
                  <a
                    href="/blog/essential-maritime-distress-signals"
                    className="font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
                  >
                    Harbr's guide to Essential marine safety and distress
                    signals here.
                  </a>
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Happy boating, and smooth docking ahead!
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
                    <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden">
                      <img
                        src="/michael.webp"
                        alt="Michael Chen"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-semibold text-zinc-900 text-lg mb-2">
                      Michael Chen
                    </h3>
                    <p className="text-zinc-600 text-sm leading-relaxed mb-4">
                      Marine industry specialist with 15+ years of experience in
                      boat handling, marina operations, and seamanship training.
                    </p>
                    <div className="flex justify-center space-x-3">
                      <a
                        href="https://x.com/Harbr_AI"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-zinc-600 transition-colors"
                        aria-label="Follow Harbr on X"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <title>Follow Harbr on X</title>
                          <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                        </svg>
                      </a>
                      <a
                        href="https://www.linkedin.com/company/harbrapp/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-zinc-600 transition-colors"
                        aria-label="Visit Harbr LinkedIn company page"
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
                      </a>
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
