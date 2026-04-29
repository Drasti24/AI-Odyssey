import { useState } from "react";

export default function Footer() {
    const [showForm, setShowForm] = useState(false);

    if (window.location.pathname !== "/") return null;

    return (
        <footer
            id="contact"
            className="border-t border-white/10 bg-[#07070c] px-8 py-20"
        >
            <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_420px]">
                <div>
                    <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">
                        Built in 36 hours
                    </p>

                    <h2 className="mb-5 text-4xl font-black text-white">
                        Meet the Team
                    </h2>

                    <p className="mb-8 max-w-2xl text-lg leading-8 text-white/60">
                        We’re a team of students who wanted to make machine learning feel
                        intuitive, not intimidating. AI Odyssey turns complex algorithms
                        into interactive experiences where learners can play, experiment,
                        and understand how AI makes decisions.
                    </p>

                    <div className="mb-8 space-y-4">
                        <a href="https://www.linkedin.com/in/pateldrasti" target="_blank" rel="noreferrer" className="block rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-cyan-400/40 hover:bg-cyan-400/10">
                            <div className="font-bold text-white">Drasti Patel</div>
                            <div className="text-sm text-white/50">Frontend, UI/UX & Software Developer · LinkedIn</div>
                        </a>

                        <a href="https://www.linkedin.com/in/rudrahere21" target="_blank" rel="noreferrer" className="block rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-cyan-400/40 hover:bg-cyan-400/10">
                            <div className="font-bold text-white">Rudra Patel</div>
                            <div className="text-sm text-white/50">Project Manager & Developer · LinkedIn</div>
                        </a>

                        <a href="https://www.linkedin.com/in/jiya-pandit01" target="_blank" rel="noreferrer" className="block rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-cyan-400/40 hover:bg-cyan-400/10">
                            <div className="font-bold text-white">Jiya Pandit</div>
                            <div className="text-sm text-white/50">UI/UX & Content Designer · LinkedIn</div>
                        </a>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <button
                            onClick={() => setShowForm(true)}
                            className="rounded-xl bg-cyan-400 px-7 py-3 font-bold text-black transition hover:scale-105 hover:bg-cyan-300"
                        >
                            Send Feedback
                        </button>

                        <p className="text-sm text-white/40">
                            AI should be understood, not feared.
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_40px_rgba(34,211,238,0.08)]">
                    <img
                        src="/team.jpg"
                        alt="AI Odyssey team working together"
                        className="w-full rounded-2xl object-contain"
                    />
                </div>
            </div>

            <div className="mx-auto mt-16 max-w-6xl border-t border-white/10 pt-6 text-sm text-white/40">
                &copy; {new Date().getFullYear()} AI Odyssey. Built during a hackathon.
            </div>

            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
                    <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#0b0b12] p-8 shadow-2xl">
                        <div className="mb-6 flex items-center justify-between">
                            <h3 className="text-2xl font-black text-white">
                                Send Feedback
                            </h3>
                            <button
                                onClick={() => setShowForm(false)}
                                className="text-2xl text-white/50 hover:text-white"
                            >
                                ×
                            </button>
                        </div>

                        <form
                            action="https://formspree.io/f/meevybww"
                            method="POST"
                            className="space-y-4"
                        >
                            <input
                                name="name"
                                required
                                placeholder="Your name"
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/40 focus:border-cyan-400"
                            />

                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="Your email"
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/40 focus:border-cyan-400"
                            />

                            <select
                                name="type"
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-400"
                            >
                                <option className="bg-[#0b0b12]">Feedback</option>
                                <option className="bg-[#0b0b12]">Suggestion</option>
                                <option className="bg-[#0b0b12]">Question</option>
                            </select>

                            <textarea
                                name="message"
                                required
                                rows="5"
                                placeholder="Write your feedback, suggestion, or question..."
                                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/40 focus:border-cyan-400"
                            />

                            <button
                                type="submit"
                                className="w-full rounded-xl bg-cyan-400 px-6 py-3 font-bold text-black transition hover:bg-cyan-300"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </footer>
    );
}