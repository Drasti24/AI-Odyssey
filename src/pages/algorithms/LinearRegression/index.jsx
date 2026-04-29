import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "../../../components/Navbar";
import LinearRegressionPlayMode from "./LinearRegressionPlayMode";
import LinearRegressionTeachMode from "./LinearRegressionTeachMode";
import LinearRegressionBreakMode from "./LinearRegressionBreakMode";

export default function LinearRegression() {
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
              Linear{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Regression
              </span>
            </h1>
            <div className="max-w-2xl space-y-4">
              <p className="text-lg text-white/80 leading-relaxed">
                <span className="font-bold text-cyan-300">Easy definition:</span> Linear Regression is like drawing the "best-fit" line through a bunch of dots. It helps you predict a number (like price or age) based on a trend.
              </p>
              <p className="text-md text-white/50 border-l-2 border-purple-400/30 pl-4">
                <span className="font-bold text-white/70">Real-life example:</span> Predicting how much a house will cost based on its size. Usually, as the square footage goes up, the price follows a straight-ish line upwards!
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
            {activeTab === "play" && <LinearRegressionPlayMode />}
            {activeTab === "teach" && <LinearRegressionTeachMode />}
            {activeTab === "break" && <LinearRegressionBreakMode />}
            {activeTab === "proscons" && <LinearProsCons />}
            {activeTab === "realworld" && <LinearRealWorld />}
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

function LinearRealWorld() {
  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
        </div>
        <h3 className="mb-4 text-2xl font-bold text-purple-400">Uber & Zillow</h3>
        <p className="mb-6 text-lg text-white/70 leading-relaxed italic">
          "How much will this cost?"
        </p>
        <p className="text-white/50 leading-relaxed">
          Uber uses linear models to estimate arrival times and prices. Zillow uses regression to calculate the "Zestimate" of your home by looking at size, local trends, and number of bedrooms. It's the "calculator" of the AI world!
        </p>
        <div className="mt-8 flex gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-400/10 text-purple-400 border border-purple-400/20 font-black">U</div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-400/10 text-blue-400 border border-blue-400/20 font-black">Z</div>
        </div>
      </div>

      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-8">
        <h3 className="mb-4 text-2xl font-bold text-cyan-300">Other Uses</h3>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <div className="mt-1 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
            <p className="text-white/60"><span className="font-bold text-white">Stock Prediction:</span> Predicting future prices based on historical trends (though often risky!).</p>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-1 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
            <p className="text-white/60"><span className="font-bold text-white">Marketing:</span> Estimating how many sales you'll get based on how much you spend on ads.</p>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-1 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
            <p className="text-white/60"><span className="font-bold text-white">Biology:</span> Predicting plant growth based on the amount of sunlight or water they receive.</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

