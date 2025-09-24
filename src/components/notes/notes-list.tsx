import { NotesListProps } from '@/types';
import { NoteItem } from './note-item';
import { memo } from 'react';

const NotesListComponent = ({
  groupedNotes,
  onDeleteItem,
  onItemClick,
}: NotesListProps) => {
  if (groupedNotes.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-black mb-4">
        已保存的筆記（依日期）
      </h2>
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
              <div className="space-y-3">
                {group.entries.map(item => (
                  <NoteItem
                    key={item.id}
                    item={item}
                    onDelete={onDeleteItem}
                    onClick={onItemClick}
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
