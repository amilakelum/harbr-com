import { MessageSquareQuote } from "lucide-react";
import React from "react";
import { motion } from "motion/react";

export default function Testimonial({ quote, author, role }) {
  return (
    <motion.div 
      className="bg-whiste rounded-lg sm:rounded-2xl rinsg ring-zinc-100 shadsow-lg lg:shadsow-xl p-8 md:p-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex flex-col items-center">
        <motion.span 
          className="text-[#5371FF] mb-4"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <MessageSquareQuote size={36} />
        </motion.span>

        <motion.blockquote 
          className="text-xl md:text-2xl text-zinc-800 text-center italic mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          "{quote}"
        </motion.blockquote>

        <motion.div 
          className="mt-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="font-semibold text-zinc-900">{author}</p>
          {role && <p className="text-zinc-600 text-sm">{role}</p>}
        </motion.div>
      </div>
    </motion.div>
  );
}
