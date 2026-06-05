# ========================================================================
#  PROMPT 1: COMPILE, TEST & EKSEKUSI MAIN.CPP
#  Proyek Akhir Struktur Data - Kelompok 1 Paralel 5 - Topik 3
# ========================================================================
#
#  CARA PAKAI:
#  1. Copy seluruh isi file ini
#  2. Paste ke terminal/chat AI yang baru (Terminal UTAMA)
#  3. AI akan: compile → test → generate data besar → benchmark → scaling
#
#  SETELAH PROMPT INI SELESAI:
#  - AI harus MEMPERBARUI file PROMPT_A_LAPORAN.md dan PROMPT_B_PPT.md
#    dengan DATA HASIL AKTUAL dari program (bukan data teoritis)
#  - Baru kemudian user bisa menjalankan Prompt A dan Prompt B di 2 terminal terpisah
#
# ========================================================================


## LANGKAH 1: CEK FILE YANG ADA

Pastikan semua file ini ada di `C:/Documents/Desktop/Project/proyek_strukdat/`:
```bash
cd C:/Documents/Desktop/Project/proyek_strukdat
ls -la main.cpp lokasi.csv rute.csv
```

Jika ada file lain dari sesi sebelumnya (`benchmark_results.json`, `scaling_benchmark_results.json`, `lokasi_large.csv`, `rute_large.csv`) — **hapus dulu** karena akan di-generate ulang dari program asli:
```bash
rm -f benchmark_results.json scaling_benchmark_results.json lokasi_large.csv rute_large.csv
```


## LANGKAH 2: COMPILE main.cpp

Compile dengan optimasi O2 (production):
```bash
cd C:/Documents/Desktop/Project/proyek_strukdat
g++ -std=c++17 -O2 -Wall -o main.exe main.cpp 2>&1
echo "EXIT_CODE=$?"
ls -la main.exe
```

Jika gagal dengan `-O2`, coba tanpa optimasi:
```bash
g++ -std=c++17 -O0 -g -o main.exe main.cpp 2>&1
echo "EXIT_CODE=$?"
```

Jika masih gagal, coba debug mode minimal:
```bash
g++ -std=c++17 -o main.exe main.cpp 2>&1
echo "EXIT_CODE=$?"
```

**Jika SEMUA cara compile gagal**, laporan error lengkap dan cek:
- Apakah g++ terinstall? (`g++ --version`)
- Apakah file main.cpp ada dan tidak corrupt? (`wc -l main.cpp`)


## LANGKAH 3: TEST JALANKAN PROGRAM (Data Asli)

Jalankan program dengan input sederhana untuk verifikasi dasar:
```bash
cd C:/Documents/Desktop/Project/proyek_strukdat
echo "1\n0\n" | ./main.exe
```

Ini seharusnya:
- Menampilkan menu utama
- Memilih opsi 1 (Tampilkan Statistik)
- Menunjukkan 20 lokasi, 40 rute dimuat
- Kembali ke menu
- Exit dengan opsi 0

**Capture outputnya** — pastikan program berjalan normal.


## LANGKAH 4: GENERATE DATA BESAR & JALANKAN BENCHMARK

Ini langkah KRITIS. Jalankan program dengan input otomatis:

```bash
cd C:/Documents/Desktop/Project/proyek_strukdat
printf "15\n500\n2500\ny\n16\n10000\n0\n" | ./main.exe
```

Penjelasan input:
- `15` → pilih menu "Generate Large Data"
- `500` → jumlah node (V)
- `2500` → jumlah edge (E)
- `y` → konfirmasi generate
- `16` → pilih menu "Scaling Benchmark"
- `10000` → jumlah iterasi per operasi
- `0` → exit program

**Output yang DIHARAPKAN:**
1. Pesan "Generating synthetic logistics network..."
2. "Generated V=xxx nodes, E=xxx edges"
3. Tabel benchmark dengan nilai **BUKAN nol** (harus ada angka microsecond > 0)
4. Tabel scaling benchmark dengan 5 baris data (V=20,50,100,200,500)
5. File output ter-generate:
   - `benchmark_results.json`
   - `scaling_benchmark_results.json`


## LANGKAH 5: VERIFIKASI HASIL BENCHMARK

Baca dan tampilkan isi file hasil:

```bash
cat C:/Documents/Desktop/Project/proyek_strukdat/benchmark_results.json
```

**CEK KRITIS:** Pastikan field `microseconds` di `benchmarkResults` **TIDAK semuanya 0 atau 0.001**.
Nilai yang realistis untuk V=500:
- Search/Insert/Update/Delete: 0.001 – 10 μs (tergantung implementasi)
- Traverse All Matrix: **harus > 10 μs** (idealnya 50-500 μs)
- Traverse All List: **harus jauh lebih kecil** dari Matrix (idealnya 1-20 μs)

Jika nilai Traverse All Matrix < 1 μs, berarti data masih terlalu kecil atau timing kurang presisi.

```bash
cat C:/Documents/Desktop/Project/proyek_strukdat/scaling_benchmark_results.json
```

Pastikan ada 5 entry di `scalingResults` dengan vertices: 20, 50, 100, 200, 500.


## LANGKAH 6: AMBIL DATA AKTUAL UNTUK PROMPT A & B

Setelah benchmark berhasil, **BACA DAN SIMPAN** data berikut karena akan dipakai untuk update Prompt A & B:

1. **Baca `benchmark_results.json`** — ambil semua nilai microseconds aktual untuk 12 pengukuran (6 operasi × 2 struktur)
2. **Baca `scaling_benchmark_results.json`** — ambil semua nilai scaling (5 ukuran data)
3. **Catat metadata**: timestamp, jumlah node/edge aktual, iterasi yang digunakan
4. **Cek apakah ada file CSV besar** (`lokasi_large.csv`, `rute_large.csv`) — jika ya, catat jumlah barisnya


## LANGKAH 7: UPDATE PROMPT A DAN PROMPT B (WAJIB!)

Setelah mendapatkan data aktual dari Langkah 6, **PERBARUI kedua file prompt** berikut dengan nilai-nilai REAL (bukan estimasi teoritis):

### File yang harus di-update:
1. `C:/Documents/Desktop/Project/proyek_strukdat/PROMPT_A_LAPORAN.md`
2. `C:/Documents/Desktop/Project/proyek_strukdat/PROMPT_B_PPT.md`

### Yang harus di-update di kedua file:

**A. Semua tabel benchmark** — ganti angka teoritis dengan angka AKTUAL dari JSON:
- Tabel "Benchmark Utama" (V=500): ganti semua nilai microseconds
- Tabel "Scaling Benchmark": ganti semua 5 baris data
- Tabel "Memory": ganti dengan nilai aktual
- Ratio/speedup: hitung ulang dari data aktual

**B. Analisis narasi** — sesuaikan dengan data aktual:
- Jika Matrix Traverse = 125μs dan List = 1.5μs → tulis "83x lebih cepat"
- Jika nilainya berbeda (misal Matrix=45μs, List=0.8μs) → tulis "56x lebih cepat"
- **Jangan pakai angka teoritis! Pakai angka yang KELUAR dari program!**

**C. Metadata**:
- Timestamp aktual dari benchmark
- Iterasi aktual yang digunakan
- Versi compiler / environment jika tercatat

### Format update:
Edit bagian-bagian berikut di masing-masing file:
- Di PROMPT_A_LAPORAN.md: bagian "DATA EKSPERIMEN YANG DIHASILKAN:" dan semua sub-tabel di dalamnya
- Di PROMPT_B_PPT.md: bagian "DATA HASIL EKSPERIMEN (UNTUK DIISI KE SLIDE):" dan semua slide yang berisi angka

**PENTING:** Setelah mengupdate, tulis pesan di akhir kedua file:
```
---
📌 NOTE: File ini sudah di-update oleh Prompt 1 dengan data benchmark AKTUAL.
Timestamp update: [timestamp]
Sumber data: benchmark_results.json & scaling_benchmark_results.json
---


## LANGKAH 8: LAPORAN SELESAI

Tampilkan ringkasan final ke user:

```
========================================================================
✅ PROMPT 1 SELESAI — BERIKUT STATUS:
========================================================================

[ ] main.cpp berhasil di-compile → main.exe
[ ] Program berjalan normal (data asli 20 node, 40 edge)
[ ] Data besar berhasil di-generate (V=?, E=?)
[ ] Benchmark berhasil dijalankan (nilai ≠ 0)
[ ] Scaling benchmark berhasil (5 ukuran data)
[ ] File output terverifikasi:
    - benchmark_results.json (? KB)
    - scaling_benchmark_results.json (? KB)
    - lokasi_large.csv (? baris)
    - rute_large.csv (? baris)
[ ] PROMPT_A_LAPORAN.md sudah di-update dengan data aktual ✏️
[ ] PROMPT_B_PPT.md sudah di-update dengan data aktual ✏️

========================================================================
📋 SELANJUTNYA (bisa di-run PARALEL di 2 terminal):
  Terminal A: Baca & jalankan PROMPT_A_LAPORAN.md → buat Laporan Akhir
  Terminal B: Baca & jalankan PROMPT_B_PPT.md → buat PPT Presentasi
========================================================================
```

Jika ada langkah yang GAGAL, jelaskan apa masalahnya dan solusinya. Jangan lanjutkan ke update Prompt A/B jika benchmark belum menghasilkan data yang valid.


## TROUBLESHOOTING UMUM:

### Masalah 1: g++ tidak bisa compile
- Cek: `g++ --version` — kalau tidak ada, install MinGW-w64
- Cek: apakah path ada spasi? (gunakan quote: `"C:/path/file.cpp"`)
- Cek: apakah file corrupt? (`head -5 main.cpp` harus menunjukkan kode C++)
- Solusi alternatif: coba `clang++` jika tersedia

### Masalah 2: Program crash saat generate data besar
- Kemungkinan: stack overflow (array terlalu besar untuk stack)
- Solusi: tambahkan flag `-Wl,--stack,16777216` (16MB stack) saat compile
- Atau: kurangi jumlah node (coba 300 dulu, bukan 500)

### Masalah 3: Benchmark semua nilai = 0 atau sangat kecil (< 0.001 μs)
- Kemungkinan: clock resolution tidak cukup, atau data terlalu kecil
- Solusi: tingkatkan iterasi (coba 100000), atau naikkan V ke 1000+
- Solusi: pastikan menggunakan nanosecond precision, bukan microsecond

### Masalah 4: Menu 15/16 tidak ada (program versi lama)
- Berarti main.cpp belum di-update dengan fitur generateLargeData
- Solusi: baca main.cpp, cek apakah ada method `generateLargeData()` dan menu option 15/16
- Jika tidak ada, perlu ditambahkan dulu ke main.cpp

---

**Sekarang kerjakan semua langkah di atas secara berurutan. Jangan skip langkah manapun.**
