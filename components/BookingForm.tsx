"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, User, Phone, Mail } from "lucide-react";

interface BookingFormProps {
  carName: string;
}

export function BookingForm({ carName }: BookingFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-secondary/50 border border-gold/40 rounded-xl p-8 text-center h-full flex flex-col items-center justify-center min-h-[400px]"
      >
        <div className="w-16 h-16 bg-gold/20 text-gold rounded-full flex items-center justify-center mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-heading text-2xl font-bold text-white mb-2">Booking Berhasil!</h3>
        <p className="text-white/60 mb-6">
          Terima kasih. Tim sales kami akan segera menghubungi Anda untuk konfirmasi jadwal Test Drive {carName}.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="text-gold text-sm hover:underline"
        >
          Buat booking baru
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-secondary/50 border border-border rounded-xl p-6 lg:p-8 h-full">
      <div className="mb-6">
        <h3 className="font-heading text-xl font-bold text-white mb-1">Jadwalkan Test Drive</h3>
        <p className="text-sm text-white/50">Isi formulir di bawah untuk mengatur jadwal test drive {carName}.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nama */}
          <div className="space-y-1.5">
            <label className="text-xs text-white/70 ml-1">Nama Lengkap</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                required
                type="text"
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm text-white focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>
          </div>

          {/* Telepon */}
          <div className="space-y-1.5">
            <label className="text-xs text-white/70 ml-1">Nomor Telepon/WA</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                required
                type="tel"
                placeholder="0812xxxx"
                className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm text-white focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs text-white/70 ml-1">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              required
              type="email"
              placeholder="john@example.com"
              className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm text-white focus:outline-none focus:border-gold/50 transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tanggal */}
          <div className="space-y-1.5">
            <label className="text-xs text-white/70 ml-1">Tanggal</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                required
                type="date"
                className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm text-white focus:outline-none focus:border-gold/50 transition-colors [color-scheme:dark]"
              />
            </div>
          </div>

          {/* Waktu */}
          <div className="space-y-1.5">
            <label className="text-xs text-white/70 ml-1">Waktu</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <select
                required
                className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm text-white focus:outline-none focus:border-gold/50 transition-colors"
              >
                <option value="">Pilih Jam</option>
                <option value="10:00">10:00 WIB</option>
                <option value="13:00">13:00 WIB</option>
                <option value="15:00">15:00 WIB</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs text-white/70 ml-1">Lokasi Test Drive</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <select
              required
              className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm text-white focus:outline-none focus:border-gold/50 transition-colors"
            >
              <option value="showroom">Showroom Utama (Jakarta Selatan)</option>
              <option value="rumah">Kunjungan ke Rumah/Kantor</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 mt-4 bg-gold hover:bg-gold-light text-black font-heading font-semibold rounded-lg transition-colors duration-200"
        >
          Kirim Permintaan
        </button>
      </form>
    </div>
  );
}
