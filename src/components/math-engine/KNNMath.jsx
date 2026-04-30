import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, MousePointer2, Info, Calculator, Users, Target, ChevronRight } from "lucide-react";

export default function KNNMath() {
    const [points, setPoints] = useState([
        { id: 1, x: 25, y: 30, type: "Cyan" },
        { id: 2, x: 35, y: 45, type: "Cyan" },
        { id: 3, x: 20, y: 60, type: "Cyan" },
        { id: 4, x: 75, y: 70, type: "Pink" },
        { id: 5, x: 85, y: 80, type: "Pink" },
        { id: 6, x: 70, y: 85, type: "Pink" },
    ]);
    const [testPoint, setTestPoint] = useState({ x: 50, y: 50 });
    const [isDragging, setIsDragging] = useState(false);
    const [activeClass, setActiveClass] = useState("Cyan");
    const [interactionMode, setInteractionMode] = useState("move"); 
    const [k, setK] = useState(3);

    const sortedDistances = useMemo(() => {
        return points
            .map(p => ({
                ...p,
                dx: (p.x - testPoint.x).toFixed(1),
                dy: (p.y - testPoint.y).toFixed(1),
                dist: Math.sqrt(Math.pow(p.x - testPoint.x, 2) + Math.pow(p.y - testPoint.y, 2))
            }))
            .sort((a, b) => a.dist - b.dist);
    }, [points, testPoint]);

    const neighbors = sortedDistances.slice(0, k);
    
    const votes = useMemo(() => {
        const counts = { Cyan: 0, Pink: 0 };
        neighbors.forEach(n => counts[n.type]++);
        return counts;
    }, [neighbors]);

    const winner = votes.Cyan > votes.Pink ? "Cyan" : votes.Pink > votes.Cyan ? "Pink" : "Tie";

    const handleGridClick = (e) => {
        if (isDragging) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
        const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);

        if (interactionMode === "add") {
            setPoints([...points, { id: Date.now(), x, y, type: activeClass }]);
        }
    };

    const deletePoint = (id) => {
        if (interactionMode === "delete") {
            setPoints(points.filter(p => p.id !== id));
        }
    };

    const handleMouseMove = (e) => {
        if (!isDragging || interactionMode !== "move") return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = Math.max(0, Math.min(100, Math.round(((e.clientX - rect.left) / rect.width) * 100)));
        const y = Math.max(0, Math.min(100, Math.round(((e.clientY - rect.top) / rect.height) * 100)));
        setTestPoint({ x, y });
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-7xl mx-auto">
            
            {/* 1. TOP: The Equation Section */}
            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 backdrop-blur-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-cyan-500/10 to-transparent pointer-events-none" />
                <div className="relative z-10 text-center">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400 mb-8" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                        The Euclidean Blueprint
                    </h2>
                    <div className="inline-flex flex-col md:flex-row items-center justify-center gap-6 bg-black/60 p-6 rounded-2xl border border-cyan-400/30 shadow-[0_0_50px_rgba(34,211,238,0.2)] hover:shadow-[0_0_70px_rgba(34,211,238,0.4)] transition-all duration-500 group-hover:scale-105">
                        <div className="text-2xl md:text-4xl font-black text-white tracking-tighter flex items-center gap-3">
                            d = <span className="text-3xl md:text-5xl text-cyan-400">√</span>
                            <span className="border-t-2 border-white/80 pt-1">
                                (x₂-x₁)² + (y₂-y₁)²
                            </span>
                        </div>
                    </div>
                    <p className="mt-6 text-[10px] text-white/30 tracking-[0.2em] font-medium uppercase">
                        The Pythagorean Ruler of Machine Learning
                    </p>
                </div>
            </section>

            {/* 2. MIDDLE: Calculations & Graph Side-by-Side */}
            <div className="grid gap-6 lg:grid-cols-2">
                
                {/* LEFT: Calculations Tab */}
                <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl flex flex-col h-[600px]">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <Calculator size={20} className="text-cyan-400" />
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                                Live Calculations
                            </h3>
                        </div>
                        <div className="text-[8px] font-black uppercase text-white/30 tracking-widest">Tracking {k} Neighbors</div>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar space-y-4">
                        <AnimatePresence mode="popLayout">
                            {neighbors.map((n, i) => (
                                <motion.div 
                                    key={n.id}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: 20, opacity: 0 }}
                                    className={`p-6 rounded-2xl bg-black/40 border-2 transition-all ${n.type === 'Cyan' ? 'border-cyan-400/20' : 'border-pink-400/20'}`}
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className={`h-3 w-3 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] ${n.type === 'Cyan' ? 'bg-cyan-400' : 'bg-pink-400'}`} />
                                            <span className="text-[8px] font-black text-white uppercase tracking-widest" style={{ fontFamily: "'Press Start 2P', system-ui" }}>Neighbor #{i+1}</span>
                                        </div>
                                        <div className={`text-5xl font-black ${n.type === 'Cyan' ? 'text-cyan-400' : 'text-pink-400'} drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]`}>{n.dist.toFixed(2)}</div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4">
                                        <div className={`p-4 rounded-xl border flex flex-col items-center justify-center ${n.type === 'Cyan' ? 'bg-cyan-400/5 border-cyan-400/20' : 'bg-pink-400/5 border-pink-400/20'}`}>
                                            <div className="text-[10px] font-black text-white/20 uppercase mb-2 tracking-widest">Live Math</div>
                                            <div className="font-mono text-xl md:text-2xl font-black text-white">
                                                √({n.x} - {testPoint.x})² + ({n.y} - {testPoint.y})²
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </section>

                {/* RIGHT: Labeled Interactive Graph */}
                <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl flex flex-col h-[600px] relative group">
                    <div className="flex items-center justify-between mb-8 relative z-20">
                        <div className="flex items-center gap-3">
                            <Target size={20} className="text-purple-400" />
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                                Interactive Grid
                            </h3>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => setInteractionMode("add")} className={`p-3 rounded-xl border transition-all ${interactionMode === 'add' ? 'bg-cyan-400 border-cyan-400 text-black' : 'bg-black/40 border-white/10 text-white/40 hover:text-white'}`}>
                                <Plus size={18} strokeWidth={3} />
                            </button>
                            <button onClick={() => setInteractionMode("delete")} className={`p-3 rounded-xl border transition-all ${interactionMode === 'delete' ? 'bg-red-500 border-red-500 text-white' : 'bg-black/40 border-white/10 text-white/40 hover:text-white'}`}>
                                <Trash2 size={18} strokeWidth={3} />
                            </button>
                            <button onClick={() => setInteractionMode("move")} className={`p-3 rounded-xl border transition-all ${interactionMode === 'move' ? 'bg-purple-500 border-purple-500 text-white' : 'bg-black/40 border-white/10 text-white/40 hover:text-white'}`}>
                                <MousePointer2 size={18} strokeWidth={3} />
                            </button>
                        </div>
                    </div>

                    <div 
                        className="flex-1 relative rounded-3xl border border-white/10 bg-[#050508] overflow-hidden cursor-crosshair shadow-inner"
                        onMouseMove={handleMouseMove}
                        onMouseDown={() => interactionMode === "move" && setIsDragging(true)}
                        onMouseUp={() => setIsDragging(false)}
                        onClick={handleGridClick}
                    >
                        {/* Grid & Axes */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
                        <div className="absolute left-0 bottom-0 w-full h-px bg-white/20" />
                        <div className="absolute left-0 bottom-0 w-px h-full bg-white/20" />
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[6px] font-black text-white/20 uppercase tracking-[0.3em]" style={{ fontFamily: "'Press Start 2P', system-ui" }}>Feature X</div>
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[6px] font-black text-white/20 uppercase tracking-[0.3em] [writing-mode:vertical-lr]" style={{ fontFamily: "'Press Start 2P', system-ui" }}>Feature Y</div>

                        <svg className="absolute inset-0 h-full w-full pointer-events-none z-10">
                            <AnimatePresence>
                                {neighbors.map((n) => (
                                    <motion.line
                                        key={`line-${n.id}`}
                                        x1={`${n.x}%`} y1={`${n.y}%`}
                                        x2={`${testPoint.x}%`} y2={`${testPoint.y}%`}
                                        stroke={n.type === 'Cyan' ? "#22d3ee" : "#f472b6"}
                                        strokeWidth="4"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 0.8 }}
                                        exit={{ opacity: 0 }}
                                        strokeDasharray="8 8"
                                    />
                                ))}
                            </AnimatePresence>
                        </svg>

                        {points.map((p) => (
                            <motion.div 
                                key={p.id}
                                layoutId={p.id}
                                onClick={(e) => { e.stopPropagation(); deletePoint(p.id); }}
                                className={`absolute -translate-x-1/2 -translate-y-1/2 h-6 w-6 rounded-full shadow-2xl cursor-pointer group/point ${p.type === 'Cyan' ? 'bg-cyan-400 shadow-cyan-400/40' : 'bg-pink-400 shadow-pink-400/40'}`}
                                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                                whileHover={{ scale: 1.4 }}
                            >
                                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/90 px-3 py-1 rounded-full text-[10px] font-black text-white border border-white/10 opacity-0 group-hover/point:opacity-100 transition-opacity">
                                    ({p.x}, {p.y})
                                </div>
                            </motion.div>
                        ))}

                        <motion.div 
                            className="absolute -translate-x-1/2 -translate-y-1/2 h-12 w-12 rounded-full border-4 border-white bg-white z-20 flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.4)]"
                            style={{ 
                                left: `${testPoint.x}%`, 
                                top: `${testPoint.y}%`,
                                backgroundColor: winner === 'Cyan' ? '#22d3ee' : winner === 'Pink' ? '#f472b6' : 'white'
                            }}
                            animate={{ scale: isDragging ? 1.1 : 1 }}
                        >
                             <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-4 py-2 rounded-full text-xs font-black text-black shadow-2xl border-2 border-black/10">
                                TARGET ({testPoint.x}, {testPoint.y})
                            </div>
                        </motion.div>
                    </div>

                    {interactionMode === "add" && (
                        <div className="mt-6 flex gap-4 bg-black/40 p-4 rounded-2xl border border-white/10">
                            <button onClick={() => setActiveClass("Cyan")} className={`flex-1 py-3 rounded-xl text-[8px] font-black uppercase transition-all ${activeClass === 'Cyan' ? 'bg-cyan-400 text-black' : 'text-cyan-400 hover:bg-white/10'}`} style={{ fontFamily: "'Press Start 2P', system-ui" }}>Cyan Mode</button>
                            <button onClick={() => setActiveClass("Pink")} className={`flex-1 py-3 rounded-xl text-[8px] font-black uppercase transition-all ${activeClass === 'Pink' ? 'bg-pink-400 text-black' : 'text-pink-400 hover:bg-white/10'}`} style={{ fontFamily: "'Press Start 2P', system-ui" }}>Pink Mode</button>
                        </div>
                    )}
                </section>
            </div>

            {/* 3. BOTTOM: Final Prediction Section */}
            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 backdrop-blur-2xl">
                <div className="grid gap-8 lg:grid-cols-3 items-center">
                    
                    <div className="lg:col-span-1 space-y-6">
                        <div className="flex items-center gap-3">
                            <Users size={20} className="text-white/40" />
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                                Neighbor Democracy
                            </h3>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex-1 text-center p-6 rounded-3xl bg-cyan-400/10 border-2 border-cyan-400/20">
                                <div className="text-[8px] font-black uppercase text-cyan-400/60 mb-2">Cyan Count</div>
                                <div className="text-5xl font-black text-white">{votes.Cyan}</div>
                            </div>
                            <div className="flex-1 text-center p-6 rounded-3xl bg-pink-400/10 border-2 border-pink-400/20">
                                <div className="text-[8px] font-black uppercase text-pink-400/60 mb-2">Pink Count</div>
                                <div className="text-5xl font-black text-white">{votes.Pink}</div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1 flex flex-col items-center justify-center p-8 rounded-[40px] border-8 border-white/5 bg-black/40 min-h-[240px] relative group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                        <div className="text-[10px] font-black uppercase text-white/20 mb-6 tracking-widest">Final Prediction</div>
                        <motion.div 
                            key={winner}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className={`text-4xl font-black uppercase tracking-widest text-center drop-shadow-2xl ${winner === 'Cyan' ? 'text-cyan-400' : winner === 'Pink' ? 'text-pink-400' : 'text-white'}`}
                            style={{ fontFamily: "'Press Start 2P', system-ui" }}
                        >
                            {winner === "Tie" ? "TIE" : `${winner}`}
                        </motion.div>
                        <div className="mt-8 px-6 py-2 rounded-full bg-white/5 text-[10px] font-black text-white/40 uppercase tracking-widest">
                            {votes.Cyan > votes.Pink ? "Majority: Cyan" : votes.Pink > votes.Cyan ? "Majority: Pink" : "No Majority"}
                        </div>
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        <div className="flex items-center gap-3">
                            <Info size={18} className="text-pink-400" />
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-pink-400" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                                The Logic
                            </h3>
                        </div>
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 italic text-sm text-white/60 leading-relaxed shadow-xl">
                            "Since we chose **K={k}**, we look at the top {k} closest points. Out of those, {votes.Cyan} are Cyan and {votes.Pink} are Pink. The majority group always wins the classification!"
                        </div>
                        <div className="flex items-center gap-4 bg-black/40 p-4 rounded-2xl border border-white/5">
                            <span className="text-[8px] font-black uppercase text-white/30 tracking-widest">K-Tuner:</span>
                            <input type="range" min="1" max={Math.max(1, points.length)} step="1" value={k} onChange={e => setK(parseInt(e.target.value))} className="flex-1 accent-cyan-400 h-1" />
                            <span className="text-xl font-black text-cyan-400">{k}</span>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}
