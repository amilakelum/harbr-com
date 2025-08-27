import Reveal from "./animations/Reveal";
import EmailSubscriptionForm from "./EmailSubscriptionForm";

export default function FeaturePageHero({
  title,
  description,
  imageSrc,
  imageAlt,
  source = "feature_page_hero",
}) {
  return (
    <div className="relative isolate px-6 py-16 lg:py-24 lg:px-8 bg-gradient-to-br from-white to-zinc-50">
      <div className="mx-auto container">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2 lg:items-center">
          {/* Left side - Content */}
          <Reveal delay={0.1}>
            <div className="text-left">
              <h1 className="text-[52px] sm:text-[60px] lg:text-[68px] leading-[1.1] tracking-[-0.02em] font-normal mb-8">
                {title}
              </h1>
              <p className="text-pretty text-zinc-600 text-lg sm:text-xl/8 mb-8 max-w-2xl">
                {description}
              </p>
              <div className="max-w-lg">
                <EmailSubscriptionForm
                  source={source}
                  buttonText="Get started for free"
                  placeholder="Enter your business email"
                  className=""
                  formClassName="bg-zinc-50 border border-zinc-200"
                  inputClassName="bg-white"
                  buttonClassName=""
                />
              </div>
            </div>
          </Reveal>

          {/* Right side - Image */}
          <Reveal delay={0.2}>
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
