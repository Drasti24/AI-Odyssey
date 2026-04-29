import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "../../../components/Navbar";
import NNPlayMode from "./NNPlayMode";
import NNTeachMode from "./NNTeachMode";
import NNBreakMode from "./NNBreakMode";

export default function NeuralNetwork() {
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
              Neural{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Networks
              </span>
            </h1>
            <div className="max-w-2xl space-y-4">
              <p className="text-lg text-white/80 leading-relaxed">
                <span className="font-bold text-cyan-300">Easy definition:</span> Neural Networks are like a "digital brain." They pass information through layers of math to find patterns that are too complex for simple formulas—like recognizing a face or a kitten in a photo!
              </p>
              <p className="text-md text-white/50 border-l-2 border-pink-400/30 pl-4">
                <span className="font-bold text-white/70">Real-life example:</span> FaceID on your iPhone. The phone doesn't just look for "two eyes"; a neural network looks at the relationship between thousands of points to verify that it's really you!
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
            {activeTab === "play" && <NNPlayMode />}
            {activeTab === "teach" && <NNTeachMode />}
            {activeTab === "break" && <NNBreakMode />}
            {activeTab === "proscons" && <NNProsCons />}
            {activeTab === "realworld" && <NNRealWorld />}
          </div>
        </div>
      </section>
    </main>
  );
}

function NNProsCons() {
  const pros = [
    { title: "Universal", desc: "Can theoretically solve any mapping problem (Universal Approximation Theorem)." },
    { title: "Unstructured Data", desc: "The king of images, audio, and text through Deep Learning." },
    { title: "Feature Learning", desc: "Automatically finds important features instead of a human doing it manually." },
  ];

  const cons = [
    { title: "Black Box", desc: "It's extremely hard to explain why a neural network made a specific decision." },
    { title: "Data Hungry", desc: "Needs massive amounts of data to reach high accuracy." },
    { title: "Hardware Heavy", desc: "Requires powerful GPUs/TPUs and lots of power to train." },
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

function NNRealWorld() {
  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 text-white">
          <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2v20M2 12h20"></path></svg>
        </div>
        <h3 className="mb-4 text-2xl font-bold text-pink-400">Google & Tesla</h3>
        <p className="mb-6 text-lg text-white/70 leading-relaxed italic">
          "Autonomous Intelligence"
        </p>
        <p className="text-white/50 leading-relaxed">
          Google uses Neural Networks to power everything from Google Search to Translate. Tesla's self-driving cars use neural networks to identify pedestrians, stop signs, and lane lines in real-time. It's the core of the "AI Revolution"!
        </p>
        <div className="mt-8 flex gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-400/10 text-pink-400 border border-pink-400/20 font-black">G</div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600/10 text-red-600 border border-red-600/20 font-black">T</div>
        </div>
      </div>

      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-8">
        <h3 className="mb-4 text-2xl font-bold text-cyan-300">Other Uses</h3>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <div className="mt-1 h-2 w-2 rounded-full bg-pink-400 shadow-[0_0_8px_rgba(244,114,182,0.6)]" />
            <p className="text-white/60"><span className="font-bold text-white">Generative AI:</span> Creating art, music, or writing like ChatGPT and Midjourney.</p>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-1 h-2 w-2 rounded-full bg-pink-400 shadow-[0_0_8px_rgba(244,114,182,0.6)]" />
            <p className="text-white/60"><span className="font-bold text-white">Voice Assistants:</span> Understanding "Hey Alexa" or "Hey Siri" by processing sound frequencies.</p>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-1 h-2 w-2 rounded-full bg-pink-400 shadow-[0_0_8px_rgba(244,114,182,0.6)]" />
            <p className="text-white/60"><span className="font-bold text-white">Fraud Detection:</span> Banks use them to spot unusual spending patterns in milliseconds.</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

