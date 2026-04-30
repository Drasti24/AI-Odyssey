import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import GlowCard from "./GlowCard";

export default function AlgorithmCard({ algo }) {
    const color = algo.color || "#22d3ee"; // fallback to cyan

    return (
        <GlowCard color={color} className="h-full" isHighlighted={algo.id === 'knn'}>
            <Link
                to={`/algorithms/${algo.id}`}
                className="group flex h-full flex-col p-6"
            >
                <div 
                    className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl text-2xl transition-colors duration-300"
                    style={{ backgroundColor: `${color}1A`, color: color }}
                >
                    {algo.icon}
                </div>

                <div className="mb-3 flex items-center gap-3">
                    <h3 
                        className="text-xl font-black text-white uppercase"
                        style={{ fontFamily: "'Press Start 2P', system-ui", fontSize: '0.8rem', lineHeight: '1.4' }}
                    >
                        {algo.name}
                    </h3>
                    <span
                        className="rounded px-2 py-0.5 text-[8px] font-black uppercase tracking-widest transition-colors duration-300"
                        style={{ backgroundColor: `${color}20`, color: color, fontFamily: "'Press Start 2P', system-ui" }}
                    >
                        {algo.status}
                    </span>
                </div>

                <p 
                    className="flex-1 text-xs leading-6 text-white/70"
                    style={{ fontFamily: "Inter, system-ui", fontWeight: 500 }}
                >
                    {algo.description}
                </p>

                <div 
                    className="mt-6 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest transition-colors duration-300"
                    style={{ color: color, fontFamily: "'Press Start 2P', system-ui" }}
                >
                    Open <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                </div>
            </Link>
        </GlowCard>
    );
}
