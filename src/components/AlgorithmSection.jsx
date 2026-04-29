import AlgorithmCard from "./AlgorithmCard";

const algorithms = [
    {
        id: "knn",
        name: "K-Nearest Neighbors",
        icon: "◎",
        status: "MVP",
        description: "Classifies a new point by checking which nearby points are closest to it.",
    },
    {
        id: "linear-regression",
        name: "Linear Regression",
        icon: "↗",
        status: "MVP",
        description: "Predicts a number by finding the best-fit line through data points.",
    },
    {
        id: "decision-tree",
        name: "Decision Tree",
        icon: "⌘",
        status: "MVP",
        description: "Makes predictions by following yes/no questions like a flowchart.",
    },
    {
        id: "logistic-regression",
        name: "Logistic Regression",
        icon: "S",
        status: "Coming Soon",
        description: "Predicts probability and classifies results using a sigmoid curve.",
    },
    {
        id: "random-forest",
        name: "Random Forest",
        icon: "♧",
        status: "Coming Soon",
        description: "Combines many decision trees and lets them vote on the final answer.",
    },
    {
        id: "neural-network",
        name: "Neural Network",
        icon: "⚡",
        status: "MVP",
        description: "Learns patterns using layers, weights, biases, and activation functions.",
    },
    {
        id: "kmeans",
        name: "K-Means Clustering",
        icon: "⚝",
        status: "MVP",
        description: "Groups data points into clusters based on their similarity.",
    },
];

export default function AlgorithmSection() {
    return (
        <section id="algorithms" className="px-8 py-28">
            <div className="mx-auto max-w-7xl">
                <div className="mb-14 text-center">
                    <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-cyan-300">
                        Choose Your Path
                    </div>

                    <h2 className="text-5xl font-black">
                        Explore{" "}
                        <span className="bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Algorithms
                        </span>
                    </h2>

                    <p className="mt-5 text-white/60">
                        Pick an algorithm and see how it learns, calculates, and predicts.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {algorithms.map((algo) => (
                        <AlgorithmCard key={algo.id} algo={algo} />
                    ))}
                </div>
            </div>
        </section>
    );
}