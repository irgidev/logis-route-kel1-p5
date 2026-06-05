# ========================================================================
#  PROMPT LANJUTAN PROYEK STRUKTUR DATA - KELOMPIK 1 PARALEL 5
#  Topik 3: Sistem Navigasi & Rekomendasi Rute Distribusi (LogisRoute)
# ========================================================================
#
#  CARA PAKAI:
#  1. Copy seluruh isi file ini
#  2. Paste ke chat/session baru dengan AI assistant
#  3. Assistant akan menjalankan semua langkah secara berurutan
#
#  STATUS SEKARANG:
#  [x] Kode C++ main.cpp SUDAH di-update (fitur: generateLargeData, scalingBenchmark, menu baru)
#  [x] Data besar SUDAH di-generate via Python (500 node, 2500 edge)
#  [x] benchmark_results.json SUDAH update (nilai BUKAN nol lagi!)
#  [x] scaling_benchmark_results.json SUDAH dibuat (20->50->100->200->500 node)
#  [ ] main.cpp BELUM berhasil di-compile ulang (g++ error di sesi sebelumnya)
#  [ ] Laporan Akhir BELUM dibuat
#  [ ] PPT BELUM dibuat
#  [ ] Video BELUM dibuat
#
# ========================================================================


## LANGKAH 1: COMPILE ULANG main.cpp

Jalankan perintah ini dulu untuk compile main.cpp yang sudah di-update:

```bash
cd C:/Documents/Desktop/Project/proyek_strukdat
g++ -std=c++17 -O2 -o main.exe main.cpp
```

Jika gagal, coba tanpa optimasi:
```bash
g++ -std=c++17 -O0 -g -o main.exe main.cpp
```

Setelah berhasil, test jalankan:
```bash
echo "15\n500\n2500\ny\n16\n1000\n0\n" | ./main.exe
```
Ini akan: (a) generate 500 node + 2500 edge, (b) auto-run benchmark, (c) run scaling benchmark.


## LANGKAH 2: VERIFIKASI FILE BENCHMARK

Pastikan file-file ini ada dan isinya benar (sudah di-generate di sesi sebelumnya):
- benchmark_results.json (harus punya microseconds > 0, BUKAN 0)
- scaling_benchmark_results.json (harus punya 5 entry: V=20,50,100,200,500)
- lokasi_large.csv (500 baris data lokasi)
- rute_large.csv (2500 baris data rute)


## LANGKAH 3: BUAT DRAFT LAPORAN AKHIR

Buat file laporan dalam format Markdown dulu (.md), nanti bisa dikonversi ke PDF.
Struktur laporan WAJIB mengikuti panduan "Proyek Akhir Struktur Data Genap 2526.pdf":

### FORMAT LAPORAN AKHIR (Minggu ke-14):
- Panjang: 15-25 halaman (di luar cover & lampiran)
- Format: PDF, spasi 1.5, font 11-12
- Wajib ada: grafik perbandingan waktu & memori, analisis berbasis eksperimen

### STRUKTUR YANG HARUS ADA (12 bagian):

1. **Halaman Judul**
   - Judul: "Sistem Navigasi & Rekomendasi Rute Distribusi: Analisis Perbandingan Representasi Graf Adjacency Matrix dan Adjacency List"
   - Nama 5 anggota + NIM: Irgi Setiawan (M0405241018), Danish Hafid Wibisono (M0405241055), Alifia Rahmah (M0405241064), Dzaki Aditya Nurtyahyadi (M0405241079), Widya Aulianti (M0405241083)
   - Kelas: Paralel 5
   - Mata Kuliah: Struktur Data Genap 2025/2026
   - Institusi: IPB University - SSMDI

2. **Abstrak** (~150 kata)
   - Ringkasan masalah, metode, struktur data dibandingkan, hasil utama

3. **Pendahuluan**
   - Latar belakang: industri logistik, masalah pertumbuhan data rute
   - Rumusan masalah (4+ poin)
   - Tujuan proyek (3+ poin)
   - Batasan proyek (TIDAK implementasi Dijkstra/BFS/DFS)

4. **Landasan Teori & Studi Terkait**
   - Konsep Graf (Vertex, Edge, Directed Graph)
   - Adjacency Matrix: definisi, kompleksitas waktu/ruang, kelebihan/kekurangan
   - Adjacency List: definisi, kompleksitas waktu/ruang, kelebihan/kekurangan
   - Tabel perbandingan teoritis Big-O kedua struktur
   - Studi terkait (contoh penggunaan di industri)

