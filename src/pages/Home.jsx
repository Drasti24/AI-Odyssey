import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AITimeline from "../components/AITimeline";
import AlgorithmSection from "../components/AlgorithmSection";
import Footer from "../components/Footer";

export default function Home() {
    return (
        <main>
            <Navbar />
            <Hero />
            <section id="about" className="px-8 py-20 bg-[#07070c]">
                <div className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-white/[0.02] p-10 backdrop-blur-xl">
                    <h2 
                        className="mb-12 text-2xl font-black uppercase text-white text-center"
                        style={{ fontFamily: "'Press Start 2P', system-ui" }}
                    >
                        Why AI Odyssey?
                    </h2>

                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
                        {[
                            { title: "Teach Me", text: "Simple beginner-friendly explanations.", color: "text-cyan-400" },
                            { title: "Run It", text: "Interact with small datasets and inputs.", color: "text-purple-400" },
                            { title: "Step-by-Step", text: "Watch the algorithm execute one action at a time.", color: "text-emerald-400" },
                            { title: "Why?", text: "Understand why each step is happening.", color: "text-amber-400" },
                            { title: "Story Mode", text: "Learn algorithms then play the game.", color: "text-red-400" },
                        ].map(({ title, text, color }) => (
                            <div key={title} className="group rounded-2xl border border-white/5 bg-white/[0.03] p-6 transition-all hover:border-white/20 hover:bg-white/[0.06] hover:scale-105">
                                <h3 className={`mb-3 text-lg font-black uppercase tracking-tighter ${color}`} style={{ fontSize: '14px', lineHeight: '1.4' }}>{title}</h3>
                                <p className="text-xs font-medium leading-relaxed text-white/40 group-hover:text-white/60 transition-colors">{text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <AlgorithmSection />
            <AITimeline />
            <Footer />
        </main>
    );
}