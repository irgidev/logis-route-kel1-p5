# ========================================================================
#  PROMPT A: PENYUSUNAN DRAFT LAPORAN AKHIR
#  Proyek Akhir Struktur Data - Kelompok 1 Paralel 5 - Topik 3
# ========================================================================
#
#  ⚠️  PERINGATAN — BACA INI DULU:
#  ================================
#  File ini HARUS dijalankan SETELAH Prompt 1 (PROMPT_1_MAIN.md) selesai.
#  Prompt 1 akan mengupdate bagian "DATA EKSPERIMEN" di bawah dengan nilai
#  AKTUAL dari hasil compile & benchmark main.cpp.
#
#  Jika file ini belum di-update oleh Prompt 1 (tidak ada timestamp di bawah),
#  maka jalankan Prompt 1 dulu! Data di sini mungkin masih teoritis.
#
#  Status Update: [LIHAT TIMESTAMP DI BAWAH]
#
# ------------------------------------------------------------------------
#  CARA PAKAI:
#  1. Pastikan Prompt 1 sudah selesai dan file ini sudah di-update
#  2. Copy seluruh isi file ini
#  3. Paste ke terminal/chat AI yang baru (Terminal A)
#  4. AI akan membuat draft laporan lengkap dalam format Markdown
#
#  OUTPUT YANG DIHARAPKAN:
#  - File: Laporan_Akhir_LogisRoute.md (draft lengkap)
#  - Nanti bisa dikonversi ke PDF via Word / Google Docs / Pandoc
#
#  DATA REFERENSI (baca sebagai sumber kebenaran):
#  - C:/Documents/Desktop/Project/proyek_strukdat/main.cpp          (kode sumber)
#  - C:/Documents/Desktop/Project/proyek_strukdat/benchmark_results.json  (HASIL AKTUAL ✏️)
#  - C:/Documents/Desktop/Project/proyek_strukdat/scaling_benchmark_results.json (HASIL AKTUAL ✏️)
#  - C:/Documents/Desktop/Project/proyek_strukdat/lokasi_large.csv
#  - C:/Documents/Desktop/Project/proyek_strukdat/rute_large.csv
#  - C:/Documents/Desktop/Project/proyek_strukdat/Proyek Akhir Struktur Data Genap 2526.pdf
#
# ========================================================================
#
# 📌 TIMESTAMP UPDATE OLEH PROMPT 1:
#    2026-06-05T06:56:37 (WIB)
#    Sumber: benchmark_results.json & scaling_benchmark_results.json
#
# ========================================================================


## INSTRUKSI UNTUK AI:

Kamu adalah asisten penulisan laporan akademik mahasiswa. Buatkan **DRAFT LAPORAN AKHIR LENGKAP** dalam format Markdown (.md) untuk proyek berikut.

### CONTEX PROYEK:
- **Mata Kuliah**: Struktur Data Semester Genap 2025/2026
- **Topik**: Topik 3 — Sistem Navigasi & Rekomendasi Rute Distribusi
- **Kelompok**: Kelompok 1, Paralel 5
- **Anggota**:
  1. Irgi Setiawan (M0405241018)
  2. Danish Hafid Wibisono (M0405241055)
  3. Alifia Rahmah (M0405241064)
  4. Dzaki Aditya Nurtyahyadi (M0405241079)
  5. Widya Aulianti (M0405241083)
- **Institusi**: IPB University - Sekolah Sarjana Manajemen dan Digital Indonesia (SSMDI)
- **Nama Program**: LogisRoute — Sistem Manajemen & Pencarian Rute Distribusi Logistik

### MASALAH:
Di perusahaan logistik, data rute distribusi (gudang → cabang) terus bertambah.
Pencarian, update, dan penghapusan rute menjadi lambat.
Diperlukan pemilihan struktur data graf yang tepat: **Adjacency Matrix vs Adjacency List**.

### SOLUSI YANG DIBANGUN:
Aplikasi C++ bernama **LogisRoute** yang mengimplementasikan DUAL representasi graf:
1. **Adjacency Matrix** (`vector<vector<double>>`) — array 2D V×V
2. **Adjacency List** (`unordered_map<int, vector<Edge>>`) — hash map of vectors

Fitur: CRUD lokasi/rute, file I/O CSV, benchmark engine, export JSON untuk dashboard web React.

### DATA EKSPERIMEN YANG DIHASILKAN:
<!-- 
  ⚠️  SECTION INI AKAN DI-OVERWRITE OLEH PROMPT 1!
  Nilai di bawah adalah ESTIMASI TEORITIS.
  Setelah Prompt 1 jalan, nilai akan diganti dengan HASIL AKTUAL program.
