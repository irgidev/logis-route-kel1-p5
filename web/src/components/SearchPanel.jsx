import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, CheckCircle2, XCircle, Clock, MapPin } from 'lucide-react';

export default function SearchPanel({ locations = [], routes = [] }) {
  const [asalId, setAsalId] = useState('');
  const [tujuanId, setTujuanId] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = () => {
    if (!asalId || !tujuanId) return;
    
    const found = routes.find(
      r => String(r.asal) === String(asalId) && String(r.tujuan) === String(tujuanId)
    );
    
    const asalLoc = locations.find(l => String(l.id) === String(asalId));
    const tujuanLoc = locations.find(l => String(l.id) === String(tujuanId));

    setResult({ found: !!found, route: found, asal: asalLoc, tujuan: tujuanLoc });
  };

  const handleReset = () => {
    setAsalId(''); setTujuanId(''); setResult(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 900, margin: '0 auto' }}
    >
      { }
      <div style={{
        background: '#ffffff', borderRadius: 18,
        border: '1px solid #e2e8f0',
        boxShadow: '0 2px 10px rgba(0,0,0,0.02), 0 10px 25px rgba(0,0,0,0.03)',
        padding: '28px 32px',
      }}>
        { }
        <div style={{ marginBottom: 24 }}>
          <h3 style={{
            fontSize: 16, fontWeight: 700, color: '#0f172a',
            display: 'flex', alignItems: 'center', gap: 10, margin: 0,
          }}>
            <Search size={18} style={{ color: '#2563eb' }} />
            Cari Rute Distribusi
          </h3>
          <p style={{ fontSize: 13, color: '#64748b', marginTop: 5, marginLeft: 28 }}>
            Pilih lokasi asal dan tujuan untuk mengecek ketersediaan rute
          </p>
        </div>

        { }
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          gap: 16,
          alignItems: 'end',
        }}>
          { }
          <div>
            <label style={{
              display: 'block', fontSize: 12, fontWeight: 600,
              color: '#64748b', marginBottom: 8,
              textTransform: 'uppercase', letterSpacing: '0.05em',
            }}>
              <MapPin size={13} style={{ marginRight: 5, verticalAlign: '-2px' }} />
              Lokasi Asal
            </label>
            <select
              value={asalId}
              onChange={(e) => setAsalId(e.target.value)}
              style={{
                width: '100%', padding: '13px 16px', borderRadius: 12,
                background: '#f8fafc', border: '1px solid #e2e8f0',
                color: '#0f172a', fontSize: 14, fontWeight: 500,
                outline: 'none', cursor: 'pointer', appearance: 'none',
                transition: 'all 0.2s ease',
              }}
              onFocus={(e) => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 4px rgba(37,99,235,0.08)'; }}
              onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
            >
              <option value="">— Pilih lokasi asal —</option>
              {locations.map(loc => (
                <option key={loc.id} value={loc.id}>
                  [{String(loc.id).padStart(3,'0')}] {loc.nama} ({loc.tipe})
                </option>
              ))}
            </select>
          </div>

          { }
          <div style={{
            display: 'flex', justifyContent: 'center', paddingBottom: 5,
          }}>
            <ArrowRight size={22} style={{ color: '#cbd5e1' }} />
          </div>

          { }
          <div>
            <label style={{
              display: 'block', fontSize: 12, fontWeight: 600,
              color: '#64748b', marginBottom: 8,
              textTransform: 'uppercase', letterSpacing: '0.05em',
            }}>
              <MapPin size={13} style={{ marginRight: 5, verticalAlign: '-2px' }} />
              Lokasi Tujuan
            </label>
            <select
              value={tujuanId}
              onChange={(e) => setTujuanId(e.target.value)}
              style={{
                width: '100%', padding: '13px 16px', borderRadius: 12,
                background: '#f8fafc', border: '1px solid #e2e8f0',
                color: '#0f172a', fontSize: 14, fontWeight: 500,
                outline: 'none', cursor: 'pointer', appearance: 'none',
                transition: 'all 0.2s ease',
              }}
              onFocus={(e) => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 4px rgba(37,99,235,0.08)'; }}
              onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
            >
              <option value="">— Pilih lokasi tujuan —</option>
              {locations.map(loc => (
                <option key={loc.id} value={loc.id}>
                  [{String(loc.id).padStart(3,'0')}] {loc.nama} ({loc.tipe})
                </option>
              ))}
            </select>
          </div>
        </div>

        { }
        <div style={{ display: 'flex', gap: 10, marginTop: 22, paddingTop: 20, borderTop: '1px solid #f1f5f9' }}>
          <button
            onClick={handleSearch}
            disabled={!asalId || !tujuanId}
            style={{
              padding: '12px 26px', borderRadius: 12,
              background: (!asalId || !tujuanId) ? 'rgba(37,99,235,0.35)' : '#2563eb',
              color: '#ffffff', fontSize: 14, fontWeight: 700,
              border: 'none', cursor: (!asalId || !tujuanId) ? 'not-allowed' : 'pointer',
              boxShadow: (!asalId || !tujuanId) ? 'none' : '0 4px 14px rgba(37,99,235,0.25)',
              display: 'flex', alignItems: 'center', gap: 8,
              transition: 'all 0.2s ease',
              opacity: (!asalId || !tujuanId) ? 0.45 : 1,
            }}
          >
            <Search size={16} /> Cari Rute
          </button>

          <button
            onClick={handleReset}
            style={{
              padding: '12px 22px', borderRadius: 12,
              background: '#f1f5f9', border: '1px solid #e2e8f0',
              color: '#475569', fontSize: 14, fontWeight: 600,
              cursor: 'pointer', transition: 'all 0.2s ease',
            }}
          >
            Reset
          </button>
        </div>
      </div>

      { }
      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{
              borderRadius: 18, padding: '28px 32px', border: '1px solid',
              background: result.found ? '#ecfdf5/60' : '#fff1f2/60',
              borderColor: result.found ? '#bbf7d0' : '#fecdd3',
              boxShadow: result.found 
                ? '0 2px 10px rgba(16,185,129,0.04)' 
                : '0 2px 10px rgba(244,63,94,0.04)',
            }}
          >
            { }
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 22 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                background: result.found ? '#d1fae5' : '#ffe4e6',
              }}>
                {result.found
                  ? <CheckCircle2 size={26} style={{ color: '#059669' }} />
                  : <XCircle size={26} style={{ color: '#e11d48' }} />
                }
              </div>
              
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4 style={{
                  fontSize: 19, fontWeight: 800, margin: 0,
                  color: result.found ? '#065f46' : '#9f1239',
                }}>
                  {result.found ? '✅ Rute Ditemukan!' : '❌ Rute Tidak Ditemukan'}
                </h4>
                <p style={{
                  fontSize: 14, marginTop: 5,
                  color: result.found ? '#04785799' : '#be123c99',
                  lineHeight: 1.55,
                }}>
                  {result.found
                    ? `Terdapat rute langsung dari ${result.asal?.nama || asalId} menuju ${result.tujuan?.nama || tujuanId}.`
                    : `Tidak ada rute langsung yang terdaftar dari lokasi asal ke tujuan yang dipilih.`
                  }
                </p>
              </div>
            </div>

            { }
            {result.found && result.route && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: 14,
                }}
              >
                {[
                  { label: 'Asal', value: result.route.asal, sub: result.asal?.nama },
                  { label: 'Tujuan', value: result.route.tujuan, sub: result.tujuan?.nama },
                  { label: 'Jarak', value: `${result.route.jarak} km`, sub: null, highlight: true },
                  { label: 'Status', value: 'Aktif', sub: null, status: true },
                ].map((item, idx) => (
                  <div key={idx} style={{
                    background: '#ffffff', borderRadius: 12,
                    padding: 17, border: '1px solid #bbf7d0',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                  }}>
                    <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {item.label}
                    </div>
                    <div style={{
                      fontSize: item.highlight ? 20 : 16,
                      fontWeight: 800,
                      color: item.highlight ? '#0891b2' : '#0f172a',
                      fontFamily: item.highlight ? "'JetBrains Mono', monospace" : undefined,
                    }}>
                      {item.value}
                    </div>
                    {item.sub && (
                      <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{item.sub}</div>
                    )}
                    {item.status && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
                        <span style={{
                          width: 8, height: 8, borderRadius: '50%',
                          background: '#10b981',
                          animation: 'pulse-dot 2s ease-in-out infinite',
                        }} />
                        <span style={{ fontSize: 12, fontWeight: 600, color: '#059669' }}>Aktif</span>
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
            )}

            {!result.found && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '17 20px', borderRadius: 12,
                  background: '#ffffff', border: '1px solid #fecdd3',
                }}
              >
                <Clock size={17} style={{ color: '#f59e0b', flexShrink: 0 }} />
                <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                  Rute ini tidak tersedia dalam struktur graf saat ini. Jika Anda adalah admin dan rute ini valid untuk operasional logistik, Anda dapat menambahkannya melalui menu{' '}
                  <strong style={{ color: '#0f172a' }}>Data Rute → Tambah Rute</strong>.
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
