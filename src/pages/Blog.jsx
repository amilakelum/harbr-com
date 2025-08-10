import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Reveal from "../components/animations/Reveal";
import { Link } from "react-router-dom";

// Mock blog data - replace with your actual blog data source
const blogPosts = [
  {
    id: 1,
    title: "Essential Maritime Distress Signals",
    excerpt:
      "Learn the essential maritime distress signals that every marina manager and boat operator should know for emergency situations.",
    author: "Sarah Johnson",
    authorInitials: "SJ",
    date: "January 15",
    category: "SAFETY & REGULATIONS",
    readTime: "8 min read",
    image: "/blog-images/essential-maritime-distress-signals.png",
    slug: "essential-maritime-distress-signals",
  },
  {
    id: 2,
    title: "The Complete Guide to Marina Revenue Optimization",
    excerpt:
      "Learn proven strategies to maximize your marina's revenue through dynamic pricing, capacity management, and customer experience enhancement.",
    author: "Michael Chen",
    authorInitials: "MC",
    date: "January 12",
    category: "BUSINESS STRATEGY",
    readTime: "12 min read",
    image: "/src/assets/screenshot-1.png",
    slug: "complete-guide-marina-revenue-optimization",
  },
  {
    id: 3,
    title: "5 Essential Features Every Modern Marina Software Should Have",
    excerpt:
      "Explore the must-have features that make marina management software effective, from real-time booking to integrated payment processing.",
    author: "Emily Rodriguez",
    authorInitials: "ER",
    date: "January 10",
    category: "SOFTWARE FEATURES",
    readTime: "6 min read",
    image: "/src/assets/screenshot-2.webp",
    slug: "essential-features-modern-marina-software",
  },
  {
    id: 4,
    title: "Customer Experience Trends in the Marina Industry",
    excerpt:
      "Stay ahead of the curve with the latest customer experience trends that are shaping the future of marina operations and customer satisfaction.",
    author: "David Park",
    authorInitials: "DP",
    date: "January 8",
    category: "CUSTOMER EXPERIENCE",
    readTime: "10 min read",
    image: "/src/assets/Screenshot-23.png",
    slug: "customer-experience-trends-marina-industry",
  },
  {
    id: 5,
    title: "Sustainable Marina Practices: A Guide for Modern Operators",
    excerpt:
      "Learn how to implement sustainable practices in your marina operations while maintaining profitability and customer satisfaction.",
    author: "Lisa Thompson",
    authorInitials: "LT",
    date: "January 5",
    category: "SUSTAINABILITY",
    readTime: "9 min read",
    image: "/src/assets/Screenshot-24.png",
    slug: "sustainable-marina-practices-guide",
  },
  {
    id: 6,
    title: "Digital Transformation: From Traditional to Smart Marinas",
    excerpt:
      "Discover the step-by-step process of transforming your traditional marina into a smart, digitally-enabled operation.",
    author: "Robert Kim",
    authorInitials: "RK",
    date: "January 3",
    category: "DIGITAL TRANSFORMATION",
    readTime: "11 min read",
    image: "/src/assets/Screenshot-25.png",
    slug: "digital-transformation-traditional-smart-marinas",
  },
  {
    id: 7,
    title: "Understanding Marina Management Analytics and KPIs",
    excerpt:
      "Master the key performance indicators and analytics that matter most for successful marina management and business growth.",
    author: "Amanda Foster",
    authorInitials: "AF",
    date: "December 30",
    category: "ANALYTICS",
    readTime: "7 min read",
    image: "/src/assets/reservation1.png",
    slug: "understanding-marina-management-analytics-kpis",
  },
  {
    id: 8,
    title: "How AI is Revolutionizing Marina Management in 2025",
    excerpt:
      "Discover how artificial intelligence is transforming the marina industry, from automated berth allocation to predictive maintenance and customer service optimization.",
    author: "Sarah Johnson",
    authorInitials: "SJ",
    date: "January 15",
    category: "AI & TECHNOLOGY",
    readTime: "8 min read",
    image: "/src/assets/AI-stack.png",
    slug: "ai-revolutionizing-marina-management-2025",
  },
  {
    id: 9,
    title: "The Future of Contactless Marina Operations",
    excerpt:
      "Explore how contactless technologies are reshaping marina operations and improving both safety and customer convenience.",
    author: "James Wilson",
    authorInitials: "JW",
    date: "December 28",
    category: "TECHNOLOGY",
    readTime: "8 min read",
    image: "/src/assets/best_software.png",
    slug: "future-contactless-marina-operations",
  },
];

