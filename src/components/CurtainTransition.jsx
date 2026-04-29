import { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CurtainContext = createContext(null);

export function useCurtain() {
    return useContext(CurtainContext);
}

export function CurtainTransitionProvider({ children }) {
    // phase: "idle" | "in" | "out"
    const [phase, setPhase] = useState("idle");
    const navigate = useNavigate();

    const trigger = useCallback(
        (path) => {
            setPhase("in");
            // At peak darkness (600ms), navigate then start reveal
            setTimeout(() => {
                navigate(path);
                setTimeout(() => setPhase("out"), 80);
                setTimeout(() => setPhase("idle"), 900);
            }, 650);
        },
        [navigate]
    );

    return (
        <CurtainContext.Provider value={{ trigger }}>
            {children}

            {/* ── Cinematic scene-change overlay ── */}
            <AnimatePresence>
                {phase !== "idle" && (
                    <motion.div
                        key="scene-overlay"
                        className="fixed inset-0 z-[9999] pointer-events-all"
                        style={{ background: "#0a0400" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: phase === "in" ? 1 : 0 }}
                        transition={{
                            duration: phase === "in" ? 0.55 : 0.45,
                            ease: phase === "in" ? [0.4, 0, 0.2, 1] : [0.22, 1, 0.36, 1],
                        }}
                        exit={{ opacity: 0, transition: { duration: 0.4 } }}
                    >
                        {/* Golden iris glow pulse at center — feels like a candle being snuffed */}
                        <motion.div
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                            style={{
                                background:
                                    "radial-gradient(circle, rgba(212,160,23,0.55) 0%, rgba(180,83,9,0.25) 40%, transparent 70%)",
                                width: 600,
                                height: 600,
                            }}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={
                                phase === "in"
                                    ? { scale: [0, 1.4, 0.8], opacity: [0, 0.9, 0] }
                                    : { scale: [0.6, 1.6], opacity: [0.6, 0] }
                            }
                            transition={{ duration: 0.65, ease: "easeOut" }}
                        />

                        {/* Thin horizontal scan line — cinematic feel */}
                        <motion.div
                            className="absolute left-0 right-0 h-[1px]"
                            style={{
                                background:
                                    "linear-gradient(90deg, transparent, rgba(212,160,23,0.7) 30%, rgba(212,160,23,0.7) 70%, transparent)",
                                top: "50%",
                            }}
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: [0, 0.8, 0] }}
                            transition={{ duration: 0.6, delay: 0.05 }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </CurtainContext.Provider>
    );
}
