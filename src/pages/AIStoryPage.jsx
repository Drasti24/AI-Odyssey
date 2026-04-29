import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCurtain } from "../components/CurtainTransition";
import { BrainCircuit, ArrowLeft, ArrowRight, Pause, Play, BookOpen } from "lucide-react";
import MountainScene from "../components/MountainScene";

const ERAS = [
    { year:"1950", chapter:"CH I", era:"THE QUESTION", title:"THE TURING TEST", icon:"🧠", accent:"#a855f7", focusText:"Can a machine think?", detail:"In 1950, Alan Turing published 'Computing Machinery and Intelligence,' proposing the Imitation Game. If a machine can fool a human judge through text conversation alone, it is said to be intelligent. Turing wasn't just proposing a benchmark — he was daring the world to define consciousness itself.", stat:"Cambridge, England · 1950" },
    { year:"1956", chapter:"CH II", era:"THE BIRTH", title:"ARTIFICIAL INTELLIGENCE", icon:"🔬", accent:"#06b6d4", focusText:"A new science is born.", detail:"John McCarthy, Marvin Minsky, and colleagues gathered at Dartmouth College with an audacious hypothesis: every aspect of human intelligence could be so precisely described that a machine could simulate it. McCarthy coined the term 'Artificial Intelligence.'", stat:"Dartmouth College · Summer 1956" },
    { year:"1966", chapter:"CH III", era:"THE FIRST VOICE", title:"ELIZA — THE FIRST CHATBOT", icon:"💬", accent:"#ec4899", focusText:"Humans fell in love with it.", detail:"MIT's Joseph Weizenbaum created ELIZA — a program that simulated a psychotherapist by reflecting questions back using pattern matching. Users poured their hearts out to it, forgetting they were talking to a machine.", stat:"MIT, Cambridge · 1966" },
    { year:"1986", chapter:"CH IV", era:"THE METHOD", title:"BACKPROPAGATION", icon:"⚡", accent:"#8b5cf6", focusText:"Errors became teachers.", detail:"Rumelhart, Hinton, and Williams published the backpropagation algorithm — propagating prediction errors backward through a network to adjust its weights. For the first time, deep networks could learn complex patterns from data.", stat:"Nature Journal · 1986" },
    { year:"1997", chapter:"CH V", era:"THE CHECKMATE", title:"DEEP BLUE VS. KASPAROV", icon:"♟️", accent:"#22d3ee", focusText:"The machine won.", detail:"Garry Kasparov — the greatest chess player who ever lived — sat across from IBM's Deep Blue, evaluating 200 million positions per second. After six tense games, Deep Blue won. The rules of the game had changed forever.", stat:"New York City · May 1997" },
    { year:"2006", chapter:"CH VI", era:"THE RENAISSANCE", title:"DEEP LEARNING AWAKENS", icon:"🌅", accent:"#f472b6", focusText:"The winter was finally over.", detail:"After years of AI winters, Geoffrey Hinton published a breakthrough: deep networks became possible. The consensus that neural nets were dead was shattered. A renaissance had begun, quietly at first, then all at once.", stat:"University of Toronto · 2006" },
    { year:"2012", chapter:"CH VII", era:"THE MOMENT", title:"ALEXNET SHOCKS THE WORLD", icon:"👁️", accent:"#a78bfa", focusText:"Images. Understood. By a machine.", detail:"AlexNet won the ImageNet challenge with a 15.3% error rate — obliterating the previous best of 26.2%. The gap was so enormous that competitors immediately abandoned hand-crafted approaches. Modern AI truly began.", stat:"ImageNet Challenge · September 2012" },
    { year:"2017", chapter:"CH VIII", era:"THE ARCHITECTURE", title:"ATTENTION IS ALL YOU NEED", icon:"🔮", accent:"#2dd4bf", focusText:"Every word attends to every word.", detail:"A team at Google Brain published 'Attention Is All You Need,' introducing the Transformer architecture. GPT, BERT, Gemini, Claude — every modern large language model is built on this eight-page paper.", stat:"Google Brain · NeurIPS 2017" },
    { year:"2020", chapter:"CH IX", era:"THE SCALE", title:"GPT-3 & THE LANGUAGE LEAP", icon:"📜", accent:"#fb7185", focusText:"It writes. It codes. It imagines.", detail:"GPT-3 arrived with 175 billion parameters — 100× larger than its predecessor. Scale turned out to be the secret ingredient everyone had underestimated for 70 years.", stat:"OpenAI, San Francisco · June 2020" },
    { year:"2022", chapter:"CH X", era:"THE AWAKENING", title:"CHATGPT CHANGES EVERYTHING", icon:"🚀", accent:"#818cf8", focusText:"100 million users. 60 days.", detail:"OpenAI released ChatGPT on November 30, 2022. One million users in five days. One hundred million in two months — the fastest product adoption in human history.", stat:"November 30, 2022 · Fastest product ever" },
    { year:"2024", chapter:"CH XI", era:"THE NEW FRONTIER", title:"MULTIMODAL AI & BEYOND", icon:"🌌", accent:"#4ade80", focusText:"It sees. It hears. It reasons.", detail:"By 2024, frontier AI could see images, hear audio, generate video, and reason across all modalities simultaneously. The question shifted from 'can machines think?' to 'what do we do when they can?'", stat:"2024 · The beginning of what comes next" },
];

