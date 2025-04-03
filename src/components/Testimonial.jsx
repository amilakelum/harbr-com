import React from 'react';

export default function Testimonial({ quote, author, role, company, companyLogo }) {
  return (
    <div className="flex flex-col space-y-8 p-6">
      {/* Quote */}
      <div className="flex-grow">
        <p className="text-[32px] leading-[1.2] tracking-[-0.02em] font-normal text-[#1C1C1C]">
          "{quote}"
        </p>
      </div>
      
      {/* Author Info */}
      <div className="flex items-start space-x-4">
        <div className="flex-1">
          <p className="font-medium text-base text-[#1C1C1C]">{author}</p>
          <p className="text-sm text-zinc-600 mt-1">{role}</p>
          {company && (
            <div className="mt-3">
              {companyLogo ? (
                <img src={companyLogo} alt={company} className="h-6 w-auto" />
              ) : (
                <p className="text-sm font-medium text-zinc-900">{company}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
