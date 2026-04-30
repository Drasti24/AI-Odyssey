import { Suspense, useState } from "react";
import Navbar from "../components/Navbar";
import AlgorithmSection from "../components/AlgorithmSection";
import Footer from "../components/Footer";
import MountainScene from "../components/MountainScene";
import { motion, AnimatePresence } from "framer-motion";

const learningInfo = {
    supervised: {
        title: "Supervised Learning",
        color: "cyan",
        simple:
            "Supervised learning is when AI learns from examples that already have correct answers.",
        example:
            "Example: You show the model pictures labeled Cat and Dog. Later, it looks at a new picture and predicts whether it is a cat or a dog.",
        quiz:
            "If we train AI using past house prices and then ask it to predict the price of a new house, is that supervised learning?",
        answer: "Yes — because the training data already has known answers.",
        button: "Explore Supervised Algorithms",
    },
    unsupervised: {
        title: "Unsupervised Learning",
        color: "purple",
        simple:
            "Unsupervised learning is when AI gets data without answers and tries to find patterns on its own.",
        example:
            "Example: You give the model customer shopping data, but no labels. It groups similar customers together by behavior.",
        quiz:
            "If we give AI a bunch of songs and ask it to group similar songs without labels, is that unsupervised learning?",
        answer: "Yes — because the model is finding hidden groups by itself.",
        button: "Explore Unsupervised Algorithms",
    },
};

export default function AlgorithmsPage() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [modalType, setModalType] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);

    const openLearningModal = (type) => {
        setModalType(type);
        setShowAnswer(false);
    };

    const closeModal = () => {
        setModalType(null);
        setShowAnswer(false);
    };

    const exploreCategory = (type) => {
        setSelectedCategory(type);
        closeModal();

        setTimeout(() => {
            document.getElementById("algorithms")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }, 150);
    };

    return (
        <main className="relative min-h-screen overflow-x-hidden bg-[#07070c]">
            <div className="fixed inset-0 z-0 opacity-60">
                <Suspense fallback={null}>
                    <MountainScene color="#8b5cf6" />
                </Suspense>
            </div>

            <div className="pointer-events-none fixed inset-0 z-1 bg-[radial-gradient(ellipse_at_center,transparent_0%,#07070c_100%)] opacity-60" />
            <div className="pointer-events-none fixed inset-0 z-1 bg-gradient-to-t from-[#07070c] via-transparent to-transparent" />

            <div className="relative z-10">
                <Navbar />

                <div className="px-4 pb-8 pt-32 text-center sm:pt-40">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-2xl font-black uppercase text-white sm:text-4xl md:text-6xl"
                        style={{ fontFamily: "'Press Start 2P', system-ui", lineHeight: "1.4" }}
                    >
                        AI{" "}
                        <span className="bg-gradient-to-r from-cyan-300 via-white to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                            Library
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mt-5 text-[8px] font-black uppercase tracking-[0.14em] text-white/50 sm:mt-6 sm:text-[10px] sm:tracking-[0.4em] md:text-xs"
                        style={{ fontFamily: "'Press Start 2P', system-ui" }}
                    >
                        Master the logic of intelligence
                    </motion.p>
                </div>

                <div className="pb-20">
                    <div className="mx-auto mb-12 max-w-6xl px-4 sm:mb-20 sm:px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:rounded-3xl sm:p-8 md:p-12"
                        >
                            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
                                <div>
                                    <span
                                        className="mb-4 block text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400"
                                        style={{ fontFamily: "'Press Start 2P', system-ui" }}
                                    >
                                        The Foundation
                                    </span>

                                    <h2
                                        className="mb-5 text-xl font-black uppercase text-white sm:mb-6 sm:text-3xl"
                                        style={{ fontFamily: "'Press Start 2P', system-ui", lineHeight: "1.4" }}
                                    >
                                        Don&apos;t let the <span className="text-red-500">math</span>{" "}
                                        scare you!
                                    </h2>

                                    <p className="mb-6 text-base leading-7 text-white/60 sm:mb-8 sm:text-lg sm:leading-relaxed">
                                        Before jumping into algorithms, start with how AI learns.
                                        Some models learn from answers. Others find patterns without
                                        answers. Pick a path below to understand the difference.
                                    </p>

                                    <div className="space-y-4 sm:space-y-6">
                                        <button
                                            onClick={() => openLearningModal("supervised")}
                                            className="w-full rounded-2xl border border-white/5 bg-white/5 p-5 text-left transition-all hover:border-cyan-500/40 hover:bg-cyan-500/10 sm:p-6"
                                        >
                                            <h3
                                                className="mb-2 text-xs font-black uppercase text-cyan-400 sm:text-sm"
                                                style={{ fontFamily: "'Press Start 2P', system-ui" }}
                                            >
                                                1. Supervised Learning
                                            </h3>
                                            <p className="text-sm leading-relaxed text-white/50">
                                                Like learning with a teacher. Click to see an easy
                                                example and mini check.
                                            </p>
                                        </button>

                                        <button
                                            onClick={() => openLearningModal("unsupervised")}
                                            className="w-full rounded-2xl border border-white/5 bg-white/5 p-5 text-left transition-all hover:border-purple-500/40 hover:bg-purple-500/10 sm:p-6"
                                        >
                                            <h3
                                                className="mb-2 text-xs font-black uppercase text-purple-400 sm:text-sm"
                                                style={{ fontFamily: "'Press Start 2P', system-ui" }}
                                            >
                                                2. Unsupervised Learning
                                            </h3>
                                            <p className="text-sm leading-relaxed text-white/50">
                                                Like exploring without answers. Click to see how AI
                                                discovers hidden patterns.
                                            </p>
                                        </button>
                                    </div>
                                </div>

                                <div className="group relative">
                                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 opacity-20 blur transition duration-1000 group-hover:opacity-40" />
                                    <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                                        <img
                                            src="/assets/ai-hierarchy.jpg"
                                            alt="The Nested World of AI"
                                            className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#07070c] via-transparent to-transparent opacity-60" />
                                        <div className="absolute bottom-4 left-4 sm:left-6">
                                            <span
                                                className="text-[8px] font-black uppercase tracking-widest text-white/40"
                                                style={{ fontFamily: "'Press Start 2P', system-ui" }}
                                            >
                                                The AI Hierarchy
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="mb-10 text-center">
                        <span
                            className="mb-2 block text-[10px] font-black uppercase tracking-[0.4em] text-white/30"
                            style={{ fontFamily: "'Press Start 2P', system-ui" }}
                        >
                            Explore the Library
                        </span>
                        <div className="mx-auto h-px w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </div>

                    <AlgorithmSection
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />
                </div>

                <Footer />
            </div>

            <AnimatePresence>
                {modalType && (
                    <LearningModal
                        type={modalType}
                        showAnswer={showAnswer}
                        setShowAnswer={setShowAnswer}
                        onClose={closeModal}
                        onExplore={() => exploreCategory(modalType)}
                    />
                )}
            </AnimatePresence>
        </main>
    );
}

