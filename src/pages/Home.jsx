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
            <section id="about" className="px-8 py-20">
                <div className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-white/[0.04] p-10">
                    <h2 
                        className="mb-10 text-2xl font-black uppercase text-white"
                        style={{ fontFamily: "'Press Start 2P', system-ui" }}
                    >
                        Why AI Odyssey?
                    </h2>

                    <div className="grid gap-6 md:grid-cols-4">
                        {[
                            ["Teach Me", "Simple beginner-friendly explanations."],
                            ["Run It", "Interact with small datasets and inputs."],
                            ["Step-by-Step", "Watch the algorithm execute one action at a time."],
                            ["Why?", "Understand why each step is happening."],
                        ].map(([title, text]) => (
                            <div key={title} className="rounded-2xl border border-white/10 bg-black/20 p-6">
                                <h3 className="mb-3 text-xl font-bold text-cyan-300">{title}</h3>
                                <p className="text-sm leading-6 text-white/60">{text}</p>
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