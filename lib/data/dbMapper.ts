import { Car as PrismaCar } from "@prisma/client";
import { Car as FrontendCar } from "@/types/car";

export function mapPrismaCar(c: PrismaCar): FrontendCar {
  return {
    id: c.id,
    slug: c.slug,
    nama: c.nama,
    merk: c.merk,
    tahun: c.tahun,
    harga: Number(c.harga),
    transmisi: c.transmisi as any,
    bahan_bakar: c.bahan_bakar as any,
    warna: c.warna,
    gambar: c.gambar ? c.gambar.split("|") : [],
    deskripsi: c.deskripsi,
    spesifikasi: {
      mesin: c.mesin,
      kapasitas: c.kapasitas,
      hp: c.hp,
      torsi: c.torsi,
      konsumsi_bbm: c.konsumsi_bbm,
      top_speed: c.top_speed,
      akselerasi: c.akselerasi,
      penggerak: c.penggerak,
      fitur: c.fitur ? c.fitur.split("|") : [],
      interior: c.interior ? c.interior.split("|") : [],
      eksterior: c.eksterior ? c.eksterior.split("|") : [],
    },
    fitur: c.fitur ? c.fitur.split("|") : [],
    interior: c.interior ? c.interior.split("|") : [],
    eksterior: c.eksterior ? c.eksterior.split("|") : [],
  };
}
