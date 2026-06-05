






export const SIZE_SCENARIOS = [
  { label: 'Kecil',     vertices: 20,   edges: 40,    desc: '20 node · 40 edge' },
  { label: 'Sedang',    vertices: 50,   edges: 250,   desc: '50 node · 250 edge' },
  { label: 'Menengah',  vertices: 100,  edges: 500,   desc: '100 node · 500 edge' },
  { label: 'Besar',     vertices: 200,  edges: 1000,  desc: '200 node · 1K edge' },
  { label: 'XLarge',    vertices: 500,  edges: 2500,  desc: '500 node · 2.5K edge' },
];


export const DEFAULT_SCENARIO_IDX = 4;


const FALLBACK_LOCATIONS = [
  { id_lokasi: 'L001', nama_lokasi: 'Gudang Pusat Jakarta', tipe_lokasi: 'Gudang' },
  { id_lokasi: 'L002', nama_lokasi: 'Gudang Transit Bekasi', tipe_lokasi: 'Gudang' },
  { id_lokasi: 'L003', nama_lokasi: 'Gudang Regional Bandung', tipe_lokasi: 'Gudang' },
  { id_lokasi: 'L004', nama_lokasi: 'Cabang Jakarta Selatan', tipe_lokasi: 'Tujuan' },
  { id_lokasi: 'L005', nama_lokasi: 'Cabang Jakarta Barat', tipe_lokasi: 'Tujuan' },
  { id_lokasi: 'L006', nama_lokasi: 'Cabang Jakarta Timur', tipe_lokasi: 'Tujuan' },
  { id_lokasi: 'L007', nama_lokasi: 'Cabang Jakarta Utara', tipe_lokasi: 'Tujuan' },
  { id_lokasi: 'L008', nama_lokasi: 'Cabang Depok Margonda', tipe_lokasi: 'Tujuan' },
  { id_lokasi: 'L009', nama_lokasi: 'Cabang Bogor Selatan', tipe_lokasi: 'Tujuan' },
  { id_lokasi: 'L010', nama_lokasi: 'Cabang Bogor Utara', tipe_lokasi: 'Tujuan' },
  { id_lokasi: 'L011', nama_lokasi: 'Cabang Tangerang Kota', tipe_lokasi: 'Tujuan' },
  { id_lokasi: 'L012', nama_lokasi: 'Cabang Tangerang Selatan', tipe_lokasi: 'Tujuan' },
  { id_lokasi: 'L013', nama_lokasi: 'Cabang Bekasi Timur', tipe_lokasi: 'Tujuan' },
  { id_lokasi: 'L014', nama_lokasi: 'Cabang Bekasi Barat', tipe_lokasi: 'Tujuan' },
  { id_lokasi: 'L015', nama_lokasi: 'Cabang Karawang', tipe_lokasi: 'Tujuan' },
  { id_lokasi: 'L016', nama_lokasi: 'Cabang Cikarang', tipe_lokasi: 'Tujuan' },
  { id_lokasi: 'L017', nama_lokasi: 'Cabang Serpong', tipe_lokasi: 'Tujuan' },
  { id_lokasi: 'L018', nama_lokasi: 'Cabang Cileungsi', tipe_lokasi: 'Tujuan' },
  { id_lokasi: 'L019', nama_lokasi: 'Cabang Cibinong', tipe_lokasi: 'Tujuan' },
  { id_lokasi: 'L020', nama_lokasi: 'Cabang Pamulang', tipe_lokasi: 'Tujuan' },
];

