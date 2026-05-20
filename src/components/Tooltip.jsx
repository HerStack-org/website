import React, { useState } from 'react';
import { glossary } from '../data/glossary';

export default function Tooltip({ term, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const definition = glossary[term?.toLowerCase()] || glossary[children?.toString()?.toLowerCase()];

  if (!definition) return <>{children}</>;

  return (
    <span 
      className="relative inline-block cursor-help font-semibold text-[#A78BFA] border-b-[1.5px] border-dashed border-[#A78BFA]/60 transition-all duration-300 hover:text-[#C4B5FD] hover:border-[#C4B5FD] hover:bg-[#A78BFA]/10 rounded-sm px-0.5 -mx-0.5"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
      tabIndex="0"
      aria-describedby={`tooltip-${term}`}
    >
      {children || term}
      <span 
        id={`tooltip-${term}`}
        className={`absolute z-50 bottom-[140%] left-1/2 -translate-x-1/2 w-[280px] p-4 text-sm font-normal rounded-xl shadow-2xl text-left pointer-events-none transition-all duration-300 origin-bottom flex flex-col gap-2 ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2'}`}
        style={{
          background: 'rgba(20, 20, 25, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(167, 139, 250, 0.25)',
          boxShadow: '0 20px 40px -10px rgba(0,0,0,0.6), 0 0 25px rgba(167, 139, 250, 0.15)',
        }}
        role="tooltip"
      >
        <strong className="flex items-center gap-2 text-[#C4B5FD] uppercase tracking-wider text-[11px] font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] shadow-[0_0_8px_#A78BFA]"></span>
          {term || children}
        </strong>
        <span className="block text-[13.5px] leading-relaxed text-white/90 font-light">{definition}</span>
        <span 
          className="absolute top-full left-1/2 -translate-x-1/2 border-[8px] border-transparent"
          style={{ borderTopColor: 'rgba(20, 20, 25, 0.85)' }}
        ></span>
      </span>
    </span>
  );
}

export function HighlightedText({ text }) {
  if (!text) return null;
  
  // Sort terms by length descending to match longer phrases first (e.g., "machine learning" before "learning")
  const terms = Object.keys(glossary).sort((a, b) => b.length - a.length);
  // Create a regex that matches any of the terms, ignoring case
  const regex = new RegExp(`\\b(${terms.join('|')})\\b`, 'gi');
  
  const parts = text.split(regex);
  
  return (
    <>
      {parts.map((part, i) => {
        const lowerPart = part.toLowerCase();
        if (terms.includes(lowerPart)) {
          return <Tooltip key={i} term={lowerPart}>{part}</Tooltip>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
