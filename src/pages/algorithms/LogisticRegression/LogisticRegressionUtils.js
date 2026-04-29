/**
 * Logistic Regression Utilities
 */

export const sigmoid = (z) => {
  return 1 / (1 + Math.exp(-z));
};

export const INITIAL_LOGISTIC_DATA = [
  { id: 1, x: 10, y: 0 }, { id: 2, x: 20, y: 0 }, { id: 3, x: 30, y: 0 },
  { id: 4, x: 40, y: 0.5 }, // Transition zone
  { id: 5, x: 60, y: 1 }, { id: 6, x: 70, y: 1 }, { id: 7, x: 80, y: 1 },
];

export const calculateLogisticLoss = (points, m, b) => {
  let loss = 0;
  points.forEach(p => {
    const z = m * p.x + b;
    const h = sigmoid(z);
    // Cross-entropy loss
    loss += - (p.y * Math.log(h + 1e-5) + (1 - p.y) * Math.log(1 - h + 1e-5));
  });
  return loss / points.length;
};
