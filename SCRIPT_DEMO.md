# 🎬 SCRIPT DEMO LOGISROUTE — Durasi 3 Menit
## Kelompok 1 Paralel 5 | Struktur Data Genap 2025/2026

> **Tips**: Buka browser di **http://localhost:5173** sebelum mulai.
> Screen share mode: **整个屏幕** (full screen), zoom browser ke **90-100%**.

---

## 📋 RINGKASAN ALUR

| # | Aksi | Waktu | Penjelasan |
|---|------|-------|------------|
| 0 | Buka Dashboard | 15s | Intro + stat utama |
| 1 | Ganti Ukuran Data | 20s | Tunjukkan 5 scenario |
| 2 | Visualisasi Graf | 45s | Hub-and-Spoke, pan/zoom |
| 3 | Pencarian Rute | 25s | Cari rute asal→tujuan |
| 4 | Data Lokasi & Rute | 20s | Tabel CRUD |
| 5 | Benchmark Chart | 35s | Matrix vs List — inti presentasi! |
| 6 | Penutup | 10s | Kesimpulan |

**Total: ~3 menit**

---

## 🎯 SCRIPT DETAIL

---

### ⏱️ 00:00 – 00:15 | BUKA HALAMAN UTAMA (Dashboard)

**Aksi:**
```
1. Buka http://localhost:5173
2. Pastikan tab "Dashboard" aktif (default)
3. Default ukuran: XLarge (500 node, 2500 rute)
```

**Script:**
> "Assalamualaikum. Kami dari Kelompok 1 Paralel 5 akan mendemokan **LogisRoute** — Sistem Navigasi dan Rekomendasi Rute Distribusi.
>
> Ini adalah **Dashboard utama** sistem kami. Di sini langsung terlihat statistik jaringan distribusi:
> - **500 total lokasi**, terdiri dari **30 Gudang Pusat dan Transit** plus **470 Cabang Tujuan**
> - **2.500 rute aktif** dengan total jarak sekitar **200 ribu kilometer**
> - **Kepadatan graf hanya 1%** — ini artinya graf kita bersifat **sparse**, yang menjadi alasan utama kenapa kita membandingkan dua representasi berbeda."

**🖱️ Tunjuk layar:** arahkan mouse ke kartu statistik (Total Lokasi, Total Rute, Gudang, Cabang)

---

### ⏱️ 00:15 – 00:35 | GANTI UKURAN DATA (5 Scenario)

**Aksi:**
```
1. Klik tombol "Kecil" → lihat perubahan angka
2. Klik "Sedang" → lihat perubahan
3. Klik kembali "XLarge" (kembali ke data penuh)
```

**Script:**
> "Sistem kami mendukung **5 skenario ukuran data**, mulai dari skala kecil 20 node hingga enterprise 500 node. Ini memungkinkan kita mengukur bagaimana performa kedua struktur data — **Adjacency Matrix** dan **Adjacency List** — merespons pertumbuhan data.
>
> Perhatikan saat saya ganti ukuran, semua angka di dashboard update secara real-time. Sekarang kita kembali ke mode **XLarge** untuk melihat full dataset."

**🖱️ Tunjuk layar:** arahkan ke tombol ukuran data (Kecil/Sedang/Menengah/Besar/XLarge)

---

### ⏱️ 00:35 – 01:20 | VISUALISASI GRAF (Inti Visual!)

**Aksi:**
```
1. Klik tab "Visualisasi Graf"
2. Tunggu 1-2 detik sampai graf ter-render
3. Scroll mouse untuk ZOOM IN (perbesar)
4. DRAG (klik+tahan+geser) untuk geser posisi
5. HOVER mouse ke node Gudang (pusat) — lihat tooltip
6. HOVER ke node Cabang (pinggiran)
7. Klik tombol Reset (ikon Maximize) untuk reset posisi
8. Ganti ukuran ke "Kecil" → lihat graf lebih jarang
9. Kembali ke "XLarge"
```

