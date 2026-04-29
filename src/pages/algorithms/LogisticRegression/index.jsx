import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "../../../components/Navbar";
import LogisticRegressionPlayMode from "./LogisticRegressionPlayMode";
import LogisticRegressionTeachMode from "./LogisticRegressionTeachMode";
import LogisticRegressionBreakMode from "./LogisticRegressionBreakMode";

export default function LogisticRegression() {
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
              Logistic{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Regression
              </span>
            </h1>
            <div className="max-w-2xl space-y-4">
              <p className="text-lg text-white/80 leading-relaxed">
                <span className="font-bold text-cyan-300">Easy definition:</span> Despite the name, this is for classification—like a "Yes/No" switch. It takes trends and squashes them into a probability between 0 and 1!
              </p>
              <p className="text-md text-white/50 border-l-2 border-cyan-400/30 pl-4">
                <span className="font-bold text-white/70">Real-life example:</span> "Will it rain today?" Instead of giving you a price, Logistic Regression tells you "There is an 80% chance it will rain." It's the ultimate probability tool!
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
            {activeTab === "play" && <LogisticRegressionPlayMode />}
            {activeTab === "teach" && <LogisticRegressionTeachMode />}
            {activeTab === "break" && <LogisticRegressionBreakMode />}
            {activeTab === "proscons" && <LogisticProsCons />}
            {activeTab === "realworld" && <LogisticRealWorld />}
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

function LogisticRealWorld() {
  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
           <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
        </div>
        <h3 className="mb-4 text-2xl font-bold text-cyan-300">Gmail & Outlook</h3>
        <p className="mb-6 text-lg text-white/70 leading-relaxed italic">
          "Is this email Spam?"
        </p>
        <p className="text-white/50 leading-relaxed">
          The most famous use of Logistic Regression is your email spam filter. It looks at keywords, sender history, and links to decide if an email is 1 (Spam) or 0 (Safe). It's the gatekeeper of your inbox!
        </p>
        <div className="mt-8 flex gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300 border border-cyan-400/20 font-black">G</div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 border border-blue-600/20 font-black">O</div>
        </div>
      </div>

      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-8">
        <h3 className="mb-4 text-2xl font-bold text-purple-400">Other Uses</h3>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <div className="mt-1 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
            <p className="text-white/60"><span className="font-bold text-white">Ad Clicks:</span> Estimating the probability that a user will click on an ad.</p>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-1 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
            <p className="text-white/60"><span className="font-bold text-white">Finance:</span> Predicting the probability that a customer will default on their credit card.</p>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-1 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
            <p className="text-white/60"><span className="font-bold text-white">Medicine:</span> Determining the probability of a patient having a certain disease based on tests.</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
