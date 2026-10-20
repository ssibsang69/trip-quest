import { DEFAULT_TRIP_INFO, INITIAL_ITEMS } from '../constants/defaultData';

const STORAGE_KEY = 'trip_quest_state_v1';

export function loadSavedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultState();
    const parsed = JSON.parse(raw);

    // 유효성 검사 및 기본값 병합
    return {
      tripInfo: {
        title: parsed.tripInfo?.title || DEFAULT_TRIP_INFO.title,
        departureDate: parsed.tripInfo?.departureDate || DEFAULT_TRIP_INFO.departureDate,
        destination: parsed.tripInfo?.destination || DEFAULT_TRIP_INFO.destination,
      },
      items: Array.isArray(parsed.items) && parsed.items.length > 0 ? parsed.items : INITIAL_ITEMS,
      xp: typeof parsed.xp === 'number' ? parsed.xp : 0,
      rewardedItemIds: Array.isArray(parsed.rewardedItemIds) ? parsed.rewardedItemIds : [],
      rewardedCategoryIds: Array.isArray(parsed.rewardedCategoryIds) ? parsed.rewardedCategoryIds : [],
      claimedMissionIds: Array.isArray(parsed.claimedMissionIds) ? parsed.claimedMissionIds : [],
      unopenedBoxes: typeof parsed.unopenedBoxes === 'number' ? parsed.unopenedBoxes : 0,
      collection: Array.isArray(parsed.collection) ? parsed.collection : [],
      equippedWearables: parsed.equippedWearables || { head: null, face: null },
    };
  } catch (err) {
    console.error('Failed to load Trip Quest state from localStorage:', err);
    return getDefaultState();
  }
}

export function saveStateToStorage(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to save Trip Quest state to localStorage:', err);
  }
}

export function clearStateStorage() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear Trip Quest state:', err);
  }
}

export function getDefaultState() {
  return {
    tripInfo: { ...DEFAULT_TRIP_INFO },
    items: [...INITIAL_ITEMS],
    xp: 0,
    rewardedItemIds: [],
    rewardedCategoryIds: [],
    claimedMissionIds: [],
    unopenedBoxes: 0,
    collection: [],
    equippedWearables: { head: null, face: null },
  };
}
