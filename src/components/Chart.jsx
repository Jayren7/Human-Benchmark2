import React from 'react';

function Chart({ scores }) {
  if (scores.length === 0) return null;

  const avg =
    scores.reduce((a, b) => a + b, 0) / scores.length;

  // range grafik (HumanBenchmark pakai ~100–500ms)
  const minX = 100;
  const maxX = 500;

  const width = 360;
  const height = 160;

  // fungsi gaussian (lonceng)
  const gaussian = (x, mean, sd) =>
    Math.exp(-0.5 * Math.pow((x - mean) / sd, 2));

  const sd = 40;

  const points = [];
  for (let x = minX; x <= maxX; x += 5) {
    const y = gaussian(x, avg, sd);
    points.push({
      x:
        ((x - minX) / (maxX - minX)) * width,
      y: height - y * 120
    });
  }

  const path = points
    .map((p, i) =>
      i === 0
        ? `M ${p.x},${p.y}`
        : `L ${p.x},${p.y}`
    )
    .join(' ');

  return (
    <div className="curve-chart">
      <svg width={width} height={height}>
        {/* Kurva */}
        <path
          d={path}
          fill="none"
          stroke="#1b6ecf"
          strokeWidth="3"
        />

        {/* Titik rata-rata */}
        <circle
          cx={
            ((avg - minX) / (maxX - minX)) *
            width
          }
          cy={height - 10}
          r="5"
          fill="#1b6ecf"
        />
      </svg>

      <div className="chart-labels">
        <span>{minX}ms</span>
        <span>{Math.round(avg)}ms</span>
        <span>{maxX}ms</span>
      </div>
    </div>
  );
}

export default Chart;
