import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AlgorithmCard from "./AlgorithmCard";

const categories = {
    supervised: {
        title: "Supervised Learning",
        definition:
            "Learning from labeled data. The model is trained with examples where the correct answer is already known.",
    },
    unsupervised: {
        title: "Unsupervised Learning",
        definition:
            "Learning from unlabeled data. The model looks for hidden groups, patterns, or structure without being given answers.",
    },
};

const algorithms = [
    {
        id: "knn",
        name: "K-Nearest Neighbors",
        icon: "◎",
        status: "MVP",
        description:
            "Classifies a new point by checking which nearby points are closest to it.",
        type: "supervised",
        color: "#f97316", // orange-500
    },
    {
        id: "linear-regression",
        name: "Linear Regression",
        icon: "↗",
        status: "MVP",
        description:
            "Predicts a number by finding the best-fit line through data points.",
        type: "supervised",
        color: "#3b82f6", // blue-500
    },
    {
        id: "decision-tree",
        name: "Decision Tree",
        icon: "⌘",
        status: "MVP",
        description:
            "Makes predictions by following yes/no questions like a flowchart.",
        type: "supervised",
        color: "#10b981", // emerald-500
    },
    {
        id: "logistic-regression",
        name: "Logistic Regression",
        icon: "S",
        status: "MVP",
        description:
            "Predicts probability and classifies results using a sigmoid curve.",
        type: "supervised",
        color: "#8b5cf6", // violet-500
    },
    {
        id: "random-forest",
        name: "Random Forest",
        icon: "♧",
        status: "MVP",
        description:
            "Combines many decision trees and lets them vote on the final answer.",
        type: "supervised",
        color: "#14b8a6", // teal-500
    },
    {
        id: "neural-network",
        name: "Neural Network",
        icon: "⚡",
        status: "MVP",
        description:
            "Learns patterns using layers, weights, biases, and activation functions.",
        type: "supervised",
        color: "#ec4899", // pink-500
    },
    {
        id: "kmeans",
        name: "K-Means Clustering",
        icon: "⚝",
        status: "MVP",
        description:
            "Groups data points into clusters based on their similarity.",
        type: "unsupervised",
        color: "#f59e0b", // amber-500
    },
];

export default function AlgorithmSection({
    selectedCategory: controlledCategory,
    setSelectedCategory: setControlledCategory,
}) {
    const [localCategory, setLocalCategory] = useState(null);

    const selectedCategory = controlledCategory ?? localCategory;
    const setSelectedCategory = setControlledCategory ?? setLocalCategory;

    const filteredAlgorithms = selectedCategory
        ? algorithms.filter((algo) => algo.type === selectedCategory)
        : [];

    return (
        <section id="algorithms" className="px-4 py-14 sm:px-8 sm:py-28">
            <div className="mx-auto max-w-7xl">
                <div className="mb-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-cyan-300"
                    >
                        Choose Your Path
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl font-black uppercase sm:text-3xl"
                        style={{
                            fontFamily: "'Press Start 2P', system-ui",
                            lineHeight: "1.4",
                        }}
                    >
                        Explore{" "}
                        <span className="bg-gradient-to-r from-cyan-300 via-white to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                            Algorithms
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-5 text-sm sm:text-base text-white/60"
                    >
                        Choose a path to start exploring algorithms.
                    </motion.p>
                </div>

                <p className="mb-8 text-center text-sm font-medium text-white/50 sm:mb-10 sm:text-base">
                    Select a category below to see how it works.
                </p>

                <div className="mb-10 grid gap-4 sm:mb-14 md:grid-cols-2 md:gap-6">
                    {Object.entries(categories).map(([key, cat], index) => {
                        const isSelected = selectedCategory === key;
                        const isSupervised = key === "supervised";

                        return (
                            <motion.button
                                key={key}
                                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setSelectedCategory(key)}
                                className={`group relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 sm:rounded-3xl sm:p-8 ${isSelected
                                        ? isSupervised
                                            ? "border-cyan-500/70 bg-cyan-500/10 shadow-[0_0_35px_-10px_rgba(6,182,212,0.7)]"
                                            : "border-purple-500/70 bg-purple-500/10 shadow-[0_0_35px_-10px_rgba(168,85,247,0.7)]"
                                        : "border-white/10 bg-white/5 hover:border-cyan-400/40 hover:bg-white/[0.08] hover:shadow-[0_0_25px_rgba(34,211,238,0.16)]"
                                    }`}
                            >
                                <div className="relative z-10">
                                    <div className="mb-5 flex items-center justify-between">
                                        <span
                                            className={`rounded-full border px-3 py-1 text-[8px] font-black uppercase tracking-[0.12em] sm:px-4 sm:text-[9px] sm:tracking-[0.2em] ${isSelected
                                                    ? isSupervised
                                                        ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-300"
                                                        : "border-purple-400/30 bg-purple-400/10 text-purple-300"
                                                    : "border-white/10 bg-white/5 text-white/30"
                                                }`}
                                        >
                                            {isSupervised ? "Path 01" : "Path 02"}
                                        </span>
                                    </div>

                                    <h3
                                        className={`text-xl font-bold sm:text-2xl ${isSelected
                                                ? isSupervised
                                                    ? "text-cyan-300"
                                                    : "text-purple-300"
                                                : "text-white"
                                            }`}
                                    >
                                        {cat.title}
                                    </h3>

                                    <p className="mt-3 text-base font-bold text-white/40 group-hover:text-white/60">
                                        {isSupervised ? "6 Active Modules" : "1 Active Module"}
                                    </p>

                                    <p
                                        className={`mt-5 text-xs font-bold transition group-hover:translate-x-1 sm:text-sm ${isSupervised ? "text-cyan-300" : "text-purple-300"
                                            }`}
                                    >
                                        {isSupervised
                                            ? "View Supervised Algorithms →"
                                            : "View Unsupervised Algorithms →"}
                                    </p>
                                </div>

                                <div
                                    className={`absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl transition-opacity ${isSelected ? "opacity-30" : "opacity-0 group-hover:opacity-20"
                                        } ${isSupervised ? "bg-cyan-400" : "bg-purple-400"}`}
                                />

                                {isSelected && (
                                    <motion.div
                                        layoutId="activeCategory"
                                        className={`absolute inset-0 rounded-3xl border-2 ${isSupervised
                                                ? "border-cyan-500/60"
                                                : "border-purple-500/60"
                                            }`}
                                    />
                                )}
                            </motion.button>
                        );
                    })}
                </div>

                <AnimatePresence mode="wait">
                    {selectedCategory && (
                        <motion.div
                            key={selectedCategory}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <p className="mb-6 text-center text-sm font-semibold text-cyan-300">
                                Showing {categories[selectedCategory].title} ↓
                            </p>

                            <div className="mb-12 rounded-3xl border border-purple-500/20 bg-purple-500/5 p-6 sm:p-10 backdrop-blur-sm shadow-[0_0_50px_rgba(168,85,247,0.05)]">
                                <h4 className="mb-4 text-base font-black uppercase tracking-widest text-purple-300 sm:text-xl" style={{ fontFamily: "Inter, system-ui" }}>
                                    What is {categories[selectedCategory].title}?
                                </h4>
                                <p className="text-base leading-relaxed text-white/70 sm:text-xl">
                                    {categories[selectedCategory].definition}
                                </p>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {filteredAlgorithms.map((algo) => (
                                    <AlgorithmCard key={algo.id} algo={algo} />
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
