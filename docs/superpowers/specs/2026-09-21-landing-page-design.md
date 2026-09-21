# Desain Landing Page United Developer Community (UDC)

Tanggal: 2026-09-21

## Latar Belakang

Project pertama komunitas. Tujuan utama bukan hanya menghasilkan website, tapi melatih
kerja tim (Git/GitHub, pembagian tugas, merging). Project ini adalah fondasi pertama yang
dikerjakan solony (repo manager) sebelum nantinya dikerjakan berempat.

## Tujuan

- Membuat landing page resmi komunitas developer yang berfungsi (bukan sekadar mockup).
- Sebagai kerangka kerja awal yang rapi, sehingga mudah dikerjakan tim di masa depan.
- Belajar alur dasar HTML/CSS/JS sederhana tanpa build tool.

## Ruang Lingkup

- Satu halaman (single page) dengan navigasi anchor.
- Gaya bebas berkreasi; template cafe hanya inspirasi kasar (dan sudah disepakati menjadi
  tema dark tech untuk komunitas developer).
- Seluruh aset berupa placeholder (logo teks, placeholder gambar) yang mudah diganti.
- Bahasa konten: Indonesia.

## Desain Visual

- Tema gelap "tech" dengan aksen violet/cyan (gradient).
- Font: Google Fonts — `Space Grotesk` (heading) dan `Inter` (body).
- Aksen gradient dipakai di judul hero, tombol CTA, dan kartu.

## Struktur Halaman

1. **Navbar sticky** — logo teks "UDC" + link anchor (Tentang, Galeri, Gabung) +
   hamburger menu untuk mobile.
2. **Hero** — judul besar, tagline komunitas, tombol CTA ("Gabung", "Tentang"),
   latar gradient.
3. **Tentang Komunitas** — intro singkat + 3 kartu keunggulan:
   Belajar Bareng, Project Bareng, Networking.
4. **Galeri** — grid foto placeholder (pure CSS / inline SVG, tanpa dependensi luar).
5. **Gabung / Kontak** — panel CTA + link kontak placeholder
   (WhatsApp, Discord, Instagram, email).
6. **Footer** — copyright.

## Teknologi & Arsitektur File

- Vanilla: `index.html`, `css/style.css`, `js/main.js`, folder `assets/` untuk placeholder.
- Tanpa library JavaScript dan tanpa build tool.
- README lama (encoding UTF-16) ditulis ulang ke UTF-8 berisi info project dan cara
  menjalankan lokal (`python3 -m http.server`).

```text
UDC_Landing_Page/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── assets/
└── README.md
```

## JavaScript

Ringan saja:

- Toggle hamburger menu (mobile).
- Smooth scroll anchor (fallback CSS `scroll-behavior`).
- Scroll-reveal sederhana dengan `IntersectionObserver`.

## Deployment

- GitHub Pages, publish dari branch `main` (root).
- Link aset menggunakan path relatif agar berfungsi di root dan sub-path.

## Verifikasi

- Buka di browser (Chrome/Firefox) — halaman tampil benar.
- Responsif: cek lebar mobile (375px) dan desktop.
- HTML valid (tidak ada tag tidak tertutup / duplikat id).
- Jalankan lokal: `python3 -m http.server 8000`.

## Di Luar Ruang Lingkup (YAGNI)

- Halaman multi-page (mis. blog, dokumentasi).
- Section "Program & Kegiatan" dan "Testimoni" (belum dibutuhkan saat ini).
- Integrasi form kontak backend.
- Pengerjaan paralel 4 anggota (menyusul sebagai pembelajaran berikutnya).