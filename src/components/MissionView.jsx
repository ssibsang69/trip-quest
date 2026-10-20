import React from 'react';
import { Target, Gift, CheckCircle2, Sparkles, Clock, AlertCircle } from 'lucide-react';

export default function MissionView({
  missions,
  unopenedBoxes,
  onClaimMission,
  onOpenBoxModal,
}) {
  const completedCount = missions.filter((m) => m.isCompleted).length;
  const claimedCount = missions.filter((m) => m.isClaimed).length;
  const readyCount = missions.filter((m) => m.canClaim).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* 퀘스트 헤더 & 보상 상자 인벤토리 */}
      <div
        className="quest-card"
        style={{
          background: 'linear-gradient(135deg, #FFFFFF 0%, var(--yellow-50) 100%)',
          border: '1.5px solid var(--yellow-200)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '1.5rem' }}>🎯</span>
              <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                오늘의 여행 미션 (Quest)
              </h2>
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
              실제 체크리스트를 달성하면 보상 상자가 활성화됩니다. 스티커와 배지를 모아보세요!
            </p>
          </div>

          {/* 보유 상자 오픈 위젯 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: '#FFFFFF',
              padding: '10px 16px',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid var(--border-light)',
              boxShadow: 'var(--shadow-subtle)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.6rem' }}>🎁</span>
              <div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                  보관 중인 보상 상자
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--yellow-600)' }}>
                  {unopenedBoxes}개
                </div>
              </div>
            </div>

            {unopenedBoxes > 0 && (
              <button
                onClick={onOpenBoxModal}
                className="reward-open-btn"
                style={{ padding: '8px 16px', fontSize: '0.86rem' }}
              >
                <span>상자 열기!</span>
              </button>
            )}
          </div>
        </div>

        {/* 퀘스트 달성 통계 바 */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: '700', marginBottom: '6px' }}>
            <span style={{ color: 'var(--text-secondary)' }}>
              미션 달성 현황 ({completedCount} / {missions.length}개 완료)
            </span>
            <span style={{ color: 'var(--sage-700)' }}>
              {Math.round((completedCount / missions.length) * 100)}%
            </span>
          </div>
          <div className="progress-track" style={{ height: '8px' }}>
            <div
              className="progress-fill"
              style={{ width: `${(completedCount / missions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* 미션 목록 그리드 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
        {missions.map((mission) => {
          return (
            <div
              key={mission.id}
              className={`mission-card ${mission.canClaim ? 'ready' : mission.isClaimed ? 'completed' : ''}`}
            >
              {/* 상단 제목 & 보상 배지 */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                    {mission.title}
                  </h3>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    {mission.description}
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                  <span className="badge-pill badge-yellow" style={{ fontSize: '0.78rem', padding: '3px 9px' }}>
                    +{mission.rewardXp} XP
                  </span>
                  <span className="badge-pill badge-peach" style={{ fontSize: '0.72rem', padding: '2px 8px' }}>
                    🎁 상자 1개
                  </span>
                </div>
              </div>

              {/* 진행률 바 및 수치 (실제 연동) */}
              <div style={{ marginTop: '8px' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    marginBottom: '6px',
                  }}
                >
                  <span style={{ color: 'var(--text-muted)' }}>진행 상황</span>
                  <span style={{ color: mission.isCompleted ? 'var(--sage-600)' : 'var(--text-primary)' }}>
                    {mission.current} / {mission.total} ({mission.percent}%)
                  </span>
                </div>

                <div className="progress-track" style={{ height: '8px' }}>
                  <div
                    className={`progress-fill ${mission.isCompleted ? 'gold' : ''}`}
                    style={{ width: `${mission.percent}%` }}
                  />
                </div>
              </div>

              {/* 액션 버튼 */}
              <div style={{ marginTop: '6px' }}>
                {mission.canClaim ? (
                  <button
                    onClick={() => onClaimMission(mission.id)}
                    className="reward-open-btn"
                    style={{ width: '100%', padding: '10px', fontSize: '0.92rem' }}
                  >
                    <Gift size={16} />
                    <span>보상 상자 열기 (완료!)</span>
                  </button>
                ) : mission.isClaimed ? (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      background: 'var(--sage-100)',
                      color: 'var(--sage-700)',
                      padding: '8px',
                      borderRadius: 'var(--radius-sm)',
                      fontWeight: '700',
                      fontSize: '0.86rem',
                    }}
                  >
                    <CheckCircle2 size={18} color="var(--sage-600)" />
                    <span>보상 수령 완료</span>
                  </div>
                ) : (
                  <div
                    style={{
                      textAlign: 'center',
                      background: 'var(--bg-main)',
                      color: 'var(--text-muted)',
                      padding: '8px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.84rem',
                      fontWeight: '600',
                      border: '1px solid var(--border-light)',
                    }}
                  >
                    체크리스트에서 짐을 챙기면 완료됩니다!
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
