# PROMPT: UI/UX Redesign untuk Proyek LogisRoute

> **Instruksi untuk AI yang akan generate desain:** Kamu adalah UI/UX Designer expert. Berikut adalah spesifikasi LENGKAP dari sebuah aplikasi web bernama **LogisRoute — Sistem Manajemen & Pencarian Rute Distribusi Logistik**. Tugasmu adalah mendesain ulang SELURUH tampilan aplikasi ini menjadi jauh lebih baik, modern, profesional, dan visually stunning.

> ### 🎨 WAJIB: Color Scheme & Design Direction
> 
> Kamu **HARUS** menggunakan desain berikut:
> 
> - **Tema utama: LIGHT MODE dengan basis PUTIH (White)** — background utama harus putih atau sangat terang (off-white, `#FAFBFC`, `#F8FAFC`, `#F5F7FA`, atau sejenisnya). **BUKAN dark mode.** Seluruh aplikasi harus terasa terang, bersih, dan ringan.
> - **Aksen warna utama: BIRU (Blue)** — gunakan biru sebagai warna primary/aksen dominan di seluruh aplikasi. Eksplorasi shades biru: royal blue (`#2563EB`), sky blue (`#0EA5E9`), electric blue (`#3B82F6`), navy (`#1E40AF`), cobalt (`#0052CC`), azure (`#0078D4`), dll. Boleh pakai 1 shade biru utama + gradient ke shade biru lainnya.
> - **Skema warna: White + Blue (+ netral abu-abu untuk border/secondary text)** — kesan keseluruhan harus bersih, modern, profesional, dan *"corporate-tech"*. Referensi visual: dashboard Vercel, Linear, Stripe, Notion, Raycast, Modern SaaS dashboard.
> - **Boleh tambahkan aksen warna kedua (secondary accent)** selama tidak mendominasi — misalnya hijau untuk success state, amber/orange untuk warning, merah untuk error. Tapi **dominasi visual tetap: putih + biru**.
> 
> ### ✨ Standar Kualitas Desain (WAJIB)
> 
> Desain yang kamu hasilkan HARUS memenuhi standar kualitas tinggi berikut:
> 
> - **Visual hierarchy yang jelas** — mata user tahu mana yang paling penting, lalu turun ke detail. Ukuran font, weight, warna, dan spacing harus mencerminkan hierarki informasi. Heading besar & bold, subheading medium, body comfortable, secondary text lebih kecil & lebih terang.
> - **Spacing yang konsisten & generous** — jangan sesak! Beri ruang napas antar elemen. Gunakan **8px grid system**. Card padding minimal 20-24px, gap antar section minimal 32-40px, gap antar card minimal 16-20px. White space adalah temanmu.
> - **Typography yang rapi & modern** — pilih font yang mudah dibaca: **Inter**, Plus Jakarta Sans, DM Sans, Outfit, atau sejenis untuk body/text. Bisa pakai mono font (JetBrains Mono, Fira Code) untuk data/angka/jarak. Heading: bold/extra-bold (700-800). Body: regular/medium (400-500), size 14-16px. Secondary/muted: size 12-13px, color light gray.
> - **Card & component design yang clean** — rounded corners (**8-16px border radius**, konsisten), **soft multi-layer shadow** untuk elevasi/depth (bukan flat tanpa depth), **white cards** di atas background very-light-gray. Border sangat tipis (`1px solid #E2E8F0` atau sejenis) atau tanpa border tapi shadow yang define edge.
> - **Micro-interactions yang halus tapi terasa** — hover states yang jelas (scale sedikit `translateY(-2px)`, shadow bertambah, background color berubah sedikit), button press effect (`scale(0.97)`), smooth transitions (**200-300ms ease**), loading states yang elegan (skeleton/shimmer/pulse spinner).
> - **Consistent iconography** — semua icon harus **satu gaya konsisten** (semua outline stroke 1.5-2px, atau semua filled, atau duotone). Ukuran konsisten: 16px untuk inline/button, 20-24px untuk standalone/header, 14px untuk table. Rekomendasi: Lucide Icons, Heroicons, Phosphor Icons.
> - **Data visualization yang jelas & readable** — chart/graph harus jelas terbaca, axis labels ada, legend lengkap, colors distinguishable, angka penting ditampilkan besar/bold. Jangan buat chart yang confusing.
> - **Empty states yang ramah & berguna** — jika filter tidak ada result: ilustrasi/icon + teks panduan + saran action. Bukan halaman kosong membosankan.
> - **Accessible contrast ratio** — text cukup kontras dengan background (minimal WCAG AA). Jangan pakai text abu-abu terlalu muda (`#CBD5E1` atau lebih muda) di atas putih untuk konten penting. Primary text: `#1E293B` atau lebih gelap.
> - **Polished details yang membedahkan desain biasa vs bagus** — focus visible states pada semua interaktif elements (ring or outline), branded selection color, custom scrollbar styled (tipis, rounded, subtle), smooth scroll behavior (`scroll-behavior: smooth`), tidak ada layout shift saat render, consistent border radius across ALL components.
> - **Overall impression: "Ini desain mahal"** — bukan template gratis, bukan student project yang terlihat murahan. Setiap pixel terasa intentional. Setiap spacing terhitung. Setiap warna punya alasan.
> 
> Yang boleh kamu tentukan sendiri:
> - **Shade biru exact, gradient combinations blue-to-blue**
> - **Detail spacing scale (yang penting: generous & consistent, 8px base)**
> - **Border radius specifics (yang penting: 8-16px, konsisten seluruh app)**
> - **Shadow style & depth treatment (yang penting: soft, layered, natural)**
> - **Animation timing & easing specifics (yang penting: smooth, 200-300ms, tidak berlebihan)**
> - **Icon set pilihan (yang penting: satu gaya konsisten)**
> - **Subtle design flourishes** (soft glassmorphism ringan, gradient text untuk heading, subtle dot-pattern background, dsb — selama mendukung tema white+blue)
> - **Layout approach selama semua fitur tertampung dengan rapi & spacious**
> - **Chart library / visualisasi approach**
> - **CSS approach (Tailwind, plain CSS, CSS-in-JS, styled-components, dll)**
> - **Framework (React, Vue, Svelte, vanilla JS, dsb — asalkan SPA)**
> 
> Yang penting: **semua fitur dan fungsionalitas di bawah HARUS ADA dan berfungsi penuh.** Jangan mengurangi atau menghilangkan fitur. Tambahkan improvement UX kalau dirasa perlu.

