import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function NNPlayMode() {
  const [pulse, setPulse] = useState(0);

  const handleFire = () => {
    setPulse(prev => prev + 1);
  };

  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="mb-4 text-2xl font-bold text-white">Play Mode</h3>
        <p className="mb-6 text-white/60">
          Neural Networks process info through layers of connected 'neurons'. Click 'Fire Signal' to watch how data travels from sensors (input) to decision (output)!
        </p>

        <button
          onClick={handleFire}
          className="w-full rounded-xl bg-cyan-400 py-4 font-black uppercase tracking-widest text-black shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all hover:bg-cyan-300 active:scale-95"
        >
          🔥 Fire Signal
        </button>

        <div className="mt-8 space-y-4">
           <div className="rounded-xl bg-black/40 p-4 border border-white/5">
             <span className="block text-xs font-bold text-white/40 uppercase">Architecture</span>
             <span className="text-white text-sm font-medium">3 Input → 4 Hidden → 2 Output</span>
           </div>
        </div>
      </div>

      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6 h-[400px] flex items-center justify-center relative overflow-hidden">
        <svg viewBox="0 0 100 80" className="w-full h-full">
           {/* Connections Layer 1-2 */}
           {[0, 1, 2].map(i => [0, 1, 2, 3].map(j => (
             <line 
                key={`c1-${i}-${j}`} 
                x1="10" y1={20 + i * 20} 
                x2="50" y2={10 + j * 20} 
                stroke="white" strokeWidth="0.3" strokeOpacity="0.1" 
             />
           )))}

           {/* Connections Layer 2-3 */}
           {[0, 1, 2, 3].map(i => [0, 1].map(j => (
             <line 
                key={`c2-${i}-${j}`} 
                x1="50" y1={10 + i * 20} 
                x2="90" y2={30 + j * 20} 
                stroke="white" strokeWidth="0.3" strokeOpacity="0.1" 
             />
           )))}

           {/* Pulse Animation */}
           <AnimatePresence>
             {pulse > 0 && (
               <>
                 {/* Signal 1 */}
                 {[0, 1, 2].map(i => (
                    <motion.circle
                        key={`p1-${pulse}-${i}`}
                        r="1.5" fill="#22d3ee"
                        initial={{ cx: 10, cy: 20 + i * 20, opacity: 0 }}
                        animate={{ cx: 50, cy: 40, opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                    />
                 ))}
                 {/* Signal 2 (delayed) */}
                 {[0, 1, 2, 3].map(i => (
                    <motion.circle
                        key={`p2-${pulse}-${i}`}
                        r="1.5" fill="#a78bfa"
                        initial={{ cx: 50, cy: 10 + i * 20, opacity: 0 }}
                        animate={{ cx: 90, cy: 40, opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 1, delay: 0.8, ease: "easeInOut" }}
                    />
                 ))}
               </>
             )}
           </AnimatePresence>

           {/* Neurons Layer 1 */}
           {[0, 1, 2].map(i => (
             <circle key={`l1-${i}`} cx="10" cy={20 + i * 20} r="4" fill="#07070c" stroke="white" strokeWidth="1" />
           ))}

           {/* Neurons Layer 2 */}
           {[0, 1, 2, 3].map(i => (
             <circle key={`l2-${i}`} cx="50" cy={10 + i * 20} r="4" fill="#07070c" stroke="#22d3ee" strokeWidth="1.5" />
           ))}

           {/* Neurons Layer 3 */}
           {[0, 1].map(i => (
             <circle key={`l3-${i}`} cx="90" cy={30 + i * 20} r="4" fill="#07070c" stroke="#a78bfa" strokeWidth="1.5" />
           ))}
        </svg>
      </div>
    </div>
  );
}
