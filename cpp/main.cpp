












#include <iostream>
#include <vector>
#include <string>
#include <fstream>
#include <sstream>
#include <unordered_map>
#include <map>
#include <functional>
#include <list>
#include <algorithm>
#include <iomanip>
#include <chrono>
#include <cmath>
#include <cfloat>
#include <limits>
#include <random>
#ifdef _WIN32
#include <windows.h>
#endif

using namespace std;
using namespace chrono;





struct Lokasi {
    string id_lokasi;
    string nama_lokasi;
    string tipe_lokasi; 
};

struct Rute {
    string id_rute;
    string id_asal;
    string id_tujuan;
    double jarak_km;
};

struct Edge {
    string tujuan;
    double jarak_km;
};

struct BenchmarkResult {
    string operation;
    string structure;
    long long microseconds;
    size_t memory_bytes;
};





class ManajemenRute {
private:
    
    unordered_map<string, Lokasi> data_lokasi;
    vector<Rute> data_rute;

    
    
    vector<vector<double>> adjMatrix;
    
    
    
    unordered_map<string, vector<Edge>> adjListMap;   
    map<string, vector<Edge>> adjListOrdered;          

    
    unordered_map<string, int> lokasiToIndex;
    vector<string> indexToLokasi;

    
    string pathLokasi;
    string pathRute;

    

     
public:
    static string trim(const string& str) {
        size_t first = str.find_first_not_of(" \t\r\n");
        if (first == string::npos) return "";
        size_t last = str.find_last_not_of(" \t\r\n");
        return str.substr(first, last - first + 1);
    }

    



    bool ensureNodeExists(const string& id) {
        if (lokasiToIndex.count(id)) return false;

        int newIndex = (int)indexToLokasi.size();
        lokasiToIndex[id] = newIndex;
        indexToLokasi.push_back(id);

        
        size_t newSize = indexToLokasi.size();
        adjMatrix.resize(newSize);
        for (auto& row : adjMatrix) {
            row.resize(newSize, 0.0);
        }
        return true;
    }

public:
    ManajemenRute() {}

    
    
    

    






    void generateLargeData(int numNodes = 500, int numEdges = 2500) {
        cout << "\n";
        cout << "  ################################################################\n";
        cout << "  #           GENERATE DATA BESAR UNTUK BENCHMARK               #\n";
        cout << "  ################################################################\n\n";

        
        data_lokasi.clear();
        data_rute.clear();
        lokasiToIndex.clear();
        indexToLokasi.clear();
        adjMatrix.clear();
        adjListMap.clear();
        adjListOrdered.clear();

        mt19937 rng(42); 
        uniform_real_distribution<double> distJarak(5.0, 200.0);
        uniform_int_distribution<int> distInt;

        
        
        int numGudang = max(3, numNodes / 50);  
        int numTransit = max(2, numNodes / 25);  

        vector<string> kotaJawa = {
            "Jakarta", "Bekasi", "Depok", "Bogor", "Tangerang", "Tangerang Selatan",
            "Bandung", "Cimahi", "Sumedang", "Garut", "Cirebon", "Indramayu",
            "Subang", "Purwakarta", "Karawang", "Cikarang", "Serpong", "Cileungsi",
            "Cibinong", "Pamulang", "Bekasi Timur", "Bekasi Barat", "Bogor Selatan",
            "Bogor Utara", "Tangerang Kota", "Jakarta Selatan", "Jakarta Barat",
            "Jakarta Timur", "Jakarta Utara", "Margonda", "Sukarno-Hatta", "Cengkareng",
            "Rawamangun", "Tanah Abang", "Manggarai", "Pondok Indah", "Kemang",
            "Kelapa Gading", "Pluit", "Pulo Gadung", "Cawang", "Kuningan",
            "Sudirman", "Thamrin", "Grogol", "Tanjung Priok", "Cilandak",
            "Pasar Minggu", "Kebayoran", "Lebak Bulus", "Pondok Gede", "Cijantung",
            "Cipayung", "Cinere", "Parung", "Ciampea", "Darmaga", "Sukasari",
            "Setiabudi", "Coblong", "Sukajadi", "Arcamanik", "Antapani", "Cicaheum",
            "Ujung Berung", "Cibiru", "Cileunyi", "Jatinangor", "Padalarang",
            "Lembang", "Soreang", "Banjaran", "Majalaya", "Rancaekek", "Cicalengka",
            "Kuningan", "Ciamis", "Tasikmalaya", "Singaparna", "Pelabuhan Ratu",
            "Sukabumi", "Cianjur", "Sukabumi Kota", "Palabuhanratu", "Citeureup"
        };

        
        string idGudangPusat = "L001";
        {
            Lokasi loc;
            loc.id_lokasi = idGudangPusat;
            loc.nama_lokasi = "Gudang Pusat Jakarta";
            loc.tipe_lokasi = "Gudang";
            data_lokasi[idGudangPusat] = loc;
            ensureNodeExists(idGudangPusat);
        }

        
        for (int i = 1; i < numGudang; i++) {
            string id = (i < 10) ? "L00" + to_string(i + 1) : "L0" + to_string(i + 1);
            if (i >= 99) id = "L" + to_string(i + 1);
            int kotaIdx = i % kotaJawa.size();
            Lokasi loc;
            loc.id_lokasi = id;
            loc.nama_lokasi = "Gudang Regional " + kotaJawa[kotaIdx];
            loc.tipe_lokasi = "Gudang";
            data_lokasi[id] = loc;
            ensureNodeExists(id);
        }

        
        for (int i = 0; i < numTransit; i++) {
            string idxStr = to_string(numGudang + i + 1);
            string id = (idxStr.length() == 1) ? "L00" + idxStr :
                        (idxStr.length() == 2) ? "L0" + idxStr : "L" + idxStr;
            int ktaIdx = (numGudang + i) % kotaJawa.size();
            Lokasi loc;
            loc.id_lokasi = id;
            loc.nama_lokasi = "Gudang Transit " + kotaJawa[ktaIdx];
            loc.tipe_lokasi = "Gudang";
            data_lokasi[id] = loc;
            ensureNodeExists(id);
        }

        
        int baseId = numGudang + numTransit + 1;
        for (int i = 0; i < (numNodes - numGudang - numTransit); i++) {
            string idxStr = to_string(baseId + i);
            string id = (idxStr.length() <= 2) ? string(3 - idxStr.length(), '0') + idxStr : idxStr;
            if (id.length() <= 3) id = "L" + string(3 - id.length(), '0') + id;
            else id = "L" + idxStr;
            int ktaIdx = (baseId + i) % kotaJawa.size();
            int cabNum = ((baseId + i) / kotaJawa.size()) + 1;
            Lokasi loc;
            loc.id_lokasi = id;
            loc.nama_lokasi = "Cabang " + kotaJawa[ktaIdx] + (cabNum > 1 ? " #" + to_string(cabNum) : "");
            loc.tipe_lokasi = "Tujuan";
            data_lokasi[id] = loc;
            ensureNodeExists(id);
        }

        cout << "  [OK] Generated " << data_lokasi.size() << " lokasi ("
             << numGudang << " Gudang, " << numTransit << " Transit, "
             << (numNodes - numGudang - numTransit) << " Cabang)\n";

        
        
        vector<string> allIds;
        allIds.reserve(data_lokasi.size());
        for (const auto& p : data_lokasi) allIds.push_back(p.first);

        
        int hubEdges = min(numEdges / 5, numGudang + numTransit);
        for (int i = 1; i < (int)allIds.size() && (int)data_rute.size() < hubEdges; i++) {
            if (data_lokasi[allIds[i]].tipe_lokasi == "Gudang") {
                string rid = "R" + to_string((int)data_rute.size() + 1);
                double jrk = distJarak(rng);
                Rute r = {rid, allIds[0], allIds[i], jrk};
                data_rute.push_back(r);
                addEdgeToStructures(allIds[0], allIds[i], jrk);
            }
        }

        
        int regionalEdges = min(numEdges * 2 / 3, (int)(numEdges * 0.6));
        while ((int)data_rute.size() < regionalEdges) {
            int srcIdx = distInt(rng) % min(numGudang + numTransit, (int)allIds.size());
            int dstIdx = numGudang + numTransit + (distInt(rng) % max(1, numNodes - numGudang - numTransit));
            if (dstIdx >= (int)allIds.size()) dstIdx = (int)allIds.size() - 1;
            if (srcIdx == dstIdx) continue;

            string src = allIds[srcIdx];
            string dst = allIds[dstIdx];

            
            bool exists = false;
            for (const auto& e : adjListMap[src]) {
                if (e.tujuan == dst) { exists = true; break; }
            }
            if (exists) continue;

            string rid = "R" + to_string((int)data_rute.size() + 1);
            double jrk = distJarak(rng);
            Rute r = {rid, src, dst, jrk};
            data_rute.push_back(r);
            addEdgeToStructures(src, dst, jrk);
        }

        
        while ((int)data_rute.size() < numEdges) {
            int srcIdx = numGudang + numTransit + (distInt(rng) % max(1, numNodes - numGudang - numTransit));
            int dstIdx = numGudang + numTransit + (distInt(rng) % max(1, numNodes - numGudang - numTransit));
            if (srcIdx >= (int)allIds.size()) srcIdx = (int)allIds.size() - 1;
            if (dstIdx >= (int)allIds.size()) dstIdx = (int)allIds.size() - 1;
            if (srcIdx == dstIdx) continue;

            string src = allIds[srcIdx];
            string dst = allIds[dstIdx];

            bool exists = false;
            for (const auto& e : adjListMap[src]) {
                if (e.tujuan == dst) { exists = true; break; }
            }
            if (exists) continue;

            string rid = "R" + to_string((int)data_rute.size() + 1);
            double jrk = distJarak(rng);
            Rute r = {rid, src, dst, jrk};
            data_rute.push_back(r);
            addEdgeToStructures(src, dst, jrk);
        }

        cout << "  [OK] Generated " << data_rute.size() << " rute distribusi\n";
        cout << "  [OK] Total V = " << data_lokasi.size() << ", E = " << data_rute.size()
             << ", Density = " << fixed << setprecision(2)
             << (double)data_rute.size() / (double)(data_lokasi.size() * (data_lokasi.size() - 1)) * 100.0 << "%\n";
        cout << "  [OK] Matrix size: " << (data_lokasi.size() * data_lokasi.size()) << " cells ("
             << formatBytes(sizeof(double) * data_lokasi.size() * data_lokasi.size()) << ")\n\n";
    }

public:
     