-->
**[✅ PROMPT 1 UPDATE STATUS: SUDAH DI-UPDATE DENGAN DATA AKTUAL — 2026-06-05T06:56:37]**

**Benchmark Utama (V=500 nodes, E=2500 edges, Iterasi=1000):**

| Operasi | Adjacency Matrix (μs) | Adjacency List (μs) | Memory Matrix | Memory List |
|---------|----------------------|-------------------|---------------|-------------|
| Search (exist) | 0.0200 | 0.0200 | 2,000,000 B (1,953 KB) | 114,144 B (111 KB) |
| Search (none) | 0.0000 | 0.0000 | 2,000,000 B | 114,144 B |
| Insert (exist node) | 0.0200 | 0.0200 | 2,000,000 B | 114,144 B |
| Update | 0.0200 | 0.0400 | 2,000,000 B | 114,144 B |
| Delete | 0.0200 | 0.2300 | 2,000,000 B | 114,144 B |
| Traverse All | 0.0000 | 0.0000 | 2,000,000 B | 114,144 B |

**Scaling Benchmark (Iterasi=10,000 per operasi):**

| V (Nodes) | E (Edges) | Search Matrix (μs) | Search List (μs) | Update Matrix (μs) | Update List (μs) | Traverse Matrix (μs) | Traverse List (μs) | Matrix Mem | List Mem |
|-----------|-----------|-------------------|-----------------|--------------------|--------------------|------------------------|-----------------------|-------------|----------|
| 20 | 100 | 0.0190 | 0.1327 | 0.0201 | 0.1555 | 0.0014 | 0.0014 | 3.2 KB | 4.6 KB |
| 50 | 250 | 0.0404 | 0.0210 | 0.0184 | 0.0553 | 0.0011 | 0.0013 | 19.5 KB | 11.2 KB |
| 100 | 500 | 0.0205 | 0.0203 | 0.0201 | 0.0437 | 0.0012 | 0.0012 | 78.1 KB | 22.2 KB |
| 200 | 1,000 | 0.0227 | 0.0453 | 0.0173 | 0.0506 | 0.0014 | 0.0014 | 312.5 KB | 44.7 KB |
| 500 | 2,500 | 0.0220 | 0.0228 | 0.0213 | 0.0448 | 0.0014 | 0.0014 | 1,953 KB | 111.5 KB |

**Statistik Graf (V=500, E=2500):**
- Kepadatan (Density): **1.00%** (sparse graph)
- Efisiensi ruang Matrix: **1.00%** (247,500 dari 250,000 cells kosong/zero)
- Space savings Adjacency List: **94.3%** (Matrix 1,953 KB vs List 111 KB)
- Degree rata-rata: ~5 edge per node (E/V = 5)
- Iterasi Benchmark Utama: 1000x per operasi
- Iterasi Scaling Benchmark: 10,000x per operasi
- Compiler: GCC 15.1.0 (MinGW-w64 UCRT64), C++17, -O2 optimization

### FORMAT LAPORAN WAJIB (dari panduan tugas PDF halaman 16-17):

**Ketentuan Umum:**
- Panjang: **15-25 halaman** (di luar cover & lampiran)
- Format: PDF, spasi 1.5, font 11-12
- Wajib ada analisis perbandingan struktur data berbasis eksperimen
- Bahasa: **Bahasa Indonesia** (formal/ilmiah)

**Struktur 12 Bagian (WAJIB SEMUA):**

#### 1. HALAMAN JUDUL
- Judul lengkap proyek
- Nama 5 anggota + NIM
- Kelas/Paralel
- Mata kuliah
- Institusi
- Tahun ajaran

#### 2. ABSTRAK (~150 kata)
- Ringkasan masalah, metode, struktur data yang dibandingkan, hasil kunci
- Harus menyebutkan angka penting (misal: "List 83x lebih cepat di traversal", "hemat 95.8% memory")

#### 3. PENDAHULUAN
- **Latar belakang & urgensi masalah**: Konteks industri logistik, kenapa ini penting
- **Rumusan masalah** (minimal 4 poin):
  1. Bagaimana karakteristik performa Adjacency Matrix vs Adjacency List pada operasi CRUD data rute?
  2. Bagaimana pengaruh pertumbuhan jumlah data terhadap performa kedua struktur?
  3. Struktur mana yang lebih efisien dari sisi waktu eksekusi?
  4. Struktur mana yang lebih efisien dari sisi penggunaan memori?
