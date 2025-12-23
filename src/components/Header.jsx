// src/components/Header.jsx
import React from 'react';

function Header({ language, setLanguage, setCurrentPage }) {
  return (
    <header
      style={{
        height: '60px',
        background: '#ffffff',
        borderBottom: '1px solid #e6e6e6',
        padding: '0 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '14px'
      }}
    >
      {/* BAGIAN KIRI: LOGO + DASHBOARD */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }}
      >
        <strong 
          style={{ 
            letterSpacing: '1px',
            cursor: 'pointer'
          }}
          onClick={() => setCurrentPage('home')}
        >
          ⚡ HUMAN BENCHMARK
        </strong>

        <span
          style={{
            color: '#333',
            cursor: 'pointer'
          }}
          onClick={() => setCurrentPage('home')}
        >
          DASHBOARD
        </span>
      </div>

      {/* BAGIAN KANAN: LANGUAGE + AUTH */}
      <div
        style={{
          display: 'flex',
          gap: '20px',
          color: '#333',
          alignItems: 'center'
        }}
      >
        {/* DROPDOWN BAHASA */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            padding: '4px 8px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            background: 'white'
          }}
        >
          <option value="en">🇺🇸 English</option>
          <option value="id">🇮🇩 Indonesia</option>
        </select>

        <span style={{ cursor: 'pointer' }}>
          {language === 'en' ? 'Sign Up' : 'Daftar'}
        </span>
        <span style={{ cursor: 'pointer' }}>
          {language === 'en' ? 'Login' : 'Masuk'}
        </span>
      </div>
    </header>
  );
}

export default Header;