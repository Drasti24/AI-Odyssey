import { useState, useEffect, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Play, GraduationCap, Calculator, ListChecks, HelpCircle, Activity } from "lucide-react";
import Navbar from "../../../components/Navbar";
import KNNPlayMode from "./KNNPlayMode";
import KNNTeachMode from "./KNNTeachMode";
import KNNBreakMode from "./KNNBreakMode";

const KNNMath = lazy(() => import("../../../components/math-engine/KNNMath"));

export default function KNN() {
  const [activeTab, setActiveTab] = useState("play");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const tabs = [
    { id: "play", label: "Play Lab", icon: <Play size={16} /> },
    { id: "teach", label: "Teach Me", icon: <GraduationCap size={16} /> },
    { id: "math", label: "Mathematics", icon: <Calculator size={16} /> },
    { id: "break", label: "Step-by-Step", icon: <Activity size={16} /> },
    { id: "proscons", label: "Pros & Cons", icon: <ListChecks size={16} /> },
    { id: "realworld", label: "Real World", icon: <HelpCircle size={16} /> },
  ];

  return (
    <main className="min-h-screen bg-[#07070c] text-white">
      <Navbar />

      <section className="px-4 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32">
        <div className="mx-auto max-w-7xl">
          <header className="mb-12">
            <Link
              to="/algorithms"
              className="group mb-8 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 transition-colors hover:text-cyan-400"
              style={{ fontFamily: "'Press Start 2P', system-ui" }}
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back
            </Link>
            
            <div className="mt-8">
              <h1 className="mb-6 text-2xl font-black uppercase sm:text-4xl" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                K-Nearest <span className="text-cyan-400">Neighbors</span>
              </h1>
              <div className="max-w-3xl rounded-2xl border border-white/5 bg-white/[0.02] p-5 backdrop-blur-xl sm:rounded-3xl sm:p-8">
                <p className="text-base leading-7 text-white/70 italic sm:text-lg sm:leading-relaxed">
                  &ldquo;KNN is like asking your neighbors for advice. To classify a new point, we just look at the closest points already in the data and take a majority vote!&rdquo;
                </p>
              </div>
            </div>
          </header>

          {/* Tabs */}
          <div className="algo-tabs mb-10 flex w-full gap-2 overflow-x-auto rounded-2xl border border-white/5 bg-white/[0.03] p-2 sm:mb-12 sm:w-fit sm:flex-wrap sm:gap-3">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`algo-tab flex shrink-0 items-center gap-2 rounded-xl px-4 py-3 text-[9px] font-black uppercase tracking-widest transition-all sm:gap-3 sm:px-6 sm:text-[10px] ${
                  activeTab === t.id 
                    ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]" 
                    : "text-white/40 hover:text-white hover:bg-white/5"
                }`}
                style={{ fontFamily: "'Press Start 2P', system-ui" }}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {/* Active Mode */}
          <div className="min-h-[600px] animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Suspense fallback={<div className="flex h-64 items-center justify-center text-cyan-400 animate-pulse">Initializing Component...</div>}>
              {activeTab === "play" && <KNNPlayMode />}
              {activeTab === "teach" && <KNNTeachMode />}
              {activeTab === "math" && <KNNMath />}
              {activeTab === "break" && <KNNBreakMode />}
              {activeTab === "proscons" && <KNNProsCons />}
              {activeTab === "realworld" && <KNNRealWorld />}
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
}

function KNNProsCons() {
  const pros = [
    { title: "Simplicity", desc: "Easy to understand and implement. No training phase required." },
    { title: "Versatile", desc: "Can be used for both Classification and Regression." },
    { title: "Dynamic", desc: "Naturally handles multiple classes and adapts to new data easily." },
  ];

  const cons = [
    { title: "Slow Prediction", desc: "Must calculate distance to every point for every prediction." },
    { title: "Memory Heavy", desc: "Needs to store the entire dataset in memory to work." },
    { title: "Sensitive", desc: "Highly affected by outliers and irrelevant features (noise)." },
  ];

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-5 backdrop-blur-xl sm:rounded-3xl sm:p-8">
        <h3 className="mb-6 text-sm font-black uppercase text-green-400" style={{ fontFamily: "'Press Start 2P', system-ui" }}>Pros</h3>
        <div className="space-y-4">
          {pros.map((p, i) => (
            <div key={i} className="rounded-2xl border border-white/5 bg-black/40 p-5 sm:p-6">
              <h4 className="font-bold text-white mb-2">{p.title}</h4>
              <p className="text-sm text-white/50">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5 backdrop-blur-xl sm:rounded-3xl sm:p-8">
        <h3 className="mb-6 text-sm font-black uppercase text-red-400" style={{ fontFamily: "'Press Start 2P', system-ui" }}>Cons</h3>
        <div className="space-y-4">
          {cons.map((c, i) => (
            <div key={i} className="rounded-2xl border border-white/5 bg-black/40 p-5 sm:p-6">
              <h4 className="font-bold text-white mb-2">{c.title}</h4>
              <p className="text-sm text-white/50">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function KNNRealWorld() {
  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="relative flex-1 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:rounded-3xl sm:p-10">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </div>
        <h3 className="mb-6 text-2xl font-black text-cyan-400" style={{ fontFamily: "'Press Start 2P', system-ui", fontSize: '1rem' }}>Netflix & Amazon</h3>
        <p className="mb-6 text-lg text-white/70 leading-relaxed italic">
          "People who watched this also watched..."
        </p>
        <p className="text-white/50 leading-relaxed">
          Netflix and Amazon use KNN to find users with similar tastes. If your movie-watching history is "near" another user's history, the algorithm recommends the movies they liked to you.
        </p>

        <div className="mt-8 flex gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300 border border-cyan-400/20 font-black">N</div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-400/10 text-orange-400 border border-orange-400/20 font-black">A</div>
        </div>
      </div>

      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:rounded-3xl sm:p-10">
        <h3 className="mb-8 text-2xl font-black text-purple-400" style={{ fontFamily: "'Press Start 2P', system-ui", fontSize: '1rem' }}>Other Uses</h3>
        <ul className="space-y-6">
          <li className="flex items-start gap-4">
            <div className="mt-1 h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(167,139,250,0.8)]" />
            <p className="text-white/60 leading-relaxed"><span className="font-bold text-white block mb-1">Handwriting Recognition</span> Identifying letters based on shape similarity.</p>
          </li>
          <li className="flex items-start gap-4">
            <div className="mt-1 h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(167,139,250,0.8)]" />
            <p className="text-white/60 leading-relaxed"><span className="font-bold text-white block mb-1">Medical Diagnosis</span> Comparing patient symptoms to nearest medical cases.</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

