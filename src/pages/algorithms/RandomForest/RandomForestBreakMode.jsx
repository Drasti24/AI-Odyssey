import { useState } from "react";
import { motion } from "framer-motion";

export default function RandomForestBreakMode() {
  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="mb-4 text-2xl font-bold text-white">Break Mode</h3>
        <p className="mb-6 text-white/60">
          Random Forest is robust, but it pays a price for its complexity.
        </p>

        <div className="space-y-6">
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
            <h4 className="mb-1 font-bold text-red-400">The "Black Box" Problem</h4>
            <p className="text-sm text-white/50">Unlike a single Decision Tree that you can read like a map, a Forest of 500 trees is impossible for a human to interpret. You know the answer, but not exactly <i>why</i> it chose it.</p>
          </div>

          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
            <h4 className="mb-1 font-bold text-red-400">Memory & Speed</h4>
            <p className="text-sm text-white/50">Storing 1,000 deep trees takes up a lot of space, and waiting for all of them to vote can be slow in real-time apps.</p>
          </div>
        </div>
      </div>

      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6 h-[400px] flex items-center justify-center relative overflow-hidden">
        <svg viewBox="0 0 100 100" className="w-full h-full bg-black/40 rounded-xl">
           {/* Overwhelming amount of data/trees */}
           {[...Array(50)].map((_, i) => (
             <circle 
                key={i}
                cx={Math.random() * 100}
                cy={Math.random() * 100}
                r="1"
                fill="#ef4444"
                opacity="0.3"
             />
           ))}
           <text x="50" y="55" fill="#ef4444" fontSize="6" textAnchor="middle" fontWeight="bold">TOO MUCH COMPLEXITY</text>
        </svg>
      </div>
    </div>
  );
}
