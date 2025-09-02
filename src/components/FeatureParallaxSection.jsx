import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "./animations/Reveal";

export default function FeatureParallaxSection({ features, images }) {
  const [activeFeature, setActiveFeature] = useState(1);

  useEffect(() => {
    // Scroll observer for parallax image changes
    const observerOptions = {
      threshold: 0.3,
      rootMargin: "-10% 0px -10% 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const featureId = entry.target.getAttribute("id");
          const featureNumber = Number.parseInt(featureId.split("-")[1], 10);
          setActiveFeature(featureNumber);
        }
      }
    }, observerOptions);

    // Observe all feature sections
    const sections = document.querySelectorAll(".scroll-section");
    for (const section of sections) {
      observer.observe(section);
    }

    return () => {
      for (const section of sections) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <div className="relative bg-white">
      <div className="mx-auto container">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Side - Scrolling Content */}
          <div className="px-6 lg:px-12">
            {features.map((feature, index) => (
              <div
                key={feature.id || `feature-${index + 1}`}
                id={`feature-${index + 1}`}
                className="scroll-section py-32 min-h-screen flex flex-col justify-center"
              >
                <Reveal delay={0.1 + index * 0.1}>
                  <h2 className="text-[42px] leading-[1.1] tracking-[-0.02em] font-normal mb-6 text-black">
                    {feature.title}
                  </h2>
                  <p className="text-pretty text-zinc-700 text-lg/8 mb-8 max-w-xl">
                    {feature.description}
                  </p>
                </Reveal>
              </div>
            ))}
          </div>

          {/* Right Side - Fixed/Sticky Images */}
          <div className="relative">
            <div
              className="lg:sticky lg:top-0 lg:h-screen flex items-center justify-center p-6 lg:p-12 py-16 lg:py-20"
              style={{
                backgroundImage: "url('/tablet.png')",
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div
                className="relative w-full h-[600px] lg:h-[700px] overflow-hidden rounded-2xl"
                // style={{
                //   backgroundImage: "url('/tablet.png')",
                //   backgroundSize: "contain",
                //   backgroundPosition: "center",
                //   backgroundRepeat: "no-repeat",
                // }}
              >
                {/* Background Image - Always visible */}
                <div className="absolute inset-0 w-full h-full">
                  {/* Background can be added here if needed */}
                </div>

                {/* Feature Images */}
                {images.map((image, index) => (
                  <motion.div
                    key={image.id || `image-${index + 1}`}
                    className="absolute top-0 right-0 w-full h-full flex items-center justify-end"
                    animate={{ opacity: activeFeature === index + 1 ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-contain rounded-lg shadow-lg"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
