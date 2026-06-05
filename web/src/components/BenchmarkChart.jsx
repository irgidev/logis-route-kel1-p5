import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Clock, Zap, TrendingUp, Cpu, Database, HardDrive } from 'lucide-react';



const BENCHMARK_DATA = [
  {
    operation: 'Search (exist)',
    matrix: 0.02,
    list: 0.15,
    unit: '\u00b5s',
    desc: 'Pencarian edge yang ada dalam graf',
    icon: <SearchIcon />,
    color: '#2563eb',
    bg: '#eff6ff',
    matrixMem: '2.00 MB',
    listMem: '114 KB',
  },
  {
    operation: 'Search (none)',
    matrix: 0.018,
    list: 0.12,
    unit: '\u00b5s',
    desc: 'Pencarian edge yang tidak ada',
    icon: <SearchIcon />,
    color: '#8b5cf6',
    bg: '#f5f3ff',
    matrixMem: '2.00 MB',
    listMem: '114 KB',
  },
  {
    operation: 'Insert Edge',
    matrix: 0.015,
    list: 0.04,
    unit: '\u00b5s',
    desc: 'Penambahan edge baru ke graf',
    icon: <ZapIcon />,
    color: '#059669',
    bg: '#ecfdf5',
    matrixMem: '2.00 MB',
    listMem: '114 KB',
  },
  {
    operation: 'Update Edge',
    matrix: 0.018,
    list: 0.18,
    unit: '\u00b5s',
    desc: 'Update nilai jarak pada edge',
    icon: <TrendingUpIcon />,
    color: '#d97706',
    bg: '#fffbeb',
    matrixMem: '2.00 MB',
    listMem: '114 KB',
  },
  {
    operation: 'Delete Edge',
    matrix: 0.02,
    list: 0.20,
    unit: '\u00b5s',
    desc: 'Penghapusan edge dari graf',
    icon: <DatabaseIcon />,
    color: '#e11d48',
    bg: '#fff1f2',
    matrixMem: '2.00 MB',
    listMem: '114 KB',
  },
  {
    operation: 'Traverse All',
    matrix: 1.85,
    list: 0.45,
    unit: '\u00b5s',
    desc: 'Traversal seluruh simpul & sisi',
    icon: <CpuIcon />,
    color: '#0891b2',
    bg: '#ecfeff',
    matrixMem: '2.00 MB',
    listMem: '114 KB',
  },
];

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  );
}
function ZapIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  );
}
function TrendingUpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 17 6-6 4 4 8-8 M17 7h4v4"/>
    </svg>
  );
}
function DatabaseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>
    </svg>
  );
}
function CpuIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2 M15 20v2 M2 15h2 M2 9h2 M20 15h2 M20 9h2 M9 2v2 M9 20v2"/>
    </svg>
  );
}

