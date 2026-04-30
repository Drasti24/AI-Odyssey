import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, MousePointer2, Info, Equal, Ruler, Target, Calculator } from "lucide-react";

export default function LinearRegressionMath() {
    const [points, setPoints] = useState([
        { id: 1, x: 20, y: 70 },
        { id: 2, x: 40, y: 50 },
        { id: 3, x: 60, y: 40 },
        { id: 4, x: 80, y: 20 },
    ]);
    const [slope, setSlope] = useState(-0.6);
    const [intercept, setIntercept] = useState(80);
    const [interactionMode, setInteractionMode] = useState("add"); 

    const residuals = useMemo(() => {
        let totalSquaredError = 0;
        const res = points.map(p => {
            const predictedY = slope * p.x + intercept;
            const error = p.y - predictedY;
            totalSquaredError += Math.pow(error, 2);
            return { ...p, predictedY, error };
        });
        const mse = points.length > 0 ? (totalSquaredError / points.length) : 0;
        return { points: res, mse: mse.toFixed(2) };
    }, [points, slope, intercept]);

    const handleGridClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
        const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);

        if (interactionMode === "add") {
            setPoints([...points, { id: Date.now(), x, y }]);
        }
    };

    const deletePoint = (id) => {
        if (interactionMode === "delete") {
            setPoints(points.filter(p => p.id !== id));
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-7xl mx-auto">
            
            {/* 1. TOP: The Equation Section */}
            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 backdrop-blur-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-cyan-500/10 to-transparent pointer-events-none" />
                <div className="relative z-10 text-center">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400 mb-8" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                        The Regression Formula
                    </h2>
                    <div className="inline-flex flex-col md:flex-row items-center justify-center gap-6 bg-black/60 p-6 rounded-2xl border border-cyan-400/30 shadow-[0_0_50px_rgba(34,211,238,0.2)] hover:shadow-[0_0_70px_rgba(34,211,238,0.4)] transition-all duration-500 group-hover:scale-105">
                        <div className="text-2xl md:text-4xl font-black text-white tracking-tighter flex items-center gap-3">
                             y = <span className="text-purple-400">{slope.toFixed(2)}</span>x + <span className="text-pink-400">{intercept.toFixed(0)}</span>
                        </div>
                    </div>
                    <p className="mt-6 text-[10px] text-white/30 tracking-[0.2em] font-medium uppercase">
                        The Mathematical Path through Scattered Data
                    </p>
                </div>
            </section>

            {/* 2. MIDDLE: Side-by-Side */}
            <div className="grid gap-6 lg:grid-cols-2">
                
                {/* LEFT: Calculations Tab */}
                <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl flex flex-col h-[600px]">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <Calculator size={20} className="text-cyan-400" />
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                                The Error Log
                            </h3>
                        </div>
                        <div className="text-[8px] font-black uppercase text-white/30 tracking-widest">Tracking {points.length} Points</div>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar space-y-4">
                        <AnimatePresence mode="popLayout">
                            {residuals.points.map((p, i) => (
                                <motion.div 
                                    key={p.id}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: 20, opacity: 0 }}
                                    className="p-6 rounded-2xl bg-black/40 border-2 border-white/5 transition-all"
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="h-3 w-3 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                                            <span className="text-[8px] font-black text-white uppercase tracking-widest" style={{ fontFamily: "'Press Start 2P', system-ui" }}>Point #{i+1}</span>
                                        </div>
                                        <div className="text-5xl font-black text-red-400 drop-shadow-[0_0_20px_rgba(239,68,68,0.3)]">{p.error.toFixed(1)}</div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="bg-red-400/5 p-4 rounded-xl border border-red-400/20 flex flex-col items-center justify-center">
                                            <div className="text-[10px] font-black text-white/20 uppercase mb-2 tracking-widest">Error Logic</div>
                                            <div className="font-mono text-xl md:text-2xl font-black text-white text-center">
                                                {p.y} - <span className="text-purple-400">({slope.toFixed(2)}×{p.x}+{intercept.toFixed(0)})</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </section>

                {/* RIGHT: Visual Lab */}
                <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl flex flex-col h-[600px] relative group">
                    <div className="flex items-center justify-between mb-8 relative z-20">
                        <div className="flex items-center gap-3">
                            <Target size={20} className="text-purple-400" />
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                                Visualization
                            </h3>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => setInteractionMode("add")} className={`p-3 rounded-xl border transition-all ${interactionMode === 'add' ? 'bg-cyan-400 border-cyan-400 text-black' : 'bg-black/40 border-white/10 text-white/40 hover:text-white'}`}>
                                <Plus size={18} strokeWidth={3} />
                            </button>
                            <button onClick={() => setInteractionMode("delete")} className={`p-3 rounded-xl border transition-all ${interactionMode === 'delete' ? 'bg-red-500 border-red-500 text-white' : 'bg-black/40 border-white/10 text-white/40 hover:text-white'}`}>
                                <Trash2 size={18} strokeWidth={3} />
                            </button>
                        </div>
                    </div>

                    <div 
                        className="flex-1 relative rounded-3xl border border-white/10 bg-[#050508] overflow-hidden cursor-crosshair shadow-inner"
                        onClick={handleGridClick}
                    >
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
                        <div className="absolute left-0 bottom-0 w-full h-px bg-white/20" />
                        <div className="absolute left-0 bottom-0 w-px h-full bg-white/20" />

                        <svg className="absolute inset-0 h-full w-full pointer-events-none">
                            {/* Residual Lines */}
                            {residuals.points.map((p) => (
                                <motion.line 
                                    key={`res-${p.id}`}
                                    x1={`${p.x}%`} y1={`${p.y}%`}
                                    x2={`${p.x}%`} y2={`${p.predictedY}%`}
                                    stroke="#ef4444"
                                    strokeWidth="2"
                                    strokeDasharray="4 4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.6 }}
                                />
                            ))}

                            {/* Regression Line */}
                            <motion.line 
                                x1="0%" y1={`${intercept}%`}
                                x2="100%" y2={`${slope * 100 + intercept}%`}
                                stroke="#22d3ee"
                                strokeWidth="6"
                                className="drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]"
                            />
                        </svg>

                        {points.map((p) => (
                            <motion.div 
                                key={p.id}
                                layoutId={p.id}
                                onClick={(e) => { e.stopPropagation(); deletePoint(p.id); }}
                                className={`absolute -translate-x-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-white shadow-xl cursor-pointer hover:scale-150 transition-transform ${interactionMode === 'delete' ? 'hover:bg-red-500' : ''}`}
                                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                            >
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 px-2 py-1 rounded text-[8px] font-bold opacity-0 hover:opacity-100 transition-opacity">
                                    ({p.x}, {p.y})
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-8 space-y-8">
                        <div>
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40 mb-3">
                                <span>Slope (m): {slope.toFixed(2)}</span>
                            </div>
                            <input type="range" min="-3" max="3" step="0.05" value={slope} onChange={(e) => setSlope(parseFloat(e.target.value))} className="w-full accent-purple-500 h-2" />
                        </div>
                        <div>
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40 mb-3">
                                <span>Intercept (b): {intercept.toFixed(0)}</span>
                            </div>
                            <input type="range" min="0" max="100" step="1" value={intercept} onChange={(e) => setIntercept(parseFloat(e.target.value))} className="w-full accent-pink-500 h-2" />
                        </div>
                    </div>
                </section>
            </div>

            {/* 3. BOTTOM: Final Result */}
            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 backdrop-blur-2xl">
                <div className="grid gap-8 lg:grid-cols-3 items-center">
                    
                    <div className="lg:col-span-1 space-y-6 text-center">
                        <div className="flex items-center justify-center gap-3">
                            <Target size={20} className="text-white/40" />
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                                Error Score
                            </h3>
                        </div>
                        <div className="p-8 rounded-[40px] bg-red-500/10 border-2 border-red-500/20">
                            <div className="text-[8px] font-black uppercase text-red-400 mb-2 tracking-widest">MSE Value</div>
                            <div className="text-6xl font-black text-white">{residuals.mse}</div>
                        </div>
                    </div>

                    <div className="lg:col-span-1 flex flex-col items-center justify-center p-8 rounded-[40px] border-8 border-white/5 bg-black/40 min-h-[240px] relative group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                        <div className="text-[10px] font-black uppercase text-white/20 mb-6 tracking-widest">Model Status</div>
                        <motion.div 
                            key={residuals.mse}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className={`text-4xl font-black uppercase tracking-widest text-center drop-shadow-2xl ${parseFloat(residuals.mse) < 50 ? 'text-green-400' : 'text-red-500'}`}
                            style={{ fontFamily: "'Press Start 2P', system-ui" }}
                        >
                            {parseFloat(residuals.mse) < 50 ? 'OPTIMIZED' : 'UNFITTED'}
                        </motion.div>
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        <div className="flex items-center gap-3">
                            <Info size={18} className="text-cyan-400" />
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                                The Logic
                            </h3>
                        </div>
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 italic text-sm text-white/60 leading-relaxed shadow-xl">
                            "The total error is the sum of all the red gaps. To find the perfect line, you must twist and move it until the total error score is as small as possible!"
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}
