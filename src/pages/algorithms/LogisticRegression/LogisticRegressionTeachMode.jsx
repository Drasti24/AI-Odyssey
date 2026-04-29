import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  {
    title: "1. The Dilemma",
    text: "Linear Regression predicts infinity, but classification needs a hard 'Yes' or 'No' (0 to 1). How do we squash infinity into a probability?",
    math: "P = 0 or 1?"
  },
  {
    title: "2. The Sigmoid",
    text: "We use the Sigmoid Function. It takes any number and squashes it between 0 and 1. 0 becomes 0.5, large numbers become 1, and negative numbers become 0.",
    math: "f(z) = 1 / (1 + e⁻ᶻ)"
  },
  {
    title: "3. The Log Loss",
    text: "In Logistic Regression, we don't use MSE. We use 'Log Loss' (Cross-Entropy). It punishes the model heavily if it's confident but wrong!",
    math: "Loss = -Σ [y log(h) + (1-y) log(1-h)]"
  }
];

export default function LogisticRegressionTeachMode() {
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
           {/* Axis */}
           <line x1="10" y1="50" x2="90" y2="50" stroke="white" strokeWidth="0.5" opacity="0.2" />
           <line x1="50" y1="10" x2="50" y2="90" stroke="white" strokeWidth="0.5" opacity="0.2" />

           {step === 0 && (
             <motion.line 
                x1="10" y1="90" x2="90" y2="10" 
                stroke="#6366f1" strokeWidth="1" 
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
             />
           )}

           {step >= 1 && (
             <motion.path 
                d="M 10 90 Q 50 90 50 50 T 90 10" 
                fill="none" stroke="#22d3ee" strokeWidth="2"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
             />
           )}
           
           {step === 2 && (
             <text x="50" y="85" fill="#ef4444" fontSize="5" textAnchor="middle" fontWeight="bold">PUNISH WRONG GUESSES!</text>
           )}
        </svg>
      </div>
    </div>
  );
}
