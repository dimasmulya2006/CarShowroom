"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // Framer motion variants
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden bg-background">
      {/* Background Image / Video */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <Image
          src="/hero.png"
          alt="Luxury Car Showroom"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto mt-20"
        >
          <motion.h1
            variants={item}
            className="font-heading text-5xl md:text-7xl font-bold text-white mb-6"
          >
            Temukan Mobil <span className="text-gold">Impian Anda</span>
          </motion.h1>
          
          <motion.p
            variants={item}
            className="text-lg md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto"
          >
            Premium Car Gallery dengan pengalaman interaktif.
          </motion.p>
          
          <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-4 bg-gold hover:bg-[#E1C073] text-black font-semibold rounded-md transition-colors w-full sm:w-auto">
              Jelajahi Mobil
            </button>
            <button className="px-8 py-4 bg-transparent border border-white/30 hover:border-white text-white font-semibold rounded-md transition-colors backdrop-blur-sm w-full sm:w-auto">
              Hubungi Kami
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
