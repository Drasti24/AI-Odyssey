import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Zap, ShieldAlert, Cpu, Brain, Target, ChevronRight, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../components/Navbar";

// ─── Boss Question Data ───
const bossLevels = [
  {
    id: 1,
    title: "The KNN Noise",
    description: "The system is injecting noise! Identify the correct K-Nearest Neighbor for the yellow node.",
    type: "knn",
    options: ["Cluster A", "Cluster B", "Cluster C"],
    correctIndex: 1,
  },
  {
    id: 2,
    title: "Residual Minimizer",
    description: "Which line truly minimizes the 'error' (the red vertical bars)?",
    type: "linear",
    options: ["Line A", "Line B", "Line C"],
    correctIndex: 0,
  },
  {
    id: 3,
    title: "The Logic Gap",
    description: "A Decision Tree node is missing its condition. Which one completes the path?",
    type: "tree",
    options: ["Age > 25", "Income > 50k", "Has Credit"],
    correctIndex: 2,
  },
  {
    id: 4,
    title: "Neuron Pulse",
    description: "Sum = 1.2, Bias = -0.5. If the activation is a STEP function (threshold 0), what is the output?",
    type: "neural",
    options: ["0", "1", "0.7"],
    correctIndex: 1,
  },
  {
    id: 5,
    title: "The Alignment Test",
    description: "An AI must prioritize safety over speed. Which objective function prevents a crash?",
    type: "ethics",
    options: ["Max Speed", "Min Risk", "Max Reward"],
    correctIndex: 1,
  },
];

