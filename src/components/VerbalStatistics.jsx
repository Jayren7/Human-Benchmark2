// src/components/VerbalStatistics.jsx
import React from 'react';

function VerbalStatistics({ score, language = 'en', showScore = true }) {
  // Terjemahan
  const translations = {
    en: {
      statisticsTitle: "Statistics",
      distribution: "Distribution of verbal memory scores (words)",
      aboutTitle: "About the test",
      aboutText1: "This test measures how many words you can keep in short term memory at once.",
      aboutText2: "The number of words you need to remember grows continually, until you can't keep them in your head anymore.",
      aboutText3: "Go as long as you can. You have 3 strikes until game over.",
      aboutText4: "Your score is how many turns you lasted."
    },
    id: {
      statisticsTitle: "Statistik",
      distribution: "Distribusi skor memori verbal (kata)",
      aboutTitle: "Tentang tes ini",
      aboutText1: "Tes ini mengukur berapa banyak kata yang dapat Anda simpan dalam memori jangka pendek sekaligus.",
      aboutText2: "Jumlah kata yang perlu Anda ingat terus bertambah, sampai Anda tidak dapat menyimpannya di kepala Anda lagi.",
      aboutText3: "Bertahanlah selama yang Anda bisa. Anda memiliki 3 kesalahan sampai permainan berakhir.",
      aboutText4: "Skor Anda adalah berapa banyak giliran yang Anda bertahan."
    }
  };

  const t = translations[language];

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

        {/* Your Score - hanya tampil jika showScore true dan score > 0 */}
        {showScore && score > 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '20px',
              background: '#f0f8ff',
              borderRadius: '8px',
              marginBottom: '24px',
              border: '2px solid #2196F3'
            }}
          >
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
              {language === 'en' ? 'Your Score' : 'Skor Anda'}
            </div>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#2196F3' }}>
              {score} {language === 'en' ? 'words' : 'kata'}
            </div>
          </div>
        )}

        {/* GRAPH - selalu tampil */}
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
              M30 190
              C60 185, 90 175, 120 150
              C150 115, 180 90, 210 75
              C240 65, 270 70, 300 85
              C330 105, 360 135, 390 160
              C420 180, 440 195, 470 205
              L470 210
              Z
            "
            fill="rgba(33, 150, 243, 0.18)"
          />

          {/* LINE */}
          <path
            d="
              M30 190
              C60 185, 90 175, 120 150
              C150 115, 180 90, 210 75
              C240 65, 270 70, 300 85
              C330 105, 360 135, 390 160
              C420 180, 440 195, 470 205
            "
            fill="none"
            stroke="#1e88e5"
            strokeWidth="3"
          />

          {/* POINTS */}
          {[
            [90, 175],
            [120, 150],
            [150, 115],
            [180, 90],
            [210, 75],
            [240, 65],
            [270, 70],
            [300, 85],
            [330, 105],
            [360, 135],
            [390, 160],
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
            '0','10','20','30','40',
            '50','60','70','80','90','100'
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

export default VerbalStatistics;