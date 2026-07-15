"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Car } from "@/types/car";
import { CarCard } from "@/components/CarCard";
import { CarDetailOverlay } from "@/components/CarDetailOverlay";

interface CarGalleryProps {
  cars: Car[];
  preview?: boolean;
}

export function CarGallery({ cars, preview = false }: CarGalleryProps) {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filterMerk, setFilterMerk] = useState("");
  const [filterTransmisi, setFilterTransmisi] = useState("");
  const [filterBahanBakar, setFilterBahanBakar] = useState("");
  const [filterWarna, setFilterWarna] = useState("");
  const [filterTahunMin, setFilterTahunMin] = useState("");
  const [filterHargaMax, setFilterHargaMax] = useState("");

  const merks = useMemo(() => [...new Set(cars.map((c) => c.merk))], [cars]);
  const warnas = useMemo(() => [...new Set(cars.map((c) => c.warna))], [cars]);

  const filtered = useMemo(() => {
    let result = cars;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) => c.nama.toLowerCase().includes(q) || c.merk.toLowerCase().includes(q)
      );
    }
    if (filterMerk) result = result.filter((c) => c.merk === filterMerk);
    if (filterTransmisi) result = result.filter((c) => c.transmisi === filterTransmisi);
    if (filterBahanBakar) result = result.filter((c) => c.bahan_bakar === filterBahanBakar);
    if (filterWarna) result = result.filter((c) => c.warna === filterWarna);
    if (filterTahunMin) result = result.filter((c) => c.tahun >= parseInt(filterTahunMin));
    if (filterHargaMax) result = result.filter((c) => c.harga <= parseInt(filterHargaMax) * 1000000000);
    return preview ? result.slice(0, 3) : result;
  }, [cars, searchQuery, filterMerk, filterTransmisi, filterBahanBakar, filterWarna, filterTahunMin, filterHargaMax, preview]);

  const resetFilters = () => {
    setSearchQuery("");
    setFilterMerk("");
    setFilterTransmisi("");
    setFilterBahanBakar("");
    setFilterWarna("");
    setFilterTahunMin("");
    setFilterHargaMax("");
  };

  const activeFilterCount = [filterMerk, filterTransmisi, filterBahanBakar, filterWarna, filterTahunMin, filterHargaMax].filter(Boolean).length;

  return (
    <>
      {/* Detail Overlay */}
      <AnimatePresence mode="wait">
        {selectedCar && (
          <CarDetailOverlay
            key={selectedCar.id}
            car={selectedCar}
            onClose={() => setSelectedCar(null)}
          />
        )}
      </AnimatePresence>

      <div className="w-full">
        {!preview && (
          <div className="mb-8 space-y-4">
            {/* Search + Filter Toggle */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Cari nama atau merk mobil..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-secondary border border-border rounded-lg text-white placeholder:text-white/30
                    focus:outline-none focus:border-gold/60 text-sm"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <button
                onClick={() => setShowFilter(!showFilter)}
                className={`flex items-center gap-2 px-4 py-3 border rounded-lg text-sm font-medium transition-all ${
                  showFilter || activeFilterCount > 0
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-border bg-secondary text-white/70 hover:border-gold/40"
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filter
                {activeFilterCount > 0 && (
                  <span className="bg-gold text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {activeFilterCount}
                  </span>
                )}
              </button>
              {activeFilterCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="px-4 py-3 border border-border bg-secondary rounded-lg text-sm text-white/50 hover:text-white transition-colors"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Filter Panel */}
            <AnimatePresence>
              {showFilter && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="bg-secondary border border-border rounded-xl p-5 grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs text-white/40 mb-2 block">Merk</label>
                      <select value={filterMerk} onChange={(e) => setFilterMerk(e.target.value)}
                        className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold/60">
                        <option value="">Semua Merk</option>
                        {merks.map((m) => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-white/40 mb-2 block">Transmisi</label>
                      <select value={filterTransmisi} onChange={(e) => setFilterTransmisi(e.target.value)}
                        className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold/60">
                        <option value="">Semua Transmisi</option>
                        <option value="Otomatis">Otomatis</option>
                        <option value="Manual">Manual</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-white/40 mb-2 block">Bahan Bakar</label>
                      <select value={filterBahanBakar} onChange={(e) => setFilterBahanBakar(e.target.value)}
                        className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold/60">
                        <option value="">Semua Bahan Bakar</option>
                        <option value="Bensin">Bensin</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Listrik">Listrik</option>
                        <option value="Hybrid">Hybrid</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-white/40 mb-2 block">Warna</label>
                      <select value={filterWarna} onChange={(e) => setFilterWarna(e.target.value)}
                        className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold/60">
                        <option value="">Semua Warna</option>
                        {warnas.map((w) => <option key={w} value={w}>{w}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-white/40 mb-2 block">Tahun Min.</label>
                      <select value={filterTahunMin} onChange={(e) => setFilterTahunMin(e.target.value)}
                        className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold/60">
                        <option value="">Semua Tahun</option>
                        {[2020, 2021, 2022, 2023].map((y) => <option key={y} value={y}>{y}+</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-white/40 mb-2 block">Harga Maks.</label>
                      <select value={filterHargaMax} onChange={(e) => setFilterHargaMax(e.target.value)}
                        className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold/60">
                        <option value="">Semua Harga</option>
                        <option value="1">s/d Rp 1 M</option>
                        <option value="2">s/d Rp 2 M</option>
                        <option value="3">s/d Rp 3 M</option>
                        <option value="5">s/d Rp 5 M</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Result count */}
            <p className="text-sm text-white/40">
              Menampilkan <span className="text-white font-medium">{filtered.length}</span> dari {cars.length} kendaraan
            </p>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((car, i) => (
              <CarCard
                key={car.id}
                car={car}
                index={i}
                onSelect={setSelectedCar}
              />
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-white/30 text-lg">Tidak ada mobil yang sesuai filter.</p>
            <button onClick={resetFilters} className="mt-4 text-gold hover:underline text-sm">Reset filter</button>
          </div>
        )}
      </div>
    </>
  );
}
