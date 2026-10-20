import React from 'react';
import { CheckCircle2, Plane, Sparkles } from 'lucide-react';

export default function CompletionModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          textAlign: 'center',
          maxWidth: '440px',
          background: 'linear-gradient(135deg, #FFFDF5 0%, #E9F1EC 100%)',
          border: '2px solid var(--sage-500)',
          boxShadow: '0 16px 40px rgba(107, 142, 123, 0.3)',
        }}
      >
        <div style={{ fontSize: '4rem', marginBottom: '8px', animation: 'victoryDance 0.8s infinite alternate' }}>
          ✈️🌟
        </div>

        <span className="badge-pill badge-sage" style={{ fontSize: '0.85rem', padding: '4px 14px' }}>
          PERFECT PACKING!
        </span>

        <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--sage-700)', marginTop: '10px' }}>
          여행 준비 완료!
        </h2>

        <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', margin: '14px 0 20px 0', lineHeight: '1.6' }}>
          단 하나의 준비물도 빠뜨리지 않고 완벽하게 챙겼어요!<br />
          캐리와 함께 두근거리는 마음으로 떠나볼까요? 🎒✨
        </p>

        <div
          style={{
            padding: '14px',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-md)',
            border: '1.5px dashed var(--sage-500)',
            marginBottom: '20px',
          }}
        >
          <div style={{ fontWeight: '700', fontSize: '0.92rem', color: 'var(--text-primary)' }}>
            가방 캐릭터 '캐리'의 메시지 💌
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--sage-600)', marginTop: '4px' }}>
            "나를 든든하게 채워줘서 고마워요! 최고의 여행이 될 거예요!"
          </p>
        </div>

        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: '13px',
            backgroundColor: 'var(--sage-500)',
            color: '#FFFFFF',
            fontWeight: '700',
            fontSize: '1rem',
            borderRadius: 'var(--radius-sm)',
            boxShadow: 'var(--shadow-subtle)',
          }}
        >
          신나게 출발하기! 🍊
        </button>
      </div>
    </div>
  );
}
