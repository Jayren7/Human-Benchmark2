// src/components/ReactionTime.jsx
import React, { useState, useEffect, useRef } from 'react';
import Statistics from './Statistics';

function ReactionTime({ language = 'en' }) {
  const [state, setState] = useState('intro'); // 'intro', 'waiting', 'ready', 'clicked', 'tooSoon'
  const [reactionTime, setReactionTime] = useState(null);
  const [scores, setScores] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const timeoutRef = useRef(null);

  const translations = {
    en: {
      title: "Reaction Time Test",
      instruction: "When the red box turns green, click as quickly as you can.",
      clickToStart: "Click anywhere to start",
      waitForGreen: "Wait for green...",
      clickNow: "Click!",
      tooSoon: "Too soon!",
      clickToTryAgain: "Click to try again",
      yourTime: "ms",
      clickToKeepGoing: "Click to keep going",
      saveScore: "Save score",
      tryAgain: "Try again"
    },
    id: {
      title: "Tes Waktu Reaksi",
      instruction: "Ketika kotak merah berubah menjadi hijau, klik secepat yang Anda bisa.",
      clickToStart: "Klik di mana saja untuk mulai",
      waitForGreen: "Tunggu hijau...",
      clickNow: "Klik!",
      tooSoon: "Terlalu cepat!",
      clickToTryAgain: "Klik untuk coba lagi",
      yourTime: "ms",
      clickToKeepGoing: "Klik untuk lanjut",
      saveScore: "Simpan skor",
      tryAgain: "Coba lagi"
    }
  };

  const t = translations[language];

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleClick = () => {
    if (state === 'intro' || state === 'tooSoon') {
      // Mulai game
      setState('waiting');
      const randomDelay = Math.random() * 3000 + 1000; // 1-4 detik
      
      timeoutRef.current = setTimeout(() => {
        setState('ready');
        setStartTime(Date.now());
      }, randomDelay);
    } else if (state === 'waiting') {
      // Klik terlalu cepat
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setState('tooSoon');
    } else if (state === 'ready') {
      // Klik tepat waktu
      const endTime = Date.now();
      const reactionMs = endTime - startTime;
      setReactionTime(reactionMs);
      setScores([...scores, reactionMs]);
      setState('clicked');
    } else if (state === 'clicked') {
      // Main lagi
      setState('waiting');
      const randomDelay = Math.random() * 3000 + 1000;
      
      timeoutRef.current = setTimeout(() => {
        setState('ready');
        setStartTime(Date.now());
      }, randomDelay);
    }
  };

  const getBackgroundColor = () => {
    if (state === 'intro' || state === 'clicked') return 'linear-gradient(135deg, #4a90e2 0%, #357abd 100%)';
    if (state === 'waiting') return '#E53935';
    if (state === 'ready') return '#4CAF50';
    if (state === 'tooSoon') return '#E53935';
    return 'linear-gradient(135deg, #4a90e2 0%, #357abd 100%)';
  };

  return (
    <>
      {/* BOX BIRU/MERAH/HIJAU */}
      <section
        onClick={handleClick}
        style={{
          background: getBackgroundColor(),
          padding: '80px 24px',
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          cursor: 'pointer',
          userSelect: 'none'
        }}
      >
        {/* INTRO STATE */}
        {state === 'intro' && (
          <div style={{ textAlign: 'center', maxWidth: '600px' }}>
            <div style={{ fontSize: '48px', marginBottom: '24px' }}>⚡</div>
            <h1 style={{ fontSize: '48px', margin: '16px 0', fontWeight: '400' }}>
              {t.title}
            </h1>
            <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '32px', opacity: 0.95 }}>
              {t.instruction}
            </p>
            <p style={{ fontSize: '18px', fontWeight: '600' }}>{t.clickToStart}</p>
          </div>
        )}

        {/* WAITING STATE */}
        {state === 'waiting' && (
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '36px', fontWeight: '600' }}>{t.waitForGreen}</h2>
          </div>
        )}

        {/* READY STATE */}
        {state === 'ready' && (
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '48px', fontWeight: 'bold' }}>{t.clickNow}</h2>
          </div>
        )}

        {/* TOO SOON STATE */}
        {state === 'tooSoon' && (
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '36px', marginBottom: '16px', fontWeight: '600' }}>{t.tooSoon}</h2>
            <p style={{ fontSize: '18px', opacity: 0.9 }}>{t.clickToTryAgain}</p>
          </div>
        )}

        {/* CLICKED STATE */}
        {state === 'clicked' && reactionTime && (
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '72px', fontWeight: 'bold', margin: '24px 0' }}>
              {reactionTime}
            </h1>
            <h2 style={{ fontSize: '28px', marginBottom: '16px' }}>{t.yourTime}</h2>
            <p style={{ fontSize: '18px', opacity: 0.9 }}>{t.clickToKeepGoing}</p>
          </div>
        )}
      </section>

      {/* STATISTICS - SELALU MUNCUL */}
      <Statistics scores={scores} language={language} />
    </>
  );
}

export default ReactionTime;