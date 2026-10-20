// 경험치 및 레벨 보상 규칙
export const GAME_RULES = {
  ITEM_CHECK_XP: 5,            // 준비물 최초 체크 시 획득 XP
  CATEGORY_COMPLETE_XP: 20,    // 카테고리 올클리어 보너스 XP
  DUPLICATE_ITEM_REFUND_XP: 15,// 중복 획득 시 환전되는 행운 XP
};

// 레벨 정의: 필요 누적 경험치, 칭호, 설명
export const LEVEL_TIERS = [
  { level: 1, reqXp: 0, title: '설레는 여행 꿈나무 🌱', badge: '🌱', desc: '여행 준비의 첫 발을 내딛었어요!' },
  { level: 2, reqXp: 35, title: '호기심 가득 배낭족 🎒', badge: '🎒', desc: '하나둘씩 짐을 챙기며 두근거리는 중!' },
  { level: 3, reqXp: 80, title: '길 위의 모험가 🧭', badge: '🧭', desc: '중요한 물건들을 꼼꼼하게 챙기는 여행자!' },
  { level: 4, reqXp: 140, title: '노련한 자유여행가 🗺️', badge: '🗺️', desc: '어디로 떠나든 든든한 짐 싸기 고수!' },
  { level: 5, reqXp: 210, title: '글로벌 트래블러 ✈️', badge: '✈️', desc: '완벽한 준비로 세상을 누비는 여행 마스터!' },
  { level: 6, reqXp: 300, title: '전설의 여행 챔피언 👑', badge: '👑', desc: '더 이상 챙길 짐이 없는 완벽한 여권의 지배자!' },
];

// 레벨 계산 헬퍼 함수
export function calculateLevelInfo(xp = 0) {
  let currentTier = LEVEL_TIERS[0];
  let nextTier = LEVEL_TIERS[1] || null;

  for (let i = LEVEL_TIERS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_TIERS[i].reqXp) {
      currentTier = LEVEL_TIERS[i];
      nextTier = LEVEL_TIERS[i + 1] || null;
      break;
    }
  }

  const currentLevel = currentTier.level;
  const currentReqXp = currentTier.reqXp;
  const nextReqXp = nextTier ? nextTier.reqXp : currentReqXp + 100;
  
  const xpInCurrentLevel = xp - currentReqXp;
  const xpNeededForNext = nextReqXp - currentReqXp;
  const progressPercent = nextTier 
    ? Math.min(100, Math.round((xpInCurrentLevel / xpNeededForNext) * 100))
    : 100;

  return {
    level: currentLevel,
    title: currentTier.title,
    badge: currentTier.badge,
    desc: currentTier.desc,
    currentXp: xp,
    xpInCurrentLevel,
    xpNeededForNext,
    nextTier,
    progressPercent,
    isMaxLevel: !nextTier,
  };
}