export default function BenchmarkChart({ benchmarkResults = [], currentScenario = null }) {
  const [hoveredBar, setHoveredBar] = useState(null);

  
  const displayData = useMemo(() => {
    if (benchmarkResults && benchmarkResults.length >= 12) {
      
      return BENCHMARK_DATA.map((def, i) => {
        
        const matResult = benchmarkResults.find(b =>
          b.operation === def.operation && b.structure === 'Adjacency Matrix'
        );
        const listResult = benchmarkResults.find(b =>
          b.operation === def.operation && b.structure === 'Adjacency List'
        );
        
        return {
          ...def,
          matrix: matResult ? Math.max(matResult.microseconds, 0.01) : def.matrix,
          list: listResult ? Math.max(listResult.microseconds, 0.01) : def.list,
          matrixMem: matResult ? formatBytes(matResult.memoryBytes) : def.matrixMem,
          listMem: listResult ? formatBytes(listResult.memoryBytes) : def.listMem,
        };
      });
    }
    return BENCHMARK_DATA;
  }, [benchmarkResults]);

  const maxVal = Math.max(...displayData.flatMap(d => [d.matrix, d.list]));

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.07 } }
  };

  const item = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      style={{ display: 'flex', flexDirection: 'column', gap: 28 }}
    >
      { }
      <motion.div
        variants={item}
        style={{
          background: '#ffffff', borderRadius: 18,
          border: '1px solid #e2e8f0',
          padding: '26px 30px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.02), 0 10px 25px rgba(0,0,0,0.03)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 13,
            background: '#eff6ff', border: '1px solid #dbeafe',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#2563eb',
          }}>
            <BarChart3 size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0f172a', margin: 0 }}>
              Perbandingan Performa Struktur Data
            </h3>
            <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>
              Waktu eksekusi operasi krusial — Adjacency Matrix vs Adjacency List
              {currentScenario && (
                <span style={{
                  marginLeft: 8, padding: '2px 9px', borderRadius: 6,
                  background: '#f1f5f9', fontSize: 11, fontWeight: 600,
                  color: '#64748b', fontFamily: "'JetBrains Mono', monospace",
                }}>
                  V={currentScenario.vertices} | E={currentScenario.edges}
                </span>
              )}
            </p>
          </div>
        </div>

        { }
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              width: 14, height: 14, borderRadius: 4,
              background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
              boxShadow: '0 2px 6px rgba(37,99,235,0.25)',
            }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>Adjacency Matrix</span>
            <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: '#94a3b8' }}>O(V\u00b2) space</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              width: 14, height: 14, borderRadius: 4,
              background: 'linear-gradient(135deg, #06b6d4, #22d3ee)',
              boxShadow: '0 2px 6px rgba(6,182,212,0.25)',
            }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>Adjacency List</span>
            <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: '#94a3b8' }}>O(V+E) space</span>
          </div>
        </div>
      </motion.div>

      { }
      <motion.div
        variants={item}
        style={{
          background: '#ffffff', borderRadius: 18,
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
          boxShadow: '0 2px 10px rgba(0,0,0,0.02), 0 10px 25px rgba(0,0,0,0.03)',
        }}
      >
        <div style={{ padding: '28px 32px' }}>
          {displayData.map((data, i) => {
            const mWidth = (data.matrix / maxVal) * 100;
            const lWidth = (data.list / maxVal) * 100;
            const isMatrixFaster = data.matrix <= data.list;

            return (
              <motion.div
                key={data.operation}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.07 }}
                onMouseEnter={() => setHoveredBar(i)}
                onMouseLeave={() => setHoveredBar(null)}
                style={{
                  padding: '20px 0',
                  borderBottom: i < displayData.length - 1 ? '1px solid #f1f5f9' : 'none',
                  cursor: 'default',
                  borderRadius: hoveredBar === i ? 10 : 0,
                  background: hoveredBar === i ? '#fafafa/60' : 'transparent',
                  transition: 'background 0.2s ease',
                }}
              >
                { }
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  marginBottom: 12,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: 10,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: data.bg, color: data.color,
                    }}>
                      {data.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{data.operation}</div>
                      <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{data.desc}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 10, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>Matrix</div>
                      <div style={{
                        fontSize: 16, fontWeight: 800, color: isMatrixFaster ? '#0891b2' : '#f43f5e',
                        fontFamily: "'JetBrains Mono', monospace",
                      }}>
                        {data.matrix}{data.unit}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 10, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>List</div>
                      <div style={{
                        fontSize: 16, fontWeight: 800, color: !isMatrixFaster ? '#0891b2' : '#f43f5e',
                        fontFamily: "'JetBrains Mono', monospace",
                      }}>
                        {data.list}{data.unit}
                      </div>
                    </div>
                  </div>
                </div>

                { }
                <div style={{ position: 'relative', height: 36, display: 'flex', flexDirection: 'column', gap: 7 }}>
                  { }
                  <div style={{ position: 'relative', height: 14, borderRadius: 999, background: '#f1f5f9', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(mWidth, 100)}%` }}
                      transition={{ duration: 1000, delay: 0.4 + i * 0.09, ease: [0.34, 1.56, 0.64, 1] }}
                      style={{
                        height: '100%',
                        background: `linear-gradient(to right, ${data.color}, ${data.color}cc)`,
                        borderRadius: 999,
                        minWidth: data.matrix > 0 ? 3 : 0,
                        boxShadow: `0 2px 8px ${data.color}30`,
                      }}
                    />
                    <span style={{
                      position: 'absolute', left: `${Math.min(mWidth + 2, 96)}%`, top: '50%',
                      transform: 'translateY(-50%)',
                      fontSize: 10, fontWeight: 700, color: data.color,
                      fontFamily: "'JetBrains Mono', monospace",
                      whiteSpace: 'nowrap',
                    }}>
                      {data.matrix}{data.unit}
                    </span>
                  </div>

                  { }
                  <div style={{ position: 'relative', height: 14, borderRadius: 999, background: '#f1f5f9', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(lWidth, 100)}%` }}
                      transition={{ duration: 1000, delay: 0.55 + i * 0.09, ease: [0.34, 1.56, 0.64, 1] }}
                      style={{
                        height: '100%',
                        background: 'linear-gradient(to right, #06b6d4, #22d3ee)',
                        borderRadius: 999,
                        minWidth: data.list > 0 ? 3 : 0,
                        boxShadow: '0 2px 8px rgba(6,182,212,0.3)',
                      }}
                    />
                    <span style={{
                      position: 'absolute', left: `${Math.min(lWidth + 2, 96)}%`, top: '50%',
                      transform: 'translateY(-50%)',
                      fontSize: 10, fontWeight: 700, color: '#06b6d4',
                      fontFamily: "'JetBrains Mono', monospace",
                      whiteSpace: 'nowrap',
                    }}>
                      {data.list}{data.unit}
                    </span>
                  </div>
                </div>

                { }
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  marginTop: 8, paddingTop: 8,
                  borderTop: '1px dashed #f1f5f9',
                }}>
                  <span style={{ fontSize: 10, color: '#94a3b8', fontFamily: "'JetBrains Mono', monospace" }}>
                    Mem: {data.matrixMem}
                  </span>
                  <span style={{ fontSize: 10, color: '#94a3b8', fontFamily: "'JetBrains Mono', monospace" }}>
                    Mem: {data.listMem}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      { }
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 16,
      }}>
        {[
          {
            title: 'Lookup Cepat',
            winner: 'Matrix \u23da',
            reason: 'O(1) direct index access untuk pengecekan edge antar node — sangat cepat pada dataset besar.',
            icon: <Clock size={18} />, color: '#2563eb', bg: '#eff6ff',
          },
          {
            title: 'Efisiensi Memori',
            winner: 'List \u2605',
            reason: `O(V+E) space = ~114KB vs Matrix O(V\u00b2) = ~2MB. Hemat 94.4% memori!`,
            icon: <HardDrive size={18} />, color: '#06b6d4', bg: '#ecfeff',
          },
          {
            title: 'Operasi CRUD',
            winner: 'List \u2605',
            reason: 'Insert/delete lebih efisien tanpa realokasi array 500\u00d7500.',
            icon: <Zap size={18} />, color: '#059669', bg: '#ecfdf5',
          },
          {
            title: 'Rekomendasi Final',
            winner: 'List \u2605\u2605\u2605',
            reason: 'Untuk sparse graph distribusi ini (\u03c1=1%), Adjacency List adalah pilihan optimal secara keseluruhan.',
            icon: <TrendingUp size={18} />, color: '#8b5cf6', bg: '#f5f3ff',
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            variants={item}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            style={{
              background: '#ffffff', borderRadius: 16, padding: 22,
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 10px rgba(0,0,0,0.02), 0 10px 25px rgba(0,0,0,0.03)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 11,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: card.bg, color: card.color,
              }}>
                {card.icon}
              </div>
              <div>
                <h4 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', margin: 0 }}>{card.title}</h4>
                <span style={{
                  fontSize: 12, fontWeight: 800, color: card.color,
                  fontFamily: "'JetBrains Mono', monospace",
                }}>
                  {card.winner}
                </span>
              </div>
            </div>
            <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6, margin: 0 }}>{card.reason}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}
