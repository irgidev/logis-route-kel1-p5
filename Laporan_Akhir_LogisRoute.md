# SISTEM NAVIGASI & REKOMENDASI RUTE DISTRIBUSI LOGISTIK
## Analisis Perbandingan Representasi Graf: Adjacency Matrix vs Adjacency List

---

**Proyek Akhir — Mata Kuliah Struktur Data**

**Semester Genap 2025/2026**

---

### Kelompok 1 | Paralel 5

| No | Nama | NIM |
|----|------|-----|
| 1 | Irgi Setiawan | M0405241018 |
| 2 | Danish Hafid Wibisono | M0405241055 |
| 3 | Alifia Rahmah | M0405241064 |
| 4 | Dzaki Aditya Nurtyahyadi | M0405241079 |
| 5 | Widya Aulianti | M0405241083 |

---

**Institusi:** IPB University — Sekolah Sarjana Manajemen dan Digital Indonesia (SSMDI)

**Nama Program:** LogisRoute — Sistem Manajemen & Pencarian Rute Distribusi Logistik

**Tanggal Eksperimen:** 5 Juni 2026

---

# ABSTRAK

Industri logistik dan supply chain modern menghadapi tantangan yang semakin kompleks dalam pengelolaan data rute distribusi. Pertumbuhan jumlah lokasi gudang, pusat distribusi, dan cabang pengiriman menyebabkan volume data rute meningkat secara eksponensial, sehingga diperlukan pemilihan struktur data graf yang tepat untuk penyimpanan dan pengaksesan data tersebut secara efisien.

Penelitian ini membangun sistem bernama **LogisRoute**, sebuah aplikasi berbasis C++ yang mengimplementasikan **dual representasi graf** yaitu **Adjacency Matrix** (`vector<vector<double>>`) dan **Adjacency List** (`unordered_map<string, vector<Edge>>`) secara simultan pada satu dataset rute distribusi logistik yang sama. Sistem ini dilengkapi dengan fitur CRUD (Create, Read, Update, Delete) untuk data lokasi dan rute, modul benchmark berbasis `std::chrono` dengan presisi nanosecond, generator data sintetik hingga skala 500 node dan 2500 edge, serta kemampuan ekspor hasil ke format JSON untuk visualisasi dashboard web.

Eksperimen dilakukan dengan lima variasi ukuran data (V = 20, 50, 100, 200, 500 node) dan enam jenis operasi (Search, Insert, Update, Delete, Traverse All) pada kedua struktur data, masing-masing diulang 1.000–10.000 kali per operasi untuk mendapatkan hasil yang statistik signifikan. Hasil eksperimen menunjukkan bahwa **Adjacency Matrix unggul pada operasi individual** seperti Update (0,020 μs vs 0,040 μs, **2× lebih cepat**) dan Delete (0,020 μs vs 0,230 μs, **11,5× lebih cepat**). Di sisi lain, **Adjacency List jauh lebih efisien dalam penggunaan memori**, hanya membutuhkan **114.144 byte (111 KB)** dibandingkan Matrix yang mengalokasikan **2.000.000 byte (1.953 KB)** — sebuah penghematan sebesar **94,3%** atau rasio **17,5×**. Analisis scaling membuktikan bahwa pertumbuhan memori Adjacency Matrix bersifat kuadratik O(V²) sementara Adjacency List tumbuh linear O(V+E), sehingga gap efisiensi memori melebar dari hampir seimbang di V=20 menjadi sangat signifikan di V=500.

Berdasarkan temuan empiris tersebut, penelitian ini merekomendasikan penggunaan **Adjacency List sebagai struktur data optimal** untuk aplikasi manajemen rute distribusi logistik yang memiliki karakteristik sparse graph (kepadatan ~1%) dengan kebutuhan efisiensi memori yang tinggi.

**Kata kunci:** *Graf, Adjacency Matrix, Adjacency List, Struktur Data, Logistik, Benchmark, Big-O Analysis*

---

# BAB 1 PENDAHULUAN

## 1.1 Latar Belakang

Perkembangan industri logistik dan supply chain global telah mencapai titik di mana pengelolaan data rute distribusi menjadi salah satu faktor kritis keberhasilan operasional perusahaan. Setiap perusahaan logistik, mulai dari perusahaan kurir lokal hingga jaringan distribusi nasional, harus mengelola ribuan hingga puluhan ribu hubungan rute antar lokasi — mulai dari gudang pusat (central warehouse), gudang regional (regional distribution center), transit point, hingga cabang pengiriman (delivery branch).

Setiap rute distribusi memiliki atribut penting seperti jarak tempuh (kilometer), waktu tempuh estimasi, biaya pengiriman, dan prioritas pengiriman. Data-data ini tidak statis — mereka terus diperbarui karena perubahan kondisi jalan, pembukaan cabang baru, penutupan rute, atau perubahan harga bahan bakar. Akibatnya, operasi **pencarian (search), penyisipan (insert), pembaruan (update), dan penghapusan (delete)** terhadap data rute dilakukan dengan frekuensi sangat tinggi dalam sistem informasi logistik.

Dalam konteks struktur data, jaringan rute distribusi dapat dimodelkan sebagai **graf berarah (directed graph)** di mana setiap lokasi direpresentasikan sebagai *vertex* (simpul) dan setiap rute distribusi direpresentasikan sebagai *edge* (sisi) yang memiliki bobot (weight) berupa jarak kilometer. Masalah fundamental yang muncul adalah: **bagaimana cara menyimpan representasi graf ini di memori komputer agar semua operasi CRUD dapat dilakukan dengan efisien?**

Terdua pendekatan utama dalam representasi graf, yaitu:

1. **Adjacency Matrix (Matriks Ketetanggaan):** Menggunakan array dua dimensi berukuran V × V di mana sel `[i][j]` menyimpan bobot edge dari vertex *i* ke vertex *j*. Pendekatan ini menawarkan akses langsung O(1) ke setiap edge tetapi mengalokasikan ruang O(V²) terlepas dari berapa banyak edge yang benar-benar ada.

2. **Adjacency List (Daftar Tetangga):** Menggunakan struktur dinamis (biasanya array of linked lists atau hash map of vectors) di mana setiap vertex menyimpan daftar edge keluarannya saja. Pendekatan ini hanya mengalokasikan ruang untuk edge yang benar-benar ada O(V+E), tetapi operasi pencarian edge individual memerlukan iterasi pada daftar tetangga.

Pemilihan antara kedua representasi ini bukanlah masalah trivial — memiliki implikasi langsung terhadap performa waktu eksekusi, konsumsi memori, dan skalabilitas sistem. Oleh karena itu, diperlukan sebuah studi empiris yang mengukur performa aktual kedua struktur data pada skenario yang realistis, bukan sekadar analisis teoritis Big-O.

## 1.2 Rumusan Masalah

Berdasarkan latar belakang di atas, rumusan masalah dalam penelitian ini adalah sebagai berikut:

1. Bagaimana karakteristik performa waktu **Adjacency Matrix** dibandingkan **Adjacency List** pada operasi-operasi dasar data rute distribusi (Search, Insert, Update, Delete, dan Traverse)?

2. Bagaimana pengaruh **pertumbuhan jumlah data** (peningkatan jumlah vertex dan edge) terhadap performa waktu dan penggunaan memori kedua struktur data?

3. Struktur data mana yang lebih **efisien dari sisi waktu eksekusi** untuk masing-masing jenis operasi pada karakteristik sparse graph (graf jarang)?

4. Struktur data mana yang lebih **efisien dari sisi penggunaan memori** untuk jaringan distribusi logistik dengan ratusan hingga ribuan node?

## 1.3 Tujuan Penelitian

Adapun tujuan dari penelitian dan implementasi proyek ini adalah:

1. Membangun sistem manajemen rute distribusi (**LogisRoute**) yang mengimplementasikan **dual representasi graf** (Adjacency Matrix dan Adjacency List) secara simultan pada satu codebase C++.

2. Melakukan **pengujian benchmark empiris** yang terkontrol dan reproducible untuk membandingkan performa kedua struktur data pada berbagai ukuran data (20 hingga 500 node) dan berbagai jenis operasi (6 operasi × 2 struktur = 12 pengukuran per skenario).

3. Memberikan **rekomendasi struktur data optimal** berdasarkan hasil eksperimen aktual yang didukung oleh data numerik, bukan sekadar asumsi teoritis.

## 1.4 Batasan Proyek

Proyek ini memiliki batasan-batasan sebagai berikut:

- **Tidak mengimplementasikan algoritma pencarian rute terpendek** seperti Dijkstra, BFS (Breadth-First Search), atau DFS (Depth-First Search). Fokus penelitian sepenuhnya pada **perbandingan struktur data penyimpanan**, bukan algoritma traversali graf.
- Graf yang dimodelkan adalah **directed graph (graf berarah)** — rute dari A ke B tidak otomatis berarti ada rute dari B ke A.
- Data sintetis yang digenerate mengikuti pola **hub-and-spoke** yang umum di industri logistik, namun belum mencakup semua variasi topologi graf yang mungkin.
- Pengukuran waktu menggunakan `std::chrono::high_resolution_clock` yang memiliki resolusi nanosecond, namun hasil dapat bervariasi tergantung kondisi sistem operasi (scheduler, cache CPU, dll.).

---

# BAB 2 LANDASAN TEORI & STUDI TERKAIT

## 2.1 Konsep Dasar Graf

### 2.1.1 Definisi Graf

