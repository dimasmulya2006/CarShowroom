"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface SimulasiKreditProps {
  harga: number;
}

export function SimulasiKredit({ harga }: SimulasiKreditProps) {
  const [dpPercent, setDpPercent] = useState(20);
  const [tenor, setTenor] = useState(3);
  const bungaPerTahun = 0.048; // 4.8% bunga flat per tahun

  const dpNominal = (harga * dpPercent) / 100;
  const pokokHutang = harga - dpNominal;
  const totalBunga = pokokHutang * bungaPerTahun * tenor;
  const totalHutang = pokokHutang + totalBunga;
  const angsuranPerBulan = totalHutang / (tenor * 12);

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="bg-secondary/50 border border-border rounded-xl p-6 lg:p-8">
      <h3 className="font-heading text-xl font-bold text-white mb-6">Simulasi Kredit</h3>
      
      <div className="space-y-6">
        {/* DP Slider */}
        <div>
          <div className="flex justify-between items-end mb-2">
            <label className="text-white/70 text-sm">Down Payment (DP)</label>
            <span className="text-gold font-bold text-lg">{dpPercent}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="70"
            step="5"
            value={dpPercent}
            onChange={(e) => setDpPercent(Number(e.target.value))}
            className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer accent-gold"
          />
          <p className="text-white/50 text-xs mt-2 text-right">{formatRupiah(dpNominal)}</p>
        </div>

        {/* Tenor Slider */}
        <div>
          <div className="flex justify-between items-end mb-2">
            <label className="text-white/70 text-sm">Tenor (Jangka Waktu)</label>
            <span className="text-gold font-bold text-lg">{tenor} Tahun</span>
          </div>
          <input
            type="range"
            min="1"
            max="5"
            step="1"
            value={tenor}
            onChange={(e) => setTenor(Number(e.target.value))}
            className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer accent-gold"
          />
          <p className="text-white/50 text-xs mt-2 text-right">{tenor * 12} Bulan</p>
        </div>

        {/* Hasil Perhitungan */}
        <div className="mt-8 p-5 bg-background border border-gold/20 rounded-xl space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Harga Kendaraan</span>
            <span className="text-white font-medium">{formatRupiah(harga)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Total DP</span>
            <span className="text-white font-medium">{formatRupiah(dpNominal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Suku Bunga (Flat)</span>
            <span className="text-white font-medium">{bungaPerTahun * 100}% per tahun</span>
          </div>
          <div className="h-px bg-border my-3" />
          <div className="flex justify-between items-center">
            <span className="text-white/80 font-medium">Angsuran per Bulan</span>
            <span className="text-gold font-heading text-2xl font-bold">{formatRupiah(angsuranPerBulan)}</span>
          </div>
        </div>
        
        <p className="text-[10px] text-white/30 leading-tight">
          *Perhitungan di atas adalah estimasi. Suku bunga dan nominal dapat berubah sesuai dengan kebijakan leasing atau bank yang berlaku pada saat transaksi.
        </p>
      </div>
    </div>
  );
}
