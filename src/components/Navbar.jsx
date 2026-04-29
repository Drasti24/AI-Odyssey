import { BrainCircuit } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCurtain } from "./CurtainTransition";

export default function Navbar() {
    const { trigger } = useCurtain();
    const location = useLocation();
    const navigate = useNavigate();

    const goHome = () => {
        if (location.pathname === "/") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            navigate("/");
        }
    };

    const goToSection = (sectionId) => {
        if (location.pathname !== "/") {
            navigate("/");

            setTimeout(() => {
                document.getElementById(sectionId)?.scrollIntoView({
                    behavior: "smooth",
                });
            }, 150);
        } else {
            document.getElementById(sectionId)?.scrollIntoView({
                behavior: "smooth",
            });
        }
    };

    return (
        <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#07070c]/80 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
                <button onClick={goHome} className="flex items-center gap-3">
                    <BrainCircuit className="h-8 w-8 text-cyan-400" />
                    <span className="text-xl font-bold">
                        AI <span className="text-purple-400">Odyssey</span>
                    </span>
                </button>

                <div className="flex gap-8 text-sm font-medium text-white/70">
                    <button onClick={goHome} className="hover:text-cyan-300">
                        Home
                    </button>

                    <button
                        onClick={() => goToSection("algorithms")}
                        className="hover:text-cyan-300"
                    >
                        Algorithms
                    </button>

                    <Link to="/playground" className="hover:text-cyan-300">
                        Playground
                    </Link>

                    <button
                        onClick={() => goToSection("about")}
                        className="hover:text-cyan-300"
                    >
                        About
                    </button>

                    <button
                        onClick={() => trigger("/story")}
                        className="font-semibold transition-colors hover:text-orange-400"
                        style={{ color: "#EA580C" }}
                    >
                        🎭 Story
                    </button>
                </div>
            </div>
        </nav>
    );
}