---

## 1. INFORMASI PROYEK

| Field | Value |
|-------|-------|
| **Nama Aplikasi** | LogisRoute |
| **Tagline** | Sistem Manajemen Rute Distribusi |
| **Konteks Akademik** | Proyek Akhir Mata Kuliah Struktur Data — Genap 2025/2026 |
| **Institusi** | IPB University — SSMDI (Sekolah Ilmu dan Teknologi Sistem & Manajemen Dirgantara) |
| **Kelompok** | Kelompok 1 — Paralel 5 |
| **Anggota** | Irgi Setiawan (M0405241018), Danish Hafid Wibisono (M0405241055), Alifia Rahmah (M0405241064), Dzaki Aditya Nurtyahyadi (M0405241079), Widya Aulianti (M0405241083) |
| **Topik Utama** | Implementasi Representasi Graf: **Adjacency Matrix vs Adjacency List** pada sistem distribusi logistik |
| **Tech Stack Saat Ini** | Frontend: React 19 + Vite + Framer Motion + Recharts + Lucide Icons + TailwindCSS. Backend: C++ (STL). Data: CSV + JSON export |
| **Bahasa UI** | Bahasa Indonesia |

### Domain Bisnis
Aplikasi ini mensimulasikan **sistem manajemen rute distribusi logistik** perusahaan yang memiliki:
- **Gudang Pusat** (hub utama)
- **Gudang Regional / Transit** (hub sekunder)
- **Cabang Tujuan** (drop points / destinasi pengiriman)
- **Rute** antar lokasi dengan bobot **jarak dalam kilometer**

Data bersifat **graf berarah (directed graph)** di mana setiap edge merepresentasikan satu rute distribusi.

---

## 2. ARSITEKTUR HALAMAN & NAVIGASI

Aplikasi menggunakan **Single Page Application (SPA)** dengan tab-based navigation. Ada **6 halaman/tab utama** yang harus ada:

### Navigasi Utama (6 Tab)

| # | ID Tab | Label Tab | Ikon Suggest | Deskripsi Singkat |
|---|--------|-----------|-------------|-------------------|
| 1 | `dashboard` | Dashboard | 📊 | Overview statistik jaringan |
| 2 | `graph` | Visualisasi Graf | 🕸️ | Interaktif network graph |
| 3 | `search` | Pencarian Rute | 🔍 | Cek koneksi antar lokasi |
| 4 | `locations` | Data Lokasi | 📍 | CRUD master data lokasi |
| 5 | `routes` | Data Rute | 🛤️ | CRUD master data rute |
| 6 | `benchmark` | Benchmark | ⚡ | Perbandingan performa struktur data |

### Layout Global (Harus Ada)

1. **Header/Sticky Navbar** — Selalu visible di atas:
   - Logo/icon aplikasi + nama "LogisRoute" + tagline "Sistem Manajemen Rute Distribusi"
   - **Navigation tabs/pills** ke-6 halaman (active state jelas)
   - **Mobile:** hamburger menu → slide-down drawer (karena di mobile nav pills tidak muat)
   - Harus sticky (tetap di atas saat scroll)

2. **Page Title Bar** (di bawah header, di setiap halaman):
   - Icon halaman (sesuai tema halaman)
   - Judul halaman ( besar )
   - Deskripsi singkat halaman (kecil, muted)
   - **Stats chips** di sisi kanan yang menampilkan:
     - `V=<jumlah lokasi>` (total vertex/node)
     - `E=<jumlah rute>` (total edge/rute)
     - `ρ=<persentase>%` (kepadatan graf / space efficiency)

3. **Content Area** — Area konten utama per halaman (max-width container, centered)

4. **Footer** — Di bagian paling bawah:
   - Kiri: "Struktur Data Genap 2025/2026" + "Kelompok 1 — Paralel 5 — IPB University — SSMDI"
   - Kanan: Tech badges: "C++ Backend", "React + Vite", "TailwindCSS", "Matrix vs List"

5. **Toast Notification System** — Popup notifikasi:
   - Muncul di kanan atas (stackable)
   - Tipe: ✅ Success (hijau), ❌ Error (merah), ⚠️ Warning (kuning)
   - Isi: judul + pesan detail + tombol close
   - Auto-dismiss setelah ~3 detik
   - Animasi masuk (slide dari kanan) dan keluar

---

## 3. SPESIFIKASI DETAIL PER HALAMAN

### 3.1. DASHBOARD (`dashboard`)

Halaman overview yang memberikan gambaran umum seluruh jaringan distribusi.

#### 3.1.1. Stat Cards Grid (6 kartu statistik)

Enam kartu dalam grid responsif (6 kolom di desktop, 3 di tablet, 2 di mobile):

