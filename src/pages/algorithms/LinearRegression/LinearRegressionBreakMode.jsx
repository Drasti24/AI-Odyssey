import { useState } from "react";
import { motion } from "framer-motion";
import { calculateLinearRegression } from "./LinearRegressionUtils";

const BREAK_CASES = {
  OUTLIER: [
    { id: 1, x: 10, y: 90 }, { id: 2, x: 20, y: 80 }, { id: 3, x: 30, y: 70 },
    { id: 4, x: 90, y: 10 }, // The group
    { id: 5, x: 20, y: 10 }  // THE OUTLIER
  ],
  NONLINEAR: [
    { id: 1, x: 10, y: 80 }, { id: 2, x: 20, y: 50 }, { id: 3, x: 30, y: 30 },
    { id: 4, x: 40, y: 20 }, { id: 5, x: 50, y: 20 }, { id: 6, x: 60, y: 30 },
    { id: 7, x: 70, y: 50 }, { id: 8, x: 80, y: 80 }
  ]
};

export default function LinearRegressionBreakMode() {
  const [caseType, setCaseType] = useState("OUTLIER");
  const points = BREAK_CASES[caseType];
  const { m, b } = calculateLinearRegression(points);

  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="mb-4 text-2xl font-bold text-white">Break Mode</h3>
        <p className="mb-6 text-white/60">
          Linear Regression is powerful but it can be easily fooled. See how these common scenarios break the model's logic.
        </p>

        <div className="space-y-4">
          <button
            onClick={() => setCaseType("OUTLIER")}
            className={`w-full rounded-xl border p-4 text-left transition-all ${
              caseType === "OUTLIER" ? "border-cyan-400 bg-cyan-400/10" : "border-white/5 bg-white/5 hover:bg-white/10"
            }`}
          >
            <h4 className={`font-bold ${caseType === "OUTLIER" ? "text-cyan-300" : "text-white"}`}>The Outlier Effect</h4>
            <p className="text-sm text-white/50">A single extreme point can pull the entire line away from the actual trend.</p>
          </button>

          <button
            onClick={() => setCaseType("NONLINEAR")}
            className={`w-full rounded-xl border p-4 text-left transition-all ${
              caseType === "NONLINEAR" ? "border-cyan-400 bg-cyan-400/10" : "border-white/5 bg-white/5 hover:bg-white/10"
            }`}
          >
            <h4 className={`font-bold ${caseType === "NONLINEAR" ? "text-cyan-300" : "text-white"}`}>Non-Linear Patterns</h4>
            <p className="text-sm text-white/50">Trying to fit a straight line to a curve results in high error and poor predictions.</p>
          </button>
        </div>
      </div>

      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6 h-[400px]">
        <svg viewBox="0 0 100 100" className="w-full h-full bg-black/40 rounded-xl">
           {/* Regression Line */}
           <motion.line
              x1="0"
              y1={b}
              x2="100"
              y2={m * 100 + b}
              stroke="#ef4444"
              strokeWidth="1.2"
              animate={{ y1: b, y2: m * 100 + b }}
              transition={{ type: "spring", stiffness: 100 }}
            />

          {/* Points */}
          {points.map((p) => (
            <circle
              key={p.id}
              cx={p.x}
              cy={p.y}
              r="2.5"
              fill={p.id === 5 && caseType === "OUTLIER" ? "#ef4444" : "white"}
              className={p.id === 5 && caseType === "OUTLIER" ? "animate-pulse" : ""}
            />
          ))}

          {caseType === "OUTLIER" && (
            <text x="20" y="18" fill="#ef4444" fontSize="4" fontWeight="bold">OUTLIER!</text>
          )}
        </svg>
        <p className="mt-4 text-center text-sm text-white/40 italic">
          {caseType === "OUTLIER" 
            ? "Notice how the red line is dragged down by the outlier, missing the blue trend." 
            : "The straight line fails to capture the 'U' shape of the data points."}
        </p>
      </div>
    </div>
  );
}