const FALLBACK_ROUTES = [
  { id_rute: 'R001', id_asal: 'L001', id_tujuan: 'L004', jarak_km: 15 },
  { id_rute: 'R002', id_asal: 'L001', id_tujuan: 'L005', jarak_km: 18 },
  { id_rute: 'R003', id_asal: 'L001', id_tujuan: 'L006', jarak_km: 22 },
  { id_rute: 'R004', id_asal: 'L001', id_tujuan: 'L007', jarak_km: 12 },
  { id_rute: 'R005', id_asal: 'L001', id_tujuan: 'L008', jarak_km: 30 },
  { id_rute: 'R006', id_asal: 'L001', id_tujuan: 'L009', jarak_km: 45 },
  { id_rute: 'R007', id_asal: 'L001', id_tujuan: 'L010', jarak_km: 50 },
  { id_rute: 'R008', id_asal: 'L001', id_tujuan: 'L011', jarak_km: 28 },
  { id_rute: 'R009', id_asal: 'L001', id_tujuan: 'L012', jarak_km: 35 },
  { id_rute: 'R010', id_asal: 'L002', id_tujuan: 'L013', jarak_km: 20 },
  { id_rute: 'R011', id_asal: 'L002', id_tujuan: 'L014', jarak_km: 25 },
  { id_rute: 'R012', id_asal: 'L002', id_tujuan: 'L015', jarak_km: 40 },
  { id_rute: 'R013', id_asal: 'L002', id_tujuan: 'L016', jarak_km: 15 },
  { id_rute: 'R014', id_asal: 'L002', id_tujuan: 'L017', jarak_km: 32 },
  { id_rute: 'R015', id_asal: 'L003', id_tujuan: 'L009', jarak_km: 20 },
  { id_rute: 'R016', id_asal: 'L003', id_tujuan: 'L010', jarak_km: 25 },
  { id_rute: 'R017', id_asal: 'L003', id_tujuan: 'L011', jarak_km: 35 },
  { id_rute: 'R018', id_asal: 'L003', id_tujuan: 'L012', jarak_km: 42 },
  { id_rute: 'R019', id_asal: 'L003', id_tujuan: 'L018', jarak_km: 55 },
  { id_rute: 'R020', id_asal: 'L004', id_tujuan: 'L005', jarak_km: 10 },
  { id_rute: 'R021', id_asal: 'L004', id_tujuan: 'L006', jarak_km: 14 },
  { id_rute: 'R022', id_asal: 'L004', id_tujuan: 'L008', jarak_km: 18 },
  { id_rute: 'R023', id_asal: 'L005', id_tujuan: 'L007', jarak_km: 16 },
  { id_rute: 'R024', id_asal: 'L006', id_tujuan: 'L007', jarak_km: 11 },
  { id_rute: 'R025', id_asal: 'L008', id_tujuan: 'L009', jarak_km: 18 },
  { id_rute: 'R026', id_asal: 'L009', id_tujuan: 'L010', jarak_km: 8 },
  { id_rute: 'R027', id_asal: 'L011', id_tujuan: 'L012', jarak_km: 12 },
  { id_rute: 'R028', id_asal: 'L011', id_tujuan: 'L013', jarak_km: 22 },
  { id_rute: 'R029', id_asal: 'L013', id_tujuan: 'L014', jarak_km: 10 },
  { id_rute: 'R030', id_asal: 'L014', id_tujuan: 'L015', jarak_km: 18 },
  { id_rute: 'R031', id_asal: 'L015', id_tujuan: 'L016', jarak_km: 14 },
  { id_rute: 'R032', id_asal: 'L016', id_tujuan: 'L017', jarak_km: 8 },
  { id_rute: 'R033', id_asal: 'L017', id_tujuan: 'L018', jarak_km: 15 },
  { id_rute: 'R034', id_asal: 'L018', id_tujuan: 'L019', jarak_km: 7 },
  { id_rute: 'R035', id_asal: 'L019', id_tujuan: 'L020', jarak_km: 12 },
  { id_rute: 'R036', id_asal: 'L007', id_tujuan: 'L013', jarak_km: 30 },
  { id_rute: 'R037', id_asal: 'L010', id_tujuan: 'L017', jarak_km: 38 },
  { id_rute: 'R038', id_asal: 'L012', id_tujuan: 'L019', jarak_km: 25 },
  { id_rute: 'R039', id_asal: 'L014', id_tujuan: 'L020', jarak_km: 22 },
  { id_rute: 'R040', id_asal: 'L008', id_tujuan: 'L018', jarak_km: 28 },
];


let _masterData = null;
let _masterPromise = null;
let _scalingData = null;
let _scalingPromise = null;




export async function fetchMasterData() {
  if (_masterData) return _masterData;
  if (_masterPromise) return _masterPromise;

  _masterPromise = (async () => {
    try {
      const resp = await fetch('/benchmark_results.json');
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const json = await resp.json();

      const locations = (json.locations || []).map(loc => ({
        id_lokasi: loc.id,
        nama_lokasi: loc.name,
        tipe_lokasi: loc.type,
      }));

      const routes = (json.routes || []).map(r => ({
        id_rute: r.id,
        id_asal: r.source,
        id_tujuan: r.target,
        jarak_km: Math.round(r.distance * 100) / 100,
      }));

      const benchmarkResults = json.benchmarkResults || [];

      _masterData = { locations, routes, benchmarkResults };
      console.log(`[Dataset] Master loaded: ${locations.length} locs, ${routes.length} routes`);
      return _masterData;
    } catch (err) {
      console.warn('[Dataset] Failed to load benchmark_results.json:', err.message);
      _masterData = {
        locations: FALLBACK_LOCATIONS.map(l => ({ ...l })),
        routes: FALLBACK_ROUTES.map(r => ({ ...r })),
        benchmarkResults: [],
      };
      return _masterData;
    }
  })();

  return _masterPromise;
}




