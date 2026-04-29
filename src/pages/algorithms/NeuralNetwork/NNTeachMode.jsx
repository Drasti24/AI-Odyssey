import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  {
    title: "1. The Neuron",
    text: "Think of a neuron as a tiny math machine. it takes inputs, multiplies them by weights, and adds them up.",
    math: "Sum = (x1 * w1) + (x2 * w2) + bias"
  },
  {
    title: "2. The Activation",
    text: "The neuron then decides how much signal to pass forward using an 'Activation Function' (like ReLU or Sigmoid).",
    math: "Output = Activation(Sum)"
  },
  {
    title: "3. Learning",
    text: "Backpropagation is how the network learns. It looks at the error in the output and goes backwards to adjust the weights.",
    math: "Optimization: Stochastic Gradient Descent"
  }
];

export default function NNTeachMode() {
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
           {/* Single Large Neuron */}
           <circle cx="50" cy="50" r="20" fill="#07070c" stroke="#22d3ee" strokeWidth="2" />
           <text x="50" y="55" fill="#22d3ee" fontSize="12" textAnchor="middle" fontWeight="bold">Σ</text>

           {/* Inputs */}
           <line x1="10" y1="30" x2="32" y2="45" stroke="white" strokeWidth="1.5" />
           <line x1="10" y1="70" x2="32" y2="55" stroke="white" strokeWidth="1.5" />
           
           {/* Output */}
           <line x1="68" y1="50" x2="90" y2="50" stroke="#a78bfa" strokeWidth="2" />
           <polygon points="85,47 95,50 85,53" fill="#a78bfa" />

           {step === 1 && (
             <motion.circle 
                cx="50" cy="50" r="18" fill="#22d3ee" fillOpacity="0.1" 
                initial={{ scale: 0 }} animate={{ scale: 1 }}
             />
           )}
        </svg>
      </div>
    </div>
  );
}
