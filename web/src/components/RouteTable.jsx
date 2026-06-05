import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, X, Check, Search, ArrowRight, Edit3 } from 'lucide-react';

export default function RouteTable({ routes = [], locations = [], onAddRoute, onUpdateRoute, onDeleteRoute }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editJarak, setEditJarak] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [newRoute, setNewRoute] = useState({ asal: '', tujuan: '', jarak: '' });

  
  const getLocName = (id) => {
    const loc = locations.find(l => String(l.id) === String(id));
    return loc ? loc.nama : `#${String(id).padStart(3,'0')}`;
  };

  const handleAdd = () => {
    if (!newRoute.asal || !newRoute.tujuan || !newRoute.jarak) return;
    onAddRoute && onAddRoute(newRoute);
    setNewRoute({ asal: '', tujuan: '', jarak: '' });
    setShowAddForm(false);
  };

  const handleUpdate = (id) => {
    if (editJarak !== '' && onUpdateRoute) {
      onUpdateRoute(id, { jarak: parseFloat(editJarak) });
      setEditingId(null);
      setEditJarak('');
    }
  };

  const filteredRoutes = useMemo(() => {
    return routes.filter(r => {
      const q = searchQuery.toLowerCase();
      return (
        String(r.id).toLowerCase().includes(q) ||
        getLocName(r.asal).toLowerCase().includes(q) ||
        getLocName(r.tujuan).toLowerCase().includes(q) ||
        String(r.jarak).includes(q)
      );
    });
  }, [routes, searchQuery]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
    >
      { }
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 16, flexWrap: 'wrap',
      }}>
        <div style={{ position: 'relative', flex: '1 1 340px' }}>
          <Search size={16} style={{
            position: 'absolute', left: 14, top: '50%',
            transform: 'translateY(-50%)', color: '#94a3b8',
          }} />
          <input
            type="search"
            placeholder="Cari ID rute, nama lokasi, atau jarak..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%', padding: '12px 16px 12px 40px', borderRadius: 12,
              background: '#ffffff', border: '1px solid #e2e8f0',
              color: '#0f172a', fontSize: 14,
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              outline: 'none', transition: 'all 0.2s ease',
            }}
            onFocus={(e) => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 4px rgba(37,99,235,0.08)'; }}
            onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)'; }}
          />
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          style={{
            padding: '12px 22px', borderRadius: 12,
            background: showAddForm ? '#f1f5f9' : '#2563eb',
            color: showAddForm ? '#334155' : '#ffffff',
            fontSize: 14, fontWeight: 700,
            border: `1px solid ${showAddForm ? '#e2e8f0' : 'transparent'}`,
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 8,
            boxShadow: showAddForm ? 'none' : '0 4px 14px rgba(37,99,235,0.25)',
            transition: 'all 0.2s ease', whiteSpace: 'nowrap',
          }}
        >
          {showAddForm ? <X size={16} /> : <Plus size={16} />}
          {showAddForm ? 'Batal' : 'Tambah Rute'}
        </button>
      </div>

      { }
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{
              background: '#ffffff', borderRadius: 18,
              border: '1px solid #e2e8f0',
              padding: '24px 28px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
              overflow: 'hidden',
            }}
          >
            <h4 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', margin: '0 0 18px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
              <ArrowRight size={16} style={{ color: '#2563eb' }} />
              Tambah Rute Baru
            </h4>

            <div style={{
              display: 'grid', gridTemplateColumns: '1fr auto 1fr 140px auto',
              gap: 14, alignItems: 'end',
            }}>
              <div>
                <label style={{
                  display: 'block', fontSize: 11, fontWeight: 600,
                  color: '#64748b', marginBottom: 7,
                  textTransform: 'uppercase', letterSpacing: '0.05em',
                }}>Asal</label>
                <select
                  value={newRoute.asal}
                  onChange={(e) => setNewRoute({...newRoute, asal: e.target.value})}
                  style={{
                    width: '100%', padding: '12px 15px', borderRadius: 12,
                    background: '#f8fafc', border: '1px solid #e2e8f0',
                    color: '#0f172a', fontSize: 13, fontWeight: 500,
                    appearance: 'none', cursor: 'pointer',
                  }}
                >
                  <option value="">— Pilih asal —</option>
                  {locations.map(l => (
                    <option key={l.id} value={l.id}>[{String(l.id).padStart(3,'0')}] {l.nama}</option>
                  ))}
                </select>
              </div>

              <div style={{ textAlign: 'center', paddingBottom: 5 }}>
                <ArrowRight size={20} style={{ color: '#cbd5e1' }} />
              </div>

              <div>
                <label style={{
                  display: 'block', fontSize: 11, fontWeight: 600,
                  color: '#64748b', marginBottom: 7,
                  textTransform: 'uppercase', letterSpacing: '0.05em',
                }}>Tujuan</label>
                <select
                  value={newRoute.tujuan}
                  onChange={(e) => setNewRoute({...newRoute, tujuan: e.target.value})}
                  style={{
                    width: '100%', padding: '12px 15px', borderRadius: 12,
                    background: '#f8fafc', border: '1px solid #e2e8f0',
                    color: '#0f172a', fontSize: 13, fontWeight: 500,
                    appearance: 'none', cursor: 'pointer',
                  }}
                >
                  <option value="">— Pilih tujuan —</option>
                  {locations.map(l => (
                    <option key={l.id} value={l.id}>[{String(l.id).padStart(3,'0')}] {l.nama}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{
                  display: 'block', fontSize: 11, fontWeight: 600,
                  color: '#64748b', marginBottom: 7,
                  textTransform: 'uppercase', letterSpacing: '0.05em',
                }}>Jarak (km)</label>
                <input
                  type="number"
                  min="1"
                  placeholder="0"
                  value={newRoute.jarak}
                  onChange={(e) => setNewRoute({...newRoute, jarak: e.target.value})}
                  onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                  style={{
                    width: '100%', padding: '12px 15px', borderRadius: 12,
                    background: '#f8fafc', border: '1px solid #e2e8f0',
                    color: '#0f172a', fontSize: 14, outline: 'none',
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              <button
                onClick={handleAdd}
                disabled={!newRoute.asal || !newRoute.tujuan || !newRoute.jarak}
                style={{
                  padding: '12px 18px', borderRadius: 12,
                  background: (!newRoute.asal || !newRoute.tujuan || !newRoute.jarak)
                    ? 'rgba(37,99,235,0.25)' : '#2563eb',
                  color: '#ffffff', fontSize: 14, fontWeight: 700,
                  border: 'none', cursor: (!newRoute.asal || !newRoute.tujuan || !newRoute.jarak)
                    ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', gap: 7, height: 44,
                  opacity: (!newRoute.asal || !newRoute.tujuan || !newRoute.jarak) ? 0.4 : 1,
                }}
              >
                <Check size={17} /> Simpan
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      { }
      <div style={{
        background: '#ffffff', borderRadius: 18,
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
        boxShadow: '0 2px 10px rgba(0,0,0,0.02), 0 10px 25px rgba(0,0,0,0.03)',
      }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>ID Rute</th>
              <th>Lokasi Asal</th>
              <th>→</th>
              <th>Lokasi Tujuan</th>
              <th>Jarak</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout">
              {filteredRoutes.map((route, i) => (
                <motion.tr
                  key={route.id}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10, backgroundColor: 'rgba(244,63,94,0.06)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24, delay: i * 0.02 }}
                  style={{ borderBottom: '1px solid #f1f5f9' }}
                >
                  <td>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace", fontWeight: 800,
                      fontSize: 13, color: '#2563eb',
                      background: '#eff6ff', padding: '4px 10px', borderRadius: 8,
                    }}>
                      #{String(route.id).replace('R','').padStart(3,'0')}
                    </span>
                  </td>
                  
                  <td>
                    <span style={{ fontWeight: 600, fontSize: 13, color: '#1e293b' }}>
                      {getLocName(route.asal)}
                    </span>
                    <br/>
                    <span style={{ fontSize: 11, color: '#94a3b8', fontFamily: "'JetBrains Mono', monospace" }}>
                      L{String(route.asal).padStart(3,'0')}
                    </span>
                  </td>
                  
                  <td style={{ textAlign: 'center' }}>
                    <ArrowRight size={16} style={{ color: '#cbd5e1' }} />
                  </td>
                  
                  <td>
                    <span style={{ fontWeight: 600, fontSize: 13, color: '#1e293b' }}>
                      {getLocName(route.tujuan)}
                    </span>
                    <br/>
                    <span style={{ fontSize: 11, color: '#94a3b8', fontFamily: "'JetBrains Mono', monospace" }}>
                      L{String(route.tujuan).padStart(3,'0')}
                    </span>
                  </td>
                  
                  <td>
                    {editingId === route.id ? (
                      <input
                        type="number"
                        min="1"
                        value={editJarak}
                        onChange={(e) => setEditJarak(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleUpdate(route.id)}
                        autoFocus
                        style={{
                          width: 80, padding: '8px 10px', borderRadius: 8,
                          background: '#eff6ff', border: '1px solid #93c5fd',
                          color: '#1d4ed8', fontSize: 13, fontWeight: 600,
                          outline: 'none', fontFamily: "'JetBrains Mono', monospace",
                          boxShadow: '0 0 0 3px rgba(59,130,246,0.08)',
                        }}
                      />
                    ) : (
                      <span style={{
                        fontFamily: "'JetBrains Mono', monospace", fontWeight: 700,
                        fontSize: 14, color: '#0891b2',
                        background: '#ecfeff', padding: '5px 12px', borderRadius: 8,
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                      }}>
                        {route.jarak} km
                      </span>
                    )}
                  </td>
                  
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {editingId === route.id ? (
                        <>
                          <button
                            onClick={() => handleUpdate(route.id)}
                            style={{
                              padding: '6px 12px', borderRadius: 8,
                              background: '#ecfdf5', border: '1px solid #bbf7d0',
                              color: '#059669', fontSize: 12, fontWeight: 700,
                              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
                            }}
                          >
                            <Check size={13} /> OK
                          </button>
                          <button
                            onClick={() => { setEditingId(null); setEditJarak(''); }}
                            style={{
                              padding: '6px 12px', borderRadius: 8,
                              background: '#f8fafc', border: '1px solid #e2e8f0',
                              color: '#64748b', fontSize: 12, fontWeight: 600,
                              cursor: 'pointer',
                            }}
                          >
                            Batal
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => { setEditingId(route.id); setEditJarak(String(route.jarak)); }}
                            style={{
                              padding: '6px 12px', borderRadius: 8,
                              background: '#f8fafc', border: '1px solid transparent',
                              color: '#64748b', fontSize: 12, fontWeight: 600,
                              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
                              transition: 'all 0.15s ease',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = '#eff6ff'; e.currentTarget.style.color = '#2563eb'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.color = '#64748b'; }}
                          >
                            <Edit3 size={13} /> Edit
                          </button>
                          
                          <button
                            onClick={() => onDeleteRoute && onDeleteRoute(route.id)}
                            style={{
                              padding: '6px 12px', borderRadius: 8,
                              background: '#f8fafc', border: '1px solid transparent',
                              color: '#94a3b8', fontSize: 12, fontWeight: 600,
                              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
                              transition: 'all 0.15s ease',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = '#fef2f2'; e.currentTarget.style.color = '#f43f5e'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.color = '#94a3b8'; }}
                          >
                            <Trash2 size={13} /> Hapus
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>

        { }
        {filteredRoutes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: 'center', padding: '52px 20px' }}
          >
            <div style={{
              width: 56, height: 56, background: '#f8fafc', borderRadius: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 14px',
            }}>
              <Search size={28} style={{ color: '#cbd5e1' }} />
            </div>
            <p style={{ fontSize: 15, fontWeight: 500, color: '#334155', margin: 0 }}>
              Tidak ada rute ditemukan
            </p>
            <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 5 }}>
              Coba gunakan kata kunci lain atau tambahkan data baru.
            </p>
          </motion.div>
        )}

        { }
        {filteredRoutes.length > 0 && (
          <div style={{
            padding: '14px 22px', borderTop: '1px solid #f1f5f9',
            background: '#fafafa/40',
          }}>
            <span style={{
              fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: '#94a3b8',
            }}>
              Menampilkan {filteredRoutes.length} dari {routes.length} rute
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
