import { useState, useRef } from "react";
import { INITIAL_DATASET, TEST_POINT, CLASS_COLORS, getNearestNeighbors, classifyKNN } from "./Dataset";

export default function KNNBreakMode() {
  const [k, setK] = useState(3);
  const [testPt, setTestPt] = useState({ ...TEST_POINT });
  const [dataset, setDataset] = useState([...INITIAL_DATASET]);
  const svgRef = useRef(null);

  // Live Calculations
  const neighbors = getNearestNeighbors(testPt, dataset, k);
  const actualClass = classifyKNN(neighbors);

  const handleSvgClick = (e) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Add a new outlier (alternating classes to make it fun)
    const newClass = Math.random() > 0.5 ? "A" : "B";
    setDataset([
      ...dataset,
      { id: Date.now(), x, y, class: newClass },
    ]);
  };

  const handleDragTestPoint = (e) => {
    // Simple basic HTML5 drag is complex in plain React without libraries, 
    // we'll just let users move the test point using a slider or clicking for now.
    // For simplicity, click on SVG background adds points, but maybe we can add an X/Y slider for the test point.
  };

  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="mb-4 text-2xl font-bold text-white">Break Mode</h3>
        <p className="mb-6 text-white/60">
          Time to break the model! See how sensitive KNN is to outliers or different values of K. 
          Everything updates live.
        </p>

        <div className="mb-6 space-y-6">
          <div>
            <label className="mb-2 block text-sm font-semibold text-white/80">Change K = {k}</label>
            <input
              type="range"
              min="1"
              max="15"
              step="2"
              value={k}
              onChange={(e) => setK(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-white/80">Move Mystery Point (X)</label>
            <input
              type="range"
              min="0"
              max="100"
              value={testPt.x}
              onChange={(e) => setTestPt({ ...testPt, x: parseFloat(e.target.value) })}
              className="w-full"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-white/80">Move Mystery Point (Y)</label>
            <input
              type="range"
              min="0"
              max="100"
              value={testPt.y}
              onChange={(e) => setTestPt({ ...testPt, y: parseFloat(e.target.value) })}
              className="w-full"
            />
          </div>
        </div>

        <div className="mb-6 rounded-lg bg-black/20 p-4 text-center">
          <p className="mb-2 text-sm text-white/60">Live Prediction:</p>
          <span
            className="text-2xl font-bold"
            style={{ color: CLASS_COLORS[actualClass] }}
          >
            Class {actualClass === "A" ? "Cyan" : "Pink"}
          </span>
        </div>

        <button
          onClick={() => setDataset([...INITIAL_DATASET])}
          className="w-full rounded-xl border border-white/20 bg-transparent py-3 font-bold text-white transition-all hover:bg-white/10"
        >
          Reset Dataset
        </button>
      </div>

      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col items-center justify-center relative">
        <p className="mb-4 text-sm text-white/40">Click the graph to add random outliers!</p>
        <svg
          ref={svgRef}
          onClick={handleSvgClick}
          viewBox="0 0 100 100"
          className="w-full h-full max-h-[400px] bg-black/40 rounded-xl cursor-crosshair"
        >
          {/* Render Lines to Live Neighbors */}
          {neighbors.map((n) => (
            <line
              key={`live-line-${n.id}`}
              x1={testPt.x}
              y1={testPt.y}
              x2={n.x}
              y2={n.y}
              stroke="white"
              strokeWidth="0.3"
              strokeDasharray="1 1"
            />
          ))}

          {/* Render Live Dataset */}
          {dataset.map((p) => (
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
            cx={testPt.x}
            cy={testPt.y}
            r="5"
            fill={CLASS_COLORS[actualClass]}
            stroke="white"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </div>
  );
}
