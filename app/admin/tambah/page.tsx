"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const MERKS = ["Toyota", "BMW", "Mercedes-Benz", "Porsche", "Honda", "Mazda", "Audi", "Ferrari"];

const inputClass =
  "w-full px-4 py-3 rounded-lg text-sm text-white focus:outline-none transition-colors resize-none";
const inputStyle = {
  backgroundColor: "#1a1a1a",
  border: "1px solid #2a2a2a",
};

export default function TambahCarPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState("");
  const [imageExt, setImageExt] = useState("");

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
    setSuccess(false);

    const form = e.currentTarget;
    const get = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)
        ?.value || "";

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
      imageBase64,
      imageExt,
    };

    try {
      const res = await fetch("/api/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/admin");
          router.refresh();
        }, 800);
      } else {
        setError(json.error || "Gagal menyimpan data.");
      }
    } catch {
      setError("Terjadi kesalahan koneksi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0a0a0a", color: "#ffffff" }}>
      {/* Header */}
      <div
        style={{
          borderBottom: "1px solid #222",
          backgroundColor: "#0d0d0d",
          padding: "20px 32px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <Link
          href="/admin"
          style={{
            color: "rgba(255,255,255,0.4)",
            textDecoration: "none",
            fontSize: "20px",
            lineHeight: 1,
          }}
        >
          ←
        </Link>
        <div>
          <h1 style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "#fff" }}>
            Tambah Kendaraan Baru
          </h1>
          <p style={{ margin: 0, fontSize: "13px", color: "rgba(255,255,255,0.35)" }}>
            Isi semua data kendaraan di bawah ini
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 32px" }}
      >
        {/* Error */}
        {error && (
          <div
            style={{
              padding: "14px 18px",
              backgroundColor: "rgba(220,38,38,0.15)",
              border: "1px solid rgba(220,38,38,0.3)",
              borderRadius: "12px",
              color: "#fca5a5",
              fontSize: "14px",
              marginBottom: "32px",
            }}
          >
            ⚠ {error}
          </div>
        )}
        {success && (
          <div
            style={{
              padding: "14px 18px",
              backgroundColor: "rgba(34,197,94,0.15)",
              border: "1px solid rgba(34,197,94,0.3)",
              borderRadius: "12px",
              color: "#86efac",
              fontSize: "14px",
              marginBottom: "32px",
            }}
          >
            ✓ Kendaraan berhasil disimpan! Mengalihkan...
          </div>
        )}

        {/* Upload Gambar */}
        <Section title="Foto Kendaraan">
          <div style={{ display: "flex", alignItems: "flex-start", gap: "32px" }}>
            <label
              style={{
                width: "256px",
                height: "160px",
                backgroundColor: "#1a1a1a",
                border: "2px dashed #2a2a2a",
                borderRadius: "12px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                overflow: "hidden",
                flexShrink: 0,
                position: "relative",
              }}
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <div style={{ textAlign: "center", color: "rgba(255,255,255,0.3)" }}>
                  <div style={{ fontSize: "36px", marginBottom: "8px" }}>📷</div>
                  <div style={{ fontSize: "13px" }}>Klik untuk pilih gambar</div>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </label>
            <div>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", marginBottom: "8px" }}>
                Pilih foto utama untuk kendaraan ini.
              </p>
              <ul style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px", paddingLeft: "16px" }}>
                <li>Format: JPG, PNG, WEBP</li>
                <li>Rasio ideal: 16:9 (Landscape)</li>
                <li>Ukuran maks: 2MB</li>
              </ul>
              {previewUrl && (
                <p style={{ color: "#4ade80", fontSize: "12px", marginTop: "8px" }}>
                  ✓ Gambar dipilih
                </p>
              )}
            </div>
          </div>
        </Section>

        {/* Informasi Dasar */}
        <Section title="Informasi Dasar">
          <Grid2>
            <Field label="Nama Kendaraan *" name="nama" placeholder="Toyota Supra MK5" required />
            <SelectField label="Merk *" name="merk" required>
              <option value="">Pilih Merk</option>
              {MERKS.map((m) => <option key={m} value={m}>{m}</option>)}
            </SelectField>
            <Field label="Tahun *" name="tahun" type="number" placeholder="2023" required />
            <Field label="Harga (IDR) *" name="harga" type="number" placeholder="1850000000" required />
            <SelectField label="Transmisi *" name="transmisi" required>
              <option value="Otomatis">Otomatis</option>
              <option value="Manual">Manual</option>
            </SelectField>
            <SelectField label="Bahan Bakar *" name="bahan_bakar" required>
              <option value="Bensin">Bensin</option>
              <option value="Diesel">Diesel</option>
              <option value="Listrik">Listrik</option>
              <option value="Hybrid">Hybrid</option>
            </SelectField>
            <Field label="Warna *" name="warna" placeholder="Matte Silver" required />
          </Grid2>
          <div style={{ marginTop: "20px" }}>
            <label style={{ display: "block", fontSize: "12px", color: "rgba(255,255,255,0.4)", marginBottom: "6px" }}>
              Deskripsi *
            </label>
            <textarea
              name="deskripsi"
              required
              rows={4}
              placeholder="Deskripsi singkat kendaraan..."
              className={inputClass}
              style={{ ...inputStyle, width: "100%", boxSizing: "border-box" }}
            />
          </div>
        </Section>

        {/* Spesifikasi */}
        <Section title="Spesifikasi Teknis">
          <Grid2>
            <Field label="Mesin" name="mesin" placeholder="Turbocharged Inline-6" />
            <Field label="Kapasitas Mesin" name="kapasitas" placeholder="3.0 L" />
            <Field label="Tenaga (HP)" name="hp" type="number" placeholder="382" />
            <Field label="Torsi" name="torsi" placeholder="500 Nm" />
            <Field label="Konsumsi BBM" name="konsumsi_bbm" placeholder="11 km/L" />
            <Field label="Top Speed" name="top_speed" placeholder="250 km/h" />
            <Field label="Akselerasi 0-100" name="akselerasi" placeholder="4.3 detik" />
            <SelectField label="Penggerak" name="penggerak">
              <option value="RWD">RWD</option>
              <option value="FWD">FWD</option>
              <option value="AWD">AWD</option>
              <option value="4WD">4WD</option>
            </SelectField>
          </Grid2>
        </Section>

        {/* Fitur */}
        <Section title="Fitur & Kelengkapan">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }}>
            <TextArea label="Fitur (1 per baris)" name="fitur" placeholder={"Launch Control\nTrack Mode\nAdaptive Suspension"} />
            <TextArea label="Interior (1 per baris)" name="interior" placeholder={"Bucket Seat Alcantara\nHead-Up Display"} />
            <TextArea label="Eksterior (1 per baris)" name="eksterior" placeholder={"Wide Body Kit\nActive Rear Spoiler"} />
          </div>
        </Section>

        {/* Actions */}
        <div style={{ display: "flex", gap: "16px", paddingTop: "16px" }}>
          <Link
            href="/admin"
            style={{
              padding: "12px 24px",
              border: "1px solid #2a2a2a",
              borderRadius: "12px",
              color: "rgba(255,255,255,0.5)",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            Batal
          </Link>
          <button
            type="submit"
            disabled={loading || success}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 32px",
              backgroundColor: loading || success ? "#666" : "#C9A84C",
              color: "#000",
              fontWeight: 700,
              fontSize: "14px",
              border: "none",
              borderRadius: "12px",
              cursor: loading || success ? "not-allowed" : "pointer",
              transition: "background 0.2s",
            }}
          >
            {loading ? "Menyimpan..." : success ? "Tersimpan ✓" : "💾 Simpan Kendaraan"}
          </button>
        </div>
      </form>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "40px" }}>
      <h2
        style={{
          fontSize: "16px",
          fontWeight: 600,
          color: "#fff",
          borderBottom: "1px solid #222",
          paddingBottom: "12px",
          marginBottom: "20px",
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

function Grid2({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
      {children}
    </div>
  );
}

function Field({
  label, name, type = "text", placeholder, required,
}: {
  label: string; name: string; type?: string; placeholder?: string; required?: boolean;
}) {
  return (
    <div>
      <label style={{ display: "block", fontSize: "12px", color: "rgba(255,255,255,0.4)", marginBottom: "6px" }}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        style={{
          width: "100%",
          padding: "12px 16px",
          backgroundColor: "#1a1a1a",
          border: "1px solid #2a2a2a",
          borderRadius: "8px",
          color: "#fff",
          fontSize: "14px",
          outline: "none",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

function SelectField({
  label, name, required, children,
}: {
  label: string; name: string; required?: boolean; children: React.ReactNode;
}) {
  return (
    <div>
      <label style={{ display: "block", fontSize: "12px", color: "rgba(255,255,255,0.4)", marginBottom: "6px" }}>
        {label}
      </label>
      <select
        name={name}
        required={required}
        style={{
          width: "100%",
          padding: "12px 16px",
          backgroundColor: "#1a1a1a",
          border: "1px solid #2a2a2a",
          borderRadius: "8px",
          color: "#fff",
          fontSize: "14px",
          outline: "none",
          boxSizing: "border-box",
        }}
      >
        {children}
      </select>
    </div>
  );
}

function TextArea({ label, name, placeholder }: { label: string; name: string; placeholder?: string }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: "12px", color: "rgba(255,255,255,0.4)", marginBottom: "6px" }}>
        {label}
      </label>
      <textarea
        name={name}
        rows={5}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "12px 16px",
          backgroundColor: "#1a1a1a",
          border: "1px solid #2a2a2a",
          borderRadius: "8px",
          color: "#fff",
          fontSize: "14px",
          outline: "none",
          resize: "none",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}
