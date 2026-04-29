import { Link } from "react-router-dom";
import { ArrowLeft, Rocket, Play, Lock } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

// ─── Chapter data for the episode grid ───
const chapters = [
  {
    id: 1,
    title: "The Netflix Episode",
    subtitle: "How Netflix Recommends What You Watch",
    algorithm: "K-Nearest Neighbors",
    status: "available",
    path: "/playground/chapter-1",
    color: "red",
  },
  {
    id: 2,
    title: "The Real Estate Episode",
    subtitle: "Predicting House Prices",
    algorithm: "Linear Regression",
    status: "available",
    path: "/playground/chapter-2",
    color: "emerald",
  },
  {
    id: 3,
    title: "The Doctor Episode",
    subtitle: "Diagnosing Patients Step-by-Step",
    algorithm: "Decision Tree",
    status: "available",
    path: "/playground/chapter-3",
    color: "indigo",
  },
  {
    id: 4,
    title: "The Weather Episode",
    subtitle: "Will It Rain Today?",
    algorithm: "Logistic Regression",
    status: "available",
    path: "/playground/chapter-4",
    color: "purple",
  },
  {
    id: 5,
    title: "The FaceID Episode",
    subtitle: "How Your Phone Knows It's You",
    algorithm: "Neural Network",
    status: "available",
    path: "/playground/chapter-5",
    color: "orange",
  },
];

export default function Playground() {
  return (
    <main className="min-h-screen bg-[#07070c] text-white">
      <Navbar />
      <section className="px-8 pt-32 pb-20">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/"
            className="mb-12 inline-flex items-center gap-2 text-sm font-medium text-white/40 transition-colors hover:text-cyan-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="mb-16 text-center">
            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-red-500 to-purple-600 p-1 shadow-[0_0_30px_rgba(239,68,68,0.3)]">
              <div className="flex h-full w-full items-center justify-center rounded-[20px] bg-[#07070c]">
                <Rocket size={36} className="text-red-400" />
              </div>
            </div>

            <h1 className="mb-4 text-5xl font-black md:text-6xl">
              The{" "}
              <span className="bg-gradient-to-r from-red-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Playground
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-white/50 leading-relaxed">
              Learn how real companies use AI algorithms through interactive,
              scenario-based episodes. Can you guess the algorithm?
            </p>
          </div>

          {/* Chapter Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {chapters.map((ch, index) => (
              <motion.div
                key={ch.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {ch.status === "available" ? (() => {
                  const colors = {
                    red: { border: "border-red-500/20", bg: "bg-gradient-to-br from-red-500/10 to-transparent", hoverBorder: "hover:border-red-500/40", shadow: "hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]", via: "via-red-500", text: "text-red-400", hoverText: "group-hover:text-red-300", btnBg: "bg-red-600", btnShadow: "shadow-[0_0_15px_rgba(220,38,38,0.4)]", btnHover: "group-hover:shadow-[0_0_20px_rgba(220,38,38,0.6)]" },
                    emerald: { border: "border-emerald-500/20", bg: "bg-gradient-to-br from-emerald-500/10 to-transparent", hoverBorder: "hover:border-emerald-500/40", shadow: "hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]", via: "via-emerald-500", text: "text-emerald-400", hoverText: "group-hover:text-emerald-300", btnBg: "bg-emerald-600", btnShadow: "shadow-[0_0_15px_rgba(16,185,129,0.4)]", btnHover: "group-hover:shadow-[0_0_20px_rgba(16,185,129,0.6)]" },
                    indigo: { border: "border-indigo-500/20", bg: "bg-gradient-to-br from-indigo-500/10 to-transparent", hoverBorder: "hover:border-indigo-500/40", shadow: "hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]", via: "via-indigo-500", text: "text-indigo-400", hoverText: "group-hover:text-indigo-300", btnBg: "bg-indigo-600", btnShadow: "shadow-[0_0_15px_rgba(99,102,241,0.4)]", btnHover: "group-hover:shadow-[0_0_20px_rgba(99,102,241,0.6)]" },
                    purple: { border: "border-purple-500/20", bg: "bg-gradient-to-br from-purple-500/10 to-transparent", hoverBorder: "hover:border-purple-500/40", shadow: "hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]", via: "via-purple-500", text: "text-purple-400", hoverText: "group-hover:text-purple-300", btnBg: "bg-purple-600", btnShadow: "shadow-[0_0_15px_rgba(168,85,247,0.4)]", btnHover: "group-hover:shadow-[0_0_20px_rgba(168,85,247,0.6)]" },
                    orange: { border: "border-orange-500/20", bg: "bg-gradient-to-br from-orange-500/10 to-transparent", hoverBorder: "hover:border-orange-500/40", shadow: "hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]", via: "via-orange-500", text: "text-orange-400", hoverText: "group-hover:text-orange-300", btnBg: "bg-orange-600", btnShadow: "shadow-[0_0_15px_rgba(249,115,22,0.4)]", btnHover: "group-hover:shadow-[0_0_20px_rgba(249,115,22,0.6)]" },
                  };
                  const c = colors[ch.color] || colors.red;
                  return (
                  <Link to={ch.path} className="block group">
                    <div className={`relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:scale-[1.02] ${c.border} ${c.bg} ${c.hoverBorder} ${c.shadow}`}>
                      <div className={`h-0.5 absolute top-0 left-0 right-0 bg-gradient-to-r from-transparent to-transparent ${c.via}`} />
                      <div className="mb-4 flex items-center justify-between">
                        <span className={`text-xs font-bold uppercase tracking-widest ${c.text}`}>Chapter {ch.id}</span>
                        <div className="flex items-center gap-1.5 rounded-full bg-green-500/10 px-2.5 py-1 text-xs font-bold text-green-400">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" /> Available
                        </div>
                      </div>
                      <h3 className={`mb-1 text-xl font-black text-white transition-colors ${c.hoverText}`}>{ch.title}</h3>
                      <p className="mb-4 text-sm text-white/40">{ch.subtitle}</p>
                      <div className="flex items-center justify-between">
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-white/50">{ch.algorithm}</span>
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full text-white transition-shadow ${c.btnBg} ${c.btnShadow} ${c.btnHover}`}>
                          <Play className="h-3.5 w-3.5 fill-white" />
                        </div>
                      </div>
                    </div>
                  </Link>
                  );
                })() : (
                  /* Locked chapter card */
                  <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-6 opacity-60">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-widest text-white/30">
                        Chapter {ch.id}
                      </span>
                      <div className="flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-xs font-bold text-white/30">
                        <Lock className="h-3 w-3" />
                        Locked
                      </div>
                    </div>

                    <h3 className="mb-1 text-xl font-black text-white/40">
                      {ch.title}
                    </h3>
                    <p className="mb-4 text-sm text-white/20">{ch.subtitle}</p>

                    <div className="flex items-center justify-between">
                      <span className="rounded-full border border-white/5 bg-white/[0.02] px-3 py-1 text-xs font-bold text-white/20">
                        {ch.algorithm}
                      </span>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/20">
                        <Lock className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
