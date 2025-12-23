// src/components/VerbalMemory.jsx
import React, { useState } from 'react';
import VerbalStatistics from './VerbalStatistics';

const WORD_LIST = [
  'apple', 'banana', 'cat', 'dog', 'elephant', 'flower', 'guitar', 'house',
  'island', 'jungle', 'kite', 'lemon', 'mountain', 'night', 'ocean', 'piano',
  'queen', 'river', 'sun', 'tree', 'umbrella', 'village', 'water', 'yellow',
  'zebra', 'book', 'chair', 'door', 'energy', 'forest', 'garden', 'hospital',
  'internet', 'journey', 'kitchen', 'library', 'music', 'nature', 'orange',
  'pencil', 'question', 'rainbow', 'school', 'telephone', 'universe', 'volcano',
  'window', 'exercise', 'youth', 'zero', 'adventure', 'bridge', 'chocolate',
  'diamond', 'education', 'freedom', 'happiness', 'imagination', 'justice',
  'knowledge', 'language', 'memory', 'nutrition', 'opportunity', 'peace',
  'quality', 'respect', 'strength', 'technology', 'understanding', 'victory',
  'wisdom', 'excellence', 'beauty', 'courage', 'dream', 'engine', 'flag',
  'globe', 'heart', 'idea', 'joy', 'king', 'light', 'moon', 'number',
  'object', 'power', 'rabbit', 'science', 'table', 'unity', 'voice',
  'wealth', 'zone', 'artist', 'beach', 'camera', 'dance', 'eagle'
];

