"""
Generator Grafik untuk Laporan Akhir Proyek Struktur Data
LogisRoute — Adjacency Matrix vs Adjacency List Benchmark

Generate 5 grafik:
1. benchmark_utama_waktu.png   — Bar chart perbandingan waktu 6 operasi
2. benchmark_utama_memory.png  — Bar chart perbandingan memory
3. scaling_waktu_search.png    — Line chart scaling Search
4. scaling_waktu_update.png    — Line chart scaling Update
5. scaling_memory.png          — Grouped bar chart memory scaling
"""

import matplotlib.pyplot as plt
import matplotlib
import numpy as np
import json
import os
import sys
import io


sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')




matplotlib.rcParams.update({
    'font.family': 'sans-serif',
    'font.sans-serif': ['DejaVu Sans', 'Arial', 'Helvetica'],
    'font.size': 11,
    'axes.titlesize': 13,
    'axes.labelsize': 11,
    'xtick.labelsize': 10,
    'ytick.labelsize': 10,
    'figure.dpi': 150,
    'savefig.dpi': 200,
    'savefig.bbox': 'tight',
    'axes.grid': True,
    'grid.alpha': 0.3,
    'grid.linestyle': '--',
})

COLORS = {
    'matrix': '#1e40af',
    'list':    '#0d9488',
    'matrix_light': '#93c5fd',
    'list_light': '#99f6e4',
    'accent': '#dd6b20',
    'bg': '#f8fafc',
}
OUTPUT_DIR = r'C:\Documents\Desktop\Project\proyek_strukdat\grafik'




BASE_DIR = r'C:\Documents\Desktop\Project\proyek_strukdat'

with open(os.path.join(BASE_DIR, 'benchmark_results.json'), 'r') as f:
    bench_data = json.load(f)

with open(os.path.join(BASE_DIR, 'scaling_benchmark_results.json'), 'r') as f:
    scale_data = json.load(f)

os.makedirs(OUTPUT_DIR, exist_ok=True)




def chart_benchmark_waktu():
    results = bench_data['benchmarkResults']
    

    ops = []
    matrix_vals = []
    list_vals = []
    

    op_order = ['Search (exist)', 'Search (none)', 'Insert (exist node)', 
               'Update', 'Delete', 'Traverse All']
    
    for op in op_order:
        ops.append(op)
        m_val = next((r['microseconds'] for r in results 
                     if r['operation'] == op and r['structure'] == 'Adjacency Matrix'), 0)
        l_val = next((r['microseconds'] for r in results 
                     if r['operation'] == op and r['structure'] == 'Adjacency List'), 0)
        matrix_vals.append(m_val)
        list_vals.append(l_val)
    
    x = np.arange(len(ops))
    width = 0.35
    
    fig, ax = plt.subplots(figsize=(12, 7))
    
    bars1 = ax.bar(x - width/2, matrix_vals, width, label='Adjacency Matrix',
                   color=COLORS['matrix'], edgecolor='white', linewidth=0.5)
    bars2 = ax.bar(x + width/2, list_vals, width, label='Adjacency List',
                   color=COLORS['list'], edgecolor='white', linewidth=0.5)
    

    def autolabel(bars):
        for bar in bars:
            h = bar.get_height()
            if h > 0.001:
                ax.annotate(f'{h:.3f}',
                           xy=(bar.get_x() + bar.get_width()/2, h),
                           xytext=(0, 3), textcoords="offset points",
                           ha='center', va='bottom', fontsize=8, fontweight='bold')
    
    autolabel(bars1)
    autolabel(bars2)
    

    ax.set_ylabel('Waktu Eksekusi (μs per operasi)', fontweight='bold')
    ax.set_xlabel('Operasi', fontweight='bold')
    ax.set_title('Perbandingan Waktu Eksekusi\nAdjacency Matrix vs Adjacency List (V=500, E=2500, Iterasi=1000)',
                  fontweight='bold', fontsize=13)
    ax.set_xticks(x)
    ax.set_xticklabels([o.replace(' ', '\n') for o in ops], fontsize=9)
    ax.legend(loc='upper right', framealpha=0.9)
    ax.set_ymargin(0.15)
    

    fig.text(0.5, 0.01, 
             f'Data: {bench_data["metadata"]["timestamp"]} | Compiler: GCC 15.1.0 C++17 -O2 | '
             f'V={bench_data["metadata"]["vertices"]} E={bench_data["metadata"]["edges"]} Density={bench_data["metadata"]["graphDensity"]*100:.1f}%',
             ha='center', fontsize=8, style='italic', color='gray')
    
    plt.tight_layout()
    plt.subplots_adjust(bottom=0.12)
    path = os.path.join(OUTPUT_DIR, '01_benchmark_utama_waktu.png')
    plt.savefig(path)
    plt.close()
    print(f'  [OK] {os.path.basename(path)}')





