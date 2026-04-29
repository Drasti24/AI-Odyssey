import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Play, RotateCcw } from "lucide-react";
import { useState } from "react";

const data = {
    knn: {
        name: "K-Nearest Neighbors",
        icon: "◎",
        about:
            "KNN classifies a new data point by finding the closest training points and letting them vote.",
        type: "Supervised Learning",
    },
    "linear-regression": {
        name: "Linear Regression",
        icon: "↗",
        about:
            "Linear Regression predicts continuous values using a straight line that best fits the data.",
        type: "Supervised Learning",
    },
    "decision-tree": {
        name: "Decision Tree",
        icon: "⌘",
        about:
            "A Decision Tree predicts by asking yes/no questions and following branches until it reaches an answer.",
        type: "Supervised Learning",
    },
    "logistic-regression": {
        name: "Logistic Regression",
        icon: "S",
        about:
            "Logistic Regression predicts probability and uses that probability for classification.",
        type: "Supervised Learning",
    },
    "random-forest": {
        name: "Random Forest",
        icon: "♧",
        about:
            "Random Forest uses many decision trees and combines their votes for a stronger prediction.",
        type: "Supervised Learning",
    },
    "neural-network": {
        name: "Neural Network",
        icon: "⚡",
        about:
            "Neural Networks learn patterns using connected layers, weights, biases, and activation functions.",
        type: "Deep Learning",
    },
};

