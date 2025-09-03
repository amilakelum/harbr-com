import { motion } from "framer-motion";
import Reveal from "./animations/Reveal";
import { Link } from "react-router-dom";

export default function ReportingTracking() {
  return (
    <div className="relative isolate px-6 py-16 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:items-center">
          {/* Left side - Image */}
          <Reveal delay={0.25}>
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="/report1.png"
                alt="Reporting and Tracking"
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>

          {/* Right side - Content */}
          <Reveal delay={0.4}>
            <div className="text-left lg:pl-8">
              <h2 className="text-[46px] leading-[1.1] tracking-[-0.02em] font-normal mb-8">
                Reporting and Tracking
              </h2>
              <p className="text-pretty text-zinc-600 text-base font-normal sm:text-lg/8 mb-8">
                <strong>
                  Detailed performance reports & AI generated insights give you
                  an unprecedented, in-depth understanding of your marina.
                </strong>{" "}
                Track and record your marina's performance over time to see
                which aspects of your business are the most effective. Get real
                time information you need to make decisions that will grow and
                improve revenue & customer satisfaction.
              </p>
              <p className="text-pretty text-zinc-600 text-base font-normal sm:text-lg/8 mb-8">
                Harbr can also work with your marina to generate custom reports
                based on your needs.
              </p>

              {/* <Link to="/reporting-tracking">
                <motion.a
                  href="/reporting-tracking"
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
                  Learn More
                  <svg
                    className="w-4 h-4 transition-colors duration-150"
                    viewBox="0 0 16.1 31.59"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      d="M.5 31.09l15.1-15.3L.5.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.a>
              </Link> */}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
