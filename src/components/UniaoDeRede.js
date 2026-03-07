'use client';

import { useState, useCallback, useEffect } from 'react';

const NODE_RADIUS = 22;

const INITIAL_NODES = [
  { id: 1, x: 50, y: 20, label: 'A', color: '#6366f1' },
  { id: 2, x: 80, y: 40, label: 'B', color: '#ec4899' },
  { id: 3, x: 20, y: 50, label: 'C', color: '#10b981' },
  { id: 4, x: 65, y: 68, label: 'D', color: '#f59e0b' },
  { id: 5, x: 35, y: 75, label: 'E', color: '#3b82f6' },
  { id: 6, x: 80, y: 80, label: 'F', color: '#ef4444' },
];

function getConnectedComponents(nodes, edges) {
  const parent = {};
  nodes.forEach((n) => (parent[n.id] = n.id));

  function find(x) {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }

  function union(a, b) {
    parent[find(a)] = find(b);
  }

  edges.forEach(({ from, to }) => union(from, to));

  const groups = {};
  nodes.forEach((n) => {
    const root = find(n.id);
    if (!groups[root]) groups[root] = [];
    groups[root].push(n.id);
  });

  return Object.values(groups);
}

function edgeKey(a, b) {
  return [Math.min(a, b), Math.max(a, b)].join('-');
}

