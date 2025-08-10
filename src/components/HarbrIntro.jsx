import Reveal from "./animations/Reveal";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function HarbrIntro() {
  return (
    <div className="relative isolate px-6 py-16 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2 lg:items-center">
          {/* Left side - Image */}
          <Reveal delay={0.4}>
            <div className="text-left lg:pl-8">
              <h2 className="text-[46px] leading-[1.1] tracking-[-0.02em] font-normal mb-8">
                The world's first AI powered Marina Management Software
              </h2>
              <p className="text-pretty text-zinc-600 text-base font-normal sm:text-lg/8 mb-8">
                Harbr is the future of Marina Management software that leverages
                AI & smart insights to supercharge operations, deliver flawless
                customer experience and maximise marina revenue.
              </p>
              <p className="text-pretty text-zinc-600 text-base font-normal sm:text-lg/8 mb-10">
                Harbr is also the world's first platform that supports marinas &
                berth owners with berth sharing & subleasing, seamlessly
                connecting boat owners with marinas in one integrated system.
              </p>

              <Link to="/features">
                <motion.a
                  href="/features"
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
                  Explore Features
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

          {/* Right side - Content */}
          <Reveal delay={0.25}>
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="/AI-stack5.png"
                alt="Marina Management Software"
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
