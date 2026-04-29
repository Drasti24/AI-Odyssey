import { useState } from "react";
import { motion } from "framer-motion";
import { INITIAL_DATASET, TEST_POINT, CLASS_COLORS, getNearestNeighbors } from "./Dataset";

export default function KNNTeachMode() {
  const [k, setK] = useState(3);
  const [selectedIds, setSelectedIds] = useState([]);
  const [checked, setChecked] = useState(false);

  const trueNeighbors = getNearestNeighbors(TEST_POINT, INITIAL_DATASET, k);
  const trueNeighborIds = trueNeighbors.map((n) => n.id);

  const toggleSelection = (id) => {
    if (checked) return; // Prevent selection after checking
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((sel) => sel !== id));
    } else {
      if (selectedIds.length < k) {
        setSelectedIds([...selectedIds, id]);
      }
    }
  };

  const handleCheck = () => {
    if (selectedIds.length !== k) {
      alert(`Please select exactly ${k} points!`);
      return;
    }
    setChecked(true);
  };

  const handleReset = () => {
    setSelectedIds([]);
    setChecked(false);
  };

  // Evaluation
  const correctSelections = selectedIds.filter((id) => trueNeighborIds.includes(id));
  const isAllCorrect = correctSelections.length === k;

  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="mb-4 text-2xl font-bold text-white">Teach Mode</h3>
        <p className="mb-6 text-white/60">
          You are the algorithm! Click exactly <strong>{k}</strong> points on the graph that you think are the closest to the mystery point.
        </p>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-semibold text-white/80">Current K = {k}</label>
          <input
            type="range"
            min="1"
            max="7"
            step="2"
            value={k}
            onChange={(e) => {
              setK(parseInt(e.target.value));
              handleReset();
            }}
            disabled={checked}
            className="w-full"
          />
        </div>

        <div className="mb-6 rounded-lg bg-black/20 p-4 text-center">
          <span className="text-xl font-bold text-white">
            Selected: <span className="text-cyan-300">{selectedIds.length}</span> / {k}
          </span>
        </div>

        {!checked ? (
          <button
            onClick={handleCheck}
            disabled={selectedIds.length !== k}
            className="w-full rounded-xl bg-cyan-400 py-3 font-bold text-black transition-all hover:bg-cyan-300 disabled:opacity-50"
          >
            Check My Logic
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="w-full rounded-xl border border-white/20 bg-transparent py-3 font-bold text-white transition-all hover:bg-white/10"
          >
            Try Again
          </button>
        )}

        {checked && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 rounded-xl border p-4 ${
              isAllCorrect ? "border-green-400/50 bg-green-400/10 text-green-300" : "border-red-400/50 bg-red-400/10 text-red-300"
            }`}
          >
            <h4 className="mb-2 font-bold text-lg">
              {isAllCorrect ? "Perfect!" : `You got ${correctSelections.length} out of ${k} correct.`}
            </h4>
            <p className="text-sm text-white/80">
              The algorithm simply calculates the straight-line (Euclidean) distance to every point and picks the smallest ones. Look at the lines to see the actual closest points!
            </p>
          </motion.div>
        )}
      </div>

      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6 flex items-center justify-center relative">
        <svg viewBox="0 0 100 100" className="w-full h-full max-h-[400px] bg-black/40 rounded-xl">
          {/* Render Actual Nearest Neighbor Lines when checked */}
          {checked &&
            trueNeighbors.map((n) => (
              <motion.line
                key={`true-line-${n.id}`}
                x1={TEST_POINT.x}
                y1={TEST_POINT.y}
                x2={n.x}
                y2={n.y}
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="0.5"
                strokeDasharray="1 1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5 }}
              />
            ))}

          {/* Render Dataset */}
          {INITIAL_DATASET.map((p) => {
            const isSelected = selectedIds.includes(p.id);
            const isActuallyNearest = checked && trueNeighborIds.includes(p.id);
            
            let strokeColor = "transparent";
            let strokeW = "0";
            if (checked) {
              if (isSelected && isActuallyNearest) strokeColor = "#4ade80"; // green
              else if (isSelected && !isActuallyNearest) strokeColor = "#f87171"; // red
              else if (!isSelected && isActuallyNearest) strokeColor = "#fbbf24"; // amber (missed)
              strokeW = "1";
            } else if (isSelected) {
              strokeColor = "white";
              strokeW = "0.5";
            }

            return (
              <circle
                key={p.id}
                cx={p.x}
                cy={p.y}
                r={isSelected ? "4" : "3"}
                fill={CLASS_COLORS[p.class]}
                stroke={strokeColor}
                strokeWidth={strokeW}
                className="cursor-pointer transition-all hover:r-4"
                onClick={() => toggleSelection(p.id)}
              />
            );
          })}

          {/* Render Test Point */}
          <circle
            cx={TEST_POINT.x}
            cy={TEST_POINT.y}
            r="4"
            fill={CLASS_COLORS.Unknown}
            stroke="white"
            strokeWidth="1"
          />
          <text x={TEST_POINT.x} y={TEST_POINT.y - 6} fill="white" fontSize="4" textAnchor="middle">
            ?
          </text>
        </svg>
      </div>
    </div>
  );
}
