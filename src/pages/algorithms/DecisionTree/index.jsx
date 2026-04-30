import { useState, useEffect, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Play, GraduationCap, Calculator, ListChecks, HelpCircle, Activity, GitBranch } from "lucide-react";
import Navbar from "../../../components/Navbar";
import DecisionTreePlayMode from "./DecisionTreePlayMode";
import DecisionTreeTeachMode from "./DecisionTreeTeachMode";
import DecisionTreeBreakMode from "./DecisionTreeBreakMode";

const DecisionTreeMath = lazy(() => import("../../../components/math-engine/DecisionTreeMath"));

export default function DecisionTree() {
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
                Decision <span className="bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 bg-clip-text text-transparent">Trees</span>
              </h1>
              <div className="max-w-3xl rounded-2xl border border-white/5 bg-white/[0.02] p-5 backdrop-blur-xl sm:rounded-3xl sm:p-8">
                <p className="text-base leading-7 text-white/70 italic sm:text-lg sm:leading-relaxed">
                  &ldquo;A Decision Tree is like a flowchart or a game of '20 Questions.' It asks simple Yes/No questions about your data until it narrows everything down to a final answer!&rdquo;
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
            <Suspense fallback={<div className="flex h-64 items-center justify-center text-cyan-400 animate-pulse uppercase tracking-[0.4em] font-black text-[10px]" style={{ fontFamily: "'Press Start 2P', system-ui" }}>Initializing Engine...</div>}>
              {activeTab === "play" && <DecisionTreePlayMode />}
              {activeTab === "teach" && <DecisionTreeTeachMode />}
              {activeTab === "math" && <DecisionTreeMath />}
              {activeTab === "break" && <DecisionTreeBreakMode />}
              {activeTab === "proscons" && <TreeProsCons />}
              {activeTab === "realworld" && <TreeRealWorld />}
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
}

function TreeProsCons() {
  const pros = [
    { title: "Interpretable", desc: "Results can be visualized and explained easily to non-experts." },
    { title: "No Prep", desc: "Works well without needing much data cleaning or scaling." },
    { title: "Handles All Data", desc: "Can manage both numbers and categories (like 'Sunny' vs 'Rainy')." },
  ];

  const cons = [
    { title: "Overfitting", desc: "Trees can grow too deep and 'memorize' the data rather than learning it." },
    { title: "Unstable", desc: "A tiny change in data can completely change the branching structure." },
    { title: "Biased", desc: "If one category is much larger than others, the tree will favor it." },
  ];

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-5 backdrop-blur-xl sm:rounded-3xl sm:p-8">
        <h3 className="mb-6 text-[10px] font-black uppercase text-green-400" style={{ fontFamily: "'Press Start 2P', system-ui" }}>Pros</h3>
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
        <h3 className="mb-6 text-[10px] font-black uppercase text-red-400" style={{ fontFamily: "'Press Start 2P', system-ui" }}>Cons</h3>
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

function TreeRealWorld() {
  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="relative flex-1 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:rounded-3xl sm:p-10">
        <div className="absolute top-0 right-0 p-8 opacity-10 text-white">
          <GitBranch size={100} />
        </div>
        <h3 className="mb-6 text-[10px] font-black text-orange-400 uppercase" style={{ fontFamily: "'Press Start 2P', system-ui" }}>Banks & Hospitals</h3>
        <p className="mb-6 text-lg text-white/70 leading-relaxed italic">
          "The Safety Path"
        </p>
        <p className="text-white/50 leading-relaxed">
          Banks use Decision Trees to approve loans: "Is Income &gt; $50k?" &rarr; "Is Credit Score &gt; 700?" &rarr; APPROVED. They are used wherever a human needs to understand *why* the AI made a choice.
        </p>
      </div>

      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:rounded-3xl sm:p-10">
        <h3 className="mb-8 text-[10px] font-black text-cyan-400 uppercase" style={{ fontFamily: "'Press Start 2P', system-ui" }}>Other Uses</h3>
        <ul className="space-y-6">
          <li className="flex items-start gap-4">
            <div className="mt-1 h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.8)]" />
            <p className="text-white/60 leading-relaxed"><span className="font-bold text-white block mb-1">HR Departments</span> Filtering candidates based on skills, experience, and certificates.</p>
          </li>
          <li className="flex items-start gap-4">
            <div className="mt-1 h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.8)]" />
            <p className="text-white/60 leading-relaxed"><span className="font-bold text-white block mb-1">Marketing</span> Segmenting customers based on geographic and demographic data.</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
