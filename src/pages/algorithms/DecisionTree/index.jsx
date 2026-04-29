import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, GitMerge, HelpCircle, CheckCircle } from "lucide-react";
import Navbar from "../../../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";

export default function DecisionTree() {
  const [step, setStep] = useState(0);

  const treeSteps = [
    { label: "Is it Raining?", choice: null },
    { label: "Do you have an Umbrella?", choice: "Yes" },
    { label: "Go Outside", choice: "Result" }
  ];

  return (
    <main className="min-h-screen bg-[#07070c] text-white">
      <Navbar />

      <section className="px-8 pt-32 pb-20">
        <div className="mx-auto max-w-7xl">
          <Link 
            to="/" 
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/40 transition-colors hover:text-cyan-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="mb-12">
            <h1 className="mb-4 text-5xl font-black">
              Decision{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Trees
              </span>
            </h1>
            <p className="max-w-2xl text-lg text-white/60">
              Break down complex decisions into simple yes/no questions. It's like a flowchart that learns from data!
            </p>
          </div>

          <div className="flex flex-col gap-8 md:flex-row">
            <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="mb-4 text-2xl font-bold text-white">Interactive Tree</h3>
              <p className="mb-6 text-white/60">
                Decision trees split data based on features to reach a conclusion. Click through the tree nodes to see the logic in action.
              </p>
              
              <div className="space-y-4">
                {treeSteps.map((s, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={i <= step ? { opacity: 1, x: 0 } : { opacity: 0.2 }}
                    className={`flex items-center gap-4 rounded-xl border p-4 transition-all ${i === step ? "border-cyan-400 bg-cyan-400/10" : "border-white/5 bg-black/20"}`}
                  >
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${i === step ? "bg-cyan-400 text-black" : "bg-white/10 text-white/40"}`}>
                      {i === 2 ? <CheckCircle size={20} /> : <HelpCircle size={20} />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white/40 uppercase tracking-tighter">Step {i + 1}</p>
                      <p className="font-bold">{s.label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {step < 2 ? (
                <button 
                  onClick={() => setStep(step + 1)}
                  className="mt-8 w-full rounded-xl bg-cyan-400 py-3 font-bold text-black hover:bg-cyan-300"
                >
                  Continue Decision
                </button>
              ) : (
                <button 
                  onClick={() => setStep(0)}
                  className="mt-8 w-full rounded-xl border border-white/10 py-3 font-bold text-white hover:bg-white/5"
                >
                  Reset Tree
                </button>
              )}
            </div>

            <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6 h-[400px] flex items-center justify-center relative">
               <svg viewBox="0 0 100 80" className="w-full h-full">
                  {/* Tree Connections */}
                  <line x1="50" y1="10" x2="30" y2="35" stroke="white" strokeWidth="0.5" strokeOpacity={step >= 1 ? 1 : 0.2} />
                  <line x1="50" y1="10" x2="70" y2="35" stroke="white" strokeWidth="0.5" strokeOpacity={0.2} />
                  <line x1="30" y1="35" x2="20" y2="60" stroke="white" strokeWidth="0.5" strokeOpacity={step >= 2 ? 1 : 0.2} />
                  <line x1="30" y1="35" x2="40" y2="60" stroke="white" strokeWidth="0.5" strokeOpacity={0.2} />

                  {/* Nodes */}
                  <circle cx="50" cy="10" r="4" fill={step >= 0 ? "#22d3ee" : "#07070c"} stroke="white" strokeWidth="1" />
                  <circle cx="30" cy="35" r="4" fill={step >= 1 ? "#22d3ee" : "#07070c"} stroke="white" strokeWidth="1" />
                  <circle cx="70" cy="35" r="4" fill="#07070c" stroke="white" strokeWidth="0.5" opacity="0.3" />
                  
                  <rect x="15" y="60" width="10" height="10" rx="2" fill={step >= 2 ? "#a78bfa" : "#07070c"} stroke="white" strokeWidth="1" />
                  <rect x="35" y="60" width="10" height="10" rx="2" fill="#07070c" stroke="white" strokeWidth="0.5" opacity="0.3" />
               </svg>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