def chart_benchmark_memory():
    m_mem = bench_data['structures']['adjacencyMatrix']['memoryBytes']
    l_mem = bench_data['structures']['adjacencyList']['memoryBytes']
    
    fig, ax = plt.subplots(figsize=(9, 6))
    
    categories = ['Adjacency\nMatrix', 'Adjacency\nList']
    values = [m_mem / 1024, l_mem / 1024]
    colors_bar = [COLORS['matrix'], COLORS['list']]
    
    bars = ax.bar(categories, values, color=colors_bar, edgecolor='white', linewidth=0.5,
                 width=0.5)
    

    for bar, val, raw in zip(bars, values, [m_mem, l_mem]):
        h = bar.get_height()
        ax.annotate(f'{val:,.0f} KB\n({raw:,} B)',
                   xy=(bar.get_x() + bar.get_width()/2, h),
                   xytext=(0, 5), textcoords="offset points",
                   ha='center', va='bottom', fontsize=12, fontweight='bold')
    

    savings_pct = (1 - l_mem / m_mem) * 100
    ratio = m_mem / l_mem
    
    ax.annotate(f'Hemat {savings_pct:.1f}%\n({ratio:.1f}× lebih irit)',
                xy=(1.25, max(values)*0.6), fontsize=14, fontweight='bold',
                color=COLORS['accent'], ha='center',
                bbox=dict(boxstyle='round,pad=0.5', facecolor='#fef3c7', edgecolor=COLORS['accent']))
    
    ax.set_ylabel('Penggunaan Memori (KB)', fontweight='bold')
    ax.set_title('Perbandingan Penggunaan Memori\nAdjacency Matrix vs Adjacency List (V=500)',
                  fontweight='bold', fontsize=13)
    ax.set_ylim(0, max(values) * 1.35)
    
    fig.text(0.5, 0.01,
             f'Matrix: O(V²) = {m_mem:,} bytes | List: O(V+E) = {l_mem:,} bytes | Efisiensi Matrix: {bench_data["structures"]["adjacencyMatrix"]["spaceEfficiency"]:.1f}%',
             ha='center', fontsize=8, style='italic', color='gray')
    
    plt.tight_layout()
    plt.subplots_adjust(bottom=0.12)
    path = os.path.join(OUTPUT_DIR, '02_benchmark_utama_memory.png')
    plt.savefig(path)
    plt.close()
    print(f'  [OK] {os.path.basename(path)}')