    void addEdgeToStructures(const string& asal, const string& tujuan, double jarak) {
        ensureNodeExists(asal);
        ensureNodeExists(tujuan);

        int idxAsal = lokasiToIndex[asal];
        int idxTujuan = lokasiToIndex[tujuan];
        adjMatrix[idxAsal][idxTujuan] = jarak;

        Edge e = {tujuan, jarak};
        adjListMap[asal].push_back(e);
        adjListOrdered[asal].push_back(e);
    }

    
    
    

    



    void muatDataLokasi(const string& nama_file) {
        pathLokasi = nama_file;
        ifstream file(nama_file);
        string line;

        if (!file.is_open()) {
            cout << "  [!] Gagal membuka file " << nama_file << endl;
            return;
        }

        
        getline(file, line);

        while (getline(file, line)) {
            if (line.empty()) continue;
            stringstream ss(line);
            Lokasi loc;

            getline(ss, loc.id_lokasi, ',');
            getline(ss, loc.nama_lokasi, ',');
            getline(ss, loc.tipe_lokasi, ',');

            loc.id_lokasi = trim(loc.id_lokasi);
            loc.nama_lokasi = trim(loc.nama_lokasi);
            loc.tipe_lokasi = trim(loc.tipe_lokasi);

            data_lokasi[loc.id_lokasi] = loc;
            ensureNodeExists(loc.id_lokasi);
        }
        file.close();

        cout << "  [OK] Data Lokasi dimuat: " << data_lokasi.size() << " lokasi.\n";
    }

    



