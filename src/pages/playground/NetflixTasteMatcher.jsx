import { useMemo, useState } from "react";
import { Check, ChevronRight, Gauge, Sparkles, Users } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const MOVIES = [
  {
    id: "interstellar",
    title: "Interstellar",
    icon: "ROCKET",
    iconLabel: "Space journey",
    genres: ["Sci-Fi", "Drama"],
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "inception",
    title: "Inception",
    icon: "DREAM",
    iconLabel: "Dream layers",
    genres: ["Sci-Fi", "Thriller"],
    image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "avengers",
    title: "The Avengers",
    icon: "HERO",
    iconLabel: "Superhero team",
    genres: ["Action", "Sci-Fi"],
    image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "finding-nemo",
    title: "Finding Nemo",
    icon: "OCEAN",
    iconLabel: "Ocean adventure",
    genres: ["Animation", "Family"],
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "la-la-land",
    title: "La La Land",
    icon: "MUSIC",
    iconLabel: "Musical romance",
    genres: ["Romance", "Music"],
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "harry-potter",
    title: "Harry Potter",
    icon: "MAGIC",
    iconLabel: "Magic fantasy",
    genres: ["Fantasy", "Adventure"],
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=600&q=80",
  },
];

const VIEWERS = [
  { id: "maya", name: "Maya", tastes: ["Sci-Fi", "Drama", "Action"], liked: "Dune" },
  { id: "leo", name: "Leo", tastes: ["Sci-Fi", "Thriller", "Action"], liked: "The Dark Knight" },
  { id: "nina", name: "Nina", tastes: ["Romance", "Music", "Drama"], liked: "The Greatest Showman" },
  { id: "omar", name: "Omar", tastes: ["Animation", "Family", "Adventure"], liked: "Toy Story" },
  { id: "ivy", name: "Ivy", tastes: ["Fantasy", "Adventure", "Family"], liked: "The Lord of the Rings" },
];

const K_OPTIONS = [1, 3, 5];

const ICON_STYLES = {
  ROCKET: { mark: "R", bg: "from-cyan-300 to-blue-500", label: "rocket" },
  DREAM: { mark: "I", bg: "from-indigo-300 to-violet-500", label: "dream" },
  HERO: { mark: "A", bg: "from-red-300 to-orange-500", label: "hero" },
  OCEAN: { mark: "N", bg: "from-sky-300 to-teal-500", label: "ocean" },
  MUSIC: { mark: "L", bg: "from-pink-300 to-yellow-400", label: "music" },
  MAGIC: { mark: "H", bg: "from-purple-300 to-fuchsia-500", label: "magic" },
};

function getSelectedGenres(selectedIds) {
  const genres = new Set();
  MOVIES.filter((movie) => selectedIds.includes(movie.id)).forEach((movie) => {
    movie.genres.forEach((genre) => genres.add(genre));
  });
  return [...genres];
}

function getSimilarity(viewer, selectedGenres) {
  return viewer.tastes.filter((genre) => selectedGenres.includes(genre)).length;
}

