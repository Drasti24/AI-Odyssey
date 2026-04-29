import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import KNNPlayMode from "./KNNPlayMode";
import KNNTeachMode from "./KNNTeachMode";
import KNNBreakMode from "./KNNBreakMode";

export default function KNN() {
  const [activeTab, setActiveTab] = useState("play");

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
              K-Nearest{" "}
              <span className="text-cyan-400">Neighbors</span>
            </h1>
            <div className="max-w-2xl space-y-4">
              <p className="text-lg text-white/80 leading-relaxed">
                <span className="font-bold text-cyan-300">Easy definition:</span> KNN is like asking your neighbors for advice. To classify a new point, we just look at the <span className="italic text-cyan-300">K</span> closest points already in the data and take a majority vote!
              </p>
              <p className="text-md text-white/50 border-l-2 border-cyan-400/30 pl-4">
                <span className="font-bold text-white/70">Real-life example:</span> Imagine you are in a library and find a mystery book. If the 5 books closest to it on the shelf are all "Sci-Fi," you can safely guess that the mystery book is also Sci-Fi.
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
                className={`rounded-lg px-6 py-2 font-bold transition-all ${
                  activeTab === t.id ? "bg-cyan-400 text-black shadow-[0_0_15px_rgba(34,211,238,0.4)]" : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Active Mode */}
          <div className="min-h-[500px]">
            {activeTab === "play" && <KNNPlayMode />}
            {activeTab === "teach" && <KNNTeachMode />}
            {activeTab === "break" && <KNNBreakMode />}
            {activeTab === "proscons" && <KNNProsCons />}
            {activeTab === "realworld" && <KNNRealWorld />}
          </div>
        </div>
      </section>

      <Footer />
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

function KNNRealWorld() {
  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </div>
        <h3 className="mb-4 text-2xl font-bold text-cyan-300">Netflix & Amazon</h3>
        <p className="mb-6 text-lg text-white/70 leading-relaxed italic">
          "People who watched this also watched..."
        </p>
        <p className="text-white/50 leading-relaxed">
          Netflix and Amazon use KNN to find users with similar tastes. If your movie-watching history is "near" another user's history, the algorithm recommends the movies they liked to you. You are the "Mystery Point," and other users are your "Neighbors"!
        </p>
        
        <div className="mt-8 flex gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300 border border-cyan-400/20 font-black">N</div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-400/10 text-orange-400 border border-orange-400/20 font-black">A</div>
        </div>
      </div>

      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-8">
        <h3 className="mb-4 text-2xl font-bold text-purple-400">Other Uses</h3>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <div className="mt-1 h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(167,139,250,0.6)]" />
            <p className="text-white/60"><span className="font-bold text-white">Handwriting Recognition:</span> Identifying letters based on their shape similarity to known examples.</p>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-1 h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(167,139,250,0.6)]" />
            <p className="text-white/60"><span className="font-bold text-white">Medical Diagnosis:</span> Comparing a patient's symptoms to the nearest recorded medical cases.</p>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-1 h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(167,139,250,0.6)]" />
            <p className="text-white/60"><span className="font-bold text-white">Credit Scoring:</span> Banks check if your financial profile is similar to "good" or "bad" borrowers.</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
