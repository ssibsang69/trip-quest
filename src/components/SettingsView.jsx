import React, { useState } from 'react';
import { Settings, Save, RotateCcw, AlertTriangle, HelpCircle, Check, MapPin, Calendar } from 'lucide-react';
import { GAME_RULES, TIER_META } from '../constants/gameRules';

export default function SettingsView({
  tripInfo,
  onUpdateTripInfo,
  onResetAllData,
  onRestoreSampleData,
}) {
  const [title, setTitle] = useState(tripInfo.title);
  const [destination, setDestination] = useState(tripInfo.destination);
  const [departureDate, setDepartureDate] = useState(tripInfo.departureDate);
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const handleSaveTrip = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onUpdateTripInfo({
      title: title.trim(),
      destination: destination.trim(),
      departureDate,
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '720px', margin: '0 auto', width: '100%' }}>
      {/* 여행 정보 수정 카드 */}
      <div className="quest-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Settings size={22} color="var(--sage-600)" />
          <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-primary)' }}>
            여행 일정 및 정보 설정
          </h2>
        </div>

        <form onSubmit={handleSaveTrip} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '6px', color: 'var(--text-primary)' }}>
              여행 제목
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 제주도 푸른 바다 힐링 여행 🍊"
              style={{ width: '100%' }}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '6px', color: 'var(--text-primary)' }}>
                여행 목적지
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="예: 제주도, 도쿄, 파리"
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '6px', color: 'var(--text-primary)' }}>
                출발일 (D-Day 자동 계산)
              </label>
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
          </div>

          <button
            type="submit"
            style={{
              padding: '12px 20px',
              backgroundColor: 'var(--sage-500)',
              color: '#FFFFFF',
              fontWeight: '700',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '6px',
              boxShadow: 'var(--shadow-subtle)',
            }}
          >
            <Save size={18} />
            <span>여행 정보 저장하기</span>
          </button>
        </form>
      </div>

      {/* 게임 시스템 & 퀘스트 규칙 안내 */}
      <div className="quest-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <HelpCircle size={22} color="var(--yellow-600)" />
          <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-primary)' }}>
            Trip Quest 룰북 & 보상 확률
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
          <div style={{ padding: '12px', background: 'var(--bg-main)', borderRadius: 'var(--radius-sm)' }}>
            <strong style={{ color: 'var(--text-primary)' }}>🎒 준비물 체크 경험치:</strong>
            <p>준비물을 처음 체크할 때마다 +{GAME_RULES.ITEM_CHECK_XP} XP를 획득합니다. (체크를 풀었다가 다시 체크해도 반복 지급되지 않습니다.)</p>
          </div>

          <div style={{ padding: '12px', background: 'var(--bg-main)', borderRadius: 'var(--radius-sm)' }}>
            <strong style={{ color: 'var(--text-primary)' }}>✨ 카테고리 올클리어 보너스:</strong>
            <p>의류, 전자기기 등 카테고리의 모든 짐을 다 챙기면 보너스 +{GAME_RULES.CATEGORY_COMPLETE_XP} XP를 드립니다!</p>
          </div>

          <div style={{ padding: '12px', background: 'var(--bg-main)', borderRadius: 'var(--radius-sm)' }}>
            <strong style={{ color: 'var(--text-primary)' }}>🎁 보상 상자 오픈 확률:</strong>
            <p style={{ marginTop: '4px' }}>
              • 일반 (Common): {Math.round(TIER_META.common.dropRate * 100)}% (귀여운 여행 스티커)<br />
              • 희귀 (Rare): {Math.round(TIER_META.rare.dropRate * 100)}% (황금 비행기, 카메라, 선글라스)<br />
              • 특별 (Special): {Math.round(TIER_META.special.dropRate * 100)}% (세계 여행자 배지, 마법의 왕관)
            </p>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              * 이미 보유한 아이템이 나오면 행운 경험치 +{GAME_RULES.DUPLICATE_ITEM_REFUND_XP} XP로 환전됩니다.
            </p>
          </div>
        </div>
      </div>

      {/* 데이터 관리 및 초기화 카드 */}
      <div className="quest-card" style={{ border: '1.5px solid var(--border-light)' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '14px' }}>
          데이터 관리 및 복원
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <strong style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}>기본 데이터 복원</strong>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                기본 제공되는 필수 준비물 26개와 추천 설정으로 복원합니다.
              </p>
            </div>
            <button
              onClick={onRestoreSampleData}
              style={{
                padding: '8px 14px',
                backgroundColor: 'var(--sage-100)',
                color: 'var(--sage-700)',
                fontWeight: '700',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <RotateCcw size={15} />
              <span>샘플 복원</span>
            </button>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border-light)' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <strong style={{ fontSize: '0.92rem', color: '#EF4444' }}>모든 게임 데이터 초기화</strong>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                체크리스트, 레벨, 획득한 스티커와 도감이 모두 지워집니다.
              </p>
            </div>
            <button
              onClick={() => setShowConfirmReset(true)}
              style={{
                padding: '8px 14px',
                backgroundColor: '#FEE2E2',
                color: '#DC2626',
                fontWeight: '700',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <AlertTriangle size={15} />
              <span>전체 초기화</span>
            </button>
          </div>
        </div>
      </div>

      {/* 초기화 확인 모달 */}
      {showConfirmReset && (
        <div className="modal-backdrop" onClick={() => setShowConfirmReset(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '2.5rem' }}>⚠️</span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '8px' }}>
              정말 모든 데이터를 초기화할까요?
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: '10px 0 20px 0' }}>
              체크리스트와 모은 스티커, 경험치가 초기 상태로 되돌아갑니다.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setShowConfirmReset(false)}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-main)',
                  color: 'var(--text-primary)',
                  fontWeight: '700',
                }}
              >
                취소
              </button>
              <button
                onClick={() => {
                  onResetAllData();
                  setShowConfirmReset(false);
                }}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: 'var(--radius-sm)',
                  background: '#EF4444',
                  color: '#FFFFFF',
                  fontWeight: '700',
                }}
              >
                네, 초기화합니다
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
