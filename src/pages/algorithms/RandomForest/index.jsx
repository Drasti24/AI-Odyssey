import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "../../../components/Navbar";
import RandomForestPlayMode from "./RandomForestPlayMode";
import RandomForestTeachMode from "./RandomForestTeachMode";
import RandomForestBreakMode from "./RandomForestBreakMode";

export default function RandomForest() {
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
              Random{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Forest
              </span>
            </h1>
            <div className="max-w-2xl space-y-4">
              <p className="text-lg text-white/80 leading-relaxed">
                <span className="font-bold text-cyan-300">Easy definition:</span> A Random Forest is a team of many Decision Trees. Instead of trusting just one tree, we ask hundreds of them to vote on the answer. The majority wins—it's the "Wisdom of the Crowd"!
              </p>
              <p className="text-md text-white/50 border-l-2 border-green-400/30 pl-4">
                <span className="font-bold text-white/70">Real-life example:</span> Asking 10 different friends for movie advice. One friend might have a weird bias, but if 8 out of 10 say "Watch this," it's probably a great movie.
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
            {activeTab === "play" && <RandomForestPlayMode />}
            {activeTab === "teach" && <RandomForestTeachMode />}
            {activeTab === "break" && <RandomForestBreakMode />}
            {activeTab === "proscons" && <ForestProsCons />}
            {activeTab === "realworld" && <ForestRealWorld />}
          </div>
        </div>
      </section>
    </main>
  );
}

function ForestProsCons() {
  const pros = [
    { title: "High Accuracy", desc: "One of the most accurate machine learning algorithms available today." },
    { title: "No Overfitting", desc: "By averaging many trees, it avoids the 'memorization' trap of single trees." },
    { title: "Ranking Features", desc: "It can tell you exactly which data points were most important for the result." },
  ];

  const cons = [
    { title: "Slow", desc: "Takes a lot of memory and time because it has to run hundreds of trees." },
    { title: "Complexity", desc: "It's a 'Black Box'—hard to explain why the forest voted a certain way." },
    { title: "Not for Real-Time", desc: "Sometimes too slow for lightning-fast predictions (like high-frequency trading)." },
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

function ForestRealWorld() {
  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 text-white">
          <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
        </div>
        <h3 className="mb-4 text-2xl font-bold text-green-400">Amazon & eBay</h3>
        <p className="mb-6 text-lg text-white/70 leading-relaxed italic">
          "What should you buy next?"
        </p>
        <p className="text-white/50 leading-relaxed">
          E-commerce giants like Amazon and eBay use Random Forests to rank products. The algorithm looks at millions of previous purchases, views, and ratings across many 'trees' to decide which product is most likely to be bought by you. It's the ultimate 'Ranking Engine'!
        </p>
        <div className="mt-8 flex gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-400/10 text-orange-400 border border-orange-400/20 font-black">A</div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20 font-black">E</div>
        </div>
      </div>

      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-8">
        <h3 className="mb-4 text-2xl font-bold text-cyan-300">Other Uses</h3>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <div className="mt-1 h-2 w-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
            <p className="text-white/60"><span className="font-bold text-white">Stock Market:</span> Predicting stock price movements based on a massive collection of indicators.</p>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-1 h-2 w-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
            <p className="text-white/60"><span className="font-bold text-white">Fraud Detection:</span> Checking thousands of features in a credit card swipe to spot a thief.</p>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-1 h-2 w-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
            <p className="text-white/60"><span className="font-bold text-white">Land Cover:</span> Satellite systems use it to classify areas as "Forest," "Water," or "City."</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
