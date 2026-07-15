import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CarGallery } from "@/components/CarGallery";
import { prisma } from "@/lib/prisma";
import { mapPrismaCar } from "@/lib/data/dbMapper";

export const metadata: Metadata = {
  title: "Koleksi Mobil | MulyaShowroom",
  description: "Temukan koleksi mobil premium kami. Filter berdasarkan merk, harga, transmisi, dan lainnya.",
};

export default async function KoleksiPage() {
  const dbCars = await prisma.car.findMany({ orderBy: { created_at: 'desc' } });
  const cars = dbCars.map(mapPrismaCar);
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-28 pb-16 container mx-auto px-4 md:px-8">
        <div className="mb-10">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-3">
            Koleksi <span className="text-gold">Kami</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl">
            Jelajahi armada kendaraan premium pilihan kami. Setiap kendaraan diseleksi dengan standar kualitas tertinggi.
          </p>
        </div>
        <CarGallery cars={cars} />
      </div>
      <Footer />
    </main>
  );
}
