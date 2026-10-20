import React, { useState, useMemo } from 'react';
import {
  Search,
  Plus,
  Trash2,
  Check,
  Filter,
  Sparkles,
  AlertCircle,
  Tag,
} from 'lucide-react';
import { CATEGORIES } from '../constants/defaultData';

export default function ChecklistView({
  items,
  stats,
  onToggleCheck,
  onAddItem,
  onDeleteItem,
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'completed' | 'uncompleted'
  const [searchQuery, setSearchQuery] = useState('');

  // 신규 항목 입력 상태
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState(CATEGORIES[0].id);
  const [newItemEssential, setNewItemEssential] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  // 필터링된 항목 목록
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // 카테고리 필터
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // 상태 필터 (전체 / 완료 / 미완료)
      if (statusFilter === 'completed' && !item.checked) {
        return false;
      }
      if (statusFilter === 'uncompleted' && item.checked) {
        return false;
      }
      // 검색어 필터
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        if (!item.name.toLowerCase().includes(query)) {
          return false;
        }
      }
      return true;
    });
  }, [items, selectedCategory, statusFilter, searchQuery]);

  // 카테고리별로 그룹화 (카테고리 뷰 시)
  const groupedItems = useMemo(() => {
    const groups = {};
    filteredItems.forEach((item) => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
    });
    return groups;
  }, [filteredItems]);

  const handleAddItemSubmit = (e) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    onAddItem({
      name: newItemName.trim(),
      category: newItemCategory,
      isEssential: newItemEssential,
    });
    setNewItemName('');
    setNewItemEssential(false);
    setShowAddForm(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* 상단 통계 바 & 검색창 */}
      <div className="quest-card" style={{ padding: '20px' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '14px',
            marginBottom: '16px',
          }}
        >
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-primary)' }}>
              여행 준비물 체크리스트 🎒
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              준비물을 체크할 때마다 +5 XP! 카테고리 완성 시 +20 XP를 드려요.
            </p>
          </div>

          <button
            onClick={() => setShowAddForm((prev) => !prev)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 16px',
              backgroundColor: 'var(--sage-500)',
              color: '#FFFFFF',
              fontWeight: '700',
              borderRadius: 'var(--radius-sm)',
              boxShadow: '0 4px 12px rgba(107, 142, 123, 0.3)',
            }}
          >
            <Plus size={18} />
            <span>새 준비물 추가</span>
          </button>
        </div>

        {/* 새 준비물 추가 폼 (토글) */}
        {showAddForm && (
          <form
            onSubmit={handleAddItemSubmit}
            style={{
              padding: '16px',
              background: 'var(--bg-main)',
              borderRadius: 'var(--radius-sm)',
              border: '1.5px dashed var(--sage-500)',
              marginBottom: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              animation: 'fadeIn 0.2s ease',
            }}
          >
            <div style={{ fontWeight: '700', fontSize: '0.92rem', color: 'var(--sage-700)' }}>
              새로운 준비물 추가하기
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="예: 여권 사본, 보조안경, 손선풍기"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                autoFocus
                style={{ flex: '2', minWidth: '180px' }}
              />

              <select
                value={newItemCategory}
                onChange={(e) => setNewItemCategory(e.target.value)}
                style={{ flex: '1', minWidth: '120px' }}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.emoji} {cat.label}
                  </option>
                ))}
              </select>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                <input
                  type="checkbox"
                  checked={newItemEssential}
                  onChange={(e) => setNewItemEssential(e.target.checked)}
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
                <span>필수 준비물 🔥</span>
              </label>

              <button
                type="submit"
                style={{
                  padding: '10px 18px',
                  backgroundColor: 'var(--sage-600)',
                  color: '#FFFFFF',
                  fontWeight: '700',
                  borderRadius: 'var(--radius-sm)',
                  whiteSpace: 'nowrap',
                }}
              >
                추가 완료
              </button>
            </div>
          </form>
        )}

        {/* 검색 및 상태 필터 툴바 */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* 검색창 */}
          <div style={{ position: 'relative', flex: '1', minWidth: '200px' }}>
            <Search
              size={18}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
              }}
            />
            <input
              type="text"
              placeholder="준비물 검색 (예: 여권, 충전기)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', paddingLeft: '38px' }}
            />
          </div>

          {/* 완료 상태 필터 */}
          <div
            style={{
              display: 'flex',
              background: 'var(--bg-main)',
              borderRadius: 'var(--radius-sm)',
              padding: '4px',
              border: '1px solid var(--border-light)',
            }}
          >
            {[
              { id: 'all', label: '전체' },
              { id: 'uncompleted', label: '미완료' },
              { id: 'completed', label: '준비 완료' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setStatusFilter(f.id)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '0.84rem',
                  fontWeight: '600',
                  color: statusFilter === f.id ? '#FFFFFF' : 'var(--text-secondary)',
                  backgroundColor: statusFilter === f.id ? 'var(--sage-500)' : 'transparent',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 카테고리 탭 바 (각 카테고리별 남은 개수 / 완료수 표시) */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '4px',
          scrollbarWidth: 'none',
        }}
      >
        <button
          onClick={() => setSelectedCategory('all')}
          style={{
            padding: '8px 16px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.88rem',
            fontWeight: '700',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: selectedCategory === 'all' ? 'var(--sage-500)' : 'var(--bg-card)',
            color: selectedCategory === 'all' ? '#FFFFFF' : 'var(--text-secondary)',
            border: '1.5px solid',
            borderColor: selectedCategory === 'all' ? 'var(--sage-500)' : 'var(--border-light)',
            boxShadow: 'var(--shadow-subtle)',
          }}
        >
          <span>전체보기</span>
          <span
            style={{
              fontSize: '0.74rem',
              opacity: 0.85,
              background: selectedCategory === 'all' ? 'rgba(255,255,255,0.25)' : 'var(--bg-card-subtle)',
              padding: '2px 6px',
              borderRadius: '10px',
            }}
          >
            {stats.completed}/{stats.total}
          </span>
        </button>

        {CATEGORIES.map((cat) => {
          const catStat = stats.categoryStats[cat.id] || { total: 0, completed: 0, isCompleted: false };
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.88rem',
                fontWeight: '700',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: isSelected ? 'var(--sage-500)' : 'var(--bg-card)',
                color: isSelected ? '#FFFFFF' : 'var(--text-secondary)',
                border: '1.5px solid',
                borderColor: isSelected ? 'var(--sage-500)' : catStat.isCompleted ? 'var(--sage-200)' : 'var(--border-light)',
                boxShadow: 'var(--shadow-subtle)',
              }}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
              <span
                style={{
                  fontSize: '0.74rem',
                  opacity: 0.85,
                  background: isSelected ? 'rgba(255,255,255,0.25)' : 'var(--bg-card-subtle)',
                  padding: '2px 6px',
                  borderRadius: '10px',
                }}
              >
                {catStat.completed}/{catStat.total}
              </span>
            </button>
          );
        })}
      </div>

      {/* 준비물 리스트 섹션 */}
      {filteredItems.length === 0 ? (
        <div
          className="quest-card"
          style={{
            padding: '48px 24px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span style={{ fontSize: '3rem' }}>🎒</span>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)' }}>
            조건에 맞는 준비물이 없어요
          </h3>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
            {searchQuery ? `검색어 '${searchQuery}'에 해당하는 준비물이 없습니다.` : '새로운 준비물을 추가해보세요!'}
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="badge-pill badge-sage"
            style={{ padding: '8px 16px', cursor: 'pointer' }}
          >
            새 준비물 추가하기
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {CATEGORIES.filter((cat) => selectedCategory === 'all' || selectedCategory === cat.id).map((cat) => {
            const catItems = filteredItems.filter((i) => i.category === cat.id);
            if (catItems.length === 0) return null;
            const catStat = stats.categoryStats[cat.id];

            return (
              <div key={cat.id} className="quest-card" style={{ padding: '18px 20px' }}>
                {/* 카테고리 헤더 */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '14px',
                    paddingBottom: '8px',
                    borderBottom: '1px solid var(--border-light)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '1.3rem' }}>{cat.emoji}</span>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                      {cat.label}
                    </h3>
                    <span
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: '700',
                        color: catStat.isCompleted ? 'var(--sage-600)' : 'var(--text-muted)',
                      }}
                    >
                      ({catStat.completed} / {catStat.total})
                    </span>
                  </div>

                  {catStat.isCompleted && (
                    <span className="badge-pill badge-sage" style={{ fontSize: '0.72rem' }}>
                      올클리어 완료 ✨
                    </span>
                  )}
                </div>

                {/* 해당 카테고리 아이템 리스트 */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {catItems.map((item) => (
                    <div
                      key={item.id}
                      className={`checklist-item-row ${item.checked ? 'checked' : ''}`}
                    >
                      <div
                        className="checklist-left"
                        onClick={() => onToggleCheck(item.id)}
                      >
                        <div className="custom-checkbox">
                          {item.checked && <Check size={14} color="#FFFFFF" strokeWidth={3.5} />}
                        </div>

                        <span className="item-name">{item.name}</span>

                        {item.isEssential && (
                          <span className="essential-tag">필수</span>
                        )}

                        {item.isCustom && (
                          <span
                            style={{
                              fontSize: '0.68rem',
                              color: 'var(--text-muted)',
                              background: 'var(--bg-card-subtle)',
                              padding: '1px 5px',
                              borderRadius: '4px',
                            }}
                          >
                            직접 추가
                          </span>
                        )}
                      </div>

                      {/* 삭제 버튼 */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteItem(item.id);
                        }}
                        title="준비물 삭제"
                        style={{
                          color: 'var(--text-muted)',
                          padding: '6px',
                          borderRadius: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          opacity: 0.6,
                          transition: 'opacity 0.2s ease, color 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.opacity = '1';
                          e.currentTarget.style.color = '#EF4444';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.opacity = '0.6';
                          e.currentTarget.style.color = 'var(--text-muted)';
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
