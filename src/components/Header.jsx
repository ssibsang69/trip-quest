import React from 'react';
import { Calendar, Edit3, Sparkles, Gift } from 'lucide-react';

export default function Header({
  tripInfo,
  dDayInfo,
  levelInfo,
  unopenedBoxes,
  onOpenEditTrip,
  onOpenBoxModal,
}) {
  return (
    <header className="top-header">
      {/* 로고 & 슬로건 */}
      <div className="brand-section">
        <div className="brand-logo-badge">🎒</div>
        <div>
          <h1 className="brand-title">Trip Quest</h1>
          <p className="brand-subtitle">설레는 미션과 감성 보상이 함께하는 여행 다이어리</p>
        </div>
      </div>

      {/* 여행 정보 배너 & 레벨 상태 */}
      <div className="trip-banner">
        <div className="trip-info-left">
          {/* D-Day 칩 */}
          <div className="d-day-chip">
            <Calendar size={18} />
            <span>{dDayInfo.text}</span>
          </div>

          <div>
            <div className="trip-title-text">
              <span>{tripInfo.title}</span>
              <button
                onClick={onOpenEditTrip}
                title="여행 정보 수정"
                style={{
                  color: 'var(--text-muted)',
                  padding: '4px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Edit3 size={16} />
              </button>
            </div>
            <div className="trip-date-text">
              <span>출발일: {tripInfo.departureDate || '미정'}</span>
              <span>• 목적지: {tripInfo.destination || '자유 여행'}</span>
            </div>
          </div>
        </div>

        {/* 레벨 & 경험치 프로그레스 */}
        <div style={{ minWidth: '230px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="badge-pill badge-yellow" style={{ fontWeight: '800' }}>
                Lv.{levelInfo.level}
              </span>
              <span style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                {levelInfo.title}
              </span>
            </div>

            {/* 미개봉 상자 바로가기 버튼 */}
            {unopenedBoxes > 0 && (
              <button
                onClick={onOpenBoxModal}
                className="reward-open-btn"
                style={{ padding: '4px 10px', fontSize: '0.8rem', animation: 'pulse 1.8s infinite' }}
                title="보상 상자 열기"
              >
                <Gift size={14} />
                <span>상자 {unopenedBoxes}개!</span>
              </button>
            )}
          </div>

          {/* 경험치 바 */}
          <div>
            <div className="progress-track" style={{ height: '8px' }}>
              <div
                className="progress-fill gold"
                style={{ width: `${levelInfo.progressPercent}%` }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.74rem',
                color: 'var(--text-muted)',
                marginTop: '4px',
                fontWeight: '600',
              }}
            >
              <span>{levelInfo.currentXp} XP 획득</span>
              <span>
                {levelInfo.isMaxLevel ? '최고 레벨 달성' : `다음 레벨까지 ${levelInfo.xpNeededForNext - levelInfo.xpInCurrentLevel} XP`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
