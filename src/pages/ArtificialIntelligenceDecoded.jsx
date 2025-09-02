import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/animations/Reveal";

export default function ArtificialIntelligenceDecoded() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    document.title = "Artificial Intelligence: Decoded | Harbr Blog";
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
      title: "Teaching the Perfect Intern",
      id: "teaching-perfect-intern",
    },
    {
      title: "Pattern Recognition at Scale",
      id: "pattern-recognition-scale",
    },
    {
      title: "Real-World AI Applications",
      id: "real-world-applications",
    },
    {
      title: "The Magic of Sophisticated Patterns",
      id: "sophisticated-patterns",
    },
    {
      title: "Human vs Artificial Intelligence",
      id: "human-vs-ai",
    },
    {
      title: "AI-Powered Marina Management",
      id: "ai-marina-management",
    },
  ];

  return (
    <article className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="px-6 py-16 lg:py-24 lg:px-8">
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
              Artificial Intelligence: Decoded
            </h1>

            {/* Meta Information */}
            <div className="text-center text-sm mb-8">
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
                  className="font-medium mx-1 underline"
                  style={{ fontSize: "16px", lineHeight: "22px" }}
                >
                  Michael Chen
                </span>
              </div>
              <div className="flex items-center justify-center mt-[16px]">
                <span style={{ fontSize: "16px", lineHeight: "22px" }}>
                  September 30, 2025
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
                                  e.target.style.color = "#71717a";
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

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Reveal delay={0.3}>
              <div className="mb-12">
                <img
                  src="/blog-images/artificial-intelligence-decoded.jpg"
                  alt="Artificial Intelligence concept with neural networks and data patterns"
                  className="w-full h-64 object-cover rounded-lg mb-8"
                />
              </div>
            </Reveal>

            <article className="prose prose-lg max-w-none">
              <Reveal delay={0.4}>
                <section className="mb-12">
                  <h2
                    id="teaching-perfect-intern"
                    className="text-3xl font-bold mb-6"
                    style={{
                      fontSize: "36px",
                      lineHeight: "40px",
                      fontWeight: "700",
                    }}
                  >
                    Teaching the Perfect Intern
                  </h2>
                  <p
                    className="mb-6"
                    style={{
                      fontSize: "18px",
                      lineHeight: "30px",
                      color: "#333",
                    }}
                  >
                    Think of AI like teaching a really dedicated but
                    literal-minded intern. You know that person who follows
                    instructions perfectly but has zero intuition? That's
                    essentially what we're working with, except this intern can
                    process information at superhuman speed and never needs
                    coffee breaks.
                  </p>
                  <p
                    className="mb-8"
                    style={{
                      fontSize: "18px",
                      lineHeight: "30px",
                      color: "#333",
                    }}
                  >
                    Here's how it works: Imagine you're trying to teach someone
                    to recognise spam emails. You'd sit down with them and go
                    through thousands of emails, pointing out patterns - "See
                    how this one promises you millions from a Nigerian prince?
                    That's spam. Notice how this one has 15 exclamation marks?
                    Also spam." After seeing enough examples, your intern starts
                    catching on to the patterns.
                  </p>
                </section>
              </Reveal>

              <Reveal delay={0.5}>
                <section className="mb-12">
                  <h2
                    id="pattern-recognition-scale"
                    className="text-3xl font-bold mb-6"
                    style={{
                      fontSize: "36px",
                      lineHeight: "40px",
                      fontWeight: "700",
                    }}
                  >
                    Pattern Recognition at Scale
                  </h2>
                  <p
                    className="mb-8"
                    style={{
                      fontSize: "18px",
                      lineHeight: "30px",
                      color: "#333",
                    }}
                  >
                    AI works the same way, but instead of looking at thousands
                    of examples, it analyzes millions or billions. It's like
                    having someone with an eidetic memory who can instantly
                    recall every pattern they've ever seen.
                  </p>
                </section>
              </Reveal>

              <Reveal delay={0.6}>
                <section className="mb-12">
                  <h2
                    id="real-world-applications"
                    className="text-3xl font-bold mb-6"
                    style={{
                      fontSize: "36px",
                      lineHeight: "40px",
                      fontWeight: "700",
                    }}
                  >
                    Real-World AI Applications
                  </h2>
                  <p
                    className="mb-6"
                    style={{
                      fontSize: "18px",
                      lineHeight: "30px",
                      color: "#333",
                    }}
                  >
                    Take Netflix recommendations. The AI has watched how
                    millions of people rate movies - it notices that people who
                    loved "The Office" and "Parks and Rec" also tend to enjoy
                    "Brooklyn Nine-Nine." It's not actually understanding humor
                    or character development like you do; it's just really,
                    really good at pattern matching based on massive amounts of
                    data.
                  </p>
                  <p
                    className="mb-8"
                    style={{
                      fontSize: "18px",
                      lineHeight: "30px",
                      color: "#333",
                    }}
                  >
                    Or consider GPS navigation. The AI isn't "thinking" about
                    your route the way you would. You might think "I'll avoid
                    Main Street because there's always construction there." The
                    AI just knows that based on current traffic data, historical
                    patterns, and millions of other trips, Route A will be
                    faster than Route B right now.
                  </p>
                </section>
              </Reveal>

              <Reveal delay={0.7}>
                <section className="mb-12">
                  <h2
                    id="sophisticated-patterns"
                    className="text-3xl font-bold mb-6"
                    style={{
                      fontSize: "36px",
                      lineHeight: "40px",
                      fontWeight: "700",
                    }}
                  >
                    The Magic of Sophisticated Patterns
                  </h2>
                  <p
                    className="mb-8"
                    style={{
                      fontSize: "18px",
                      lineHeight: "30px",
                      color: "#333",
                    }}
                  >
                    The fascinating part is that these pattern-recognition
                    systems have gotten so sophisticated they can do things that
                    feel almost magical - like ChatGPT writing poetry or DALL-E
                    creating art. But at its core, it's still that super-powered
                    intern, finding incredibly complex patterns in unimaginably
                    large datasets.
                  </p>
                </section>
              </Reveal>

              <Reveal delay={0.8}>
                <section className="mb-12">
                  <h2
                    id="human-vs-ai"
                    className="text-3xl font-bold mb-6"
                    style={{
                      fontSize: "36px",
                      lineHeight: "40px",
                      fontWeight: "700",
                    }}
                  >
                    Human vs Artificial Intelligence
                  </h2>
                  <p
                    className="mb-8"
                    style={{
                      fontSize: "18px",
                      lineHeight: "30px",
                      color: "#333",
                    }}
                  >
                    The key difference from human intelligence? We understand
                    context, meaning, and can think creatively about things
                    we've never encountered. AI is brilliant at optimisation and
                    pattern recognition, but it's still following very
                    sophisticated rules rather than truly understanding the
                    world like we do.
                  </p>
                </section>
              </Reveal>

              <Reveal delay={0.9}>
                <section className="mb-12">
                  <h2
                    id="ai-marina-management"
                    className="text-3xl font-bold mb-6"
                    style={{
                      fontSize: "36px",
                      lineHeight: "40px",
                      fontWeight: "700",
                    }}
                  >
                    AI-Powered Marina Management
                  </h2>
                  <p
                    className="mb-6"
                    style={{
                      fontSize: "18px",
                      lineHeight: "30px",
                      color: "#333",
                    }}
                  >
                    <a
                      href="/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline font-medium"
                    >
                      Harbr
                    </a>{" "}
                    is incorporating AI into marina management and operations
                    unlike any other marina software program. From automating
                    repetitive admin tasks to optimizing berth allocation and
                    predicting maintenance needs, AI is transforming how marinas
                    operate.
                  </p>
                  <p
                    className="mb-8"
                    style={{
                      fontSize: "18px",
                      lineHeight: "30px",
                      color: "#333",
                    }}
                  >
                    Drop the team a line to discuss how AI powered software can
                    transform your marina operations, from reducing admin & data
                    entry to increasing revenue and customer service.
                  </p>
                </section>
              </Reveal>
            </article>
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
                          xmlns="http://www.w3.org/2000/svg"
                        >
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
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                            clipRule="evenodd"
                          />
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
    </article>
  );
}
