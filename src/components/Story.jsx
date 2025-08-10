import Reveal from "./animations/Reveal";

export default function Story() {
  return (
    <div id="story" className="relative isolate px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl px-1">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2 lg:items-center">
          <Reveal delay={0.4}>
            <div className="text-left lg:pl-8">
              <h1 className="text-[46px] leading-[1.1] tracking-[-0.02em] font-normal">
                Harbr, <br />
                The AI Marina Management
                <br /> Software
              </h1>
              <p className="mt-8 text-pretty text-zinc-600 text-base font-normal sm:text-lg/8">
                Harbr is an end-to-end AI marina management software with all
                the features, integrations, and training you need to grow your
                business.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="/AI-stack5.png"
                alt="Harbr team on a boat"
                className="w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