    void muatDataRute(const string& nama_file) {
        pathRute = nama_file;
        ifstream file(nama_file);
        string line;

        if (!file.is_open()) {
            cout << "  [!] Gagal membuka file " << nama_file << endl;
            return;
        }

        
        getline(file, line);

        while (getline(file, line)) {
            if (line.empty()) continue;
            stringstream ss(line);
            Rute r;
            string jarak_str;

            getline(ss, r.id_rute, ',');
            getline(ss, r.id_asal, ',');
            getline(ss, r.id_tujuan, ',');
            getline(ss, jarak_str, ',');

            r.id_rute = trim(r.id_rute);
            r.id_asal = trim(r.id_asal);
            r.id_tujuan = trim(r.id_tujuan);
            r.jarak_km = stod(trim(jarak_str));

            
            data_rute.push_back(r);

            
            ensureNodeExists(r.id_asal);
            ensureNodeExists(r.id_tujuan);

            
            int idxAsal = lokasiToIndex[r.id_asal];
            int idxTujuan = lokasiToIndex[r.id_tujuan];
            adjMatrix[idxAsal][idxTujuan] = r.jarak_km;

            
            Edge e = {r.id_tujuan, r.jarak_km};
            adjListMap[r.id_asal].push_back(e);
            adjListOrdered[r.id_asal].push_back(e);
        }
        file.close();

        cout << "  [OK] Data Rute dimuat: " << data_rute.size() << " rute.\n";
    }

    
    
    

     
    bool tambahLokasi(const string& id, const string& nama, const string& tipe) {
        if (data_lokasi.count(id)) {
            cout << "  [!] Lokasi " << id << " sudah ada!\n";
            return false;
        }

        Lokasi loc = {id, nama, tipe};
        data_lokasi[id] = loc;
        bool resized = ensureNodeExists(id);

        cout << "  [OK] Lokasi '" << nama << "' (" << id << ") ditambahkan.";
        if (resized) cout << " [Matrix resized]";
        cout << endl;
        return true;
    }

     
    bool tambahRute(const string& id_rute, const string& asal,
                    const string& tujuan, double jarak) {
        
        if (!data_lokasi.count(asal)) {
            cout << "  [!] Lokasi asal " << asal << " tidak ditemukan!\n";
            return false;
        }
        if (!data_lokasi.count(tujuan)) {
            cout << "  [!] Lokasi tujuan " << tujuan << " tidak ditemukan!\n";
            return false;
        }

        
        for (const auto& r : data_rute) {
            if (r.id_rute == id_rute) {
                cout << "  [!] Rute " << id_rute << " sudah ada! Gunakan update.\n";
                return false;
            }
        }

        
        ensureNodeExists(asal);
        ensureNodeExists(tujuan);

        Rute r = {id_rute, asal, tujuan, jarak};
        data_rute.push_back(r);

        
        int idxAsal = lokasiToIndex[asal];
        int idxTujuan = lokasiToIndex[tujuan];
        adjMatrix[idxAsal][idxTujuan] = jarak;

        
        Edge e = {tujuan, jarak};
        adjListMap[asal].push_back(e);
        adjListOrdered[asal].push_back(e);

        cout << "  [OK] Rute " << id_rute << ": " << getNamaLokasi(asal)
             << " -> " << getNamaLokasi(tujuan)
             << " (" << jarak << " km) ditambahkan.\n";
        return true;
    }

     
    void cariRute(const string& asal, const string& tujuan) {
        if (!lokasiToIndex.count(asal) || !lokasiToIndex.count(tujuan)) {
            cout << "  [!] Salah satu atau kedua lokasi tidak ditemukan!\n";
            return;
        }

        cout << "\n  =============================================\n";
        cout << "  HASIL PENCARIAN RUTE\n";
        cout << "  =============================================\n";
        cout << "  Asal      : " << getNamaLokasi(asal) << " (" << asal << ")\n";
        cout << "  Tujuan    : " << getNamaLokasi(tujuan) << " (" << tujuan << ")\n";

        
        auto startMatrix = high_resolution_clock::now();
        int idxA = lokasiToIndex[asal];
        int idxB = lokasiToIndex[tujuan];
        double jarakMatrix = adjMatrix[idxA][idxB];
        auto endMatrix = high_resolution_clock::now();
        long durMatrix = duration_cast<microseconds>(endMatrix - startMatrix).count();

        
        auto startList = high_resolution_clock::now();
        double jarakList = 0.0;
        bool foundList = false;
        if (adjListMap.count(asal)) {
            for (const auto& edge : adjListMap[asal]) {
                if (edge.tujuan == tujuan) {
                    jarakList = edge.jarak_km;
                    foundList = true;
                    break;
                }
            }
        }
        auto endList = high_resolution_clock::now();
        long durList = duration_cast<microseconds>(endList - startList).count();

        cout << "  ---------------------------------------------\n";
        if (jarakMatrix > 0) {
            cout << "  >> Rute DITEMUKAN:\n";
            cout << "     Jarak      : " << jarakMatrix << " km\n";
            cout << "     Tipe Asal  : " << data_lokasi[asal].tipe_lokasi << "\n";
            cout << "     Tipe Tujuan: " << data_lokasi[tujuan].tipe_lokasi << "\n";
        } else {
            cout << "  [!] Rute TIDAK DITEMUKAN (tidak ada koneksi langsung)\n";
        }
        cout << "  ---------------------------------------------\n";
        cout << "  Performa Pencarian:\n";
        cout << "     Adjacency Matrix : " << durMatrix << " us (O(1))\n";
        cout << "     Adjacency List   : " << durList << " us (O(degree))\n";
        cout << "  =============================================\n\n";
    }

     
    void tampilkanRuteDari(const string& asal) {
        if (!lokasiToIndex.count(asal)) {
            cout << "  [!] Lokasi " << asal << " tidak ditemukan!\n";
            return;
        }

        cout << "\n  === Semua Rute dari " << getNamaLokasi(asal)
             << " (" << asal << ") ===\n";
        cout << "  " << left << setw(12) << "ID_Rute"
             << setw(25) << "Tujuan"
             << setw(10) << "Jarak(km)" << "\n";
        cout << "  " << string(47, '-') << "\n";

        int count = 0;
        if (adjListMap.count(asal)) {
            for (const auto& edge : adjListMap[asal]) {
                cout << "  " << left << setw(12) << "-"
                     << setw(25) << getNamaLokasi(edge.tujuan)
                     << setw(10) << fixed << setprecision(1) << edge.jarak_km << "\n";
                count++;
            }
        }
        if (count == 0) {
            cout << "  (tidak ada rute keluar dari lokasi ini)\n";
        } else {
            cout << "\n  Total: " << count << " rute ditemukan.\n";
        }
    }

     
    bool updateRute(const string& id_rute, double jarak_baru) {
        for (auto& r : data_rute) {
            if (r.id_rute == id_rute) {
                r.jarak_km = jarak_baru;

                
                int idxA = lokasiToIndex[r.id_asal];
                int idxB = lokasiToIndex[r.id_tujuan];
                adjMatrix[idxA][idxB] = jarak_baru;

                
                if (adjListMap.count(r.id_asal)) {
                    for (auto& edge : adjListMap[r.id_asal]) {
                        if (edge.tujuan == r.id_tujuan) {
                            edge.jarak_km = jarak_baru;
                            break;
                        }
                    }
                }
                if (adjListOrdered.count(r.id_asal)) {
                    for (auto& edge : adjListOrdered[r.id_asal]) {
                        if (edge.tujuan == r.id_tujuan) {
                            edge.jarak_km = jarak_baru;
                            break;
                        }
                    }
                }

                cout << "  [OK] Rute " << id_rute << " diperbarui: jarak -> "
                     << jarak_baru << " km\n";
                return true;
            }
        }
        cout << "  [!] Rute " << id_rute << " tidak ditemukan!\n";
        return false;
    }

     
    bool hapusRute(const string& id_rute) {
        for (auto it = data_rute.begin(); it != data_rute.end(); ++it) {
            if (it->id_rute == id_rute) {
                string asal = it->id_asal;
                string tujuan = it->id_tujuan;

                
                int idxA = lokasiToIndex[asal];
                int idxB = lokasiToIndex[tujuan];
                adjMatrix[idxA][idxB] = 0.0;

                
                if (adjListMap.count(asal)) {
                    auto& edges = adjListMap[asal];
                    for (auto eit = edges.begin(); eit != edges.end(); ++eit) {
                        if (eit->tujuan == tujuan) {
                            edges.erase(eit);
                            break;
                        }
                    }
                    if (edges.empty()) adjListMap.erase(asal);
                }

                
                if (adjListOrdered.count(asal)) {
                    auto& edges = adjListOrdered[asal];
                    for (auto eit = edges.begin(); eit != edges.end(); ++eit) {
                        if (eit->tujuan == tujuan) {
                            edges.erase(eit);
                            break;
                        }
                    }
                    if (edges.empty()) adjListOrdered.erase(asal);
                }

                data_rute.erase(it);
                cout << "  [OK] Rute " << id_rute << " dihapus.\n";
                return true;
            }
        }
        cout << "  [!] Rute " << id_rute << " tidak ditemukan!\n";
        return false;
    }

     
    bool hapusLokasi(const string& id) {
        if (!data_lokasi.count(id)) {
            cout << "  [!] Lokasi " << id << " tidak ditemukan!\n";
            return false;
        }

        string nama = data_lokasi[id].nama_lokasi;

        
        vector<string> ruteTerhapus;
        for (auto it = data_rute.begin(); it != data_rute.end();) {
            if (it->id_asal == id || it->id_tujuan == id) {
                ruteTerhapus.push_back(it->id_rute);
                it = data_rute.erase(it);
            } else {
                ++it;
            }
        }

        
        data_lokasi.erase(id);

        
        rebuildGraph();

        cout << "  [OK] Lokasi '" << nama << "' (" << id << ") dihapus.\n";
        cout << "      " << ruteTerhapus.size() << " rute terkait juga dihapus.\n";
        return true;
    }

    
    
    

    string getNamaLokasi(const string& id) {
        if (data_lokasi.count(id)) return data_lokasi[id].nama_lokasi;
        return "(" + id + " - unknown)";
    }

    void tampilkanSemuaLokasi() {
        cout << "\n  ============================================================\n";
        cout << "  DAFTAR SEMUA LOKASI (" << data_lokasi.size() << " node)\n";
        cout << "  ============================================================\n";
        cout << "  " << left << setw(12) << "ID"
             << setw(30) << "Nama Lokasi"
             << setw(12) << "Tipe"
             << setw(8) << "Degree" << "\n";
        cout << "  " << string(62, '-') << "\n";

        for (const auto& pair : data_lokasi) {
            const auto& loc = pair.second;
            int degree = 0;
            if (adjListMap.count(loc.id_lokasi))
                degree = (int)adjListMap[loc.id_lokasi].size();
            cout << "  " << left << setw(12) << loc.id_lokasi
                 << setw(30) << loc.nama_lokasi
                 << setw(12) << loc.tipe_lokasi
                 << setw(8) << degree << "\n";
        }
        cout << "  ============================================================\n\n";
    }

