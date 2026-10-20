import React, { useState } from 'react';
import { Gift, Sparkles, X, Check, Award } from 'lucide-react';
import { TIER_META } from '../constants/gameRules';

export default function RewardBoxModal({
  isOpen,
  isOpening,
  openedReward,
  unopenedBoxes,
  onOpenBox,
  onClose,
  onNavigateToCollection,
}) {
  if (!isOpen && !openedReward) return null;

  const tierMeta = openedReward?.item ? TIER_META[openedReward.item.tier] : null;

  return (
    <div className="modal-backdrop" onClick={!isOpening ? onClose : undefined}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          textAlign: 'center',
          maxWidth: '440px',
          background: openedReward?.item?.tier === 'special'
            ? 'linear-gradient(135deg, #FFFFFF 0%, #F5F3FF 100%)'
            : openedReward?.item?.tier === 'rare'
            ? 'linear-gradient(135deg, #FFFFFF 0%, #FFFBEB 100%)'
            : '#FFFFFF',
          border: tierMeta ? `2px solid ${tierMeta.borderColor}` : '1px solid var(--border-light)',
        }}
      >
        {/* 닫기 버튼 */}
        {!isOpening && (
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
        )}

        {/* 1단계: 상자 오픈 대기 상태 */}
        {!openedReward && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px', padding: '10px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={20} color="var(--yellow-600)" />
              <h2 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                신비한 여행 보상 상자
              </h2>
            </div>

            {/* 상자 그래픽 (오픈 애니메이션 적용) */}
            <div
              className={isOpening ? 'box-shaking' : ''}
              style={{
                width: '130px',
                height: '130px',
                borderRadius: 'var(--radius-lg)',
                background: 'linear-gradient(135deg, #FDE68A 0%, #F59E0B 100%)',
                boxShadow: isOpening ? '0 0 35px rgba(245, 158, 11, 0.7)' : 'var(--shadow-float)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '4.5rem',
                border: '3px solid #FBBF24',
                transition: 'all 0.3s ease',
              }}
            >
              🎁
            </div>

            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
              {isOpening
                ? '상자가 두근두근 흔들리고 있어요...! ✨'
                : `남은 보상 상자: ${unopenedBoxes}개\n버튼을 눌러 상자를 열어보세요!`}
            </p>

            <button
              onClick={onOpenBox}
              disabled={isOpening || unopenedBoxes <= 0}
              className="reward-open-btn"
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '1.05rem',
                cursor: isOpening ? 'wait' : 'pointer',
                opacity: isOpening ? 0.75 : 1,
              }}
            >
              <Sparkles size={18} />
              <span>{isOpening ? '상자 개봉 중...' : '상자 열기!'}</span>
            </button>
          </div>
        )}

        {/* 2단계: 보상 결과 획득 화면 */}
        {openedReward && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', animation: 'modalPop 0.35s ease' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '1.5rem' }}>✨</span>
              <span
                style={{
                  fontSize: '0.82rem',
                  fontWeight: '800',
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: tierMeta.bgColor,
                  color: tierMeta.color,
                  border: `1px solid ${tierMeta.borderColor}`,
                }}
              >
                {tierMeta.label} 등급 발견!
              </span>
            </div>

            {/* 획득 아이템 일러스트 */}
            <div
              style={{
                width: '100px',
                height: '100px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: tierMeta.bgColor,
                border: `2px solid ${tierMeta.borderColor}`,
                boxShadow: `0 8px 30px ${tierMeta.glowColor}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3.6rem',
                margin: '8px 0',
                animation: 'happyBounce 2s infinite ease-in-out',
              }}
            >
              {openedReward.item.emoji}
            </div>

            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                {openedReward.item.name}
              </h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
                {openedReward.item.description}
              </p>
            </div>

            {/* 중복 보상인 경우 행운 XP 환전 안내 */}
            {openedReward.isDuplicate ? (
              <div
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'var(--yellow-100)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--yellow-200)',
                  fontSize: '0.85rem',
                  color: 'var(--yellow-600)',
                  fontWeight: '700',
                }}
              >
                이미 보유 중인 보물이에요! 행운 경험치 +{openedReward.refundXp} XP로 환전되었습니다. 🍀
              </div>
            ) : (
              <div
                style={{
                  width: '100%',
                  padding: '10px',
                  background: 'var(--sage-100)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--sage-200)',
                  fontSize: '0.85rem',
                  color: 'var(--sage-700)',
                  fontWeight: '700',
                }}
              >
                🎉 축하합니다! '나의 컬렉션' 도감에 새로 등록되었습니다!
              </div>
            )}

            {/* 버튼들 */}
            <div style={{ display: 'flex', gap: '10px', width: '100%', marginTop: '8px' }}>
              <button
                onClick={() => {
                  onClose();
                  if (onNavigateToCollection) onNavigateToCollection();
                }}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-main)',
                  border: '1px solid var(--border-light)',
                  color: 'var(--text-primary)',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                }}
              >
                도감 확인하기
              </button>

              <button
                onClick={onClose}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--sage-500)',
                  color: '#FFFFFF',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  boxShadow: 'var(--shadow-subtle)',
                }}
              >
                확인
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