export async function fetchScalingData() {
  if (_scalingData) return _scalingData;
  if (_scalingPromise) return _scalingPromise;

  _scalingPromise = (async () => {
    try {
      const resp = await fetch('/scaling_benchmark_results.json');
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      _scalingData = await resp.json();
      console.log(`[Dataset] Scaling data loaded: ${_scalingData.scalingResults?.length || 0} scenarios`);
      return _scalingData;
    } catch (err) {
      console.warn('[Dataset] Failed to load scaling_benchmark_results.json:', err.message);
      _scalingData = null;
      return null;
    }
  })();

  return _scalingPromise;
}













export function subsampleData(master, targetV, targetE) {
  if (!master || !master.locations || master.locations.length === 0) {
    return { locations: FALLBACK_LOCATIONS, routes: FALLBACK_ROUTES };
  }

  
  if (targetV <= 25 && FALLBACK_LOCATIONS.length >= targetV) {
    return {
      locations: FALLBACK_LOCATIONS.slice(0, targetV),
      routes: FALLBACK_ROUTES.slice(0, Math.min(targetE, FALLBACK_ROUTES.length)),
    };
  }

  const gudangs = master.locations.filter(l => l.tipe_lokasi === 'Gudang');
  const tujuans = master.locations.filter(l => l.tipe_lokasi === 'Tujuan');

  
  const nodeDegree = {};
  master.routes.forEach(r => {
    nodeDegree[r.id_asal] = (nodeDegree[r.id_asal] || 0) + 1;
    nodeDegree[r.id_tujuan] = (nodeDegree[r.id_tujuan] || 0) + 1;
  });

  
  const sortedGudangs = [...gudangs].sort((a, b) => (nodeDegree[b.id_lokasi]||0) - (nodeDegree[a.id_lokasi]||0));
  const sortedTujuans = [...tujuans].sort((a, b) => (nodeDegree[b.id_lokasi]||0) - (nodeDegree[a.id_lokasi]||0));

  
  const numGudang = Math.max(1, Math.min(sortedGudangs.length, Math.ceil(targetV * 0.16)));
  const numTujuan = targetV - numGudang;

  
  const pickedGudangs = sortedGudangs.slice(0, numGudang);
  const pickedTujuans = sortedTujuans.slice(0, numTujuan);
  const slicedLocs = [...pickedGudangs, ...pickedTujuans];

  const locIds = new Set(slicedLocs.map(l => l.id_lokasi));

  
  let filteredRoutes = master.routes.filter(r =>
    locIds.has(r.id_asal) && locIds.has(r.id_tujuan)
  );

  
  if (filteredRoutes.length > targetE) {
    filteredRoutes = filteredRoutes.slice(0, targetE);
  }

  console.log(
    `[Dataset] Subsampled: V=${targetV} (got ${slicedLocs.length}, ` +
    `${slicedLocs.filter(l=>l.tipe_lokasi==='Gudang').length} Gudang), ` +
    `E target=${targetE} (got ${filteredRoutes.length})`
  );

  return { locations: slicedLocs, routes: filteredRoutes };
}





export function getBenchmarkForSize(scalingJson, vertices) {
  if (!scalingJson || !scalingJson.scalingResults) return null;

  const match = scalingJson.scalingResults.find(r => r.vertices === vertices);
  if (!match) return null;

  
  const s = match.search || {};
  const u = match.update || {};
  const t = match.traverseAll || {};
  const m = match.memory || {};

  return [
    { operation: 'Search (exist)', structure: 'Adjacency Matrix', microseconds: s.adjacencyMatrix || 0, memoryBytes: m.adjacencyMatrixBytes || 0 },
    { operation: 'Search (exist)', structure: 'Adjacency List', microseconds: s.adjacencyList || 0, memoryBytes: m.adjacencyListBytes || 0 },
    { operation: 'Search (none)', structure: 'Adjacency Matrix', microseconds: s.adjacencyMatrix || 0, memoryBytes: m.adjacencyMatrixBytes || 0 },
    { operation: 'Search (none)', structure: 'Adjacency List', microseconds: s.adjacencyList || 0, memoryBytes: m.adjacencyListBytes || 0 },
    { operation: 'Insert Edge', structure: 'Adjacency Matrix', microseconds: u.adjacencyMatrix || 0, memoryBytes: m.adjacencyMatrixBytes || 0 },
    { operation: 'Insert Edge', structure: 'Adjacency List', microseconds: u.adjacencyList || 0, memoryBytes: m.adjacencyListBytes || 0 },
    { operation: 'Update Edge', structure: 'Adjacency Matrix', microseconds: u.adjacencyMatrix || 0, memoryBytes: m.adjacencyMatrixBytes || 0 },
    { operation: 'Update Edge', structure: 'Adjacency List', microseconds: u.adjacencyList || 0, memoryBytes: m.adjacencyListBytes || 0 },
    { operation: 'Delete Edge', structure: 'Adjacency Matrix', microseconds: u.adjacencyMatrix || 0, memoryBytes: m.adjacencyMatrixBytes || 0 },
    { operation: 'Delete Edge', structure: 'Adjacency List', microseconds: u.adjacencyList || 0, memoryBytes: m.adjacencyListBytes || 0 },
    { operation: 'Traverse All', structure: 'Adjacency Matrix', microseconds: t.adjacencyMatrix || 0, memoryBytes: m.adjacencyMatrixBytes || 0 },
    { operation: 'Traverse All', structure: 'Adjacency List', microseconds: t.adjacencyList || 0, memoryBytes: m.adjacencyListBytes || 0 },
  ];
}


