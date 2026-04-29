import { Link } from "react-router-dom";
import { ArrowLeft, Construction } from "lucide-react";
import Navbar from "../../components/Navbar";

export default function PlaceholderAlgo({ name, description }) {
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

          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300 mb-8 border border-cyan-400/20 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            <Construction size={40} />
          </div>

          <h1 className="mb-4 text-5xl font-black">{name}</h1>
          <p className="max-w-2xl text-lg text-white/60 mb-12">
            {description}
          </p>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-12 max-w-xl w-full">
            <h3 className="text-xl font-bold mb-4 italic text-cyan-300">"Coming Soon to AI Odyssey!"</h3>
            <p className="text-sm text-white/40 leading-relaxed">
              We are carefully crafting the interactive visualizations and step-by-step guides for {name}. Stay tuned for a journey into {name.toLowerCase()}!
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
