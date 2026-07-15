"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle } from "lucide-react";

const contactInfo = [
  {
    icon: <MapPin className="w-5 h-5" />,
    label: "Alamat",
    value: "Jl. HR Rasuna Said Kav. 12, Jakarta Selatan 12950",
  },
  {
    icon: <Phone className="w-5 h-5" />,
    label: "Telepon",
    value: "+62 812-3456-7890",
  },
  {
    icon: <Mail className="w-5 h-5" />,
    label: "Email",
    value: "halo@mulyashowroom.id",
  },
  {
    icon: <Clock className="w-5 h-5" />,
    label: "Jam Operasional",
    value: "Senin – Sabtu: 09.00 – 18.00 WIB",
  },
];

export default function KontakPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">Hubungi Kami</p>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-white max-w-2xl leading-tight mb-6">
            Kami Siap <span className="text-gold">Membantu</span> Anda
          </h1>
          <p className="text-white/60 text-xl max-w-xl leading-relaxed">
            Punya pertanyaan, ingin test drive, atau sekadar ingin mengobrol soal mobil? Jangan ragu untuk menghubungi tim kami.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-28">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Left: Info + Map */}
            <div className="space-y-8">
              {/* Info Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {contactInfo.map((info) => (
                  <div
                    key={info.label}
                    className="bg-secondary/40 border border-border rounded-xl p-5 flex gap-4 hover:border-gold/30 transition-colors"
                  >
                    <div className="text-gold mt-0.5 flex-shrink-0">{info.icon}</div>
                    <div>
                      <p className="text-white/40 text-xs uppercase tracking-wide mb-1">{info.label}</p>
                      <p className="text-white text-sm font-medium">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Embed Placeholder */}
              <div className="relative w-full h-72 rounded-2xl overflow-hidden border border-border bg-secondary/30">
                <iframe
                  title="Lokasi MulyaShowroom"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0!2d106.8319!3d-6.2297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTMnNDYuOSJTIDEwNsKwNDknNTUuMiJF!5e0!3m2!1sen!2sid!4v1680000000000!5m2!1sen!2sid"
                  className="w-full h-full grayscale opacity-80"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute inset-0 pointer-events-none border-2 border-gold/20 rounded-2xl" />
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/628123456789?text=Halo,%20saya%20ingin%20bertanya%20tentang%20kendaraan%20di%20MulyaShowroom"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 rounded-xl border border-[#25D366]/30 
                  bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] font-semibold transition-all duration-200"
              >
                <MessageSquare className="w-5 h-5" />
                Chat via WhatsApp Sekarang
              </a>
            </div>

            {/* Right: Form */}
            <div>
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[500px] text-center bg-secondary/30 border border-border rounded-2xl p-10">
                  <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8 text-gold" />
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-white mb-3">Pesan Terkirim!</h2>
                  <p className="text-white/60 mb-6">
                    Terima kasih telah menghubungi kami. Tim kami akan membalas pesan Anda dalam 1×24 jam kerja.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-gold text-sm hover:underline"
                  >
                    Kirim pesan lain
                  </button>
                </div>
              ) : (
                <div className="bg-secondary/30 border border-border rounded-2xl p-8">
                  <h2 className="font-heading text-2xl font-bold text-white mb-2">Kirim Pesan</h2>
                  <p className="text-white/50 text-sm mb-8">Isi formulir di bawah dan kami akan segera merespons Anda.</p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-xs text-white/50 ml-1">Nama Lengkap</label>
                        <input
                          required
                          type="text"
                          placeholder="John Doe"
                          className="w-full px-4 py-3 bg-background border border-border rounded-lg text-sm text-white focus:outline-none focus:border-gold/50 transition-colors"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-white/50 ml-1">Nomor Telepon</label>
                        <input
                          required
                          type="tel"
                          placeholder="0812xxxx"
                          className="w-full px-4 py-3 bg-background border border-border rounded-lg text-sm text-white focus:outline-none focus:border-gold/50 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-white/50 ml-1">Email</label>
                      <input
                        required
                        type="email"
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-sm text-white focus:outline-none focus:border-gold/50 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-white/50 ml-1">Topik Pertanyaan</label>
                      <select
                        required
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-sm text-white focus:outline-none focus:border-gold/50 transition-colors"
                      >
                        <option value="">Pilih Topik</option>
                        <option value="unit">Ketersediaan Unit</option>
                        <option value="testdrive">Jadwal Test Drive</option>
                        <option value="kredit">Simulasi Kredit</option>
                        <option value="jual">Jual / Tukar Tambah</option>
                        <option value="lain">Lainnya</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-white/50 ml-1">Pesan</label>
                      <textarea
                        required
                        rows={5}
                        placeholder="Tuliskan pertanyaan atau keperluan Anda di sini..."
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-sm text-white focus:outline-none focus:border-gold/50 transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center justify-center gap-2 w-full py-4 bg-gold hover:bg-gold-light disabled:opacity-60 text-black font-heading font-semibold rounded-xl transition-all duration-200"
                    >
                      {loading ? (
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                      {loading ? "Mengirim..." : "Kirim Pesan"}
                    </button>
                  </form>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
