import { NoteItemProps } from '@/types';
import {
  getNoteItemDisplayStyle,
  getNoteItemTypeLabel,
} from '@/lib/note-display-utils';
import { DeleteConfirmationDialog } from './delete-confirmation-dialog';
import { useState, memo, useCallback } from 'react';

const NoteItemComponent = ({ item, onDelete, onClick }: NoteItemProps) => {
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

  return (
    <div
      className={`group flex items-start space-x-3 p-3 ${displayStyle.bgColor} rounded-lg ${displayStyle.hoverBgColor} transition-colors border-l-4 ${displayStyle.borderColor}`}
    >
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
        <p
          className="text-gray-800 text-sm leading-relaxed cursor-pointer"
          onClick={onClick}
        >
          {item.content}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          {item.createdAt.toLocaleString('zh-TW')}
        </p>
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
