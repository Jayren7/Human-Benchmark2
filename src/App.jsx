// src/App.jsx
import React, { useState } from 'react';
import Header from './components/Header';
import Homepage from './components/Homepage';
import VerbalMemory from './components/VerbalMemory';
import ReactionTime from './components/ReactionTime';

function App() {
  const [language, setLanguage] = useState('en');
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div>
      {/* HEADER */}
      <Header 
        language={language} 
        setLanguage={setLanguage}
        setCurrentPage={setCurrentPage}
      />

      {/* ISI HALAMAN */}
      {currentPage === 'home' && (
        <Homepage 
          language={language}
          setCurrentPage={setCurrentPage}
        />
      )}

      {currentPage === 'verbal' && (
        <VerbalMemory language={language} />
      )}

      {currentPage === 'reaction' && (
        <ReactionTime language={language} />
      )}
    </div>
  );
}

export default App;