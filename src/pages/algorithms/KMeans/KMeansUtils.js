/**
 * K-Means Utilities
 */

export const calculateDistance = (p1, p2) => {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
};

export const INITIAL_KMEANS_DATA = [
  { id: 1, x: 20, y: 30 }, { id: 2, x: 25, y: 25 }, { id: 3, x: 30, y: 35 },
  { id: 4, x: 70, y: 70 }, { id: 5, x: 75, y: 80 }, { id: 6, x: 80, y: 75 },
  { id: 7, x: 20, y: 80 }, { id: 8, x: 25, y: 75 }, { id: 9, x: 30, y: 85 },
];

export const INITIAL_CENTROIDS = [
  { id: 'c1', x: 50, y: 50, color: '#22d3ee' },
  { id: 'c2', x: 40, y: 60, color: '#a78bfa' },
  { id: 'c3', x: 60, y: 40, color: '#f472b6' },
];

export const assignToClusters = (points, centroids) => {
  return points.map(p => {
    let minDist = Infinity;
    let closestId = null;
    centroids.forEach(c => {
      const dist = calculateDistance(p, c);
      if (dist < minDist) {
        minDist = dist;
        closestId = c.id;
      }
    });
    return { ...p, clusterId: closestId };
  });
};

export const updateCentroids = (points, centroids) => {
  return centroids.map(c => {
    const clusterPoints = points.filter(p => p.clusterId === c.id);
    if (clusterPoints.length === 0) return c;
    
    const avgX = clusterPoints.reduce((acc, p) => acc + p.x, 0) / clusterPoints.length;
    const avgY = clusterPoints.reduce((acc, p) => acc + p.y, 0) / clusterPoints.length;
    
    return { ...c, x: avgX, y: avgY };
  });
};
