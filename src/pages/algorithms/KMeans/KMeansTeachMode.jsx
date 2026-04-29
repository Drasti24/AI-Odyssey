import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  {
    title: "1. The Centroids",
    text: "We start by placing K random points called 'Centroids'. They will become the centers of our clusters.",
    viz: "init"
  },
  {
    title: "2. The Assignment",
    text: "Every data point looks at all centroids and joins the one it is closest to.",
    viz: "assign"
  },
  {
    title: "3. The Mean Movement",
    text: "Each centroid moves to the average (mean) location of all its members. This repeats until nobody moves!",
    viz: "update"
  }
];

export default function KMeansTeachMode() {
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
            className="min-h-[180px]"
          >
            <h4 className="mb-4 text-xl font-bold text-cyan-300">{STEPS[step].title}</h4>
            <p className="text-white/70 leading-relaxed italic">{STEPS[step].text}</p>
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
           <circle cx="20" cy="20" r="2" fill={step >= 1 ? "#22d3ee" : "white"} />
           <circle cx="25" cy="25" r="2" fill={step >= 1 ? "#22d3ee" : "white"} />
           <circle cx="70" cy="70" r="2" fill={step >= 1 ? "#f472b6" : "white"} />
           <circle cx="75" cy="75" r="2" fill={step >= 1 ? "#f472b6" : "white"} />

           {/* Centroids */}
           <motion.circle 
                cx={step === 2 ? 22 : 50} cy={step === 2 ? 22 : 50} r="4" 
                fill="#22d3ee" stroke="white" strokeWidth="1"
                animate={{ cx: step === 2 ? 22 : 50, cy: step === 2 ? 22 : 50 }}
           />
           <motion.circle 
                cx={step === 2 ? 72 : 40} cy={step === 2 ? 72 : 40} r="4" 
                fill="#f472b6" stroke="white" strokeWidth="1"
                animate={{ cx: step === 2 ? 72 : 40, cy: step === 2 ? 72 : 40 }}
           />

           {step === 1 && (
             <>
                <line x1="20" y1="20" x2="50" y2="50" stroke="#22d3ee" strokeWidth="0.5" strokeDasharray="1 1" />
                <line x1="75" y1="75" x2="40" y2="40" stroke="#f472b6" strokeWidth="0.5" strokeDasharray="1 1" />
             </>
           )}
        </svg>
      </div>
    </div>
  );
}
