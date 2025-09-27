import { useTheme } from '@/contexts/ThemeContext';
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
  const { themeConfig } = useTheme();

  if (groupedNotes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className={`text-lg ${themeConfig.noteItem.note.text} opacity-70 mb-4`}>
          還沒有保存的筆記
        </div>
        <div className={`text-sm ${themeConfig.noteItem.note.text} opacity-50`}>
          在下方編輯區域輸入內容並點擊「儲存筆記」來開始記錄
        </div>
      </div>
    );
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className={`text-2xl font-bold ${themeConfig.noteItem.note.text} mb-2 sm:mb-0`}>
          我的筆記
        </h2>
        <ViewModeToggle />
      </div>
      <div className="space-y-6">
        {groupedNotes.map(group => (
          <div
            key={group.key}
            className={`${themeConfig.background.secondary} border ${themeConfig.noteItem.note.border} rounded-lg p-6 shadow-sm`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-lg font-semibold ${themeConfig.noteItem.note.text}`}>
                {group.key}
              </h3>
              <span className={`text-sm ${themeConfig.noteItem.note.text} opacity-70 bg-opacity-20 px-3 py-1 rounded-full`}>
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