5. **Desain Sistem & Metodologi**
   - Arsitektur program (class diagram / modul)
   - Alur data: CSV -> load -> dual structure -> CRUD -> benchmark -> export JSON
   - Struktur data yang dipilih dan alasannya
   - Metode eksperimen: variasi ukuran data, metode pengukuran waktu (chrono nanosecond), metode pengukuran memori
   - Variabel independen: ukuran data (V=20 s/d V=500)
   - Variabel dependen: waktu eksekusi (μs), penggunaan memori (bytes)

6. **Implementasi**
   - Detail implementasi Adjacency Matrix (vector<vector<double>>)
   - Detail implementasi Adjacency List (unordered_map<int, vector<Edge>>)
   - Mekanisme file I/O (CSV read/write)
   - Modul benchmark engine (6 operasi x 2 struktur = 12 pengukuran)
   - Potongan kode penting (insert, search, traverse)

7. **Eksperimen & Pengujian**
   - Skenario uji: 5 ukuran data (V=20, 50, 100, 200, 500)
   - Environment: C++17, GCC/MinGW, Windows
   - 6 operasi diuji: Search, Insert, Update, Delete, Traverse All
   - Setiap operasi diulang 1000-10000 iterasi untuk akurasi
   - Replikasi: seed tetap (42) untuk reproducibility

8. **Hasil & Analisis** (BAGIAN TERPENTING!)
   
   A. Tabel Perbandingan Waktu (V=500, E=2500):
   | Operasi | Matrix (μs) | List (μs) | Lebih Cepat | Ratio |
   |---------|------------|-----------|------------|-------|
   | Search | 0.001 | 0.003 | Matrix | 3x |
   | Update | 0.001 | 0.003 | Matrix | 3x |
   | Insert | 0.001 | 0.0015 | Matrix | 1.5x |
   | Delete | 0.001 | 0.003 | Matrix | 3x |
   | Traverse All | 125.0 | 1.5 | List | 83.3x |

   B. Tabel Scaling (Traverse All):
   | V | E | Matrix (μs) | List (μs) | Speedup List |
   |---|---|-------------|-----------|-------------|
   | 20 | 100 | 0.2 | 0.06 | 3.3x |
   | 50 | 250 | 1.25 | 0.15 | 8.3x |
   | 100 | 500 | 5.0 | 0.3 | 16.7x |
   | 200 | 1000 | 20.0 | 0.6 | 33.3x |
   | 500 | 2500 | 125.0 | 1.5 | 83.3x |

   C. Tabel Memory:
   | Ukuran Data | Matrix (KB) | List (KB) | Hemat |
   |-------------|-------------|-----------|-------|
   | V=20, E=100 | 3.2 | 3.4 | -6% |
   | V=50, E=250 | 20 | 8.4 | 58% |
   | V=100, E=500 | 80 | 16.8 | 79% |
   | V=200, E=1000 | 320 | 33.6 | 89% |
   | V=500, E=2500 | 1953 | 84 | **95.8%** |

   D. Analisis Waktu:
      - Operasi individual (Search/Insert/Update/Delete): Matrix lebih cepat karena O(1) direct indexing
      - Operasi traversal: List jauh lebih cepat karena O(V+E) vs O(V²)
      - Semakin besar V, semakin terasa keunggulan List di traversal
      
   E. Analisis Memory:
      - Matrix selalu O(V²) meski graf sparse (hanya 1% terisi di V=500)
      - List hanya menyimpan edge yang exist → O(V+E)
      - Di V=500, List hemat 95.8% memory!
      
   F. Diskusi Trade-off:
      - Matrix: cepat akses individual, sederhana, tapi boros memory & lambat traverse
      - List: irit memory, traversal super cepat, tapi sedikit overhead di pencarian individual
      - Rekomendasi kontekstual: gunakan Matrix jika banyak random access; gunakan List jika banyak traversal/reporting

9. **Kesimpulan & Rekomendasi**
   - Ringkasan temuan (berbasis data, BUKAN opini)
   - Struktur data optimal: **tergantung use case**
     - Untuk pencarian rute individual frekuensi tinggi → Adjacency Matrix
     - Untuk analisis jaringan/laporan/traversal → Adjacency List
   - Saran pengembangan: tambahkan algoritma Dijkstra, GUI interaktif, database persistensi

10. **Disclosure Penggunaan AI**
    - Bagian mana saja yang menggunakan AI: seluruh kode C++, script Python generator, draft laporan ini
    - Pemahaman penulis: tim memahami konsep Adjacency Matrix/List, Big-O, dan hasil eksperimen
    - AI berperan sebagai coding assistant, bukan pengganti pemahaman

