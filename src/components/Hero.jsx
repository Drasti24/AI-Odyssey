import { Suspense } from "react";
import { motion } from "framer-motion";
import AIBubbles from "./AIBubbles";
import MountainScene from "./MountainScene";

const fadeUp = (delay = 0) => ({
    initial: { y: 40, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
});

export default function Hero() {
    return (
        <section id="home" className="relative min-h-screen overflow-hidden px-8 pt-32">
            {/* ── Three.js background ── */}
            <Suspense fallback={null}>
                <MountainScene />
            </Suspense>

            {/* ── Colour tints on top of the 3D scene ── */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_40%_40%,rgba(124,58,237,0.30),transparent_55%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(6,182,212,0.12),transparent_50%)]" />
            {/* Dark vignette at bottom so text is readable */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07070c] via-[#07070c]/40 to-transparent" />

            {/* ── Content (above the canvas) ── */}
            <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
                <div>
                    {/* Badge */}
                    <motion.div {...fadeUp(0)}>
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                            AI Is Not Magic
                        </div>
                    </motion.div>

                    {/* Main heading */}
                    <motion.h1
                        className="text-6xl font-black leading-[1.05] md:text-7xl"
                        {...fadeUp(0.1)}
                    >
                        Learn AI{" "}
                        <span className="bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Visually
                        </span>
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
                        className="mt-4 text-xl font-bold text-cyan-400"
                        {...fadeUp(0.3)}
                    >
                        Let's Make It Visible
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div className="mt-10 flex flex-wrap gap-4" {...fadeUp(0.4)}>
                        <a
                            href="#algorithms"
                            className="rounded-xl bg-cyan-400 px-7 py-4 font-bold text-black transition-all hover:bg-cyan-300 hover:shadow-[0_0_24px_rgba(34,211,238,0.5)]"
                        >
                            Start Learning
                        </a>
                        <a
                            href="#algorithms"
                            className="rounded-xl border border-white/15 bg-white/5 px-7 py-4 font-bold text-white transition-all hover:bg-white/10"
                        >
                            Explore Algorithms
                        </a>
                    </motion.div>
                </div>

                <AIBubbles />
            </div>
        </section>
    );
}