function useTypewriter(text, speed = 40) {
    const [out, setOut] = useState("");
    const ref = useRef(null);
    useEffect(() => {
        setOut("");
        clearInterval(ref.current);
        let i = 0;
        const t = setTimeout(() => {
            ref.current = setInterval(() => {
                i++;
                setOut(text.slice(0, i));
                if (i >= text.length) clearInterval(ref.current);
            }, speed);
        }, 500);
        return () => { clearTimeout(t); clearInterval(ref.current); };
    }, [text]);
    return out;
}

const variants = {
    enter: (d) => ({ x: d > 0 ? "20%" : "-20%", opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d) => ({ x: d > 0 ? "-20%" : "20%", opacity: 0, scale: 0.95 }),
};

function EraSlide({ era, direction }) {
    const focus = useTypewriter(era.focusText);
    return (
        <motion.article
            key={era.year}
            className="absolute inset-0 flex flex-col justify-center px-10 md:px-32 lg:px-48"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="relative z-10 max-w-3xl">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className="mb-4 flex items-center gap-3">
                    <span className="inline-flex items-center gap-2 rounded-lg px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white backdrop-blur-md"
                        style={{ background: `${era.accent}33`, border: `1px solid ${era.accent}66`, fontFamily: "'Press Start 2P', system-ui" }}>
                        {era.chapter}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                        {era.era}
                    </span>
                </motion.div>

                <motion.h2 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="mb-6 text-4xl font-black text-white md:text-6xl uppercase tracking-tighter"
                    style={{ fontFamily: "'Press Start 2P', system-ui", lineHeight: '1.2' }}>
                    {era.title}
                </motion.h2>

                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                    className="mb-8 text-xl font-bold italic tracking-wide"
                    style={{ color: era.accent }}>
                    &ldquo;{focus}&rdquo;
                    <motion.span className="inline-block w-[3px] h-[0.9em] ml-2 align-middle bg-white"
                        animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }} />
                </motion.p>

                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                    className="max-w-2xl text-lg leading-relaxed text-white/70">
                    {era.detail}
                </motion.p>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                    className="mt-8 inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/40"
                    style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: era.accent }} />
                    {era.stat}
                </motion.div>
            </div>
        </motion.article>
    );
}

