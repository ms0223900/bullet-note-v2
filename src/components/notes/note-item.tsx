import {
  getNoteItemDisplayStyle,
  getNoteItemTypeLabel,
} from '@/lib/note-display-utils';
import { cn } from '@/lib/utils';
import { NoteItemProps, ParsedNoteItem, ViewMode } from '@/types';
import { memo, useCallback, useState } from 'react';
import { DeleteConfirmationDialog } from './delete-confirmation-dialog';

interface NoteItemViewModeStyles {
  container: string;
  content: string;
  time: string;
}

// Style configuration constants
const STYLE_CONFIG = {
  DELETE_BUTTON: 'text-gray-400 hover:text-red-500 text-sm',
  DELETE_BUTTON_HOVER: 'opacity-0 group-hover:opacity-100 transition-opacity',
  DELETE_BUTTON_LG_HOVER:
    'opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity',
  TYPE_LABEL: 'text-xs px-1.5 py-0.5 rounded-full',
  TYPE_LABEL_LARGE: 'text-xs px-2 py-1 rounded-full',
  CONTENT_GRID: 'text-gray-800 text-xs leading-relaxed cursor-pointer',
  CONTENT_DEFAULT: 'text-gray-800 text-sm leading-relaxed cursor-pointer',
  TIME_DEFAULT: 'text-xs text-gray-400',
  TIME_MARGIN: 'text-xs text-gray-400 mt-1',
  ICON_SMALL: 'text-sm',
  ICON_LARGE: 'text-lg',
} as const;


const getNoteItemViewModeStyles = (viewMode: ViewMode): NoteItemViewModeStyles => {

  switch (viewMode) {
    case ViewMode.GRID:
      return {
        container: `flex flex-col space-y-2 p-2`,
        content: STYLE_CONFIG.CONTENT_GRID,
        time: STYLE_CONFIG.TIME_DEFAULT,
      };
    case ViewMode.DOUBLE:
      return {
        container: `flex items-start space-x-2 p-2`,
        content: STYLE_CONFIG.CONTENT_GRID,
        time: STYLE_CONFIG.TIME_DEFAULT,
      };
    case ViewMode.SINGLE:
    default:
      return {
        container: `flex items-start space-x-3 p-3`,
        content: STYLE_CONFIG.CONTENT_DEFAULT,
        time: STYLE_CONFIG.TIME_MARGIN,
      };
  }
};


// Time formatting utilities
const formatTimeShort = (date: Date) =>
  date.toLocaleTimeString('zh-TW', {
    hour: '2-digit',
    minute: '2-digit',
  });

const formatTimeFull = (date: Date) => date.toLocaleString('zh-TW');

// Delete button component
interface DeleteButtonProps {
  onClick: () => void;
  className?: string;
}

const DeleteButton = ({ onClick, className = '' }: DeleteButtonProps) => (
  <button
    onClick={onClick}
    className={`${STYLE_CONFIG.DELETE_BUTTON} ${className}`}
    title="刪除筆記"
  >
    ×
  </button>
);

interface NoteItemGridProps {
  note: ParsedNoteItem;
  onClick: () => void;
  onDeleteClick: () => void;
}

const NoteItemGrid = ({
  note,
  onClick,
  onDeleteClick,
}: NoteItemGridProps) => {
  const typeLabel = getNoteItemTypeLabel(note);
  const displayStyle = getNoteItemDisplayStyle(note);
  const baseContainer = `group ${displayStyle.bgColor} rounded-lg ${displayStyle.hoverBgColor} transition-colors border-l-4 ${displayStyle.borderColor}`;
  const styles = getNoteItemViewModeStyles(ViewMode.GRID);

  const truncatedContent =
    note.content.length > 50
      ? `${note.content.substring(0, 50)}...`
      : note.content;

  return (
    <div className={cn(baseContainer, styles.container)}>
      <div className="flex items-center justify-between">
        <span className={`${STYLE_CONFIG.ICON_SMALL} ${displayStyle.iconColor}`}>
          {displayStyle.icon}
        </span>
        <DeleteButton
          onClick={onDeleteClick}
          className={STYLE_CONFIG.DELETE_BUTTON_HOVER}
        />
      </div>
      <div className="space-y-1">
        <span
          className={`${STYLE_CONFIG.TYPE_LABEL} ${displayStyle.iconColor} ${displayStyle.bgColor} border ${displayStyle.borderColor}`}
        >
          {typeLabel}
        </span>
        <p className={styles.content} onClick={onClick} title={note.content}>
          {truncatedContent}
        </p>
        <p className={styles.time}>{formatTimeShort(note.createdAt)}</p>
      </div>
    </div>
  );
};

// TODO: NoteItemBase

const NoteItemComponent = ({
  item,
  onDelete,
  onClick,
  viewMode = ViewMode.SINGLE,
}: NoteItemProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const typeLabel = getNoteItemTypeLabel(item);

  const displayStyle = getNoteItemDisplayStyle(item);

  const baseContainer = `group ${displayStyle.bgColor} rounded-lg ${displayStyle.hoverBgColor} transition-colors border-l-4 ${displayStyle.borderColor}`;

  const styles = getNoteItemViewModeStyles(viewMode);

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

  if (viewMode === ViewMode.GRID) {
    return (
      <div>
        <NoteItemGrid
          note={item}
          onClick={onClick}
          onDeleteClick={handleDeleteClick}
        />
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
    <div>
      <div className={cn(baseContainer, styles.container)}>
        <div className="flex-shrink-0 mt-1">
          <span
            className={`${STYLE_CONFIG.ICON_LARGE} ${displayStyle.iconColor}`}
          >
            {displayStyle.icon}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <span
              className={`${STYLE_CONFIG.TYPE_LABEL_LARGE} ${displayStyle.iconColor} ${displayStyle.bgColor} border ${displayStyle.borderColor}`}
            >
              {typeLabel}
            </span>
          </div>
          <p className={styles.content} onClick={onClick}>
            {item.content}
          </p>
          <p className={styles.time}>{formatTimeFull(item.createdAt)}</p>
        </div>
        <div className={`flex-shrink-0 ${STYLE_CONFIG.DELETE_BUTTON_LG_HOVER}`}>
          <DeleteButton onClick={handleDeleteClick} />
        </div>

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

export const NoteItem = memo(NoteItemComponent, (prevProps, nextProps) => {
  return (
    prevProps.item.id === nextProps.item.id &&
    prevProps.item.content === nextProps.item.content &&
    prevProps.item.type === nextProps.item.type &&
    prevProps.item.isCompleted === nextProps.item.isCompleted &&
    prevProps.item.createdAt.getTime() === nextProps.item.createdAt.getTime() &&
    prevProps.viewMode === nextProps.viewMode &&
    prevProps.onDelete === nextProps.onDelete &&
    prevProps.onClick === nextProps.onClick
  );
});
