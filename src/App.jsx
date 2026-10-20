import React, { useState } from 'react';
import { useTripQuest } from './hooks/useTripQuest';
import Header from './components/Header';
import Navigation from './components/Navigation';
import DashboardView from './components/DashboardView';
import ChecklistView from './components/ChecklistView';
import MissionView from './components/MissionView';
import CollectionView from './components/CollectionView';
import SettingsView from './components/SettingsView';
import RewardBoxModal from './components/RewardBoxModal';
import LevelUpModal from './components/LevelUpModal';
import CompletionModal from './components/CompletionModal';
import EditTripModal from './components/EditTripModal';
import ToastContainer from './components/ToastContainer';

export default function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [isEditTripOpen, setIsEditTripOpen] = useState(false);
  const [isBoxModalOpen, setIsBoxModalOpen] = useState(false);

  const {
    tripInfo,
    items,
    stats,
    levelInfo,
    missions,
    unclaimedMissionsCount,
    newItemsCount,
    unopenedBoxes,
    collection,
    equippedWearables,
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
  } = useTripQuest();

  // 미션에서 '보상 상자 열기' 눌렀을 때의 핸들러
  const handleClaimMission = (missionId) => {
    claimMissionReward(missionId);
    // 보상 획득 후 상자 오픈 모달 띄우기
    setIsBoxModalOpen(true);
  };

  return (
    <div className="app-wrapper">
      {/* 플로팅 토스트 컨테이너 */}
      <ToastContainer toasts={toasts} />

      {/* 상단 통합 헤더 */}
      <Header
        tripInfo={tripInfo}
        dDayInfo={dDayInfo}
        levelInfo={levelInfo}
        unopenedBoxes={unopenedBoxes}
        onOpenEditTrip={() => setIsEditTripOpen(true)}
        onOpenBoxModal={() => setIsBoxModalOpen(true)}
      />

      {/* 데스크탑 및 모바일 반응형 내비게이션 */}
      <Navigation
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        unclaimedMissionsCount={unclaimedMissionsCount}
        newItemsCount={newItemsCount}
        unopenedBoxes={unopenedBoxes}
      />

      {/* 현재 탭별 메인 뷰 */}
      <main style={{ width: '100%' }}>
        {currentTab === 'dashboard' && (
          <DashboardView
            stats={stats}
            levelInfo={levelInfo}
            missions={missions}
            unopenedBoxes={unopenedBoxes}
            equippedWearables={equippedWearables}
            onNavigateTab={(tab) => setCurrentTab(tab)}
            onOpenBoxModal={() => setIsBoxModalOpen(true)}
            onOpenEditTrip={() => setIsEditTripOpen(true)}
            onClaimMission={handleClaimMission}
          />
        )}

        {currentTab === 'checklist' && (
          <ChecklistView
            items={items}
            stats={stats}
            onToggleCheck={toggleItemCheck}
            onAddItem={addItem}
            onDeleteItem={deleteItem}
          />
        )}

        {currentTab === 'missions' && (
          <MissionView
            missions={missions}
            unopenedBoxes={unopenedBoxes}
            onClaimMission={handleClaimMission}
            onOpenBoxModal={() => setIsBoxModalOpen(true)}
          />
        )}

        {currentTab === 'collection' && (
          <CollectionView
            collection={collection}
            equippedWearables={equippedWearables}
            onMarkSeen={markCollectionItemSeen}
            onMarkAllSeen={markAllCollectionSeen}
            onToggleEquip={toggleEquipWearable}
          />
        )}

        {currentTab === 'settings' && (
          <SettingsView
            tripInfo={tripInfo}
            onUpdateTripInfo={updateTripInfo}
            onResetAllData={resetAllData}
            onRestoreSampleData={restoreSampleData}
          />
        )}
      </main>

      {/* 인터랙티브 모달 모음 */}
      {/* 1. 보상 상자 모달 */}
      <RewardBoxModal
        isOpen={isBoxModalOpen}
        isOpening={isOpeningBox}
        openedReward={openedReward}
        unopenedBoxes={unopenedBoxes}
        onOpenBox={openRewardBox}
        onClose={() => {
          setIsBoxModalOpen(false);
          setOpenedReward(null);
        }}
        onNavigateToCollection={() => {
          setIsBoxModalOpen(false);
          setOpenedReward(null);
          setCurrentTab('collection');
        }}
      />

      {/* 2. 레벨업 축하 모달 */}
      <LevelUpModal
        data={levelUpData}
        onClose={() => setLevelUpData(null)}
      />

      {/* 3. 100% 준비 완료 축하 모달 */}
      <CompletionModal
        isOpen={showCompletionModal}
        onClose={() => setShowCompletionModal(false)}
      />

      {/* 4. 여행 정보 수정 모달 */}
      <EditTripModal
        isOpen={isEditTripOpen}
        tripInfo={tripInfo}
        onSave={updateTripInfo}
        onClose={() => setIsEditTripOpen(false)}
      />
    </div>
  );
}
