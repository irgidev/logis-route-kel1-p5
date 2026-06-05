import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, X, Check, Search, MapPin, Warehouse, Building2 } from 'lucide-react';

export default function LocationTable({ locations = [], onAddLocation, onUpdateLocation, onDeleteLocation }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLoc, setNewLoc] = useState({ nama: '', tipe: 'Tujuan' });
  const [searchQuery, setSearchQuery] = useState('');

  const handleAdd = () => {
    if (newLoc.nama.trim() && onAddLocation) {
      onAddLocation(newLoc);
      setNewLoc({ nama: '', tipe: 'Tujuan' });
      setShowAddForm(false);
    }
  };

  const filteredLocations = locations.filter(loc =>
    loc.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    String(loc.id).includes(searchQuery)
  );

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
        { }
        <div style={{ position: 'relative', flex: '1 1 340px' }}>
          <Search size={16} style={{
            position: 'absolute', left: 14, top: '50%',
            transform: 'translateY(-50%)', color: '#94a3b8',
          }} />
          <input
            type="search"
            placeholder="Cari ID atau nama lokasi..."
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
        
        { }
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
          {showAddForm ? 'Batal' : 'Tambah Lokasi'}
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
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18,
            }}>
              <MapPin size={16} style={{ color: '#2563eb' }} />
              <h4 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', margin: 0 }}>
                Tambah Lokasi Baru
              </h4>
            </div>

            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 200px auto',
              gap: 14, alignItems: 'end',
            }}>
              <div>
                <label style={{
                  display: 'block', fontSize: 11, fontWeight: 600,
                  color: '#64748b', marginBottom: 7,
                  textTransform: 'uppercase', letterSpacing: '0.05em',
                }}>Nama Lokasi</label>
                <input
                  type="text"
                  value={newLoc.nama}
                  onChange={(e) => setNewLoc({...newLoc, nama: e.target.value})}
                  placeholder="Contoh: Cabang Bandung"
                  onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                  style={{
                    width: '100%', padding: '12px 15px', borderRadius: 12,
                    background: '#f8fafc', border: '1px solid #e2e8f0',
                    color: '#0f172a', fontSize: 14, outline: 'none',
                    transition: 'border-color 0.2s ease',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              <div>
                <label style={{
                  display: 'block', fontSize: 11, fontWeight: 600,
                  color: '#64748b', marginBottom: 7,
                  textTransform: 'uppercase', letterSpacing: '0.05em',
                }}>Tipe</label>
                <select
                  value={newLoc.tipe}
                  onChange={(e) => setNewLoc({...newLoc, tipe: e.target.value})}
                  style={{
                    width: '100%', padding: '12px 15px', borderRadius: 12,
                    background: '#f8fafc', border: '1px solid #e2e8f0',
                    color: '#0f172a', fontSize: 14, fontWeight: 500,
                    appearance: 'none', cursor: 'pointer',
                  }}
                >
                  <option value="Gudang">🏭 Gudang Pusat</option>
                  <option value="Tujuan">📍 Cabang Tujuan</option>
                </select>
              </div>

              <button
                onClick={handleAdd}
                disabled={!newLoc.nama.trim()}
                style={{
                  padding: '12px 20px', borderRadius: 12,
                  background: !newLoc.nama.trim() ? 'rgba(37,99,235,0.25)' : '#2563eb',
                  color: '#ffffff', fontSize: 14, fontWeight: 700,
                  border: 'none', cursor: !newLoc.nama.trim() ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', gap: 7, height: 44,
                  opacity: !newLoc.nama.trim() ? 0.4 : 1,
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
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
        gap: 16,
      }}>
        <AnimatePresence mode="popLayout">
          {filteredLocations.map((loc, i) => {
            const isGudang = loc.tipe === 'Gudang';
            return (
              <motion.div
                key={loc.id}
                layout
                initial={{ opacity: 0, scale: 0.93, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24, delay: i * 0.03 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                style={{
                  borderRadius: 18, padding: 22, position: 'relative', overflow: 'hidden',
                  background: '#ffffff',
                  border: `1px solid ${isGudang ? 'rgba(245,158,11,0.18)' : 'rgba(6,182,212,0.18)'}`,
                  boxShadow: '0 2px 10px rgba(0,0,0,0.02), 0 10px 25px rgba(0,0,0,0.03)',
                  display: 'flex', flexDirection: 'column',
                }}
              >
                { }
                <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: 14 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 11,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: isGudang ? '#fffbeb' : '#ecfeff',
                  }}>
                    {isGudang
                      ? <Warehouse size={19} style={{ color: '#d97706' }} />
                      : <Building2 size={19} style={{ color: '#0891b2' }} />
                    }
                  </div>
                  
                  <span style={{
                    padding: '4px 10', borderRadius: 8,
                    fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em',
                    background: isGudang ? '#fffbeb' : '#ecfeff',
                    color: isGudang ? '#d97706' : '#0891b2',
                    border: `1px solid ${isGudang ? 'rgba(245,158,11,0.2)' : 'rgba(6,182,212,0.2)'}`,
                  }}>
                    {loc.tipe}
                  </span>
                </div>

                { }
                <div style={{ marginBottom: 16 }}>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 20, fontWeight: 800, marginBottom: 5,
                    color: isGudang ? '#d97706' : '#0891b2',
                  }}>
                    #{String(loc.id).padStart(3, '0')}
                  </div>
                  
                  <h4 style={{ fontSize: 13.5, fontWeight: 600, color: '#1e293b', margin: 0, lineHeight: 1.35 }}>
                    {loc.nama}
                  </h4>
                </div>

                { }
                <div style={{
                  display: 'flex', gap: 7,
                  paddingTop: 12,
                  borderTop: '1px solid #f1f5f9',
                }}>
                  <button
                    onClick={() => onDeleteLocation && onDeleteLocation(loc.id)}
                    style={{
                      flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      gap: 5, padding: '8px 10px', borderRadius: 9,
                      background: '#f8fafc', border: '1px solid transparent',
                      color: '#94a3b8', fontSize: 12, fontWeight: 600,
                      cursor: 'pointer', transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#fef2f2'; e.currentTarget.style.color = '#f43f5e'; e.currentTarget.style.borderColor = 'rgba(244,63,94,0.15)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = 'transparent'; }}
                  >
                    <Trash2 size={13} /> Hapus
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      { }
      {filteredLocations.length === 0 && (
        <div style={{
          textAlign: 'center', padding: '52px 20px',
          background: '#ffffff', borderRadius: 18, border: '1px solid #e2e8f0',
        }}>
          <div style={{
            width: 56, height: 56, background: '#f8fafc', borderRadius: 16,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 14px',
          }}>
            <MapPin size={28} style={{ color: '#cbd5e1' }} />
          </div>
          <p style={{ fontSize: 15, fontWeight: 500, color: '#334155', margin: 0 }}>
            Tidak ada lokasi ditemukan
          </p>
          <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 5 }}>
            Coba gunakan kata kunci lain atau tambahkan data baru.
          </p>
        </div>
      )}

      { }
      {filteredLocations.length > 0 && (
        <div style={{ textAlign: 'center', paddingTop: 2, borderTop: '1px solid #e2e8f0' }}>
          <span style={{
            fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: '#94a3b8',
          }}>
            Menampilkan {filteredLocations.length} dari {locations.length} lokasi
          </span>
        </div>
      )}
    </motion.div>
  );
}
