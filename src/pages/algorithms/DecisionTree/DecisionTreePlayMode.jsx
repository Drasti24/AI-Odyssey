import { useState } from "react";
import { motion } from "framer-motion";
import { HelpCircle, CheckCircle, XCircle } from "lucide-react";

export default function DecisionTreePlayMode() {
  const [step, setStep] = useState(0);

  const treeData = [
    { q: "Is the weather Sunny?", sub: "Feature Selection: Weather" },
    { q: "Is the Humidity High?", sub: "Feature Selection: Humidity" },
    { q: "Go play Tennis!", sub: "Prediction: YES" }
  ];

  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="mb-4 text-2xl font-bold text-white">Play Mode</h3>
        <p className="mb-6 text-white/60">
          Walk through the logic of a Decision Tree. Each node asks a question to split the data until a leaf node (prediction) is reached.
        </p>

        <div className="space-y-4">
           {treeData.map((d, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, x: -10 }}
               animate={i <= step ? { opacity: 1, x: 0 } : { opacity: 0.2 }}
               className={`rounded-xl border p-4 transition-all ${i === step ? 'border-cyan-400 bg-cyan-400/10' : 'border-white/5 bg-black/20'}`}
             >
               <div className="flex items-center gap-3">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${i === step ? 'bg-cyan-400 text-black' : 'bg-white/10 text-white/40'}`}>
                    {i === 2 ? <CheckCircle size={16} /> : <HelpCircle size={16} />}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{d.sub}</p>
                    <p className="font-bold">{d.q}</p>
                  </div>
               </div>
             </motion.div>
           ))}
        </div>

        {step < 2 ? (
          <button 
            onClick={() => setStep(step + 1)}
            className="mt-8 w-full rounded-xl bg-cyan-400 py-3 font-bold text-black hover:bg-cyan-300 transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)]"
          >
            Yes, Continue
          </button>
        ) : (
          <button 
            onClick={() => setStep(0)}
            className="mt-8 w-full rounded-xl border border-white/20 py-3 font-bold text-white hover:bg-white/5"
          >
            Restart Decision
          </button>
        )}
      </div>

      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6 h-[400px] flex items-center justify-center relative">
         <svg viewBox="0 0 100 80" className="w-full h-full">
            {/* Tree branches */}
            <line x1="50" y1="10" x2="30" y2="35" stroke="white" strokeWidth="0.5" strokeOpacity={step >= 1 ? 1 : 0.1} />
            <line x1="50" y1="10" x2="70" y2="35" stroke="white" strokeWidth="0.5" strokeOpacity={0.1} />
            <line x1="30" y1="35" x2="20" y2="60" stroke="white" strokeWidth="0.5" strokeOpacity={step >= 2 ? 1 : 0.1} />
            <line x1="30" y1="35" x2="40" y2="60" stroke="white" strokeWidth="0.5" strokeOpacity={0.1} />

            {/* Nodes */}
            <circle cx="50" cy="10" r="4" fill={step >= 0 ? "#22d3ee" : "#07070c"} stroke="white" strokeWidth="1" />
            <circle cx="30" cy="35" r="4" fill={step >= 1 ? "#22d3ee" : "#07070c"} stroke="white" strokeWidth="1" />
            <circle cx="70" cy="35" r="4" fill="#07070c" stroke="white" strokeWidth="0.5" opacity="0.2" />
            
            <rect x="15" y="60" width="10" height="10" rx="2" fill={step >= 2 ? "#a78bfa" : "#07070c"} stroke="white" strokeWidth="1" />
            <rect x="35" y="60" width="10" height="10" rx="2" fill="#07070c" stroke="white" strokeWidth="0.5" opacity="0.2" />
            
            {step === 2 && (
              <text x="20" y="78" fill="#a78bfa" fontSize="4" textAnchor="middle" fontWeight="black" className="animate-bounce">TENNIS!</text>
            )}
         </svg>
      </div>
    </div>
  );
}
