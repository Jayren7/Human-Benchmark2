// src/utils/chartData.js

/**
 * Fungsi untuk memproses data skor menjadi format chart
 * @param {Array} scores - Array of reaction times in milliseconds
 * @returns {Object} - Data yang diformat untuk chart
 */
export const processChartData = (scores) => {
  if (!scores || scores.length === 0) {
    return {
      labels: [],
      data: [],
      min: 0,
      max: 0,
      average: 0,
      median: 0,
      best: 0,
      colorData: []
    };
  }

  // Labels untuk chart (Test 1, Test 2, ...)
  const labels = scores.map((_, index) => `Test ${index + 1}`);
  
  // Data untuk chart
  const data = [...scores];
  
  // Hitung statistik
  const min = Math.min(...scores);
  const max = Math.max(...scores);
  const average = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  const best = min;
  
  // Hitung median
  const sorted = [...scores].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  const median = sorted.length % 2 !== 0 
    ? sorted[mid] 
    : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
  
  // Tentukan warna untuk setiap bar (hijau untuk yang terbaik, biru untuk lainnya)
  const colorData = scores.map(score => 
    score === best ? '#4CAF50' : '#2196F3'
  );

  return {
    labels,
    data,
    min,
    max,
    average,
    median,
    best,
    colorData
  };
};

/**
 * Fungsi untuk menghitung tinggi bar chart yang dinormalisasi
 * @param {Array} scores - Array of reaction times
 * @returns {Array} - Array of normalized heights (0-100%)
 */
export const calculateBarHeights = (scores) => {
  if (scores.length < 2) {
    return scores.map(() => 50); // Default 50% jika hanya 1 data
  }

  const min = Math.min(...scores);
  const max = Math.max(...scores);
  const range = max - min || 1; // Hindari pembagian dengan 0

  return scores.map(score => {
    // Normalisasi terbalik: skor lebih rendah = bar lebih tinggi
    const normalized = 100 - ((score - min) / range) * 80;
    return Math.max(10, Math.min(100, normalized)); // Clamp antara 10-100%
  });
};

/**
 * Fungsi untuk menghasilkan data dummy untuk demo/testing
 * @param {number} count - Jumlah data dummy
 * @param {Object} options - Opsi untuk data dummy
 * @returns {Array} - Array of dummy reaction times
 */
export const generateDummyData = (count = 10, options = {}) => {
  const {
    min = 150,
    max = 450,
    variance = 50,
    trend = 'random' // 'random', 'improving', 'worsening'
  } = options;

  const data = [];
  
  for (let i = 0; i < count; i++) {
    let baseValue;
    
    switch (trend) {
      case 'improving':
        // Semakin membaik (semakin kecil)
        baseValue = max - ((i / count) * (max - min));
        break;
      case 'worsening':
        // Semakin memburuk (semakin besar)
        baseValue = min + ((i / count) * (max - min));
        break;
      case 'random':
      default:
        baseValue = (min + max) / 2;
        break;
    }
    
    // Tambahkan variasi acak
    const variation = (Math.random() - 0.5) * 2 * variance;
    const value = Math.round(Math.max(min, Math.min(max, baseValue + variation)));
    
    data.push(value);
  }
  
  return data;
};

/**
 * Fungsi untuk mengelompokkan data untuk chart yang lebih besar
 * @param {Array} scores - Data asli
 * @param {number} groupSize - Ukuran grup (default: 5)
 * @returns {Object} - Data yang dikelompokkan
 */
export const groupChartData = (scores, groupSize = 5) => {
  if (scores.length <= groupSize) {
    return {
      groupedLabels: scores.map((_, i) => `Test ${i + 1}`),
      groupedData: scores,
      groupAverages: scores,
      groupMins: scores,
      groupMaxs: scores
    };
  }

  const groups = [];
  const groupedLabels = [];
  const groupAverages = [];
  const groupMins = [];
  const groupMaxs = [];

  for (let i = 0; i < scores.length; i += groupSize) {
    const group = scores.slice(i, i + groupSize);
    groups.push(group);
    
    const groupNumber = Math.floor(i / groupSize) + 1;
    groupedLabels.push(`Tests ${groupNumber * groupSize - groupSize + 1}-${Math.min(groupNumber * groupSize, scores.length)}`);
    
    // Hitung rata-rata grup
    const average = Math.round(group.reduce((a, b) => a + b, 0) / group.length);
    groupAverages.push(average);
    
    // Min dan max per grup
    groupMins.push(Math.min(...group));
    groupMaxs.push(Math.max(...group));
  }

  return {
    groupedLabels,
    groupedData: groups,
    groupAverages,
    groupMins,
    groupMaxs
  };
};