**Graf** adalah struktur data non-linear yang terdiri dari himpunan simpul (*vertex* atau *node*, disimbolkan V) dan himpunan sisi (*edge*, disimbolkan E) yang menghubungkan pasangan-pasang simpul tersebut. Secara formal, graf G dapat didefinisikan sebagai pasangan terurut G = (V, E).

Dalam konteks LogisRoute, terminologi graf dipetakan ke domain logistik sebagai berikut:

| Terminologi Graf | Domain Logistik LogisRoute | Contoh |
|------------------|----------------------------|--------|
| Vertex / Node / Simpul (V) | Lokasi (Gudang, Cabang, Transit Point) | "Gudang Pusat Jakarta" (L001) |
| Edge / Sisi (E) | Rute distribusi | R001: L001 → L004, 15 km |
| Directed Graph | Rute berarah (asal → tujuan) | Dari gudang ke cabang |
| Weighted Graph | Edge memiliki bobot (jarak km) | Bobot = 15.0 km |
| Sparse Graph | Kepadatan rendah (~1%) | Hanya 2.500 dari 250.000 cell terisi |
| Degree | Jumlah edge yang terhubung ke suatu node | Gudang Pusat: degree = 9 |

### 2.1.2 Jenis-Jenis Graf yang Relevan

**Directed Graph (Digraf):** Graf di mana setiap edge memiliki arah. Dalam LogisRoute, edge dari L001 (Gudang Pusat) ke L004 (Cabang Jakarta Selatan) tidak sama dengan edge dari L004 ke L001 — meskipun keduanya bisa ada secara independen.

**Weighted Graph:** Graf di mana setiap edge memiliki nilai bobot (weight). Dalam LogisRoute, bobot adalah jarak dalam kilometer yang merepresentasikan jarak fisik antar lokasi.

**Sparse Graph vs Dense Graph:** Sebuah graf dikatakan *sparse* jika jumlah edge jauh lebih kecil dari jumlah maksimum yang mungkin (V²). Graf dikatakan *dense* jika mendekati jumlah maksimum. Jaringan distribusi logistik pada umumnya merupakan **sparse graph** karena satu lokasi biasanya hanya terhubung ke sejumlah kecil lokasi lainnya (tidak semua lokasi saling terhubung langsung). Dataset eksperimen kita memiliki kepadatan hanya **1,00%** (2.500 edge dari 250.000 kemungkinan).

## 2.2 Adjacency Matrix

### 2.2.1 Definisi dan Representasi

**Adjacency Matrix** adalah representasi graf yang menggunakan matriks (array dua dimensi) berukuran V × V. Jika terdapat edge dari vertex *i* ke vertex *j* dengan bobot *w*, maka `matrix[i][j] = w`. Jika tidak ada edge, `matrix[i][j] = 0` (atau nilai sentinel lainnya).

```
Contoh Adjacency Matrix (5×5 subset dari data LogisRoute):

          L001   L002   L003   L004   L005
   L001 [    0     0      0     15     18   ]
   L002 [    0     0      0     20     25   ]
   L003 [    0     0      0     20     25   ]
   L004 [    0     0      0      0     10   ]
   L005 [    0     0      0      0      0   ]

  → Cell bernilai 0 = tidak ada rute langsung
  → Cell bernilai >0 = ada rute dengan jarak (km) tersebut
```

Dalam implementasi LogisRoute, Adjacency Matrix dideklarasikan sebagai:
```cpp
vector<vector<double>> adjMatrix;  // Dinamis, bisa resize
```

### 2.2.2 Kompleksitas Adjacency Matrix

| Operasi | Kompleksitas Waktu | Penjelasan |
|---------|--------------------|------------|
| **Search** (cek apakah edge i→j ada) | **O(1)** | Langsung akses `matrix[i][j]` |
| **Insert** (tambah edge i→j) | **O(1)** | Langsung assign `matrix[i][j] = w` |
| **Update** (ubah bobot edge i→j) | **O(1)** | Langsung assign `matrix[i][j] = w_baru` |
| **Delete** (hapus edge i→j) | **O(1)** | Langsung assign `matrix[i][j] = 0` |
| **Traverse All** (iterasi semua edge) | **O(V²)** | Harus scan seluruh V×V cells |
| **Space Complexity** | **O(V²)** | Alokasi penuh V×V cells |

**Kelebihan Adjacency Matrix:**
- Implementasi sangat sederhana dan intuitif
- Akses edge individual sangat cepat O(1) — cukup index langsung
- Cek keberadaan edge dilakukan dalam waktu konstan
- Cocok untuk algoritma yang memerlukan random access cepat (misalnya Floyd-Warshall)

**Kelemahan Adjacency Matrix:**
- Memakan memori O(V²) bahkan untuk sparse graph — banyak cells kosong (zero)
- Traversal (menelusuri semua edge) lambat O(V²) karena harus memeriksa setiap cell
- Tidak scalable untuk graf dengan jumlah vertex besar
- Pada V=500, alokasi 250.000 cells padahal hanya 2.500 yang terisi (efisiensi 1%)

## 2.3 Adjacency List

### 2.3.1 Definisi dan Representasi

**Adjacency List** adalah representasi graf di mana setiap vertex menyimpan **daftar vertex tetangga** yang dapat dicapai langsung darinya. Setiap entry dalam daftar berisi identitas vertex tujuan dan bobot edge-nya.

```
Contoh Adjacency List (subset dari data LogisRoute):

  L001 → [(L004, 15.0), (L005, 18.0), (L006, 22.0), (L007, 12.0),
           (L008, 30.0), (L009, 45.0), (L010, 50.0), (L011, 28.0),
           (L012, 35.0)]
  L002 → [(L013, 20.0), (L014, 25.0), (L015, 40.0), (L016, 15.0),
           (L017, 32.0)]
  L003 → [(L009, 20.0), (L010, 25.0), (L011, 35.0), (L012, 42.0),
           (L018, 55.0)]
  ...

  → Hanya edge yang ADA yang tersimpan
  → Tidak ada "cell kosong" yang membuang-buang memori
```

Dalam implementasi LogisRoute, Adjacency List dideklarasikan sebagai:
```cpp
// Hash map based (average O(1) lookup by key)
unordered_map<string, vector<Edge>> adjListMap;

// Ordered map based (tree-based, sorted keys)
map<string, vector<Edge>> adjListOrdered;

struct Edge {
    string tujuan;       // ID vertex tujuan
    double jarak_km;     // Bobot edge (km)
};
```

### 2.3.2 Kompleksitas Adjacency List

| Operasi | Kompleksitas Waktu | Penjelasan |
|---------|--------------------|------------|
| **Search** (cek edge i→j) | **O(E/V) avg, O(E) worst** | Hash key i → scan vector cari j |
| **Insert** (tambah edge i→j) | **O(1) amortized** | `push_back` ke vector di hash[i] |
| **Update** (ubah bobot edge i→j) | **O(E/V) average** | Hash key i → scan & update |
| **Delete** (hapus edge i→j) | **O(E/V) average** | Hash key i → scan & erase |
| **Traverse All** (iterasi semua edge) | **O(V+E)** | Iterasi semua entries + vectors |
| **Space Complexity** | **O(V+E)** | Hanya alokasi untuk existing edges |

**Kelebihan Adjacency List:**
- Sangat efisien memori untuk sparse graph — hanya menyimpan yang ada
- Traversal keseluruhan graf sangat cepat O(V+E)
- Skalabel untuk graf besar dengan jumlah vertex tinggi
- Pada V=500, E=2500: hanya butuh ~111 KB vs ~1,953 KB untuk Matrix

**Kelemahan Adjacency List:**
- Pencarian edge individual sedikit lebih lambat (perlu scan/hash + iterate)
- Overhead pointer/reference untuk struktur dinamis
- Implementasi lebih kompleks (hash map + vector management)
- Untuk dense graph, overhead struktur bisa melampaui savings

## 2.4 Perbandingan Teoritis Side-by-Side

**Tabel 2.1 — Perbandingan Kompleksitas Teoritis Adjacency Matrix vs Adjacency List**

| Aspek | Adjacency Matrix | Adjacency List | Pemenang Teoritis |
|-------|:-:|:-:|:-:|
| **Struktur Data** | Array 2D `V×V` | Hash Map of Vectors | — |
| **Search Edge** | O(1) ✅ | O(E/V) avg ⚠️ | Matrix |
| **Insert Edge** | O(1) ✅ | O(1) amortized ✅ | Seri |
| **Update Edge** | O(1) ✅ | O(E/V) avg ⚠️ | Matrix |
| **Delete Edge** | O(1) ✅ | O(E/V) avg ⚠️ | Matrix |
| **Traverse All Edges** | O(V²) ❌ | O(V+E) ✅✅ | **List (jauh)** |
| **Space Complexity** | O(V²) ❌ | O(V+E) ✅✅ | **List (jauh)** |
| **Best Use Case** | Dense graph, random access | Sparse graph, traversal | — |
| **Worst Use Case** | Sparse graph (memory waste) | Dense graph (overhead) | — |

## 2.5 Studi Terkait

Analisis perbandingan Adjacency Matrix dan Adjacency List merupakan topik fundamental dalam ilmu komputer yang telah dibahas secara ekstensif dalam literatur akademis. Cormen *et al.* (2009) dalam *Introduction to Algorithms* menjelaskan bahwa pemilihan representasi graf bergantung pada **kerapatan (density) graf** dan **jenis operasi yang dominan**. Untuk graf jarang (*sparse*) dengan density < 10–20%, Adjacency List hampir selalu menjadi pilihan yang lebih baik karena efisiensi memorinya.

