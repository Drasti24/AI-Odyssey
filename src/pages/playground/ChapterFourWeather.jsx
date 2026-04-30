import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Play, ChevronRight, Trophy, RotateCcw, CloudRain, Sun, Thermometer, Droplets } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../components/Navbar";
import { saveChapterProgress } from "../../utils/progressUtils";

// ─── Weather Data Points ───
// Features: [Temperature (°C), Humidity (%)]
// Label: 1 (Rain), 0 (Sun)
const WEATHER_DAYS = [
  { id: 1, temp: 15, humidity: 85, actual: 1, label: "Day 1" },
  { id: 2, temp: 28, humidity: 40, actual: 0, label: "Day 2" },
  { id: 3, temp: 12, humidity: 92, actual: 1, label: "Day 3" },
  { id: 4, temp: 31, humidity: 20, actual: 0, label: "Day 4" },
  { id: 5, temp: 19, humidity: 70, actual: 1, label: "Day 5" },
];

// ─── Logistic Regression Math (Simplified) ───
const sigmoid = (z) => 1 / (1 + Math.exp(-z));

// Simple weights for demo: rain is more likely with lower temp and higher humidity
const calculateProbability = (temp, humidity) => {
  // z = w1*temp + w2*humidity + b
  const z = -0.3 * temp + 0.1 * humidity - 2; 
  return sigmoid(z);
};

