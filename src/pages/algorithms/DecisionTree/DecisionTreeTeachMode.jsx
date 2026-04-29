import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  {
    title: "1. The Split",
    text: "Decision Trees work by splitting the data. It picks the 'feature' (like Weather or Price) that separates the data most cleanly.",
    math: "Information Gain"
  },
  {
    title: "2. Entropy (Chaos)",
    text: "The tree wants to reduce 'Entropy'. High entropy means the data is a mess. Low entropy means the data is all one type (Pure).",
    math: "Entropy = -Σ p(i) log p(i)"
  },
  {
    title: "3. Leaf Nodes",
    text: "The process repeats until it can't split anymore. These final points are called 'Leaves', and they contain the final prediction.",
    math: "Class: Majority Vote"
  }
];

export default function DecisionTreeTeachMode() {
  const [step, setStep] = useState(0);

  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="mb-4 text-2xl font-bold text-white">Teach Mode</h3>
        
        <div className="mb-8 flex gap-2">
          {STEPS.map((_, i) => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= step ? "bg-cyan-400" : "bg-white/10"}`} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="min-h-[200px]"
          >
            <h4 className="mb-4 text-xl font-bold text-cyan-300">{STEPS[step].title}</h4>
            <p className="mb-6 text-white/70 leading-relaxed italic">{STEPS[step].text}</p>
            <div className="rounded-xl bg-black/40 p-4 font-mono text-sm border border-white/5">
              {STEPS[step].math}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex gap-4">
          <button
            disabled={step === 0}
            onClick={() => setStep(step - 1)}
            className="flex-1 rounded-xl border border-white/10 py-3 font-bold text-white/50 transition-all hover:text-white disabled:opacity-30"
          >
            Previous
          </button>
          <button
            disabled={step === STEPS.length - 1}
            onClick={() => setStep(step + 1)}
            className="flex-1 rounded-xl bg-white/10 py-3 font-bold text-white transition-all hover:bg-white/20 disabled:opacity-30"
          >
            Next Step
          </button>
        </div>
      </div>

      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6 h-[400px] flex items-center justify-center relative overflow-hidden">
        <svg viewBox="0 0 100 100" className="w-full h-full">
           {/* Visualizing Entropy/Split */}
           {step === 0 && (
             <motion.rect x="10" y="40" width="80" height="20" fill="#22d3ee" fillOpacity="0.1" stroke="#22d3ee" strokeDasharray="2 2" />
           )}

           {step === 1 && (
             <>
               <text x="25" y="40" fill="#f472b6" fontSize="4" textAnchor="middle">CHAOS (High Entropy)</text>
               <text x="75" y="40" fill="#22d3ee" fontSize="4" textAnchor="middle">PURE (Low Entropy)</text>
               <line x1="50" y1="20" x2="50" y2="80" stroke="white" strokeWidth="0.5" strokeDasharray="4 2" />
             </>
           )}

           {step === 2 && (
             <motion.path d="M 50 10 L 30 40 M 50 10 L 70 40 M 30 40 L 20 70 M 30 40 L 40 70" stroke="#22d3ee" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
           )}
        </svg>
      </div>
    </div>
  );
}
