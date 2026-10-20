import React, { useState, useMemo } from 'react';
import { Award, Lock, Sparkles, Check, X, Shield, Eye } from 'lucide-react';
import { REWARD_ITEMS, TIER_META } from '../constants/gameRules';

export default function CollectionView({
  collection = [],
  equippedWearables = {},
  onMarkSeen,
  onMarkAllSeen,
  onToggleEquip,
}) {
  const [filterType, setFilterType] = useState('all'); // 'all' | 'sticker' | 'badge' | 'wearable'
  const [selectedItem, setSelectedItem] = useState(null);

  // 획득한 아이템 매핑
  const collectedMap = useMemo(() => {
    const map = new Map();
    collection.forEach((c) => {
      map.set(c.id, c);
    });
    return map;
  }, [collection]);

  // 필터링된 아이템 풀
  const displayedItems = useMemo(() => {
    return REWARD_ITEMS.filter((item) => {
      if (filterType === 'all') return true;
      return item.type === filterType;
    });
  }, [filterType]);

  // 통계
  const stats = useMemo(() => {
    const totalCount = REWARD_ITEMS.length;
    const collectedCount = collection.length;
    const progressPercent = Math.round((collectedCount / totalCount) * 100);

    const tierCounts = { common: 0, rare: 0, special: 0 };
    collection.forEach((c) => {
      const def = REWARD_ITEMS.find((item) => item.id === c.id);
      if (def && tierCounts[def.tier] !== undefined) {
        tierCounts[def.tier]++;
      }
    });

    return { totalCount, collectedCount, progressPercent, tierCounts };
  }, [collection]);

  const handleCardClick = (itemDef) => {
    const collectedData = collectedMap.get(itemDef.id);
    if (collectedData?.isNew) {
      onMarkSeen(itemDef.id);
    }
    setSelectedItem(itemDef);
  };

  const isEquipped = (item) => {
    if (!item?.wearSlot) return false;
    return equippedWearables[item.wearSlot] === item.id;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* 상단 통계 카드 */}
      <div
        className="quest-card"
        style={{
          background: 'linear-gradient(135deg, #FFFFFF 0%, #FAF6EE 100%)',
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
              <span style={{ fontSize: '1.6rem' }}>🏆</span>
              <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                나의 여행 컬렉션 도감
              </h2>
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
              미션을 클리어하고 획득한 스티커와 배지를 모아보세요. 캐릭터에게 착용할 수도 있어요!
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {collection.some((c) => c.isNew) && (
              <button
                onClick={onMarkAllSeen}
                style={{
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-main)',
                  border: '1px solid var(--border-light)',
                  fontSize: '0.8rem',
                  fontWeight: '700',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Eye size={14} />
                <span>NEW 전체 확인</span>
              </button>
            )}

            <div
              style={{
                padding: '8px 16px',
                background: 'var(--sage-100)',
                color: 'var(--sage-700)',
                borderRadius: 'var(--radius-full)',
                fontWeight: '800',
                fontSize: '0.95rem',
              }}
            >
              수집률 {stats.progressPercent}% ({stats.collectedCount} / {stats.totalCount})
            </div>
          </div>
        </div>

        {/* 진행 바 & 등급별 수집 수치 */}
        <div>
          <div className="progress-track" style={{ height: '10px' }}>
            <div
              className="progress-fill gold"
              style={{ width: `${stats.progressPercent}%` }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              gap: '16px',
              marginTop: '10px',
              fontSize: '0.82rem',
              fontWeight: '700',
              flexWrap: 'wrap',
            }}
          >
            <span style={{ color: TIER_META.common.color }}>
              • 일반: {stats.tierCounts.common}개
            </span>
            <span style={{ color: TIER_META.rare.color }}>
              • 희귀: {stats.tierCounts.rare}개
            </span>
            <span style={{ color: TIER_META.special.color }}>
              • 특별: {stats.tierCounts.special}개
            </span>
          </div>
        </div>
      </div>

      {/* 필터 탭 바 */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '2px' }}>
        {[
          { id: 'all', label: '전체 아이템', icon: '🌟' },
          { id: 'sticker', label: '스티커', icon: '🏷️' },
          { id: 'badge', label: '배지', icon: '🏅' },
          { id: 'wearable', label: '착용 아이템', icon: '👒' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilterType(f.id)}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.88rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: filterType === f.id ? 'var(--sage-500)' : 'var(--bg-card)',
              color: filterType === f.id ? '#FFFFFF' : 'var(--text-secondary)',
              border: '1.5px solid',
              borderColor: filterType === f.id ? 'var(--sage-500)' : 'var(--border-light)',
              boxShadow: 'var(--shadow-subtle)',
            }}
          >
            <span>{f.icon}</span>
            <span>{f.label}</span>
          </button>
        ))}
      </div>

      {/* 도감 그리드 */}
      <div className="collection-grid">
        {displayedItems.map((item) => {
          const collectedData = collectedMap.get(item.id);
          const isCollected = !!collectedData;
          const tierMeta = TIER_META[item.tier];
          const equipped = isEquipped(item);

          return (
            <div
              key={item.id}
              onClick={() => handleCardClick(item)}
              className={`item-collect-card ${!isCollected ? 'locked' : `tier-${item.tier}`}`}
            >
              {/* 신규 획득 NEW 표시 */}
              {collectedData?.isNew && <span className="new-badge">NEW</span>}

              {/* 착용 중 뱃지 */}
              {equipped && (
                <span
                  style={{
                    position: 'absolute',
                    top: '6px',
                    left: '6px',
                    background: 'var(--sage-600)',
                    color: '#FFFFFF',
                    fontSize: '0.65rem',
                    fontWeight: '800',
                    padding: '2px 6px',
                    borderRadius: 'var(--radius-xs)',
                  }}
                >
                  착용 중
                </span>
              )}

              {/* 아이템 아이콘 / 잠금 아이콘 */}
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: isCollected ? tierMeta.bgColor : '#E5E7EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  border: isCollected ? `1.5px solid ${tierMeta.borderColor}` : '1.5px solid #D1D5DB',
                  boxShadow: isCollected ? `0 4px 10px ${tierMeta.glowColor}` : 'none',
                  marginTop: '4px',
                }}
              >
                {isCollected ? item.emoji : <Lock size={22} color="#9CA3AF" />}
              </div>

              {/* 아이템 이름 */}
              <div
                style={{
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  color: isCollected ? 'var(--text-primary)' : 'var(--text-muted)',
                  marginTop: '4px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '100%',
                }}
              >
                {isCollected ? item.name : '???'}
              </div>

              {/* 등급 배지 */}
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: '700',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: isCollected ? tierMeta.bgColor : '#E5E7EB',
                  color: isCollected ? tierMeta.color : '#9CA3AF',
                }}
              >
                {tierMeta.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* 아이템 상세 정보 모달 */}
      {selectedItem && (
        <div className="modal-backdrop" onClick={() => setSelectedItem(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* 닫기 버튼 */}
            <button
              onClick={() => setSelectedItem(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                color: 'var(--text-muted)',
                padding: '4px',
                borderRadius: '6px',
              }}
            >
              <X size={20} />
            </button>

            {(() => {
              const collectedData = collectedMap.get(selectedItem.id);
              const isCollected = !!collectedData;
              const tierMeta = TIER_META[selectedItem.tier];
              const equipped = isEquipped(selectedItem);

              return (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '14px' }}>
                  {/* 큰 아이콘 */}
                  <div
                    style={{
                      width: '84px',
                      height: '84px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: isCollected ? tierMeta.bgColor : '#E5E7EB',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '3.2rem',
                      border: isCollected ? `2px solid ${tierMeta.borderColor}` : '2px solid #D1D5DB',
                      boxShadow: isCollected ? `0 8px 24px ${tierMeta.glowColor}` : 'none',
                    }}
                  >
                    {isCollected ? selectedItem.emoji : <Lock size={36} color="#9CA3AF" />}
                  </div>

                  <div>
                    <span
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: '800',
                        padding: '3px 10px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: isCollected ? tierMeta.bgColor : '#E5E7EB',
                        color: isCollected ? tierMeta.color : '#9CA3AF',
                      }}
                    >
                      {tierMeta.label} 등급
                    </span>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '6px' }}>
                      {isCollected ? selectedItem.name : '미지의 보물'}
                    </h3>
                  </div>

                  {/* 설명 및 감성 스토리 */}
                  <div
                    style={{
                      padding: '14px',
                      backgroundColor: 'var(--bg-main)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-light)',
                      width: '100%',
                    }}
                  >
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '8px' }}>
                      {isCollected ? selectedItem.description : '아직 획득하지 못한 보물입니다. 미션을 클리어하고 보상 상자를 열어보세요!'}
                    </p>
                    {isCollected && (
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                        "{selectedItem.story}"
                      </p>
                    )}
                  </div>

                  {/* 획득 일시 */}
                  {isCollected && (
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      획득일: {new Date(collectedData.acquiredAt).toLocaleDateString('ko-KR')}
                    </div>
                  )}

                  {/* 착용 가능한 아이템인 경우 토글 버튼 */}
                  {isCollected && selectedItem.wearSlot && (
                    <button
                      onClick={() => {
                        onToggleEquip(selectedItem);
                      }}
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: equipped ? 'var(--peach-500)' : 'var(--sage-500)',
                        color: '#FFFFFF',
                        fontWeight: '700',
                        fontSize: '0.95rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        boxShadow: 'var(--shadow-subtle)',
                        marginTop: '6px',
                      }}
                    >
                      <span>{equipped ? '캐릭터 착용 해제' : '가방 캐릭터에게 착용하기 👒'}</span>
                    </button>
                  )}
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
