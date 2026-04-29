import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function AlgorithmCard({ algo }) {
    return (
        <Link
            to={`/algorithm/${algo.id}`}
            className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-cyan-400/10"
        >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-400/10 text-2xl">
                {algo.icon}
            </div>

            <div className="mb-3 flex items-center gap-3">
                <h3 className="text-xl font-bold">{algo.name}</h3>
                <span
                    className={`rounded-full px-3 py-1 text-xs ${algo.status === "MVP"
                            ? "bg-cyan-400/15 text-cyan-300"
                            : "bg-purple-400/15 text-purple-300"
                        }`}
                >
                    {algo.status}
                </span>
            </div>

            <p className="text-sm leading-6 text-white/60">{algo.description}</p>

            <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-cyan-300">
                Open <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </div>
        </Link>
    );
}