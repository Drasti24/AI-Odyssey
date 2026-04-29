import { motion } from "framer-motion";

export default function AIBubbles() {
    return (
        <div className="relative flex h-[430px] items-center justify-center">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex h-80 w-80 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/10 shadow-[0_0_80px_rgba(34,211,238,0.18)]"
            >
                <span className="absolute top-10 text-2xl font-bold text-cyan-300">AI</span>

                <motion.div
                    initial={{ scale: 0.7 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex h-56 w-56 items-center justify-center rounded-full border border-purple-400/40 bg-purple-400/10"
                >
                    <span className="absolute text-lg font-semibold text-purple-300">
                        Machine Learning
                    </span>

                    <motion.div
                        initial={{ scale: 0.6 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex h-32 w-32 items-center justify-center rounded-full border border-pink-400/40 bg-pink-400/10"
                    >
                        <span className="text-sm font-semibold text-pink-300">
                            Deep Learning
                        </span>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}