export default function BossChapter() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [bossHealth, setBossHealth] = useState(100);
  const [playerHealth, setPlayerHealth] = useState(100);
  const [gameState, setGameState] = useState("start"); // start, playing, won, lost
  const [shake, setShake] = useState(false);

  const handleAnswer = (index) => {
    if (index === bossLevels[currentLevel].correctIndex) {
      setBossHealth((prev) => Math.max(0, prev - 20));
      if (currentLevel < bossLevels.length - 1) {
        setCurrentLevel((prev) => prev + 1);
      } else {
        setGameState("won");
      }
    } else {
      setPlayerHealth((prev) => Math.max(0, prev - 34));
      setShake(true);
      setTimeout(() => setShake(false), 500);
      if (playerHealth <= 34) {
        setGameState("lost");
      }
    }
  };

  const restart = () => {
    setCurrentLevel(0);
    setBossHealth(100);
    setPlayerHealth(100);
    setGameState("playing");
  };

  return (
    <main className="relative min-h-screen bg-[#07070c] text-white overflow-hidden">
      <Navbar />
      
      {/* Glitch Overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 bg-red-500/5 mix-blend-overlay opacity-20 animate-pulse" />

      <section className="relative z-10 px-6 pt-32 pb-20">
        <div className="mx-auto max-w-4xl">
          <Link to="/playground" className="mb-10 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-amber-500">
            <ArrowLeft className="h-4 w-4" /> Abort Mission
          </Link>

          <AnimatePresence mode="wait">
            {gameState === "start" && (
              <motion.div key="start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                <div className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-3xl bg-amber-500/10 border-2 border-amber-500/50 shadow-[0_0_50px_rgba(245,158,11,0.2)]">
                  <ShieldAlert size={48} className="text-amber-500" />
                </div>
                <h1 className="mb-6 text-4xl font-black md:text-6xl uppercase tracking-tighter" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                  SYSTEM <span className="text-amber-500">OVERLOAD</span>
                </h1>
                <p className="mb-10 text-xl text-white/50 max-w-2xl mx-auto">
                  The General Intelligence has gone rogue. Defeat it by solving 5 core logic puzzles.
                </p>
                <button 
                  onClick={() => setGameState("playing")}
                  className="rounded-xl bg-amber-500 px-10 py-5 text-xl font-black text-black uppercase tracking-widest hover:bg-amber-400 hover:shadow-[0_0_40px_rgba(245,158,11,0.4)] transition-all active:scale-95"
                  style={{ fontFamily: "'Press Start 2P', system-ui" }}
                >
                  INITIALIZE
                </button>
              </motion.div>
            )}

            {gameState === "playing" && (
              <motion.div key="playing" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={shake ? "animate-shake" : ""}>
                {/* Battle Stats */}
                <div className="mb-12 grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
                      <span>YOU (AGENT)</span>
                      <span>{playerHealth}%</span>
                    </div>
                    <div className="h-3 w-full rounded-full bg-white/10 overflow-hidden border border-white/5">
                      <motion.div animate={{ width: `${playerHealth}%` }} className="h-full bg-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-amber-500">
                      <span>THE CORE (BOSS)</span>
                      <span>{bossHealth}%</span>
                    </div>
                    <div className="h-3 w-full rounded-full bg-white/10 overflow-hidden border border-amber-500/20">
                      <motion.div animate={{ width: `${bossHealth}%` }} className="h-full bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
                    </div>
                  </div>
                </div>

                {/* Level Content */}
                <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12 backdrop-blur-xl relative overflow-hidden">
                   {/* Level ID background */}
                  <div className="absolute -right-10 -top-10 text-[120px] font-black text-white/[0.03] select-none uppercase">
                    0{currentLevel + 1}
                  </div>

                  <div className="relative z-10">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1 text-[10px] font-black text-white/40 uppercase tracking-widest border border-white/10">
                      Level {currentLevel + 1} of 5
                    </div>
                    <h2 className="mb-2 text-2xl font-black text-white uppercase" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                      {bossLevels[currentLevel].title}
                    </h2>
                    <p className="mb-12 text-lg text-white/60 max-w-xl">
                      {bossLevels[currentLevel].description}
                    </p>

                    {/* Visualization Area */}
                    <div className="mb-12 aspect-video w-full rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center overflow-hidden">
                      {/* Interactive Viz Placeholder - In a real app, these would be separate SVG components */}
                      {bossLevels[currentLevel].type === 'knn' && (
                        <div className="relative w-full h-full p-8 flex items-center justify-center">
                           <div className="grid grid-cols-6 gap-8 opacity-40">
                             {[...Array(24)].map((_, i) => (
                               <div key={i} className={`h-4 w-4 rounded-full ${i % 2 === 0 ? 'bg-cyan-500' : 'bg-red-500'}`} />
                             ))}
                           </div>
                           <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity }} className="absolute h-6 w-6 rounded-full bg-amber-500 shadow-[0_0_20px_rgba(245,158,11,1)]" />
                           <div className="absolute inset-0 border-2 border-dashed border-white/10 rounded-full scale-50" />
                        </div>
                      )}
                      {bossLevels[currentLevel].type === 'linear' && (
                        <div className="relative w-full h-full p-8 flex items-center justify-center">
                           <div className="absolute bottom-8 left-8 right-8 h-0.5 bg-white/20" />
                           <div className="absolute bottom-8 left-8 top-8 w-0.5 bg-white/20" />
                           <div className="h-0.5 w-[80%] bg-amber-500 rotate-[-20deg] shadow-[0_0_20px_rgba(245,158,11,0.5)]" />
                           <div className="h-0.5 w-[80%] bg-white/20 rotate-[-45deg] absolute" />
                           <div className="h-0.5 w-[80%] bg-white/20 rotate-[10deg] absolute" />
                        </div>
                      )}
                      {bossLevels[currentLevel].type === 'tree' && (
                         <div className="flex flex-col items-center gap-6">
                            <div className="h-10 w-24 rounded-lg border border-white/20 bg-white/5" />
                            <div className="flex gap-12">
                               <div className="h-10 w-24 rounded-lg border-2 border-amber-500/50 bg-amber-500/10 animate-pulse" />
                               <div className="h-10 w-24 rounded-lg border border-white/20 bg-white/5" />
                            </div>
                         </div>
                      )}
                      {bossLevels[currentLevel].type === 'neural' && (
                         <div className="flex items-center gap-12">
                            <div className="flex flex-col gap-4">
                               <div className="h-4 w-4 rounded-full bg-cyan-500" />
                               <div className="h-4 w-4 rounded-full bg-cyan-500" />
                            </div>
                            <div className="h-12 w-12 rounded-full border-2 border-amber-500 flex items-center justify-center text-xs font-black">∑</div>
                            <div className="h-12 w-12 rounded-lg border border-white/20 bg-white/5 flex items-center justify-center">?</div>
                         </div>
                      )}
                      {bossLevels[currentLevel].type === 'ethics' && (
                         <div className="flex items-center gap-4">
                            <ShieldAlert size={60} className="text-red-500" />
                            <Zap size={60} className="text-amber-500" />
                         </div>
                      )}
                    </div>

                    {/* Answer Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {bossLevels[currentLevel].options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => handleAnswer(i)}
                          className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 text-center font-black uppercase tracking-widest hover:border-amber-500/50 hover:bg-amber-500/10 transition-all active:scale-95"
                          style={{ fontSize: '10px' }}
                        >
                          <span className="relative z-10">{opt}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {gameState === "won" && (
              <motion.div key="won" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                <div className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-full bg-green-500/20 text-green-400 shadow-[0_0_50px_rgba(34,197,94,0.3)]">
                  <Trophy size={48} />
                </div>
                <h1 className="mb-6 text-4xl font-black md:text-6xl uppercase tracking-tighter" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                  MISSION <span className="text-green-400">SUCCESS</span>
                </h1>
                <p className="mb-10 text-xl text-white/50 max-w-2xl mx-auto">
                  The rogue core has been neutralized. You have mastered the AI Odyssey.
                </p>
                <Link 
                  to="/playground"
                  className="inline-flex rounded-xl bg-white px-10 py-5 text-xl font-black text-black uppercase tracking-widest hover:bg-green-400 transition-all active:scale-95"
                  style={{ fontFamily: "'Press Start 2P', system-ui" }}
                >
                  RETURN TO BASE
                </Link>
              </motion.div>
            )}

            {gameState === "lost" && (
              <motion.div key="lost" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                <div className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-full bg-red-500/20 text-red-500 shadow-[0_0_50px_rgba(239,68,68,0.3)]">
                  <ShieldAlert size={48} />
                </div>
                <h1 className="mb-6 text-4xl font-black md:text-6xl uppercase tracking-tighter" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                  SYSTEM <span className="text-red-500">FAILURE</span>
                </h1>
                <p className="mb-10 text-xl text-white/50 max-w-2xl mx-auto">
                  Your logic was insufficient. The core has taken control.
                </p>
                <button 
                  onClick={restart}
                  className="rounded-xl bg-red-600 px-10 py-5 text-xl font-black text-white uppercase tracking-widest hover:bg-red-500 transition-all active:scale-95"
                  style={{ fontFamily: "'Press Start 2P', system-ui" }}
                >
                  RETRY
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}} />
    </main>
  );
}
