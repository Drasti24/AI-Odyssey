import { useState } from "react";
import { motion } from "framer-motion";
import { calculateLinearRegression, calculateMSE, INITIAL_REGRESSION_DATA } from "./LinearRegressionUtils";

export default function LinearRegressionPlayMode() {
  const [points, setPoints] = useState(INITIAL_REGRESSION_DATA);
  const { m, b } = calculateLinearRegression(points);
  const mse = calculateMSE(points, m, b);

  const handleSVGClick = (e) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setPoints([...points, { id: Date.now(), x, y }]);
  };

  const clearPoints = () => setPoints([]);

  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="mb-4 text-2xl font-bold text-white">Play Mode</h3>
        <p className="mb-6 text-white/60">
          Click anywhere in the box to add data points. Watch how the line of best fit (Regression Line) automatically adjusts to minimize the distance to all points!
        </p>

        <div className="mb-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-black/40 p-4 border border-white/5">
              <span className="block text-xs font-semibold uppercase tracking-wider text-white/40">Slope (m)</span>
              <span className="text-2xl font-mono font-bold text-cyan-400">{m.toFixed(2)}</span>
            </div>
            <div className="rounded-xl bg-black/40 p-4 border border-white/5">
              <span className="block text-xs font-semibold uppercase tracking-wider text-white/40">Intercept (b)</span>
              <span className="text-2xl font-mono font-bold text-purple-400">{b.toFixed(2)}</span>
            </div>
          </div>

          <div className="rounded-xl bg-cyan-400/10 p-4 border border-cyan-400/20">
            <span className="block text-xs font-semibold uppercase tracking-wider text-cyan-400/60">Mean Squared Error (Loss)</span>
            <span className="text-2xl font-mono font-bold text-cyan-300">{mse.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={clearPoints}
          className="w-full rounded-xl border border-white/20 py-3 font-bold text-white transition-all hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-300"
        >
          Clear All Points
        </button>
      </div>

      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6 h-[400px]">
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full bg-black/40 rounded-xl cursor-crosshair touch-none"
          onClick={handleSVGClick}
        >
          {/* Grid lines */}
          <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="0.1" strokeOpacity="0.2" />
          <line x1="50" y1="0" x2="50" y2="100" stroke="white" strokeWidth="0.1" strokeOpacity="0.2" />

          {/* Regression Line */}
          {points.length > 1 && (
            <motion.line
              x1="0"
              y1={b}
              x2="100"
              y2={m * 100 + b}
              stroke="#22d3ee"
              strokeWidth="1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y1: b, y2: m * 100 + b }}
              transition={{ duration: 0.3 }}
            />
          )}

          {/* Points */}
          {points.map((p) => (
            <motion.circle
              key={p.id}
              cx={p.x}
              cy={p.y}
              r="2"
              fill="white"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.5, fill: "#22d3ee" }}
            />
          ))}

          {/* Error lines (Residuals) */}
          {points.length > 1 && points.map((p) => {
            const predY = m * p.x + b;
            return (
              <line
                key={`err-${p.id}`}
                x1={p.x}
                y1={p.y}
                x2={p.x}
                y2={predY}
                stroke="#6366f1"
                strokeWidth="0.5"
                strokeDasharray="1 1"
                opacity="0.5"
              />
            );
          })}
        </svg>
        <p className="mt-2 text-center text-xs text-white/30 italic">Click the box above to add interactive data points</p>
      </div>
    </div>
  );
}
