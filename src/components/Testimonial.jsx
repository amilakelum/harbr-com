import { MessageSquareQuote } from "lucide-react";
import React from "react";

export default function Testimonial({ quote, author, role }) {
  return (
    <div className="bg-whiste rounded-lg sm:rounded-2xl rinsg ring-zinc-100 shadsow-lg lg:shadsow-xl p-8 md:p-10">
      <div className="flex flex-col items-center">
        <span className="text-blue-500 mb-4">
          <MessageSquareQuote size={36} />
        </span>

        <blockquote className="text-xl md:text-2xl text-zinc-800 text-center italic mb-6">
          "{quote}"
        </blockquote>

        <div className="mt-4">
          <p className="font-semibold text-zinc-900">{author}</p>
          {role && <p className="text-zinc-600 text-sm">{role}</p>}
        </div>
      </div>
    </div>
  );
}