export default function AlgorithmPage() {
    const { id } = useParams();
    const algo = data[id] || data.knn;
    const [tab, setTab] = useState("Visual Learn");

    const tabs = ["Visual Learn", "Teach Me", "Step-by-Step", "Why?", "Mathematics"];

    return (
        <main className="min-h-screen bg-[#07070c]">
            <header className="flex items-center justify-between border-b border-white/10 px-10 py-5">
                <Link to="/" className="flex items-center gap-3 font-bold text-white/80 hover:text-cyan-300">
                    <ArrowLeft className="h-5 w-5" />
                    Back to Home
                </Link>

                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-2xl text-cyan-300">
                        {algo.icon}
                    </div>
                    <h1 className="text-xl font-bold">{algo.name}</h1>
                </div>
            </header>

            <section className="mx-auto max-w-7xl px-8 py-8">
                <div className="mb-8 flex flex-wrap gap-3 rounded-2xl bg-white/[0.04] p-2">
                    {tabs.map((item) => (
                        <button
                            key={item}
                            onClick={() => setTab(item)}
                            className={`rounded-xl px-6 py-4 font-semibold transition ${tab === item
                                    ? "bg-cyan-400 text-black"
                                    : "text-white/60 hover:bg-white/10 hover:text-white"
                                }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
                    <div>
                        {tab === "Visual Learn" && <VisualLearn />}
                        {tab === "Teach Me" && <TeachMe algo={algo} />}
                        {tab === "Step-by-Step" && <StepByStep />}
                        {tab === "Why?" && <WhyPanel />}
                        {tab === "Mathematics" && <MathPanel />}
                    </div>

                    <aside className="space-y-6">
                        <InfoCard title="About">{algo.about}</InfoCard>

                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                            <h3 className="mb-5 text-xl font-bold">Quick Info</h3>
                            <p className="mb-2 text-xs uppercase text-white/40">Type</p>
                            <p className="mb-5 text-cyan-300">{algo.type}</p>

                            <p className="mb-3 text-xs uppercase text-white/40">Modes</p>
                            <div className="flex flex-wrap gap-2">
                                {["Visual", "Teach", "Steps", "Why"].map((x) => (
                                    <span key={x} className="rounded-full bg-purple-400/15 px-3 py-1 text-sm text-purple-300">
                                        {x}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
}

function VisualLearn() {
    return (
        <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <div className="mb-6 flex gap-4">
                    <button className="flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 font-bold text-black">
                        <Play className="h-4 w-4" /> Play
                    </button>
                    <button className="flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 font-bold text-white/80">
                        <RotateCcw className="h-4 w-4" /> Reset
                    </button>
                </div>

                <label className="text-white/60">K Value: 5</label>
                <input className="mt-3 w-full accent-cyan-400" type="range" />

                <div className="mt-8 grid gap-5 md:grid-cols-2">
                    <div>
                        <label className="text-white/60">Test Point X</label>
                        <input className="mt-3 w-full accent-cyan-400" type="range" />
                    </div>
                    <div>
                        <label className="text-white/60">Test Point Y</label>
                        <input className="mt-3 w-full accent-cyan-400" type="range" />
                    </div>
                </div>
            </div>

            <div className="relative h-[430px] rounded-2xl border border-white/10 bg-black/30 p-6 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:70px_70px]" />

                {[
                    [20, 70, "cyan"], [30, 65, "cyan"], [35, 78, "cyan"],
                    [52, 48, "pink"], [60, 42, "pink"], [70, 55, "pink"],
                    [46, 60, "cyan"], [58, 62, "pink"], [66, 68, "pink"],
                ].map(([x, y, color], i) => (
                    <div
                        key={i}
                        className={`absolute h-4 w-4 rounded-full ${color === "cyan" ? "bg-cyan-300" : "bg-pink-400"
                            } shadow-lg`}
                        style={{ left: `${x}%`, top: `${y}%` }}
                    />
                ))}

                <div className="absolute left-[56%] top-[52%] h-6 w-6 rounded-full border-4 border-white bg-purple-500 shadow-[0_0_25px_rgba(168,85,247,0.9)]" />
            </div>
        </div>
    );
}

function TeachMe({ algo }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8">
            <h2 className="mb-4 text-3xl font-black">Teach Me Mode</h2>
            <p className="text-lg leading-8 text-white/70">
                {algo.name} is explained here in simple language. This section is for
                students who want the “what is this?” explanation before seeing the math
                or execution.
            </p>
        </div>
    );
}

function StepByStep() {
    const steps = [
        "Take the new input point.",
        "Compare it with existing training data.",
        "Calculate the distance or condition.",
        "Choose the closest points or correct branch.",
        "Return the final prediction.",
    ];

    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8">
            <h2 className="mb-6 text-3xl font-black">Step-by-Step Execution</h2>
            <div className="space-y-4">
                {steps.map((step, i) => (
                    <div key={step} className="rounded-xl border border-white/10 bg-black/20 p-5">
                        <span className="mr-3 text-cyan-300">Step {i + 1}</span>
                        {step}
                    </div>
                ))}
            </div>
        </div>
    );
}

function WhyPanel() {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8">
            <h2 className="mb-4 text-3xl font-black">Why?</h2>
            <p className="text-lg leading-8 text-white/70">
                This section explains why the algorithm makes each decision. The goal is
                to answer the exact questions students ask during exams: “why this
                formula?”, “why this prediction?”, and “why does this step matter?”
            </p>
        </div>
    );
}

function MathPanel() {
    return (
        <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8">
                <h2 className="mb-4 text-xl font-bold">Formula 1</h2>
                <div className="rounded-xl bg-black/30 p-6 font-mono text-xl text-cyan-300">
                    d(x,y) = sqrt(Σ(xᵢ - yᵢ)²)
                </div>
                <p className="mt-4 text-white/60">
                    This calculates the distance between two points.
                </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8">
                <h2 className="mb-4 text-xl font-bold">Formula 2</h2>
                <div className="rounded-xl bg-black/30 p-6 font-mono text-xl text-purple-300">
                    prediction = majority vote of nearest neighbors
                </div>
            </div>
        </div>
    );
}

function InfoCard({ title, children }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="mb-4 text-xl font-bold">{title}</h3>
            <p className="leading-7 text-white/60">{children}</p>
        </div>
    );
}