| # | Label Statistik | Value Source | Warna Suggest | Icon Suggest |
|---|----------------|--------------|---------------|-------------|
| 1 | Total Lokasi | `locations.length` (integer) | Biru | 📍 MapPin |
| 2 | Total Rute | `routes.length` (integer) | Ungu | 🛤️ Route |
| 3 | Gudang Pusat | Count lokasi where `tipe === 'Gudang'` (integer) | Kuning/Amber | 🏭 Warehouse |
| 4 | Cabang Tujuan | Count lokasi where `tipe === 'Tujuan'` (integer) | Cyan | 🏢 Building2 |
| 5 | Total Jarak | Sum semua `routes[].jarak_km` (number, format dengan pemisah ribuan) + suffix " km" | Hijau | 📏 Ruler |
| 6 | Rata-rata Jarak | Average semua `routes[].jarak_km` (1 desimal) + suffix " km" | Merah/Rose | 📈 TrendingUp |

**Per kartu harus ada:**
- Icon dalam rounded container
- Nilai besar/bold (angka utama)
- Label kecil di bawahnya (uppercase, muted)
- Hover effect (subtle lift/glow)
- Background gradient atau color-coded sesuai tema

#### 3.1.2. Graph Analysis Panel (Section Besar)

Panel analisis kepadatan graf dan efisiensi ruang:

**Metric Blocks (4 blok dalam row):**

| Metric | Value | Sub-label | Color Hint |
|--------|-------|-----------|------------|
| Sel Matrix Total | `V × V` (V kuadrat) | O(V²) | Biru |
| Sel Terisi (Edge) | `E` (jumlah edge) | Edge aktif | Hijau |
| Sel Kosong (Waste) | `(V × V) - E` | Memori terbuang | Merah |
| Efisiensi Ruang | `(E / (V×V)) × 100` % | Space used | Cyan |

**Progress Bar — Space Efficiency Adjacency Matrix:**
- Bar horizontal panjang menunjukkan persentase efisiensi (0-100%)
- Marker vertikal di posisi 14%, 25%, 50% sebagai referensi
- Warna bar: **merah-oranye** jika sparse (<30%), **hijau-cyan** jika dense (≥30%)
- Animasi fill dari kiri ke kanan saat load
- Shimmer/shine effect di atas bar
- Label kiri: "Space Efficiency — Adjacency Matrix", label kanan: nilai persentase

**Info/Warning Panel (di bawah progress bar):**
- **Jika Sparse Graph (<30%):** Panel warning dengan icon ⚠️
  - Teks: "Sparse Graph terdeteksi. Graf ini memiliki kepadatan rendah (X%). Adjacency Matrix membutuhkan O(V²)=N sel memori tapi hanya M yang terisi. **Adjacency List jauh lebih efisien** untuk kasus ini (O(V+E)=O(Z))."
  - Warna tema: amber/kuning
- **Jika Dense Graph (≥30%):** Panel info dengan icon 📈
  - Teks: "Dense Graph. Kepadatan tinggi (X%). Adjacency List tetap efisien untuk operasi traversal, tapi Matrix lebih cepat untuk edge lookup langsung O(1)."
  - Warna tema: hijau

---

### 3.2. VISUALISASI GRAF (`graph`)

Halaman visualisasi interaktif jaringan distribusi sebagai graf berarah.

#### 3.2.1. Canvas Graf (Area Besar — SVG)

**Node (Vertex/Simpul):**
- Setiap lokasi = 1 node lingkaran
- **Dua tipe node dengan warna berbeda:**
  - **Gudang** (tipe === 'Gudang'): warna kuning/emas/gold — gradient radial, glow effect
  - **Tujuan/Cabang** (tipe === 'Tujuan'): warna cyan/biru — gradient radial, glow effect
- **Gudang Pusat** (node pertama/Gudang pertama): lebih besar, punya pulse ring animation (lingkaran membesar-mengecil di sekelilingnya)
- Setiap node menampilkan:
  - ID lokasi (centered, contoh: "001", "002", mono font, bold, white)
  - Nama lokasi (di bawah node, truncated jika >16 karakter)
  - **Degree badge** (pojok kanan atas node): small rounded rect menampilkan `d:N` dimana N = jumlah edge keluar (out-degree)
- Shadow effect di bawah node (depth illusion)
- Highlight/spesial effect untuk center hub

**Edge (Sisi/Rute):**
- Garis lengkung (curved/quadratic bezier) dari source ke target
- **Dua layer:**
  - Background layer: tebal (7px), transparan (untuk hover area)
  - Foreground layer: tipis (2.2px), warna cyan, glow effect
- **Label jarak di tengah edge**: small rounded pill menampilkan `{jarak}km` (contoh: "15km")
- Animasi draw-in (pathLength animation) saat load — edge muncul satu per satu bertahap
- Arah implisit dari layout (pusat ke luar)

**Layout Otomatis (Radial/Concentric):**
- **Center:** Gudang Pusat (1 node, di titik pusat)
- **Inner Ring:** Gudang lainnya (distribusi melingkar di radius ~18% dari canvas)
- **Outer Ring:** Semua Cabang Tujuan (distribusi melingkar di radius ~40% dari canvas)
- Canvas auto-scales berdasarkan jumlah total node
- ViewBox dinamis mengikuti bounding box semua node + padding

#### 3.2.2. Toolbar (Atas Canvas)

- **Legend:**
  - ● Gudang Pusat (kuning/gold dot)
  - ● Cabang Tujuan (cyan dot)
  - ― Rute Aktif (garis cyan)
- **Info badge:** "{N} node · {M} edge" (mono font, small)
- **Tombol Reset Posisi:** untuk reset pan/offset canvas ke center

#### 3.2.3. Interaksi Canvas