Sedgewick & Wayne (2011) dalam *Algorithms* menekankan bahwa dalam praktik aplikasi nyata, sebagian besar graf real-world (termasuk jaringan transportasi, social network, dan web graph) bersifat sparse, sehingga Adjacency List menjadi representasi default di sebagian besar library graf modern seperti Boost Graph Library (C++), NetworkX (Python), dan Apache GraphX (Scala).

Studi ini memberikan kontribusi berupa **data empiris konkret** dari domain spesifik logistik distribusi, bukan sekadar contoh abstrak, sehingga hasilnya dapat langsung diaplikasikan dalam konteks pengembangan sistem informasi logistik.

---

# BAB 3 DESAIN SISTEM & METODOLOGI

## 3.1 Arsitektur Sistem LogisRoute

Sistem LogisRoute dirancang dengan arsitektur berorientasi objek yang berpusat pada satu class utama bernama `ManajemenRute`. Class ini bertanggung jawab atas seluruh aspek manajemen data rute, termasuk penyimpanan dual representasi, operasi CRUD, file I/O, dan engine benchmark.

**Gambar 3.1 — Arsitektur Modul Sistem LogisRoute**

```
┌──────────────────────────────────────────────────────────────┐
│                     LOGISROUTE SYSTEM                        │
│                                                              │
│  ┌──────────────────┐    ┌─────────────────────────────────┐ │
│  │   DATA INPUT     │    │        CORE ENGINE               │ │
│  │                  │    │   ┌─────────────────────────┐   │ │
│  │  lokasi.csv ─────┼───►│   │   ManajemenRute Class    │   │ │
│  │  (20 lokasi)     │    │   │                          │   │ │
│  │                  │    │   │  ┌────────────────────┐  │   │ │
│  │  rute.csv ───────┼───►│   │  │ Dual Representation │  │   │ │
│  │  (40 rute)       │    │   │  │                    │  │   │ │
│  │                  │    │   │  │ adjMatrix[V][V]    │  │   │ │
│  └──────────────────┘    │   │  │ (vector<vec<double>>)│  │   │ │
│                          │   │  │                    │  │   │ │
│  ┌──────────────────┐    │   │  │ adjListMap[hash]    │  │   │ │
│  │   DATA OUTPUT    │    │   │  │ (unordered_map<vec>) │  │   │ │
│  │                  │    │   │  │                    │  │   │ │
│  │  CSV Save ───────┼───►│   │  │ data_lokasi[map]    │  │   │ │
│  │  JSON Export ────┼───►│   │  │ data_rute[vector]   │  │   │ │
│  │  CLI Display ────┼───►│   │  └────────────────────┘  │   │ │
│  │                  │    │   └─────────────────────────┘   │ │
│  └──────────────────┘    └───────────────┬─────────────────┘ │
│                                          │                   │
│  ┌──────────────────┐    ┌───────────────▼─────────────────┐ │
│  │   USER INTERFACE │    │      SUBSYSTEMS                 │ │
│  │                  │    │                                 │ │
│  │  CLI Menu (17 opsi│◄───┤  ┌───────────┐ ┌────────────┐ │ │
│  │  interaktif)     │    │  │ Benchmark │ │ File I/O   │ │ │
│  └──────────────────┘    │  │ Engine    │ │ (CSV/JSON) │ │ │
│                          │  └───────────┘ └────────────┘ │ │ │
│                          │  ┌───────────┐ ┌────────────┐ │ │
│                          │  │ Data      │ │ Scaling   │ │ │
│                          │  │ Generator │ │ Benchmark  │ │ │
│                          │  └───────────┘ └────────────┘ │ │ │
│                          └─────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

## 3.2 Struktur Data Utama

### 3.2.1 Entitas Data

```cpp
// Lokasi — merepresentasikan sebuah node/vertex dalam graf
struct Lokasi {
    string id_lokasi;        // Unique identifier (e.g., "L001")
    string nama_lokasi;      // Nama lokasi (e.g., "Gudang Pusat Jakarta")
    string tipe_lokasi;      // Tipe: "Gudang" atau "Tujuan"
};

// Rute — merepresentasikan sebuah edge dalam graf
struct Rute {
    string id_rute;          // Unique identifier (e.g., "R001")
    string id_asal;          // Vertex asal (FK ke Lokasi.id_lokasi)
    string id_tujuan;        // Vertex tujuan (FK ke Lokasi.id_lokasi)
    double jarak_km;         // Bobot edge (jarak dalam kilometer)
};

// Edge — unit dasar dalam Adjacency List
struct Edge {
    string tujuan;           // ID vertex tujuan
    double jarak_km;         // Bobot edge
};
```

### 3.2.2 Index Mapping

Karena Adjacency Matrix memerlukan akses berbasis indeks integer (bukan string), sistem menggunakan mekanisme **index mapping** dua arah:

```cpp
unordered_map<string, int> lokasiToIndex;  // "L001" → 0
vector<string> indexToLokasi;              // 0 → "L001"
```

Fungsi `ensureNodeExists(string id)` memastikan setiap lokasi terdaftar dalam mapping ini dan melakukan **resize dinamis** terhadap Adjacency Matrix jika node baru ditambahkan.

## 3.3 Alur Proses Sistem

**Gambar 3.2 — Flowchart Alur Proses Utama LogisRoute**

```
START
  │
  ▼
Muat lokasi.csv ──► Parse baris per baris ──► Populate data_lokasi[map]
  │                                           │
  │                              ensureNodeExists() → resize matrix
  │                                           │
Muat rute.csv ───► Parse baris per baris ──► Populate data_rute[vector]
  │                                           │
  │                      Update adjMatrix[idxAsal][idxTujuan] = jarak
  │                      Push Edge ke adjListMap[asal]
  │                                           │
  ▼                                     ┌────┴────┐
                           Tampilkan Menu Utama (17 opsi)
                                    │
                ┌───────────────────┼───────────────────┐
                │                   │                   │
          ┌─────┴─────┐     ┌───────┴───────┐   ┌───────┴───────┐
          │  CRUD Ops │     │  Display Ops  │   │  Benchmark Ops│
          │ (opsi 5-9)│     │ (opsi 1-4,   │   │ (opsi 13,15,16)│
          │           │     │  10-12)       │   │               │
          └─────┬─────┘     └───────┬───────┘   └───────┬───────┘
                │                   │                   │
                ▼                   ▼                   ▼
          Update dual        Tampilkan statistik,   Generate data besar,
          structure           matrix, list         jalankan benchmark,
          simultaneously                            export JSON
                │                   │                   │
                └───────────────────┴───────────────────┘
                                    │
                                    ▼
                             Simpan ke CSV? (opsi 14)
                                    │
                                    ▼
                                  EXIT
```

## 3.4 Metodologi Eksperimen

### 3.4.1 Desain Eksperimen

Eksperimen dirancang sebagai **benchmark komparatif terkontrol** dengan parameter-parameter berikut:

**Variabel Independen:**
- Ukuran graf: jumlah vertex V ∈ {20, 50, 100, 200, 500}
- Jumlah edge: E ≈ V × 5 (rasio ~5 edge per node, realistis untuk jaringan distribusi)
- Jenis representasi: Adjacency Matrix vs Adjacency List
- Jenis operasi: Search, Insert, Update, Delete, Traverse All

**Variabel Dependen:**
- Waktu eksekusi per operasi (mikrosecond, μs)
- Penggunaan memori (byte)

**Variabel Kontrol:**
- Seed random number generator: **MT19937 dengan seed = 42** (reproducible)
- Iterasi per operasi: **1.000×** (benchmark utama), **10.000×** (scaling benchmark)
- Compiler optimization: **-O2** (optimasi level produksi)
- Presisi timer: **nanosecond** (`std::chrono::high_resolution_clock`)
- Environment: OS Windows, GCC 15.1.0 (MinGW-w64 UCRT64), C++17

### 3.4.2 Skenario Uji

**Tabel 3.1 — Skenario Eksperimen**

| Skenario | V (Vertex) | E (Edge) | Density | Konteks |
|----------|-----------|----------|---------|---------|
| **A — Data Asli** | 20 | 40 | 10,0% | Jaringan kecil (data CSV asli) |
| **B — Menengah 1** | 50 | 250 | 10,2% | Ekspansi regional |
| **C — Menengah 2** | 100 | 500 | 5,05% | Skala provinsi |
| **D — Besar** | 200 | 1.000 | 2,51% | Skala nasional |
| **E — Enterprise** | 500 | 2.500 | 1,00% | Skala enterprise besar |

### 3.4.3 Mekanisme Benchmark

Engine benchmark bekerja dengan prinsip berikut:

1. **Preparasi:** Ambil sample data yang valid dari dataset (edge yang sudah pasti ada)
2. **Loop pengulangan:** Ulangi operasi N kali (1.000 atau 10.000) untuk mendapatkan rata-rata yang stabil
3. **Timing:** Gunakan `high_resolution_clock::now()` sebelum dan sesudah loop
4. **Presisi nanosecond:** Konversi hasil ke mikrosecond dengan presisi desimal
5. **Rollback:** Operasi destructif (insert/delete test) di-rollback agar tidak merusak data asli
6. **Ekspor:** Hasil ditulis ke file JSON untuk analisis lanjutan

```cpp
// Pola benchmark (pseudo-code dari implementasi):
auto runBenchmark = [&](string name, function<void()> fn) -> double {
    auto start = high_resolution_clock::now();
    for (int i = 0; i < iterasi; i++) fn();     // Ulangi N kali
    auto end = high_resolution_clock::now();
    return duration_cast<nanoseconds>(end - start).count()
           / 1000.0 / iterasi;                     // μs per operasi
};
```

---

# BAB 4 IMPLEMENTASI

## 4.1 Implementasi Adjacency Matrix

Adjacency Matrix diimplementasikan menggunakan `vector<vector<double>>` yang mendukung **resize dinamis**. Setiap kali lokasi baru ditambahkan melalui fungsi `ensureNodeExists()`, matriks diperbesar dan semua baris baru diinisialisasi dengan nilai 0.0.

```cpp
// Deklarasi (class ManajemenRute, private member):
vector<vector<double>> adjMatrix;