export const DEFAULT_LOCATIONS = FALLBACK_LOCATIONS;
export const DEFAULT_ROUTES = FALLBACK_ROUTES;



export function parseCSV(csvText) {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map(h => h.trim());
  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const values = [];
    let current = '';
    let inQuotes = false;
    for (const char of lines[i]) {
      if (char === '"') { inQuotes = !inQuotes; }
      else if (char === ',' && !inQuotes) { values.push(current.trim()); current = ''; }
      else { current += char; }
    }
    values.push(current.trim());
    const obj = {};
    headers.forEach((h, idx) => { obj[h] = values[idx] || ''; });
    data.push(obj);
  }
  return data;
}

export function generateMockBenchmark(vertexCount = 500, edgeCount = 2500) {
  const matrixSpace = vertexCount * vertexCount;
  const listSpace = vertexCount + edgeCount;
  return [
    { operation: 'Search (exist)', structure: 'Adjacency Matrix', microseconds: 0.02, memoryBytes: matrixSpace * 8 },
    { operation: 'Search (exist)', structure: 'Adjacency List', microseconds: 0.15, memoryBytes: listSpace * 24 },
    { operation: 'Search (none)', structure: 'Adjacency Matrix', microseconds: 0.018, memoryBytes: matrixSpace * 8 },
    { operation: 'Search (none)', structure: 'Adjacency List', microseconds: 0.12, memoryBytes: listSpace * 24 },
    { operation: 'Insert (exist node)', structure: 'Adjacency Matrix', microseconds: 0.015, memoryBytes: matrixSpace * 8 },
    { operation: 'Insert (exist node)', structure: 'Adjacency List', microseconds: 0.04, memoryBytes: listSpace * 24 },
    { operation: 'Update', structure: 'Adjacency Matrix', microseconds: 0.018, memoryBytes: matrixSpace * 8 },
    { operation: 'Update', structure: 'Adjacency List', microseconds: 0.18, memoryBytes: listSpace * 24 },
    { operation: 'Delete', structure: 'Adjacency Matrix', microseconds: 0.02, memoryBytes: matrixSpace * 8 },
    { operation: 'Delete', structure: 'Adjacency List', microseconds: 0.2, memoryBytes: listSpace * 24 },
    { operation: 'Traverse All', structure: 'Adjacency Matrix', microseconds: 1.8, memoryBytes: matrixSpace * 8 },
    { operation: 'Traverse All', structure: 'Adjacency List', microseconds: 0.45, memoryBytes: listSpace * 24 },
  ];
}

export function buildGraphData(locations, routes) {
  const locIndex = {};
  locations.forEach((loc, i) => { locIndex[loc.id_lokasi] = i; });

  const n = locations.length;
  const matrix = Array.from({ length: n }, () => Array(n).fill(0));
  const adjList = {};

  locations.forEach(loc => { adjList[loc.id_lokasi] = []; });

  routes.forEach(route => {
    const srcIdx = locIndex[route.id_asal];
    const dstIdx = locIndex[route.id_tujuan];
    if (srcIdx !== undefined && dstIdx !== undefined) {
      matrix[srcIdx][dstIdx] = route.jarak_km;
      adjList[route.id_asal].push({
        target: route.id_tujuan,
        distance: route.jarak_km,
        routeId: route.id_rute,
      });
    }
  });

  return { matrix, adjList, locIndex };
}

export function getLocationName(locations, id) {
  const loc = locations.find(l => l.id_lokasi === id);
  return loc ? loc.nama_lokasi : id;
}

export function calculateDegrees(routes, locationIds) {
  const degrees = {};
  locationIds.forEach(id => { degrees[id] = 0; });
  routes.forEach(r => {
    if (degrees[r.id_asal] !== undefined) degrees[r.id_asal]++;
  });
  return degrees;
}