function LearningModal({ type, showAnswer, setShowAnswer, onClose, onExplore }) {
    const info = learningInfo[type];
    const isSupervised = type === "supervised";

    return (
        <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                className="max-h-[88dvh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#101018] p-5 shadow-2xl sm:rounded-3xl sm:p-8"
            >
                <div className="mb-6 flex items-start justify-between gap-4 sm:gap-6">
                    <div>
                        <p
                            className={`mb-3 text-[10px] font-black uppercase tracking-[0.3em] ${isSupervised ? "text-cyan-300" : "text-purple-300"
                                }`}
                            style={{ fontFamily: "'Press Start 2P', system-ui" }}
                        >
                            Learning Path
                        </p>

                        <h3 className="text-2xl font-black text-white sm:text-3xl">{info.title}</h3>
                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-full border border-white/10 px-3 py-1 text-white/50 hover:bg-white/10 hover:text-white"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-5">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                        <h4 className="mb-2 font-bold text-white">In simple words</h4>
                        <p className="leading-7 text-white/60">{info.simple}</p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                        <h4 className="mb-2 font-bold text-white">Easy example</h4>
                        <p className="leading-7 text-white/60">{info.example}</p>
                    </div>

                    <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-5">
                        <h4 className="mb-3 font-bold text-cyan-300">Mini check</h4>
                        <p className="leading-7 text-white/70">{info.quiz}</p>

                        <button
                            onClick={() => setShowAnswer(true)}
                            className="mt-4 rounded-xl bg-white px-5 py-2 font-bold text-black hover:bg-cyan-100"
                        >
                            Show Answer
                        </button>

                        {showAnswer && (
                            <p className="mt-4 rounded-xl bg-black/30 p-4 text-sm leading-6 text-white/70">
                                {info.answer}
                            </p>
                        )}
                    </div>

                    <button
                        onClick={onExplore}
                        className={`w-full rounded-xl px-6 py-4 font-black text-black transition hover:scale-[1.01] ${isSupervised ? "bg-cyan-400 hover:bg-cyan-300" : "bg-purple-400 hover:bg-purple-300"
                            }`}
                    >
                        {info.button}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}
