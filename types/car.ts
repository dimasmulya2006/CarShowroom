export interface Spesifikasi {
  mesin: string;
  kapasitas: string;
  hp: number;
  torsi: string;
  konsumsi_bbm: string;
  top_speed: string;
  akselerasi: string;
  penggerak: string;
  fitur: string[];
  interior: string[];
  eksterior: string[];
}

export interface Car {
  id: number;
  slug: string;
  nama: string;
  merk: string;
  tahun: number;
  harga: number;
  transmisi: 'Manual' | 'Otomatis';
  bahan_bakar: 'Bensin' | 'Diesel' | 'Listrik' | 'Hybrid';
  warna: string;
  gambar: string[];
  spesifikasi: Spesifikasi;
  deskripsi: string;
}
