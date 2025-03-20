import Reveal from "./animations/Reveal";
import { Ripple } from "./animations/Ripple";

export default function CalloutTwo() {
  return (
    <div className="relative isolate px-6 lg:px-8 bg-radial from-stone-950 from-10%  to-zinc-950 mt-16 sm:mt-24 py-16 sm:py-24 overflow-hidden">
      <Ripple />
      <div className="mx-auto max-w-3xl">
        <Reveal delay={0.1} className="text-center">
          <h1 className="mx-auto max-w-2xl text-center text-4xl font-semibold text-pretty text-white sm:text-5xl">
          The future of marina bookings
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-pretty text-white sm:text-xl/7">
          Join thousands of members already booking online at your marina.
          </p>
        </Reveal>

        <Reveal
          delay={0.25}
          className="mt-10 flex items-center justify-center gap-x-6"
        >
          <a
            href="#"
            className="rounded-2xl bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-xs hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 hover:scale-[1.02] transition-all duration-200 ease-in-out"
          >
            Start for Free
          </a>
        </Reveal>
      </div>
    </div>
  );
}
