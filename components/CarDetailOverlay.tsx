"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  Phone,
  Calendar,
  ChevronRight,
  Zap,
  Gauge,
  Fuel,
  Settings2,
  Wind,
  ArrowUpRight,
} from "lucide-react";
import { Car } from "@/types/car";
import { formatHarga } from "@/components/CarCard";

interface CarDetailOverlayProps {
  car: Car;
  onClose: () => void;
}

export function CarDetailOverlay({ car, onClose }: CarDetailOverlayProps) {
  const [showPanel, setShowPanel] = useState(false);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const specs = [
    { icon: <Zap className="w-4 h-4" />, label: "Mesin", value: car.spesifikasi.mesin },
    { icon: <Settings2 className="w-4 h-4" />, label: "Kapasitas", value: car.spesifikasi.kapasitas },
    { icon: <ArrowUpRight className="w-4 h-4" />, label: "Tenaga", value: `${car.spesifikasi.hp} HP` },
    { icon: <Gauge className="w-4 h-4" />, label: "Torsi", value: car.spesifikasi.torsi },
    { icon: <Wind className="w-4 h-4" />, label: "Top Speed", value: car.spesifikasi.top_speed },
    { icon: <ChevronRight className="w-4 h-4" />, label: "0–100 km/h", value: car.spesifikasi.akselerasi },
    { icon: <Fuel className="w-4 h-4" />, label: "Konsumsi BBM", value: car.spesifikasi.konsumsi_bbm },
    { icon: <Settings2 className="w-4 h-4" />, label: "Penggerak", value: car.spesifikasi.penggerak },
  ];

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex"
        onClick={onClose}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Close Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.2 }}
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="absolute top-5 right-5 z-[60] w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 
            backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all"
          aria-label="Tutup detail"
        >
          <X className="w-5 h-5" />
        </motion.button>

        {/* Main Content — Left: Image, Right: Panel */}
        <div
          className="relative z-10 flex flex-col lg:flex-row w-full h-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image (Shared Layout Animation) */}
          <div className="relative lg:flex-1 h-[40vh] lg:h-full overflow-hidden">
            <motion.div
              layoutId={`car-img-${car.id}`}
              className="absolute inset-0"
              transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
              onLayoutAnimationComplete={() => setShowPanel(true)}
            >
              <Image
                src={car.gambar[0]}
                alt={car.nama}
                fill
                className="object-cover object-center"
                priority
              />
              {/* Gradient overlay on image bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </motion.div>

            {/* Car name over image (mobile) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: showPanel ? 1 : 0, y: showPanel ? 0 : 10 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-4 left-5 lg:hidden"
            >
              <p className="text-gold text-sm font-semibold">{car.merk}</p>
              <h2 className="text-white font-heading text-2xl font-bold">{car.nama}</h2>
            </motion.div>
          </div>

          {/* Detail Panel — slides from right */}
          <AnimatePresence>
            {showPanel && (
              <motion.div
                key="panel"
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                className="relative bg-[#111111] border-l border-border 
                  w-full lg:w-[430px] xl:w-[480px] overflow-y-auto flex-shrink-0
                  h-[60vh] lg:h-full"
              >
                <div className="p-7 pb-10">
                  {/* Header */}
                  <div className="mb-6">
                    <span className="text-gold text-xs font-semibold uppercase tracking-widest">{car.merk}</span>
                    <h2 className="font-heading text-3xl font-bold text-white mt-1">{car.nama}</h2>
                    <div className="flex items-center gap-3 mt-2 text-sm text-white/50">
                      <span>{car.tahun}</span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span>{car.transmisi}</span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span>{car.bahan_bakar}</span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span>{car.warna}</span>
                    </div>
                  </div>

                  {/* Harga */}
                  <div className="bg-gold/10 border border-gold/20 rounded-xl px-5 py-4 mb-6">
                    <p className="text-white/50 text-xs mb-1">Harga OTR Jakarta</p>
                    <p className="font-heading text-3xl font-bold text-gold">{formatHarga(car.harga)}</p>
                  </div>

                  {/* Spesifikasi Grid */}
                  <div className="mb-6">
                    <h3 className="text-white font-heading font-semibold text-sm uppercase tracking-widest mb-3">
                      Spesifikasi
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {specs.map((s, i) => (
                        <motion.div
                          key={s.label}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.05 * i, duration: 0.3 }}
                          className="bg-secondary/60 border border-border rounded-lg p-3"
                        >
                          <div className="flex items-center gap-1.5 text-gold mb-1">{s.icon}
                            <span className="text-[10px] text-white/40 uppercase tracking-wide">{s.label}</span>
                          </div>
                          <p className="text-white text-sm font-medium">{s.value}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Fitur */}
                  <div className="mb-5">
                    <h3 className="text-white font-heading font-semibold text-sm uppercase tracking-widest mb-3">Fitur Unggulan</h3>
                    <ul className="flex flex-wrap gap-2">
                      {car.spesifikasi.fitur.map((f) => (
                        <li key={f} className="text-xs bg-secondary border border-border text-white/70 px-3 py-1.5 rounded-full">
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Interior */}
                  <div className="mb-5">
                    <h3 className="text-white font-heading font-semibold text-sm uppercase tracking-widest mb-3">Interior</h3>
                    <ul className="space-y-1.5">
                      {car.spesifikasi.interior.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-white/60">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Eksterior */}
                  <div className="mb-5">
                    <h3 className="text-white font-heading font-semibold text-sm uppercase tracking-widest mb-3">Eksterior</h3>
                    <ul className="space-y-1.5">
                      {car.spesifikasi.eksterior.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-white/60">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Deskripsi */}
                  <div className="mb-8">
                    <h3 className="text-white font-heading font-semibold text-sm uppercase tracking-widest mb-3">Deskripsi</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{car.deskripsi}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Link
                      href={`/mobil/${car.slug}`}
                      className="flex items-center justify-center gap-2 w-full py-3.5 bg-gold hover:bg-gold-light text-black font-heading font-semibold rounded-xl transition-all duration-200"
                    >
                      Lihat Galeri Lengkap
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href={`/mobil/${car.slug}#booking`}
                      className="flex items-center justify-center gap-2 w-full py-3.5 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 transition-all duration-200"
                    >
                      <Calendar className="w-4 h-4 text-gold" />
                      Booking Test Drive
                    </Link>
                    <a
                      href={`https://wa.me/628123456789?text=Halo,%20saya%20tertarik%20dengan%20${encodeURIComponent(car.nama)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3.5 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 transition-all duration-200"
                    >
                      <Phone className="w-4 h-4 text-gold" />
                      Hubungi Sales
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
