import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/animations/Reveal";

export default function EssentialSailingKnots() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    document.title =
      "Master These 3 Essential Sailing Knots Every Boater Must Know | Harbr Blog";
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
      title: "The Bowline: The King of Sailing Knots",
      id: "the-bowline",
    },
    {
      title: "The Clove Hitch: Your Quick-Deploy Solution",
      id: "the-clove-hitch",
    },
    {
      title: "The Cleat Hitch: Mastering the Dock Connection",
      id: "the-cleat-hitch",
    },
    {
      title: "Practice Makes Perfect",
      id: "practice-makes-perfect",
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
              Master These 3 Essential Sailing Knots Every Boater Must Know
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
                  August 30, 2025
                </span>
                <span
                  className="mx-2"
                  style={{ fontSize: "16px", lineHeight: "22px" }}
                >
                  •
                </span>
                <span style={{ fontSize: "16px", lineHeight: "22px" }}>
                  10 min read
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

          {/* Article Content */}
          <div className="lg:col-span-3">
            <div className="prose prose-lg max-w-none">
              {/* Hero Image */}
              <div className="mb-8">
                <img
                  src="/blog-images/modern-technology-marina.jpg"
                  alt="Master these 3 essential sailing knots every boater must know"
                  className="w-3/4 h-auto rounded-lg shadow-lg mb-8 mx-auto"
                />
              </div>

              {/* Introduction */}
              <div className="mb-8">
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Whether you're a weekend sailor or planning your first ocean
                  adventure, mastering the art of rope work is fundamental to
                  safe and successful boating. While there are hundreds of
                  sailing knots designed for specific purposes, three knots form
                  the cornerstone of essential seamanship skills that every
                  boater should know by heart.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  These aren't just pretty rope tricks, they're practical tools
                  that could mean the difference between a secure mooring and a
                  drifting boat, or between safely deploying fenders and
                  watching them float away. The beauty of these three knots lies
                  in their versatility, reliability, and the fact that once you
                  master them, they'll serve you well in countless situations
                  both on and off the water.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Let's dive into these three must-know knots that will build
                  your confidence and competence as a mariner.
                </p>
              </div>

              {/* The Bowline Section */}
              <div className="mb-12">
                <h2
                  id="the-bowline"
                  className="font-bold text-zinc-900 mt-12 mb-6 scroll-mt-24"
                  style={{ fontSize: "50px", lineHeight: "54px" }}
                >
                  The Bowline: The King of Sailing Knots
                </h2>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Often called the "king of knots," the bowline creates a secure
                  loop that won't slip under load but can easily be untied when
                  tension is released. This makes it invaluable for countless
                  sailing applications, from securing dock lines to creating
                  attachment points for sheets and halyards.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  The name "bowline" comes from its traditional use in tying a
                  loop in the bow line when mooring a vessel. However, its
                  applications extend far beyond docking. You'll use it for
                  rescue operations, securing gear, and any situation requiring
                  a reliable, temporary loop.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-4 text-base lg:text-lg font-semibold">
                  Step-by-step instructions:
                </p>
                <ol className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg list-decimal pl-6 space-y-2">
                  <li>
                    Create a small loop in your rope by making a half twist,
                    ensuring the working end comes up through the loop from
                    underneath
                  </li>
                  <li>
                    Take the working end (the "rabbit") and pass it up through
                    the small loop (the "hole")
                  </li>
                  <li>
                    Wrap it around the standing line (the "tree") from right to
                    left
                  </li>
                  <li>
                    Bring it back down through the original small loop,
                    following the same path it took going up
                  </li>
                  <li>
                    Dress the knot by pulling both ends to snug it up properly
                  </li>
                </ol>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  The classic memory aid: "up through the rabbit hole, around
                  the tree, and back down the hole" has helped generations of
                  sailors master this essential knot. Practice this sequence
                  until it becomes muscle memory, as you'll often need to tie a
                  bowline in challenging conditions with cold, wet hands or in
                  the dark.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  <strong>Pro tip:</strong> A properly tied bowline should have
                  the working end on the same side as the standing line. If
                  they're on opposite sides, you've tied a "cowboy bowline,"
                  which is less secure and more prone to failure.
                </p>
                <div className="mb-8">
                  <img
                    src="/blog-images/king_of_sailing_knots.png"
                    alt="Master these 3 essential sailing knots every boater must know"
                    className="w-3/4 h-auto rounded-lg shadow-lg mb-8 mx-auto"
                  />
                </div>
              </div>

              {/* The Clove Hitch Section */}
              <div className="mb-12">
                <h2
                  id="the-clove-hitch"
                  className="font-bold text-zinc-900 mt-12 mb-6 scroll-mt-24"
                  style={{ fontSize: "50px", lineHeight: "54px" }}
                >
                  The Clove Hitch: Your Quick-Deploy Solution
                </h2>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  The clove hitch is your go-to knot for quickly securing a line
                  to a post, rail, or another rope. It's particularly useful for
                  temporarily attaching fenders to your boat's lifelines or dock
                  lines to pilings when you need a fast, adjustable connection.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  What makes the clove hitch special is its speed of deployment
                  and its ability to hold well under steady tension, though it
                  can work loose under varying loads. This characteristic makes
                  it perfect for temporary attachments but less suitable for
                  critical, long-term applications.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-4 text-base lg:text-lg font-semibold">
                  Step-by-step instructions:
                </p>
                <ol className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg list-decimal pl-6 space-y-2">
                  <li>
                    Pass the rope over and around your attachment point (post,
                    rail, or line)
                  </li>
                  <li>
                    Cross over the standing line and wrap around the attachment
                    point a second time
                  </li>
                  <li>
                    On this second wrap, pass the working end under the rope
                    where it crosses over itself
                  </li>
                  <li>
                    Pull tight to secure, you should see a distinctive
                    figure-eight pattern
                  </li>
                  <li>
                    For extra security, you can add a half hitch with the
                    working end
                  </li>
                </ol>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  The clove hitch's adjustability makes it excellent for fender
                  placement, allowing you to slide the fender up or down the
                  lifeline to the perfect position. However, always inspect
                  clove hitches regularly, as they can loosen over time,
                  especially with cyclic loading from wave action.
                </p>
                <div className="mb-8">
                  <img
                    src="/blog-images/quick-deploy_solution.png"
                    alt="Master these 3 essential sailing knots every boater must know"
                    className="w-1/4 h-auto rounded-lg shadow-lg mb-8 mx-auto"
                  />
                </div>
              </div>

              {/* The Cleat Hitch Section */}
              <div className="mb-12">
                <h2
                  id="the-cleat-hitch"
                  className="font-bold text-zinc-900 mt-12 mb-6 scroll-mt-24"
                  style={{ fontSize: "50px", lineHeight: "54px" }}
                >
                  The Cleat Hitch: Mastering the Dock Connection
                </h2>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Every marina has them, and every sailor must master them,
                  cleats are the workhorses of boat and dock hardware. The cleat
                  hitch provides a secure way to belay (secure) a line under
                  tension while allowing for quick release when needed.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Proper cleat technique is crucial not just for security, but
                  for marina etiquette. A poorly secured line or an improper
                  cleat hitch can be dangerous and marks you as an inexperienced
                  sailor.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-4 text-base lg:text-lg font-semibold">
                  Step-by-step instructions:
                </p>
                <ol className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg list-decimal pl-6 space-y-2">
                  <li>
                    Take one complete turn around the base of the cleat to
                    establish your foundation
                  </li>
                  <li>
                    Create a figure-eight pattern by crossing over the top of
                    the cleat
                  </li>
                  <li>
                    Continue the figure-eight pattern back across the cleat
                  </li>
                  <li>
                    On your final pass, create a locking hitch by tucking the
                    working end under the last crossing point
                  </li>
                  <li>
                    Pull snug, but avoid over-tightening, which makes release
                    difficult
                  </li>
                </ol>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  <strong>Important note:</strong> Never start with the locking
                  hitch, always begin with the full turn around the base. This
                  distributes the load properly and prevents the rope from
                  jumping off the cleat under sudden tension.
                </p>
                <div className="mb-8">
                  <img
                    src="/blog-images/dock_connection.png"
                    alt="Master these 3 essential sailing knots every boater must know"
                    className="w-3/4 h-auto rounded-lg shadow-lg mb-8 mx-auto"
                  />
                </div>
              </div>

              {/* Practice Makes Perfect Section */}
              <div className="mb-12">
                <h2
                  id="practice-makes-perfect"
                  className="font-bold text-zinc-900 mt-12 mb-6 scroll-mt-24"
                  style={{ fontSize: "50px", lineHeight: "54px" }}
                >
                  Practice Makes Perfect
                </h2>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  These three knots are your foundation, but knowledge without
                  practice is worthless at sea. Set aside time to practice each
                  knot until you can tie them quickly and correctly without
                  thinking. Start slowly, focus on proper technique, and
                  gradually increase your speed.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Consider practicing in various conditions, with gloves on, in
                  poor light, or while the rope is wet. These real-world
                  conditions will test your muscle memory and build the
                  confidence you'll need when it matters most.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Remember, in sailing, your life and your vessel often depend
                  on the integrity of your knots. Master these three
                  fundamentals, and you'll have the foundation for safe,
                  confident seamanship that will serve you well throughout your
                  sailing adventures.
                </p>
                <p className="text-zinc-700 leading-relaxed mb-6 text-base lg:text-lg">
                  Ready to put these skills to the test at the marina? Read{" "}
                  <a
                    href="/blog/complete-guide-mastering-marina-mooring"
                    className="font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
                  >
                    Harbr's Complete Guide to Mastering Marina Mooring
                  </a>{" "}
                  for expert docking techniques that will complement your
                  newfound knot skills.
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
