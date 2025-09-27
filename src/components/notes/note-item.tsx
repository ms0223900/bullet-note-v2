import {
  getNoteItemDisplayStyle,
  getNoteItemTypeLabel,
} from '@/lib/note-display-utils';
import { NoteItemProps } from '@/types';
import { memo, useCallback, useState } from 'react';
import { DeleteConfirmationDialog } from './delete-confirmation-dialog';

const NoteItemComponent = ({
  item,
  onDelete,
  onClick,
  viewMode = 'single',
}: NoteItemProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const displayStyle = getNoteItemDisplayStyle(item);
  const typeLabel = getNoteItemTypeLabel(item);

  const handleDeleteClick = useCallback(() => {
    setShowDeleteDialog(true);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    onDelete(item.id);
    setShowDeleteDialog(false);
  }, [onDelete, item.id]);

  const handleCancelDelete = useCallback(() => {
    setShowDeleteDialog(false);
  }, []);

  // 根據檢視模式決定樣式
  const getItemStyles = () => {
    switch (viewMode) {
      case 'grid':
        return {
          container: `group flex flex-col space-y-2 p-2 ${displayStyle.bgColor} rounded-lg ${displayStyle.hoverBgColor} transition-colors border-l-4 ${displayStyle.borderColor}`,
          content: 'text-gray-800 text-xs leading-relaxed cursor-pointer',
          time: 'text-xs text-gray-400',
        };
      case 'double':
        return {
          container: `group flex items-start space-x-2 p-2 ${displayStyle.bgColor} rounded-lg ${displayStyle.hoverBgColor} transition-colors border-l-4 ${displayStyle.borderColor}`,
          content: 'text-gray-800 text-xs leading-relaxed cursor-pointer',
          time: 'text-xs text-gray-400',
        };
      case 'single':
      default:
        return {
          container: `group flex items-start space-x-3 p-3 ${displayStyle.bgColor} rounded-lg ${displayStyle.hoverBgColor} transition-colors border-l-4 ${displayStyle.borderColor}`,
          content: 'text-gray-800 text-sm leading-relaxed cursor-pointer',
          time: 'text-xs text-gray-400 mt-1',
        };
    }
  };

  const styles = getItemStyles();

  if (viewMode === 'grid') {
    return (
      <div className={styles.container}>
        <div className="flex items-center justify-between">
          <span className={`text-sm ${displayStyle.iconColor}`}>
            {displayStyle.icon}
          </span>
          <button
            onClick={handleDeleteClick}
            className="text-gray-400 hover:text-red-500 text-sm opacity-0 group-hover:opacity-100 transition-opacity"
            title="刪除筆記"
          >
            ×
          </button>
        </div>
        <div className="space-y-1">
          <span
            className={`text-xs px-1.5 py-0.5 rounded-full ${displayStyle.iconColor} ${displayStyle.bgColor} border ${displayStyle.borderColor}`}
          >
            {typeLabel}
          </span>
          <p className={styles.content} onClick={onClick} title={item.content}>
            {item.content.length > 50
              ? `${item.content.substring(0, 50)}...`
              : item.content}
          </p>
          <p className={styles.time}>
            {item.createdAt.toLocaleTimeString('zh-TW', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>

        <DeleteConfirmationDialog
          isOpen={showDeleteDialog}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          message="確定要刪除這個筆記項目嗎？"
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className="flex-shrink-0 mt-1">
        <span className={`text-lg ${displayStyle.iconColor}`}>
          {displayStyle.icon}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-1">
          <span
            className={`text-xs px-2 py-1 rounded-full ${displayStyle.iconColor} ${displayStyle.bgColor} border ${displayStyle.borderColor}`}
          >
            {typeLabel}
          </span>
        </div>
        <p className={styles.content} onClick={onClick}>
          {item.content}
        </p>
        <p className={styles.time}>{item.createdAt.toLocaleString('zh-TW')}</p>
      </div>
      <div className="flex-shrink-0 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleDeleteClick}
          className="text-gray-400 hover:text-red-500 text-sm"
          title="刪除筆記"
        >
          ×
        </button>
      </div>

      <DeleteConfirmationDialog
        isOpen={showDeleteDialog}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        message="確定要刪除這個筆記項目嗎？"
      />
    </div>
  );
};

export const NoteItem = memo(NoteItemComponent);
