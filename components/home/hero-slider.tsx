"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const slides = [
  {
    id: 1,
    title: "Team Durbar",
    subtitle: "Forging the Future of Martian Exploration from Bangladesh",
    image: "/images/hero-rover.jpg",
    cta: { label: "Explore Projects", href: "/projects" },
  },
  {
    id: 2,
    title: "ARC 2022 Finalists",
    subtitle: "Representing Bangladesh at Anatolian Rover Challenge",
    image: "/images/hero-competition.jpg",
    cta: { label: "Our Achievements", href: "/achievements" },
  },
  {
    id: 3,
    title: "Innovation & Excellence",
    subtitle: "Building cutting-edge rovers with passion and precision",
    image: "/images/hero-team.jpg",
    cta: { label: "Meet the Team", href: "/about" },
  },
  {
    id: 4,
    title: "Support Our Mission",
    subtitle: "Help us reach Mars and beyond",
    image: "/images/hero-workshop.jpg",
    cta: { label: "Contribute", href: "/contribute" },
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Auto-play
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  const slide = slides[currentSlide];

  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-space-black">
        {/* Placeholder gradient background when no images */}
        <div className="absolute inset-0 bg-gradient-to-br from-space-black via-space-gunmetal to-space-zinc" />
        
        {/* Subtle star pattern overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(2px 2px at 20px 30px, #a0a0a0, transparent),
                              radial-gradient(2px 2px at 40px 70px, #d4d4d8, transparent),
                              radial-gradient(1px 1px at 90px 40px, #a0a0a0, transparent),
                              radial-gradient(2px 2px at 130px 80px, #d4d4d8, transparent),
                              radial-gradient(1px 1px at 160px 120px, #a0a0a0, transparent)`,
            backgroundSize: '200px 200px',
          }}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-space-black via-space-black/60 to-transparent" />
      </div>

      {/* Slide Content */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={slide.id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "tween", duration: 0.5, ease: "easeInOut" },
            opacity: { duration: 0.3 },
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="section-container relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {/* Mars accent line with gradient */}
              <div className="w-20 h-1 mx-auto mb-6 rounded-full bg-gradient-to-r from-orange-400 via-orange-500 to-red-500" />
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display text-white mb-4 tracking-wider uppercase">
                <span className="text-gradient-mars">{slide.title}</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-8 font-body">
                {slide.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href={slide.cta.href}>
                  <Button size="lg" className="min-w-[180px]">
                    {slide.cta.label}
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" size="lg" className="min-w-[180px] border-white/30 text-white hover:bg-white/10 hover:text-white">
                    Learn More
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-20 flex justify-between px-4 md:px-8">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={prevSlide}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md flex items-center justify-center text-white border border-white/10 hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/20 transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={nextSlide}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md flex items-center justify-center text-white border border-white/10 hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/20 transition-all"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentSlide ? 1 : -1);
              setCurrentSlide(index);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "w-10 bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 shadow-lg shadow-orange-500/50"
                : "w-2 bg-white/30 hover:bg-white/50 hover:scale-125"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 right-8 z-20 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-white/50 text-sm flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}

