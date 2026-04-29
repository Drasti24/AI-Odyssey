export const INITIAL_DATASET = [
  { id: 1, x: 20, y: 30, class: "A" },
  { id: 2, x: 35, y: 40, class: "A" },
  { id: 3, x: 25, y: 60, class: "A" },
  { id: 4, x: 45, y: 25, class: "A" },
  { id: 5, x: 70, y: 80, class: "B" },
  { id: 6, x: 85, y: 60, class: "B" },
  { id: 7, x: 60, y: 70, class: "B" },
  { id: 8, x: 80, y: 90, class: "B" },
  { id: 9, x: 50, y: 50, class: "B" }, // A bit in the middle
];

export const TEST_POINT = { x: 40, y: 55 };

// Utility functions
export function calculateDistance(p1, p2) {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function getNearestNeighbors(testPoint, dataset, k) {
  const distances = dataset.map((point) => ({
    ...point,
    distance: calculateDistance(testPoint, point),
  }));

  distances.sort((a, b) => a.distance - b.distance);
  return distances.slice(0, k);
}

export function classifyKNN(neighbors) {
  let countA = 0;
  let countB = 0;
  neighbors.forEach((n) => {
    if (n.class === "A") countA++;
    else countB++;
  });
  return countA > countB ? "A" : "B";
}

export const CLASS_COLORS = {
  A: "#22d3ee", // cyan-400
  B: "#f472b6", // pink-400
  Unknown: "#fbbf24", // amber-400
};