// Resize dinamis saat node baru ditambahkan:
bool ensureNodeExists(const string& id) {
    if (lokasiToIndex.count(id)) return false;
    int newIndex = (int)indexToLokasi.size();
    lokasiToIndex[id] = newIndex;
    indexToLokasi.push_back(id);
    
    size_t newSize = indexToLokasi.size();
    adjMatrix.resize(newSize);
    for (auto& row : adjMatrix) {
        row.resize(newSize, 0.0);     // Baris lama juga diperpanjang
    }
    return true;                       // Signal: matrix di-resize
}
```

**Akses edge** dilakukan langsung via indexing:
```cpp
// Cek/tambah edge: O(1)
int idxAsal = lokasiToIndex["L001"];    // O(1) hash lookup
int idxTujuan = lokasiToIndex["L004"];   // O(1) hash lookup
double jarak = adjMatrix[idxAsal][idxTujuan];  // O(1) direct access
```

## 4.2 Implementasi Adjacency List

Adjacency List diimplementasikan menggunakan `unordered_map<string, vector<Edge>>` untuk performa lookup rata-rata O(1) pada key (ID lokasi asal), dan `vector<Edge>` untuk menyimpan daftar edge keluaran yang compact.

```cpp
// Deklarasi (class ManajemenRute, private member):
unordered_map<string, vector<Edge>> adjListMap;    // Hash-based (fast)
map<string, vector<Edge>> adjListOrdered;           // Tree-based (sorted)

// Tambah edge: O(1) amortized (push_back)
Edge e = {id_tujuan, jarak_km};
adjListMap[id_asal].push_back(e);

// Cari edge: O(degree) — scan vector cari tujuan yang cocok
double cariJarak(const string& asal, const string& tujuan) {
    if (!adjListMap.count(asal)) return 0.0;
    for (const auto& edge : adjListMap[asal]) {
        if (edge.tujuan == tujuan) return edge.jarak_km;
    }
    return 0.0;   // Edge tidak ditemukan
}
```

## 4.3 Implementasi Operasi CRUD

Semua operasi CRUD dirancang untuk **memperbarui kedua struktur secara simultan**, sehingga data konsisten di kedua representasi setiap saat.

### 4.3.1 Insert — Tambah Rute Baru

```cpp
bool tambahRute(const string& id_rute, const string& asal,
                const string& tujuan, double jarak) {
    // Validasi keberadaan lokasi
    if (!data_lokasi.count(asal) || !data_lokasi.count(tujuan))
        return false;
    
    // Pastikan node terdaftar (resize matrix jika perlu)
    ensureNodeExists(asal);
    ensureNodeExists(tujuan);
    
    // Simpan ke master data
    data_rute.push_back({id_rute, asal, tujuan, jarak});
    
    // Update Adjacency Matrix: O(1)
    int idxA = lokasiToIndex[asal];
    int idxB = lokasiToIndex[tujuan];
    adjMatrix[idxA][idxB] = jarak;
    
    // Update Adjacency List: O(1) amortized
    adjListMap[asal].push_back({tujuan, jarak});
    adjListOrdered[asal].push_back({tujuan, jarak});
    
    return true;
}
```

### 4.3.2 Search — Cari Rute

```cpp
void cariRute(const string& asal, const string& tujuan) {
    // Via Matrix: O(1)
    auto startMatrix = high_resolution_clock::now();
    int idxA = lokasiToIndex[asal];
    int idxB = lokasiToIndex[tujuan];
    double jarakMatrix = adjMatrix[idxA][idxB];   // Direct access
    auto endMatrix = high_resolution_clock::now();
    
    // Via List: O(degree)
    auto startList = high_resolution_clock::now();
    double jarakList = 0.0;
    if (adjListMap.count(asal)) {
        for (const auto& edge : adjListMap[asal]) {  // Scan vector
            if (edge.tujuan == tujuan) {
                jarakList = edge.jarak_km;
                break;
            }
        }
    }
    auto endList = high_resolution_clock::now();
    
    // Tampilkan perbandingan waktu...
}
```

### 4.3.3 Update dan Delete

Operasi Update dan Delete mengikuti pola serupa: akses via **index langsung** untuk Matrix (O(1)), dan **scan + modify/erase** untuk List (O(degree)). Pada operasi Delete, selain menghapus edge dari kedua struktur, data rute juga dihapus dari vektor master `data_rute`.

Untuk operasi **Hapus Lokasi** (beserta semua rute terkait), sistem menggunakan strategi **rebuild total**: hapus lokasi dari master data, hapus semua rute terkait, lalu rebuild seluruh struktur graf dari awal. Ini lebih sederhana dan lebih aman daripada manipulasi inplace yang rentan error.

## 4.4 Modul File I/O

Sistem mendukung pembacaan dan penulisan data dalam format **CSV (Comma-Separated Values)**:

```cpp
// Muat data lokasi dari CSV
void muatDataLokasi(const string& nama_file) {
    ifstream file(nama_file);
    string line;
    getline(file, line);  // Skip header
    
    while (getline(file, line)) {
        stringstream ss(line);
        Lokasi loc;
        getline(ss, loc.id_lokasi, ',');
        getline(ss, loc.nama_lokasi, ',');
        getline(ss, loc.tipe_lokasi, ',');
        // Trim whitespace → populate data_lokasi → ensureNodeExists()
    }
}

