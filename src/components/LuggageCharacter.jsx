import React, { useState } from 'react';

export default function LuggageCharacter({
  progressPercent = 0,
  equippedWearables = {},
  isAllCompleted = false,
  onClick,
}) {
  const [clickCount, setClickCount] = useState(0);

  // 진행률에 따른 감정 상태 및 표정 대사
  const getCharacterMood = () => {
    if (isAllCompleted || progressPercent === 100) {
      return {
        state: 'celebrating',
        bubble: '만반의 준비 완료! 이제 신나게 떠나요! ✈️🎉',
        faceColor: '#6B8E7B',
        expression: 'excited',
      };
    }
    if (progressPercent >= 70) {
      return {
        state: 'happy',
        bubble: '거의 다 챙겼어요! 짐 싸기 실력이 대단해요! 🌟',
        faceColor: '#6B8E7B',
        expression: 'happy',
      };
    }
    if (progressPercent >= 30) {
      return {
        state: 'curious',
        bubble: '차곡차곡 들어가고 있어요. 다음 물건은 뭐죠? 🎒',
        faceColor: '#7A9E8A',
        expression: 'smile',
      };
    }
    return {
      state: 'sleeping',
      bubble: '아직 텅 비어있어요.. 나를 가득 채워줘요! 💤',
      faceColor: '#8AA899',
      expression: 'sleepy',
    };
  };

  const mood = getCharacterMood();

  const handleClick = () => {
    setClickCount((prev) => prev + 1);
    if (onClick) onClick();
  };

  // 장착 아이템 확인
  const hasCrown = equippedWearables?.head === 'item_golden_crown_wearable';
  const hasSafariHat = equippedWearables?.head === 'item_explorer_hat_wearable';
  const hasSunglasses = equippedWearables?.face === 'item_sunglasses_wearable';

  return (
    <div className="luggage-character-container">
      {/* 귀여운 캐릭터 말풍선 */}
      <div className="character-bubble">
        {clickCount > 0 && clickCount % 3 === 0
          ? '간지러워요! 히히 🎒✨'
          : mood.bubble}
      </div>

      {/* 여행 가방 인터랙티브 SVG 그래픽 */}
      <div
        className={`luggage-svg-wrap ${mood.state}`}
        onClick={handleClick}
        title="가방 캐릭터를 클릭해보세요!"
      >
        <svg viewBox="0 0 160 190" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* 가방 본체 그라데이션 (세이지 그린 톤) */}
            <linearGradient id="bagGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7E9F8E" />
              <stop offset="100%" stopColor="#5B7E6D" />
            </linearGradient>
            {/* 가죽 스트랩 앰버 브라운 */}
            <linearGradient id="strapGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E2A662" />
              <stop offset="100%" stopColor="#B37837" />
            </linearGradient>
            {/* 볼터치 필터 */}
            <radialGradient id="blushGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF7675" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FF7675" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* 가방 바퀴 (왼쪽 / 오른쪽) */}
          <rect x="36" y="166" width="14" height="12" rx="6" fill="#3D4A41" />
          <rect x="110" y="166" width="14" height="12" rx="6" fill="#3D4A41" />
          <circle cx="43" cy="172" r="3" fill="#8AA899" />
          <circle cx="117" cy="172" r="3" fill="#8AA899" />

          {/* 가방 손잡이 (위) */}
          <rect x="62" y="12" width="36" height="20" rx="8" fill="none" stroke="#4A6153" strokeWidth="6" />
          <rect x="66" y="14" width="28" height="6" rx="3" fill="#8AA899" />

          {/* 가방 본체 (둥근 모서리) */}
          <rect x="22" y="28" width="116" height="140" rx="24" fill="url(#bagGradient)" />
          {/* 가방 테두리 광택선 */}
          <rect x="26" y="32" width="108" height="132" rx="20" fill="none" stroke="#9BBCAE" strokeWidth="2.5" opacity="0.6" />

          {/* 가죽 스트랩 (2줄) */}
          <rect x="42" y="28" width="12" height="140" rx="3" fill="url(#strapGradient)" opacity="0.9" />
          <rect x="106" y="28" width="12" height="140" rx="3" fill="url(#strapGradient)" opacity="0.9" />

          {/* 스트랩 버클 골드 핀 */}
          <rect x="40" y="55" width="16" height="10" rx="3" fill="#F4C430" />
          <rect x="44" y="58" width="8" height="4" fill="#8C6615" />
          <rect x="104" y="55" width="16" height="10" rx="3" fill="#F4C430" />
          <rect x="108" y="58" width="8" height="4" fill="#8C6615" />

          <rect x="40" y="125" width="16" height="10" rx="3" fill="#F4C430" />
          <rect x="44" y="128" width="8" height="4" fill="#8C6615" />
          <rect x="104" y="125" width="16" height="10" rx="3" fill="#F4C430" />
          <rect x="108" y="128" width="8" height="4" fill="#8C6615" />

          {/* 볼터치 */}
          <circle cx="56" cy="100" r="10" fill="url(#blushGradient)" />
          <circle cx="104" cy="100" r="10" fill="url(#blushGradient)" />

          {/* 눈 & 입 표정 렌더링 */}
          {mood.expression === 'sleepy' && (
            <g>
              {/* 감은 눈 */}
              <path d="M 52 90 Q 60 96 68 90" fill="none" stroke="#2C3531" strokeWidth="3" strokeLinecap="round" />
              <path d="M 92 90 Q 100 96 108 90" fill="none" stroke="#2C3531" strokeWidth="3" strokeLinecap="round" />
              {/* zzz 풍선 */}
              <text x="114" y="70" fontSize="13" fontWeight="bold" fill="#FEE489" fontFamily="sans-serif">z</text>
              <text x="122" y="58" fontSize="16" fontWeight="bold" fill="#FEE489" fontFamily="sans-serif">Z</text>
              {/* 작은 벌린 입 */}
              <circle cx="80" cy="102" r="3" fill="#2C3531" />
            </g>
          )}

          {mood.expression === 'smile' && (
            <g>
              {/* 깜찍한 눈 */}
              <circle cx="60" cy="90" r="4.5" fill="#2C3531" />
              <circle cx="58.5" cy="88.5" r="1.5" fill="#FFFFFF" />
              <circle cx="100" cy="90" r="4.5" fill="#2C3531" />
              <circle cx="98.5" cy="88.5" r="1.5" fill="#FFFFFF" />
              {/* 살짝 미소 */}
              <path d="M 74 100 Q 80 106 86 100" fill="none" stroke="#2C3531" strokeWidth="2.8" strokeLinecap="round" />
            </g>
          )}

          {(mood.expression === 'happy' || mood.expression === 'excited') && (
            <g>
              {/* 초롱초롱 반달 웃는 눈 */}
              <path d="M 52 92 Q 60 84 68 92" fill="none" stroke="#2C3531" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M 92 92 Q 100 84 108 92" fill="none" stroke="#2C3531" strokeWidth="3.5" strokeLinecap="round" />
              {/* 활짝 벌린 웃는 입 */}
              <path d="M 72 98 Q 80 112 88 98 Z" fill="#E74C3C" stroke="#2C3531" strokeWidth="2" />
              <path d="M 75 104 Q 80 108 85 104" fill="#FFA07A" />
            </g>
          )}

          {/* 선글라스 착용 렌더링 */}
          {hasSunglasses && (
            <g id="sunglasses" filter="drop-shadow(0 3px 5px rgba(0,0,0,0.3))">
              <path d="M 45 84 L 115 84" stroke="#1A202C" strokeWidth="3" strokeLinecap="round" />
              {/* 왼쪽 렌즈 */}
              <rect x="46" y="82" width="28" height="20" rx="8" fill="#1A202C" />
              <line x1="50" y1="86" x2="62" y2="98" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" />
              {/* 오른쪽 렌즈 */}
              <rect x="86" y="82" width="28" height="20" rx="8" fill="#1A202C" />
              <line x1="90" y1="86" x2="102" y2="98" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" />
            </g>
          )}

          {/* 왕관 착용 렌더링 */}
          {hasCrown && (
            <g id="crown" transform="translate(48, 2)" filter="drop-shadow(0 4px 6px rgba(217,119,6,0.4))">
              <polygon points="0,26 8,6 20,18 32,4 44,18 56,6 64,26" fill="#F59E0B" stroke="#D97706" strokeWidth="2" />
              {/* 보석들 */}
              <circle cx="8" cy="6" r="3" fill="#EF4444" />
              <circle cx="32" cy="4" r="3.5" fill="#3B82F6" />
              <circle cx="56" cy="6" r="3" fill="#10B981" />
              <rect x="2" y="24" width="60" height="4" rx="2" fill="#FBBF24" />
            </g>
          )}

          {/* 사파리 모자 착용 렌더링 */}
          {hasSafariHat && (
            <g id="safariHat" transform="translate(32, 6)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.2))">
              {/* 챙 */}
              <ellipse cx="48" cy="24" rx="46" ry="10" fill="#B48243" />
              {/* 모자 본체 */}
              <path d="M 24 22 C 24 6, 72 6, 72 22 Z" fill="#D3A15D" />
              {/* 리본 띠 */}
              <rect x="26" y="18" width="44" height="5" fill="#4B624E" />
              {/* 깃털 장식 */}
              <path d="M 68 18 Q 78 6 72 2" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          )}

          {/* 귀여운 여행 스티커 데코 (가방 앞면에 붙은 여행 스탬프) */}
          <g transform="translate(72, 126) rotate(-8)">
            <rect x="0" y="0" width="20" height="15" rx="3" fill="#FFF9DB" stroke="#F4C430" strokeWidth="1" />
            <text x="3" y="11" fontSize="7" fontWeight="bold" fill="#B37837" fontFamily="sans-serif">TRIP</text>
          </g>
        </svg>
      </div>

      {/* 캐릭터 이름 & 레벨 상태 배지 */}
      <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-primary)' }}>
          캐리 (Carry)
        </span>
        <span className="badge-pill badge-sage" style={{ fontSize: '0.75rem', padding: '2px 8px' }}>
          {isAllCompleted ? '준비 100% 달성 🌟' : `준비율 ${progressPercent}%`}
        </span>
      </div>
    </div>
  );
}
