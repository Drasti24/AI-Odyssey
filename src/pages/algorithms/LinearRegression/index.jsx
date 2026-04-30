import { useState, useEffect, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Play, GraduationCap, Calculator, ListChecks, HelpCircle, Activity } from "lucide-react";
import Navbar from "../../../components/Navbar";
import LinearRegressionPlayMode from "./LinearRegressionPlayMode";
import LinearRegressionTeachMode from "./LinearRegressionTeachMode";
import LinearRegressionBreakMode from "./LinearRegressionBreakMode";

const LinearRegressionMath = lazy(() => import("../../../components/math-engine/LinearRegressionMath"));

export default function LinearRegression() {
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
                Linear <span className="bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 bg-clip-text text-transparent">Regression</span>
              </h1>
              <div className="max-w-3xl rounded-2xl border border-white/5 bg-white/[0.02] p-5 backdrop-blur-xl sm:rounded-3xl sm:p-8">
                <p className="text-base leading-7 text-white/70 italic sm:text-lg sm:leading-relaxed">
                  &ldquo;Linear Regression is like drawing the best-fit line through a bunch of dots. It helps you predict a number based on a trend!&rdquo;
                </p>
              </div>
            </div>
          </header>

          {/* Tabs */}
          <div className="mb-10 flex w-full gap-2 overflow-x-auto rounded-2xl border border-white/5 bg-white/[0.03] p-2 sm:mb-12 sm:w-fit sm:flex-wrap sm:gap-3">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-3 text-[9px] font-black uppercase tracking-widest transition-all sm:gap-3 sm:px-6 sm:text-[10px] ${
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
              {activeTab === "play" && <LinearRegressionPlayMode />}
              {activeTab === "teach" && <LinearRegressionTeachMode />}
              {activeTab === "math" && <LinearRegressionMath />}
              {activeTab === "break" && <LinearRegressionBreakMode />}
              {activeTab === "proscons" && <LinearProsCons />}
              {activeTab === "realworld" && <LinearRealWorld />}
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
}

function LinearProsCons() {
  const pros = [
    { title: "Transparency", desc: "Highly interpretable. You can see exactly how each feature affects the outcome." },
    { title: "Efficiency", desc: "Extremely fast to train and use, even on massive datasets." },
    { title: "Baseline", desc: "Great 'first' model to try before using more complex ones." },
  ];

  const cons = [
    { title: "Linearity", desc: "It assumes a straight-line relationship, which is rare in real life." },
    { title: "Outliers", desc: "One bad data point far from the line can ruin the whole model." },
    { title: "Independence", desc: "Assumes features don't interact with each other, which is often false." },
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

function LinearRealWorld() {
  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="relative flex-1 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:rounded-3xl sm:p-10">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
        </div>
        <h3 className="mb-6 text-2xl font-black text-purple-400" style={{ fontFamily: "'Press Start 2P', system-ui", fontSize: '1rem' }}>Uber & Zillow</h3>
        <p className="mb-6 text-lg text-white/70 leading-relaxed italic">
          "How much will this cost?"
        </p>
        <p className="text-white/50 leading-relaxed">
          Uber uses linear models to estimate arrival times and prices. Zillow uses regression to calculate the "Zestimate" of your home by looking at size, local trends, and number of bedrooms.
        </p>
        <div className="mt-8 flex gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-400/10 text-purple-400 border border-purple-400/20 font-black">U</div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-400/10 text-blue-400 border border-blue-400/20 font-black">Z</div>
        </div>
      </div>

      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:rounded-3xl sm:p-10">
        <h3 className="mb-8 text-2xl font-black text-cyan-400" style={{ fontFamily: "'Press Start 2P', system-ui", fontSize: '1rem' }}>Other Uses</h3>
        <ul className="space-y-6">
          <li className="flex items-start gap-4">
            <div className="mt-1 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
            <p className="text-white/60 leading-relaxed"><span className="font-bold text-white block mb-1">Stock Prediction</span> Predicting future prices based on historical trends.</p>
          </li>
          <li className="flex items-start gap-4">
            <div className="mt-1 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
            <p className="text-white/60 leading-relaxed"><span className="font-bold text-white block mb-1">Marketing</span> Estimating how many sales you'll get based on ad spend.</p>
          </li>
        </ul>
      </div>
    </div>
  );
}