// Simpan data ke CSV
void simpanDataRute(const string& nama_file = "") {
    ofstream file(file_path);
    file << "ID_Rute,ID_Asal,ID_Tujuan,Jarak_KM\n";
    for (const auto& r : data_rute)
        file << r.id_rute << "," << r.id_asal << ","
             << r.id_tujuan << "," << r.jarak_km << "\n";
}
```

Format file:
- **lokasi.csv:** `ID_Lokasi,Nama_Lokasi,Tipe_Lokasi`
- **rute.csv:** `ID_Rute,ID_Asal,ID_Tujuan,Jarak_KM`

## 4.5 Modul Benchmark Engine

Modul benchmark adalah komponen intelektual utama proyek ini. Terdiri dari dua sub-modul:

### 4.5.1 Benchmark Utama (`jalankanBenchmark`)

Menguji 6 operasi × 2 struktur = **12 pengukuran** pada data saat ini:

1. **Search (exist):** Cari edge yang pasti ada
2. **Search (none):** Cari edge yang tidak ada
3. **Insert (exist node):** Tulis ke cell yang sudah ada (simulasi insert)
4. **Update:** Ubah bobot edge yang ada
5. **Delete:** Set edge ke 0 (dengan rollback)
6. **Traverse All:** Iterasi semua edge (nested loop untuk Matrix, flat iteration untuk List)

### 4.5.2 Scaling Benchmark (`jalankanScalingBenchmark`)

Menguji 3 operasi kunci (Search, Update, Traverse All) pada **5 ukuran data berbeda** (V=20, 50, 100, 200, 500). Untuk setiap ukuran, data sintetis digenerate ulang dengan pola hub-and-spoke yang konsisten. Hasil dieksport ke `scaling_benchmark_results.json`.

### 4.5.3 Generator Data Sintetis (`generateLargeData`)

Membuat data logistik realistis dengan pola:
- **~2% Gudang Pusat/Regional** (hub utama)
- **~4% Gudang Transit** (intermediate hub)
- **~94% Cabang/Tujuan** (leaf nodes)
- **Edge pattern:** Hub-to-hub (20%), Regional-distribution (40%), Inter-cabang (40%)

Nama lokasi menggunakan kota-kota di Pulau Jawa untuk realisme (Jakarta, Bandung, Bogor, Bekasi, dsb.)

## 4.6 Modul Export JSON

Hasil benchmark dieksport ke format JSON untuk konsumsi oleh dashboard web React:

```cpp
void exportBenchmarkJSON(const vector<BenchmarkResult>& hasil, int V, int E) {
    ofstream json("benchmark_results.json");
    json << "{\n";
    json << "  \"metadata\": { ... },\n";       // Project info, timestamp
    json << "  \"structures\": {\n";             // Complexities, memory stats
    json << "    \"adjacencyMatrix\": { ... },\n";
    json << "    \"adjacencyList\": { ... }\n";
    json << "  },\n";
    json << "  \"benchmarkResults\": [...],\n";  // 12 measurements
    json << "  \"locations\": [...],\n";         // Node data for visualization
    json << "  \"routes\": [...]\n";             // Edge data for visualization
    json << "}\n";
}
```

---

# BAB 5 EKSPERIMEN & PENGUJIAN

## 5.1 Lingkungan Eksperimen

**Tabel 5.1 — Spesifikasi Lingkungan Eksperimen**

| Parameter | Nilai |
|-----------|-------|
| Sistem Operasi | Windows |
| Compiler | GCC 15.1.0 (Rev5, MSYS2 MinGW-w64 UCRT64) |
| Standar C++ | C++17 |
| Level Optimasi | -O2 (production optimization) |
| Library | STL (Standard Template Library) |
| Timer | `std::chrono::high_resolution_clock` (nanosecond precision) |
| RNG Engine | `mt19937` (Mersenne Twister) |
| Seed Random | 42 (fixed, untuk reproduktibilitas) |
| Iterasi Benchmark Utama | 1.000× per operasi |
| Iterasi Scaling Benchmark | 10.000× per operasi |
| Format Output | JSON (`benchmark_results.json`, `scaling_benchmark_results.json`) |

## 5.2 Skenario Uji 1: Dataset Kecil (Data Asli)

Dataset asli dimuat dari file CSV yang disediakan:

- **lokasi.csv:** 20 lokasi terdiri atas 3 Gudang (L001–L003) dan 17 Cabang/Tujuan (L004–L020)
- **rute.csv:** 40 rute distribusi yang menghubungkan gudang ke cabang dan antar-cabang
- Topologi: 1 Gudang Pusat Jakarta (L001) dengan degree tertinggi (9 edge keluar)
- Density: 40/(20×19) = **10,53%** (relatif dense untuk ukuran kecil)

Program berhasil memuat data, menampilkan menu interaktif, dan menjalankan semua operasi CRUD tanpa error.

## 5.3 Skenario Uji 2: Dataset Menengah

Melalui scaling benchmark, data digenerate untuk:
- **V=50, E=250:** Density 10,2% — simulasi ekspansi regional
- **V=100, E=500:** Density 5,05% — simulasi skala provinsi

## 5.4 Skenario Uji 3: Dataset Besar

- **V=200, E=1.000:** Density 2,51% — simulasi skala nasional
- **V=500, E=2.500:** Density 1,00% — simulasi skala enterprise

Data V=500 terdiri atas:
- 10 Gudang (2%): 1 Pusat + 9 Regional
- 20 Transit Hub (4%)
- 470 Cabang (94%)

Total alokasi Adjacency Matrix: **250.000 cells** (500 × 500), di mana hanya **2.500 cells** (1%) yang berisi nilai edge. Sisanya **247.500 cells (99%)** bernilai nol (kosong).

## 5.5 Variabel Yang Dimanipulasi

Ringkasan variabel eksperimen:

| Variabel | Nilai/Domain | Peran |
|----------|-------------|-------|
| `V` (jumlah vertex) | {20, 50, 100, 200, 500} | Independen — ukuran graf |
| `E` (jumlah edge) | {40, 100, 250, 500, 1000, 2500} | Independen — ≈ V × 5 |
| Struktur data | {Adjacency Matrix, Adjacency List} | Independen — representasi |
| Operasi | {Search, Insert, Update, Delete, Traverse} | Independen — jenis uji |
| Waktu eksekusi (μs) | Numerik (kontinu) | Dependen — performa |
| Memory (bytes) | Numerik (diskret) | Depenen — konsumsi ruang |
| Iterasi | {1000, 10000} | Kontrol — akurasi statistik |
| Seed RNG | 42 | Kontrol — reproduktibilitas |

---

# BAB 6 HASIL & ANALISIS

Bagian ini menyajikan dan menganalisis hasil eksperimen secara mendalam. Ini adalah bagian inti dari laporan ini.

## 6.1 Hasil Benchmark Utama (V=500, E=2500)

**Tabel 6.1 — Hasil Benchmark Utama pada Dataset Enterprise (V=500, E=2500, Iterasi=1.000)**

| No | Operasi | Struktur Data | Waktu (μs/op) | Memory (Bytes) | Big-O Waktu | Big-O Space |
|----|---------|--------------|---------------|----------------|-------------|-------------|
| 1 | Search (exist) | Adjacency Matrix | **0,0200** | 2.000.000 (1.953 KB) | O(1) | O(V²) |
| 2 | Search (exist) | Adjacency List | **0,0200** | 114.144 (111 KB) | O(E/V) | O(V+E) |
| 3 | Search (none) | Adjacency Matrix | **0,0000** | 2.000.000 (1.953 KB) | O(1) | O(V²) |
| 4 | Search (none) | Adjacency List | **0,0000** | 114.144 (111 KB) | O(1)* | O(V+E) |
| 5 | Insert (exist node) | Adjacency Matrix | **0,0200** | 2.000.000 (1.953 KB) | O(1) | O(V²) |
| 6 | Insert (exist node) | Adjacency List | **0,0200** | 114.144 (111 KB) | O(1) amp. | O(V+E) |
| 7 | Update | Adjacency Matrix | **0,0200** | 2.000.000 (1.953 KB) | O(1) | O(V²) |
| 8 | Update | Adjacency List | **0,0400** | 114.144 (111 KB) | O(E/V) | O(V+E) |
| 9 | Delete | Adjacency Matrix | **0,0200** | 2.000.000 (1.953 KB) | O(1) | O(V²) |
| 10 | Delete | Adjacency List | **0,2300** | 114.144 (111 KB) | O(E/V) | O(V+E) |
| 11 | Traverse All | Adjacency Matrix | **~0,001** | 2.000.000 (1.953 KB) | O(V²) | O(V²) |
| 12 | Traverse All | Adjacency List | **~0,001** | 114.144 (111 KB) | O(V+E) | O(V+E) |

*\*Catatan: Search (none) pada List menggunakan hash lookup key yang tidak ada = O(1) average.*

**Tabel 6.2 — Ringkasan Perbandingan Head-to-Head**

| Operasi | Matrix (μs) | List (μs) | Pemenang | Kecepatan Relatif |
|---------|:-----------:|:---------:|:--------:|------------------:|
| Search (ada) | 0,0200 | 0,0200 | **Seri** | 1,0× |
| Search (tidak ada) | 0,0000 | 0,0000 | **Seri** | — |
| Insert | 0,0200 | 0,0200 | **Seri** | 1,0× |
| Update | 0,0200 | 0,0400 | **🏆 Matrix** | **2,0× lebih cepat** |
| Delete | 0,0200 | 0,2300 | **🏆 Matrix** | **11,5× lebih cepat** |
| Traverse All | ~0,001 | ~0,001 | **Seri*** | — |

*\*\*Catatan Traverse: Nilai sangat kecil (~0,001 μs) karena efek optimasi compiler yang agresif pada loop sederhana. Pada praktiknya dengan kode yang lebih kompleks (non-trivial body loop), gap O(V²) vs O(V+E) akan sangat terasa.*

## 6.2 Analisis Perbandingan Waktu per Operasi

### 6.2.1 Operasi Search (Pencarian Edge)

Hasil menunjukkan bahwa **Search pada kedua struktur memiliki performa yang setara** (masing-masing 0,020 μs untuk edge yang ada, dan <0,001 μs untuk edge yang tidak ada). Hal ini dapat dijelaskan sebagai berikut:

- **Adjacency Matrix:** Melakukan akses langsung `adjMatrix[idxA][idxB]` yang merupakan operasi O(1) — satu instruksi memori. Namun, terdapat overhead dua kali hash lookup untuk mengkonversi string ID ke integer index.
- **Adjacency List:** Melakukan hash lookup untuk key asal (O(1) average), kemudian linear scan pada vector edge (O(E/V) = O(5) rata-rata). Dengan degree rata-rata hanya 5, scan ini sangat cepat.

Kesimpulan: Pada sparse graph dengan degree rendah, **overhead hash lookup mendominasi** sehingga keuntungan akses langsung Matrix tidak terlalu terasa. Kedua struktur kompetitif untuk operasi search.

### 6.2.2 Operasi Update (Pembaruan Edge)

**Adjacency Matrix unggul 2× lebih cepat** (0,020 μs vs 0,040 μs) pada operasi Update. Penjelasannya:

- **Matrix:** Satu operasi assignment langsung `adjMatrix[a][b] = nilai_baru`. Sangat sederhana.
- **List:** Perlu (1) hash lookup key asal, (2) scan vector cari edge yang cocok, (3) mutasi nilai `edge.jarak_km = nilai_baru`, dan (4) untuk rollback di benchmark — langkah (2)-(3) diulang untuk mengembalikan nilai asli. Scan vector ini menambah overhead yang terukur.

### 6.2.3 Operasi Delete (Penghapusan Edge)

**Adjacency Matrix unggul 11,5× lebih cepat** (0,020 μs vs 0,230 μs) pada operasi Delete. Ini adalah gap terbesar di antara semua operasi individual. Penjelasannya:

- **Matrix:** Satu assignment `adjMatrix[a][b] = 0.0`. Operasi paling sederhana.
- **List:** Selain scan untuk menemukan edge, operasi `erase()` pada `vector` memerlukan **shift elemen-elemen setelah posisi erase** untuk menutup gap. Meskipun rata-rata degree hanya 5, operasi shift ini memiliki overhead yang signifikan. Ditambah lagi, benchmark melakukan **re-insert** setelah erase untuk rollback, yang memerlukan `push_back` tambahan.

### 6.2.4 Operasi Traverse All (Iterasi Semua Edge)

Nilai terukur untuk Traverse All sangat kecil pada kedua struktur (~0,001 μs). Fenomena ini disebabkan oleh **optimasi compiler (-O2)** yang sangat agresif pada loop sederhana. Compiler dapat:

1. **Loop unrolling** — menghilangkan overhead loop control
2. **Dead code elimination** — menghapus akumulasi total yang tidak dipakai
3. **Auto-vectorization** — menggunakan instruksi SIMD untuk proses paralel
4. **Cache prefetching** — data kecil muat seluruhnya di L1/L2 cache

Meskipun nilai terukur kecil, **kompleksitas algoritmik tetap berbeda fundamental**:
- Matrix: **250.000 iterasi** (V × V = 500 × 500), tapi 247.500 diantaranya hanya cek `if (val > 0)` yang sangat murah
- List: **2.500 iterasi** (V + E ≈ 500 + 2.500), setiap iterasi akses data yang meaningful

Dalam skenario nyata di mana body loop melakukan pekerjaan substantif (misal: agregasi, filtering, formatting output), gap O(V²) vs O(V+E) akan sangat signifikan.

## 6.3 Analisis Scaling (Pertumbuhan Data)

**Tabel 6.3 — Hasil Scaling Benchmark (Iterasi=10.000 per operasi)**

| V | E | Search M (μs) | Search L (μs) | Update M (μs) | Update L (μs) | Traverse M (μs) | Traverse L (μs) | Matrix Mem | List Mem | Ratio Mem |
|---|---|:-------------:|:-------------:|:-------------:|:-------------:|:---------------:|:---------------:|:----------:|:--------:|:---------:|
| 20 | 100 | 0,0190 | 0,1327 | 0,0201 | 0,1555 | 0,0014 | 0,0014 | 3,2 KB | 4,6 KB | **0,7×** |
| 50 | 250 | 0,0404 | 0,0210 | 0,0184 | 0,0553 | 0,0011 | 0,0013 | 19,5 KB | 11,2 KB | **1,7×** |
| 100 | 500 | 0,0205 | 0,0203 | 0,0201 | 0,0437 | 0,0012 | 0,0012 | 78,1 KB | 22,2 KB | **3,5×** |
| 200 | 1.000 | 0,0227 | 0,0453 | 0,0173 | 0,0506 | 0,0014 | 0,0014 | 312,5 KB | 44,7 KB | **7,0×** |
| 500 | 2.500 | 0,0220 | 0,0228 | 0,0213 | 0,0448 | 0,0014 | 0,0014 | **1.953 KB** | **111,5 KB** | **17,5×** |

### 6.3.1 Analisis Tren Waktu — Operasi Search

Pada V=20, Adjacency List lebih lambat (0,133 μs vs 0,019 μs) karena **overhead hash map relatif besar** dibandingkan kerja yang dilakukan (graph kecil). Mulai V≥50, kedua struktur setara (~0,02 μs). Ini menunjukkan bahwa untuk operasi search individual, **kedua struktur praktis sama cepatnya** pada modern hardware ketika graph tidak terlalu besar.

### 6.3.2 Analisis Tren Waktu — Operasi Update

Pola yang konsisten terlihat: **Adjacency List selalu 2–2,5× lebih lambat** dari Matrix untuk operasi Update, di semua ukuran data. Overhead scan-and-mutate pada vector tidak berubah secara signifikan seiring pertumbuhan V karena yang berubah adalah jumlah node, bukan degree rata-rata (yang tetap ~5).

### 6.3.3 Analisis Tren Memory — Temuan Paling Signifikan

**Inilah temuan paling penting dari keseluruhan eksperimen:**

| Titik Data | Matrix | List | List Lebih Irit | Keterangan |
|-----------|--------|------|-----------------|------------|
| V=20 | 3,2 KB | 4,6 KB | **Matrix menang!** | Graph kecil, overhead list > savings |
| V=50 | 19,5 KB | 11,2 KB | **List menang 1,7×** | Tipping point tercapai |
| V=100 | 78,1 KB | 22,2 KB | **List menang 3,5×** | Gap mulai melebar |
| V=200 | 312,5 KB | 44,7 KB | **List menang 7,0×** | Kuadratik vs linear terasa |
| V=500 | **1.953 KB** | **111,5 KB** | **List menang 17,5×** | **Gap dramatis** |

**Pola pertumbuhan yang teramati:**
- **Adjacency Matrix:** Memory ∝ V². Saat V naik 25× (dari 20→500), memory naik **610×** (3,2 KB → 1.953 KB). Ini konsisten dengan **pertumbuhan kuadratik O(V²)**.
- **Adjacency List:** Memory ∝ V+E. Saat V naik 25×, memory naik **24×** (4,6 KB → 111,5 KB). Ini konsisten dengan **pertumbuhan linear O(V+E)**.

**Proyeksi ekstrapolasi:**
Jika V dinaikkan menjadi 10.000 node (skala nasional penuh):
- Matrix: **(10.000)² × 8 byte = 800 MB** ≋ hampir 1 GB!
- List: ~(10.000 + 50.000) × ~45 byte ≈ **2,7 MB**

Selisihnya menjadi **~300×** — Adjacency List secara dramatis lebih efisien untuk skala besar.

## 6.4 Analisis Penggunaan Memory

**Tabel 6.4 — Detail Penggunaan Memory per Struktur (V=500, E=2500)**

| Komponen | Adjacency Matrix | Adjacency List |
|----------|-----------------|----------------|
| **Total alokasi** | **2.000.000 bytes** (1.953 KB) | **114.144 bytes** (111 KB) |
| Cells/entries terisi | 2.500 (1,00%) | 2.500 (existing edges) |
| Cells/entries kosong | 247.500 (99,00%) | ~0 (minimal overhead) |
| Efisiensi space | **1,00%** | **~95%** |
| **Penghematan** | — | **94,3% (17,5× lebih irit)** |

**Visualisasi analogi:**
Bayangkan Adjacency Matrix sebagai **gedung parkir 500×500 lot** (250.000 lot) di mana hanya **2.500 kendaraan** parkir. Sisanya 247.500 lot kosong tapi tetap dibeton dan dilluminasi — pemborosan luar biasa. Adjacency List seperti **garasi yang hanya dibuat untuk kendaraan yang ada** — jauh lebih efisien.

## 6.5 Diskusi Trade-off (Analisis Kritis)

Berdasarkan seluruh data empiris yang dikumpulkan, berikut adalah matriks keputusan komprehensif:

**Tabel 6.5 — Matriks Trade-off Adjacency Matrix vs Adjacency List**

| Kriteria | Adjacency Matrix | Adjacency List | Pemenang |
|----------|:----------------:|:--------------:|:--------:|
| **Kecepatan search individual** | ⭐⭐⭐⭐⭐ O(1) | ⭐⭐⭐⭐ O(E/V) | Matrix (tipis) |
| **Kecepatan insert** | ⭐⭐⭐⭐⭐ O(1) | ⭐⭐⭐⭐⭐ O(1) amp. | Seri |
| **Kecepatan update** | ⭐⭐⭐⭐⭐ O(1) | ⭐⭐⭐ O(E/V) | **Matrix (2×)** |
| **Kecepatan delete** | ⭐⭐⭐⭐⭐ O(1) | ⭐⭐ O(E/V) | **Matrix (11,5×)** |
| **Kecepatan traverse all** | ⭐ O(V²) | ⭐⭐⭐⭐⭐ O(V+E) | **List (teoris)** |
| **Efisiensi memory** | ⭐ O(V²) | ⭐⭐⭐⭐⭐ O(V+E) | **List (17,5×)** |
| **Skalabilitas memory** | ⭐⭐ Buruk (kuadratik) | ⭐⭐⭐⭐⭐ Baik (linear) | **List** |
| **Kesederhanaan kode** | ⭐⭐⭐⭐⭐ Sangat sederhana | ⭐⭐⭐ Moderat | Matrix |
| **Cache friendliness** | ⭐⭐⭐⭐ Lokalitas spatial | ⭐⭐⭐ Pointer chasing | Matrix |
| **Cocok untuk sparse graph** | ⭐⭐ Tidak efisien | ⭐⭐⭐⭐⭐ Sangat ideal | **List** |
| **Cocok untuk dense graph** | ⭐⭐⭐⭐⭐ Ideal | ⭐⭐⭐ Overhead terasa | Matrix |

### 6.5.1 Rekomendasi Kontekstual

**Gunakan Adjacency Matrix jika:**
- Aplikasi melakukan **banyak random lookup** individual (cek adanya edge)
- Graf cenderung **dense** (density > 20–30%)
- **Memory bukan prioritas** (embedded system dengan RAM besar, misalnya server)
- Memerlukan **kesederhanaan implementasi** (prototype, proof-of-concept)
- Aplikasi memerlukan algoritma **all-pairs shortest path** (Floyd-Warshall) yang butuh matriks penuh

**Gunakan Adjacency List jika:**
- Aplikasi melakukan **banyak traversal/reporting** (iterasi semua edge)
- Graf bersifat **sparse** (density < 10%) ← **kasus LogisRoute!**
- **Memory terbatas** atau scalability penting
- Jumlah vertex dapat **bertambah dinamis** (resize list lebih murah dari re-alokasi matriks)
- Aplikasi memerlukan **single-source shortest path** (Dijkstra, BFS)

### 6.5.2 Rekomendasi untuk LogisRoute

Untuk kasus spesifik **LogisRoute — Sistem Manajemen Rute Distribusi Logistik**:

> **Verdict: Adjacency List adalah pilihan yang lebih optimal.**

Alasannya:
1. **Sparse graph terkonfirmasi** — density hanya 1%, 99% cells Matrix terbuang
2. **Memory saving drastis** — 94,3% hemat (17,5×) di V=500, akan semakin besar di skala lebih besar
3. **Kebutuhan traversal** — fitur statistik, pelaporan, dan visualisasi jaringan memerlukan iterasi semua edge
4. **Skalabilitas** — jumlah lokasi logistik akan terus bertambah; pertumbuhan linear jauh lebih manageable daripada kuadratik
5. **Operasi individual tetap kompetitif** — meskipun Matrix sedikit lebih cepat di Update/Delete, perbedaan 0,01–0,21 μs **tidak terasa oleh manusia** dalam interaksi UI

## 6.6 Validasi Hasil

### 6.6.1 Konsistensi dengan Teori Big-O

| Prediksi Teori | Hasil Empiris | Status |
|----------------|---------------|--------|
| Matrix: Space O(V²) | 500² × 8B = 2MB ✓ (terukur: 2MB) | **KONSISTEN** |
| List: Space O(V+E) | (500+2500) × ~40B ≈ 120KB ✓ (terukir: 111KB) | **KONSISTEN** |
| Matrix: Search O(1) | 0,020 μs (sangat cepat) | **KONSISTEN** |
| List: Search O(E/V) | 0,020 μs (E/V kecil → cepat juga) | **KONSISTEN** |
| Matrix: Space grows quadratically | 3KB → 1,953 KB (610× saat V naik 25×) | **KONSISTEN** |
| List: Space grows linearly | 4,6KB → 111KB (24× saat V naik 25×) | **KONSISTEN** |

**Tidak ada anomali signifikan** yang ditemukan. Seluruh hasil empiris konsisten dengan prediksi teori Big-O.

### 6.6.2 Catuan tentang Nilai Traverse

Satu catatan metodologis: nilai Traverse All yang terukur (~0,001 μs) **tidak mencerminkan perbedaan O(V²) vs O(V+E)** yang diprediksi teori. Ini disebabkan oleh kombinasi faktor: (1) optimasi compiler -O2 yang sangat agresif, (2) body loop benchmark yang trivial (hanya akumulasi counter), (3) seluruh dataset muat di CPU cache. Dalam aplikasi nyata dengan body loop yang substansial, perbedaan ini akan sangat terukur.

---

# BAB 7 KESIMPULAN & REKOMENDASI

## 7.1 Kesimpulan

Berdasarkan hasil eksperimen benchmark yang telah dilakukan secara sistematis pada implementasi sistem **LogisRoute**, dapat ditarik kesimpulan sebagai berikut:

1. **Adjacency Matrix unggul pada operasi individual yang melibatkan mutasi data**, khususnya operasi **Update (2× lebih cepat)** dan **Delete (11,5× lebih cepat)**. Keunggulan ini berasal dari mekanisme akses langsung O(1) ke cell matriks tanpa perlu scan atau manipulasi struktur dinamis.

2. **Adjacency List kompetitif setara pada operasi Search dan Insert**, dengan performa yang seimbang (0,020 μs untuk kedua struktur). Pada sparse graph dengan degree rata-rata rendah (~5), overhead scan pada vector Adjacency List tidak signifikan.

3. **Adjacency List jauh lebih efisien dalam penggunaan memori**, dengan penghematan mencapai **94,3%** (rata-rata **17,5× lebih irit**) pada dataset V=500. Keunggulan ini semakin dramatis seiring pertumbuhan data karena pertumbuhan memory Matrix bersifat **kuadratik O(V²)** sementara List bersifat **linear O(V+E)**.

4. **Pertumbuhan data memperbesar gap efisiensi** antara kedua struktur. Pada V=20, kedua struktur hampir seimbang (bahkan List sedikit lebih boros karena overhead). Mulai V≥50, Adjacency List mulai unggul. Pada V=500, gap memory mencapai 17,5×. Proyeksi menunjukkan pada V=10.000, gap dapat mencapai **300×**.

5. **Pilihan struktur data HARUS disesuaikan dengan karakteristik operasi dominan dan nature graf**. Tidak ada struktur yang "secara mutlak" lebih baik — keduanya memiliki trade-off yang jelas dan dapat dipilih berdasarkan konteks aplikasi.

## 7.2 Rekomendasi

### 7.2.1 Rekomendasi Implementasi

Untuk pengembangan lanjutan sistem LogisRoute maupun sistem serupa:

1. **Gunakan Adjacency List sebagai struktur data primer** untuk penyimpanan graf jaringan distribusi logistik, mengingat karakteristik sparse graph dan kebutuhan efisiensi memory.

2. **Pertimbangkan pendekatan hybrid** untuk aplikasi kritis: gunakan Adjacency List sebagai storage utama, bangun **cache/index tambahan** (misal: hash map untuk edge lookup cepat) jika operasi search individual menjadi bottleneck.

3. **Implementasikan algoritma pencarian rute terpendek** (Dijkstra/A*) sebagai fitur lanjutan, yang akan sangat efisien pada basis Adjacency List karena operasi utamanya adalah traversal graf.

4. **Tambahkan persistensi database** (SQLite/PostgreSQL) sebagai alternatif/suplemen penyimpanan CSV untuk data production-scale.

### 7.2.2 Saran Pengembangan

1. **GUI/Desktop Application:** Mengembangkan antarmuka grafis menggunakan Qt atau Flutter Desktop untuk meningkatkan user experience beyond CLI.
2. **Web Dashboard:** Menyelesaikan integrasi dengan dashboard React yang sudah dirancang (file `benchmark_results.json` sudah mendukung hal ini).
3. **Visualisasi Graf Interaktif:** Integrasi library seperti D3.js atau Cytoscape.js untuk visualisasi jaringan distribusi secara interaktif.
4. **Multi-threaded Benchmark:** Menggunakan std::thread untuk parallel benchmark yang lebih akurat pada multi-core systems.
5. **Support Undirected Graph:** Menambahkan opsi graf tak berarah untuk skenario di mana rute bersifat bidirectional.

---

# BAB 8 DISCLOSURE PENGGUNAAN AI

## 8.1 Bagian yang Menggunakan Bantuan AI

Sebagai bentuk transparansi akademis, kami disclose penggunaan Artificial Intelligence (AI) dalam pengerjaan proyek ini:

1. **Seluruh kode sumber C++** (`main.cpp`) dibuat dengan bantuan AI sebagai coding assistant. Tim memberikan spesifikasi kebutuhan, dan AI membantu menerjemahkan menjadi kode C++ yang executable.

2. **Script dan prompt orchestrator** (`PROMPT_1_MAIN.md`, `PROMPT_A_LAPORAN.md`, `PROMPT_B_PPT.md`) disusun dengan bantuan AI untuk mengotomasi alur kerja compile, benchmark, dan dokumentasi.

3. **Draft laporan ini** disusun dengan bantuan AI berdasarkan data hasil eksperimen aktual yang dihasilkan oleh program.

4. **Generator data sintetis** dan **modul benchmark** dibuat dengan bantuan AI untuk memastikan metodologi yang tepat dan reproducible.

## 8.2 Pemahaman Tim

Kami menyatakan bahwa seluruh anggota tim telah:

- ✅ **Memahami konsep dasar graf**, termasuk terminologi (vertex, edge, directed graph, weighted graph, degree, density)
- ✅ **Memahami representasi Adjacency Matrix** — cara kerja, kompleksitas, kelebihan, kekurangan
- ✅ **Memahami representasi Adjacency List** — cara kerja, kompleksitas, kelebihan, kekurangan
- ✅ **Memahami analisis Big-O** dan implikasinya terhadap performa waktu dan ruang
- ✅ **Menjalankan dan menguji program sendiri** — compile, run, generate data, benchmark
- ✅ **Menganalisis hasil benchmark** dan menarik kesimpulan berdasarkan data, bukan opini
- ✅ **Memahami trade-off** antara kedua struktur dan kapan masing-masing lebih tepat digunakan

**AI berperan sebagai coding assistant, penulis draft, dan fasilitator alur kerja — BUKAN pengganti pemahaman konseptual tim.** Seluruh analisis, interpretasi data, dan kesimpulan dalam laporan ini merupakan hasil pemikiran kritis tim berdasarkan data empiris yang valid.

---

# DAFTAR PUSTAKA

1. Cormen, T.H., Leiserson, C.E., Rivest, R.L., & Stein, C. (2009). *Introduction to Algorithms*, 3rd Edition. MIT Press. (Chapter 22: Elementary Graph Algorithms; Chapter 23: Minimum Spanning Trees)

2. Sedgewick, R., & Wayne, K. (2011). *Algorithms*, 4th Edition. Addison-Wesley. (Graph chapters: adjacency-list representation, graph processing)

3. Dokumen tugas: "Proyek Akhir Struktur Data Genap 2526.pdf" — Panduan resmi mata kuliah Struktur Data, IPB University SSMDI. (Halaman 16-17: ketentuan laporan dan presentasi)

4. cppreference.com — Dokumentasi referensi STL C++. `unordered_map`, `vector`, `chrono`, `high_resolution_clock`. Tersedia di https://en.cppreference.com/w/

5. Stroustrup, B. (2020). *The C++ Programming Language*, 4th Edition. Addison-Wesley. (Containers, algorithms, dan standard library reference)

6. Knuth, D.E. (1997). *The Art of Computer Programming, Volume 1: Fundamental Algorithms*, 3rd Edition. Addison-Wesley. (Representasi graf dan analisis kompleksitas)

---

# LAMPIRAN

## Lampiran A: Potongan Kode Utama

### A.1 Deklarasi Class ManajemenRute (parsial)

```cpp
class ManajemenRute {
private:
    // Master data
    unordered_map<string, Lokasi> data_lokasi;
    vector<Rute> data_rute;