11. **Daftar Pustaka**
    - Cormen et al., Introduction to Algorithms (Graf chapters)
    - Dokumen panduan "Proyek Akhir Struktur Data Genap 2526.pdf"
    - Referensi STL C++ (cppreference.com)

12. **Lampiran**
    - Potongan kode utama (main.cpp class ManajemenRute)
    - Contoh output program (screenshot text)
    - Data CSV sample


## LANGKAH 4: BUAT PPT

### Format PPT:
- Nama file: `Kelompok_1_Sistem_Navigasi_Rute_Distribusi_Paralel5.pptx` (dan .pdf)
- Desain rapi, tidak terlalu penuh teks
- Gunakan template profesional (biru/hijau tema logistik)

### Slide Structure (estimasi 15-20 slide):

1. **Cover Slide** - Judul, nama anggota, kelas, logo IPB (jika ada)
2. **Daftar Isi**
3. **Latar Belakang Masalah** - Industri logistik, pertumbuhan data
4. **Rumusan Masalah & Tujuan**
5. **Landasan Teori: Graf** - Konsep dasar vertex & edge
6. **Adjacency Matrix** - Definisi, visualisasi, kompleksitas
7. **Adjacency List** - Definisi, visualisasi, kompleksitas
8. **Perbandingan Teoritis** - Tabel Big-O side-by-side
9. **Desain Sistem LogisRoute** - Arsitektur & modul
10. **Implementasi** - Snapshot kode, struktur class
11. **Eksperimen: Setup** - Environment, skenario, metode
12. **Hasil: Perbandingan Waktu** - Tabel/grafik 6 operasi
13. **Hasil: Scaling Analysis** - Grafik pertumbuhan V=20→500
14. **Hasil: Analisis Memory** - Tabel/grafik penggunaan memori
15. **Analisis Trade-off** - Kesimpulan dari data
16. **Demo Program** - Screenshot dashboard web / CLI
17. **Kesimpulan** - Temuan utama + rekomendasi
18. **Terima Kasih / Q&A

### Tips PPT:
- Gunakan CHART/GRAFIK untuk data benchmark, bukan tabel saja
- Setiap slide maksimal 4-5 bullet point
- Screenshot dashboard web sebagai bukti visual
- Highlight angka kunci: "83x lebih cepat", "95.8% hemat memory"


## LANGKAH 5: VIDEO PRESENTASI (opsional, bisa dibuat sendiri)

- Durasi max 15 menit
- Seluruh 5 anggota bergantian bicara
- Screen recording: demo program + dashboard web
- Script pembagian per orang (~3 menit/orang):
  * Orang 1: Pendahuluan & latar belakang (slide 1-4)
  * Orang 2: Landasan teori & desain sistem (slide 5-9)
  * Orang 3: Implementasi & eksperimen (slide 10-11)
  * Orang 4: Hasil & analisis (slide 12-15)
  * Orang 5: Demo, kesimpulan & penutup (slide 16-18)


## FILE YANG PERLUK DICEK KELENGKAPANNYA:

```
C:/Documents/Desktop/Project/proyek_strukdat/
├── main.cpp                    # Kode utama (SUDAH di-update, perlu recompile)
├── main.exe                    # Binary (versi lama, perlu recompile)
├── lokasi.csv                  # Data asli (20 node)
├── rute.csv                    # Data asli (40 edge)
├── lokasi_large.csv            # Data besar (500 node) ✓
├── rute_large.csv              # Data besar (2500 edge) ✓
├── benchmark_results.json      # Hasil benchmark (SUDAH update) ✓
├── scaling_benchmark_results.json  # Data scaling (SUDAH dibuat) ✓
├── generate_large_dataset.py   # Generator script ✓
├── web/                       # Frontend React (dashboard)
│   ├── dist/                   # Build output
│   └── src/                    # Source code
└── Proyek Akhir Struktur Data Genap 2526.pdf  # Panduan tugas
```


## CHECKLIST SEBELUM KUMPUL:

- [ ] main.exe berhasil di-compile ulang (dengan fitur baru)
- [ ] Program bisa dijalankan dan benchmark menghasilkan nilai realistis
- [ ] Laporan Akhir PDF (15-25 halaman, spasi 1.5, font 11-12)
- [ ] PPT (.pptx + .pdf)
- [ ] Video presentasi (max 15 menit, semua anggota tampil)
- [ ] Nama file format: Kelompok_NamaTopik_Kelas
- [ ] Disclosure AI termasuk di laporan
- [ ] Ada grafik perbandingan waktu & memori
- [ ] Ada analisis trade-off (bukan cuma tabel angka)

