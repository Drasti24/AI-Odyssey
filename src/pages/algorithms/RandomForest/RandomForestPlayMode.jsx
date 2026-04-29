import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trees, UserCheck, HelpCircle } from "lucide-react";

export default function RandomForestPlayMode() {
  const [votes, setVotes] = useState([]);
  const [isCasting, setIsCasting] = useState(false);

  const castVotes = () => {
    setIsCasting(true);
    setVotes([]);
    
    // Simulate 5 trees voting
    const newVotes = Array.from({ length: 5 }, () => Math.random() > 0.4 ? 'YES' : 'NO');
    
    newVotes.forEach((v, i) => {
      setTimeout(() => {
        setVotes(prev => [...prev, v]);
        if (i === 4) setIsCasting(false);
      }, (i + 1) * 400);
    });
  };

  const yesCount = votes.filter(v => v === 'YES').length;
  const noCount = votes.filter(v => v === 'NO').length;
  const finalWinner = yesCount > noCount ? 'YES' : 'NO';

  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="mb-4 text-2xl font-bold text-white">Play Mode</h3>
        <p className="mb-6 text-white/60">
          A Random Forest is a <b>Democracy</b> of Decision Trees. Instead of trusting one tree, we ask many and take the majority vote!
        </p>

        <button
          disabled={isCasting}
          onClick={castVotes}
          className="w-full rounded-xl bg-cyan-400 py-4 font-black uppercase tracking-widest text-black shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all hover:bg-cyan-300 active:scale-95 disabled:opacity-50"
        >
          {isCasting ? "🌳 Trees are voting..." : "🏡 Ask the Forest"}
        </button>

        <div className="mt-8 grid grid-cols-2 gap-4">
           <div className={`rounded-xl border p-4 transition-all ${votes.length > 0 && finalWinner === 'YES' ? 'border-green-400 bg-green-400/10' : 'border-white/5 opacity-40'}`}>
             <span className="block text-xs font-bold text-green-300">"YES" VOTES</span>
             <span className="text-3xl font-black">{yesCount}</span>
           </div>
           <div className={`rounded-xl border p-4 transition-all ${votes.length > 0 && finalWinner === 'NO' ? 'border-red-400 bg-red-400/10' : 'border-white/5 opacity-40'}`}>
             <span className="block text-xs font-bold text-red-300">"NO" VOTES</span>
             <span className="text-3xl font-black">{noCount}</span>
           </div>
        </div>
      </div>

      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6 h-[400px] flex flex-col items-center justify-center relative overflow-hidden">
        <div className="mb-8 flex gap-4">
          {[0, 1, 2, 3, 4].map(i => (
             <motion.div 
               key={i}
               animate={votes[i] ? { y: -10, scale: 1.1 } : {}}
               className={`flex h-14 w-14 items-center justify-center rounded-xl border ${
                 votes[i] === 'YES' ? 'border-green-400 bg-green-400/20 text-green-300' : 
                 votes[i] === 'NO' ? 'border-red-400 bg-red-400/20 text-red-400' :
                 'border-white/10 bg-white/5 text-white/20'
               }`}
             >
               <Trees size={24} />
             </motion.div>
          ))}
        </div>

        <div className="relative flex h-32 w-32 items-center justify-center">
            <AnimatePresence>
               {!votes.length && <HelpCircle size={48} className="text-white/20" />}
               {votes.length === 5 && (
                 <motion.div
                   initial={{ scale: 0, rotate: -45 }}
                   animate={{ scale: 1, rotate: 0 }}
                   className={`flex h-32 w-32 items-center justify-center rounded-full border-4 ${finalWinner === 'YES' ? 'border-green-400 bg-green-400/10 text-green-400' : 'border-red-400 bg-red-400/10 text-red-400'}`}
                 >
                   <span className="text-3xl font-black">{finalWinner}</span>
                 </motion.div>
               )}
            </AnimatePresence>
        </div>
        <p className="mt-6 text-sm font-bold text-white/40 uppercase tracking-widest">Final Forest Result</p>
      </div>
    </div>
  );
}
