import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "../../../components/Navbar";
import DecisionTreePlayMode from "./DecisionTreePlayMode";
import DecisionTreeTeachMode from "./DecisionTreeTeachMode";
import DecisionTreeBreakMode from "./DecisionTreeBreakMode";

export default function DecisionTree() {
  const [activeTab, setActiveTab] = useState("play");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <main className="min-h-screen bg-[#07070c] text-white">
      <Navbar />

      <section className="px-8 pt-32 pb-20">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/40 transition-colors hover:text-cyan-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="mb-12">
            <h1 className="mb-4 text-5xl font-black">
              Decision{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Trees
              </span>
            </h1>
            <div className="max-w-2xl space-y-4">
              <p className="text-lg text-white/80 leading-relaxed">
                <span className="font-bold text-cyan-300">Easy definition:</span> A Decision Tree is like a flowchart or a game of "20 Questions." It asks simple Yes/No questions about your data until it narrows everything down to a final answer!
              </p>
              <p className="text-md text-white/50 border-l-2 border-pink-400/30 pl-4">
                <span className="font-bold text-white/70">Real-life example:</span> A doctor's diagnosis. 1. Do you have a fever? (Yes) &rarr; 2. Is your throat sore? (Yes) &rarr; 3. Result: You likely have Strep Throat. It's logic in branches!
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-8 flex flex-wrap gap-2 rounded-xl bg-white/5 p-2 w-fit border border-white/5">
            {[
              { id: "play", label: "Play" },
              { id: "teach", label: "Teach" },
              { id: "break", label: "Break" },
              { id: "proscons", label: "Pros & Cons" },
              { id: "realworld", label: "Real World" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`rounded-lg px-6 py-2 font-bold transition-all ${activeTab === t.id ? "bg-cyan-400 text-black shadow-[0_0_15px_rgba(34,211,238,0.4)]" : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Active Mode */}
          <div className="min-h-[500px]">
            {activeTab === "play" && <DecisionTreePlayMode />}
            {activeTab === "teach" && <DecisionTreeTeachMode />}
            {activeTab === "break" && <DecisionTreeBreakMode />}
            {activeTab === "proscons" && <TreeProsCons />}
            {activeTab === "realworld" && <TreeRealWorld />}
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
      <div className="rounded-2xl border border-green-500/10 bg-green-500/5 p-6">
        <h3 className="mb-6 text-2xl font-bold text-green-400">Pros</h3>
        <div className="space-y-4">
          {pros.map((p, i) => (
            <div key={i} className="rounded-xl bg-black/20 p-4 border border-white/5">
              <h4 className="font-bold text-white mb-1">{p.title}</h4>
              <p className="text-sm text-white/50">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-red-500/10 bg-red-500/5 p-6">
        <h3 className="mb-6 text-2xl font-bold text-red-400">Cons</h3>
        <div className="space-y-4">
          {cons.map((c, i) => (
            <div key={i} className="rounded-xl bg-black/20 p-4 border border-white/5">
              <h4 className="font-bold text-white mb-1">{c.title}</h4>
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
      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 text-white">
          <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
        </div>
        <h3 className="mb-4 text-2xl font-bold text-orange-400">Banks & Hospitals</h3>
        <p className="mb-6 text-lg text-white/70 leading-relaxed italic">
          "The Safety Path"
        </p>
        <p className="text-white/50 leading-relaxed">
          Banks use Decision Trees to approve loans: "Is Income &gt; $50k?" &rarr; "Is Credit Score &gt; 700?" &rarr; APPROVED. They are used wherever a human needs to understand *why* the AI made a choice, especially in legal and medical fields.
        </p>
      </div>

      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-8">
        <h3 className="mb-4 text-2xl font-bold text-cyan-300">Other Uses</h3>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <div className="mt-1 h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.6)]" />
            <p className="text-white/60"><span className="font-bold text-white">HR Departments:</span> Filtering candidates based on skills, experience, and certificates.</p>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-1 h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.6)]" />
            <p className="text-white/60"><span className="font-bold text-white">Marketing:</span> Segmenting customers based on geographic and demographic data.</p>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-1 h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.6)]" />
            <p className="text-white/60"><span className="font-bold text-white">Manufacturing:</span> Finding the root cause of failures in a production line.</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