- **Pan/Drag:** klik & geser untuk menggeser seluruh canvas (drag whole SVG)
- Cursor berubah menjadi `grab` saat idle, `grabbing` saat drag
- Tombol "Reset Posisi" yang berubah text jadi "Menggeser..." saat sedang drag
- **Hint overlay** di bawah canvas: "👆 Klik & geser untuk memindahkan graf"

#### 3.2.4. Background Canvas
- Grid pattern overlay (subtle, untuk kesan teknikal/engineering)
- Radial glow di center (biru subtle, untuk depth)
- Dark background (lebih gelap dari background umum)

#### 3.2.5. Info Cards (Bawah Canvas — 3 kartu)

| # | Judul | Konten Deskripsi |
|---|-------|------------------|
| 1 | Topologi Jaringan | "Graf berarah (directed graph) dengan {N} simpul dan {M} sisi. Setiap edge merepresentasikan rute distribusi dengan bobot jarak." |
| 2 | Struktur Data | "Dua representasi paralel: Adjacency Matrix (O(V²)) untuk lookup cepat, dan Adjacency List (O(V+E)) untuk efisiensi memori." |
| 3 | Visualisasi | "Layout radial: Gudang pusat di tengah, cabang di ring luar. Edge lengkung menunjukkan arah distribusi dari pusat ke tujuan." |

Setiap card: icon + judul + deskripsi teks

---

### 3.3. PENCARIAN RUTE (`search`)

Halaman untuk mencari/mengecek apakah ada rute langsung antara dua lokasi.

#### 3.3.1. Form Pencarian

**Layout:** 3 kolom — `[Lokasi Asal] → [Lokasi Tujuan]`

- **Dropdown Lokasi Asal:**
  - Placeholder: "— Pilih lokasi asal —"
  - Options: semua lokasi, format `[ID] Nama Lokasi (Tipe)` (contoh: "[001] Gudang Pusat Jakarta (Gudang)")
  - Icon: 📍 MapPin di label
  
- **Panah pemisah** di tengah (→ arrow icon)

- **Dropdown Lokasi Tujuan:**
  - Sama formatnya dengan Asal
  - Placeholder: "— Pilih lokasi tujuan —"

- **Tombol Cari Rute:**
  - Primary button style
  - Disabled jika salah satu dropdown belum dipilih
  - Icon: 🔍 Search
  - Text: "Cari Rute"

- **Tombol Reset:**
  - Secondary/ghost button
  - Text: "Reset"
  - Mengosongkan kedua dropdown dan menyembunyikan result

#### 3.3.2. Panel Hasil Pencarian (Conditional Render)

**Jika Rute DITEMUKAN:**
- Header: icon ✅ CheckCircle (hijau, large) + judul "**Rute Ditemukan!**" (hijau)
- Sub-header: "Rute dari {Nama Asal} ke {Nama Tujuan} tersedia dalam database."
- Detail Grid (2x2 atau auto-fit):
  - **Asal:** value = ID asal, sub = nama lokasi
  - **Tujuan:** value = ID tujuan, sub = nama lokasi
  - **Jarak:** value = "{X} km" (highlighted, large, cyan, mono font), sub = null
  - **Status:** value = "Aktif", sub = green pulse dot + "Aktif"
- Warna border/background tema hijau (success)

**Jika Rute TIDAK DITEMUKAN:**
- Header: icon ❌ XCircle (merah, large) + judul "**Rute Tidak Ditemukan**" (merah)
- Sub-header: "Tidak ada rute langsung dari {Nama Asal} ke {Nama Tujuan}."
- Info box: icon 🕐 Clock + text "Tambahkan rute baru melalui menu **Data Rute → Tambah Rute** jika rute ini memang diperlukan untuk operasional distribusi."
- Warna border/background tema merah (error)

**Animasi:** Panel hasil muncul dengan spring animation (scale + fade). Hilang saat reset.

---

### 3.4. DATA LOKASI (`locations`)

Halaman CRUD untuk master data lokasi (Create, Read, Update, Delete).

#### 3.4.1. Toolbar

- **Kiri:** Search input dengan icon 🔍
  - Placeholder: "Cari lokasi..."
  - Filter real-time: mencocokkan nama lokasi (case-insensitive) DAN ID lokasi
- **Kanan:** Tombol "Tambah Lokasi" (primary, icon ➕ Plus)
  - Saat diklik: toggle form tambah (expand/collapse)
  - Saat form terbuka: tombol berubah jadi "Batal" (icon ✕ X)

#### 3.4.2. Form Tambah Lokasi (Collapsible)

Muncul saat tombol "Tambah Lokasi" diklik (animasi expand height):

- Header: icon 📍 + judul "Tambah Lokasi Baru"
- **3 field dalam 1 row:**
  1. **Nama Lokasi** (text input, lebar penuh)
     - Placeholder: "Contoh: Cabang Bandung"
     - Submit on Enter key
  2. **Tipe** (select dropdown, fixed width ~200px)
     - Option "Gudang": "🏭 Gudang Pusat"
     - Option "Tujuan": "📍 Cabang Tujuan"
  3. **Tombol Simpan** (icon ✓ Check)
     - Disabled jika nama kosong
     - Height sama dengan input fields (48px)

#### 3.4.3. Card Grid (Tampilan Data)

Grid kartu responsif (auto-fill, min-width ~240px):

**Setiap Kartu Lokasi:**
- **Color coding by tipe:**
  - Gudang: tema kuning/amber (background gradient, border, icon)
  - Tujuan: tema cyan (background gradient, border, icon)