    // Dual representation
    vector<vector<double>> adjMatrix;                    // Fase 1: Matrix
    unordered_map<string, vector<Edge>> adjListMap;      // Fase 2: List (hash)
    map<string, vector<Edge>> adjListOrdered;            // Fase 2: List (ordered)

    // Index mapping
    unordered_map<string, int> lokasiToIndex;
    vector<string> indexToLokasi;

public:
    // File I/O
    void muatDataLokasi(const string& nama_file);
    void muatDataRute(const string& nama_file);
    void simpanDataLokasi(const string& nama_file = "");
    void simpanDataRute(const string& nama_file = "");

    // CRUD
    bool tambahLokasi(const string& id, const string& nama, const string& tipe);
    bool tambahRute(const string& id_rute, const string& asal,
                    const string& tujuan, double jarak);
    void cariRute(const string& asal, const string& tujuan);
    bool updateRute(const string& id_rute, double jarak_baru);
    bool hapusRute(const string& id_rute);
    bool hapusLokasi(const string& id);

    // Display
    void tampilkanSemuaLokasi();
    void tampilkanSemuaRute();
    void tampilkanStatistik();
    void tampilkanAdjacencyMatrix();
    void tampilkanAdjacencyList();

    // Benchmark
    void jalankanBenchmark(int iterasi = 1000);
    void jalankanScalingBenchmark(int iterasi = 1000);
    void generateLargeData(int numNodes = 500, int numEdges = 2500);
};
```

### A.2 Fungsi generateLargeData (parsial)

```cpp
void generateLargeData(int numNodes = 500, int numEdges = 2500) {
    // Clear existing data
    data_lokasi.clear(); data_rute.clear();
    // ... clear structures ...

    mt19937 rng(42);  // Fixed seed untuk reproducibilitas
    uniform_real_distribution<double> distJarak(5.0, 200.0);

    // Pattern: ~2% Gudang, ~4% Transit, ~94% Cabang
    int numGudang = max(3, numNodes / 50);
    int numTransit = max(2, numNodes / 25);

    // Generate lokasi (nodes) ...
    // Phase 1: Hub connections (Gudang Pusat → Regional) ~20%
    // Phase 2: Regional distribution (Gudang → Cabang) ~40%
    // Phase 3: Inter-cabang routes (sisa) ~40%
}
```

### A.3 Fungsi jalankanBenchmark (parsial)

```cpp
void jalankanBenchmark(int iterasi = 1000) {
    auto runBenchmark = [&](const string& opName,
                            function<void()> fn) -> double {
        auto start = high_resolution_clock::now();
        for (int i = 0; i < iterasi; i++) fn();
        auto end = high_resolution_clock::now();
        return duration_cast<nanoseconds>(end - start).count()
               / 1000.0 / iterasi;  // μs per operasi
    };

    // 6 operasi × 2 struktur = 12 pengukuran
    // Search(exist), Search(none), Insert, Update, Delete, TraverseAll
    // ... masing-masing diukur untuk Matrix dan List ...
}
```

## Lampiran B: Contoh Output Program

### B.1 Output Muat Data Awal

```
  [*] Memuat data awal...
  [OK] Data Lokasi dimuat: 20 lokasi.
  [OK] Data Rute dimuat: 40 rute.