def chart_scaling_search():
    sr = scale_data['scalingResults']
    
    vertices = [r['vertices'] for r in sr]
    m_search = [r['search']['adjacencyMatrix'] for r in sr]
    l_search = [r['search']['adjacencyList'] for r in sr]
    
    fig, ax = plt.subplots(figsize=(10, 6))
    
    ax.plot(vertices, m_search, 'o-', color=COLORS['matrix'], linewidth=2.5, 
            markersize=9, label='Adjacency Matrix', marker='s')
    ax.plot(vertices, l_search, 'o-', color=COLORS['list'], linewidth=2.5,
            markersize=9, label='Adjacency List', marker='o')
    

    for i, (v, m, l) in enumerate(zip(vertices, m_search, l_search)):
        ax.annotate(f'{m:.3f}', (v, m), textcoords="offset points",
                    xytext=(0, 10), ha='center', fontsize=8, color=COLORS['matrix'])
        ax.annotate(f'{l:.3f}', (v, l), textcoords="offset points",
                    xytext=(0, -15), ha='center', fontsize=8, color=COLORS['list'])
    
    ax.set_xlabel('Jumlah Vertex (V) — Ukuran Data', fontweight='bold')
    ax.set_ylabel('Waktu Eksekusi (μs per operasi)', fontweight='bold')
    ax.set_title('Scaling Analysis — Operasi SEARCH\nWaktu vs Ukuran Data (Iterasi=10.000)',
                  fontweight='bold', fontsize=13)
    ax.set_xticks(vertices)
    ax.set_xticklabels([f'V={v}\nE={sr[i]["edges"]}' for i, v in enumerate(vertices)], fontsize=9)
    ax.legend(loc='upper right', framealpha=0.9)
    ax.set_xmargin(0.06)
    
    fig.text(0.5, 0.01,
             f'Seed RNG=42 (reproducible) | {scale_data["metadata"]["iterations"]} iterasi/operasi | {scale_data["metadata"]["timestamp"]}',
             ha='center', fontsize=8, style='italic', color='gray')
    
    plt.tight_layout()
    plt.subplots_adjust(bottom=0.12)
    path = os.path.join(OUTPUT_DIR, '03_scaling_waktu_search.png')
    plt.savefig(path)
    plt.close()
    print(f'  [OK] {os.path.basename(path)}')





def chart_scaling_update():
    sr = scale_data['scalingResults']
    
    vertices = [r['vertices'] for r in sr]
    m_upd = [r['update']['adjacencyMatrix'] for r in sr]
    l_upd = [r['update']['adjacencyList'] for r in sr]
    
    fig, ax = plt.subplots(figsize=(10, 6))
    
    ax.plot(vertices, m_upd, 's-', color=COLORS['matrix'], linewidth=2.5,
            markersize=9, label='Adjacency Matrix')
    ax.plot(vertices, l_upd, 'o-', color=COLORS['list'], linewidth=2.5,
            markersize=9, label='Adjacency List')
    
    for i, (v, m, l) in enumerate(zip(vertices, m_upd, l_upd)):
        ax.annotate(f'{m:.3f}', (v, m), textcoords="offset points",
                    xytext=(0, 10), ha='center', fontsize=8, color=COLORS['matrix'])
        ax.annotate(f'{l:.3f}', (v, l), textcoords="offset points",
                    xytext=(0, -15), ha='center', fontsize=8, color=COLORS['list'])
    
    ax.set_xlabel('Jumlah Vertex (V) — Ukuran Data', fontweight='bold')
    ax.set_ylabel('Waktu Eksekusi (μs per operasi)', fontweight='bold')
    ax.set_title('Scaling Analysis — Operasi UPDATE\nWaktu vs Ukuran Data (Iterasi=10.000)',
                  fontweight='bold', fontsize=13)
    ax.set_xticks(vertices)
    ax.set_xticklabels([f'V={v}\nE={sr[i]["edges"]}' for i, v in enumerate(vertices)], fontsize=9)
    ax.legend(loc='upper right', framealpha=0.9)
    

    ratios = [l/m if m > 0 else 0 for m, l in zip(m_upd, l_upd)]
    avg_ratio = np.mean(ratios[1:])
    ax.text(0.02, 0.98, f'Rata-rata: Matrix ≈ {avg_ratio:.1f}× lebih cepat (Update)',
             transform=ax.transAxes, fontsize=10, fontweight='bold',
             verticalalignment='top', color=COLORS['matrix'],
             bbox=dict(boxstyle='round,pad=0.3', facecolor='#eff6ff', alpha=0.9))
    
    fig.text(0.5, 0.01,
             f'Seed RNG=42 (reproducible) | {scale_data["metadata"]["iterations"]} iterasi/operasi',
             ha='center', fontsize=8, style='italic', color='gray')
    
    plt.tight_layout()
    plt.subplots_adjust(bottom=0.11)
    path = os.path.join(OUTPUT_DIR, '04_scaling_waktu_update.png')
    plt.savefig(path)
    plt.close()
    print(f'  [OK] {os.path.basename(path)}')





