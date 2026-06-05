import { useMemo, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Network, ZoomIn, ZoomOut, Maximize2, Move } from 'lucide-react';










function buildLayout(locs, rtes) {
  var N = locs.length;
  if (N === 0) return { nodes: [], edges: [], idxOf: {}, box: { x: -400, y: -400, w: 800, h: 800 } };

  var idxOf = {};
  for (var li = 0; li < N; li++) idxOf[locs[li].id] = li;

   
  var gudangs = [];
  var tujuans = [];
  for (var ci = 0; ci < N; ci++) {
    if (locs[ci].tipe === 'Gudang') gudangs.push(ci);
    else tujuans.push(ci);
  }

   
  var deg = new Array(N).fill(0);
  for (var ri = 0; ri < rtes.length; ri++) {
    var s = idxOf[rtes[ri].asal];
    var t = idxOf[rtes[ri].tujuan];
    if (s !== undefined) deg[s]++;
    if (t !== undefined) deg[t]++;
  }

   
   
  var R_INNER;   
  var R_OUTER;   

  if (N <= 25)      { R_INNER = 70;  R_OUTER = 190; }
  else if (N <= 60)  { R_INNER = 90;  R_OUTER = 250; }
  else if (N <= 140) { R_INNER = 110; R_OUTER = 320; }
  else if (N <= 300) { R_INNER = 130; R_OUTER = 420; }
  else               { R_INNER = 150; R_OUTER = 550; }

  var pos = new Array(N);

   
  if (gudangs.length > 0) {
    var hubIdx = gudangs[0];
    pos[hubIdx] = { x: 0, y: 0, id: locs[hubIdx].id, nama: locs[hubIdx].nama,
      tipe: locs[hubIdx].tipe, deg: deg[hubIdx], isHub: true };
  }

   
  var ng1 = Math.max(0, gudangs.length - 1);
  for (var g1i = 0; g1i < ng1; g1i++) {
    var gi = gudangs[g1i + 1]; 
    var ang = ng1 > 1 ? (g1i / ng1) * 6.2832 : 0;
    pos[gi] = {
      x: Math.cos(ang) * R_INNER,
      y: Math.sin(ang) * R_INNER,
      id: locs[gi].id, nama: locs[gi].nama, tipe: locs[gi].tipe,
      deg: deg[gi], isHub: true
    };
  }

   
  var nt = tujuans.length;
  if (nt > 0) {
    for (var ti = 0; ti < nt; ti++) {
      var tidx = tujuans[ti];
      var ang = nt > 1 ? (ti / nt) * 6.2832 : 0;
      pos[tidx] = {
        x: Math.cos(ang) * R_OUTER,
        y: Math.sin(ang) * R_OUTER,
        id: locs[tidx].id, nama: locs[tidx].nama, tipe: locs[tidx].tipe,
        deg: deg[tidx], isHub: false
      };
    }
  }

   
  for (var ui = 0; ui < N; ui++) {
    if (!pos[ui]) {
      var ua = (ui / N) * 6.2832;
      pos[ui] = {
        x: Math.cos(ua) * R_OUTER * 1.15,
        y: Math.sin(ua) * R_OUTER * 1.15,
        id: locs[ui].id, nama: locs[ui].nama, tipe: locs[ui].tipe,
        deg: deg[ui], isHub: false
      };
    }
  }

   
  var minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (var bi = 0; bi < N; bi++) {
    if (pos[bi].x < minX) minX = pos[bi].x;
    if (pos[bi].x > maxX) maxX = pos[bi].x;
    if (pos[bi].y < minY) minY = pos[bi].y;
    if (pos[bi].y > maxY) maxY = pos[bi].y;
  }
  var spanX = maxX - minX || 400;
  var spanY = maxY - minY || 400;
  var pad = Math.max(80, Math.max(spanX, spanY) * 0.22);

   
  var edges = [];
  for (var ei = 0; ei < rtes.length; ei++) {
    var er = rtes[ei];
    if (idxOf[er.asal] !== undefined && idxOf[er.tujuan] !== undefined) {
      edges.push({ from: er.asal, to: er.tujuan, jarak: er.jarak });
    }
  }

  return {
    nodes: pos,
    edges: edges,
    idxOf: idxOf,
    box: { x: minX - pad, y: minY - pad, w: spanX + pad * 2, h: spanY + pad * 2 }
  };
}





