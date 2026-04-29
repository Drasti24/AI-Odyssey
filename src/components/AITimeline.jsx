import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const EVENTS = [
    {
        year: "1950",
        title: "Turing Test",
        desc: "Alan Turing proposes a test of machine intelligence — if a machine can fool a human, it thinks.",
        color: "#22d3ee",
        icon: "🧠",
    },
    {
        year: "1956",
        title: "Birth of AI",
        desc: 'John McCarthy coins "Artificial Intelligence" at the Dartmouth Conference, launching a new field.',
        color: "#a78bfa",
        icon: "🔬",
    },
    {
        year: "1997",
        title: "Deep Blue",
        desc: "IBM's Deep Blue defeats world chess champion Garry Kasparov — machines beat humans at strategy.",
        color: "#f472b6",
        icon: "♟️",
    },
    {
        year: "2012",
        title: "Deep Learning Boom",
        desc: "AlexNet wins ImageNet by a massive margin, igniting the modern deep learning revolution.",
        color: "#34d399",
        icon: "⚡",
    },
    {
        year: "2022",
        title: "ChatGPT Era",
        desc: "ChatGPT reaches 100M users in 2 months — AI becomes a daily tool for hundreds of millions.",
        color: "#fb923c",
        icon: "🚀",
    },
];

function TimelineCard({ event, index, isAbove }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`relative flex flex-col ${isAbove ? "justify-end pb-10" : "justify-start pt-10"} flex-1 min-w-[160px] max-w-[200px]`}
        >
            {/* Card */}
            <motion.div
                initial={{ opacity: 0, y: isAbove ? 20 : -20 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                style={{ borderColor: event.color + "40" }}
                className="rounded-2xl border bg-white/[0.04] p-4 backdrop-blur-sm hover:bg-white/[0.08] transition-colors group cursor-default"
            >
                {/* Year badge */}
                <div
                    className="mb-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold"
                    style={{ background: event.color + "20", color: event.color }}
                >
                    <span>{event.icon}</span>
                    {event.year}
                </div>
                <h3 className="mb-1 text-sm font-bold text-white leading-snug">{event.title}</h3>
                <p className="text-xs leading-5 text-white/50 group-hover:text-white/70 transition-colors">{event.desc}</p>
            </motion.div>

            {/* Connector line from card to dot */}
            <motion.div
                className={`absolute left-1/2 -translate-x-1/2 w-px`}
                style={{
                    background: `linear-gradient(${isAbove ? "to bottom" : "to top"}, ${event.color}60, transparent)`,
                    height: 40,
                    [isAbove ? "bottom" : "top"]: 0,
                }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={visible ? { scaleY: 1, opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: index * 0.12 + 0.2 }}
            />

            {/* Dot on the timeline */}
            <motion.div
                className="absolute left-1/2 -translate-x-1/2"
                style={{ [isAbove ? "bottom" : "top"]: -8 }}
                initial={{ scale: 0, opacity: 0 }}
                animate={visible ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: index * 0.12 + 0.3, type: "spring", stiffness: 300 }}
            >
                {/* Outer glow ring */}
                <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ background: event.color, filter: "blur(6px)", opacity: 0.5 }}
                    animate={{ scale: [1, 1.6, 1] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
                />
                <div
                    className="relative h-4 w-4 rounded-full border-2"
                    style={{
                        background: "#07070c",
                        borderColor: event.color,
                        boxShadow: `0 0 10px ${event.color}80`,
                        zIndex: 1,
                    }}
                />
            </motion.div>
        </div>
    );
}

export default function AITimeline() {
    const lineRef = useRef(null);
    const [lineVisible, setLineVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setLineVisible(true); },
            { threshold: 0.2 }
        );
        if (lineRef.current) observer.observe(lineRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="timeline" className="relative overflow-hidden px-8 py-24">
            {/* Ambient glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(124,58,237,0.10),transparent)]" />

            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <motion.div
                    className="mb-16 text-center"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-400/10 px-4 py-1.5 text-sm font-medium text-purple-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
                        AI History
                    </div>
                    <h2 
                        className="text-2xl font-black text-white md:text-4xl uppercase tracking-tighter"
                        style={{ fontFamily: "'Press Start 2P', system-ui", lineHeight: '1.4' }}
                    >
                        From idea to{" "}
                        <span className="bg-gradient-to-r from-cyan-300 via-white to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                            everyday tool
                        </span>
                    </h2>
                    <p className="mt-3 text-white/50 text-base max-w-md mx-auto">
                        Seven decades of breakthroughs that shaped the AI we use today.
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative" ref={lineRef}>
                    {/* Horizontal spine */}
                    <div className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 bg-white/10 overflow-hidden rounded-full">
                        <motion.div
                            className="h-full rounded-full"
                            style={{
                                background: "linear-gradient(90deg, #22d3ee, #a78bfa, #f472b6, #34d399, #fb923c)",
                            }}
                            initial={{ width: "0%" }}
                            animate={lineVisible ? { width: "100%" } : {}}
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        />
                    </div>

                    {/* Cards row */}
                    <div className="flex items-stretch justify-between gap-4">
                        {EVENTS.map((event, i) => (
                            <TimelineCard
                                key={event.year}
                                event={event}
                                index={i}
                                // Alternate above/below
                                isAbove={i % 2 === 0}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
