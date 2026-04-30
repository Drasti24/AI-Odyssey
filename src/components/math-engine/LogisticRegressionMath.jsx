import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Info, Calculator, Waves, Target, Percent } from "lucide-react";

export default function LogisticRegressionMath() {
    const [testVal, setTestVal] = useState(50);
    const [threshold, setThreshold] = useState(0.5);
    const [steepness, setSteepness] = useState(0.2); 
    const [midpoint, setMidpoint] = useState(50);

    const sigmoid = (x) => 1 / (1 + Math.exp(-steepness * (x - midpoint)));
    const probability = useMemo(() => sigmoid(testVal), [testVal, steepness, midpoint]);
    const prediction = probability >= threshold ? "Pass" : "Fail";

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-7xl mx-auto">
            
            {/* 1. TOP: The Equation Section */}
            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 backdrop-blur-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-pink-500/10 to-transparent pointer-events-none" />
                <div className="relative z-10 text-center">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-pink-400 mb-8" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                        The Sigmoid Function
                    </h2>
                    <div className="inline-flex flex-col md:flex-row items-center justify-center gap-6 bg-black/60 p-6 rounded-2xl border border-pink-400/30 shadow-[0_0_50px_rgba(244,114,182,0.2)] hover:shadow-[0_0_70px_rgba(244,114,182,0.4)] transition-all duration-500 group-hover:scale-105">
                        <div className="text-2xl md:text-4xl font-black text-white tracking-tighter flex items-center gap-4">
                            P = <div className="inline-flex flex-col items-center">
                                <span className="border-b-2 border-white/80 pb-1 px-4">1</span>
                                <span className="pt-1 text-2xl md:text-4xl">1 + e⁻ᶻ</span>
                            </div>
                        </div>
                    </div>
                    <p className="mt-8 text-sm text-white/30 tracking-[0.2em] font-medium uppercase">
                        Converting Real Numbers into Probability (0 to 1)
                    </p>
                </div>
            </section>

            {/* 2. MIDDLE: Side-by-Side */}
            <div className="grid gap-6 lg:grid-cols-2">
                
                {/* LEFT: Calculations Tab */}
                <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl flex flex-col h-[600px]">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <Calculator size={20} className="text-pink-400" />
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-pink-400" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                                Probability Log
                            </h3>
                        </div>
                        <div className="text-[8px] font-black uppercase text-white/30 tracking-widest">Sigmoid Calc</div>
                    </div>

                    <div className="flex-1 space-y-4 overflow-y-auto pr-4 custom-scrollbar">
                        <div className="p-8 rounded-3xl bg-black/40 border-2 border-white/5 space-y-6 shadow-xl">
                            <div className="flex justify-between items-end">
                                <div className="space-y-2">
                                    <div className="text-[8px] font-black uppercase text-white/20 tracking-widest">Input (z)</div>
                                    <div className="text-6xl font-black text-white tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">{testVal}</div>
                                </div>
                                <div className="text-right space-y-2">
                                    <div className="text-[8px] font-black uppercase text-white/20 tracking-widest">Exponent</div>
                                    <div className="text-3xl font-black text-pink-400 font-mono drop-shadow-[0_0_10px_rgba(244,114,182,0.4)]">-{(steepness * (testVal - midpoint)).toFixed(2)}</div>
                                </div>
                            </div>
                            
                            <div className="h-px bg-white/10 w-full" />
                            
                            <div className="space-y-4">
                                <div className="text-[8px] font-black uppercase text-white/20 tracking-widest">Live Sigmoid Step</div>
                                <div className="space-y-3 font-mono text-xl bg-white/[0.02] p-6 rounded-2xl border border-white/5 text-center">
                                    <div className="text-pink-400 font-black">
                                        1 / (1 + e<sup className="text-xs">{(steepness * (testVal - midpoint) * -1).toFixed(2)}</sup>)
                                    </div>
                                    <div className="text-3xl text-white font-black pt-2 border-t border-white/5">
                                        = {probability.toFixed(4)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto p-10 rounded-[40px] bg-white/5 border-2 border-dashed border-white/10 flex flex-col items-center justify-center relative overflow-hidden group">
                             <div className="absolute inset-0 bg-pink-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
                             <div className="text-[10px] font-black uppercase text-white/20 mb-2">Likelihood Score</div>
                             <div className="text-7xl font-black text-pink-400 drop-shadow-[0_0_20px_rgba(244,114,182,0.3)]">{(probability * 100).toFixed(1)}%</div>
                             <div className="mt-4 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Predicted Confidence</div>
                        </div>
                    </div>
                </section>

                {/* RIGHT: Visual S-Curve */}
                <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl h-[600px] flex flex-col relative group">
                    <div className="flex items-center justify-between mb-8 relative z-20">
                        <div className="flex items-center gap-3">
                            <Waves size={20} className="text-cyan-400" />
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                                Visualization
                            </h3>
                        </div>
                    </div>

                    <div className="flex-1 relative bg-[#050508] rounded-3xl border border-white/10 overflow-hidden p-8 flex items-center justify-center shadow-inner">
                        <svg viewBox="0 0 100 100" className="w-full h-full preserve-3d overflow-visible">
                            <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="0.1" opacity="0.1" />
                            <line x1="50" y1="0" x2="50" y2="100" stroke="white" strokeWidth="0.1" opacity="0.1" />
                            
                            <path 
                                d={`M ${Array.from({length: 101}, (_, i) => `${i},${100 - (1 / (1 + Math.exp(-steepness * (i - midpoint)))) * 100}`).join(' L ')}`}
                                fill="none"
                                stroke="#22d3ee"
                                strokeWidth="2.5"
                                className="drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]"
                            />

                            <motion.circle 
                                cx={testVal}
                                cy={100 - (probability * 100)}
                                r="4"
                                fill="#f472b6"
                                className="drop-shadow-[0_0_10px_#f472b6]"
                            />
                            
                            <line 
                                x1="0" y1={100 - threshold * 100} 
                                x2="100" y2={100 - threshold * 100} 
                                stroke="#f472b6" 
                                strokeWidth="1" 
                                strokeDasharray="4 4" 
                                opacity="0.4" 
                            />
                        </svg>
                        
                        <div className="absolute top-1/2 left-10 text-[8px] font-black text-white/10 uppercase tracking-widest [writing-mode:vertical-lr]">Probability</div>
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[8px] font-black text-white/10 uppercase tracking-widest">Input Value (z)</div>
                    </div>

                    <div className="mt-8 space-y-6">
                        <div className="flex justify-between text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">
                            <span>Adjust Input (z)</span>
                            <span className="text-pink-400">Value: {testVal}</span>
                        </div>
                        <input type="range" min="0" max="100" value={testVal} onChange={e => setTestVal(parseInt(e.target.value))} className="w-full accent-pink-500 h-2" />
                        
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <div className="text-[8px] font-black uppercase text-white/20 tracking-widest text-center">Curve Steepness</div>
                                <input type="range" min="0.05" max="0.5" step="0.01" value={steepness} onChange={e => setSteepness(parseFloat(e.target.value))} className="w-full accent-cyan-400 h-1" />
                            </div>
                            <div className="space-y-2">
                                <div className="text-[8px] font-black uppercase text-white/20 tracking-widest text-center">Decision Threshold</div>
                                <input type="range" min="0.1" max="0.9" step="0.05" value={threshold} onChange={e => setThreshold(parseFloat(e.target.value))} className="w-full accent-pink-400 h-1" />
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* 3. BOTTOM: The Verdict */}
            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 backdrop-blur-2xl">
                <div className="grid gap-8 lg:grid-cols-3 items-center">
                    
                    <div className="lg:col-span-1 space-y-6">
                        <div className="flex items-center gap-3">
                            <Target size={20} className="text-cyan-400" />
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40" style={{ fontFamily: "'Press Start 2P', system-ui" }}>Threshold Check</h3>
                        </div>
                        <div className="p-8 rounded-3xl bg-black/40 border border-white/5 space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black text-white/40 uppercase">Confidence</span>
                                <span className="text-2xl font-black text-white">{(probability * 100).toFixed(1)}%</span>
                            </div>
                            <div className="h-px bg-white/10 w-full" />
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black text-white/40 uppercase">Boundary</span>
                                <span className="text-2xl font-black text-white">{(threshold * 100).toFixed(0)}%</span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1 flex flex-col items-center justify-center p-12 rounded-[50px] border-8 border-white/5 bg-black/60 relative overflow-hidden group">
                        <div className="text-[10px] font-black uppercase text-pink-400 mb-6 tracking-widest">Final Status</div>
                        <motion.div 
                            key={prediction}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className={`text-5xl font-black uppercase tracking-[0.2em] ${prediction === 'Pass' ? 'text-green-400' : 'text-red-500'}`}
                            style={{ fontFamily: "'Press Start 2P', system-ui" }}
                        >
                            {prediction}
                        </motion.div>
                        <div className="mt-8 px-8 py-2 rounded-full bg-white/5 text-[10px] font-black text-white/40 uppercase tracking-widest italic">
                            Binary Classification Result
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
                            "Logistic Regression is a 'Smasher'. It takes any number (z) and smashes it into a probability between 0 and 100%. If it clears the bar, it's a PASS!"
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}