export default function AIStoryPage() {
    const { trigger } = useCurtain();
    const [active, setActive] = useState(0);
    const [direction, setDir] = useState(1);
    const [playing, setPlaying] = useState(true);
    const [progress, setProg] = useState(0);
    const rafRef = useRef(null);
    const AUTO = 9000;
    const era = ERAS[active];

    const advance = useCallback((dir) => {
        setDir(dir);
        setActive(a => (a + dir + ERAS.length) % ERAS.length);
    }, []);

    useEffect(() => {
        cancelAnimationFrame(rafRef.current);
        setProg(0);
        if (!playing) return;
        const start = performance.now();
        const tick = (now) => {
            const p = Math.min((now - start) / AUTO, 1);
            setProg(p);
            if (p < 1) rafRef.current = requestAnimationFrame(tick);
            else advance(1);
        };
        rafRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafRef.current);
    }, [active, playing, advance]);

    return (
        <div className="fixed inset-0 overflow-hidden bg-[#07070c] text-white">
            {/* Background Mountains */}
            <div className="absolute inset-0 z-0">
                <Suspense fallback={null}>
                    <MountainScene color={era.accent} />
                </Suspense>
            </div>

            {/* Overlays */}
            <div className="pointer-events-none absolute inset-0 z-1 bg-[radial-gradient(ellipse_at_center,transparent_0%,#07070c_100%)] opacity-40" />
            <div className="pointer-events-none absolute inset-0 z-1 bg-gradient-to-t from-[#07070c] via-transparent to-transparent" />

            {/* Navbar */}
            <nav className="absolute top-0 left-0 right-0 z-50 flex h-20 items-center justify-between px-8 backdrop-blur-md bg-black/20 border-bottom border-white/5">
                <button onClick={() => trigger("/")}
                    className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors"
                    style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                    <ArrowLeft size={16} /> Return
                </button>

                <div className="flex items-center gap-4">
                    <BrainCircuit size={24} style={{ color: era.accent }} />
                    <span className="text-sm font-black uppercase tracking-tighter" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                        AI <span style={{ color: era.accent }}>ODYSSEY</span>
                    </span>
                </div>

                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/40" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                    <BookOpen size={16} /> History
                </div>
            </nav>

            {/* Side Dots */}
            <div className="absolute right-8 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-4">
                {ERAS.map((_, i) => (
                    <button key={i} onClick={() => { setDir(i > active ? 1 : -1); setActive(i); }} className="group relative p-2">
                        <motion.div
                            animate={i === active ? { scale: 1.5, backgroundColor: era.accent } : { scale: 1, backgroundColor: "rgba(255,255,255,0.2)" }}
                            className="h-2 w-2 rounded-full transition-all group-hover:bg-white/60"
                        />
                        {i === active && (
                            <motion.div layoutId="activeDot" className="absolute inset-0 rounded-full border border-white/40" animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
                        )}
                    </button>
                ))}
            </div>

            {/* Main Content */}
            <div className="relative z-10 h-full w-full">
                <AnimatePresence custom={direction} mode="wait">
                    <EraSlide key={active} era={era} direction={direction} />
                </AnimatePresence>
            </div>

            {/* Footer / Controls */}
            <div className="absolute bottom-0 left-0 right-0 z-50 flex h-24 flex-col justify-center px-10 backdrop-blur-xl bg-black/40 border-t border-white/5">
                <div className="absolute top-0 left-0 h-[2px] bg-white/10 w-full overflow-hidden">
                    <motion.div className="h-full" style={{ background: era.accent, width: `${progress * 100}%` }} />
                </div>

                <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                            Timeline
                        </span>
                        <span className="text-sm font-bold text-white/90">
                            {era.year} · {era.title}
                        </span>
                    </div>

                    <div className="flex items-center gap-6">
                        <button onClick={() => advance(-1)} className="rounded-full border border-white/10 p-3 hover:bg-white/10 transition-colors">
                            <ArrowLeft size={20} />
                        </button>
                        <button onClick={() => setPlaying(p => !p)} className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black hover:scale-105 transition-transform">
                            {playing ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                        </button>
                        <button onClick={() => advance(1)} className="rounded-full border border-white/10 p-3 hover:bg-white/10 transition-colors">
                            <ArrowRight size={20} />
                        </button>
                    </div>

                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-white/30" style={{ fontFamily: "'Press Start 2P', system-ui" }}>
                        {active + 1} / {ERAS.length}
                    </div>
                </div>
            </div>
        </div>
    );
}
