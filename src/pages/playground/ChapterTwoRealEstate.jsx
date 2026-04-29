import { useState, useRef, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Play, ChevronRight, Trophy, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../components/Navbar";

// ─── House data: Size (sq ft) vs Price ($) ───
const HOUSE_DATA = [
  { size: 850, price: 178000 }, { size: 1050, price: 222000 },
  { size: 1200, price: 265000 }, { size: 1420, price: 298000 },
  { size: 1550, price: 315000 }, { size: 1700, price: 348000 },
  { size: 1850, price: 378000 }, { size: 2050, price: 410000 },
  { size: 2250, price: 445000 }, { size: 2500, price: 495000 },
  { size: 2750, price: 528000 }, { size: 3000, price: 572000 },
];

// ─── Chart layout ───
const SVG_W = 700, SVG_H = 450;
const PAD = { left: 85, right: 30, top: 30, bottom: 50 };
const CW = SVG_W - PAD.left - PAD.right;
const CH = SVG_H - PAD.top - PAD.bottom;
const SIZE_R = [600, 3300], PRICE_R = [100000, 650000];

// ─── Coordinate mapping ───
const sizeToX = (s) => PAD.left + ((s - SIZE_R[0]) / (SIZE_R[1] - SIZE_R[0])) * CW;
const priceToY = (p) => PAD.top + CH - ((p - PRICE_R[0]) / (PRICE_R[1] - PRICE_R[0])) * CH;
const yToPrice = (y) => PRICE_R[0] + ((PAD.top + CH - y) / CH) * (PRICE_R[1] - PRICE_R[0]);

// ─── Least-squares regression ───
function leastSquares(data) {
  const n = data.length;
  let sx = 0, sy = 0, sxy = 0, sx2 = 0;
  for (const d of data) { sx += d.size; sy += d.price; sxy += d.size * d.price; sx2 += d.size * d.size; }
  const slope = (n * sxy - sx * sy) / (n * sx2 - sx * sx);
  const intercept = (sy - slope * sx) / n;
  return { slope, intercept, predict: (x) => slope * x + intercept };
}

// ─── R² score ───
function rSquared(data, predict) {
  const mean = data.reduce((s, d) => s + d.price, 0) / data.length;
  let ssTot = 0, ssRes = 0;
  for (const d of data) { ssTot += (d.price - mean) ** 2; ssRes += (d.price - predict(d.size)) ** 2; }
  return Math.max(0, 1 - ssRes / ssTot);
}

export default function ChapterTwoRealEstate() {
  const [phase, setPhase] = useState("preview");
  const [score, setScore] = useState(0);
  // User's line: y-positions of left and right handles
  const [hL, setHL] = useState(priceToY(300000));
  const [hR, setHR] = useState(priceToY(400000));
  const [dragging, setDragging] = useState(null);
  const svgRef = useRef(null);

  const regression = useMemo(() => leastSquares(HOUSE_DATA), []);

  // User's prediction at a given house size
  const userPredict = useCallback((size) => {
    const t = (sizeToX(size) - PAD.left) / CW;
    return yToPrice(hL + t * (hR - hL));
  }, [hL, hR]);

  // ─── SVG pointer helpers ───
  const getSVGY = (e) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return 0;
    const cy = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
    return ((cy - rect.top) / rect.height) * SVG_H;
  };

  const onDown = (which) => (e) => { e.preventDefault(); setDragging(which); };
  const onMove = (e) => {
    if (!dragging) return;
    const y = Math.max(PAD.top, Math.min(PAD.top + CH, getSVGY(e)));
    dragging === "L" ? setHL(y) : setHR(y);
  };
  const onUp = () => setDragging(null);

  const handleLockIn = () => {
    const r2 = rSquared(HOUSE_DATA, userPredict);
    setScore(Math.round(r2 * 100));
    setTimeout(() => setPhase("result"), 400);
  };

  const handleRestart = () => {
    setPhase("preview"); setHL(priceToY(300000)); setHR(priceToY(400000)); setScore(0); setDragging(null);
  };

  // ─── Reusable chart SVG ───
  const Chart = ({ showResult }) => (
    <svg ref={svgRef} viewBox={`0 0 ${SVG_W} ${SVG_H}`}
      className="w-full rounded-2xl border border-emerald-500/10 bg-[#060d06]"
      onPointerMove={!showResult ? onMove : undefined}
      onPointerUp={!showResult ? onUp : undefined}
      onPointerLeave={!showResult ? onUp : undefined}
      style={{ touchAction: "none" }}
    >
      {/* Grid */}
      {[200000, 300000, 400000, 500000, 600000].map((p) => (
        <g key={p}>
          <line x1={PAD.left} y1={priceToY(p)} x2={PAD.left + CW} y2={priceToY(p)} stroke="white" strokeOpacity="0.06" />
          <text x={PAD.left - 10} y={priceToY(p) + 4} textAnchor="end" fill="white" fillOpacity="0.3" fontSize="11" fontFamily="monospace">${p / 1000}k</text>
        </g>
      ))}
      {[1000, 1500, 2000, 2500, 3000].map((s) => (
        <g key={s}>
          <line x1={sizeToX(s)} y1={PAD.top} x2={sizeToX(s)} y2={PAD.top + CH} stroke="white" strokeOpacity="0.06" />
          <text x={sizeToX(s)} y={PAD.top + CH + 20} textAnchor="middle" fill="white" fillOpacity="0.3" fontSize="11" fontFamily="monospace">{s}</text>
        </g>
      ))}
      <text x={PAD.left + CW / 2} y={SVG_H - 5} textAnchor="middle" fill="white" fillOpacity="0.4" fontSize="12" fontWeight="bold">Size (sq ft)</text>
      <text x={15} y={PAD.top + CH / 2} textAnchor="middle" fill="white" fillOpacity="0.4" fontSize="12" fontWeight="bold" transform={`rotate(-90, 15, ${PAD.top + CH / 2})`}>Price ($)</text>
      <rect x={PAD.left} y={PAD.top} width={CW} height={CH} fill="none" stroke="white" strokeOpacity="0.08" rx="4" />

      {/* Error lines (result only) */}
      {showResult && HOUSE_DATA.map((d, i) => {
        const x = sizeToX(d.size);
        const t = (x - PAD.left) / CW;
        return <line key={i} x1={x} y1={priceToY(d.price)} x2={x} y2={hL + t * (hR - hL)} stroke="#ef4444" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="4 3" />;
      })}

      {/* Actual regression line (result only) */}
      {showResult && (
        <line x1={PAD.left} y1={priceToY(regression.predict(SIZE_R[0]))} x2={PAD.left + CW} y2={priceToY(regression.predict(SIZE_R[1]))} stroke="#10b981" strokeWidth="3" strokeDasharray="8 4" opacity="0.9" />
      )}

      {/* User's line */}
      <line x1={PAD.left} y1={hL} x2={PAD.left + CW} y2={hR}
        stroke={showResult ? "#fbbf24" : "#10b981"} strokeWidth="2.5" opacity={showResult ? 0.7 : 1}
        style={{ pointerEvents: "none", filter: showResult ? "none" : "drop-shadow(0 0 6px rgba(16,185,129,0.4))" }}
      />

      {/* Data points */}
      {HOUSE_DATA.map((d, i) => (
        <g key={i}>
          <circle cx={sizeToX(d.size)} cy={priceToY(d.price)} r="6" fill="#10b981" opacity="0.2" />
          <circle cx={sizeToX(d.size)} cy={priceToY(d.price)} r="4" fill="#10b981" />
        </g>
      ))}

      {/* Draggable handles (game only) */}
      {!showResult && <>
        {[["L", PAD.left, hL, setHL], ["R", PAD.left + CW, hR, setHR]].map(([id, cx, cy]) => (
          <g key={id} onPointerDown={onDown(id)} style={{ cursor: "grab" }}>
            <circle cx={cx} cy={cy} r="16" fill="#10b981" opacity="0.15" />
            <circle cx={cx} cy={cy} r="10" fill="#0a0a0a" stroke="#10b981" strokeWidth="3" />
            <circle cx={cx} cy={cy} r="3" fill="#10b981" />
          </g>
        ))}
      </>}

      {/* Legend (result only) */}
      {showResult && <>
        <rect x={PAD.left + 10} y={PAD.top + 8} width="180" height="52" rx="8" fill="black" fillOpacity="0.6" />
        <line x1={PAD.left + 20} y1={PAD.top + 26} x2={PAD.left + 45} y2={PAD.top + 26} stroke="#fbbf24" strokeWidth="2.5" />
        <text x={PAD.left + 52} y={PAD.top + 30} fill="#fbbf24" fontSize="11" fontWeight="bold">Your Line</text>
        <line x1={PAD.left + 20} y1={PAD.top + 46} x2={PAD.left + 45} y2={PAD.top + 46} stroke="#10b981" strokeWidth="3" strokeDasharray="6 3" />
        <text x={PAD.left + 52} y={PAD.top + 50} fill="#10b981" fontSize="11" fontWeight="bold">Best Fit (Regression)</text>
      </>}
    </svg>
  );

  return (
    <main className="min-h-screen bg-[#070c07] text-white">
      <Navbar />
      <section className="px-6 pt-28 pb-20">
        <div className="mx-auto max-w-5xl">
          <Link to="/playground" className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-white/40 transition-colors hover:text-emerald-400">
            <ArrowLeft className="h-4 w-4" /> Back to Playground
          </Link>

          {/* Top bar */}
          <div className="mb-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-1.5 w-32 overflow-hidden rounded-full bg-white/10">
                <motion.div className="h-full rounded-full bg-emerald-500" initial={{ width: "0%" }}
                  animate={{ width: phase === "preview" ? "10%" : phase === "game" ? "50%" : "100%" }} transition={{ duration: 0.6 }} />
              </div>
              <span className="text-xs font-bold text-white/40">Chapter 2 of 5</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/5 px-4 py-1.5 text-sm font-bold text-yellow-400">
              <Trophy className="h-4 w-4" />{score} pts
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* ── PREVIEW ── */}
            {phase === "preview" && (
              <motion.div key="preview" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
                <div className="group relative overflow-hidden rounded-3xl border border-emerald-500/10 bg-gradient-to-br from-[#0a1a0a] to-[#070c07]">
                  <div className="h-1 w-full bg-gradient-to-r from-emerald-700 via-emerald-500 to-emerald-700" />
                  <div className="p-10 md:p-14">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-md bg-emerald-600/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-400">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" /> Interactive Game
                    </div>
                    <h1 className="mb-2 text-lg font-black tracking-[0.3em] text-emerald-500/80 uppercase">AI Odyssey Originals</h1>
                    <h2 className="mb-6 text-4xl font-black leading-tight md:text-5xl">
                      Episode 2:{" "}
                      <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                        Predicting House Prices
                      </span>
                    </h2>
                    <p className="mb-10 max-w-2xl text-lg leading-relaxed text-white/50">
                      You're a real estate agent trying to predict house prices. Can you draw the perfect line through the data? Drag and fit — this time, <span className="text-emerald-400 font-bold">you</span> are the algorithm.
                    </p>
                    <button onClick={() => setPhase("game")}
                      className="inline-flex items-center gap-3 rounded-xl bg-emerald-600 px-8 py-4 text-lg font-black text-white shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all hover:bg-emerald-500 hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] hover:scale-105 active:scale-95">
                      <Play className="h-5 w-5 fill-white" /> Play Episode
                    </button>
                  </div>
                  <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-emerald-600/10 blur-3xl" />
                </div>
              </motion.div>
            )}

            {/* ── GAME ── */}
            {phase === "game" && (
              <motion.div key="game" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
                <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 md:p-10">
                  {/* Instructions */}
                  <div className="mb-8 rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.03] p-5 md:p-6">
                    <h3 className="mb-2 text-sm font-bold uppercase tracking-widest text-emerald-400">Your Mission</h3>
                    <p className="text-base leading-relaxed text-white/70">
                      Each <span className="font-bold text-emerald-400">green dot</span> is a house — its size and price.
                      Drag the <span className="font-bold text-white">two handles</span> on the line's edges to fit it through the data as best you can.
                      When you're happy, hit <span className="font-bold text-white">"Lock In"</span>!
                    </p>
                  </div>

                  {/* Chart */}
                  <Chart showResult={false} />

                  {/* Lock in button */}
                  <div className="mt-6 text-center">
                    <button onClick={handleLockIn}
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-8 py-3 text-lg font-black text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all hover:bg-emerald-500 hover:scale-105 active:scale-95">
                      Lock In My Line
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── RESULT ── */}
            {phase === "result" && (
              <motion.div key="result" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
                <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 md:p-10">
                  {/* Score */}
                  <div className="mb-8 text-center">
                    <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", bounce: 0.5 }}
                      className={`mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full text-3xl font-black ${
                        score >= 80 ? "bg-emerald-500/20 text-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.3)]"
                        : score >= 50 ? "bg-yellow-500/20 text-yellow-400 shadow-[0_0_40px_rgba(234,179,8,0.2)]"
                        : "bg-red-500/20 text-red-400 shadow-[0_0_40px_rgba(239,68,68,0.2)]"
                      }`}>
                      {score}%
                    </motion.div>
                    <h3 className={`text-2xl font-black ${score >= 80 ? "text-emerald-400" : score >= 50 ? "text-yellow-400" : "text-red-400"}`}>
                      {score >= 90 ? "Amazing Fit!" : score >= 70 ? "Great Job!" : score >= 50 ? "Not Bad!" : "Keep Practicing!"}
                    </h3>
                    <p className="text-sm text-white/40">R² Accuracy Score</p>
                  </div>

                  {/* Chart with regression overlay */}
                  <Chart showResult={true} />

                  {/* Explanation */}
                  <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
                    <h4 className="mb-3 text-sm font-bold uppercase tracking-widest text-emerald-400">What just happened?</h4>
                    <p className="text-base leading-relaxed text-white/70">
                      You just did what <span className="font-bold text-emerald-300">Linear Regression</span> does automatically!
                      It finds the single straight line that <span className="font-bold text-white">minimizes the total error</span> (the red dashed lines)
                      between the line and every data point. The closer your line was to the green dashed "best fit," the higher your score.
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                    <Link to="/algorithms/linear-regression"
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-bold text-black transition-all hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-105 active:scale-95">
                      Try Linear Regression <ChevronRight className="h-4 w-4" />
                    </Link>
                    <button onClick={handleRestart}
                      className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-bold text-white/60 transition-all hover:border-white/20 hover:text-white hover:scale-105 active:scale-95">
                      <RotateCcw className="h-4 w-4" /> Play Again
                    </button>
                    <button disabled className="inline-flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] px-6 py-3 font-bold text-white/20 cursor-not-allowed" title="Coming soon!">
                      Next Episode <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