def chart_scaling_memory():
    sr = scale_data['scalingResults']
    
    vertices = [r['vertices'] for r in sr]
    edges = [r['edges'] for r in sr]
    m_mem_kb = [r['memory']['adjacencyMatrixBytes'] / 1024 for r in sr]
    l_mem_kb = [r['memory']['adjacencyListBytes'] / 1024 for r in sr]
    
    x = np.arange(len(vertices))
    width = 0.35
    
    fig, ax1 = plt.subplots(figsize=(12, 7))
    
    bars1 = ax1.bar(x - width/2, m_mem_kb, width, label='Adjacency Matrix (O(V²))',
                    color=COLORS['matrix'], edgecolor='white', linewidth=0.5)
    bars2 = ax1.bar(x + width/2, l_mem_kb, width, label='Adjacency List (O(V+E))',
                    color=COLORS['list'], edgecolor='white', linewidth=0.5)
    

    for i, (bar_m, bar_l, mkb, lkb) in enumerate(zip(bars1, bars2, m_mem_kb, l_mem_kb)):
        ratio = mkb / lkb if lkb > 0 else 0
        
        ax1.annotate(f'{mkb:,.0f} KB', xy=(bar_m.get_x() + bar_m.get_width()/2, bar_m.get_height()),
                    xytext=(0, 3), textcoords="offset points", ha='center', fontsize=8, fontweight='bold')
        
        ax1.annotate(f'{lkb:,.1f} KB', xy=(bar_l.get_x() + bar_l.get_width()/2, bar_l.get_height()),
                    xytext=(0, 3), textcoords="offset points", ha='center', fontsize=8, fontweight='bold')
        

        mid_x = (bar_m.get_x() + bar_l.get_x() + bar_m.get_width()) / 2
        max_h = max(bar_m.get_height(), bar_l.get_height())
        color = COLORS['accent'] if ratio > 1 else COLORS['list']
        ax1.annotate(f'{ratio:.1f}×', xy=(mid_x, max_h),
                    xytext=(0, 8), textcoords="offset points", ha='center',
                    fontsize=9, fontweight='bold', color=color)
    
    ax1.set_ylabel('Penggunaan Memori (KB)', fontweight='bold')
    ax1.set_xlabel('Ukuran Data (Vertex × Edge)', fontweight='bold')
    ax1.set_title('Scaling Memory — Pertumbuhan Penggunaan Memori\nAdjacency Matrix (Kuadratik O(V²)) vs Adjacency List (Linear O(V+E))',
                  fontweight='bold', fontsize=13)
    ax1.set_xticks(x)
    ax1.set_xticklabels([f'V={v}\nE={e}' for v, e in zip(vertices, edges)], fontsize=9)
    ax1.legend(loc='upper left', framealpha=0.9)
    

    ax1.set_yscale('log')
    ax1.set_yticks([1, 5, 10, 50, 100, 500, 1000, 2000])
    ax1.get_yaxis().set_major_formatter(matplotlib.ticker.ScalarFormatter())
    

    final_ratio = m_mem_kb[-1] / l_mem_kb[-1]
    savings = (1 - l_mem_kb[-1]/m_mem_kb[-1]) * 100
    ax1.text(0.98, 0.02,
             f'V=500: Matrix {m_mem_kb[-1]:,.0f} KB vs List {l_mem_kb[-1]:,.1f} KB\n'
             f'List hemat {savings:.1f}% ({final_ratio:.1f}× lebih irit)\n\n'
             f'Proyeksi V=10.000:\n'
             f'Matrix ≈ {(10000**2*8)/1024/1024:.0f} MB\n'
             f'List ≈ ~3 MB',
             transform=ax1.transAxes, fontsize=10, fontweight='bold',
             ha='right', va='bottom',
             bbox=dict(boxstyle='round,pad=0.5', facecolor='#fef3c7', 
                       edgecolor=COLORS['accent'], alpha=0.95))
    
    fig.text(0.5, 0.01,
             f'Sumber: scaling_benchmark_results.json | {scale_data["metadata"]["timestamp"]} | Log scale Y-axis',
             ha='center', fontsize=8, style='italic', color='gray')
    
    plt.tight_layout()
    plt.subplots_adjust(bottom=0.11)
    path = os.path.join(OUTPUT_DIR, '05_scaling_memory.png')
    plt.savefig(path)
    plt.close()
    print(f'  [OK] {os.path.basename(path)}')





