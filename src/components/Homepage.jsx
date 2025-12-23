// src/components/Homepage.jsx
import React from 'react';

function Homepage({ language, setCurrentPage }) {
  // Data terjemahan
  const translations = {
    en: {
      title: "Human Benchmark",
      subtitle: "Measure your abilities with brain games and cognitive tests.",
      getStarted: "Get Started",
      reactionTime: {
        title: "Reaction Time",
        desc: "Test your visual reflexes"
      },
      sequenceMemory: {
        title: "Sequence Memory",
        desc: "Remember an increasingly long pattern of button presses."
      },
      aimTrainer: {
        title: "Aim Trainer",
        desc: "How quickly can you hit all the targets?"
      },
      numberMemory: {
        title: "Number Memory",
        desc: "Remember the longest number you can."
      },
      verbalMemory: {
        title: "Verbal Memory",
        desc: "Keep as many words in short term memory as possible."
      },
      chimpTest: {
        title: "Chimp Test",
        desc: "Are you smarter than a chimpanzee?"
      },
      visualMemory: {
        title: "Visual Memory",
        desc: "Remember an increasingly large board of squares."
      },
      typing: {
        title: "Typing",
        desc: "How many words per minute can you type?"
      }
    },
    id: {
      title: "Human Benchmark",
      subtitle: "Ukur kemampuan Anda dengan permainan otak dan tes kognitif.",
      getStarted: "Mulai",
      reactionTime: {
        title: "Waktu Reaksi",
        desc: "Uji refleks visual Anda"
      },
      sequenceMemory: {
        title: "Memori Urutan",
        desc: "Ingat pola tombol yang semakin panjang."
      },
      aimTrainer: {
        title: "Latihan Bidik",
        desc: "Seberapa cepat Anda bisa mengenai semua target?"
      },
      numberMemory: {
        title: "Memori Angka",
        desc: "Ingat angka terpanjang yang Anda bisa."
      },
      verbalMemory: {
        title: "Memori Verbal",
        desc: "Simpan sebanyak mungkin kata dalam memori jangka pendek."
      },
      chimpTest: {
        title: "Tes Simpanse",
        desc: "Apakah Anda lebih pintar dari simpanse?"
      },
      visualMemory: {
        title: "Memori Visual",
        desc: "Ingat papan kotak yang semakin besar."
      },
      typing: {
        title: "Mengetik",
        desc: "Berapa kata per menit yang bisa Anda ketik?"
      }
    }
  };

  const t = translations[language];

  return (
    <div>
      {/* HERO SECTION - BAGIAN BIRU */}
      <section
        style={{
          background: 'linear-gradient(135deg, #4a90e2 0%, #357abd 100%)',
          padding: '80px 24px',
          textAlign: 'center',
          color: 'white'
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: '8px' }}>⚡</div>
        <h1 style={{ fontSize: '48px', margin: '16px 0', fontWeight: '400' }}>
          {t.title}
        </h1>
        <p style={{ fontSize: '18px', marginBottom: '32px', opacity: 0.95 }}>
          {t.subtitle}
        </p>
        <button
          style={{
            background: '#ffc107',
            color: '#333',
            border: 'none',
            padding: '12px 32px',
            fontSize: '16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          {t.getStarted}
        </button>
      </section>

      {/* GRID KARTU TEST */}
      <section
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '60px 24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px'
        }}
      >
        {/* Card 1: Reaction Time */}
        <TestCard
          icon="⚡"
          title={t.reactionTime.title}
          desc={t.reactionTime.desc}
          onClick={() => setCurrentPage('reaction')}
        />

        {/* Card 2: Sequence Memory */}
        <TestCard
          icon="🔲"
          title={t.sequenceMemory.title}
          desc={t.sequenceMemory.desc}
          badge="New"
        />

        {/* Card 3: Aim Trainer */}
        <TestCard
          icon="🎯"
          title={t.aimTrainer.title}
          desc={t.aimTrainer.desc}
          badge="New"
        />

        {/* Card 4: Number Memory */}
        <TestCard
          icon="1️⃣2️⃣"
          title={t.numberMemory.title}
          desc={t.numberMemory.desc}
        />

        {/* Card 5: Verbal Memory */}
        <TestCard
          icon="🔤"
          title={t.verbalMemory.title}
          desc={t.verbalMemory.desc}
          onClick={() => setCurrentPage('verbal')}
        />

        {/* Card 6: Chimp Test */}
        <TestCard
          icon="🐵"
          title={t.chimpTest.title}
          desc={t.chimpTest.desc}
        />

        {/* Card 7: Visual Memory */}
        <TestCard
          icon="🔲"
          title={t.visualMemory.title}
          desc={t.visualMemory.desc}
        />

        {/* Card 8: Typing */}
        <TestCard
          icon="⌨️"
          title={t.typing.title}
          desc={t.typing.desc}
        />
      </section>
    </div>
  );
}

// Component untuk Card Test
function TestCard({ icon, title, desc, badge, onClick }) {
  return (
    <div
      style={{
        background: 'white',
        border: '1px solid #e6e6e6',
        borderRadius: '8px',
        padding: '32px 24px',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s',
        position: 'relative'
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {badge && (
        <span
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: '#ff4757',
            color: 'white',
            padding: '4px 12px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '600'
          }}
        >
          {badge}
        </span>
      )}
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>{icon}</div>
      <h3 style={{ fontSize: '20px', margin: '12px 0', color: '#333' }}>
        {title}
      </h3>
      <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.5' }}>
        {desc}
      </p>
    </div>
  );
}

export default Homepage;