    void tampilkanSemuaRute() {
        cout << "\n  ==================================================================\n";
        cout << "  DAFTAR SEMUA RUTE (" << data_rute.size() << " edge)\n";
        cout << "  ==================================================================\n";
        cout << "  " << left << setw(12) << "ID_Rute"
             << setw(22) << "Asal"
             << setw(22) << "Tujuan"
             << setw(12) << "Jarak(km)" << "\n";
        cout << "  " << string(68, '-') << "\n";

        for (const auto& r : data_rute) {
            cout << "  " << left << setw(12) << r.id_rute
                 << setw(22) << getNamaLokasi(r.id_asal)
                 << setw(22) << getNamaLokasi(r.id_tujuan)
                 << setw(12) << fixed << setprecision(1) << r.jarak_km << "\n";
        }
        cout << "  ==================================================================\n\n";
    }

    void tampilkanStatistik() {
        int n = (int)data_lokasi.size();
        int e = (int)data_rute.size();

        
        size_t matrixBytes = sizeof(double) * (size_t)n * (size_t)n;
        size_t listMapBytes = 0;
        for (const auto& pair : adjListMap) {
            listMapBytes += sizeof(string) + pair.second.size() * sizeof(Edge);
        }
        size_t listOrderedBytes = 0;
        for (const auto& pair : adjListOrdered) {
            listOrderedBytes += sizeof(string) + pair.second.size() * sizeof(Edge);
        }

        cout << "\n  +------------------------------------------------+\n";
        cout << "  |           STATISTIK JARINGAN DISTRIBUSI         |\n";
        cout << "  +------------------------------------------------+\n";
        cout << "  | Total Lokasi (V)       : " << right << setw(18) << n << " |\n";
        cout << "  | Total Rute (E)         : " << right << setw(18) << e << " |\n";
        cout << "  | Kepadatan Graf         : " << right << setw(17) << fixed
             << setprecision(2) << (n > 1 ? (double)e / (double)(n * (n - 1)) * 100.0 : 0)
             << "% |\n";
        cout << "  +------------------------------------------------+\n";
        cout << "  | ADJACENCY MATRIX (Fase 1)                         |\n";
        cout << "  |   Ukuran Matriks         : " << right << setw(16) << (n * n) << " sel |\n";
        cout << "  |   Memori Terpakai        : " << right << setw(16)
             << formatBytes(matrixBytes) << " |\n";
        cout << "  |   Sel Terisi (non-zero)  : " << right << setw(16) << e << " sel |\n";
        cout << "  |   Sel Kosong (zero)      : " << right << setw(16) << ((n * n) - e) << " sel |\n";
        cout << "  |   Efisiensi Ruang        : " << right << setw(16) << fixed
             << setprecision(2) << (n > 0 ? (double)e / (double)(n * n) * 100.0 : 0)
             << "% |\n";
        cout << "  +------------------------------------------------+\n";
        cout << "  | ADJACENCY LIST (Fase 2)                           |\n";
        cout << "  |   Hash Map (unorderd_map): " << right << setw(16)
             << formatBytes(listMapBytes) << " |\n";
        cout << "  |   Ordered Map (std::map) : " << right << setw(16)
             << formatBytes(listOrderedBytes) << " |\n";
        cout << "  +------------------------------------------------+\n\n";
    }

    void tampilkanAdjacencyMatrix() {
        int n = (int)indexToLokasi.size();
        if (n == 0) {
            cout << "  [!] Belum ada data.\n";
            return;
        }

        cout << "\n  ADJACENCY MATRIX (" << n << "x" << n << ")\n";
        cout << "  ";
        for (int i = 0; i < min(n, 15); i++) {
            cout << right << setw(7) << indexToLokasi[i].substr(0, 5);
        }
        if (n > 15) cout << " ...";
        cout << "\n";

        for (int i = 0; i < min(n, 15); i++) {
            cout << " " << left << setw(5) << indexToLokasi[i].substr(0, 5);
            for (int j = 0; j < min(n, 15); j++) {
                double val = adjMatrix[i][j];
                if (val > 0)
                    cout << right << setw(7) << (int)val;
                else
                    cout << right << setw(7) << ".";
            }
            if (n > 15) cout << " ...";
            cout << "\n";
        }
        if (n > 15) cout << " ... (" << n - 15 << " baris/kolom lainnya)\n";
        cout << endl;
    }

    void tampilkanAdjacencyList() {
        cout << "\n  ADJACENCY LIST (Hash Map)\n";
        cout << "  " << string(50, '=') << "\n";
        for (const auto& pair : adjListMap) {
            const string& src = pair.first;
            cout << "  [" << src << "] -> ";
            const auto& edges = pair.second;
            for (size_t i = 0; i < edges.size(); i++) {
                cout << edges[i].tujuan << "(" << (int)edges[i].jarak_km << "km)";
                if (i < edges.size() - 1) cout << ", ";
            }
            if (edges.empty()) cout << "(tidak ada rute keluar)";
            cout << "\n";
        }
        cout << endl;
    }

    
    
    

    void simpanDataLokasi(const string& nama_file = "") {
        string file_path = nama_file.empty() ? pathLokasi : nama_file;
        ofstream file(file_path);

        if (!file.is_open()) {
            cout << "  [!] Gagal menyimpan file " << file_path << endl;
            return;
        }

        file << "ID_Lokasi,Nama_Lokasi,Tipe_Lokasi\n";
        for (const auto& pair : data_lokasi) {
            const auto& loc = pair.second;
            file << loc.id_lokasi << "," << loc.nama_lokasi << ","
                 << loc.tipe_lokasi << "\n";
        }
        file.close();
        cout << "  [OK] Data lokasi disimpan ke " << file_path
             << " (" << data_lokasi.size() << " record)\n";
    }

    void simpanDataRute(const string& nama_file = "") {
        string file_path = nama_file.empty() ? pathRute : nama_file;
        ofstream file(file_path);

        if (!file.is_open()) {
            cout << "  [!] Gagal menyimpan file " << file_path << endl;
            return;
        }

        file << "ID_Rute,ID_Asal,ID_Tujuan,Jarak_KM\n";
        for (const auto& r : data_rute) {
            file << r.id_rute << "," << r.id_asal << ","
                 << r.id_tujuan << "," << r.jarak_km << "\n";
        }
        file.close();
        cout << "  [OK] Data rute disimpan ke " << file_path
             << " (" << data_rute.size() << " record)\n";
    }

    
    
    

