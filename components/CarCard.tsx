"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { Car } from "@/types/car";

interface CarCardProps {
  car: Car;
  index: number;
  onSelect: (car: Car) => void;
}

export function formatHarga(harga: number): string {
  if (harga >= 1000000000) {
    return `Rp ${(harga / 1000000000).toFixed(2)} M`;
  }
  return `Rp ${(harga / 1000000).toFixed(0)} Jt`;
}

export function CarCard({ car, index, onSelect }: CarCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.03 }}
      className="group relative bg-card border border-border rounded-xl overflow-hidden cursor-pointer
        hover:shadow-[0_0_30px_rgba(201,162,75,0.25)] transition-shadow duration-300"
    >
      {/* Clickable Image Area */}
      <div
        className="relative h-52 w-full overflow-hidden bg-secondary"
        onClick={() => onSelect(car)}
      >
        {/* Shared Layout Image */}
        <motion.div
          layoutId={`car-img-${car.id}`}
          className="absolute inset-0"
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        >
          <Image
            src={car.gambar[0]}
            alt={car.nama}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>

        {/* Merk Badge */}
        <div className="absolute top-3 left-3 z-10 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full border border-gold/30">
          <span className="text-xs text-gold font-semibold font-heading tracking-wide">{car.merk}</span>
        </div>
        {/* Warna */}
        <div className="absolute bottom-3 right-3 z-10 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-xs text-white/70">{car.warna}</span>
        </div>
        {/* Click Hint */}
        <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
          <span className="text-white/90 text-sm font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
            Lihat Detail
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5" style={{ transform: "translateZ(20px)" }}>
        <h3 className="font-heading text-lg font-bold text-white mb-1 group-hover:text-gold transition-colors">
          {car.nama}
        </h3>
        <div className="flex items-center gap-3 text-sm text-white/50 mb-4">
          <span>{car.tahun}</span>
          <span className="w-1 h-1 rounded-full bg-white/30" />
          <span>{car.transmisi}</span>
          <span className="w-1 h-1 rounded-full bg-white/30" />
          <span>{car.bahan_bakar}</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-white/40 mb-1">Harga Mulai</p>
            <p className="font-heading text-xl font-bold text-gold">{formatHarga(car.harga)}</p>
          </div>
          <button
            onClick={() => onSelect(car)}
            className="px-4 py-2 bg-gold/10 hover:bg-gold text-gold hover:text-black font-semibold
              text-sm rounded-lg border border-gold/30 transition-all duration-200"
          >
            Detail
          </button>
        </div>
      </div>
    </motion.div>
  );
}
