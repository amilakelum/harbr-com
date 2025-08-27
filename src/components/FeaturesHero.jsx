import { motion } from "framer-motion";
import Reveal from "./animations/Reveal";
import EmailSubscriptionForm from "./EmailSubscriptionForm";

export default function FeaturesHero({
  title = "Features",
  description = (
    <>
      <strong>
        Harbr's end to end marina management software has everything you need to
        elevate your marina operations, impress your customers and grow revenue
        beyond berth/slip rates.
      </strong>{" "}
      We have also meticulously incorporated AI where possible to streamline
      your operations.
    </>
  ),
  includeEmailForm = true,
  source = "features_hero_section",
  buttonText = "Get started for free",
  placeholder = "Enter your business email",
}) {
  return (
    <div className="bg-gradient-to-br from-white to-zinc-50">
      <div className="relative isolate px-6 pt-14 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <Reveal delay={0.1}>
              <h1 className="text-[46px] leading-[1.1] tracking-[-0.02em] font-normal mb-8">
                {title}
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 text-pretty text-zinc-600 text-base font-normal sm:text-lg/8 mb-10 max-w-3xl mx-auto">
                {description}
              </p>
            </Reveal>
            {includeEmailForm && (
              <Reveal delay={0.3}>
                <div className="max-w-lg mx-auto">
                  <EmailSubscriptionForm
                    source={source}
                    buttonText={buttonText}
                    placeholder={placeholder}
                    className=""
                    formClassName="bg-zinc-50 border border-zinc-200"
                    inputClassName="bg-white"
                    buttonClassName=""
                  />
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