    void jalankanBenchmark(int iterasi = 1000) {
        cout << "\n";
        cout << "  ################################################################\n";
        cout << "  #              BENCHMARK ENGINE: MATRIX vs LIST               #\n";
        cout << "  #  Iterasi per operasi: " << iterasi << " x                                     #\n";
        cout << "  ################################################################\n\n";

        vector<BenchmarkResult> hasil;

        
        auto runBenchmark = [&](const string& opName, function<void()> fn) -> double {
            auto start = high_resolution_clock::now();
            for (int i = 0; i < iterasi; i++) fn();
            auto end = high_resolution_clock::now();
            double us = duration_cast<nanoseconds>(end - start).count() / 1000.0 / iterasi;
            return us;
        };

        int V = (int)data_lokasi.size();
        int E = (int)data_rute.size();

        if (V == 0 || E == 0) {
            cout << "  [!] Data kosong! Muat data terlebih dahulu.\n";
            return;
        }

        
        string sampleAsal = data_rute[0].id_asal;
        string sampleTujuan = data_rute[0].id_tujuan;
        double sampleJarak = data_rute[0].jarak_km;

        
        
        
        cout << "  [BENCH] Search Rute (rute exist)...\n";
        
        double us_matrix_search_exist = runBenchmark("search_matrix", [&]() {
            volatile int a = lokasiToIndex[sampleAsal];
            volatile int b = lokasiToIndex[sampleTujuan];
            volatile double r = adjMatrix[a][b]; (void)r;
        });
        
        double us_list_search_exist = runBenchmark("search_list", [&]() {
            volatile double r = 0;
            if (adjListMap.count(sampleAsal)) {
                for (const auto& e : adjListMap.at(sampleAsal)) {
                    if (e.tujuan == sampleTujuan) { r = e.jarak_km; break; }
                }
            } (void)r;
        });

        hasil.push_back({"Search (exist)", "Adjacency Matrix", (long long)(us_matrix_search_exist * 100), 
                         sizeof(double) * (size_t)V * (size_t)V});
        hasil.push_back({"Search (exist)", "Adjacency List", (long long)(us_list_search_exist * 100),
                         0});

        cout << "    Matrix: " << fixed << setprecision(3) << us_matrix_search_exist << " us/op | "
             << "List: " << fixed << setprecision(3) << us_list_search_exist << " us/op\n";

        
        
        
        cout << "  [BENCH] Search Rute (not exist)...\n";
        string fakeId = "XXXX_NONEXISTENT";
        
        double us_matrix_search_none = runBenchmark("search_matrix_none", [&]() {
            if (lokasiToIndex.count(fakeId)) {   }
        });
        
        double us_list_search_none = runBenchmark("search_list_none", [&]() {
            if (adjListMap.count(fakeId)) {   }
        });

        hasil.push_back({"Search (none)", "Adjacency Matrix", (long long)(us_matrix_search_none * 100),
                         sizeof(double) * (size_t)V * (size_t)V});
        hasil.push_back({"Search (none)", "Adjacency List", (long long)(us_list_search_none * 100), 0});

        cout << "    Matrix: " << fixed << setprecision(3) << us_matrix_search_none << " us/op | "
             << "List: " << fixed << setprecision(3) << us_list_search_none << " us/op\n";

        
        
        
        cout << "  [BENCH] Insert Rute (existing nodes)...\n";
        string bench_id = "BENCH_TEMP_001";
        
        double us_matrix_insert_exist = runBenchmark("insert_matrix_exist", [&]() {
            int a = lokasiToIndex[sampleAsal];
            int b = lokasiToIndex[sampleTujuan];
            adjMatrix[a][b] = 99.9;
            adjMatrix[a][b] = sampleJarak; 
        });
        
        double us_list_insert_exist = runBenchmark("insert_list_exist", [&]() {
            adjListMap[sampleAsal].push_back({sampleTujuan, 99.9});
            adjListMap[sampleAsal].pop_back();
        });

        hasil.push_back({"Insert (exist node)", "Adjacency Matrix", (long long)(us_matrix_insert_exist * 100),
                         sizeof(double) * (size_t)V * (size_t)V});
        hasil.push_back({"Insert (exist node)", "Adjacency List", (long long)(us_list_insert_exist * 100), 0});

        cout << "    Matrix: " << fixed << setprecision(3) << us_matrix_insert_exist << " us/op | "
             << "List: " << fixed << setprecision(3) << us_list_insert_exist << " us/op\n";

        
        
        
        cout << "  [BENCH] Update Rute...\n";
        
        double us_matrix_update = runBenchmark("update_matrix", [&]() {
            int a = lokasiToIndex[sampleAsal];
            int b = lokasiToIndex[sampleTujuan];
            adjMatrix[a][b] = 50.0;
            adjMatrix[a][b] = sampleJarak; 
        });
        
        double us_list_update = runBenchmark("update_list", [&]() {
            if (adjListMap.count(sampleAsal)) {
                for (auto& e : adjListMap[sampleAsal]) {
                    if (e.tujuan == sampleTujuan) { e.jarak_km = 50.0; break; }
                }
            }
            if (adjListMap.count(sampleAsal)) {
                for (auto& e : adjListMap[sampleAsal]) {
                    if (e.tujuan == sampleTujuan) { e.jarak_km = sampleJarak; break; }
                }
            }
        });

        hasil.push_back({"Update", "Adjacency Matrix", (long long)(us_matrix_update * 100),
                         sizeof(double) * (size_t)V * (size_t)V});
        hasil.push_back({"Update", "Adjacency List", (long long)(us_list_update * 100), 0});

        cout << "    Matrix: " << fixed << setprecision(3) << us_matrix_update << " us/op | "
             << "List: " << fixed << setprecision(3) << us_list_update << " us/op\n";

        
        
        
        cout << "  [BENCH] Delete Rute...\n";
        
        double us_matrix_delete = runBenchmark("delete_matrix", [&]() {
            int a = lokasiToIndex[sampleAsal];
            int b = lokasiToIndex[sampleTujuan];
            adjMatrix[a][b] = 0.0;
            adjMatrix[a][b] = sampleJarak; 
        });
        
        double us_list_delete = runBenchmark("delete_list", [&]() {
            if (adjListMap.count(sampleAsal)) {
                auto& v = adjListMap[sampleAsal];
                for (auto it = v.begin(); it != v.end(); ++it) {
                    if (it->tujuan == sampleTujuan) { v.erase(it); break; }
                }
            }
            
            adjListMap[sampleAsal].push_back({sampleTujuan, sampleJarak});
        });

        hasil.push_back({"Delete", "Adjacency Matrix", (long long)(us_matrix_delete * 100),
                         sizeof(double) * (size_t)V * (size_t)V});
        hasil.push_back({"Delete", "Adjacency List", (long long)(us_list_delete * 100), 0});

        cout << "    Matrix: " << fixed << setprecision(3) << us_matrix_delete << " us/op | "
             << "List: " << fixed << setprecision(3) << us_list_delete << " us/op\n";

        
        
        
        cout << "  [BENCH] Iterate All Edges (full traversal)...\n";
        
        double us_matrix_iterate = runBenchmark("iterate_matrix", [&]() {
            long long total = 0;
            for (int i = 0; i < V; i++)
                for (int j = 0; j < V; j++)
                    if (adjMatrix[i][j] > 0) total += (long long)adjMatrix[i][j];
            (void)total;
        });
        
        double us_list_iterate = runBenchmark("iterate_list", [&]() {
            long long total = 0;
            for (const auto& pair : adjListMap)
                for (const auto& e : pair.second)
                    total += (long long)e.jarak_km;
            (void)total;
        });

        hasil.push_back({"Traverse All", "Adjacency Matrix", (long long)(us_matrix_iterate * 100),
                         sizeof(double) * (size_t)V * (size_t)V});
        hasil.push_back({"Traverse All", "Adjacency List", (long long)(us_list_iterate * 100), 0});

        cout << "    Matrix: " << fixed << setprecision(3) << us_matrix_iterate << " us/op | "
             << "List: " << fixed << setprecision(3) << us_list_iterate << " us/op\n";

        
        
        
        size_t listMemory = 0;
        for (const auto& pair : adjListMap) {
            listMemory += sizeof(string) + pair.second.size() * sizeof(Edge);
        }
        for (size_t i = 0; i < hasil.size(); i++) {
            if (hasil[i].structure == "Adjacency List") {
                hasil[i].memory_bytes = listMemory;
            }
        }

        
        
        
        cout << "\n  +================================================================+\n";
        cout << "  |                  HASIL BENCHMARK LENGKAP                      |\n";
        cout << "+----------+---------------------+---------------+---------------+\n";
        cout << "| Operasi  | Struktur Data       | Waktu (us/op) | Memory (B)    |\n";
        cout << "+----------+---------------------+---------------+---------------+\n";

        for (const auto& h : hasil) {
            double displayUs = h.microseconds / 100.0; 
            cout << "| " << left << setw(8) << h.operation
                 << "| " << left << setw(19) << h.structure
                 << "| " << right << fixed << setprecision(3) << setw(13) << displayUs
                 << "| " << right << setw(13) << h.memory_bytes << "|\n";
        }
        cout << "+----------+---------------------+---------------+---------------+\n";
        cout << "  V (Vertex/Lokasi) = " << V << " | E (Edge/Rute) = " << E << "\n";
        cout << "  Matrix Space: O(V^2) = O(" << (V*V) << ") | List Space: O(V+E) = O("
             << (V+E) << ")\n";
        cout << "  +================================================================+\n\n";

        
        exportBenchmarkJSON(hasil, V, E);
    }

    
    
    