// 오늘의 미션 정의
// id, title, desc, rewardXp, targetType, targetValue, targetCategory
export const MISSION_DEFINITIONS = [
  {
    id: 'mission_check_5',
    title: '워밍업! 준비물 5개 챙기기',
    description: '체크리스트에서 아무 준비물이나 5개 체크해보세요.',
    rewardXp: 20,
    checkProgress: (items) => {
      const checkedCount = items.filter((i) => i.checked).length;
      return {
        current: Math.min(checkedCount, 5),
        total: 5,
        isCompleted: checkedCount >= 5,
      };
    },
  },
  {
    id: 'mission_electronics',
    title: '스마트 여행! 전자기기 준비 완료',
    description: '충전기, 배터리 등 전자기기 카테고리를 모두 챙겨보세요.',
    rewardXp: 25,
    checkProgress: (items) => {
      const elecItems = items.filter((i) => i.category === 'electronics');
      if (elecItems.length === 0) return { current: 1, total: 1, isCompleted: true };
      const checked = elecItems.filter((i) => i.checked).length;
      return {
        current: checked,
        total: elecItems.length,
        isCompleted: checked === elecItems.length,
      };
    },
  },
  {
    id: 'mission_documents',
    title: '안전제일! 여행 서류 완벽 확인',
    description: '신분증, 여권, 항공권 등 여행 서류를 빠짐없이 확인하세요.',
    rewardXp: 30,
    checkProgress: (items) => {
      const docItems = items.filter((i) => i.category === 'documents');
      if (docItems.length === 0) return { current: 1, total: 1, isCompleted: true };
      const checked = docItems.filter((i) => i.checked).length;
      return {
        current: checked,
        total: docItems.length,
        isCompleted: checked === docItems.length,
      };
    },
  },
  {
    id: 'mission_essential',
    title: '필수 준비물 마스터하기',
    description: '꼭 필요한 중요 필수 준비물들을 모두 챙겨주세요.',
    rewardXp: 30,
    checkProgress: (items) => {
      const essentialItems = items.filter((i) => i.isEssential);
      if (essentialItems.length === 0) return { current: 1, total: 1, isCompleted: true };
      const checked = essentialItems.filter((i) => i.checked).length;
      return {
        current: checked,
        total: essentialItems.length,
        isCompleted: checked === essentialItems.length,
      };
    },
  },
  {
    id: 'mission_check_10',
    title: '짐 싸기 열풍! 준비물 10개 체크',
    description: '벌써 짐이 가득 채워지고 있어요! 10개 이상 완료하세요.',
    rewardXp: 35,
    checkProgress: (items) => {
      const checkedCount = items.filter((i) => i.checked).length;
      return {
        current: Math.min(checkedCount, 10),
        total: 10,
        isCompleted: checkedCount >= 10,
      };
    },
  },
  {
    id: 'mission_all_clear',
    title: '퍼펙트 패커! 전체 준비물 100% 달성',
    description: '모든 카테고리의 짐 싸기를 끝마치고 떠날 준비를 마쳐보세요.',
    rewardXp: 50,
    checkProgress: (items) => {
      if (items.length === 0) return { current: 0, total: 0, isCompleted: false };
      const checked = items.filter((i) => i.checked).length;
      return {
        current: checked,
        total: items.length,
        isCompleted: checked === items.length,
      };
    },
  },
];

