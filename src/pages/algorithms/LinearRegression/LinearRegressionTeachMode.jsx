import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  {
    title: "1. The Equation",
    text: "Linear Regression finds the best straight line through points. Every line is defined by y = mx + b.",
    math: "y = (slope) * x + (intercept)",
    viz: "baseline"
  },
  {
    title: "2. The Residuals",
    text: "For every point, there is a distance between where the point is and where the line says it should be. This is called a Residual (Error).",
    math: "Error = Actual Y - Predicted Y",
    viz: "residuals"
  },
  {
    title: "3. Minimizing Error",
    text: "We square these errors so that positive and negative distances both count. The 'best' line minimizes the Mean Squared Error (MSE).",
    math: "Goal: Minimize Σ(y - ŷ)² / n",
    viz: "minimized"
  }
];

export default function LinearRegressionTeachMode() {
  const [step, setStep] = useState(0);

  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="mb-4 text-2xl font-bold text-white">Teach Mode</h3>
        
        <div className="mb-8 flex gap-2">
          {STEPS.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 flex-1 rounded-full transition-all ${i <= step ? "bg-cyan-400" : "bg-white/10"}`}
            />
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
            <p className="mb-6 text-white/70 leading-relaxed">{STEPS[step].text}</p>
            
            <div className="rounded-xl bg-black/40 p-4 font-mono text-sm border border-white/5 italic">
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

      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6 h-[400px] flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full bg-black/40 rounded-xl">
          {/* Static Points */}
          <circle cx="20" cy="80" r="2" fill="white" />
          <circle cx="40" cy="65" r="2" fill="white" />
          <circle cx="60" cy="40" r="2" fill="white" />
          <circle cx="85" cy="30" r="2" fill="white" />

          {/* Viz based on step */}
          {step >= 0 && (
            <motion.line 
              x1="0" y1="90" x2="100" y2="20" 
              stroke="#22d3ee" strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
            />
          )}

          {step === 1 && (
            <>
              <line x1="20" y1="80" x2="20" y2="76" stroke="#f472b6" strokeWidth="0.5" strokeDasharray="1 1" />
              <line x1="40" y1="65" x2="40" y2="62" stroke="#f472b6" strokeWidth="0.5" strokeDasharray="1 1" />
              <line x1="60" y1="40" x2="60" y2="48" stroke="#f472b6" strokeWidth="0.5" strokeDasharray="1 1" />
              <line x1="85" y1="30" x2="85" y2="31" stroke="#f472b6" strokeWidth="0.5" strokeDasharray="1 1" />
              <text x="50" y="90" fill="#f472b6" fontSize="4" textAnchor="middle" fontWeight="bold">RESIDUALS</text>
            </>
          )}

          {step === 2 && (
             <motion.rect 
                x="57" y="40" width="8" height="8" 
                fill="#22d3ee" fillOpacity="0.2" stroke="#22d3ee" strokeWidth="0.3"
                initial={{ scale: 0 }} animate={{ scale: 1 }}
             />
          )}
        </svg>
      </div>
    </div>
  );
}