def chart_summary_dashboard():
    """One-page dashboard combining key findings."""
    
    sr = scale_data['scalingResults']
    vertices = [r['vertices'] for r in sr]
    m_mem_kb = [r['memory']['adjacencyMatrixBytes'] / 1024 for r in sr]
    l_mem_kb = [r['memory']['adjacencyListBytes'] / 1024 for r in sr]
    
    fig = plt.figure(figsize=(14, 10))
    

    ax1 = fig.add_subplot(2, 2, 1)
    results = bench_data['benchmarkResults']
    op_order = ['Search\n(exist)', 'Search\n(none)', 'Insert', 'Update', 'Delete', 'Traverse']
    m_vals = []
    l_vals = []
    short_ops = ['Search (exist)', 'Search (none)', 'Insert (exist node)', 'Update', 'Delete', 'Traverse All']
    for op in short_ops:
        m_vals.append(next((r['microseconds'] for r in results 
                            if r['operation'] == op and r['structure'] == 'Adjacency Matrix'), 0))
        l_vals.append(next((r['microseconds'] for r in results 
                            if r['operation'] == op and r['structure'] == 'Adjacency List'), 0))
    
    x = np.arange(len(op_order))
    w = 0.32
    ax1.bar(x - w/2, m_vals, w, color=COLORS['matrix'], label='Matrix', edgecolor='white')
    ax1.bar(x + w/2, l_vals, w, color=COLORS['list'], label='List', edgecolor='white')
    ax1.set_title('Benchmark Waktu (V=500, E=2500)', fontweight='bold', fontsize=11)
    ax1.set_xticks(x)
    ax1.set_xticklabels(op_order, fontsize=8)
    ax1.set_ylabel('μs/op')
    ax1.legend(fontsize=8)
    

    ax2 = fig.add_subplot(2, 2, 2)
    m_total = bench_data['structures']['adjacencyMatrix']['memoryBytes']
    l_total = bench_data['structures']['adjacencyList']['memoryBytes']
    ax2.bar(['Matrix\n(O(V²))', 'List\n(O(V+E))'], [m_total/1024, l_total/1024],
            color=[COLORS['matrix'], COLORS['list']], edgecolor='white', width=0.45)
    ax2.set_title('Memory Usage (V=500)', fontweight='bold', fontsize=11)
    ax2.set_ylabel('KB')
    ax2.annotate(f'{m_total/1024:,.0f} KB', (0, m_total/1024), ha='center', va='bottom', fontweight='bold', fontsize=10)
    ax2.annotate(f'{l_total/1024:,.1f} KB\n(hemat {(1-l_total/m_total)*100:.1f}%)', 
                (1, l_total/1024), ha='center', va='bottom', fontweight='bold', fontsize=10, color=COLORS['list'])
    

    ax3 = fig.add_subplot(2, 2, 3)
    ax3.semilogy(vertices, m_mem_kb, 's-', color=COLORS['matrix'], linewidth=2.5, markersize=8, label='Matrix O(V²)')
    ax3.semilogy(vertices, l_mem_kb, 'o-', color=COLORS['list'], linewidth=2.5, markersize=8, label='List O(V+E)')
    ax3.set_title('Memory Scaling (Log Scale)', fontweight='bold', fontsize=11)
    ax3.set_xlabel('Vertices (V)')
    ax3.set_ylabel('KB (log)')
    ax3.set_xticks(vertices)
    ax3.legend(fontsize=9)
    ax3.grid(True, which='both', alpha=0.3)
    

    ax4 = fig.add_subplot(2, 2, 4)
    ax4.axis('off')
    
    findings = [
        ("[OK] Update", "Matrix 2× lebih cepat"),
        ("[OK] Delete", "Matrix 11.5× lebih cepat"),
        ("[OK] Memory V=500", f"List hemat 94.3% ({m_total/l_total:.1f}×)"),
        ("[OK] Scaling", "Matrix: kuadratik vs List: linear"),
        ("==> Verdict", "Adjacency List lebih optimal untuk\nsparse graph distribusi logistik"),
    ]
    
    y_pos = 0.92
    ax4.text(0.5, 1.02, 'TEMUAN KUNCI', transform=ax4.transAxes,
             fontsize=14, fontweight='bold', ha='center',
             bbox=dict(boxstyle='round,pad=0.4', facecolor=COLORS['matrix'], alpha=0.15))
    
    for title, desc in findings:
        color = COLORS['accent'] if 'Verdict' in title else COLORS['matrix']
        weight = 'bold' if 'Verdict' in title else 'normal'
        ax4.text(0.05, y_pos, title, transform=ax4.transAxes,
                fontsize=12, fontweight='bold', color=color,
                family='monospace')
        ax4.text(0.38, y_pos, desc, transform=ax4.transAxes,
                fontsize=11, fontweight=weight, va='center')
        y_pos -= 0.17
    

    fig.suptitle('LOGISROUTE — DASHBOARD HASIL BENCHMARK\n'
                  'Adjacency Matrix vs Adjacency List | Kelompok 1 Paralel 5 | IPB University SSMDI',
                  fontsize=15, fontweight='bold', y=0.99)
    
    plt.tight_layout(rect=[0, 0.02, 1, 0.95])
    path = os.path.join(OUTPUT_DIR, '06_summary_dashboard.png')
    plt.savefig(path)
    plt.close()
    print(f'  [OK] {os.path.basename(path)}')





if __name__ == '__main__':
    print('=' * 60)
    print('  LOGISROUTE CHART GENERATOR')
    print('  Generating publication-quality charts from benchmark data...')
    print('=' * 60)
    
    print('\n[1/6] Benchmark utama — perbandingan waktu...')
    chart_benchmark_waktu()
    
    print('[2/6] Benchmark utama — perbandingan memory...')
    chart_benchmark_memory()
    
    print('[3/6] Scaling analysis — waktu Search...')
    chart_scaling_search()
    
    print('[4/6] Scaling analysis — waktu Update...')
    chart_scaling_update()
    
    print('[5/6] Scaling analysis — memory growth...')
    chart_scaling_memory()
    
    print('[6/6] Summary dashboard...')
    chart_summary_dashboard()
    
    print('\n' + '=' * 60)
    print(f'  [OK] SEMUA GRAFIK BERHASIL DI-GENERATE!')
    print(f'  --> Output folder: {OUTPUT_DIR}')
    
    files = os.listdir(OUTPUT_DIR)
    for f in sorted(files):
        size = os.path.getsize(os.path.join(OUTPUT_DIR, f))
        print(f'     -> {f} ({size:,} bytes)')
    print('=' * 60)
