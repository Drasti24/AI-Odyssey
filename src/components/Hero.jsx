import { Suspense } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import MountainScene from "./MountainScene";
import { useCurtain } from "./CurtainTransition";

const fadeUp = (delay = 0) => ({
    initial: { y: 40, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
});

export default function Hero() {
    const { trigger } = useCurtain();
    
    return (
        <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden px-8 bg-[#07070c]">
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
            <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-center text-center pt-20">
                <div className="flex flex-col items-center">
                    {/* Main heading */}
                    <motion.h1
                        className="text-4xl font-black leading-tight md:text-7xl text-white uppercase tracking-tighter"
                        style={{ fontFamily: "'Press Start 2P', system-ui", textShadow: '0 0-30px rgba(255,255,255,0.1)' }}
                        {...fadeUp(0.1)}
                    >
                        AI is not <span className="text-cyan-400">magic</span>
                    </motion.h1>

                    {/* Sub tagline */}
                    <motion.p
                        className="mt-10 max-w-2xl text-xl leading-relaxed text-white/70"
                        {...fadeUp(0.2)}
                    >
                        Deconstruct the black box. Experience the logic through interactive experiments and visual storytelling.
                    </motion.p>

                    {/* Accent line */}
                    <motion.div
                        className="mt-14 flex flex-col items-center gap-4"
                        {...fadeUp(0.3)}
                    >
                        <div className="h-px w-32 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-40 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                        <p className="text-2xl font-black text-cyan-400 uppercase tracking-[0.4em] drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                            Let's Make It Visible
                        </p>
                        <div className="h-px w-32 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-40 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                    </motion.div>

                    {/* CTA Path */}
                    <motion.div 
                        className="mt-24 grid w-full max-w-6xl grid-cols-1 gap-10 md:grid-cols-3 px-4" 
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
                                title: "THE ENGINE",
                                desc: "Master KNN, Decision Trees & Neural Networks.",
                                blob: "bg-purple-500/20",
                                titleClass: "text-white transition-colors group-hover:text-cyan-300"
                            },
                            {
                                id: "playground",
                                to: "/playground",
                                title: "THE ARENA",
                                desc: "Stress test your skills in the interactive playground.",
                                blob: "bg-red-500/20",
                                titleClass: "bg-gradient-to-r from-red-400 via-white to-cyan-400 bg-clip-text text-transparent group-hover:from-red-300 group-hover:to-cyan-300"
                            }
                        ].map((item, i) => (
                            <Link 
                                key={item.id} 
                                to={item.to} 
                                className="group relative flex flex-col items-center justify-center rounded-[3.5rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl transition-all duration-700 hover:scale-[1.05] hover:border-white/30 hover:bg-white/[0.05] hover:shadow-[0_40px_120px_rgba(0,0,0,0.7)] overflow-hidden min-h-[240px]"
                            >
                                {/* Animated Liquid Blobs */}
                                <div className="absolute inset-0 overflow-hidden rounded-[3.5rem]">
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
                                <div className="relative z-10 flex flex-col items-center justify-center p-12">
                                    <span 
                                        className={`mb-6 text-2xl font-black drop-shadow-2xl tracking-tighter ${item.titleClass}`}
                                        style={{ fontFamily: "'Press Start 2P', system-ui", lineHeight: '1.4' }}
                                    >
                                        {item.title}
                                    </span>
                                    <span className="max-w-[240px] text-center text-[10px] font-black uppercase tracking-[0.2em] text-white/30 leading-relaxed group-hover:text-white/60 transition-colors">
                                        {item.desc}
                                    </span>
                                </div>

                                {/* Glossy Overlay */}
                                <div className="absolute inset-0 rounded-[3.5rem] bg-gradient-to-br from-white/10 via-transparent to-black/20 opacity-40" />
                            </Link>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}