export default function UniaoDeRede() {
  const [nodes, setNodes] = useState(INITIAL_NODES);
  const [edges, setEdges] = useState([]);
  const [selected, setSelected] = useState(null);
  const [flash, setFlash] = useState(null);
  const [unionCount, setUnionCount] = useState(0);

  const components = getConnectedComponents(nodes, edges);
  const largestComponent = Math.max(...components.map((c) => c.length));

  const edgeSet = new Set(edges.map((e) => edgeKey(e.from, e.to)));

  const handleNodeClick = useCallback(
    (nodeId) => {
      if (selected === null) {
        setSelected(nodeId);
        return;
      }

      if (selected === nodeId) {
        setSelected(null);
        return;
      }

      const key = edgeKey(selected, nodeId);

      if (edgeSet.has(key)) {
        // Remove existing edge
        setEdges((prev) =>
          prev.filter((e) => edgeKey(e.from, e.to) !== key)
        );
        setFlash({ type: 'remove', key });
      } else {
        // Add new edge
        setEdges((prev) => [...prev, { from: selected, to: nodeId }]);
        setFlash({ type: 'add', key });
        setUnionCount((c) => c + 1);
      }

      setSelected(null);
    },
    [selected, edgeSet]
  );

  useEffect(() => {
    if (flash) {
      const t = setTimeout(() => setFlash(null), 600);
      return () => clearTimeout(t);
    }
  }, [flash]);

  const handleReset = () => {
    setEdges([]);
    setSelected(null);
    setFlash(null);
    setUnionCount(0);
  };

  const allConnected = components.length === 1 && nodes.length > 1;

  const getNodeById = (id) => nodes.find((n) => n.id === id);

  return (
    <div className="p-5 bg-slate-900 rounded-xl border-2 border-indigo-500 w-full max-w-xl text-white">
      <style>{`
        @keyframes pulse-ring {
          0% { r: 24; opacity: 0.7; }
          100% { r: 38; opacity: 0; }
        }
        .pulse-ring {
          animation: pulse-ring 0.6s ease-out forwards;
        }
        @keyframes edge-draw {
          from { stroke-dashoffset: 300; }
          to { stroke-dashoffset: 0; }
        }
        .edge-new {
          stroke-dasharray: 300;
          animation: edge-draw 0.4s ease-out forwards;
        }
        @keyframes celebrate {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
        .celebrate {
          animation: celebrate 0.5s ease-in-out 3;
        }
      `}</style>

      <h2 className="text-2xl font-bold text-indigo-300 mb-1 text-center tracking-wide">
        Uniao de Rede
      </h2>
      <p className="text-slate-400 text-xs text-center mb-4">
        Toque em dois nos para conecta-los. Una toda a rede!
      </p>

      {/* Stats */}
      <div className="flex justify-around mb-4 text-center">
        <div>
          <div className="text-lg font-bold text-indigo-300">{nodes.length}</div>
          <div className="text-xs text-slate-400">Nos</div>
        </div>
        <div>
          <div className="text-lg font-bold text-pink-400">{edges.length}</div>
          <div className="text-xs text-slate-400">Arestas</div>
        </div>
        <div>
          <div className="text-lg font-bold text-emerald-400">{components.length}</div>
          <div className="text-xs text-slate-400">Componentes</div>
        </div>
        <div>
          <div className="text-lg font-bold text-amber-400">{unionCount}</div>
          <div className="text-xs text-slate-400">Unides</div>
        </div>
      </div>

      {/* Network canvas */}
      <div
        className={`relative w-full rounded-xl overflow-hidden mb-4 ${allConnected ? 'celebrate' : ''}`}
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
          paddingTop: '85%',
        }}
      >
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          style={{ touchAction: 'manipulation' }}
        >
          {/* Grid dots */}
          {Array.from({ length: 6 }, (_, r) =>
            Array.from({ length: 6 }, (_, c) => (
              <circle
                key={`g${r}-${c}`}
                cx={10 + c * 16}
                cy={10 + r * 16}
                r={0.4}
                fill="#334155"
              />
            ))
          )}

          {/* Edges */}
          {edges.map((e) => {
            const from = getNodeById(e.from);
            const to = getNodeById(e.to);
            if (!from || !to) return null;
            const key = edgeKey(e.from, e.to);
            const isNew = flash?.type === 'add' && flash.key === key;
            return (
              <line
                key={key}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={isNew ? '#a5b4fc' : '#4f46e5'}
                strokeWidth={isNew ? 1.2 : 0.8}
                strokeLinecap="round"
                className={isNew ? 'edge-new' : ''}
              />
            );
          })}

          {/* All-connected glow */}
          {allConnected && (
            <rect
              x="0"
              y="0"
              width="100"
              height="100"
              fill="none"
              stroke="#10b981"
              strokeWidth="1.5"
              rx="4"
              opacity="0.5"
            />
          )}

          {/* Nodes */}
          {nodes.map((node) => {
            const isSelected = selected === node.id;
            const component = components.find((c) => c.includes(node.id));
            const inLargest = component && component.length === largestComponent && largestComponent > 1;
            return (
              <g
                key={node.id}
                onClick={() => handleNodeClick(node.id)}
                style={{ cursor: 'pointer' }}
              >
                {/* Selection ring */}
                {isSelected && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={NODE_RADIUS / 3.2 + 4}
                    fill="none"
                    stroke="#fff"
                    strokeWidth="1"
                    opacity="0.9"
                    strokeDasharray="3 2"
                  />
                )}

                {/* Flash pulse */}
                {flash?.type === 'add' &&
                  [node.id].some((id) => {
                    const [a, b] = flash.key.split('-').map(Number);
                    return id === a || id === b;
                  }) && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={NODE_RADIUS / 3.2}
                    fill={node.color}
                    opacity="0.4"
                    className="pulse-ring"
                  />
                )}

                {/* Node circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={NODE_RADIUS / 3.5}
                  fill={node.color}
                  stroke={isSelected ? '#fff' : inLargest && allConnected ? '#10b981' : 'rgba(255,255,255,0.2)'}
                  strokeWidth={isSelected ? 1.2 : 0.6}
                />

                {/* Label */}
                <text
                  x={node.x}
                  y={node.y + 0.35 * (NODE_RADIUS / 3.5)}
                  textAnchor="middle"
                  fontSize={NODE_RADIUS / 5.5}
                  fontWeight="bold"
                  fill="#fff"
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Overlay message */}
        {allConnected && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-emerald-900/80 rounded-xl px-4 py-2 text-center backdrop-blur-sm border border-emerald-400">
              <div className="text-emerald-300 font-bold text-base">Rede Unida!</div>
              <div className="text-emerald-400 text-xs">Todos os nos conectados</div>
            </div>
          </div>
        )}

        {/* Selected hint */}
        {selected !== null && !allConnected && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center pointer-events-none">
            <div className="bg-indigo-900/80 rounded-lg px-3 py-1 text-xs text-indigo-200 border border-indigo-500 backdrop-blur-sm">
              No <span className="font-bold text-white">{getNodeById(selected)?.label}</span> selecionado — toque em outro no
            </div>
          </div>
        )}
      </div>

      {/* Component visualization */}
      <div className="mb-4">
        <p className="text-slate-400 text-xs mb-2 text-center">Componentes da rede</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {components.map((comp, i) => (
            <div
              key={i}
              className="flex items-center gap-1 px-2 py-1 rounded-lg border text-xs"
              style={{
                borderColor: comp.length > 1 ? '#6366f1' : '#475569',
                background: comp.length > 1 ? 'rgba(99,102,241,0.1)' : 'rgba(71,85,105,0.1)',
              }}
            >
              {comp.map((id) => {
                const node = getNodeById(id);
                return (
                  <span
                    key={id}
                    className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-white"
                    style={{ background: node?.color, fontSize: '0.65rem' }}
                  >
                    {node?.label}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleReset}
          className="flex-1 py-2.5 rounded-xl bg-slate-700 border border-slate-500 text-slate-200 text-sm font-semibold active:scale-95 transition-transform"
        >
          Resetar
        </button>
        <button
          onClick={() => setSelected(null)}
          disabled={selected === null}
          className="flex-1 py-2.5 rounded-xl bg-indigo-800 border border-indigo-500 text-indigo-200 text-sm font-semibold active:scale-95 transition-transform disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Cancelar selecao
        </button>
      </div>
    </div>
  );
}
