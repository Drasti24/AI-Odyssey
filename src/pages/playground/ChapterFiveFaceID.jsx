import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Play, ChevronRight, Trophy, RotateCcw, Scan, ShieldCheck, ShieldAlert, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../components/Navbar";
import { saveChapterProgress } from "../../utils/progressUtils";

const FACES = [
  { 
    id: "owner", 
    name: "Homelander", 
    role: "Owner",
    desc: "The primary user. The Neural Network is trained on his exact facial geometry.",
    src: "/face_owner.jpg", 
    features: { jaw: 95, eyes: 90, nose: 85, chin: 92 },
    position: "center 20%" 
  },
  { 
    id: "stranger", 
    name: "Omni-Man", 
    role: "Stranger",
    desc: "A completely different person. The AI should easily detect the feature mismatch.",
    src: "/face_stranger.png", 
    features: { jaw: 30, eyes: 40, nose: 20, chin: 35 },
    position: "center center"
  },
  { 
    id: "twin", 
    name: "Superman", 
    role: "Impersonator",
    desc: "Very similar features. Tests the system's ability to distinguish subtle differences.",
    src: "/face_twin.jpg", 
    features: { jaw: 88, eyes: 85, nose: 80, chin: 88 },
    position: "center 10%"
  },
];

export default function ChapterFiveFaceID() {
  const [phase, setPhase] = useState("preview");
  const [scanning, setScanning] = useState(false);
  const [selectedFace, setSelectedFace] = useState(null);
  const [matchScore, setMatchScore] = useState(0);
  const [attempts, setAttempts] = useState([]);
  const [score, setScore] = useState(0);
  const [threshold, setThreshold] = useState(95);
  const [showReport, setShowReport] = useState(false);
  const [quizPhase, setQuizPhase] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const QUESTIONS = [
    {
      q: "Why did Superman get a high match score (~88%)?",
      options: ["The AI is broken", "He has similar facial feature vectors", "He is wearing the same cape"],
      a: 1,
      hint: "Neural networks look for spatial relationships between eyes, nose, and jaw."
    },
    {
      q: "What is the danger of lowering the Confidence Threshold?",
      options: ["The phone gets faster", "It might allow an Impersonator (False Positive)", "The owner can't unlock it"],
      a: 1,
      hint: "Lower thresholds mean the AI is less 'strict' about matches."
    }
  ];

  const calculateMatch = (face) => {
    if (face.id === "owner") return 100;
    const owner = FACES[0].features;
    const target = face.features;
    let diff = 0;
    Object.keys(owner).forEach(k => diff += Math.abs(owner[k] - target[k]));
    return 100 - (diff / 4);
  };

  const startScan = (face) => {
    setScanning(true);
    setSelectedFace(face);
    setMatchScore(0);
    setShowReport(false);
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += 0.02;
      if (progress >= 1) {
        clearInterval(interval);
        setScanning(false);
        const finalScore = Math.floor(calculateMatch(face));
        setMatchScore(finalScore);
        
        const isSuccess = finalScore >= threshold;
        setAttempts(prev => [{ ...face, score: finalScore, success: isSuccess }, ...prev]);
      } else {
        setMatchScore(Math.floor(Math.random() * 100));
      }
    }, 50);
  };

  const reset = () => {
    setPhase("preview");
    setScanning(false);
    setSelectedFace(null);
    setMatchScore(0);
    setAttempts([]);
    setScore(0);
  };

  return (
    <main className="min-h-screen bg-[#0a0705] text-white">
      <Navbar />
      
      <section className="px-6 pt-28 pb-20">
        <div className="mx-auto max-w-6xl">
          <Link to="/playground" className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-white/40 transition-colors hover:text-orange-400">
            <ArrowLeft className="h-4 w-4" /> Back to Playground
          </Link>

          {/* Top Bar */}
          <div className="mb-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-1.5 w-32 overflow-hidden rounded-full bg-white/10">
                <motion.div 
                  className="h-full rounded-full bg-orange-500" 
                  initial={{ width: "0%" }}
                  animate={{ width: phase === "preview" ? "20%" : "100%" }}
                />
              </div>
              <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Final Chapter</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/5 px-4 py-1.5 text-sm font-bold text-orange-400">
              <Trophy className="h-4 w-4" /> {score} pts
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* ── PREVIEW ── */}
            {phase === "preview" && (
              <motion.div 
                key="preview" 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -20 }}
                className="rounded-3xl border border-orange-500/10 bg-gradient-to-br from-[#1a120a] to-[#0a0705] p-10 md:p-16 text-center"
              >
                <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-orange-500/10 p-4 shadow-[0_0_50px_rgba(249,115,22,0.2)]">
                  <Scan size={48} className="text-orange-400" />
                </div>
                <h1 className="mb-4 text-xs font-black tracking-[0.4em] text-orange-500/60 uppercase">The Ultimate AI Challenge</h1>
                <h2 className="mb-6 text-5xl font-black md:text-6xl">
                  Episode 5:{" "}
                  <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                    The FaceID Secret
                  </span>
                </h2>
                <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-white/50">
                  Ever wondered how your phone recognizes you in the dark, with glasses, or even after a haircut? 
                  Discover the complex <span className="text-orange-400 font-bold">Neural Network</span> that powers FaceID.
                </p>
                <button 
                  onClick={() => setPhase("game")}
                  className="inline-flex items-center gap-3 rounded-2xl bg-orange-500 px-10 py-5 text-xl font-black text-black transition-all hover:bg-orange-400 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(249,115,22,0.3)]"
                >
                  <Play size={24} fill="currentColor" /> Initialize FaceID
                </button>
              </motion.div>
            )}

            {/* ── GAME ── */}
            {phase === "game" && (
              <motion.div 
                key="game" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="grid gap-12 lg:grid-cols-2"
              >
                {/* Left: The iPhone Frame */}
                <div className="flex flex-col items-center">
                  <div className="relative h-[650px] w-[320px] rounded-[50px] border-[8px] border-[#1c1c1c] bg-black p-4 shadow-[0_0_100px_rgba(249,115,22,0.1)] ring-4 ring-[#2a2a2a]">
                    {/* Dynamic Notch */}
                    <div className="absolute top-0 left-1/2 h-7 w-32 -translate-x-1/2 rounded-b-2xl bg-[#1c1c1c]" />
                    
                    {/* Screen Content */}
                    <div className="h-full w-full overflow-hidden rounded-[36px] bg-[#050505] relative">
                      <AnimatePresence mode="wait">
                        {!selectedFace ? (
                          <motion.div 
                            key="idle"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="flex h-full flex-col items-center justify-center p-8 text-center"
                          >
                            <div className="mb-6 rounded-full border border-white/10 bg-white/5 p-6">
                              <Scan size={60} className="text-white/20 animate-pulse" />
                            </div>
                            <h3 className="mb-2 text-2xl font-bold">Waiting for Face</h3>
                            <p className="text-sm text-white/30">Select a face from the panel to start recognition.</p>
                          </motion.div>
                        ) : (
                          <motion.div 
                            key="scanning"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="h-full w-full relative"
                          >
                            <img 
                              src={selectedFace.src} 
                              className="h-full w-full object-cover opacity-60 grayscale-[50%] blur-[1px]" 
                              style={{ imageRendering: 'pixelated', objectPosition: selectedFace.position }}
                              alt="Scanner" 
                            />
                            
                            {/* Scanning Mesh */}
                            {scanning && (
                              <motion.div 
                                className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/30 to-transparent"
                                animate={{ top: ["-100%", "100%"] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                              />
                            )}
                            
                            {/* Dot Grid overlay */}
                            <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-2 p-4">
                              {Array.from({ length: 144 }).map((_, i) => (
                                <motion.div 
                                  key={i} 
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: scanning ? [0, 0.5, 0] : 0 }}
                                  transition={{ repeat: Infinity, duration: Math.random() * 2 + 1 }}
                                  className="h-1 w-1 rounded-full bg-orange-400"
                                />
                              ))}
                            </div>

                            {/* Status Overlay */}
                            <div className="absolute inset-x-0 bottom-10 flex flex-col items-center">
                              <div className="mb-4 rounded-full bg-black/80 px-4 py-2 backdrop-blur-md">
                                <span className="text-2xl font-black tabular-nums tracking-widest text-orange-400">
                                  {matchScore}% MATCH
                                </span>
                              </div>
                              {matchScore >= threshold && !scanning && (
                                <motion.div 
                                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                                  className="flex flex-col items-center gap-3"
                                >
                                  <div className="flex items-center gap-2 rounded-full bg-green-500 px-6 py-3 font-black text-black shadow-[0_0_30px_rgba(34,197,94,0.5)]">
                                    <ShieldCheck size={20} /> UNLOCKED
                                  </div>
                                  <button 
                                    onClick={() => setShowReport(true)}
                                    className="text-[10px] font-bold uppercase tracking-widest text-white/50 underline hover:text-white"
                                  >
                                    View Feature Report
                                  </button>
                                </motion.div>
                              )}
                              {matchScore < threshold && !scanning && matchScore > 0 && (
                                <motion.div 
                                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                                  className="flex flex-col items-center gap-3"
                                >
                                  <div className="flex items-center gap-2 rounded-full bg-red-500 px-6 py-3 font-black text-white shadow-[0_0_30px_rgba(239,68,68,0.5)]">
                                    <ShieldAlert size={20} /> DENIED
                                  </div>
                                  <button 
                                    onClick={() => setShowReport(true)}
                                    className="text-[10px] font-bold uppercase tracking-widest text-white/50 underline hover:text-white"
                                  >
                                    View Discrepancy Report
                                  </button>
                                </motion.div>
                              )}
                            </div>
                            
                            {/* ── FEATURE REPORT MODAL ── */}
                            <AnimatePresence>
                              {showReport && (
                                <motion.div 
                                  initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
                                  className="absolute inset-0 z-50 flex flex-col bg-black/95 p-6 backdrop-blur-xl"
                                >
                                  <h4 className="mb-6 text-sm font-black uppercase tracking-widest text-orange-400">Analysis: {selectedFace.name}</h4>
                                  <div className="space-y-4 flex-1 overflow-y-auto">
                                    {Object.entries(FACES[0].features).map(([key, value]) => (
                                      <div key={key}>
                                        <div className="mb-1 flex justify-between text-[10px] font-bold uppercase">
                                          <span className="text-white/40">{key} Geometry</span>
                                          <span className="text-orange-400">{Math.abs(value - selectedFace.features[key]) < 10 ? "MATCH" : "MISMATCH"}</span>
                                        </div>
                                        <div className="h-1 w-full bg-white/5 relative rounded-full overflow-hidden">
                                          <div className="absolute inset-y-0 left-0 bg-white/20 rounded-full" style={{ width: `${value}%` }} />
                                          <motion.div 
                                            className={`absolute inset-y-0 left-0 rounded-full ${Math.abs(value - selectedFace.features[key]) < 10 ? "bg-green-500" : "bg-red-500"}`} 
                                            initial={{ width: 0 }} animate={{ width: `${selectedFace.features[key]}%` }}
                                          />
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                  <button 
                                    onClick={() => setShowReport(false)}
                                    className="mt-6 rounded-xl bg-white/10 py-3 text-xs font-bold hover:bg-white/20"
                                  >
                                    Close Analysis
                                  </button>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  <div className="mt-8 h-2 w-48 rounded-full bg-[#1c1c1c]" />
                </div>

                {/* Right: Controls & NN visualization */}
                <div className="flex flex-col space-y-8">
                  {/* Face Selection */}
                  <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-8">
                    <h3 className="mb-6 text-sm font-black uppercase tracking-widest text-orange-400">Target Selection</h3>
                    <div className="grid gap-4 md:grid-cols-3">
                      {FACES.map((face) => (
                        <button
                          key={face.id}
                          onClick={() => startScan(face)}
                          disabled={scanning}
                          className={`group relative overflow-hidden rounded-2xl border-2 p-2 transition-all ${
                            selectedFace?.id === face.id ? "border-orange-500 bg-orange-500/10 shadow-[0_0_15px_rgba(249,115,22,0.3)]" : "border-white/5 bg-white/5 opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
                          }`}
                        >
                          <img 
                            src={face.src} 
                            alt={face.name} 
                            className="h-24 w-full rounded-xl object-cover" 
                            style={{ imageRendering: 'pixelated', objectPosition: face.position }}
                          />
                          <div className="mt-2 text-center">
                            <div className="text-xs font-black text-white">{face.name}</div>
                            <div className={`text-[9px] font-bold uppercase tracking-tighter ${
                              face.role === "Owner" ? "text-green-400" : face.role === "Stranger" ? "text-white/40" : "text-red-400"
                            }`}>{face.role}</div>
                          </div>
                          
                          {/* Tooltip-like description on hover */}
                          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/80 p-3 opacity-0 transition-opacity group-hover:opacity-100">
                            <p className="text-[10px] leading-tight text-white/80">{face.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Neural Network Visualization */}
                  <div className="flex-1 rounded-3xl border border-white/5 bg-white/[0.02] p-8 relative overflow-hidden">
                    <h3 className="mb-8 text-sm font-black uppercase tracking-widest text-orange-400 flex items-center gap-2">
                      <Cpu size={16} /> Neural Processor Live
                    </h3>
                    
                    <div className="flex items-center justify-between h-48 relative px-4">
                      {/* Labels */}
                      <div className="absolute -top-6 left-0 right-0 flex justify-between text-[8px] font-bold text-white/20 uppercase tracking-[0.2em]">
                        <span>Input</span>
                        <span className="translate-x-4">Features</span>
                        <span className="translate-x-4">Mapping</span>
                        <span>Identity</span>
                      </div>

                      {[1, 6, 6, 1].map((count, layerIndex) => (
                        <div key={layerIndex} className="flex flex-col gap-2 relative">
                          {Array.from({ length: count }).map((_, i) => (
                            <motion.div 
                              key={i}
                              animate={{ 
                                scale: scanning ? [1, 1.4, 1] : 1,
                                backgroundColor: scanning ? "#f97316" : "#ffffff10"
                              }}
                              transition={{ repeat: Infinity, duration: 0.8, delay: layerIndex * 0.15 + i * 0.05 }}
                              className="h-2.5 w-2.5 rounded-full bg-white/10"
                              style={{
                                boxShadow: scanning ? "0 0 12px #f97316" : "none"
                              }}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 flex justify-between text-[10px] font-bold text-orange-400/50 uppercase tracking-widest">
                      <span>Pixel Grid</span>
                      <span>Hidden Layers</span>
                      <span>Vector Out</span>
                    </div>

                    <p className="mt-6 text-sm text-white/30 italic">
                      "Neural networks break images into numerical features. 
                      Weights adjust as the scan converges on a match score."
                    </p>
                  </div>

                  {/* USER INPUT: Sensitivity Slider */}
                  <div className="rounded-3xl border border-orange-500/10 bg-orange-500/[0.03] p-8">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-sm font-black uppercase tracking-widest text-orange-400">Confidence Threshold</h3>
                      <span className="text-xl font-black text-orange-500">{threshold}%</span>
                    </div>
                    <input 
                      type="range" min="80" max="99" step="1"
                      value={threshold}
                      onChange={(e) => setThreshold(parseInt(e.target.value))}
                      className="w-full accent-orange-500"
                    />
                    <p className="mt-4 text-[10px] text-white/40 uppercase leading-relaxed">
                      Higher threshold = More secure but might reject the owner. 
                      Lower threshold = Risk of impersonation!
                    </p>
                  </div>

                  {/* Log */}
                  <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 max-h-[180px] overflow-y-auto">
                    <h3 className="mb-4 text-xs font-bold uppercase text-white/20">Access Log</h3>
                    <div className="space-y-2">
                      {attempts.map((att, i) => (
                        <div key={i} className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs font-bold ${att.success ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
                          <span>{att.name}</span>
                          <span>{att.score}% Match &rarr; {att.success ? "GRANTED" : "DENIED"}</span>
                        </div>
                      ))}
                      {attempts.length === 0 && <div className="text-white/10">No attempts logged.</div>}
                    </div>
                  </div>

                  {attempts.length > 0 && !scanning && (
                    <button 
                      onClick={() => setQuizPhase(true)}
                      className="w-full rounded-2xl bg-orange-500 px-8 py-4 font-black text-black hover:bg-orange-400 transition-all active:scale-95 shadow-[0_0_30px_rgba(249,115,22,0.3)]"
                    >
                      Start Security Quiz
                    </button>
                  )}
                </div>

                {/* ── QUIZ OVERLAY ── */}
                <AnimatePresence>
                  {quizPhase && (
                    <motion.div 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-6 backdrop-blur-md"
                    >
                      <motion.div 
                        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                        className="max-w-xl w-full rounded-3xl border border-orange-500/20 bg-[#1a120a] p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                      >
                        <h3 className="mb-2 text-xs font-black uppercase tracking-[0.3em] text-orange-500">Security Clearance Test</h3>
                        <h4 className="mb-8 text-2xl font-bold">{QUESTIONS[currentQuestion].q}</h4>
                        <div className="space-y-4">
                          {QUESTIONS[currentQuestion].options.map((opt, i) => (
                            <button
                              key={i}
                              onClick={() => {
                                if (i === QUESTIONS[currentQuestion].a) {
                                  if (currentQuestion < QUESTIONS.length - 1) {
                                    setCurrentQuestion(prev => prev + 1);
                                  } else {
                                    setScore(100);
                                    saveChapterProgress(5, 100);
                                    setPhase("result");
                                    setQuizPhase(false);
                                  }
                                } else {
                                  alert("Incorrect! Hint: " + QUESTIONS[currentQuestion].hint);
                                }
                              }}
                              className="w-full rounded-xl border border-white/5 bg-white/5 p-5 text-left text-sm font-medium transition-all hover:border-orange-500/50 hover:bg-orange-500/5"
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* ── RESULT ── */}
            {phase === "result" && (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center p-12 bg-[#1a120a] rounded-3xl border border-orange-500/30">
                <div className="mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-orange-500/10 p-6">
                  <ShieldCheck size={80} className="text-orange-400" />
                </div>
                <h2 className="mb-2 text-4xl font-black">AI Master Verified</h2>
                <p className="mb-10 text-orange-400/80 font-bold uppercase tracking-widest">Final Playground Score: {score} / 100</p>
                
                <div className="mx-auto max-w-2xl text-left space-y-6">
                  <div className="bg-black/40 p-6 rounded-2xl border-l-4 border-orange-500">
                    <h4 className="text-sm font-black uppercase mb-3 text-orange-400">The Power of Neural Networks</h4>
                    <p className="text-lg leading-relaxed text-white/70">
                      You just unlocked a phone using a <span className="font-bold text-white">Neural Network</span>! 
                      Unlike simple algorithms, NNs learn from vast amounts of data to recognize patterns like the curve of a nose or the distance between eyes. 
                      They are the brain behind modern AI, from self-driving cars to medical imaging.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="rounded-xl bg-white/5 p-4 border border-white/5">
                      <div className="text-2xl font-black text-orange-400">5</div>
                      <div className="text-[10px] text-white/30 uppercase">Episodes</div>
                    </div>
                    <div className="rounded-xl bg-white/5 p-4 border border-white/5">
                      <div className="text-2xl font-black text-orange-400">100%</div>
                      <div className="text-[10px] text-white/30 uppercase">Curriculum</div>
                    </div>
                    <div className="rounded-xl bg-white/5 p-4 border border-white/5">
                      <div className="text-2xl font-black text-orange-400">AI</div>
                      <div className="text-[10px] text-white/30 uppercase">Explorer</div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex flex-wrap justify-center gap-4">
                  <Link to="/algorithms/neural-network" className="bg-orange-500 px-8 py-4 rounded-xl font-black text-black hover:bg-orange-400 transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                    MASTER NEURAL NETWORKS
                  </Link>
                  <button onClick={reset} className="border-2 border-white/10 px-8 py-4 rounded-xl font-black text-white hover:bg-white/5 transition-all">
                    <RotateCcw className="inline mr-2 h-5 w-5" /> RESTART ODYSSEY
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
