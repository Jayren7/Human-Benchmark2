export const calculateAverage = (scores) => {
  if (scores.length === 0) return 0;
  const sum = scores.reduce((acc, curr) => acc + curr, 0);
  return Math.round(sum / scores.length);
};

export const calculateMedian = (scores) => {
  if (scores.length === 0) return 0;
  const sorted = [...scores].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  
  if (sorted.length % 2 === 0) {
    return Math.round((sorted[mid - 1] + sorted[mid]) / 2);
  } else {
    return Math.round(sorted[mid]);
  }
};

export const calculateBest = (scores) => {
  if (scores.length === 0) return 0;
  return Math.min(...scores);
};

export const generateRandomDelay = (min = 1000, max = 5000) => {
  return Math.random() * (max - min) + min;
};