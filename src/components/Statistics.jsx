// src/components/Statistics.jsx
import React from 'react';

function Statistics({ scores, language = 'en' }) {
  // Terjemahan
  const translations = {
    en: {
      statisticsTitle: "Statistics",
      distribution: "Distribution of reaction times (milliseconds)",
      aboutTitle: "About the test",
      aboutText1: "This is a simple tool to measure your reaction time.",
      aboutText2: "The average (median) reaction time is 273 milliseconds, according to the data collected so far.",
      aboutText3: "In addition to measuring your reaction time, this test is affected by the latency of your computer and monitor. Using a fast computer and low latency / high framerate monitor will improve your score.",
      aboutText4: "Scores in this test are faster than the aim trainer test, because you can react instantly without moving the cursor.",
      average: "Average",
      best: "Best",
      worst: "Worst"
    },
    id: {
      statisticsTitle: "Statistik",
      distribution: "Distribusi waktu reaksi (milidetik)",
      aboutTitle: "Tentang tes ini",
      aboutText1: "Ini adalah alat sederhana untuk mengukur waktu reaksi Anda.",
      aboutText2: "Waktu reaksi rata-rata (median) adalah 273 milidetik, menurut data yang dikumpulkan sejauh ini.",
      aboutText3: "Selain mengukur waktu reaksi Anda, tes ini dipengaruhi oleh latensi komputer dan monitor Anda. Menggunakan komputer yang cepat dan monitor latensi rendah / framerate tinggi akan meningkatkan skor Anda.",
      aboutText4: "Skor dalam tes ini lebih cepat dari tes latihan bidik, karena Anda dapat bereaksi secara instan tanpa menggerakkan kursor.",
      average: "Rata-rata",
      best: "Terbaik",
      worst: "Terburuk"
    }
  };

  const t = translations[language];

  // Hitung statistik jika ada scores
  let average = null;
  let best = null;
  let worst = null;

  if (scores && scores.length > 0) {
    average = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    best = Math.min(...scores);
    worst = Math.max(...scores);
  }

  return (
    <section
      style={{
        maxWidth: '1000px',
        margin: '80px auto 60px',
        padding: '0 20px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '40px'
      }}
    >
      {/* ================= LEFT : STATISTICS ================= */}
      <div
        style={{
          background: '#fff',
          padding: '24px',
          borderRadius: '6px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
        }}
      >
        <h3 style={{ marginBottom: '16px' }}>{t.statisticsTitle}</h3>

        {/* Stats Cards - jika ada data */}
        {scores && scores.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
              marginBottom: '24px'
            }}
          >
            <StatCard label={t.average} value={`${average}ms`} color="#2196F3" />
            <StatCard label={t.best} value={`${best}ms`} color="#4CAF50" />
            <StatCard label={t.worst} value={`${worst}ms`} color="#E53935" />
          </div>
        )}

        {/* GRAPH */}
        <svg
          viewBox="0 0 500 260"
          width="100%"
          height="260"
        >
          {/* GRID */}
          {Array.from({ length: 16 }).map((_, i) => (
            <line
              key={i}
              x1={30 + i * 28}
              y1="20"
              x2={30 + i * 28}
              y2="210"
              stroke="#eaeaea"
            />
          ))}

          {/* AREA */}
          <path
            d="
              M30 210
              C80 210, 120 200, 150 140
              C180 70, 220 60, 250 80
              C290 110, 330 160, 360 180
              C400 200, 440 205, 470 210
              L470 210
              Z
            "
            fill="rgba(33, 150, 243, 0.18)"
          />

          {/* LINE */}
          <path
            d="
              M30 210
              C80 210, 120 200, 150 140
              C180 70, 220 60, 250 80
              C290 110, 330 160, 360 180
              C400 200, 440 205, 470 210
            "
            fill="none"
            stroke="#1e88e5"
            strokeWidth="3"
          />

          {/* POINTS */}
          {[
            [150, 140],
            [180, 90],
            [220, 60],
            [250, 80],
            [290, 120],
            [330, 160],
            [360, 180],
          ].map(([x, y], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="4"
              fill="#1e88e5"
            />
          ))}

          {/* X LABELS */}
          {[
            '0','100','200','300','400','500','600','700','800','900'
          ].map((label, i) => (
            <text
              key={i}
              x={30 + i * 44}
              y="235"
              fontSize="11"
              fill="#666"
              textAnchor="middle"
            >
              {label}
            </text>
          ))}
        </svg>

        <p style={{ fontSize: '13px', color: '#666', marginTop: '6px' }}>
          {t.distribution}
        </p>
      </div>

      {/* ================= RIGHT : ABOUT ================= */}
      <div
        style={{
          background: '#fff',
          padding: '24px',
          borderRadius: '6px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          fontSize: '14px',
          lineHeight: '1.65'
        }}
      >
        <h3>{t.aboutTitle}</h3>

        <p>{t.aboutText1}</p>

        <p>{t.aboutText2}</p>

        <p>{t.aboutText3}</p>

        <p>{t.aboutText4}</p>
      </div>
    </section>
  );
}

// Component untuk stat cards kecil
function StatCard({ label, value, color }) {
  return (
    <div
      style={{
        padding: '12px',
        background: '#f9f9f9',
        borderRadius: '6px',
        textAlign: 'center',
        border: `2px solid ${color}`
      }}
    >
      <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
        {label}
      </div>
      <div style={{ fontSize: '18px', fontWeight: 'bold', color }}>
        {value}
      </div>
    </div>
  );
}

export default Statistics;