- **Header bar:**
  - Kiri: icon dalam rounded square (🏭 Warehouse untuk Gudang, 🏢 Building2 untuk Tujuan)
  - Kanan: badge tipe ("GUDANG" atau "TUJUAN", uppercase, small, rounded pill)
- **Body:**
  - ID: format "#001", large, bold, mono font, color sesuai tipe
  - Nama: bisa di-click untuk **inline edit** (input replaces text, auto-save on blur/Enter)
- **Footer actions (dipisahkan garis tipis):**
  - Tombol "Edit" (icon ✏️ Edit3) — trigger inline edit nama
  - Tombol "Hapus" (icon 🗑️ Trash2) — delete lokasi + semua rute terkait
- **Hover effect:** kartu terangkat sedikit (translateY -3px) + glow
- **Animasi masuk:** staggered (setiap kartu muncul bergantian dengan delay)
- **Animasi keluar:** scale down + fade saat hapus

#### 3.4.4. Empty State

Jika tidak ada data (atau filter menghasilkan 0 result):
- Icon 📍 besar (44px, muted)
- Teks: "Belum ada lokasi"
- Sub-teks: "Tambahkan lokasi pertama untuk memulai"

#### 3.4.5. Count Footer

- Teks: "Menampilkan {filtered} dari {total} lokasi" (mono font, small, muted)

---

### 3.5. DATA RUTE (`routes`)

Halaman CRUD untuk master data rute distribusi.

#### 3.5.1. Toolbar

- **Kiri:** Search input dengan icon 🔍
  - Placeholder: "Cari rute..."
  - Filter real-time: cocokkan ID asal, ID tujuan, ATAU jarak
- **Kanan:** Tombol "Tambah Rute" (primary, icon ➕ Plus, warna ungu/purple)
  - Toggle behavior sama seperti LocationTable

#### 3.5.2. Form Tambah Rute (Collapsible)

- Header: icon ➕ + judul "Tambah Rute Baru"
- **4 field dalam 1 row:**
  1. **Asal** (select dropdown): daftar semua lokasi, format "[ID] Nama"
  2. **Tujuan** (select dropdown): sama
  3. **Jarak (km)** (number input, fixed width ~140px, mono font, bold)
     - Min: 1, placeholder: "km"
  4. **Tombol Simpan** (icon ✓ Check, purple theme)
     - Disabled jika ada field kosong

#### 3.5.3. Data Table (Tampilan Data)

Table dengan kolom:

| Kolom | Isi | Style |
|-------|-----|-------|
| **ID** | Badge format "#001" (cyan, mono font, small rounded) | — |
| **Asal** | Dot hijau + ID (bold) + Nama lokasi (truncated, max 120px, tooltip full name) | Dot = indikator source |
| **Tujuan** | Dot merah + ID (bold) + Nama lokasi (truncated, max 120px, tooltip full name) | Dot = indikator target |
| **Jarak** | "{X} km" (cyan, mono font, bold) — **clickable untuk inline edit** | Saat edit: input number replace text |
| **Aksi** | 2 tombol: Edit (✏️) + Hapus (🗑️) | Align right |

**Fitur Table:**
- **Sortable headers:** klik header kolom ID, Asal, Tujuan, atau Jarak untuk sort
  - Toggle: asc ↔ desc
  - Indikator: icon sort (↑ ascending cyan, ↓ descending cyan, ⇅ neutral muted)
- **Hover row:** highlight background
- **Animasi row masuk:** staggered slide-in dari kiri
- **Horizontal scroll** jika overflow (responsive)
- **Inline edit jarak:** klik nilai jarak → muncul input number → auto-save on blur/Enter

#### 3.5.4. Empty State

- Icon 🔍 besar (44px, muted)
- Teks: "Tidak ada rute ditemukan"
- Sub-teks: (jika ada search query) "Coba kata kunci lain" / (jika kosong) "Tambahkan rute pertama untuk memulai"

#### 3.5.5. Table Footer

- Kiri: "Menampilkan {filtered} dari {total} rute" (mono font)
- Kanan: "Sort: {field} ({direction})"

---

### 3.6. BENCHMARK (`benchmark`)

Halaman perbandingan performa Adjacency Matrix vs Adjacency List.

#### 3.6.1. Chart Container (Area Besar)

**Header:**
- Judul: "Benchmark Performa"
- Sub-judul: "Perbandingan Adjacency Matrix vs Adjacency List"

**Toggle Controls (2 tombol):**
1. **Toggle Chart Type:** "Bar" ↔ "Line" (icon 📊 BarChart3 / 📈 LineIcon)
2. **Toggle Data Type:** "Waktu" ↔ "Memori" (icon 🕐 Clock / 💾 MemoryStick)
- Active state jelas, warna berbeda per toggle

#### 3.6.2. Chart Mode: Waktu (Time Comparison)

**Bar Chart (default):**
- **X-axis:** 6 operasi (categories):
  1. "Search (exist)"
  2. "Search (none)"
  3. "Insert (exist node)"
  4. "Update"
  5. "Delete"
  6. "Traverse All"
- **Y-axis:** waktu dalam microsecond (μs), skala otomatis 0-max
- **2 bar per category:**
  - **Adjacency Matrix** (biru, gradient: dark→light bottom→top)
  - **Adjacency List** (cyan, gradient: dark→light bottom→top)
- Value label di atas setiap bar (angka, 10px, mono font, bold)
- Grid lines horizontal (subtle)
- Animasi: bars grow dari bawah ke atas secara staggered

**Line Chart (alternate mode):**
- 2 line: Matrix (biru) dan List (cyan)
- Data point circles di setiap intersection
- Gradient fill di bawah line (transparan→solid)
- Animated path draw-in

