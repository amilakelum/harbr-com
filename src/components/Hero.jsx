import Reveal from "./animations/Reveal";

export default function Hero() {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div className="mx-auto max-w-2xl py-24 sm:py-24 lg:py-32 pb-16 sm:pb-16 lg:pb-16">
        {/* <Reveal
          delay={0.1}
          className="mb-4 sm:mb-6 sm:flex sm:justify-center text-center"
        >
          <div className="inline-flex items-center">
            <div className="rounded-xl w-[14px] h-2 mr-2 bg-blue-500"></div>
            <p className="uppercase text-sm leading-[14px] text-blue-500">
            Smart marina stays
            </p>
          </div>
        </Reveal> */}
        <div className="text-center">
          <Reveal delay={0.1}>
            <h1 className="text-4xl font-semibold text-pretty tracking-tight text-zinc-900 sm:text-6xl">
            #1 platform to search & book marina slips & berths near you
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-pretty text-zinc-600 text-base font-normal sm:text-lg/8">
            Search real-time marina availability, compare marina fees and book online immediately.
            </p>
          </Reveal>
          <Reveal
            delay={0.1}
            className="mt-10 flex items-center justify-center gap-x-6"
          >
            <a
              href="#"
              className="rounded-2xl bg-[#5371FF] px-6 py-3 text-base font-semibold text-white shadow-xs hover:bg-[#4460E6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5371FF] hover:scale-[1.02] transition-all duration-200 ease-in-out"
            >
              Start for Free
            </a>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
