import React from 'react';

const ITEMS = [
  "Manajemen Waktu",
  "Pomodoro Timer",
  "Musik Lo-Fi",
  "Flash Card",
  "Active Recall",
  "Spaced Repetition",
  "To-Do List",
  "Kalender Interaktif",
];

export function Marquee() {
  const renderItems = () => 
    ITEMS.map((item, i) => (
      <span key={i} className="flex items-center gap-8 text-sm font-medium text-[#0B2E33]/70">
        {item}
        <span className="w-1.5 h-1.5 rounded-full bg-[#4F7C82] shrink-0" />
      </span>
    ));

  return (
    <div className="mt-30 border-y border-[#0B2E33]/10 bg-white/20 backdrop-blur-sm py-4 my-8">
      <div className="relative flex overflow-hidden">
        {/* Blok Utama */}
        <div className="animate-marquee flex shrink-0 items-center gap-8 whitespace-nowrap pr-8 w-max">
          {renderItems()}
        </div>
        {/* Blok Kloning agar mulus tanpa putus */}
        <div className="animate-marquee flex shrink-0 items-center gap-8 whitespace-nowrap pr-8 w-max" aria-hidden="true">
          {renderItems()}
        </div>
      </div>
    </div>
  );
}
