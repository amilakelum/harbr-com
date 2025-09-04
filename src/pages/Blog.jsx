import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Reveal from "../components/animations/Reveal";
import { Link } from "react-router-dom";
import FreeTrial from "../components/FreeTrial";

// Mock blog data - replace with your actual blog data source
const blogPosts = [
  {
    id: 1,
    title: "Artificial Intelligence: Decoded",
    excerpt:
      "Demystifying AI technology and understanding how pattern recognition is revolutionizing everything from entertainment to marina management.",
    author: "Sarah Johnson",
    authorInitials: "SJ",
    date: "September 30, 2025",
    category: "TECHNOLOGY & INNOVATION",
    readTime: "12 min read",
    image: "/blog-images/artificial-intelligence-decoded.jpg",
    slug: "artificial-intelligence-decoded",
  },
  {
    id: 2,
    title: "The Top 4 Marina Accreditation Programs in Australia",
    excerpt:
      "Comprehensive guide to Australia's leading marina accreditation programs including Gold Anchor, Superyacht Ready, Clean Marina, and Fish Friendly certifications.",
    author: "Chris Mihatov",
    authorInitials: "CM",
    date: "September 4, 2025",
    category: "MARINA MANAGEMENT & COMPLIANCE",
    readTime: "15 min read",
    image: "/blog-images/marina-accreditation-programs.jpg",
    slug: "marina-accreditation-programs-australia",
  },
  {
    id: 3,
    title: "Master These 3 Essential Sailing Knots Every Boater Must Know",
    excerpt:
      "Learn the bowline, clove hitch, and cleat hitch - three fundamental knots that form the cornerstone of essential seamanship skills.",
    author: "Sarah Johnson",
    authorInitials: "SJ",
    date: "August 30, 2025",
    category: "BOATING SKILLS & TECHNIQUES",
    readTime: "10 min read",
    image: "/blog-images/modern-technology-marina.jpg",
    slug: "essential-sailing-knots-every-boater-should-know",
  },
  {
    id: 4,
    title:
      "Harbr's Complete Guide to Mastering Marina Mooring: Essential Tips for Confident Docking",
    excerpt:
      "Master the art of marina docking with expert techniques for preparation, approach, and securing your vessel like a professional mariner.",
    author: "Michael Chen",
    authorInitials: "MC",
    date: "July 30, 2025",
    category: "BOATING SKILLS & TECHNIQUES",
    readTime: "14 min read",
    image: "/blog-images/marina-mooring-guide.jpg",
    slug: "complete-guide-mastering-marina-mooring",
  },
  {
    id: 5,
    title:
      "New School: How Modern Technology is Transforming Marina Operations",
    excerpt:
      "Discover how AI, smart sensors, and integrated software are revolutionizing marina operations and creating exceptional customer experiences.",
    author: "Sarah Johnson",
    authorInitials: "SJ",
    date: "June 30, 2025",
    category: "TECHNOLOGY & INNOVATION",
    readTime: "15 min read",
    image: "/blog-images/essential-sailing-knots.jpg",
    slug: "modern-technology-transforming-marina-operations",
  },
  {
    id: 6,
    title: "Complete Guide to Different Types of Boats",
    excerpt:
      "Discover the perfect vessel for your needs with our comprehensive guide to boat types, from recreational powerboats to luxury yachts.",
    author: "Michael Chen",
    authorInitials: "MC",
    date: "May 30, 2025",
    category: "BOAT TYPES & BUYING GUIDE",
    readTime: "12 min read",
    image: "/blog-images/different-type-of-boat.jpg",
    slug: "complete-guide-different-types-boats",
  },
  {
    id: 7,
    title: "Essential Maritime Distress Signals: Your Lifeline on the Water",
    excerpt:
      "Learn the essential maritime distress signals that every marina manager and boat operator should know for emergency situations.",
    author: "Sarah Johnson",
    authorInitials: "SJ",
    date: "April 30, 2025",
    category: "SAFETY & REGULATIONS",
    readTime: "8 min read",
    image: "/blog-images/essential-maritime-distress-signals.jpg",
    slug: "essential-maritime-distress-signals",
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
      <div
        className="relative isolate px-6 py-24 lg:py-32 lg:px-8 hero-section"
        style={{
          backgroundImage: "url('/bg2.jpg')",
        }}
      >
        {/* Add custom CSS for responsive background sizing */}
        <style jsx>{`
          @media (min-width: 1024px) {
            .hero-section {
              background-size: cover !important;
              background-repeat: no-repeat !important;
              background-position: "20% center";
            }
          }
        `}</style>
        {/* Dark overlay for better text visibility */}
        {/* <div
          className="absolute inset-0 bg-black opacity-50"
          style={{ zIndex: 1 }}
        /> */}

        <div
          className="mx-auto max-w-6xl text-center relative"
          style={{ zIndex: 2 }}
        >
          <Reveal delay={0.1}>
            <h1 className="text-[50px] sm:text-[48px] lg:text-[52px] leading-[1.1] tracking-[-0.02em] font-bold mb-4 text-white">
              The Harbr Blog
            </h1>
            <p className="text-lg mb-8 max-w-2xl mx-auto text-white">
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
                      // backgroundColor:
                      //   index === currentPosts.length - 1
                      //     ? "rgba(87,116,245,.1)"
                      //     : "transparent",
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
                        <div className="w-7 h-7 rounded-full mr-2 overflow-hidden">
                          <img
                            src={
                              post.author === "Michael Chen"
                                ? "/michael.png"
                                : post.author === "Chris Mihatov"
                                ? "/chris.jpeg"
                                : "/sara.jpg"
                            }
                            alt={post.author}
                            className="w-full h-full object-cover"
                          />
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

      {/* Free Trial Section */}
      <FreeTrial />
    </>
  );
}
