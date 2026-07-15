"use client";

import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

const values = [
  {
    icon: "✦",
    title: "Kualitas Premium",
    desc: "Setiap kendaraan kami lalui proses inspeksi ketat 200 titik sebelum tiba di showroom.",
  },
  {
    icon: "◈",
    title: "Layanan Personal",
    desc: "Kami percaya setiap pelanggan berhak mendapatkan pengalaman yang dipersonalisasi.",
  },
  {
    icon: "◉",
    title: "Integritas",
    desc: "Transparansi penuh pada riwayat kendaraan, harga, dan kondisi unit.",
  },
  {
    icon: "⬡",
    title: "Inovasi",
    desc: "Selalu menghadirkan koleksi terbaru dan teknologi terkini untuk kepuasan Anda.",
  },
];

const team = [
  { nama: "Dimas Mulya", jabatan: "Founder & CEO", warna: "#C9A24B" },
  { nama: "Mulya Ahmad", jabatan: "Head of Sales", warna: "#A0856B" },
  { nama: "Ahmad Dzaky", jabatan: "Customer Experience", warna: "#8B9A6B" },
  { nama: "Dimas Dzaky", jabatan: "Technical Specialist", warna: "#6B8BA0" },
];

const stats = [
  { value: "500+", label: "Kendaraan Terjual" },
  { value: "12+", label: "Tahun Pengalaman" },
  { value: "98%", label: "Kepuasan Pelanggan" },
  { value: "50+", label: "Mitra Leasing" },
];

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function TentangPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#0a0a0a]">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl" />
        </div>
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="container mx-auto px-4 md:px-8 relative z-10"
        >
          <motion.p variants={fadeUp} className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">Siapa Kami</motion.p>
          <motion.h1 variants={fadeUp} className="font-heading text-5xl md:text-6xl font-bold text-white max-w-3xl leading-tight mb-8">
            Lebih dari Sekadar{" "}
            <span className="text-gold">Showroom</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-white/60 text-xl max-w-2xl leading-relaxed">
            MulyaShowroom lahir dari satu keyakinan: membeli mobil bukan hanya transaksi — ini adalah awal dari
            pengalaman berkendara yang tak terlupakan. Kami hadir untuk memastikan pengalaman itu sempurna, dari
            awal hingga akhir.
          </motion.p>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="border-y border-border py-14 bg-secondary/20">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {stats.map((s) => (
              <motion.div key={s.label} variants={fadeUp}>
                <p className="font-heading text-4xl font-bold text-gold mb-2">{s.value}</p>
                <p className="text-white/50 text-sm">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.p variants={fadeUp} className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">Cerita Kami</motion.p>
              <motion.h2 variants={fadeUp} className="font-heading text-4xl font-bold text-white mb-6">Didirikan dengan Passion, Dibangun dengan Kepercayaan</motion.h2>
              <motion.div variants={fadeUp} className="space-y-4 text-white/60 leading-relaxed">
                <p>
                  Berdiri sejak 2012, MulyaShowroom dimulai dari sebuah garasi kecil di Jakarta Selatan dengan satu
                  unit Mercedes-Benz dan satu mimpi besar: menghadirkan mobil impian ke tangan pelanggan yang tepat.
                </p>
                <p>
                  Selama lebih dari satu dekade, kami telah berkembang menjadi salah satu showroom mobil premium
                  terpercaya di Indonesia. Reputasi kami dibangun bukan dari kata-kata, melainkan dari kepercayaan
                  ratusan pelanggan yang kembali lagi dan lagi.
                </p>
                <p>
                  Setiap kendaraan di showroom kami melewati inspeksi menyeluruh 200 titik. Setiap pelanggan yang
                  duduk di kursi test drive, kami layani seperti keluarga sendiri.
                </p>
              </motion.div>
            </motion.div>
            
            {/* Visual Story Timeline */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="relative pl-8 border-l border-gold/30 space-y-10"
            >
              {[
                { year: "2012", text: "Membuka showroom perdana dengan koleksi pertama." },
                { year: "2015", text: "Ekspansi ke kendaraan sport dan luxury segment." },
                { year: "2019", text: "Raih penghargaan 'Best Premium Dealership' regional." },
                { year: "2023", text: "Meluncurkan platform digital MulyaShowroom untuk jangkauan lebih luas." },
              ].map((item) => (
                <motion.div key={item.year} variants={fadeUp} className="relative">
                  <div className="absolute -left-[41px] w-3 h-3 bg-gold rounded-full border-2 border-background" />
                  <p className="text-gold font-heading font-bold text-lg">{item.year}</p>
                  <p className="text-white/60 mt-1">{item.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-secondary/20 border-y border-border">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.p variants={fadeUp} className="text-gold text-sm font-semibold uppercase tracking-widest mb-4 text-center">Nilai Kami</motion.p>
            <motion.h2 variants={fadeUp} className="font-heading text-4xl font-bold text-white text-center mb-14">Yang Kami Pegang Teguh</motion.h2>
            <motion.div variants={staggerContainer} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v) => (
                <motion.div
                  key={v.title}
                  variants={fadeUp}
                  className="bg-background border border-border rounded-xl p-6 hover:border-gold/40 hover:shadow-[0_0_25px_rgba(201,162,75,0.12)] transition-all duration-300"
                >
                  <div className="text-gold text-3xl mb-4">{v.icon}</div>
                  <h3 className="font-heading font-bold text-white text-lg mb-2">{v.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.p variants={fadeUp} className="text-gold text-sm font-semibold uppercase tracking-widest mb-4 text-center">Tim Kami</motion.p>
            <motion.h2 variants={fadeUp} className="font-heading text-4xl font-bold text-white text-center mb-14">Orang-Orang di Balik MulyaShowroom</motion.h2>
            <motion.div variants={staggerContainer} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member) => (
                <motion.div
                  key={member.nama}
                  variants={fadeUp}
                  whileHover={{ y: -10 }}
                  className="bg-secondary/40 border border-border rounded-xl overflow-hidden group hover:border-gold/30 transition-all cursor-pointer"
                >
                  <div
                    className="h-40 flex items-center justify-center text-5xl font-heading font-bold text-white/20"
                    style={{ background: `linear-gradient(135deg, ${member.warna}22, transparent)`, borderBottom: `1px solid ${member.warna}33` }}
                  >
                    {member.nama.charAt(0)}
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading font-bold text-white">{member.nama}</h3>
                    <p className="text-gold/80 text-sm mt-1">{member.jabatan}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/30 border-t border-border">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeUp} className="font-heading text-4xl font-bold text-white mb-4">Siap Menemukan Mobil Impian Anda?</motion.h2>
            <motion.p variants={fadeUp} className="text-white/60 mb-10">Jelajahi koleksi kami atau hubungi tim sales kami sekarang.</motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <Link
                href="/koleksi"
                className="px-8 py-4 bg-gold hover:bg-gold-light text-black font-heading font-semibold rounded-xl transition-colors"
              >
                Lihat Koleksi
              </Link>
              <Link
                href="/kontak"
                className="px-8 py-4 border border-border hover:border-gold/40 text-white font-semibold rounded-xl transition-colors"
              >
                Hubungi Kami
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
