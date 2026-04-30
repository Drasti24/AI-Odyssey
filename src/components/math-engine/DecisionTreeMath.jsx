import { useState, useMemo } from "react";
import { motion } from "framer-motion";

const POINTS = [
    { x: 20, y: 30, type: "red" }, { x: 25, y: 40, type: "red" }, { x: 30, y: 20, type: "red" },
    { x: 70, y: 70, type: "blue" }, { x: 75, y: 80, type: "blue" }, { x: 80, y: 60, type: "blue" },
    { x: 40, y: 50, type: "red" }, { x: 60, y: 50, type: "blue" }
];

export default function DecisionTreeMath() {
    const [splitValue, setSplitValue] = useState(50);
    const [splitType, setSplitType] = useState("x"); // 'x' for vertical, 'y' for horizontal

    const metrics = useMemo(() => {
        const left = POINTS.filter(p => splitType === "x" ? p.x < splitValue : p.y < splitValue);
        const right = POINTS.filter(p => splitType === "x" ? p.x >= splitValue : p.y >= splitValue);

        const calcGini = (group) => {
            if (group.length === 0) return 0;
            const redCount = group.filter(p => p.type === "red").length;
            const blueCount = group.filter(p => p.type === "blue").length;
            const p1 = redCount / group.length;
            const p2 = blueCount / group.length;
            return (1 - (p1 * p1 + p2 * p2)).toFixed(3);
        };

        return {
            leftGini: calcGini(left),
            rightGini: calcGini(right),
            leftCount: left.length,
            rightCount: right.length
        };
    }, [splitValue, splitType]);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header: The Concept */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-cyan-400" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                            The Splitting Logic
                        </h2>
                        <p className="mt-2 text-white/50">Gini Impurity — Measuring Messiness</p>
                    </div>
                    <div className="rounded-full bg-cyan-400/10 px-4 py-2 text-[10px] font-black uppercase text-cyan-300" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                        Logic Level: 2
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center rounded-2xl bg-black/40 p-10">
                    <div className="text-4xl font-light text-white text-center">
                        Gini = 1 - Σ (pᵢ)²
                    </div>
                    <p className="mt-6 text-sm text-white/40 max-w-lg text-center">
                        A group is "Pure" (Gini = 0) if all items are the same color. It is "Impure" if it's a messy mix. The tree wants to find the cleanest splits.
                    </p>
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
                {/* Interaction */}
                <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                    <div className="mb-6 flex items-center justify-between">
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-purple-400" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                            Split Simulator
                        </h3>
                        <button 
                            onClick={() => setSplitType(splitType === "x" ? "y" : "x")}
                            className="text-[8px] font-black uppercase text-white/40 border border-white/10 px-3 py-2 rounded-lg hover:bg-white/5"
                            style={{ fontFamily: "'Press Start 2P', system-ui" }}
                        >
                            Rotate Split ({splitType === "x" ? "Vertical" : "Horizontal"})
                        </button>
                    </div>
                    
                    <div className="relative aspect-square w-full rounded-2xl border border-white/10 bg-black/40 overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
                        
                        {/* The Split Line */}
                        <motion.div 
                            className={`absolute bg-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.3)] z-10 ${splitType === "x" ? 'h-full w-1 top-0' : 'w-full h-1 left-0'}`}
                            style={splitType === "x" ? { left: `${splitValue}%` } : { top: `${splitValue}%` }}
                        />

                        {/* Points */}
                        {POINTS.map((p, i) => (
                            <div 
                                key={i}
                                className={`absolute -translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full ${p.type === "red" ? 'bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.4)]' : 'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.4)]'}`}
                                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                            />
                        ))}
                    </div>

                    <div className="mt-8">
                        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-white/60">
                            <span>Split Value: {splitValue}</span>
                            <span className="text-cyan-400">Decision Threshold</span>
                        </div>
                        <input 
                            type="range" min="0" max="100" step="1" value={splitValue}
                            onChange={(e) => setSplitValue(parseInt(e.target.value))}
                            className="mt-4 w-full accent-cyan-400"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    {/* Metrics */}
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl flex-1">
                        <h3 className="mb-6 text-sm font-black uppercase tracking-[0.2em] text-pink-400" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                            Impurity Stats
                        </h3>
                        
                        <div className="grid gap-4">
                            <div className="rounded-2xl bg-black/40 p-6 border border-white/5">
                                <p className="text-[10px] font-black uppercase text-white/40 mb-2 tracking-widest">Left / Top Group</p>
                                <div className="text-2xl font-black text-white">{metrics.leftGini} <span className="text-xs font-normal text-white/30">Gini</span></div>
                                <div className="mt-2 text-xs text-white/50">{metrics.leftCount} items found here</div>
                            </div>
                            <div className="rounded-2xl bg-black/40 p-6 border border-white/5">
                                <p className="text-[10px] font-black uppercase text-white/40 mb-2 tracking-widest">Right / Bottom Group</p>
                                <div className="text-2xl font-black text-white">{metrics.rightGini} <span className="text-xs font-normal text-white/30">Gini</span></div>
                                <div className="mt-2 text-xs text-white/50">{metrics.rightCount} items found here</div>
                            </div>
                        </div>

                        <div className="mt-6 p-4 rounded-xl bg-cyan-400/5 border border-cyan-400/20 text-[10px] leading-relaxed text-cyan-300/80">
                            PRO TIP: The tree tries thousands of splits and picks the one where the TOTAL Gini is the lowest.
                        </div>
                    </div>

                    {/* ELI5 */}
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                        <h3 className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-white/60" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                            ELI5
                        </h3>
                        <p className="text-sm leading-7 text-white/60 italic">
                            &ldquo;A decision tree is just like a game of 20 Questions. 'Is the animal big?' 'Does it have stripes?' Every time you ask a question, you are splitting the world into two smaller groups until you are left with just one answer!&rdquo;
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
