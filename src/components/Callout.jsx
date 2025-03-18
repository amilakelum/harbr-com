import Reveal from "./animations/Reveal";
import Testimonial from "./Testimonial";

export default function Callout() {
  return (
    <div className="relative isolate px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <Reveal delay={0.25} className="text-center">
            <h1 className="mx-auto max-w-2xl text-center text-4xl font-semibold text-pretty text-zinc-900 sm:text-5xl">
              Refill cancelled appointments fast and easy
            </h1>
          </Reveal>
          <Reveal delay={0.4} className="text-center">
            <p className="mx-auto mt-8 max-w-xl text-pretty text-zinc-600 sm:text-xl/7">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
              suscipit sem in aliquet gravida. Duis sed lobortis magna.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.55} className="mt-16">
          <Testimonial
            quote="Callfill helped us recover 30% of our lost revenue from last-minute cancellations. The platform is incredibly easy to use and has become an essential part of our practice."
            author="Dr. Sarah Johnson"
            role="Dental Practice Owner"
          />
        </Reveal>
      </div>
    </div>
  );
}