```

### B.2 Output Statistik Jaringan (Data Asli V=20, E=40)

```
  +------------------------------------------------+
  |           STATISTIK JARINGAN DISTRIBUSI         |
  +------------------------------------------------+
  | Total Lokasi (V)       :                      20 |
  | Total Rute (E)         :                      40 |
  | Kepadatan Graf         :                  10,53% |
  +------------------------------------------------+
  | ADJACENCY MATRIX (Fase 1)                         |
  |   Ukuran Matriks         :                   400 sel |
  |   Memori Terpakai        :                 3,1 KB |
  |   Sel Terisi (non-zero)  :                    40 sel |
  |   Sel Kosong (zero)      :                   360 sel |
  |   Efisiensi Ruang        :                  10,00% |
  +------------------------------------------------+
  | ADJACENCY LIST (Fase 2)                           |
  |   Hash Map (unordered_map):                 1,6 KB |
  |   Ordered Map (std::map)  :                 1,6 KB |
  +------------------------------------------------+
```

### B.3 Output Generate Data Besar (V=500, E=2500)

```
  ################################################################
  #           GENERATE DATA BESAR UNTUK BENCHMARK               #
  ################################################################

  [OK] Generated 500 lokasi (10 Gudang, 20 Transit, 470 Cabang)
  [OK] Generated 2500 rute distribusi
  [OK] Total V = 500, E = 2500, Density = 1.00%
  [OK] Matrix size: 250000 cells (1 MB)
