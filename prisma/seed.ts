import { PrismaClient } from "@prisma/client";
import { cars } from "../lib/data/cars";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database showroom...");

  for (const car of cars) {
    await prisma.car.upsert({
      where: { slug: car.slug },
      update: {},
      create: {
        slug: car.slug,
        nama: car.nama,
        merk: car.merk,
        tahun: car.tahun,
        harga: BigInt(car.harga),
        transmisi: car.transmisi,
        bahan_bakar: car.bahan_bakar,
        warna: car.warna,
        gambar: car.gambar.join("|"),
        deskripsi: car.deskripsi,
        mesin: car.spesifikasi.mesin,
        kapasitas: car.spesifikasi.kapasitas,
        hp: car.spesifikasi.hp,
        torsi: car.spesifikasi.torsi,
        konsumsi_bbm: car.spesifikasi.konsumsi_bbm,
        top_speed: car.spesifikasi.top_speed,
        akselerasi: car.spesifikasi.akselerasi,
        penggerak: car.spesifikasi.penggerak,
        fitur: car.spesifikasi.fitur.join("|"),
        interior: car.spesifikasi.interior.join("|"),
        eksterior: car.spesifikasi.eksterior.join("|"),
      },
    });
    console.log(`✅ Seeded: ${car.nama}`);
  }

  console.log("🎉 Seeding selesai!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
