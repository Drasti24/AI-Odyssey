import { useState } from "react";
import { motion } from "framer-motion";

export default function KMeansBreakMode() {
  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="mb-4 text-2xl font-bold text-white">Break Mode</h3>
        <p className="mb-6 text-white/60">
          K-Means is incredibly fast, but it has blind spots. It assumes clusters are spherical and can be ruined by bad starting positions or a single distant point.
        </p>

        <div className="space-y-6">
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
            <h4 className="mb-1 font-bold text-red-400">Centroid Traps</h4>
            <p className="text-sm text-white/50">If two centroids start too close to each other, they might fight over the same group and leave another group completely un-clustered!</p>
          </div>

          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
            <h4 className="mb-1 font-bold text-red-400">The Outlier Pull</h4>
            <p className="text-sm text-white/50">Because it uses the 'mean' (average), a single point far away will drag the center toward it, even if it doesn't belong there.</p>
          </div>
        </div>
      </div>

      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6 h-[400px] relative overflow-hidden">
        <svg viewBox="0 0 100 100" className="w-full h-full bg-black/40 rounded-xl">
           {/* Cluster A */}
           <circle cx="20" cy="50" r="2" fill="#22d3ee" />
           <circle cx="25" cy="45" r="2" fill="#22d3ee" />
           <circle cx="22" cy="55" r="2" fill="#22d3ee" />

           {/* Outlier pulling center far away */}
           <circle cx="85" cy="50" r="3" fill="#22d3ee" className="animate-pulse" />
           <line x1="22" y1="50" x2="85" y2="50" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="2 2" />

           {/* Centroid stuck in the middle because of outlier */}
           <circle cx="53.5" cy="50" r="4" fill="#22d3ee" stroke="white" strokeWidth="1" />
           
           <text x="53.5" y="42" fill="#ef4444" fontSize="4" textAnchor="middle" fontWeight="bold">STUCK IN BETWEEN</text>
        </svg>
      </div>
    </div>
  );
}
