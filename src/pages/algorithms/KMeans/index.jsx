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
            <p className="max-w-2xl text-lg text-white/60">
              Group your data into clusters by finding the natural 'centers' of gravity. Perfect for pattern discovery!
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-8 flex space-x-2 rounded-xl bg-white/5 p-2 w-fit border border-white/5">
            <button
              onClick={() => setActiveTab("play")}
              className={`rounded-lg px-6 py-2 font-bold transition-all ${
                activeTab === "play" ? "bg-cyan-400 text-black shadow-[0_0_15px_rgba(34,211,238,0.4)]" : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              Play
            </button>
            <button
              onClick={() => setActiveTab("teach")}
              className={`rounded-lg px-6 py-2 font-bold transition-all ${
                activeTab === "teach" ? "bg-cyan-400 text-black shadow-[0_0_15px_rgba(34,211,238,0.4)]" : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              Teach
            </button>
            <button
              onClick={() => setActiveTab("break")}
              className={`rounded-lg px-6 py-2 font-bold transition-all ${
                activeTab === "break" ? "bg-cyan-400 text-black shadow-[0_0_15px_rgba(34,211,238,0.4)]" : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              Break
            </button>
          </div>

          {/* Active Mode */}
          <div className="min-h-[500px]">
            {activeTab === "play" && <KMeansPlayMode />}
            {activeTab === "teach" && <KMeansTeachMode />}
            {activeTab === "break" && <KMeansBreakMode />}
          </div>
        </div>
      </section>
    </main>
  );
}

