import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Play, RotateCcw, Brain, Calculator, GraduationCap, ListChecks, HelpCircle } from "lucide-react";
import { useState, lazy, Suspense } from "react";

// Lazy load math components
const KNNMath = lazy(() => import("../components/math-engine/KNNMath"));
const LinearRegressionMath = lazy(() => import("../components/math-engine/LinearRegressionMath"));
const DecisionTreeMath = lazy(() => import("../components/math-engine/DecisionTreeMath"));
const NeuralNetworkMath = lazy(() => import("../components/math-engine/NeuralNetworkMath"));

const data = {
    knn: {
        name: "K-Nearest Neighbors",
        icon: "◎",
        about: "KNN classifies a new data point by finding the closest training points and letting them vote.",
        type: "Supervised Learning",
        color: "#f97316"
    },
    "linear-regression": {
        name: "Linear Regression",
        icon: "↗",
        about: "Linear Regression predicts continuous values using a straight line that best fits the data.",
        type: "Supervised Learning",
        color: "#3b82f6"
    },
    "decision-tree": {
        name: "Decision Tree",
        icon: "⌘",
        about: "A Decision Tree predicts by asking yes/no questions and following branches until it reaches an answer.",
        type: "Supervised Learning",
        color: "#10b981"
    },
    "logistic-regression": {
        name: "Logistic Regression",
        icon: "S",
        about: "Logistic Regression predicts probability and classifies results using a sigmoid curve.",
        type: "Supervised Learning",
        color: "#8b5cf6"
    },
    "random-forest": {
        name: "Random Forest",
        icon: "♧",
        about: "Random Forest combines many decision trees and lets them vote on the final answer.",
        type: "Supervised Learning",
        color: "#14b8a6"
    },
    "neural-network": {
        name: "Neural Network",
        icon: "⚡",
        about: "Neural Networks learn patterns using connected layers, weights, biases, and activation functions.",
        type: "Deep Learning",
        color: "#ec4899"
    },
    "kmeans": {
        name: "K-Means Clustering",
        icon: "⚝",
        about: "K-Means groups data points into clusters based on their similarity.",
        type: "Unsupervised Learning",
        color: "#f59e0b"
    },
};

export default function AlgorithmPage() {
    const { id } = useParams();
    const algo = data[id] || data.knn;
    const [tab, setTab] = useState("Mathematics"); // Default to Math as per user focus

    const tabs = [
        { name: "Visual Lab", icon: <Play size={16} /> },
        { name: "Teach Me", icon: <GraduationCap size={16} /> },
        { name: "Mathematics", icon: <Calculator size={16} /> },
        { name: "Pros & Cons", icon: <ListChecks size={16} /> },
        { name: "Why?", icon: <HelpCircle size={16} /> }
    ];

    return (
        <main className="min-h-screen bg-[#07070c] text-white selection:bg-cyan-500/30">
            <header className="sticky top-0 z-[100] flex items-center justify-between gap-3 border-b border-white/5 bg-black/40 px-4 py-4 backdrop-blur-xl sm:px-10 sm:py-5">
                <Link to="/algorithms" className="group flex items-center gap-2 text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> <span className="hidden sm:inline">Back</span>
                </Link>

                <div className="flex items-center gap-2 sm:gap-4">
                    <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-white/5 text-base sm:text-xl" style={{ color: algo.color }}>
                        {algo.icon}
                    </div>
                    <h1 className="text-center text-[9px] font-black uppercase sm:text-sm" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                        {algo.name}
                    </h1>
                </div>

                <div className="hidden sm:flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: algo.color }} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/20" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                        Active Module
                    </span>
                </div>
            </header>

            <section className="mx-auto max-w-7xl px-4 sm:px-8 py-6 sm:py-10">
                {/* Custom Tabs */}
                <div className="algo-tabs mb-8 flex items-center gap-2 overflow-x-auto pb-1 sm:mb-12 sm:flex-wrap sm:justify-center sm:gap-4 sm:overflow-visible sm:pb-0">
                    {tabs.map((t) => (
                        <button
                            key={t.name}
                            onClick={() => setTab(t.name)}
                            className={`algo-tab flex shrink-0 items-center gap-2 rounded-xl border px-4 py-3 text-[8px] font-black uppercase tracking-widest transition-all duration-300 sm:gap-3 sm:rounded-2xl sm:px-8 sm:py-4 sm:text-[10px] ${
                                tab === t.name
                                    ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                    : "bg-white/5 text-white/40 border-white/10 hover:border-white/30 hover:text-white"
                            }`}
                            style={{ fontFamily: "'Press Start 2P', system-ui" }}
                        >
                            {t.icon} <span className={t.name === "Mathematics" ? "hidden xs:inline" : ""}>{t.name}</span>
                            {t.name === "Mathematics" && <span className="xs:hidden">Math</span>}
                        </button>
                    ))}
                </div>

                <div className="min-h-[600px]">
                    <Suspense fallback={<div className="flex h-64 items-center justify-center text-cyan-400 animate-pulse">Loading Math Engine...</div>}>
                        {tab === "Visual Lab" && <VisualLearn algo={algo} />}
                        {tab === "Teach Me" && <TeachMe algo={algo} />}
                        {tab === "Mathematics" && <MathEngine id={id} />}
                        {tab === "Pros & Cons" && <ProsCons algo={algo} />}
                        {tab === "Why?" && <WhyPanel />}
                    </Suspense>
                </div>
            </section>
        </main>
    );
}

