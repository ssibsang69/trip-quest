import React from 'react';
import {
  CheckCircle2,
  Clock,
  Target,
  Sparkles,
  Gift,
  ArrowRight,
  ChevronRight,
  Trophy,
} from 'lucide-react';
import LuggageCharacter from './LuggageCharacter';
import { CATEGORIES } from '../constants/defaultData';

export default function DashboardView({
  stats,
  levelInfo,
  missions,
  unopenedBoxes,
  equippedWearables,
  onNavigateTab,
  onOpenBoxModal,
  onOpenEditTrip,
  onClaimMission,
}) {
  const readyMissions = missions.filter((m) => m.canClaim);
  const activeMissions = missions.filter((m) => !m.isCompleted);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* 100% 준비 완료 특별 축하 배너 */}
      {stats.isAllCompleted && (
        <div
          className="quest-card quest-card-highlight"
          style={{
            background: 'linear-gradient(135deg, #FFF9DB 0%, #E2ECE5 100%)',
            border: '2px solid var(--yellow-500)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            padding: '20px 24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontSize: '2.4rem' }}>🎉</span>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--sage-700)' }}>
                여행 준비 100% 완료!
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                빠짐없이 모든 짐을 다 챙겼어요. 이제 가벼운 마음으로 즐겁게 떠나볼까요? ✈️
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('checklist')}
            className="badge-pill badge-sage"
            style={{ padding: '8px 16px', fontSize: '0.9rem', cursor: 'pointer' }}
          >
            준비물 다시보기
          </button>
        </div>
      )}

      {/* 상단 메인 캐릭터 & 총 진행률 카드 */}
      <div
        className="quest-card"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          alignItems: 'center',
          padding: '28px',
        }}
      >
        {/* 가방 캐릭터 쇼케이스 */}
        <LuggageCharacter
          progressPercent={stats.progressPercent}
          equippedWearables={equippedWearables}
          isAllCompleted={stats.isAllCompleted}
          onClick={() => onNavigateTab('collection')}
        />

        {/* 진행률 & 빠른 액션 요약 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '8px' }}>
              <div>
                <span className="badge-pill badge-sage" style={{ marginBottom: '6px' }}>
                  전체 진행 현황
                </span>
                <h3 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                  {stats.completed} / {stats.total}개 챙김
                </h3>
              </div>
              <span style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--sage-600)', fontFamily: 'Outfit, sans-serif' }}>
                {stats.progressPercent}%
              </span>
            </div>

            {/* 메인 진행 바 */}
            <div className="progress-track" style={{ height: '16px' }}>
              <div
                className={`progress-fill ${stats.isAllCompleted ? 'gold' : ''}`}
                style={{ width: `${stats.progressPercent}%` }}
              />
            </div>
          </div>

          {/* 주요 통계 배지 그리드 */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '10px',
              padding: '14px',
              background: 'var(--bg-main)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-light)',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '600' }}>남은 준비물</div>
              <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--peach-500)', marginTop: '2px' }}>
                {stats.remaining}개
              </div>
            </div>
            <div style={{ textAlign: 'center', borderLeft: '1px solid var(--border-light)', borderRight: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '600' }}>미완료 퀘스트</div>
              <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--yellow-600)', marginTop: '2px' }}>
                {activeMissions.length}개
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '600' }}>미개봉 상자</div>
              <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--sage-600)', marginTop: '2px' }}>
                {unopenedBoxes}개
              </div>
            </div>
          </div>

          {/* 퀵 액션 버튼들 */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigateTab('checklist')}
              style={{
                flex: '1',
                padding: '12px 18px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--sage-500)',
                color: '#FFFFFF',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(107, 142, 123, 0.3)',
              }}
            >
              <span>준비물 챙기러 가기</span>
              <ArrowRight size={18} />
            </button>

            {unopenedBoxes > 0 && (
              <button
                onClick={onOpenBoxModal}
                className="reward-open-btn"
                style={{ padding: '12px 20px', borderRadius: 'var(--radius-sm)' }}
              >
                <Gift size={18} />
                <span>보상 상자 열기!</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 오늘의 추천 퀘스트 (보상 수령 대기 또는 최우선 미션) */}
      <div className="quest-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Target size={20} color="var(--sage-600)" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-primary)' }}>
              오늘의 미션 & 보상 상자
            </h3>
          </div>
          <button
            onClick={() => onNavigateTab('missions')}
            style={{
              fontSize: '0.85rem',
              color: 'var(--sage-600)',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span>전체 미션 보기</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {readyMissions.length > 0 && (
          <div
            style={{
              marginBottom: '16px',
              padding: '14px 18px',
              background: 'linear-gradient(135deg, var(--yellow-50), #FFF9DB)',
              borderRadius: 'var(--radius-sm)',
              border: '1.5px solid var(--yellow-200)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.5rem' }}>🎁</span>
              <div>
                <strong style={{ fontSize: '0.95rem', color: 'var(--yellow-600)' }}>
                  완료된 미션이 {readyMissions.length}개 있습니다!
                </strong>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  지금 바로 보상 상자를 열고 새로운 스티커와 배지를 획득하세요.
                </p>
              </div>
            </div>
            <button
              onClick={() => onClaimMission(readyMissions[0].id)}
              className="reward-open-btn"
              style={{ padding: '8px 16px', fontSize: '0.88rem' }}
            >
              <Sparkles size={16} />
              <span>'{readyMissions[0].title}' 보상 받기!</span>
            </button>
          </div>
        )}

        {/* 미션 3개 미리보기 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
          {missions.slice(0, 3).map((mission) => (
            <div
              key={mission.id}
              className={`mission-card ${mission.canClaim ? 'ready' : mission.isClaimed ? 'completed' : ''}`}
              style={{ padding: '14px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontWeight: '700', fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                  {mission.title}
                </span>
                <span className="badge-pill badge-yellow" style={{ fontSize: '0.72rem', padding: '2px 8px' }}>
                  +{mission.rewardXp} XP
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{mission.description}</p>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>진행 상황</span>
                  <span style={{ fontWeight: '700', color: 'var(--sage-700)' }}>
                    {mission.current} / {mission.total}
                  </span>
                </div>
                <div className="progress-track" style={{ height: '6px' }}>
                  <div
                    className="progress-fill"
                    style={{ width: `${mission.percent}%` }}
                  />
                </div>
              </div>

              {mission.canClaim ? (
                <button
                  onClick={() => onClaimMission(mission.id)}
                  className="reward-open-btn"
                  style={{ width: '100%', padding: '8px', fontSize: '0.84rem' }}
                >
                  <Gift size={14} />
                  <span>보상 상자 열기</span>
                </button>
              ) : mission.isClaimed ? (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    color: 'var(--sage-600)',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    padding: '6px',
                  }}
                >
                  <CheckCircle2 size={16} />
                  <span>수령 완료</span>
                </div>
              ) : (
                <div
                  style={{
                    textAlign: 'center',
                    color: 'var(--text-muted)',
                    fontSize: '0.78rem',
                    padding: '6px',
                  }}
                >
                  진행 중 ({mission.percent}%)
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 카테고리별 준비 현황 그리드 */}
      <div className="quest-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-primary)' }}>
            카테고리별 패킹 현황
          </h3>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            카테고리 올클리어 시마다 +20 XP 지급!
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
          {CATEGORIES.map((cat) => {
            const catStat = stats.categoryStats[cat.id] || { total: 0, completed: 0, percent: 0, isCompleted: false };
            return (
              <div
                key={cat.id}
                onClick={() => onNavigateTab('checklist')}
                style={{
                  background: catStat.isCompleted ? 'var(--sage-50)' : 'var(--bg-main)',
                  border: catStat.isCompleted ? '1.5px solid var(--sage-200)' : '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '1.5rem' }}>{cat.emoji}</span>
                  {catStat.isCompleted && (
                    <span className="badge-pill badge-sage" style={{ fontSize: '0.68rem', padding: '1px 6px' }}>
                      완료 ✨
                    </span>
                  )}
                </div>
                <div style={{ fontWeight: '700', fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                  {cat.label}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  {catStat.completed} / {catStat.total} 항목
                </div>

                <div className="progress-track" style={{ height: '6px' }}>
                  <div
                    className="progress-fill"
                    style={{
                      width: `${catStat.percent}%`,
                      backgroundColor: cat.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
