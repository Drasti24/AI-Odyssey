import { BrainCircuit } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#07070c]/80 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
                <div className="flex items-center gap-3">
                    <BrainCircuit className="h-8 w-8 text-cyan-400" />
                    <span className="text-xl font-bold">
                        AI <span className="text-purple-400">Odyssey</span>
                    </span>
                </div>

                <div className="flex gap-8 text-sm font-medium text-white/70">
                    <a href="#home" className="hover:text-cyan-300">Home</a>
                    <a href="#algorithms" className="hover:text-cyan-300">Algorithms</a>
                    <a href="#about" className="hover:text-cyan-300">About</a>
                </div>
            </div>
        </nav>
    );
}