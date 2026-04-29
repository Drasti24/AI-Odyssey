import { Link } from "react-router-dom";
import { ArrowLeft, Rocket } from "lucide-react";
import Navbar from "../components/Navbar";

export default function Playground() {
  return (
    <main className="min-h-screen bg-[#07070c] text-white">
      <Navbar />
      <section className="px-8 pt-32 pb-20 text-center">
        <div className="mx-auto max-w-7xl flex flex-col items-center">
          <Link 
            to="/" 
            className="mb-12 inline-flex items-center gap-2 text-sm font-medium text-white/40 transition-colors hover:text-cyan-400 self-start"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-400 to-purple-600 p-1 mb-8 shadow-[0_0_30px_rgba(34,211,238,0.3)]">
            <div className="flex h-full w-full items-center justify-center rounded-[22px] bg-[#07070c]">
               <Rocket size={40} className="text-cyan-400 animate-pulse" />
            </div>
          </div>

          <h1 className="mb-4 text-6xl font-black">Playground</h1>
          <p className="max-w-2xl text-xl text-white/60 mb-12 leading-relaxed">
            Where Machine Learning meets Gaming. Test your algorithms in real-time challenges!
          </p>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-16 max-w-2xl w-full relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <h3 className="text-2xl font-bold mb-6 text-cyan-300">"Playground will come soon"</h3>
            <p className="text-white/40 leading-relaxed">
              We are building an arena where you can play games using the algorithms you've learned. Imagine controlling a character with a Neural Network or solving puzzles with K-Nearest Neighbors!
            </p>
            
            <div className="mt-10 inline-flex items-center gap-2 rounded-full bg-white/5 px-6 py-3 text-sm font-bold text-white/60">
               Status: <span className="text-purple-400 animate-pulse">Under Construction</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