- **Tujuan proyek** (minimal 3 poin)
- **Batasan proyek**: TIDAK implementasi algoritma pencarian rute terpendek (Dijkstra/BFS/DFS), fokus pada perbandingan struktur data penyimpanan

#### 4. LANDASAN TEORI & STUDI TERKAIT
- Konsep Graf (definisi, terminologi: Vertex/Node, Edge, Directed Graph, Sparse vs Dense Graph)
- **Adjacency Matrix**: 
  - Definisi & representasi visual (matriks 2D)
  - Kompleksitas waktu: Search O(1), Insert O(1), Update O(1), Delete O(1), Traverse O(V²)
  - Kompleksitas ruang: O(V²)
  - Kelebihan: akses langsung O(1), sederhana
  - Kekurangan: boros memory untuk sparse graph, traversal lambat O(V²)
- **Adjacency List**:
  - Definisi & representasi visual (array of linked lists / hash map of vectors)
  - Kompleksitas waktu: Search O(E/V) avg, Insert O(1) amortized, Update O(E/V), Delete O(E/V), Traverse O(V+E)
  - Kompleksitas ruang: O(V+E)
  - Kelebihan: irit memory untuk sparse graph, traversal cepat O(V+E)
  - Kekurangan: sedikit overhead di pencarian individual
- **Tabel perbandingan teoritis side-by-side** (Big-O time & space)
- Studi/kasus sejenis (ringkas, 1-2 paragraf)

#### 5. DESAIN SISTEM & METODOLOGI
- Arsitektur program (class diagram atau modul diagram):
  - Class `ManajemenRute` (core class)
  - Struct: Lokasi, Rute, Edge, BenchmarkResult
  - Modul: File I/O, CRUD, Benchmark, Export JSON
- Alur proses utama (flowchart narasi):
  ```
  CSV Load -> Parse -> Build Dual Structure (Matrix + List) 
  -> Menu Interaktif -> Operasi CRUD -> Benchmark -> Export JSON -> Dashboard Web
  ```
- Penjelasan setiap struktur data yang digunakan (kenapa dipilih)
- **Metodologi eksperimen**:
  - Variabel independen: ukuran data (V = 20, 50, 100, 200, 500)
  - Variabel dependen: waktu eksekusi (microseconds), penggunaan memori (bytes)
  - Kontrol: seed random tetap (42), iterasi tetap (1000-10000x)
  - Alat ukur: `<chrono>` nanosecond precision, sizeof() untuk memory
  - Skenario uji: 6 operasi × 2 struktur = 12 pengukuran per ukuran data

#### 6. IMPLEMENTASI
- Detail implementasi **Adjacency Matrix**:
  - `vector<vector<double>> adjMatrix` — resize dinamis saat node ditambah
  - Index mapping: `unordered_map<string, int> lokasiToIndex` + `vector<string> indexToLokasi`
  - Akses edge: `adjMatrix[idxAsal][idxTujuan]`
- Detail implementasi **Adjacency List**:
  - `unordered_map<int, vector<Edge>> adjListMap` — key = index integer
  - Setiap entry berisi vector of Edge {tujuan, jarak_km}
  - Akses edge: iterate vector di adjListMap[asal]
- **Mekanisme file I/O (read/write)**:
  - Load: `ifstream` parse CSV baris per baris
  - Save: `ofstream` tulis CSV dengan header
  - Format: ID,Nama,Tipe (lokasi) dan ID,Asal,Tujuan,Jarak (rute)
- **Modul Benchmark Engine**:
  - Menggunakan `high_resolution_clock` dengan presisi nanosecond
  - Lambda function `runBenchmark()` untuk konsistensi
  - Rolling back otomatis (insert/delete test tidak merusak data)
  - Iterasi 1000-10000x per operasi untuk akurasi statistik
- **Potongan kode penting** (pilih 3-5 snippet paling representatif):
  1. Fungsi `ensureNodeExists()` — resize matrix dinamis
  2. Fungsi `tambahRute()` — insert ke kedua struktur sekaligus
  3. Fungsi `cariRute()` — search di matrix vs list dengan timing
  4. Fungsi `jalankanBenchmark()` — benchmark loop utama
  5. Fungsi `exportBenchmarkJSON()` — export hasil

#### 7. EKSPERIMEN & PENGUJIAN
- **Skenario uji 1: Dataset Kecil (Original)**
  - V=20, E=40 (data asli dari lokasi.csv + rute.csv)
  - Simulasi jaringan distribusi kecil (1 gudang pusat, 2 gudang regional, 17 cabang)
  
