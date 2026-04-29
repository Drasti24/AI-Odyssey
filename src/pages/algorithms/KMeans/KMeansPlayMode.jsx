import { useState } from "react";
import { motion } from "framer-motion";
import { INITIAL_KMEANS_DATA, INITIAL_CENTROIDS, assignToClusters, updateCentroids } from "./KMeansUtils";

export default function KMeansPlayMode() {
  const [points, setPoints] = useState(INITIAL_KMEANS_DATA);
  const [centroids, setCentroids] = useState(INITIAL_CENTROIDS);
  const [step, setStep] = useState('assign'); // 'assign' or 'update'

  const handleNext = () => {
    if (step === 'assign') {
      const newPoints = assignToClusters(points, centroids);
      setPoints(newPoints);
      setStep('update');
    } else {
      const newCentroids = updateCentroids(points, centroids);
      setCentroids(newCentroids);
      setStep('assign');
    }
  };

  const reset = () => {
    setPoints(INITIAL_KMEANS_DATA);
    setCentroids(INITIAL_CENTROIDS);
    setStep('assign');
  };

  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="mb-4 text-2xl font-bold text-white">Play Mode</h3>
        <p className="mb-6 text-white/60">
          K-Means works by repeating two steps: 1) Assigning points to the nearest center, and 2) Moving the centers to the middle of their group. Click "Next Step" to see the iterative magic!
        </p>

        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-4">
            <div className={`flex-1 rounded-xl border p-4 transition-all ${step === 'assign' ? 'border-cyan-400 bg-cyan-400/10' : 'border-white/5 opacity-40'}`}>
              <span className="block text-xs font-bold uppercase text-cyan-400">Step 1</span>
              <span className="font-bold">Assign Points</span>
            </div>
            <div className={`flex-1 rounded-xl border p-4 transition-all ${step === 'update' ? 'border-purple-400 bg-purple-400/10' : 'border-white/5 opacity-40'}`}>
              <span className="block text-xs font-bold uppercase text-purple-400">Step 2</span>
              <span className="font-bold">Update Centers</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleNext}
            className="flex-1 rounded-xl bg-cyan-400 py-3 font-bold text-black transition-all hover:bg-cyan-300"
          >
            Next Step
          </button>
          <button
            onClick={reset}
            className="rounded-xl border border-white/10 px-6 py-3 font-bold text-white hover:bg-white/5"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6 h-[400px]">
        <svg viewBox="0 0 100 100" className="w-full h-full bg-black/40 rounded-xl">
          {/* Centroids */}
          {centroids.map(c => (
            <motion.path
                key={c.id}
                d="M -3 0 L 3 0 M 0 -3 L 0 3"
                stroke={c.color}
                strokeWidth="1.5"
                initial={false}
                animate={{ x: c.x, y: c.y }}
                transition={{ type: "spring", stiffness: 100 }}
                className="drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
            />
          ))}

          {/* Points */}
          {points.map(p => (
            <motion.circle
              key={p.id}
              cx={p.x}
              cy={p.y}
              r="2.5"
              fill={p.clusterId ? centroids.find(c => c.id === p.clusterId)?.color : 'white'}
              initial={false}
              animate={{ fill: p.clusterId ? centroids.find(c => c.id === p.clusterId)?.color : 'white' }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