export default function GraphView(props) {
  var locations = props.locations || [];
  var routes = props.routes || [];

  var _a = useState({ x: 0, y: 0 });
  var pan = _a[0], setPan = _a[1];
  var _b = useState(1);
  var zoom = _b[0], setZoom = _b[1];
  var _c = useState(false);
  var dragging = _c[0], setDragging = _c[1];
  var _d = useState(null);
  var hoverId = _d[0], setHoverId = _d[1];
  var dragRef = useRef({});

  var layout = useMemo(function() {
    var locs = locations.map(function(l) { return { id: l.id, nama: l.nama, tipe: l.tipe }; });
    var rts = routes.map(function(r) { return { asal: r.asal, tujuan: r.tujuan, jarak: r.jarak }; });
    return buildLayout(locs, rts);
  }, [locations, routes]);

  var nodes = layout.nodes;
  var edges = layout.edges;
  var idxOf = layout.idxOf;
  var box = layout.box;

  var N = nodes.length;
  var E = edges.length;
  var hasData = N > 0;

   
  var tier = N <= 25 ? 'xs' : N <= 60 ? 'sm' : N <= 140 ? 'md' : N <= 300 ? 'lg' : 'xl';

  var C;
  if (tier === 'xs') C = { nodeR: 14, hubR: 20, edgeW: 2.2, labelF: 10.5, distF: 9, showLabel: true, showDist: true };
  else if (tier === 'sm') C = { nodeR: 11, hubR: 16, edgeW: 1.8, labelF: 9.5, distF: 8, showLabel: true, showDist: true };
  else if (tier === 'md') C = { nodeR: 8, hubR: 12, edgeW: 1.4, labelF: 8.5, distF: 7, showLabel: true, showDist: true };
  else if (tier === 'lg') C = { nodeR: 5.5, hubR: 8, edgeW: 1, labelF: 7, distF: 6, showLabel: true, showDist: false };
  else C = { nodeR: 3.5, hubR: 5, edgeW: 0.65, labelF: 6, distF: 5, showLabel: false, showDist: false };

  var degMap = useMemo(function() {
    var m = {};
    for (var i = 0; i < nodes.length; i++) m[nodes[i].id] = nodes[i].deg || 0;
    return m;
  }, [nodes]);

   
  var onDown = useCallback(function(e) {
    if (e.button !== 0) return;
    setDragging(true);
    dragRef.current = { sx: e.clientX, sy: e.clientY, px: pan.x, py: pan.y };
    e.preventDefault();
  }, [pan]);

  var onMove = useCallback(function(e) {
    if (!dragging) return;
    setPan({
      x: dragRef.current.px + (e.clientX - dragRef.current.sx),
      y: dragRef.current.py + (e.clientY - dragRef.current.sy)
    });
  }, [dragging]);

  var onUp = useCallback(function() { setDragging(false); }, []);

  var onWheel = useCallback(function(e) {
    e.preventDefault();
    setZoom(function(z) { return Math.min(8, Math.max(0.15, z * (e.deltaY > 0 ? 0.85 : 1.18))); });
  }, []);

  var reset = useCallback(function() { setPan({ x: 0, y: 0 }); setZoom(1); }, []);

  var handleEnter = useCallback(function(id) { return function() { setHoverId(id); }; }, []);
  var handleLeave = useCallback(function() { setHoverId(null); }, []);

  var edgeAlpha = tier === 'xl' ? 0.30 : tier === 'lg' ? 0.40 : 0.55;
  var useGlow = tier !== 'lg' && tier !== 'xl';

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
      style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

      { }
      <div style={{
        position: 'relative', background: '#0b1120', borderRadius: 16,
        overflow: 'hidden', border: '1px solid #1e293b',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)', height: 650
      }}
        onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp} onWheel={onWheel}>

        { }
        <div style={{ position: 'absolute', top: 12, left: 12, right: 12, zIndex: 20,
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          pointerEvents: 'none', gap: 10 }}>
          <div style={{ background:'rgba(15,23,42,0.92)', backdropFilter:'blur(10px)',
            border:'1px solid rgba(255,255,255,0.07)', borderRadius:10, padding:'8px 14px',
            display:'flex', gap: 16, alignItems:'center', pointerEvents:'auto' }}>
            <LegendDot c="#fbbf24" l="Gudang" />
            <LegendDot c="#22d3ee" l="Cabang" />
            <div style={{width:1,height:13,background:'rgba(255,255,255,0.1)'}}/>
            <EdgeMark />
          </div>
          <div style={{display:'flex',alignItems:'center',gap:6,pointerEvents:'auto'}}>
            <Badge text={'V=' + N + ' | E=' + E} c="#2563eb" />
            <Badge text={Math.round(zoom*100) + '%'} c="#059669" />
            <div style={{width:1,height:18,background:'rgba(255,255,255,0.08)',margin:'0 3px'}}/>
            <Btn onClick={function(){setZoom(function(z){return Math.min(8,z*1.35);})}}><ZoomIn size={12}/></Btn>
            <Btn onClick={function(){setZoom(function(z){return Math.max(0.15,z*0.74);})}}><ZoomOut size={12}/></Btn>
            <Btn onClick={reset} primary={true}><Maximize2 size={12}/></Btn>
          </div>
        </div>

        { }
        <div onMouseDown={onDown} style={{
          position:'relative', width:'100%', height: 650,
          cursor: dragging ? 'grabbing' : 'grab', userSelect:'none',
          background: 'radial-gradient(circle at 50% 50%, rgba(30,58,138,0.05) 0%, transparent 60%), #0b1120'
        }}>
          { }
          <div style={{position:'absolute',inset:0,
            backgroundImage:'radial-gradient(circle, rgba(148,163,184,0.04) 1px, transparent 1px)',
            backgroundSize:'24px 24px', pointerEvents:'none'}}/>

          { }
          <svg viewBox={box.x + ' ' + box.y + ' ' + box.w + ' ' + box.h}
            preserveAspectRatio="xMidYMid meet"
            style={{ width:'100%', height:'100%',
              transform:'translate(' + pan.x + 'px,' + pan.y + 'px) scale(' + zoom + ')',
              transformOrigin:'center center',
              transition: dragging ? 'none' : 'transform 0.2s ease' }}>
            <defs>
              <radialGradient id="rg" cx="35%" cy="35%"><stop offset="#fef08a"/><stop offset="1" stopColor="#ca8a04"/></radialGradient>
              <radialGradient id="rc" cx="35%" cy="35%"><stop offset="#67e8f9"/><stop offset="1" stopColor="#0891b2"/></radialGradient>
              <filter id="gl"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              <filter id="eg"><feGaussianBlur stdDeviation="0.8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            </defs>

            { }
            {hasData && edges.map(function(edge, i) {
              var si = idxOf[edge.from];
              var ti = idxOf[edge.to];
              if (si == null || ti == null) return null;
              var s = nodes[si];
              var t = nodes[ti];
              if (!s || !t) return null;
              if (s.x === t.x && s.y === t.y) return null;

              var dx = t.x - s.x;
              var dy = t.y - s.y;
              var len = Math.sqrt(dx*dx + dy*dy);
              var mx = (s.x + t.x) / 2;
              var my = (s.y + t.y) / 2;

              return (
                <g key={'e-' + i}>
                  <line x1={s.x} y1={s.y} x2={t.x} y2={t.y}
                    stroke={'rgba(34,211,238,' + edgeAlpha + ')'}
                    strokeWidth={C.edgeW} strokeLinecap="round"
                    filter={useGlow ? "url(#eg)" : undefined} />

                  { }
                  {C.showDist && len > C.hubR * 1.2 && (
                    <g>
                      <rect x={mx-20} y={my-9} width={40} height="18" rx={9}
                        fill="rgba(15,23,42,0.88)" stroke="rgba(51,65,85,0.45)" strokeWidth="0.5"/>
                      <text x={mx} y={my+1} textAnchor="middle" dominantBaseline="central"
                        fontSize={C.distF} fontWeight={700} fill="#67e8f9"
                        fontFamily="'JetBrains Mono',monospace">
                        {typeof edge.jarak==='number'?Math.round(edge.jarak):edge.jarak}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            { }
            {hasData && nodes.map(function(n, ni) {
              var isHub = n.isHub || n.tipe === 'Gudang';
              var nr = isHub ? C.hubR : C.nodeR;
              var hovered = hoverId === n.id;

              return (
                <g key={'n-' + n.id}>
                  { }
                  {hovered && (
                    <circle cx={n.x} cy={n.y} r={nr+10} fill="none"
                      stroke="rgba(59,130,246,0.5)" strokeWidth="1.5" strokeDasharray="4 3">
                      <animateTransform attributeName="transform" type="rotate"
                        from={'0 ' + n.x + ' ' + n.y} to={'360 ' + n.x + ' ' + n.y} dur="6s" repeatCount="indefinite"/>
                    </circle>
                  )}

                  { }
                  <circle cx={n.x+1.5} cy={n.y+2} r={nr}
                    fill="rgba(0,0,0,0.35)" filter="blur(1.5px)"/>

                  { }
                  <circle cx={n.x} cy={n.y} r={nr}
                    fill={isHub?'url(#rg)':'url(#rc)'}
                    filter={useGlow?"url(#gl)":undefined}
                    stroke={hovered?'#fff':'transparent'} strokeWidth={hovered?1.2:0}
                    style={{cursor:'pointer'}}
                    onMouseEnter={handleEnter(n.id)}
                    onMouseLeave={handleLeave} />

                  { }
                  {tier !== 'xl' && (
                    <text x={n.x} y={n.y} textAnchor="middle" dominantBaseline="central"
                      fontSize={Math.max(nr * 0.7, 5)} fontWeight={800} fill="#0f172a"
                      fontFamily="'JetBrains Mono',monospace" pointerEvents="none">
                      {String(n.id).replace('L','')}
                    </text>
                  )}

                  { }
                  {C.showLabel && (
                    <text x={n.x} y={n.y + nr + 13}
                      textAnchor="middle" fontSize={C.labelF} fontWeight={500}
                      fill={hovered ? '#e2e8f0' : '#94a3b8'}
                      fontFamily="'Inter',sans-serif" pointerEvents="none">
                      {(n.nama||'').length > 13 ? (n.nama||'').slice(0,11) + '\u2026' : n.nama||''}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          { }
          {hoverId && (function() {
            var fn = null;
            for (var ti = 0; ti < nodes.length; ti++) {
              if (nodes[ti].id === hoverId) { fn = nodes[ti]; break; }
            }
            if (!fn) return null;
            return (
              <div style={{position:'absolute',bottom:14,left:'50%',transform:'translateX(-50%)',
                padding:'10px 18px',borderRadius:11,background:'rgba(15,23,42,0.95)',
                backdropFilter:'blur(12px)',border:'1px solid rgba(59,130,246,0.22)',
                boxShadow:'0 8px 28px rgba(0,0,0,0.45)',zIndex:30,whiteSpace:'nowrap',pointerEvents:'none'}}>
                <div style={{fontSize:13,fontWeight:700,color:'#f1f5f9'}}>{fn.nama || fn.id}</div>
                <div style={{display:'flex',gap:14,marginTop:5,fontSize:11,color:'#94a3b8'}}>
                  <span>ID: <b style={{color:'#60a5fa',fontFamily:"'JetBrains Mono',monospace"}}>{fn.id}</b></span>
                  <span>Tipe: <b style={{color:fn.isHub||fn.tipe==='Gudang'?'#fbbf24':'#22d3ee'}}>{fn.tipe}</b></span>
                  <span>Degree: <b style={{color:'#34d399',fontFamily:"'JetBrains Mono',monospace"}}>{degMap[fn.id]||0}</b></span>
                </div>
              </div>
            );
          })()}

          {!dragging && !hoverId && (
            <div style={{position:'absolute',bottom:12,left:'50%',transform:'translateX(-50%)',
              display:'flex',alignItems:'center',gap:7,padding:'6px 14px',borderRadius:999,
              background:'rgba(15,23,42,0.6)',backdropFilter:'blur(8px)',
              border:'1px solid rgba(51,65,85,0.18)',fontSize:10.5,color:'#64748b',
              fontWeight:500,pointerEvents:'none'}}>
              <Move size={11}/> Drag &middot; Scroll zoom &middot; Hover node
            </div>
          )}
        </div>
      </div>

      { }
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:12}}>
        {[
          {icon:<Network size={16}/>,title:'Hub-and-Spoke Layout',color:'#2563eb',
            desc:'Gudang pusat di tengah, cabang tujuan mengelilingi dalam ring konsentris. ' + N + ' simpul, ' + E + ' sisi terkoneksi.'},
          {icon:<ZoomIn size={16}/>,title:'Interaktif Pan & Zoom',color:'#8b5cf6',
            desc:'Drag untuk menggeser, scroll wheel untuk zoom in/out. Setiap edge menampilkan jarak distribusi.'},
          {icon:<Network size={16}/>,title:'Topologi Jaringan Distribusi',color:'#059669',
            desc:'Graf berarah merepresentasikan rute dari gudang ke seluruh cabang tujuan.'},
        ].map(function(card, j) {
          return (
            <motion.div key={j} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.2+j*0.08}}
              style={{background:'#fff',borderRadius:13,padding:16,border:'1px solid #e2e8f0',
                boxShadow:'0 2px 6px rgba(0,0,0,0.02)'}}>
              <div style={{display:'flex',alignItems:'center',gap:9,marginBottom:9}}>
                <div style={{width:32,height:32,borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',
                  background:card.color+'14',color:card.color}}>{card.icon}</div>
                <h4 style={{fontWeight:700,color:'#0f172a',fontSize:13,margin:0}}>{card.title}</h4>
              </div>
              <p style={{fontSize:12,color:'#64748b',lineHeight:1.55,margin:0}}>{card.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

 

function LegendDot(props) {
  return (
    <div style={{display:'flex',alignItems:'center',gap:6}}>
      <span style={{width:10,height:10,borderRadius:'50%',
        background:'linear-gradient(135deg,#fff,' + props.c + ')',
        boxShadow:'0 0 7px rgba(' + hexRgb(props.c) + ',0.4)'}}/>
      <span style={{fontSize:11,fontWeight:500,color:'#cbd5e1'}}>{props.l}</span>
    </div>
  );
}

function EdgeMark() {
  return (
    <div style={{display:'flex',alignItems:'center',gap:6}}>
      <svg width="20" height="2"><line x1="0" y1="1" x2="20" y2="1" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round"/></svg>
      <span style={{fontSize:11,fontWeight:500,color:'#94a3b8'}}>Rute</span>
    </div>
  );
}

function Badge(props) {
  var rgb = hexRgb(props.c);
  return (
    <span style={{fontSize:10,fontFamily:"'JetBrains Mono',monospace",fontWeight:600,color:props.c,
      background:'rgba('+rgb+',0.08)',padding:'4px 10px',borderRadius:7,
      border:'1px solid rgba('+rgb+',0.15)'}}>{props.text}</span>
  );
}

function Btn(props) {
  return (
    <button onClick={props.onClick} style={{display:'inline-flex',alignItems:'center',justifyContent:'center',
      width:28,height:28,borderRadius:7,fontSize:11,fontWeight:600,
      color:props.primary?'#fff':'#cbd5e1',background:props.primary?'#2563eb':'rgba(30,41,59,0.85)',
      border:props.primary?'none':'1px solid #334155',cursor:'pointer',transition:'all 0.15s',
      boxShadow:props.primary?'0 2px 8px rgba(37,99,235,0.3)':'none'}}>{props.children}</button>
  );
}

function hexRgb(hex) {
  if (hex.charAt(0) === '#' && hex.length === 7) {
    return parseInt(hex.slice(1,3),16)+','+parseInt(hex.slice(3,5),16)+','+parseInt(hex.slice(5,7),16);
  }
  return '128,128,128';
}
