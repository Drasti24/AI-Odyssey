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
        <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#07070c]/80 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
                <button onClick={goHome} className="z-50 flex items-center gap-3">
                    <BrainCircuit className="h-8 w-8 text-cyan-400" />
                    <span className="text-xl font-bold">
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
                            className="absolute left-0 top-0 flex min-h-screen w-full flex-col items-center justify-center gap-8 bg-[#07070c] px-8 text-2xl font-bold md:hidden"
                        >
                            <button onClick={goHome} className="hover:text-cyan-400">
                                Home
                            </button>
                            <button onClick={() => goToSection("algorithms")} className="hover:text-cyan-400">
                                Algorithms
                            </button>
                            <Link to="/playground" onClick={() => setIsOpen(false)} className="hover:text-cyan-400">
                                Playground
                            </Link>
                            <button onClick={() => goToSection("about")} className="hover:text-cyan-400">
                                About
                            </button>
                            <button
                                onClick={() => handleTrigger("/story")}
                                className="text-orange-500"
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