




import { useState, useCallback, useMemo, useEffect } from 'react';
import { 
  DEFAULT_LOCATIONS, DEFAULT_ROUTES,
  buildGraphData, calculateDegrees,
  fetchMasterData, fetchScalingData,
  subsampleData, getBenchmarkForSize,
  SIZE_SCENARIOS, DEFAULT_SCENARIO_IDX,
} from '../data/dataset';

export function useGraphData() {
  
  const [scenarioIndex, setScenarioIndex] = useState(DEFAULT_SCENARIO_IDX);
  
  
  const [locations, setLocations] = useState(DEFAULT_LOCATIONS);
  const [routes, setRoutes] = useState(DEFAULT_ROUTES);
  const [notification, setNotification] = useState(null);
  const [benchmarkResults, setBenchmarkResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  
  const [masterData, setMasterData] = useState(null);
  const [scalingJson, setScalingJson] = useState(null);

  
  useEffect(() => {
    let cancelled = false;

    async function init() {
      setIsLoading(true);
      
      
      const [master, scaling] = await Promise.all([
        fetchMasterData(),
        fetchScalingData(),
      ]);

      if (!cancelled) {
        setMasterData(master);
        setScalingJson(scaling);

        
        applyScenario(DEFAULT_SCENARIO_IDX, master, scaling);
        setIsLoading(false);
      }
    }

    init();
    return () => { cancelled = true; };
  }, []);

  
  const applyScenario = useCallback((idx, master, scaling) => {
    const scenario = SIZE_SCENARIOS[idx];
    if (!master || !master.locations) return;

    const { locations: locs, routes: rtes } = subsampleData(
      master, scenario.vertices, scenario.edges
    );

    setLocations(locs);
    setRoutes(rtes);
    setScenarioIndex(idx);

    
    const bench = getBenchmarkForSize(scaling, scenario.vertices);
    setBenchmarkResults(bench || []);

    console.log(
      `[useGraphData] Scenario applied: ${scenario.label} ` +
      `(V=${locs.length}, E=${rtes.length})`
    );
  }, []);

  
  const notify = useCallback((message, type = 'success') => {
    setNotification({ message, type, id: Date.now() });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  
  const changeScenario = useCallback((idx) => {
    if (!masterData) return;
    
    
    const scenario = SIZE_SCENARIOS[idx];
    setIsLoading(true);

    
    setTimeout(() => {
      applyScenario(idx, masterData, scalingJson);
      setIsLoading(false);
      notify(`Dataset diubah ke ${scenario.label} (${scenario.desc})`, 'success');
    }, 150);
  }, [masterData, scalingJson, applyScenario, notify]);

  
  const graphData = useMemo(() => 
    buildGraphData(locations, routes), [locations, routes]
  );

  const degrees = useMemo(() => 
    calculateDegrees(routes, locations.map(l => l.id_lokasi)), 
    [routes, locations]
  );

  

  const addLocation = useCallback((newLoc) => {
    const exists = locations.find(l => l.id_lokasi === newLoc.id_lokasi);
    if (exists) {
      notify(`Lokasi ${newLoc.id_lokasi} sudah ada!`, 'error');
      return false;
    }
    setLocations(prev => [...prev, newLoc]);
    notify(`Lokasi "${newLoc.nama_lokasi}" ditambahkan`, 'success');
    return true;
  }, [locations, notify]);

  const updateLocation = useCallback((id, updates) => {
    setLocations(prev => prev.map(l => 
      l.id_lokasi === id ? { ...l, ...updates } : l
    ));
    notify(`Lokasi ${id} diperbarui`, 'success');
  }, [notify]);

  const deleteLocation = useCallback((id) => {
    setRoutes(prev => prev.filter(r => r.id_asal !== id && r.id_tujuan !== id));
    setLocations(prev => prev.filter(l => l.id_lokasi !== id));
    notify(`Lokasi ${id} dan semua rute terkait dihapus`, 'success');
  }, [notify]);

  

  const addRoute = useCallback((newRoute) => {
    const exists = routes.find(r => r.id_rute === newRoute.id_rute);
    if (exists) {
      notify(`Rute ${newRoute.id_rute} sudah ada! Gunakan update.`, 'error');
      return false;
    }
    const srcExists = locations.find(l => l.id_lokasi === newRoute.id_asal);
    const dstExists = locations.find(l => l.id_lokasi === newRoute.id_tujuan);
    if (!srcExists || !dstExists) {
      notify('Lokasi asal atau tujuan tidak ditemukan!', 'error');
      return false;
    }
    setRoutes(prev => [...prev, newRoute]);
    notify(`Rute ${newRoute.id_rute} ditambahkan`, 'success');
    return true;
  }, [routes, locations, notify]);

  const updateRoute = useCallback((id, updates) => {
    setRoutes(prev => prev.map(r =>
      r.id_rute === id ? { ...r, ...updates } : r
    ));
    notify(`Rute ${id} diperbarui`, 'success');
  }, [notify]);

  const deleteRoute = useCallback((id) => {
    setRoutes(prev => prev.filter(r => r.id_rute !== id));
    notify(`Rute ${id} dihapus`, 'success');
  }, [notify]);

  

  const searchRoute = useCallback((asalId, tujuanId) => {
    return routes.find(r => r.id_asal === asalId && r.id_tujuan === tujuanId) || null;
  }, [routes]);

  const getRoutesFrom = useCallback((locationId) => {
    return routes.filter(r => r.id_asal === locationId);
  }, [routes]);

  

  const stats = useMemo(() => ({
    totalLocations: locations.length,
    totalRoutes: routes.length,
    gudangCount: locations.filter(l => l.tipe_lokasi === 'Gudang').length,
    tujuanCount: locations.filter(l => l.tipe_lokasi === 'Tujuan').length,
    totalDistance: routes.reduce((sum, r) => sum + r.jarak_km, 0),
    avgDistance: routes.length > 0 ? (routes.reduce((sum, r) => sum + r.jarak_km, 0) / routes.length).toFixed(1) : 0,
    matrixCells: locations.length * locations.length,
    matrixFilled: routes.length,
    matrixEmpty: (locations.length * locations.length) - routes.length,
    spaceEfficiency: locations.length > 0 
      ? ((routes.length / (locations.length * locations.length)) * 100).toFixed(2)
      : 0,
    maxDegree: Math.max(...Object.values(degrees), 0),
    isLoading,
    scenarioIndex,
    scenario: SIZE_SCENARIOS[scenarioIndex],
  }), [locations, routes, degrees, isLoading, scenarioIndex]);

  return {
    
    locations,
    routes,
    graphData,
    degrees,
    stats,
    notification,
    benchmarkResults,

    
    isLoading,
    scenarioIndex,
    scenarios: SIZE_SCENARIOS,
    changeScenario,

    
    addLocation,
    updateLocation,
    deleteLocation,

    
    addRoute,
    updateRoute,
    deleteRoute,

    
    searchRoute,
    getRoutesFrom,

    
    notify,
  };
}
