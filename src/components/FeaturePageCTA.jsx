import Reveal from "./animations/Reveal";
import EmailSubscriptionForm from "./EmailSubscriptionForm";

export default function FeaturePageCTA({
  title,
  description,
  source = "feature_page_cta",
}) {
  return (
    <div className="bg-gradient-to-br from-white to-zinc-50 py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
        <Reveal delay={0.1}>
          <h2 className="text-[46px] leading-[1.1] tracking-[-0.02em] font-normal mb-8">
            {title}
          </h2>
          <p className="text-pretty text-zinc-600 text-lg/8 mb-8 max-w-2xl mx-auto">
            {description}
          </p>
          <div className="max-w-lg mx-auto">
            <EmailSubscriptionForm
              source={source}
              buttonText="Start Free Trial"
              placeholder="Enter your business email"
              className=""
              formClassName="bg-zinc-50 border border-zinc-200"
              inputClassName="bg-white"
              buttonClassName=""
            />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
