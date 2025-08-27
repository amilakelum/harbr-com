import { motion } from "framer-motion";
import Reveal from "./animations/Reveal";

export default function ContentSections({ sections }) {
  return (
    <>
      {/* Main Content */}
      <div className="relative bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          {sections.map((section, index) => (
            <Reveal key={section.title} delay={0.1 + index * 0.1}>
              <div className="mb-16 last:mb-0">
                {/* Section Header */}
                <div className="mb-8">
                  <h2 className="text-[46px] leading-[1.1] tracking-[-0.02em] font-normal mb-4 text-black">
                    {section.title}
                  </h2>
                  <p className="text-lg text-zinc-600 leading-relaxed">
                    {section.content}
                  </p>
                </div>

                {/* Features List */}
                {section.features && (
                  <div className="space-y-4">
                    {section.features.map((feature, featureIndex) => {
                      const [title, description] = feature.split(": ");
                      return (
                        <motion.div
                          key={`${section.title}-${featureIndex}`}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: featureIndex * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#5774f5] transition-colors duration-200"
                        >
                          {/* Icon */}
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-2 h-2 bg-[#5774f5] rounded-full" />
                          </div>
                          {/* Content */}
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {title}
                            </h3>
                            {description && (
                              <p className="text-gray-600 text-sm leading-relaxed">
                                {description}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}

                {/* Separator */}
                {index < sections.length - 1 && (
                  <div className="mt-16 pt-8 border-t border-gray-200" />
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
