import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Play, ChevronRight, Trophy, RotateCcw, Heart, Stethoscope } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../components/Navbar";
import { saveChapterProgress } from "../../utils/progressUtils";

// ─── Decision Tree structure ───
const TREE = {
  q: "Does the patient have a fever?", key: "fever",
  yes: {
    q: "Does the patient have a cough?", key: "cough",
    yes: { diagnosis: "Flu", emoji: "🤒" },
    no: {
      q: "Does the patient have a rash?", key: "rash",
      yes: { diagnosis: "Measles", emoji: "🔴" },
      no: { diagnosis: "Bacterial Infection", emoji: "🦠" },
    },
  },
  no: {
    q: "Does the patient have a headache?", key: "headache",
    yes: { diagnosis: "Migraine", emoji: "🧠" },
    no: { diagnosis: "Healthy", emoji: "✅" },
  },
};

// ─── Patient cases ───
const PATIENTS = [
  { name: "Sarah M.", age: 32, symptoms: { fever: true, cough: true, rash: false, headache: true }, answer: "Flu", urgency: "High" },
  { name: "Tommy L.", age: 7, symptoms: { fever: true, cough: false, rash: true, headache: false }, answer: "Measles", urgency: "Critical" },
  { name: "James R.", age: 45, symptoms: { fever: false, cough: false, rash: false, headache: true }, answer: "Migraine", urgency: "Medium" },
  { name: "Priya K.", age: 28, symptoms: { fever: true, cough: false, rash: false, headache: true }, answer: "Bacterial Infection", urgency: "High" },
  { name: "Alex W.", age: 19, symptoms: { fever: false, cough: false, rash: false, headache: false }, answer: "Healthy", urgency: "Low" },
];

const SYMPTOM_LABELS = { fever: "Fever", cough: "Cough", rash: "Skin Rash", headache: "Headache" };