    void exportBenchmarkJSON(const vector<BenchmarkResult>& hasil, int V, int E) {
        string filename = "benchmark_results.json";
        ofstream json(filename);

        if (!json.is_open()) {
            cout << "  [!] Gagal menulis " << filename << endl;
            return;
        }

        json << "{\n";
        json << "  \"metadata\": {\n";
        json << "    \"project\": \"LogisRoute - Sistem Navigasi & Rekomendasi Rute Distribusi\",\n";
        json << "    \"group\": \"Kelompok 1 - Paralel 5\",\n";
        json << "    \"members\": [\n";
        json << "      \"Irgi Setiawan (M0405241018)\",\n";
        json << "      \"Danish Hafid Wibisono (M0405241055)\",\n";
        json << "      \"Alifia Rahmah (M0405241064)\",\n";
        json << "      \"Dzaki Aditya Nurtyahyadi (M0405241079)\",\n";
        json << "      \"Widya Aulianti (M0405241083)\"\n";
        json << "    ],\n";
        json << "    \"course\": \"Struktur Data Genap 2025/2026\",\n";
        json << "    \"institution\": \"IPB University - SSMDI\",\n";
        json << "    \"timestamp\": \"" << currentTimeISO() << "\",\n";
        json << "    \"vertices\": " << V << ",\n";
        json << "    \"edges\": " << E << ",\n";
        json << "    \"graphDensity\": " << fixed << setprecision(4)
             << (V > 1 ? (double)(E) / (double)(V * (V - 1)) : 0.0) << "\n";
        json << "  },\n";

        json << "  \"structures\": {\n";
        json << "    \"adjacencyMatrix\": {\n";
        json << "      \"description\": \"Array 2 Dimensi (vector<vector<float>>)\",\n";
        json << "      \"timeComplexity\": {\n";
        json << "        \"search\": \"O(1)\",\n";
        json << "        \"insert\": \"O(1)\",\n";
        json << "        \"update\": \"O(1)\",\n";
        json << "        \"delete\": \"O(1)\",\n";
        json << "        \"traverseAll\": \"O(V^2)\"\n";
        json << "      },\n";
        json << "      \"spaceComplexity\": \"O(V^2)\",\n";
        json << "      \"totalCells\": " << (V * V) << ",\n";
        json << "      \"filledCells\": " << E << ",\n";
        json << "      \"emptyCells\": " << ((V * V) - E) << ",\n";
        json << "      \"spaceEfficiency\": " << fixed << setprecision(2)
             << (V > 0 ? (double)(E) / (double)(V * V) * 100.0 : 0.0) << ",\n";
        json << "      \"memoryBytes\": " << (sizeof(double) * (size_t)V * (size_t)V) << "\n";
        json << "    },\n";

        
        size_t listMem = 0;
        for (const auto& p : adjListMap) {
            listMem += sizeof(string) + p.second.size() * sizeof(Edge);
        }

        json << "    \"adjacencyList\": {\n";
        json << "      \"description\": \"Hash Map of Vectors (unordered_map<string, vector<Edge>>)\",\n";
        json << "      \"timeComplexity\": {\n";
        json << "        \"search\": \"O(E/V) average, O(E) worst\",\n";
        json << "        \"insert\": \"O(1) amortized\",\n";
        json << "        \"update\": \"O(E/V) average\",\n";
        json << "        \"delete\": \"O(E/V) average\",\n";
        json << "        \"traverseAll\": \"O(V+E)\"\n";
        json << "      },\n";
        json << "      \"spaceComplexity\": \"O(V+E)\",\n";
        json << "      \"totalNodes\": " << V << ",\n";
        json << "      \"totalEdges\": " << E << ",\n";
        json << "      \"memoryBytes\": " << listMem << "\n";
        json << "    }\n";
        json << "  },\n";

        json << "  \"benchmarkResults\": [\n";
        for (size_t i = 0; i < hasil.size(); i++) {
            const auto& h = hasil[i];
            double displayUs = h.microseconds / 100.0;
            json << "    {\n";
            json << "      \"operation\": \"" << h.operation << "\",\n";
            json << "      \"structure\": \"" << h.structure << "\",\n";
            json << "      \"microseconds\": " << fixed << setprecision(4) << displayUs << ",\n";
            json << "      \"memoryBytes\": " << h.memory_bytes << "\n";
            json << "    }" << (i < hasil.size() - 1 ? "," : "") << "\n";
        }
        json << "  ],\n";

        
        json << "  \"locations\": [\n";
        size_t locIdx = 0;
        for (const auto& pair : data_lokasi) {
            const auto& loc = pair.second;
            int degree = 0;
            if (adjListMap.count(loc.id_lokasi))
                degree = (int)adjListMap[loc.id_lokasi].size();
            json << "    {\n";
            json << "      \"id\": \"" << loc.id_lokasi << "\",\n";
            json << "      \"name\": \"" << escapeJSON(loc.nama_lokasi) << "\",\n";
            json << "      \"type\": \"" << loc.tipe_lokasi << "\",\n";
            json << "      \"degree\": " << degree << "\n";
            json << "    }" << (++locIdx < data_lokasi.size() ? "," : "") << "\n";
        }
        json << "  ],\n";

        
        json << "  \"routes\": [\n";
        for (size_t i = 0; i < data_rute.size(); i++) {
            const auto& r = data_rute[i];
            json << "    {\n";
            json << "      \"id\": \"" << r.id_rute << "\",\n";
            json << "      \"source\": \"" << r.id_asal << "\",\n";
            json << "      \"target\": \"" << r.id_tujuan << "\",\n";
            json << "      \"distance\": " << r.jarak_km << ",\n";
            json << "      \"sourceName\": \"" << escapeJSON(getNamaLokasi(r.id_asal)) << "\",\n";
            json << "      \"targetName\": \"" << escapeJSON(getNamaLokasi(r.id_tujuan)) << "\"\n";
            json << "    }" << (i < data_rute.size() - 1 ? "," : "") << "\n";
        }
        json << "  ]\n";

        json << "}\n";
        json.close();

        cout << "  [OK] Hasil benchmark dieksport ke " << filename << endl;
        cout << "       File ini dapat dibaca oleh React Frontend untuk visualisasi.\n";
    }

    
    
    

    