function MathEngine({ id }) {
    switch (id) {
        case "knn": return <KNNMath />;
        case "linear-regression": return <LinearRegressionMath />;
        case "decision-tree": return <DecisionTreeMath />;
        case "neural-network": return <NeuralNetworkMath />;
        default: return <div className="text-center py-20 text-white/30">Math module for this algorithm is coming soon!</div>;
    }
}

function VisualLearn({ algo }) {
    return (
        <div className="space-y-8">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl sm:rounded-3xl sm:p-8">
                <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
                    <button className="flex items-center justify-center gap-3 rounded-2xl bg-white px-5 py-4 text-[9px] font-black uppercase text-black transition-transform hover:scale-105 sm:px-8 sm:text-[10px]" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                        <Play size={16} fill="currentColor" /> Run Simulation
                    </button>
                    <button className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 px-5 py-4 text-[9px] font-black uppercase text-white/60 transition-all hover:bg-white/5 sm:px-8 sm:text-[10px]" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                        <RotateCcw size={16} /> Reset
                    </button>
                </div>

                <div className="grid gap-10 md:grid-cols-3">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Hyperparameters</label>
                        <input className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white" type="range" />
                    </div>
                </div>
            </div>

            <div className="relative h-[320px] overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-5 shadow-2xl sm:h-[500px] sm:rounded-3xl sm:p-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px]" />
                <div className="flex h-full items-center justify-center text-center text-2xl font-black text-white/10 opacity-10 sm:text-4xl">CANVAS_PLACEHOLDER</div>
            </div>
        </div>
    );
}

function TeachMe({ algo }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl sm:rounded-3xl sm:p-12">
            <h2 className="mb-6 text-2xl font-black uppercase sm:mb-8 sm:text-4xl" style={{ fontFamily: "'Press Start 2P', system-ui" }}>The {algo.name} Story</h2>
            <p className="max-w-4xl text-base leading-8 text-white/60 sm:text-xl sm:leading-10">
                Before we dive into the numbers, let's understand why we use this. {algo.about}
                Imagine a world where data is a conversation, and this algorithm is the translator.
            </p>
        </div>
    );
}

function ProsCons({ algo }) {
    return (
        <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-5 backdrop-blur-xl sm:rounded-3xl sm:p-8">
                <h3 className="mb-6 text-sm font-black uppercase text-green-400" style={{ fontFamily: "'Press Start 2P', system-ui" }}>Strengths</h3>
                <ul className="space-y-4 text-white/60">
                    <li className="flex gap-3">✓ <span className="flex-1 italic">Easy to understand and implement.</span></li>
                    <li className="flex gap-3">✓ <span className="flex-1 italic">Works well with small datasets.</span></li>
                </ul>
            </div>
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5 backdrop-blur-xl sm:rounded-3xl sm:p-8">
                <h3 className="mb-6 text-sm font-black uppercase text-red-400" style={{ fontFamily: "'Press Start 2P', system-ui" }}>Weaknesses</h3>
                <ul className="space-y-4 text-white/60">
                    <li className="flex gap-3">✗ <span className="flex-1 italic">Slows down with very large data.</span></li>
                    <li className="flex gap-3">✗ <span className="flex-1 italic">Sensitive to noisy data and outliers.</span></li>
                </ul>
            </div>
        </div>
    );
}

function WhyPanel() {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl sm:rounded-3xl sm:p-12">
            <h2 className="mb-6 text-2xl font-black uppercase sm:mb-8 sm:text-4xl" style={{ fontFamily: "'Press Start 2P', system-ui" }}>The "Why"</h2>
            <p className="max-w-4xl text-base leading-8 text-white/60 italic sm:text-xl sm:leading-10">
                &ldquo;Why this formula? Why not another? Mathematics isn't just a set of rules; it's a series of decisions. This section explains the intuition behind every choice made in the algorithm design.&rdquo;
            </p>
        </div>
    );
}
