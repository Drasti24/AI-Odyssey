import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Play, ChevronRight, Trophy, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../components/Navbar";

// ─── Answer options for the quiz ───
const OPTIONS = [
  { id: "knn", label: "K-Nearest Neighbors" },
  { id: "linear", label: "Linear Regression" },
  { id: "tree", label: "Decision Tree" },
  { id: "neural", label: "Neural Network" },
];

// ─── The correct answer ID ───
const CORRECT_ANSWER = "knn";

// ─── Points awarded for a correct answer ───
const POINTS_PER_CORRECT = 10;

export default function ChapterOneNetflix() {
  // Track what phase the user is in: "preview" → "story" → "result"
  const [phase, setPhase] = useState("preview");

  // Track which option the user selected (null = hasn't picked yet)
  const [selected, setSelected] = useState(null);

  // Track the user's score
  const [score, setScore] = useState(0);

  // Did the user answer correctly?
  const isCorrect = selected === CORRECT_ANSWER;

  // ─── Handle when a user clicks an answer ───
  const handleSelect = (id) => {
    // Only allow selection once
    if (selected) return;
    setSelected(id);
    if (id === CORRECT_ANSWER) {
      setScore((prev) => prev + POINTS_PER_CORRECT);
    }
    // Small delay before showing result phase
    setTimeout(() => setPhase("result"), 600);
  };

  // ─── Reset to play again ───
  const handleRestart = () => {
    setPhase("preview");
    setSelected(null);
    setScore(0);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <section className="px-6 pt-28 pb-20">
        <div className="mx-auto max-w-5xl">

          {/* ── Back link ── */}
          <Link
            to="/playground"
            className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-white/40 transition-colors hover:text-red-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Playground
          </Link>

          {/* ── Top bar: Progress + Score ── */}
          <div className="mb-10 flex items-center justify-between">
            {/* Progress pill */}
            <div className="flex items-center gap-3">
              <div className="h-1.5 w-32 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-red-600"
                  initial={{ width: "0%" }}
                  animate={{ width: phase === "preview" ? "10%" : phase === "story" ? "50%" : "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </div>
              <span className="text-xs font-bold text-white/40">Chapter 1 of 5</span>
            </div>

            {/* Score badge */}
            <div className="flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/5 px-4 py-1.5 text-sm font-bold text-yellow-400">
              <Trophy className="h-4 w-4" />
              {score} pts
            </div>
          </div>

          {/* ─────────────────────────────────────── */}
          {/*  PHASE CONTENT (animated transitions)  */}
          {/* ─────────────────────────────────────── */}
          <AnimatePresence mode="wait">

            {/* ══════════════════════════ */}
            {/*  PHASE 1: Episode Preview */}
            {/* ══════════════════════════ */}
            {phase === "preview" && (
              <motion.div
                key="preview"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Netflix-style episode card */}
                <div className="group relative overflow-hidden rounded-3xl border border-red-500/10 bg-gradient-to-br from-[#1a0a0a] to-[#0a0a0a]">

                  {/* Top red accent line */}
                  <div className="h-1 w-full bg-gradient-to-r from-red-700 via-red-500 to-red-700" />

                  <div className="p-10 md:p-14">
                    {/* Streaming badge */}
                    <div className="mb-6 inline-flex items-center gap-2 rounded-md bg-red-600/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-red-400">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                      Now Streaming
                    </div>

                    {/* Netflix-like branding text */}
                    <h1 className="mb-2 text-lg font-black tracking-[0.3em] text-red-500/80 uppercase">
                      AI Odyssey Originals
                    </h1>

                    {/* Episode title */}
                    <h2 className="mb-6 text-4xl font-black leading-tight md:text-5xl">
                      Episode 1:{" "}
                      <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                        How Netflix Recommends What You Watch
                      </span>
                    </h2>

                    {/* Synopsis */}
                    <p className="mb-10 max-w-2xl text-lg leading-relaxed text-white/50">
                      You open Netflix and the recommendations feel perfect.
                      But how does it know? Dive into the algorithm behind the magic.
                    </p>

                    {/* Play button */}
                    <button
                      onClick={() => setPhase("story")}
                      className="group/btn inline-flex items-center gap-3 rounded-xl bg-red-600 px-8 py-4 text-lg font-black text-white shadow-[0_0_30px_rgba(220,38,38,0.3)] transition-all hover:bg-red-500 hover:shadow-[0_0_40px_rgba(220,38,38,0.5)] hover:scale-105 active:scale-95"
                    >
                      <Play className="h-5 w-5 fill-white" />
                      Play Episode
                    </button>
                  </div>

                  {/* Decorative glow */}
                  <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-red-600/10 blur-3xl" />
                  <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-red-600/5 blur-3xl" />
                </div>
              </motion.div>
            )}

            {/* ══════════════════════════ */}
            {/*  PHASE 2: Story + Quiz    */}
            {/* ══════════════════════════ */}
            {phase === "story" && (
              <motion.div
                key="story"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 md:p-12">

                  {/* Story text */}
                  <div className="mb-10 rounded-2xl border border-red-500/10 bg-red-500/[0.03] p-6 md:p-8">
                    <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-red-400">
                      The Scenario
                    </h3>
                    <p className="text-lg leading-relaxed text-white/70">
                      You open Netflix after a long day. The homepage shows you a list
                      of movies that feel <span className="font-bold text-white">perfect</span> for you.
                      But how does Netflix know what you like?
                    </p>
                    <p className="mt-4 text-lg leading-relaxed text-white/70">
                      It looks at <span className="font-bold text-red-400">users similar to you</span> —
                      people who watched the same shows — and recommends what
                      <span className="font-bold text-white"> they</span> enjoyed next.
                    </p>
                  </div>

                  {/* Question */}
                  <h3 className="mb-8 text-center text-2xl font-black md:text-3xl">
                    Which algorithm is Netflix{" "}
                    <span className="text-red-400">most likely</span> using here?
                  </h3>

                  {/* Answer options grid */}
                  <div className="grid gap-4 md:grid-cols-2">
                    {OPTIONS.map((opt) => {
                      // Determine the visual state of each option
                      const isThis = selected === opt.id;
                      const isRight = opt.id === CORRECT_ANSWER;
                      let borderColor = "border-white/10 hover:border-white/20";
                      let bgColor = "bg-white/[0.03] hover:bg-white/[0.06]";

                      if (selected) {
                        if (isRight) {
                          borderColor = "border-green-500/50";
                          bgColor = "bg-green-500/10";
                        } else if (isThis && !isRight) {
                          borderColor = "border-red-500/50";
                          bgColor = "bg-red-500/10";
                        } else {
                          borderColor = "border-white/5";
                          bgColor = "bg-white/[0.01] opacity-50";
                        }
                      }

                      return (
                        <motion.button
                          key={opt.id}
                          whileHover={!selected ? { scale: 1.02 } : {}}
                          whileTap={!selected ? { scale: 0.98 } : {}}
                          onClick={() => handleSelect(opt.id)}
                          disabled={!!selected}
                          className={`rounded-2xl border p-5 text-left font-bold text-lg transition-all duration-300 ${borderColor} ${bgColor} ${
                            !selected ? "cursor-pointer" : "cursor-default"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className={selected && isRight ? "text-green-400" : selected && isThis ? "text-red-400" : "text-white"}>
                              {opt.label}
                            </span>
                            {/* Show check or X after selection */}
                            {selected && isRight && (
                              <span className="text-green-400 text-xl">✓</span>
                            )}
                            {selected && isThis && !isRight && (
                              <span className="text-red-400 text-xl">✗</span>
                            )}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ══════════════════════════ */}
            {/*  PHASE 3: Result Screen   */}
            {/* ══════════════════════════ */}
            {phase === "result" && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 md:p-12 text-center">

                  {/* Correct / Incorrect feedback */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full text-4xl ${
                      isCorrect
                        ? "bg-green-500/20 shadow-[0_0_40px_rgba(34,197,94,0.2)]"
                        : "bg-red-500/20 shadow-[0_0_40px_rgba(239,68,68,0.2)]"
                    }`}
                  >
                    {isCorrect ? "🎉" : "😔"}
                  </motion.div>

                  <h3 className={`mb-2 text-3xl font-black ${isCorrect ? "text-green-400" : "text-red-400"}`}>
                    {isCorrect ? "Correct!" : "Not Quite!"}
                  </h3>

                  <p className="mb-2 text-lg text-white/40">
                    {isCorrect ? `+${POINTS_PER_CORRECT} points` : "No points this time"}
                  </p>

                  {/* Explanation box */}
                  <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6 text-left">
                    <h4 className="mb-3 text-sm font-bold uppercase tracking-widest text-cyan-400">
                      Why KNN?
                    </h4>
                    <p className="text-lg leading-relaxed text-white/70">
                      Netflix finds users <span className="font-bold text-white">similar to you</span> (your
                      "nearest neighbors") and recommends what they enjoyed.
                      This is exactly how{" "}
                      <span className="font-bold text-cyan-300">K-Nearest Neighbors</span> works —
                      it classifies or recommends based on the closest data points.
                    </p>
                  </div>

                  {/* Action buttons */}
                  <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                    {/* Try it in Playground (links to KNN algo page) */}
                    <Link
                      to="/algorithms/knn"
                      className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-bold text-black transition-all hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:scale-105 active:scale-95"
                    >
                      Try KNN in Action
                      <ChevronRight className="h-4 w-4" />
                    </Link>

                    {/* Restart button */}
                    <button
                      onClick={handleRestart}
                      className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-bold text-white/60 transition-all hover:border-white/20 hover:text-white hover:scale-105 active:scale-95"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Play Again
                    </button>

                    {/* Next Episode (disabled for now) */}
                    <button
                      disabled
                      className="inline-flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] px-6 py-3 font-bold text-white/20 cursor-not-allowed"
                      title="Coming soon!"
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
