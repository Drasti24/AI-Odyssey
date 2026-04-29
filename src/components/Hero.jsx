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

                    {/* CTA Path - Liquid Glass Design */}
                    <motion.div 
                        className="mt-16 grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-3" 
                        {...fadeUp(0.4)}
                    >
                        {[
                            {
                                id: "timeline",
                                to: "/story",
                                title: "AI BIRTH",
                                desc: "Follow the 70-year journey of breakthroughs.",
                                color: "from-cyan-400/20 to-purple-500/20",
                                blob: "bg-cyan-400/30",
                                titleClass: "text-cyan-300 transition-colors group-hover:text-cyan-200"
                            },
                            {
                                id: "algorithms",
                                to: "/algorithms",
                                title: "ALGORITHMS",
                                desc: "Master KNN, Trees & Neural Networks.",
                                color: "from-purple-500/20 to-pink-500/20",
                                blob: "bg-purple-500/30",
                                titleClass: "text-white/90 transition-colors group-hover:text-cyan-300"
                            },
                            {
                                id: "playground",
                                to: "/playground",
                                title: "PLAYGROUND",
                                desc: "Test your skills in the interactive arena.",
                                color: "from-red-500/20 to-orange-500/20",
                                blob: "bg-red-500/30",
                                // Red-White-Blue gradient matching the playground page
                                titleClass: "bg-gradient-to-r from-red-400 via-white to-cyan-400 bg-clip-text text-transparent group-hover:from-red-300 group-hover:to-cyan-300"
                            }
                        ].map((item, i) => (
                            <Link 
                                key={item.id} 
                                to={item.to} 
                                className="group relative flex flex-col items-center justify-center rounded-[2.5rem] border border-white/20 bg-white/[0.03] backdrop-blur-3xl transition-all duration-500 hover:scale-[1.03] hover:border-white/40 hover:bg-white/[0.08] hover:shadow-[0_20px_80px_rgba(0,0,0,0.4)] overflow-hidden"
                            >
                                {/* Animated Liquid Blobs */}
                                <div className="absolute inset-0 overflow-hidden rounded-[2.5rem]">
                                    <motion.div
                                        animate={{
                                            x: [0, 30, 0],
                                            y: [0, -20, 0],
                                            scale: [1, 1.2, 1],
                                        }}
                                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                        className={`absolute -left-4 -top-4 h-32 w-32 rounded-full blur-3xl ${item.blob}`}
                                    />
                                    <motion.div
                                        animate={{
                                            x: [0, -30, 0],
                                            y: [0, 20, 0],
                                            scale: [1, 1.3, 1],
                                        }}
                                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                        className="absolute -right-4 -bottom-4 h-32 w-32 rounded-full bg-indigo-500/20 blur-3xl"
                                    />
                                </div>

                                {/* Glass Surface */}
                                <div className="relative z-10 flex flex-col items-center justify-center p-10">
                                    <span 
                                        className={`mb-4 text-xl font-black drop-shadow-md md:text-2xl ${item.titleClass}`}
                                        style={{ fontFamily: "'Press Start 2P', system-ui", lineHeight: '1.4' }}
                                    >
                                        {item.title}
                                    </span>
                                    <span className="max-w-[200px] text-center text-[10px] font-bold uppercase tracking-widest text-white/50 leading-relaxed">
                                        {item.desc}
                                    </span>
                                </div>

                                {/* Glossy Overlay */}
                                <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent opacity-50" />
                            </Link>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}