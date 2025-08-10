import Reveal from "./animations/Reveal";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function AIManager() {
  return (
    <div className="relative isolate px-6 py-16 lg:px-8 ">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:items-center">
          {/* Left side - Content */}
          <Reveal delay={0.25}>
            <div className="text-left lg:pr-8">
              <h2 className="text-[46px] leading-[1.1] tracking-[-0.02em] font-normal mb-8">
                Harbr's AI Marina Manager
              </h2>
              <p className="text-pretty text-zinc-600 text-base font-normal sm:text-lg/8 mb-8">
                A world first, Harbr's AI Marina Manager operates alongside your
                users to support & enhance your experience with Harbr's
                software. Think Microsoft Co-pilot meets ChatGPT that's always
                on call to help with navigating the Harbr platform, drafting
                emails to customers, finding invoices, insurance renewals &
                more. Harbr is and always will be at the forefront of AI in
                Marina Management.
              </p>

              <Link to="/ai-marina-manager">
                <motion.a
                  href="/ai-marina-manager"
                  whileHover={{ x: 4 }}
                  className="inline-flex items-center justify-center gap-2 font-medium border-2 rounded-md px-6 py-3 bg-transparent transition-all duration-150 ease-in-out"
                  style={{
                    cursor: "pointer",
                    paddingTop: "0.96rem",
                    paddingBottom: "1.04rem",
                    paddingLeft: "2rem",
                    paddingRight: "2rem",
                    fontSize: "1.25rem",
                    lineHeight: "2rem",
                    color: "rgb(87, 116, 245)",
                    borderColor: "rgb(87, 116, 245)",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "rgb(87, 116, 245)";
                    e.target.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = "rgb(87, 116, 245)";
                  }}
                >
                  See what Harbr's AI MM can do for you
                  <svg
                    className="w-4 h-4 transition-colors duration-150"
                    viewBox="0 0 16.1 31.59"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <title>Arrow</title>
                    <path
                      d="M.5 31.09l15.1-15.3L.5.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.a>
              </Link>
            </div>
          </Reveal>

          {/* Right side - Image */}
          <Reveal delay={0.4}>
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="/AI-marina.png"
                alt="AI Marina Manager"
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