export default function ChapterThreeDoctor() {
  const [phase, setPhase] = useState("preview");
  const [patientIdx, setPatientIdx] = useState(0);
  const [node, setNode] = useState(TREE);
  const [path, setPath] = useState([]);
  const [results, setResults] = useState([]);
  const [showDiag, setShowDiag] = useState(false);
  const [lives, setLives] = useState(3);

  const patient = PATIENTS[patientIdx];
  const totalPatients = PATIENTS.length;
  const correct = results.filter((r) => r.correct).length;

  // User clicks Yes or No
  const handleAnswer = (answer) => {
    const next = answer ? node.yes : node.no;
    const newPath = [...path, { question: node.q, answer: answer ? "Yes" : "No" }];
    setPath(newPath);

    if (next.diagnosis) {
      // Reached a leaf — show diagnosis
      const isCorrect = next.diagnosis === patient.answer;
      if (!isCorrect && lives > 0) setLives((l) => l - 1);
      setResults((prev) => [...prev, { patient: patient.name, userDiag: next.diagnosis, correctDiag: patient.answer, correct: isCorrect }]);
      setNode(next);
      setShowDiag(true);
    } else {
      setNode(next);
    }
  };

  // Move to next patient
  const nextPatient = () => {
    if (patientIdx + 1 >= totalPatients) {
      const finalScore = correct * 20;
      saveChapterProgress(3, finalScore);
      setPhase("result");
    } else {
      setPatientIdx((i) => i + 1);
      setNode(TREE);
      setPath([]);
      setShowDiag(false);
    }
  };

  // Reset
  const handleRestart = () => {
    setPhase("preview"); setPatientIdx(0); setNode(TREE);
    setPath([]); setResults([]); setShowDiag(false); setLives(3);
  };

  const lastResult = results[results.length - 1];

  return (
    <main className="min-h-screen bg-[#070710] text-white">
      <Navbar />
      <section className="px-6 pt-28 pb-20">
        <div className="mx-auto max-w-5xl">
          <Link to="/playground" className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-white/40 transition-colors hover:text-indigo-400">
            <ArrowLeft className="h-4 w-4" /> Back to Playground
          </Link>

          {/* Top bar */}
          <div className="mb-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-1.5 w-32 overflow-hidden rounded-full bg-white/10">
                <motion.div className="h-full rounded-full bg-indigo-500" initial={{ width: "0%" }}
                  animate={{ width: phase === "preview" ? "10%" : phase === "game" ? `${((patientIdx + 1) / totalPatients) * 80 + 10}%` : "100%" }}
                  transition={{ duration: 0.6 }} />
              </div>
              <span className="text-xs font-bold text-white/40">Chapter 3 of 5</span>
            </div>
            <div className="flex items-center gap-4">
              {/* Lives */}
              <div className="flex items-center gap-1">
                {[0, 1, 2].map((i) => (
                  <Heart key={i} className={`h-5 w-5 transition-all ${i < lives ? "fill-red-500 text-red-500" : "text-white/10"}`} />
                ))}
              </div>
              <div className="flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/5 px-4 py-1.5 text-sm font-bold text-yellow-400">
                <Trophy className="h-4 w-4" />{correct * 20} pts
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* ── PREVIEW ── */}
            {phase === "preview" && (
              <motion.div key="preview" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <div className="group relative overflow-hidden rounded-3xl border border-indigo-500/10 bg-gradient-to-br from-[#0d0a1a] to-[#070710]">
                  <div className="h-1 w-full bg-gradient-to-r from-indigo-700 via-indigo-500 to-indigo-700" />
                  <div className="p-10 md:p-14">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-md bg-indigo-600/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-indigo-400">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-500" /> Patient Triage
                    </div>
                    <h1 className="mb-2 text-lg font-black tracking-[0.3em] text-indigo-500/80 uppercase">AI Odyssey Originals</h1>
                    <h2 className="mb-6 text-4xl font-black leading-tight md:text-5xl">
                      Episode 3:{" "}
                      <span className="bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent">
                        The Doctor's Diagnosis
                      </span>
                    </h2>
                    <p className="mb-4 max-w-2xl text-lg leading-relaxed text-white/50">
                      You're an ER doctor. Patients are arriving with different symptoms.
                      Follow the <span className="text-indigo-400 font-bold">decision tree flowchart</span> to diagnose each one correctly.
                    </p>
                    <p className="mb-10 max-w-2xl text-base leading-relaxed text-red-400/80 font-medium">
                      Be careful — wrong diagnoses cost lives. You only have 3 hearts.
                    </p>
                    <button onClick={() => setPhase("game")}
                      className="inline-flex items-center gap-3 rounded-xl bg-indigo-600 px-8 py-4 text-lg font-black text-white shadow-[0_0_30px_rgba(99,102,241,0.3)] transition-all hover:bg-indigo-500 hover:shadow-[0_0_40px_rgba(99,102,241,0.5)] hover:scale-105 active:scale-95">
                      <Stethoscope className="h-5 w-5" /> Start Diagnosing
                    </button>
                  </div>
                  <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-indigo-600/10 blur-3xl" />
                </div>
              </motion.div>
            )}

            {/* ── GAME ── */}
            {phase === "game" && (
              <motion.div key={`game-${patientIdx}`} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 md:p-10">
                  {/* Patient counter */}
                  <div className="mb-6 text-center text-sm font-bold text-white/30">Patient {patientIdx + 1} of {totalPatients}</div>

                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Patient Card */}
                    <div className="rounded-2xl border border-indigo-500/15 bg-indigo-500/[0.04] p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-xl font-black text-white">{patient.name}</h3>
                        <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                          patient.urgency === "Critical" ? "bg-red-500/20 text-red-400"
                          : patient.urgency === "High" ? "bg-orange-500/20 text-orange-400"
                          : patient.urgency === "Medium" ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-green-500/20 text-green-400"
                        }`}>{patient.urgency} Urgency</span>
                      </div>
                      <p className="mb-4 text-sm text-white/40">Age: {patient.age}</p>

                      <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-indigo-400">Reported Symptoms</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(patient.symptoms).map(([key, val]) => (
                          <div key={key} className={`rounded-lg border px-3 py-2 text-sm font-bold ${
                            val ? "border-red-500/20 bg-red-500/10 text-red-300" : "border-white/5 bg-white/[0.02] text-white/20"
                          }`}>
                            {val ? "⚠ " : "— "}{SYMPTOM_LABELS[key]}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Decision Area */}
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                      {/* Path taken so far */}
                      {path.length > 0 && (
                        <div className="mb-4 space-y-2">
                          {path.map((p, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm">
                              <span className="text-white/30">{p.question}</span>
                              <span className={`rounded-md px-2 py-0.5 text-xs font-bold ${
                                p.answer === "Yes" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                              }`}>{p.answer}</span>
                            </div>
                          ))}
                          <div className="h-px bg-white/5" />
                        </div>
                      )}

                      {!showDiag ? (
                        /* Current question */
                        <motion.div key={node.q} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                          <h3 className="mb-6 text-lg font-bold text-white">{node.q}</h3>
                          <p className="mb-6 text-sm text-white/40">
                            Check the patient's symptoms and decide.
                          </p>
                          <div className="flex gap-3">
                            <button onClick={() => handleAnswer(true)}
                              className="flex-1 rounded-xl border-2 border-green-500/30 bg-green-500/10 py-3 text-lg font-black text-green-400 transition-all hover:bg-green-500/20 hover:border-green-500/50 hover:scale-105 active:scale-95">
                              Yes
                            </button>
                            <button onClick={() => handleAnswer(false)}
                              className="flex-1 rounded-xl border-2 border-red-500/30 bg-red-500/10 py-3 text-lg font-black text-red-400 transition-all hover:bg-red-500/20 hover:border-red-500/50 hover:scale-105 active:scale-95">
                              No
                            </button>
                          </div>
                        </motion.div>
                      ) : (
                        /* Diagnosis result */
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                          <div className="mb-3 text-4xl">{node.emoji}</div>
                          <h3 className="mb-1 text-xl font-black">Your Diagnosis: <span className="text-indigo-300">{node.diagnosis}</span></h3>
                          <h4 className="mb-4 text-sm text-white/40">Correct Answer: <span className="text-white/60">{patient.answer}</span></h4>

                          <div className={`mb-6 rounded-xl border p-4 ${
                            lastResult?.correct
                              ? "border-green-500/20 bg-green-500/10 text-green-400"
                              : "border-red-500/20 bg-red-500/10 text-red-400"
                          }`}>
                            <p className="text-lg font-bold">
                              {lastResult?.correct ? "Correct Diagnosis!" : "Wrong Diagnosis!"}
                            </p>
                            <p className="text-sm opacity-70">
                              {lastResult?.correct ? "+20 points" : "A life was lost..."}
                            </p>
                          </div>

                          <button onClick={nextPatient}
                            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white transition-all hover:bg-indigo-500 hover:scale-105 active:scale-95">
                            {patientIdx + 1 < totalPatients ? "Next Patient" : "See Results"}
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── RESULT ── */}
            {phase === "result" && (
              <motion.div key="result" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 md:p-10">
                  <div className="mb-8 text-center">
                    <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }}
                      className={`mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full text-3xl font-black ${
                        correct >= 4 ? "bg-green-500/20 text-green-400 shadow-[0_0_40px_rgba(34,197,94,0.3)]"
                        : correct >= 3 ? "bg-yellow-500/20 text-yellow-400" : "bg-red-500/20 text-red-400"
                      }`}>
                      {correct}/{totalPatients}
                    </motion.div>
                    <h3 className={`text-2xl font-black ${correct >= 4 ? "text-green-400" : correct >= 3 ? "text-yellow-400" : "text-red-400"}`}>
                      {correct === 5 ? "Perfect Doctor!" : correct >= 4 ? "Great Diagnosis!" : correct >= 3 ? "Not Bad!" : "Needs Practice"}
                    </h3>
                    <p className="text-sm text-white/40">{correct} of {totalPatients} patients correctly diagnosed</p>
                    <p className="mt-1 text-sm text-white/40">Lives remaining: {lives}/3</p>
                  </div>

                  {/* Results table */}
                  <div className="mb-8 overflow-hidden rounded-2xl border border-white/5">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-white/5 bg-white/[0.03]">
                          <th className="p-3 font-bold text-white/50">Patient</th>
                          <th className="p-3 font-bold text-white/50">Your Diagnosis</th>
                          <th className="p-3 font-bold text-white/50">Correct</th>
                          <th className="p-3 font-bold text-white/50">Result</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.map((r, i) => (
                          <tr key={i} className="border-b border-white/5">
                            <td className="p-3 font-bold text-white">{r.patient}</td>
                            <td className={`p-3 ${r.correct ? "text-green-400" : "text-red-400"}`}>{r.userDiag}</td>
                            <td className="p-3 text-white/60">{r.correctDiag}</td>
                            <td className="p-3">{r.correct ? <span className="text-green-400">✓</span> : <span className="text-red-400">✗</span>}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Explanation */}
                  <div className="mx-auto max-w-2xl rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6">
                    <h4 className="mb-3 text-sm font-bold uppercase tracking-widest text-indigo-400">Why Decision Trees?</h4>
                    <p className="text-base leading-relaxed text-white/70">
                      You just followed a <span className="font-bold text-indigo-300">Decision Tree</span> — a flowchart of
                      yes/no questions that narrows down to an answer. In medicine, getting the <span className="font-bold text-white">right path matters</span>:
                      one wrong turn could mean a missed diagnosis. That's why Decision Trees are valued in healthcare —
                      every decision is <span className="font-bold text-white">transparent and explainable</span>.
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                    <Link
                      to="/playground"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-bold text-white transition-all hover:scale-105 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] active:scale-95"
                    >
                      Return to Arena
                    </Link>
                    <Link to="/algorithms/decision-tree"
                      className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-6 py-3 font-bold text-white transition-all hover:bg-indigo-400 hover:scale-105 active:scale-95">
                      Deep Dive into Decision Trees
                    </Link>
                    <button onClick={handleRestart}
                      className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-bold text-white/60 transition-all hover:border-white/20 hover:text-white hover:scale-105 active:scale-95">
                      <RotateCcw className="h-4 w-4" /> Play Again
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
