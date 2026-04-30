import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, MousePointer2, Info, Equal, Ruler, Target } from "lucide-react";

export default function LinearRegressionMath() {
    const [points, setPoints] = useState([
        { id: 1, x: 20, y: 70 },
        { id: 2, x: 40, y: 50 },
        { id: 3, x: 60, y: 40 },
        { id: 4, x: 80, y: 20 },
    ]);
    const [slope, setSlope] = useState(-0.6);
    const [intercept, setIntercept] = useState(80);
    const [interactionMode, setInteractionMode] = useState("add"); // 'add', 'delete'

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
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Section */}
            <div className="rounded-4xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-md">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400 mb-4" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                            The Regression Engine
                        </h2>
                        <div className="text-4xl md:text-5xl font-black text-white flex flex-wrap items-center gap-x-4 gap-y-2">
                             y = <span className="text-purple-400">{slope.toFixed(2)}</span>x + <span className="text-pink-400">{intercept.toFixed(0)}</span>
                        </div>
                        <p className="mt-6 text-sm text-white/40 leading-relaxed italic">
                            &ldquo;Draw a line that stays as close to the dots as possible. The math measures the gaps!&rdquo;
                        </p>
                    </div>

                    <div className="flex-1 w-full max-w-sm rounded-3xl bg-black/40 p-8 border-2 border-red-500/20 flex flex-col items-center justify-center relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                            <Target size={120} />
                        </div>
                        <span className="text-[10px] font-black uppercase text-red-400/60 mb-2 tracking-widest">Total Error (MSE)</span>
                        <motion.div 
                            key={residuals.mse}
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            className="text-6xl font-black text-white drop-shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                        >
                            {residuals.mse}
                        </motion.div>
                        <div className="mt-4 flex items-center gap-2 text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">
                             Objective: Minimize this number
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Interactive Grid & Math Side-by-Side */}
            <div className="grid gap-8 lg:grid-cols-2">
                
                {/* Left: Interactive Graph */}
                <div className="rounded-4xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl relative">
                    <div className="mb-6 flex items-center justify-between">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                            Visual Lab
                        </h3>
                        <div className="flex gap-2">
                            <button onClick={() => setInteractionMode("add")} className={`p-3 rounded-xl border transition-all ${interactionMode === 'add' ? 'bg-cyan-400 border-cyan-400 text-black' : 'bg-white/5 border-white/10 text-white/40'}`}>
                                <Plus size={18} strokeWidth={3} />
                            </button>
                            <button onClick={() => setInteractionMode("delete")} className={`p-3 rounded-xl border transition-all ${interactionMode === 'delete' ? 'bg-red-500 border-red-500 text-white' : 'bg-white/5 border-white/10 text-white/40'}`}>
                                <Trash2 size={18} strokeWidth={3} />
                            </button>
                        </div>
                    </div>

                    <div 
                        className="relative aspect-square w-full rounded-3xl border border-white/10 bg-[#07070c] overflow-hidden cursor-crosshair group shadow-2xl"
                        onClick={handleGridClick}
                    >
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
                        
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
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 px-2 py-1 rounded text-[8px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                    ({p.x}, {p.y})
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-8 space-y-8">
                        <div>
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40 mb-3">
                                <span>Slope (m): {slope.toFixed(2)}</span>
                                <span className="text-purple-400">Angle of Line</span>
                            </div>
                            <input 
                                type="range" min="-3" max="3" step="0.05" value={slope}
                                onChange={(e) => setSlope(parseFloat(e.target.value))}
                                className="w-full accent-purple-500 h-2"
                            />
                        </div>
                        <div>
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40 mb-3">
                                <span>Intercept (b): {intercept.toFixed(0)}</span>
                                <span className="text-pink-400">Y-Axis Start</span>
                            </div>
                            <input 
                                type="range" min="0" max="100" step="1" value={intercept}
                                onChange={(e) => setIntercept(parseFloat(e.target.value))}
                                className="w-full accent-pink-500 h-2"
                            />
                        </div>
                    </div>
                </div>

                {/* Right: Detailed Math Calculations */}
                <div className="flex flex-col gap-6">
                    <div className="rounded-4xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl flex-1 overflow-hidden relative">
                        <div className="absolute top-0 right-0 h-40 w-40 bg-cyan-500/5 blur-[100px]" />
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400 mb-8" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                            The Error Log
                        </h3>
                        
                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            <AnimatePresence>
                                {residuals.points.map((p, i) => (
                                    <motion.div 
                                        key={p.id}
                                        initial={{ x: 20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -20, opacity: 0 }}
                                        className="p-5 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between"
                                    >
                                        <div>
                                            <div className="text-[9px] font-black text-white/20 uppercase mb-2">Point {i+1} at ({p.x}, {p.y})</div>
                                            <div className="font-mono text-sm">
                                                <span className="text-white/40">Gap = </span> 
                                                {p.y} - {p.predictedY.toFixed(1)} = 
                                                <span className={p.error > 0 ? "text-green-400 font-bold" : "text-red-400 font-bold"}> {p.error.toFixed(1)}</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[9px] font-black text-white/20 uppercase mb-2">Squared</div>
                                            <div className="text-lg font-black text-white">
                                                {(p.error * p.error).toFixed(1)}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {points.length === 0 && (
                            <div className="flex h-64 flex-col items-center justify-center text-white/20 italic">
                                <Plus size={32} className="mb-4 opacity-20" />
                                Click the graph to add points
                            </div>
                        )}
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl border-l-4 border-l-cyan-400 shadow-2xl">
                         <div className="flex items-center gap-3 mb-4">
                            <Ruler size={16} className="text-cyan-400" />
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400" style={{ fontFamily: "'Press Start 2P', system-ui" }}>ELI5 Rule</h3>
                        </div>
                        <p className="text-sm leading-relaxed text-white/60 font-medium italic">
                            "The total error is like the volume of all the red gaps combined. To win, you must twist and move the blue line until all those red gaps are as tiny as possible!"
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
