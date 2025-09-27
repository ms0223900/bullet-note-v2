
import { NoteItemBase, NoteItemGrid } from '@/components/notes/note-item-base';
import { NoteItemProps, ViewMode } from '@/types';
import { memo, useCallback, useState } from 'react';
import { DeleteConfirmationDialog } from './delete-confirmation-dialog';

const NoteItemComponent = ({
  item,
  onDelete,
  onClick,
  viewMode = ViewMode.SINGLE,
}: NoteItemProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

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

  const NoteComponent = viewMode === ViewMode.GRID ? NoteItemGrid : NoteItemBase;

  return (
    <div>
      <NoteComponent
        viewMode={viewMode}
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
