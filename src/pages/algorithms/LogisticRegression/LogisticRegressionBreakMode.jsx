import { useState } from "react";
import { motion } from "framer-motion";

export default function LogisticRegressionBreakMode() {
  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="mb-4 text-2xl font-bold text-white">Break Mode</h3>
        <p className="mb-6 text-white/60">
          Logistic Regression assumes that your data can be cleanly separated by a single boundary. If it's not, or if outliers are too extreme, it fails!
        </p>

        <div className="space-y-6">
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
            <h4 className="mb-1 font-bold text-red-400">Non-Separability</h4>
            <p className="text-sm text-white/50">When 'Yes' and 'No' data are mixed together like a salad, a simple S-curve can't tell them apart, leading to a flat line (0.5 probability everywhere).</p>
          </div>

          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
            <h4 className="mb-1 font-bold text-red-400">Outlier Distortion</h4>
            <p className="text-sm text-white/50">A single point that is extremely 'Yes' but located in the 'No' zone can drastically shift the boundary, ruining the accuracy for everyone else.</p>
          </div>
        </div>
      </div>

      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6 h-[400px] flex items-center justify-center relative overflow-hidden">
        <svg viewBox="0 0 100 100" className="w-full h-full bg-black/40 rounded-xl">
           {/* Mixed Data */}
           <circle cx="20" cy="80" r="2.5" fill="#22d3ee" />
           <circle cx="25" cy="85" r="2.5" fill="#f472b6" /> {/* Misfit */}
           <circle cx="30" cy="75" r="2.5" fill="#22d3ee" />
           
           <circle cx="70" cy="20" r="2.5" fill="#f472b6" />
           <circle cx="75" cy="25" r="2.5" fill="#22d3ee" /> {/* Misfit */}
           <circle cx="80" cy="15" r="2.5" fill="#f472b6" />

           {/* Flat bad prediction line */}
           <line x1="10" y1="50" x2="90" y2="50" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" />
           
           <text x="50" y="45" fill="#ef4444" fontSize="4" textAnchor="middle" fontWeight="bold">0.5 UNCERTAINTY</text>
        </svg>
      </div>
    </div>
  );
}
