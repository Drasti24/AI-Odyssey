import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  {
    title: "1. The Weak Learner",
    text: "A single Decision Tree is often a 'weak learner'. It's prone to making mistakes by over-focusing on specific patterns (Overfitting).",
    math: "Tree Accuracy: ~70%"
  },
  {
    title: "2. The Ensemble",
    text: "Random Forest combines many trees. Each tree is trained on a random slice of the data (Bagging) and a random set of features. This ensures the trees are different from each other.",
    math: "Diversity = Robustness"
  },
  {
    title: "3. Wisdom of the Crowd",
    text: "When we take the majority vote of 100 diverse trees, the individual errors cancel out, leaving only the true signal. This is the power of Ensemble Learning!",
    math: "Combined Accuracy: ~95%+"
  }
];

export default function RandomForestTeachMode() {
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
            className="min-h-[220px]"
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
           {/* Visualizing forest vs single tree */}
           {step === 0 && (
             <motion.rect x="40" y="40" width="20" height="20" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" initial={{ scale: 0 }} animate={{ scale: 1 }} />
           )}
           
           {step >= 1 && (
             <>
               {[...Array(12)].map((_, i) => (
                 <motion.circle 
                    key={i}
                    cx={20 + (i % 4) * 20}
                    cy={20 + Math.floor(i / 4) * 25}
                    r={step === 2 ? 4 : 2}
                    fill={step === 2 ? "#22d3ee" : "white"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                 />
               ))}
             </>
           )}

           {step === 2 && (
             <motion.circle 
                cx="50" cy="50" r="15" fill="none" stroke="#22d3ee" strokeWidth="2" strokeDasharray="4 2"
                animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
             />
           )}
        </svg>
      </div>
    </div>
  );
}