function MovieIcon({ icon, selected }) {
  const visual = ICON_STYLES[icon];

  return (
    <div
      aria-label={visual.label}
      className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${visual.bg} text-lg font-black text-black shadow-lg transition-transform ${
        selected ? "scale-110" : ""
      }`}
    >
      {visual.mark}
    </div>
  );
}

export default function NetflixTasteMatcher({ onComplete }) {
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [k, setK] = useState(3);

  const selectedGenres = useMemo(() => getSelectedGenres(selectedMovies), [selectedMovies]);
  const selectedMovieDetails = MOVIES.filter((movie) => selectedMovies.includes(movie.id));

  const rankedViewers = useMemo(() => {
    return VIEWERS.map((viewer) => ({
      ...viewer,
      similarity: getSimilarity(viewer, selectedGenres),
    })).sort((a, b) => b.similarity - a.similarity || a.name.localeCompare(b.name));
  }, [selectedGenres]);

  const neighbors = rankedViewers.slice(0, k);
  const recommendation = neighbors[0]?.liked || "Pick 3 movies first";
  const maxPossibleMatches = Math.max(1, selectedGenres.length);
  const matchStrength =
    selectedGenres.length === 0
      ? 0
      : Math.round((neighbors.reduce((total, viewer) => total + viewer.similarity, 0) / (k * maxPossibleMatches)) * 100);
  const canReveal = selectedMovies.length === 3;

  const toggleMovie = (id) => {
    setSelectedMovies((current) => {
      if (current.includes(id)) {
        return current.filter((movieId) => movieId !== id);
      }
      if (current.length === 3) {
        return current;
      }
      return [...current, id];
    });
  };

  const revealResult = () => {
    if (!canReveal) return;
    onComplete({
      points: 40,
      recommendation,
      matchStrength,
      k,
      neighborNames: neighbors.map((viewer) => viewer.name).join(", "),
    });
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-[#0f0b0b] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] md:p-6">
      <div className="mb-6 grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="rounded-2xl border border-red-500/15 bg-red-500/[0.06] p-5">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-red-300">How it works</p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {[
              ["1", "Pick movies", "Your choices become a genre profile."],
              ["2", "Find neighbors", "Viewers with matching genres move to the top."],
              ["3", "Recommend", "The nearest viewers vote with movies they liked."],
            ].map(([step, title, copy]) => (
              <div key={step} className="rounded-xl border border-white/10 bg-black/25 p-4">
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-sm font-black text-white">
                  {step}
                </div>
                <h4 className="font-black text-white">{title}</h4>
                <p className="mt-1 text-sm leading-relaxed text-white/55">{copy}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.07] p-5">
          <div className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-cyan-200">
            <Gauge className="h-4 w-4" />
            Live impact
          </div>
          <div className="text-4xl font-black text-white">{matchStrength}%</div>
          <p className="mt-2 text-sm leading-relaxed text-white/55">
            This score changes as selected movie genres match nearby viewers.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <section>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-red-400">Step 1</p>
              <h3 className="mt-1 text-2xl font-black text-white">Choose your movie taste</h3>
            </div>
            <div className="rounded-full border border-red-500/25 bg-red-500/10 px-3 py-1 text-sm font-black text-red-200">
              {selectedMovies.length}/3 selected
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {MOVIES.map((movie) => {
              const isSelected = selectedMovies.includes(movie.id);
              return (
                <motion.button
                  key={movie.id}
                  layout
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => toggleMovie(movie.id)}
                  className={`group overflow-hidden rounded-2xl border bg-black/55 text-left transition-all ${
                    isSelected
                      ? "border-red-400 shadow-[0_0_30px_rgba(239,68,68,0.2)]"
                      : "border-white/10 hover:border-red-400/40"
                  }`}
                >
                  <div className="grid grid-cols-[112px_1fr]">
                    <div className="relative h-full min-h-32 overflow-hidden">
                      <img src={movie.image} alt="" className="h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/70" />
                    </div>
                    <div className="relative p-4">
                      <div className="mb-4 flex items-start justify-between gap-3">
                        <MovieIcon icon={movie.icon} selected={isSelected} />
                        <AnimatePresence>
                          {isSelected && (
                            <motion.span
                              initial={{ scale: 0, rotate: -25 }}
                              animate={{ scale: 1, rotate: 0 }}
                              exit={{ scale: 0, rotate: 25 }}
                              className="flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-white"
                            >
                              <Check className="h-4 w-4" />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                      <h4 className="text-lg font-black text-white">{movie.title}</h4>
                      <p className="mt-1 text-xs text-white/40">{movie.iconLabel}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {movie.genres.map((genre) => (
                          <span key={genre} className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-bold text-white/65">
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-widest text-cyan-300">Step 2</p>
            <h3 className="mt-1 text-2xl font-black text-white">Decision engine</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/55">
              Watch the selected genres flow into the viewer list. More matching genres
              means a viewer becomes a stronger neighbor.
            </p>
          </div>

          <div className="mb-5 rounded-2xl border border-white/10 bg-black/25 p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-sm font-black text-white">Your selected taste</p>
              <span className="text-xs font-bold text-white/35">{selectedGenres.length} genres</span>
            </div>
            <div className="min-h-16">
              <AnimatePresence mode="popLayout">
                {selectedGenres.length === 0 ? (
                  <motion.p
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-white/40"
                  >
                    Select movies to create your taste profile.
                  </motion.p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {selectedGenres.map((genre) => (
                      <motion.span
                        layout
                        key={genre}
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.9 }}
                        className="rounded-full bg-red-600 px-3 py-1 text-xs font-black text-white shadow-[0_0_18px_rgba(220,38,38,0.25)]"
                      >
                        {genre}
                      </motion.span>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {selectedMovieDetails.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 overflow-hidden border-t border-white/10 pt-3"
                >
                  <p className="mb-2 text-xs font-bold uppercase tracking-widest text-white/35">Selected movies</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedMovieDetails.map((movie) => (
                      <span key={movie.id} className="rounded-lg bg-white/10 px-2.5 py-1 text-xs font-bold text-white/70">
                        {movie.title}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mb-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm font-bold text-white/75">
                <Users className="h-4 w-4 text-cyan-300" />
                Nearest viewers
              </div>
              <div className="flex rounded-lg border border-white/10 bg-black/25 p-1">
                {K_OPTIONS.map((option) => (
                  <button
                    key={option}
                    onClick={() => setK(option)}
                    className={`rounded-md px-3 py-1.5 text-xs font-black transition-all ${
                      k === option ? "bg-cyan-400 text-black" : "text-white/45 hover:text-white"
                    }`}
                  >
                    K={option}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {rankedViewers.map((viewer, index) => {
                const isNeighbor = index < k;
                const width = selectedGenres.length ? Math.max(8, (viewer.similarity / maxPossibleMatches) * 100) : 0;
                return (
                  <motion.div
                    layout
                    key={viewer.id}
                    className={`rounded-xl border p-3 transition-all ${
                      isNeighbor ? "border-cyan-300/40 bg-cyan-300/10" : "border-white/10 bg-black/20 opacity-60"
                    }`}
                  >
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <div>
                        <p className="font-black text-white">{viewer.name}</p>
                        <p className="text-xs text-white/45">Liked: {viewer.liked}</p>
                      </div>
                      <span className={`rounded-full px-2.5 py-1 text-xs font-black ${isNeighbor ? "bg-cyan-300 text-black" : "bg-white/10 text-white/50"}`}>
                        {viewer.similarity} match{viewer.similarity === 1 ? "" : "es"}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-red-500 to-cyan-300"
                        initial={false}
                        animate={{ width: `${width}%` }}
                        transition={{ duration: 0.35 }}
                      />
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {viewer.tastes.map((taste) => (
                        <span
                          key={taste}
                          className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                            selectedGenres.includes(taste) ? "bg-red-500 text-white" : "bg-white/10 text-white/40"
                          }`}
                        >
                          {taste}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-red-300">
              <Sparkles className="h-4 w-4" />
              Step 3: Recommendation
            </div>
            <p className="text-3xl font-black text-white">{recommendation}</p>
            <p className="mt-2 text-sm text-white/55">
              Based on the top {k} nearest viewer{k === 1 ? "" : "s"}.
            </p>
            <button
              onClick={revealResult}
              disabled={!canReveal}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-black text-white transition-all hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/25"
            >
              Reveal Result
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
