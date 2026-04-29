import { useState } from "react";
import { motion } from "framer-motion";

export default function DecisionTreeBreakMode() {
  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="mb-4 text-2xl font-bold text-white">Break Mode</h3>
        <p className="mb-6 text-white/60">
          Decision Trees are simple, but they are very fragile. Small changes in data can lead to completely different trees!
        </p>

        <div className="space-y-6">
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
            <h4 className="mb-1 font-bold text-red-400">Overfitting (Greedy Splitting)</h4>
            <p className="text-sm text-white/50">If a tree is allowed to grow too deep, it will create a rule for every single data point. This makes it useless for new, unseen data.</p>
          </div>

          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
            <h4 className="mb-1 font-bold text-red-400">Instability</h4>
            <p className="text-sm text-white/50">Because the tree makes 'greedy' choices at the top, changing just one point at the root can flip every single leaf in the entire tree.</p>
          </div>
        </div>
      </div>

      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6 h-[400px] flex items-center justify-center relative overflow-hidden">
        <svg viewBox="0 0 100 100" className="w-full h-full bg-black/40 rounded-xl">
           <path d="M 50 10 L 10 90 M 50 10 L 90 90 M 30 50 L 50 90 M 70 50 L 50 90" stroke="#ef4444" strokeWidth="0.5" opacity="0.3" />
           <text x="50" y="55" fill="#ef4444" fontSize="6" textAnchor="middle" fontWeight="bold">EXTREME OVERFITTING</text>
           <circle cx="50" cy="10" r="3" fill="#ef4444" className="animate-ping" />
        </svg>
      </div>
    </div>
  );
}
