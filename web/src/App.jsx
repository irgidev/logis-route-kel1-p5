





import { useState, useCallback, useMemo } from 'react';
import { Truck, Network, BarChart3, Zap, MapPin, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGraphData } from './hooks/useGraphData';
import Dashboard from './components/Dashboard';
import SearchPanel from './components/SearchPanel';
import GraphView from './components/GraphView';
import LocationTable from './components/LocationTable';
import RouteTable from './components/RouteTable';
import BenchmarkChart from './components/BenchmarkChart';
import './App.css';


const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'graph', label: 'Visualisasi Graf', icon: Network },
  { id: 'search', label: 'Pencarian Rute', icon: Zap },
  { id: 'locations', label: 'Data Lokasi', icon: Truck },
  { id: 'routes', label: 'Data Rute', icon: Network },
  { id: 'benchmark', label: 'Benchmark', icon: BarChart3 },
];


const SCENARIO_COLORS = [
  { bg: '#f0f9ff', border: '#bae6fd', text: '#0369a1' },   
  { bg: '#f0fdf4', border: '#bbf7d0', text: '#15803d' },   
  { bg: '#fefce8', border: '#fef08a', text: '#a16207' },   
  { bg: '#fdf2f8', border: '#fecdd3', text: '#be123d' },   
  { bg: '#eff6ff', border: '#93c5fd', text: '#1d4ed8' },    
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  
  const {
    locations: rawLocations,
    routes: rawRoutes,
    degrees,
    stats,
    notification,
    benchmarkResults,
    isLoading,
    scenarioIndex,
    scenarios,
    changeScenario,
    addLocation,
    deleteLocation,
    addRoute,
    updateRoute,
    deleteRoute,
  } = useGraphData();

  
  const locations = useMemo(() => rawLocations.map(l => ({
    id: l.id_lokasi,
    nama: l.nama_lokasi,
    tipe: l.tipe_lokasi,
  })), [rawLocations]);

  const routes = useMemo(() => rawRoutes.map(r => ({
    id: r.id_rute,
    asal: r.id_asal,
    tujuan: r.id_tujuan,
    jarak: r.jarak_km,
  })), [rawRoutes]);

  
  const handleAddRoute = useCallback((newRoute) => {
    addRoute({
      id_rute: newRoute.id || `R${String(routes.length + 1).padStart(3,'0')}`,
      id_asal: newRoute.asal,
      id_tujuan: newRoute.tujuan,
      jarak_km: parseFloat(newRoute.jarak) || 0,
    });
    return true;
  }, [addRoute, routes.length]);

  const handleAddLocation = useCallback((newLoc) => {
    const nextId = `L${String(locations.length + 1).padStart(3,'0')}`;
    return addLocation({
      id_lokasi: nextId,
      nama_lokasi: newLoc.nama,
      tipe_lokasi: newLoc.tipe,
    });
  }, [addLocation, locations.length]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':   return <Dashboard locations={locations} routes={routes} />;
      case 'graph':      return <GraphView locations={locations} routes={routes} />;
      case 'search':     return <SearchPanel locations={locations} routes={routes} />;
      case 'locations':  return (
        <LocationTable
          locations={locations}
          onAddLocation={handleAddLocation}
          onUpdateLocation={(id, data) => {}}
          onDeleteLocation={deleteLocation}
        />
      );
      case 'routes':     return (
        <RouteTable
          routes={routes}
          locations={locations}
          onAddRoute={handleAddRoute}
          onUpdateRoute={updateRoute}
          onDeleteRoute={deleteRoute}
        />
      );
      case 'benchmark':  return <BenchmarkChart benchmarkResults={benchmarkResults} currentScenario={scenarios[scenarioIndex]} />;
      default:           return <Dashboard locations={locations} routes={routes} />;
    }
  };

  const activeTabInfo = TABS.find(t => t.id === activeTab);
  const V = stats.totalLocations || locations.length;
  const E = stats.totalRoutes || routes.length;
  const density = stats.spaceEfficiency || ((V * V > 0) ? ((E / (V * V)) * 100).toFixed(2) : 0);

  return (
    <div className="app-container">
      { }
      <AnimatePresence>
        {notification && (
          <div className="toast-container">
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              className={`toast toast-${notification.type || 'success'}`}
            >
              <span className="toast-icon">
                {notification.type === 'success' ? '✅' :
                 notification.type === 'error' ? '❌' : '⚠️'}
              </span>
              <div className="toast-body">
                <div className="toast-title">
                  {notification.type === 'success' ? 'Berhasil!' :
                   notification.type === 'error' ? 'Error' : 'Perhatian'}
                </div>
                <div className="toast-message">{notification.message}</div>
              </div>
              <button className="toast-close" onClick={() => {}}>✕</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      { }
      <header className="header">
        <div className="header-inner">
          { }
          <div className="logo-section">
            <div className="logo-icon">
              <Network size={20} />
            </div>
            <div className="logo-text">
              <h1>LogisRoute</h1>
              <p>Sistem Distribusi</p>
            </div>
          </div>

          { }
          <nav style={{
            display: 'flex',
            gap: 4,
            flexWrap: 'wrap',
            justifyContent: 'center',
            flex: 1,
            marginLeft: 16,
          }}>
            {TABS.map((tab) => {
              const IconComp = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 7,
                    padding: '8px 15px',
                    borderRadius: 10,
                    fontSize: '0.81rem',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#1d4ed8' : '#475569',
                    background: isActive ? '#eff6ff' : 'transparent',
                    border: '1px solid transparent',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isActive ? '0 1px 3px rgba(29,78,216,0.08)' : 'none',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.background = '#f8fafc';
                      e.currentTarget.style.color = '#334155';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#475569';
                    }
                  }}
                >
                  <IconComp size={15} style={{ flexShrink: 0 }} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      { }
      <div style={{
        background: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}>
        { }
        <div style={{
          padding: '16px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
          flexWrap: 'wrap',
        }}>
          { }
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 42, height: 42, borderRadius: 13,
              background: '#eff6ff', border: '1px solid #dbeafe',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#2563eb', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.04)',
            }}>
              {activeTabInfo && (() => { const I = activeTabInfo.icon; return I ? <I size={21} /> : null; })()}
            </div>
            <div>
              <h2 style={{
                fontSize: '1.28rem', fontWeight: 800,
                letterSpacing: '-0.03em', color: '#0f172a', margin: 0, lineHeight: 1.25,
              }}>
                {activeTabInfo?.label || 'Dashboard'}
              </h2>
            </div>
          </div>

          { }
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 9,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.74rem',
            flexShrink: 0,
          }}>
            {isLoading ? (
              <div style={{
                background: '#f1f5f9', color: '#94a3b8',
                padding: '7px 15px', borderRadius: 10,
                border: '1px solid #e2e8f0',
                display: 'flex', alignItems: 'center', gap: 7,
              }}>
                <div style={{
                  width: 12, height: 12, borderRadius: '50%',
                  border: '2px solid #cbd5e1', borderTopColor: '#2563eb',
                  animation: 'spin 0.7s linear infinite',
                }} />
                Loading...
              </div>
            ) : (
              <>
                <div style={{
                  background: '#eff6ff', color: '#1d4ed8',
                  padding: '7px 13px', borderRadius: 10,
                  border: '1px solid #dbeafe', whiteSpace: 'nowrap',
                  display: 'flex', alignItems: 'center', gap: 4,
                  fontWeight: 600,
                }}>
                  <span style={{ fontWeight: 900 }}>V=</span>{V}
                </div>
                <div style={{
                  background: '#f5f3ff', color: '#7c3aed',
                  padding: '7px 13px', borderRadius: 10,
                  border: '1px solid #ede9fe', whiteSpace: 'nowrap',
                  display: 'flex', alignItems: 'center', gap: 4,
                  fontWeight: 600,
                }}>
                  <span style={{ fontWeight: 900 }}>E=</span>{E}
                </div>
                <div style={{
                  background: '#ecfeff', color: '#0891b2',
                  padding: '7px 13px', borderRadius: 10,
                  border: '1px solid #cffafe', whiteSpace: 'nowrap',
                  display: 'flex', alignItems: 'center', gap: 4,
                  fontWeight: 600,
                }}>
                  <span style={{ fontWeight: 900 }}>ρ=</span>{density}%
                </div>
              </>
            )}
          </div>
        </div>

        { }
        {!isLoading && (
          <div style={{
            padding: '10px 32px 14px',
            borderTop: '1px solid #f1f5f9',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            flexWrap: 'wrap',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              fontSize: '0.72rem', fontWeight: 700,
              color: '#64748b', textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginRight: 2,
            }}>
              <Database size={13} /> Ukuran Dataset
            </div>

            {scenarios.map((scenario, idx) => {
              const isActive = idx === scenarioIndex;
              const colors = SCENARIO_COLORS[idx];
              return (
                <button
                  key={idx}
                  onClick={() => changeScenario(idx)}
                  disabled={isLoading}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '6px 14px',
                    borderRadius: 9,
                    fontSize: '0.73rem',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? colors.text : '#64748b',
                    background: isActive ? colors.bg : '#f8fafc',
                    border: `1px solid ${isActive ? colors.border : '#e2e8f0'}`,
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease',
                    boxShadow: isActive ? `0 1px 4px ${colors.text}18` : 'none',
                    opacity: isLoading ? 0.45 : 1,
                  }}
                  onMouseEnter={e => {
                    if (!isActive && !isLoading) {
                      e.currentTarget.style.background = '#f1f5f9';
                      e.currentTarget.style.borderColor = '#cbd5e1';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive && !isLoading) {
                      e.currentTarget.style.background = '#f8fafc';
                      e.currentTarget.style.borderColor = '#e2e8f0';
                    }
                  }}
                >
                  <span style={{
                    width: 7, height: 7, borderRadius: '50%',
                    background: isActive ? colors.text : '#cbd5e1',
                    flexShrink: 0,
                    transition: 'background 0.2s ease',
                  }} />
                  <span>{scenario.label}</span>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.68rem',
                    opacity: isActive ? 1 : 0.65,
                    fontWeight: 700,
                  }}>
                    ({scenario.vertices},{scenario.edges})
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      { }
      <main className="main-content">
        {isLoading ? (
           
          <div style={{ paddingTop: 36 }}>
            <div style={{ 
              display: 'flex', flexDirection: 'column', gap: 24, 
              alignItems: 'center', justifyContent: 'center', minHeight: 400 
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                border: '3px solid #e2e8f0',
                borderTopColor: '#2563eb',
                animation: 'spin 0.8s linear infinite',
                marginBottom: 20,
              }} />
              <p style={{ fontSize: 15, fontWeight: 600, color: '#334155' }}>Memuat data jaringan...</p>
              <p style={{ fontSize: 13, color: '#94a3b8' }}>
                Mengambil dataset dari benchmark results
              </p>
            </div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${scenarioIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, transition: { duration: 0.12 } }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="tab-content-wrapper"
              style={{ paddingTop: 28 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        )}
      </main>

      { }
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-left">
            <span className="footer-course">Struktur Data Genap 2025/2026</span>
            <span className="footer-team">Kelompok 1 — Paralel 5 — SSMI — IPB University</span>
          </div>

          <div className="footer-right">
            <span className="tech-badge">React + Vite</span>
            <span className="tech-badge">C++ Backend</span>
            <span className="tech-badge">TailwindCSS</span>
            <span className="comparison-badge">
              <span className="win">Matrix</span> vs <span className="lose">List</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
