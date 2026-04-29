import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronRight, Play, RotateCcw, Trophy } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import NetflixTasteMatcher from "./NetflixTasteMatcher";

export default function ChapterOneNetflix() {
  const [phase, setPhase] = useState("preview");
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(null);

  const handleComplete = (gameResult) => {
    setResult(gameResult);
    setScore(gameResult.points);
    setPhase("result");
  };

  const handleRestart = () => {
    setPhase("preview");
    setScore(0);
    setResult(null);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <section className="px-6 pt-28 pb-20">
        <div className="mx-auto max-w-6xl">
          <Link
            to="/playground"
            className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-white/40 transition-colors hover:text-red-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Playground
          </Link>

          <div className="mb-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-1.5 w-32 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-red-600"
                  initial={{ width: "0%" }}
                  animate={{ width: phase === "preview" ? "12%" : phase === "story" ? "65%" : "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </div>
              <span className="text-xs font-bold text-white/40">Chapter 1 of 5</span>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/5 px-4 py-1.5 text-sm font-bold text-yellow-400">
              <Trophy className="h-4 w-4" />
              {score} pts
            </div>
          </div>

          <AnimatePresence mode="wait">
            {phase === "preview" && (
              <motion.div
                key="preview"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="group relative overflow-hidden rounded-3xl border border-red-500/10 bg-gradient-to-br from-[#1a0a0a] to-[#0a0a0a]">
                  <div className="h-1 w-full bg-gradient-to-r from-red-700 via-red-500 to-red-700" />

                  <div className="p-10 md:p-14">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-md bg-red-600/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-red-400">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                      Now Streaming
                    </div>

                    <h1 className="mb-2 text-lg font-black tracking-[0.3em] text-red-500/80 uppercase">
                      AI Odyssey Originals
                    </h1>

                    <h2 className="mb-6 text-4xl font-black leading-tight md:text-5xl">
                      Episode 1:{" "}
                      <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                        Movie Recommendation Game
                      </span>
                    </h2>

                    <p className="mb-10 max-w-2xl text-lg leading-relaxed text-white/50">
                      Pick familiar movies you like, compare your taste with other
                      viewers, and reveal the recommendation KNN would make.
                    </p>

                    <button
                      onClick={() => setPhase("story")}
                      className="group/btn inline-flex items-center gap-3 rounded-xl bg-red-600 px-8 py-4 text-lg font-black text-white shadow-[0_0_30px_rgba(220,38,38,0.3)] transition-all hover:scale-105 hover:bg-red-500 hover:shadow-[0_0_40px_rgba(220,38,38,0.5)] active:scale-95"
                    >
                      <Play className="h-5 w-5 fill-white" />
                      Play Episode
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {phase === "story" && (
              <motion.div
                key="story"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-8 rounded-3xl border border-red-500/15 bg-gradient-to-br from-red-500/[0.11] to-white/[0.025] p-7 md:p-9">
                  <h3 className="mb-4 text-base font-black uppercase tracking-[0.22em] text-red-300">
                    The Scenario
                  </h3>
                  <p className="max-w-5xl text-2xl font-semibold leading-relaxed text-white/80 md:text-3xl">
                    You will choose three movies. The game turns those choices into a
                    taste profile, finds viewers with similar genres, and recommends a
                    movie they liked. That is the core idea behind K-Nearest Neighbors.
                  </p>
                </div>

                <NetflixTasteMatcher onComplete={handleComplete} />
              </motion.div>
            )}

            {phase === "result" && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 text-center md:p-12">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.45 }}
                    className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/20 text-red-300 shadow-[0_0_40px_rgba(239,68,68,0.2)]"
                  >
                    <Trophy className="h-10 w-10" />
                  </motion.div>

                  <h3 className="mb-2 text-3xl font-black text-white">Recommendation Unlocked</h3>
                  <p className="mb-2 text-lg text-white/45">Score: {score} points</p>

                  <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-left">
                    <h4 className="mb-3 text-sm font-bold uppercase tracking-widest text-red-300">
                      Netflix would recommend
                    </h4>
                    <p className="text-3xl font-black text-white">{result?.recommendation}</p>
                    <p className="mt-3 text-sm font-bold text-cyan-300">
                      Match strength: {result?.matchStrength}% using K = {result?.k}
                    </p>
                    <p className="mt-2 text-sm text-white/50">
                      Nearest viewers used: {result?.neighborNames}
                    </p>
                  </div>

                  <div className="mx-auto mt-6 max-w-2xl rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6 text-left">
                    <h4 className="mb-3 text-sm font-bold uppercase tracking-widest text-cyan-400">
                      Why this is KNN
                    </h4>
                    <p className="text-lg leading-relaxed text-white/70">
                      KNN does not memorize one perfect rule. It looks for examples
                      closest to you. Here, your selected movies created a genre profile,
                      the nearest viewers were selected, and their liked movies produced
                      the final recommendation.
                    </p>
                  </div>

                  <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                    <Link
                      to="/algorithms/knn"
                      className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-bold text-black transition-all hover:scale-105 hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] active:scale-95"
                    >
                      Try KNN in Action
                      <ChevronRight className="h-4 w-4" />
                    </Link>

                    <button
                      onClick={handleRestart}
                      className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-bold text-white/60 transition-all hover:scale-105 hover:border-white/20 hover:text-white active:scale-95"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Play Again
                    </button>

                    <button
                      disabled
                      className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] px-6 py-3 font-bold text-white/20"
                      title="Coming soon"
                    >
                      Next Episode
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