// 보상 아이템 풀 (스티커 & 배지 & 악세서리)
// type: 'sticker' | 'badge' | 'wearable'
// tier: 'common' | 'rare' | 'special'
export const REWARD_ITEMS = [
  // 1. 일반 등급 (Common)
  {
    id: 'item_star_sticker',
    name: '여행 별 스티커',
    type: 'sticker',
    tier: 'common',
    emoji: '⭐',
    description: '밤하늘 여행길을 밝혀주는 따스하고 앙증맞은 노란 별 스티커입니다.',
    story: '모든 멋진 여정은 작은 반짝임에서 시작됩니다.',
  },
  {
    id: 'item_cloud_sticker',
    name: '작은 구름 스티커',
    type: 'sticker',
    tier: 'common',
    emoji: '☁️',
    description: '몽실몽실 기분 좋은 맑은 하늘의 솜사탕 구름 스티커입니다.',
    story: '비행기 창문 너머로 보이던 포근한 뭉게구름이에요.',
  },
  {
    id: 'item_suitcase_sticker',
    name: '여행 가방 스티커',
    type: 'sticker',
    tier: 'common',
    emoji: '🧳',
    description: '설레는 마음을 차곡차곡 담은 클래식 캐리어 스티커입니다.',
    story: '어디든 함께 굴러갈 준비가 되어있는 든든한 동반자!',
  },
  {
    id: 'item_leaf_sticker',
    name: '네잎클로버 행운 스티커',
    type: 'sticker',
    tier: 'common',
    emoji: '🍀',
    description: '여행길마다 뜻밖의 기분 좋은 행운을 선물해 주는 초록 클로버입니다.',
    story: '여행지에서 만날 아름다운 날씨를 기원해요.',
  },
  {
    id: 'item_paperplane_sticker',
    name: '종이비행기 스티커',
    type: 'sticker',
    tier: 'common',
    emoji: '🛫',
    description: '바람을 타고 가볍게 날아오르는 소박한 종이비행기 스티커입니다.',
    story: '어릴 적 꿈꾸던 먼 나라로의 비행.',
  },

  // 2. 희귀 등급 (Rare)
  {
    id: 'item_gold_plane_badge',
    name: '황금 비행기 배지',
    type: 'badge',
    tier: 'rare',
    emoji: '✈️',
    description: '눈부신 황금빛으로 주조된 고급스러운 항공 여행 배지입니다.',
    story: '하늘 높이 날아올라 구름 위를 순항하는 기분을 만끽하세요.',
  },
  {
    id: 'item_shiny_passport_sticker',
    name: '반짝이는 여권 스티커',
    type: 'sticker',
    tier: 'rare',
    emoji: '📘',
    description: '새로운 입국 도장이 가득 찍힐 준비가 된 영롱한 여권 스티커입니다.',
    story: '출국 게이트를 통과할 때의 두근거림이 그대로 담겨있어요.',
  },
  {
    id: 'item_compass_badge',
    name: '모험가의 나침반 배지',
    type: 'badge',
    tier: 'rare',
    emoji: '🧭',
    description: '낯선 골목길에서도 항상 낭만을 가리키는 황동 나침반 배지입니다.',
    story: '길을 잃는 것조차 여행의 멋진 추억이 됩니다.',
  },
  {
    id: 'item_retro_camera_badge',
    name: '레트로 즉석카메라 배지',
    type: 'badge',
    tier: 'rare',
    emoji: '📷',
    description: '소중한 여행의 찰나를 아날로그 감성으로 기록하는 카메라 배지입니다.',
    story: '사진 한 장에 담긴 따스한 햇살과 바람의 냄새.',
  },
  {
    id: 'item_sunglasses_wearable',
    name: '여행자의 선글라스',
    type: 'wearable',
    wearSlot: 'face',
    tier: 'rare',
    emoji: '🕶️',
    description: '자외선은 막고 힙함은 살리는 가방 캐릭터 착용용 선글라스입니다!',
    story: '가방 캐릭터가 착용하면 세상에서 제일 쿨한 여행자가 됩니다.',
  },

  // 3. 특별 등급 (Special)
  {
    id: 'item_world_traveler_badge',
    name: '세계 여행자 배지',
    type: 'badge',
    tier: 'special',
    emoji: '🌍',
    description: '오대양 육대주를 가슴에 품은 위대한 탐험가에게만 주어지는 최고 훈장!',
    story: '세상은 넓고, 당신이 걸어갈 길은 눈부시게 빛납니다.',
  },
  {
    id: 'item_golden_crown_wearable',
    name: '마스터 골든 크라운',
    type: 'wearable',
    wearSlot: 'head',
    tier: 'special',
    emoji: '👑',
    description: '짐 싸기의 제왕만이 머리에 얹을 수 있는 영롱한 보석 왕관입니다.',
    story: '가방 캐릭터가 착용하면 머리 위에 반짝이는 빛이 감돕니다.',
  },
  {
    id: 'item_rainbow_balloon_sticker',
    name: '무지개 열기구 스티커',
    type: 'sticker',
    tier: 'special',
    emoji: '🎈',
    description: '카파도키아의 일출처럼 장엄한 풍경을 수놓는 특별한 열기구 스티커입니다.',
    story: '바람의 흐름을 타고 끝없이 자유롭게 유영합니다.',
  },
  {
    id: 'item_explorer_hat_wearable',
    name: '탐험가의 사파리 모자',
    type: 'wearable',
    wearSlot: 'head',
    tier: 'special',
    emoji: '🤠',
    description: '어떤 정글과 사막도 거뜬한 베테랑 탐험가 전용 깃털 모자입니다.',
    story: '가방 캐릭터에게 멋진 모험가 포스를 더해줍니다.',
  },
];

// 등급 설정 메타데이터
export const TIER_META = {
  common: {
    label: '일반',
    color: '#6E8B79',
    bgColor: '#E9F1EC',
    borderColor: '#BDD2C5',
    glowColor: 'rgba(110, 139, 121, 0.3)',
    dropRate: 0.60,
  },
  rare: {
    label: '희귀',
    color: '#D97706',
    bgColor: '#FEF3C7',
    borderColor: '#FCD34D',
    glowColor: 'rgba(245, 158, 11, 0.45)',
    dropRate: 0.30,
  },
  special: {
    label: '특별',
    color: '#8B5CF6',
    bgColor: '#EDE9FE',
    borderColor: '#C4B5FD',
    glowColor: 'rgba(139, 92, 246, 0.55)',
    dropRate: 0.10,
  },
};

// 가중치 기반 랜덤 아이템 뽑기 함수
export function drawRandomReward(existingCollection = []) {
  const rand = Math.random();
  let selectedTier = 'common';
  if (rand < 0.10) {
    selectedTier = 'special';
  } else if (rand < 0.40) {
    selectedTier = 'rare';
  } else {
    selectedTier = 'common';
  }

  // 해당 티어의 아이템 목록
  const pool = REWARD_ITEMS.filter((item) => item.tier === selectedTier);
  const picked = pool[Math.floor(Math.random() * pool.length)];

  // 이미 보유 중인지 확인
  const isDuplicate = existingCollection.some((c) => c.id === picked.id);

  return {
    item: picked,
    isDuplicate,
  };
}
