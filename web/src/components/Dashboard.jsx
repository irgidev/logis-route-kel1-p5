import { motion } from 'framer-motion';
import { MapPin, Route, Warehouse, Building2, Ruler, TrendingUp, AlertTriangle, Activity } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } }
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export default function Dashboard({ locations = [], routes = [] }) {
  const totalLokasi = locations.length;
  const totalRute = routes.length;
  const gudangCount = locations.filter(l => l.tipe === 'Gudang').length;
  const tujuanCount = locations.filter(l => l.tipe === 'Tujuan').length;
  const totalJarak = routes.reduce((sum, r) => sum + (parseFloat(r.jarak) || 0), 0);
  const rataRataJarak = totalRute > 0 ? (totalJarak / totalRute).toFixed(1) : 0;

  const V = totalLokasi;
  const E = totalRute;
  const maxEdges = V * (V - 1);
  const density = maxEdges > 0 ? ((E / maxEdges) * 100).toFixed(1) : 0;
  const matrixSize = V * V;
  const wasteCells = matrixSize - E;
  const isSparse = parseFloat(density) < 30;

  const statCards = [
    { icon: <MapPin size={20} />, label: 'Total Lokasi', value: totalLokasi, color: '#2563eb', bg: '#eff6ff' },
    { icon: <Route size={20} />, label: 'Total Rute', value: totalRute, color: '#8b5cf6', bg: '#f5f3ff' },
    { icon: <Warehouse size={20} />, label: 'Gudang Pusat', value: gudangCount, color: '#d97706', bg: '#fffbeb' },
    { icon: <Building2 size={20} />, label: 'Cabang Tujuan', value: tujuanCount, color: '#0891b2', bg: '#ecfeff' },
    { icon: <Ruler size={20} />, label: 'Total Jarak', value: totalJarak.toLocaleString() + ' km', color: '#059669', bg: '#ecfdf5' },
    { icon: <TrendingUp size={20} />, label: 'Rata-rata Jarak', value: rataRataJarak + ' km', color: '#e11d48', bg: '#fff1f2' },
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <section>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {statCards.map((card, i) => (
            <motion.div key={i} variants={item} whileHover={{ y: -3 }} style={{ background: '#fff', borderRadius: 14, padding: '18px', border: '1px solid #e8ecf1', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 42, height: 42, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', background: card.bg, color: card.color }}>{card.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#0f172a' }}>{card.value}</div>
                <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', color: '#94a3b8' }}>{card.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <motion.div variants={item} style={{ background: '#fff', borderRadius: 16, border: '1px solid #e8ecf1', overflow: 'hidden' }}>
        <div style={{ padding: '18px 22px', borderBottom: '1px solid #f1f5f9', background: 'rgba(248,250,252,0.6)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 9, margin: 0 }}>
            <Activity size={17} style={{ color: '#2563eb' }} />
            Analisis Kepadatan Graf dan Efisiensi Ruang
          </h3>
          <p style={{ fontSize: 13, color: '#64748b', marginTop: 4, marginLeft: 26 }}>Evaluasi efisiensi struktur data berdasarkan karakteristik graf saat ini.</p>
        </div>

        <div style={{ padding: '18px 22px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
            <div style={{ background: '#f8fafc', borderRadius: 10, padding: '14px', border: '1px solid #f1f5f9' }}>
              <div style={{ fontSize: 12, color: '#64748b' }}>Sel Matrix Total</div>
              <div style={{ fontSize: 19, fontWeight: 800, color: '#0f172a' }}>{matrixSize}</div>
              <div style={{ fontSize: 10, color: '#60a5fa' }}>O(V^2)</div>
            </div>
            <div style={{ background: '#f8fafc', borderRadius: 10, padding: '14px', border: '1px solid #f1f5f9' }}>
              <div style={{ fontSize: 12, color: '#64748b' }}>Sel Terisi (Edge)</div>
              <div style={{ fontSize: 19, fontWeight: 800, color: '#0f172a' }}>{E}</div>
              <div style={{ fontSize: 10, color: '#34d399' }}>Edge aktif</div>
            </div>
            <div style={{ background: '#f8fafc', borderRadius: 10, padding: '14px', border: '1px solid #f1f5f9' }}>
              <div style={{ fontSize: 12, color: '#64748b' }}>Sel Kosong (Waste)</div>
              <div style={{ fontSize: 19, fontWeight: 800, color: '#0f172a' }}>{wasteCells}</div>
              <div style={{ fontSize: 10, color: '#fb7185' }}>Memori terbuang</div>
            </div>
            <div style={{ background: '#f8fafc', borderRadius: 10, padding: '14px', border: '1px solid #f1f5f9' }}>
              <div style={{ fontSize: 12, color: '#64748b' }}>Efisiensi Ruang</div>
              <div style={{ fontSize: 19, fontWeight: 800, color: '#0f172a' }}>{density}%</div>
              <div style={{ fontSize: 10, color: '#22d3ee' }}>Space used</div>
            </div>
          </div>

          <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>Space Efficiency</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>{density}%</span>
          </div>

          <div style={{ position: 'relative', height: 16, borderRadius: 999, overflow: 'hidden', background: '#f1f5f9', marginBottom: 20 }}>
            <motion.div initial={{ width: 0 }} animate={{ width: Math.min(parseFloat(density), 100) + '%' }} transition={{ duration: 1000, delay: 0.4 }} style={{ height: '100%', background: isSparse ? '#d97706' : '#10b981', borderRadius: 999 }} />
          </div>

          {isSparse ? (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 16px', borderRadius: 12, background: '#fffbeb', border: '1px solid #fde68a' }}>
              <AlertTriangle size={18} style={{ color: '#d97706', flexShrink: 0 }} />
              <p style={{ fontSize: 13, color: '#92400e', margin: 0 }}>
                <strong>Sparse Graph terdeteksi.</strong> Kepadatan {density}%. Adjacency Matrix mengalokasikan O(V^2) ruang. Adjacency List lebih efisien: O(V+E).
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 16px', borderRadius: 12, background: '#ecfdf5', border: '1px solid #bbf7d0' }}>
              <TrendingUp size={18} style={{ color: '#059669', flexShrink: 0 }} />
              <p style={{ fontSize: 13, color: '#047857', margin: 0 }}>
                <strong>Dense Graph.</strong> Kepadatan {density}%. Matrix dapat dijustifikasi untuk edge lookup O(1).
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
