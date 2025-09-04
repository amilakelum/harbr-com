import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/animations/Reveal";

export default function MarinaAccreditationPrograms() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    document.title =
      "The Top 4 Marina Accreditation Programs in Australia | Harbr Blog";
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
      title: "Gold Anchor Program",
      id: "gold-anchor-program",
    },
    {
      title: "Superyacht Ready",
      id: "superyacht-ready",
    },
    {
      title: "Clean Marina Program",
      id: "clean-marina-program",
    },
    {
      title: "Fish Friendly Marinas",
      id: "fish-friendly-marinas",
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
                MARINA MANAGEMENT & COMPLIANCE
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.1] tracking-[-0.02em] font-bold mb-6"
              style={{ fontSize: "50px", lineHeight: "54px" }}
            >
              The Top 4 Marina Accreditation Programs in Australia
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
                  Chris Mihatov
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
                  September 4, 2025
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

          {/* Main Article Content */}
          <div className="lg:col-span-3">
            <Reveal delay={0.3}>
              <div className="mb-12">
                <img
                  src="/blog-images/marina-accreditation-programs.jpg"
                  alt="Marina accreditation programs in Australia showcasing quality standards"
                  className="w-full h-64 object-cover rounded-lg mb-8"
                />
              </div>
            </Reveal>

            <article className="prose prose-lg max-w-none">
              <Reveal delay={0.4}>
                <section className="mb-12">
                  <h2
                    id="gold-anchor-program"
                    className="text-3xl font-bold mb-6"
                    style={{
                      fontSize: "36px",
                      lineHeight: "40px",
                      fontWeight: "700",
                    }}
                  >
                    1. Gold Anchor Program
                  </h2>

                  <h3
                    id="gold-anchor-about"
                    className="text-2xl font-semibold mb-4"
                  >
                    About the Program
                  </h3>
                  <p
                    className="mb-6"
                    style={{
                      fontSize: "18px",
                      lineHeight: "30px",
                      color: "#333",
                    }}
                  >
                    The{" "}
                    <a
                      href="https://www.marinas.net.au/accreditation/gold-anchor-program/about-the-gold-anchor-program/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Gold Anchor Program
                    </a>{" "}
                    is an industry-developed accreditation system designed to
                    raise marina standards and provide customer-centric
                    services. It helps marinas differentiate themselves in the
                    marketplace and provides global performance benchmarking for
                    continuous business improvement, while assisting consumers
                    in evaluating and selecting marinas that align with their
                    needs.
                  </p>

                  <h4 className="text-xl font-semibold mb-3">
                    Global Administration
                  </h4>
                  <p
                    className="mb-6"
                    style={{
                      fontSize: "18px",
                      lineHeight: "30px",
                      color: "#333",
                    }}
                  >
                    The program is jointly administered by{" "}
                    <a
                      href="https://www.tyha.co.uk/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      The Yacht Harbour Association (TYHA)
                    </a>{" "}
                    and{" "}
                    <a
                      href="https://www.marinas.net.au/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Marina Industries Association (MIA)
                    </a>
                    , with regional coverage spanning the UK, Europe, Middle
                    East, Africa, Caribbean, Asia, India, Sri Lanka, Pacific
                    regions including Australia and New Zealand, and the
                    Americas.
                  </p>

                  <h3
                    id="gold-anchor-criteria"
                    className="text-2xl font-semibold mb-4"
                  >
                    Assessment Criteria and Scoring
                  </h3>
                  <p
                    className="mb-4"
                    style={{
                      fontSize: "18px",
                      lineHeight: "30px",
                      color: "#333",
                    }}
                  >
                    The assessment criteria is broken into six categories with
                    specific percentage point allocations:
                  </p>
                  <ul className="mb-6 list-disc pl-6">
                    <li
                      style={{
                        fontSize: "18px",
                        lineHeight: "30px",
                        color: "#333",
                      }}
                    >
                      Ambiance: 20%
                    </li>
                    <li
                      style={{
                        fontSize: "18px",
                        lineHeight: "30px",
                        color: "#333",
                      }}
                    >
                      Planning, policies & procedures: 10%
                    </li>
                    <li
                      style={{
                        fontSize: "18px",
                        lineHeight: "30px",
                        color: "#333",
                      }}
                    >
                      Customer service: 20%
                    </li>
                    <li
                      style={{
                        fontSize: "18px",
                        lineHeight: "30px",
                        color: "#333",
                      }}
                    >
                      Environment: 10%
                    </li>
                    <li
                      style={{
                        fontSize: "18px",
                        lineHeight: "30px",
                        color: "#333",
                      }}
                    >
                      On-water facilities & infrastructure: 20%
                    </li>
                    <li
                      style={{
                        fontSize: "18px",
                        lineHeight: "30px",
                        color: "#333",
                      }}
                    >
                      On-shore facilities & infrastructure: 20%
                    </li>
                  </ul>

                  <h3
                    id="gold-anchor-levels"
                    className="text-2xl font-semibold mb-4"
                  >
                    Accreditation Levels
                  </h3>
                  <p
                    className="mb-4"
                    style={{
                      fontSize: "18px",
                      lineHeight: "30px",
                      color: "#333",
                    }}
                  >
                    The scoring thresholds for different accreditation levels
                    are:
                  </p>
                  <ul className="mb-6 list-disc pl-6">
                    <li
                      style={{
                        fontSize: "18px",
                        lineHeight: "30px",
                        color: "#333",
                      }}
                    >
                      5 Platinum (Recommended): 95-100%
                    </li>
                    <li
                      style={{
                        fontSize: "18px",
                        lineHeight: "30px",
                        color: "#333",
                      }}
                    >
                      5 Gold: 85-94%
                    </li>
                    <li
                      style={{
                        fontSize: "18px",
                        lineHeight: "30px",
                        color: "#333",
                      }}
                    >
                      4 Gold: 75-84%
                    </li>
                    <li
                      style={{
                        fontSize: "18px",
                        lineHeight: "30px",
                        color: "#333",
                      }}
                    >
                      3 Gold: 65-74%
                    </li>
                  </ul>

                  <h3
                    id="gold-anchor-process"
                    className="text-2xl font-semibold mb-4"
                  >
                    Assessment Process
                  </h3>
                  <p
                    className="mb-6"
                    style={{
                      fontSize: "18px",
                      lineHeight: "30px",
                      color: "#333",
                    }}
                  >
                    The program is based on self-assessment and site assessment
                    across the six evaluation categories. To achieve Gold Anchor
                    accreditation, a berth holder survey is also conducted, and
                    once the assessor completes their evaluation and report, an
                    accreditation recommendation is put to either TYHA or MIA
                    Gold Anchor Standards Panels for approval.
                  </p>

                  <h4 className="text-xl font-semibold mb-3">
                    Accreditation Types
                  </h4>
                  <p
                    className="mb-4"
                    style={{
                      fontSize: "18px",
                      lineHeight: "30px",
                      color: "#333",
                    }}
                  >
                    <strong>Self-Assessment:</strong> Following completion of
                    the application form, the marina receives an Assessment
                    Booklet for completion and return. The content is desk
                    reviewed by a Gold Anchor assessor who also considers other
                    sources like websites and publications.
                  </p>
                  <p
                    className="mb-4"
                    style={{
                      fontSize: "18px",
                      lineHeight: "30px",
                      color: "#333",
                    }}
                  >
                    <strong>Levels 3, 4 and 5 Accreditation:</strong> After
                    completing the application and assessment booklet, a berth
                    holder survey is completed for customer feedback. A Gold
                    Anchor assessor arranges an on-site assessment, prepares a
                    draft report shared with the applicant for accuracy
                    checking, and once finalized, the Gold Anchor Committee
                    awards the appropriate accreditation level.
                  </p>
                  <p
                    className="mb-6"
                    style={{
                      fontSize: "18px",
                      lineHeight: "30px",
                      color: "#333",
                    }}
                  >
                    <strong>Platinum Accreditation:</strong> For marinas
                    catering to very discerning customers (often superyacht
                    facilities), TYHA and MIA offer a 5 Gold Anchor Platinum
                    accreditation. Marinas achieving extremely high assessment
                    scores in all categories are recommended by the Gold Anchor
                    Committee for further assessment for this highest level.
                  </p>

                  <h4 className="text-xl font-semibold mb-3">
                    Quality Assurance
                  </h4>
                  <p
                    className="mb-8"
                    style={{
                      fontSize: "18px",
                      lineHeight: "30px",
                      color: "#333",
                    }}
                  >
                    Mystery shopper checks are used during the three-year
                    validity period to ensure accreditation remains valid while
                    providing valuable additional information to the marina.
                    Independent assessments involve audits every three years by
                    experienced marina professionals.
                  </p>

                  <h3
                    id="gold-anchor-costs"
                    className="text-2xl font-semibold mb-4"
                  >
                    Indicative Costs
                  </h3>
                  <p
                    className="mb-4"
                    style={{
                      fontSize: "18px",
                      lineHeight: "30px",
                      color: "#333",
                    }}
                  >
                    The Participation Fee covers a three-year assessment period,
                    with independent assessor fees charged additionally and
                    subject to the scope of the site. The costs are structured
                    by marina size:
                  </p>

                  <h4 className="text-xl font-semibold mb-3">
                    Self-Assessed Pricing:
                  </h4>
                  <ul className="mb-6 list-disc pl-6">
                    <li
                      style={{
                        fontSize: "18px",
                        lineHeight: "30px",
                        color: "#333",
                      }}
                    >
                      Up to 30 berths: $1,600
                    </li>
                    <li
                      style={{
                        fontSize: "18px",
                        lineHeight: "30px",
                        color: "#333",
                      }}
                    >
                      31-80 berths: $1,650
                    </li>
                    <li
                      style={{
                        fontSize: "18px",
                        lineHeight: "30px",
                        color: "#333",
                      }}
                    >
                      81-130 berths: $1,700
                    </li>
                    <li
                      style={{
                        fontSize: "18px",
                        lineHeight: "30px",
                        color: "#333",
                      }}
                    >
                      131-150 berths: $1,750
                    </li>
                    <li
                      style={{
                        fontSize: "18px",
                        lineHeight: "30px",
                        color: "#333",
                      }}
                    >
                      151-250 berths: $1,875
                    </li>
                    <li
                      style={{
                        fontSize: "18px",
                        lineHeight: "30px",
                        color: "#333",
                      }}
                    >
                      251-400 berths: $1,950
                    </li>
                    <li
                      style={{
                        fontSize: "18px",
                        lineHeight: "30px",
                        color: "#333",
                      }}
                    >
                      401-700 berths: $2,100
                    </li>
                    <li
                      style={{
                        fontSize: "18px",
                        lineHeight: "30px",
                        color: "#333",
                      }}
                    >
                      Over 700 berths: $2,200
                    </li>
                  </ul>

                  <p
                    className="mb-8"
                    style={{
                      fontSize: "18px",
                      lineHeight: "30px",
                      color: "#333",
                    }}
                  >
                    <strong>Rated (Assessed) Pricing</strong> ranges from $1,950
                    for marinas up to 30 berths to $3,500 for marinas over 700
                    berths, with additional assessor fees ranging from $650 to
                    $1,200 depending on marina size. Additional charges apply
                    for Platinum Loading ($200-$1,000), Super Yacht Ready
                    certification ($1,200-$1,550), and Non-Member Loading
                    ($1,000-$2,300).
                  </p>
                </section>
              </Reveal>

              <Reveal delay={0.5}>
                <section className="mb-12">
                  <h2
                    id="superyacht-ready"
                    className="text-3xl font-bold mb-6"
                    style={{
                      fontSize: "36px",
                      lineHeight: "40px",
                      fontWeight: "700",
                    }}
                  >
                    2. Superyacht Ready
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
                      href="https://www.marinas.net.au/accreditation/superyacht-ready/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Superyacht Ready
                    </a>{" "}
                    is an accreditation available to marinas that have the
                    minimum capacity and capabilities required to provide safe
                    and adequate berthing for superyachts.
                  </p>

                  <h4 className="text-xl font-semibold mb-3">Eligibility:</h4>
                  <p
                    className="mb-4"
                    style={{
                      fontSize: "18px",
                      lineHeight: "30px",
                      color: "#333",
                    }}
                  >
                    Available to Global Gold Anchor accredited marinas that
                    satisfy the program's assessment standards. Marinas not yet
                    in the Gold Anchor program can join via Gold Anchor
                    self-assessed accreditation first.
                  </p>

                  <h4 className="text-xl font-semibold mb-3">
                    Assessment Criteria:
                  </h4>
                  <p
                    className="mb-4"
                    style={{
                      fontSize: "18px",
                      lineHeight: "30px",
                      color: "#333",
                    }}
                  >
                    Based on the marina's infrastructure suitability to
                    accommodate superyachts, accessibility, security measures,
                    and service availability.
                  </p>

                  <h4 className="text-xl font-semibold mb-3">Purpose:</h4>
                  <p
                    className="mb-4"
                    style={{
                      fontSize: "18px",
                      lineHeight: "30px",
                      color: "#333",
                    }}
                  >
                    Designed to help skippers and owners identify suitable
                    marinas for their vessels. Supported by MIA's My Marina
                    Guide, a map-based online marine services directory that
                    enables captains to identify Superyacht Ready marinas based
                    on their specific needs.
                  </p>

                  <h4 className="text-xl font-semibold mb-3">Process:</h4>
                  <p
                    className="mb-4"
                    style={{
                      fontSize: "18px",
                      lineHeight: "30px",
                      color: "#333",
                    }}
                  >
                    The assessment declaration is reviewed by the MIA Gold
                    Anchor Committee and upon approval, the marina is authorized
                    to use the Superyacht Ready branding and marketing.
                  </p>

                  <h4 className="text-xl font-semibold mb-3">Cost:</h4>
                  <p
                    className="mb-6"
                    style={{
                      fontSize: "18px",
                      lineHeight: "30px",
                      color: "#333",
                    }}
                  >
                    3-year participation fee is A$1,200 + GST.
                  </p>

                  <h4 className="text-xl font-semibold mb-3">
                    Important Note:
                  </h4>
                  <p
                    className="mb-8"
                    style={{
                      fontSize: "18px",
                      lineHeight: "30px",
                      color: "#333",
                    }}
                  >
                    The accreditation is self-assessed by participating marinas
                    and focuses only on minimum capacity and capabilities for
                    superyacht berthing - it doesn't assess the extent, quality
                    or availability of general facilities and amenities. The MIA
                    recommends that those responsible for vessel berthing make
                    their own direct enquiries with marinas regarding
                    suitability and service levels.
                  </p>
                </section>
              </Reveal>

              <Reveal delay={0.6}>
                <section className="mb-12">
                  <h2
                    id="clean-marina-program"
                    className="text-3xl font-bold mb-6"
                    style={{
                      fontSize: "36px",
                      lineHeight: "40px",
                      fontWeight: "700",
                    }}
                  >
                    3. Clean Marina Program
                  </h2>
                  <p
                    className="mb-6"
                    style={{
                      fontSize: "18px",
                      lineHeight: "30px",
                      color: "#333",
                    }}
                  >
                    The{" "}
                    <a
                      href="https://www.marinas.net.au/accreditation/clean-marina-program/about-the-clean-marina-program/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      International Clean Marina Program
                    </a>{" "}
                    is a voluntary accreditation program that encourages
                    environmental compliance and the use of best management
                    practices for marinas.
                  </p>

                  <h4 className="text-xl font-semibold mb-3">Purpose:</h4>
                  <p
                    className="mb-4"
                    style={{
                      fontSize: "18px",
                      lineHeight: "30px",
                      color: "#333",
                    }}
                  >
                    To assist marina industry operators protect inland and
                    coastal waterways through a voluntary accreditation process,
                    with the goal of reducing non-point source pollution
                    associated with boating/marina facilities and promoting
                    clean water, clean air and thriving marina industry
                    businesses.
                  </p>

                  <h4 className="text-xl font-semibold mb-3">
                    Eligible Participants:
                  </h4>
                  <p
                    className="mb-4"
                    style={{
                      fontSize: "18px",
                      lineHeight: "30px",
                      color: "#333",
                    }}
                  >
                    Marinas, yacht clubs, boat clubs, boat repair facilities
                    (such as slipways or travel lift yards), and any associated
                    industry operators.
                  </p>

                  <h4 className="text-xl font-semibold mb-3">
                    Environmental Focus:
                  </h4>
                  <p
                    className="mb-4"
                    style={{
                      fontSize: "18px",
                      lineHeight: "30px",
                      color: "#333",
                    }}
                  >
                    Non-point source pollution occurs when water runs over land,
                    picks up pollutants and deposits them in surface waters.
                    Mismanaged pollutants from everyday marina activities can
                    enter a marina basin as non-point source pollution.
                  </p>

                  <h4 className="text-xl font-semibold mb-3">
                    Program History:
                  </h4>
                  <p
                    className="mb-8"
                    style={{
                      fontSize: "18px",
                      lineHeight: "30px",
                      color: "#333",
                    }}
                  >
                    Developed over a two-year period in consultation with
                    various stakeholders, owned and managed by the MIA, with
                    first assessments conducted in 2005. By 2020, there were 61
                    marinas accredited under the program.
                  </p>

                  <h3
                    id="clean-marina-steps"
                    className="text-2xl font-semibold mb-4"
                  >
                    Steps to Becoming a Clean Marina
                  </h3>
                  <p
                    className="mb-4"
                    style={{
                      fontSize: "18px",
                      lineHeight: "30px",
                      color: "#333",
                    }}
                  >
                    The process is aided by the provision of a step-by-step,
                    easy to follow guidebook and audit checklist. The guidebook
                    outlines operational guidelines for environmental
                    management, including processes for pump outs, hull
                    cleaning, turbidity, emissions, management of wastewater and
                    accidental spills as well as staff training and education of
                    boaters.
                  </p>

                  <ol className="mb-6 list-decimal pl-6">
                    <li
                      style={{
                        fontSize: "18px",
                        lineHeight: "30px",
                        color: "#333",
                        marginBottom: "12px",
                      }}
                    >
                      <strong>Application:</strong> Complete the application
                      form, pledge and sign the Code of Ethics document and
                      return it to the MIA. Arrange payment of invoice for the
                      three year accreditation period (period begins once
                      accreditation is approved).
                    </li>
                    <li
                      style={{
                        fontSize: "18px",
                        lineHeight: "30px",
                        color: "#333",
                        marginBottom: "12px",
                      }}
                    >
                      <strong>Clean Marina Program Materials:</strong> The
                      program provides and requires the use of the Clean Marina
                      Program Guidebook and Audit Checklists, which aim to
                      explain potential environmental impacts, stipulate best
                      management practices, promote compliance with regulations,
                      and foster high standards of ethics.
                    </li>
                    <li
                      style={{
                        fontSize: "18px",
                        lineHeight: "30px",
                        color: "#333",
                        marginBottom: "12px",
                      }}
                    >
                      <strong>Self Assessment (two parts):</strong> A guidebook
                      is forwarded to work through along with the self-audit
                      document as an educational tool. The self-audit document
                      covers 124 specific environmental assessment criteria in
                      areas including facility management, emergency planning,
                      boater education, boat maintenance and storage, fuelling,
                      and workshops and mechanical activities.
                    </li>
                    <li
                      style={{
                        fontSize: "18px",
                        lineHeight: "30px",
                        color: "#333",
                        marginBottom: "12px",
                      }}
                    >
                      <strong>Site Visit:</strong> Assessment by a trained Clean
                      Marina Consultant who conducts a site visit taking
                      approximately two hours. Assessors do a full site review
                      of water and land facilities and request to view
                      documentation such as EMS manuals, training procedures and
                      logs, and contractor agreements.
                    </li>
                    <li
                      style={{
                        fontSize: "18px",
                        lineHeight: "30px",
                        color: "#333",
                        marginBottom: "12px",
                      }}
                    >
                      <strong>Assessor Report:</strong> The assessor completes a
                      report using the audit checklist and ratings. There are
                      mandatory requirements that must be met, and a minimum
                      score of 85% is required for accreditation. If a marina
                      doesn't pass, the assessor and MIA will work with the
                      operator to bring standards up to enable passing.
                    </li>
                    <li
                      style={{
                        fontSize: "18px",
                        lineHeight: "30px",
                        color: "#333",
                        marginBottom: "12px",
                      }}
                    >
                      <strong>Approval Process:</strong> The Clean Marina
                      assessor report is forwarded to the Clean Marina Committee
                      for approval. Upon approval, marinas receive a certificate
                      and Clean Marina flag, are listed on the website, and can
                      use MIA Clean Marina logos for promotion.
                    </li>
                  </ol>

                  <h4 className="text-xl font-semibold mb-3">
                    Re-accreditation (three years):
                  </h4>
                  <p
                    className="mb-8"
                    style={{
                      fontSize: "18px",
                      lineHeight: "30px",
                      color: "#333",
                    }}
                  >
                    The re-accreditation process is similar but doesn't require
                    a new self-audit if no major operational changes have been
                    made. Documentation must be maintained and updated during
                    the accreditation period.
                  </p>

                  <h3
                    id="clean-marina-costs"
                    className="text-2xl font-semibold mb-4"
                  >
                    Clean Marina Program Costs
                  </h3>
                  <p
                    className="mb-4"
                    style={{
                      fontSize: "18px",
                      lineHeight: "30px",
                      color: "#333",
                    }}
                  >
                    The Participation Fee for Clean Marina and Fish Friendly is
                    for a three-year assessment period. Independent assessor
                    fees are charged in addition to the Participation Fee and
                    are subject to the scope of the site.
                  </p>

                  <h4 className="text-xl font-semibold mb-3">
                    MIA Members Participation Fees:
                  </h4>
                  <ul className="mb-6 list-disc pl-6">
                    <li
                      style={{
                        fontSize: "18px",
                        lineHeight: "30px",
                        color: "#333",
                      }}
                    >
                      Up to 100 berths: $1,250 + $1,100 assessor fee
                    </li>
                    <li
                      style={{
                        fontSize: "18px",
                        lineHeight: "30px",
                        color: "#333",
                      }}
                    >
                      101-249 berths: $1,450 + $1,100 assessor fee
                    </li>
                    <li
                      style={{
                        fontSize: "18px",
                        lineHeight: "30px",
                        color: "#333",
                      }}
                    >
                      250-500 berths: $1,550 + $1,200 assessor fee
                    </li>
                    <li
                      style={{
                        fontSize: "18px",
                        lineHeight: "30px",
                        color: "#333",
                      }}
                    >
                      501+ berths: $1,700 + $1,200 assessor fee
                    </li>
                  </ul>

                  <h4 className="text-xl font-semibold mb-3">
                    Additional Charges:
                  </h4>
                  <ul className="mb-8 list-disc pl-6">
                    <li
                      style={{
                        fontSize: "18px",
                        lineHeight: "30px",
                        color: "#333",
                      }}
                    >
                      Boatyard/hardstand loading: $200 extra for 6 or more
                      hardstand spaces
                    </li>
                    <li
                      style={{
                        fontSize: "18px",
                        lineHeight: "30px",
                        color: "#333",
                      }}
                    >
                      Fish Friendly Accreditation (assessed simultaneously with
                      Clean Marina): $550 + $100 assessor fee
                    </li>
                  </ul>
                </section>
              </Reveal>

              <Reveal delay={0.7}>
                <section className="mb-12">
                  <h2
                    id="fish-friendly-marinas"
                    className="text-3xl font-bold mb-6"
                    style={{
                      fontSize: "36px",
                      lineHeight: "40px",
                      fontWeight: "700",
                    }}
                  >
                    4. Fish Friendly Marinas
                  </h2>
                  <p
                    className="mb-6"
                    style={{
                      fontSize: "18px",
                      lineHeight: "30px",
                      color: "#333",
                    }}
                  >
                    Clean waterways with healthy fish populations are good news
                    for marinas and the boating industry. Around 70% of boats
                    are used for recreational fishing, so ensuring clean water
                    and plenty of fish contributes to the ongoing appeal of
                    boating and fishing.
                  </p>

                  <h4 className="text-xl font-semibold mb-3">Purpose:</h4>
                  <p
                    className="mb-4"
                    style={{
                      fontSize: "18px",
                      lineHeight: "30px",
                      color: "#333",
                    }}
                  >
                    The{" "}
                    <a
                      href="https://www.marinas.net.au/accreditation/fish-friendly-marinas/about-fish-friendly-marinas/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Fish Friendly Marinas Accreditation
                    </a>{" "}
                    has been developed to inform marina managers on how to
                    maximize benefits for fish and recognize operators actively
                    working to improve fish habitats.
                  </p>

                  <h4 className="text-xl font-semibold mb-3">
                    What It Provides:
                  </h4>
                  <p
                    className="mb-4"
                    style={{
                      fontSize: "18px",
                      lineHeight: "30px",
                      color: "#333",
                    }}
                  >
                    The Program provides advice and supporting material to help
                    marina operators incorporate beneficial outcomes for native
                    fish into their existing operational plans, such as ensuring
                    their marina is free from marine pests and providing habitat
                    for native fish.
                  </p>

                  <h4 className="text-xl font-semibold mb-3">
                    Connection to Clean Marina Program:
                  </h4>
                  <p
                    className="mb-4"
                    style={{
                      fontSize: "18px",
                      lineHeight: "30px",
                      color: "#333",
                    }}
                  >
                    The initiative is attached to MIA's International Clean
                    Marinas Program and the accreditation is an add-on for
                    marinas with Level 3 and Level 4 Clean Marina accreditation.
                    The accreditation can be completed at the same time as the
                    Clean Marina Accreditation or separately.
                  </p>

                  <h4 className="text-xl font-semibold mb-3">
                    Becoming a Fish Friendly Marina:
                  </h4>
                  <p
                    className="mb-4"
                    style={{
                      fontSize: "18px",
                      lineHeight: "30px",
                      color: "#333",
                    }}
                  >
                    As the Fish Friendly Program is an extension to the Clean
                    Marina Program, the process is the same as for Clean Marina.
                    It is recommended to complete Fish Friendly in conjunction
                    with Clean Marina as some of the criteria overlap.
                  </p>

                  <h4 className="text-xl font-semibold mb-3">Process:</h4>
                  <p
                    className="mb-4"
                    style={{
                      fontSize: "18px",
                      lineHeight: "30px",
                      color: "#333",
                    }}
                  >
                    The same six-step process as Clean Marina accreditation
                    applies: Application with pledge and Code of Ethics, Receipt
                    of program materials and guidebook, Self-assessment using
                    audit documents, Site visit by trained consultant, Assessor
                    report (85% minimum score required), and Approval process by
                    committee.
                  </p>

                  <h4 className="text-xl font-semibold mb-3">Fees:</h4>
                  <p
                    className="mb-4"
                    style={{
                      fontSize: "18px",
                      lineHeight: "30px",
                      color: "#333",
                    }}
                  >
                    Fish Friendly Accreditation (assessed at the same time as
                    Clean Marina) costs $550 + $100 assessor fee.
                  </p>

                  <h4 className="text-xl font-semibold mb-3">
                    Environmental Leadership:
                  </h4>
                  <p
                    className="mb-4"
                    style={{
                      fontSize: "18px",
                      lineHeight: "30px",
                      color: "#333",
                    }}
                  >
                    It is essential marinas continue to set the highest
                    environmental standards. Marinas are the ideal location for
                    many community members to see and learn about native fish
                    and the aquatic environment.
                  </p>

                  <p
                    className="mb-6"
                    style={{
                      fontSize: "18px",
                      lineHeight: "30px",
                      color: "#333",
                    }}
                  >
                    You can also find more{" "}
                    <a
                      href="https://www.marinas.net.au/accreditation/fish-friendly-marinas/fish-friendly-resources/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Fish Friendly Resources on the Marinas Industry
                      Association here
                    </a>
                    .
                  </p>

                  <p
                    className="mb-8"
                    style={{
                      fontSize: "18px",
                      lineHeight: "30px",
                      color: "#333",
                    }}
                  >
                    At{" "}
                    <a
                      href="/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline font-medium"
                    >
                      Harbr
                    </a>
                    , we are dedicated to helping marinas in Australia and
                    globally operate to the highest possible standards. If you'd
                    like to discuss any of the above accreditation programs and
                    how our software is helping marinas please get in touch.
                  </p>
                </section>
              </Reveal>
            </article>
          </div>

          {/* Author Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Reveal delay={0.3}>
                <div className="bg-white border border-zinc-200 rounded-lg p-6 mb-8">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4">
                      <img
                        src="/chris.jpeg"
                        alt="Chris Mihatov"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-semibold text-zinc-900 text-lg mb-2">
                      Chris Mihatov
                    </h3>
                    <p className="text-zinc-600 text-sm leading-relaxed mb-4">
                      Harbr Co-Founder & CEO
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
                          xmlns="http://www.w3.org/2000/svg"
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
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>LinkedIn Profile</title>
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
