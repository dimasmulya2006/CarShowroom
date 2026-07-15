"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus, Trash2, Pencil, RefreshCw, BarChart3, Car, Users, TrendingUp,
  Search, X, ChevronRight, AlertTriangle, CheckCircle
} from "lucide-react";

interface CarRow {
  id: number;
  slug: string;
  nama: string;
  merk: string;
  tahun: number;
  harga: number;
  transmisi: string;
  warna: string;
  gambar: string[];
}

function formatHarga(h: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(h);
}

export default function AdminPage() {
  const [cars, setCars] = useState<CarRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQ, setSearchQ] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<CarRow | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const fetchCars = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/cars");
      const json = await res.json();
      if (json.success) setCars(json.data);
    } catch {
      showToast("Gagal memuat data", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCars(); }, [fetchCars]);

  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/cars/${deleteTarget.id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setCars((prev) => prev.filter((c) => c.id !== deleteTarget.id));
        showToast(`${deleteTarget.nama} berhasil dihapus`, "success");
      } else {
        showToast("Gagal menghapus data", "error");
      }
    } catch {
      showToast("Terjadi kesalahan", "error");
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  const filtered = cars.filter(
    (c) =>
      c.nama.toLowerCase().includes(searchQ.toLowerCase()) ||
      c.merk.toLowerCase().includes(searchQ.toLowerCase())
  );

  const totalHarga = cars.reduce((acc, c) => acc + c.harga, 0);
  const merks = [...new Set(cars.map((c) => c.merk))];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-body">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-5 right-5 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-lg border backdrop-blur-sm
          ${toast.type === "success" ? "bg-emerald-900/60 border-emerald-500/30 text-emerald-300" : "bg-red-900/60 border-red-500/30 text-red-300"}`}>
          {toast.type === "success" ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
          <span className="text-sm">{toast.msg}</span>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
          <div className="bg-[#111] border border-border rounded-2xl p-8 max-w-sm w-full mx-4">
            <AlertTriangle className="w-10 h-10 text-red-400 mb-4" />
            <h3 className="font-heading text-xl font-bold text-white mb-2">Hapus Kendaraan?</h3>
            <p className="text-white/60 text-sm mb-6">
              Data <span className="text-white font-semibold">{deleteTarget.nama}</span> akan dihapus permanen dari database.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2.5 border border-border rounded-lg text-white/70 hover:text-white text-sm transition-colors">
                Batal
              </button>
              <button onClick={handleDelete} disabled={deleting}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 rounded-lg text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2">
                {deleting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                {deleting ? "Menghapus..." : "Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0 border-r border-border flex flex-col bg-[#0D0D0D]">
          <div className="p-6 border-b border-border">
            <Link href="/" className="font-heading text-xl font-bold">
              Mulya<span className="text-gold">Showroom</span>
            </Link>
            <p className="text-white/30 text-xs mt-1">Admin Dashboard</p>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            <div className="px-3 py-2 bg-gold/10 border border-gold/20 rounded-lg flex items-center gap-3 text-gold">
              <Car className="w-4 h-4" />
              <span className="text-sm font-medium">Manajemen Mobil</span>
            </div>
            <Link href="/koleksi" className="px-3 py-2 rounded-lg flex items-center gap-3 text-white/50 hover:text-white hover:bg-white/5 transition-all">
              <BarChart3 className="w-4 h-4" />
              <span className="text-sm">Lihat Koleksi</span>
            </Link>
            <Link href="/" className="px-3 py-2 rounded-lg flex items-center gap-3 text-white/50 hover:text-white hover:bg-white/5 transition-all">
              <ChevronRight className="w-4 h-4" />
              <span className="text-sm">Kembali ke Website</span>
            </Link>
          </nav>
          <div className="p-4 border-t border-border">
            <p className="text-white/30 text-xs">MulyaShowroom © {new Date().getFullYear()}</p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-10">
              <div>
                <h1 className="font-heading text-3xl font-bold text-white">Manajemen Kendaraan</h1>
                <p className="text-white/50 mt-1">Kelola seluruh data kendaraan di showroom.</p>
              </div>
              <Link
                href="/admin/tambah"
                className="flex items-center gap-2 px-5 py-3 bg-gold hover:bg-gold-light text-black font-heading font-semibold rounded-xl transition-colors"
              >
                <Plus className="w-4 h-4" />
                Tambah Kendaraan
              </Link>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
              <div className="bg-secondary/40 border border-border rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 bg-gold/10 rounded-lg flex items-center justify-center">
                    <Car className="w-4 h-4 text-gold" />
                  </div>
                  <span className="text-white/50 text-sm">Total Kendaraan</span>
                </div>
                <p className="font-heading text-3xl font-bold text-white">{cars.length}</p>
              </div>
              <div className="bg-secondary/40 border border-border rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-white/50 text-sm">Total Merk</span>
                </div>
                <p className="font-heading text-3xl font-bold text-white">{merks.length}</p>
              </div>
              <div className="bg-secondary/40 border border-border rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-white/50 text-sm">Total Nilai Stok</span>
                </div>
                <p className="font-heading text-2xl font-bold text-white">
                  {cars.length > 0 ? `Rp ${(totalHarga / 1e9).toFixed(1)} M` : "—"}
                </p>
              </div>
            </div>

            {/* Toolbar */}
            <div className="flex gap-3 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  value={searchQ}
                  onChange={(e) => setSearchQ(e.target.value)}
                  placeholder="Cari nama atau merk..."
                  className="w-full pl-10 pr-4 py-2.5 bg-secondary border border-border rounded-lg text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50"
                />
                {searchQ && (
                  <button onClick={() => setSearchQ("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <button onClick={fetchCars} className="p-2.5 border border-border bg-secondary rounded-lg text-white/50 hover:text-white transition-colors">
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              </button>
            </div>

            {/* Table */}
            <div className="bg-secondary/30 border border-border rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left px-6 py-4 text-xs text-white/40 uppercase tracking-widest font-medium">Kendaraan</th>
                      <th className="text-left px-6 py-4 text-xs text-white/40 uppercase tracking-widest font-medium">Merk</th>
                      <th className="text-left px-6 py-4 text-xs text-white/40 uppercase tracking-widest font-medium">Tahun</th>
                      <th className="text-left px-6 py-4 text-xs text-white/40 uppercase tracking-widest font-medium">Harga</th>
                      <th className="text-left px-6 py-4 text-xs text-white/40 uppercase tracking-widest font-medium">Transmisi</th>
                      <th className="text-right px-6 py-4 text-xs text-white/40 uppercase tracking-widest font-medium">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      Array.from({ length: 4 }).map((_, i) => (
                        <tr key={i} className="border-b border-border/50 animate-pulse">
                          <td className="px-6 py-4"><div className="h-4 bg-white/10 rounded w-40" /></td>
                          <td className="px-6 py-4"><div className="h-4 bg-white/10 rounded w-20" /></td>
                          <td className="px-6 py-4"><div className="h-4 bg-white/10 rounded w-12" /></td>
                          <td className="px-6 py-4"><div className="h-4 bg-white/10 rounded w-28" /></td>
                          <td className="px-6 py-4"><div className="h-4 bg-white/10 rounded w-16" /></td>
                          <td className="px-6 py-4"><div className="h-4 bg-white/10 rounded w-20 ml-auto" /></td>
                        </tr>
                      ))
                    ) : filtered.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-16 text-white/30">
                          {searchQ ? "Tidak ada hasil pencarian." : "Belum ada data kendaraan. Tambahkan kendaraan baru."}
                        </td>
                      </tr>
                    ) : (
                      filtered.map((car) => (
                        <tr key={car.id} className="border-b border-border/50 hover:bg-white/3 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="relative w-12 h-9 rounded-md overflow-hidden bg-secondary flex-shrink-0">
                                <img src={car.gambar[0]} alt={car.nama} className="object-cover w-full h-full" />
                              </div>
                              <div>
                                <p className="text-white font-medium text-sm">{car.nama}</p>
                                <p className="text-white/40 text-xs">{car.warna}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-white/70 text-sm">{car.merk}</td>
                          <td className="px-6 py-4 text-white/70 text-sm">{car.tahun}</td>
                          <td className="px-6 py-4 text-gold font-medium text-sm">{formatHarga(car.harga)}</td>
                          <td className="px-6 py-4">
                            <span className={`text-xs px-2.5 py-1 rounded-full border ${
                              car.transmisi === "Otomatis"
                                ? "bg-blue-500/10 border-blue-500/20 text-blue-400"
                                : "bg-orange-500/10 border-orange-500/20 text-orange-400"
                            }`}>
                              {car.transmisi}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <Link
                                href={`/admin/edit/${car.id}`}
                                className="p-2 text-white/40 hover:text-gold hover:bg-gold/10 rounded-lg transition-all"
                                title="Edit"
                              >
                                <Pencil className="w-4 h-4" />
                              </Link>
                              <button
                                onClick={() => setDeleteTarget(car)}
                                className="p-2 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                                title="Hapus"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              {!loading && filtered.length > 0 && (
                <div className="px-6 py-4 border-t border-border text-sm text-white/40">
                  Menampilkan {filtered.length} dari {cars.length} kendaraan
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