**Script:**
> "Ini adalah **visualisasi graf jaringan distribusi** kita. Perhatikan layout-nya:
>
> **Pusat** — ada **Gudang Pusat** di tengah (node kuning besar). Ini adalah hub utama.
>
> **Mengelilingi pusat** — ada gudang-gudang transit di ring dalam.
>
> **Di pinggiran** — semua cabang tujuan tersebar di ring luar. Ini adalah model **Hub-and-Spoke**, sama seperti struktur jaringan logistik nyata.
>
> Setiap garis adalah **rute distribusi** dengan label jaraknya. Node kuning = Gudang, node biru = Cabang Tujuan.
>
> *(zoom in)* — Saya bisa **zoom in** dengan scroll mouse...
>
> *(drag)* — Dan **menggeser** tampilan dengan drag...
>
> *(hover node)* — Saat hover setiap node, muncul tooltip menampilkan ID lokasi, tipe, dan **degree** atau jumlah koneksi.
>
> *(ganti ke Kecil)* — Kalau kita ganti ke ukuran Kecil, grafnya lebih renggang karena hanya 20 node. Kalau XLarge, 500 node tetap terbaca rapi karena layout konsentris kita."

**🖱️ Tunjuk layar:**
- Tunjuk node pusat (kuning besar)
- Tunjuk edge/garis dengan label jarak
- Tunjuk tooltip saat hover

---

### ⏱️ 01:20 – 01:45 | PENCARIAN RUTE

**Aksi:**
```
1. Klik tab "Pencarian Rute"
2. Dropdown Asal: pilih "Gudang Pusat Jakarta" (L000)
3. Dropdown Tujuan: pilih sembarang cabang, misal "Cabang Bekasi #1"
4. Klik tombol "Cari Rute"
5. Lihat hasil
6. Klik "Reset"
```

**Script:**
> "Fitur berikutnya: **Pencarian Rute**. User bisa memilih lokasi asal dan tujuan, lalu sistem mengecek apakah rute langsung tersedia di dalam struktur graf.
>
> Misalnya dari **Gudang Pusat Jakarta** ke **Cabang Bekasi** — ditemukan rute langsung dengan jarak tertentu.
>
> Fitur ini memanfaatkan operasi **Search** pada kedua struktur data — O(1) untuk Matrix, O(E/V) untuk List."

**🖱️ Tunjuk layar:** tunjuk dropdown, hasil pencarian, info rute

---

### ⏱️ 01:45 – 02:05 | DATA LOKASI & RUTE (CRUD)

**Aksi:**
```
1. Klik tab "Data Lokasi" — scroll sebentar tunjuk tabel
2. Klik tab "Data Rute" — scroll sebentar tunjuk tabel
```

**Script:**
> "Berikutnya **manajemen data**. Tabel Lokasi menampilkan semua 500 titik beserta ID, nama, dan tipe. Tabel Rute menampilkan 2.500 rute dengan asal, tujuan, dan jarak.
>
> Keduanya mendukung operasi **CRUD** — tambah, edit, hapus data. Setiap perubahan langsung update kedua struktur (Matrix dan List) secara simultan. Ini yang kami implementasikan di program C++ kami."

**🖱️ Tunjuk layar:** scroll pelan di kedua tabel

---

### ⏱️ 02:05 – 02:40 | BENCHMARK CHART (⭐ PALING PENTING!)

**Aksi:**
```
1. Klik tab "Benchmark"
2. Tunjuk chart bar comparison (Matrix vs List)
3. Tunjuk chart memory comparison (pie/bar)
4. Tunjuk scaling chart kalau ada
```

**Script:**
> "Dan ini adalah **inti dari penelitian kami** — halaman Benchmark.
>
> **Chart pertama**: Perbandingan waktu eksekusi. Terlihat bahwa untuk operasi individual seperti Search, Insert, Update — **kedua struktur kompetitif**. Tapi untuk operasi **Delete**, Adjacency Matrix **11 kali lebih cepat** daripada List, karena List harus mencari lalu menghapus dalam vector.
>
> **Chart kedua**: Perbandingan **penggunaan memory**. Ini yang paling mengejutkan — di V=500, Adjacency Matrix membutuhkan **1,953 KB**, sedangkan Adjacency List hanya **111 KB**. **List hemat 94,3% memory!**
>
> Kenapa? Karena Matrix harus alokasikan 250.000 cell (V×V), tapi hanya 2.500 yang terisi (1%). Sisanya 247.500 cell = **memory waste** murni.
>
> Sementara List hanya menyimpan edge yang benar-benar ada — O(V+E), bukan O(V²).
>
> **Chart ketiga** (kalau ada): Scaling analysis — menunjukkan bagaimana gap memory ini melebar eksponensial saat V bertambah. Di V=10.000 nanti, selisihnya bisa 400x lipat!"

