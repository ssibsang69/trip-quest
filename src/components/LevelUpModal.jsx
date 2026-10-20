import React from 'react';
import { Sparkles, Trophy, ArrowRight } from 'lucide-react';

export default function LevelUpModal({ data, onClose }) {
  if (!data) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          textAlign: 'center',
          maxWidth: '420px',
          background: 'linear-gradient(135deg, #FFFDF5 0%, #FFFFFF 100%)',
          border: '2px solid var(--yellow-500)',
          boxShadow: '0 16px 40px rgba(245, 158, 11, 0.25)',
        }}
      >
        <div style={{ fontSize: '3.5rem', marginBottom: '8px', animation: 'happyBounce 1.5s infinite ease-in-out' }}>
          🎉
        </div>

        <span className="badge-pill badge-yellow" style={{ fontSize: '0.85rem', padding: '4px 14px' }}>
          LEVEL UP!
        </span>

        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '10px' }}>
          레벨 {data.newLevel} 달성!
        </h2>

        <div
          style={{
            margin: '16px 0',
            padding: '16px',
            background: 'var(--yellow-100)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--yellow-200)',
          }}
        >
          <div style={{ fontSize: '1.8rem', marginBottom: '4px' }}>{data.badge}</div>
          <div style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--yellow-600)' }}>
            {data.title}
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            {data.desc}
          </p>
        </div>

        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
          더 꼼꼼하고 멋진 여행자가 되었어요! 앞으로의 여정도 기대돼요 ✨
        </p>

        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: 'var(--sage-500)',
            color: '#FFFFFF',
            fontWeight: '700',
            fontSize: '0.95rem',
            borderRadius: 'var(--radius-sm)',
            boxShadow: 'var(--shadow-subtle)',
          }}
        >
          멋져요! 계속 짐 싸기 🎒
        </button>
      </div>
    </div>
  );
}
