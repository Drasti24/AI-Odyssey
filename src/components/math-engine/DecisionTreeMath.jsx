import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, GitBranch, Info, Calculator, Target, Zap } from "lucide-react";

export default function DecisionTreeMath() {
    const [points, setPoints] = useState([
        { id: 1, val: 10, type: "Cyan" },
        { id: 2, val: 20, type: "Cyan" },
        { id: 3, val: 35, type: "Cyan" },
        { id: 4, val: 65, type: "Pink" },
        { id: 5, val: 80, type: "Pink" },
        { id: 6, val: 95, type: "Pink" },
    ]);
    const [threshold, setThreshold] = useState(50);
    const [interactionMode, setInteractionMode] = useState("add");
    const [activeClass, setActiveClass] = useState("Cyan");

    const stats = useMemo(() => {
        const left = points.filter(p => p.val <= threshold);
        const right = points.filter(p => p.val > threshold);

        const calcGini = (subset) => {
            if (subset.length === 0) return 0;
            const cyanCount = subset.filter(p => p.type === "Cyan").length;
            const pinkCount = subset.filter(p => p.type === "Pink").length;
            const p1 = cyanCount / subset.length;
            const p2 = pinkCount / subset.length;
            return (1 - (Math.pow(p1, 2) + Math.pow(p2, 2))).toFixed(3);
        };

        const leftGini = calcGini(left);
        const rightGini = calcGini(right);
        
        const totalPoints = points.length;
        const weightedGini = totalPoints > 0 ? 
            ((left.length / totalPoints) * leftGini + (right.length / totalPoints) * rightGini).toFixed(3) : 0;

        return { left, right, leftGini, rightGini, weightedGini };
    }, [points, threshold]);

    const handleGridClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const val = Math.round(((e.clientX - rect.left) / rect.width) * 100);
        if (interactionMode === "add") {
            setPoints([...points, { id: Date.now(), val, type: activeClass }]);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-7xl mx-auto">
            
            {/* 1. TOP: The Equation Section */}
            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 backdrop-blur-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-purple-500/10 to-transparent pointer-events-none" />
                <div className="relative z-10 text-center">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-400 mb-8" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                        The Gini Impurity
                    </h2>
                    <div className="inline-flex flex-col md:flex-row items-center justify-center gap-8 bg-black/40 p-10 rounded-4xl border border-white/10 shadow-[0_0_50px_rgba(168,85,247,0.1)]">
                        <div className="text-5xl md:text-7xl font-black text-white tracking-tighter flex items-center gap-6">
                            G = 1 - <span className="text-6xl md:text-8xl">Σ</span>
                            <span className="text-purple-400">pᵢ²</span>
                        </div>
                    </div>
                    <p className="mt-8 text-sm text-white/30 tracking-[0.2em] font-medium uppercase">
                        The Mathematical Measure of "Chaos" in Data
                    </p>
                </div>
            </section>

            {/* 2. MIDDLE: Side-by-Side */}
            <div className="grid gap-6 lg:grid-cols-2">
                
                {/* LEFT: Calculations Tab */}
                <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl flex flex-col h-[600px]">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <Calculator size={20} className="text-purple-400" />
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                                Impurity Log
                            </h3>
                        </div>
                        <div className="text-[8px] font-black uppercase text-white/30 tracking-widest">Tracking Splits</div>
                    </div>

                    <div className="flex-1 space-y-4 overflow-y-auto pr-4 custom-scrollbar">
                        <div className="p-6 rounded-2xl bg-cyan-400/5 border-2 border-cyan-400/20">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[10px] font-black text-cyan-400 uppercase">Left Branch</span>
                                <span className="text-3xl font-black text-white">{stats.leftGini}</span>
                            </div>
                            <div className="font-mono text-xs text-white/30 bg-black/20 p-3 rounded-lg">
                                G = 1 - ((c/n)² + (p/n)²)
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-pink-400/5 border-2 border-pink-400/20">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[10px] font-black text-pink-400 uppercase">Right Branch</span>
                                <span className="text-3xl font-black text-white">{stats.rightGini}</span>
                            </div>
                            <div className="font-mono text-xs text-white/30 bg-black/20 p-3 rounded-lg">
                                G = 1 - ((c/n)² + (p/n)²)
                            </div>
                        </div>

                        <div className="mt-auto p-10 rounded-[40px] bg-black/40 border-2 border-dashed border-white/10 flex flex-col items-center justify-center">
                            <div className="text-[8px] font-black uppercase text-white/20 mb-2">Total Weighted Impurity</div>
                            <div className="text-6xl font-black text-white">{stats.weightedGini}</div>
                            <div className="text-[10px] font-bold text-purple-400 mt-4 uppercase tracking-[0.2em]">Goal: Get to 0.000</div>
                        </div>
                    </div>
                </section>

                {/* RIGHT: Visual Splitter */}
                <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl h-[600px] flex flex-col relative group">
                    <div className="flex items-center justify-between mb-8 relative z-20">
                        <div className="flex items-center gap-3">
                            <GitBranch size={20} className="text-cyan-400" />
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                                The Splitter
                            </h3>
                        </div>
                        <div className="flex gap-2">
                             <button onClick={() => setInteractionMode("add")} className={`p-3 rounded-xl border transition-all ${interactionMode === 'add' ? 'bg-cyan-400 border-cyan-400 text-black shadow-lg' : 'bg-black/40 border-white/10 text-white/40 hover:text-white'}`}>
                                <Plus size={18} strokeWidth={3} />
                            </button>
                            <button onClick={() => setInteractionMode("delete")} className={`p-3 rounded-xl border transition-all ${interactionMode === 'delete' ? 'bg-red-500 border-red-500 text-white shadow-lg' : 'bg-black/40 border-white/10 text-white/40 hover:text-white'}`}>
                                <Trash2 size={18} strokeWidth={3} />
                            </button>
                        </div>
                    </div>

                    <div 
                        className="flex-1 relative bg-[#050508] rounded-3xl border border-white/10 overflow-hidden p-12 flex items-center justify-center shadow-inner"
                        onClick={handleGridClick}
                    >
                         {/* X-Axis */}
                         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
                         <div className="absolute bottom-12 left-10 right-10 h-px bg-white/20" />
                         
                         {/* Threshold Line */}
                         <motion.div 
                            className="absolute top-10 bottom-12 w-1 bg-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.6)] z-20"
                            style={{ left: `${threshold}%` }}
                         >
                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-purple-500 px-4 py-2 rounded-full text-xs font-black text-white border-2 border-white/20 whitespace-nowrap">
                                SPLIT AT {threshold}
                            </div>
                         </motion.div>

                         <div className="w-full h-32 relative flex items-center">
                            {points.map(p => (
                                <motion.div 
                                    key={p.id}
                                    layoutId={p.id}
                                    onClick={(e) => { e.stopPropagation(); interactionMode === 'delete' && setPoints(points.filter(pt => pt.id !== p.id)); }}
                                    className={`absolute -translate-x-1/2 h-10 w-10 rounded-2xl flex items-center justify-center text-[10px] font-black shadow-2xl cursor-pointer ${p.type === 'Cyan' ? 'bg-cyan-400 text-black shadow-cyan-400/30' : 'bg-pink-400 text-black shadow-pink-400/30'}`}
                                    style={{ left: `${p.val}%` }}
                                    whileHover={{ y: -10, scale: 1.2 }}
                                >
                                    {p.val}
                                </motion.div>
                            ))}
                         </div>
                    </div>

                    <div className="mt-8 space-y-6">
                        <div className="flex justify-between text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">
                            <span>Adjust Split</span>
                            <span className="text-purple-400">Position: {threshold}</span>
                        </div>
                        <input type="range" min="0" max="100" value={threshold} onChange={e => setThreshold(parseInt(e.target.value))} className="w-full accent-purple-500 h-2" />
                        
                        <div className="grid grid-cols-2 gap-4">
                            <button onClick={() => setActiveClass("Cyan")} className={`py-4 rounded-xl text-[8px] font-black uppercase border transition-all ${activeClass === 'Cyan' ? 'bg-cyan-400 border-cyan-400 text-black shadow-lg' : 'border-white/10 text-cyan-400 hover:bg-white/5'}`} style={{ fontFamily: "'Press Start 2P', system-ui" }}>Cyan Mode</button>
                            <button onClick={() => setActiveClass("Pink")} className={`py-4 rounded-xl text-[8px] font-black uppercase border transition-all ${activeClass === 'Pink' ? 'bg-pink-400 border-pink-400 text-black shadow-lg' : 'border-white/10 text-pink-400 hover:bg-white/5'}`} style={{ fontFamily: "'Press Start 2P', system-ui" }}>Pink Mode</button>
                        </div>
                    </div>
                </section>
            </div>

            {/* 3. BOTTOM: The Verdict */}
            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 backdrop-blur-2xl">
                <div className="grid gap-8 lg:grid-cols-3 items-center">
                    
                    <div className="lg:col-span-1 space-y-6">
                        <div className="flex items-center gap-3">
                            <Zap size={20} className="text-yellow-400" />
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40" style={{ fontFamily: "'Press Start 2P', system-ui" }}>Logic Path</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="p-6 rounded-3xl bg-black/40 border border-white/5 flex items-center justify-between group overflow-hidden relative">
                                <div className="absolute inset-0 bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="text-xs font-black text-white">Value ≤ {threshold}</div>
                                <div className="text-[10px] font-black text-cyan-400 tracking-widest uppercase">CLASS CYAN</div>
                            </div>
                            <div className="p-6 rounded-3xl bg-black/40 border border-white/5 flex items-center justify-between group overflow-hidden relative">
                                <div className="absolute inset-0 bg-pink-400/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="text-xs font-black text-white">Value &gt; {threshold}</div>
                                <div className="text-[10px] font-black text-pink-400 tracking-widest uppercase">CLASS PINK</div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1 flex flex-col items-center justify-center p-8 rounded-[40px] border-8 border-white/5 bg-black/40 min-h-[240px] relative group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                        <div className="text-[10px] font-black uppercase text-purple-400 mb-6 tracking-widest">Model Purity</div>
                        <motion.div 
                            key={stats.weightedGini}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-6xl font-black text-white drop-shadow-2xl"
                            style={{ fontFamily: "'Press Start 2P', system-ui" }}
                        >
                            {((1 - stats.weightedGini) * 100).toFixed(0)}%
                        </motion.div>
                        <div className="mt-6 px-6 py-2 rounded-full bg-purple-500/10 text-[10px] font-black text-purple-400 uppercase tracking-widest">
                            Information Gain
                        </div>
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        <div className="flex items-center gap-3">
                            <Info size={18} className="text-cyan-400" />
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                                The Logic
                            </h3>
                        </div>
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 italic text-sm text-white/60 leading-relaxed shadow-xl">
                            "Decision trees try to find the 'Purest' split. A Gini of 0.000 means all points in a group are the same color. The better the split, the higher the Purity score!"
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}
