import { useState, useEffect, useMemo, useCallback } from 'react';
import { loadSavedState, saveStateToStorage, clearStateStorage, getDefaultState } from '../utils/storage';
import { CATEGORIES, DEFAULT_TRIP_INFO, INITIAL_ITEMS } from '../constants/defaultData';
import {
  GAME_RULES,
  calculateLevelInfo,
  MISSION_DEFINITIONS,
  REWARD_ITEMS,
  drawRandomReward,
} from '../constants/gameRules';
import confetti from 'canvas-confetti';

export function useTripQuest() {
  const [state, setState] = useState(() => loadSavedState());

  // 토스트 & 모달 상태
  const [toasts, setToasts] = useState([]);
  const [levelUpData, setLevelUpData] = useState(null);
  const [openedReward, setOpenedReward] = useState(null);
  const [isOpeningBox, setIsOpeningBox] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [hasShownCompletionOnce, setHasShownCompletionOnce] = useState(false);

  // 로컬스토리지 자동 저장
  useEffect(() => {
    saveStateToStorage(state);
  }, [state]);

  // 토스트 메시지 추가 헬퍼
  const addToast = useCallback((message, type = 'info', icon = '✨') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type, icon }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  // 여행 정보 수정
  const updateTripInfo = useCallback((updates) => {
    setState((prev) => ({
      ...prev,
      tripInfo: { ...prev.tripInfo, ...updates },
    }));
    addToast('여행 정보가 업데이트되었습니다.', 'success', '✈️');
  }, [addToast]);

  // D-Day 계산
  const dDayInfo = useMemo(() => {
    if (!state.tripInfo.departureDate) {
      return { text: 'D-Day 미정', days: 0, isPast: false };
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(state.tripInfo.departureDate);
    target.setHours(0, 0, 0, 0);

    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return { text: 'D-Day 오늘!', days: 0, isPast: false, isToday: true };
    } else if (diffDays > 0) {
      return { text: `D-${diffDays}`, days: diffDays, isPast: false, isToday: false };
    } else {
      return { text: `D+${Math.abs(diffDays)}`, days: diffDays, isPast: true, isToday: false };
    }
  }, [state.tripInfo.departureDate]);

  // 전체 통계
  const stats = useMemo(() => {
    const total = state.items.length;
    const completed = state.items.filter((i) => i.checked).length;
    const progressPercent = total > 0 ? Math.round((completed / total) * 100) : 0;
    const isAllCompleted = total > 0 && completed === total;

    // 카테고리별 통계
    const categoryStats = {};
    CATEGORIES.forEach((cat) => {
      const catItems = state.items.filter((i) => i.category === cat.id);
      const catTotal = catItems.length;
      const catCompleted = catItems.filter((i) => i.checked).length;
      categoryStats[cat.id] = {
        total: catTotal,
        completed: catCompleted,
        isCompleted: catTotal > 0 && catCompleted === catTotal,
        percent: catTotal > 0 ? Math.round((catCompleted / catTotal) * 100) : 0,
      };
    });

    return {
      total,
      completed,
      remaining: total - completed,
      progressPercent,
      isAllCompleted,
      categoryStats,
    };
  }, [state.items]);

  // 레벨 정보
  const levelInfo = useMemo(() => {
    return calculateLevelInfo(state.xp);
  }, [state.xp]);

  // 레벨업 체크 헬퍼
  const checkLevelUp = (oldXp, newXp) => {
    const oldLevel = calculateLevelInfo(oldXp).level;
    const newLevelInfo = calculateLevelInfo(newXp);
    if (newLevelInfo.level > oldLevel) {
      setLevelUpData({
        oldLevel,
        newLevel: newLevelInfo.level,
        title: newLevelInfo.title,
        badge: newLevelInfo.badge,
        desc: newLevelInfo.desc,
      });
      // 축하 콘페티
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F8D349', '#6E8B79', '#F08A5D', '#A29BFE'],
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  // 준비물 체크 토글
  const toggleItemCheck = useCallback((itemId) => {
    setState((prev) => {
      const targetItem = prev.items.find((i) => i.id === itemId);
      if (!targetItem) return prev;

      const nextChecked = !targetItem.checked;
      const nextItems = prev.items.map((i) => (i.id === itemId ? { ...i, checked: nextChecked } : i));

      let addedXp = 0;
      let nextRewardedItemIds = [...prev.rewardedItemIds];
      let nextRewardedCategoryIds = [...prev.rewardedCategoryIds];

      // 체크 활성화된 경우 경험치 계산
      if (nextChecked) {
        // 1. 처음 체크하는 아이템인지 확인 (중복 지급 방지)
        if (!nextRewardedItemIds.includes(itemId)) {
          nextRewardedItemIds.push(itemId);
          addedXp += GAME_RULES.ITEM_CHECK_XP;
          addToast(`'${targetItem.name}' 챙기기 완료! +${GAME_RULES.ITEM_CHECK_XP} XP`, 'xp', '🎒');
        }

        // 2. 카테고리 올클리어 확인
        const targetCategory = targetItem.category;
        const categoryItems = nextItems.filter((i) => i.category === targetCategory);
        const isCatAllChecked = categoryItems.length > 0 && categoryItems.every((i) => i.checked);

        if (isCatAllChecked && !nextRewardedCategoryIds.includes(targetCategory)) {
          nextRewardedCategoryIds.push(targetCategory);
          addedXp += GAME_RULES.CATEGORY_COMPLETE_XP;
          const catObj = CATEGORIES.find((c) => c.id === targetCategory);
          addToast(`[${catObj?.label || '카테고리'}] 올클리어 보너스! +${GAME_RULES.CATEGORY_COMPLETE_XP} XP`, 'bonus', '🎉');
        }
      }

      const nextXp = prev.xp + addedXp;
      if (addedXp > 0) {
        checkLevelUp(prev.xp, nextXp);
      }

      return {
        ...prev,
        items: nextItems,
        xp: nextXp,
        rewardedItemIds: nextRewardedItemIds,
        rewardedCategoryIds: nextRewardedCategoryIds,
      };
    });
  }, [addToast]);

  // 준비물 추가
  const addItem = useCallback(({ name, category, isEssential = false }) => {
    if (!name.trim()) return;
    const newItem = {
      id: `item_custom_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: name.trim(),
      category: category || 'others',
      checked: false,
      isEssential: !!isEssential,
      isCustom: true,
    };

    setState((prev) => ({
      ...prev,
      items: [newItem, ...prev.items],
    }));

    addToast(`'${name}' 준비물이 추가되었습니다.`, 'success', '➕');
  }, [addToast]);

  // 준비물 삭제
  const deleteItem = useCallback((itemId) => {
    setState((prev) => {
      const itemToDelete = prev.items.find((i) => i.id === itemId);
      return {
        ...prev,
        items: prev.items.filter((i) => i.id !== itemId),
      };
    });
    addToast('준비물이 목록에서 삭제되었습니다.', 'info', '🗑️');
  }, [addToast]);

  // 미션 목록 및 진행 상태 (체크리스트와 실시간 동기화)
  const missions = useMemo(() => {
    return MISSION_DEFINITIONS.map((def) => {
      const progress = def.checkProgress(state.items);
      const isClaimed = state.claimedMissionIds.includes(def.id);
      return {
        ...def,
        current: progress.current,
        total: progress.total,
        isCompleted: progress.isCompleted,
        percent: progress.total > 0 ? Math.min(100, Math.round((progress.current / progress.total) * 100)) : 0,
        isClaimed,
        canClaim: progress.isCompleted && !isClaimed,
      };
    });
  }, [state.items, state.claimedMissionIds]);

  // 미완료 / 보상 수령 대기 카운트
  const unclaimedMissionsCount = useMemo(() => {
    return missions.filter((m) => m.canClaim).length;
  }, [missions]);

  // 미션 보상 수령
  const claimMissionReward = useCallback((missionId) => {
    const mission = missions.find((m) => m.id === missionId);
    if (!mission || !mission.canClaim) return;

    setState((prev) => {
      if (prev.claimedMissionIds.includes(missionId)) return prev;

      const nextXp = prev.xp + mission.rewardXp;
      checkLevelUp(prev.xp, nextXp);

      return {
        ...prev,
        xp: nextXp,
        claimedMissionIds: [...prev.claimedMissionIds, missionId],
        unopenedBoxes: prev.unopenedBoxes + 1,
      };
    });

    addToast(`미션 완료! +${mission.rewardXp} XP & 보상 상자 1개 획득! 🎁`, 'bonus', '🏆');
  }, [missions, addToast]);

  // 보상 상자 열기 애니메이션 & 추첨
  const openRewardBox = useCallback(() => {
    if (state.unopenedBoxes <= 0 || isOpeningBox) return;

    setIsOpeningBox(true);

    // 상자 흔들림 & 오픈 연출 딜레이
    setTimeout(() => {
      const { item, isDuplicate } = drawRandomReward(state.collection);
      let refundXp = 0;

      setState((prev) => {
        const nextBoxes = Math.max(0, prev.unopenedBoxes - 1);
        let nextCollection = [...prev.collection];
        let nextXp = prev.xp;

        if (isDuplicate) {
          refundXp = GAME_RULES.DUPLICATE_ITEM_REFUND_XP;
          nextXp += refundXp;
          checkLevelUp(prev.xp, nextXp);
        } else {
          nextCollection.unshift({
            id: item.id,
            acquiredAt: new Date().toISOString(),
            isNew: true,
          });
        }

        return {
          ...prev,
          unopenedBoxes: nextBoxes,
          collection: nextCollection,
          xp: nextXp,
        };
      });

      // 축하 폭죽 연출
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
        });
      } catch (e) {
        console.error(e);
      }

      setOpenedReward({
        item,
        isDuplicate,
        refundXp,
      });
      setIsOpeningBox(false);
    }, 1200);
  }, [state.unopenedBoxes, state.collection, isOpeningBox]);

  // 도감 확인 (NEW 배지 해제)
  const markCollectionItemSeen = useCallback((itemId) => {
    setState((prev) => ({
      ...prev,
      collection: prev.collection.map((c) => (c.id === itemId ? { ...c, isNew: false } : c)),
    }));
  }, []);

  // 모든 NEW 확인
  const markAllCollectionSeen = useCallback(() => {
    setState((prev) => ({
      ...prev,
      collection: prev.collection.map((c) => ({ ...c, isNew: false })),
    }));
  }, []);

  // 신규 미확인 아이템 개수
  const newItemsCount = useMemo(() => {
    return state.collection.filter((c) => c.isNew).length;
  }, [state.collection]);

  // 캐릭터 장식 착용/해제 토글
  const toggleEquipWearable = useCallback((item) => {
    if (!item.wearSlot) return;

    setState((prev) => {
      const currentEquipped = prev.equippedWearables?.[item.wearSlot];
      const isEquipping = currentEquipped !== item.id;

      return {
        ...prev,
        equippedWearables: {
          ...prev.equippedWearables,
          [item.wearSlot]: isEquipping ? item.id : null,
        },
      };
    });

    addToast(`캐릭터 스타일이 변경되었습니다!`, 'success', '👒');
  }, [addToast]);

  // 전체 준비 완료 축하 모달 트리거
  useEffect(() => {
    if (stats.isAllCompleted && !hasShownCompletionOnce) {
      setShowCompletionModal(true);
      setHasShownCompletionOnce(true);
      try {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.4 },
        });
      } catch (e) {
        console.error(e);
      }
    } else if (!stats.isAllCompleted) {
      setHasShownCompletionOnce(false);
    }
  }, [stats.isAllCompleted, hasShownCompletionOnce]);

  // 데이터 초기화
  const resetAllData = useCallback(() => {
    clearStateStorage();
    setState(getDefaultState());
    addToast('모든 여행 퀘스트 데이터가 초기화되었습니다.', 'info', '🔄');
  }, [addToast]);

  // 샘플 데이터 복원
  const restoreSampleData = useCallback(() => {
    const defaultState = getDefaultState();
    setState(defaultState);
    saveStateToStorage(defaultState);
    addToast('기본 여행 준비물 및 설정이 복원되었습니다.', 'success', '🎒');
  }, [addToast]);

  return {
    state,
    tripInfo: state.tripInfo,
    items: state.items,
    xp: state.xp,
    unopenedBoxes: state.unopenedBoxes,
    collection: state.collection,
    equippedWearables: state.equippedWearables,
    stats,
    levelInfo,
    missions,
    unclaimedMissionsCount,
    newItemsCount,
    dDayInfo,
    toasts,
    levelUpData,
    openedReward,
    isOpeningBox,
    showCompletionModal,
    setLevelUpData,
    setOpenedReward,
    setShowCompletionModal,
    updateTripInfo,
    toggleItemCheck,
    addItem,
    deleteItem,
    claimMissionReward,
    openRewardBox,
    markCollectionItemSeen,
    markAllCollectionSeen,
    toggleEquipWearable,
    resetAllData,
    restoreSampleData,
  };
}
