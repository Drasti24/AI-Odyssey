import { useState } from "react";
import { motion } from "framer-motion";
import { sigmoid, INITIAL_LOGISTIC_DATA } from "./LogisticRegressionUtils";

export default function LogisticRegressionPlayMode() {
  const [m, setM] = useState(0.2);
  const [b, setB] = useState(-10);

  // Generate curve points
  const curvePoints = [];
  for (let x = 0; x <= 100; x += 2) {
    const y = sigmoid(m * x + b) * 100;
    curvePoints.push(`${x},${100 - y}`);
  }

  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="mb-4 text-2xl font-bold text-white">Play Mode</h3>
        <p className="mb-6 text-white/60">
          Logistic Regression doesn't just predict 0 or 1—it predicts <b>probability</b>! Adjust the weights below to see how the S-curve (Sigmoid) fits the data.
        </p>

        <div className="mb-8 space-y-6">
          <div>
            <div className="flex justify-between text-sm font-bold text-cyan-400 mb-2">
              <span>Weight (m)</span>
              <span>{m.toFixed(2)}</span>
            </div>
            <input 
              type="range" min="0.01" max="1" step="0.01" value={m} 
              onChange={(e) => setM(parseFloat(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          <div>
            <div className="flex justify-between text-sm font-bold text-purple-400 mb-2">
              <span>Bias (b)</span>
              <span>{b.toFixed(1)}</span>
            </div>
            <input 
              type="range" min="-50" max="0" step="1" value={b} 
              onChange={(e) => setB(parseFloat(e.target.value))}
              className="w-full accent-purple-400"
            />
          </div>
        </div>

        <div className="rounded-xl bg-cyan-400/10 p-4 border border-cyan-400/20 text-center">
            <p className="text-xs font-bold text-cyan-400/60 uppercase">Decision Boundary</p>
            <p className="text-xl font-mono font-bold text-cyan-300">x = {(-b/m).toFixed(1)}</p>
        </div>
      </div>

      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6 h-[400px]">
        <svg viewBox="0 0 100 100" className="w-full h-full bg-black/40 rounded-xl overflow-hidden">
          {/* Probability Bands */}
          <rect x="0" y="0" width="100" height="50" fill="#f472b6" fillOpacity="0.05" />
          <rect x="0" y="50" width="100" height="50" fill="#22d3ee" fillOpacity="0.05" />
          <text x="2" y="10" fill="#f472b6" fontSize="3" opacity="0.4">YES (1.0)</text>
          <text x="2" y="95" fill="#22d3ee" fontSize="3" opacity="0.4">NO (0.0)</text>

          {/* Sigmoid Curve */}
          <polyline
            points={curvePoints.join(" ")}
            fill="none"
            stroke="#22d3ee"
            strokeWidth="1.5"
            className="transition-all duration-300"
          />

          {/* Data Points */}
          {INITIAL_LOGISTIC_DATA.map(p => (
            <circle
              key={p.id}
              cx={p.x}
              cy={100 - (p.y * 100)}
              r="2.5"
              fill={p.y > 0.5 ? '#f472b6' : '#22d3ee'}
              stroke="white"
              strokeWidth="0.5"
            />
          ))}

          {/* Decision Boundary Line */}
          <line 
            x1={-b/m} y1="0" x2={-b/m} y2="100" 
            stroke="white" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.3" 
          />
        </svg>
        <p className="mt-4 text-center text-xs text-white/30 italic">Adjust m and b to flip the probability switch</p>
      </div>
    </div>
  );
}
