import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCurtain } from "../components/CurtainTransition";
import { BrainCircuit, ArrowLeft, ArrowRight, Pause, Play, BookOpen } from "lucide-react";

const ERAS = [
    { year:"1950", chapter:"Chapter I",   era:"The Question",     title:"The Turing Test",             icon:"🧠", accent:"#C2410C", focusText:"Can a machine think?",            detail:"In 1950, Alan Turing published 'Computing Machinery and Intelligence,' proposing the Imitation Game. If a machine can fool a human judge through text conversation alone, it is said to be intelligent. Turing wasn't just proposing a benchmark — he was daring the world to define consciousness itself. This single paper launched seven decades of pursuit.", stat:"Cambridge, England · 1950" },
    { year:"1956", chapter:"Chapter II",  era:"The Birth",        title:"Artificial Intelligence",      icon:"🔬", accent:"#D97706", focusText:"A new science is born.",           detail:"John McCarthy, Marvin Minsky, and colleagues gathered at Dartmouth College with an audacious hypothesis: every aspect of human intelligence could be so precisely described that a machine could simulate it. McCarthy coined the term 'Artificial Intelligence.' The race had officially begun — though no one knew how long the track would be.", stat:"Dartmouth College · Summer 1956" },
    { year:"1966", chapter:"Chapter III", era:"The First Voice",  title:"ELIZA — The First Chatbot",    icon:"💬", accent:"#B45309", focusText:"Humans fell in love with it.",     detail:"MIT's Joseph Weizenbaum created ELIZA — a program that simulated a psychotherapist by reflecting questions back using pattern matching. It knew nothing. Understood nothing. Yet users poured their hearts out to it, forgetting they were talking to a machine. ELIZA revealed one of AI's deepest truths: humans desperately want to believe.", stat:"MIT, Cambridge · 1966" },
    { year:"1986", chapter:"Chapter IV",  era:"The Method",       title:"Backpropagation",              icon:"⚡", accent:"#EA580C", focusText:"Errors became teachers.",          detail:"Rumelhart, Hinton, and Williams published the backpropagation algorithm — propagating prediction errors backward through a network to adjust its weights. For the first time, deep networks could learn complex patterns from data. Neural networks finally had a training method. They just needed 30 more years of computing power.", stat:"Nature Journal · 1986" },
    { year:"1997", chapter:"Chapter V",   era:"The Checkmate",    title:"Deep Blue vs. Kasparov",       icon:"♟️", accent:"#C2410C", focusText:"The machine won.",                 detail:"Garry Kasparov — the greatest chess player who ever lived — sat across from IBM's Deep Blue, evaluating 200 million positions per second. After six tense games, Deep Blue won. Kasparov accused IBM of cheating. He could not believe a machine had outplayed him. The rules of the game had changed forever.", stat:"New York City · May 1997" },
    { year:"2006", chapter:"Chapter VI",  era:"The Renaissance",  title:"Deep Learning Awakens",        icon:"🌅", accent:"#D97706", focusText:"The winter was finally over.",      detail:"After years of AI winters — funding cuts and broken promises — Geoffrey Hinton published a breakthrough: deep belief networks that could be pre-trained layer by layer. Truly deep networks became possible. The consensus that neural nets were dead was shattered. A renaissance had begun, quietly at first, then all at once.", stat:"University of Toronto · 2006" },
    { year:"2012", chapter:"Chapter VII", era:"The Moment",       title:"AlexNet Shocks the World",     icon:"👁️", accent:"#B45309", focusText:"Images. Understood. By a machine.", detail:"AlexNet won the ImageNet challenge with a 15.3% error rate — obliterating the previous best of 26.2%. Running on two consumer GPUs, the gap was so enormous that competitors immediately abandoned hand-crafted approaches. Every major tech company hired AI researchers in a frenzy. This is the day modern AI truly began.", stat:"ImageNet Challenge · September 2012" },
    { year:"2017", chapter:"Chapter VIII",era:"The Architecture", title:"Attention Is All You Need",    icon:"🔮", accent:"#EA580C", focusText:"Every word attends to every word.",  detail:"A team at Google Brain published 'Attention Is All You Need,' introducing the Transformer architecture. Unlike sequential models, Transformers process all tokens simultaneously — each attending to every other. GPT, BERT, Gemini, Claude — every modern large language model is built on this eight-page paper.", stat:"Google Brain · NeurIPS 2017" },
    { year:"2020", chapter:"Chapter IX",  era:"The Scale",        title:"GPT-3 & The Language Leap",   icon:"📜", accent:"#C2410C", focusText:"It writes. It codes. It imagines.", detail:"GPT-3 arrived with 175 billion parameters — 100× larger than its predecessor. From a simple text prompt it could write essays, complete code, translate languages, and compose poetry. No fine-tuning needed. Scale turned out to be the secret ingredient everyone had underestimated for 70 years.", stat:"OpenAI, San Francisco · June 2020" },
    { year:"2022", chapter:"Chapter X",   era:"The Awakening",    title:"ChatGPT Changes Everything",  icon:"🚀", accent:"#D97706", focusText:"100 million users. 60 days.",       detail:"OpenAI released ChatGPT on November 30, 2022. One million users in five days. One hundred million in two months — the fastest product adoption in human history. For the first time, the full power of a frontier AI was available to anyone with a browser and an idea.", stat:"November 30, 2022 · Fastest product ever" },
    { year:"2024", chapter:"Chapter XI",  era:"The New Frontier", title:"Multimodal AI & Beyond",      icon:"🌌", accent:"#B45309", focusText:"It sees. It hears. It reasons.",    detail:"By 2024, frontier AI could see images, hear audio, generate video, and reason across all modalities simultaneously. AI agents began browsing the web, managing files, building software without instruction. The question shifted from 'can machines think?' to 'what do we do when they can?'", stat:"2024 · The beginning of what comes next" },
];

