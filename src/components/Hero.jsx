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
        <section id="home" className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-[#07070c] px-4 py-16 sm:px-8 sm:py-20">
            {/* ── Three.js background ── */}
            <Suspense fallback={null}>
                <MountainScene />
            </Suspense>

            {/* ── Visual Effects ── */}
            {/* Thunder is now integrated into MountainScene */}
            
            {/* ── Colour tints ── */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_40%_40%,rgba(168,85,247,0.15),transparent_55%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(139,92,246,0.08),transparent_50%)]" />
            
            {/* Dark vignette at bottom */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07070c] via-[#07070c]/70 to-transparent" />

            {/* ── Content ── */}
            <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-center pt-20 text-center sm:pt-24">
                <div className="flex flex-col items-center">
                    {/* Main heading */}
                    <motion.h1
                        className="max-w-[92vw] text-2xl font-black uppercase leading-tight text-white sm:text-4xl md:text-7xl"
                        style={{ fontFamily: "'Press Start 2P', system-ui", textShadow: '0 0-30px rgba(255,255,255,0.1)' }}
                        {...fadeUp(0.1)}
                    >
                        AI is not <span className="text-cyan-400">magic</span>
                    </motion.h1>

                    {/* Sub tagline */}
                    <motion.p
                        className="mt-5 max-w-[92vw] text-base leading-7 text-white/70 sm:mt-10 sm:max-w-2xl sm:text-xl sm:leading-relaxed"
                        {...fadeUp(0.2)}
                    >
                        Deconstruct the black box. Experience the logic through interactive experiments and visual storytelling.
                    </motion.p>

                    {/* Accent line */}
                    <motion.div
                        className="mt-8 flex max-w-[92vw] flex-col items-center gap-3 sm:mt-14 sm:gap-4"
                        {...fadeUp(0.3)}
                    >
                        <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-40 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                        <p className="text-sm font-black uppercase text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)] sm:text-2xl sm:tracking-[0.4em]">
                            Let's Make It Visible
                        </p>
                        <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-40 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                    </motion.div>

                    {/* CTA Path */}
                    <motion.div 
                        className="mt-12 grid w-full max-w-6xl grid-cols-1 gap-4 px-0 sm:mt-20 sm:gap-6 sm:px-4 md:grid-cols-3 lg:mt-24 lg:gap-10" 
                        {...fadeUp(0.4)}
                    >
                        {[
                            {
                                id: "timeline",
                                to: "/story",
                                title: "THE ORIGIN",
                                desc: "Follow the 70-year journey of digital breakthroughs.",
                                blob: "bg-cyan-400/20",
                                titleClass: "text-cyan-300 transition-colors group-hover:text-cyan-200"
                            },
                            {
                                id: "algorithms",
                                to: "/algorithms",
                                title: "ALGORITHMS",
                                desc: "Master KNN, Decision Trees & Neural Networks.",
                                blob: "bg-purple-500/20",
                                titleClass: "text-white transition-colors group-hover:text-cyan-300"
                            },
                            {
                                id: "playground",
                                to: "/playground",
                                title: "PLAYGROUND",
                                desc: "Stress test your skills in the interactive playground.",
                                blob: "bg-red-500/20",
                                titleClass: "bg-gradient-to-r from-red-400 via-white to-cyan-400 bg-clip-text text-transparent group-hover:from-red-300 group-hover:to-cyan-300"
                            }
                        ].map((item) => (
                            <Link 
                                key={item.id} 
                                to={item.to} 
                                className="group relative flex min-h-[165px] flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-3xl transition-all duration-700 hover:border-white/30 hover:bg-white/[0.05] sm:min-h-[220px] sm:rounded-[3.5rem] md:hover:scale-[1.05] md:hover:shadow-[0_40px_120px_rgba(0,0,0,0.7)]"
                            >
                                {/* Animated Liquid Blobs */}
                                <div className="absolute inset-0 overflow-hidden rounded-3xl sm:rounded-[3.5rem]">
                                    <motion.div
                                        animate={{
                                            x: [0, 40, 0],
                                            y: [0, -30, 0],
                                            scale: [1, 1.4, 1],
                                        }}
                                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                                        className={`absolute -left-8 -top-8 h-40 w-40 rounded-full blur-[60px] opacity-30 ${item.blob}`}
                                    />
                                    <motion.div
                                        animate={{
                                            x: [0, -40, 0],
                                            y: [0, 30, 0],
                                            scale: [1, 1.5, 1],
                                        }}
                                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                                        className="absolute -right-8 -bottom-8 h-40 w-40 rounded-full bg-indigo-500/10 blur-[60px] opacity-20"
                                    />
                                </div>

                                {/* Glass Surface */}
                                <div className="relative z-10 flex flex-col items-center justify-center p-6 sm:p-12">
                                    <span 
                                        className={`mb-4 text-base font-black drop-shadow-2xl sm:mb-6 sm:text-2xl ${item.titleClass}`}
                                        style={{ fontFamily: "'Press Start 2P', system-ui", lineHeight: '1.4' }}
                                    >
                                        {item.title}
                                    </span>
                                    <span className="max-w-[240px] text-center text-[8px] font-black uppercase tracking-[0.12em] text-white/35 transition-colors leading-relaxed group-hover:text-white/60 sm:text-[10px] sm:tracking-[0.2em]">
                                        {item.desc}
                                    </span>
                                </div>

                                {/* Glossy Overlay */}
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-black/20 opacity-40 sm:rounded-[3.5rem]" />
                            </Link>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