**Legend (bawah chart):**
- ■ Adjacency Matrix (biru)
- ■ Adjacency List (cyan)

**Data Source:** Di-load dari `/benchmark_results.json` (generated oleh C++ backend). Fallback ke hardcoded default data jika file tidak ada.

Default data:
```
Search (exist):    Matrix=0.5μs,  List=2.1μs
Search (none):     Matrix=0.4μs,  List=2.0μs
Insert:            Matrix=0.6μs,  List=1.2μs
Update:            Matrix=0.7μs,  List=1.8μs
Delete:            Matrix=0.6μs,  List=1.5μs
Traverse All:      Matrix=12.5μs, List=3.2μs
```

#### 3.6.3. Chart Mode: Memori (Memory Comparison)

- **2 vertical bars side-by-side:**
  - Adjacency Matrix: tinggi proporsional bytes (O(V²) * 8 bytes/double)
  - Adjacency List: tinggi proporsional bytes (O(V+E) * ~24 bytes/entry)
- Value di atas bar: "{X} B" (large, bold, mono font)
- Persentase di bawah bar
- Animasi grow dari bawah

#### 3.6.4. Analysis Cards (4 kartu di bawah chart)

| # | Judul | Sub-judul | Deskripsi | Warna |
|---|-------|-----------|-----------|-------|
| 1 | Pemenang Operasi Baca | Adjacency Matrix | "Akses langsung O(1) via indeks array 2D. Sangat cepat untuk lookup edge tunggal." | Biru |
| 2 | Pemenang Efisiensi Ruang | Adjacency List | "Hanya menyimpan O(V+E) elemen vs O(V²). Jauh lebih hemat memori untuk graf sparse." | Cyan |
| 3 | Trade-off Matrix | Resize Mahal | "Penambahan node baru = realokasi seluruh matriks O(V²). Tidak efisien untuk graf dinamis." | Amber/Kuning |
| 4 | Trade-off List | Scan Lebih Lambat | "Pencarian edge perlu iterasi adjacency list O(degree). Lebih lambat dari Matrix untuk lookup." | Merah/Rose |

Setiap card: icon (rounded square, colored bg) + judul + sub-judul (colored) + deskripsi (muted text)

#### 3.6.5. Loading State

- Shimmer/skeleton loading placeholder (animated gradient strip)
- Tinggi ~400px, rounded
- Duration: ~800ms simulated load

---

## 4. DATA MASTER (HARUS DI-PRELOAD)

### 4.1. Default Locations (20 lokasi)

```javascript
[
  { id: "L001", nama: "Gudang Pusat Jakarta",       tipe: "Gudang" },
  { id: "L002", nama: "Gudang Transit Bekasi",       tipe: "Gudang" },
  { id: "L003", nama: "Gudang Regional Bandung",     tipe: "Gudang" },
  { id: "L004", nama: "Cabang Jakarta Selatan",      tipe: "Tujuan" },
  { id: "L005", nama: "Cabang Jakarta Barat",        tipe: "Tujuan" },
  { id: "L006", nama: "Cabang Jakarta Timur",        tipe: "Tujuan" },
  { id: "L007", nama: "Cabang Jakarta Utara",        tipe: "Tujuan" },
  { id: "L008", nama: "Cabang Depok Margonda",       tipe: "Tujuan" },
  { id: "L009", nama: "Cabang Bogor Selatan",        tipe: "Tujuan" },
  { id: "L010", nama: "Cabang Bogor Utara",          tipe: "Tujuan" },
  { id: "L011", nama: "Cabang Tangerang Kota",       tipe: "Tujuan" },
  { id: "L012", nama: "Cabang Tangerang Selatan",    tipe: "Tujuan" },
  { id: "L013", nama: "Cabang Bekasi Timur",         tipe: "Tujuan" },
  { id: "L014", nama: "Cabang Bekasi Barat",         tipe: "Tujuan" },
  { id: "L015", nama: "Cabang Karawang",             tipe: "Tujuan" },
  { id: "L016", nama: "Cabang Cikarang",             tipe: "Tujuan" },
  { id: "L017", nama: "Cabang Serpong",              tipe: "Tujuan" },
  { id: "L018", nama: "Cabang Cileungsi",            tipe: "Tujuan" },
  { id: "L019", nama: "Cabang Cibinong",             tipe: "Tujuan" },
  { id: "L020", nama: "Cabang Pamulang",             tipe: "Tujuan" },
]
```

### 4.2. Default Routes (40 rute)

