import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const cardData = [
  {
    id: 1,
    title: "Jack your appointment is moved ahead!",
    text: "Thursday 10:00 AM",
  },
  {
    id: 2,
    title: "Erin your appointment is moved ahead!",
    text: "Sunday 2:00 PM",
  },
  {
    id: 3,
    title: "Natalie your appointment is moved ahead!",
    text: "Monday 9:00 AM",
  },
  {
    id: 4,
    title: "Hugo your appointment is moved ahead!",
    text: "Wednesday 3:00 PM",
  },
];

export default function CardStack() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState([0]);

  // Function to get the next card index
  const getNextCardIndex = (current) => (current + 1) % cardData.length;

  // Update the active card every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCardIndex((prevIndex) => {
        const nextIndex = getNextCardIndex(prevIndex);

        // Update visible cards (current + 2 previous)
        setVisibleCards((prev) => {
          const newVisible = [nextIndex, ...prev.slice(0, 2)];
          return newVisible;
        });

        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto h-96 flex items-center justify-center">
      <div className="relative w-full h-24">
        <AnimatePresence>
          {visibleCards.map((cardIndex, stackPosition) => {
            const card = cardData[cardIndex];
            return (
              <motion.div
                key={`${card.id}-${stackPosition}`}
                initial={{
                  opacity: 0,
                  y: 20,
                  scale: 1,
                }}
                animate={{
                  opacity: 1 - stackPosition * 0.3,
                  y: stackPosition === 0 ? 0 : -10 * stackPosition,
                  scale: 1 - stackPosition * 0.05,
                  zIndex: 10 - stackPosition,
                }}
                exit={{
                  opacity: 0,
                  y: -30,
                  scale: 0.9,
                }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
                className="absolute top-0 left-0 right-0 bg-white rounded-lg fancy-shadow p-4 border border-zinc-100"
                style={{
                  width: "100%",
                  transformOrigin: "center top",
                }}
              >
                <div className="flex flex-col">
                  <h3 className="text-sm font-semibold text-zinc-600">
                    {card.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">{card.text}</p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
