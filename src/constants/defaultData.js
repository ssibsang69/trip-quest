export const CATEGORIES = [
  { id: 'clothes', label: '의류', icon: 'Shirt', emoji: '👕', color: '#8AA899' },
  { id: 'toiletries', label: '세면도구', icon: 'Sparkles', emoji: '🫧', color: '#74B9FF' },
  { id: 'electronics', label: '전자기기', icon: 'Smartphone', emoji: '🔌', color: '#A29BFE' },
  { id: 'documents', label: '여행 서류', icon: 'FileText', emoji: '📑', color: '#F8B677' },
  { id: 'medicine', label: '의약품', icon: 'HeartPulse', emoji: '💊', color: '#FF7675' },
  { id: 'others', label: '기타', icon: 'Package', emoji: '🎒', color: '#FD79A8' },
];

export const INITIAL_ITEMS = [
  // 의류
  { id: 'item_c1', category: 'clothes', name: '속옷', checked: false, isEssential: true },
  { id: 'item_c2', category: 'clothes', name: '양말', checked: false, isEssential: true },
  { id: 'item_c3', category: 'clothes', name: '티셔츠', checked: false, isEssential: false },
  { id: 'item_c4', category: 'clothes', name: '바지', checked: false, isEssential: false },
  { id: 'item_c5', category: 'clothes', name: '잠옷', checked: false, isEssential: false },
  { id: 'item_c6', category: 'clothes', name: '겉옷', checked: false, isEssential: false },

  // 세면도구
  { id: 'item_t1', category: 'toiletries', name: '칫솔', checked: false, isEssential: true },
  { id: 'item_t2', category: 'toiletries', name: '치약', checked: false, isEssential: true },
  { id: 'item_t3', category: 'toiletries', name: '샴푸', checked: false, isEssential: false },
  { id: 'item_t4', category: 'toiletries', name: '클렌징폼', checked: false, isEssential: false },
  { id: 'item_t5', category: 'toiletries', name: '스킨케어 제품', checked: false, isEssential: false },

  // 전자기기
  { id: 'item_e1', category: 'electronics', name: '휴대폰', checked: false, isEssential: true },
  { id: 'item_e2', category: 'electronics', name: '충전기', checked: false, isEssential: true },
  { id: 'item_e3', category: 'electronics', name: '보조배터리', checked: false, isEssential: true },
  { id: 'item_e4', category: 'electronics', name: '이어폰', checked: false, isEssential: false },
  { id: 'item_e5', category: 'electronics', name: '카메라', checked: false, isEssential: false },

  // 여행 서류
  { id: 'item_d1', category: 'documents', name: '신분증', checked: false, isEssential: true },
  { id: 'item_d2', category: 'documents', name: '여권', checked: false, isEssential: true },
  { id: 'item_d3', category: 'documents', name: '항공권', checked: false, isEssential: true },
  { id: 'item_d4', category: 'documents', name: '숙소 예약 내역', checked: false, isEssential: false },

  // 의약품
  { id: 'item_m1', category: 'medicine', name: '상비약', checked: false, isEssential: true },
  { id: 'item_m2', category: 'medicine', name: '밴드', checked: false, isEssential: false },
  { id: 'item_m3', category: 'medicine', name: '소화제', checked: false, isEssential: false },
  { id: 'item_m4', category: 'medicine', name: '진통제', checked: false, isEssential: false },

  // 기타
  { id: 'item_o1', category: 'others', name: '지갑', checked: false, isEssential: true },
  { id: 'item_o2', category: 'others', name: '현금', checked: false, isEssential: true },
  { id: 'item_o3', category: 'others', name: '우산', checked: false, isEssential: false },
  { id: 'item_o4', category: 'others', name: '물병', checked: false, isEssential: false },
  { id: 'item_o5', category: 'others', name: '에코백', checked: false, isEssential: false },
];

export const DEFAULT_TRIP_INFO = {
  title: '제주도 푸른 바다 힐링 여행 🍊',
  departureDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  destination: '제주도',
};