const POSTS_PER_PAGE = 6;

export default function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    document.title = "Blog | Harbr";
  }, []);

  // Get unique categories
  const categories = [
    "All",
    ...new Set(blogPosts.map((post) => post.category)),
  ];

  // Filter posts by category
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredPosts(blogPosts);
    } else {
      setFilteredPosts(
        blogPosts.filter((post) => post.category === selectedCategory)
      );
    }
    setCurrentPage(1); // Reset to first page when category changes
  }, [selectedCategory]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  // Pagination handlers
  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToPrevious = () => {
    if (currentPage > 1) goToPage(currentPage - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) goToPage(currentPage + 1);
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative isolate px-6 py-24 lg:py-32 lg:px-8 ">
        <div className="mx-auto max-w-6xl text-center">
          <Reveal delay={0.1}>
            <h1 className="text-[50px] sm:text-[48px] lg:text-[52px] leading-[1.1] tracking-[-0.02em] font-bold mb-4 ">
              The Harbr Blog
            </h1>
            <p className=" text-lg mb-8 max-w-2xl mx-auto">
              Expand your marina management knowledge with detailed insights,
              industry trends, and best practices for modern marina operations.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="relative bg-white py-8 lg:py-12">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          {/* Category Filter */}
          <Reveal delay={0.2}>
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-md text-sm font-bold transition-all duration-200 cursor-pointer ${
                      selectedCategory === category
                        ? "text-white"
                        : "text-zinc-700"
                    }`}
                    style={
                      selectedCategory === category
                        ? { backgroundColor: "#5774f5", color: "#fff" }
                        : {
                            backgroundColor: "rgba(87, 116, 245, .1)",
                            color: "#5774f5",
                          }
                    }
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#5774f5";
                      e.target.style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      if (selectedCategory === category) {
                        e.target.style.backgroundColor = "#5774f5";
                        e.target.style.color = "#fff";
                      } else {
                        e.target.style.backgroundColor =
                          "rgba(87, 116, 245, .1)";
                        e.target.style.color = "#5774f5";
                      }
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Blog Posts Grid - 2 Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {currentPosts.map((post, index) => (
              <Reveal key={post.id} delay={0.05 * (index + 1)}>
                <Link to={`/blog/${post.slug}`} className="block">
                  <article
                    className="group border-b border-zinc-200 pb-6 last:border-b-0 cursor-pointer"
                    style={{
                      padding: "40px 50px 40px 40px",
                      backgroundColor:
                        index === currentPosts.length - 1
                          ? "rgba(87,116,245,.1)"
                          : "transparent",
                    }}
                  >
                    {/* Image with Category Tag Overlay */}
                    <div className="relative mb-6 overflow-hidden rounded-lg">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Category Tag on Image */}
                      <div className="absolute top-4 left-4">
                        <span
                          className="inline-flex items-center px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide text-white shadow-md"
                          style={{
                            backgroundColor: "rgba(0, 0, 0, 0.8)",
                            backdropFilter: "blur(4px)",
                          }}
                        >
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2
                      className="font-bold text-[#5774f5] mb-3 group-hover:transition-colors duration-200 leading-tight group-hover:text-[#f80]"
                      style={{ fontSize: "38px", lineHeight: "42px" }}
                    >
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p
                      className="leading-relaxed mb-4"
                      style={{ fontSize: "18px", color: "#333" }}
                    >
                      {post.excerpt}
                    </p>

                    {/* Author and Date */}
                    <div className="flex items-center text-sm text-zinc-500">
                      <div className="flex items-center mr-6">
                        <div
                          className="w-7 h-7 text-white rounded-full flex items-center justify-center mr-2 text-xs font-medium"
                          style={{ backgroundColor: "rgb(87, 116, 245)" }}
                        >
                          {post.authorInitials}
                        </div>
                        <span className="font-medium text-zinc-700">
                          {post.author}
                        </span>
                      </div>
                      <span>{post.date}</span>
                    </div>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Reveal delay={0.3}>
              <div className="flex items-center justify-center space-x-1">
                {/* Previous Button */}
                <button
                  type="button"
                  onClick={goToPrevious}
                  disabled={currentPage === 1}
                  className={`px-3 py-2 text-sm transition-all duration-200 ${
                    currentPage === 1
                      ? "text-zinc-400 cursor-not-allowed"
                      : "text-zinc-700"
                  }`}
                  style={currentPage !== 1 ? { color: "#f80" } : {}}
                  onMouseEnter={(e) => {
                    if (currentPage !== 1) {
                      e.target.style.color = "#f80";
                    }
                  }}
                >
                  ← Previous
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => {
                    // Show first page, last page, current page, and pages around current page
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          type="button"
                          onClick={() => goToPage(page)}
                          className={`w-8 h-8 text-sm font-medium transition-all duration-200 ${
                            currentPage === page
                              ? "text-white"
                              : "text-zinc-700"
                          }`}
                          style={
                            currentPage === page
                              ? {
                                  backgroundColor: "rgb(87, 116, 245)",
                                  color: "white",
                                }
                              : {}
                          }
                          onMouseEnter={(e) => {
                            if (currentPage !== page) {
                              e.target.style.color = "#f80";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (currentPage !== page) {
                              e.target.style.color = "";
                            }
                          }}
                        >
                          {page}
                        </button>
                      );
                    }
                    if (page === currentPage - 2 || page === currentPage + 2) {
                      return (
                        <span key={page} className="px-2 text-zinc-400 text-sm">
                          ...
                        </span>
                      );
                    }
                    return null;
                  }
                )}

                {/* Next Button */}
                <button
                  type="button"
                  onClick={goToNext}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-2 text-sm transition-all duration-200 ${
                    currentPage === totalPages
                      ? "text-zinc-400 cursor-not-allowed"
                      : "text-zinc-700"
                  }`}
                  style={currentPage !== totalPages ? { color: "#f80" } : {}}
                  onMouseEnter={(e) => {
                    if (currentPage !== totalPages) {
                      e.target.style.color = "#f80";
                    }
                  }}
                >
                  Next →
                </button>
              </div>
            </Reveal>
          )}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-zinc-50 py-12 lg:py-16 border-t border-zinc-200">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <Reveal delay={0.1}>
            <h2 className="text-3xl lg:text-4xl font-semibold mb-4">
              Stay Updated with Marina Industry Insights
            </h2>
            <p className="text-zinc-600 text-lg mb-8 max-w-2xl mx-auto">
              Get the latest marina management tips, industry trends, and Harbr
              updates delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-md border border-zinc-300 focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ "--tw-ring-color": "rgb(87, 116, 245)" }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#f80";
                  e.target.style.boxShadow = "0 0 0 2px rgba(255, 136, 0, 0.2)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "";
                  e.target.style.boxShadow = "";
                }}
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 text-white rounded-md font-medium transition-colors duration-200"
                style={{ backgroundColor: "rgb(87, 116, 245)" }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#e60";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "rgb(87, 116, 245)";
                }}
              >
                Subscribe
              </motion.button>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
