import { useState } from "react";
import { motion } from "framer-motion";

export default function NNBreakMode() {
  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="mb-4 text-2xl font-bold text-white">Break Mode</h3>
        <p className="mb-6 text-white/60">
          Neural networks are powerful but finicky. They can easily fall into traps that waste hours of training time.
        </p>

        <div className="space-y-6">
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
            <h4 className="mb-1 font-bold text-red-400">Overfitting (The Parrot)</h4>
            <p className="text-sm text-white/50">When a network is too complex, it starts memorizing the training noise instead of the patterns. It works perfectly on known data but fails on anything new.</p>
          </div>

          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
            <h4 className="mb-1 font-bold text-red-400">Vanishing Gradient</h4>
            <p className="text-sm text-white/50">In very deep networks, the message of 'how to improve' gets smaller and smaller as it travels back. Eventually, the first layers stop learning altogether.</p>
          </div>
        </div>
      </div>

      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6 h-[400px] flex items-center justify-center relative overflow-hidden">
        <svg viewBox="0 0 100 80" className="w-full h-full">
           {/* Overfitting Visualization: A line that wiggles too much */}
           <path 
              d="M 10 70 Q 20 10 30 70 T 50 70 T 70 10 T 90 70" 
              fill="none" stroke="#ef4444" strokeWidth="1.5" 
              className="animate-pulse"
           />
           {/* Points it's trying to hit */}
           <circle cx="20" cy="40" r="2" fill="white" />
           <circle cx="40" cy="40" r="2" fill="white" />
           <circle cx="60" cy="40" r="2" fill="white" />
           <circle cx="80" cy="40" r="2" fill="white" />

           <text x="50" y="75" fill="#ef4444" fontSize="5" textAnchor="middle" fontWeight="bold">Complexity is a Trap!</text>
        </svg>
      </div>
    </div>
  );
}