```javascript
[
  { id: "R001", asal: "L001", tujuan: "L004", jarak: 15 },
  { id: "R002", asal: "L001", tujuan: "L005", jarak: 18 },
  { id: "R003", asal: "L001", tujuan: "L006", jarak: 22 },
  { id: "R004", asal: "L001", tujuan: "L007", jarak: 12 },
  { id: "R005", asal: "L001", tujuan: "L008", jarak: 30 },
  { id: "R006", asal: "L001", tujuan: "L009", jarak: 45 },
  { id: "R007", asal: "L001", tujuan: "L010", jarak: 50 },
  { id: "R008", asal: "L001", tujuan: "L011", jarak: 28 },
  { id: "R009", asal: "L001", tujuan: "L012", jarak: 35 },
  { id: "R010", asal: "L002", tujuan: "L013", jarak: 20 },
  { id: "R011", asal: "L002", tujuan: "L014", jarak: 25 },
  { id: "R012", asal: "L002", tujuan: "L015", jarak: 40 },
  { id: "R013", asal: "L002", tujuan: "L016", jarak: 15 },
  { id: "R014", asal: "L002", tujuan: "L017", jarak: 32 },
  { id: "R015", asal: "L003", tujuan: "L009", jarak: 20 },
  { id: "R016", asal: "L003", tujuan: "L010", jarak: 25 },
  { id: "R017", asal: "L003", tujuan: "L011", jarak: 35 },
  { id: "R018", asal: "L003", tujuan: "L012", jarak: 42 },
  { id: "R019", asal: "L003", tujuan: "L018", jarak: 55 },
  { id: "R020", asal: "L004", tujuan: "L005", jarak: 10 },
  { id: "R021", asal: "L004", tujuan: "L006", jarak: 14 },
  { id: "R022", asal: "L004", tujuan: "L008", jarak: 18 },
  { id: "R023", asal: "L005", tujuan: "L007", jarak: 16 },
  { id: "R024", asal: "L006", tujuan: "L007", jarak: 11 },
  { id: "R025", asal: "L008", tujuan: "L009", jarak: 18 },
  { id: "R026", asal: "L009", tujuan: "L010", jarak: 8 },
  { id: "R027", asal: "L011", tujuan: "L012", jarak: 12 },
  { id: "R028", asal: "L011", tujuan: "L013", jarak: 22 },
  { id: "R029", asal: "L013", tujuan: "L014", jarak: 10 },
  { id: "R030", asal: "L014", tujuan: "L015", jarak: 18 },
  { id: "R031", asal: "L015", tujuan: "L016", jarak: 14 },
  { id: "R032", asal: "L016", tujuan: "L017", jarak: 8 },
  { id: "R033", asal: "L017", tujuan: "L018", jarak: 15 },
  { id: "R034", asal: "L018", tujuan: "L019", jarak: 7 },
  { id: "R035", asal: "L019", tujuan: "L020", jarak: 12 },
  { id: "R036", asal: "L007", tujuan: "L013", jarak: 30 },
  { id: "R037", asal: "L010", tujuan: "L017", jarak: 38 },
  { id: "R038", asal: "L012", tujuan: "L019", jarak: 25 },
  { id: "R039", asal: "L014", tujuan: "L020", jarak: 22 },
  { id: "R040", asal: "L008", tujuan: "L018", jarak: 28 },
]
```

### 4.3. Benchmark Data (Default/Fallback)

Jika `/benchmark_results.json` tidak available, gunakan data default di atas (section 3.6.2).

---

## 5. INTERAKSI & BEHAVIOR YANG HARUS ADA

### 5.1. Navigasi
- Tab switching dengan **animasi transisi** (fade + slide antar halaman)
- Active tab indicator yang jelas (color fill, underline, atau background change)
- URL tidak perlu berubah (client-side only, no routing library required)

### 5.2. CRUD Operations
- **Create:** Form collapsible → validasi → tambah ke state → toast success → animasi entry item baru
- **Read:** Tampilkan semua data dengan search/filter real-time
- **Update:** Inline edit (klik field → edit → blur/Enter → save) → toast success
- **Delete:** Konfirmasi visual (minimal) → hapus dari state → animasi exit → toast success (+ cascade: hapus rute terkait saat hapus lokasi)

### 5.3. Toast Notification System
- Triggered oleh: addLocation, updateLocation, deleteLocation, addRoute, updateRoute, deleteRoute
- Types: `success` (default), `error`, `warning`
- Position: fixed top-right
- Auto-dismiss: 3 detik
- Stackable: multiple toasts can appear

### 5.4. Search & Filter
- Location page: filter by nama (contains, case-insensitive) OR ID (contains)
- Route page: filter by asal ID OR tujuan ID OR jarak (contains string match)
- Real-time (saat ketik langsung filter, tanpa tombol submit)
- Show count: "Menampilkan X dari Y"

### 5.5. Sorting (Route Table Only)
- Sortable columns: ID, Asal, Tujuan, Jarak
- Click header → toggle asc/desc
- Visual indicator arah sort
- Persist current sort field + direction in footer

### 5.6. Graph Interactions
- **Pan:** click+drag canvas untuk geser seluruh graf
- **Reset:** tombol reset posisi ke center
- **Cursor feedback:** grab → grabbing saat drag
- **Status text:** "Menggeser..." saat drag aktif

---

## 6. RESPONSIVE BREAKPOINTS

| Breakpoint | Lebar | Perilaku |
|------------|-------|----------|
| **Desktop** | > 1024px | Full navigation pills visible, grid multi-kolom, table normal |
| **Tablet** | 641px – 1024px | Nav pills hidden → hamburger menu, grid 2-3 kolom, table scroll horizontal |
| **Mobile** | ≤ 640px | Hamburger drawer, grid 2 kolom / stacked, compact spacing, footer stacked |

Spesifik:
- Header: logo tetapi text lebih kecil, nav jadi hamburger
- Page header: flex-wrap, stats chips full width
- Dashboard stat cards: 3 → 2 → 2 kolom
- Graph: full width, touch-friendly pan
- Search form: stacked (dropdown atas-bawah, bukan kiri-kanan)
- Location cards: 2 kolom / 1 kolom
- Route table: horizontal scroll
- Benchmark chart: simplified, maybe smaller
- Footer: stacked vertically

---

## 7. OUTPUT YANG DIHARAPKAN

AI harus menghasilkan:

1. **File HTML/CSS/JS lengkap** (atau React components jika menggunakan framework) yang merupakan redesign TOTAL dari aplikasi ini
2. **Semua 6 halaman** fully functional dengan interaksi
3. **Desain yang konsisten** di seluruh halaman (design system yang koheren)
4. **Responsive** di 3 breakpoint (desktop, tablet, mobile)
5. **Animasi & transisi** yang smooth dan modern
6. **Data sudah terisi** dengan 20 lokasi + 40 rute (tidak perlu empty state secara default)

