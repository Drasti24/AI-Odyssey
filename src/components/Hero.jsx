import { Suspense } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import MountainScene from "./MountainScene";

const fadeUp = (delay = 0) => ({
    initial: { y: 40, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
});

export default function Hero() {
    return (
        <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden px-8">
            {/* ── Three.js background ── */}
            <Suspense fallback={null}>
                <MountainScene />
            </Suspense>

            {/* ── Colour tints on top of the 3D scene ── */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_40%_40%,rgba(168,85,247,0.30),transparent_55%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(139,92,246,0.15),transparent_50%)]" />
            {/* Dark vignette at bottom so text is readable */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07070c] via-[#07070c]/40 to-transparent" />

            {/* ── Content (above the canvas) ── */}
            <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-center text-center">
                <div className="flex flex-col items-center">
                    {/* Main heading */}
                    <motion.h1
                        className="text-4xl font-black leading-tight md:text-6xl text-white uppercase"
                        style={{ fontFamily: "'Press Start 2P', system-ui" }}
                        {...fadeUp(0.1)}
                    >
                        AI is not magic
                    </motion.h1>

                    {/* Sub tagline */}
                    <motion.p
                        className="mt-6 max-w-lg text-lg leading-8 text-white/60"
                        {...fadeUp(0.2)}
                    >
                        Understand how AI works through interactive demos instead of boring theory.
                    </motion.p>

                    {/* Accent line */}
                    <motion.p
                        className="mt-4 text-xl font-bold text-cyan-400 uppercase tracking-[0.2em]"
                        {...fadeUp(0.3)}
                    >
                        Let's Make It Visible
                    </motion.p>

                    {/* CTA Path - Restructured for Clarity */}
                    <motion.div 
                        className="mt-16 grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-3" 
                        {...fadeUp(0.4)}
                    >
                        {/* Primary CTA: Timeline */}
                        <a
                            href="#timeline"
                            className="group relative flex flex-col items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 p-8 transition-all hover:bg-cyan-400/20 hover:shadow-[0_0_40px_rgba(34,211,238,0.2)] col-span-1"
                        >
                            <span className="mb-2 text-xl font-black text-cyan-300">Let’s See How AI Was Born</span>
                            <span className="text-xs font-medium text-white/40 leading-relaxed">Follow the 70-year journey of AI breakthroughs</span>
                        </a>

                        {/* Step 2: Algorithms */}
                        <a
                            href="#algorithms"
                            className="group relative flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-8 transition-all hover:border-white/20 hover:bg-white/10 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]"
                        >
                            <span className="mb-2 text-lg font-bold text-white transition-colors group-hover:text-cyan-300">Explore Algorithms</span>
                            <span className="text-xs font-medium text-white/30 leading-relaxed">Master KNN, Linear Regression & more</span>
                        </a>

                        {/* Step 3: Playground */}
                        <Link
                            to="/playground"
                            className="group relative flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-8 transition-all hover:border-white/20 hover:bg-white/10 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]"
                        >
                            <span className="mb-2 text-lg font-bold text-white transition-colors group-hover:text-cyan-300">Learn with Game</span>
                            <span className="text-xs font-medium text-white/30 leading-relaxed">Test your skills in the interactive playground</span>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}