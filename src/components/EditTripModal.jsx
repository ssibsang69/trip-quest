import React, { useState } from 'react';
import { X, Calendar, MapPin, Edit3 } from 'lucide-react';

export default function EditTripModal({ isOpen, tripInfo, onSave, onClose }) {
  if (!isOpen) return null;

  const [title, setTitle] = useState(tripInfo.title);
  const [destination, setDestination] = useState(tripInfo.destination);
  const [departureDate, setDepartureDate] = useState(tripInfo.departureDate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({
      title: title.trim(),
      destination: destination.trim(),
      departureDate,
    });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            color: 'var(--text-muted)',
            padding: '4px',
          }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
          <Edit3 size={20} color="var(--sage-600)" />
          <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-primary)' }}>
            여행 정보 변경
          </h2>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px' }}>
              여행 제목
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 제주도 푸른 바다 힐링 여행 🍊"
              style={{ width: '100%' }}
              required
              autoFocus
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px' }}>
              목적지
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="예: 제주도, 후쿠오카, 방콕"
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px' }}>
              출발일
            </label>
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '11px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-main)',
                color: 'var(--text-primary)',
                fontWeight: '700',
              }}
            >
              취소
            </button>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: '11px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--sage-500)',
                color: '#FFFFFF',
                fontWeight: '700',
                boxShadow: 'var(--shadow-subtle)',
              }}
            >
              저장하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
