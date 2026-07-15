import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const car = await prisma.car.findUnique({ where: { id: Number(params.id) } });
    if (!car) return Response.json({ success: false, error: "Tidak ditemukan" }, { status: 404 });
    return Response.json({
      success: true,
      data: {
        ...car,
        harga: Number(car.harga),
        gambar: car.gambar.split("|"),
        fitur: car.fitur.split("|"),
        interior: car.interior.split("|"),
        eksterior: car.eksterior.split("|"),
      },
    });
  } catch (err: any) {
    return Response.json({ success: false, error: err?.message || "Server error" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();

    const existingCar = await prisma.car.findUnique({ where: { id: Number(params.id) } });
    if (!existingCar) return Response.json({ success: false, error: "Tidak ditemukan" }, { status: 404 });

    const namaRaw = String(body.nama || "");
    const slug = namaRaw.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    // Handle File Upload via Base64 (opsional — pakai lama kalau tidak ada gambar baru)
    let imagePath = existingCar.gambar;
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

    const car = await prisma.car.update({
      where: { id: Number(params.id) },
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
    return Response.json({ success: true, data: { ...car, harga: Number(car.harga) } });
  } catch (err: any) {
    console.error("[PUT /api/cars/[id]] Error:", err);
    return Response.json({ success: false, error: err?.message || "Gagal update data" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.car.delete({ where: { id: Number(params.id) } });
    return Response.json({ success: true, message: "Mobil berhasil dihapus" });
  } catch (err: any) {
    return Response.json({ success: false, error: err?.message || "Gagal menghapus data" }, { status: 500 });
  }
}
