import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Rocket, Play, Lock, Trophy, Zap, ShieldCheck, Key, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";

// ─── Chapter data for the episode grid ───
const chapters = [
  {
    id: 1,
    title: "The Netflix Episode",
    subtitle: "How Netflix Recommends What You Watch",
    algorithm: "K-Nearest Neighbors",
    path: "/playground/chapter-1",
    color: "red",
  },
  {
    id: 2,
    title: "The Real Estate Episode",
    subtitle: "Predicting House Prices",
    algorithm: "Linear Regression",
    path: "/playground/chapter-2",
    color: "emerald",
  },
  {
    id: 3,
    title: "The Doctor Episode",
    subtitle: "Diagnosing Patients Step-by-Step",
    algorithm: "Decision Tree",
    path: "/playground/chapter-3",
    color: "indigo",
  },
  {
    id: 4,
    title: "The Weather Episode",
    subtitle: "Will It Rain Today?",
    algorithm: "Logistic Regression",
    path: "/playground/chapter-4",
    color: "purple",
  },
  {
    id: 5,
    title: "The FaceID Episode",
    subtitle: "How Your Phone Knows It's You",
    algorithm: "Neural Network",
    path: "/playground/chapter-5",
    color: "orange",
  },
];

export default function Playground() {
  const [progress, setProgress] = useState({
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [adminCreds, setAdminCreds] = useState({ id: "", pass: "" });

  useEffect(() => {
    const saved = localStorage.getItem("ai_odyssey_progress");
    if (saved) setProgress(JSON.parse(saved));
    
    const adminStatus = localStorage.getItem("ai_odyssey_admin") === "true";
    setIsAdmin(adminStatus);
  }, []);

  const totalScore = Object.values(progress).reduce((a, b) => a + b, 0);

  const isUnlocked = (id) => {
    if (isAdmin) return true;
    if (id === 1) return true;
    const prevScore = progress[id - 1] || 0;
    return prevScore >= 80;
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminCreds.id === "admin" && adminCreds.pass === "password") {
      setIsAdmin(true);
      localStorage.setItem("ai_odyssey_admin", "true");
      setShowAdminForm(false);
    } else {
      alert("Invalid Credentials");
    }
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    localStorage.removeItem("ai_odyssey_admin");
  };

  return (
    <main className="min-h-screen bg-[#07070c] text-white">
      <Navbar />
      <section className="px-8 pt-32 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-white/40 transition-colors hover:text-cyan-400"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
              
              {isAdmin ? (
                <button onClick={logoutAdmin} className="flex items-center gap-2 rounded-full bg-orange-500/10 px-3 py-1 text-[10px] font-black text-orange-400 border border-orange-500/20 uppercase tracking-widest">
                  <ShieldCheck size={12} /> Admin Mode (Logout)
                </button>
              ) : (
                <button onClick={() => setShowAdminForm(true)} className="text-[10px] font-black text-white/10 uppercase tracking-widest hover:text-white/30 transition-colors">
                  System Access
                </button>
              )}
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Total Experience</span>
                <span className="text-2xl font-black text-white">{isAdmin ? "∞" : totalScore} <span className="text-orange-500">XP</span></span>
              </div>
              <div className="h-10 w-10 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                <Trophy size={20} className="text-orange-400" />
              </div>
            </div>
          </div>

          {/* Admin Login Modal */}
          <AnimatePresence>
            {showAdminForm && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-6"
              >
                <motion.div 
                  initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                  className="max-w-sm w-full rounded-3xl border border-white/10 bg-[#121218] p-8 shadow-2xl"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-sm font-black uppercase tracking-widest text-white/40">Secure Entry</h3>
                    <button onClick={() => setShowAdminForm(false)} className="text-white/20 hover:text-white"><X size={20} /></button>
                  </div>
                  <form onSubmit={handleAdminLogin} className="space-y-4">
                    <div>
                      <label className="text-[10px] font-bold text-white/30 uppercase mb-1 block">Agent ID</label>
                      <input 
                        type="text" 
                        value={adminCreds.id}
                        onChange={(e) => setAdminCreds({...adminCreds, id: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-orange-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-white/30 uppercase mb-1 block">Access Key</label>
                      <input 
                        type="password" 
                        value={adminCreds.pass}
                        onChange={(e) => setAdminCreds({...adminCreds, pass: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-orange-500 outline-none"
                      />
                    </div>
                    <button className="w-full bg-orange-500 py-3 rounded-xl font-black text-black text-sm uppercase tracking-widest hover:bg-orange-400 transition-colors flex items-center justify-center gap-2">
                      <Key size={16} /> Override
                    </button>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Header */}
          <div className="mb-16 text-center">
            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-red-500 to-purple-600 p-1 shadow-[0_0_30px_rgba(239,68,68,0.3)]">
              <div className="flex h-full w-full items-center justify-center rounded-[20px] bg-[#07070c]">
                <Rocket size={36} className="text-red-400" />
              </div>
            </div>

            <h1 
              className="mb-4 text-3xl font-black md:text-5xl uppercase tracking-tighter"
              style={{ fontFamily: "'Press Start 2P', system-ui", lineHeight: '1.4' }}
            >
              The{" "}
              <span className="bg-gradient-to-r from-red-400 via-white to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                Playground
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-white/50 leading-relaxed">
              Unlock the Odyssey. Earn 80+ points to progress.
              Reach <span className="text-orange-400 font-bold">400 XP</span> for the Boss Level.
            </p>
          </div>

          {/* Chapter Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {chapters.map((ch, index) => {
              const unlocked = isUnlocked(ch.id);
              const score = progress[ch.id] || 0;
              const colors = {
                red: { border: "border-red-500/20", bg: "bg-gradient-to-br from-red-500/10 to-transparent", hoverBorder: "hover:border-red-500/40", shadow: "hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]", via: "via-red-500", text: "text-red-400", hoverText: "group-hover:text-red-300", btnBg: "bg-red-600", btnShadow: "shadow-[0_0_15px_rgba(220,38,38,0.4)]", btnHover: "group-hover:shadow-[0_0_20px_rgba(220,38,38,0.6)]" },
                emerald: { border: "border-emerald-500/20", bg: "bg-gradient-to-br from-emerald-500/10 to-transparent", hoverBorder: "hover:border-emerald-500/40", shadow: "hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]", via: "via-emerald-500", text: "text-emerald-400", hoverText: "group-hover:text-emerald-300", btnBg: "bg-emerald-600", btnShadow: "shadow-[0_0_15px_rgba(16,185,129,0.4)]", btnHover: "group-hover:shadow-[0_0_20px_rgba(16,185,129,0.6)]" },
                indigo: { border: "border-indigo-500/20", bg: "bg-gradient-to-br from-indigo-500/10 to-transparent", hoverBorder: "hover:border-indigo-500/40", shadow: "hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]", via: "via-indigo-500", text: "text-indigo-400", hoverText: "group-hover:text-indigo-300", btnBg: "bg-indigo-600", btnShadow: "shadow-[0_0_15px_rgba(99,102,241,0.4)]", btnHover: "group-hover:shadow-[0_0_20px_rgba(99,102,241,0.6)]" },
                purple: { border: "border-purple-500/20", bg: "bg-gradient-to-br from-purple-500/10 to-transparent", hoverBorder: "hover:border-purple-500/40", shadow: "hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]", via: "via-purple-500", text: "text-purple-400", hoverText: "group-hover:text-purple-300", btnBg: "bg-purple-600", btnShadow: "shadow-[0_0_15px_rgba(168,85,247,0.4)]", btnHover: "group-hover:shadow-[0_0_20px_rgba(168,85,247,0.6)]" },
                orange: { border: "border-orange-500/20", bg: "bg-gradient-to-br from-orange-500/10 to-transparent", hoverBorder: "hover:border-orange-500/40", shadow: "hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]", via: "via-orange-500", text: "text-orange-400", hoverText: "group-hover:text-orange-300", btnBg: "bg-orange-600", btnShadow: "shadow-[0_0_15px_rgba(249,115,22,0.4)]", btnHover: "group-hover:shadow-[0_0_20px_rgba(249,115,22,0.6)]" },
              };
              const c = colors[ch.color] || colors.red;

              return (
                <motion.div
                  key={ch.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {unlocked ? (
                    <Link to={ch.path} className="block group">
                      <div className={`relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:scale-[1.02] ${c.border} ${c.bg} ${c.hoverBorder} ${c.shadow}`}>
                        <div className={`h-0.5 absolute top-0 left-0 right-0 bg-gradient-to-r from-transparent to-transparent ${c.via}`} />
                        <div className="mb-4 flex items-center justify-between">
                          <span className={`text-xs font-bold uppercase tracking-widest ${c.text}`}>Chapter {ch.id}</span>
                          <div className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${score > 0 ? "bg-green-500/10 text-green-400" : "bg-blue-500/10 text-blue-400"}`}>
                            {score > 0 ? (
                              <><Trophy className="h-3 w-3" /> {score} pts</>
                            ) : (
                              <><Play className="h-3 w-3" /> Start</>
                            )}
                          </div>
                        </div>
                        <h3 className={`mb-1 text-xl font-black text-white transition-colors ${c.hoverText}`}>{ch.title}</h3>
                        <p className="mb-4 text-sm text-white/40">{ch.subtitle}</p>
                        <div className="flex items-center justify-between">
                          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-white/50">{ch.algorithm}</span>
                          <div className={`flex h-8 w-8 items-center justify-center rounded-full text-white transition-shadow ${c.btnBg} ${c.btnShadow} ${c.btnHover}`}>
                            <Play className="h-3.5 w-3.5 fill-white" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-6 opacity-40 grayscale">
                      <div className="mb-4 flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-widest text-white/30">Chapter {ch.id}</span>
                        <div className="flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-xs font-bold text-white/30">
                          <Lock className="h-3 w-3" /> Locked
                        </div>
                      </div>
                      <h3 className="mb-1 text-xl font-black text-white/40">{ch.title}</h3>
                      <p className="mb-4 text-sm text-white/20">Clear Chapter {ch.id - 1} with 80+ pts to unlock.</p>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/20">
                        <Lock className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}

            {/* Final Boss Chapter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className={`relative overflow-hidden rounded-3xl border-2 p-8 transition-all duration-500 ${(totalScore >= 400 || isAdmin) ? "border-amber-500/50 bg-amber-500/5 shadow-[0_0_50px_rgba(245,158,11,0.1)]" : "border-white/5 bg-white/[0.02] opacity-40"}`}>
                <div className="absolute -right-8 -top-8 rotate-12 opacity-10">
                  <Zap size={120} className={(totalScore >= 400 || isAdmin) ? "text-amber-500" : "text-white"} />
                </div>
                
                <div className="mb-6 flex items-center justify-between">
                  <div className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${(totalScore >= 400 || isAdmin) ? "bg-amber-500 text-black" : "bg-white/10 text-white/40"}`}>
                    Final Episode
                  </div>
                  {!(totalScore >= 400 || isAdmin) && (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-500/60">
                      <Lock size={14} /> Unlocks at 400 XP
                    </div>
                  )}
                </div>

                <h3 className={`mb-2 text-3xl font-black ${(totalScore >= 400 || isAdmin) ? "text-amber-400" : "text-white/20"}`}>The Boss: General Intelligence</h3>
                <p className="mb-6 text-sm text-white/40">The ultimate test of all algorithms. Can you beat the machine?</p>
                
                <div className="inline-flex items-center gap-2 rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-xs font-black text-amber-500">
                  COMING SOON
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
