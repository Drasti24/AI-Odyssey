import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Orbiting particle ring
function ParticleRing({ radius, count, duration, color, size = 3 }) {
    return (
        <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration, repeat: Infinity, ease: "linear" }}
        >
            {Array.from({ length: count }).map((_, i) => {
                const angle = (i / count) * Math.PI * 2;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                return (
                    <div
                        key={i}
                        style={{
                            position: "absolute",
                            left: `calc(50% + ${x}px - ${size / 2}px)`,
                            top: `calc(50% + ${y}px - ${size / 2}px)`,
                            width: size,
                            height: size,
                            borderRadius: "50%",
                            background: color,
                            opacity: 0.3 + (i / count) * 0.7,
                        }}
                    />
                );
            })}
        </motion.div>
    );
}

const TAGLINES = [
    "AI Is Not Magic",
    "Learn AI Visually",
    "Understand. Explore. Discover.",
];

export default function SplashScreen({ onFinish }) {
    const [taglineIndex, setTaglineIndex] = useState(0);
    const [exiting, setExiting] = useState(false);

    // Cycle through taglines
    useEffect(() => {
        const interval = setInterval(() => {
            setTaglineIndex((i) => {
                if (i < TAGLINES.length - 1) return i + 1;
                clearInterval(interval);
                return i;
            });
        }, 950);
        return () => clearInterval(interval);
    }, []);

    // Start exit after 3.2s
    useEffect(() => {
        const timer = setTimeout(() => {
            setExiting(true);
            // Give exit animation time, then notify parent
            setTimeout(onFinish, 900);
        }, 3200);
        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <AnimatePresence>
            {!exiting ? (
                <motion.div
                    key="splash"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.04 }}
                    transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 9999,
                        background: "#07070c",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                    }}
                >
                    {/* Ambient glows */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background:
                                "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(14,165,233,0.18) 0%, transparent 70%)",
                        }}
                    />
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background:
                                "radial-gradient(ellipse 40% 40% at 30% 70%, rgba(6,182,212,0.12) 0%, transparent 60%)",
                        }}
                    />

                    {/* Grid overlay */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            backgroundImage:
                                "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
                            backgroundSize: "50px 50px",
                        }}
                    />

                    {/* Orbital rings */}
                    <div style={{ position: "absolute", inset: 0 }}>
                        <ParticleRing radius={120} count={16} duration={8} color="rgba(34,211,238,0.8)" size={4} />
                        <ParticleRing radius={180} count={24} duration={14} color="rgba(56,189,248,0.7)" size={3} />
                        <ParticleRing radius={240} count={32} duration={20} color="rgba(125,211,252,0.5)" size={2} />
                    </div>

                    {/* Center logo pulse */}
                    <motion.div
                        style={{ position: "relative", zIndex: 2 }}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Glowing ring behind logo */}
                        <motion.div
                            style={{
                                position: "absolute",
                                inset: -24,
                                borderRadius: "50%",
                                border: "1.5px solid rgba(34,211,238,0.3)",
                                boxShadow: "0 0 40px rgba(34,211,238,0.15) inset",
                            }}
                            animate={{ scale: [1, 1.08, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                            <div
                                style={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: "50%",
                                    background: "linear-gradient(135deg, rgba(34,211,238,0.2), rgba(56,189,248,0.2))",
                                    border: "1.5px solid rgba(34,211,238,0.4)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="url(#splashGrad)"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <defs>
                                    <linearGradient id="splashGrad" x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="0%" stopColor="#22d3ee" />
                                        <stop offset="100%" stopColor="#38bdf8" />
                                    </linearGradient>
                                </defs>
                                <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
                                <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
                                <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
                                <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
                                <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
                                <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
                                <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
                                <path d="M6 18a4 4 0 0 1-1.967-.516" />
                                <path d="M19.967 17.484A4 4 0 0 1 18 18" />
                            </svg>
                        </div>
                    </motion.div>

                    {/* Site name */}
                    <motion.div
                        style={{
                            position: "relative",
                            zIndex: 2,
                            marginTop: 28,
                            textAlign: "center",
                        }}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <h1
                            style={{
                                fontSize: "2.5rem",
                                fontWeight: 900,
                                letterSpacing: "-0.02em",
                                color: "white",
                                lineHeight: 1.1,
                                margin: 0,
                            }}
                        >
                            AI{" "}
                            <span
                                style={{
                                    background: "linear-gradient(90deg, #22d3ee, #38bdf8, #7dd3fc)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                Odyssey
                            </span>
                        </h1>
                    </motion.div>

                    {/* Cycling tagline */}
                    <motion.div
                        style={{
                            position: "relative",
                            zIndex: 2,
                            marginTop: 14,
                            height: 28,
                            overflow: "hidden",
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={taglineIndex}
                                initial={{ y: 16, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -16, opacity: 0 }}
                                transition={{ duration: 0.35, ease: "easeOut" }}
                                style={{
                                    color: "rgba(255,255,255,0.5)",
                                    fontSize: "0.95rem",
                                    fontWeight: 500,
                                    letterSpacing: "0.04em",
                                    textAlign: "center",
                                    margin: 0,
                                }}
                            >
                                {TAGLINES[taglineIndex]}
                            </motion.p>
                        </AnimatePresence>
                    </motion.div>

                    {/* Loading bar */}
                    <motion.div
                        style={{
                            position: "relative",
                            zIndex: 2,
                            marginTop: 40,
                            width: 200,
                            height: 2,
                            borderRadius: 99,
                            background: "rgba(255,255,255,0.08)",
                            overflow: "hidden",
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <motion.div
                            style={{
                                height: "100%",
                                borderRadius: 99,
                                background: "linear-gradient(90deg, #22d3ee, #38bdf8)",
                            }}
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2.4, delay: 0.8, ease: "easeInOut" }}
                        />
                    </motion.div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}
