import { useState } from "react";
import { motion } from "framer-motion";
import { INITIAL_DATASET, TEST_POINT, CLASS_COLORS, getNearestNeighbors, classifyKNN } from "./Dataset";

export default function KNNPlayMode() {
  const [k, setK] = useState(3);
  const [guess, setGuess] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const neighbors = getNearestNeighbors(TEST_POINT, INITIAL_DATASET, k);
  const actualClass = classifyKNN(neighbors);

  const handleCalculate = () => {
    if (!guess) {
      alert("Please guess the class first!");
      return;
    }
    setShowResults(true);
  };

  const handleReset = () => {
    setGuess(null);
    setShowResults(false);
  };

  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="mb-4 text-2xl font-bold text-white">Play Mode</h3>
        <p className="mb-6 text-white/60">
          A new mystery point has appeared! Based on its surrounding neighbors, what class do you think it belongs to? Select a K value, make a guess, and calculate!
        </p>

        <div className="mb-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-white/80">Choose K (Number of Neighbors)</label>
            <input
              type="range"
              min="1"
              max="7"
              step="2"
              value={k}
              onChange={(e) => {
                setK(parseInt(e.target.value));
                setShowResults(false);
              }}
              className="w-full"
            />
            <div className="mt-1 text-center font-mono text-cyan-300">K = {k}</div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-white/80">Your Guess</label>
            <div className="flex gap-4">
              <button
                onClick={() => setGuess("A")}
                className={`flex-1 rounded-lg border py-3 font-bold transition-all ${
                  guess === "A" ? "border-cyan-400 bg-cyan-400/20 text-cyan-300" : "border-white/20 text-white hover:bg-white/10"
                }`}
              >
                Class Cyan
              </button>
              <button
                onClick={() => setGuess("B")}
                className={`flex-1 rounded-lg border py-3 font-bold transition-all ${
                  guess === "B" ? "border-pink-400 bg-pink-400/20 text-pink-300" : "border-white/20 text-white hover:bg-white/10"
                }`}
              >
                Class Pink
              </button>
            </div>
          </div>
        </div>

        {!showResults ? (
          <button
            onClick={handleCalculate}
            className="w-full rounded-xl bg-cyan-400 py-3 font-bold text-black transition-all hover:bg-cyan-300"
          >
            Calculate Distance & Predict
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="w-full rounded-xl border border-white/20 bg-transparent py-3 font-bold text-white transition-all hover:bg-white/10"
          >
            Reset
          </button>
        )}

        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 rounded-xl border p-4 ${
              guess === actualClass ? "border-green-400/50 bg-green-400/10 text-green-300" : "border-red-400/50 bg-red-400/10 text-red-300"
            }`}
          >
            <h4 className="mb-2 font-bold text-lg">
              {guess === actualClass ? "Correct!" : "Not quite!"}
            </h4>
            <p className="text-sm text-white/80">
              By looking at the {k} nearest neighbors, we found that most of them belong to Class {actualClass === "A" ? "Cyan" : "Pink"}. Therefore, the algorithm classifies the mystery point as {actualClass === "A" ? "Cyan" : "Pink"}.
            </p>
          </motion.div>
        )}
      </div>

      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6 flex items-center justify-center relative">
        <svg viewBox="0 0 100 100" className="w-full h-full max-h-[400px] bg-black/40 rounded-xl">
          {/* Grid lines optional */}
          {/* Draw lines to nearest neighbors if showResults is true */}
          {showResults &&
            neighbors.map((n) => (
              <motion.line
                key={`line-${n.id}`}
                x1={TEST_POINT.x}
                y1={TEST_POINT.y}
                x2={n.x}
                y2={n.y}
                stroke="white"
                strokeWidth="0.5"
                strokeDasharray="2 2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5 }}
              />
            ))}

          {/* Render Dataset */}
          {INITIAL_DATASET.map((p) => (
            <circle
              key={p.id}
              cx={p.x}
              cy={p.y}
              r="3"
              fill={CLASS_COLORS[p.class]}
            />
          ))}

          {/* Render Test Point */}
          <circle
            cx={TEST_POINT.x}
            cy={TEST_POINT.y}
            r="4"
            fill={showResults ? CLASS_COLORS[actualClass] : CLASS_COLORS.Unknown}
            stroke="white"
            strokeWidth="1"
            className={!showResults ? "animate-pulse" : ""}
          />
          <text x={TEST_POINT.x} y={TEST_POINT.y - 6} fill="white" fontSize="4" textAnchor="middle">
            ?
          </text>
        </svg>
      </div>
    </div>
  );
}