### Yang BOLEH diubah/bebas:
- ✅ Shade biru exact yang dipakai (navy? royal? sky? electric? — pilih yang paling cocok)
- ✅ Kombinasi gradient biru (monochrome blue gradient atau blue → lighter-blue accent)
- ✅ Font / typography pilihan (yang penting: modern, clean, highly readable, sans-serif untuk UI)
- ✅ Detail spacing scale (yang penting: **generous & consistent**, base 8px, jangan sesak)
- ✅ Border radius specifics (yang penting: **8-16px, konsisten** di seluruh komponen)
- ✅ Shadow style & depth (yang penting: **soft multi-layer**, natural, bukan flat tanpa depth)
- ✅ Animation library dan style (yang penting: **smooth, 200-300ms ease**, tidak berlebihan/cheesy)
- ✅ Icon set (outline/filled/duotone — yang penting: **satu gaya konsisten** di seluruh app)
- ✅ Subtle design flourishes (soft glassmorphism ringan pada cards, gradient text untuk judul utama, subtle dot-pattern atau noise texture pada background, dsb — **selama mendukung & memperkuat tema white+blue**)
- ✅ Layout structure selama semua fitur tertampung dengan **rapi, spacious, dan well-organized**
- ✅ Chart library / visualisasi approach (yang penting: clean, readable, on-brand biru)
- ✅ CSS approach (Tailwind, plain CSS, CSS-in-JS, styled-components, dll)
- ✅ Framework (React, Vue, Svelte, vanilla JS, dsb — asalkan hasilnya SPA)

### Yang TIDAK BOLEH diubah/dihapus:
- ❌ **Tema warna dasar: HARUS PUTIH (LIGHT) + BIRU** — tidak boleh dark mode, tidak boleh tema gelap, tidak boleh background gelap, tidak boleh dominasi warna selain biru sebagai aksen utama
- ❌ Jumlah halaman/tab (harus tetap 6)
- ❌ Fitur apa pun yang sudah dijelaskan di atas
- ❌ Data fields (lokasi: id, nama, tipe; rute: id, asal, tujuan, jarak)
- ❌ Bahasa Indonesia sebagai bahasa UI
- ❌ Informasi proyek/anggota di footer
- ❌ Fungsionalitas CRUD, search, sort, benchmark comparison
- ❌ **Kualitas desain** — tidak boleh tampak seperti template murahan, cluttered/tidak rapi, terlalu padat, atau seperti tugas siswa biasa. Harus terlihat seperti **produk professional**.

---

## 8. TIPS UNTUK AI DESIGNER

- Ini adalah **proyek akademik mata kuliah Struktur Data**, jadi desainnya harus terlihat **profesional, teknikal, dan layak presentasi** di depan dosen dan kelas
- **White + Blue theme = kesan corporate/enterprise yang trustworthy & intelligent** — pikirkan tampilan seperti **dashboard Vercel, Linear App, Stripe Dashboard, Notion, Raycast, Tailwind UI website, shadcn/ui**. Semuanya menggunakan pendekatan **light/clean dengan aksen warna yang confident**. Bersih, tajam, authoritative, modern.
- Gunakan **biru dengan percaya diri** — biru = trust, technology, intelligence, stability, precision. Ini warna sempurna untuk proyek struktur data & algoritma. Jangan takut membuat biru sebagai "warna bintang" di aplikasi ini.
- **Putih/bright background** memberi kesan **ringan, modern, open, dan membuat konten/data menjadi fokus utama**. Hindari dark mode yang terkesan "developer tool", "gaming", atau "hacker theme". Light mode = lebih sulup diterima audience luas (dosen, reviewer, recruiter).
- **Depth melalui shadow, bukan warna background** — karena backgroundnya terang/putih, gunakan **soft multi-layer box-shadow** untuk menciptakan elevasi pada cards, panels, dan components. Contoh: `box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)` untuk card; `0 4px 20px rgba(37,99,235,0.10)` untuk hover/elevated state.
- Untuk perbandingan **Matrix vs List**, gunakan **dua shade biru yang distinguishable** — misal: **deep navy/blue (`#1E40AF` / `#2563EB`)** untuk Adjacency Matrix, dan **bright sky/cyan blue (`#0EA5E9` / `#06B6D4`)** untuk Adjacency List. Dengan cara ini perbandingan visual tetap on-brand (biru vs biru) tapi tetap jelas terbedakan.
- Graf visual adalah **wow factor** — node biru-gradient dengan shadow lembut di atas canvas putih/very-light-gray akan terlihat **sangat clean, professional, dan modern**. Jauh lebih baik daripada dark theme untuk keperluan presentasi akademik.
- Target audience: **dosen Struktur Data** (harus terkesan & mudah baca data), **teman sekelas** (harus wow), **potential future recruiter** (harus terlihat seperti skill nyata). Desain white+blue adalah *safe bet* yang tetap impressive.
- Aplikasi akan di-demo di **web browser** — pastikan performa smooth (tidak laggy), animasi tidak berat, dan rendering graf SVG cepat.
- **📌 Referensi visual yang sangat direkomendasikan (pelajari vibe-nya):**
  - **Vercel Dashboard** — clean white+blue, excellent spacing, subtle shadows
  - **Linear App** — pristine typography, perfect hierarchy, blue accent done right
  - **Stripe Dashboard** — professional data presentation, clean tables, polished forms
  - **Notion** — white base, subtle blues, excellent information density
  - **Raycast** — sharp, modern, confident use of color
  - **Tailwind UI / shadcn/ui** — component design patterns yang clean & modern
  - **HeroUI (formerly HeroUI)** — modern blue-themed component library