export default function ChapterFourWeather() {
  const [phase, setPhase] = useState("preview");
  const [dayIdx, setDayIdx] = useState(0);
  const [userGuess, setUserGuess] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]);

  const currentDay = WEATHER_DAYS[dayIdx];
  const probability = calculateProbability(currentDay.temp, currentDay.humidity);

  const handleGuess = (guess) => {
    setUserGuess(guess);
    const isCorrect = (guess === "rain" && currentDay.actual === 1) || (guess === "sun" && currentDay.actual === 0);
    if (isCorrect) setScore((s) => s + 20);
    
    setHistory([...history, { ...currentDay, userGuess: guess, isCorrect }]);
    setShowResult(true);
  };

  const nextDay = () => {
    if (dayIdx + 1 < WEATHER_DAYS.length) {
      setDayIdx(dayIdx + 1);
      setUserGuess(null);
      setShowResult(false);
    } else {
      saveChapterProgress(4, score);
      setPhase("result");
    }
  };

  const resetGame = () => {
    setPhase("preview");
    setDayIdx(0);
    setUserGuess(null);
    setShowResult(false);
    setScore(0);
    setHistory([]);
  };

  return (
    <main className="min-h-screen bg-[#0d0d1a] text-white font-mono">
      <Navbar />
      
      <section className="px-6 pt-28 pb-20">
        <div className="mx-auto max-w-5xl">
          <Link to="/playground" className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-white/40 transition-colors hover:text-purple-400">
            <ArrowLeft className="h-4 w-4" /> Back to Playground
          </Link>

          {/* Top bar */}
          <div className="mb-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-2 w-32 overflow-hidden rounded-sm bg-white/10 border border-white/20">
                <motion.div 
                  className="h-full bg-purple-500" 
                  initial={{ width: "0%" }}
                  animate={{ width: phase === "preview" ? "10%" : phase === "game" ? `${((dayIdx + 1) / WEATHER_DAYS.length) * 80 + 10}%` : "100%" }}
                />
              </div>
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-tighter">Day {dayIdx + 1} of 5</span>
            </div>
            <div className="flex items-center gap-2 rounded-sm border-2 border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-sm font-bold text-purple-400 shadow-[4px_4px_0px_rgba(168,85,247,0.3)]">
              <Trophy className="h-4 w-4" /> {score} PTS
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* ── PREVIEW ── */}
            {phase === "preview" && (
              <motion.div 
                key="preview" 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 1.1 }}
                className="relative overflow-hidden rounded-sm border-4 border-purple-500/20 bg-[#13132b] p-10 md:p-14 shadow-[8px_8px_0px_rgba(0,0,0,0.5)]"
              >
                <div className="mb-6 inline-flex items-center gap-2 bg-purple-600 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                  Weather Station Alpha
                </div>
                <h1 className="mb-2 text-xs font-black tracking-[0.2em] text-purple-400 uppercase">AI Odyssey: Chapter 4</h1>
                <h2 className="mb-6 text-4xl font-black leading-tight tracking-tighter md:text-5xl uppercase">
                  The <span className="text-purple-500">Weather</span> Predictor
                </h2>
                <p className="mb-10 max-w-2xl text-lg leading-relaxed text-white/50">
                  Welcome, Meteorologist. The town depends on your rain forecasts. 
                  Use <span className="text-purple-400 font-bold">Logistic Regression</span> to calculate the probability of rain. 
                  Remember: it's not just Yes or No, it's a <span className="text-purple-400">Sigmoid Curve!</span>
                </p>
                <button 
                  onClick={() => setPhase("game")}
                  className="group relative inline-flex items-center gap-3 bg-purple-600 px-8 py-4 text-lg font-black text-white shadow-[6px_6px_0px_rgba(0,0,0,0.5)] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0px_rgba(0,0,0,0.5)] active:translate-x-0 active:translate-y-0"
                >
                  <Play className="h-5 w-5 fill-white" /> Start Shift
                </button>
                
                {/* Pixel Grid Decoration */}
                <div className="absolute top-0 right-0 h-32 w-32 opacity-10" style={{ backgroundImage: 'radial-gradient(#a855f7 1px, transparent 1px)', backgroundSize: '8px 8px' }} />
              </motion.div>
            )}

            {/* ── GAME ── */}
            {phase === "game" && (
              <motion.div key={dayIdx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="grid gap-8 md:grid-cols-2">
                  
                  {/* Left: Sensor Data (Pixel Style) */}
                  <div className="rounded-sm border-4 border-white/10 bg-black/40 p-8 shadow-[8px_8px_0px_rgba(0,0,0,0.3)]">
                    <h3 className="mb-6 text-sm font-black uppercase tracking-widest text-purple-400">Sensor Readings</h3>
                    
                    <div className="space-y-6">
                      <div className="flex items-center justify-between border-b border-white/5 pb-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-orange-500/20 p-2 rounded-sm border border-orange-500/50">
                            <Thermometer className="text-orange-400" />
                          </div>
                          <span className="text-sm font-bold text-white/60 uppercase">Temp</span>
                        </div>
                        <span className="text-2xl font-black text-orange-400">{currentDay.temp}°C</span>
                      </div>
                      
                      <div className="flex items-center justify-between border-b border-white/5 pb-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-500/20 p-2 rounded-sm border border-blue-500/50">
                            <Droplets className="text-blue-400" />
                          </div>
                          <span className="text-sm font-bold text-white/60 uppercase">Humidity</span>
                        </div>
                        <span className="text-2xl font-black text-blue-400">{currentDay.humidity}%</span>
                      </div>
                    </div>

                    {!showResult ? (
                      <div className="mt-10">
                        <h4 className="mb-6 text-center text-xs font-black uppercase text-white/40 tracking-widest">Prediction?</h4>
                        <div className="flex gap-4">
                          <button 
                            onClick={() => handleGuess("sun")}
                            className="flex-1 flex flex-col items-center gap-2 bg-yellow-500/10 border-2 border-yellow-500/50 p-4 text-yellow-400 font-black transition-all hover:bg-yellow-500/20 active:scale-95"
                          >
                            <Sun size={32} />
                            <span>SUN</span>
                          </button>
                          <button 
                            onClick={() => handleGuess("rain")}
                            className="flex-1 flex flex-col items-center gap-2 bg-blue-500/10 border-2 border-blue-500/50 p-4 text-blue-400 font-black transition-all hover:bg-blue-500/20 active:scale-95"
                          >
                            <CloudRain size={32} />
                            <span>RAIN</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-10 text-center">
                        <motion.div 
                          initial={{ scale: 0 }} 
                          animate={{ scale: 1 }}
                          className={`mb-4 inline-block p-6 rounded-sm border-4 ${currentDay.actual === 1 ? 'bg-blue-500/20 border-blue-500' : 'bg-yellow-500/20 border-yellow-500'}`}
                        >
                          {currentDay.actual === 1 ? <CloudRain size={48} className="text-blue-400" /> : <Sun size={48} className="text-yellow-400" />}
                        </motion.div>
                        <h4 className="text-xl font-black uppercase mb-2">It's {currentDay.actual === 1 ? 'Rainy' : 'Sunny'}!</h4>
                        <p className={`text-sm font-bold ${history[history.length-1].isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                          {history[history.length-1].isCorrect ? '+20 SCORE' : 'MISS!'}
                        </p>
                        <button 
                          onClick={nextDay}
                          className="mt-6 w-full bg-white text-black font-black py-3 hover:bg-purple-400 transition-colors"
                        >
                          NEXT DAY
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Right: AI Analysis (Sigmoid Curve) */}
                  <div className="rounded-sm border-4 border-purple-500/20 bg-black/20 p-8 flex flex-col items-center justify-center relative overflow-hidden">
                    <h3 className="absolute top-8 left-8 text-xs font-black uppercase tracking-widest text-purple-400 opacity-50">AI Probability Engine</h3>
                    
                    {/* Sigmoid Visualization */}
                    <div className="w-full h-48 relative mb-6">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        {/* Sigmoid Curve Path */}
                        <path 
                          d="M 0,90 Q 50,90 50,50 T 100,10" 
                          fill="none" 
                          stroke="rgba(168, 85, 247, 0.3)" 
                          strokeWidth="2" 
                          strokeDasharray="4"
                        />
                        {/* Threshold Line */}
                        <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="2" />
                        
                        {/* Indicator Point */}
                        {showResult && (
                          <motion.circle 
                            initial={{ cx: 0, cy: 50, opacity: 0 }}
                            animate={{ cx: probability * 100, cy: 100 - (probability * 100), opacity: 1 }}
                            r="4" 
                            fill="#a855f7" 
                            className="shadow-[0_0_10px_#a855f7]"
                          />
                        )}
                      </svg>
                    </div>

                    <div className="text-center">
                      <div className="text-[10px] uppercase text-white/30 tracking-widest mb-1">Probability of Rain</div>
                      <div className="text-5xl font-black text-purple-500 tabular-nums">
                        {showResult ? Math.round(probability * 100) : '--'}%
                      </div>
                      <p className="mt-4 text-[10px] text-white/40 leading-relaxed uppercase max-w-[200px] mx-auto">
                        Logistic Regression calculates likelihood between 0 and 1.
                      </p>
                    </div>

                    {/* Pixel particles */}
                    <div className="absolute bottom-4 right-4 flex gap-1">
                      <div className="w-2 h-2 bg-purple-500/20" />
                      <div className="w-2 h-2 bg-purple-500/40" />
                      <div className="w-2 h-2 bg-purple-500/60" />
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* ── RESULT ── */}
            {phase === "result" && (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center p-10 bg-[#13132b] rounded-sm border-4 border-purple-500/40 shadow-[10px_10px_0px_rgba(0,0,0,0.5)]">
                <div className="mb-6 flex justify-center">
                  <div className="relative">
                    <Trophy size={80} className="text-yellow-400" />
                    <motion.div 
                      animate={{ y: [-10, 0, -10] }} 
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute -top-4 -right-4 bg-purple-600 text-xs px-2 py-1 rounded-sm"
                    >
                      RANK A
                    </motion.div>
                  </div>
                </div>
                
                <h3 className="text-4xl font-black uppercase mb-2">Shift Complete!</h3>
                <p className="text-purple-400 font-bold mb-8 uppercase tracking-widest">Final Score: {score} / 100</p>
                
                <div className="grid gap-4 mb-10 text-left max-w-md mx-auto">
                  {history.map((h, i) => (
                    <div key={i} className="flex items-center justify-between border-l-4 border-purple-500 bg-white/5 p-3">
                      <span className="text-xs font-bold uppercase">{h.label}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] opacity-40 uppercase">Actual: {h.actual === 1 ? 'Rain' : 'Sun'}</span>
                        <span className={h.isCorrect ? 'text-green-400' : 'text-red-400'}>{h.isCorrect ? '✓' : '✗'}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-black/40 p-6 border-l-4 border-purple-500 mb-10 text-left">
                  <h4 className="text-xs font-black uppercase mb-2 text-purple-400 tracking-widest">What you learned</h4>
                  <p className="text-sm text-white/60 leading-relaxed uppercase italic">
                    "Logistic Regression doesn't just guess 'Rain' or 'Sun'. 
                    It maps sensor data to a Sigmoid Curve (that S-shape) to find the exact probability. 
                    If it's over 50%, we grab our umbrellas!"
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/playground" className="border-2 border-white/20 px-6 py-3 font-black text-white hover:bg-white/5 hover:border-purple-500 hover:text-purple-400 transition-all shadow-[4px_4px_0px_rgba(0,0,0,0.3)]">
                    RETURN TO ARENA
                  </Link>
                  <Link to="/algorithms/logistic-regression" className="bg-purple-600 px-6 py-3 font-black text-white shadow-[4px_4px_0px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all">
                    DEEP DIVE INTO LOGISTIC REGRESSION
                  </Link>
                  <button onClick={resetGame} className="border-2 border-white/20 px-6 py-3 font-black text-white hover:bg-white/5 transition-all">
                    <RotateCcw className="inline mr-2 h-4 w-4" /> RESTART
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