// ── Typewriter ─────────────────────────────────────────────────────────────
function useTypewriter(text, speed = 46) {
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
        }, 550);
        return () => { clearTimeout(t); clearInterval(ref.current); };
    }, [text]); // eslint-disable-line
    return out;
}

// ── Slide ──────────────────────────────────────────────────────────────────
const variants = {
    enter: (d) => ({ x: d > 0 ? "75%"  : "-75%",  opacity: 0, scale: 0.97 }),
    center:       ({ x: 0, opacity: 1, scale: 1 }),
    exit:  (d) => ({ x: d > 0 ? "-45%" : "45%", opacity: 0, scale: 0.95 }),
};

function EraSlide({ era, direction }) {
    const focus = useTypewriter(era.focusText);
    return (
        <motion.article
            key={era.year}
            className="absolute inset-0 flex flex-col justify-center px-10 md:px-20 lg:px-32"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        >
            <div className="relative z-10 max-w-2xl">

                {/* Badge row */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.4 }}
                    className="mb-3 flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.65rem] font-bold tracking-widest uppercase"
                        style={{ background: era.accent + "18", color: era.accent, border: `1px solid ${era.accent}35`, fontFamily: "'Cinzel', serif" }}>
                        {era.icon} {era.chapter}
                    </span>
                    <span className="text-[0.65rem] font-medium tracking-wider" style={{ color: era.accent + "99", fontFamily: "'Cinzel', serif" }}>
                        {era.era}
                    </span>
                </motion.div>

                {/* Year — shown exactly once */}
                <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.4 }}
                    style={{ fontFamily: "'Cinzel Decorative', serif", color: era.accent, fontSize: "clamp(1.6rem, 3vw, 2.6rem)", fontWeight: 900, lineHeight: 1, marginBottom: "0.4rem" }}>
                    {era.year}
                </motion.p>

                {/* Title */}
                <motion.h2 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22, duration: 0.4 }}
                    style={{ fontFamily: "'Cinzel', serif", color: "#1C0A00", fontSize: "clamp(1.25rem, 2.6vw, 2.2rem)", fontWeight: 700, lineHeight: 1.25, marginBottom: "0.9rem" }}>
                    {era.title}
                </motion.h2>

                {/* Ornament */}
                <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ delay: 0.28, duration: 0.38, ease: "easeOut" }}
                    style={{ originX: 0 }} className="mb-4 flex items-center gap-2">
                    <div className="h-px w-14 rounded-full" style={{ background: era.accent }} />
                    <span style={{ color: era.accent, fontSize: "0.65rem" }}>✦</span>
                    <div className="h-px w-5 rounded-full" style={{ background: era.accent + "50" }} />
                </motion.div>

                {/* Focus typewriter */}
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.34, duration: 0.3 }}
                    style={{ fontFamily: "'IM Fell English', serif", fontStyle: "italic", fontSize: "clamp(1rem, 2vw, 1.55rem)", color: era.accent + "E5", lineHeight: 1.45, marginBottom: "1rem", minHeight: "2rem" }}>
                    &ldquo;{focus}&rdquo;
                    <motion.span className="inline-block w-[2px] h-[0.85em] ml-1 align-middle rounded-full"
                        style={{ background: era.accent }}
                        animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }} />
                </motion.p>

                {/* Detail */}
                <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.45 }}
                    style={{ fontFamily: "Inter, system-ui, sans-serif", color: "#6B3A1F", fontSize: "clamp(0.8rem, 1.25vw, 0.92rem)", lineHeight: 1.85, maxWidth: "580px" }}>
                    {era.detail}
                </motion.p>

                {/* Stat */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.4 }}
                    className="mt-5 inline-flex items-center gap-2 rounded-full px-3 py-1"
                    style={{ background: "#3D1A0008", border: `1px solid ${era.accent}22`, color: "#92400E", fontFamily: "'Cinzel', serif", fontSize: "0.65rem", letterSpacing: "0.07em" }}>
                    📍 {era.stat}
                </motion.div>
            </div>
        </motion.article>
    );
}