/**
 * Fungsi untuk menganalisis trend data
 * @param {Array} scores - Data skor
 * @returns {Object} - Analisis trend
 */
export const analyzeTrend = (scores) => {
  if (scores.length < 2) {
    return {
      trend: 'stable',
      slope: 0,
      improvement: 0,
      consistency: 0
    };
  }

  // Hitung slope menggunakan linear regression sederhana
  const n = scores.length;
  const xSum = (n * (n - 1)) / 2;
  const ySum = scores.reduce((sum, score) => sum + score, 0);
  const xySum = scores.reduce((sum, score, index) => sum + (score * index), 0);
  const xxSum = scores.reduce((sum, _, index) => sum + (index * index), 0);
  
  const slope = (n * xySum - xSum * ySum) / (n * xxSum - xSum * xSum);
  
  // Tentukan trend berdasarkan slope
  let trend;
  if (slope < -5) trend = 'improving_rapidly';
  else if (slope < -1) trend = 'improving';
  else if (slope > 5) trend = 'worsening_rapidly';
  else if (slope > 1) trend = 'worsening';
  else trend = 'stable';
  
  // Hitung improvement (persentase)
  const firstFiveAvg = scores.slice(0, Math.min(5, scores.length)).reduce((a, b) => a + b, 0) / Math.min(5, scores.length);
  const lastFiveAvg = scores.slice(-5).reduce((a, b) => a + b, 0) / Math.min(5, scores.length);
  const improvement = Math.round(((firstFiveAvg - lastFiveAvg) / firstFiveAvg) * 100);
  
  // Hitung consistency (standard deviation)
  const average = ySum / n;
  const variance = scores.reduce((sum, score) => sum + Math.pow(score - average, 2), 0) / n;
  const stdDev = Math.sqrt(variance);
  const consistency = Math.max(0, 100 - (stdDev / average * 100));
  
  return {
    trend,
    slope: Math.round(slope * 100) / 100,
    improvement: Math.max(-100, Math.min(100, improvement)),
    consistency: Math.round(Math.max(0, Math.min(100, consistency))),
    average: Math.round(average)
  };
};

/**
 * Fungsi untuk membuat label tooltip yang informatif
 * @param {number} score - Nilai reaction time
 * @param {number} index - Index data
 * @param {Object} stats - Statistik tambahan
 * @returns {string} - Text untuk tooltip
 */
export const createTooltipText = (score, index, stats = {}) => {
  const { best, average, median } = stats;
  let tooltip = `Test ${index + 1}: ${score}ms`;
  
  if (score === best) {
    tooltip += '\n🎯 Best score!';
  }
  
  if (score < average) {
    tooltip += `\n📊 Better than average (${average}ms)`;
  } else if (score > average) {
    tooltip += `\n📊 Slower than average (${average}ms)`;
  }
  
  const diffFromMedian = Math.abs(score - median);
  if (diffFromMedian > 50) {
    tooltip += `\n⚠️ ${score > median ? 'Much slower' : 'Much faster'} than median (${median}ms)`;
  }
  
  return tooltip;
};

/**
 * Fungsi untuk mendapatkan warna berdasarkan performa
 * @param {number} score - Nilai reaction time
 * @param {Object} stats - Statistik
 * @returns {string} - Kode warna HEX
 */
export const getPerformanceColor = (score, stats) => {
  const { best, average } = stats;
  
  if (score === best) return '#4CAF50'; // Hijau untuk terbaik
  if (score < average - 50) return '#8BC34A'; // Hijau muda untuk jauh di bawah rata-rata
  if (score < average) return '#CDDC39'; // Kuning hijau untuk di bawah rata-rata
  if (score < average + 50) return '#FFC107'; // Kuning untuk di sekitar rata-rata
  if (score < average + 100) return '#FF9800'; // Oranye untuk di atas rata-rata
  return '#F44336'; // Merah untuk jauh di atas rata-rata
};

// Export semua fungsi
export default {
  processChartData,
  calculateBarHeights,
  generateDummyData,
  groupChartData,
  analyzeTrend,
  createTooltipText,
  getPerformanceColor
};