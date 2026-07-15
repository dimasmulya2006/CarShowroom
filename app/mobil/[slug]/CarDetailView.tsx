"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SimulasiKredit } from "@/components/SimulasiKredit";
import { BookingForm } from "@/components/BookingForm";
import { formatHarga } from "@/components/CarCard";
import { Car } from "@/types/car";

export default function CarDetailView({ car }: { car: Car }) {
  const [currentImage, setCurrentImage] = useState(0);

  // Jika array gambar hanya 1, gandakan untuk simulasi carousel
  const gallery = car.gambar.length > 1 ? car.gambar : [car.gambar[0], car.gambar[0], car.gambar[0]];

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % gallery.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + gallery.length) % gallery.length);

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <div className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4 md:px-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-white/50 mb-6">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            <Link href="/koleksi" className="hover:text-gold transition-colors">Koleksi</Link>
            <span>/</span>
            <span className="text-gold">{car.nama}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Column: Gallery & Details */}
            <div className="lg:col-span-8 space-y-10">
              
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-secondary group">
                  <Image
                    src={gallery[currentImage] || "/hero.png"}
                    alt={`${car.nama} - view ${currentImage + 1}`}
                    fill
                    className="object-cover transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                  
                  {/* Controls */}
                  <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={prevImage} className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-gold hover:text-black transition-colors">
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button onClick={nextImage} className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-gold hover:text-black transition-colors">
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                </div>
                
                {/* Thumbnails */}
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImage(idx)}
                      className={`relative w-24 h-16 md:w-32 md:h-20 rounded-lg overflow-hidden flex-shrink-0 transition-all ${currentImage === idx ? 'ring-2 ring-gold' : 'opacity-50 hover:opacity-100'}`}
                    >
                      <Image src={img || "/hero.png"} alt="Thumbnail" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Title & Desc */}
              <div className="border-b border-border pb-8">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-gold/10 text-gold text-xs font-semibold rounded-full border border-gold/20">
                    {car.tahun}
                  </span>
                  <span className="px-3 py-1 bg-secondary text-white/70 text-xs font-semibold rounded-full border border-border">
                    {car.kondisi || "Bekas"}
                  </span>
                </div>
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">{car.nama}</h1>
                <p className="text-white/60 leading-relaxed text-lg">
                  {car.deskripsi}
                </p>
              </div>

              {/* Specifications */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-white mb-6">Spesifikasi Teknis</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Mesin", value: car.spesifikasi.mesin },
                    { label: "Kapasitas", value: car.spesifikasi.kapasitas },
                    { label: "Tenaga", value: `${car.spesifikasi.hp} HP` },
                    { label: "Torsi", value: car.spesifikasi.torsi },
                    { label: "Top Speed", value: car.spesifikasi.top_speed },
                    { label: "0-100 km/h", value: car.spesifikasi.akselerasi },
                    { label: "Penggerak", value: car.spesifikasi.penggerak },
                    { label: "Transmisi", value: car.transmisi },
                  ].map((spec, idx) => (
                    <div key={idx} className="bg-secondary/30 border border-border rounded-xl p-4">
                      <p className="text-white/40 text-xs mb-1 uppercase tracking-wider">{spec.label}</p>
                      <p className="text-white font-medium">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features Lists */}
              <div className="grid md:grid-cols-2 gap-8 pt-6 border-t border-border">
                <div>
                  <h3 className="font-heading text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-1 h-5 bg-gold rounded-full"></span> Interior
                  </h3>
                  <ul className="space-y-3">
                    {car.interior.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-white/70">
                        <Check className="w-5 h-5 text-gold shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-1 h-5 bg-gold rounded-full"></span> Eksterior
                  </h3>
                  <ul className="space-y-3">
                    {car.eksterior.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-white/70">
                        <Check className="w-5 h-5 text-gold shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

            {/* Right Column: Pricing & Forms */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Price Card */}
              <div className="bg-secondary/30 border border-border rounded-2xl p-6 sticky top-24">
                <p className="text-white/50 text-sm mb-2">Harga Mulai</p>
                <h2 className="font-heading text-3xl font-bold text-gold mb-6">
                  {formatHarga(car.harga)}
                </h2>
                
                <div className="space-y-4">
                  <SimulasiKredit harga={car.harga} />
                  <BookingForm carName={car.nama} />
                </div>

                <div className="mt-6 pt-6 border-t border-border/50 text-center">
                  <p className="text-white/40 text-xs">
                    * Harga dapat berubah sewaktu-waktu tanpa pemberitahuan. Hubungi kami untuk ketersediaan unit dan penawaran terbaik.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
