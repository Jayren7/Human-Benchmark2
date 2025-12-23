// src/components/ReactionBox.jsx
import React from 'react';

function ReactionBox({ state, reactionTime, onClick, language = 'en' }) {
  // Terjemahan
  const translations = {
    en: {
      title: "Reaction Time Test",
      instruction: "When the red box turns green, click as quickly as you can.",
      clickToStart: "Click to start",
      waitForGreen: "Wait for green...",
      clickNow: "Click!",
      tooSoon: "Too soon!",
      clickToTryAgain: "Click to try again",
      yourTime: "Your reaction time:",
      clickToKeepGoing: "Click to keep going"
    },
    id: {
      title: "Tes Waktu Reaksi",
      instruction: "Ketika kotak merah berubah menjadi hijau, klik secepat yang Anda bisa.",
      clickToStart: "Klik untuk mulai",
      waitForGreen: "Tunggu hijau...",
      clickNow: "Klik!",
      tooSoon: "Terlalu cepat!",
      clickToTryAgain: "Klik untuk coba lagi",
      yourTime: "Waktu reaksi Anda:",
      clickToKeepGoing: "Klik untuk lanjut"
    }
  };

  const t = translations[language];

  const getBackgroundColor = () => {
    if (state === 'intro' || state === 'clicked') return '#2196F3';
    if (state === 'waiting') return '#E53935';
    if (state === 'ready') return '#4CAF50';
    if (state === 'tooSoon') return '#E53935';
    return '#2196F3';
  };

  const getMessage = () => {
    if (state === 'intro') {
      return (
        <div>
          <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>
            {t.title}
          </h1>
          <p style={{ fontSize: '18px', marginBottom: '24px' }}>
            {t.instruction}
          </p>
          <p style={{ fontSize: '16px' }}>{t.clickToStart}</p>
        </div>
      );
    }

    if (state === 'waiting') {
      return <h2 style={{ fontSize: '28px' }}>{t.waitForGreen}</h2>;
    }

    if (state === 'ready') {
      return <h2 style={{ fontSize: '36px', fontWeight: 'bold' }}>{t.clickNow}</h2>;
    }

    if (state === 'tooSoon') {
      return (
        <div>
          <h2 style={{ fontSize: '32px', marginBottom: '12px' }}>{t.tooSoon}</h2>
          <p style={{ fontSize: '16px' }}>{t.clickToTryAgain}</p>
        </div>
      );
    }

    if (state === 'clicked' && reactionTime) {
      return (
        <div>
          <h2 style={{ fontSize: '24px', marginBottom: '12px' }}>{t.yourTime}</h2>
          <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>
            {reactionTime} ms
          </div>
          <p style={{ fontSize: '16px' }}>{t.clickToKeepGoing}</p>
        </div>
      );
    }
  };

  return (
    <div
      onClick={onClick}
      style={{
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: getBackgroundColor(),
        color: 'white',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        userSelect: 'none',
        padding: '40px'
      }}
    >
      {getMessage()}
    </div>
  );
}

export default ReactionBox;