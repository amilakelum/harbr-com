import Reveal from "./animations/Reveal";
import Testimonial from "./Testimonial";

export default function Callout() {
  const stats = [
    {
      value: "4x",
      label: "meetings booked",
      company: "Ashby",
      companyLogo: "/ashby-logo.svg"
    },
    {
      value: "2x",
      label: "increase in email open rate",
      company: "Pr",
      companyLogo: "/pr-logo.svg"
    },
    {
      value: "400%",
      label: "more phone numbers",
      company: "Census",
      companyLogo: "/census-logo.svg"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-zinc-50 to-zinc-100">
      <div>
        <div className="relative isolate px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {/* Header text */}
            <p className="text-sm font-mono uppercase tracking-wide text-zinc-600 mb-20">
              JOIN 10+ BUSINESSES USING HARBR
            </p>

            {/* Main Quote */}
            <div className="flex flex-col lg:flex-row justify-between items-start gap-x-24 gap-y-12">
              <div className="flex-1 max-w-[900px]">
                <h2 className="text-[56px] leading-[1.1] tracking-[-0.02em] font-normal">
                  "Harbr supports marina owners<br />
                  who want to be innovative — to do something new."
                </h2>
              </div>
              
              <div className="flex flex-col items-start lg:pt-2 min-w-[300px]">
                <p className="font-mono text-base tracking-[0.01em] font-medium text-black uppercase">SABINE SEABROOK</p>
                <div className="mt-4"></div>
                <p className="font-mono text-sm tracking-[0.01em] leading-tight font-medium text-zinc-800 uppercase">
                  Marina Systems & Innovation<br />
                  Manager
                </p>
                <img 
                  src="/ms-logo.png" 
                  alt="MS Marinas" 
                  className="h-10 w-auto mt-6" 
                />
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-zinc-600">{stat.label}</p>
                    <img src={stat.companyLogo} alt={stat.company} className="h-6 w-auto" />
                  </div>
                  <p className="text-[72px] leading-[1] tracking-[-0.02em] font-normal text-[#1C1C1C]">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
