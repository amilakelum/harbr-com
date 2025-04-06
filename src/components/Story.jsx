import Reveal from "./animations/Reveal";
import teamImage from "../assets/AI-stack4.png";

export default function Story() {
  return (
    <div id="story" className="relative isolate px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl px-1">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2 lg:items-center">
          <Reveal delay={0.25}>
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={teamImage}
                alt="Harbr team on a boat"
                className="w-full object-cover"
              />
            </div>
          </Reveal>
          
          <Reveal delay={0.4}>
            <div className="text-left lg:pl-8">
              <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl mb-6">
                Harbr, <br />The AI Marina Management<br /> Software
              </h1>
              <p className="mt-4 text-lg leading-8 text-zinc-600 mb-6">
                Harbr is an end-to-end AI marina management software with all the features, integrations, and training you need to grow your business.
              </p>
              <p className="mt-4 text-lg leading-8 text-zinc-600 mb-6">
                Yep, everything you need to run your marina.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
} 