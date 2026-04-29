import { Suspense } from "react";
import Navbar from "../components/Navbar";
import AlgorithmSection from "../components/AlgorithmSection";
import Footer from "../components/Footer";
import MountainScene from "../components/MountainScene";
import { motion } from "framer-motion";

export default function AlgorithmsPage() {
    return (
        <main className="relative min-h-screen bg-[#07070c] overflow-x-hidden">
            {/* Background Mountains */}
            <div className="fixed inset-0 z-0 opacity-60">
                <Suspense fallback={null}>
                    <MountainScene color="#8b5cf6" />
                </Suspense>
            </div>

            {/* Overlays for depth and readability */}
            <div className="pointer-events-none fixed inset-0 z-1 bg-[radial-gradient(ellipse_at_center,transparent_0%,#07070c_100%)] opacity-60" />
            <div className="pointer-events-none fixed inset-0 z-1 bg-gradient-to-t from-[#07070c] via-transparent to-transparent" />

            <div className="relative z-10">
                <Navbar />
                
                {/* Header Space */}
                <div className="pt-40 pb-10 text-center px-4">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-black text-white md:text-6xl uppercase tracking-tighter"
                        style={{ fontFamily: "'Press Start 2P', system-ui", lineHeight: '1.4' }}
                    >
                        AI <span className="bg-gradient-to-r from-cyan-300 via-white to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">Library</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mt-6 text-white/50 text-[10px] md:text-xs font-black uppercase tracking-[0.4em]"
                        style={{ fontFamily: "'Press Start 2P', system-ui" }}
                    >
                        Master the logic of intelligence
                    </motion.p>
                </div>

                <div className="pb-20">
                    {/* The Basics Section */}
                    <div className="mx-auto max-w-6xl px-6 mb-20">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12 backdrop-blur-xl"
                        >
                            <div className="grid gap-12 lg:grid-cols-2 items-center">
                                <div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400 mb-4 block" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                                        The Foundation
                                    </span>
                                    <h2 className="text-3xl font-black text-white mb-6 uppercase" style={{ fontFamily: "'Press Start 2P', system-ui", lineHeight: '1.4' }}>
                                        Don't let the <span className="text-red-500">math</span> scare you!
                                    </h2>
                                    <p className="text-lg text-white/60 mb-8 leading-relaxed">
                                        Algorithms are the backbone of AI and Machine Learning. They might look scary because of the complex math, but don't worry—we've got your back! Think of them as simple sets of rules that help machines learn from data.
                                    </p>
                                    
                                    <div className="space-y-6">
                                        <div className="rounded-2xl border border-white/5 bg-white/5 p-6 transition-all hover:border-cyan-500/30">
                                            <h3 className="text-sm font-black text-cyan-400 mb-2 uppercase" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                                                1. Supervised Learning
                                            </h3>
                                            <p className="text-sm text-white/50 leading-relaxed">
                                                Like a student with a teacher. You give the AI examples with the correct answers, and it learns to find the pattern.
                                            </p>
                                        </div>
                                        <div className="rounded-2xl border border-white/5 bg-white/5 p-6 transition-all hover:border-purple-500/30">
                                            <h3 className="text-sm font-black text-purple-400 mb-2 uppercase" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                                                2. Unsupervised Learning
                                            </h3>
                                            <p className="text-sm text-white/50 leading-relaxed">
                                                Like an explorer. You give the AI raw data with no answers, and it finds hidden groups and patterns on its own.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                                    <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                                        <img 
                                            src="/assets/ai-hierarchy.jpg" 
                                            alt="The Nested World of AI" 
                                            className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#07070c] via-transparent to-transparent opacity-60"></div>
                                        <div className="absolute bottom-4 left-6">
                                            <span className="text-[8px] font-black uppercase tracking-widest text-white/40" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                                                The AI Hierarchy
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="text-center mb-10">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 block mb-2" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                            Explore the Library
                        </span>
                        <div className="h-px w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto" />
                    </div>

                    <AlgorithmSection />
                </div>
                
                <Footer />
            </div>
        </main>
    );
}
