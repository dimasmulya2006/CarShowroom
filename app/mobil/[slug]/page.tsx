import { prisma } from "@/lib/prisma";
import { mapPrismaCar } from "@/lib/data/dbMapper";
import CarDetailView from "./CarDetailView";
import Link from "next/link";

export async function generateStaticParams() {
  const cars = await prisma.car.findMany({ select: { slug: true } });
  return cars.map((car) => ({ slug: car.slug }));
}

export default async function CarDetailPage({ params }: { params: { slug: string } }) {
  const dbCar = await prisma.car.findUnique({ where: { slug: params.slug } });

  if (!dbCar) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="text-center">
          <h1 className="text-4xl font-heading font-bold text-white mb-4">Mobil Tidak Ditemukan</h1>
          <Link href="/koleksi" className="text-gold hover:underline">Kembali ke Koleksi</Link>
        </div>
      </div>
    );
  }

  const car = mapPrismaCar(dbCar);

  return <CarDetailView car={car} />;
}