// ── Page ───────────────────────────────────────────────────────────────────
const NAV_H  = 48; // px
const FOOT_H = 64; // px

export default function AIStoryPage() {
    const { trigger } = useCurtain();
    const [active, setActive]   = useState(0);
    const [direction, setDir]   = useState(1);
    const [playing, setPlaying] = useState(true);
    const [progress, setProg]   = useState(0);
    const rafRef = useRef(null);
    const AUTO   = 7500;
    const era    = ERAS[active];

    const advance = useCallback((dir) => {
        setDir(dir);
        setActive(a => (a + dir + ERAS.length) % ERAS.length);
    }, []);

    useEffect(() => {
        cancelAnimationFrame(rafRef.current);
        setProg(0);
        if (!playing) return;
        const start = performance.now();
        const tick  = (now) => {
            const p = Math.min((now - start) / AUTO, 1);
            setProg(p);
            if (p < 1) rafRef.current = requestAnimationFrame(tick);
            else        advance(1);
        };
        rafRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafRef.current);
    }, [active, playing, advance]);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "ArrowRight")      advance(1);
            else if (e.key === "ArrowLeft")  advance(-1);
            else if (e.key === " ")         { e.preventDefault(); setPlaying(p => !p); }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [advance]);

    return (
        /* Lock to viewport — zero overflow */
        <div style={{ position: "fixed", inset: 0, overflow: "hidden",
            background: "linear-gradient(145deg, #FDF0DC 0%, #FFF8EE 55%, #FDE8C8 100%)" }}>

            {/* Ambient glow */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
                background: `radial-gradient(ellipse 60% 55% at 40% 38%, ${era.accent}0E, transparent 65%)`,
                transition: "background 1s" }} />

            {/* ── Navbar ── */}
            <nav style={{ position: "absolute", top: 0, left: 0, right: 0, height: NAV_H,
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "0 2rem", zIndex: 50,
                background: "rgba(253,240,220,0.92)", backdropFilter: "blur(16px)",
                borderBottom: `1px solid ${era.accent}1E` }}>

                <button onClick={() => trigger("/")}
                    className="flex items-center gap-2 group text-xs font-semibold transition-all hover:gap-3"
                    style={{ color: era.accent, fontFamily: "'Cinzel', serif", letterSpacing: "0.08em" }}>
                    <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
                    Return Home
                </button>

                <div className="flex items-center gap-2">
                    <BrainCircuit size={17} style={{ color: era.accent }} />
                    <span style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "0.85rem", color: "#1C0A00" }}>
                        AI <span style={{ color: era.accent }}>Odyssey</span>
                    </span>
                </div>

                <div className="flex items-center gap-2" style={{ color: "#92400E", fontFamily: "'Cinzel', serif", fontSize: "0.65rem", letterSpacing: "0.08em" }}>
                    <BookOpen size={12} /> The Story of AI
                </div>
            </nav>

            {/* ── Right-side era dots ── */}
            <div style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)",
                zIndex: 50, display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
                {ERAS.map((_, i) => (
                    <button key={i} title={ERAS[i].year}
                        onClick={() => { setDir(i > active ? 1 : -1); setActive(i); }}>
                        <motion.div className="rounded-full"
                            animate={i === active ? { scale: [1, 1.35, 1] } : { scale: 1 }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                            style={{ width: i === active ? 9 : 5, height: i === active ? 9 : 5,
                                background: i === active ? era.accent : "#C49760" + "45",
                                boxShadow: i === active ? `0 0 8px ${era.accent}80` : "none",
                                transition: "all 0.3s" }} />
                    </button>
                ))}
            </div>

            {/* ── Slide canvas — fills exactly the space between nav and footer ── */}
            <div style={{ position: "absolute", top: NAV_H, bottom: FOOT_H, left: 0, right: 0 }}>
                <AnimatePresence custom={direction} mode="wait">
                    <EraSlide key={active} era={era} direction={direction} />
                </AnimatePresence>
            </div>

            {/* ── Bottom strip ── */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: FOOT_H,
                background: "rgba(253,240,220,0.95)", backdropFilter: "blur(18px)",
                borderTop: `1px solid ${era.accent}1E`, padding: "0 1.5rem",
                display: "flex", flexDirection: "column", justifyContent: "center", gap: 8, zIndex: 50 }}>

                {/* Progress bar */}
                <div style={{ height: 2, width: "100%", borderRadius: 999, overflow: "hidden", background: era.accent + "18" }}>
                    <div style={{ height: "100%", borderRadius: 999, width: `${progress * 100}%`,
                        background: `linear-gradient(90deg, ${era.accent}, ${era.accent}99)`,
                        transition: "width 0.1s linear" }} />
                </div>

                {/* Controls row */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, maxWidth: 900, margin: "0 auto", width: "100%" }}>
                    {/* Era label */}
                    <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.65rem", color: era.accent,
                        letterSpacing: "0.1em", flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {era.chapter} · {era.title}
                    </span>

                    {/* Prev */}
                    <button onClick={() => advance(-1)}
                        className="flex items-center justify-center rounded-full transition-all hover:scale-110"
                        style={{ width: 32, height: 32, background: era.accent + "15", border: `1px solid ${era.accent}30`, color: era.accent }}>
                        <ArrowLeft size={13} />
                    </button>

                    {/* Play/Pause */}
                    <button onClick={() => setPlaying(p => !p)}
                        className="flex items-center justify-center rounded-full transition-all hover:scale-110"
                        style={{ width: 36, height: 36, background: era.accent, color: "white" }}>
                        {playing ? <Pause size={13} /> : <Play size={13} />}
                    </button>

                    {/* Next */}
                    <button onClick={() => advance(1)}
                        className="flex items-center justify-center rounded-full transition-all hover:scale-110"
                        style={{ width: 32, height: 32, background: era.accent + "15", border: `1px solid ${era.accent}30`, color: era.accent }}>
                        <ArrowRight size={13} />
                    </button>

                    {/* Counter */}
                    <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.7rem", color: era.accent, fontWeight: 700, tabularNums: true, flexShrink: 0 }}>
                        {String(active + 1).padStart(2, "0")} / {String(ERAS.length).padStart(2, "0")}
                    </span>
                </div>
            </div>
        </div>
    );
}
