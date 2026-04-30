import { BrainCircuit, Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCurtain } from "./CurtainTransition";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const { trigger } = useCurtain();
    const location = useLocation();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const goHome = () => {
        setIsOpen(false);
        if (location.pathname === "/") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            navigate("/");
        }
    };

    const goToSection = (sectionId) => {
        setIsOpen(false);
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

    const handleTrigger = (path) => {
        setIsOpen(false);
        trigger(path);
    };

    return (
        <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#07070c]/85 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 md:px-8">
                <button onClick={goHome} className="z-50 flex items-center gap-3">
                    <BrainCircuit className="h-7 w-7 shrink-0 text-cyan-400 sm:h-8 sm:w-8" />
                    <span className="text-lg font-bold sm:text-xl">
                        AI <span className="text-purple-400">Odyssey</span>
                    </span>
                </button>

                {/* Desktop Menu */}
                <div className="hidden gap-8 text-sm font-medium text-white/70 md:flex">
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

                {/* Mobile Menu Toggle */}
                <button 
                    className="z-50 flex text-white md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="fixed inset-0 z-40 flex min-h-dvh w-full flex-col items-stretch justify-center gap-3 bg-[#07070c] px-5 py-24 text-xl font-bold md:hidden"
                        >
                            <button onClick={goHome} className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-center hover:text-cyan-400">
                                Home
                            </button>
                            <button onClick={() => goToSection("algorithms")} className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-center hover:text-cyan-400">
                                Algorithms
                            </button>
                            <Link to="/playground" onClick={() => setIsOpen(false)} className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-center hover:text-cyan-400">
                                Playground
                            </Link>
                            <button onClick={() => goToSection("about")} className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-center hover:text-cyan-400">
                                About
                            </button>
                            <button
                                onClick={() => handleTrigger("/story")}
                                className="rounded-2xl border border-orange-500/20 bg-orange-500/10 px-5 py-4 text-center text-orange-500"
                            >
                                🎭 Story
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}