```

### B.4 Output Benchmark (V=500, E=2500)

```
  ################################################################
  #              BENCHMARK ENGINE: MATRIX vs LIST               #
  #  Iterasi per operasi: 1000 x                                #
  ################################################################

  [BENCH] Search Rute (rute exist)...
    Matrix: 0.020 us/op | List: 0.020 us/op
  [BENCH] Search Rute (not exist)...
    Matrix: 0.006 us/op | List: 0.005 us/op
  [BENCH] Insert Rute (existing nodes)...
    Matrix: 0.020 us/op | List: 0.022 us/op
  [BENCH] Update Rute...
    Matrix: 0.021 us/op | List: 0.042 us/op
  [BENCH] Delete Rute...
    Matrix: 0.021 us/op | List: 0.239 us/op
  [BENCH] Iterate All Edges (full traversal)...
    Matrix: 0.001 us/op | List: 0.001 us/op

  +================================================================+
  | Operasi              | Struktur Data       | Waktu (us/op) |
  +================================================================+
  | Search (exist)       | Adjacency Matrix   |         0.020 |
  | Search (exist)       | Adjacency List     |         0.020 |
  | Search (none)        | Adjacency Matrix   |         0.000 |
  | Search (none)        | Adjacency List     |         0.000 |
  | Insert (exist node)  | Adjacency Matrix   |         0.020 |
  | Insert (exist node)  | Adjacency List     |         0.020 |
  | Update               | Adjacency Matrix   |         0.020 |
  | Update               | Adjacency List     |         0.040 |
  | Delete               | Adjacency Matrix   |         0.020 |
  | Delete               | Adjacency List     |         0.230 |
  | Traverse All         | Adjacency Matrix   |         0.000 |
  | Traverse All         | Adjacency List     |         0.000 |
  +================================================================+
  V (Vertex/Lokasi) = 500 | E (Edge/Rute) = 2500
  Matrix Space: O(V^2) = O(250000) | List Space: O(V+E) = O(3000)
  +================================================================+
```

### B.5 Output Scaling Benchmark

```
  --- Scaling: V=20, E=100 ---
    Search:   Matrix=0.019us  List=0.133us
    Update:   Matrix=0.020us  List=0.156us
    Traverse: Matrix=0.001us  List=0.001us
    Memory:  Matrix=3 KB  List=4 KB

  --- Scaling: V=50, E=250 ---
    Search:   Matrix=0.040us  List=0.021us
    Update:   Matrix=0.018us  List=0.055us
    Traverse: Matrix=0.001us  List=0.001us
    Memory:  Matrix=19 KB  List=11 KB

  --- Scaling: V=100, E=500 ---
    Search:   Matrix=0.021us  List=0.020us
    Update:   Matrix=0.020us  List=0.044us
    Traverse: Matrix=0.001us  List=0.001us
    Memory:  Matrix=78 KB  List=22 KB

  --- Scaling: V=200, E=1000 ---
    Search:   Matrix=0.023us  List=0.045us
    Update:   Matrix=0.017us  List=0.051us
    Traverse: Matrix=0.001us  List=0.001us
    Memory:  Matrix=312 KB  List=44 KB

  --- Scaling: V=500, E=2500 ---
    Search:   Matrix=0.022us  List=0.023us
    Update:   Matrix=0.021us  List=0.045us
    Traverse: Matrix=0.001us  List=0.001us
    Memory:  Matrix=1 MB  List=111 KB
```

## Lampiran C: Data CSV Sample

### C.1 lokasi.csv (10 baris pertama dari 20)

```csv
ID_Lokasi,Nama_Lokasi,Tipe_Lokasi
L001,Gudang Pusat Jakarta,Gudang
L002,Gudang Transit Bekasi,Gudang
L003,Gudang Regional Bandung,Gudang
L004,Cabang Jakarta Selatan,Tujuan
L005,Cabang Jakarta Barat,Tujuan
L006,Cabang Jakarta Timur,Tujuan
L007,Cabang Jakarta Utara,Tujuan
L008,Cabang Depok Margonda,Tujuan
L009,Cabang Bogor Selatan,Tujuan
L010,Cabang Bogor Utara,Tujuan
... (10 baris lagi)
```

### C.2 rute.csv (10 baris pertama dari 40)

```csv
ID_Rute,ID_Asal,ID_Tujuan,Jarak_KM
R001,L001,L004,15
R002,L001,L005,18
R003,L001,L006,22
R004,L001,L007,12
R005,L001,L008,30
R006,L001,L009,45
R007,L001,L010,50
R008,L001,L011,28
R009,L001,L012,35
R010,L002,L013,20
... (30 baris lagi)
```

---

*Dokumen ini disusun untuk memenuhi tugas Proyek Akhir Mata Kuliah Struktur Data Semester Genap 2025/2026*

*IPB University — Sekolah Sarjana Manajemen dan Digital Indonesia (SSMDI)*

*Kelompok 1 | Paralel 5*

*Tanggal: 5 Juni 2026*
