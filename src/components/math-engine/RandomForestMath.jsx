import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trees, Info, Calculator, Vote, GitBranch, Zap, Trophy, Target } from "lucide-react";

export default function RandomForestMath() {
    const [treeVotes, setTreeVotes] = useState([
        { id: 1, prediction: "Cyan", confidence: 85 },
        { id: 2, prediction: "Pink", confidence: 90 },
        { id: 3, prediction: "Cyan", confidence: 75 },
        { id: 4, prediction: "Cyan", confidence: 95 },
        { id: 5, prediction: "Pink", confidence: 60 },
    ]);

    const stats = useMemo(() => {
        const cyanVotes = treeVotes.filter(t => t.prediction === "Cyan").length;
        const pinkVotes = treeVotes.filter(t => t.prediction === "Pink").length;
        const winner = cyanVotes > pinkVotes ? "Cyan" : "Pink";
        const percentage = ((Math.max(cyanVotes, pinkVotes) / treeVotes.length) * 100).toFixed(0);
        return { cyanVotes, pinkVotes, winner, percentage };
    }, [treeVotes]);

    const toggleTree = (id) => {
        setTreeVotes(treeVotes.map(t => 
            t.id === id ? { ...t, prediction: t.prediction === "Cyan" ? "Pink" : "Cyan" } : t
        ));
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-7xl mx-auto">
            
            {/* 1. TOP: The Equation Section */}
            <section className="math-panel rounded-3xl border border-white/10 bg-white/[0.03] p-10 backdrop-blur-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-green-500/10 to-transparent pointer-events-none" />
                <div className="relative z-10 text-center">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-green-400 mb-8" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                        Ensemble Aggregation
                    </h2>
                    <div className="inline-flex flex-col md:flex-row items-center justify-center gap-6 bg-black/60 p-6 rounded-2xl border border-green-400/30 shadow-[0_0_50px_rgba(34,197,94,0.2)] hover:shadow-[0_0_70px_rgba(34,197,94,0.4)] transition-all duration-500 group-hover:scale-105">
                        <div className="text-2xl md:text-4xl font-black text-white tracking-tighter flex items-center gap-4">
                            H(x) = <div className="inline-flex flex-col items-center">
                                <span className="border-b-2 border-white/80 pb-1 px-4 text-xl md:text-3xl">Σ hₜ(x)</span>
                                <span className="pt-1 text-xl md:text-3xl">T</span>
                            </div>
                        </div>
                    </div>
                    <p className="mt-8 text-sm text-white/30 tracking-[0.2em] font-medium uppercase">
                        The Wisdom of the Crowd: Averaging Many Decisions
                    </p>
                </div>
            </section>

            {/* 2. MIDDLE: Side-by-Side */}
            <div className="grid gap-6 lg:grid-cols-2">
                
                {/* LEFT: Calculations Tab */}
                <section className="math-panel math-workspace rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl flex flex-col h-[600px]">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <Calculator size={20} className="text-green-400" />
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-green-400" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                                Individual Tree Log
                            </h3>
                        </div>
                        <div className="text-[8px] font-black uppercase text-white/30 tracking-widest">{treeVotes.length} Trees Polled</div>
                    </div>

                    <div className="flex-1 space-y-4 overflow-y-auto pr-4 custom-scrollbar">
                        <AnimatePresence mode="popLayout">
                            {treeVotes.map((tree, i) => (
                                <motion.div 
                                    key={tree.id}
                                    onPointerDown={() => toggleTree(tree.id)}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    className="p-6 rounded-2xl bg-black/40 border-2 border-white/5 transition-all cursor-pointer group hover:border-green-400/40 relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="flex items-center justify-between relative z-10">
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-[10px] font-black text-white/40 border border-white/5">T{i+1}</div>
                                            <div>
                                                <div className="text-[8px] font-black uppercase text-white/20 mb-1 tracking-widest">Prediction</div>
                                                <div className={`text-2xl font-black uppercase ${tree.prediction === 'Cyan' ? 'text-cyan-400' : 'text-pink-400'} drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]`}>
                                                    {tree.prediction}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[8px] font-black uppercase text-white/20 mb-1 tracking-widest">Weight</div>
                                            <div className="text-2xl font-mono font-black text-white">{tree.confidence}%</div>
                                        </div>
                                    </div>
                                    <div className="mt-4 text-[7px] font-black text-white/20 uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity text-center">Click to Flip Decision</div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </section>

                {/* RIGHT: Visual Forest */}
                <section className="math-panel math-workspace rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl h-[600px] flex flex-col relative group">
                    <div className="flex items-center justify-between mb-8 relative z-20">
                        <div className="flex items-center gap-3">
                            <Trees size={20} className="text-cyan-400" />
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                                Visualization
                            </h3>
                        </div>
                    </div>

                    <div className="touch-graph flex-1 relative bg-[#050508] rounded-3xl border border-white/10 p-5 sm:p-12 flex flex-col items-center justify-around shadow-inner">
                        <div className="grid grid-cols-2 gap-4 w-full max-w-md relative z-10 sm:grid-cols-3 sm:gap-8">
                            {treeVotes.map((tree) => (
                                <motion.div 
                                    key={tree.id}
                                    animate={{ 
                                        y: tree.prediction === stats.winner ? -10 : 0,
                                        scale: tree.prediction === stats.winner ? 1.1 : 1,
                                        opacity: tree.prediction === stats.winner ? 1 : 0.4
                                    }}
                                    className="flex flex-col items-center gap-3"
                                >
                                    <div className={`p-6 rounded-2xl bg-black/40 border-2 transition-all duration-500 ${tree.prediction === 'Cyan' ? 'border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)]' : 'border-pink-400 shadow-[0_0_20px_rgba(244,114,182,0.3)]'}`}>
                                        <GitBranch size={32} className={tree.prediction === 'Cyan' ? 'text-cyan-400' : 'text-pink-400'} strokeWidth={2.5} />
                                    </div>
                                    <div className="text-[8px] font-black text-white/20 uppercase tracking-widest">Tree {tree.id}</div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Voting Visualizer */}
                        <div className="w-full max-w-sm rounded-4xl bg-black/40 border border-white/10 p-10 relative overflow-hidden group/poll shadow-2xl">
                             <div className="absolute inset-0 bg-green-500/[0.02] opacity-0 group-hover/poll:opacity-100 transition-opacity" />
                             <div className="flex justify-between items-center mb-6">
                                <div className="space-y-1">
                                    <div className="text-[8px] font-black text-cyan-400 uppercase tracking-widest">Cyan Poll</div>
                                    <div className="text-4xl font-black text-white">{stats.cyanVotes}</div>
                                </div>
                                <div className="text-[8px] font-black text-white/10 uppercase tracking-[0.5em]">VS</div>
                                <div className="space-y-1 text-right">
                                    <div className="text-[8px] font-black text-pink-400 uppercase tracking-widest">Pink Poll</div>
                                    <div className="text-4xl font-black text-white">{stats.pinkVotes}</div>
                                </div>
                             </div>
                             <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden flex border border-white/5 p-1">
                                <motion.div 
                                    animate={{ width: `${(stats.cyanVotes / treeVotes.length) * 100}%` }}
                                    className="h-full bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                                />
                                <motion.div 
                                    animate={{ width: `${(stats.pinkVotes / treeVotes.length) * 100}%` }}
                                    className="h-full bg-pink-400 rounded-full shadow-[0_0_15px_rgba(244,114,182,0.5)] ml-1"
                                />
                             </div>
                        </div>
                    </div>

                    <div className="mt-8 p-6 rounded-3xl bg-black/40 border border-white/5 flex items-center gap-4">
                         <div className="h-10 w-10 shrink-0 rounded-xl bg-green-400/20 flex items-center justify-center border border-green-400/30 text-green-400">
                            <Vote size={20} />
                         </div>
                         <div>
                            <h4 className="text-[8px] font-black uppercase text-white/40 tracking-widest mb-1">Aggregation Logic</h4>
                            <p className="text-[10px] text-white/30 leading-relaxed uppercase tracking-tighter">
                                Majority Voting (Mode) ensures that the forest result is resistant to any single tree's error.
                            </p>
                         </div>
                    </div>
                </section>
            </div>

            {/* 3. BOTTOM: The Verdict */}
            <section className="math-panel rounded-3xl border border-white/10 bg-white/[0.03] p-10 backdrop-blur-2xl">
                <div className="grid gap-8 lg:grid-cols-3 items-center">
                    
                    <div className="lg:col-span-1 space-y-6">
                        <div className="flex items-center gap-3 text-center">
                            <Zap size={20} className="text-yellow-400" />
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 w-full" style={{ fontFamily: "'Press Start 2P', system-ui" }}>Power Status</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-6 rounded-3xl bg-black/40 border border-white/5 text-center">
                                <div className="text-[8px] font-black text-white/20 uppercase mb-2">Total Estimators</div>
                                <div className="text-3xl font-black text-white">{treeVotes.length}</div>
                            </div>
                            <div className="p-6 rounded-3xl bg-black/40 border border-white/5 text-center">
                                <div className="text-[8px] font-black text-white/20 uppercase mb-2">Split Quality</div>
                                <div className="text-3xl font-black text-green-400">MAX</div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1 flex flex-col items-center justify-center p-12 rounded-[60px] border-8 border-white/5 bg-black/60 relative overflow-hidden group shadow-2xl">
                        <div className="absolute top-0 right-0 p-4 opacity-5"><Trophy size={80} /></div>
                        <div className="text-[10px] font-black uppercase text-green-400 mb-6 tracking-widest">Ensemble Winner</div>
                        <motion.div 
                            key={stats.winner}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className={`text-5xl font-black uppercase tracking-[0.2em] text-center ${stats.winner === 'Cyan' ? 'text-cyan-400' : 'text-pink-400'}`}
                            style={{ fontFamily: "'Press Start 2P', system-ui" }}
                        >
                            {stats.winner}
                        </motion.div>
                        <div className="mt-8 px-8 py-2 rounded-full bg-green-400/10 text-[10px] font-black text-green-400 uppercase tracking-widest border border-green-400/20">
                            {stats.percentage}% Confidence Score
                        </div>
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        <div className="flex items-center gap-3">
                            <Info size={18} className="text-green-400" />
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-green-400" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                                The Logic
                            </h3>
                        </div>
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 italic text-sm text-white/60 leading-relaxed shadow-xl">
                            "Random Forest is like a **Board of Directors**. One director might make a bad call, but if the whole board votes, the final decision is much smarter and safer!"
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}
