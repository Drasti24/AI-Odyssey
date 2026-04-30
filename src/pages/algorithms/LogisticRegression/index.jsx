import { useState, useEffect, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Play, GraduationCap, Calculator, ListChecks, HelpCircle, Activity, Target } from "lucide-react";
import Navbar from "../../../components/Navbar";
import LogisticRegressionPlayMode from "./LogisticRegressionPlayMode";
import LogisticRegressionTeachMode from "./LogisticRegressionTeachMode";
import LogisticRegressionBreakMode from "./LogisticRegressionBreakMode";

const LogisticRegressionMath = lazy(() => import("../../../components/math-engine/LogisticRegressionMath"));

export default function LogisticRegression() {
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
                Logistic <span className="bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 bg-clip-text text-transparent">Regression</span>
              </h1>
              <div className="max-w-3xl rounded-2xl border border-white/5 bg-white/[0.02] p-5 backdrop-blur-xl sm:rounded-3xl sm:p-8">
                <p className="text-base leading-7 text-white/70 italic sm:text-lg sm:leading-relaxed">
                  &ldquo;Despite the name, this is for classification—like a 'Yes/No' switch. It takes trends and squashes them into a probability between 0 and 1!&rdquo;
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
            <Suspense fallback={<div className="flex h-64 items-center justify-center text-cyan-400 animate-pulse font-black text-[10px] uppercase tracking-[0.4em]" style={{ fontFamily: "'Press Start 2P', system-ui" }}>Initializing Engine...</div>}>
              {activeTab === "play" && <LogisticRegressionPlayMode />}
              {activeTab === "teach" && <LogisticRegressionTeachMode />}
              {activeTab === "math" && <LogisticRegressionMath />}
              {activeTab === "break" && <LogisticRegressionBreakMode />}
              {activeTab === "proscons" && <LogisticProsCons />}
              {activeTab === "realworld" && <LogisticRealWorld />}
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
}

function LogisticProsCons() {
  const pros = [
    { title: "Probability", desc: "Doesn't just say 'Spam', it says '99% likely to be Spam'." },
    { title: "Fast & Robust", desc: "Low computational cost and doesn't require high-end hardware." },
    { title: "Clear Weights", desc: "You can see which features (words, numbers) are the most influential." },
  ];

  const cons = [
    { title: "Simple Boundary", desc: "It only finds straight boundaries; it can't handle complex, wavy patterns naturally." },
    { title: "Feature Independence", desc: "Assumes features aren't related, which can lead to mistakes." },
    { title: "Not for Images", desc: "Fails instantly on high-dimensional data like photos or video." },
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

function LogisticRealWorld() {
  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="relative flex-1 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:rounded-3xl sm:p-10">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Target size={120} className="text-cyan-400" />
        </div>
        <h3 className="mb-6 text-[10px] font-black text-cyan-300 uppercase" style={{ fontFamily: "'Press Start 2P', system-ui" }}>Gmail & Outlook</h3>
        <p className="mb-6 text-lg text-white/70 leading-relaxed italic">
          "Is this email Spam?"
        </p>
        <p className="text-white/50 leading-relaxed">
          The most famous use of Logistic Regression is your email spam filter. It looks at keywords, sender history, and links to decide if an email is 1 (Spam) or 0 (Safe).
        </p>
        <div className="mt-8 flex gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300 border border-cyan-400/20 font-black">G</div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 border border-blue-600/20 font-black">O</div>
        </div>
      </div>

      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:rounded-3xl sm:p-10">
        <h3 className="mb-8 text-[10px] font-black text-purple-400 uppercase" style={{ fontFamily: "'Press Start 2P', system-ui" }}>Other Uses</h3>
        <ul className="space-y-6">
          <li className="flex items-start gap-4">
            <div className="mt-1 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
            <p className="text-white/60 leading-relaxed"><span className="font-bold text-white block mb-1">Ad Clicks</span> Estimating the probability that a user will click on an ad.</p>
          </li>
          <li className="flex items-start gap-4">
            <div className="mt-1 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
            <p className="text-white/60 leading-relaxed"><span className="font-bold text-white block mb-1">Medicine</span> Determining the probability of a patient having a certain disease.</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
