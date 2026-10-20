import React from 'react';
import { Home, CheckSquare, Target, Award, Settings } from 'lucide-react';

export default function Navigation({
  currentTab,
  onSelectTab,
  unclaimedMissionsCount = 0,
  newItemsCount = 0,
  unopenedBoxes = 0,
}) {
  const tabs = [
    { id: 'dashboard', label: '홈', icon: Home },
    { id: 'checklist', label: '체크리스트', icon: CheckSquare },
    {
      id: 'missions',
      label: '퀘스트',
      icon: Target,
      badge: unclaimedMissionsCount + unopenedBoxes > 0,
      badgeCount: unclaimedMissionsCount + unopenedBoxes,
    },
    {
      id: 'collection',
      label: '컬렉션',
      icon: Award,
      badge: newItemsCount > 0,
      badgeCount: newItemsCount,
    },
    { id: 'settings', label: '설정', icon: Settings },
  ];

  return (
    <>
      {/* 1. 데스크톱 상단 네비게이션 */}
      <nav className="nav-desktop">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`nav-tab-btn ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  style={{
                    backgroundColor: 'var(--peach-500)',
                    color: '#FFFFFF',
                    borderRadius: '10px',
                    fontSize: '0.72rem',
                    fontWeight: '800',
                    padding: '1px 6px',
                    marginLeft: '4px',
                  }}
                >
                  {tab.badgeCount || '•'}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* 2. 모바일 하단 플로팅 네비게이션 */}
      <nav className="nav-mobile">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`nav-mobile-btn ${isActive ? 'active' : ''}`}
            >
              <div className="nav-icon-wrap">
                <Icon size={20} />
              </div>
              <span>{tab.label}</span>
              {tab.badge && <span className="nav-notification-dot" />}
            </button>
          );
        })}
      </nav>
    </>
  );
}
