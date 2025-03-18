import { CalendarArrowDown, TimerOff, TrendingUp } from "lucide-react";
import Reveal from "./animations/Reveal";
import RevenueAnimation from "./animations/RevenueAnimation";
import StaffTimeAnimation from "./animations/StaffTimeAnimation";
import WaitlistAnimation from "./animations/WaitlistAnimation";

export default function ThreeColumn() {
  return (
    <div className="bg-zinc-100 my-8">
      <div className="container mx-auto isolate px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          <Reveal
            delay={0.1}
            className="mb-4 sm:mb-4 sm:flex sm:justify-center text-center"
          >
            <div className="inline-flex items-center">
              <div className="rounded-xl w-[14px] h-2 mr-2 bg-blue-500"></div>
              <p className="uppercase text-sm leading-[14px] text-blue-500">
                Some Text
              </p>
            </div>
          </Reveal>
          <h1 className="mx-auto max-w-2xl my-0 text-center text-4xl font-semibold text-pretty text-zinc-900 sm:text-5xl">
            Instant matching for last-minute openings
          </h1>
        </div>
        <div className="pb-8 pt-8 lg:pt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Reveal
            delay={0.3}
            className="sm:pb-0 bg-white rounded-2xl overflow-hidden ring ring-zinc-100"
          >
            <div className="[mask-image:linear-gradient(to_right,white,transparent)] p-6 pr-0 -mr-8">
              <RevenueAnimation />
            </div>
            <div className="inline-flex mx-6 mb-4 p-2 rounded-xl bg-green-100">
              <TrendingUp className="text-green-700" />
            </div>
            <h2 className="px-6 pb-1.5 font-semibold text-lg leading-6 text-balance text-zinc-900">
              Increase Clinic Revenue
            </h2>
            <div className="pb-6 px-6 text-pretty text-zinc-600 sm:text-base/6">
              Fill 95% of canceled appointments within minutes — this is equal
              to AUD X per week on average.
            </div>
          </Reveal>
          <Reveal
            delay={0.6}
            className="sm:pb-0 bg-white rounded-2xl overflow-hidden ring ring-zinc-100"
          >
            <div className="[mask-image:radial-gradient(white,transparent)] py-6">
              <StaffTimeAnimation />
            </div>
            <div className="inline-flex mx-6 mb-4 p-2 rounded-xl bg-indigo-100">
              <TimerOff className="text-indigo-700" />
            </div>
            <h2 className="px-6 pb-1.5 font-semibold text-lg leading-6 text-balance text-zinc-900">
              Zero Staff Time
            </h2>
            <div className="pb-6 px-6 text-pretty text-zinc-600 sm:text-base/6">
              Office staff spends 5+ hours weekly managing cancellations through
              manual phone calls. Eliminate hours of phone calls each week.
            </div>
          </Reveal>
          <Reveal
            delay={0.9}
            className="sm:pb-0 bg-white rounded-2xl overflow-hidden ring ring-zinc-100 md:col-span-2 lg:col-span-1"
          >
            <div className="[mask-image:radial-gradient(white,transparent)] p-6 pl-12 pr-0 -mr-8">
              <WaitlistAnimation />
            </div>
            <div className="inline-flex mx-6 mb-4 p-2 rounded-xl bg-amber-100">
              <CalendarArrowDown className="text-amber-700" />
            </div>
            <h2 className="px-6 pb-1.5 font-semibold text-lg leading-6 text-balance text-zinc-900">
              Reduce Patient Wait Time
            </h2>
            <div className="pb-6 px-6 text-pretty text-zinc-600 sm:text-base/6">
              Patients spend weeks on waitlists while last-minute openings go
              unfilled. Not anymore.
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
