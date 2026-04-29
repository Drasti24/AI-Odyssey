import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "../../../components/Navbar";
import KMeansPlayMode from "./KMeansPlayMode";
import KMeansTeachMode from "./KMeansTeachMode";
import KMeansBreakMode from "./KMeansBreakMode";

export default function KMeans() {
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
              K-Means{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Clustering
              </span>
            </h1>
            <div className="max-w-2xl space-y-4">
              <p className="text-lg text-white/80 leading-relaxed">
                <span className="font-bold text-cyan-300">Easy definition:</span> K-Means is like organizing a messy closet. You decide how many piles (K) you want, and the algorithm groups everything together that "looks the same" until the piles are perfect!
              </p>
              <p className="text-md text-white/50 border-l-2 border-orange-400/30 pl-4">
                <span className="font-bold text-white/70">Real-life example:</span> T-shirt sizing. Clothing brands use K-Means to look at thousands of body measurements and find the 3 "centers" (Small, Medium, Large) that fit the most people!
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
            {activeTab === "play" && <KMeansPlayMode />}
            {activeTab === "teach" && <KMeansTeachMode />}
            {activeTab === "break" && <KMeansBreakMode />}
            {activeTab === "proscons" && <KMeansProsCons />}
            {activeTab === "realworld" && <KMeansRealWorld />}
          </div>
        </div>
      </section>
    </main>
  );
}

function KMeansProsCons() {
  const pros = [
    { title: "Fast", desc: "One of the fastest clustering algorithms available." },
    { title: "Scalability", desc: "Easily handles millions of data points." },
    { title: "Guaranteed Convergence", desc: "Mathematically guaranteed to find a stable solution eventually." },
  ];

  const cons = [
    { title: "Choosing K", desc: "You have to tell it how many clusters you want manually." },
    { title: "Initial Centers", desc: "The final result can differ depending on where the centroids start." },
    { title: "Spherical Clusters", desc: "It assumes clusters are round, failing on irregular shapes." },
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

function KMeansRealWorld() {
  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
           <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>
        </div>
        <h3 className="mb-4 text-2xl font-bold text-orange-400">Spotify & MasterCard</h3>
        <p className="mb-6 text-lg text-white/70 leading-relaxed italic">
          "What's your personality type?"
        </p>
        <p className="text-white/50 leading-relaxed">
          Spotify uses K-Means to group listeners into specific "Music Taste Profiles." If you like lo-fi and jazz, you're put in a cluster of similar fans so Spotify can build your Daily Mixes. MasterCard uses it to cluster transactions to find unusual patterns (fraud).
        </p>
        <div className="mt-8 flex gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 text-green-500 border border-green-500/20 font-black">S</div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-400/10 text-red-500 border border-red-400/20 font-black">M</div>
        </div>
      </div>

      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-8">
        <h3 className="mb-4 text-2xl font-bold text-cyan-300">Other Uses</h3>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <div className="mt-1 h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.6)]" />
            <p className="text-white/60"><span className="font-bold text-white">Document Clustering:</span> Grouping thousands of news articles into topics like "Sports" or "Politics."</p>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-1 h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.6)]" />
            <p className="text-white/60"><span className="font-bold text-white">Customer Segmentation:</span> Retailers grouping customers into "high spenders" vs "deal seekers."</p>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-1 h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.6)]" />
            <p className="text-white/60"><span className="font-bold text-white">Image Compression:</span> Reducing colors in an image by grouping similar colors together.</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

