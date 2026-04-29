/**
 * Linear Regression Utilities
 * Standard OLS (Ordinary Least Squares) implementation
 */

export const calculateLinearRegression = (points) => {
  if (points.length === 0) return { m: 0, b: 0 };
  if (points.length === 1) return { m: 0, b: points[0].y };

  const n = points.length;
  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumXX = 0;

  for (const p of points) {
    sumX += p.x;
    sumY += p.y;
    sumXY += p.x * p.y;
    sumXX += p.x * p.x;
  }

  const denominator = n * sumXX - sumX * sumX;
  if (denominator === 0) return { m: 0, b: sumY / n };

  const m = (n * sumXY - sumX * sumY) / denominator;
  const b = (sumY - m * sumX) / n;

  return { m, b };
};

export const calculateMSE = (points, m, b) => {
  if (points.length === 0) return 0;
  let sumSquaredError = 0;
  for (const p of points) {
    const prediction = m * p.x + b;
    const error = p.y - prediction;
    sumSquaredError += error * error;
  }
  return sumSquaredError / points.length;
};

export const INITIAL_REGRESSION_DATA = [
  { id: 1, x: 20, y: 70 },
  { id: 2, x: 40, y: 55 },
  { id: 3, x: 50, y: 45 },
  { id: 4, x: 70, y: 35 },
  { id: 5, x: 85, y: 20 },
];
