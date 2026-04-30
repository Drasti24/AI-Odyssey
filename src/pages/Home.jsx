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
                            { 
                                title: "Interactive Stories", 
                                text: "We turn complex AI logic into simple, visual stories anyone can follow.", 
                                color: "text-cyan-400" 
                            },
                            { 
                                title: "Live Visuals", 
                                text: "Watch the AI 'think' and see exactly how it makes every decision.", 
                                color: "text-purple-400" 
                            },
                            { 
                                title: "Play with Data", 
                                text: "Move points around and witness how the AI reacts instantly to your changes.", 
                                color: "text-emerald-400" 
                            },
                            { 
                                title: "No-Fear Math", 
                                text: "We break down the scary equations into simple, logical steps.", 
                                color: "text-amber-400" 
                            },
                            { 
                                title: "Fun Missions", 
                                text: "Take on challenges in our story-driven playground to test what you've learned.", 
                                color: "text-red-400" 
                            },
                        ].map(({ title, text, color }) => (
                            <div key={title} className="group rounded-3xl border border-white/5 bg-white/[0.02] p-8 transition-all hover:border-white/20 hover:bg-white/[0.04] hover:scale-[1.02]">
                                <h3 className={`mb-4 text-sm font-black uppercase tracking-widest ${color}`} style={{ fontFamily: "Inter, system-ui" }}>
                                    {title}
                                </h3>
                                <p className="text-base font-medium leading-relaxed text-white/50 group-hover:text-white/70 transition-colors">
                                    {text}
                                </p>
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