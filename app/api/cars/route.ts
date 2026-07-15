import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const cars = await prisma.car.findMany({
      orderBy: { created_at: "desc" },
    });
    const parsed = cars.map((c) => ({
      ...c,
      harga: Number(c.harga),
      gambar: c.gambar.split("|"),
      fitur: c.fitur.split("|"),
      interior: c.interior.split("|"),
      eksterior: c.eksterior.split("|"),
    }));
    return Response.json({ success: true, data: parsed });
  } catch (err: any) {
    return Response.json({ success: false, error: err?.message || "Gagal mengambil data" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Slug unik pakai timestamp
    const namaRaw = String(body.nama || "kendaraan");
    const baseSlug = namaRaw.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const slug = `${baseSlug}-${Date.now()}`;

    // Handle File Upload via Base64
    let imagePath = "";
    if (body.imageBase64 && body.imageExt) {
      const uploadDir = path.join(process.cwd(), "public", "cars");
      await mkdir(uploadDir, { recursive: true });
      const buffer = Buffer.from(body.imageBase64, "base64");
      const filename = `${Date.now()}.${body.imageExt}`;
      imagePath = `/cars/${filename}`;
      await writeFile(path.join(uploadDir, filename), buffer);
    }

    const parseList = (str: string) =>
      String(str || "")
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean)
        .join("|");

    const hargaStr = String(body.harga || "0").replace(/\D/g, "");

    const car = await prisma.car.create({
      data: {
        slug,
        nama: namaRaw,
        merk: String(body.merk || ""),
        tahun: Number(body.tahun || 0),
        harga: BigInt(hargaStr || "0"),
        transmisi: String(body.transmisi || ""),
        bahan_bakar: String(body.bahan_bakar || ""),
        warna: String(body.warna || ""),
        gambar: imagePath,
        deskripsi: String(body.deskripsi || ""),
        mesin: String(body.mesin || ""),
        kapasitas: String(body.kapasitas || ""),
        hp: Number(body.hp || 0),
        torsi: String(body.torsi || ""),
        konsumsi_bbm: String(body.konsumsi_bbm || ""),
        top_speed: String(body.top_speed || ""),
        akselerasi: String(body.akselerasi || ""),
        penggerak: String(body.penggerak || "RWD"),
        fitur: parseList(body.fitur),
        interior: parseList(body.interior),
        eksterior: parseList(body.eksterior),
      },
    });

    return Response.json(
      { success: true, data: { ...car, harga: Number(car.harga) } },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("[POST /api/cars] Error:", err);
    return Response.json(
      { success: false, error: err?.message || "Gagal menambahkan data" },
      { status: 500 }
    );
  }
}
