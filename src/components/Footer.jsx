export default function Footer() {
    return (
        <footer id="contact" className="border-t border-white/10 bg-[#07070c] px-8 py-20 text-center">
            <div className="mx-auto max-w-4xl">
                <h2 className="mb-4 text-3xl font-black text-white">Meet the Team & Reach Out</h2>
                <p className="mb-8 text-lg text-white/60">
                    We are a group of passionate students building AI Odyssey to demystify artificial intelligence.
                    Have feedback or want to contribute? We'd love to hear from you!
                </p>
                <div className="flex flex-wrap items-center justify-center gap-6">
                    <a
                        href="mailto:hello@ai-odyssey.com"
                        className="rounded-xl bg-white px-8 py-3 font-bold text-black transition-all hover:scale-105 hover:bg-cyan-100"
                    >
                        Send Feedback
                    </a>
                    <a
                        href="#"
                        className="rounded-xl border border-white/20 bg-white/5 px-8 py-3 font-bold text-white transition-all hover:scale-105 hover:bg-white/10"
                    >
                        Meet the Creators
                    </a>
                </div>
                <div className="mt-16 text-sm text-white/40">
                    &copy; {new Date().getFullYear()} AI Odyssey. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
