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
                    <AlgorithmSection />
                </div>
                
                <Footer />
            </div>
        </main>
    );
}