function VerbalMemory({ language = 'en' }) {
  const [gameState, setGameState] = useState('intro');
  const [currentWord, setCurrentWord] = useState('');
  const [seenWords, setSeenWords] = useState([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [unusedWords, setUnusedWords] = useState([...WORD_LIST]);

  const translations = {
    en: {
      title: "Verbal Memory Test",
      description: "You will be shown words, one at a time. If you've seen a word during this test, click SEEN. If it's a new word, click NEW.",
      start: "Start",
      seen: "SEEN",
      new: "NEW",
      score: "Score",
      lives: "Lives",
      words: "words",
      saveScore: "Save score",
      tryAgain: "Try again",
      saveScoreMsg: "Save your score to see how you compare."
    },
    id: {
      title: "Tes Memori Verbal",
      description: "Anda akan ditampilkan kata-kata, satu per satu. Jika Anda pernah melihat kata tersebut selama tes ini, klik PERNAH. Jika kata baru, klik BARU.",
      start: "Mulai",
      seen: "PERNAH",
      new: "BARU",
      score: "Skor",
      lives: "Nyawa",
      words: "kata",
      saveScore: "Simpan skor",
      tryAgain: "Coba lagi",
      saveScoreMsg: "Simpan skor Anda untuk melihat perbandingan."
    }
  };

  const t = translations[language];

  const generateWord = () => {
    const shouldRepeat = seenWords.length > 0 && Math.random() < 0.5;

    if (shouldRepeat) {
      const randomIndex = Math.floor(Math.random() * seenWords.length);
      return { word: seenWords[randomIndex], isNew: false };
    } else {
      if (unusedWords.length === 0) {
        setUnusedWords([...WORD_LIST]);
        const word = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
        return { word, isNew: true };
      }

      const randomIndex = Math.floor(Math.random() * unusedWords.length);
      const word = unusedWords[randomIndex];
      
      const newUnused = unusedWords.filter((_, i) => i !== randomIndex);
      setUnusedWords(newUnused);
      
      return { word, isNew: true };
    }
  };

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setLives(3);
    setSeenWords([]);
    setUnusedWords([...WORD_LIST]);
    
    const { word, isNew } = generateWord();
    setCurrentWord(word);
    if (isNew) {
      setSeenWords([word]);
    }
  };

  const handleAnswer = (userSaidSeen) => {
    const isActuallySeen = seenWords.includes(currentWord);
    const isCorrect = userSaidSeen === isActuallySeen;

    if (isCorrect) {
      setScore(prev => prev + 1);
    } else {
      const newLives = lives - 1;
      setLives(newLives);
      
      if (newLives === 0) {
        setGameState('gameover');
        return;
      }
    }

    const { word, isNew } = generateWord();
    setCurrentWord(word);
    
    if (isNew && !seenWords.includes(word)) {
      setSeenWords(prev => [...prev, word]);
    }
  };

  return (
    <>
      {/* BOX BIRU - SEMUA STATE ADA DI SINI */}
      <section
        style={{
          background: 'linear-gradient(135deg, #4a90e2 0%, #357abd 100%)',
          padding: '80px 24px',
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white'
        }}
      >
        {/* ========== INTRO STATE ========== */}
        {gameState === 'intro' && (
          <div style={{ textAlign: 'center', maxWidth: '600px' }}>
            <div style={{ fontSize: '48px', marginBottom: '24px' }}>🔤</div>
            <h1 style={{ fontSize: '48px', margin: '16px 0', fontWeight: '400' }}>
              {t.title}
            </h1>
            <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '32px', opacity: 0.95 }}>
              {t.description}
            </p>
            <button
              onClick={startGame}
              style={{
                background: '#ffc107',
                color: '#333',
                border: 'none',
                padding: '16px 48px',
                fontSize: '18px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              {t.start}
            </button>
          </div>
        )}

        {/* ========== PLAYING STATE ========== */}
        {gameState === 'playing' && (
          <div style={{ width: '100%', maxWidth: '600px' }}>
            {/* Score & Lives */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '40px',
                fontSize: '18px',
                fontWeight: '600'
              }}
            >
              <div>
                {t.score}: <span style={{ fontSize: '24px' }}>{score}</span>
              </div>
              <div>
                {t.lives}: <span style={{ fontSize: '24px' }}>{'❤️'.repeat(lives)}</span>
              </div>
            </div>

            {/* Word Display Box */}
            <div
              style={{
                background: 'white',
                padding: '80px 48px',
                borderRadius: '12px',
                textAlign: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                marginBottom: '32px'
              }}
            >
              <div
                style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  color: '#333',
                  letterSpacing: '2px'
                }}
              >
                {currentWord}
              </div>
            </div>

            {/* Buttons */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px'
              }}
            >
              <button
                onClick={() => handleAnswer(true)}
                style={{
                  background: 'rgba(255,255,255,0.9)',
                  color: '#2196F3',
                  border: 'none',
                  padding: '24px',
                  fontSize: '24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '700',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'white';
                  e.target.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255,255,255,0.9)';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                {t.seen}
              </button>
              <button
                onClick={() => handleAnswer(false)}
                style={{
                  background: 'rgba(255,255,255,0.9)',
                  color: '#4CAF50',
                  border: 'none',
                  padding: '24px',
                  fontSize: '24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '700',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'white';
                  e.target.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255,255,255,0.9)';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                {t.new}
              </button>
            </div>
          </div>
        )}

        {/* ========== GAME OVER STATE ========== */}
        {gameState === 'gameover' && (
          <div style={{ textAlign: 'center', maxWidth: '600px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔤</div>
            <h2 style={{ fontSize: '28px', marginBottom: '16px' }}>
              {language === 'en' ? 'Verbal Memory' : 'Memori Verbal'}
            </h2>
            <h1 style={{ fontSize: '72px', fontWeight: 'bold', margin: '24px 0' }}>
              {score} {t.words}
            </h1>
            <p style={{ fontSize: '16px', marginBottom: '32px', opacity: 0.9 }}>
              {t.saveScoreMsg}
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
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
                {t.saveScore}
              </button>
              <button
                onClick={startGame}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  border: '1px solid white',
                  padding: '12px 32px',
                  fontSize: '16px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                {t.tryAgain}
              </button>
            </div>
          </div>
        )}
      </section>

      {/* STATISTICS - SELALU MUNCUL DI SEMUA STATE */}
      <VerbalStatistics score={score} language={language} showScore={gameState === 'gameover'} />
    </>
  );
}

export default VerbalMemory;