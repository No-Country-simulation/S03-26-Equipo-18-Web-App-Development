
"use client";

import { useState } from "react";
import { MdInfoOutline } from "react-icons/md";

interface Props {
  title: string;
  description: string;
}

export default function InfoTooltip({ title, description }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block ml-2">
      {/* Ícono que activa el modal/tooltip */}
      <MdInfoOutline 
        className="text-txtSecondary hover:text-brand cursor-help transition-colors text-lg"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      />

      {/* El "Modal" pequeño (Tooltip) */}
      {isVisible && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-4 bg-dark border border-border rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-200">
          <h4 className="text-primary font-bold text-sm mb-1">{title}</h4>
          <p className="text-txtSecondary text-xs leading-relaxed">
            {description}
          </p>
          {/* Triangulito inferior */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-dark"></div>
        </div>
      )}
    </div>
  );
}