    void jalankanScalingBenchmark(int iterasi = 1000) {
        cout << "\n";
        cout << "  ################################################################\n";
        cout << "  #            SCALING BENCHMARK: GROWTH ANALYSIS               #\n";
        cout << "  #  Menguji performa di berbagai ukuran data                    #\n";
        cout << "  ################################################################\n\n";

        vector<int> sizes = {20, 50, 100, 200, 500};
        vector<map<string, double>> allResults; 

        
        auto origLokasi = data_lokasi;
        auto origRute = data_rute;

        for (int targetV : sizes) {
            int targetE = targetV * 5; 

            cout << "\n  --- Scaling: V=" << targetV << ", E=" << targetE << " ---\n";

            
            generateLargeData(targetV, targetE);

            if ((int)data_lokasi.size() == 0 || (int)data_rute.size() == 0) {
                cout << "  [!] Gagal generate data untuk V=" << targetV << endl;
                continue;
            }

            int V = (int)data_lokasi.size();
            int E = (int)data_rute.size();
            string sAsal = data_rute[0].id_asal;
            string sTujuan = data_rute[0].id_tujuan;
            double sJarak = data_rute[0].jarak_km;

            map<string, double> result;
            result["vertices"] = V;
            result["edges"] = E;

            auto bench = [&](function<void()> fn) -> double {
                auto start = high_resolution_clock::now();
                for (int i = 0; i < iterasi; i++) fn();
                auto end = high_resolution_clock::now();
                return duration_cast<nanoseconds>(end - start).count() / 1000.0 / iterasi;
            };

            
            result["matrix_search"] = bench([&]() {
                volatile int a = lokasiToIndex[sAsal];
                volatile int b = lokasiToIndex[sTujuan];
                volatile double r = adjMatrix[a][b]; (void)r;
            });
            result["list_search"] = bench([&]() {
                volatile double r = 0;
                if (adjListMap.count(sAsal)) {
                    for (const auto& e : adjListMap.at(sAsal)) {
                        if (e.tujuan == sTujuan) { r = e.jarak_km; break; }
                    }
                } (void)r;
            });

            
            result["matrix_update"] = bench([&]() {
                int a = lokasiToIndex[sAsal];
                int b = lokasiToIndex[sTujuan];
                adjMatrix[a][b] = 99.9;
                adjMatrix[a][b] = sJarak;
            });
            result["list_update"] = bench([&]() {
                if (adjListMap.count(sAsal)) {
                    for (auto& e : adjListMap[sAsal]) {
                        if (e.tujuan == sTujuan) { e.jarak_km = 99.9; break; }
                    }
                }
                if (adjListMap.count(sAsal)) {
                    for (auto& e : adjListMap[sAsal]) {
                        if (e.tujuan == sTujuan) { e.jarak_km = sJarak; break; }
                    }
                }
            });

            
            result["matrix_traverse"] = bench([&]() {
                long long total = 0;
                for (int i = 0; i < V; i++)
                    for (int j = 0; j < V; j++)
                        if (adjMatrix[i][j] > 0) total += (long long)adjMatrix[i][j];
                (void)total;
            });
            result["list_traverse"] = bench([&]() {
                long long total = 0;
                for (const auto& pair : adjListMap)
                    for (const auto& e : pair.second)
                        total += (long long)e.jarak_km;
                (void)total;
            });

            
            result["matrix_memory"] = sizeof(double) * (size_t)V * (size_t)V;
            size_t listMem = 0;
            for (const auto& p : adjListMap)
                listMem += sizeof(string) + p.second.size() * sizeof(Edge);
            result["list_memory"] = listMem;

            allResults.push_back(result);

            cout << "    Search:   Matrix=" << fixed << setprecision(3) << result["matrix_search"]
                 << "us  List=" << result["list_search"] << "us\n";
            cout << "    Update:   Matrix=" << result["matrix_update"]
                 << "us  List=" << result["list_update"] << "us\n";
            cout << "    Traverse: Matrix=" << result["matrix_traverse"]
                 << "us  List=" << result["list_traverse"] << "us\n";
            cout << "    Memory:  Matrix=" << formatBytes((size_t)result["matrix_memory"])
                 << "  List=" << formatBytes((size_t)result["list_memory"]) << "\n";
        }

        
        data_lokasi = origLokasi;
        data_rute = origRute;
        rebuildGraph();

        
        string filename = "scaling_benchmark_results.json";
        ofstream json(filename);
        if (!json.is_open()) {
            cout << "  [!] Gagal menulis " << filename << endl;
            return;
        }

        json << "{\n";
        json << "  \"metadata\": {\n";
        json << "    \"project\": \"LogisRoute - Scaling Benchmark\",\n";
        json << "    \"group\": \"Kelompok 1 - Paralel 5\",\n";
        json << "    \"description\": \"Performance comparison across different data sizes\",\n";
        json << "    \"iterations\": " << iterasi << ",\n";
        json << "    \"timestamp\": \"" << currentTimeISO() << "\"\n";
        json << "  },\n";
        json << "  \"scalingResults\": [\n";

        for (size_t i = 0; i < allResults.size(); i++) {
            const auto& r = allResults[i];
            json << "    {\n";
            json << "      \"vertices\": " << (int)r.at("vertices") << ",\n";
            json << "      \"edges\": " << (int)r.at("edges") << ",\n";
            json << "      \"search\": {\n";
            json << "        \"adjacencyMatrix\": " << fixed << setprecision(4) << r.at("matrix_search") << ",\n";
            json << "        \"adjacencyList\": " << fixed << setprecision(4) << r.at("list_search") << "\n";
            json << "      },\n";
            json << "      \"update\": {\n";
            json << "        \"adjacencyMatrix\": " << fixed << setprecision(4) << r.at("matrix_update") << ",\n";
            json << "        \"adjacencyList\": " << fixed << setprecision(4) << r.at("list_update") << "\n";
            json << "      },\n";
            json << "      \"traverseAll\": {\n";
            json << "        \"adjacencyMatrix\": " << fixed << setprecision(4) << r.at("matrix_traverse") << ",\n";
            json << "        \"adjacencyList\": " << fixed << setprecision(4) << r.at("list_traverse") << "\n";
            json << "      },\n";
            json << "      \"memory\": {\n";
            json << "        \"adjacencyMatrixBytes\": " << (size_t)r.at("matrix_memory") << ",\n";
            json << "        \"adjacencyListBytes\": " << (size_t)r.at("list_memory") << "\n";
            json << "      }\n";
            json << "    }" << (i < allResults.size() - 1 ? "," : "") << "\n";
        }

        json << "  ]\n";
        json << "}\n";
        json.close();

        cout << "\n  +================================================================+\n";
        cout << "  |           SCALING BENCHMARK COMPLETE                         |\n";
        cout << "  +================================================================+\n";
        cout << "  Hasil scaling dieksport ke: " << filename << endl;
        cout << "  File ini menunjukkan bagaimana performa berubah seiring pertumbuhan data.\n\n";
    }

private:
    
    
    

    void rebuildGraph() {
        
        lokasiToIndex.clear();
        indexToLokasi.clear();
        adjListMap.clear();
        adjListOrdered.clear();
        adjMatrix.clear();

        
        for (const auto& pair : data_lokasi) {
            ensureNodeExists(pair.first);
        }

        
        for (const auto& r : data_rute) {
            int idxAsal = lokasiToIndex[r.id_asal];
            int idxTujuan = lokasiToIndex[r.id_tujuan];

            adjMatrix[idxAsal][idxTujuan] = r.jarak_km;

            Edge e = {r.id_tujuan, r.jarak_km};
            adjListMap[r.id_asal].push_back(e);
            adjListOrdered[r.id_asal].push_back(e);
        }
    }

    static string formatBytes(size_t bytes) {
        if (bytes >= 1024 * 1024)
            return to_string(bytes / (1024 * 1024)) + " MB";
        else if (bytes >= 1024)
            return to_string(bytes / 1024) + " KB";
        else
            return to_string(bytes) + " B";
    }

    static string currentTimeISO() {
        auto now = system_clock::now();
        auto tt = system_clock::to_time_t(now);
        tm local_tm;
#ifdef _WIN32
        localtime_s(&local_tm, &tt);
#else
        localtime_r(&tt, &local_tm);
#endif
        char buf[30];
        strftime(buf, sizeof(buf), "%Y-%m-%dT%H:%M:%S", &local_tm);
        return string(buf);
    }

    static string escapeJSON(const string& s) {
        string result;
        for (char c : s) {
            switch (c) {
                case '"': result += "\\\""; break;
                case '\\': result += "\\\\"; break;
                case '\n': result += "\\n"; break;
                case '\r': result += "\\r"; break;
                case '\t': result += "\\t"; break;
                default: result += c;
            }
        }
        return result;
    }
};





