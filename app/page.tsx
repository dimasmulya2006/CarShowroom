import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { CarGallery } from "@/components/CarGallery";
import { prisma } from "@/lib/prisma";
import { mapPrismaCar } from "@/lib/data/dbMapper";
import Link from "next/link";

export default async function Home() {
  const dbCars = await prisma.car.findMany({ orderBy: { created_at: 'desc' } });
  const cars = dbCars.map(mapPrismaCar);
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />

      {/* Preview Koleksi */}
      <section className="py-20 container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-2">Pilihan Terbaik</p>
            <h2 className="font-heading text-4xl font-bold text-white">
              Koleksi <span className="text-gold">Unggulan</span>
            </h2>
          </div>
          <Link
            href="/koleksi"
            className="text-sm text-white/60 hover:text-gold transition-colors border-b border-white/20 hover:border-gold pb-1"
          >
            Lihat Semua Koleksi →
          </Link>
        </div>
        <CarGallery cars={cars} preview={true} />
        <div className="text-center mt-10">
          <Link
            href="/koleksi"
            className="inline-block px-8 py-4 border border-gold/40 text-gold hover:bg-gold hover:text-black
              font-semibold rounded-lg transition-all duration-300"
          >
            Lihat Semua {cars.length} Kendaraan
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
