import { useState } from "react";
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
          <div className="mb-12">
            <h1 className="mb-4 text-5xl font-black">
              K-Nearest{" "}
              <span className="text-cyan-400">Neighbors</span>
            </h1>
            <p className="max-w-2xl text-lg text-white/60">
              KNN classifies a point based on the classes of its closest neighbors. It's simple, instance-based learning. Try the interactive modes below to master it!
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-8 flex space-x-2 rounded-xl bg-white/5 p-2 w-fit">
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
            {activeTab === "play" && <KNNPlayMode />}
            {activeTab === "teach" && <KNNTeachMode />}
            {activeTab === "break" && <KNNBreakMode />}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