- **Skenario uji 2: Dataset Menengah**
  - V=100, E=500; V=200, E=1000
  
- **Skenario uji 3: Dataset Besar**
  - V=500, E=2500 (data sintetik yang digenerate)
  - Simulasi skala enterprise (multi-regional)

- **Environment eksperimen**:
  - OS: Windows
  - Compiler: GCC/MinGW (g++) C++17
  - CPU: [sebut spesifikasi laptop]
  - Metode pengukuran waktu: `std::chrono::high_resolution_clock`, nanosecond precision
  - Metode pengukuran memori: `sizeof()` calculation
  - Replikasi: seed MT19937 = 42 (reproducible)

- **Variabel yang dimanipulasi**:
  - Ukuran graf: V ∈ {20, 50, 100, 200, 500}
  - Jumlah edge: E ≈ V × 5
  - Jenis operasi: Search, Insert, Update, Delete, Traverse All

#### 8. HASIL & ANALISIS (BAGIAN PALING PENTING - MINIMAL 3 HALAMAN!)

Tulis bagian ini dengan sangat detail. Bagi menjadi sub-bagian:

**8.1 Tabel Hasil Benchmark Utama (V=500, E=2500)**
- Tabel lengkap 6 operasi × 2 struktur dengan kolom: Operasi, Struktur, Waktu (μs), Memory (B), Big-O
- Highlight: angka terbesar (Traverse All Matrix = 125 μs vs List = 1.5 μs)

**8.2 Analisis Perbandingan Waktu per Operasi**
- **Search**: Matrix 3x lebih cepat (0.001 vs 0.003 μs) → jelaskan KENAPA (direct indexing vs hash+scan)
- **Insert/Update/Delete**: Pattern serupa, Matrix unggul tipis karena overhead hash map
- **Traverse All**: List 83.3x lebih cepat → jelaskan KENAPA (O(V+E)=2500 vs O(V²)=250000 iterasi)
- **Insight**: Di sparse graph (density 1%), Matrix membuang-buang iterasi 247500 cells kosong!

**8.3 Analisis Scaling (Pertumbuhan Data)**
- Buat narasi dari tabel scaling:
  - V=20: Matrix 0.2μs vs List 0.06μs (Matrix masih kompetitif)
  - V=50: Matrix 1.25μs vs List 0.15μs (gap mulai terasa)
  - V=100: Matrix 5μs vs List 0.3μs (gap 16x)
  - V=200: Matrix 20μs vs List 0.6μs (gap 33x)
  - V=500: Matrix 125μs vs List 1.5μs (gap 83x!)
- Pola: **pertumbuhan Matrix kuadratik (O(V²)), linear untuk List (O(V+E))**
- Ini membuktikan secara EMPIRIS teori Big-O

**8.4 Analisis Penggunaan Memory**
- Tabel per ukuran data
- V=20: hampir sama (graph kecil, overhead list terasa)
- V≥50: List mulang unggul signifikan
- V=500: Matrix butuh 1.95 MB vs List hanya 82 KB
- Visualisasi: "Bayangkan jika V=10,000 → Matrix = 800 MB vs List = ~2 MB"

**8.5 Diskusi Trade-off (KRITIS - jangan cuma tabel!)**
- **Waktu akses individual**: Matrix menang (O(1) tanpa hash collision)
- **Waktu traversal**: List menang telak (skip cells kosong)
- **Memory**: List menang telak (terutama di sparse graph)
- **Implementasi complexity**: Matrix lebih sederhana; List perlu handle hash map
- **Use case recommendation**:
  - Pilih Matrix jika: banyak random lookup, graph dense, memory bukan masalah
  - Pilih List jika: banyak traversal/reporting, graph sparse, memory terbatas
  - **Untuk kasus LogisRoute ini**: rekomendasi HYBRID atau List (karena sparse + perlu reporting)

**8.6 Validasi Hasil**
- Bandingkan hasil empiris dengan teori Big-O → apakah konsisten? (YA, konsisten)
- Cek apakah ada anomali? (tidak, semua sesuai ekspektasi)

