import { useState, useMemo } from "react";
import { motion } from "framer-motion";

export default function NeuralNetworkMath() {
    const [w1, setW1] = useState(0.5);
    const [w2, setW2] = useState(-0.3);
    const [bias, setBias] = useState(0.1);
    const [x1, setX1] = useState(0.8);
    const [x2, setX2] = useState(0.4);

    const math = useMemo(() => {
        const weightedSum = (x1 * w1) + (x2 * w2) + bias;
        const activation = 1 / (1 + Math.exp(-weightedSum));
        return { z: weightedSum.toFixed(2), a: activation.toFixed(2) };
    }, [w1, w2, bias, x1, x2]);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header: The Single Neuron */}
            <div className="math-panel rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-[10px] sm:text-sm font-black uppercase tracking-[0.2em] text-cyan-400" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                            The Perceptron
                        </h2>
                        <p className="mt-2 text-xs sm:text-base text-white/50">Weights, Biases, and Activation</p>
                    </div>
                    <div className="rounded-full bg-cyan-400/10 px-4 py-2 text-[8px] sm:text-[10px] font-black uppercase text-cyan-300" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                        Logic Level: 3
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center rounded-2xl bg-black/60 p-4 sm:p-6 border border-cyan-400/30 shadow-[0_0_50px_rgba(34,211,238,0.2)] hover:shadow-[0_0_70px_rgba(34,211,238,0.4)] transition-all duration-500 overflow-x-auto w-full">
                    <div className="text-xl sm:text-2xl md:text-3xl font-light text-white text-center flex items-center gap-2 sm:gap-3 whitespace-nowrap">
                        y = <span className="text-pink-400 font-bold">σ</span>( <span className="text-cyan-400 font-bold">Σ wᵢxᵢ</span> + <span className="text-purple-400 font-bold">b</span> )
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4 sm:gap-8 text-[7px] sm:text-[8px] font-black uppercase tracking-widest text-white/30">
                        <div className="text-right">σ = Sigmoid</div>
                        <div className="text-left">Σ wᵢxᵢ = Sum</div>
                    </div>
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
                {/* Neuron Simulator */}
                <div className="math-panel rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                    <h3 className="mb-6 sm:mb-8 text-[10px] sm:text-sm font-black uppercase tracking-[0.2em] text-purple-400" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                        Signal Simulator
                    </h3>
                    
                    <div className="touch-graph relative aspect-video min-h-[300px] w-full rounded-2xl border border-white/10 bg-black/40 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.05)_0%,transparent_70%)]" />

                        {/* Input Nodes */}
                        <div className="absolute left-10 flex flex-col gap-20">
                            {[x1, x2].map((x, i) => (
                                <div key={i} className="relative flex items-center justify-center">
                                    <div className="h-10 w-10 rounded-full border-2 border-white/20 bg-white/5 flex items-center justify-center text-xs font-bold text-white/60">
                                        x{i+1}
                                    </div>
                                    {/* Connection Line */}
                                    <svg className="absolute left-10 w-32 h-1 overflow-visible">
                                        <motion.line 
                                            x1="0" y1="0" x2="120" y2={i === 0 ? "40" : "-40"}
                                            stroke={i === 0 ? (w1 > 0 ? "#22d3ee" : "#f472b6") : (w2 > 0 ? "#22d3ee" : "#f472b6")}
                                            strokeWidth={Math.abs(i === 0 ? w1 : w2) * 10 + 1}
                                            className="opacity-60"
                                        />
                                    </svg>
                                </div>
                            ))}
                        </div>

                        {/* The Neuron */}
                        <motion.div 
                            className="relative z-10 h-24 w-24 rounded-full border-4 border-white/20 flex flex-col items-center justify-center transition-all duration-500"
                            style={{ 
                                backgroundColor: `rgba(34, 211, 238, ${math.a * 0.4})`,
                                boxShadow: `0 0 ${math.a * 60}px rgba(34, 211, 238, ${math.a * 0.8})`,
                                borderColor: math.a > 0.5 ? '#22d3ee' : 'rgba(255,255,255,0.2)'
                            }}
                        >
                            <div className="text-[10px] font-black text-white/40 uppercase">Output</div>
                            <div className="text-xl font-black text-white">{math.a}</div>
                        </motion.div>

                        <div className="absolute right-10 h-2 w-32 bg-gradient-to-r from-cyan-400 to-transparent rounded-full opacity-20" />
                    </div>

                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <label className="text-[9px] sm:text-[10px] font-black uppercase text-white/40 tracking-widest">Weight 1: {w1}</label>
                            <input type="range" min="-1" max="1" step="0.1" value={w1} onChange={e => setW1(parseFloat(e.target.value))} className="w-full accent-cyan-400 h-2 bg-white/5 rounded-lg appearance-none cursor-pointer" />
                            
                            <label className="text-[9px] sm:text-[10px] font-black uppercase text-white/40 tracking-widest">Weight 2: {w2}</label>
                            <input type="range" min="-1" max="1" step="0.1" value={w2} onChange={e => setW2(parseFloat(e.target.value))} className="w-full accent-purple-400 h-2 bg-white/5 rounded-lg appearance-none cursor-pointer" />
                        </div>
                        <div className="space-y-4">
                            <label className="text-[9px] sm:text-[10px] font-black uppercase text-white/40 tracking-widest">Bias (b): {bias}</label>
                            <input type="range" min="-1" max="1" step="0.1" value={bias} onChange={e => setBias(parseFloat(e.target.value))} className="w-full accent-pink-400 h-2 bg-white/5 rounded-lg appearance-none cursor-pointer" />
                            
                            <div className="p-3 sm:p-4 rounded-xl bg-black/20 text-[8px] sm:text-[9px] leading-relaxed text-white/40 border border-white/5">
                                Weights decide importance. Bias decides the "threshold" for firing.
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    {/* Math Breakdown */}
                    <div className="math-panel rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl flex-1">
                        <h3 className="mb-6 text-[10px] sm:text-sm font-black uppercase tracking-[0.2em] text-cyan-400" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                            The Flow
                        </h3>
                        
                        <div className="space-y-6">
                            <div className="rounded-xl bg-cyan-400/5 border border-cyan-400/20 p-6 shadow-lg">
                                <p className="text-[10px] font-black uppercase text-cyan-400/50 mb-3 tracking-widest text-center">Step 1: Weighted Sum (z)</p>
                                <div className="font-mono text-xl md:text-2xl text-center font-black text-white">
                                    ({x1}×{w1}) + ({x2}×{w2}) + {bias} = <span className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]">{math.z}</span>
                                </div>
                            </div>
                            <div className="rounded-xl bg-pink-400/5 border border-pink-400/20 p-6 shadow-lg">
                                <p className="text-[10px] font-black uppercase text-pink-400/50 mb-3 tracking-widest text-center">Step 2: Activation (a)</p>
                                <div className="font-mono text-xl md:text-2xl text-center font-black text-white">
                                    Sigmoid({math.z}) = <span className="text-pink-400 drop-shadow-[0_0_10px_rgba(244,114,182,0.4)]">{math.a}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ELI5 */}
                    <div className="math-panel rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                        <h3 className="mb-4 text-[10px] sm:text-sm font-black uppercase tracking-[0.2em] text-white/60" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                            ELI5
                        </h3>
                        <p className="text-sm leading-7 text-white/60 italic">
                            &ldquo;A neuron is like a judge in a talent show. Each contestant (input) has a score, but some judges care more about singing while others care more about dancing (weights). The judge adds it all up and decides if the performance was good enough to 'pass' them to the next round!&rdquo;
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
