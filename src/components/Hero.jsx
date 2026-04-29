import { motion } from "framer-motion";
import AIBubbles from "./AIBubbles";

export default function Hero() {
    return (
        <section id="home" className="relative min-h-screen overflow-hidden px-8 pt-32">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.18),transparent_40%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

            <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                >
                    <div className="mb-5 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-cyan-300">
                        Interactive ML Education
                    </div>

                    <h1 className="text-6xl font-black leading-tight md:text-7xl">
                        AI is not magic,{" "}
                        <span className="bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            let’s make it visible.
                        </span>
                    </h1>

                    <p className="mt-6 max-w-xl text-lg leading-8 text-white/60">
                        Learn machine learning by watching algorithms think step by step —
                        no blind memorizing, no black boxes.
                    </p>

                    <div className="mt-9 flex gap-4">
                        <a
                            href="#algorithms"
                            className="rounded-xl bg-cyan-400 px-7 py-4 font-bold text-black hover:bg-cyan-300"
                        >
                            Start Learning
                        </a>
                        <a
                            href="#about"
                            className="rounded-xl border border-white/10 bg-white/5 px-7 py-4 font-bold text-white hover:bg-white/10"
                        >
                            Learn More
                        </a>
                    </div>
                </motion.div>

                <AIBubbles />
            </div>
        </section>
    );
}