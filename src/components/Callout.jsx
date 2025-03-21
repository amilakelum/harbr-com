import Reveal from "./animations/Reveal";
import Testimonial from "./Testimonial";

export default function Callout() {
  return (
    <div className="relative isolate px-6 lg:px-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <Reveal delay={0.25} className="text-center">
            <h1 className="mx-auto max-w-2xl text-center text-4xl font-semibold text-pretty text-zinc-900 sm:text-5xl">
            All your information in one place, making booking at marinas a breeze
            </h1>
          </Reveal>
          {/* <Reveal delay={0.4} className="text-center">
            <p className="mx-auto mt-8 max-w-xl text-pretty text-zinc-600 sm:text-xl/7">
            This is only the beginning.
            </p>
          </Reveal> */}
        </div>
        <Reveal delay={0.55}>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Testimonial
              quote="This will be a gamechanger..."
              author="MS Marinas"
              role="Largest marina network in NZ"
            />
            <Testimonial
              quote="Finding and booking a berth for my boat couldn't be easier"
              author="Ryan"
              role="Boat Owner"
            />
            <Testimonial
              quote="No more lengthy calls or emails. Great service"
              author="Fraser"
              role="Boat Owner"
            />
            <Testimonial
              quote="Couldn't recommend a better way to rent out my vacant berth"
              author="Curtis"
              role="Berth & Boat Owner"
            />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
