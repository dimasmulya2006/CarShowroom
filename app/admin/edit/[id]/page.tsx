"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Save, AlertTriangle, Image as ImageIcon } from "lucide-react";

const MERKS = ["Toyota", "BMW", "Mercedes-Benz", "Porsche", "Honda", "Mazda", "Audi", "Ferrari"];

export default function EditCarPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string>("");
  const [imageExt, setImageExt] = useState<string>("");
  const [carData, setCarData] = useState<any>(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await fetch(`/api/cars/${params.id}`);
        const json = await res.json();
        if (json.success) {
          setCarData(json.data);
          if (json.data.gambar && json.data.gambar.length > 0) {
            setPreviewUrl(json.data.gambar[0]);
          }
        } else {
          setError("Gagal mengambil data mobil.");
        }
      } catch {
        setError("Kesalahan koneksi.");
      } finally {
        setFetching(false);
      }
    };
    fetchCar();
  }, [params.id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreviewUrl(URL.createObjectURL(file));
    const ext = file.name.split(".").pop() || "jpg";
    setImageExt(ext);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setImageBase64(result.split(",")[1]);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const get = (name: string) => (form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)?.value || "";

    const payload = {
      nama: get("nama"),
      merk: get("merk"),
      tahun: get("tahun"),
      harga: get("harga"),
      transmisi: get("transmisi"),
      bahan_bakar: get("bahan_bakar"),
      warna: get("warna"),
      deskripsi: get("deskripsi"),
      mesin: get("mesin"),
      kapasitas: get("kapasitas"),
      hp: get("hp"),
      torsi: get("torsi"),
      konsumsi_bbm: get("konsumsi_bbm"),
      top_speed: get("top_speed"),
      akselerasi: get("akselerasi"),
      penggerak: get("penggerak"),
      fitur: get("fitur"),
      interior: get("interior"),
      eksterior: get("eksterior"),
      imageBase64: imageBase64,
      imageExt: imageExt,
    };

    try {
      const res = await fetch(`/api/cars/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(json.error || "Gagal menyimpan data.");
      }
    } catch {
      setError("Terjadi kesalahan koneksi.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-white">
        Memuat data...
      </div>
    );
  }

  if (!carData) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-white">
        <p className="mb-4 text-red-400">{error || "Mobil tidak ditemukan"}</p>
        <Link href="/admin" className="text-gold hover:underline">Kembali ke Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-body">
      <div className="border-b border-border bg-[#0D0D0D] px-8 py-5 flex items-center gap-4">
        <Link href="/admin" className="text-white/50 hover:text-white transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="font-heading text-xl font-bold text-white">Edit Kendaraan</h1>
          <p className="text-white/40 text-sm">Perbarui informasi untuk {carData.nama}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-8 py-10 space-y-10">
        {error && (
          <div className="flex items-center gap-3 p-4 bg-red-900/30 border border-red-500/30 rounded-xl text-red-300 text-sm">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {/* Upload Gambar */}
        <section className="space-y-5">
          <h2 className="font-heading font-semibold text-white text-lg border-b border-border pb-3">Foto Kendaraan</h2>
          <div className="flex items-start gap-8">
            <label className="w-64 h-40 bg-secondary/50 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center text-white/30 relative overflow-hidden cursor-pointer hover:border-gold/50 transition-colors">
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="object-cover w-full h-full" />
              ) : (
                <>
                  <ImageIcon className="w-8 h-8 mb-2" />
                  <span className="text-sm">Klik untuk pilih gambar</span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            <div className="flex-1 space-y-2">
              <p className="text-white/60 text-sm">Biarkan kosong jika tidak ingin mengganti foto.</p>
              <ul className="text-white/40 text-xs space-y-1 list-disc pl-4">
                <li>Format yang didukung: JPG, PNG, WEBP.</li>
                <li>Rasio ideal: 16:9 (Landscape).</li>
                <li>Ukuran maksimal: 2MB.</li>
              </ul>
              {imageBase64 && <p className="text-green-400 text-xs">✓ Gambar baru dipilih</p>}
            </div>
          </div>
        </section>

        {/* Informasi Dasar */}
        <section className="space-y-5">
          <h2 className="font-heading font-semibold text-white text-lg border-b border-border pb-3">Informasi Dasar</h2>
          <div className="grid md:grid-cols-2 gap-5">
            <Field label="Nama Kendaraan *" name="nama" defaultValue={carData.nama} required />
            <div className="space-y-1.5">
              <label className="text-xs text-white/50 ml-1">Merk *</label>
              <select name="merk" defaultValue={carData.merk} required className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-sm text-white focus:outline-none focus:border-gold/50">
                <option value="">Pilih Merk</option>
                {MERKS.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <Field label="Tahun *" name="tahun" type="number" defaultValue={carData.tahun} required />
            <Field label="Harga (IDR) *" name="harga" type="number" defaultValue={carData.harga} required />
            <div className="space-y-1.5">
              <label className="text-xs text-white/50 ml-1">Transmisi *</label>
              <select name="transmisi" defaultValue={carData.transmisi} required className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-sm text-white focus:outline-none focus:border-gold/50">
                <option value="Otomatis">Otomatis</option>
                <option value="Manual">Manual</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-white/50 ml-1">Bahan Bakar *</label>
              <select name="bahan_bakar" defaultValue={carData.bahan_bakar} required className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-sm text-white focus:outline-none focus:border-gold/50">
                <option value="Bensin">Bensin</option>
                <option value="Diesel">Diesel</option>
                <option value="Listrik">Listrik</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <Field label="Warna *" name="warna" defaultValue={carData.warna} required />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-white/50 ml-1">Deskripsi *</label>
            <textarea name="deskripsi" required rows={4} defaultValue={carData.deskripsi}
              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-sm text-white focus:outline-none focus:border-gold/50 resize-none" />
          </div>
        </section>

        {/* Spesifikasi */}
        <section className="space-y-5">
          <h2 className="font-heading font-semibold text-white text-lg border-b border-border pb-3">Spesifikasi Teknis</h2>
          <div className="grid md:grid-cols-2 gap-5">
            <Field label="Mesin" name="mesin" defaultValue={carData.mesin} />
            <Field label="Kapasitas Mesin" name="kapasitas" defaultValue={carData.kapasitas} />
            <Field label="Tenaga (HP)" name="hp" type="number" defaultValue={carData.hp} />
            <Field label="Torsi" name="torsi" defaultValue={carData.torsi} />
            <Field label="Konsumsi BBM" name="konsumsi_bbm" defaultValue={carData.konsumsi_bbm} />
            <Field label="Top Speed" name="top_speed" defaultValue={carData.top_speed} />
            <Field label="Akselerasi 0-100" name="akselerasi" defaultValue={carData.akselerasi} />
            <div className="space-y-1.5">
              <label className="text-xs text-white/50 ml-1">Penggerak</label>
              <select name="penggerak" defaultValue={carData.penggerak} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-sm text-white focus:outline-none focus:border-gold/50">
                <option value="RWD">RWD</option>
                <option value="FWD">FWD</option>
                <option value="AWD">AWD</option>
                <option value="4WD">4WD</option>
              </select>
            </div>
          </div>
        </section>

        {/* Fitur */}
        <section className="space-y-5">
          <h2 className="font-heading font-semibold text-white text-lg border-b border-border pb-3">Fitur & Kelengkapan</h2>
          <div className="grid md:grid-cols-3 gap-5">
            <TextareaField label="Fitur (1 per baris)" name="fitur" defaultValue={carData.fitur.join("\n")} />
            <TextareaField label="Interior (1 per baris)" name="interior" defaultValue={carData.interior.join("\n")} />
            <TextareaField label="Eksterior (1 per baris)" name="eksterior" defaultValue={carData.eksterior.join("\n")} />
          </div>
        </section>

        <div className="flex gap-4 pt-4">
          <Link href="/admin" className="px-6 py-3 border border-border rounded-xl text-white/70 hover:text-white text-sm transition-colors">
            Batal
          </Link>
          <button type="submit" disabled={loading}
            className="flex items-center gap-2 px-8 py-3 bg-gold hover:bg-gold-light disabled:opacity-60 text-black font-heading font-semibold rounded-xl transition-colors">
            <Save className="w-4 h-4" />
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, name, type = "text", defaultValue, required }: {
  label: string; name: string; type?: string; defaultValue?: any; required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs text-white/50 ml-1">{label}</label>
      <input type={type} name={name} defaultValue={defaultValue} required={required}
        className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-sm text-white focus:outline-none focus:border-gold/50 transition-colors" />
    </div>
  );
}

function TextareaField({ label, name, defaultValue }: { label: string; name: string; defaultValue?: string }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs text-white/50 ml-1">{label}</label>
      <textarea name={name} rows={5} defaultValue={defaultValue}
        className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-sm text-white focus:outline-none focus:border-gold/50 resize-none transition-colors" />
    </div>
  );
}