#### 9. KESIMPULAN & REKOMENDASI
- Ringkas temuan dalam 4-5 poin kunci (BERBASIS DATA/BUKAN OPINI):
  1. Adjacency Matrix optimal untuk operasi individual (search/update/insert/delete) dengan kompleksitas O(1)
  2. Adjacency List optimal untuk traversal keseluruhan graf dengan kecepatan 83x lebih tinggi di V=500
  3. Adjacency List jauh lebih efisien memory (hemat 95.8%) untuk sparse graph
  4. Pilihan struktur data HARUS disesuaikan dengan karakteristik operasi dominan
  5. Untuk aplikasi LogisRoute dengan 500+ lokasi, Adjacency List lebih direkomendasikan
- Rekomendasi struktur data optimal beserta alasannya
- Saran pengembangan lanjutan (misal: tambah Dijkstra untuk shortest path, GUI interaktif, database persistensi SQL)

#### 10. DISCLOSURE PENGGUNAAN AI
- Sebutkan bagian mana yang menggunakan bantuan AI:
  - Seluruh kode sumber C++ dibuat dengan bantuan AI
  - Script generator data Python dibuat dengan bantuan AI
  - Draft laporan ini disusun dengan bantuan AI
- Jelaskan pemahaman tim:
  - Tim memahami konsep dasar graf, Adjacency Matrix, Adjacency List
  - Tim memahami analisis Big-O dan kompleksitas algoritma
  - Tim menjalankan dan menguji program sendiri
  - Tim menganalisis hasil benchmark dan menarik kesimpulan sendiri
  - AI berperan sebagai coding assistant dan penulis draft, BUKAN pengganti pemahaman

#### 11. DAFTAR PUSTAKA
- Cormen, T.H., et al. (2009). Introduction to Algorithms, 3rd ed. MIT Press. (Chapter 22: Elementary Graph Algorithms)
- Dokumen tugas: "Proyek Akhir Struktur Data Genap 2526.pdf" — panduan resmi mata kuliah
- cppreference.com — dokumentasi STL C++ (unordered_map, vector, chrono)
- Sedgewick, R., & Wayne, K. (2011). Algorithms, 4th ed. Addison-Wesley. (Graph chapters)

#### 12. LAMPIRAN
- Lampiran A: Potongan kode utama (`ManajemenRute` class declaration, method `generateLargeData`, method `jalankanBenchmark`)
- Lampiran B: Contoh output program (text screenshot dari CLI)
- Lampiran C: Data CSV sample (10 baris pertama lokasi.csv dan rute.csv)


### PETUNJUK PENULISAN:
- Gunakan **Bahasa Indonesia formal/ilmiah**
- Setiap tabel harus punya nomor dan judul
- Setiap gambar/diagram harus punya caption
- Gunakan format markdown yang rapi (headers, tables, bold untuk emphasis)
- Panjang target: 15-25 halaman ketika dikonversi ke PDF (spasi 1.5, font 11-12)
- Output: simpan sebagai file `Laporan_Akhir_LogisRoute.md` di folder `C:/Documents/Desktop/Project/proyek_strukdat/`

---

## 📌 PETUNJIK PENTING UNTUK AI YANG MENJALANKAN PROMPT INI:

1. **BACA `benchmark_results.json` DAN `scaling_benchmark_results.json` TERLEBIH DAHULU**
   → Gunakan nilai AKTUAL dari JSON tersebut, bukan nilai placeholder di atas!
   → Jika ada perbedaan antara nilai di prompt ini vs nilai di JSON → PAKAI NILAI JSON!

2. **Jika JSON tidak ada atau kosong** → berarti Prompt 1 belum dijalankan.
   → Beritahu user untuk jalankan Prompt 1 dulu.

3. **Tulis semua angka benchmark dengan presisi yang sesuai** (sesuai data aktual)

4. **Simpan output**: `C:/Documents/Desktop/Project/proyek_strukdat/Laporan_Akhir_LogisRoute.md`

---

**Sekarang kerjakan:**
1. Baca `benchmark_results.json` dan `scaling_benchmark_results.json` untuk mendapatkan data AKTUAL
2. Jika file JSON ada dan valid → gunakan data tersebut (abaikan placeholder di atas)
3. Tulis draft laporan lengkap dan simpan ke `C:/Documents/Desktop/Project/proyek_strukdat/Laporan_Akhir_LogisRoute.md`

---
📌 NOTE: File ini sudah di-update oleh Prompt 1 dengan data benchmark AKTUAL.
Timestamp update: 2026-06-05T06:56:37
Sumber data: benchmark_results.json & scaling_benchmark_results.json
Environment: GCC 15.1.0 (MinGW-w64 UCRT64), C++17, -O2, Windows
Data generated: V=500 nodes, E=2500 edges, Density=1.00%
