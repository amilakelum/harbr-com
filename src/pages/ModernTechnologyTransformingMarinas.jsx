import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/animations/Reveal";

export default function ModernTechnologyTransformingMarinas() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    document.title =
      "How Modern Technology is Transforming Marina Operations | Harbr Blog";
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
      title: "Why Technology Matters More Than Ever",
      id: "why-technology-matters",
    },
    {
      title: "Artificial Intelligence: Your Marina's New Best Friend",
      id: "artificial-intelligence",
    },
    {
      title: "Smart Technology: When Your Marina Thinks for Itself",
      id: "smart-technology",
    },
    {
      title: "Integrated Software Solutions",
      id: "integrated-software",
    },
    {
      title: "Environmental Technology: Protecting Our Waters",
      id: "environmental-technology",
    },
    {
      title: "Mobile Communication: Meeting Customers Where They Are",
      id: "mobile-communication",
    },
    {
      title: "Charting a Course for Tomorrow's Marina",
      id: "charting-course-future",
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
                TECHNOLOGY & INNOVATION
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.1] tracking-[-0.02em] font-bold mb-6"
              style={{ fontSize: "50px", lineHeight: "54px" }}
            >
              New School: How Modern Technology is Transforming Marina
              Operations
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
                  Michael Chen
                </span>
              </div>
              <div className="flex items-center justify-center mt-[16px]">
                <span style={{ fontSize: "16px", lineHeight: "22px" }}>
                  June 30, 2025
                </span>
                <span
                  className="mx-2"
                  style={{ fontSize: "16px", lineHeight: "22px" }}
                >
                  •
                </span>
                <span style={{ fontSize: "16px", lineHeight: "22px" }}>
                  15 min read
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
                  src="/blog-images/essential-sailing-knots.jpg"
                  alt="Essential sailing knots"
                  className="w-3/4 h-auto rounded-lg shadow-lg mb-8 mx-auto"
                />
              </div>

              {/* Introduction */}
              <div className="mb-8">
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Picture this: you pull up to your favourite marina on a busy
                  Saturday morning, and instead of waiting in line to check in,
                  your phone buzzes with a personalized welcome message. It
                  guides you directly to your pre-assigned berth, where sensors
                  have already detected your arrival and prepared your berth.
                  The fuel dock knows exactly how much diesel you need based on
                  your boat's consumption patterns, and you can pay for
                  everything with a quick tap on your phone.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  This isn't some distant future fantasy. It's happening right
                  now at forward-thinking marinas around the world. The marina
                  industry is experiencing a digital revolution that's
                  completely changing how these waterfront hubs operate and
                  serve their customers. What was once a business built on
                  handwritten logbooks, radio chatter, and clipboard management
                  has evolved into a sophisticated, technology-driven operation
                  that rivals the best hospitality and service industries.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  The transformation is remarkable, and it's happening faster
                  than many people realise. Marinas that seemed perfectly modern
                  just five years ago must continue to embrace rapidly changing
                  technological innovations. This isn't just about keeping up
                  with trends, it's about survival in an increasingly
                  competitive marketplace where customer expectations continue
                  to rise.
                </p>
              </div>

              {/* Why Technology Matters Section */}
              <div className="mb-12">
                <h2
                  id="why-technology-matters"
                  className="font-bold text-zinc-900 mt-12 mb-6 scroll-mt-24"
                  style={{ fontSize: "50px", lineHeight: "54px" }}
                >
                  Why Technology Matters More Than Ever in Marina Management
                </h2>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  The boating industry has traditionally been somewhat resistant
                  to change, often clinging to "the way things have always been
                  done." But today's marina customers aren't just comparing
                  their experience to other marinas, they're comparing it to
                  their experiences with airlines, hotels, restaurants, and
                  retail stores. They expect the same level of digital
                  convenience and seamless service they get everywhere else in
                  their lives.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Marina operators who recognise this shift and invest in the
                  right technologies are seeing remarkable results. They're
                  operating more efficiently, reducing costs, improving customer
                  satisfaction, and building stronger, more profitable
                  businesses. Meanwhile, those who resist change are finding
                  themselves struggling to compete and retain customers.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  The key technologies we'll explore below represent the most
                  impactful innovations currently reshaping the marina
                  landscape. Each one addresses specific operational challenges
                  while opening up new opportunities for improved service and
                  increased revenue.
                </p>
              </div>

              {/* AI Section */}
              <div className="mb-12">
                <h2
                  id="artificial-intelligence"
                  className="font-bold text-zinc-900 mt-12 mb-6 scroll-mt-24"
                  style={{ fontSize: "50px", lineHeight: "54px" }}
                >
                  Artificial Intelligence: Your Marina's New Best Friend
                </h2>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Artificial intelligence might sound intimidating, but in
                  marina applications, it's proving to be incredibly practical
                  and valuable. AI systems excel at finding patterns in large
                  amounts of data, exactly the kind of task that can help marina
                  operators make better decisions about everything from staffing
                  to maintenance.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  One of the most valuable applications is demand forecasting.
                  AI can analyse years of occupancy data, considering factors
                  like weather patterns, local events, holidays, and seasonal
                  trends to predict when the marina will be busy with remarkable
                  accuracy. This allows operators to schedule staff
                  appropriately, ensuring adequate coverage during peak times
                  without overstaffing during slower periods.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Predictive maintenance is another game-changing application.
                  By monitoring equipment performance data and maintenance
                  histories, AI systems can identify the subtle warning signs
                  that typically precede equipment failures. Instead of waiting
                  for something to break down at the worst possible moment,
                  marina operators can schedule maintenance during convenient
                  times, saving money and preventing disruptions for customers.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Customer service is being transformed through AI-powered
                  chatbots and automated response systems. These can handle
                  routine inquiries about availability, pricing, and services
                  around the clock, freeing up staff to focus on more complex
                  customer needs and relationship building. The best part is
                  that these systems learn and improve over time, becoming more
                  accurate and helpful with each interaction.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  The continuous learning capability of AI means that the
                  investment becomes more valuable over time. As these systems
                  process more data and encounter more scenarios, their
                  recommendations become more accurate and their insights more
                  valuable.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  <a
                    href="/"
                    className="font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
                  >
                    Harbr's AI powered Marina Management Software
                  </a>{" "}
                  is the first AI forward MMS system in the world. Unrivalled
                  tech leverages AI & smart insights to supercharge marina
                  operations, deliver flawless customer experience and maximise
                  marina revenue.
                </p>
              </div>

              {/* Smart Technology Section */}
              <div className="mb-12">
                <h2
                  id="smart-technology"
                  className="font-bold text-zinc-900 mt-12 mb-6 scroll-mt-24"
                  style={{ fontSize: "50px", lineHeight: "54px" }}
                >
                  Smart Technology: When Your Marina Thinks for Itself
                </h2>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Marinas are transforming into intelligent environments that
                  can monitor, analyse, and respond to conditions automatically.
                  Smart sensors are now the eyes and ears of modern marina
                  operations, watching over everything from electrical systems
                  to environmental conditions.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  These sensors are incredibly sophisticated in what they can
                  detect and report. Electrical monitoring systems can spot
                  unusual power consumption patterns that might indicate a boat
                  is having problems with its shore power connection or onboard
                  systems. Instead of waiting for a customer complaint or
                  discovering a dangerous situation during routine inspections,
                  marina staff receive immediate alerts that allow them to
                  address issues proactively.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Water quality monitoring has become equally advanced. Sensors
                  continuously track pH levels, temperature fluctuations, and
                  contamination indicators, ensuring optimal conditions for both
                  boats and marine life. When readings fall outside normal
                  parameters, the system automatically alerts management and can
                  even take corrective actions like adjusting chemical levels or
                  activating filtration systems.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Weather monitoring capabilities have evolved far beyond basic
                  temperature and wind readings. Modern systems provide
                  hyperlocal forecasts that help marina staff prepare for
                  changing conditions hours or even days in advance. Some
                  facilities have integrated automated systems that can secure
                  loose equipment, adjust lighting, and even send weather alerts
                  to boat owners when storms are approaching.
                </p>
              </div>

              {/* Integrated Software Section */}
              <div className="mb-12">
                <h2
                  id="integrated-software"
                  className="font-bold text-zinc-900 mt-12 mb-6 scroll-mt-24"
                  style={{ fontSize: "50px", lineHeight: "54px" }}
                >
                  Integrated Software Solutions
                </h2>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  One of the biggest pain points in traditional marina
                  management has been dealing with multiple software systems
                  that don't talk to each other. Operators might use one system
                  for reservations, another for accounting, a third for customer
                  management, and yet another for maintenance tracking. This
                  creates inefficiencies, errors, and frustration for both staff
                  and customers.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Modern marina management platforms like{" "}
                  <a
                    href="/"
                    className="font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
                  >
                    Harbr
                  </a>{" "}
                  solve this problem by integrating all these functions into a
                  single, comprehensive system. Everything from berth bookings
                  and customer communications to financial reporting and
                  maintenance scheduling can be managed from one unified
                  dashboard.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  The customer-facing benefits are equally impressive. Modern
                  boaters expect to be able to book berths/slips online, update
                  their information, upload required documents, and make
                  payments through user-friendly interfaces accessible from any
                  device. They want the same level of digital convenience they
                  experience when booking hotels, making restaurant
                  reservations, or shopping online.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  These integrated platforms also provide powerful analytics
                  capabilities that help marina operators understand their
                  business better. They can easily track occupancy trends,
                  identify their most valuable customers, analyse revenue
                  patterns, and spot opportunities for improvement. Real-time
                  reporting ensures that decision-makers always have access to
                  current, accurate information.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Self-service capabilities represent a win-win scenario. When
                  customers can manage routine tasks independently through
                  online portals and mobile apps, it reduces the administrative
                  burden on marina staff while giving customers the convenience
                  and control they desire. Staff can then focus on higher-value
                  activities like customer relationship building and facility
                  improvements.
                </p>
              </div>

              {/* Environmental Technology Section */}
              <div className="mb-12">
                <h2
                  id="environmental-technology"
                  className="font-bold text-zinc-900 mt-12 mb-6 scroll-mt-24"
                  style={{ fontSize: "50px", lineHeight: "54px" }}
                >
                  Environmental Technology: Protecting Our Waters for the Future
                </h2>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Environmental protection has evolved from a nice-to-have
                  consideration to an essential aspect of marina operations.
                  Today's boat owners are increasingly environmentally conscious
                  and actively choose marinas based on their environmental
                  stewardship practices. This shift has driven remarkable
                  innovations in biosecurity and environmental monitoring
                  technology.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Automated water quality monitoring systems have become
                  incredibly sophisticated, continuously tracking multiple
                  parameters and alerting management to potential problems
                  before they become serious issues. These systems can detect
                  everything from fuel spills and chemical contamination to
                  algae blooms and temperature anomalies that might affect
                  marine life.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Advanced hull cleaning systems are being deployed at
                  environmentally conscious marinas worldwide. These systems can
                  remove marine growth and contaminants while capturing and
                  filtering all removed material, preventing it from entering
                  the water and potentially spreading to other areas. This
                  represents a significant improvement over traditional cleaning
                  methods that often released contaminants back into the
                  environment.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  The{" "}
                  <a
                    href="https://www.marinas.net.au"
                    className="font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Marine Industry Association (MIA)
                  </a>{" "}
                  <a
                    href="https://www.marinas.net.au/accreditation/clean-marina-program/"
                    className="font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Clean Marina Program
                  </a>{" "}
                  is developing new certification standards that help marinas
                  demonstrate their environmental commitment while providing
                  boat owners with clear criteria for choosing environmentally
                  responsible facilities. These certifications are becoming
                  increasingly important marketing tools as environmental
                  consciousness continues to grow among boaters.
                </p>
              </div>

              {/* Mobile Communication Section */}
              <div className="mb-12">
                <h2
                  id="mobile-communication"
                  className="font-bold text-zinc-900 mt-12 mb-6 scroll-mt-24"
                  style={{ fontSize: "50px", lineHeight: "54px" }}
                >
                  Mobile Communication: Meeting Customers Where They Are
                </h2>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  The final piece of the technology puzzle is mobile-first
                  communication systems that recognise the reality of modern
                  life: everyone has a smartphone, and they expect to use it for
                  everything. Smart marinas are ensuring all their
                  communications and services are optimized for mobile devices.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Geofenced notifications represent one of the most innovative
                  applications of mobile technology in marina settings. These
                  location-based systems can automatically detect when customers
                  are approaching the marina and provide personalized welcome
                  messages, navigation assistance to their assigned berth, and
                  information about current services and amenities.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Emergency communication capabilities become absolutely
                  critical during severe weather or other emergency situations.
                  Mobile systems can deliver essential safety information or
                  evacuation instructions to everyone in the marina
                  simultaneously, ensuring that critical information reaches
                  people immediately regardless of their location within the
                  facility.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Targeted communications based on customer preferences and
                  behaviour patterns help marinas provide more personalized
                  service. Whether it's notifying customers about upcoming
                  events they might enjoy, sending weather alerts relevant to
                  their boating plans, or providing updates about maintenance
                  activities that might affect their boats, mobile communication
                  ensures the right information reaches the right people at the
                  right time.
                </p>
              </div>

              {/* Future Section */}
              <div className="mb-12">
                <h2
                  id="charting-course-future"
                  className="font-bold text-zinc-900 mt-12 mb-6 scroll-mt-24"
                  style={{ fontSize: "50px", lineHeight: "54px" }}
                >
                  Charting a Course for Tomorrow's Marina
                </h2>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  These technological trends represent just the beginning of
                  what promises to be an exciting period of innovation in marina
                  operations. As artificial intelligence becomes more
                  sophisticated, sensor networks become more comprehensive, and
                  mobile technologies continue to evolve, the possibilities for
                  improving marina operations and customer experiences will
                  continue to expand dramatically.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  The most successful marinas of the future will be those that
                  embrace these technological advances while never losing sight
                  of what truly matters: providing exceptional service to the
                  boating community. Technology should enhance human
                  interactions, not replace them. The goal is to use these
                  powerful tools to create more time for meaningful customer
                  relationships, more efficient operations, and more sustainable
                  environmental practices.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  For marina operators considering these technological
                  investments, the key is to start with solutions that address
                  the most pressing operational challenges while providing clear
                  benefits to customers. Whether that means implementing smart
                  monitoring systems, upgrading to comprehensive management
                  software, or developing mobile communication capabilities, the
                  important thing is to begin the journey toward becoming a
                  truly modern marina.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  The future of marina operations is incredibly bright, powered
                  by technologies that make facilities more efficient, more
                  responsive, and more enjoyable for the boating community they
                  serve. Those who embrace this technological revolution today
                  will be best positioned to navigate the competitive waters of
                  tomorrow's marina industry and provide the exceptional
                  experiences that today's boaters expect and deserve.
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
                    <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4">
                      <img
                        src="/sara.jpg"
                        alt="Sarah Johnson"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-semibold text-zinc-900 text-lg mb-2">
                      Sarah Johnson
                    </h3>
                    <p className="text-zinc-600 text-sm leading-relaxed mb-4">
                      Technology & AI Specialist with expertise in marina
                      management systems and digital transformation
                    </p>
                    <div className="flex justify-center space-x-3">
                      <button
                        type="button"
                        className="text-zinc-400 hover:text-zinc-600 transition-colors"
                        aria-label="X profile"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <title>X</title>
                          <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
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
