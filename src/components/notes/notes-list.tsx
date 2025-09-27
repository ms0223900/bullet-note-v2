import { useViewMode } from '@/contexts/ViewModeContext';
import { NotesListProps } from '@/types';
import { memo } from 'react';
import { NoteItemContainer } from './note-item-container';
import { ViewModeToggle } from './view-mode-toggle';

const NotesListComponent = ({
  groupedNotes,
  onDeleteItem,
  onItemClick,
}: NotesListProps) => {
  const { viewMode } = useViewMode();

  if (groupedNotes.length === 0) {
    return null;
  }

  // 根據檢視模式決定容器樣式
  const getContainerStyles = () => {
    switch (viewMode) {
      case 'grid':
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3';
      case 'double':
        return 'grid grid-cols-1 lg:grid-cols-2 gap-4';
      case 'single':
      default:
        return 'space-y-3';
    }
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h2 className="text-2xl font-bold text-black mb-2 sm:mb-0">
          已保存的筆記（依日期）
        </h2>
        <ViewModeToggle />
      </div>
      <div className="space-y-6">
        {groupedNotes.map(group => (
          <div
            key={group.key}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-800">
                {group.key}
              </h3>
              <span className="text-sm text-gray-500">
                {group.entries.length} 項
              </span>
            </div>
            <div className="p-1">
              <div className={getContainerStyles()}>
                {group.entries.map(item => (
                  <NoteItemContainer
                    key={item.id}
                    item={item}
                    onDelete={onDeleteItem}
                    onClick={onItemClick}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const NotesList = memo(NotesListComponent);
