import Reveal from "./animations/Reveal";
import EmailSubscriptionForm from "./EmailSubscriptionForm";

export default function GenericHero({
  title,
  description,
  includeEmailForm = false,
  source = "hero_section",
  buttonText = "Try Harbr for free",
  placeholder = "Enter your business email",
}) {
  return (
    <div className="bg-gradient-to-br from-white to-zinc-50">
      <div className="relative isolate px-6 pt-14 py-16 lg:py-24 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <Reveal delay={0.1}>
              <h1 className="text-[50px] sm:text-[48px] lg:text-[52px] leading-[1.1] tracking-[-0.02em] font-bold mb-6">
                {title}
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg mb-8 max-w-3xl mx-auto text-zinc-600">
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
