import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AlgorithmCard from "./AlgorithmCard";

const categories = {
    supervised: {
        title: "Supervised Learning",
        definition: "Learning from labeled data. Imagine a teacher showing a student pictures of cats and dogs and telling them which is which. The student learns the patterns to identify them on their own later.",
    },
    unsupervised: {
        title: "Unsupervised Learning",
        definition: "Learning from unlabeled data. Imagine giving a student a bucket of mixed blocks and asking them to group similar ones together. The student finds patterns and structures without being told what the groups are.",
    },
};

const algorithms = [
    {
        id: "knn",
        name: "K-Nearest Neighbors",
        icon: "◎",
        status: "MVP",
        description: "Classifies a new point by checking which nearby points are closest to it.",
        type: "supervised",
    },
    {
        id: "linear-regression",
        name: "Linear Regression",
        icon: "↗",
        status: "MVP",
        description: "Predicts a number by finding the best-fit line through data points.",
        type: "supervised",
    },
    {
        id: "decision-tree",
        name: "Decision Tree",
        icon: "⌘",
        status: "MVP",
        description: "Makes predictions by following yes/no questions like a flowchart.",
        type: "supervised",
    },
    {
        id: "logistic-regression",
        name: "Logistic Regression",
        icon: "S",
        status: "MVP",
        description: "Predicts probability and classifies results using a sigmoid curve.",
        type: "supervised",
    },
    {
        id: "random-forest",
        name: "Random Forest",
        icon: "♧",
        status: "MVP",
        description: "Combines many decision trees and lets them vote on the final answer.",
        type: "supervised",
    },
    {
        id: "neural-network",
        name: "Neural Network",
        icon: "⚡",
        status: "MVP",
        description: "Learns patterns using layers, weights, biases, and activation functions.",
        type: "supervised",
    },
    {
        id: "kmeans",
        name: "K-Means Clustering",
        icon: "⚝",
        status: "MVP",
        description: "Groups data points into clusters based on their similarity.",
        type: "unsupervised",
    },
];

export default function AlgorithmSection() {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const filteredAlgorithms = selectedCategory
        ? algorithms.filter((algo) => algo.type === selectedCategory)
        : [];

    return (
        <section id="algorithms" className="px-8 py-28">
            <div className="mx-auto max-w-7xl">
                <div className="mb-14 text-center">
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
                        className="text-3xl font-black uppercase tracking-tighter"
                        style={{ fontFamily: "'Press Start 2P', system-ui", lineHeight: '1.4' }}
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
                        className="mt-5 text-white/60"
                    >
                        Select a learning style to see how AI masters different tasks.
                    </motion.p>
                </div>

                {/* Category Selection */}
                <div className="mb-16 grid gap-6 md:grid-cols-2">
                    {Object.entries(categories).map(([key, cat], index) => (
                        <motion.button
                            key={key}
                            initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedCategory(key)}
                            className={`group relative overflow-hidden rounded-3xl border p-8 text-left transition-all duration-300 ${
                                selectedCategory === key
                                    ? "border-cyan-500/50 bg-cyan-500/10 shadow-[0_0_30px_-10px_rgba(6,182,212,0.3)]"
                                    : "border-white/10 bg-white/5 hover:border-white/20"
                            }`}
                        >
                            <div className="flex items-center gap-4">
                                <div>
                                    <h3 className={`text-2xl font-bold ${selectedCategory === key ? "text-cyan-300" : "text-white"}`}>
                                        {cat.title}
                                    </h3>
                                    <p className="mt-1 text-sm text-white/40">
                                        {key === 'supervised' ? '6 Algorithms' : '1 Algorithm'}
                                    </p>
                                </div>
                            </div>
                            
                            {selectedCategory === key && (
                                <motion.div 
                                    layoutId="activeCategory"
                                    className="absolute inset-0 border-2 border-cyan-500/50 rounded-3xl"
                                />
                            )}
                        </motion.button>
                    ))}
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
                            {/* Definition Box */}
                            <div className="mb-12 rounded-3xl border border-purple-500/20 bg-purple-500/5 p-8 backdrop-blur-sm">
                                <div className="flex items-start gap-4">
                                    <div>
                                        <h4 className="mb-2 text-lg font-bold text-purple-300">What is {categories[selectedCategory].title}?</h4>
                                        <p className="text-lg leading-relaxed text-white/70">
                                            {categories[selectedCategory].definition}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Algorithms Grid */}
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