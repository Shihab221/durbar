"use client";

import { motion } from "framer-motion";

// Decorative SVG doodles themed around Mars rovers and space exploration.
// Uses stroke-based styling with low opacity so it acts as a background pattern.

export function MarsDoodles() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Rover doodle - top left */}
      <motion.svg
        initial={{ rotate: -8 }}
        animate={{ rotate: [-8, -6, -8] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        viewBox="0 0 200 160"
        className="absolute top-12 left-6 w-32 md:w-44 text-mars/30 dark:text-mars/20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Body */}
        <rect x="50" y="40" width="100" height="50" rx="8" />
        {/* Solar panels */}
        <rect x="20" y="50" width="30" height="30" />
        <line x1="28" y1="50" x2="28" y2="80" />
        <line x1="40" y1="50" x2="40" y2="80" />
        <line x1="20" y1="65" x2="50" y2="65" />
        <rect x="150" y="50" width="30" height="30" />
        <line x1="158" y1="50" x2="158" y2="80" />
        <line x1="170" y1="50" x2="170" y2="80" />
        <line x1="150" y1="65" x2="180" y2="65" />
        {/* Camera mast */}
        <line x1="100" y1="40" x2="100" y2="20" />
        <circle cx="100" cy="18" r="5" />
        <line x1="95" y1="18" x2="105" y2="18" />
        {/* Wheels */}
        <circle cx="65" cy="100" r="14" />
        <circle cx="65" cy="100" r="6" />
        <line x1="65" y1="86" x2="65" y2="114" />
        <line x1="51" y1="100" x2="79" y2="100" />
        <circle cx="135" cy="100" r="14" />
        <circle cx="135" cy="100" r="6" />
        <line x1="135" y1="86" x2="135" y2="114" />
        <line x1="121" y1="100" x2="149" y2="100" />
        {/* Antenna */}
        <line x1="115" y1="40" x2="125" y2="22" />
        <circle cx="125" cy="22" r="2" fill="currentColor" />
      </motion.svg>

      {/* Rocket doodle - top right */}
      <motion.svg
        initial={{ rotate: 12 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        viewBox="0 0 120 200"
        className="absolute top-20 right-10 w-20 md:w-28 text-mars/30 dark:text-mars/20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Rocket body */}
        <path d="M60 20 C 70 50, 75 80, 75 110 L 45 110 C 45 80, 50 50, 60 20 Z" />
        {/* Window */}
        <circle cx="60" cy="55" r="8" />
        {/* Fins */}
        <path d="M45 90 L 30 130 L 45 120" />
        <path d="M75 90 L 90 130 L 75 120" />
        {/* Bottom */}
        <rect x="48" y="110" width="24" height="10" />
        {/* Flames */}
        <path d="M50 120 L 48 145 L 55 130 L 60 150 L 65 130 L 72 145 L 70 120" />
      </motion.svg>
    </div>
  );
}