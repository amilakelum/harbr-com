import { motion } from "framer-motion";
import Reveal from "./animations/Reveal";
import { Link } from "react-router-dom";

export default function FeaturesCallout() {
  return (
    <div className="relative isolate px-6 py-16 lg:px-8 bg-gradient-to-br from-zinc-100 to-zinc-200">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:items-center">
          {/* Left side - Image */}
          <Reveal delay={0.25}>
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="/crm1.png"
                alt="CRM"
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>

          {/* Right side - Content */}
          <Reveal delay={0.4}>
            <div className="text-left lg:pl-8">
              <h2 className="text-[46px] leading-[1.1] tracking-[-0.02em] font-normal mb-8">
                CRM
              </h2>
              <p className="text-pretty text-zinc-600 text-base font-normal sm:text-lg/8 mb-8">
                <strong>
                  Harbr's internal CRM system gives you unprecedented access to
                  your customers.
                </strong>{" "}
                Manage all customer information, send automated, AI generated &
                personalised messages via SMS and email. Streamline insurance
                renewals, invoice communications and extend promotional content
                to your customers & members. Experience unprecedented access to
                your customers, powered by Harbr's AI Marina Manager.
              </p>

              <Link to="/crm-features">
                <motion.a
                  href="/crm-features"
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
                  CRM Features
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
        </div>
      </div>
    </div>
  );
}
