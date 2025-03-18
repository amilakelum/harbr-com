import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronUp } from "lucide-react";
import { motion } from "motion/react";
import Reveal from "./animations/Reveal";

const faqs = [
  {
    question: "How quickly can I get started with Call&Fill?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut suscipit sem in aliquet gravida. Duis sed lobortis magna.",
  },
  {
    question: "How does the AI know which patients to call first?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut suscipit sem in aliquet gravida. Duis sed lobortis magna.",
  },
  {
    question: "How much revenue can my clinic expect to recover?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut suscipit sem in aliquet gravida. Duis sed lobortis magna.",
  },
  {
    question: "What if a patient doesn't answer the AI call?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut suscipit sem in aliquet gravida. Duis sed lobortis magna.",
  },
  {
    question: "Can I customize the calling script?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut suscipit sem in aliquet gravida. Duis sed lobortis magna.",
  },
];

// AnimateHeight component to handle smooth height transitions
const AnimateHeight = ({ children, isVisible }) => {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{
        height: isVisible ? "auto" : 0,
        opacity: isVisible ? 1 : 0,
      }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ overflow: "hidden" }}
    >
      {children}
    </motion.div>
  );
};

export default function Faq() {
  return (
    <div className="relative isolate px-6 lg:px-8 mt-16 sm:mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <Reveal
            delay={0.1}
            className="mb-4 sm:mb-4 sm:flex sm:justify-center text-center"
          >
            <div className="inline-flex items-center">
              <div className="rounded-xl w-[14px] h-2 mr-2 bg-blue-500"></div>
              <p className="uppercase text-sm leading-[14px] text-blue-500">
                Support
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.25}>
            <h1 className="mx-auto max-w-2xl text-center text-4xl font-semibold text-pretty text-zinc-900 sm:text-5xl">
              Frequently Asked Questions
            </h1>
          </Reveal>
        </div>
        <Reveal slideY={0} delay={0.4} className="mt-16">
          {faqs.map((faq, index) => (
            <Disclosure key={index} as="div">
              {({ open }) => (
                <>
                  <DisclosureButton className="flex cursor-pointer w-full justify-between rounded-lg px-4 py-4 text-left text-base text-zinc-900 hover:bg-zinc-100 focus:outline-none focus-visible:ring focus-visible:ring-zinc-100">
                    <span>{faq.question}</span>
                    <ChevronUp
                      className={`text-zinc-600 transition-transform ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </DisclosureButton>

                  <AnimateHeight isVisible={open}>
                    <DisclosurePanel
                      static
                      className="px-4 pt-2 pb-8 text-base text-zinc-500"
                    >
                      {faq.answer}
                    </DisclosurePanel>
                  </AnimateHeight>
                </>
              )}
            </Disclosure>
          ))}
        </Reveal>
      </div>
    </div>
  );
}