**🖱️ Tunjuk layar:**
- Tunjuk bar chart waktu (highlight Delete: 11.5x)
- Tunjuk memory chart (highlight 94.3% savings)
- Tunjuk scaling line chart

---

### ⏱️ 02:40 – 02:50 | PENUTUP

**Aksi:**
```
1. Kembali ke tab Dashboard (opsional)
2. Atau tetap di tab Benchmark
```

**Script:**
> "Jadi **kesimpulannya**: untuk kasus LogisRoute kita dengan karakteristik sparse graph dan kebutuhan analisis traversal, **Adjacency List adalah pilihan optimal** — hemat memory drastis tanpa kehilangan performa signifikan.
>
> Demikian demo dari Kelompok 1. Terima kasih!"

**👉 Senyum, angkat tangan (siap Q&A)**

---

## 🎤 CHEAT SHEET — PERTANYAAN YANG MUNGGIN DITANYAKAN

| Q | Jawaban Singkat |
|---|----------------|
| **Kenapa tidak pakai Dijkstra?** | Fokus proyek adalah perbandingan **struktur data penyimpanan**, bukan algoritma pencarian rute. Dijkstra bisa ditambahkan sebagai pengembangan. |
| **Kenapa density cuma 1%?** | Karakteristik data logistik nyata — tidak semua lokasi terhubung langsung. 500 lokasi tapi rute terbatas. Ini membuat graf **sparse**. |
| **Kenapa Matrix delete lebih cepat?** | Matrix: `matrix[i][j] = 0` → O(1) langsung. List: cari edge di vector → O(E/V) lalu erase → jauh lebih lambat. |
| **Kapan sebaiknya pakai Matrix?** | Kalau graph **dense** (>30% density), banyak random lookup, dan memory bukan masalah. Contoh: social network kecil, fully-connected mesh. |
| **Data dari mana?** | Dari file CSV asli (20 lokasi, 40 rute) + data sintetik yang digenerate oleh program C++ kami untuk scaling test (hingga 500 node, 2500 rute). |
| **Bahasa apa yang dipakai?** | Backend: **C++17** (STL, chrono benchmark). Frontend: **React SPA** (Vite). Export via JSON. |

---

## ⚡ CHECKLIST SEBELUM DEMO

- [ ] Server running: `http://localhost:5173` ✅
- [ ] Browser zoom: **90-100%** (tidak terlalu zoom in/out)
- [ ] Tab browser sudah fullscreen / tidak ada tab mengganggu
- [ ] Notifikasi dimatikan (silent mode)
- [ ] Mouse/touchpad berfungsi (untuk drag & zoom di graf)
- [ ] Coba sekali jalankan alur dari awal sampai akhir (rehearsal 1x)
- [ ] Siapkan jawaban untuk Q&A (lihat cheat sheet atas)

---

## 📝 CATATAN PENTING

1. **Jangan terlalu lama di satu tab** — waktu total hanya 3 menit!
2. **Tab Benchmark adalah bintangnya** — paling banyak waktu di sini (35 detik)
3. **Visualisasi Graf adalah wow-factor** — pastikan zoom/drag/hover berfungsi
4. **Kalau ada error/loading**, tetap tenang — lanjut ke tab berikutnya, jelaskan nanti di Q&A
5. **Bicara pelan dan jelas** — jangan buru-buru, 3 menit cukup jika tempo stabil

---

*Dibuat untuk Kelompok 1 Paralel 5 — Struktur Data Genap 2025/2026*
*IPB University — SSMDI*
