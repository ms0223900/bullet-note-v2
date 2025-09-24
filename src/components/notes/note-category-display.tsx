'use client';

import { ParsedNoteItem } from '@/types';

interface NoteItemProps {
  item: ParsedNoteItem;
  onClick?: () => void;
  onDelete?: () => void;
}

function NoteItem({ item, onClick, onDelete }: NoteItemProps) {
  return (
    <div className="group flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      {/* 筆記符號 */}
      <div className="flex-shrink-0 mt-1">
        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
      </div>

      {/* 筆記內容 */}
      <div className="flex-1 min-w-0">
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

      {/* 操作按鈕：手機常駐顯示（sm 以下），桌機 hover 顯示 */}
      <div className="flex-shrink-0 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
        <button
          onClick={onDelete}
          className="text-gray-400 hover:text-red-500 text-sm"
          title="刪除筆記"
        >
          ×
        </button>
      </div>
    </div>
  );
}
