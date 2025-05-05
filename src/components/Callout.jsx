import Reveal from "./animations/Reveal";
import Testimonial from "./Testimonial";
import { motion } from "framer-motion";

export default function Callout() {
  const stats = [
    {
      value: "4x",
      label: "4x berths booked",
      company: "Ashby",
      companyLogo: "/southport-logo.png"
    },
    {
      value: "2x",
      label: "2x efficiency in data entry",
      company: "Pr",
      companyLogo: "/RBH_logo.png"
    },
    {
      value: "400%",
      label: "400% more berth sharing",
      company: "Census",
      companyLogo: "/IGY_logo.svg"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-zinc-50 to-zinc-100">
      <div>
        <div className="relative isolate px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {/* Header text */}
            <Reveal delay={0.1}>
              <p className="text-sm font-mono uppercase tracking-wide text-zinc-600 mb-20 text-center">
                JOIN 10+ BUSINESSES USING HARBR
              </p>
            </Reveal>

            {/* Main Quote */}
            <div className="flex flex-col lg:flex-row justify-center items-center gap-x-24 gap-y-12 text-center">
              <div className="max-w-[900px]">
                <Reveal delay={0.2}>
                  <motion.h2 
                    className="text-[46px] leading-[1.1] tracking-[-0.02em] font-normal"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    "The future of <br />
                    marina management software"
                  </motion.h2>
                </Reveal>
              
                <div className="mt-10 flex flex-col items-center">
                  <Reveal delay={0.3}>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <p className="font-mono text-sm tracking-[0.01em] font-medium text-zinc-600 uppercase">ANDREW FIELDING</p>
                      <div className="mt-4"></div>
                      <p className="font-mono text-sm tracking-[0.01em] leading-tight font-medium text-zinc-600 uppercase text-center">
                      CEO of <br />
                      Boating Industry Australia

                      </p>
                      <div className="flex justify-center w-full">
                        <img 
                          src="/andrew_logo3.png" 
                          alt="MS Marinas" 
                          className="h-30 w-auto mt-6"
                        />
                      </div>
                    </motion.div>
                  </Reveal>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
              {stats.map((stat, index) => (
                <Reveal delay={0.2 + index * 0.1} key={index}>
                  <div className="bg-white rounded-2xl p-8 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm text-zinc-600">{stat.label}</p>
                      <img 
                        src={stat.companyLogo} 
                        alt={stat.company} 
                        className={`w-auto ${index === 0 ? 'h-14' : 'h-7'}`} 
                      />
                    </div>
                    <p className="text-[72px] leading-[1] tracking-[-0.02em] font-normal text-[#1C1C1C]">
                      {stat.value}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
