import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThunderEffect() {
    const [flash, setFlash] = useState(false);

    useEffect(() => {
        const triggerFlash = () => {
            setFlash(true);
            // Flicker effect for realistic "thunder/lightning" atmosphere
            setTimeout(() => setFlash(false), 50);
            setTimeout(() => setFlash(true), 100);
            setTimeout(() => setFlash(false), 250);

            const nextFlash = 5000 + Math.random() * 10000;
            setTimeout(triggerFlash, nextFlash);
        };

        const timer = setTimeout(triggerFlash, 4000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {flash && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.4, 0.1, 0.4, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pointer-events-none absolute inset-0 z-[5] bg-white mix-blend-overlay"
                />
            )}
        </AnimatePresence>
    );
}