void tampilkanHeader() {
    cout << "\n";
    cout << "  ╔══════════════════════════════════════════════════════════════╗\n";
    cout << "  ║        LOGISROUTE - Sistem Manajemen Rute Distribusi        ║\n";
    cout << "  ║     Representasi Graf: Adjacency Matrix vs Adjacency List   ║\n";
    cout << "  ╠══════════════════════════════════════════════════════════════╣\n";
    cout << "  ║  Kelompok 1 | Paralel 5 | Struktur Data Genap 2025/2026    ║\n";
    cout << "  ╚══════════════════════════════════════════════════════════════╝\n\n";
}

void tampilkanMenu() {
    cout << "  +-------------------------------------------------------------+\n";
    cout << "  |                         MENU UTAMA                         |\n";
    cout << "  +-------------------------------------------------------------+\n";
    cout << "  |  [1]  Tampilkan Semua Lokasi                                 |\n";
    cout << "  |  [2]  Tampilkan Semua Rute                                   |\n";
    cout << "  |  [3]  Cari Rute (berdasarkan asal & tujuan)                  |\n";
    cout << "  |  [4]  Lihat Rute dari Lokasi Tertentu                        |\n";
    cout << "  +-------------------------------------------------------------+\n";
    cout << "  |  [5]  Tambah Lokasi Baru                                     |\n";
    cout << "  |  [6]  Tambah Rute Baru                                       |\n";
    cout << "  |  [7]  Update Jarak Rute                                     |\n";
    cout << "  |  [8]  Hapus Rute                                            |\n";
    cout << "  |  [9]  Hapus Lokasi (+ rute terkait)                          |\n";
    cout << "  +-------------------------------------------------------------+\n";
    cout << "  |  [10] Tampilkan Statistik Jaringan                            |\n";
    cout << "  |  [11] Tampilkan Adjacency Matrix                             |\n";
    cout << "  |  [12] Tampilkan Adjacency List                               |\n";
    cout << "  +-------------------------------------------------------------+\n";
    cout << "  |  [13] Jalankan Benchmark (Matrix vs List)                    |\n";
    cout << "  |  [14] Simpan Perubahan ke CSV                                |\n";
    cout << "  +-------------------------------------------------------------+\n";
    cout << "  |  [15] Generate Data Besar (500+ node, 2500+ edge)            |\n";
    cout << "  |  [16] Scaling Benchmark (20 -> 500 node growth test)        |\n";
    cout << "  |  [17] Load Ulang Data Asli (lokasi.csv + rute.csv)           |\n";
    cout << "  +-------------------------------------------------------------+\n";
    cout << "  |  [0]  Keluar                                                |\n";
    cout << "  +-------------------------------------------------------------+\n";
    cout << "  >> Pilihan: ";
}

int main() {
#ifdef _WIN32
    // Fix garbled Unicode box-drawing chars on Windows CMD
    SetConsoleOutputCP(CP_UTF8);
    SetConsoleCP(CP_UTF8);
#endif

    ManajemenRute sistem;

    tampilkanHeader();

    
    cout << "  [*] Memuat data awal...\n";
    sistem.muatDataLokasi("lokasi.csv");
    sistem.muatDataRute("rute.csv");

    int pilihan;
    do {
        tampilkanMenu();
        if (!(cin >> pilihan)) {
            cin.clear();
            cin.ignore(10000, '\n');
            continue;
        }
        cin.ignore(10000, '\n');

        switch (pilihan) {
            case 1: sistem.tampilkanSemuaLokasi(); break;
            case 2: sistem.tampilkanSemuaRute(); break;

            case 3: {
                string asal, tujuan;
                cout << "\n  Masukkan ID Lokasi Asal  : "; getline(cin, asal);
                cout << "  Masukkan ID Lokasi Tujuan: "; getline(cin, tujuan);
                sistem.cariRute(ManajemenRute::trim(asal), ManajemenRute::trim(tujuan));
                break;
            }

            case 4: {
                string asal;
                cout << "\n  Masukkan ID Lokasi Asal: "; getline(cin, asal);
                sistem.tampilkanRuteDari(ManajemenRute::trim(asal));
                break;
            }

            case 5: {
                string id, nama, tipe;
                cout << "\n  -- Tambah Lokasi Baru --\n";
                cout << "  ID Lokasi   : "; getline(cin, id);
                cout << "  Nama Lokasi : "; getline(cin, nama);
                cout << "  Tipe (Gudang/Tujuan): "; getline(cin, tipe);
                sistem.tambahLokasi(ManajemenRute::trim(id), ManajemenRute::trim(nama), ManajemenRute::trim(tipe));
                break;
            }

            case 6: {
                string id_r, asal, tujuan;
                double jarak;
                cout << "\n  -- Tambah Rute Baru --\n";
                cout << "  ID Rute    : "; getline(cin, id_r);
                cout << "  ID Asal    : "; getline(cin, asal);
                cout << "  ID Tujuan  : "; getline(cin, tujuan);
                cout << "  Jarak (km) : "; cin >> jarak; cin.ignore();
                sistem.tambahRute(ManajemenRute::trim(id_r), ManajemenRute::trim(asal), ManajemenRute::trim(tujuan), jarak);
                break;
            }

            case 7: {
                string id_r;
                double jarak_baru;
                cout << "\n  -- Update Jarak Rute --\n";
                cout << "  ID Rute       : "; getline(cin, id_r);
                cout << "  Jarak Baru    : "; cin >> jarak_baru; cin.ignore();
                sistem.updateRute(ManajemenRute::trim(id_r), jarak_baru);
                break;
            }

            case 8: {
                string id_r;
                cout << "\n  -- Hapus Rute --\n";
                cout << "  ID Rute: "; getline(cin, id_r);
                sistem.hapusRute(ManajemenRute::trim(id_r));
                break;
            }

            case 9: {
                string id;
                cout << "\n  -- Hapus Lokasi (semua rute terkait ikut terhapus) --\n";
                cout << "  ID Lokasi: "; getline(cin, id);
                sistem.hapusLokasi(ManajemenRute::trim(id));
                break;
            }

            case 10: sistem.tampilkanStatistik(); break;
            case 11: sistem.tampilkanAdjacencyMatrix(); break;
            case 12: sistem.tampilkanAdjacencyList(); break;

            case 13: {
                int iter;
                cout << "\n  Jumlah iterasi per operasi (default=1000): ";
                if (!(cin >> iter)) iter = 1000;
                cin.ignore();
                sistem.jalankanBenchmark(iter);
                break;
            }

            case 14:
                cout << "\n";
                sistem.simpanDataLokasi();
                sistem.simpanDataRute();
                break;

            case 15: {
                int nodes, edges;
                cout << "\n  -- Generate Data Besar untuk Benchmark --\n";
                cout << "  Jumlah lokasi/node  (default=500): ";
                if (!(cin >> nodes)) nodes = 500;
                cout << "  Jumlah rute/edge     (default=2500): ";
                if (!(cin >> edges)) edges = 2500;
                cin.ignore();
                sistem.generateLargeData(nodes, edges);
                
                char autoBench;
                cout << "\n  Jalankan benchmark otomatis dengan data ini? (y/n): ";
                cin >> autoBench; cin.ignore();
                if (autoBench == 'y' || autoBench == 'Y') {
                    sistem.jalankanBenchmark(1000);
                }
                break;
            }

            case 16: {
                int iter;
                cout << "\n  Iterasi per ukuran data (default=1000): ";
                if (!(cin >> iter)) iter = 1000;
                cin.ignore();
                sistem.jalankanScalingBenchmark(iter);
                break;
            }

            case 17:
                cout << "\n  [*] Memuat ulang data asli...\n";
                sistem.muatDataLokasi("lokasi.csv");
                sistem.muatDataRute("rute.csv");
                break;

            case 0:
                cout << "\n  Sampai jumpa! LogisRoute shutdown.\n\n";
                break;

            default:
                cout << "\n  [!] Pilihan tidak valid. Coba lagi.\n";
        }
    } while (pilihan != 0);

    return 0;
}
